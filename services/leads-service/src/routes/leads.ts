// ============================================================
// Leads Service — Route Handlers
// ============================================================

import type { FastifyInstance } from 'fastify';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { leads } from '../db/schema.js';
import type { CreateLeadDto, UpdateLeadDto } from '@webcraft/shared/types';

export async function leadRoutes(server: FastifyInstance) {
  // ── POST /leads — Create a lead ───────────────────────────
  server.post<{ Body: CreateLeadDto }>(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'message'],
          properties: {
            name: { type: 'string', minLength: 2, maxLength: 100 },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            message: { type: 'string', minLength: 10, maxLength: 2000 },
            source: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, phone, message, source } = request.body;

        const [newLead] = await db
          .insert(leads)
          .values({ name, email, phone, message, source })
          .returning();

        return reply.status(201).send({
          success: true,
          data: newLead,
          message: "Thanks! We'll be in touch within 24 hours.",
        });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({
          success: false,
          error: 'Failed to submit lead. Please try again.',
        });
      }
    }
  );

  // ── GET /leads — Fetch all leads (admin) ──────────────────
  server.get<{
    Querystring: { page?: string; limit?: string; status?: string };
  }>(
    '/',
    async (request, reply) => {
      try {
        const page = Math.max(1, Number(request.query.page ?? 1));
        const limit = Math.min(100, Math.max(1, Number(request.query.limit ?? 20)));
        const offset = (page - 1) * limit;

        const allLeads = await db
          .select()
          .from(leads)
          .orderBy(desc(leads.created_at))
          .limit(limit)
          .offset(offset);

        const [countRow] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(leads);

        const total = Number(countRow?.count ?? 0);
        return reply.send({
          success: true,
          data: allLeads,
          total,
          page,
          limit,
          hasMore: offset + limit < total,
        });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to fetch leads' });
      }
    }
  );

  // ── PATCH /leads/:id — Update lead status ─────────────────
  server.patch<{
    Params: { id: string };
    Body: UpdateLeadDto;
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'string', format: 'uuid' } },
        },
        body: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['new', 'contacted', 'closed'] },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { status } = request.body;

        const [updated] = await db
          .update(leads)
          .set({ status, updated_at: new Date() })
          .where(eq(leads.id, id))
          .returning();

        if (!updated) {
          return reply.status(404).send({ success: false, error: 'Lead not found' });
        }

        return reply.send({ success: true, data: updated });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to update lead' });
      }
    }
  );
}
