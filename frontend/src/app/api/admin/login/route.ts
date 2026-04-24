import { NextResponse } from 'next/server';

// Server-only route — proxies login to the gateway and re-issues the
// HttpOnly cookie from the Next.js origin (same origin = no SameSite issues).
export async function POST(request: Request) {
  const body = await request.json();

  const gatewayUrl = process.env.GATEWAY_URL!;

  let gwRes: Response;
  try {
    gwRes = await fetch(`${gatewayUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000), // Fail fast — don't hang the route
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `Gateway unreachable: ${msg}` },
      { status: 503 }
    );
  }

  const data = await gwRes.json();

  if (!gwRes.ok || !data.success) {
    return NextResponse.json(data, { status: gwRes.status });
  }

  const token = data.data?.access_token;
  if (!token) {
    return NextResponse.json(
      { success: false, error: 'No token in gateway response' },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set('wc_admin_token', token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
