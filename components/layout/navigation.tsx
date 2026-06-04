'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, LayoutDashboard, Menu, ShieldCheck, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { adminLogoutAction } from '@/app/admin/actions'
import { BookCallDialog } from '@/components/shared/book-call-dialog'

interface NavLink {
  href: string
  label: string
  external?: boolean
  children?: { href: string; label: string; description?: string }[]
}

const navLinks: NavLink[] = [
  {
    href: '/#products',
    label: 'Products',
    children: [
      {
        href: '/agent-factory',
        label: 'Agent Factory',
        description: 'AI agents that answer your business questions instantly.',
      },
    ],
  },
  { href: '/blog', label: 'Blogs' },
  { href: '/case-studies', label: 'Case Studies' },
]

interface NavigationProps {
  /** Passed by server layouts that already verify the session (e.g. admin layout). */
  adminEmail?: string | null
}

/**
 * Main navigation component — Responsive header with mobile menu support.
 *
 * Auth detection strategy:
 *  • Server layouts that know the admin (e.g. /admin/[uuid]) pass `adminEmail` as prop.
 *  • Public client-side pages can't read httpOnly cookies, so on login we also set
 *    a readable `admin_hint` cookie containing the email. This component reads that
 *    cookie via useEffect so the Admin button appears everywhere after login.
 *
 * Behaviour:
 *  - Public pages + guest        → "Book a Demo" button
 *  - Public pages + admin auth   → "Admin" button (→ /admin/[uuid]) + email + Sign out
 *  - Dashboard/admin pages       → email + Sign out only (no Book a Demo)
 */
export function Navigation({ adminEmail: adminEmailProp }: NavigationProps = {}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cookieEmail, setCookieEmail] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Read the non-httpOnly hint cookie client-side
  useEffect(() => {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin_hint='))
    setCookieEmail(match ? decodeURIComponent(match.split('=')[1]) : null)
  }, [pathname]) // re-check on every navigation

  // Prefer the server-provided prop (dashboard layout), fall back to cookie
  const adminEmail = adminEmailProp ?? cookieEmail

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Are we inside the admin / dashboard area?
  // NEXT_PUBLIC_ prefix allows client components to read this env var
  const adminUuid = process.env.NEXT_PUBLIC_ADMIN_ROUTE_UUID
  const adminBasePath = adminUuid ? `/admin/${adminUuid}` : '/admin'
  const isInDashboard = pathname.startsWith('/admin')

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/Aideticlogo.png"
              alt="Aidetic Logo"
              width={200}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop navigation (Center) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                /* Dropdown link */
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 text-sm font-semibold transition-colors relative py-1',
                      isActive(link.href)
                        ? 'text-[#533afd]'
                        : 'text-slate-600 hover:text-[#1B2340]'
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform duration-200',
                        openDropdown === link.label ? 'rotate-180' : ''
                      )}
                    />
                  </button>

                  {/* Dropdown panel */}
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/60 py-2 z-50">
                      {/* Arrow pointer */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-slate-100" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-4 py-3 mx-2 rounded-xl hover:bg-[#533afd]/5 transition-colors group"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="text-sm font-bold text-[#0d253d] group-hover:text-[#533afd] transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-xs text-[#64748d] leading-snug">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Regular link */
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-semibold transition-colors relative py-1',
                    isActive(link.href)
                      ? 'text-[#533afd]'
                      : 'text-slate-600 hover:text-[#1B2340]'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#533afd] rounded-full" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* ── Desktop actions (Right) ── */}
          <div className="hidden md:flex items-center justify-end gap-4 shrink-0">
            {adminEmail ? (
              /* Authenticated admin */
              <div className="flex items-center gap-3">
                {/* Admin shortcut — only on public pages */}
                {!isInDashboard && (
                  <Link href={adminBasePath} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors rounded-lg border border-slate-200 shadow-sm">
                    <LayoutDashboard size={16} className="text-[#533afd]" />
                    <span className="text-sm font-medium text-slate-700">Dashboard</span>
                  </Link>
                )}
                <span className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{adminEmail}</span>
                </span>
                {/* Sign out */}
                <form action={adminLogoutAction}>
                  <button
                    type="submit"
                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm hover:shadow"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              /* Guest */
              <BookCallDialog>
                <button className="text-sm font-bold px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#1B2340] to-[#DC2626] hover:opacity-90 text-white border-none shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  Request a Call
                </button>
              </BookCallDialog>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-1 bg-white pb-6 absolute left-0 right-0 px-4 shadow-xl">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 text-sm font-bold rounded-lg transition-colors',
                    isActive(link.href)
                      ? 'bg-slate-50 text-[#533afd]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#1B2340]'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {/* Mobile sub-items */}
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block pl-8 pr-4 py-2 text-sm font-semibold text-[#533afd] hover:bg-[#533afd]/5 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    → {child.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
              {adminEmail ? (
                <>
                  {/* Admin button — only on public pages */}
                  {!isInDashboard && (
                    <Link href={adminBasePath} onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-lg bg-gradient-to-r from-[#1B2340] to-[#533afd] hover:opacity-90 text-white border-none shadow-md transition-all duration-200">
                        <ShieldCheck size={16} /> Admin Dashboard
                      </button>
                    </Link>
                  )}
                  {/* Sign out */}
                  <form action={adminLogoutAction}>
                    <button
                      type="submit"
                      className="w-full text-sm font-bold px-4 py-3 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                /* Guest */
                <BookCallDialog>
                  <button className="w-full text-sm font-bold px-5 py-3 rounded-lg bg-gradient-to-r from-[#1B2340] to-[#DC2626] hover:opacity-90 text-white border-none shadow-md transition-all duration-200">
                    Request a Call
                  </button>
                </BookCallDialog>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
