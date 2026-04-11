import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/caseStudySession';

// Public case study pages that don't require authentication
const publicCaseStudies = new Set([
  '/works/case-studies',
  '/works/case-studies/hyland-onbase-salesforce',
  '/works/case-studies/hyland-for-workday',
  '/works/case-studies/salesforce-migration',
  '/works/case-studies/portfolio-ai-world',
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth for public case study pages
  if (publicCaseStudies.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/works/case-studies')) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/works/case-studies';
      url.searchParams.set('auth', 'required');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/works/case-studies/:path*'],
};
