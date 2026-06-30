'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

/** A non-httpOnly cookie so client JS can detect admin auth state */
const ADMIN_HINT_COOKIE = 'admin_hint'

/** Cookie max-age: 8 hours */
const SESSION_MAX_AGE = 60 * 60 * 8

/**
 * Server Action: Admin login.
 *
 * Compares the submitted email + password against the values stored in
 * ADMIN_EMAIL and ADMIN_PASSWORD environment variables (from .env.local).
 * On success, sets a signed httpOnly session cookie and redirects to the secure admin route.
 */
export async function adminLoginAction(formData: FormData) {
  const adminBasePath = `/admin`
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  if (!email || !password) {
    return { error: 'Please provide both email and password.' }
  }

  // Call backend API for authentication
  const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'
  try {
    const res = await fetch(`${BRAIN_BASE}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
      cache: 'no-store'
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      return { error: errData.message || 'Invalid email or password.' }
    }

    const data = await res.json()
    
    // FastAPI returns HTTP 200 even for errors in custom_response, so check status_code
    if (data.status_code && data.status_code !== 200) {
      return { error: data.message || data.error || 'Invalid email or password.' }
    }

    const token = data.data?.session_token || data.data?.token || data.data?.access_token || data.token
    if (!token) {
      return { error: 'Login successful, but no token received.' }
    }

    const cookieStore = await cookies()

    // Set HTTP-only secure cookie for backend auth (X-Token)
    cookieStore.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    })

    // Non-httpOnly hint so client-side JS (Navigation) can show the Admin button
    cookieStore.set(ADMIN_HINT_COOKIE, email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    })

  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An error occurred during login. Please try again.' }
  }

  redirect(adminBasePath)
}

/**
 * Server Action: Admin logout.
 * Clears the session cookie and redirects to the login page.
 */
export async function adminLogoutAction() {
  const adminBasePath = `/admin`

  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  cookieStore.delete(ADMIN_HINT_COOKIE)
  redirect(`${adminBasePath}/login`)
}
