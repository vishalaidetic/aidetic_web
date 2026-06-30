import { getMeetingRequests } from '@/lib/db/meeting_queries'
import { formatDate } from '@/lib/utils/formatting'
import { Calendar, Mail, Phone, Building2, Users, MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meeting Requests - Admin',
  description: 'View all meeting requests submitted via Request a Call',
}

export default async function MeetingRequestsPage() {
  let requests: Awaited<ReturnType<typeof getMeetingRequests>> = []
  let fetchError = false

  try {
    requests = await getMeetingRequests()
  } catch {
    fetchError = true
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, #533afd, #1B2340)' }}>
            <Users size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1B2340]">Meeting Requests</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              {fetchError ? 'Error loading data' : `${requests.length} total request${requests.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Requests', value: requests.length, color: 'bg-[#533afd]' },
          { label: 'This Month', value: requests.filter(r => new Date(r.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length, color: 'bg-[#1B2340]' },
          { label: 'With Phone', value: requests.filter(r => r.phone).length, color: 'bg-green-600' },
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

      {fetchError ? (
        <div className="text-center py-16 bg-white border border-red-100 rounded-2xl">
          <p className="text-red-500 font-medium">Failed to load meeting requests.</p>
          <p className="text-sm text-slate-400 mt-1">Check your database connection.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <Users size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="font-semibold text-[#1B2340]">No requests yet</p>
          <p className="text-sm text-[#6B7280] mt-1">Meeting requests will appear here once submitted.</p>
        </div>
      ) : (
        /* Desktop table */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F5F5F5]/60">
            <h2 className="text-sm font-semibold text-[#1B2340] uppercase tracking-wider flex items-center gap-2">
              <Users size={14} className="text-[#533afd]" />
              All Requests
            </h2>
            <span className="text-xs text-[#6B7280] bg-white border border-slate-200 px-2.5 py-1 rounded-full font-medium">
              {requests.length} entries
            </span>
          </div>

          {/* Mobile card view */}
          <div className="block sm:hidden divide-y divide-slate-100">
            {requests.map((r) => (
              <div key={r.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#1B2340]">{r.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1">
                      <Building2 size={11} /> {r.organization}
                    </p>
                  </div>
                  <span className="text-xs text-[#6B7280] shrink-0 flex items-center gap-1">
                    <Calendar size={11} /> {formatDate(r.created_at)}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm text-[#1B2340]">
                  <p className="flex items-center gap-2 text-[#533afd]">
                    <Mail size={13} /> {r.email}
                  </p>
                  {r.phone && (
                    <p className="flex items-center gap-2 text-[#64748b]">
                      <Phone size={13} /> {r.phone}
                    </p>
                  )}
                  <div className="bg-slate-50 rounded-lg px-3 py-2 text-xs text-[#64748b] flex items-start gap-2 mt-2">
                    <MessageSquare size={12} className="mt-0.5 shrink-0" />
                    <span>{r.purpose}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F5F5] text-[#6B7280]">
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Organization</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Purpose</th>
                  <th className="text-left py-3.5 px-6 font-semibold text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F5F5]/60 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: 'linear-gradient(135deg, #533afd, #1B2340)' }}>
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[#1A1A1A]">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 text-[#533afd] font-medium">
                          <Mail size={12} /> {r.email}
                        </p>
                        {r.phone ? (
                          <p className="flex items-center gap-1.5 text-[#6B7280]">
                            <Phone size={12} /> {r.phone}
                          </p>
                        ) : (
                          <p className="text-xs text-slate-300 pl-[18px]">No phone</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1.5 text-[#1B2340]">
                        <Building2 size={13} className="text-slate-400" /> {r.organization}
                      </span>
                    </td>
                    <td className="py-4 px-6 max-w-[260px]">
                      <p className="text-[#64748b] line-clamp-2 text-xs leading-relaxed">{r.purpose}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1.5 text-[#6B7280] text-xs">
                        <Calendar size={12} /> {formatDate(r.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
