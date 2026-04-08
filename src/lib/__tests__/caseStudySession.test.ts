// caseStudySession tests
// Globals (describe, it, expect, beforeEach, afterEach) provided by Vitest.

import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/caseStudySession';

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signPayload(secret: string, payloadB64: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  );
  return toBase64Url(sig);
}

async function craftToken(
  secret: string,
  payload: { sid: string; iat: number; exp: number }
): Promise<string> {
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sigB64 = await signPayload(secret, payloadB64);
  return `${payloadB64}.${sigB64}`;
}

describe('caseStudySession', () => {
  const SECRET = 'test-secret-do-not-use-in-prod';

  beforeEach(() => {
    process.env.CASE_STUDY_SESSION_SECRET = SECRET;
  });

  afterEach(() => {
    delete process.env.CASE_STUDY_SESSION_SECRET;
  });

  it('exports expected constants', () => {
    expect(SESSION_COOKIE_NAME).toBe('cs_session');
    expect(SESSION_MAX_AGE_SECONDS).toBe(60 * 60 * 24 * 7);
  });

  it('round-trips a freshly created token', async () => {
    const token = await createSessionToken();
    expect(typeof token).toBe('string');
    expect(token).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    await expect(verifySessionToken(token)).resolves.toBe(true);
  });

  it('rejects a tampered payload', async () => {
    const token = await createSessionToken();
    const [payloadB64, sigB64] = token.split('.');
    // Flip a character in the payload — signature will no longer match.
    const tampered =
      payloadB64.slice(0, -1) + (payloadB64.slice(-1) === 'A' ? 'B' : 'A') + '.' + sigB64;
    await expect(verifySessionToken(tampered)).resolves.toBe(false);
  });

  it('rejects a tampered signature', async () => {
    const token = await createSessionToken();
    const [payloadB64, sigB64] = token.split('.');
    const tampered =
      payloadB64 + '.' + sigB64.slice(0, -1) + (sigB64.slice(-1) === 'A' ? 'B' : 'A');
    await expect(verifySessionToken(tampered)).resolves.toBe(false);
  });

  it('rejects an expired token', async () => {
    const now = Math.floor(Date.now() / 1000);
    const expired = await craftToken(SECRET, {
      sid: 'fixed-sid',
      iat: now - 1000,
      exp: now - 10,
    });
    await expect(verifySessionToken(expired)).resolves.toBe(false);
  });

  it('accepts a manually-crafted valid token signed with the same secret', async () => {
    const now = Math.floor(Date.now() / 1000);
    const valid = await craftToken(SECRET, {
      sid: 'fixed-sid',
      iat: now,
      exp: now + 60,
    });
    await expect(verifySessionToken(valid)).resolves.toBe(true);
  });

  it('rejects a token signed with a different secret', async () => {
    const now = Math.floor(Date.now() / 1000);
    const foreign = await craftToken('other-secret', {
      sid: 'fixed-sid',
      iat: now,
      exp: now + 60,
    });
    await expect(verifySessionToken(foreign)).resolves.toBe(false);
  });

  it('rejects missing / empty / malformed tokens', async () => {
    await expect(verifySessionToken(undefined)).resolves.toBe(false);
    await expect(verifySessionToken(null)).resolves.toBe(false);
    await expect(verifySessionToken('')).resolves.toBe(false);
    await expect(verifySessionToken('not-a-token')).resolves.toBe(false);
    await expect(verifySessionToken('only.one.extra.dot')).resolves.toBe(false);
  });

  it('fails closed when CASE_STUDY_SESSION_SECRET is unset', async () => {
    // Pre-mint a valid token while the secret IS set.
    const token = await createSessionToken();
    delete process.env.CASE_STUDY_SESSION_SECRET;
    await expect(verifySessionToken(token)).resolves.toBe(false);
  });

  it('throws from createSessionToken when secret is unset', async () => {
    delete process.env.CASE_STUDY_SESSION_SECRET;
    await expect(createSessionToken()).rejects.toThrow();
  });
});
