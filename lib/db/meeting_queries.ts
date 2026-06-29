/**
 * Meeting request repository — wraps FastAPI /api/v1/cms/meeting-requests endpoints.
 */

const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'

async function cmsGet(path: string) {
  let xToken: string | undefined
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers')
      const store = await cookies()
      xToken = store.get('x_token')?.value
    } catch {}
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (xToken) headers['X-Token'] = xToken

  const res = await fetch(`${BRAIN_BASE}/api/v1${path}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  if (!res.ok) return []
  return res.json()
}

async function cmsPost(path: string, body: unknown) {
  let xToken: string | undefined
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers')
      const store = await cookies()
      xToken = store.get('x_token')?.value
    } catch {}
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (xToken) headers['X-Token'] = xToken

  const res = await fetch(`${BRAIN_BASE}/api/v1${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CMS request failed (${res.status}): ${text}`)
  }

  return res.json()
}

export interface MeetingRequest {
  id: string
  name: string
  email: string
  phone?: string | null
  organization: string
  purpose: string
  created_at?: string | null
}

export interface MeetingRequestCreate {
  name: string
  email: string
  phone?: string
  organization: string
  purpose: string
}

export async function getMeetingRequests(): Promise<MeetingRequest[]> {
  return cmsGet('/cms/meeting-requests')
}

export async function createMeetingRequest(data: MeetingRequestCreate): Promise<MeetingRequest> {
  return cmsPost('/cms/meeting-requests', data)
}
