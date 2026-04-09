# Case Study — Raybot Context Window Management

**Date:** 2026-04-08
**System:** Raybot (BFL Design lead-capture chat)
**Author:** Ray Butler + Claude
**Commit:** [pending]

---

## The problem

Raybot is the Gemini-powered chat widget on bfl.design. Its job is narrow: answer visitor questions about Ray's work, qualify leads, and capture contact details into email.

During production testing we discovered the chat would soft-brick after 30 messages with a terminal error — `Conversation too long` — and the only recovery was clicking a small reset icon in the header that most visitors would never find. The cause was structural, not a bug: the client was sending the entire message history on every request, and the server had a hard cap at `MAX_HISTORY_TURNS = 30` to protect against runaway prompts and abuse.

This shipped silently. Short chatters never noticed. But two cohorts were being lost:

1. **Engaged single-session visitors** who actually wanted to talk and hit 15+ exchanges
2. **Returning visitors** whose localStorage history accumulated across visits until they crossed 30

Both are the exact people a lead-capture bot exists to serve. The worst possible users to break the experience for.

## The decision space

There are four standard patterns for managing context in commercial chat assistants, plus a fifth anti-pattern (do nothing).

### Option 1 — Sliding window

Keep the last N turns, drop anything older from the outbound request. Display history can still grow for the visitor; only the context sent to the model is trimmed.

**Pros**
- Trivial to implement (one `slice` call)
- Zero new dependencies
- No additional LLM calls → no added cost or latency
- Deterministic and debuggable
- The pattern used by virtually every commercial lead-capture bot (Intercom Fin, Drift, Zendesk AI)

**Cons**
- The bot genuinely forgets messages older than the window
- If a visitor says "what did I say 20 messages ago?" the bot can't reconstruct it
- Not appropriate if the conversation genuinely needs long-term memory

### Option 2 — Summarization / rolling recap

When the history crosses a threshold, call the LLM a second time to compress older turns into a short narrative summary, then send `summary + recent turns` as the context for the next user message.

**Pros**
- Preserves the "gist" of older conversation without the token cost of sending it verbatim
- Good fit for conversations that span hours or multiple sessions where older context genuinely matters
- Used by ChatGPT's memory feature and Claude Projects for a reason

**Cons**
- Adds an extra LLM call per trim cycle → more money, more latency, more failure modes
- Summary quality is variable — models sometimes hallucinate or misremember when summarizing
- Introduces a second prompt engineering surface to maintain
- Significant implementation complexity: where to store the summary, how to version it, when to refresh it, what to do if the summarization call fails
- For a lead-capture bot that almost never has 20+ turn conversations, the cost/benefit is upside-down

### Option 3 — Hybrid (window + running summary)

Keep the last N turns verbatim AND maintain a rolling summary of everything before that. Send both on every request.

**Pros**
- Best fidelity: recent conversation is exact, older context is at least represented
- What sophisticated enterprise agents use when the product actually depends on long-running memory

**Cons**
- All the cons of option 2, plus additional state management
- The summary has to be rebuilt or incrementally updated as the window slides — each approach has gotchas
- We'd be building infrastructure for a problem the product doesn't actually have

### Option 4 — RAG over conversation history

Index every message in a vector store as it's sent. On each new turn, retrieve the top-K semantically relevant past messages and include them alongside recent turns.

**Pros**
- The only approach that can genuinely recall "what did I say weeks ago" at arbitrary depth
- Scales to conversations of essentially unlimited length
- What truly persistent "knows-you" AI assistants use

**Cons**
- Enormous infrastructure cost: vector DB, embedding pipeline, retrieval pipeline, eviction policy
- Introduces a whole new class of bugs (bad retrievals, irrelevant context injection, context-window pollution)
- Requires per-user isolation and retention policies we don't have
- For a bot whose job is to capture a lead in under 10 turns, this is comical overkill

### Option 5 — Do nothing (the current state)

Send the full history every time, let the server cap it, let the visitor figure out the reset button.

**Pros**
- Zero code changes

**Cons**
- We are already losing real users to this. The cost of "no change" is not zero; it's silently bleeding leads. "Do nothing" is never free when there's an observed failure mode in production.

