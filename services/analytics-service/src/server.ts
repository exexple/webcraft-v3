// ============================================================
// Analytics Service — Server Entry Point
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { sql } from 'drizzle-orm';
import { db } from './db/client.js';
import { analyticsRoutes } from './routes/analytics.js';

const server = Fastify({
  logger: { level: process.env.NODE_ENV === 'production' ? 'info' : 'info' },
});

await server.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.GATEWAY_URL
        ? [process.env.GATEWAY_URL]
        : true)
    : true,
  credentials: true,
});

// ── Health check with DB connectivity test ───────────────────
server.get('/health', async () => {
  let dbStatus: 'connected' | 'error' = 'error';
  let dbError: string | null = null;
  let dbConfig: string | null = null;

  try {
    await db.execute(sql`SELECT 1`);
    dbStatus = 'connected';
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
    const url = process.env.DATABASE_URL ?? '';
    dbConfig = url ? url.replace(/:([^@:]+)@/, ':***@') : 'DATABASE_URL not set';
  }

  return {
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    service: 'analytics-service',
    db: { status: dbStatus, error: dbError, config: dbError ? dbConfig : null },
    env: {
      nodeEnv: process.env.NODE_ENV,
      gatewayUrl: process.env.GATEWAY_URL ?? 'NOT SET',
      hasDbUrl: !!process.env.DATABASE_URL,
    },
    timestamp: new Date().toISOString(),
  };
});

await server.register(analyticsRoutes);

const PORT = Number(process.env.PORT ?? process.env.ANALYTICS_SERVICE_PORT ?? 4002);

// ── Startup DB verification (Non-blocking) ────────────────────
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
  console.log(`\n📊 Analytics Service running at http://localhost:${PORT}`);
  console.log(`   GATEWAY_URL: ${process.env.GATEWAY_URL ?? 'NOT SET (CORS will block gateway!)'}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
