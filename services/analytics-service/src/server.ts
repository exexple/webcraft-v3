// ============================================================
// Analytics Service — Server Entry Point
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { analyticsRoutes } from './routes/analytics.js';

const server = Fastify({
  logger: { level: process.env.NODE_ENV === 'production' ? 'warn' : 'info' },
});

await server.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.GATEWAY_URL ?? 'http://localhost:4000']
    : true,
});

server.get('/health', async () => ({
  status: 'ok',
  service: 'analytics-service',
  timestamp: new Date().toISOString(),
}));

await server.register(analyticsRoutes);

const PORT = Number(process.env.ANALYTICS_SERVICE_PORT ?? 4002);

try {
  await server.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n📊 Analytics Service running at http://localhost:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
