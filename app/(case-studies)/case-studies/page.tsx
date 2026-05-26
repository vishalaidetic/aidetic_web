import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatting'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Read our success stories and client case studies.',
}

export default async function CaseStudiesPage() {
  let caseStudies: any = []
  try {
    const repository = getCaseStudyRepository()
    const result = await repository.listCaseStudies({
      page: 1,
      limit: 100,
      published: 'true',
    })
    caseStudies = result.case_studies
  } catch (error) {
    console.error('Error loading case studies:', error)
  }

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
            Client Success Stories
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Discover how we've helped businesses transform their operations through innovative engineering solutions.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 mx-auto max-w-8xl">
        {caseStudies.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F5F5] rounded-2xl border border-slate-200">
          <Briefcase className="mx-auto h-12 w-12 text-[#6B7280] mb-4 opacity-40" />
          <h2 className="text-xl font-bold text-[#1B2340] mb-2">No Case Studies Yet</h2>
          <p className="text-[#6B7280]">Check back soon for our latest success stories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study: any) => (
            <Link key={study.id} href={`/case-studies/${study.slug}`}>
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#DC2626]/30 transition-all duration-300 overflow-hidden">
                {study.featured_image && (
                  <div className="relative h-56 overflow-hidden bg-[#F5F5F5]">
                    <img
                      src={study.featured_image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-[#1B2340]/0 group-hover:bg-[#1B2340]/20 transition-all duration-300" />
                    {study.tag_type && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md">
                          {study.tag_type}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* If no image, show tag at top of card content */}
                {!study.featured_image && study.tag_type && (
                  <div className="px-6 pt-6">
                    <span className="px-3 py-1 bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                      {study.tag_type}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-3 font-medium">
                    <Calendar size={12} />
                    <span>{formatDate(study.created_at)}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-200 leading-tight">
                    {study.title}
                  </h3>

                  {study.description && (
                    <p className="text-[#6B7280] line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                      {study.description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[#DC2626] font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                    Read Full Case Study <ArrowRight size={16} className="text-[#DC2626]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}
