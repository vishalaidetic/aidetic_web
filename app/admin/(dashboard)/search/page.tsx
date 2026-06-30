import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import AdvancedSearch from '@/components/admin/advanced-search'

export const metadata: Metadata = {
  title: 'Advanced Search - Admin Dashboard',
  description: 'Search across all structured entities in the database',
}

export default function SearchPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DC2626] shadow-md shrink-0">
            <Search size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">Advanced Search</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Find complete end-to-end information across all entities
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <AdvancedSearch />
      </div>
    </div>
  )
}