## The choice and why

**We picked Option 1 — sliding window, N = 25.**

The reasoning compressed into a few sentences:

1. **Product fit.** Raybot's job is to qualify a lead in under 10 turns. The useful context is always recent. The bot does not need to remember message 1 by the time it's on message 30 — by then the conversation has either converted, bounced, or meandered, and turn 1 is no longer load-bearing.

2. **Complexity budget.** This is a single-developer portfolio site with a chat widget as one of many features. Summarization or RAG would add multiple moving parts and a secondary failure mode (summary-of-summary drift, retrieval misses, embedding pipeline outages) for a problem that sliding window solves in three lines of code. Spending complexity on options 2–4 would be premature optimization against a scale we don't have.

3. **Cost.** Sliding window is strictly cheaper per request than sending full history (fewer tokens) and adds no additional LLM calls. Summarization and RAG both add cost per interaction for a bot that is already hitting a Gemini paid-tier billing cap.

4. **Reversibility.** If we're wrong — if we discover that conversations actually need long-term memory — swapping from sliding window to summarization later is a contained refactor of a single hook. We can't easily walk back from "we built a vector DB for this" if it turns out we didn't need one.

5. **Industry alignment.** Sliding window is what commercial lead-capture bots use. We're not trying to invent new ground here; we're trying to reach parity with the obvious baseline. Going further than baseline would need a real justification, and there isn't one.

6. **Window size of 25.** The server cap is 30. Picking 25 gives a 5-turn safety margin against off-by-one or race conditions, without meaningfully reducing the bot's recent memory. 25 turns is ~12–13 full exchanges, which is longer than any realistic qualified lead conversation.

## Tradeoffs we accepted

- **The bot will forget genuinely old messages.** If visitor and bot have a 40-turn conversation and the visitor references something from turn 1, the bot won't know. In practice this is almost never important for a lead-capture flow; when it matters we can bump the window to 28.
- **The fix is invisible.** Visitors won't know the bot has a context window. They may notice the bot "forgetting" in very long chats. We consider that acceptable and, if anything, self-correcting — it encourages visitors to restate key points, which is closer to how humans actually communicate.
- **We're not observing the pruning.** We don't log when the window trims. If at some point we need to measure how often this happens in real traffic, we'd add an audit event. Not worth it yet.

## Implementation

One hook: `src/viewmodels/useChat.ts`.

- Added a module constant `CONTEXT_WINDOW_SIZE = 25`.
- In the `send` callback, the outbound payload now uses `updated.slice(-CONTEXT_WINDOW_SIZE)` before mapping into the request body. The `updated` array (full history) is still what gets stored in React state and persisted to localStorage for display.

That's the whole change. Three lines net. No new dependencies. No server changes — the server's `MAX_HISTORY_TURNS = 30` stays exactly as it is, now acting purely as a belt-and-braces defensive cap that the client should never trip.

## What this case study is really about

The interesting part isn't the fix — sliding window is obvious in hindsight. The interesting part is that the bug was invisible. It shipped, it passed review, it passed testing by the solo developer (me), and the only reason we caught it is that during ONE specific testing session I personally accumulated enough messages to hit the cap and noticed the chat was stuck.

The lesson for anyone building LLM-backed products:

> Any feature that accumulates state across sessions needs to be tested at the tail of the distribution, not the median. The median user has 2–6 messages and never sees the problem. The tail user — the one you actually want, the engaged lead — is the first to hit it.

The cost of checking this once, proactively, before shipping: five minutes of "what happens if I send 40 messages?" The cost of finding it in production: some unknown number of lost conversations that never became leads, discovered only by accident during unrelated testing.

That's the actual takeaway. Not sliding-window-vs-summarization. **Test the tail.**

---

## Related decision — the visual handoff from "thinking" to "replied"

Tied to the same debugging session, we noticed the loading state felt abrupt. A spinner labeled "Thinking..." appeared, then vanished, then the bot reply snapped into existence. Three discrete state changes, visually unrelated to each other. It worked, but it felt like three separate events instead of one continuous action — which is the opposite of how a real conversation flows.

The fix was to make the loading indicator and the eventual reply look like **the same UI element getting its content filled in**, rather than two different elements swapping places.

