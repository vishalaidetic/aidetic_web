import { type NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

/**
 * Next.js Middleware
 *
 * Protects all /dashboard routes:
 *  • Unauthenticated visitors → redirect to /admin/login
 *  • Already-logged-in admins visiting /admin/login → redirect to /dashboard
 *
 * Auth is based on a signed httpOnly cookie (admin_session) set by adminLoginAction.
 * No Supabase Auth session is needed.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? ''
  const adminEmail = sessionCookie ? await verifySessionToken(sessionCookie) : null
  const isAuthenticated = adminEmail !== null

  const isAdminLoginPage = pathname === '/admin/login'
  const isDashboardRoute = pathname.startsWith('/dashboard')

  // Protect /dashboard — redirect unauthenticated users to login
  if (isDashboardRoute && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Skip the login page if already authenticated
  if (isAdminLoginPage && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    dashboardUrl.searchParams.delete('redirectTo')
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *  _next/static, _next/image, favicon.ico, and public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
