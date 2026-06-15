/**
 * Supabase database type definitions — manually maintained to match migrations.sql
 */
export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string
          author: string
          featured_image: string | null
          published: boolean
          is_featured: boolean
          tag_type: string | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content: string
          author: string
          featured_image?: string | null
          published?: boolean
          is_featured?: boolean
          tag_type?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string
          author?: string
          featured_image?: string | null
          published?: boolean
          is_featured?: boolean
          tag_type?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      case_studies: {
        Row: {
          id: string
          title: string
          slug: string
          subtitle: string | null
          company_name: string
          company_logo: string | null
          industry: string | null
          content: string | null
          author: string | null
          featured_image: string | null
          published: boolean
          is_featured: boolean
          tag_type: string | null
          seo_title: string | null
          seo_description: string | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          subtitle?: string | null
          company_name?: string
          company_logo?: string | null
          industry?: string | null
          content?: string | null
          author?: string | null
          featured_image?: string | null
          published?: boolean
          is_featured?: boolean
          tag_type?: string | null
          seo_title?: string | null
          seo_description?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          subtitle?: string | null
          company_name?: string
          company_logo?: string | null
          industry?: string | null
          content?: string | null
          author?: string | null
          featured_image?: string | null
          published?: boolean
          is_featured?: boolean
          tag_type?: string | null
          seo_title?: string | null
          seo_description?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      case_study_metrics: {
        Row: {
          id: string
          case_study_id: string
          metric_value: string
          metric_label: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          case_study_id: string
          metric_value: string
          metric_label: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          case_study_id?: string
          metric_value?: string
          metric_label?: string
          display_order?: number
        }
        Relationships: []
      }

      case_study_problem: {
        Row: {
          id: string
          case_study_id: string
          heading: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          case_study_id: string
          heading?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          case_study_id?: string
          heading?: string | null
          description?: string | null
        }
        Relationships: []
      }

      case_study_problem_cards: {
        Row: {
          id: string
          problem_id: string
          stat: string | null
          stat_label: string | null
          title: string | null
          bullets: any
          display_order: number
        }
        Insert: {
          id?: string
          problem_id: string
          stat?: string | null
          stat_label?: string | null
          title?: string | null
          bullets?: any
          display_order?: number
        }
        Update: {
          id?: string
          problem_id?: string
          stat?: string | null
          stat_label?: string | null
          title?: string | null
          bullets?: any
          display_order?: number
        }
        Relationships: []
      }

      case_study_solution: {
        Row: {
          id: string
          case_study_id: string
          heading: string | null
          description: string | null
        }
        Insert: {
          id?: string
          case_study_id: string
          heading?: string | null
          description?: string | null
        }
        Update: {
          id?: string
          case_study_id?: string
          heading?: string | null
          description?: string | null
        }
        Relationships: []
      }

      case_study_solution_steps: {
        Row: {
          id: string
          solution_id: string
          step_number: number | null
          title: string | null
          bullets: any
          display_order: number
        }
        Insert: {
          id?: string
          solution_id: string
          step_number?: number | null
          title?: string | null
          bullets?: any
          display_order?: number
        }
        Update: {
          id?: string
          solution_id?: string
          step_number?: number | null
          title?: string | null
          bullets?: any
          display_order?: number
        }
        Relationships: []
      }

      case_study_testimonials: {
        Row: {
          id: string
          case_study_id: string
          quote: string | null
          person_name: string | null
          designation: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          case_study_id: string
          quote?: string | null
          person_name?: string | null
          designation?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          case_study_id?: string
          quote?: string | null
          person_name?: string | null
          designation?: string | null
          avatar_url?: string | null
        }
        Relationships: []
      }

      case_study_results: {
        Row: {
          id: string
          case_study_id: string
          title: string | null
        }
        Insert: {
          id?: string
          case_study_id: string
          title?: string | null
        }
        Update: {
          id?: string
          case_study_id?: string
          title?: string | null
        }
        Relationships: []
      }

      case_study_result_items: {
        Row: {
          id: string
          result_id: string
          category: string | null
          badge: string | null
          metrics: any
          display_order: number
        }
        Insert: {
          id?: string
          result_id: string
          category?: string | null
          badge?: string | null
          metrics?: any
          display_order?: number
        }
        Update: {
          id?: string
          result_id?: string
          category?: string | null
          badge?: string | null
          metrics?: any
          display_order?: number
        }
        Relationships: []
      }

      meeting_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          organization: string
          purpose: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          organization: string
          purpose: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          organization?: string
          purpose?: string
        }
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
