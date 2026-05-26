import { NextRequest, NextResponse } from 'next/server'
import { ZodSchema } from 'zod'
import type { ApiResponse } from '@/lib/types/api'
import { ApiError, ValidationError } from '@/lib/types/api'
import { verifyAdminAuth } from '@/lib/middleware/auth'

/**
 * Type-safe API handler wrapper
 * Handles validation, error handling, and response formatting
 */
export async function handleApiRequest<T>(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<T>,
  schema?: ZodSchema
): Promise<NextResponse<ApiResponse<T>>> {
  try {
    // Verify admin authentication
    const authError = verifyAdminAuth(request)
    if (authError) {
      return formatErrorResponse(authError)
    }

    // Validate request body if schema provided
    if (schema && request.method !== 'GET') {
      try {
        const body = await request.json()
        schema.parse(body)
      } catch (error: any) {
        return formatErrorResponse(
          new ValidationError('Invalid request body', {
            details: error.errors,
          })
        )
      }
    }

    // Execute handler
    const data = await handler(request)

    // Return success response
    return formatSuccessResponse(data, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}

/**
 * Format success API response
 */
export function formatSuccessResponse<T>(
  data: T,
  statusCode: number = 200,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    } as ApiResponse<T>,
    { status: statusCode }
  )
}

/**
 * Format error API response
 */
export function formatErrorResponse(error: unknown): NextResponse<ApiResponse<never>> {
  // Handle custom ApiError
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        ...(error.details && { details: error.details }),
      } as ApiResponse<never>,
      { status: error.statusCode }
    )
  }

  // Handle generic Error
  if (error instanceof Error) {
    console.error('[API Error]', error.message)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      } as ApiResponse<never>,
      { status: 500 }
    )
  }

  // Handle unknown error
  console.error('[Unknown API Error]', error)
  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
    } as ApiResponse<never>,
    { status: 500 }
  )
}

/**
 * Extract and validate query parameters
 */
export function getQueryParams<T extends Record<string, any>>(
  request: NextRequest,
  schema: ZodSchema
): T {
  const params = Object.fromEntries(request.nextUrl.searchParams)
  const validated = schema.parse(params)
  return validated as T
}

/**
 * Extract route parameters
 */
export function getRouteParams(
  request: NextRequest,
  paramNames: string[]
): Record<string, string> {
  const params: Record<string, string> = {}

  // Route parameters are available via request.nextUrl.pathname
  // This is a helper - actual extraction depends on Next.js route structure
  paramNames.forEach((name) => {
    const value = request.nextUrl.searchParams.get(name)
    if (value) params[name] = value
  })

  return params
}
