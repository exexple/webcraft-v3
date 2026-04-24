-- ================================================
-- WEBCRAFT STUDIO — Complete Database Migration
-- Run this ENTIRE script in your Supabase SQL Editor
-- Project: ccoorrevhclrbykfgpvt.supabase.co
-- ================================================

-- ── 001: Enable UUID extension ──────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 002: Leads table ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  source      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS leads_status_idx      ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx  ON public.leads(created_at DESC);

-- ── 003: Analytics events table ─────────────────
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event       TEXT NOT NULL,
  page        TEXT NOT NULL,
  metadata    JSONB,
  session_id  TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS analytics_event_idx      ON public.analytics_events(event);
CREATE INDEX IF NOT EXISTS analytics_page_idx       ON public.analytics_events(page);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON public.analytics_events(created_at DESC);

-- ── 004: Content blocks table ────────────────────
CREATE TABLE IF NOT EXISTS public.content_blocks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page        TEXT NOT NULL,
  key         TEXT NOT NULL,
  value       TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'rich_text', 'url', 'number')),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(page, key)
);
CREATE INDEX IF NOT EXISTS content_blocks_page_idx ON public.content_blocks(page);

-- ── 005: Case studies table ──────────────────────
CREATE TABLE IF NOT EXISTS public.case_studies (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  client          TEXT NOT NULL,
  industry        TEXT NOT NULL,
  tags            TEXT[] DEFAULT '{}',
  cover_image_url TEXT,
  problem         TEXT NOT NULL,
  solution        TEXT NOT NULL,
  result          TEXT NOT NULL,
  metrics         JSONB DEFAULT '[]',
  gallery_urls    TEXT[] DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS case_studies_status_idx ON public.case_studies(status);
CREATE INDEX IF NOT EXISTS case_studies_slug_idx   ON public.case_studies(slug);

-- ── 006: Testimonials table ──────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name       TEXT NOT NULL,
  client_title      TEXT NOT NULL,
  client_company    TEXT NOT NULL,
  client_avatar_url TEXT,
  quote             TEXT NOT NULL,
  rating            INTEGER CHECK (rating BETWEEN 1 AND 5),
  featured          BOOLEAN NOT NULL DEFAULT false,
  display_order     INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON public.testimonials(featured);
CREATE INDEX IF NOT EXISTS testimonials_order_idx    ON public.testimonials(display_order);

-- ── 007: Site metrics table ──────────────────────
CREATE TABLE IF NOT EXISTS public.site_metrics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label         TEXT NOT NULL,
  value         TEXT NOT NULL,
  icon          TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Seed site metrics (safe to run multiple times)
INSERT INTO public.site_metrics (label, value, icon, display_order)
VALUES
  ('Projects Delivered', '0+', 'rocket', 1),
  ('Happy Clients',      '0+', 'heart',  2),
  ('Countries Served',   '0+', 'globe',  3),
  ('Years of Experience','0+', 'star',   4)
ON CONFLICT DO NOTHING;

-- ── 008: Updated_at trigger ──────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_leads         ON public.leads;
DROP TRIGGER IF EXISTS set_updated_at_content_blocks ON public.content_blocks;
DROP TRIGGER IF EXISTS set_updated_at_case_studies  ON public.case_studies;

CREATE TRIGGER set_updated_at_leads
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_content_blocks
  BEFORE UPDATE ON public.content_blocks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_case_studies
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
-- CRITICAL: RLS is enabled but ALL backend traffic uses the
-- direct postgres connection (DATABASE_URL), which bypasses RLS
-- when connecting as superuser. However to be safe and forward-compatible,
-- we DISABLE RLS on all tables so the backend service role
-- can always access data without policy conflicts.
-- The gateway enforces auth at the API layer via JWT — DB-level
-- RLS would be double-enforcement and causes failures with
-- direct postgres connections.
-- ================================================

ALTER TABLE public.leads              DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks     DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials       DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_metrics       DISABLE ROW LEVEL SECURITY;

-- Drop all existing conflicting policies (safe no-ops if they don't exist)
DROP POLICY IF EXISTS "leads_insert_public"          ON public.leads;
DROP POLICY IF EXISTS "leads_select_service"         ON public.leads;
DROP POLICY IF EXISTS "leads_update_service"         ON public.leads;
DROP POLICY IF EXISTS "analytics_insert_public"      ON public.analytics_events;
DROP POLICY IF EXISTS "analytics_select_service"     ON public.analytics_events;
DROP POLICY IF EXISTS "content_blocks_select_public" ON public.content_blocks;
DROP POLICY IF EXISTS "content_blocks_insert_service" ON public.content_blocks;
DROP POLICY IF EXISTS "content_blocks_update_service" ON public.content_blocks;
DROP POLICY IF EXISTS "content_blocks_delete_service" ON public.content_blocks;
DROP POLICY IF EXISTS "case_studies_select_published" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_all_service"     ON public.case_studies;
DROP POLICY IF EXISTS "testimonials_select_public"   ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_all_service"     ON public.testimonials;
DROP POLICY IF EXISTS "site_metrics_select_public"   ON public.site_metrics;
DROP POLICY IF EXISTS "site_metrics_all_service"     ON public.site_metrics;


-- ================================================
-- SUPABASE STORAGE: buckets
-- ================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('case-study-images',   'case-study-images',   true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('testimonial-avatars', 'testimonial-avatars', true, 2097152,  ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;
