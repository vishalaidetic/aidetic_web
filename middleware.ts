import { type NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/session'

/**
 * Next.js Middleware
 *
 * Protects all /admin/[uuid] routes:
 *  • Unauthenticated visitors → redirect to /admin/[uuid]/login
 *  • Already-logged-in admins visiting /admin/[uuid]/login → redirect to /admin/[uuid]
 *
 * Auth is based on a signed httpOnly cookie (admin_session) set by adminLoginAction.
 * No Supabase Auth session is needed.
 */
export async function middleware(request: NextRequest) {
  const adminUuid = process.env.NEXT_PUBLIC_ADMIN_ROUTE_UUID
  if (!adminUuid) return NextResponse.next()  // No UUID configured, skip admin routing
  const adminBasePath = `/admin/${adminUuid}`
  
  const { pathname } = request.nextUrl

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? ''
  const adminEmail = sessionCookie ? await verifySessionToken(sessionCookie) : null
  const isAuthenticated = adminEmail !== null

  const isAdminLoginPage = pathname === `${adminBasePath}/login`
  const isAdminRoute = pathname.startsWith(adminBasePath)

  // Protect the admin area — redirect unauthenticated users to login
  if (isAdminRoute && !isAdminLoginPage && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = `${adminBasePath}/login`
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Skip the login page if already authenticated
  if (isAdminLoginPage && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = adminBasePath
    dashboardUrl.searchParams.delete('redirectTo')
    return NextResponse.redirect(dashboardUrl)
  }

  // Prevent access to /admin/ with a wrong UUID — redirect to home (don't reveal the correct path)
  if (pathname.startsWith('/admin/') && !pathname.startsWith(adminBasePath)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user tries to access the old /dashboard route, redirect them to home page (or 404)
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url))
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
