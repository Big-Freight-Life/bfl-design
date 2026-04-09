import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Fallback to in-memory if Upstash env vars not configured
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;

export const contactRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 m'),
      prefix: 'ratelimit:contact',
    })
  : null;

export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      prefix: 'ratelimit:auth',
    })
  : null;

export const chatRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 m'),
      prefix: 'ratelimit:chat',
    })
  : null;

/**
 * Global chat rate limit — a single shared bucket across ALL IPs.
 *
 * The per-IP `chatRateLimit` above can be defeated by a botnet: 100 IPs
 * each sending 19 req/min would total 1900 req/min with none of them
 * tripping the individual cap. This global cap catches that scenario.
 *
 * Set conservatively high so real traffic never hits it, but low enough
 * that a small botnet trips it before burning model budget.
 */
export const globalChatRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(300, '1 m'),
      prefix: 'ratelimit:chat-global',
    })
  : null;

export function getClientIp(request: Request): string {
  // Prefer x-real-ip (set by Vercel from the socket, cannot be spoofed by client)
  // Fall back to last entry in x-forwarded-for (appended by the proxy, not client-controlled)
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',').pop()?.trim() ||
    '127.0.0.1'
  );
}
