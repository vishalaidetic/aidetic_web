import { NotFoundError } from '@/lib/types/api'
import { Blog, BlogCreateInput, BlogListQuery } from '@/lib/types/blog'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from './client'
import type { Database } from './types'

/**
 * Type-safe database query layer for blogs
 * All queries return typed Blog objects and throw ApiError on failures
 */

export class BlogRepository {
  constructor(private client: SupabaseClient<Database>) { }

  /**
   * Fetch all blogs with optional filtering
   */
  async listBlogs(params: BlogListQuery): Promise<{ blogs: Blog[]; total: number }> {
    const { page, limit, published, search, tag } = params

    let query = this.client
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Filter by published status
    if (published !== 'all') {
      query = query.eq('published', published === 'true')
    }

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply tag filter (since tags are derived from title keywords)
    if (tag && tag !== 'All') {
      query = query.ilike('title', `%${tag}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    query = query.range(from, from + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch blogs: ${error.message}`)
    }

    return {
      blogs: (data || []) as any[],
      total: count || 0,
    }
  }

  /**
   * Fetch a single blog by ID
   */
  async getBlogById(id: string): Promise<Blog> {
    const { data, error } = await this.client
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new NotFoundError(`Blog with ID ${id} not found`)
    }

    return data as any
  }

  /**
   * Fetch a single blog by slug
   */
  async getBlogBySlug(slug: string): Promise<Blog> {
    const { data, error } = await this.client
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      throw new NotFoundError(`Blog with slug "${slug}" not found`)
    }

    return data as any
  }

  /**
   * Create a new blog post
   */
  async createBlog(input: BlogCreateInput): Promise<Blog> {
    const now = new Date().toISOString()

    const { data, error } = await this.client
      .from('blogs')
      .insert({
        ...input,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error || !data) {
      throw new Error(`Failed to create blog: ${error?.message || 'Unknown error'}`)
    }

    return data as any
  }

  /**
   * Update an existing blog post
   */
  async updateBlog(id: string, input: Partial<BlogCreateInput>): Promise<Blog> {
    const now = new Date().toISOString()

    const { data, error } = await this.client
      .from('blogs')
      .update({
        ...input,
        updated_at: now,
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new NotFoundError(`Blog with ID ${id} not found`)
    }

    return data as any
  }

  /**
   * Delete a blog post
   */
  async deleteBlog(id: string): Promise<void> {
    const { error } = await this.client.from('blogs').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete blog: ${error.message}`)
    }
  }

  /**
   * Check if a slug is unique (excluding a specific blog)
   */
  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    let query = this.client.from('blogs').select('id', { count: 'exact' }).eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { count, error } = await query

    if (error) {
      throw new Error(`Failed to check slug uniqueness: ${error.message}`)
    }

    return count === 0
  }

  /**
   * Get total count of published blogs
   */
  async getPublishedCount(): Promise<number> {
    const { count, error } = await this.client
      .from('blogs')
      .select('id', { count: 'exact' })
      .eq('published', true)

    if (error) {
      throw new Error(`Failed to get blog count: ${error.message}`)
    }

    return count || 0
  }
}

/**
 * Get blog repository with server client
 */
export function getBlogRepository(): BlogRepository {
  const client = createServerClient()
  return new BlogRepository(client)
}
