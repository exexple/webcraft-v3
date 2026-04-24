// ============================================================
// Leads Service — Server Entry Point
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { leadRoutes } from './routes/leads.js';

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
});

await server.register(cors, {
  // Only accept requests from the gateway in production
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.GATEWAY_URL ?? 'http://localhost:4000']
    : true,
});

// Health check
server.get('/health', async () => ({
  status: 'ok',
  service: 'leads-service',
  timestamp: new Date().toISOString(),
}));

await server.register(leadRoutes);

const PORT = Number(process.env.PORT ?? process.env.LEADS_SERVICE_PORT ?? 4001);

try {
  await server.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n📬 Leads Service running at http://localhost:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
