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
  });

  afterEach(() => {
    delete process.env.CASE_STUDY_PASSWORD;
  });

  it('returns 200 and success:true with correct password', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' }) as any
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('sets the cs_session cookie on successful auth', async () => {
    await POST(
      createRequest({ email: 'user@example.com', password: 'correct-password' }) as any
    );
    expect(mockCookieSet).toHaveBeenCalledWith(
      'cs_session',
      'authenticated',
      expect.objectContaining({ httpOnly: true })
    );
  });

  it('returns 401 with wrong password', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'wrong-password' }) as any
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('returns 401 when CASE_STUDY_PASSWORD env var is not set', async () => {
    delete process.env.CASE_STUDY_PASSWORD;
    const res = await POST(
      createRequest({ email: 'user@example.com', password: 'anything' }) as any
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('returns 401 with missing password field', async () => {
    const res = await POST(
      createRequest({ email: 'user@example.com' }) as any
    );
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Invalid credentials');
  });

  it('succeeds when only password is provided (email is not validated)', async () => {
    const res = await POST(
      createRequest({ password: 'correct-password' }) as any
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('enforces ~500ms delay on failed auth', async () => {
    const start = Date.now();
    await POST(
      createRequest({ email: 'user@example.com', password: 'wrong' }) as any
    );
    const elapsed = Date.now() - start;
    // Allow 450ms lower bound for timing variance
    expect(elapsed).toBeGreaterThanOrEqual(450);
  });
});
