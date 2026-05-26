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
        {/* Blurry dual-gradient backdrop glow - overflow-hidden scoped here to clip blurs without breaking sticky */}
        <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-[#1B2340]/6 rounded-full blur-[100px]" />
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-[#DC2626]/5 rounded-full blur-[100px]" />
          {blog.featured_image && (
            <div
              className="absolute inset-[-10%] opacity-15 dark:opacity-15 blur-[120px] bg-cover bg-center"
              style={{ backgroundImage: `url(${blog.featured_image})` }}
            />
          )}
          {/* Fade out seamlessly into the standard background color at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent to-background" />
        </div>

        <article className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Breadcrumb / Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#DC2626] transition-colors group mb-4"
            >
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#DC2626]" />
              Back to Blog
            </Link>

            {/* Title Section - Top Full Width */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
                {blog.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1B2340] flex items-center justify-center text-white font-bold shadow-md">
                      {blog.author.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{blog.author}</span>
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
                    <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-[#DC2626]">
                      <p className="text-xl text-[#1B2340] leading-relaxed font-medium italic">
                        &ldquo;{blog.description}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Rendered Markdown */}
                  <div className="prose prose-lg max-w-none prose-headings:text-[#1B2340] prose-headings:font-bold prose-a:text-[#DC2626] prose-a:font-medium hover:prose-a:underline prose-strong:text-[#1B2340] prose-blockquote:border-l-[#DC2626] prose-code:text-[#DC2626]">
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
