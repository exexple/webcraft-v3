// ============================================================
// Analytics Service — Routes
// ============================================================

import type { FastifyInstance } from 'fastify';
import { desc, count, eq, sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { analyticsEvents } from '../db/schema.js';
import { hashIp } from '@webcraft/shared/utils';
import type { AnalyticsEventPayload } from '@webcraft/shared/types';

export async function analyticsRoutes(server: FastifyInstance) {
  // ── POST /track — Record an event ─────────────────────────
  server.post<{ Body: AnalyticsEventPayload }>(
    '/track',
    {
      schema: {
        body: {
          type: 'object',
          required: ['event', 'page'],
          properties: {
            event: {
              type: 'string',
              enum: ['page_view', 'cta_click', 'form_submit', 'scroll_depth'],
            },
            page: { type: 'string' },
            metadata: { type: 'object' },
            session_id: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      // Fire-and-forget: respond immediately, write async
      reply.status(202).send({ success: true, message: 'Tracked' });

      // Async DB write (non-blocking)
      const { event, page, metadata, session_id } = request.body;
      const rawIp = request.ip ?? 'unknown';
      const ip_hash = hashIp(rawIp);

      db.insert(analyticsEvents)
        .values({ event, page, metadata, session_id, ip_hash })
        .execute()
        .catch((err) => server.log.error({ err }, 'Analytics write failed'));
    }
  );

  // ── GET /stats — Aggregated stats (admin) ─────────────────
  server.get('/stats', async (request, reply) => {
    try {
      const [totalViews] = await db
        .select({ count: count() })
        .from(analyticsEvents)
        .where(eq(analyticsEvents.event, 'page_view'));

      const [totalCtaClicks] = await db
        .select({ count: count() })
        .from(analyticsEvents)
        .where(eq(analyticsEvents.event, 'cta_click'));

      const topPages = await db
        .select({
          page: analyticsEvents.page,
          count: count(),
        })
        .from(analyticsEvents)
        .where(eq(analyticsEvents.event, 'page_view'))
        .groupBy(analyticsEvents.page)
        .orderBy(desc(count()))
        .limit(10);

      // Daily views for last 30 days
      const dailyViews = await db
        .select({
          date: sql<string>`DATE(created_at)::text`,
          count: count(),
        })
        .from(analyticsEvents)
        .where(
          sql`created_at >= NOW() - INTERVAL '30 days'
              AND event = 'page_view'`
        )
        .groupBy(sql`DATE(created_at)`)
        .orderBy(sql`DATE(created_at)`);

      return reply.send({
        success: true,
        data: {
          total_page_views: totalViews.count,
          total_cta_clicks: totalCtaClicks.count,
          top_pages: topPages,
          top_ctas: [],
          daily_views: dailyViews,
        },
      });
    } catch (err) {
      server.log.error(err);
      return reply.status(500).send({ success: false, error: 'Failed to fetch stats' });
    }
  });
}
