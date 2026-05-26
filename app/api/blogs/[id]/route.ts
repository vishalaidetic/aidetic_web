import { formatErrorResponse, formatSuccessResponse } from '@/lib/api/handlers'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { isAuthorized } from '@/lib/middleware/auth'
import { UnauthorizedError, ValidationError } from '@/lib/types/api'
import { BlogCreateInputSchema } from '@/lib/types/blog'
import { NextRequest } from 'next/server'

/**
 * GET /api/blogs/[id]
 * Get a specific blog post by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const repository = getBlogRepository()
    const blog = await repository.getBlogById(id)

    return formatSuccessResponse(blog, 200)
  } catch (error) {
    return formatErrorResponse(error)
  }
}

/**
 * PATCH /api/blogs/[id]
 * Update a blog post (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    const { id } = await params

    // Parse and validate request body
    const body = await request.json()
    const updateInput = BlogCreateInputSchema.partial().parse(body)

    const repository = getBlogRepository()

    // Check if blog exists
    await repository.getBlogById(id)

    // If slug is being updated, check uniqueness
    if (updateInput.slug) {
      const isUnique = await repository.isSlugUnique(updateInput.slug, id)
      if (!isUnique) {
        return formatErrorResponse(
          new ValidationError('Slug already exists', {
            field: 'slug',
          })
        )
      }
    }

    // Update the blog
    const blog = await repository.updateBlog(id, updateInput)

    return formatSuccessResponse(blog, 200, 'Blog post updated successfully')
  } catch (error) {
    return formatErrorResponse(error)
  }
}

/**
 * DELETE /api/blogs/[id]
 * Delete a blog post (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    const { id } = await params
    const repository = getBlogRepository()

    // Check if blog exists
    await repository.getBlogById(id)

    // Delete the blog
    await repository.deleteBlog(id)

    return formatSuccessResponse(
      { id },
      200,
      'Blog post deleted successfully'
    )
  } catch (error) {
    return formatErrorResponse(error)
  }
}
