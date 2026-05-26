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
    const caseStudy = await repository.getCaseStudyById(id)

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Case Study</h1>
          <CaseStudyForm initialData={caseStudy} isEditing />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
