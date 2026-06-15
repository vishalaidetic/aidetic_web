-- ============================================================
-- EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ============================================================
-- Blogs table — full schema
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blogs (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  description    TEXT,
  content        TEXT        NOT NULL,
  author         TEXT        NOT NULL,
  featured_image TEXT,
  published      BOOLEAN     DEFAULT FALSE,
  is_featured    BOOLEAN     DEFAULT FALSE,
  tag_type       TEXT,
  created_by     TEXT,
  updated_by     TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: add new columns to existing blogs table (safe to re-run)
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS tag_type    TEXT,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS created_by  TEXT,
  ADD COLUMN IF NOT EXISTS updated_by  TEXT;


-- ============================================================
-- Storage Bucket
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read images"  ON storage.objects;
CREATE POLICY "Public read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Admin upload images" ON storage.objects;
CREATE POLICY "Admin upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "Admin delete images" ON storage.objects;
CREATE POLICY "Admin delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');


-- ============================================================
-- Blog Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_blogs_slug       ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published  ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_tag_type   ON public.blogs(tag_type);


-- ============================================================
-- Blog Trigger
-- ============================================================

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
-- Case Studies — main table (structured CMS)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_studies (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT        NOT NULL,
  slug             TEXT        NOT NULL UNIQUE,
  subtitle         TEXT,                        -- formerly "description"
  company_name     TEXT        NOT NULL DEFAULT '',
  company_logo     TEXT,
  industry         TEXT,                        -- free-text industry tag
  featured_image   TEXT,
  author           TEXT,
  content          TEXT,                        -- kept for backward compat (markdown fallback)
  published        BOOLEAN     DEFAULT FALSE,
  is_featured      BOOLEAN     DEFAULT FALSE,
  tag_type         TEXT,                        -- category label
  seo_title        TEXT,
  seo_description  TEXT,
  created_by       TEXT,
  updated_by       TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: add new columns to an existing case_studies table (safe to re-run)
ALTER TABLE public.case_studies
  ADD COLUMN IF NOT EXISTS subtitle        TEXT,
  ADD COLUMN IF NOT EXISTS company_name    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS company_logo    TEXT,
  ADD COLUMN IF NOT EXISTS industry        TEXT,
  ADD COLUMN IF NOT EXISTS is_featured     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS seo_title       TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS created_by      TEXT,
  ADD COLUMN IF NOT EXISTS updated_by      TEXT;

-- Rename old description → subtitle (only if description column still exists)
-- ALTER TABLE public.case_studies RENAME COLUMN description TO subtitle;


-- ============================================================
-- Hero Metrics
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_metrics (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  REFERENCES public.case_studies(id) ON DELETE CASCADE,
  metric_value   TEXT  NOT NULL,
  metric_label   TEXT  NOT NULL,
  display_order  INT   DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- About Company
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_about (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  UNIQUE REFERENCES public.case_studies(id) ON DELETE CASCADE,
  title          TEXT  DEFAULT 'About Company',
  description    TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- Problem Section
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_problem (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  UNIQUE REFERENCES public.case_studies(id) ON DELETE CASCADE,
  heading        TEXT,
  description    TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.case_study_problem_cards (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id    UUID  REFERENCES public.case_study_problem(id) ON DELETE CASCADE,
  stat          TEXT,
  stat_label    TEXT,
  title         TEXT,
  bullets       JSONB DEFAULT '[]',
  display_order INT   DEFAULT 0
);

-- Migration: add stat_label to existing case_study_problem_cards table (safe to re-run)
ALTER TABLE public.case_study_problem_cards
  ADD COLUMN IF NOT EXISTS stat_label TEXT;

-- ============================================================
-- Solution
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_solution (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  UNIQUE REFERENCES public.case_studies(id) ON DELETE CASCADE,
  heading        TEXT,
  description    TEXT
);

CREATE TABLE IF NOT EXISTS public.case_study_solution_steps (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_id   UUID  REFERENCES public.case_study_solution(id) ON DELETE CASCADE,
  step_number   INT,
  title         TEXT,
  bullets       JSONB DEFAULT '[]',
  display_order INT   DEFAULT 0
);


-- ============================================================
-- Testimonials
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_testimonials (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  UNIQUE REFERENCES public.case_studies(id) ON DELETE CASCADE,
  quote          TEXT,
  person_name    TEXT,
  designation    TEXT,
  avatar_url     TEXT
);


-- ============================================================
-- Results
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_results (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id  UUID  UNIQUE REFERENCES public.case_studies(id) ON DELETE CASCADE,
  title          TEXT
);

CREATE TABLE IF NOT EXISTS public.case_study_result_items (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id      UUID  REFERENCES public.case_study_results(id) ON DELETE CASCADE,
  category       TEXT,
  badge          TEXT,
  metrics        JSONB DEFAULT '[]',
  display_order  INT   DEFAULT 0
);


-- ============================================================
-- Related Case Studies
-- ============================================================

CREATE TABLE IF NOT EXISTS public.case_study_related (
  case_study_id         UUID REFERENCES public.case_studies(id) ON DELETE CASCADE,
  related_case_study_id UUID REFERENCES public.case_studies(id) ON DELETE CASCADE,
  PRIMARY KEY (case_study_id, related_case_study_id)
);


-- ============================================================
-- Case Study Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_case_studies_slug         ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published    ON public.case_studies(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at   ON public.case_studies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_company      ON public.case_studies(company_name);
CREATE INDEX IF NOT EXISTS idx_case_studies_tag_type     ON public.case_studies(tag_type);
CREATE INDEX IF NOT EXISTS idx_case_study_metrics_cs     ON public.case_study_metrics(case_study_id);
CREATE INDEX IF NOT EXISTS idx_case_study_problem_cards  ON public.case_study_problem_cards(problem_id);
CREATE INDEX IF NOT EXISTS idx_case_study_solution_steps ON public.case_study_solution_steps(solution_id);
CREATE INDEX IF NOT EXISTS idx_case_study_result_items   ON public.case_study_result_items(result_id);


-- ============================================================
-- Case Study Trigger
-- ============================================================

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


-- ============================================================
-- Meeting Requests
-- ============================================================

CREATE TABLE IF NOT EXISTS public.meeting_requests (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT  NOT NULL,
  email        TEXT  NOT NULL,
  phone        TEXT,
  organization TEXT  NOT NULL,
  purpose      TEXT  NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.meeting_requests
  ADD COLUMN IF NOT EXISTS phone TEXT;

CREATE INDEX IF NOT EXISTS idx_meeting_requests_created_at ON public.meeting_requests(created_at DESC);
