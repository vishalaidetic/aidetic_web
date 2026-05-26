/**
 * Supabase database type definitions
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
          description: string | null
          content: string
          author: string
          featured_image: string | null
          published: boolean
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
          tag_type?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
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
