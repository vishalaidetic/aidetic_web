'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, FileText, LayoutDashboard, Users, Languages, Home, Bot, Newspaper, BookMarked, AlignLeft, Footprints } from 'lucide-react'
import { getAdminBasePath } from '@/lib/admin-path'

const contentPages = [
  { key: 'home', label: 'Home Page', icon: Home },
  { key: 'agent-factory', label: 'Agent Factory', icon: Bot },
  { key: 'blog', label: 'Blog Page', icon: Newspaper },
  { key: 'case-study', label: 'Case Study Page', icon: BookMarked },
  { key: 'navbar', label: 'Navbar', icon: AlignLeft },
  { key: 'footer', label: 'Footer', icon: Footprints },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const base = getAdminBasePath()

  const isActive = (path: string) => {
    if (path === base) {
      return pathname === base
    }
    return pathname === path || pathname.startsWith(path + '/')
  }

  const navLinkClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group text-sm ${
      active
        ? 'bg-[#DC2626] text-white font-semibold shadow-sm'
        : 'text-[#6B7280] hover:text-[#DC2626] hover:bg-[#DC2626]/5 font-medium'
    }`

  return (
    <>
      <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto z-10">
      <nav className="flex-1 p-4 space-y-1">

        {/* Dashboard */}
        <Link href={base} className={navLinkClass(isActive(base))}>
          <LayoutDashboard size={17} className={isActive(base) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
          <span>Dashboard</span>
        </Link>

        {/* Blog Posts */}
        <Link href={`${base}/blogs`} className={navLinkClass(isActive(`${base}/blogs`))}>
          <BookOpen size={17} className={isActive(`${base}/blogs`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
          <span>Blog Posts</span>
        </Link>

        {/* Case Studies */}
        <Link href={`${base}/case-studies`} className={navLinkClass(isActive(`${base}/case-studies`))}>
          <FileText size={17} className={isActive(`${base}/case-studies`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
          <span>Case Studies</span>
        </Link>

        {/* Meeting Requests */}
        <Link href={`${base}/meeting-requests`} className={navLinkClass(isActive(`${base}/meeting-requests`))}>
          <Users size={17} className={isActive(`${base}/meeting-requests`) ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
          <span>Meeting Requests</span>
        </Link>

        {/* Content Manager */}
        <Link href={`${base}/content-manager/home`} className={navLinkClass(pathname.includes('/content-manager'))}>
          <Languages size={17} className={pathname.includes('/content-manager') ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
          <span>Content Manager</span>
        </Link>
      </nav>
    </aside>

    {/* Secondary Sidebar for Content Manager */}
    {pathname.includes('/content-manager') && (
      <aside className="w-64 shrink-0 h-screen sticky top-0 bg-slate-50/50 border-r border-slate-200 flex flex-col overflow-y-auto z-0">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <Languages size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1B2340] uppercase tracking-wider">Content Manager</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Select a page to edit</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {contentPages.map(({ key, label, icon: Icon }) => {
            const href = `${base}/content-manager/${key}`
            const active = pathname === href
            return (
              <Link
                key={key}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? 'bg-[#DC2626] text-white font-semibold shadow-sm'
                    : 'text-[#6B7280] hover:text-[#DC2626] hover:bg-slate-200/50 font-medium'
                }`}
              >
                <Icon size={16} className={active ? 'text-white' : 'text-[#6B7280]'} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    )}
    </>
  )
}