'use client'

import { Badge } from '@/components/ui/badge'
import { ArrowRight, User, Calendar } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
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

interface BlogCardProps {
  blog: Blog
  featured?: boolean
  compact?: boolean
  list?: boolean
}

/**
 * Blog card component with multiple layout variants
 * Supports featured, compact, and list views
 */
export function BlogCard({ blog, featured = false, compact = false, list = false }: BlogCardProps) {
  const tag = blog.tag_type || 'Engineering'
  const readingTimeMinutes = Math.ceil(blog.content.split(/\s+/).length / 200)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (list) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href={`/blog/${blog.slug}`} className="block group">
        <div
          className="relative flex flex-col sm:flex-row items-center sm:items-center p-6 sm:p-8 rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_-8px_rgba(83,58,253,0.28),0_8px_24px_-4px_rgba(234,34,97,0.18)]"
          style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)' }}
        >
          {/* Hover background fill */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f6f9fc] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

          <div className="relative z-10 w-full flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center">
            {/* IMAGE CONTAINER */}
            <motion.div 
              className="w-full sm:w-[360px] shrink-0 aspect-[16/10] overflow-hidden rounded-xl bg-muted shadow-sm"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {blog.featured_image ? (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#533afd]/5 via-[#f96bee]/5 to-[#ea2261]/5 flex items-center justify-center">
                  <span className="text-[#533afd]/40 font-medium">No Image</span>
                </div>
              )}
            </motion.div>

            {/* TEXT CONTAINER */}
            <motion.div 
              className="flex flex-col flex-1 w-full"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-sm text-[#64748d] mb-3" style={{ fontFamily: 'var(--font-quicksand)' }}>
                <User size={14} className="text-[#533afd]" />
                <span className="font-medium">
                  <span className="font-semibold text-[#0d253d]">Author</span> : <span className="text-[#0d253d]">{blog.author || 'Team'}</span>
                </span>
                <span>·</span>
                <span>{formatDate(blog.created_at)}</span>
              </div>

              <h3 className="font-semibold text-[#0d253d] group-hover:text-[#533afd] transition-colors mb-3 leading-snug tracking-wide text-xl sm:text-2xl" style={{ fontFamily: 'var(--font-inter)' }}>
                {blog.title}
              </h3>

              {blog.description && (
                <p className="text-[#0d253d] text-base leading-relaxed mb-6 line-clamp-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  {blog.description}
                </p>
              )}

              <div className="flex items-center gap-6 mt-auto text-base text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                <Badge className="bg-[#533afd]/5 text-[#533afd] hover:bg-[#533afd]/10 border-none shadow-none text-xs rounded-full px-3 py-0.5 font-semibold">
                  {tag}
                </Badge>
                <span className="font-medium">{readingTimeMinutes} min read</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/blog/${blog.slug}`} className={cn('block group h-full')}>
      <div 
        className={cn(
          "relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-8px_rgba(83,58,253,0.28),0_8px_24px_-4px_rgba(234,34,97,0.18)]",
          compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
        )}
        style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)' }}
      >
        {/* Hover background fill */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6f9fc] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

        <div className={cn(
          'relative z-10 w-full transition-all flex',
          compact ? 'flex-row gap-4 sm:gap-6 items-center' : 'flex-col gap-5 sm:gap-6'
        )}>
          {/* IMAGE CONTAINER */}
          <motion.div 
            className={cn(
              'relative overflow-hidden rounded-xl bg-muted shrink-0',
              compact ? 'w-[40%] aspect-[16/10]' :
                featured ? 'w-full aspect-[16/9]' : 'w-full aspect-[16/10]'
            )}
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {blog.featured_image ? (
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#533afd]/5 via-[#f96bee]/5 to-[#ea2261]/5 flex items-center justify-center">
                <span className="text-[#533afd]/40 font-medium">No Image</span>
              </div>
            )}
          </motion.div>

          {/* TEXT CONTAINER */}
          <motion.div 
            className={cn(
              'flex flex-col',
              compact ? 'w-[60%] justify-center' : 'w-full mt-4'
            )}
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(featured || blog.is_featured) && (
                <Badge className="bg-[#533afd] hover:bg-[#533afd] border-none text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-inter)' }}>
                  Featured
                </Badge>
              )}
              <Badge className="bg-[#533afd]/10 text-[#533afd] border-none hover:bg-[#533afd]/20 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-inter)' }}>
                {tag}
              </Badge>
            </div>

            {/* Title */}
            <h3
              className={cn(
                'font-semibold text-[#0d253d] group-hover:text-[#533afd] transition-colors mb-3 tracking-wide',
                featured ? 'text-xl sm:text-2xl leading-snug' : 'text-base leading-snug'
              )}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {blog.title}
            </h3>

            {/* Description */}
            {!compact && blog.description && (
              <p className={cn(
                "text-[#0d253d] leading-relaxed mb-4 line-clamp-2",
                featured ? "text-base" : "text-sm"
              )} style={{ fontFamily: 'var(--font-quicksand)' }}>
                {blog.description}
              </p>
            )}

            {/* Read More Link */}
            <div className="mb-4">
              <span className={cn(
                "font-medium flex items-center gap-1.5 transition-all text-[#64748d] group-hover:text-[#533afd]",
                featured ? "text-sm" : "text-xs"
              )} style={{ fontFamily: 'var(--font-inter)' }}>
                Read more <ArrowRight size={featured ? 14 : 12} />
              </span>
            </div>

            {/* Metadata */}
            {!compact && (
              <div className="flex flex-col gap-0.5 mt-auto text-xs text-[#64748d] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>
                {blog.author && (
                  <span className="text-[#0d253d] font-bold">{blog.author}</span>
                )}
                <div className="flex items-center gap-1.5">
                  <span>{formatDate(blog.created_at)}</span>
                  <span>•</span>
                  <span>{readingTimeMinutes} mins</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Link>
    </motion.div>
  )
}
