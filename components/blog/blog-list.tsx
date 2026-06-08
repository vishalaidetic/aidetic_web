'use client'

import { BlogCard } from '@/components/blog/blog-card'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Blog {
  id: string
  title: string
  description?: string
  content: string
  featured_image?: string
  author?: string
  created_at: string
  slug: string
  tag_type?: string
  is_featured?: boolean
  published: boolean
}

interface BlogListProps {
  blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(10)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Reset visible count when tag changes
  useEffect(() => {
    setVisibleCount(10)
  }, [selectedTag])

  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 10)
      }
    }, {
      rootMargin: "200px" // load a bit early
    })
    
    if (node) {
      observerRef.current.observe(node)
    }
  }, [])

  // Get unique tags
  const uniqueTags = Array.from(new Set(blogs.map(b => b.tag_type || 'Engineering')))
  const tags = ['All Posts', ...uniqueTags]

  // Featured section always pulls from the raw, unfiltered 'blogs' array (max 4)
  const featuredBlogs = blogs.filter(b => b.is_featured).slice(0, 4)

  // Regular grid applies the tag filter
  const filteredBlogs = selectedTag === null || selectedTag === 'All Posts'
    ? blogs
    : blogs.filter(b => (b.tag_type || 'Engineering') === selectedTag)
  
  // Regular blogs exclude the currently displayed featured blogs
  const regularBlogs = filteredBlogs.filter(b => !featuredBlogs.find(fb => fb.id === b.id))

  // Sliced regular blogs based on visibleCount
  const displayedRegularBlogs = regularBlogs.slice(0, visibleCount)

  return (
    <div className="flex flex-col gap-12">
      {/* Featured Section */}
      {featuredBlogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-[calc(100vw-2rem)] lg:w-[calc(100vw-4rem)] relative left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#533afd]/[0.06] via-[#ea2261]/[0.04] to-[#f96bee]/[0.08] border border-[#533afd]/10 rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-sm"
        >
          <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 relative z-10">
            <div className="mb-8">
              <h2
                className="text-3xl sm:text-4xl font-semibold mb-2 tracking-tight"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Featured Blog Posts
              </h2>
              <p className="text-lg text-[#64748d] leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-quicksand)' }}>
                Read our most popular blogs in one place
              </p>
            </div>

            {/* Featured Grid Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Large Featured Card - Left */}
              <motion.div 
                className="lg:w-[50%]"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {featuredBlogs[0] && <BlogCard blog={featuredBlogs[0]} featured />}
              </motion.div>

              {/* Secondary Cards Stack - Right */}
              <motion.div 
                className="lg:w-[50%] flex flex-col gap-6"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                {featuredBlogs.slice(1, 4).map(blog => (
                  <BlogCard key={blog.id} blog={blog} compact />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tag Filters */}
      {tags.length > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 w-full"
        >
          {tags.map((tag, idx) => {
            const isActive = (selectedTag === tag) || (selectedTag === null && tag === 'All Posts')
            return (
              <button
                key={idx}
                onClick={() => setSelectedTag(tag === 'All Posts' ? null : tag)}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border",
                  isActive
                    ? "bg-[#533afd] border-[#533afd] text-white shadow-md shadow-[#533afd]/20"
                    : "bg-white border-[#533afd]/20 text-[#64748d] hover:border-[#533afd]/50 hover:text-[#533afd]"
                )}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {tag}
              </button>
            )
          })}
        </motion.div>
      )}

      {/* Regular Blog List */}
      {regularBlogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col w-full gap-6"
        >
          {displayedRegularBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} list />
          ))}

          {/* Intersection Observer Target */}
          {visibleCount < regularBlogs.length && (
            <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-[#533afd] border-t-transparent animate-spin" />
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748d] text-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>
            No posts found for "{selectedTag}".
          </p>
        </div>
      )}
    </div>
  )
}
