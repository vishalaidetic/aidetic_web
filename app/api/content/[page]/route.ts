import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'
import { cookies } from 'next/headers'
import { createServerClient } from '@/lib/supabase/server'

const VALID_PAGES = ['home', 'agent-factory', 'blog', 'case-study', 'navbar', 'footer']
const BUCKET = 'images'
const FOLDER = 'locales'

function getLocalePath(page: string) {
  return path.join(process.cwd(), 'public', 'locales', `${page}.json`)
}

// GET /api/content/[page] — public read
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params

  if (!VALID_PAGES.includes(page)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const supabase = await createServerClient()
  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(`${FOLDER}/${page}.json`)
    if (data && !error) {
      const text = await data.text()
      return NextResponse.json(JSON.parse(text))
    }
  } catch (err) {
    // Silent fail, proceed to fallback
  }

  try {
    const raw = await fs.readFile(getLocalePath(page), 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

// PUT /api/content/[page] — admin-only write
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  // Auth guard
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? ''
  const adminEmail = sessionCookie ? await verifySessionToken(sessionCookie) : null

  if (!adminEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  if (!VALID_PAGES.includes(page)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const body = await req.json()
    const json = JSON.stringify(body, null, 2)
    
    // Save to Supabase Storage
    const supabase = await createServerClient()
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(`${FOLDER}/${page}.json`, json, {
        contentType: 'application/json',
        upsert: true,
      })

    if (error) {
      console.error('[content] Supabase upload error:', error)
      return NextResponse.json({ error: 'Failed to save to Supabase' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[content] Error saving:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
