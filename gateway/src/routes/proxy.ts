// ============================================================
// Proxy Routes — Gateway
// Forwards all /api/* requests to appropriate microservices
// ============================================================

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { fetch } from 'undici';

// Protected routes requiring JWT auth at gateway level
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

function resolveService(path: string): { serviceUrl: string; servicePath: string } | null {
  // path = '/leads/...' or '/analytics/...' or '/cms/...'
  const [, service, ...rest] = path.split('/');
  const serviceUrl = SERVICE_MAP[service];
  if (!serviceUrl) return null;
  const servicePath = '/' + rest.join('/');
  return { serviceUrl, servicePath };
}

function isProtectedRoute(method: string, path: string): boolean {
  return PROTECTED_PATTERNS.some(
    (p) => p.method === method && p.pattern.test(path)
  );
}

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

    // Forward auth header if present
    if (request.headers.authorization) {
      headers['Authorization'] = request.headers.authorization;
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
    const error = err instanceof Error ? err.message : 'Service unavailable';
    return reply.status(503).send({ success: false, error });
  }
}

export async function proxyRoutes(server: FastifyInstance) {
  // Catch-all proxy handler for /api/leads/*, /api/analytics/*, /api/cms/*
  server.all<{ Params: { '*': string } }>(
    '/*',
    {
      preHandler: async (request, reply) => {
        const path = request.url.replace('/api', '');
        const method = request.method.toUpperCase();

        if (isProtectedRoute(method, path)) {
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
      // Strip the /api prefix
      const path = request.url.replace(/^\/api/, '');
      const resolved = resolveService(path);

      if (!resolved) {
        return reply.status(404).send({
          success: false,
          error: `No service mapped for route: ${path}`,
        });
      }

      const { serviceUrl, servicePath } = resolved;
      const targetUrl = `${serviceUrl}${servicePath || '/'}`;

      return proxyRequest(request, reply, targetUrl);
    }
  );
}
