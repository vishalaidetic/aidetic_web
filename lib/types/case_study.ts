import { z } from 'zod'

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

export const CaseStudySchema = z.object({
  id: z.string().uuid('Invalid case study ID'),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  slug: z.string().min(1, 'Slug is required').max(255, 'Slug must be less than 255 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').nullable(),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required').max(255),
  featured_image: z.string().url('Invalid image URL').nullable(),
  published: z.boolean().default(false),
  tag_type: z.string().nullable(),
  created_by: z.string().max(255).nullable(),
  updated_by: z.string().max(255).nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type CaseStudy = z.infer<typeof CaseStudySchema>

export const CaseStudyCreateInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255),
  description: z.string().max(500).optional().nullable(),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required').max(255),
  featured_image: z.string().url('Invalid image URL').optional().nullable(),
  published: z.boolean().default(false),
  tag_type: z.string().optional().nullable(),
  created_by: z.string().max(255).optional().nullable(),
  updated_by: z.string().max(255).optional().nullable(),
})

export type CaseStudyCreateInput = z.infer<typeof CaseStudyCreateInputSchema>

export const CaseStudyUpdateInputSchema = CaseStudyCreateInputSchema.partial()
export type CaseStudyUpdateInput = z.infer<typeof CaseStudyUpdateInputSchema>

export const CaseStudyListResponseSchema = z.object({
  case_studies: z.array(CaseStudySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
})
export type CaseStudyListResponse = z.infer<typeof CaseStudyListResponseSchema>

export const CaseStudyListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  published: z.enum(['true', 'false', 'all']).default('true'),
  search: z.string().optional(),
  tag: z.string().optional(),
  tag_type: z.string().optional(),
})

export type CaseStudyListQuery = z.infer<typeof CaseStudyListQuerySchema>
