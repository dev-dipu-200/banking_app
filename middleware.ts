// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('auth_token')?.value;
  const role = req.cookies.get('user_role')?.value;
  const userId = req.cookies.get('user_id')?.value;

  // === Redirect authenticated users away from login page ===
  if (pathname === '/' && token && role) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // === Admin Routes ===
  if (pathname.startsWith('/admin')) {
    if (!token || role !== 'admin') {
      const loginUrl = new URL('/', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // === User Routes ===
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/accounts') ||
    pathname.startsWith('/transaction') ||
    pathname.startsWith('/user')
  ) {
    if (!token) {
      const loginUrl = new URL('/', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // === Let the request continue ===
  // Only set cookies if they don't exist (optional, for edge cases)
  const response = NextResponse.next();

  if (token && !req.cookies.has('auth_token')) {
    response.cookies.set('auth_token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  }
  if (role && !req.cookies.has('user_role')) {
    response.cookies.set('user_role', role, { httpOnly: true, secure: true, sameSite: 'strict' });
  }
  if (userId && !req.cookies.has('user_id')) {
    response.cookies.set('user_id', userId, { httpOnly: true, secure: true, sameSite: 'strict' });
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/dashboard/:path*',
    '/accounts/:path*',
    '/transaction/:path*',
    '/user/:path*',
  ],
};