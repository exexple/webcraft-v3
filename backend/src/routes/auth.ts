import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/login', async (request, reply) => {
    try {
      const body = loginSchema.parse(request.body);
      const supabase = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_ANON_KEY || ''
      );
      const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      });
      if (error) return reply.status(401).send({ error: 'Invalid credentials' });
      return reply.send({ data });
    } catch (err) {
      if (err instanceof z.ZodError) return reply.status(400).send({ error: 'Validation failed', details: err.issues });
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
