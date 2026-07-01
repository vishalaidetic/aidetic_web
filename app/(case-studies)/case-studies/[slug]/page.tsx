import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudyLayout } from '@/components/case-studies/case-study-layout'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const repository = getCaseStudyRepository()
    const study : any = await repository.getCaseStudyBySlug(slug)
    
    if (!study) {
      return {
        title: 'Case Study Not Found',
      }
    }

    return {
      title: `${study.title} | Case Study`,
      description: study.seo_description || study.subtitle || `Read the case study: ${study.title}`,
      openGraph: {
        title: study.seo_title || study.title,
        description: study.seo_description || study.subtitle || undefined,
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
  let study: any

  try {
    const repository = getCaseStudyRepository()
    study = await repository.getCaseStudyBySlug(slug)
    if (!study) throw new Error('Not found')
  } catch (error) {
    notFound()
  }

  return <CaseStudyLayout study={study} />
}
