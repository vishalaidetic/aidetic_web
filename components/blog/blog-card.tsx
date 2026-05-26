import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MarkdownService } from '@/lib/services/markdown.service'
import { Blog } from '@/lib/types/blog'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/formatting'
import { ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react'
import Link from 'next/link'

interface BlogCardProps {
  blog: Blog
  featured?: boolean
  compact?: boolean
}

/**
 * Blog preview card component
 * Displays blog summary with metadata
 */
export function BlogCard({ blog, featured = false, compact = false }: BlogCardProps) {
  const { readingTimeMinutes } = MarkdownService.getMetadata(blog.content)

  const tag = blog.tag_type || 'Engineering'

  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card className={cn(
        'transition-all hover:shadow-lg hover:border-primary overflow-hidden flex',
        compact ? 'flex-row h-48 sm:h-56' : 'h-full flex-col',
        featured && !compact ? 'border-2' : ''
      )}>
        {compact ? (
          <>
            {blog.featured_image && (
              <div className="w-1/3 shrink-0 bg-muted relative overflow-hidden">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 p-4 sm:p-5 overflow-hidden justify-between">
              <div>
                <h3 className="font-bold hover:text-[#DC2626] transition-colors text-base sm:text-sm md:text-base line-clamp-2 mb-2 leading-snug">
                  {blog.title}
                </h3>
                <div className="mt-1.5">
                  <Badge className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 px-2 py-0.5 text-[10px] w-fit font-medium">
                    {tag}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-auto text-xs text-muted-foreground font-medium">
                {blog.author && (
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-[#1B2340]/80" />
                    <span>{blog.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-[#1B2340]/80" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-[#1B2340]/80" />
                  <span>{readingTimeMinutes} min</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <CardHeader className={cn(featured ? 'p-0' : '')}>
          <div className={cn(featured ? 'space-y-0' : 'space-y-3')}>
            {blog.featured_image && (
              <div className={cn(
                'relative w-full overflow-hidden bg-muted',
                featured ? 'h-[350px] sm:h-[400px] rounded-t-xl' : 'h-56 sm:h-64 rounded-t-xl'
              )}>
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#DC2626] hover:bg-[#B91C1C] border-none text-white font-medium flex gap-1 items-center px-3 py-1 shadow-md">
                    <Tag size={12} />
                    {tag}
                  </Badge>
                </div>
              </div>
            )}
            <div className={featured ? 'px-8 pt-8 pb-2' : 'px-6 pt-6 pb-2'}>
              <h3 className={cn(
                'font-bold hover:text-[#DC2626] transition-colors',
                featured
                  ? 'text-3xl sm:text-4xl leading-tight'
                  : 'text-xl'
              )}>
                {blog.title}
              </h3>
            </div>
          </div>
        </CardHeader>
 
        <CardContent className={cn(featured ? 'px-8' : 'px-6')}>
          {blog.description && (
            <p className={cn(
              'text-muted-foreground leading-relaxed',
              featured ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'
            )}>
              {blog.description}
            </p>
          )}
          {/* Metadata */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <div className={cn(
              'flex flex-wrap items-center gap-4',
              featured ? 'text-sm' : 'text-xs',
              'text-muted-foreground font-medium'
            )}>
              {blog.author && (
                <div className="flex items-center gap-1.5">
                  <User size={featured ? 16 : 14} className="text-[#1B2340]/80" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar size={featured ? 16 : 14} className="text-[#1B2340]/80" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={featured ? 16 : 14} className="text-[#1B2340]/80" />
                <span>{readingTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </CardContent>
 
        <CardFooter className={cn('mt-auto', featured ? 'px-8 pb-8' : 'px-6 pb-6')}>
          <div className="w-full flex items-center justify-between pt-4 border-t border-border/50">
            <span className="font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all text-[#DC2626]">
              Read Article <ArrowRight size={16} className="text-[#DC2626]" />
            </span>
            {/* Status Badge */}
            {!blog.published && (
              <Badge variant="secondary" className="w-fit">
                Draft
              </Badge>
            )}
          </div>
          </CardFooter>
          </>
        )}
      </Card>
    </Link>
  )
}
