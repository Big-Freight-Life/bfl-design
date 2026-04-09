/**
 * Audit logging for chat interactions.
 *
 * Structured JSON logs to stdout (Vercel's built-in runtime log viewer
 * picks these up). Anonymizes IPs via SHA-256 hash so we get a stable
 * identifier for forensics without storing raw PII.
 *
 * Optionally forwards every event directly to an Axiom dataset over HTTPS
 * when AXIOM_INGEST_URL and AXIOM_API_TOKEN env vars are set. This lets us
 * get long-term log retention and alerting without paying for Vercel's
 * Pro-plan Log Drain feature — the forwarder runs inside the serverless
 * function itself and POSTs directly to Axiom's ingest endpoint. Fire-and-
 * forget with a hard abort timeout so Axiom outages never block the
 * chat request path or take down the caller.
 *
 * Each log entry is a single line of JSON containing:
 *   ts        ISO 8601 timestamp
 *   event     event name (e.g. "chat.blocked.injection")
 *   severity  derived from event name ("info" | "warn" | "error")
 *   source    constant "raybot" — distinguishes these logs from other
 *             services in a shared dataset
 *   ...data   caller-supplied fields
 *
 * The function signature is stable: audit(event, data) behaves identically
 * from the caller's perspective regardless of the enrichment or forwarding
 * applied here. See docs/ops/log-drain-setup.md for setup.
 */

import { createHash } from 'crypto';

/** Hard cap on how long we'll wait for Axiom to accept an event. */
const AXIOM_TIMEOUT_MS = 3000;

export type AuditEvent =
  | 'chat.request'
  | 'chat.blocked.origin'
  | 'chat.blocked.rate-limit'
  | 'chat.blocked.budget'
  | 'chat.blocked.global-rate'
  | 'chat.blocked.injection'
  | 'chat.blocked.length'
  | 'chat.blocked.malformed'
  | 'chat.tool.lead-attempt'
  | 'chat.tool.lead-validated'
  | 'chat.tool.lead-rejected'
  | 'chat.tool.lead-duplicate'
  | 'chat.tool.lead-rate-limited'
  | 'chat.tool.lead-captured'
  | 'chat.error'
  | 'chat.success';

interface AuditFields {
  ip?: string;
  messages?: number;
  inputChars?: number;
  outputChars?: number;
  pattern?: string;
  reason?: string;
  promptVersion?: string;
  [key: string]: unknown;
}

type Severity = 'info' | 'warn' | 'error';

const SOURCE = 'raybot';

function anonymizeIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 12);
}

function deriveSeverity(event: string): Severity {
  if (event.startsWith('chat.blocked.')) return 'warn';
  if (event === 'chat.error') return 'error';
  return 'info';
}

/**
 * Fire-and-forget forward of an already-enriched entry to Axiom's ingest
 * endpoint. Reads env vars lazily so that tests can stub them between
 * calls via `vi.stubEnv` without needing a module re-import. If either
 * var is missing the function is a no-op — same fallback pattern as
 * the Upstash clients in `src/lib/rateLimit.ts`.
 *
 * Errors are swallowed silently. Axiom being down or the token being
 * revoked MUST NOT break Raybot, and must not recurse back into audit()
 * (which would amplify a failure into a loop).
 */
function forwardToAxiom(entry: Record<string, unknown>): void {
  const url = process.env.AXIOM_INGEST_URL;
  const token = process.env.AXIOM_API_TOKEN;
  if (!url || !token) return;
  if (typeof fetch !== 'function') return;

  try {
    // Axiom ingest accepts a JSON array of events. We send one event per
    // call — batching would require a worker and is overkill for this
    // site's traffic.
    const body = JSON.stringify([entry]);
    void fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
      signal: AbortSignal.timeout(AXIOM_TIMEOUT_MS),
    }).catch(() => {
      // Swallowed — Axiom outages must not affect caller.
    });
  } catch {
    // Swallowed — any synchronous failure (bad URL, etc.) is also muted.
  }
}

export function audit(event: AuditEvent | string, fields: AuditFields = {}): void {
  try {
    // Start from caller-supplied fields so our required fields always win
    // on key collision.
    const entry: Record<string, unknown> = { ...fields };

    // Hash IP before it reaches the log line.
    if (typeof fields.ip === 'string' && fields.ip.length > 0) {
      entry.ip = anonymizeIp(fields.ip);
    }

    // Required fields — these overwrite anything the caller passed with the
    // same key so downstream ingestion can rely on their shape.
    entry.ts = new Date().toISOString();
    entry.event = event;
    entry.severity = deriveSeverity(event);
    entry.source = SOURCE;

    // Lead captures are "info" severity but should flag for alerting.
    if (event === 'chat.tool.lead-captured') {
      entry.audit = true;
    }

    // Single-line JSON — Vercel's runtime log viewer and Axiom both
    // parse one log entry per line. Keeps both destinations consistent.
    console.log(`[audit] ${JSON.stringify(entry)}`);

    // Forward to Axiom if configured. Fire-and-forget.
    forwardToAxiom(entry);
  } catch (err) {
    // Defensive: non-serializable payloads (e.g. circular refs) must never
    // crash the caller. Emit a minimal fallback record instead.
    try {
      const fallback = {
        ts: new Date().toISOString(),
        event,
        severity: deriveSeverity(event),
        source: SOURCE,
        auditError: err instanceof Error ? err.message : String(err),
      };
      console.log(`[audit] ${JSON.stringify(fallback)}`);
    } catch {
      // Give up silently — we will not take down the caller over logging.
    }
  }
}
