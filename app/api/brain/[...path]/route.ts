/**
 * Next.js API Proxy → FastAPI Brain Backend
 *
 * All requests to /api/brain/<path> are forwarded to the Python backend at
 * BRAIN_API_URL/api/v1/<path>.  The BRAIN_API_TOKEN is injected server-side
 * so it never leaks to the client.
 */

import { NextRequest, NextResponse } from 'next/server'

const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'
const BRAIN_TOKEN = process.env.BRAIN_API_TOKEN ?? ''

type Params = { path: string[] }

async function proxy(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { path } = await params
  const apiPath = path.join('/')
  const search = req.nextUrl.search ?? ''
  const targetUrl = `${BRAIN_BASE}/api/v1/${apiPath}${search}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  // Forward X-Token if provided by the client
  const xToken = req.headers.get('x-token') || req.cookies.get('x_token')?.value
  if (xToken) {
    headers['X-Token'] = xToken
  }
  
  if (BRAIN_TOKEN) {
    headers['Authorization'] = `Bearer ${BRAIN_TOKEN}`
  }

  let body: string | undefined
  if (!['GET', 'HEAD'].includes(req.method)) {
    try {
      body = JSON.stringify(await req.json())
    } catch {
      body = undefined
    }
  }

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    cache: 'no-store',
  })

  const data = await upstream.text()
  return new NextResponse(data, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy
export const PUT = proxy
