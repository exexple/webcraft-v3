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

        return reply.send({ success: true, data: blocks });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to fetch content blocks');
        return reply.status(500).send({ success: false, error: `Failed to fetch content: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to create content block');
        return reply.status(500).send({ success: false, error: `Failed to create content block: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to update content block');
        return reply.status(500).send({ success: false, error: `Failed to update content: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to fetch testimonials');
        return reply.status(500).send({ success: false, error: `Failed to fetch testimonials: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to create testimonial');
        return reply.status(500).send({ success: false, error: `Failed to create testimonial: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to update testimonial');
        return reply.status(500).send({ success: false, error: `Failed to update testimonial: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to delete testimonial');
        return reply.status(500).send({ success: false, error: `Failed to delete testimonial: ${msg}` });
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
      const msg = err instanceof Error ? err.message : String(err);
      server.log.error({ err, msg }, 'Failed to fetch metrics');
      return reply.status(500).send({ success: false, error: `Failed to fetch metrics: ${msg}` });
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
        const msg = err instanceof Error ? err.message : String(err);
        server.log.error({ err, msg }, 'Failed to update metric');
        return reply.status(500).send({ success: false, error: `Failed to update metric: ${msg}` });
      }
    }
  );
}
