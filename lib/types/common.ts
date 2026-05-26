/**
 * Generic type for async data states
 * Useful for managing loading/error states in components
 */
export type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

/**
 * Generic type for async operations with loading and error states
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Result type for operations that can succeed or fail
 */
export type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E }

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null

/**
 * Optional type helper (same as Partial but for a single property)
 */
export type Optional<T> = T | undefined

/**
 * Generic metadata object
 */
export interface Metadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

/**
 * Environment variables required by the app
 */
export interface EnvironmentVariables {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY?: string
}

/**
 * Admin credentials for API endpoints
 */
export interface AdminCredentials {
  token: string
}
