import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt'; // ✅ ADD THIS
import dotenv from 'dotenv';

import { contactRoutes } from './routes/contact';
import { leadsRoutes } from './routes/leads';
import { interactionsRoutes } from './routes/interactions';
import { authRoutes } from './routes/auth';

dotenv.config();

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

async function start() {
  // ✅ CORS
  await fastify.register(cors, {
    origin: [
      'https://webcraft-v3-b7yx.vercel.app' // ❗ REMOVE trailing slash
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // ✅ RATE LIMIT
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // ✅ JWT (VERY IMPORTANT 🔥)
  await fastify.register(jwt, {
    secret: process.env.SUPABASE_JWT_SECRET as string,
  });

  // ✅ ROUTES
  await fastify.register(contactRoutes, { prefix: '/api' });
  await fastify.register(leadsRoutes, { prefix: '/api' });
  await fastify.register(interactionsRoutes, { prefix: '/api' });
  await fastify.register(authRoutes, { prefix: '/api' });

  // ✅ HEALTH CHECK
  fastify.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  const port = parseInt(process.env.PORT || '4000');
  const host = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port, host });
    console.log(`🚀 Server running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
