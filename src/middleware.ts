import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/works/case-studies')) {
    const session = request.cookies.get('cs_session');
    if (!session || session.value !== 'authenticated') {
      const url = request.nextUrl.clone();
      url.pathname = '/works/case-studies';
      url.searchParams.set('auth', 'required');
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/works/case-studies/:path*'],
};
