import { DashboardSidebar } from '@/components/admin/dashboard-sidebar'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { cookies } from 'next/headers'
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

/**
 * Layout for the admin route group (/admin/[uuid]/*).
 *
 * Server-side auth guard — reads the signed admin_session cookie.
 * Unauthenticated visitors are redirected to /admin/login.
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? ''
  const adminEmail = sessionCookie ? await verifySessionToken(sessionCookie) : null

  if (!adminEmail) {
    const adminUuid = process.env.NEXT_PUBLIC_ADMIN_ROUTE_UUID
    redirect(`/admin/${adminUuid}/login`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar on top */}
      <Navigation adminEmail={adminEmail} />

      {/* Main container with Sidebar & Content */}
      <div className="flex flex-1 min-w-0">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer at the very bottom spanning full width */}
      <Footer />
    </div>
  )
}
