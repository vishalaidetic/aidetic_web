'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, FileText, LayoutDashboard } from 'lucide-react'

export function DashboardSidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === '/dashboard'
        }
        return pathname === path || pathname.startsWith(path + '/')
    }

    return (
        <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">

                {/* Dashboard Link */}
                <Link
                    href="/dashboard"
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive('/dashboard')
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <LayoutDashboard
                        size={17}
                        className={isActive('/dashboard') ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Dashboard</span>
                </Link>

                {/* Blog Link */}
                <Link
                    href="/dashboard/blogs"
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive('/dashboard/blogs')
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <BookOpen
                        size={17}
                        className={isActive('/dashboard/blogs') ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Blog Posts</span>
                </Link>

                {/* Case Studies Link */}
                <Link
                    href="/dashboard/case-studies"
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
                        isActive('/dashboard/case-studies')
                            ? 'bg-[#1B2340] text-white font-semibold shadow-sm'
                            : 'text-[#6B7280] hover:text-[#1B2340] hover:bg-[#1B2340]/5 font-medium'
                    }`}
                >
                    <FileText
                        size={17}
                        className={isActive('/dashboard/case-studies') ? 'text-white' : 'text-[#6B7280] group-hover:text-[#1B2340]'}
                    />
                    <span>Case Studies</span>
                </Link>
            </nav>
        </aside>
    )
}