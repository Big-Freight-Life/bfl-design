/**
 * Audit logging for chat interactions.
 *
 * Structured JSON logs to stdout (Vercel picks these up, and an external
 * log drain such as Axiom ingests from there). Anonymizes IPs via SHA-256
 * hash so we get a stable identifier for forensics without storing raw PII.
 *
 * Each log entry is a single line of JSON containing:
 *   ts        ISO 8601 timestamp
 *   event     event name (e.g. "chat.blocked.injection")
 *   severity  derived from event name ("info" | "warn" | "error")
 *   source    constant "raybot" — distinguishes these logs from other
 *             services in a shared log drain
 *   ...data   caller-supplied fields
 *
 * The function signature is stable: audit(event, data) behaves identically
 * from the caller's perspective regardless of the enrichment applied here.
 * See docs/ops/log-drain-setup.md for how to wire these up to Axiom.
 */

import { createHash } from 'crypto';

export type AuditEvent =
  | 'chat.request'
  | 'chat.blocked.origin'
  | 'chat.blocked.rate-limit'
  | 'chat.blocked.budget'
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

    // Single-line JSON — Vercel Log Drain line-delimited JSON parsing
    // depends on there being exactly one log entry per line.
    console.log(`[audit] ${JSON.stringify(entry)}`);
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
