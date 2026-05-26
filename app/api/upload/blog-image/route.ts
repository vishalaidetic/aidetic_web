import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'
import { cookies } from 'next/headers'

const BUCKET = 'images'

/**
 * POST /api/upload/blog-image
 * Uploads a file to Supabase Storage and returns its public URL.
 * Protected — requires a valid admin session cookie.
 */
export async function POST(request: NextRequest) {
  // Auth guard
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? ''
  const adminEmail = sessionCookie ? await verifySessionToken(sessionCookie) : null

  if (!adminEmail) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: jpg, png, webp, gif, svg' },
        { status: 400 }
      )
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5 MB' },
        { status: 400 }
      )
    }

    // Build a unique filename
    const ext = file.name.split('.').pop() ?? 'jpg'
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `blog-covers/${uniqueName}`

    const supabase = await createServerClient()
    const arrayBuffer = await file.arrayBuffer()

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[upload] Supabase storage error:', uploadError)
      return NextResponse.json(
        { success: false, error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Build the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path)

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err) {
    console.error('[upload] Unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
