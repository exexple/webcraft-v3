import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../services/supabase';

const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'closed', 'converted']).optional(),
  phone: z.string().optional(),
});

export async function leadsRoutes(fastify: FastifyInstance) {

  //  AUTH HANDLER (reuse everywhere)
  const verifyJWT = async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
  };

  //  GET ALL LEADS
  fastify.get('/leads', { preHandler: verifyJWT }, async (request, reply) => {
    try {
      const query = request.query as {
        status?: string;
        search?: string;
        page?: string;
        limit?: string;
      };

      let dbQuery = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (query.status) {
        dbQuery = dbQuery.eq('status', query.status);
      }

      if (query.search) {
        dbQuery = dbQuery.or(
          `name.ilike.%${query.search}%,email.ilike.%${query.search}%`
        );
      }

      const page = parseInt(query.page || '1');
      const limit = parseInt(query.limit || '20');
      const from = (page - 1) * limit;

      dbQuery = dbQuery.range(from, from + limit - 1);

      const { data, error, count } = await dbQuery;

      if (error) {
        return reply.status(500).send({ error: 'Failed to fetch leads' });
      }

      return reply.send({
        data,
        total: count,
        page,
        limit,
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  //  GET SINGLE LEAD
  fastify.get('/leads/:id', { preHandler: verifyJWT }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .is('deleted_at', null)
        .single();

      if (leadError || !lead) {
        return reply.status(404).send({ error: 'Lead not found' });
      }

      const { data: interactions } = await supabase
        .from('interactions')
        .select('*')
        .eq('lead_id', id)
        .order('created_at', { ascending: false });

      return reply.send({
        data: {
          ...lead,
          interactions: interactions || [],
        },
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  //  UPDATE LEAD
  fastify.patch('/leads/:id', { preHandler: verifyJWT }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = updateLeadSchema.parse(request.body);

      const { data, error } = await supabase
        .from('leads')
        .update(body)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return reply.status(500).send({ error: 'Failed to update lead' });
      }

      return reply.send({ data });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Validation failed',
          details: err.issues,
        });
      }

      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  //  DELETE (SOFT DELETE)
  fastify.delete('/leads/:id', { preHandler: verifyJWT }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const { error } = await supabase
        .from('leads')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        return reply.status(500).send({ error: 'Failed to delete lead' });
      }

      return reply.send({ success: true });

    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
        }
