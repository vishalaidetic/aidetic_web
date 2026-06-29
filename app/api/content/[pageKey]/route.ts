import { NextRequest, NextResponse } from 'next/server'
import { getPageContent, setPageContent } from '@/lib/content'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  const { pageKey } = await params
  const content = await getPageContent(pageKey)
  return NextResponse.json(content)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  const { pageKey } = await params
  try {
    const body = await req.json()
    await setPageContent(pageKey, body)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
