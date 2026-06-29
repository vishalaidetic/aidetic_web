import { BlogContent } from '@/components/blog/blog-content'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { MarkdownService } from '@/lib/services/markdown.service'
import { formatDate } from '@/lib/utils/formatting'
import { Calendar, ChevronLeft, Clock, User } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const repository = getBlogRepository()
    const { blogs } = await repository.listBlogs({ page: 1, limit: 100, published: 'true' })
    return blogs.map((blog) => ({ slug: blog.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const blog = await getBlogRepository().getBlogBySlug(slug)
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
        images: blog.featured_image ? [{ url: blog.featured_image }] : undefined,
      },
    }
  } catch {
    return { title: 'Blog Post' }
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  try {
    const repository = getBlogRepository()
    const blog = await repository.getBlogBySlug(slug)
    const { readingTimeMinutes } = MarkdownService.getMetadata(blog.content)
    const toc = MarkdownService.generateTableOfContents(blog.content)

    return (
      <div className="bg-white min-h-screen">

        {/* ── Top nav bar ─────────────────────────────────────── */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#DC2626] transition-colors group"
            >
              <ChevronLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              All posts
            </Link>
            {blog.tag_type && (
              <>
                <span className="text-slate-200">/</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {blog.tag_type}
                </span>
              </>
            )}
          </div>
        </div>

        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-32">

          {/* ── Hero ──────────────────────────────────────────── */}
          <header className="max-w-3xl mx-auto text-center mb-12 pt-4">

            {/* Tag pill */}
            {blog.tag_type && (
              <div className="inline-flex items-center px-3 py-1 bg-[#DC2626]/8 text-[#DC2626] text-[11px] font-bold uppercase tracking-[0.15em] rounded-full mb-6">
                {blog.tag_type}
              </div>
            )}
            {blog.is_featured && (
              <div className="inline-flex items-center px-3 py-1 bg-[#DC2626] text-white text-[11px] font-bold uppercase tracking-[0.15em] rounded-full mb-6 ml-2">
                Featured
              </div>
            )}

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-inter)', color: '#1B2340' }}
            >
              {blog.title}
            </h1>

            {/* Description */}
            {blog.description && (
              <p
                className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {blog.description}
              </p>
            )}

            {/* Author + meta bar */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 border-t border-b border-slate-100 py-4">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[#1B2340]">{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            </div>
          </header>

          {/* ── Featured image ────────────────────────────────── */}
          {blog.featured_image && (
            <div className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* ── Main content grid ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Sidebar TOC */}
            {toc.length > 0 && (
              <aside className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-24">
                  <TableOfContents toc={toc} />
                </div>
              </aside>
            )}

            {/* Article body */}
            <main className={toc.length > 0 ? 'lg:col-span-9 order-1 lg:order-2' : 'lg:col-span-12'}>
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-[#1B2340] prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-[#374151] prose-p:leading-[1.85] prose-p:text-[1.05rem]
                  prose-a:text-[#DC2626] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#1B2340] prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-[#DC2626] prose-blockquote:bg-[#DC2626]/[0.03] prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-slate-600
                  prose-code:text-[#DC2626] prose-code:bg-[#DC2626]/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:font-medium
                  prose-pre:rounded-xl prose-pre:shadow-md
                  prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-slate-100
                  prose-ul:my-4 prose-ol:my-4 prose-li:text-[#374151] prose-li:leading-relaxed
                  prose-hr:border-slate-100 prose-hr:my-10
                  prose-table:text-sm"
              >
                <BlogContent content={blog.content} />
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <User size={13} />
                  <span>Written by <span className="font-semibold text-[#1B2340]">{blog.author || 'Team'}</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Published {formatDate(blog.created_at)}</span>
                  {blog.updated_at !== blog.created_at && (
                    <span>· Updated {formatDate(blog.updated_at)}</span>
                  )}
                </div>
              </div>
            </main>
          </div>
        </article>
      </div>
    )
  } catch (error) {
    console.error('[blog] Error loading post:', error)
    notFound()
  }
}
