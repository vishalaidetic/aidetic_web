/**
 * Case Study repository — wraps FastAPI /api/v1/cms/case-studies endpoints.
 */

const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'

async function cmsGet(path: string) {
  let xToken: string | undefined
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers')
      const store = await cookies()
      xToken = store.get('x_token')?.value
    } catch {}
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (xToken) headers['X-Token'] = xToken

  const res = await fetch(`${BRAIN_BASE}/api/v1${path}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}

async function cmsMutate(path: string, method: string, body?: unknown) {
  let xToken: string | undefined
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers')
      const store = await cookies()
      xToken = store.get('x_token')?.value
    } catch {}
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (xToken) headers['X-Token'] = xToken

  const res = await fetch(`${BRAIN_BASE}/api/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CMS request failed (${res.status}): ${text}`)
  }

  if (res.status === 204) return null
  return res.json()
}

// ─── CaseStudy types ─────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string
  title: string
  slug: string
  subtitle?: string | null
  company_name: string
  industry?: string | null
  author?: string | null
  content?: string | null
  published: boolean
  is_featured: boolean
  tag_type?: string | null
  seo_title?: string | null
  seo_description?: string | null
  created_by?: string | null
  updated_by?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export interface CaseStudyCreate {
  title: string
  slug: string
  subtitle?: string
  company_name?: string
  industry?: string
  author?: string
  content?: string
  published?: boolean
  is_featured?: boolean
  tag_type?: string
  seo_title?: string
  seo_description?: string
  created_by?: string
}

export interface CaseStudyUpdate {
  title?: string
  slug?: string
  subtitle?: string
  company_name?: string
  industry?: string
  author?: string
  content?: string
  published?: boolean
  is_featured?: boolean
  tag_type?: string
  seo_title?: string
  seo_description?: string
  updated_by?: string
}

// ─── Repository ───────────────────────────────────────────────────────────────

export function getCaseStudyRepository() {
  return {
    /** List case studies, optionally filtered by published status */
    async listCaseStudies({ published }: { page?: number; limit?: number; published?: 'true' | 'false' } = {}) {
      const qs = published !== undefined ? `?published=${published === 'true'}` : ''
      const case_studies: CaseStudy[] = (await cmsGet(`/cms/case-studies${qs}`)) ?? []
      return { case_studies, total: case_studies.length }
    },

    /** Get all case studies */
    async getCaseStudies() {
      const data: CaseStudy[] = (await cmsGet('/cms/case-studies')) ?? []
      return { data }
    },

    /** Get a single case study by ID */
    async getCaseStudyById(id: string): Promise<CaseStudy | null> {
      return cmsGet(`/cms/case-studies/${id}`)
    },

    /** Get a single case study by slug */
    async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
      return cmsGet(`/cms/case-studies/slug/${slug}`)
    },

    /** Create a case study */
    async createCaseStudy(data: CaseStudyCreate): Promise<CaseStudy> {
      return cmsMutate('/cms/case-studies', 'POST', data)
    },

    /** Check if a slug is unique */
    async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
      const caseStudy = await cmsGet(`/cms/case-studies/slug/${slug}`)
      if (!caseStudy) return true
      if (excludeId && caseStudy.id === excludeId) return true
      return false
    },

    /** Update a case study */
    async updateCaseStudy(id: string, data: CaseStudyUpdate): Promise<CaseStudy> {
      return cmsMutate(`/cms/case-studies/${id}`, 'PATCH', data)
    },

    /** Delete a case study */
    async deleteCaseStudy(id: string): Promise<void> {
      await cmsMutate(`/cms/case-studies/${id}`, 'DELETE')
    },
  }
}
