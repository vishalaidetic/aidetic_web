import { NotFoundError } from '@/lib/types/api'
import { CaseStudy, CaseStudyCreateInput, CaseStudyListQuery } from '@/lib/types/case_study'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from './client'
import type { Database } from './types'

export class CaseStudyRepository {
  constructor(private client: SupabaseClient<Database>) { }

  async listCaseStudies(params: CaseStudyListQuery): Promise<{ case_studies: CaseStudy[]; total: number }> {
    const { page, limit, published, search, tag } = params

    let query = this.client
      .from('case_studies')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (published !== 'all') {
      query = query.eq('published', published === 'true')
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (tag && tag !== 'All') {
      query = query.ilike('title', `%${tag}%`)
    }

    const from = (page - 1) * limit
    query = query.range(from, from + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch case studies: ${error.message}`)
    }

    return {
      case_studies: (data || []) as any[],
      total: count || 0,
    }
  }

  async getCaseStudyById(id: string): Promise<CaseStudy> {
    const { data, error } = await this.client
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new NotFoundError(`Case study with ID ${id} not found`)
    }

    return data as any
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
    const { data, error } = await this.client
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) {
      throw new NotFoundError(`Case study with slug "${slug}" not found`)
    }

    return data as any
  }

  async createCaseStudy(input: CaseStudyCreateInput): Promise<CaseStudy> {
    const now = new Date().toISOString()

    const { data, error } = await this.client
      .from('case_studies')
      .insert({
        ...input,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error || !data) {
      throw new Error(`Failed to create case study: ${error?.message || 'Unknown error'}`)
    }

    return data as any
  }

  async updateCaseStudy(id: string, input: Partial<CaseStudyCreateInput>): Promise<CaseStudy> {
    const now = new Date().toISOString()

    const { data, error } = await this.client
      .from('case_studies')
      .update({
        ...input,
        updated_at: now,
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new NotFoundError(`Case study with ID ${id} not found`)
    }

    return data as any
  }

  async deleteCaseStudy(id: string): Promise<void> {
    const { error } = await this.client.from('case_studies').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete case study: ${error.message}`)
    }
  }

  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    let query = this.client.from('case_studies').select('id', { count: 'exact' }).eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { count, error } = await query

    if (error) {
      throw new Error(`Failed to check slug uniqueness: ${error.message}`)
    }

    return count === 0
  }

  async getPublishedCount(): Promise<number> {
    const { count, error } = await this.client
      .from('case_studies')
      .select('id', { count: 'exact' })
      .eq('published', true)

    if (error) {
      throw new Error(`Failed to get case study count: ${error.message}`)
    }

    return count || 0
  }
}

export function getCaseStudyRepository(): CaseStudyRepository {
  const client = createServerClient()
  return new CaseStudyRepository(client)
}
