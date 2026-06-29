import { CaseStudyForm } from '@/components/admin/case-study-form'
import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Case Study',
  description: 'Edit case study',
}

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const repository = getCaseStudyRepository()
    const caseStudy = await repository.getCaseStudyByIdFull(id)
    return <CaseStudyForm initialData={caseStudy} isEditing />
  } catch (error) {
    notFound()
  }
}
