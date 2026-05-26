/**
 * Site configuration and constants
 */

export const SITE_NAME = 'Aidetic'
export const SITE_DESCRIPTION = 'Enterprise Grade Agentic AI Solutions'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Blog configuration
 */
export const BLOG_CONFIG = {
  postsPerPage: 10,
  featuredPostsCount: 3,
  minTitleLength: 3,
  maxTitleLength: 255,
  minDescriptionLength: 10,
  maxDescriptionLength: 500,
  minContentLength: 50,
} as const

/**
 * API configuration
 */
export const API_CONFIG = {
  baseUrl: `${SITE_URL}/api`,
  defaultTimeout: 30000,
  maxRequestSize: '10mb',
} as const

/**
 * Pagination configuration
 */
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
} as const

/**
 * Navigation links
 */
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard', label: 'Admin' },
] as const

/**
 * Response messages
 */
export const MESSAGES = {
  success: {
    blogCreated: 'Blog post created successfully',
    blogUpdated: 'Blog post updated successfully',
    blogDeleted: 'Blog post deleted successfully',
  },
  error: {
    notFound: 'Resource not found',
    unauthorized: 'Unauthorized access',
    validationError: 'Validation error',
    serverError: 'Internal server error',
  },
} as const

/**
 * Status codes as enums for type safety
 */
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const

/**
 * Regex patterns for validation
 */
export const REGEX = {
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/[^\s]+$/,
} as const

/**
 * Asset paths
 */
export const ASSETS = {
  logo: '/logo.svg',
  favicon: '/favicon.ico',
} as const
