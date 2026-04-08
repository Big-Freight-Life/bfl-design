import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/caseStudySession';

export async function POST() {
  const cookieStore = await cookies();
  // Overwrite with an empty, immediately-expired cookie. Matching attributes
  // (path, sameSite, httpOnly) ensures browsers replace the existing cookie.
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
