import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import type { ReactNode } from 'react'

interface BlogLayoutProps {
  children: ReactNode
}

/**
 * Layout for blog route group
 * Wraps all blog pages with navigation and footer
 */
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <Footer />
    </>
  )
}
