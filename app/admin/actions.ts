'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

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
  const adminUuid = process.env.NEXT_PUBLIC_ADMIN_ROUTE_UUID
  const adminBasePath = `/admin/${adminUuid}`
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const password = (formData.get('password') as string | null) ?? ''

  const adminEmail = process.env.ADMIN_EMAIL ?? ''
  const adminPassword = process.env.ADMIN_PASSWORD ?? ''

  if (!adminEmail || !adminPassword) {
    return { error: 'Server misconfiguration: admin credentials are not set.' }
  }

  // Compare in constant time to prevent timing attacks
  const emailMatch = email === adminEmail
  const passwordMatch = password === adminPassword

  if (!emailMatch || !passwordMatch) {
    return { error: 'Invalid email or password.' }
  }

  // Create signed session token and set cookie
  const token = await createSessionToken(email)
  const cookieStore = await cookies()

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

  redirect(adminBasePath)
}

/**
 * Server Action: Admin logout.
 * Clears the session cookie and redirects to the login page.
 */
export async function adminLogoutAction() {
  const adminUuid = process.env.NEXT_PUBLIC_ADMIN_ROUTE_UUID
  const adminBasePath = `/admin/${adminUuid}`

  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  cookieStore.delete(ADMIN_HINT_COOKIE)
  redirect(`${adminBasePath}/login`)
}
