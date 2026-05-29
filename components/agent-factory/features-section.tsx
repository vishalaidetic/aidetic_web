'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import {
  BarChart2,
  CheckCircle2,
  Cloud,
  Database,
  FileText,
  Layers,
  Lock,
  MessageSquare,
  Plug,
  Search,
  Shield,
  Zap
} from 'lucide-react'
import { FeatureCard } from './feature-card'

/* ── Visual 1: Chat-style analyst interface ── */
function AnalystMockup() {
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Dark top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-900">
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
      <div className="flex flex-1 gap-0">
        {/* Left sidebar */}
        <div className="w-10 border-r border-slate-100 flex flex-col items-center gap-3 pt-4">
          {[BarChart2, FileText, Layers].map((Icon, i) => (
            <Icon key={i} className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-5 space-y-4 overflow-hidden">
          {/* User question bubble */}
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
              <MessageSquare className="w-3 h-3 text-cyan-600" />
            </div>
            <div className="bg-slate-50 rounded-xl rounded-tl-none px-3 py-2 text-[10px] text-slate-600 max-w-[80%] leading-relaxed">
              Which top performing products need re-stocking this year?
            </div>
          </div>

          {/* AI response */}
          <div className="space-y-2">
            <div className="text-[9px] text-slate-400 ml-1">Agent Factory is analysing…</div>

            {/* Mini table */}
            <div className="border border-slate-100 rounded-lg overflow-hidden text-[9px]">
              <div className="grid grid-cols-3 bg-slate-50 px-3 py-1.5 font-semibold text-slate-500 border-b border-slate-100">
                <span>Product</span><span>Revenue</span><span>Stock</span>
              </div>
              {[
                ['1. Apex', '$2.4M', 'Low ⚠'],
                ['2. Arcana World', '$1.9M', 'Critical 🔴'],
              ].map(([p, r, s], i) => (
                <div key={i} className="grid grid-cols-3 px-3 py-1.5 text-slate-600 border-b border-slate-50 last:border-0">
                  <span>{p}</span><span>{r}</span><span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up chips */}
          <div className="flex gap-2 flex-wrap">
            {['Show full list', 'Export CSV', 'Set alert'].map((t, i) => (
              <span key={i} className="px-2 py-1 bg-cyan-50 text-cyan-600 rounded text-[9px] border border-cyan-200 cursor-pointer hover:bg-cyan-100 transition-colors">{t}</span>
            ))}
          </div>

          {/* Input */}
          <div className="mt-auto flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white">
            <Search className="w-3 h-3 text-slate-300" />
            <span className="text-[9px] text-slate-300 italic">Ask a follow-up question…</span>
            <div className="ml-auto w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Visual 2: Data sources connected panel ── */
function DataSourcesMockup() {
  const sources = [
    { name: 'Snowflake', status: true, color: 'bg-blue-400' },
    { name: 'Salesforce', status: true, color: 'bg-cyan-500' },
    { name: 'BigQuery', status: true, color: 'bg-green-400' },
    { name: 'S3 Datalake', status: false, color: 'bg-slate-300' },
    { name: 'Notion Docs', status: true, color: 'bg-violet-400' },
    { name: 'HubSpot CRM', status: true, color: 'bg-orange-400' },
  ]
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800" style={{ fontFamily: 'var(--font-inter)' }}>Data Connectors</span>
          <span className="text-[9px] px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded-full">5 Active</span>
        </div>
        <p className="text-[9px] text-slate-400 mt-1">Unified access across all enterprise sources</p>
      </div>

      {/* Sources grid */}
      <div className="flex-1 p-5 grid grid-cols-2 gap-3">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
            <div className={`w-7 h-7 rounded-lg ${s.color} flex items-center justify-center`}>
              <Database className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-slate-700 truncate">{s.name}</div>
              <div className={`text-[8px] ${s.status ? 'text-green-500' : 'text-slate-400'}`}>
                {s.status ? '● Connected' : '○ Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-[83%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
        </div>
        <span className="text-[9px] text-slate-400">83% coverage</span>
      </div>
    </div>
  )
}

/* ── Visual 3: Security & compliance badges ── */
function SecurityMockup() {
  const certs = ['AICPA SOC 2', 'ISO 27001', 'DPF', 'GDPR']
  const roles = [
    { name: 'Developer', access: 'Doc JSON Maker', active: false },
    { name: 'Analyst', access: 'Extended manager', active: true },
    { name: 'Manager 1', access: 'Extended manager', active: false },
    { name: 'Manager 2', access: 'AI column manager', active: false },
  ]
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Certs row */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Compliance Certifications</div>
        <div className="flex gap-3">
          {certs.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-cyan-300 transition-colors">
              <Shield className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
              <span className="text-[7px] font-bold text-slate-500 text-center leading-tight">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roles table */}
      <div className="flex-1 p-5 space-y-2">
        {/* Table header */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-1.5 w-5">
            <div className="w-2.5 h-2.5 rounded border border-slate-300" />
          </div>
          <span className="flex-1 text-[9px] font-semibold text-slate-500">Role Name</span>
          <span className="w-28 text-[9px] font-semibold text-slate-500">Description</span>
        </div>

        {/* Rows */}
        {roles.map((r, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${r.active ? 'bg-cyan-500' : 'hover:bg-slate-50'}`}>
            <div className="w-5 flex items-center">
              {r.active
                ? <CheckCircle2 className="w-3 h-3 text-white" />
                : <div className="w-2.5 h-2.5 rounded border border-slate-200" />
              }
            </div>
            <span className={`flex-1 text-[10px] font-medium ${r.active ? 'text-white' : 'text-slate-700'}`}>{r.name}</span>
            <span className={`w-28 text-[9px] ${r.active ? 'text-white/80' : 'text-slate-400'}`}>{r.access}</span>
          </div>
        ))}
      </div>

      {/* Lock footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2">
        <Lock className="w-3 h-3 text-slate-400" strokeWidth={1.5} />
        <span className="text-[9px] text-slate-400">Zero LLM data retention · Row-level security active</span>
      </div>
    </div>
  )
}

/* ── Visual 4: Integration / stack overview ── */
function IntegrationMockup() {
  const tools = [
    { name: 'Slack', color: 'bg-violet-500', icon: MessageSquare },
    { name: 'Tableau', color: 'bg-blue-500', icon: BarChart2 },
    { name: 'Claude AI', color: 'bg-orange-400', icon: Zap },
    { name: 'dbt Core', color: 'bg-orange-500', icon: Layers },
    { name: 'Looker', color: 'bg-green-500', icon: Search },
    { name: 'Power BI', color: 'bg-yellow-500', icon: BarChart2 },
  ]
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <span className="text-sm font-bold text-slate-800" style={{ fontFamily: 'var(--font-inter)' }}>Integration Hub</span>
        <p className="text-[11px] text-slate-400 mt-0.5">Connect your entire analytics stack</p>
      </div>

      {/* Central node + spokes */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        
        {/* Connector lines (rendered from absolute center of container) */}
        {tools.map((t, i) => {
          const angle = (i / tools.length) * 360
          const r = 125 // increased radius
          return (
            <div
              key={`line-${i}`}
              className="absolute bg-slate-200/60"
              style={{
                width: '1.5px',
                height: `${r - 24}px`,
                transformOrigin: 'top center',
                left: '50%',
                top: '50%',
                transform: `rotate(${angle - 90}deg)`,
                zIndex: 10
              }}
            />
          )
        })}

        {/* Centre */}
        <div className="absolute w-20 h-20 rounded-3xl bg-cyan-500 shadow-xl shadow-cyan-200 flex items-center justify-center z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="text-white text-[11px] font-bold text-center leading-relaxed tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Agent<br />Factory</div>
        </div>

        {/* Orbiting tools */}
        {tools.map((t, i) => {
          const angle = (i / tools.length) * 360
          const rad = (angle * Math.PI) / 180
          const r = 125 // increased radius
          const x = Math.cos(rad) * r
          const y = Math.sin(rad) * r
          const Icon = t.icon
          return (
            <div
              key={`node-${i}`}
              className="absolute flex flex-col items-center gap-1.5 z-30"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            >
              <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap">{t.name}</span>
            </div>
          )
        })}
      </div>

      {/* API row */}
      <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
        <Plug className="w-4 h-4 text-cyan-500" strokeWidth={1.5} />
        <span className="text-[11px] text-slate-500 font-medium">REST API · Webhooks · SSO · Custom connectors</span>
        <Cloud className="w-4 h-4 text-slate-300 ml-auto" strokeWidth={1.5} />
      </div>
    </div>
  )
}

/* ── Main section ── */
export function FeaturesSection() {
  const features = [
    {
      title: 'One agent per Function. Each one an expert.',
      description:
        "Agent Factory doesn't throw one generic AI Agent at every business question. It deploys specialist agents trained on each function's KPIs, vocabulary, and decision patterns.",
      visual: <AnalystMockup />,
      reversed: false,
      delay: 0,
    },
    {
      title: 'Answers that explain themselves.',
      description:
        'Every answer shows the reasoning behind it. What was queried, what logic was applied, why the number looks the way it does. Your team sees the work, not just the output.',
      visual: <DataSourcesMockup />,
      reversed: true,
      delay: 0.1,
    },
    {
      title: 'Charts, breakdowns, and trend lines on demand.',
      description:
        'Agent Factory shows you the insight in every format that makes decision making easier. Ask "how did revenue trend last quarter" and get a chart. Ask "break it down by region" and the view updates.',
      visual: <SecurityMockup />,
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
    <section className="bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/60 overflow-hidden">

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
              background: 'linear-gradient(to right, #06b6d4, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why CXOs and Stakeholders love Agent Factory
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
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
