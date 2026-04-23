// ============================================================
// CMS Service — Case Studies Routes
// Full CRUD + image upload for admin panel
// ============================================================

import type { FastifyInstance } from 'fastify';
import { eq, desc } from 'drizzle-orm';
import { db } from '../db/client.js';
import { caseStudies } from '../db/schema.js';
import { uploadImage } from '../lib/storage.js';
import { slugify } from '@webcraft/shared/utils';
import type { CreateCaseStudyDto, UpdateCaseStudyDto } from '@webcraft/shared/types';

export async function caseStudyRoutes(server: FastifyInstance) {
  // ── GET /case-studies — List all (public: published only) ──
  server.get<{ Querystring: { status?: string; page?: string; limit?: string } }>(
    '/',
    async (request, reply) => {
      try {
        const page = Math.max(1, Number(request.query.page ?? 1));
        const limit = Math.min(50, Math.max(1, Number(request.query.limit ?? 10)));
        const offset = (page - 1) * limit;

        // If ?status=all is passed with admin token (handled by gateway), show all
        // Otherwise default to published only
        const statusFilter = request.query.status === 'all' ? undefined : 'published';

        const query = db
          .select()
          .from(caseStudies)
          .orderBy(desc(caseStudies.published_at))
          .limit(limit)
          .offset(offset);

        if (statusFilter) {
          query.where(eq(caseStudies.status, statusFilter));
        }

        const results = await query;

        return reply.send({ success: true, data: results });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to fetch case studies' });
      }
    }
  );

  // ── GET /case-studies/:slug — Single case study ───────────
  server.get<{ Params: { slug: string } }>(
    '/:slug',
    async (request, reply) => {
      try {
        const [study] = await db
          .select()
          .from(caseStudies)
          .where(eq(caseStudies.slug, request.params.slug));

        if (!study) {
          return reply.status(404).send({ success: false, error: 'Case study not found' });
        }

        return reply.send({ success: true, data: study });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to fetch case study' });
      }
    }
  );

  // ── POST /case-studies — Create case study ─────────────────
  server.post<{ Body: CreateCaseStudyDto }>(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'client', 'industry', 'problem', 'solution', 'result'],
          properties: {
            slug: { type: 'string' },
            title: { type: 'string' },
            client: { type: 'string' },
            industry: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            problem: { type: 'string' },
            solution: { type: 'string' },
            result: { type: 'string' },
            metrics: { type: 'array' },
            status: { type: 'string', enum: ['draft', 'published'] },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { title, client, industry, tags, problem, solution, result, metrics, status } =
          request.body;

        const slug = request.body.slug || slugify(title);

        const [created] = await db
          .insert(caseStudies)
          .values({
            slug,
            title,
            client,
            industry,
            tags: tags ?? [],
            problem,
            solution,
            result,
            metrics: metrics ?? [],
            status: status ?? 'draft',
            published_at: status === 'published' ? new Date() : null,
          })
          .returning();

        return reply.status(201).send({ success: true, data: created });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to create case study' });
      }
    }
  );

  // ── PATCH /case-studies/:id — Update case study ───────────
  server.patch<{ Params: { id: string }; Body: UpdateCaseStudyDto }>(
    '/:id',
    async (request, reply) => {
      try {
        const { id } = request.params;
        const updates = request.body;

        const payload: Record<string, any> = { ...updates, updated_at: new Date() };

        // Auto-set published_at when publishing
        if (updates.status === 'published') {
          payload.published_at = new Date();
        } else if (updates.published_at) {
          payload.published_at = new Date(updates.published_at);
        }

        const [updated] = await db
          .update(caseStudies)
          .set(payload)
          .where(eq(caseStudies.id, id))
          .returning();

        if (!updated) {
          return reply.status(404).send({ success: false, error: 'Case study not found' });
        }

        return reply.send({ success: true, data: updated });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to update case study' });
      }
    }
  );

  // ── DELETE /case-studies/:id ───────────────────────────────
  server.delete<{ Params: { id: string } }>(
    '/:id',
    async (request, reply) => {
      try {
        const [deleted] = await db
          .delete(caseStudies)
          .where(eq(caseStudies.id, request.params.id))
          .returning();

        if (!deleted) {
          return reply.status(404).send({ success: false, error: 'Case study not found' });
        }

        return reply.send({ success: true, message: 'Case study deleted' });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Failed to delete case study' });
      }
    }
  );

  // ── POST /case-studies/:id/cover — Upload cover image ────────
  server.post<{ Params: { id: string } }>(
    '/:id/cover',
    async (request, reply) => {
      try {
        const data = await request.file();
        if (!data) {
          return reply.status(400).send({ success: false, error: 'No file provided' });
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
        if (!allowedTypes.includes(data.mimetype)) {
          return reply.status(400).send({
            success: false,
            error: 'Only JPEG, PNG, WebP, and AVIF images are allowed',
          });
        }

        const buffer = await data.toBuffer();
        const ext = data.filename.split('.').pop() ?? 'jpg';
        const path = `${request.params.id}/cover.${ext}`;

        const publicUrl = await uploadImage(
          'case-study-images',
          path,
          buffer,
          data.mimetype
        );

        const [updated] = await db
          .update(caseStudies)
          .set({ cover_image_url: publicUrl, updated_at: new Date() })
          .where(eq(caseStudies.id, request.params.id))
          .returning();

        return reply.send({
          success: true,
          data: { url: publicUrl, study: updated },
        });
      } catch (err) {
        server.log.error(err);
        return reply.status(500).send({ success: false, error: 'Image upload failed' });
      }
    }
  );
}
