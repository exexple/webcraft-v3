// ============================================================
// CMS Service — Server Entry Point (FIXED)
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { sql } from 'drizzle-orm';
import { db } from './db/client.js';

// ✅ IMPORT ROUTES CORRECTLY
import { caseStudyRoutes } from './routes/case-studies.js';
import { contentRoutes, testimonialRoutes } from './routes/content.js';
import { metricsRoutes } from './routes/metrics.js';

const server = Fastify({
  logger: { level: 'info' },
});

// ── CORS ─────────────────────────────────────────────────────
await server.register(cors, {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.GATEWAY_URL || true
      : true,
  credentials: true,
});

// ── Multipart ────────────────────────────────────────────────
await server.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

// ── Health Check ─────────────────────────────────────────────
server.get('/health', async () => {
  try {
    await db.execute(sql`SELECT 1`);
    return { status: 'ok', service: 'cms-service' };
  } catch (err) {
    return {
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
    };
  }
});

// ── 🔥 IMPORTANT: REGISTER ALL ROUTES WITH SAME PREFIX ───────
server.register(contentRoutes, {
  prefix: '/api/cms',
});

server.register(testimonialRoutes, {
  prefix: '/api/cms',
});

server.register(caseStudyRoutes, {
  prefix: '/api/cms',
});

server.register(metricsRoutes, {
  prefix: '/api/cms',
});

// ── PORT ─────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? process.env.CMS_SERVICE_PORT ?? 4003);

// ── DB CHECK ─────────────────────────────────────────────────
db.execute(sql`SELECT 1`)
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ DB error:', err));

// ── START SERVER ─────────────────────────────────────────────
try {
  await server.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 CMS running on port ${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
