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
import { proxyRoutes } from './routes/proxy.js';

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
});

// ── Security plugins ──────────────────────────────────────────
await server.register(helmet, {
  contentSecurityPolicy: false, // Managed by Next.js
});

await server.register(cors, {
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
  credentials: true,
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
await server.register(proxyRoutes, { prefix: '/api' });

// ── Start ────────────────────────────────────────────────────
const PORT = Number(process.env.GATEWAY_PORT ?? 4000);
const HOST = process.env.GATEWAY_HOST ?? '0.0.0.0';

try {
  await server.listen({ port: PORT, host: HOST });
  console.log(`\n🚀 API Gateway running at http://localhost:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
