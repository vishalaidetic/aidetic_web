import { BlogActionsMenu } from '@/components/admin/blog-actions-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { formatDate } from '@/lib/utils/formatting'
import { BookOpen, Calendar, Eye, EyeOff, Plus, Star } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogTabFilter } from '@/components/admin/blog-tab-filter'
import { getAdminBasePath } from '@/lib/admin-path'

export const metadata: Metadata = {
  title: 'All Blogs - Admin',
  description: 'Manage blog posts',
}

interface PageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function AdminBlogsPage({ searchParams }: PageProps) {
  try {
    const params = await searchParams
    const activeFilter = params.filter ?? 'all'

    const blogRepo = getBlogRepository()

    const { blogs: publishedBlogs } = await blogRepo.listBlogs({ page: 1, limit: 100, published: 'true' })
    const { blogs: draftBlogs } = await blogRepo.listBlogs({ page: 1, limit: 100, published: 'false' })
    const allBlogs = [...publishedBlogs, ...draftBlogs]

    const counts = {
      all: allBlogs.length,
      published: publishedBlogs.length,
      drafts: draftBlogs.length,
    }

    const blogsToDisplay = 
      activeFilter === 'published' ? publishedBlogs :
      activeFilter === 'drafts' ? draftBlogs :
      allBlogs

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2340]">Blog Posts</h1>
              <p className="text-sm text-[#6B7280] mt-0.5">
                {allBlogs.length} total · {publishedBlogs.length} published · {draftBlogs.length} drafts
              </p>
            </div>
          </div>
          <Link href={`${getAdminBasePath()}/blogs/create`}>
            <Button className="gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white border-none shadow-md hover:shadow-lg transition-all duration-200 px-5 h-10">
              <Plus size={16} />
              New Blog
            </Button>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Posts', value: allBlogs.length, color: 'bg-[#1B2340]' },
            { label: 'Published', value: publishedBlogs.length, color: 'bg-green-600' },
            { label: 'Drafts', value: draftBlogs.length, color: 'bg-[#6B7280]' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
              <div className={`w-2 h-10 rounded-full ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
                <p className="text-xs text-[#6B7280] font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Tabs */}
          <BlogTabFilter counts={counts} />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#6B7280]">
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"> Featured</div>
                  </th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Created</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogsToDisplay.length > 0 ? blogsToDisplay.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                          <BookOpen size={14} className="text-[#1B2340]/60" />
                        </div>
                        <span className="font-medium text-[#1A1A1A] line-clamp-1 group-hover:text-[#DC2626] transition-colors">{blog.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {blog.is_featured ? (
                        <span className="text-blue-700 font-semibold text-xs bg-blue-50 px-2 py-1 rounded-md border border-blue-200">True</span>
                      ) : (
                        <span className="text-[#6B7280] font-medium text-xs">False</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {blog.published ? (
                        <Badge className="bg-green-50 text-green-700 border border-green-200 gap-1 cursor-default font-medium">
                          <Eye size={11} /> Published
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-[#6B7280] border border-slate-200 gap-1 cursor-default font-medium">
                          <EyeOff size={11} /> Draft
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-[#6B7280]">
                        <Calendar size={12} />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <BlogActionsMenu blog={blog} />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-[#6B7280]">
                      <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                      <p className="font-medium">No blog posts found</p>
                      <p className="text-sm mt-1 opacity-70">Try changing the filter or create a new post.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading blogs page:', error)
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">
          Error loading blogs page. Please try again later.
        </p>
      </div>
    )
  }
}
