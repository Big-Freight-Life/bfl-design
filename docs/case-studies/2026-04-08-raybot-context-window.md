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