### Options considered

**Option 1 — Keep the spinner + label** (the status quo)
Zero work. Accurate to what the system is doing. But it looks like a progress bar, not a conversation. Spinners are for "the computer is working on a task." Typing indicators are for "the other party is composing a message." A lead-capture bot is pretending to be the second one; it should look like the second one.

**Option 2 — Three-dot typing indicator, plain row** (common cheap version)
Three bouncing dots in a row, no bubble around them. Communicates "typing" clearly. Cheap to build. But it's visually disconnected from the message bubbles that surround it, which re-introduces the same "discrete events" feeling.

**Option 3 — Three-dot indicator inside a bot-shaped bubble** (what we picked)
Three dots inside a container that has the exact same `border-radius`, `bgcolor`, padding, and positioning as an assistant `ChatMessage` bubble. When the reply arrives, the indicator unmounts and the real message mounts in the same position with a short fade-in. Because the visual container is continuous across the handoff, the eye reads it as one bubble whose content changed from "dots" to "text."

**Option 4 — Streaming the response token-by-token** (what ChatGPT actually does)
The gold standard. No indicator at all — the bot's reply just streams in character by character as the model generates it. Feels alive. But it requires server-sent events or a streaming HTTP response from the Gemini API and rewiring both the route handler and the client hook to consume chunks. Significant implementation work for a bot whose median response is ~200 tokens and takes ~1.5 seconds. Worth it for ChatGPT at scale; over-investment for Raybot.

### Why option 3

Same logic as the context window decision, applied to a different axis:

1. **Product fit.** We're trying to make the bot feel like a person composing a reply, not a database processing a query. A bubble-shaped typing indicator is the exact vocabulary every messaging app on Earth uses for that. iMessage, WhatsApp, Slack, Intercom — same pattern. Visitors already know what it means without being told.

2. **Complexity budget.** Building option 3 is ~60 lines in a new `TypingIndicator` component. Building option 4 (streaming) is multiple files across client and server, new failure modes (partial chunks, dropped connections, backpressure), and a significant increase in testing surface. Option 3 gets 80% of the feel for 5% of the effort.

3. **Reversibility.** If we later decide Raybot should stream, swapping out the TypingIndicator is trivial. The component has a single call site and no public API beyond an optional color prop. Option 4 would be a one-way door into more complex client/server plumbing.

4. **Latency tolerance.** Streaming mostly matters when responses are long and users want to start reading before the model is done. Raybot's replies are typically 1–3 sentences. By the time a reader's eyes could parse a streamed first word, the whole reply is usually already done. The visible payoff of streaming at our response length is near zero.

### What the visual handoff actually does

Play through the sequence frame-by-frame:

1. **User hits send.** The user's message bubble slides in from below (`translateY(4px) → 0`, 280ms, ease-out).
2. **`isLoading` flips true.** A `TypingIndicator` component mounts in the same column as assistant messages. It fades in and slides up 6px (220ms, ease-out).
3. **The bot's reply returns from the API.** `isLoading` flips false, the typing indicator unmounts, and a new assistant `ChatMessage` mounts at the same position. The new bubble uses the same entrance animation as the indicator.
4. **Because both the indicator and the bubble use matching shapes and matching entrance timings, the human eye reads them as the same element whose contents changed.** The three dots turn into text, and it feels natural rather than stuttery.

That perceptual continuity is the whole point of the exercise. It's not about the animation itself — it's about making two separate components in the code read as one component to the visitor.

### Implementation notes

- New component: `src/components/chat/TypingIndicator.tsx` (~70 lines). Takes an optional `color` prop. Uses MUI `sx` for both the bubble and the three dots, with CSS keyframes defined inline.
- `ChatPanel.tsx`: removed `CircularProgress` and the "Thinking..." row, replaced with `<TypingIndicator />` behind the existing `isLoading` gate. Net: removed 8 lines, added 1.
- `ChatMessage.tsx`: added a `chatMessageIn` keyframe animation on the outer `Box`. User messages use a slightly smaller displacement (4px) than bot messages (6px) — the user's own action should feel a touch more reactive than the bot's reply.
- All animations honor `prefers-reduced-motion: reduce` and disable themselves for users with that setting.

