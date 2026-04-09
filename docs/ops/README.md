# Operational Runbooks

This directory holds operational runbooks for running bfl-design in production. These are step-by-step procedures for the site owner — not architectural docs (see `docs/specs/` and `docs/case-studies/` for those) and not planning documents (see `docs/plans/`).

Each runbook assumes production access to Vercel, GitHub, and any third-party services referenced.

## Runbooks

- [`log-drain-setup.md`](./log-drain-setup.md) — Wire Vercel runtime logs into Axiom for long-term retention, querying, and alerting on Raybot audit events.
