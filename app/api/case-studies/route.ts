import { NextRequest, NextResponse } from 'next/server'
import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { CaseStudyCreateInputSchema, CaseStudyListQuerySchema } from '@/lib/types/case_study'
import { formatSuccessResponse, formatErrorResponse } from '@/lib/api/handlers'
import { isAuthorized } from '@/lib/middleware/auth'
import { ValidationError, UnauthorizedError } from '@/lib/types/api'

export async function GET(request: NextRequest) {
  try {
    const queryParams = Object.fromEntries(request.nextUrl.searchParams.entries())
    const params = CaseStudyListQuerySchema.parse(queryParams)

    const repository = getCaseStudyRepository()
    const { case_studies, total } = await repository.listCaseStudies(params)

    const totalPages = Math.ceil(total / params.limit)

    return formatSuccessResponse(
      {
        case_studies,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          totalPages,
        },
      },
      200
    )
  } catch (error) {
    return formatErrorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return formatErrorResponse(new UnauthorizedError())
    }

    const body = await request.json()
    const input = CaseStudyCreateInputSchema.parse(body)

    const repository = getCaseStudyRepository()
    const isUnique = await repository.isSlugUnique(input.slug)

    if (!isUnique) {
      return formatErrorResponse(
        new ValidationError('Slug already exists', {
          field: 'slug',
        })
      )
    }

    const caseStudy = await repository.createCaseStudy(input)

    return formatSuccessResponse(caseStudy, 201, 'Case study created successfully')
  } catch (error) {
    return formatErrorResponse(error)
  }
}
