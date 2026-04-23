// ============================================================
// Analytics Service — Drizzle Schema
// ============================================================

import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  event: text('event').notNull(),
  page: text('page').notNull(),
  metadata: jsonb('metadata'),
  session_id: text('session_id'),
  ip_hash: text('ip_hash'),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type AnalyticsEventRow = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEventRow = typeof analyticsEvents.$inferInsert;
