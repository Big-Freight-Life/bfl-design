/**
 * Audit logging for chat interactions.
 *
 * Structured JSON logs to stdout (Vercel picks these up). Anonymizes IPs
 * via SHA-256 hash so we get a stable identifier for forensics without
 * storing raw PII.
 *
 * Each log entry includes: timestamp, anonymized IP, event type, lengths,
 * outcome, and optional metadata (e.g., injection pattern that triggered).
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
}

function anonymizeIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 12);
}

export function audit(event: AuditEvent, fields: AuditFields = {}): void {
  const entry: Record<string, unknown> = {
    ts: new Date().toISOString(),
    event,
    ...fields,
  };
  if (fields.ip) {
    entry.ip = anonymizeIp(fields.ip);
  }
  // Single-line JSON for log aggregator parseability
  console.log(`[audit] ${JSON.stringify(entry)}`);
}
