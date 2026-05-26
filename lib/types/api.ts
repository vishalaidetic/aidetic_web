import { z } from 'zod'

/**
 * Generic type-safe API response wrapper
 * Supports both success and error states as discriminated unions
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
  details?: Record<string, unknown>
}

/**
 * Type guard to check if response is successful
 */
export const isApiSuccess = <T,>(response: ApiResponse<T>): response is ApiSuccessResponse<T> => {
  return response.success === true
}

/**
 * Type guard to check if response is an error
 */
export const isApiError = (response: ApiResponse<unknown>): response is ApiErrorResponse => {
  return response.success === false
}

/**
 * Custom error class for API errors
 * Extends Error to provide additional context
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Validation error class for request validation failures
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(400, message, 'VALIDATION_ERROR', details)
    this.name = 'ValidationError'
  }
}

/**
 * Not found error class for missing resources
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, message, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

/**
 * Unauthorized error class for auth failures
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

/**
 * Pagination info type
 */
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Generic paginated response type
 */
export interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationInfo
}
