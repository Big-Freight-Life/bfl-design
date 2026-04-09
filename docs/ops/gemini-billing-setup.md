# Gemini API Billing Setup and Monitoring Runbook

Operational SOP for the Google AI Studio (Gemini) billing account that
powers Raybot.

## 1. Why this matters

Raybot (the chat assistant embedded on `bfl.design`) calls the Gemini API
for every user message. If the billing
account runs out of credits, Gemini returns auth/quota errors and Raybot
degrades to "The assistant is having trouble right now" messages shown to
real visitors.

Failure mode is **silent by default**: nothing alerts us unless we
explicitly configure budget alerts and auto-reload. This runbook exists so
Raybot does not silently die between checkups.

Current state (as of setup):
- Google Cloud project: **Low Ox App**
- Plan: Gemini paid **Tier 1**
- Starting credits: **$50**
- Auto-reload: **off** (see Section 3 to turn it on)

## 2. Initial setup (for future reference / onboarding)

These steps are for the first time a new Google account owns the Gemini
key for this project, or when creating a fresh project. They have already
been performed for the current `Low Ox App` project — this section is
documentation, not a task list.

1. Sign in to Google AI Studio: https://aistudio.google.com/apikey.
2. Create or select a project. The current project is **Low Ox App** —
   reuse this project unless you have a specific reason to split.
3. Link a billing account (Google Cloud Billing). If none exists, create
   one and attach a payment method.
4. In AI Studio, create an API key scoped to the project.
5. Copy the key once — AI Studio will not show it again. Do **not** echo
   the key value into any documentation, chat, or ticket.
6. Add the key to Vercel as `GEMINI_API_KEY`:
   - Vercel → `bfl-design` project → Settings → Environment Variables.
   - Name: `GEMINI_API_KEY`
   - Value: `<gemini-api-key>`
   - Environments: **Production**, **Preview**, and **Development** (all
     three).
   - Save.
7. Store the key in the team password manager under
   `BFL Design — GEMINI_API_KEY — <YYYY-MM-DD>`.
8. Verify starting credits were applied at
   https://aistudio.google.com/billing.
9. Redeploy `bfl-design` and test Raybot end-to-end.

## 3. Set up auto-reload (do this now)

Auto-reload guarantees Raybot keeps working when credits get low, while
capping worst-case spend.

1. Visit https://aistudio.google.com/billing.
2. Find the **Credit balance** card.
3. Click **Set up auto-reload**.
4. Configure:

   | Setting | Value | Why |
   | --- | --- | --- |
   | Reload when balance drops below | **$5** | Gives a buffer large enough to survive a few hours of traffic while reload processes. |
   | Reload amount | **$20** | Small enough that any single abuse incident can drain at most $20 before the next throttle point. Large enough that you are not reloading daily under normal traffic. |
   | Max reload per month | **$60** | Hard cap. Three reloads a month. Hitting this means something is wrong — either real growth (investigate and raise the cap deliberately) or abuse (investigate and tighten rate limits). Manual intervention required to exceed. |

5. Save.
6. Confirm the Credit balance card now shows auto-reload **enabled** with
   the values above.

## 4. Set up budget alerts

Budget alerts are **separate from** auto-reload. Auto-reload keeps the
service running. Budget alerts tell you when it is running more than
expected. You want both.

1. Go to https://console.cloud.google.com.
2. Select the `Low Ox App` project.
3. Navigate to **Billing → Budgets & alerts → Create Budget**.
4. Configure:
   - **Name:** `Gemini API — Raybot`
   - **Scope:** the project (`Low Ox App`). If Google offers a narrower
     per-service scope, select Gemini / Generative Language API
     specifically.
   - **Amount:** `$30` per month.
   - **Alert thresholds:** 50%, 80%, 100% of the budget.
   - **Notification email:** Ray's email (the primary owner of the
     project).
5. Save.
6. Send a test alert (if the dashboard offers one) to confirm delivery.

This budget is intentionally lower than the auto-reload cap ($30 vs $60)
so you get warnings before you hit the hard ceiling. It is both:

- A **safety net** — if something is burning credits, you find out at 50%
  of $30 (= $15), not when Raybot dies.
- A **monitoring signal** — consistent spend approaching the cap means
  Raybot traffic is growing. That is a business signal worth
  investigating, not just an ops number.

## 5. Monitoring normal spend

Baseline numbers for what "normal" looks like right now:

- **Model:** Gemini 2.5 Flash (`gemini-2.5-flash`)
- **Approximate pricing** (verify current values at
  https://ai.google.dev/pricing before making decisions):
  - Input: ~$0.075 per 1M tokens
  - Output: ~$0.30 per 1M tokens
- **Average Raybot message:** ~500 input tokens + ~200 output tokens
- **Per-message cost:** roughly $0.0001 (one hundredth of a cent)
- **Current traffic:** low, monthly spend well under $5

Heuristics:

- Monthly spend **< $5**: normal, no action.
- Monthly spend **$5–$10**: check if there has been a real traffic
  increase (new blog post, shared link, etc.). If the traffic growth is
  real and organic, this is good news.
- Monthly spend **> $10 with no clear cause**: investigate. Likely
  candidates are bot traffic bypassing rate limits, a runaway conversation
  loop, or a tool that is producing very long outputs.
- Monthly spend **approaching the $30 budget cap**: stop and investigate
  before raising any limits.

## 6. Triage: "assistant is having trouble" errors

When Raybot returns the generic error message to users, walk this
checklist in order:

1. **Check credit balance** at https://aistudio.google.com/billing.
   - If the balance is at or near zero and auto-reload did not fire, the
     payment method may have declined. Top up manually as a temporary fix
     and then investigate the payment method.
2. **Check Vercel Runtime Logs** for the `bfl-design` project. Look for
   `chat.error` events in the last 15 minutes. The actual provider error
   message is what you want — auth failure, quota exceeded, 429 rate
   limit, 500 provider error, etc.
3. **Check Axiom** (if the log drain is configured — see
   `log-drain-setup.md`). Search for recent error spikes on the chat
   route.
4. **Check Google status** at https://status.google.com for Gemini API or
   Generative Language API outages.
5. **If credit is low**: top up manually via
   https://aistudio.google.com/billing to restore service immediately.
   Then investigate **why** the auto-reload did not cover it (payment
   method, cap already hit, etc.).
6. **If there is a Google outage**: nothing to do but wait. Consider
   posting a brief note on the site or on social if the outage is long.
7. **If the error is neither credit nor outage**: dig into the provider
   error text from the logs and escalate to the chat stack owner.

## 7. Rotating the Gemini API key

High-level procedure. Do this on a planned cadence (every 6–12 months) or
immediately on suspected leak.

1. In AI Studio (https://aistudio.google.com/apikey), create a **new** API
   key in the same project.
2. Copy the new key once. Do not paste it into docs or chat.
3. Update Vercel env var `GEMINI_API_KEY` in **Production**, **Preview**,
   and **Development** to `<new-gemini-api-key>`.
4. Trigger a redeploy of the latest Production deployment.
5. Wait for status **Ready** and smoke-test Raybot with a real message.
6. Once confirmed working, **delete the old key** from AI Studio.
7. Update the team password manager: create a new entry for the new key
   and archive/delete the old entry after 24 hours of confirmed operation.

On suspected leak: skip the 24-hour archive window, delete the old key
from AI Studio immediately after the new one is live, and audit the
Vercel env var access log.
