import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { assignmentApi, costApi, projectApi, vendorApi } from '@/lib/api/brain-client'
import { CheckCircle, DollarSign, FolderKanban, Store, UserCheck, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects - Admin Dashboard',
  description: 'Manage projects, assignments, vendors and costs',
}

function StatusBadge({ status }: { status?: string }) {
  const active = status?.toLowerCase() === 'active'
  const completed = status?.toLowerCase() === 'completed'
  const colorClass = active
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : completed
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-slate-100 text-slate-500 border-slate-200'

  return (
    <Badge className={`gap-1 cursor-default font-medium text-xs border ${colorClass}`}>
      {active ? <CheckCircle size={11} /> : <XCircle size={11} />}
      {status ?? 'unknown'}
    </Badge>
  )
}

function formatCurrency(val?: number) {
  if (val == null) return '—'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)
}

function formatDate(val?: string) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <tr>
      <td colSpan={10} className="py-16 text-center text-[#6B7280]">
        <Icon size={40} className="mx-auto mb-3 opacity-20" />
        <p className="font-medium">No {label} found</p>
        <p className="text-sm mt-1 opacity-70">Add your first {label} to get started.</p>
      </td>
    </tr>
  )
}

function PaginationControls({ page, hasMore, paramName, currentParams }: { page: number, hasMore: boolean, paramName: string, currentParams: URLSearchParams }) {
  const prevParams = new URLSearchParams(currentParams.toString())
  prevParams.set(paramName, String(page - 1))
  const nextParams = new URLSearchParams(currentParams.toString())
  nextParams.set(paramName, String(page + 1))

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
      <div className="text-sm text-slate-500 font-medium">Page {page}</div>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link href={`?${prevParams.toString()}`} className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700 transition-colors">Previous</Link>
        ) : (
          <button disabled className="px-3 py-1 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-400 cursor-not-allowed">Previous</button>
        )}
        {hasMore ? (
          <Link href={`?${nextParams.toString()}`} className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700 transition-colors">Next</Link>
        ) : (
          <button disabled className="px-3 py-1 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-400 cursor-not-allowed">Next</button>
        )}
      </div>
    </div>
  )
}

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProjectsPage(props: PageProps) {
  const searchParams : any = await (props.searchParams || Promise.resolve({}))

  const pProj = Number(searchParams.ppage) || 1
  const pAsgn = Number(searchParams.aspage) || 1
  const pVend = Number(searchParams.vpage) || 1
  const pCost = Number(searchParams.cpage) || 1
  const limit = 100

  const currentParams = new URLSearchParams()
  if (searchParams.ppage) currentParams.set('ppage', String(searchParams.ppage))
  if (searchParams.aspage) currentParams.set('aspage', String(searchParams.aspage))
  if (searchParams.vpage) currentParams.set('vpage', String(searchParams.vpage))
  if (searchParams.cpage) currentParams.set('cpage', String(searchParams.cpage))

  const [projRes, assignRes, vendorRes, costRes] = await Promise.allSettled([
    projectApi.list((pProj - 1) * limit, limit),
    assignmentApi.list((pAsgn - 1) * limit, limit),
    vendorApi.list((pVend - 1) * limit, limit),
    costApi.list((pCost - 1) * limit, limit),
  ])

  const projects = projRes.status === 'fulfilled' ? (projRes.value.data ?? []) : []
  const projectsTotal = projRes.status === 'fulfilled' ? (projRes.value.total ?? projects.length) : 0
  const assignments = assignRes.status === 'fulfilled' ? (assignRes.value.data ?? []) : []
  const assignmentsTotal = assignRes.status === 'fulfilled' ? (assignRes.value.total ?? assignments.length) : 0
  const vendors = vendorRes.status === 'fulfilled' ? (vendorRes.value.data ?? []) : []
  const vendorsTotal = vendorRes.status === 'fulfilled' ? (vendorRes.value.total ?? vendors.length) : 0
  const costs = costRes.status === 'fulfilled' ? (costRes.value.data ?? []) : []
  const costsTotal = costRes.status === 'fulfilled' ? (costRes.value.total ?? costs.length) : 0

  const backendOffline =
    projRes.status === 'rejected' ||
    assignRes.status === 'rejected'

  const totalBudget = projects.reduce((s, p) => s + (p.budget_allocated ?? 0), 0)
  const totalCost = costs.reduce((s, c) => s + (c.amount ?? 0), 0)

  const currentTab = typeof searchParams.tab === 'string' ? searchParams.tab : 'projects'

  return (
    <div className="space-y-6">
      {backendOffline && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800 flex items-center gap-3">
          <XCircle size={18} className="text-amber-500 shrink-0" />
          <span>
            <strong>Backend unreachable.</strong> Make sure the Brain API is running at{' '}
            <code className="font-mono bg-amber-100 px-1 rounded">{process.env.BRAIN_API_URL ?? 'http://localhost:8000'}</code>
          </span>
        </div>
      )}
      {/* Tabs Content */}
      <Tabs value={currentTab} className="w-full">

        {/* Projects */}
        <TabsContent value="projects">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <FolderKanban size={14} className="text-[#DC2626]" /> All Projects
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{projectsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Name', 'Type', 'Budget', 'Start Date', 'End Date', 'Status'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.length > 0 ? projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                      <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">{proj.name ?? '—'}</td>
                      <td className="py-4 px-6">
                        {proj.project_type ? (
                          <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-md font-medium">{proj.project_type}</span>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6 text-[#6B7280]">{formatCurrency(proj.budget_allocated)}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{formatDate(proj.start_date)}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{formatDate(proj.end_date)}</td>
                      <td className="py-4 px-6"><StatusBadge status={proj.status} /></td>
                    </tr>
                  )) : <EmptyState icon={FolderKanban} label="projects" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pProj} hasMore={projects.length === limit} paramName="ppage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Assignments */}
        <TabsContent value="assignments">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <UserCheck size={14} className="text-[#DC2626]" /> All Assignments
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{assignmentsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Employee ID', 'Project ID', 'Role', 'Allocation %', 'Billing Rate', 'Type', 'Start', 'End'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assignments.length > 0 ? assignments.map((asgn) => (
                    <tr key={asgn.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{asgn.employee_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{asgn.project_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 text-[#1A1A1A] font-medium">{asgn.role ?? '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{asgn.allocation_percent != null ? `${asgn.allocation_percent}%` : '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{formatCurrency(asgn.billing_rate)}</td>
                      <td className="py-4 px-6">
                        {asgn.contribution_type ? (
                          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md font-medium">{asgn.contribution_type}</span>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(asgn.start_date)}</td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(asgn.end_date)}</td>
                    </tr>
                  )) : <EmptyState icon={UserCheck} label="assignments" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pAsgn} hasMore={assignments.length === limit} paramName="aspage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Vendors */}
        <TabsContent value="vendors">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Store size={14} className="text-[#DC2626]" /> All Vendors
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{vendorsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Name', 'Service Type'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.length > 0 ? vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                      <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">{v.name ?? '—'}</td>
                      <td className="py-4 px-6">
                        {v.service_type ? (
                          <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-md font-medium">{v.service_type}</span>
                        ) : '—'}
                      </td>
                    </tr>
                  )) : <EmptyState icon={Store} label="vendors" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pVend} hasMore={vendors.length === limit} paramName="vpage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Costs */}
        <TabsContent value="costs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} className="text-[#DC2626]" /> Project Costs
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{costsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Project ID', 'Vendor ID', 'Amount', 'Cost Type', 'Expense Date'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {costs.length > 0 ? costs.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{c.project_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{c.vendor_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-[#1A1A1A]">{formatCurrency(c.amount)}</td>
                      <td className="py-4 px-6">
                        {c.cost_type ? (
                          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-md font-medium">{c.cost_type}</span>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(c.expense_date)}</td>
                    </tr>
                  )) : <EmptyState icon={DollarSign} label="costs" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pCost} hasMore={costs.length === limit} paramName="cpage" currentParams={currentParams} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
