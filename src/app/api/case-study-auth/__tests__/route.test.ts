// Case-study-auth route tests
// Globals (describe, it, expect, vi) provided by Vitest globals config

// Mock next/headers — cookies() must return an object with a set() method.
// We create a stable mockCookieStore so we can assert on .set() calls.
const mockCookieSet = vi.fn();
const mockCookieStore = { set: mockCookieSet };

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}));

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return { ...actual, NextRequest: Request };
});

vi.mock('@/lib/rateLimit', () => ({
  contactRateLimit: null,
  authRateLimit: null, // null = no Upstash, skip rate limiting in tests
  getClientIp: () => '127.0.0.1',
}));

function createRequest(body: object, ip = '127.0.0.1') {
  return new Request('http://localhost/api/case-study-auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/case-study-auth', () => {
  let POST: (req: Request) => Promise<Response>;

  beforeAll(async () => {
    ({ POST } = await import('../route'));
  });

  beforeEach(() => {
    mockCookieSet.mockClear();
    process.env.CASE_STUDY_PASSWORD = 'correct-password';
    process.env.CASE_STUDY_SESSION_SECRET = 'test-secret-do-not-use-in-prod';
  });

  afterEach(() => {
    delete process.env.CASE_STUDY_PASSWORD;
    delete process.env.CASE_STUDY_SESSION_SECRET;
  });

  it('returns 200 and success:true with correct password', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' })
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('sets the cs_session cookie to a signed token on successful auth', async () => {
    await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' })
    );
    expect(mockCookieSet).toHaveBeenCalledTimes(1);
    const [name, value, opts] = mockCookieSet.mock.calls[0];
    expect(name).toBe('cs_session');
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
    // Signed-token format: `{payloadB64}.{sigB64}` — at least one dot.
    expect(value).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    expect(value).not.toBe('authenticated');
    expect(opts).toEqual(expect.objectContaining({ httpOnly: true, path: '/' }));
  });

  it('produces different cookie values across successive successful auths', async () => {
    await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' })
    );
    await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' })
    );
    expect(mockCookieSet).toHaveBeenCalledTimes(2);
    const firstValue = mockCookieSet.mock.calls[0][1];
    const secondValue = mockCookieSet.mock.calls[1][1];
    expect(firstValue).not.toBe(secondValue);
  });

  it('returns 500 when CASE_STUDY_SESSION_SECRET is unset', async () => {
    delete process.env.CASE_STUDY_SESSION_SECRET;
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' })
    );
    expect(res.status).toBe(500);
    expect(mockCookieSet).not.toHaveBeenCalled();
  });

  it('returns 401 with wrong password', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'wrong-password' })
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('returns 401 when CASE_STUDY_PASSWORD env var is not set', async () => {
    delete process.env.CASE_STUDY_PASSWORD;
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'anything' })
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('returns 401 with missing password field', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com' })
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('succeeds when only password is provided (email is not validated)', async () => {
    const res = await POST(
      createRequest({ password: 'correct-password' })
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('enforces ~500ms delay on failed auth', async () => {
    const start = Date.now();
    await POST(
      createRequest({ email: 'user@example.com', password: 'wrong' })
    );
    const elapsed = Date.now() - start;
    // Allow 450ms lower bound for timing variance
    expect(elapsed).toBeGreaterThanOrEqual(450);
  });
});
