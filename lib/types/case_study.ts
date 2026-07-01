import { z } from 'zod'

// ============================================================
// Tag / Category Types
// ============================================================

export const CASE_STUDY_TAG_TYPES = [
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Technology',
  'Manufacturing',
  'Retail',
  'Other',
] as const

export type CaseStudyTagType = (typeof CASE_STUDY_TAG_TYPES)[number]

export type CaseStudySlug = string & { readonly __brand: 'CaseStudySlug' }
export const createCaseStudySlug = (value: string): CaseStudySlug => value as CaseStudySlug


// ============================================================
// Main Case Study Schema (flat table — hybrid approach)
// ============================================================

export const CaseStudySchema = z.object({
  id:              z.string().uuid('Invalid case study ID'),
  title:           z.string().min(1, 'Title is required').max(255),
  slug:            z.string().min(1, 'Slug is required').max(255),
  // subtitle replaces old "description" — kept nullable for compat
  subtitle:        z.string().max(500).nullable().optional(),
  company_name:    z.string().max(255).nullable().optional(),
  company_logo:    z.string().nullable().optional(),
  industry:        z.string().max(255).nullable().optional(),
  featured_image:  z.string().nullable().optional(),
  author:          z.string().max(255).nullable().optional(),
  // content kept for backward compat (markdown fallback)
  content:         z.string().nullable().optional(),
  published:       z.boolean().default(false),
  is_featured:     z.boolean().default(false),
  tag_type:        z.string().nullable().optional(),
  seo_title:       z.string().max(255).nullable().optional(),
  seo_description: z.string().max(500).nullable().optional(),
  created_by:      z.string().max(255).nullable().optional(),
  updated_by:      z.string().max(255).nullable().optional(),
  created_at:      z.string(),
  updated_at:      z.string(),
})

export type CaseStudy = z.infer<typeof CaseStudySchema>


// ============================================================
// Create / Update Input Schemas
// ============================================================

export const CaseStudyCreateInputSchema = z.object({
  title:           z.string().min(1, 'Title is required').max(255),
  slug:            z.string().min(1, 'Slug is required').max(255),
  subtitle:        z.string().max(500).optional().nullable(),
  company_name:    z.string().min(1, 'Company name is required').max(255),
  company_logo:    z.string().optional().nullable(),
  industry:        z.string().max(255).optional().nullable(),
  featured_image:  z.string().optional().nullable(),
  author:          z.string().min(1, 'Author is required').max(255),
  content:         z.string().optional().nullable(),   // markdown fallback
  published:       z.boolean().default(false),
  is_featured:     z.boolean().default(false),
  tag_type:        z.string().optional().nullable(),
  seo_title:       z.string().max(255).optional().nullable(),
  seo_description: z.string().max(500).optional().nullable(),
  created_by:      z.string().max(255).optional().nullable(),
  updated_by:      z.string().max(255).optional().nullable(),
  
  // Nested structured data
  problem: z.object({
    heading: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    cards: z.array(z.object({
      stat: z.string().nullable().optional(),
      stat_label: z.string().nullable().optional(),
      title: z.string().nullable().optional(),
      bullets: z.array(z.string()).default([]),
      display_order: z.number().default(0)
    })).default([])
  }).optional().nullable(),
  
  solution: z.object({
    heading: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    steps: z.array(z.object({
      step_number: z.number().nullable().optional(),
      title: z.string().nullable().optional(),
      bullets: z.array(z.string()).default([]),
      display_order: z.number().default(0)
    })).default([])
  }).optional().nullable(),
  
  results: z.object({
    title: z.string().nullable().optional(),
    items: z.array(z.union([
      z.string().transform(str => ({ category: str, badge: '', metrics: [], display_order: 0 })),
      z.object({
        category: z.string().nullable().optional(),
        badge: z.string().nullable().optional(),
        metrics: z.array(z.object({
          value: z.string().nullable().optional(),
          label: z.string().nullable().optional(),
        })).default([]),
        display_order: z.number().default(0)
      })
    ])).default([])
  }).optional().nullable(),

  highlights: z.array(z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional()
  })).optional().nullable(),
  
  metrics: z.array(z.object({
    metric_value: z.string().min(1),
    metric_label: z.string().min(1),
    display_order: z.number().default(0)
  })).optional().default([]),
  
  testimonial: z.object({
    quote: z.string().nullable().optional(),
    person_name: z.string().nullable().optional(),
    designation: z.string().nullable().optional(),
    avatar_url: z.string().nullable().optional(),
  }).optional().nullable(),
})

export type CaseStudyCreateInput = z.infer<typeof CaseStudyCreateInputSchema>

export const CaseStudyUpdateInputSchema = CaseStudyCreateInputSchema.partial()
export type CaseStudyUpdateInput = z.infer<typeof CaseStudyUpdateInputSchema>


// ============================================================
// List / Query Schemas
// ============================================================

export const CaseStudyListResponseSchema = z.object({
  case_studies: z.array(CaseStudySchema),
  total:        z.number().int().nonnegative(),
  page:         z.number().int().positive(),
  limit:        z.number().int().positive(),
})
export type CaseStudyListResponse = z.infer<typeof CaseStudyListResponseSchema>

export const CaseStudyListQuerySchema = z.object({
  page:      z.coerce.number().int().positive().default(1),
  limit:     z.coerce.number().int().positive().max(100).default(10),
  published: z.enum(['true', 'false', 'all']).default('true'),
  search:    z.string().optional(),
  tag:       z.string().optional(),
  tag_type:  z.string().optional(),
  industry:  z.string().optional(),
})

export type CaseStudyListQuery = z.infer<typeof CaseStudyListQuerySchema>


// ============================================================
// Child-table types (for future use — Phase 2)
// ============================================================

export interface CaseStudyMetric {
  id:            string
  case_study_id: string
  metric_value:  string
  metric_label:  string
  display_order: number
  created_at:    string
}

export interface CaseStudyAbout {
  id:            string
  case_study_id: string
  title:         string
  description:   string | null
}

export interface CaseStudyProblem {
  id:            string
  case_study_id: string
  heading:       string | null
  description:   string | null
}

export interface CaseStudyProblemCard {
  id:            string
  problem_id:    string
  stat:          string | null
  stat_label:    string | null
  title:         string | null
  bullets:       string[]
  display_order: number
}

export interface CaseStudySolution {
  id:            string
  case_study_id: string
  heading:       string | null
  description:   string | null
}

export interface CaseStudySolutionStep {
  id:            string
  solution_id:   string
  step_number:   number | null
  title:         string | null
  bullets:       string[]
  display_order: number
}

export interface CaseStudyTestimonial {
  id:            string
  case_study_id: string
  quote:         string | null
  person_name:   string | null
  designation:   string | null
  avatar_url:    string | null
}

export interface CaseStudyResult {
  id:            string
  case_study_id: string
  title:         string | null
}

export interface CaseStudyResultItem {
  id:            string
  result_id:     string
  category:      string | null
  badge:         string | null
  metrics:       Record<string, string>[]
  display_order: number
}

/** Full case study with all child relations loaded */
export interface CaseStudyFull extends CaseStudy {
  metrics:      CaseStudyMetric[]
  about:        CaseStudyAbout | null
  problem:      (CaseStudyProblem & { cards: CaseStudyProblemCard[] }) | null
  solution:     (CaseStudySolution & { steps: CaseStudySolutionStep[] }) | null
  testimonial:  CaseStudyTestimonial | null
  results:      (CaseStudyResult & { items: CaseStudyResultItem[] }) | null
}
