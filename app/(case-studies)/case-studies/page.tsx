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
      {/* Page Hero - Half Moon Style */}
      <div className="relative w-full overflow-hidden text-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        
        {/* ── Half-circle: center above top edge ── */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: 0,
            left: '55%',
            transform: 'translate(-20%, -74%)',
            width: '65vw',
            height: '65vw',
            maxWidth: '700px',
            maxHeight: '700px',
            borderRadius: '50%',
            background: 'linear-gradient(to right, transparent 0%, transparent 45%, rgba(220,38,38,0.38) 55%, rgba(220,38,38,0.35) 78%, rgba(254,226,226,0.75) 100%)',
            opacity: 0.7,
          }}
        />

        <div className="relative z-10 space-y-4">
          <h1 
            className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#1B2340] leading-[1.1] tracking-tight"
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
