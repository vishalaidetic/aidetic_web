import { NextRequest } from 'next/server'
import { UnauthorizedError } from '@/lib/types/api'

/**
 * Admin authentication token from environment
 * In production, use proper JWT or session management
 */
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token-secret'


/**
 * Verify admin authentication from request headers
 * Returns null if authenticated, ApiError if not
 */
export function verifyAdminAuth(request: NextRequest): UnauthorizedError | null {
  // Allow public GET requests
  if (request.method === 'GET') {
    return null
  }

  // For protected methods (POST, PATCH, DELETE), verify token
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new UnauthorizedError('Missing authorization header')
  }

  const token = authHeader.replace('Bearer ', '')

  if (token !== ADMIN_TOKEN) {
    return new UnauthorizedError('Invalid admin token')
  }

  return null
}

/**
 * Type-safe admin token header for client requests
 */
export function getAdminHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_TOKEN}`,
  }
}

/**
 * Check if request is authorized
 */
export function isAuthorized(request: NextRequest): boolean {
  return verifyAdminAuth(request) === null
}
