/**
 * Lead capture idempotency.
 *
 * Prevents the same lead from triggering multiple emails — whether due to
 * a model retry, a frontend refresh, or an attacker spamming the same email
 * from many IPs.
 *
 * Strategy: when we capture a lead, store a SHA-256 hash of the email in
 * Redis with a 24-hour TTL. On the next capture attempt, check the hash
 * first. If it exists, treat the capture as a successful no-op.
 */

import { createHash } from 'crypto';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;

const TTL_SECONDS = 60 * 60 * 24; // 24 hours

function emailKey(email: string): string {
  const hash = createHash('sha256').update(email.toLowerCase()).digest('hex');
  return `lead:dedupe:${hash.slice(0, 32)}`;
}

/**
 * Check if this email has already been captured recently.
 * Returns true if it's a duplicate (caller should skip sending).
 *
 * If Redis is not configured, returns false (fail open — better to send
 * a duplicate email than miss a lead).
 */
export async function isDuplicateLead(email: string): Promise<boolean> {
  if (!redis) return false;
  try {
    const key = emailKey(email);
    const existing = await redis.get(key);
    return existing !== null;
  } catch {
    return false;
  }
}

/**
 * Mark this email as captured. TTL expires after 24 hours.
 */
export async function markLeadCaptured(email: string): Promise<void> {
  if (!redis) return;
  try {
    const key = emailKey(email);
    await redis.set(key, '1', { ex: TTL_SECONDS });
  } catch {
    // Best effort — don't break the capture if Redis hiccups
  }
}
