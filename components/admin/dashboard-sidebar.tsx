'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  Users,
  Languages,
  Home,
  Bot,
  Newspaper,
  BookMarked,
  AlignLeft,
  Footprints,
  FolderKanban,
  Wallet,
  Building2,
  GitBranch,
  Sparkles,
} from 'lucide-react'
import { getAdminBasePath } from '@/lib/admin-path'

const contentPages = [
  { key: 'home', label: 'Home Page', icon: Home },
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

  const iconClass = (active: boolean) =>
    active ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'

  return (
    <>
      <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto z-10">
        <nav className="flex-1 p-4 space-y-1">

          {/* ── CMS Section ─────────────────────────────── */}
          <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">CMS</p>

          {/* Dashboard */}
          <Link href={base} className={navLinkClass(isActive(base))}>
            <LayoutDashboard size={17} className={iconClass(isActive(base))} />
            <span>Dashboard</span>
          </Link>

          {/* Blog Posts */}
          <Link href={`${base}/blogs`} className={navLinkClass(isActive(`${base}/blogs`))}>
            <BookOpen size={17} className={iconClass(isActive(`${base}/blogs`))} />
            <span>Blog Posts</span>
          </Link>

          {/* Case Studies */}
          <Link href={`${base}/case-studies`} className={navLinkClass(isActive(`${base}/case-studies`))}>
            <FileText size={17} className={iconClass(isActive(`${base}/case-studies`))} />
            <span>Case Studies</span>
          </Link>

          {/* Meeting Requests */}
          <Link href={`${base}/meeting-requests`} className={navLinkClass(isActive(`${base}/meeting-requests`))}>
            <Users size={17} className={iconClass(isActive(`${base}/meeting-requests`))} />
            <span>Meeting Requests</span>
          </Link>

          {/* Content Manager */}
          <Link href={`${base}/content-manager/home`} className={navLinkClass(pathname.includes('/content-manager'))}>
            <Languages size={17} className={pathname.includes('/content-manager') ? 'text-white' : 'text-[#6B7280] group-hover:text-[#DC2626]'} />
            <span>Content Manager</span>
          </Link>

          {/* ── Business Section ─────────────────────────── */}
          <p className="px-4 pt-5 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Business</p>

          {/* Employees */}
          <Link href={`${base}/employees`} className={navLinkClass(isActive(`${base}/employees`))}>
            <Building2 size={17} className={iconClass(isActive(`${base}/employees`))} />
            <span>Employees</span>
          </Link>

          {/* Projects */}
          <Link href={`${base}/projects`} className={navLinkClass(isActive(`${base}/projects`))}>
            <FolderKanban size={17} className={iconClass(isActive(`${base}/projects`))} />
            <span>Projects</span>
          </Link>

          {/* Finance */}
          <Link href={`${base}/finance`} className={navLinkClass(isActive(`${base}/finance`))}>
            <Wallet size={17} className={iconClass(isActive(`${base}/finance`))} />
            <span>Finance</span>
          </Link>

          {/* ── Intelligence Section ─────────────────────── */}
          <p className="px-4 pt-5 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Intelligence</p>

          {/* Knowledge Graph */}
          <Link href={`${base}/graph`} className={navLinkClass(isActive(`${base}/graph`))}>
            <GitBranch size={17} className={iconClass(isActive(`${base}/graph`))} />
            <span>Knowledge Graph</span>
          </Link>

          {/* AI Copilot */}
          <Link href={`${base}/copilot`} className={navLinkClass(isActive(`${base}/copilot`))}>
            <Sparkles size={17} className={iconClass(isActive(`${base}/copilot`))} />
            <span>AI Copilot</span>
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