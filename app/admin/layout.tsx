import type { ReactNode } from 'react'

/**
 * Minimal layout for admin auth pages (login).
 * Intentionally does NOT include the site Navigation or Footer so
 * the login page is visually isolated and not discoverable via normal browsing.
 */
export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
