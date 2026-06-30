import { NextRequest } from 'next/server'
import { UnauthorizedError } from '@/lib/types/api'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

/**
 * Verify admin authentication from request cookies
 * Returns null if authenticated, ApiError if not
 */
export function verifyAdminAuth(request: NextRequest): UnauthorizedError | null {
  // Allow public GET requests
  if (request.method === 'GET') {
    return null
  }

  // For protected methods, verify that the backend session cookie exists
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value

  if (!token) {
    return new UnauthorizedError('Missing authentication token')
  }

  return null
}

/**
 * Type-safe headers for client requests.
 * Since we now use HTTP-only cookies for authentication, we don't need to pass a Bearer token here.
 */
export function getAdminHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  }
}

/**
 * Check if request is authorized
 */
export function isAuthorized(request: NextRequest): boolean {
  return verifyAdminAuth(request) === null
}
