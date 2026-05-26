import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import type { ReactNode } from 'react'

interface CaseStudiesLayoutProps {
  children: ReactNode
}

/**
 * Layout for case studies route group
 * Wraps all case study pages with navigation and footer
 */
export default function CaseStudiesLayout({ children }: CaseStudiesLayoutProps) {
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
