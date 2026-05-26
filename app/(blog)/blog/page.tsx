import { InfiniteBlogList } from '@/components/blog/infinite-blog-list'
import { getBlogRepository } from '@/lib/db/blog_queries'
import type { Metadata } from 'next'

interface BlogListPageProps {
  searchParams: Promise<{ page?: string }>
}

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts about technology and development',
}

/**
 * Blog list page - Shows all published blog posts
 * Supports pagination and SSR
 */
export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const limit = 10

  try {
    const repository = getBlogRepository()
    const { blogs, total } = await repository.listBlogs({
      page,
      limit,
      published: 'true',
    })

    const totalPages = Math.ceil(total / limit)
    const hasPrevious = page > 1
    const hasNext = page < totalPages

    return (
      <div className="w-full bg-white">
        {/* Page Hero - Light Grid Style */}
        <div className="relative w-full overflow-hidden text-center py-10 sm:py-16">
          
          {/* Static Base Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]" />

          {/* Dynamic Grid Lines Overlay with Moving Red Dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]">
            <style>{`
              @keyframes dotMoveX {
                0% { transform: translateX(-10vw); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateX(100vw); opacity: 0; }
              }
              @keyframes dotMoveY {
                0% { transform: translateY(-10vh); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
              }
            `}</style>
            {/* Horizontal moving dots */}
            <div className="absolute top-[calc(2rem*2-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
            <div className="absolute top-[calc(2rem*6-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
            <div className="absolute top-[calc(2rem*10-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
            
            {/* Vertical moving dots */}
            <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
            <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
            <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
          </div>

          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1B2340]">
              Aidetic Blog Posts
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Insights on development, data, ai, and modern technologies
            </p>
            {/* Bold Brand Red accent line */}
          </div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 mx-auto max-w-8xl">
          {/* Blog Grid with Infinite Scroll */}
          <InfiniteBlogList initialBlogs={blogs} totalPages={totalPages} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading blogs:', error)
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-lg text-destructive">
            Error loading blog posts. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}
