import path from 'path'
import fs from 'fs/promises'
import { createServerClient } from '@/lib/supabase/server'

export type PageKey = 'home' | 'agent-factory' | 'blog' | 'case-study' | 'navbar' | 'footer'

const BUCKET = 'images'
const FOLDER = 'locales'

/**
 * Server-side utility — reads a locale JSON file from Supabase Storage or fallback filesystem.
 * Use this in Server Components and Server Actions.
 */
export async function getPageContent<T = Record<string, unknown>>(page: PageKey): Promise<T> {
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(`${FOLDER}/${page}.json`)
    if (data && !error) {
      const text = await data.text()
      return JSON.parse(text) as T
    }
  } catch (err) {
    // Silent fail, proceed to fallback
  }

  // Fallback to local filesystem
  const filePath = path.join(process.cwd(), 'public', 'locales', `${page}.json`)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    console.error(`[content] Could not load locale for "${page}"`)
    return {} as T
  }
}
