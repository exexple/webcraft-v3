import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../services/supabase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
});

export async function contactRoutes(fastify: FastifyInstance) {
  fastify.post('/contact', async (request, reply) => {
    try {
      const body = contactSchema.parse(request.body);
      const { data, error } = await supabase.from('leads').insert([{
        name: body.name,
        email: body.email,
        message: body.message,
        phone: body.phone || null,
        status: 'new',
        source: 'website_form',
      }]).select().single();

      if (error) {
        fastify.log.error({
          msg: 'Supabase insert error on leads table',
          code: error.code,
          details: error.details,
          hint: error.hint,
          message: error.message,
        });
        const isDev = process.env.NODE_ENV !== 'production';
        return reply.status(500).send({
          error: 'Failed to submit contact form',
          ...(isDev && { details: error.message, code: error.code, hint: error.hint }),
        });
      }
      return reply.status(201).send({ success: true, data });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ error: 'Validation failed', details: err.issues });
      }
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
