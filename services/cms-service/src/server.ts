// ============================================================
// CMS Service — Server Entry Point
// ============================================================

import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { caseStudyRoutes } from './routes/case-studies.js';
import { contentRoutes, testimonialRoutes, metricsRoutes } from './routes/content.js';

const server = Fastify({
  logger: { level: process.env.NODE_ENV === 'production' ? 'warn' : 'info' },
});

await server.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.GATEWAY_URL ?? 'http://localhost:4000']
    : true,
});

// Multipart for image uploads (max 10MB)
await server.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1,
  },
});

server.get('/health', async () => ({
  status: 'ok',
  service: 'cms-service',
  timestamp: new Date().toISOString(),
}));

await server.register(caseStudyRoutes, { prefix: '/case-studies' });
await server.register(contentRoutes);
await server.register(testimonialRoutes);
await server.register(metricsRoutes);

const PORT = Number(process.env.PORT ?? process.env.CMS_SERVICE_PORT ?? 4003);

try {
  await server.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`\n🗂️  CMS Service running at http://localhost:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
