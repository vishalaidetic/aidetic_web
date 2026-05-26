import { NextRequest } from 'next/server'
import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { CaseStudyUpdateInputSchema } from '@/lib/types/case_study'
import { formatSuccessResponse, formatErrorResponse } from '@/lib/api/handlers'
import { isAuthorized } from '@/lib/middleware/auth'
import { ValidationError, UnauthorizedError } from '@/lib/types/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const repository = getCaseStudyRepository()
    const caseStudy = await repository.getCaseStudyById(id)
    return formatSuccessResponse(caseStudy)
  } catch (error) {
    return formatErrorResponse(error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    const { id } = await params
    const body = await request.json()
    const input = CaseStudyUpdateInputSchema.parse(body)
    const repository = getCaseStudyRepository()

    if (input.slug) {
      const isUnique = await repository.isSlugUnique(input.slug, id)
      if (!isUnique) {
        return formatErrorResponse(
          new ValidationError('Slug already exists', { field: 'slug' })
        )
      }
    }

    const caseStudy = await repository.updateCaseStudy(id, input)
    return formatSuccessResponse(caseStudy, 200, 'Case study updated successfully')
  } catch (error) {
    return formatErrorResponse(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    const { id } = await params
    const repository = getCaseStudyRepository()
    await repository.deleteCaseStudy(id)

    return formatSuccessResponse(null, 200, 'Case study deleted successfully')
  } catch (error) {
    return formatErrorResponse(error)
  }
}
