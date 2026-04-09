# Operational Runbooks

This directory holds operational runbooks for running bfl-design in production. These are step-by-step procedures for the site owner — not architectural docs (see `docs/specs/` and `docs/case-studies/` for those) and not planning documents (see `docs/plans/`).

Each runbook assumes production access to Vercel, GitHub, and any third-party services referenced.

## Runbooks

- [`gemini-billing-setup.md`](./gemini-billing-setup.md) — Gemini API billing account, auto-reload, budget alerts, and key rotation for Raybot.
- [`log-drain-setup.md`](./log-drain-setup.md) — Wire Raybot audit events into Axiom for long-term retention, querying, and alerting.
- [`session-secret-rotation.md`](./session-secret-rotation.md) — Rotate the HMAC secret that signs case-study session cookies.
