// ============================================================
// Proxy Routes — Gateway
// Forwards all /api/* requests to appropriate microservices
// ============================================================

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { fetch } from 'undici';

// Protected routes requiring JWT auth at gateway level
// ========================================================================
// CRITICAL: This list MUST be manually kept in sync with microservice
// endpoints that require authentication. Any authenticated endpoint NOT
// listed here will be publicly exposed.
// ========================================================================
const PROTECTED_PATTERNS = [
  { method: 'GET', pattern: /^\/leads/ },
  { method: 'PATCH', pattern: /^\/leads\// },
  { method: 'GET', pattern: /^\/analytics\/stats/ },
  { method: 'POST', pattern: /^\/cms\/content/ },
  { method: 'PATCH', pattern: /^\/cms\/content\// },
  { method: 'DELETE', pattern: /^\/cms\/content\// },
  { method: 'POST', pattern: /^\/cms\/case-studies/ },
  { method: 'PATCH', pattern: /^\/cms\/case-studies\// },
  { method: 'DELETE', pattern: /^\/cms\/case-studies\// },
  { method: 'POST', pattern: /^\/cms\/testimonials/ },
  { method: 'PATCH', pattern: /^\/cms\/testimonials\// },
  { method: 'DELETE', pattern: /^\/cms\/testimonials\// },
  { method: 'POST', pattern: /^\/cms\/metrics/ },
  { method: 'PATCH', pattern: /^\/cms\/metrics\// },
  { method: 'DELETE', pattern: /^\/cms\/metrics\// },
];

const SERVICE_MAP: Record<string, string> = {
  leads: process.env.LEADS_SERVICE_URL ?? 'http://localhost:4001',
  analytics: process.env.ANALYTICS_SERVICE_URL ?? 'http://localhost:4002',
  cms: process.env.CMS_SERVICE_URL ?? 'http://localhost:4003',
};

// ── Route resolver ──────────────────────────────────────────────
// CRITICAL: We must strip the query string BEFORE splitting the path
// to extract the service name. Otherwise /leads?page=1 is treated
// as a service key "leads?page=1" which doesn't exist in SERVICE_MAP.
// We then re-attach the query string to the service path so pagination
// and filtering are preserved end-to-end.
function resolveService(fullPath: string): { serviceUrl: string; servicePath: string } | null {
  // Separate path and query string
  const qIdx = fullPath.indexOf('?');
  const pathOnly = qIdx !== -1 ? fullPath.slice(0, qIdx) : fullPath;
  const queryString = qIdx !== -1 ? fullPath.slice(qIdx) : ''; // includes the leading '?'

  // pathOnly = '/leads' or '/leads/abc-123' or '/cms/case-studies'
  const [, service, ...rest] = pathOnly.split('/');
  const serviceUrl = SERVICE_MAP[service];
  if (!serviceUrl) return null;

  // Reconstruct the downstream path and re-attach query string
  const downstreamPath = '/' + rest.join('/');
  const servicePath = downstreamPath + queryString;

  return { serviceUrl, servicePath };
}

function isProtectedRoute(method: string, pathOnly: string): boolean {
  return PROTECTED_PATTERNS.some(
    (p) => p.method === method && p.pattern.test(pathOnly)
  );
}

async function proxyRequest(
  request: FastifyRequest,
  reply: FastifyReply,
  targetUrl: string
) {
  try {
    const headers: Record<string, string> = {
      'X-Forwarded-For': request.ip,
      'X-Request-Id': String(request.id),
    };

    if (request.headers['content-type']) {
      headers['Content-Type'] = request.headers['content-type'];
    }
    // Forward auth header if present
    if (request.headers.authorization) {
      headers['Authorization'] = request.headers.authorization;
    }

    const body =
      request.body ? JSON.stringify(request.body) : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    // Forward headers from service response
    response.headers.forEach((value, key) => {
      // Avoid setting headers that are controlled by Fastify
      if (key.toLowerCase() !== 'transfer-encoding' && key.toLowerCase() !== 'connection') {
        reply.header(key, value);
      }
    });

    return reply.status(response.status).send(response.body);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Service unavailable';
    return reply.status(503).send({ success: false, error });
  }
}

// ── Keep-alive pinger ───────────────────────────────────────────
// Render free-tier services spin down after ~15 min of inactivity.
// This pings every service's /health endpoint every 14 minutes to
// prevent cold starts from affecting real user traffic.
export function startKeepAlivePings() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping keep-alive pings in development mode.');
    return;
  }

  const targets = Object.values(SERVICE_MAP).map((url) => `${url}/health`);
  const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

  const pingServices = async () => {
    for (const url of targets) {
      try {
        await fetch(url, { method: 'GET' });
      } catch {
        // Silently ignore — service may be starting up
      }
    }
    setTimeout(pingServices, INTERVAL_MS); // Schedule next ping
  };

  pingServices(); // Start the first ping
}

export async function proxyRoutes(server: FastifyInstance) {
  // Catch-all proxy handler for /api/leads/*, /api/analytics/*, /api/cms/*
  server.all<{ Params: { '*': string } }>(
    '/*',
    {
      preHandler: async (request, reply) => {
        // Strip query string before checking protection rules
        const fullPath = request.url.replace('/api', '');
        const qIdx = fullPath.indexOf('?');
        const pathOnly = qIdx !== -1 ? fullPath.slice(0, qIdx) : fullPath;
        const method = request.method.toUpperCase();

        if (isProtectedRoute(method, pathOnly)) {
          try {
            await request.jwtVerify();
          } catch {
            return reply.status(401).send({
              success: false,
              error: 'Unauthorized — valid JWT required',
            });
          }
        }
      },
    },
    async (request, reply) => {
      // Strip the /api prefix, pass the full path including query string
      const fullPath = request.url.replace(/^\/api/, '');
      const resolved = resolveService(fullPath);

      if (!resolved) {
        return reply.status(404).send({
          success: false,
          error: `No service mapped for route: ${fullPath}`,
        });
      }

      const { serviceUrl, servicePath } = resolved;
      const targetUrl = `${serviceUrl}${servicePath || '/'}`;

      return proxyRequest(request, reply, targetUrl);
    }
  );
}

// ── Debug health aggregator ──────────────────────────────────────
// GET /api/debug — requires JWT, returns health status of all services.
// Use this to diagnose production failures without needing Render log access.
// Example: curl -H "Authorization: Bearer <token>" https://wc-gateway.onrender.com/api/debug
export async function debugRoutes(server: FastifyInstance) {
  server.get(
    '/debug',
    {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply.status(401).send({ success: false, error: 'Unauthorized' });
        }
      },
    },
    async (_request, reply) => {
      const services = [
        { name: 'leads', url: SERVICE_MAP.leads },
        { name: 'analytics', url: SERVICE_MAP.analytics },
        { name: 'cms', url: SERVICE_MAP.cms },
      ];

      const results = await Promise.allSettled(
        services.map(async ({ name, url }) => {
          const start = Date.now();
          try {
            const res = await fetch(`${url}/health`, {
              method: 'GET',
              signal: AbortSignal.timeout(8000),
            });
            const data = await res.json();
            return { name, status: 'ok', latencyMs: Date.now() - start, details: data };
          } catch (err) {
            const isTimeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
            return {
              name,
              status: isTimeout ? 'timeout' : 'error',
              latencyMs: Date.now() - start,
              error: isTimeout ? 'Request timed out after 8s' : 'Service unreachable or returned non-JSON response.',
            };
          }
        })
      );

      const report = results.map((r) => {
        if (r.status === 'fulfilled') {
          return r.value;
        }
        // This case should ideally not be hit due to the try/catch inside the map
        return {
          name: 'unknown',
          status: 'error',
          error: 'An unexpected error occurred during health check.',
        };
      });

      return reply.send({
        success: true,
        services: report,
        timestamp: new Date().toISOString(),
      });
    }
  );
}
