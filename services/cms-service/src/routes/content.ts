// ============================================================
// CMS Service — Content Blocks, Testimonials, Metrics Routes
// ============================================================

import type { FastifyInstance } from 'fastify';
import { eq, asc } from 'drizzle-orm';
import { db } from '../db/client.js';
import { contentBlocks, testimonials, siteMetrics } from '../db/schema.js';
import type {
  CreateContentBlockDto,
  UpdateContentBlockDto,
  CreateTestimonialDto,
} from '@webcraft/shared/types';

export async function contentRoutes(server: FastifyInstance) {
  // ── GET /content/:page — All blocks for a page ────────────
  server.get<{ Params: { page: string } }>(
    '/content/:page',
    async (request, reply) => {
      try {
        const blocks = await db
          .select()
          .from(contentBlocks)
          .where(eq(contentBlocks.page, request.params.page));

        // Convert to key→value map for easy frontend consumption
        const blockMap = Object.fromEntries(
          blocks.map((b) => [b.key, { value: b.value, type: b.type, id: b.id }])
        );

        return reply.send({ success: true, data: blockMap });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to fetch content' });
      }
    }
  );

  // ── POST /content — Create a content block ─────────────────
  server.post<{ Body: CreateContentBlockDto }>(
    '/content',
    async (request, reply) => {
      try {
        const { page, key, value, type } = request.body;

        const [created] = await db
          .insert(contentBlocks)
          .values({ page, key, value, type: type ?? 'text' })
          .onConflictDoUpdate({
            target: [contentBlocks.page, contentBlocks.key],
            set: { value, updated_at: new Date() },
          })
          .returning();

        return reply.status(201).send({ success: true, data: created });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to create content block' });
      }
    }
  );

  // ── PATCH /content/:id — Update a content block ───────────
  server.patch<{ Params: { id: string }; Body: UpdateContentBlockDto }>(
    '/content/:id',
    async (request, reply) => {
      try {
        const [updated] = await db
          .update(contentBlocks)
          .set({ value: request.body.value, updated_at: new Date() })
          .where(eq(contentBlocks.id, request.params.id))
          .returning();

        if (!updated) {
          return reply.status(404).send({ success: false, error: 'Content block not found' });
        }

        return reply.send({ success: true, data: updated });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to update content' });
      }
    }
  );
}

export async function testimonialRoutes(server: FastifyInstance) {
  // ── GET /testimonials ─────────────────────────────────────
  server.get<{ Querystring: { featured?: string } }>(
    '/testimonials',
    async (request, reply) => {
      try {
        const all = await db
          .select()
          .from(testimonials)
          .orderBy(asc(testimonials.display_order));

        return reply.send({ success: true, data: all });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to fetch testimonials' });
      }
    }
  );

  // ── POST /testimonials ────────────────────────────────────
  server.post<{ Body: CreateTestimonialDto }>(
    '/testimonials',
    async (request, reply) => {
      try {
        const [created] = await db
          .insert(testimonials)
          .values(request.body)
          .returning();

        return reply.status(201).send({ success: true, data: created });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to create testimonial' });
      }
    }
  );

  // ── PATCH /testimonials/:id ───────────────────────────────
  server.patch<{ Params: { id: string }; Body: Partial<CreateTestimonialDto> }>(
    '/testimonials/:id',
    async (request, reply) => {
      try {
        const [updated] = await db
          .update(testimonials)
          .set(request.body)
          .where(eq(testimonials.id, request.params.id))
          .returning();

        if (!updated) {
          return reply.status(404).send({ success: false, error: 'Testimonial not found' });
        }

        return reply.send({ success: true, data: updated });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to update testimonial' });
      }
    }
  );

  // ── DELETE /testimonials/:id ──────────────────────────────
  server.delete<{ Params: { id: string } }>(
    '/testimonials/:id',
    async (request, reply) => {
      try {
        await db.delete(testimonials).where(eq(testimonials.id, request.params.id));
        return reply.send({ success: true, message: 'Testimonial deleted' });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to delete testimonial' });
      }
    }
  );
}

export async function metricsRoutes(server: FastifyInstance) {
  // ── GET /metrics ──────────────────────────────────────────
  server.get('/metrics', async (request, reply) => {
    try {
      const all = await db
        .select()
        .from(siteMetrics)
        .orderBy(asc(siteMetrics.display_order));

      return reply.send({ success: true, data: all });
    } catch (err) {
      server.log.error(err);
      return reply.status(500).send({ success: false, error: 'Failed to fetch metrics' });
    }
  });

  // ── PATCH /metrics/:id ────────────────────────────────────
  server.patch<{
    Params: { id: string };
    Body: { label?: string; value?: string; icon?: string; display_order?: number };
  }>(
    '/metrics/:id',
    async (request, reply) => {
      try {
        const [updated] = await db
          .update(siteMetrics)
          .set(request.body)
          .where(eq(siteMetrics.id, request.params.id))
          .returning();

        if (!updated) {
          return reply.status(404).send({ success: false, error: 'Metric not found' });
        }

        return reply.send({ success: true, data: updated });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to update metric' });
      }
    }
  );
}
