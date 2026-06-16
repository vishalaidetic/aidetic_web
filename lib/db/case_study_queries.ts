import { NotFoundError } from '@/lib/types/api'
import { CaseStudy, CaseStudyCreateInput, CaseStudyListQuery } from '@/lib/types/case_study'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from './client'
import type { Database } from './types'

export class CaseStudyRepository {
  constructor(private client: SupabaseClient<Database>) { }

  async listCaseStudies(params: CaseStudyListQuery): Promise<{ case_studies: any[]; total: number }> {
    const { page, limit, published, search, tag } = params

    let query = this.client
      .from('case_studies')
      .select('*, metrics:case_study_metrics(metric_value, metric_label, display_order), testimonials:case_study_testimonials(quote, person_name, designation, avatar_url)', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (published !== 'all') {
      query = query.eq('published', published === 'true')
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,subtitle.ilike.%${search}%`)
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

    // Sort metrics by display_order for each study
    const case_studies = (data || []).map((s: any) => ({
      ...s,
      metrics: Array.isArray(s.metrics)
        ? [...s.metrics].sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
        : [],
      testimonial: Array.isArray(s.testimonials) && s.testimonials.length > 0 ? s.testimonials[0] : (s.testimonials || null),
    }))

    return {
      case_studies,
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

  /**
   * Fetch a single case study with ALL child-table data assembled.
   * Matches the exact DB schema from migrations.sql.
   */
  async getCaseStudyBySlugFull(slug: string): Promise<any> {
    // 1. Main row
    const { data: study, error } = await this.client
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !study) {
      throw new NotFoundError(`Case study with slug "${slug}" not found`)
    }

    return this._attachChildTables(study)
  }

  async getCaseStudyByIdFull(id: string): Promise<any> {
    const { data: study, error } = await this.client
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !study) {
      throw new NotFoundError(`Case study with ID ${id} not found`)
    }

    return this._attachChildTables(study)
  }

  private async _attachChildTables(study: any): Promise<any> {
    const id = study.id

    // 2. Hero Metrics
    const { data: metrics } = await this.client
      .from('case_study_metrics')
      .select('*')
      .eq('case_study_id', id)
      .order('display_order', { ascending: true })

    // 3. Problem + problem cards
    const { data: problemRow } = await this.client
      .from('case_study_problem')
      .select('*')
      .eq('case_study_id', id)
      .maybeSingle()

    let problem = null
    if (problemRow) {
      const { data: cards } = await this.client
        .from('case_study_problem_cards')
        .select('*')
        .eq('problem_id', problemRow.id)
        .order('display_order', { ascending: true })

      problem = {
        ...problemRow,
        cards: (cards || []).map((c: any) => ({
          ...c,
          bullets: Array.isArray(c.bullets) ? c.bullets : (typeof c.bullets === 'string' ? JSON.parse(c.bullets) : []),
        })),
      }
    }

    // 4. Solution + solution steps
    const { data: solutionRow } = await this.client
      .from('case_study_solution')
      .select('*')
      .eq('case_study_id', id)
      .maybeSingle()

    let solution = null
    if (solutionRow) {
      const { data: steps } = await this.client
        .from('case_study_solution_steps')
        .select('*')
        .eq('solution_id', solutionRow.id)
        .order('display_order', { ascending: true })

      solution = {
        ...solutionRow,
        steps: (steps || []).map((s: any) => ({
          ...s,
          bullets: Array.isArray(s.bullets) ? s.bullets : (typeof s.bullets === 'string' ? JSON.parse(s.bullets) : []),
        })),
      }
    }

    // 5. Testimonial
    const { data: testimonial } = await this.client
      .from('case_study_testimonials')
      .select('*')
      .eq('case_study_id', id)
      .maybeSingle()

    // 6. Results + result items
    const { data: resultsRow } = await this.client
      .from('case_study_results')
      .select('*')
      .eq('case_study_id', id)
      .maybeSingle()

    let results = null
    if (resultsRow) {
      const { data: items } = await this.client
        .from('case_study_result_items')
        .select('*')
        .eq('result_id', resultsRow.id)
        .order('display_order', { ascending: true })

      results = {
        ...resultsRow,
        items: (items || []).map((item: any) => ({
          ...item,
          metrics: Array.isArray(item.metrics) ? item.metrics : (typeof item.metrics === 'string' ? JSON.parse(item.metrics) : []),
        })),
      }
    }

    return {
      ...study,
      metrics: metrics || [],
      problem,
      solution,
      testimonial: testimonial || null,
      results,
    }
  }

  /** Legacy: flat fetch, no child tables */
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
    const { problem, solution, results, metrics, testimonial, highlights, ...caseStudyData } = input

    const { data, error } = await this.client
      .from('case_studies')
      .insert({
        ...caseStudyData,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error || !data) {
      throw new Error(`Failed to create case study: ${error?.message || 'Unknown error'}`)
    }

    const id = (data as any).id

    // Save child tables
    await this._saveChildTables(id, problem, solution, results, metrics, testimonial)

    return data as any
  }

  async updateCaseStudy(id: string, input: Partial<CaseStudyCreateInput>): Promise<CaseStudy> {
    const now = new Date().toISOString()
    const { problem, solution, results, metrics, testimonial, highlights, ...caseStudyData } = input

    const { data, error } = await this.client
      .from('case_studies')
      .update({
        ...caseStudyData,
        updated_at: now,
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new NotFoundError(`Case study with ID ${id} not found`)
    }

    // Upsert child tables
    if (problem !== undefined || solution !== undefined || results !== undefined || metrics !== undefined || testimonial !== undefined) {
      await this._saveChildTables(id, problem, solution, results, metrics, testimonial)
    }

    return data as any
  }

  /** Helper — upsert all child-table data for a given case study ID */
  private async _saveChildTables(
    caseStudyId: string,
    problem?: any,
    solution?: any,
    results?: any,
    metrics?: any[],
    testimonial?: any,
  ): Promise<void> {
    // --- Hero Metrics ---
    if (metrics && metrics.length > 0) {
      await this.client.from('case_study_metrics').delete().eq('case_study_id', caseStudyId)
      const metricRows = metrics.map((m: any, i: number) => ({
        case_study_id: caseStudyId,
        metric_value: m.metric_value,
        metric_label: m.metric_label,
        display_order: m.display_order ?? i,
      }))
      await this.client.from('case_study_metrics').insert(metricRows)
    }

    // --- Testimonial ---
    if (testimonial) {
      await this.client
        .from('case_study_testimonials')
        .upsert(
          { case_study_id: caseStudyId, ...testimonial },
          { onConflict: 'case_study_id' }
        )
    }
    // --- Problem ---
    if (problem) {
      const { data: problemRow } = await this.client
        .from('case_study_problem')
        .upsert({ case_study_id: caseStudyId, heading: problem.heading, description: problem.description }, { onConflict: 'case_study_id' })
        .select('id')
        .single()

      if (problemRow && problem.cards?.length > 0) {
        // Delete old cards then re-insert
        await this.client.from('case_study_problem_cards').delete().eq('problem_id', problemRow.id)
        const cards = problem.cards.map((c: any, i: number) => ({
          problem_id: problemRow.id,
          stat: c.stat || null,
          stat_label: c.stat_label || null,
          title: c.title || null,
          bullets: JSON.stringify(c.bullets || []),
          display_order: c.display_order ?? i,
        }))
        if (cards.length > 0) await this.client.from('case_study_problem_cards').insert(cards)
      }
    }

    // --- Solution ---
    if (solution) {
      const { data: solutionRow } = await this.client
        .from('case_study_solution')
        .upsert({ case_study_id: caseStudyId, heading: solution.heading, description: solution.description }, { onConflict: 'case_study_id' })
        .select('id')
        .single()

      if (solutionRow && solution.steps?.length > 0) {
        await this.client.from('case_study_solution_steps').delete().eq('solution_id', solutionRow.id)
        const steps = solution.steps.map((s: any, i: number) => ({
          solution_id: solutionRow.id,
          step_number: s.step_number ?? i + 1,
          title: s.title || null,
          bullets: JSON.stringify(s.bullets || []),
          display_order: s.display_order ?? i,
        }))
        if (steps.length > 0) await this.client.from('case_study_solution_steps').insert(steps)
      }
    }

    // --- Results ---
    if (results) {
      const { data: resultsRow } = await this.client
        .from('case_study_results')
        .upsert({ case_study_id: caseStudyId, title: results.title || null }, { onConflict: 'case_study_id' })
        .select('id')
        .single()

      if (resultsRow && results.items?.length > 0) {
        await this.client.from('case_study_result_items').delete().eq('result_id', resultsRow.id)
        const items = results.items.map((item: any, i: number) => ({
          result_id: resultsRow.id,
          category: item.category || null,
          badge: item.badge || null,
          metrics: JSON.stringify(item.metrics || []),
          display_order: item.display_order ?? i,
        }))
        if (items.length > 0) await this.client.from('case_study_result_items').insert(items)
      }
    }
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
