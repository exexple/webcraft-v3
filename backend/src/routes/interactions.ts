import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../services/supabase';
import { verifyAuth } from '../middleware/auth';

const interactionSchema = z.object({
  lead_id: z.string().uuid(),
  note: z.string().min(1),
  type: z.enum(['call', 'whatsapp', 'email', 'meeting']),
});

export async function interactionsRoutes(fastify: FastifyInstance) {
  fastify.post('/api/interactions', { preHandler: verifyAuth }, async (request, reply) => {
    try {
      const body = interactionSchema.parse(request.body);
      const { data, error } = await supabase.from('interactions').insert([body]).select().single();
      if (error) return reply.status(500).send({ error: 'Failed to create interaction' });
      return reply.status(201).send({ data });
    } catch (err) {
      if (err instanceof z.ZodError) return reply.status(400).send({ error: 'Validation failed', details: err.issues });
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
