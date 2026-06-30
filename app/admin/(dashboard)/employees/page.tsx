import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAdminBasePath } from '@/lib/admin-path'
import { attributionApi, departmentApi, designationApi, employeeApi } from '@/lib/api/brain-client'
import { Award, Building2, CheckCircle, Users, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Employees - Admin Dashboard',
  description: 'Manage employees, departments, and designations',
}

function StatusBadge({ status }: { status?: string }) {
  const active = status?.toLowerCase() === 'active'
  return (
    <Badge
      className={`gap-1 cursor-default font-medium text-xs ${active
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-slate-100 text-slate-500 border border-slate-200'
        }`}
    >
      {active ? <CheckCircle size={11} /> : <XCircle size={11} />}
      {status ?? 'unknown'}
    </Badge>
  )
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

export default async function EmployeesPage(props: PageProps) {
  const searchParams : any = await (props.searchParams || Promise.resolve({}))

  const pEmp = Number(searchParams.epage) || 1
  const pDept = Number(searchParams.dpage) || 1
  const pDesig = Number(searchParams.desigpage) || 1
  const pAttr = Number(searchParams.apage) || 1
  const limit = 100

  const currentParams = new URLSearchParams()
  if (searchParams.epage) currentParams.set('epage', String(searchParams.epage))
  if (searchParams.dpage) currentParams.set('dpage', String(searchParams.dpage))
  if (searchParams.desigpage) currentParams.set('desigpage', String(searchParams.desigpage))
  if (searchParams.apage) currentParams.set('apage', String(searchParams.apage))

  // Fetch all data in parallel — backend may be offline, so we gracefully handle errors
  const [empRes, deptRes, desigRes, attrRes] = await Promise.allSettled([
    employeeApi.list((pEmp - 1) * limit, limit),
    departmentApi.list((pDept - 1) * limit, limit),
    designationApi.list((pDesig - 1) * limit, limit),
    attributionApi.list((pAttr - 1) * limit, limit),
  ])

  const employees = empRes.status === 'fulfilled' ? (empRes.value.data ?? []) : []
  const employeesTotal = empRes.status === 'fulfilled' ? (empRes.value.total ?? employees.length) : 0
  const departments = deptRes.status === 'fulfilled' ? (deptRes.value.data ?? []) : []
  const departmentsTotal = deptRes.status === 'fulfilled' ? (deptRes.value.total ?? departments.length) : 0
  const designations = desigRes.status === 'fulfilled' ? (desigRes.value.data ?? []) : []
  const designationsTotal = desigRes.status === 'fulfilled' ? (desigRes.value.total ?? designations.length) : 0
  const attributions = attrRes.status === 'fulfilled' ? (attrRes.value.data ?? []) : []
  const attributionsTotal = attrRes.status === 'fulfilled' ? (attrRes.value.total ?? attributions.length) : 0

  const base = getAdminBasePath()

  const backendOffline =
    empRes.status === 'rejected' ||
    deptRes.status === 'rejected' ||
    desigRes.status === 'rejected' ||
    attrRes.status === 'rejected'

  const currentTab = typeof searchParams.tab === 'string' ? searchParams.tab : 'employees'

  return (
    <div className="space-y-6">
      {/* Backend offline banner */}
      {backendOffline && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800 flex items-center gap-3">
          <XCircle size={18} className="text-amber-500 shrink-0" />
          <span>
            <strong>Backend unreachable.</strong> Make sure the Brain API is running at{' '}
            <code className="font-mono bg-amber-100 px-1 rounded">
              {process.env.BRAIN_API_URL ?? 'http://localhost:8000'}
            </code>
          </span>
        </div>
      )}


      {/* Tabs Content */}
      <Tabs value={currentTab} className="w-full">

        {/* EMPLOYEES TAB */}
        <TabsContent value="employees">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Users size={14} className="text-[#DC2626]" />
                All Employees
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                {employeesTotal} records
              </span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Code</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Email</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Contact</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.length > 0 ? (
                    employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                            {emp.user_code ?? '—'}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                          {[emp.first_name, emp.last_name].filter(Boolean).join(' ') || '—'}
                        </td>
                        <td className="py-4 px-6 text-[#6B7280]">{emp.email ?? '—'}</td>
                        <td className="py-4 px-6 text-[#6B7280]">{emp.contact_number ?? '—'}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={emp.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <EmptyState icon={Users} label="employees" />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* DEPARTMENTS TAB */}
        <TabsContent value="departments">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Building2 size={14} className="text-[#DC2626]" />
                All Departments
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                {departmentsTotal} records
              </span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Description</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <tr key={dept.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                          {dept.name ?? '—'}
                        </td>
                        <td className="py-4 px-6 text-[#6B7280] max-w-sm truncate">{dept.description ?? '—'}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={dept.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <EmptyState icon={Building2} label="departments" />
                  )}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pDept} hasMore={departments.length === limit} paramName="dpage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* DESIGNATIONS TAB */}
        <TabsContent value="designations">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Award size={14} className="text-[#DC2626]" />
                All Designations
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                {designationsTotal} records
              </span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Grade</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Pay Band</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {designations.length > 0 ? (
                    designations.map((desig) => (
                      <tr key={desig.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                          {desig.name ?? '—'}
                        </td>
                        <td className="py-4 px-6">
                          {desig.grade ? (
                            <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md font-medium">
                              {desig.grade}
                            </span>
                          ) : (
                            <span className="text-[#6B7280]">—</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-[#6B7280]">{desig.pay_band ?? '—'}</td>
                        <td className="py-4 px-6">
                          <StatusBadge status={desig.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <EmptyState icon={Award} label="designations" />
                  )}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pDesig} hasMore={designations.length === limit} paramName="desigpage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* ATTRIBUTIONS TAB */}
        <TabsContent value="attributions">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Award size={14} className="text-[#DC2626]" />
                Revenue Attributions
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                {attributionsTotal} records
              </span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Employee ID</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Project ID</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Attributed Revenue</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">ROI %</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attributions.length > 0 ? (
                    attributions.map((attr: any) => (
                      <tr key={attr.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                        <td className="py-4 px-6 font-mono text-xs text-slate-500">{attr.employee_id?.slice(0, 8)}…</td>
                        <td className="py-4 px-6 font-mono text-xs text-slate-500">{attr.project_id?.slice(0, 8)}…</td>
                        <td className="py-4 px-6 font-semibold text-emerald-700">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(attr.attributed_revenue)}
                        </td>
                        <td className="py-4 px-6 text-[#1A1A1A] font-medium">{attr.roi_percentage?.toFixed(2)}%</td>
                        <td className="py-4 px-6 text-[#1A1A1A] font-medium">{attr.utilization_percentage?.toFixed(2)}%</td>
                      </tr>
                    ))
                  ) : (
                    <EmptyState icon={Award} label="attributions" />
                  )}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pAttr} hasMore={attributions.length === limit} paramName="apage" currentParams={currentParams} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
