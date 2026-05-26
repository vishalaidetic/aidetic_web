import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in browser/client components.
 * Uses @supabase/ssr to handle cookie-based session management automatically.
 */
export function createBrowserClient() {
  return createSSRBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
