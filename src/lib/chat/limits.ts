/**
 * Chat-specific abuse and cost guards.
 *
 * - Per-IP daily lead capture cap (server-side, regardless of model behavior)
 * - Daily request budget kill switch (hard cap on total chat API calls per day)
 *
 * These work in addition to the burst rate limit in @/lib/rateLimit.ts.
 * The burst limit handles short-term spikes; these handle abuse at scale.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;

/**
 * Per-IP lead capture limit: 3 successful captures per 24 hours.
 * This is enforced regardless of what the model decides — even if a
 * malicious user prompt-injects the bot into capturing 50 leads, the
 * server will only let 3 through per IP.
 */
export const leadCaptureLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 d'),
      prefix: 'ratelimit:lead-capture',
      analytics: false,
    })
  : null;

/**
 * Daily global request budget. Hard cap on total chat API calls across
 * all users per day. When exceeded, the API returns a graceful "taking
 * a break" message instead of calling the model.
 *
 * Default 1000/day. Override with env CHAT_DAILY_REQUEST_LIMIT.
 */
const DEFAULT_DAILY_LIMIT = 1000;

export interface BudgetCheck {
  ok: boolean;
  used: number;
  limit: number;
}

function todayKey(): string {
  // YYYY-MM-DD in UTC so the reset time is consistent globally
  const d = new Date();
  return `chat:daily-requests:${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function dailyLimit(): number {
  const env = process.env.CHAT_DAILY_REQUEST_LIMIT;
  if (!env) return DEFAULT_DAILY_LIMIT;
  const parsed = parseInt(env, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_DAILY_LIMIT;
}

/**
 * Atomically increment today's request counter and check if we're over budget.
 * If Redis is not configured, returns ok=true (fail open for dev — but log loud).
 */
export async function checkAndIncrementDailyBudget(): Promise<BudgetCheck> {
  const limit = dailyLimit();
  if (!redis) {
    return { ok: true, used: 0, limit };
  }

  const key = todayKey();
  const used = await redis.incr(key);
  // Set expiry on first increment so the key cleans up naturally
  if (used === 1) {
    await redis.expire(key, 60 * 60 * 25); // 25 hours
  }

  return { ok: used <= limit, used, limit };
}
