/**
 * Case study session token — HMAC-signed, Edge-runtime safe.
 *
 * Uses the Web Crypto API (crypto.subtle) so that this module can be imported
 * from `src/middleware.ts`, which runs on Vercel's Edge runtime where Node's
 * built-in `crypto` is not available.
 *
 * Token format: `{base64url(payload)}.{base64url(hmac)}` where `payload` is
 * `JSON.stringify({ sid, iat, exp })`.
 *
 * Secret policy: `CASE_STUDY_SESSION_SECRET` MUST be set. If it is missing,
 * `createSessionToken` throws and `verifySessionToken` fails closed (returns
 * false). No runtime fallback is generated — that would invalidate tokens on
 * every server restart and silently defeat the purpose.
 */

export const SESSION_COOKIE_NAME = 'cs_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  sid: string;
  iat: number; // issued-at (seconds since epoch)
  exp: number; // expires-at (seconds since epoch)
}

function getSecret(): string | undefined {
  const secret = process.env.CASE_STUDY_SESSION_SECRET;
  if (!secret || secret.length === 0) return undefined;
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const b64 = btoa(binary);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function hmacSign(secret: string, data: string): Promise<Uint8Array> {
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return new Uint8Array(sig);
}

/**
 * Constant-time byte comparison. Returns true iff both arrays have equal
 * length and every byte matches. Edge runtime has no Node `timingSafeEqual`,
 * so we implement a simple XOR-accumulator ourselves.
 */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/**
 * Create a fresh signed session token. Throws if the secret is unset —
 * callers should treat this as a 500 condition (misconfigured deployment).
 */
export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  if (!secret) {
    throw new Error(
      'CASE_STUDY_SESSION_SECRET is not set. Refusing to create a session token.'
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sid: crypto.randomUUID(),
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = toBase64Url(encoder.encode(payloadJson));
  const sigBytes = await hmacSign(secret, payloadB64);
  const sigB64 = toBase64Url(sigBytes);
  return `${payloadB64}.${sigB64}`;
}

/**
 * Verify a signed session token. Fails closed on any error: missing secret,
 * missing/empty token, malformed token, bad signature, or expired payload.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;

  let providedSig: Uint8Array;
  try {
    providedSig = fromBase64Url(sigB64);
  } catch {
    return false;
  }

  let expectedSig: Uint8Array;
  try {
    expectedSig = await hmacSign(secret, payloadB64);
  } catch {
    return false;
  }

  if (!constantTimeEqual(providedSig, expectedSig)) return false;

  let payload: SessionPayload;
  try {
    const payloadBytes = fromBase64Url(payloadB64);
    payload = JSON.parse(decoder.decode(payloadBytes)) as SessionPayload;
  } catch {
    return false;
  }

  if (
    typeof payload.exp !== 'number' ||
    typeof payload.iat !== 'number' ||
    typeof payload.sid !== 'string'
  ) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) return false;

  return true;
}
