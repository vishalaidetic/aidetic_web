import { CaseStudyForm } from '@/components/admin/case-study-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Case Study',
  description: 'Create a new case study for Aidetic',
}

export default function CreateCaseStudyPage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 ">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Case Study</h1>
        <CaseStudyForm />
      </div>
    </div>
  )
}
