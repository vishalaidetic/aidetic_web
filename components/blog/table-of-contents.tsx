'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  toc: Array<{ level: number; text: string; slug: string }>
}

/**
 * Table of Contents component for blog posts
 * Highlights active section based on scroll position
 */
export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Only observe H2 and H3 levels for TOC highlighting
    const filteredToc = toc.filter(item => item.level >= 2 && item.level <= 3)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    filteredToc.forEach((item) => {
      const element = document.getElementById(item.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  // Filter out H1 (usually the title) and deep headings for a cleaner TOC
  const visibleToc = toc.filter(item => item.level >= 2 && item.level <= 3)

  if (visibleToc.length === 0) return null

  return (
    <nav className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
          On This Page
        </p>
      </div>
      <ul className="space-y-4">
        {visibleToc.map((item) => (
          <li
            key={item.slug}
            className={cn(
              "text-sm transition-all duration-200",
              item.level === 3 ? "pl-4" : "pl-0"
            )}
          >
            <a
              href={`#${item.slug}`}
              className={cn(
                "group flex items-start gap-2 transition-colors duration-200",
                activeId === item.slug
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.slug)
                if (element) {
                  const offset = 100 // Account for sticky header
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - offset

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                  
                  // Update URL hash without jumping
                  window.history.pushState(null, '', `#${item.slug}`)
                }
              }}
            >
              <span className={cn(
                "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-0 transition-opacity",
                activeId === item.slug && "opacity-100"
              )} />
              <span className="leading-tight">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
