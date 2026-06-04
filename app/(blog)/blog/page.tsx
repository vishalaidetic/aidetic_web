import { BlogList } from '@/components/blog/blog-list'
import { BlogPageHero } from '@/components/blog/blog-page-hero'
import { getBlogRepository } from '@/lib/db/blog_queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aidetic Blogs',
  description: 'Insights on AI interviews, hiring, and modern recruitment technologies',
}

export default async function Page() {
  try {
    const repository = getBlogRepository()
    // Fetch blogs from the database
    const { blogs } = await repository.listBlogs({
      page: 1,
      limit: 100,
      published: 'true',
    })

    return (
      <main className="min-h-screen bg-white">
        {/* Page Hero Section */}
        <BlogPageHero />

        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-0 sm:pt-4">
          <div className="max-w-7xl mx-auto">
            <BlogList blogs={blogs as any} />
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error loading blogs:', error)
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg text-red-500">
          Error loading blog posts. Please try again later.
        </p>
      </div>
    )
  }
}
