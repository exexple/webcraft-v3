// ============================================================
// CMS Service — Server Entry Point
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { sql } from 'drizzle-orm';
import { db } from './db/client.js';
import { caseStudyRoutes } from './routes/case-studies.js';
import { contentRoutes, testimonialRoutes, metricsRoutes } from './routes/content.js';
import metricsRoutes from './routes/metrics';

await server.register(metricsRoutes, {
  prefix: '/api/cms',
});

const server = Fastify({
  logger: { level: process.env.NODE_ENV === 'production' ? 'info' : 'info' },
});

// CORS: In production, the GATEWAY_URL env var MUST be set in Render dashboard.
// Render sets NODE_ENV=production but GATEWAY_URL defaults to localhost if not set,
// which blocks all gateway requests. GATEWAY_URL=https://wc-gateway.onrender.com
await server.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.GATEWAY_URL
        ? [process.env.GATEWAY_URL]
        : true) // fallback to allow all if GATEWAY_URL missing (safer than blocking)
    : true,
  credentials: true,
});

// Multipart for image uploads (max 10MB)
await server.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

// ── Health check with DB connectivity test ───────────────────
// Hitting /health shows exactly whether the DB connection is working.
// Use this on Render to diagnose 500 errors:
//   curl https://wc-cms-service.onrender.com/health
server.get('/health', async () => {
  let dbStatus: 'connected' | 'error' = 'error';
  let dbError: string | null = null;
  let dbConfig: string | null = null;

  try {
    await db.execute(sql`SELECT 1`);
    dbStatus = 'connected';
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
    // Expose partial connection info (hide password) for debugging
    const url = process.env.DATABASE_URL ?? '';
    dbConfig = url ? url.replace(/:([^@:]+)@/, ':***@') : 'DATABASE_URL not set';
  }

  return {
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    service: 'cms-service',
    db: { status: dbStatus, error: dbError, config: dbError ? dbConfig : null },
    env: {
      nodeEnv: process.env.NODE_ENV,
      gatewayUrl: process.env.GATEWAY_URL ?? 'NOT SET',
      hasDbUrl: !!process.env.DATABASE_URL,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
    },
    timestamp: new Date().toISOString(),
  };
});

await server.register(caseStudyRoutes, { prefix: '/case-studies' });
await server.register(contentRoutes);
await server.register(testimonialRoutes);
await server.register(metricsRoutes);

const PORT = Number(process.env.PORT ?? process.env.CMS_SERVICE_PORT ?? 4003);

// ── Startup DB verification (Non-blocking) ────────────────────
// Test DB connection in the background so it doesn't block startup
db.execute(sql`SELECT 1`)
  .then(() => console.log('✅ Database connection verified'))
  .catch((err) => {
    const msg = err instanceof Error ? err.message : String(err);
    const url = process.env.DATABASE_URL ?? 'NOT SET';
    console.error('❌ DATABASE CONNECTION FAILED:', msg);
    console.error('   DATABASE_URL:', url.replace(/:([^@:]+)@/, ':***@'));
  });

try {
  await server.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n🗂️  CMS Service running at http://localhost:${PORT}`);
  console.log(`   GATEWAY_URL: ${process.env.GATEWAY_URL ?? 'NOT SET (CORS will block gateway!)'}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
