// Case-study-logout route tests
// Globals (describe, it, expect, vi) provided by Vitest globals config.

const mockCookieSet = vi.fn();
const mockCookieStore = { set: mockCookieSet };

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue(mockCookieStore),
}));

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return { ...actual, NextRequest: Request };
});

describe('POST /api/case-study-logout', () => {
  let POST: () => Promise<Response>;

  beforeAll(async () => {
    ({ POST } = await import('../route'));
  });

  beforeEach(() => {
    mockCookieSet.mockClear();
  });

  it('clears the cs_session cookie and returns success', async () => {
    const res = await POST();
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    expect(mockCookieSet).toHaveBeenCalledTimes(1);
    const [name, value, opts] = mockCookieSet.mock.calls[0];
    expect(name).toBe('cs_session');
    expect(value).toBe('');
    expect(opts).toEqual(
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      })
    );
  });

  it('does not require authentication to call', async () => {
    // Just call it twice with no session context — both should succeed.
    const r1 = await POST();
    const r2 = await POST();
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
  });
});
