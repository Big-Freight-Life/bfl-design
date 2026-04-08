import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authRateLimit, getClientIp } from '@/lib/rateLimit';
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/caseStudySession';

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

  const { password } = await req.json();

  const validPassword = process.env.CASE_STUDY_PASSWORD;
  if (!validPassword || password !== validPassword) {
    // Artificial delay on failed auth to slow brute-force attempts
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  let token: string;
  try {
    token = await createSessionToken();
  } catch {
    // Secret misconfigured — fail closed rather than minting an insecure token.
    return NextResponse.json(
      { error: 'Server misconfigured' },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
