import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogForm } from '@/components/admin/blog-form'
import { getBlogRepository } from '@/lib/db/blog_queries'

interface EditBlogPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Edit Blog Post',
  description: 'Edit an existing blog post',
}

/**
 * Edit blog post page
 * Admin-only page for editing existing blog posts
 */
export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params

  try {
    const repository = getBlogRepository()
    const blog = await repository.getBlogById(id)

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Edit Blog Post
          </h1>
          <p className="text-muted-foreground mt-2">
            Update the blog post content and metadata
          </p>
        </div>

        <BlogForm initialData={blog} isEditing />
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading blog for edit:', error)
    notFound()
  }
}
