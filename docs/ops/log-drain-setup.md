# Log Drain Setup — Axiom (direct HTTP forwarder)

**Audience:** site owner / operator
**System:** bfl-design (Raybot chat endpoint at `/api/chat`)
**Status:** runbook — follow top to bottom

---

## Important — Vercel plan gate

Vercel's native **Log Drains** feature is gated behind the **Pro plan** ($20/user/month). On the **Hobby plan** the Log Drains settings page is read-only or absent entirely.

This runbook is written for the **free path**: instead of using Vercel's Log Drains, the `audit()` function in `src/lib/chat/audit.ts` forwards events directly to Axiom over HTTPS from inside the serverless function. Same result, no plan upgrade needed.

If you are ever on Pro and prefer the config-only Log Drain route, the alternate setup is documented at the bottom of this file under "Appendix A — Vercel Log Drain path (Pro plan only)".

---

## Why

The chat endpoint at `src/app/api/chat/route.ts` already emits structured audit logs via `audit()` in `src/lib/chat/audit.ts` for every security-relevant event: `chat.request`, `chat.blocked.origin`, `chat.blocked.rate-limit`, `chat.blocked.budget`, `chat.blocked.malformed`, `chat.blocked.length`, `chat.blocked.injection`, `chat.tool.lead-attempt`, `chat.tool.lead-rejected`, `chat.tool.lead-rate-limited`, `chat.tool.lead-duplicate`, `chat.tool.lead-captured`, `chat.error`, and `chat.success`.

Those lines go to stdout and are picked up by Vercel's runtime log viewer. On the Hobby plan, Vercel retains runtime logs for roughly 1 hour. On Pro it is 24 hours. In either case:

- There is no long-term storage. If someone probes Raybot at 03:00 you have no forensic trail by breakfast.
- There is no alerting. Nothing watches the audit stream for spikes in `chat.blocked.injection` or `chat.error`.
- There is no way to build dashboards across days or weeks.

The instrumentation exists; what is missing is somewhere durable to send it and something watching it. This runbook fixes both by wiring the Vercel log drain into Axiom (free tier, 30-day retention, generous ingest allowance).

## What you'll get when this is done

- Every `audit()` event preserved with 30-day retention (free tier) or longer (paid).
- A queryable dashboard covering Raybot traffic, blocked events, and lead captures.
- Email alerts on anomalous rates of `chat.blocked.*` and `chat.error`.
- A forensic trail for any past hour, day, or week — searchable by IP hash, event, severity, or free text.

## Prerequisites

- Owner or admin access to the `bfl-design` project in the Vercel dashboard.
- A GitHub account or email address to sign up for Axiom.
- About 20 minutes.

## Step 1 — Sign up for Axiom

1. Go to https://axiom.co and click **Sign up**. GitHub SSO is the fastest path.
2. Create a workspace. Any name is fine — "bfl" works.
3. Confirm you are on the **free tier**. At time of writing it includes roughly 0.5 TB/month ingest and 30-day retention, which is an order of magnitude more than this site will ever need.
4. In the left sidebar, click **Datasets** then **New dataset**. Name it exactly:

   ```
   bfl-design-chat
   ```

   The name is load-bearing — the Vercel log drain endpoint and the APL queries below all reference it literally.

## Step 2 — Create an Axiom API token

1. In Axiom, go to **Settings** (bottom-left) then **API Tokens**.
2. Click **Create new token**.
3. Name it something like `vercel-log-drain`.
4. Permission: **Ingest only**.
5. Scope: restrict to the `bfl-design-chat` dataset. Do not grant workspace-wide access.
6. Click **Create**. The token is shown **once**. Copy it immediately into your password manager — Axiom will never display it again. If you lose it, revoke and create a new one.

## Step 3 — Set the Axiom env vars in Vercel

The forwarder inside `audit.ts` reads two env vars. When both are set, every audit event is POSTed to Axiom in addition to being written to stdout. When either is missing, the forwarder is a silent no-op and only the stdout log is emitted — same fallback pattern as the Upstash clients.

1. Open the Vercel dashboard and select the **bfl-design** project.
2. Go to **Settings** then **Environment Variables**.
3. Click **Add New**. Fill in:
   - **Key:** `AXIOM_INGEST_URL`
   - **Value:** `https://api.axiom.co/v1/datasets/bfl-design-chat/ingest`
     - Use this exact URL. The dataset name in the path must match what you created in Step 1.
   - **Environments:** check **Production** and **Preview**. Do NOT check **Development** — local logs should stay local.
   - **Type:** Plain text.
4. Save.
5. Click **Add New** again. Fill in:
   - **Key:** `AXIOM_API_TOKEN`
   - **Value:** paste the token from Step 2. **Paste directly from your password manager into this field.** Do not paste it anywhere else, especially not into any chat thread or log.
   - **Environments:** check **Production** and **Preview**.
   - **Type:** **Sensitive** (encrypted) if the option is available.
6. Save.
7. Redeploy to pick up the new env vars: Vercel → Deployments → latest → three-dot menu → **Redeploy**.

## Step 4 — Verify ingestion

1. Open the deployed site and send a chat message through Raybot — anything innocuous like "hi".
2. Wait 30 seconds. Vercel batches log drain delivery.
3. In Axiom, open the `bfl-design-chat` dataset and click the **Stream** tab.
4. Filter by `source == "raybot"`.
5. You should see at least two entries — a `chat.request` followed by `chat.success` — each with the expected fields: `ts`, `event`, `severity`, `source`, and the caller-supplied fields like `messages` and `inputChars`.

If nothing arrives, jump to the Troubleshooting section at the bottom.

## Step 5 — Build starter queries

Axiom uses APL (Axiom Processing Language), a Kusto-like query language. Exact syntax may drift over time — always cross-check against the official reference at https://axiom.co/docs/apl/introduction.

