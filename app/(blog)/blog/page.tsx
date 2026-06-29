import { BlogList } from '@/components/blog/blog-list'
import { BlogPageHero } from '@/components/blog/blog-page-hero'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { getPageContent } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Insights on AI interviews, hiring, and modern recruitment technologies',
}

export default async function Page() {
  const content = await getPageContent('blog')
  let blogs: any[] = []
  let hasError = false

  try {
    const repository = getBlogRepository()
    const result = await repository.listBlogs({
      page: 1,
      limit: 100,
      published: 'true',
    })
    blogs = result.blogs
  } catch (error) {
    console.error('Error loading blogs:', error)
    hasError = true
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page Hero Section */}
      <BlogPageHero content={content?.hero} />

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-0 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          {hasError ? (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-12 text-center">
              <p className="text-lg text-red-500">
                Error loading blog posts. Please try again later.
              </p>
            </div>
          ) : (
            <BlogList blogs={blogs} content={content} />
          )}
        </div>
      </div>
    </main>
  )
}
