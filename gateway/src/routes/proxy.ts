// ============================================================
// Proxy Routes — Gateway (FIXED VERSION)
// ============================================================

import type {
  FastifyInstance,
  FastifyRequest,
  FastifyReply
} from 'fastify';

// ENV CONFIG
const CMS_SERVICE_URL = process.env.CMS_SERVICE_URL!;
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL!;
const LEADS_SERVICE_URL = process.env.LEADS_SERVICE_URL!;

// ============================================================
// CORE PROXY FUNCTION (CLEANED)
// ============================================================

async function proxyRequest(
  request: FastifyRequest,
  reply: FastifyReply,
  targetUrl: string
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Forwarded-For': request.ip,
      'X-Request-Id': String(request.id),
    };

    // Forward cookies
    if (request.headers.cookie) {
      headers['cookie'] = request.headers.cookie;
    }

    // Extract token safely
    const cookies = (request as any).cookies || {};
    const token = cookies.wc_admin_token;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const body =
      request.method !== 'GET' && request.method !== 'DELETE'
        ? JSON.stringify(request.body)
        : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    const data = await response.json();

    return reply.status(response.status).send(data);

  } catch (err) {
    console.error('Proxy error:', err);

    const error =
      err instanceof Error ? err.message : 'Service unavailable';

    return reply.status(503).send({
      success: false,
      error,
    });
  }
}

// ============================================================
// ROUTES (FIXED PATH HANDLING)
// ============================================================

export async function proxyRoutes(server: FastifyInstance) {

  // CMS
  server.all('/api/cms/*', (req, reply) => {
    const path = req.url.replace(/^\/api/, '');
    const targetUrl = `${CMS_SERVICE_URL}${path}`;
    return proxyRequest(req, reply, targetUrl);
  });

  // Analytics
  server.all('/api/analytics/*', (req, reply) => {
    const path = req.url.replace(/^\/api/, '');
    const targetUrl = `${ANALYTICS_SERVICE_URL}${path}`;
    return proxyRequest(req, reply, targetUrl);
  });

  // Leads
  server.all('/api/leads/*', (req, reply) => {
    const path = req.url.replace(/^\/api\/leads/, '');
    const targetUrl = `${LEADS_SERVICE_URL}${path}`;
    return proxyRequest(req, reply, targetUrl);
  });
}

// ============================================================
// DEBUG ROUTES
// ============================================================

export async function debugRoutes(server: FastifyInstance) {
  server.get('/debug', async () => {
    return { ok: true };
  });
}

// ============================================================
// KEEP ALIVE (Render free tier)
// ============================================================

export function startKeepAlivePings() {
  setInterval(() => {
    console.log('Keep-alive ping');
  }, 1000 * 60 * 5);
}
