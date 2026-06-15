import { CaseStudyForm } from '@/components/admin/case-study-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Case Study',
  description: 'Create a new case study for Aidetic',
}

export default function CreateCaseStudyPage() {
  return <CaseStudyForm />
}
