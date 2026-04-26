// ============================================================
// Auth Routes — Gateway
// Handles admin login and token verification
// ============================================================

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createHash } from 'crypto';
import type { LoginDto, AuthResponse, JwtPayload } from '@webcraft/shared/types';

export async function authRoutes(server: FastifyInstance) {
  // ── POST /api/auth/login ────────────────────────────────────
  server.post<{ Body: LoginDto }>(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassHash = process.env.ADMIN_PASSWORD_HASH;

      if (!adminEmail || !adminPassHash) {
        return reply.status(500).send({
          success: false,
          error: 'Server misconfiguration — admin credentials not set',
        });
      }

      // SHA-256 check (fine for now)
      const inputHash = createHash('sha256').update(password).digest('hex');

      if (email !== adminEmail || inputHash !== adminPassHash) {
        return reply.status(401).send({
          success: false,
          error: 'Invalid credentials',
        });
      }

      const payload: JwtPayload = {
        sub: 'admin',
        email: adminEmail,
        role: 'admin',
      };

      const token = server.jwt.sign(payload, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
      });

      // ✅ IMPORTANT COOKIE FIX (for Vercel ↔ Render cross-domain)
      reply.setCookie('wc_admin_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,          // required for HTTPS
        sameSite: 'none',      // required for cross-site (Vercel → Render)
        maxAge: 60 * 60 * 24 * 7,
      });

      const response: AuthResponse = {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 60 * 60 * 24 * 7,
      };

      return reply.status(200).send({ success: true, data: response });
    }
  );

  // ── GET /api/auth/verify ────────────────────────────────────
  server.get(
    '/verify',
    {
      preHandler: [server.authenticate],
    },
    async (request) => {
      return {
        success: true,
        data: { user: request.user },
      };
    }
  );

  // ── POST /api/auth/logout ───────────────────────────────────
  server.post('/logout', async (_request, reply) => {
    reply.clearCookie('wc_admin_token', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { success: true };
  });
}
