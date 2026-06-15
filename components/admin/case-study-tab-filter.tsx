'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { getAdminBasePath } from '@/lib/admin-path'

const FILTER_OPTIONS = [
  { key: 'all', label: 'All Case Studies' },
  { key: 'published', label: 'Published' },
  { key: 'drafts', label: 'Drafts' },
]

export function CaseStudyTabFilter({ counts }: { counts: { all: number; published: number; drafts: number } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('filter') ?? 'all'
  const base = getAdminBasePath()

  return (
    <div className="flex items-center border-b border-slate-200 px-6 pt-4 gap-1 bg-[#F5F5F5]/60">
      {FILTER_OPTIONS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => router.push(tab.key === 'all' ? `${base}/case-studies` : `${base}/case-studies?filter=${tab.key}`)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            active === tab.key
              ? 'text-[#DC2626] border-[#DC2626]'
              : 'text-[#6B7280] border-transparent hover:text-[#DC2626] hover:border-[#DC2626]/20'
          }`}
        >
          {tab.label}
          <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
            active === tab.key
              ? 'bg-[#DC2626]/10 text-[#DC2626]'
              : 'bg-[#F5F5F5] text-[#6B7280]'
          }`}>
            {counts[tab.key as keyof typeof counts]}
          </span>
        </button>
      ))}
    </div>
  )
}
