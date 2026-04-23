// ============================================================
// CMS Service — Drizzle Schema
// All content management: content blocks, case studies,
// testimonials, and site metrics
// ============================================================

import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

// ── Content Blocks ────────────────────────────────────────────
export const contentBlocks = pgTable('content_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  page: text('page').notNull(),
  key: text('key').notNull(),
  value: text('value').notNull(),
  type: text('type', { enum: ['text', 'rich_text', 'url', 'number'] })
    .notNull()
    .default('text'),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Case Studies ──────────────────────────────────────────────
export const caseStudies = pgTable('case_studies', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull(),
  industry: text('industry').notNull(),
  tags: text('tags').array().default([]),
  cover_image_url: text('cover_image_url'),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  result: text('result').notNull(),
  metrics: jsonb('metrics').default([]),
  gallery_urls: text('gallery_urls').array().default([]),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
  published_at: timestamp('published_at', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Testimonials ──────────────────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  client_name: text('client_name').notNull(),
  client_title: text('client_title').notNull(),
  client_company: text('client_company').notNull(),
  client_avatar_url: text('client_avatar_url'),
  quote: text('quote').notNull(),
  rating: integer('rating'),
  featured: boolean('featured').notNull().default(false),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Site Metrics ──────────────────────────────────────────────
export const siteMetrics = pgTable('site_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  icon: text('icon'),
  display_order: integer('display_order').notNull().default(0),
});

export type ContentBlockRow = typeof contentBlocks.$inferSelect;
export type CaseStudyRow = typeof caseStudies.$inferSelect;
export type TestimonialRow = typeof testimonials.$inferSelect;
export type SiteMetricRow = typeof siteMetrics.$inferSelect;
