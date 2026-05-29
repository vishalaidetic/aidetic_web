'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import {
  BarChart2,
  ChevronDown,
  Cloud,
  FileText,
  Layers,
  MessageSquare,
  Plug,
  Search,
  Zap,
  Database
} from 'lucide-react'
import { FeatureCard } from './feature-card'

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full bg-white relative">
      {/* Dark top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1e54] z-30 relative">
        <Image
          src="/Aideticlogo.png"
          alt="Aidetic"
          width={80}
          height={24}
          className="h-5 w-auto object-contain brightness-0 invert"
        />
        <div className="flex-1 h-5 bg-white/10 rounded-md" />
        <div className="flex gap-1.5">
          {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden relative">
        {/* Left sidebar */}
        <div className="w-10 border-r border-slate-100 flex flex-col items-center gap-3 pt-4 shrink-0 bg-white z-20">
          {[BarChart2, FileText, Layers].map((Icon, i) => (
            <Icon key={i} className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 relative bg-white z-10 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── Visual 1: Chat-style analyst interface ── */
function AnalystMockup() {
  return (
    <MockupShell>
      <div className="flex-1 p-5 space-y-4 overflow-hidden flex flex-col">
        {/* User question bubble */}
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-[#f6f9fc] flex items-center justify-center shrink-0">
            <MessageSquare className="w-3 h-3 text-[#533afd]" />
          </div>
          <div className="bg-slate-50 rounded-xl rounded-tl-none px-3 py-2 text-[10px] text-[#64748d] max-w-[80%] leading-relaxed">
            Which top performing products need re-stocking this year?
          </div>
        </div>

        {/* AI response */}
        <div className="space-y-2">
          <div className="text-[9px] text-[#64748d] ml-1">Agent Factory is analysing…</div>

          {/* Mini table */}
          <div className="border border-slate-100 rounded-lg overflow-hidden text-[9px]">
            <div className="grid grid-cols-3 bg-slate-50 px-3 py-1.5 font-semibold text-[#64748d] border-[#533afd] border-slate-100">
              <span>Product</span><span>Revenue</span><span>Stock</span>
            </div>
            {[
              ['1. Apex', '$2.4M', 'Low ⚠'],
              ['2. Arcana World', '$1.9M', 'Critical 🔴'],
            ].map(([p, r, s], i) => (
              <div key={i} className="grid grid-cols-3 px-3 py-1.5 text-[#64748d] border-[#533afd] border-slate-50 last:border-0">
                <span>{p}</span><span>{r}</span><span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up chips */}
        <div className="flex gap-2 flex-wrap">
          {['Show full list', 'Export CSV', 'Set alert'].map((t, i) => (
            <span key={i} className="px-2 py-1 bg-[#f6f9fc] text-[#533afd] rounded text-[9px] border border-[#665efd] cursor-pointer hover:bg-[#f6f9fc] transition-colors">{t}</span>
          ))}
        </div>

        {/* Input */}
        <div className="mt-auto flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white">
          <Search className="w-3 h-3 text-slate-300" />
          <span className="text-[9px] text-slate-300 italic">Ask a follow-up question…</span>
          <div className="ml-auto w-5 h-5 rounded-full bg-[#533afd] flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

/* ── Visual 2: Business Area Dropdown + Chat ── */
function BusinessAreaMockup() {
  return (
    <MockupShell>
      <div className="flex flex-col w-full h-full bg-white px-5 py-4 justify-start relative">
        <label className="text-[9px] font-bold text-[#64748d] uppercase tracking-widest mb-2 block" style={{ fontFamily: 'var(--font-inter)' }}>Select Agent Domain</label>

        <div className="relative mb-6">
          <div className="flex items-center justify-between border border-[#665efd] rounded-xl px-4 py-3 bg-white shadow-sm ring-2 ring-[#533afd]/20 z-10 relative">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#533afd]/10 flex items-center justify-center">
                <BarChart2 className="w-3.5 h-3.5 text-[#533afd]" />
              </div>
              <span className="text-xs font-semibold text-[#0d253d]">Marketing & Growth</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#533afd] rotate-180 transition-transform" />
          </div>

          {/* Expanded Dropdown Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200 overflow-hidden z-20">
            <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-[#0d253d]">Sales & CRM</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
              <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-[#0d253d]">Financial KPIs</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer border-t border-slate-100">
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-[#64748d]" />
              </div>
              <span className="text-xs font-medium text-[#64748d]">Supply Chain</span>
            </div>
          </div>
        </div>

        {/* Dimmed Chat input area */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-white opacity-50 pointer-events-none mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 text-[#533afd]" />
            </div>
            <span className="text-xs font-semibold text-[#0d253d]">Ask the Marketing Agent</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-3">
            <span className="text-[10px] text-[#64748d]">E.g., "What was our CAC for the Q3 campaign?"</span>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center"><BarChart2 className="w-2.5 h-2.5 text-[#64748d]" /></div>
              </div>
              <div className="px-3 py-1 bg-[#533afd] rounded-lg flex items-center gap-1.5">
                <span className="text-white text-[8px] font-bold uppercase tracking-wider">Send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

/* ── Visual 3: Charts and Breakdowns ── */
function ChartsMockup() {
  return (
    <MockupShell>
      <div className="flex flex-col w-full h-full p-5 gap-4 bg-white">
        {/* Header/Title */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-[#0d253d]">Q3 Revenue Overview</div>
          <div className="text-[9px] bg-slate-50 border border-slate-200 text-[#64748d] px-2 py-1 rounded-md shadow-sm">Last 90 Days</div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">
          {/* Left column: Pie Chart */}
          <div className="w-[45%] flex flex-col">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-1 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
              <div className="text-[9px] font-bold text-[#64748d] w-full text-left mb-4 uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>Region Split</div>

              {/* Mock Pie Chart (CSS conic-gradient) */}
              <div className="relative w-24 h-24 rounded-full shadow-inner" style={{
                background: 'conic-gradient(#533afd 0% 45%, #ea2261 45% 75%, #f96bee 75% 100%)'
              }}>
                {/* Donut hole */}
                <div className="absolute inset-0 m-auto w-12 h-12 bg-slate-50 rounded-full shadow-sm flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0d253d]">100%</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4 w-full justify-center">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#533afd]"></div><span className="text-[8px] font-medium text-[#64748d]">NA</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ea2261]"></div><span className="text-[8px] font-medium text-[#64748d]">EMEA</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f96bee]"></div><span className="text-[8px] font-medium text-[#64748d]">APAC</span></div>
              </div>
            </div>
          </div>

          {/* Right column: Line Chart and Bar Chart */}
          <div className="w-[55%] flex flex-col gap-4 h-full">
            {/* Line chart mock */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex-1 flex flex-col shadow-sm">
              <div className="text-[9px] font-bold text-[#64748d] uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Growth Trend</div>
              <div className="flex-1 relative border-l border-b border-slate-200 ml-2 mb-2">
                {/* SVG Line */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,90 Q20,80 40,50 T80,30 T100,10" fill="none" stroke="#533afd" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                  <path d="M0,100 L0,90 Q20,80 40,50 T80,30 T100,10 L100,100 Z" fill="url(#gradLine)" />
                  <defs>
                    <linearGradient id="gradLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#533afd" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#533afd" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Bar chart mock */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex-1 flex flex-col shadow-sm">
              <div className="text-[9px] font-bold text-[#64748d] uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Monthly</div>
              <div className="flex-1 flex items-end justify-between gap-1.5 border-b border-slate-200 pb-0.5 ml-1">
                <div className="w-full bg-[#533afd]/20 hover:bg-[#533afd]/80 transition-colors rounded-t-sm relative group" style={{ height: '35%' }}><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-[#0d253d] font-bold opacity-0 group-hover:opacity-100">$1M</div></div>
                <div className="w-full bg-[#533afd]/40 hover:bg-[#533afd]/80 transition-colors rounded-t-sm relative group" style={{ height: '50%' }}><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-[#0d253d] font-bold opacity-0 group-hover:opacity-100">$1.5M</div></div>
                <div className="w-full bg-[#ea2261] hover:bg-[#ea2261]/80 transition-colors rounded-t-sm shadow-sm relative group" style={{ height: '85%' }}><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-[#0d253d] font-bold opacity-0 group-hover:opacity-100">$2.8M</div></div>
                <div className="w-full bg-[#533afd] hover:bg-[#533afd]/80 transition-colors rounded-t-sm shadow-sm relative group" style={{ height: '100%' }}><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-[#0d253d] font-bold opacity-0 group-hover:opacity-100">$3.2M</div></div>
                <div className="w-full bg-[#f96bee] hover:bg-[#f96bee]/80 transition-colors rounded-t-sm shadow-sm relative group" style={{ height: '70%' }}><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-[#0d253d] font-bold opacity-0 group-hover:opacity-100">$2.1M</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

/* ── Visual 4: Integration / stack overview ── */
function IntegrationMockup() {
  const tools = [
    { name: 'Slack', color: 'bg-violet-500', icon: MessageSquare },
    { name: 'Tableau', color: 'bg-[#ea2261]', icon: BarChart2 },
    { name: 'Claude AI', color: 'bg-orange-400', icon: Zap },
    { name: 'dbt Core', color: 'bg-orange-500', icon: Layers },
    { name: 'Looker', color: 'bg-green-500', icon: Search },
    { name: 'Power BI', color: 'bg-yellow-500', icon: BarChart2 },
  ]
  return (
    <MockupShell>
      <div className="flex flex-col w-full h-full bg-white relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 relative z-20 bg-white">
          <span className="text-sm font-bold text-[#0d253d]" style={{ fontFamily: 'var(--font-inter)' }}>Integration Hub</span>
          <p className="text-[11px] text-[#64748d] mt-0.5">Connect your entire analytics stack</p>
        </div>

        {/* Horizontal Flow */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-8 py-6">
          {/* Background horizontal line */}
          <div className="absolute left-12 right-12 top-[calc(50%-10px)] h-[2px] bg-slate-100 z-0" />
          
          <div className="flex items-start justify-between w-full z-10">
            {/* Source 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg ring-4 ring-white relative group">
                <Database className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-bold text-[#64748d] text-center w-16 leading-tight">Table Join Injection</span>
            </div>

            {/* Source 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-[#ea2261] flex items-center justify-center shadow-lg ring-4 ring-white relative group">
                <Layers className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-bold text-[#64748d] text-center w-20 leading-tight">KPI Performance Metrics</span>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center gap-2">
              <div className="px-4 py-3 h-12 rounded-2xl bg-[#533afd] flex items-center justify-center shadow-xl shadow-[#533afd]/20 ring-4 ring-white">
                <span className="text-white text-[11px] font-bold text-center leading-tight tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Agent<br/>Factory</span>
              </div>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6] flex items-center justify-center shadow-lg ring-4 ring-white relative group">
                <MessageSquare className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-bold text-[#64748d] text-center w-12 leading-tight">Slack</span>
            </div>
          </div>
        </div>

        {/* API row */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
          <Plug className="w-4 h-4 text-[#533afd]" strokeWidth={1.5} />
          <span className="text-[11px] text-[#64748d] font-medium">REST API · Webhooks · SSO · Custom connectors</span>
          <Cloud className="w-4 h-4 text-slate-300 ml-auto" strokeWidth={1.5} />
        </div>
      </div>
    </MockupShell>
  )
}

/* ── Main section ── */
export function FeaturesSection() {
  const features = [
    {
      title: 'One Agent per Function. Each one an Expert.',
      description:
        "Agent Factory doesn't throw one generic AI Agent at every business question. It deploys specialist agents trained on each function's KPIs, vocabulary, and decision patterns.",
      visual: <BusinessAreaMockup />,
      reversed: false,
      delay: 0,
    },
    {
      title: 'Answers that Explain Themselves.',
      description:
        'Every answer shows the reasoning behind it. What was queried, what logic was applied, why the number looks the way it does. Your team sees the work, not just the output.',
      visual: <AnalystMockup />,
      reversed: true,
      delay: 0.1,
    },
    {
      title: 'Charts, Breakdowns, and Trend Lines on Demand.',
      description:
        'Agent Factory shows you the insight in every format that makes decision making easier. Ask "how did revenue trend last quarter" and get a chart. Ask "break it down by region" and the view updates.',
      visual: <ChartsMockup />,
      reversed: false,
      delay: 0.1,
    },
    {
      title: 'Agents that Get Smarter Every Week',
      description:
        'Most AI tools stay stagnate. Agent Factory can be continuously tuned with new KPIs, changing business rules, evolving data models so the agents stay relevant as your business changes.',
      visual: <IntegrationMockup />,
      reversed: true,
      delay: 0.1,
    },
  ]

  return (
    <section className="bg-gradient-to-br from-white via-blue-50/40 to-[#f6f9fc]/60 overflow-hidden">

      {/* Section header */}
      <div className="pt-24 pb-4 px-6">
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #ea2261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why CXOs and Stakeholders love Agent Factory
          </h2>
          <p className="text-[#64748d] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            It works the way they think. No SQL. No tickets to the data team. Just plain-English questions and answers they can act on.
          </p>
        </motion.div>
      </div>

      {/* Feature cards — share the same background */}
      <div className="pb-16">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>

    </section>
  )
}
