import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { clientApi, invoiceApi, reimbursementApi, revenueApi } from '@/lib/api/brain-client'
import { Receipt, RefreshCw, TrendingUp, Wallet, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

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

export default async function FinancePage(props: PageProps) {
  const searchParams: any = await (props.searchParams || Promise.resolve({}))

  const pClient = Number(searchParams.cpage) || 1
  const pInvoice = Number(searchParams.ipage) || 1
  const pRevenue = Number(searchParams.rpage) || 1
  const pReimb = Number(searchParams.rmpage) || 1
  const limit = 100

  // Build current params object to pass to pagination links
  const currentParams = new URLSearchParams()
  if (searchParams.cpage) currentParams.set('cpage', String(searchParams.cpage))
  if (searchParams.ipage) currentParams.set('ipage', String(searchParams.ipage))
  if (searchParams.rpage) currentParams.set('rpage', String(searchParams.rpage))
  if (searchParams.rmpage) currentParams.set('rmpage', String(searchParams.rmpage))

  const [clientRes, invoiceRes, revenueRes, reimbRes] = await Promise.allSettled([
    clientApi.list((pClient - 1) * limit, limit),
    invoiceApi.list((pInvoice - 1) * limit, limit),
    revenueApi.list((pRevenue - 1) * limit, limit),
    reimbursementApi.list((pReimb - 1) * limit, limit),
  ])

  const clients = clientRes.status === 'fulfilled' ? (clientRes.value.data ?? []) : []
  const clientsTotal = clientRes.status === 'fulfilled' ? (clientRes.value.total ?? clients.length) : 0
  const invoices = invoiceRes.status === 'fulfilled' ? (invoiceRes.value.data ?? []) : []
  const invoicesTotal = invoiceRes.status === 'fulfilled' ? (invoiceRes.value.total ?? invoices.length) : 0
  const revenues = revenueRes.status === 'fulfilled' ? (revenueRes.value.data ?? []) : []
  const revenuesTotal = revenueRes.status === 'fulfilled' ? (revenueRes.value.total ?? revenues.length) : 0
  const reimbursements = reimbRes.status === 'fulfilled' ? (reimbRes.value.data ?? []) : []
  const reimbursementsTotal = reimbRes.status === 'fulfilled' ? (reimbRes.value.total ?? reimbursements.length) : 0

  const backendOffline = clientRes.status === 'rejected' || invoiceRes.status === 'rejected'

  const totalRevenue = revenues.reduce((s, r) => s + (r.revenue_amount ?? 0), 0)
  const totalInvoiced = invoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalReimbursed = reimbursements
    .filter((r) => r.status?.toLowerCase() === 'approved')
    .reduce((s, r) => s + (r.claim_amount ?? 0), 0)

  const currentTab = typeof searchParams.tab === 'string' ? searchParams.tab : 'clients'

  return (
    <div className="space-y-6">
      {/* Backend offline banner */}
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

        {/* Clients */}
        <TabsContent value="clients">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Wallet size={14} className="text-[#DC2626]" /> All Clients
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{clientsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Company Name', 'Industry', 'Client ID', 'Created At'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients.length > 0 ? clients.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                      <td className="py-4 px-6 font-medium text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">{c.company_name ?? '—'}</td>
                      <td className="py-4 px-6 text-[#6B7280]">{c.industry ?? '—'}</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{c.id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 text-[#6B7280]">{formatDate(c.created_at)}</td>
                    </tr>
                  )) : <EmptyState icon={Wallet} label="clients" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pClient} hasMore={clients.length === limit} paramName="cpage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <Receipt size={14} className="text-[#DC2626]" /> All Invoices
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{invoicesTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Invoice ID', 'Client ID', 'Project ID', 'Amount', 'Due Date'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.length > 0 ? invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-600 font-medium">{inv.id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{inv.client_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{inv.project_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-[#1A1A1A]">{formatCurrency(inv.amount)}</td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(inv.due_date)}</td>
                    </tr>
                  )) : <EmptyState icon={Receipt} label="invoices" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pInvoice} hasMore={invoices.length === limit} paramName="ipage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Revenue */}
        <TabsContent value="revenue">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={14} className="text-[#DC2626]" /> Revenue Records
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{revenuesTotal} entries</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Revenue ID', 'Project ID', 'Invoice ID', 'Amount', 'Recognized Date'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revenues.length > 0 ? revenues.map((rev) => (
                    <tr key={rev.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{rev.id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{rev.project_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{rev.invoice_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-emerald-700">{formatCurrency(rev.revenue_amount)}</td>
                      <td className="py-4 px-6 text-[#6B7280] whitespace-nowrap">{formatDate(rev.recognized_date)}</td>
                    </tr>
                  )) : <EmptyState icon={TrendingUp} label="revenue records" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pRevenue} hasMore={revenues.length === limit} paramName="rpage" currentParams={currentParams} />
          </div>
        </TabsContent>

        {/* Reimbursements */}
        <TabsContent value="reimbursements">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
              <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
                <RefreshCw size={14} className="text-[#DC2626]" /> Reimbursements
              </h2>
              <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">{reimbursementsTotal} records</span>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#F5F5F5]">
                  <tr className="text-[#6B7280]">
                    {['Employee ID', 'Expense ID', 'Claim Amount', 'Status', 'Description'].map((h) => (
                      <th key={h} className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider whitespace-nowrap bg-[#F5F5F5] shadow-[0_1px_0_0_#e2e8f0]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reimbursements.length > 0 ? reimbursements.map((r) => (
                    <tr key={r.id} className="hover:bg-[#F5F5F5]/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{r.employee_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{r.expense_id?.slice(0, 8)}…</td>
                      <td className="py-4 px-6 font-semibold text-[#1A1A1A]">{formatCurrency(r.claim_amount)}</td>
                      <td className="py-4 px-6"><ReimbursementStatusBadge status={r.status} /></td>
                      <td className="py-4 px-6 text-[#6B7280] max-w-xs truncate">{r.description ?? '—'}</td>
                    </tr>
                  )) : <EmptyState icon={RefreshCw} label="reimbursements" />}
                </tbody>
              </table>
            </div>
            <PaginationControls page={pReimb} hasMore={reimbursements.length === limit} paramName="rmpage" currentParams={currentParams} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