Save these as named queries in Axiom so they are one click away:

**1. Last hour of Raybot events**

```
['bfl-design-chat']
| where source == "raybot"
```

**2. Blocked events in the last 24h, grouped by reason**

```
['bfl-design-chat']
| where event startswith "chat.blocked."
| summarize count() by event
```

**3. Lead capture rate (hourly buckets)**

```
['bfl-design-chat']
| where event == "chat.tool.lead-captured"
| summarize count() by bin(_time, 1h)
```

**4. Error rate (15-minute buckets)**

```
['bfl-design-chat']
| where severity == "error"
| summarize count() by bin(_time, 15m)
```

**5. Top blocked IPs (already hashed by `audit()`)**

```
['bfl-design-chat']
| where event == "chat.blocked.rate-limit"
| summarize count() by ip
| top 10
```

The IPs in these logs are SHA-256 prefixes, not raw addresses, so this is safe to share.

## Step 6 — Set up alerts

In Axiom, go to **Monitors** and create two:

**Monitor 1 — High injection rate**

- Query: `['bfl-design-chat'] | where event == "chat.blocked.injection" | summarize count()`
- Trigger: count greater than 5 in any 15-minute window.
- Notification: email to Ray.

**Monitor 2 — Error spike**

- Query: `['bfl-design-chat'] | where severity == "error" | summarize count()`
- Trigger: count greater than 10 in any 15-minute window.
- Notification: email to Ray, plus Slack webhook if one is available.

Both thresholds are guesses. After a week of baseline traffic, look at p95 counts for each query over a rolling day and tune the thresholds to sit comfortably above normal noise.

## Ongoing — monthly dashboard check

Axiom supports dashboards: pin the five starter queries above into a single dashboard named **Raybot Ops**. Once a week, or at minimum once a month, spend five minutes scanning it for:

- Lead capture rate trending down relative to request count
- Slow climb in `chat.blocked.injection` (indicates a new probe pattern)
- `chat.error` appearing at all — any non-zero count deserves a look
- New IP hashes appearing in the top-10 blocked list

This is the kind of slow-moving issue that alerts will never catch but a five-minute weekly glance will.

## Troubleshooting

**No events arriving in Axiom.**
- Check the log drain status in Vercel → Settings → Log Drains. If it shows **Error**, the last error message will tell you whether the issue is the token, the endpoint URL, or the payload format.
- Verify the dataset name in the endpoint URL matches the dataset name in Axiom exactly — `bfl-design-chat`, lowercase, hyphens.
- Confirm the API token has **Ingest** permission and is scoped to the right dataset.
- Send another test chat request — log drain delivery is driven by new log lines, not by polling.

**Events arriving but no `source` field.**
- The `audit.ts` change enriching logs with `source: "raybot"` has not been deployed yet. Check the commit is on `master` and Vercel has rebuilt production.

**Too many alerts, or alert fatigue.**
- Increase the monitor thresholds. Start by doubling, then tune from there.
- Consider tightening the query window (5 min instead of 15 min) if you want fewer but more specific alerts.

**Timestamps look wrong.**
- Axiom stores and queries in UTC by default. The `ts` field emitted by `audit()` is ISO 8601 UTC. If the UI is displaying UTC but you expect local time, change the time zone in Axiom user settings — do not change what the audit function emits.

**Log drain shows as delivering but nothing is indexed.**
- The `ingest` endpoint for Axiom expects line-delimited JSON. Double-check the Vercel log drain delivery format is set to JSON, not text. If it is set to text, Vercel wraps every line in its own envelope and Axiom cannot parse the audit payload cleanly.

## Rollback

If anything goes wrong — the forwarder is too chatty, Axiom bills unexpectedly, or the endpoint starts erroring — disable the forwarder by removing either env var:

1. Vercel dashboard → **bfl-design** → **Settings** → **Environment Variables**.
2. Find `AXIOM_INGEST_URL` (or `AXIOM_API_TOKEN`). Click the three-dot menu → **Remove**.
3. Redeploy: Deployments → latest → three-dot menu → **Redeploy**.

The forwarder in `audit.ts` checks for both env vars on every call, so once the redeploy lands the Axiom POSTs stop. The audit logs keep flowing to Vercel's built-in log viewer exactly as they did before. The only thing lost is the external destination. No code changes required to rollback.

To re-enable later, put the env vars back and redeploy.

---

## Appendix A — Vercel Log Drain path (Pro plan only)

If you are on the Vercel Pro plan (or higher) and prefer the config-only Log Drain feature instead of the in-function forwarder, follow this alternate setup. Either path produces identical results in Axiom.

1. Skip the env var work in Step 3 above.
2. Vercel dashboard → **bfl-design** → **Settings** → **Log Drains** → **Add Log Drain**.
3. Source type: **Custom** / **HTTPS**.
4. Endpoint URL: `https://api.axiom.co/v1/datasets/bfl-design-chat/ingest`
5. Delivery format: **JSON** (line-delimited).
6. Custom headers: `Authorization: Bearer <your-axiom-token>` — paste the token from Step 2 directly into the value field, never into chat.
7. Environments: **Production** (and optionally **Preview**).
8. Save. The drain will show as **Active**.

The advantage of this path is that Axiom events continue to flow even if the serverless function exits before the in-function fetch completes (which is rare but theoretically possible on the free path). The disadvantage is the $20/user/month Pro plan cost.

If you adopt this path, you can safely remove the `AXIOM_INGEST_URL` and `AXIOM_API_TOKEN` env vars — or leave them in place, in which case events will be forwarded twice (once by the in-function forwarder, once by the Vercel log drain). Duplication in Axiom is usually undesirable, so pick one path and stick with it.
