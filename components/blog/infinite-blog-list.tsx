'use client'

import { BlogCard } from '@/components/blog/blog-card'
import { Blog } from '@/lib/types/blog'
import { useCallback, useEffect, useRef, useState } from 'react'

interface InfiniteBlogListProps {
  initialBlogs: Blog[]
  totalPages: number
}

export function InfiniteBlogList({ initialBlogs, totalPages }: InfiniteBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(page < totalPages)

  // Fetch additional blogs on mount if needed
  useEffect(() => {
    if (blogs.length === 0 && initialBlogs.length > 0) {
      setBlogs(initialBlogs)
    }
  }, [initialBlogs])

  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMoreBlogs = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const response = await fetch(`/api/blogs?page=${nextPage}&limit=10&published=true`)
      const data = await response.json()

      if (data.success) {
        setBlogs(prev => [...prev, ...data.data.blogs])
        setPage(nextPage)
        if (nextPage >= data.data.pagination.totalPages) {
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error('Error loading more blogs:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreBlogs()
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMoreBlogs])

  return (
    <div className="flex flex-col gap-10">
      {/* Grid Layouts */}
      {blogs.length > 0 && (
        <>
          {/* Asymmetric Grid for Default State */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <BlogCard blog={blogs[0]} featured />
            </div>
            {/* Secondary Posts - Right Column Stack (3 Compact Cards) */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {blogs.slice(1, 4).map(blog => <BlogCard key={blog.id} blog={blog} compact />)}
            </div>
          </div>
          {/* Rest of the blogs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(4).map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        </>
      )}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span>Loading more posts...</span>
            </div>
          ) : (
            <div className="h-8"></div>
          )}
        </div>
      )}

      {!hasMore && blogs.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          You've reached the end of the line!
        </div>
      )}
    </div>
  )
}
