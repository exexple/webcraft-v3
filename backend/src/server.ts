import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
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
  //  HARD CHECK (this was missing)
  if (!process.env.SUPABASE_JWT_SECRET) {
    throw new Error('SUPABASE_JWT_SECRET is NOT set in environment');
  }

  //  CORS
  await fastify.register(cors, {
    origin: ['https://webcraft-v3-b7yx.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  //  RATE LIMIT
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  //  JWT (Supabase compatible)
  await fastify.register(jwt, {
    secret: process.env.SUPABASE_JWT_SECRET,
  });

  //  ROUTES
  await fastify.register(contactRoutes, { prefix: '/api' });
  await fastify.register(leadsRoutes, { prefix: '/api' });
  await fastify.register(interactionsRoutes, { prefix: '/api' });
  await fastify.register(authRoutes, { prefix: '/api' });

  //  HEALTH
  fastify.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  const port = parseInt(process.env.PORT || '4000');
  const host = '0.0.0.0';

  try {
    await fastify.listen({ port, host });
    if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server running on http://${host}:${port}`);
  }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
