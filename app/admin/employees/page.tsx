import { employeeApi, departmentApi, designationApi } from '@/lib/api/brain-client'
import { getAdminBasePath } from '@/lib/admin-path'
import type { Metadata } from 'next'
import { Users, Building2, Award, Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Employees - Admin Dashboard',
  description: 'Manage employees, departments, and designations',
}

function StatusBadge({ status }: { status?: string }) {
  const active = status?.toLowerCase() === 'active'
  return (
    <Badge
      className={`gap-1 cursor-default font-medium text-xs ${
        active
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

export default async function EmployeesPage() {
  // Fetch all data in parallel — backend may be offline, so we gracefully handle errors
  const [empRes, deptRes, desigRes] = await Promise.allSettled([
    employeeApi.list(),
    departmentApi.list(),
    designationApi.list(),
  ])

  const employees = empRes.status === 'fulfilled' ? (empRes.value.data ?? []) : []
  const departments = deptRes.status === 'fulfilled' ? (deptRes.value.data ?? []) : []
  const designations = desigRes.status === 'fulfilled' ? (desigRes.value.data ?? []) : []

  const base = getAdminBasePath()

  const backendOffline =
    empRes.status === 'rejected' ||
    deptRes.status === 'rejected' ||
    desigRes.status === 'rejected'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2340] shadow-md shrink-0">
            <Users size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">People & Org</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Manage employees, departments and designations</p>
          </div>
        </div>
      </div>

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

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          {
            label: 'Employees',
            value: employees.length,
            sub: `${employees.filter((e) => e.status === 'active').length} active`,
            icon: Users,
            accent: 'bg-[#1B2340]',
          },
          {
            label: 'Departments',
            value: departments.length,
            sub: `${departments.filter((d) => d.status === 'active').length} active`,
            icon: Building2,
            accent: 'bg-[#DC2626]',
          },
          {
            label: 'Designations',
            value: designations.length,
            sub: `${designations.filter((d) => d.status === 'active').length} active`,
            icon: Award,
            accent: 'bg-indigo-600',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
          >
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

      {/* Tabs */}
      <Tabs defaultValue="employees" className="w-full">
        <div className="mb-4">
          <TabsList className="bg-[#F5F5F5] border border-slate-200 p-1 rounded-xl h-auto">
            <TabsTrigger
              value="employees"
              className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all"
            >
              Employees <span className="ml-1.5 text-xs opacity-70">({employees.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all"
            >
              Departments <span className="ml-1.5 text-xs opacity-70">({departments.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="designations"
              className="rounded-lg px-5 py-2 text-sm font-medium text-[#6B7280] data-[state=active]:bg-[#1B2340] data-[state=active]:text-white transition-all"
            >
              Designations <span className="ml-1.5 text-xs opacity-70">({designations.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* EMPLOYEES TAB */}
        <TabsContent value="employees">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Users size={14} className="text-[#DC2626]" />
                All Employees
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                {employees.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Code</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Contact</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
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
                {departments.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Description</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
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
                {designations.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Grade</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Pay Band</th>
                    <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Status</th>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
