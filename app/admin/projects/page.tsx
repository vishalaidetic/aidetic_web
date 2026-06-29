import { projectApi, assignmentApi, vendorApi, costApi } from '@/lib/api/brain-client'
import { getAdminBasePath } from '@/lib/admin-path'
import type { Metadata } from 'next'
import { FolderKanban, UserCheck, Store, DollarSign, XCircle, CheckCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

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

export default async function ProjectsPage() {
  const [projRes, assignRes, vendorRes, costRes] = await Promise.allSettled([
    projectApi.list(),
    assignmentApi.list(),
    vendorApi.list(),
    costApi.list(),
  ])

  const projects = projRes.status === 'fulfilled' ? (projRes.value.data ?? []) : []
  const assignments = assignRes.status === 'fulfilled' ? (assignRes.value.data ?? []) : []
  const vendors = vendorRes.status === 'fulfilled' ? (vendorRes.value.data ?? []) : []
  const costs = costRes.status === 'fulfilled' ? (costRes.value.data ?? []) : []

  const backendOffline =
    projRes.status === 'rejected' ||
    assignRes.status === 'rejected'

  const totalBudget = projects.reduce((s, p) => s + (p.budget_allocated ?? 0), 0)
  const totalCost = costs.reduce((s, c) => s + (c.amount ?? 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DC2626] shadow-md shrink-0">
            <FolderKanban size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">Projects</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Manage projects, assignments, vendors &amp; costs</p>
          </div>
        </div>
      </div>

      {backendOffline && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800 flex items-center gap-3">
          <XCircle size={18} className="text-amber-500 shrink-0" />
          <span>
            <strong>Backend unreachable.</strong> Make sure the Brain API is running at{' '}
            <code className="font-mono bg-amber-100 px-1 rounded">{process.env.BRAIN_API_URL ?? 'http://localhost:8000'}</code>
          </span>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid sm:grid-cols-4 gap-5">
        {[
          { label: 'Projects', value: projects.length, sub: `${projects.filter((p) => p.status === 'active').length} active`, icon: FolderKanban, accent: 'bg-[#DC2626]' },
          { label: 'Assignments', value: assignments.length, sub: 'total allocations', icon: UserCheck, accent: 'bg-[#1B2340]' },
          { label: 'Vendors', value: vendors.length, sub: 'registered vendors', icon: Store, accent: 'bg-indigo-600' },
          { label: 'Total Budget', value: formatCurrency(totalBudget), sub: `${formatCurrency(totalCost)} spent`, icon: DollarSign, accent: 'bg-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.accent} shrink-0`}>
              <stat.icon size={22} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1A1A1A] mt-0.5 truncate">{stat.value}</p>
              <p className="text-xs text-[#6B7280] mt-1">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <div className="mb-4">
          <TabsList className="bg-[#F5F5F5] border border-slate-200 p-1 rounded-xl h-auto">
            {[
              { value: 'projects', label: 'Projects', count: projects.length },
              { value: 'assignments', label: 'Assignments', count: assignments.length },
              { value: 'vendors', label: 'Vendors', count: vendors.length },
              { value: 'costs', label: 'Costs', count: costs.length },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all"
              >
                {tab.label} <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Projects */}
        <TabsContent value="projects">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <FolderKanban size={14} className="text-[#DC2626]" /> All Projects
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{projects.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Name', 'Type', 'Budget', 'Start Date', 'End Date', 'Status'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">{h}</th>
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
          </div>
        </TabsContent>

        {/* Assignments */}
        <TabsContent value="assignments">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <UserCheck size={14} className="text-[#DC2626]" /> All Assignments
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{assignments.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Employee ID', 'Project ID', 'Role', 'Allocation %', 'Billing Rate', 'Type', 'Start', 'End'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
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
          </div>
        </TabsContent>

        {/* Vendors */}
        <TabsContent value="vendors">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Store size={14} className="text-[#DC2626]" /> All Vendors
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{vendors.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Name', 'Service Type'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">{h}</th>
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
          </div>
        </TabsContent>

        {/* Costs */}
        <TabsContent value="costs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} className="text-[#DC2626]" /> Project Costs
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{costs.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Project ID', 'Vendor ID', 'Amount', 'Cost Type', 'Expense Date'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
