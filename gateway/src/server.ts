// ============================================================
// API Gateway — Webcraft Studio
// Routes requests to microservices, handles JWT auth + rate limiting
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth.js';
import { proxyRoutes, debugRoutes, startKeepAlivePings } from './routes/proxy.js';

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
});

// ── CORS origin allowlist ─────────────────────────────────────
// CORS_ORIGIN env var accepts a comma-separated list of allowed origins.
// Wildcards (*) are supported for Vercel preview deployments.
// Example: https://webcraftstudio.com,https://*.vercel.app
function buildCorsOriginList(): (string | RegExp)[] {
  const raw = process.env.CORS_ORIGIN ?? '';
  if (!raw.trim()) {
    // Safe local development defaults
    return ['http://localhost:3000', 'http://localhost:3001'];
  }
  return raw.split(',').map((o) => {
    const origin = o.trim();
    // Convert wildcard patterns like https://*.vercel.app → regex
    if (origin.includes('*')) {
      const escaped = origin.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
      return new RegExp(`^${escaped}$`);
    }
    return origin;
  });
}

const allowedOrigins = buildCorsOriginList();

// ── Security plugins ──────────────────────────────────────────
await server.register(helmet, {
  contentSecurityPolicy: false, // Managed by Next.js
});

await server.register(cors, {
  origin: (origin, cb) => {
    // Allow server-to-server requests with no origin (e.g. curl, health checks)
    if (!origin) return cb(null, true);
    const allowed = allowedOrigins.some((allowed) =>
      allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
    );
    if (allowed) return cb(null, true);
    server.log.warn({ origin }, 'CORS: blocked request from disallowed origin');
    cb(new Error(`Origin '${origin}' is not allowed by CORS policy`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
});

await server.register(rateLimit, {
  max: Number(process.env.RATE_LIMIT_MAX ?? 100),
  timeWindow: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  errorResponseBuilder: () => ({
    success: false,
    error: 'Too many requests — please slow down.',
  }),
});

// ── JWT plugin ───────────────────────────────────────────────
await server.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'fallback-dev-secret-change-in-prod',
});

server.decorate('authenticate', async function (request: any, reply: any) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

// ── Health check ─────────────────────────────────────────────
server.get('/health', async () => ({
  status: 'ok',
  service: 'api-gateway',
  timestamp: new Date().toISOString(),
}));

// ── Routes ───────────────────────────────────────────────────
await server.register(authRoutes, { prefix: '/api/auth' });
await server.register(debugRoutes, { prefix: '/api' });
await server.register(proxyRoutes, { prefix: '/api' });

// ── Start ────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? process.env.GATEWAY_PORT ?? 4000);
const HOST = process.env.GATEWAY_HOST ?? '0.0.0.0';

try {
  await server.listen({ port: PORT, host: HOST });
  console.log(`\n🚀 API Gateway running at http://localhost:${PORT}`);
  // Keep Render free-tier microservices warm to prevent cold-start 503s
  startKeepAlivePings();
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
