import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { getPageContent } from '@/lib/content'
import type { Metadata } from 'next'
import { CaseStudyList } from '@/components/case-studies/case-study-list'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Read our success stories and client case studies.',
}

export default async function CaseStudiesPage() {
  const content:any = await getPageContent('case-study')
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
          <div className="absolute top-[calc(2rem*2-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
          <div className="absolute top-[calc(2rem*6-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
          <div className="absolute top-[calc(2rem*10-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
          
          {/* Vertical moving dots */}
          <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
          <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
          <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#533afd] shadow-[0_0_10px_2px_#533afd]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
        </div>

        <div className="relative z-10 space-y-4">
          <h1 
            className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#0d253d] leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {content?.hero?.heading || "Client Success Stories"}
          </h1>
          <p 
            className="text-lg text-[#64748d] leading-relaxed mt-6 max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {content?.hero?.subheading || "Discover how we've helped businesses transform their operations through innovative engineering solutions."}
          </p>
        </div>
      </div>

      <CaseStudyList caseStudies={caseStudies} content={content} />
    </div>
  )
}
