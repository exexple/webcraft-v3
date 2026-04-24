import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except the login page itself
  // We allow /admin (login page) but protect /admin/dashboard, /admin/leads, etc.
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const token = request.cookies.get('wc_admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      // Verify token with gateway server-side to prevent "client-only" protection bypass
      const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:4000/api';
      const response = await fetch(`${gatewayUrl}/auth/verify`, {
        headers: {
          Cookie: `wc_admin_token=${token}`,
        },
      });

      if (!response.ok) {
        const redirectRes = NextResponse.redirect(new URL('/admin', request.url));
        // Clear the invalid cookie
        redirectRes.cookies.delete('wc_admin_token');
        return redirectRes;
      }
    } catch (err) {
      // If gateway is unreachable, redirect to login as a safe default
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
