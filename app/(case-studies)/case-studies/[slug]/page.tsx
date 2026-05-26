import { BlogContent } from '@/components/blog/blog-content'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { MarkdownService } from '@/lib/services/markdown.service'
import { formatDate } from '@/lib/utils/formatting'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const repository = getCaseStudyRepository()
    const study = await repository.getCaseStudyBySlug(slug)

    return {
      title: `${study.title} | Case Study`,
      description: study.description || `Read the case study: ${study.title}`,
      openGraph: {
        title: study.title,
        description: study.description || undefined,
        images: study.featured_image ? [study.featured_image] : [],
      },
    }
  } catch {
    return {
      title: 'Case Study Not Found',
    }
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  let study

  try {
    const repository = getCaseStudyRepository()
    study = await repository.getCaseStudyBySlug(slug)
  } catch (error) {
    notFound()
  }

  const toc = MarkdownService.generateTableOfContents(study.content)

  return (
    <div className="bg-background min-h-screen relative">
      {/* Blurry dual-gradient backdrop glow */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-[#1B2340]/6 rounded-full blur-[100px]" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-[#DC2626]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent to-background" />
      </div>

        <article className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Breadcrumb / Back Link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#DC2626] transition-colors group mb-4"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1 text-[#DC2626]" />
              Back to all case studies
            </Link>

            {/* Title Section - Top Full Width */}
            <div className="space-y-6">
              {study.tag_type && (
                <span className="inline-block px-4 py-1.5 bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {study.tag_type}
                </span>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
                {study.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#1B2340]" />
                  <span className="text-foreground font-medium">{study.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#DC2626]" />
                  <span>{formatDate(study.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {study.featured_image && (
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-background">
                <img
                  src={study.featured_image}
                  alt={study.title}
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

              {/* Case Study Content - Main Column */}
              <main className="lg:col-span-9 order-1 lg:order-2">
                <div className="space-y-12">
                  {/* Description / TL;DR Section */}
                  {study.description && (
                    <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-[#DC2626]">
                      <p className="text-xl text-[#1B2340] leading-relaxed font-medium italic">
                        &ldquo;{study.description}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Rendered Markdown */}
                  <div className="prose prose-lg max-w-none prose-headings:text-[#1B2340] prose-headings:font-bold prose-a:text-[#DC2626] prose-a:font-medium hover:prose-a:underline prose-strong:text-[#1B2340] prose-blockquote:border-l-[#DC2626] prose-code:text-[#DC2626]">
                    <BlogContent content={study.content} />
                  </div>

                  {/* Meta Footer */}
                  <div className="pt-16 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground italic">
                      <p>
                        Published on <time dateTime={new Date(study.created_at).toISOString()}>
                          {formatDate(study.created_at)}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </article>
      </div>
  )
}
