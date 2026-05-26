-- ============================================================
-- Blogs table — full schema (run this in Supabase SQL editor)
-- ============================================================

-- 1. Create the table (fresh install)
CREATE TABLE IF NOT EXISTS public.blogs (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  description    TEXT,
  content        TEXT        NOT NULL,
  author         TEXT        NOT NULL,
  featured_image TEXT,
  published      BOOLEAN     DEFAULT FALSE,
  tag_type       TEXT,
  created_by     TEXT,
  updated_by     TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Migration: add new columns to an existing table
--    (safe to run multiple times — ADD COLUMN IF NOT EXISTS)
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS tag_type   TEXT,
  ADD COLUMN IF NOT EXISTS created_by TEXT,
  ADD COLUMN IF NOT EXISTS updated_by TEXT;

-- 3. Supabase Storage bucket for generic images
--    Or create it manually: Storage → New bucket → "images" → Public ON
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS is generally already managed by Supabase for storage.objects

-- Allow anyone to read images (public bucket)
-- DROP first because CREATE POLICY has no IF NOT EXISTS in PostgreSQL
DROP POLICY IF EXISTS "Public read images"  ON storage.objects;
CREATE POLICY "Public read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Allow admin uploads
DROP POLICY IF EXISTS "Admin upload images" ON storage.objects;
CREATE POLICY "Admin upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

-- Allow admin deletes
DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;
CREATE POLICY "Admin delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug       ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published  ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_tag_type   ON public.blogs(tag_type);

-- 5. Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blogs_updated_at_trigger ON public.blogs;
CREATE TRIGGER blogs_updated_at_trigger
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION update_blogs_updated_at();

-- ============================================================
-- Case Studies table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_studies (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  description    TEXT,
  content        TEXT        NOT NULL,
  author         TEXT        NOT NULL,
  featured_image TEXT,
  published      BOOLEAN     DEFAULT FALSE,
  tag_type       TEXT,
  created_by     TEXT,
  updated_by     TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug       ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published  ON public.case_studies(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON public.case_studies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_tag_type   ON public.case_studies(tag_type);

CREATE OR REPLACE FUNCTION update_case_studies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS case_studies_updated_at_trigger ON public.case_studies;
CREATE TRIGGER case_studies_updated_at_trigger
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION update_case_studies_updated_at();

