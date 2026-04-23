// ─────────────────────────────────────────────
// Supabase Database Migrations
// Run these in Supabase SQL Editor in order
// ─────────────────────────────────────────────

-- ================================================
-- MIGRATION 001: Enable UUID extension
-- ================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ================================================
-- MIGRATION 002: Leads table
-- ================================================
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

CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);


-- ================================================
-- MIGRATION 003: Analytics events table
-- ================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event       TEXT NOT NULL,
  page        TEXT NOT NULL,
  metadata    JSONB,
  session_id  TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS analytics_event_idx ON public.analytics_events(event);
CREATE INDEX IF NOT EXISTS analytics_page_idx ON public.analytics_events(page);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON public.analytics_events(created_at DESC);


-- ================================================
-- MIGRATION 004: Content blocks table
-- ================================================
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


-- ================================================
-- MIGRATION 005: Case studies table
-- ================================================
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
CREATE INDEX IF NOT EXISTS case_studies_slug_idx ON public.case_studies(slug);


-- ================================================
-- MIGRATION 006: Testimonials table
-- ================================================
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
CREATE INDEX IF NOT EXISTS testimonials_order_idx ON public.testimonials(display_order);


-- ================================================
-- MIGRATION 007: Site metrics table
-- ================================================
CREATE TABLE IF NOT EXISTS public.site_metrics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label         TEXT NOT NULL,
  value         TEXT NOT NULL,
  icon          TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Seed with default values (edit from Admin Panel later)
INSERT INTO public.site_metrics (label, value, icon, display_order) VALUES
  ('Projects Delivered', '0+', 'rocket', 1),
  ('Happy Clients', '0+', 'heart', 2),
  ('Countries Served', '0+', 'globe', 3),
  ('Years of Experience', '0+', 'star', 4);


-- ================================================
-- MIGRATION 008: Updated_at trigger function
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
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
-- ROW LEVEL SECURITY POLICIES
-- ================================================

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

-- ── Leads ────────────────────────────────────────
-- Anyone can submit a lead (contact form)
CREATE POLICY "leads_insert_public"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service_role (backend) can read/update leads
CREATE POLICY "leads_select_service"
  ON public.leads FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "leads_update_service"
  ON public.leads FOR UPDATE
  TO service_role
  USING (true);

-- ── Analytics ────────────────────────────────────
-- Anyone can submit analytics events (fire-and-forget tracking)
CREATE POLICY "analytics_insert_public"
  ON public.analytics_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service_role can read analytics
CREATE POLICY "analytics_select_service"
  ON public.analytics_events FOR SELECT
  TO service_role
  USING (true);

-- ── Content Blocks ────────────────────────────────
-- Anyone can read content blocks (public site content)
CREATE POLICY "content_blocks_select_public"
  ON public.content_blocks FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only service_role (admin panel via backend) can mutate content
CREATE POLICY "content_blocks_insert_service"
  ON public.content_blocks FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "content_blocks_update_service"
  ON public.content_blocks FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "content_blocks_delete_service"
  ON public.content_blocks FOR DELETE
  TO service_role
  USING (true);

-- ── Case Studies ──────────────────────────────────
-- Public can only read published case studies
CREATE POLICY "case_studies_select_published"
  ON public.case_studies FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Service role can do everything (admin panel)
CREATE POLICY "case_studies_all_service"
  ON public.case_studies FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── Testimonials ──────────────────────────────────
-- Public can read all testimonials
CREATE POLICY "testimonials_select_public"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role manages testimonials (admin panel)
CREATE POLICY "testimonials_all_service"
  ON public.testimonials FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── Site Metrics ──────────────────────────────────
-- Public can read metrics
CREATE POLICY "site_metrics_select_public"
  ON public.site_metrics FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role manages metrics (admin panel)
CREATE POLICY "site_metrics_all_service"
  ON public.site_metrics FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ================================================
-- SUPABASE STORAGE: Create buckets
-- ================================================
-- Run these via Supabase Dashboard > Storage > New Bucket
-- OR via the SQL editor:

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('case-study-images', 'case-study-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('testimonial-avatars', 'testimonial-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can read public buckets
CREATE POLICY "case_study_images_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'case-study-images');

CREATE POLICY "testimonial_avatars_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'testimonial-avatars');

-- Only service_role can upload/delete
CREATE POLICY "case_study_images_service_write"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'case-study-images');

CREATE POLICY "case_study_images_service_delete"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'case-study-images');

CREATE POLICY "testimonial_avatars_service_write"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'testimonial-avatars');

CREATE POLICY "testimonial_avatars_service_delete"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'testimonial-avatars');
