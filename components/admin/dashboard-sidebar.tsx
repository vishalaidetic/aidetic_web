'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, FileText, LayoutDashboard, Users } from 'lucide-react'
import { getAdminBasePath } from '@/lib/admin-path'

export function DashboardSidebar() {
    const pathname = usePathname()
    const base = getAdminBasePath()

    const isActive = (path: string) => {
        if (path === base) {
            return pathname === base
        }
        return pathname === path || pathname.startsWith(path + '/')
    }

    return (
        <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">

                {/* Dashboard Link */}
                <Link
                    href={base}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive(base)
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <LayoutDashboard
                        size={17}
                        className={isActive(base) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Dashboard</span>
                </Link>

                {/* Blog Link */}
                <Link
                    href={`${base}/blogs`}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive(`${base}/blogs`)
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <BookOpen
                        size={17}
                        className={isActive(`${base}/blogs`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Blog Posts</span>
                </Link>

                {/* Case Studies Link */}
                <Link
                    href={`${base}/case-studies`}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive(`${base}/case-studies`)
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <FileText
                        size={17}
                        className={isActive(`${base}/case-studies`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Case Studies</span>
                </Link>

                {/* Meeting Requests Link */}
                <Link
                    href={`${base}/meeting-requests`}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive(`${base}/meeting-requests`)
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <Users
                        size={17}
                        className={isActive(`${base}/meeting-requests`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Meeting Requests</span>
                </Link>
            </nav>
        </aside>
    )
}