### What this adds to "test the tail"

A parallel lesson, slightly different shape:

> **Feel is a first-class feature, not a polish pass.** The bot worked fine before this change — responses arrived in the right place with the right content. But "works" isn't the same as "feels right," and the gap between them is where trust is won or lost. You don't get a second chance to make a conversational interface feel like a conversation. If the first interaction feels mechanical, visitors will quietly decide the tool isn't worth their attention and leave, and you'll never know why.

Spend the 60 lines. Make the handoff continuous. It's the same philosophy as testing the tail — look at the moments most people skim past, because those moments compound.

---

## Related decision — should bot messages be recorded?

Once the abuse-hardening work (context window, rate limits, prompt-injection filter) and the observability work (audit logging, Axiom log drain) were in place, a natural question came up: should we also be recording the actual text of visitor messages and bot replies?

The instinct was "yes, of course — we need it to debug problems and catch jailbreaks we missed." The right answer turned out to be "no, not by default, and only under very specific conditions later."

### The two conflicting pressures

Recording conversations pulls in two opposite directions:

**Reasons to log message content**
- Debugging surprising bot behavior requires seeing the prompt that caused it
- Investigating a successful jailbreak requires the exact text that slipped through our regex filter
- Measuring reply quality requires actually reading replies
- Some industries (finance, healthcare) are legally required to retain conversations — not us, but worth naming

**Reasons not to**
- Visitors reasonably expect a chat widget to be private
- The moment you start retaining conversation content, GDPR/CCPA scope kicks in — privacy policy disclosures, retention procedures, data subject access requests
- If the log store gets breached, the blast radius jumps from "we recorded some hashed IPs" to "we recorded the actual text of conversations"
- Sophisticated visitors inspect network traffic and will notice message content being sent to a log drain — bad trust signal for an audience of engineers
- Some model-provider terms of service have gray areas around user-input retention

### What we already log

Before this decision, `audit()` already recorded per-event metadata: timestamp, event name (`chat.request`, `chat.blocked.injection`, etc.), hashed IP (SHA-256, not raw), message count, total character count, reply length, prompt version, and labels for which filter or validator fired. Every numeric and categorical field that could help us understand *what was happening*, but zero message text. That was a deliberate earlier choice, and the question now was whether to reverse it.

### The five options we considered

**Option 1 — Never log content (status quo)**
Visibility into shapes and rates but nothing else. When a jailbreak slips past, we can see it happened but not what the attacker wrote, so we can't patch the filter. Maximum privacy, zero compliance burden.

**Option 2 — Failure-only logging**
Log content only for `chat.blocked.*`, `chat.error`, and `chat.tool.lead-rejected`. Normal successful conversations are never recorded. Attackers and error cases are. The asymmetry is the whole point: an attacker whose jailbreak was caught has close to zero legitimate privacy expectation around what they typed; a paying lead having a normal chat has the full expectation.

**Option 3 — Log all content with short retention**
Everything, 7 days, then auto-delete. Best for debugging and quality work. Worst for privacy and compliance.

**Option 4 — Sample 1%**
Random 1% of conversations recorded in full for quality measurement. Tiny privacy footprint, but almost useless for debugging because the specific broken conversation is almost never in the sample.

**Option 5 — Opt-in "send this conversation" button**
Visitor explicitly clicks to send their transcript to us. Perfect consent model, useless for abuse investigation because attackers won't click it.

### The decision

**Status quo for now (Option 1), with a conditional path to Option 2 later.**

The reasoning:

1. **Real data before real decisions.** We have no idea yet how often `chat.blocked.*` events actually fire in production. Building a content-logging pipeline for a threat model that might not exist is premature. Ship the metadata-only Axiom log drain, run it for a month, look at the actual event rates, and *then* decide whether the debugging benefit of content logging is worth the cost.

2. **Privacy as a default, not a reluctant choice.** If someone inspects Raybot's network traffic today, they see a clean request/response pair with no opaque logging sidecar. That's a clear story we can defend. Turning on content logging, even failure-only, requires updating the privacy policy, adding retention procedures, and explaining ourselves. The bar to cross that threshold should be "we've proven we need it," not "we might need it."

