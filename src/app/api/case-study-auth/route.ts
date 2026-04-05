import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (authRateLimit) {
    const { success } = await authRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }
  }

  const { email, password } = await req.json();

  const validPassword = process.env.CASE_STUDY_PASSWORD;
  if (!validPassword || password !== validPassword) {
    // Artificial delay on failed auth to slow brute-force attempts
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('cs_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
