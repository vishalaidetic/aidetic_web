import { BlogForm } from '@/components/admin/blog-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Blog Post',
  description: 'Create a new blog post',
}

/**
 * Create blog post page
 * Admin-only page for creating new blog posts
 */
export default function CreateBlogPage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Create New Blog Post
        </h1>
        <p className="text-muted-foreground mt-2">
          Write and publish a new blog post with markdown support
        </p>
      </div>

      <BlogForm />
    </div>
  )
}
