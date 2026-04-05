// Contact route tests
// Globals (describe, it, expect, vi) provided by Vitest globals config

// Resend mock — must use a regular function (not arrow) because it's called with `new`
const mockEmailSend = vi.fn().mockResolvedValue({ data: { id: 'mock-email-id' }, error: null });

vi.mock('resend', () => {
  return {
    Resend: function MockResend() {
      return { emails: { send: mockEmailSend } };
    },
  };
});

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return { ...actual, NextRequest: Request };
});

vi.mock('@/lib/rateLimit', () => ({
  contactRateLimit: null, // null = no Upstash, skip rate limiting in tests
  authRateLimit: null,
  getClientIp: () => '127.0.0.1',
}));

function createRequest(body: object, ip = '127.0.0.1') {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: 'Ray Butler',
  email: 'ray@example.com',
  projectType: 'Consulting',
  subject: 'Test subject',
  message: 'Hello, I would like to get in touch.',
};

describe('POST /api/contact', () => {
  let POST: (req: Request) => Promise<Response>;

  beforeAll(async () => {
    ({ POST } = await import('../route'));
  });

  beforeEach(() => {
    mockEmailSend.mockClear();
    mockEmailSend.mockResolvedValue({ data: { id: 'mock-email-id' }, error: null });
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.CONTACT_EMAIL = 'contact@bfl.design';
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
    globalThis.fetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_EMAIL;
    delete process.env.SLACK_WEBHOOK_URL;
  });

  it('returns 200 and success:true on valid submission', async () => {
    const res = await POST(createRequest(validBody) as any);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it('calls Resend with the correct email payload', async () => {
    await POST(createRequest(validBody) as any);
    expect(mockEmailSend).toHaveBeenCalledOnce();
    const arg = mockEmailSend.mock.calls[0][0];
    expect(arg.to).toContain('contact@bfl.design');
    expect(arg.subject).toContain('Test subject');
  });

  it('calls Slack webhook when SLACK_WEBHOOK_URL is set', async () => {
    await POST(createRequest(validBody) as any);
    expect(globalThis.fetch).toHaveBeenCalledOnce();
    expect((globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe(
      'https://hooks.slack.com/test'
    );
  });

  it('does not call Slack webhook when SLACK_WEBHOOK_URL is absent', async () => {
    delete process.env.SLACK_WEBHOOK_URL;
    await POST(createRequest(validBody) as any);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('returns 400 when name is missing', async () => {
    const res = await POST(createRequest({ ...validBody, name: '' }) as any);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toBe('Validation failed');
    expect(json.errors.name).toBeTruthy();
  });

  it('returns 400 when email is missing', async () => {
    const res = await POST(createRequest({ ...validBody, email: '' }) as any);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.errors.email).toBeTruthy();
  });

  it('returns 400 when email has invalid format', async () => {
    const res = await POST(createRequest({ ...validBody, email: 'not-an-email' }) as any);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.errors.email).toMatch(/invalid/i);
  });

  it('returns 400 when message is missing', async () => {
    const res = await POST(createRequest({ ...validBody, message: '' }) as any);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.errors.message).toBeTruthy();
  });

  it('returns 500 when Resend throws', async () => {
    mockEmailSend.mockRejectedValueOnce(new Error('Resend API error'));
    const res = await POST(createRequest(validBody) as any);
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json.error).toBe('Failed to send message');
  });
});