3. **The visitor population is unusually privacy-aware.** BFL's audience includes engineers, technical founders, and people who will absolutely check the network tab. Logging messages silently — even just on failures — without a privacy disclosure would feel dishonest to this specific cohort in a way it might not for a consumer-facing chat.

4. **Most debugging can be done without it.** If Raybot gives a weird reply and the visitor mentions it, we can ask them to describe or screenshot what happened. If our audit event counts show unusual patterns, we can add more specific metadata logging (e.g., logging which exact regex pattern fired) without needing the full input. Content logging is a last resort, not a first resort.

### The conditional path forward

After ~1 month of baseline data from the Axiom log drain, review:

- How many `chat.blocked.injection` events actually fire per week?
- How many `chat.error` events?
- Is the `chat.blocked.global-rate` ever tripping? (If yes, we have real distributed-IP abuse.)
- Are there recurring patterns we can't diagnose from metadata alone?

**If the tail of the distribution is empty** — abuse is theoretical, errors are rare, metadata is enough — leave content logging off permanently. We were right to skip it.

**If the tail is full and metadata isn't enough** — implement Option 2 with the following guardrails:

1. **Hard 500-character cap** on logged content. Truncate with `...` so a single long message can't dump a lot of sensitive text into the log store.
2. **Separate dataset with shorter retention.** Content-bearing events go in a different Axiom dataset (e.g., `bfl-design-chat-content`) with 7-day retention and stricter access. Metadata stays in the 30-day main dataset.
3. **Never log bot replies in full.** On `chat.error`, log the user's last message (because that's what caused the error) but not the partial bot reply — we already know the reply was broken, we need the input.
4. **Pre-log PII scrubbing.** Run content through a regex pass that replaces email addresses, phone numbers, and credit card patterns with tokens like `[EMAIL]`, `[PHONE]`, `[CC]` before anything hits `audit()`. Not bulletproof, but catches the easy cases.
5. **Privacy policy update.** Add a plain-language section: "If you attempt to bypass our safety systems or cause an error, the message you sent may be recorded for up to 7 days so we can investigate and fix the issue. Normal conversations are never recorded."
6. **Never touch `chat.request` or `chat.success` events.** Make this a hard rule enforced at the `audit()` wrapper layer, not a convention that's easy to forget. Successful normal conversations are sacred.

### What we decided NOT to do

- **Log everything with short retention (Option 3).** The asymmetry between attacker privacy expectations and legitimate visitor privacy expectations is real and worth preserving. Logging normal conversations treats everyone like a suspect.
- **Sample 1% (Option 4).** The math doesn't work: by the time something interesting happens, it's almost certainly not in your 1% sample. Random sampling is useful for quality metrics at scale (thousands of conversations per day); we're not at that scale and unlikely to be for a while.
- **Log bot outputs.** Even on errors, the bot's output is either (a) already visible to the visitor so logging is redundant or (b) problematic, in which case the useful diagnostic is the *input* that caused the bad output, not the output itself.
- **Log to stdout.** Anything in `console.log` is visible to anyone with Vercel project access. If content logging happens later, it goes directly to Axiom via a non-stdout path with access controls, not through the general log stream.

### The meta-lesson

This is the third time in this document we've arrived at the same underlying principle from a different angle. The context window decision was "don't over-engineer for a problem you haven't measured." The visual handoff decision was "invest in the moments users skim past because those moments compound." The content logging decision is "privacy by default, visibility when proven necessary."

All three are versions of:

> **Default to the restrained option. Let real data, not speculation, unlock the expansive one.**

It's tempting — especially when you're alone with a codebase and no one is pushing back — to add the sophisticated version of every feature because you *could*. The right posture for a solo-maintained product is the opposite: ship the simplest thing that works, instrument it so you can see whether the simple thing is enough, and only add complexity when the instrumentation tells you to.

Context windows: 25-turn slice, add summarization only if needed. Animation: bubble-shaped typing indicator, add token streaming only if needed. Logging: metadata only, add content logging only if needed.

Three different axes, one consistent answer. That's not accidental — it's the only sustainable operating mode for a solo product that wants to stay defensible without becoming a second full-time job to maintain.

