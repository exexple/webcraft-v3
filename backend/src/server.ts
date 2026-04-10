import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
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
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await fastify.register(contactRoutes);
  await fastify.register(leadsRoutes);
  await fastify.register(interactionsRoutes);
  await fastify.register(authRoutes);

  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  const port = parseInt(process.env.PORT || '4000');
  const host = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
