/**
 * Blog repository — wraps FastAPI /api/v1/cms/blogs endpoints.
 * This is a drop-in replacement for the old Supabase-based blog_queries.
 */

const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'

async function cmsGet(path: string) {
  // Pick up x_token cookie on server side
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

// ─── Blog types ───────────────────────────────────────────────────────────────

export interface Blog {
  id: string
  title: string
  slug: string
  description?: string | null
  content: string
  author: string
  published: boolean
  is_featured: boolean
  tag_type?: string | null
  created_by?: string | null
  updated_by?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export interface BlogCreate {
  title: string
  slug: string
  description?: string
  content: string
  author: string
  published?: boolean
  is_featured?: boolean
  tag_type?: string
  created_by?: string
}

export interface BlogUpdate {
  title?: string
  slug?: string
  description?: string
  content?: string
  author?: string
  published?: boolean
  is_featured?: boolean
  tag_type?: string
  updated_by?: string
}

// ─── Repository ───────────────────────────────────────────────────────────────

export function getBlogRepository() {
  return {
    /** List blogs, optionally filtered by published status */
    async listBlogs({ published }: { page?: number; limit?: number; published?: 'true' | 'false' } = {}) {
      const qs = published !== undefined ? `?published=${published === 'true'}` : ''
      const blogs: Blog[] = (await cmsGet(`/cms/blogs${qs}`)) ?? []
      return { blogs }
    },

    /** Get all blogs */
    async getBlogs() {
      const data: Blog[] = (await cmsGet('/cms/blogs')) ?? []
      return { data }
    },

    /** Get a single blog by ID */
    async getBlogById(id: string): Promise<Blog | null> {
      return cmsGet(`/cms/blogs/${id}`)
    },

    /** Get a single blog by slug */
    async getBlogBySlug(slug: string): Promise<Blog | null> {
      return cmsGet(`/cms/blogs/slug/${slug}`)
    },

    /** Create a blog */
    async createBlog(data: BlogCreate): Promise<Blog> {
      return cmsMutate('/cms/blogs', 'POST', data)
    },

    /** Update a blog */
    async updateBlog(id: string, data: BlogUpdate): Promise<Blog> {
      return cmsMutate(`/cms/blogs/${id}`, 'PATCH', data)
    },

    /** Delete a blog */
    async deleteBlog(id: string): Promise<void> {
      await cmsMutate(`/cms/blogs/${id}`, 'DELETE')
    },

    /** Check if a slug is unique */
    async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
      const blog = await cmsGet(`/cms/blogs/slug/${slug}`)
      if (!blog) return true
      if (excludeId && blog.id === excludeId) return true
      return false
    },
  }
}
