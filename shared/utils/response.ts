// ============================================================
// Shared API response helpers — used in all Fastify services
// ============================================================

import type { FastifyReply } from 'fastify';
import type { ApiResponse } from '../types/index.js';

export function sendSuccess<T>(
  reply: FastifyReply,
  data: T,
  statusCode: number = 200
): void {
  const response: ApiResponse<T> = { success: true, data };
  reply.status(statusCode).send(response);
}

export function sendError(
  reply: FastifyReply,
  error: string,
  statusCode: number = 400
): void {
  const response: ApiResponse = { success: false, error };
  reply.status(statusCode).send(response);
}

export function sendCreated<T>(reply: FastifyReply, data: T): void {
  sendSuccess(reply, data, 201);
}

export function sendNotFound(reply: FastifyReply, resource: string = 'Resource'): void {
  sendError(reply, `${resource} not found`, 404);
}

export function sendUnauthorized(reply: FastifyReply): void {
  sendError(reply, 'Unauthorized', 401);
}

export function sendForbidden(reply: FastifyReply): void {
  sendError(reply, 'Forbidden — insufficient permissions', 403);
}

export function sendServerError(reply: FastifyReply, err?: unknown): void {
  const message = err instanceof Error ? err.message : 'Internal server error';
  sendError(reply, message, 500);
}
