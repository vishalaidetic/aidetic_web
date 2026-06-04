import { BlogContent } from '@/components/blog/blog-content'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { MarkdownService } from '@/lib/services/markdown.service'
import { formatDate } from '@/lib/utils/formatting'
import { Calendar, ChevronLeft, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static parameters for blog slugs (for static generation)
 */
export async function generateStaticParams() {
  try {
    const repository = getBlogRepository()
    const { blogs } = await repository.listBlogs({
      page: 1,
      limit: 100,
      published: 'true',
    })

    return blogs.map((blog) => ({
      slug: blog.slug,
    }))
  } catch (error) {
    console.error('[v0] Error generating static params:', error)
    return []
  }
}

/**
 * Generate dynamic metadata for each blog post
 */
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const repository = getBlogRepository()
    const blog = await repository.getBlogBySlug(slug)

    const { summary } = MarkdownService.getMetadata(blog.content)

    return {
      title: blog.title,
      description: blog.description || summary,
      authors: blog.author ? [{ name: blog.author }] : undefined,
      openGraph: {
        title: blog.title,
        description: blog.description || summary,
        type: 'article',
        publishedTime: new Date(blog.created_at).toISOString(),
        authors: blog.author ? [blog.author] : undefined,
        images: blog.featured_image ? [{ url: blog.featured_image }] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'Read this blog post',
    }
  }
}

/**
 * Blog detail page - Shows full blog post with markdown rendering
 * Supports SSR and static generation
 */
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  try {
    const repository = getBlogRepository()
    const blog = await repository.getBlogBySlug(slug)
    const { readingTimeMinutes } = MarkdownService.getMetadata(blog.content)
    const toc = MarkdownService.generateTableOfContents(blog.content)

    return (
      <div className="bg-background min-h-screen relative">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(83,58,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(83,58,253,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden">
          {blog.featured_image && (
            <div
              className="absolute inset-[-10%] opacity-[0.08] dark:opacity-[0.08] blur-[120px] bg-cover bg-center"
              style={{ backgroundImage: `url(${blog.featured_image})` }}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent to-background" />
        </div>

        <article className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Breadcrumb / Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#64748d] hover:text-[#533afd] transition-colors group mb-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#533afd]" />
              Back to Blog
            </Link>

            {/* Title Section - Top Full Width */}
            <div className="space-y-6">
              <h1 
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15]" 
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {blog.title}
              </h1>

              {/* Tags */}
              {(blog.is_featured || blog.tag_type) && (
                <div className="flex flex-wrap items-center gap-2">
                  {blog.is_featured && (
                    <span className="bg-[#533afd] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-inter)' }}>
                      Featured
                    </span>
                  )}
                  {blog.tag_type && (
                    <span className="bg-[#533afd]/10 text-[#533afd] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-inter)' }}>
                      {blog.tag_type}
                    </span>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#533afd] flex items-center justify-center text-white font-bold shadow-md">
                      {blog.author.charAt(0)}
                    </div>
                    <span className="font-medium text-[#0d253d]">{blog.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-background">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Main Content Area - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8">
              {/* Sidebar TOC - Sticky */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-32">
                  <TableOfContents toc={toc} />
                </div>
              </aside>

              {/* Blog Content - Main Column */}
              <main className="lg:col-span-9 order-1 lg:order-2">
                <div className="space-y-12">
                  {/* Description / TL;DR Section */}
                  {blog.description && (
                    <div className="p-8 rounded-2xl bg-[#533afd]/[0.02] border border-[#533afd]/10 shadow-sm border-l-4 border-l-[#533afd]">
                      <p className="text-lg md:text-xl text-[#0d253d] leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                        {blog.description}
                      </p>
                    </div>
                  )}

                  {/* Rendered Markdown */}
                  <div className="prose prose-lg max-w-none prose-headings:text-[#0d253d] prose-headings:font-bold prose-headings:font-sans prose-a:text-[#533afd] prose-a:font-medium hover:prose-a:text-[#ea2261] hover:prose-a:underline prose-strong:text-[#0d253d] prose-blockquote:border-l-[#533afd] prose-blockquote:bg-[#533afd]/[0.02] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-code:text-[#ea2261]">
                    <BlogContent content={blog.content} />
                  </div>

                  {/* Meta Footer */}
                  <div className="pt-16 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground italic">
                      <p>
                        Published on <time dateTime={new Date(blog.created_at).toISOString()}>
                          {formatDate(blog.created_at)}
                        </time>
                      </p>
                      {blog.updated_at !== blog.created_at && (
                        <p>
                          Last updated on <time dateTime={new Date(blog.updated_at).toISOString()}>
                            {formatDate(blog.updated_at)}
                          </time>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </article>
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading blog detail:', error)
    notFound()
  }
}
