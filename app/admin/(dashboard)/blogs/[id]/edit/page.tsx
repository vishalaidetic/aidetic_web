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

    return <BlogForm initialData={blog} isEditing />
  } catch (error) {
    console.error('[v0] Error loading blog for edit:', error)
    notFound()
  }
}
