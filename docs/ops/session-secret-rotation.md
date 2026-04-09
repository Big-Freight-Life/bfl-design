# Case Study Session Secret Rotation Runbook

Operational SOP for rotating `CASE_STUDY_SESSION_SECRET`.

## 1. What this secret is and why it matters

`CASE_STUDY_SESSION_SECRET` is the HMAC key used to sign and verify the
case-study session cookie that gates `/works/case-studies`. When a visitor
enters the correct case-study password, the server issues a signed cookie
using this secret. On subsequent requests, the proxy verifies the cookie
signature against the same secret.

Implications:

- Anyone with the secret can forge a valid session cookie and bypass the
  password gate.
- Rotating the secret immediately invalidates **all existing sessions** —
  every current viewer of the case studies will be logged out and will need
  to re-enter the password.
- The secret must be a high-entropy random value, never a human-picked
  string.

## 2. When to rotate

### Planned rotation
- Every **6–12 months** as basic hygiene.
- During a scheduled security review.

### Unplanned rotation (required)
- Suspected leak of the secret value.
- A team member with access to Vercel env vars is leaving the team.
- After any security incident involving the Vercel account, GitHub
  repository, or an admin machine.
- Any time the secret value has been written to a place that might be
  logged, indexed, or archived: chat transcripts, support tickets, issue
  comments, commit history, screenshots, screen recordings, email.
- After a dependency compromise that could have exfiltrated env vars.

## 3. Pre-rotation checklist

- [ ] Notify anyone who might be actively viewing case studies — they will
      be logged out and need to re-authenticate.
- [ ] Confirm the current secret value is stored in the team password
      manager and you can access it (you need it for rollback).
- [ ] Confirm you have access to Vercel with permission to edit environment
      variables on the `bfl-design` project.
- [ ] Confirm you have the case-study password available to test login
      after rotation.
- [ ] Have your password manager open and ready to create a new entry.

## 4. Rotation procedure

### Step 1: Generate a new secret

Run this in **your own local terminal** (never in a shared terminal,
screen share, or recording session):

```bash
openssl rand -hex 32
```

This outputs a 64-character hex string. That is your new secret.

**Do not** paste it into chat, docs, tickets, or commit messages.

### Step 2: Store the new value in the password manager

- Open the team password manager.
- Create a **new entry** (do not overwrite the old one yet).
- Title: `BFL Design — CASE_STUDY_SESSION_SECRET — <YYYY-MM-DD>`
- Paste the new secret into the password field.
- Save.

Keeping the old value around until you confirm the new one works is what
lets you roll back in under a minute.

### Step 3: Update Vercel — Production

1. Visit https://vercel.com/ → `bfl-design` project → Settings →
   Environment Variables.
2. Find `CASE_STUDY_SESSION_SECRET`.
3. Click the three-dot menu → Edit.
4. Replace the value with `<new-secret>` (the value you generated).
5. Ensure **Production** is checked.
6. Save.

### Step 4: Update Vercel — Preview

Repeat Step 3 for the **Preview** environment. You may use the same value
or a different one — same value is simpler.

### Step 5: Update Vercel — Development

Repeat Step 3 for the **Development** environment.

### Step 6: Trigger a redeploy

1. Vercel → `bfl-design` → Deployments.
2. Click the latest Production deployment → three-dot menu → Redeploy.
3. Leave "Use existing build cache" unchecked to guarantee the new env is
   picked up.
4. Wait for status to become **Ready** (typically 1–3 minutes).

### Step 7: Test

1. Open an **incognito window**.
2. Visit https://bfl.design/works/case-studies.
3. You should see the password gate (not a 500 error, not an auto-redirect
   loop).
4. Enter the case-study password.
5. Confirm you land on the case studies page.
6. Open DevTools → Application → Cookies → `bfl.design` and confirm a new
   session cookie is set.

### Step 8: Update local `.env.local` (if applicable)

If you run the site locally and use the case-study gate in dev, open
`/Users/raybutler/development/bfl-design/.env.local` and replace the
`CASE_STUDY_SESSION_SECRET` value with `<new-secret>`.

Restart `npm run dev`.

### Step 9: Retire the old value

- Leave the old password-manager entry in place for **24 hours** after
  confirmed rotation.
- After 24 hours of normal operation, delete the old entry from the
  password manager.

## 5. Emergency rotation (secret leaked)

If you have reason to believe the current secret is compromised, execute
the full rotation procedure above with the following modifications:

- **Target time: under 15 minutes** from detection to new secret live in
  Production.
- **Skip the 24-hour hold** on the old value. Delete it from the password
  manager as soon as the new one is confirmed live.
- **Audit the Vercel env var access log** (Vercel → Settings → Audit Log,
  filter on Environment Variables) to look for unexpected reads or edits.
- After the fact, file a short incident note capturing: when you noticed,
  how it leaked, when it was rotated, what other secrets may have been
  exposed by the same route.

## 6. Verification

Post-rotation smoke test, performed from a clean browser:

- [ ] Visit `https://bfl.design/works/case-studies` in incognito. You see
      the login gate, not a 500 error, not a redirect loop.
- [ ] Log in with the case-study password. You land on the case studies.
- [ ] Open DevTools → Application → Cookies → `bfl.design`. A session
      cookie is present.
- [ ] In a second incognito window, try to reuse a copy of an old session
      cookie value (captured pre-rotation). It should be rejected and the
      login gate should appear.
- [ ] Check Vercel Runtime Logs for the past few minutes — no
      `caseStudySession.verify` errors at elevated volume.

## 7. Rollback

If the new secret causes issues (almost always this means a malformed
value was pasted — stray whitespace, truncated copy, wrong entry):

1. Vercel → `bfl-design` → Settings → Environment Variables.
2. Edit `CASE_STUDY_SESSION_SECRET` and paste the **old value** back from
   the password manager.
3. Redeploy the latest Production deployment.
4. Confirm the gate works with the old password again.
5. Investigate what went wrong with the new value before re-attempting.

Because the old value is still in the password manager (per Step 9),
rollback should take 2–3 minutes.

## 8. Who has access

Anyone with edit access to Vercel env vars on the `bfl-design` project can
read and change this secret. Keep this list current.

| Name | Role | Vercel access | Password manager access |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

When someone is removed from this list:
- Remove their Vercel access first.
- Then rotate the secret per Section 5 (treat as potential exposure).
- Then remove their password manager access.
