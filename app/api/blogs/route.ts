import { formatErrorResponse, formatSuccessResponse } from '@/lib/api/handlers'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { isAuthorized } from '@/lib/middleware/auth'
import { UnauthorizedError, ValidationError } from '@/lib/types/api'
import { BlogCreateInputSchema, BlogListQuerySchema } from '@/lib/types/blog'
import { NextRequest } from 'next/server'

/**
 * GET /api/blogs
 * List all blogs with optional pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const queryParams = Object.fromEntries(request.nextUrl.searchParams.entries())
    const params = BlogListQuerySchema.parse(queryParams)

    const repository = getBlogRepository()
    const { blogs, total } = await repository.listBlogs(params)

    const totalPages = Math.ceil(total / params.limit)

    return formatSuccessResponse(
      {
        blogs,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          totalPages,
        },
      },
      200
    )
  } catch (error) {
    return formatErrorResponse(error)
  }
}

/**
 * POST /api/blogs
 * Create a new blog post (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    // Parse and validate request body
    const body = await request.json()
    const input = BlogCreateInputSchema.parse(body)

    // Check slug uniqueness
    const repository = getBlogRepository()
    const isUnique = await repository.isSlugUnique(input.slug)

    if (!isUnique) {
      return formatErrorResponse(
        new ValidationError('Slug already exists', {
          field: 'slug',
        })
      )
    }

    // Create the blog
    const blog = await repository.createBlog(input)

    return formatSuccessResponse(blog, 201, 'Blog post created successfully')
  } catch (error) {
    return formatErrorResponse(error)
  }
}
