import type { FastifyInstance } from 'fastify';
import { db } from '../db/client.js';
import { siteMetrics } from '../db/schema.js';

export async function metricsRoutes(server: FastifyInstance) {

  // GET all metrics
  server.get('/metrics', async (_request, reply) => {
    try {
      const data = await db.select().from(siteMetrics);
      return { success: true, data };
    } catch (err) {
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch metrics',
      });
    }
  });

  // UPDATE metric
  server.patch<{ Params: { id: string }; Body: { value: string } }>(
    '/metrics/:id',
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { value } = request.body;

        await db
          .update(siteMetrics)
          .set({ value })
          .where({ id });

        return { success: true };
      } catch (err) {
        return reply.status(500).send({
          success: false,
          error: 'Failed to update metric',
        });
      }
    }
  );
}
