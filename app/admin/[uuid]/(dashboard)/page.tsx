import { BlogActionsMenu } from '@/components/admin/blog-actions-menu'
import { DeleteCaseStudyButton } from '@/components/admin/delete-case-study-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAdminBasePath } from '@/lib/admin-path'
import { getBlogRepository } from '@/lib/db/blog_queries'
import { getCaseStudyRepository } from '@/lib/db/case_study_queries'
import { formatDate } from '@/lib/utils/formatting'
import { BookOpen, Calendar, ChevronDown, ChevronUp, Edit, Eye, EyeOff, FileText, Plus, TrendingUp, LayoutDashboard } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard - Admin',
  description: 'Manage blog posts and case studies',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  try {
    const resolvedParams = await searchParams
    const sortOrder = resolvedParams.sort === 'asc' ? 'asc' : 'desc'

    const blogRepo = getBlogRepository()
    const caseStudyRepo = getCaseStudyRepository()

    const { blogs: publishedBlogs } = await blogRepo.listBlogs({ page: 1, limit: 100, published: 'true' })
    const { blogs: draftBlogs } = await blogRepo.listBlogs({ page: 1, limit: 100, published: 'false' })
    const allBlogs = [...publishedBlogs, ...draftBlogs].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime()
      const timeB = new Date(b.created_at).getTime()
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA
    })

    const { case_studies: publishedCaseStudies } = await caseStudyRepo.listCaseStudies({ page: 1, limit: 100, published: 'true' })
    const { case_studies: draftCaseStudies } = await caseStudyRepo.listCaseStudies({ page: 1, limit: 100, published: 'false' })
    const allCaseStudies = [...publishedCaseStudies, ...draftCaseStudies]

    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
              <LayoutDashboard size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2340]">Dashboard</h1>
              <p className="text-sm text-[#6B7280] mt-0.5">Welcome to your content management hub</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`${getAdminBasePath()}/blogs/create`}>
              <Button className="gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white border-none shadow-md hover:shadow-lg transition-all duration-200 h-10 px-5">
                <Plus size={16} />
                New Blog
              </Button>
            </Link>
            <Link href={`${getAdminBasePath()}/case-studies/create`}>
              <Button variant="outline" className="gap-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-all duration-200 h-10 px-5">
                <Plus size={16} />
                New Case Study
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              label: 'Total Blogs',
              value: allBlogs.length,
              sub: `${publishedBlogs.length} published · ${draftBlogs.length} drafts`,
              icon: BookOpen,
              accent: 'bg-[#1B2340]',
            },
            {
              label: 'Case Studies',
              value: allCaseStudies.length,
              sub: `${publishedCaseStudies.length} published · ${draftCaseStudies.length} drafts`,
              icon: FileText,
              accent: 'bg-[#DC2626]',
            },
            {
              label: 'Published Content',
              value: publishedBlogs.length + publishedCaseStudies.length,
              sub: 'Total live content',
              icon: TrendingUp,
              accent: 'bg-green-600',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.accent} shrink-0`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-[#1A1A1A] mt-0.5">{stat.value}</p>
                <p className="text-xs text-[#6B7280] mt-1">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="blogs" className="w-full">
          <div className="mb-4">
            <TabsList className="bg-[#F5F5F5] border border-slate-200 p-1 rounded-xl h-auto">
              <TabsTrigger value="blogs" className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all">
                Blogs <span className="ml-1.5 text-xs opacity-70">({allBlogs.length})</span>
              </TabsTrigger>
              <TabsTrigger value="case-studies" className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all">
                Case Studies <span className="ml-1.5 text-xs opacity-70">({allCaseStudies.length})</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* BLOGS TAB */}
          <TabsContent value="blogs">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
                <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={14} className="text-[#DC2626]" />
                  All Blog Posts
                </h2>
                <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{allBlogs.length} entries</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F5F5F5] text-[#6B7280]">
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Title</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Featured</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">
                        <Link href={`${getAdminBasePath()}?sort=${sortOrder === 'asc' ? 'desc' : 'asc'}`} className="flex items-center gap-1 hover:text-[#1A1A1A] w-fit transition-colors">
                          Created
                          {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </Link>
                      </th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allBlogs.length > 0 ? allBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1B2340]/5 flex items-center justify-center shrink-0">
                              <BookOpen size={14} className="text-[#1B2340]/50" />
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
                        <td colSpan={4} className="py-16 text-center text-[#6B7280]">
                          <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                          <p className="font-medium">No blog posts yet</p>
                          <p className="text-sm mt-1 opacity-70">Create your first post to get started.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* CASE STUDIES TAB */}
          <TabsContent value="case-studies">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
                <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                  <FileText size={14} className="text-[#DC2626]" />
                  All Case Studies
                </h2>
                <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{allCaseStudies.length} entries</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F5F5F5] text-[#6B7280]">
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Title</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Created</th>
                      <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allCaseStudies.length > 0 ? allCaseStudies.map((study) => (
                      <tr key={study.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#DC2626]/5 flex items-center justify-center shrink-0">
                              <FileText size={14} className="text-[#DC2626]/50" />
                            </div>
                            <span className="font-medium text-[#1A1A1A] line-clamp-1 group-hover:text-[#DC2626] transition-colors">{study.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {study.published ? (
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
                            <span>{formatDate(study.created_at)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Link href={`${getAdminBasePath()}/case-studies/${study.id}/edit`}>
                              <Button size="sm" variant="outline" className="border-[#1B2340]/20 text-[#1B2340] hover:bg-[#1B2340] hover:text-white gap-1.5 h-8 px-3 transition-all duration-200">
                                <Edit size={13} /> Edit
                              </Button>
                            </Link>
                            <DeleteCaseStudyButton id={study.id} />
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-16 text-center text-[#6B7280]">
                          <FileText size={40} className="mx-auto mb-3 opacity-20" />
                          <p className="font-medium">No case studies yet</p>
                          <p className="text-sm mt-1 opacity-70">Create your first case study to get started.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error('[v0] Error loading dashboard:', error)
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">
          Error loading dashboard. Please try again later.
        </p>
      </div>
    )
  }
}