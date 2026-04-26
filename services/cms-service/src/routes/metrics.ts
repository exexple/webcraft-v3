// ============================================================
// CMS Service — Metrics Routes 
// ============================================================

import type { FastifyInstance } from 'fastify';
import { db } from '../db/client.js';
import { siteMetrics } from '../db/schema.js';
import { eq } from 'drizzle-orm'; 

export async function metricsRoutes(server: FastifyInstance) {

  // ── GET all metrics ────────────────────────────────────────
  server.get('/metrics', async (_request, reply) => {
    try {
      const data = await db.select().from(siteMetrics);

      return {
        success: true,
        data,
      };
    } catch (err) {
      console.error('GET /metrics error:', err);

      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch metrics',
      });
    }
  });

  // ── UPDATE metric ──────────────────────────────────────────
  server.patch<{
    Params: { id: string };
    Body: { value: string };
  }>('/metrics/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const { value } = request.body;

      // Convert id if DB uses number
      const metricId = Number(id); // safe even if already number

      await db
        .update(siteMetrics)
        .set({ value })
        .where(eq(siteMetrics.id, metricId)); 

      return {
        success: true,
      };

    } catch (err) {
      console.error('PATCH /metrics error:', err);

      return reply.status(500).send({
        success: false,
        error: 'Failed to update metric',
      });
    }
  });
}
