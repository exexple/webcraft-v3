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
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
DROP TRIGGER IF EXISTS set_updated_at_testimonials  ON public.testimonials;

CREATE TRIGGER set_updated_at_leads
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_content_blocks
  BEFORE UPDATE ON public.content_blocks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_case_studies
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_testimonials
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================
-- This section enables RLS and defines access policies.
-- Public access is granted for read-only on public content and
-- write-only for submissions (leads, analytics).
-- Full access (SELECT, INSERT, UPDATE, DELETE) is restricted
-- to users with the 'service_role'.
-- ================================================

-- ── 1. Drop existing policies (for re-runnability) ───────────
DROP POLICY IF EXISTS "Allow public insert" ON public.leads;
DROP POLICY IF EXISTS "Allow service role full access" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert" ON public.analytics_events;
DROP POLICY IF EXISTS "Allow service role full access" ON public.analytics_events;
DROP POLICY IF EXISTS "Allow public read" ON public.content_blocks;
DROP POLICY IF EXISTS "Allow service role full access" ON public.content_blocks;
DROP POLICY IF EXISTS "Allow public read on published" ON public.case_studies;
DROP POLICY IF EXISTS "Allow service role full access" ON public.case_studies;
DROP POLICY IF EXISTS "Allow public read" ON public.testimonials;
DROP POLICY IF EXISTS "Allow service role full access" ON public.testimonials;
DROP POLICY IF EXISTS "Allow public read" ON public.site_metrics;
DROP POLICY IF EXISTS "Allow service role full access" ON public.site_metrics;

-- ── 2. Enable RLS on all tables ───────────────────────────────
ALTER TABLE public.leads              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_metrics       ENABLE ROW LEVEL SECURITY;

-- ── 3. Define policies for `leads` ────────────────────────────
CREATE POLICY "Allow public insert" ON public.leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role full access" ON public.leads
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── 4. Define policies for `analytics_events` ─────────────────
CREATE POLICY "Allow public insert" ON public.analytics_events
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role full access" ON public.analytics_events
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── 5. Define policies for `content_blocks` ───────────────────
CREATE POLICY "Allow public read" ON public.content_blocks
  FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON public.content_blocks
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── 6. Define policies for `case_studies` ─────────────────────
CREATE POLICY "Allow public read on published" ON public.case_studies
  FOR SELECT USING (status = 'published');
CREATE POLICY "Allow service role full access" ON public.case_studies
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── 7. Define policies for `testimonials` ─────────────────────
CREATE POLICY "Allow public read" ON public.testimonials
  FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON public.testimonials
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── 8. Define policies for `site_metrics` ─────────────────────
CREATE POLICY "Allow public read" ON public.site_metrics
  FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON public.site_metrics
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');


-- ================================================
-- SUPABASE STORAGE: buckets
-- ================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('case-study-images',   'case-study-images',   true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('testimonial-avatars', 'testimonial-avatars', true, 2097152,  ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;
