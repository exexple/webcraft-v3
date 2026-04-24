import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('wc_admin_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:4000/api';

  try {
    const gwRes = await fetch(`${gatewayUrl}/auth/verify`, {
      headers: { Cookie: `wc_admin_token=${token}` },
    });

    if (!gwRes.ok) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const data = await gwRes.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, error: 'Gateway unreachable' }, { status: 503 });
  }
}
