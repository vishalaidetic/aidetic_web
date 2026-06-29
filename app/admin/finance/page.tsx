import { clientApi, invoiceApi, revenueApi, reimbursementApi } from '@/lib/api/brain-client'
import type { Metadata } from 'next'
import { Wallet, Receipt, TrendingUp, RefreshCw, XCircle, CheckCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Finance - Admin Dashboard',
  description: 'Manage clients, invoices, revenue and reimbursements',
}

function formatCurrency(val?: number) {
  if (val == null) return '—'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)
}

function formatDate(val?: string) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function InvoiceStatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    draft: 'bg-slate-100 text-slate-500 border-slate-200',
  }
  const key = status?.toLowerCase() ?? 'draft'
  const cls = colorMap[key] ?? colorMap['draft']
  return (
    <Badge className={`gap-1 cursor-default font-medium text-xs border ${cls}`}>
      {status ?? 'draft'}
    </Badge>
  )
}

function ReimbursementStatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  }
  const key = status?.toLowerCase() ?? 'pending'
  const cls = colorMap[key] ?? colorMap['pending']
  return (
    <Badge className={`gap-1 cursor-default font-medium text-xs border ${cls}`}>
      {status ?? 'pending'}
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

export default async function FinancePage() {
  const [clientRes, invoiceRes, revenueRes, reimbRes] = await Promise.allSettled([
    clientApi.list(),
    invoiceApi.list(),
    revenueApi.list(),
    reimbursementApi.list(),
  ])

  const clients = clientRes.status === 'fulfilled' ? (clientRes.value.data ?? []) : []
  const invoices = invoiceRes.status === 'fulfilled' ? (invoiceRes.value.data ?? []) : []
  const revenues = revenueRes.status === 'fulfilled' ? (revenueRes.value.data ?? []) : []
  const reimbursements = reimbRes.status === 'fulfilled' ? (reimbRes.value.data ?? []) : []

  const backendOffline = clientRes.status === 'rejected' || invoiceRes.status === 'rejected'

  const totalRevenue = revenues.reduce((s, r) => s + (r.amount ?? 0), 0)
  const totalInvoiced = invoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalReimbursed = reimbursements
    .filter((r) => r.status?.toLowerCase() === 'approved')
    .reduce((s, r) => s + (r.amount ?? 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-md shrink-0">
            <Wallet size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">Finance</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Clients, invoices, revenue &amp; reimbursements</p>
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
          { label: 'Clients', value: clients.length, sub: `${clients.filter((c) => c.status === 'active').length} active`, icon: Wallet, accent: 'bg-emerald-600' },
          { label: 'Invoices', value: invoices.length, sub: formatCurrency(totalInvoiced) + ' invoiced', icon: Receipt, accent: 'bg-[#1B2340]' },
          { label: 'Revenue', value: formatCurrency(totalRevenue), sub: `${revenues.length} entries`, icon: TrendingUp, accent: 'bg-[#DC2626]' },
          { label: 'Reimbursed', value: formatCurrency(totalReimbursed), sub: `${reimbursements.length} requests`, icon: RefreshCw, accent: 'bg-indigo-600' },
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
      <Tabs defaultValue="clients" className="w-full">
        <div className="mb-4">
          <TabsList className="bg-[#F5F5F5] border border-slate-200 p-1 rounded-xl h-auto">
            {[
              { value: 'clients', label: 'Clients', count: clients.length },
              { value: 'invoices', label: 'Invoices', count: invoices.length },
              { value: 'revenue', label: 'Revenue', count: revenues.length },
              { value: 'reimbursements', label: 'Reimbursements', count: reimbursements.length },
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

        {/* Clients */}
        <TabsContent value="clients">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Wallet size={14} className="text-[#DC2626]" /> All Clients
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{clients.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Name', 'Email', 'Contact Person', 'Contact No.', 'Status'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients.length > 0 ? clients.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                      <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">{c.name ?? '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{c.email ?? '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{c.contact_person ?? '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{c.contact_number ?? '—'}</td>
                      <td className="py-4 px-6">
                        <Badge className={`gap-1 cursor-default font-medium text-xs border ${c.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                          {c.status === 'active' ? <CheckCircle size={11} /> : <XCircle size={11} />}
                          {c.status ?? 'unknown'}
                        </Badge>
                      </td>
                    </tr>
                  )) : <EmptyState icon={Wallet} label="clients" />}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Receipt size={14} className="text-[#DC2626]" /> All Invoices
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{invoices.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Invoice #', 'Client ID', 'Amount', 'Status', 'Issued', 'Due'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.length > 0 ? invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-600 font-medium">{inv.invoice_number ?? '—'}</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{inv.client_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-[#1A1A1A]">{formatCurrency(inv.amount)}</td>
                      <td className="py-4 px-6"><InvoiceStatusBadge status={inv.status} /></td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(inv.issued_date)}</td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(inv.due_date)}</td>
                    </tr>
                  )) : <EmptyState icon={Receipt} label="invoices" />}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Revenue */}
        <TabsContent value="revenue">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={14} className="text-[#DC2626]" /> Revenue Records
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{revenues.length} entries</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Project ID', 'Amount', 'Revenue Date', 'Notes'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revenues.length > 0 ? revenues.map((rev) => (
                    <tr key={rev.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{rev.project_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-emerald-700">{formatCurrency(rev.amount)}</td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(rev.revenue_date)}</td>
                      <td className="py-4 px-6 text-[#6B7280] max-w-sm truncate">{rev.notes ?? '—'}</td>
                    </tr>
                  )) : <EmptyState icon={TrendingUp} label="revenue records" />}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Reimbursements */}
        <TabsContent value="reimbursements">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <RefreshCw size={14} className="text-[#DC2626]" /> Reimbursements
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{reimbursements.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] text-[#6B7280]">
                    {['Employee ID', 'Amount', 'Category', 'Status', 'Submitted', 'Description'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reimbursements.length > 0 ? reimbursements.map((r) => (
                    <tr key={r.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{r.employee_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-[#1A1A1A]">{formatCurrency(r.amount)}</td>
                      <td className="py-4 px-6">
                        {r.category ? (
                          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md font-medium">{r.category}</span>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6"><ReimbursementStatusBadge status={r.status} /></td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(r.submitted_date)}</td>
                      <td className="py-4 px-6 text-[#6B7280] max-w-xs truncate">{r.description ?? '—'}</td>
                    </tr>
                  )) : <EmptyState icon={RefreshCw} label="reimbursements" />}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
