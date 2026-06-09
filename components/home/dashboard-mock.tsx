"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shared micro-components ───────────────────────────────────────────────────

function Badge({label, variant = 'purple' }) {
  const map = {
    purple: 'bg-[#533afd]/10 text-[#533afd]',
    green: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    blue: 'bg-sky-50 text-sky-600 border border-sky-200',
    amber: 'bg-amber-50 text-amber-600 border border-amber-200',
    slate: 'bg-slate-100 text-slate-500',
    red: 'bg-red-50 text-red-500 border border-red-200',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${map[variant]}`}>
      {label}
    </span>
  );
}

function SectionHeader({title, sub, action }: {title: string; sub?: string; action?: React.ReactNode}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-[22px] font-semibold text-slate-900 tracking-tight">{title}</h2>
        {sub && <p className="text-sm text-slate-400 mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, delta, deltaColor = 'text-emerald-500', accent = false }:{label: string; value: string; delta?: string; deltaColor?: string; accent?: boolean}) {
  return (
    <div className={`rounded-xl border p-5 transition-all duration-300 hover:shadow-lg cursor-default group/stat ${accent ? 'border-[#533afd]/20 bg-[#533afd]/[0.03]' : 'border-slate-100 bg-white'}`}>
      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{label}</div>
      <div className={`text-3xl font-light tracking-tight mt-2 ${accent ? 'text-[#533afd]' : 'text-slate-900'}`}>{value}</div>
      {delta && <div className={`text-xs mt-1 flex items-center gap-1 ${deltaColor}`}>{delta}</div>}
    </div>
  );
}

const tabMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.18 },
};

// ─── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <motion.div {...tabMotion} className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Agents" value="847" delta="↗ +12 this week" accent />
        <StatCard label="Queries / Day" value="23,512" delta="↗ 99.8% success rate" />
        <StatCard label="Pipelines Running" value="14" delta="2 scheduled today" deltaColor="text-slate-400" />
        <StatCard label="Rows Migrated" value="4.2B" delta="Lifetime" deltaColor="text-slate-400" />
      </div>

      {/* Activity chart */}
      <div className="rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-[#533afd]/20 transition-all duration-300 group/chart relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#533afd]/[0.02] to-transparent opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex justify-between items-start mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Agent Activity · Last 30 Days</div>
            <div className="text-2xl font-light tracking-tight mt-1 flex items-baseline gap-2 text-slate-900">
              705,348 <span className="text-xs font-semibold text-[#533afd] bg-[#533afd]/10 px-2 py-0.5 rounded-full">+14.2%</span>
            </div>
          </div>
          <div className="flex gap-4 items-center text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#533afd]" />Agent queries</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8278E6]" />Migrations</span>
          </div>
        </div>
        <div className="relative z-10 w-full h-[130px]">
          <svg viewBox="0 0 800 160" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {[0, 1, 2, 3, 4].map(i => <line key={i} x1="0" x2="800" y1={i * 40} y2={i * 40} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />)}
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#533afd" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#533afd" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,110 L40,95 L80,100 L120,80 L160,90 L200,70 L240,75 L280,60 L320,55 L360,65 L400,40 L440,50 L480,30 L520,35 L560,42 L600,22 L640,30 L680,18 L720,25 L760,14 L800,20"
              stroke="#533afd" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M0,110 L40,95 L80,100 L120,80 L160,90 L200,70 L240,75 L280,60 L320,55 L360,65 L400,40 L440,50 L480,30 L520,35 L560,42 L600,22 L640,30 L680,18 L720,25 L760,14 L800,20 L800,160 L0,160 Z"
              fill="url(#cg)" opacity="0.35" />
            <path d="M0,135 L40,128 L80,132 L120,120 L160,128 L200,118 L240,122 L280,110 L320,108 L360,115 L400,95 L440,105 L480,85 L520,92 L560,98 L600,80 L640,85 L680,72 L720,80 L760,68 L800,75"
              stroke="#8278E6" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Bottom: status breakdown + recent activity */}
      <div className="grid grid-cols-5 gap-4">
        {/* Agent Health Summary */}
        <div className="col-span-2 rounded-xl border border-slate-100 bg-white p-5 space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">Agent Health Summary</div>
          {[
            { label: 'Operational', count: 1812, pct: 98.1, color: 'bg-emerald-400' },
            { label: 'Degraded', count: 28, pct: 1.5, color: 'bg-amber-400' },
            { label: 'Failed', count: 7, pct: 0.4, color: 'bg-red-400' },
          ].map(r => (
            <div key={r.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">{r.label}</span>
                <span className="text-slate-400 font-mono">{r.count.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${r.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="col-span-3 rounded-xl border border-slate-100 bg-white p-5">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-3">Recent Activity</div>
          <div className="space-y-0.5">
            {[
              { name: 'Finance · close-the-books agent', tag: 'OK', tagV: 'purple', val: '47 queries' },
              { name: 'Salesforce → Snowflake · daily', tag: 'OK', tagV: 'purple', val: '2.1M rows' },
              { name: 'Marketing · campaign analyst', tag: 'OK', tagV: 'purple', val: '128 queries' },
              { name: 'Legacy CRM → HubSpot · backfill', tag: 'RUN', tagV: 'blue', val: '64% · 8m left' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 group/row">
                <div className="flex items-center gap-3">
                  <Badge label={r.tag} variant={r.tagV} />
                  <span className="text-sm text-slate-700 font-medium group-hover/row:text-[#533afd] transition-colors">{r.name}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono group-hover/row:text-slate-800 transition-colors">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Agents Tab ────────────────────────────────────────────────────────────────

const AGENTS = [
  {
    name: 'Finance Reconciliation',
    model: 'GPT-4o · Aidetic Core v3',
    status: 'Running',
    statusV: 'green',
    throughput: '1,452 / hr',
    health: '99.9%',
    latency: '340 ms',
    errRate: '0.01%',
    tasks: 8412,
    uptime: '99.97%',
    desc: 'Automates end-of-period reconciliation across GL, AP, and AR systems.',
  },
  {
    name: 'Customer Support QA',
    model: 'Claude 3.5 · Aidetic Core v3',
    status: 'Running',
    statusV: 'green',
    throughput: '8,124 / hr',
    health: '98.5%',
    latency: '210 ms',
    errRate: '0.08%',
    tasks: 51_200,
    uptime: '99.91%',
    desc: 'Real-time quality assurance scoring for support conversations with CSAT prediction.',
  },
  {
    name: 'Marketing Campaign Analyser',
    model: 'Gemini 1.5 · Aidetic Core v2',
    status: 'Idle',
    statusV: 'slate',
    throughput: '0 / hr',
    health: '—',
    latency: '—',
    errRate: '—',
    tasks: 3_044,
    uptime: '100%',
    desc: 'Multi-channel attribution modelling and campaign performance summarisation.',
  },
  {
    name: 'Sales Data Scraper',
    model: 'GPT-4o-mini · Aidetic Core v3',
    status: 'Running',
    statusV: 'green',
    throughput: '342 / hr',
    health: '100%',
    latency: '890 ms',
    errRate: '0.00%',
    tasks: 12_788,
    uptime: '99.85%',
    desc: 'Structured extraction of sales signals from external sources and CRM enrichment.',
  },
  {
    name: 'Contract Risk Classifier',
    model: 'Claude 3 Haiku · Aidetic Core v3',
    status: 'Running',
    statusV: 'green',
    throughput: '78 / hr',
    health: '97.2%',
    latency: '520 ms',
    errRate: '0.14%',
    tasks: 982,
    uptime: '98.40%',
    desc: 'Flags high-risk clauses in vendor and customer contracts using LLM-driven legal NLP.',
  },
  {
    name: 'Inventory Demand Planner',
    model: 'GPT-4o · Aidetic Core v3',
    status: 'Degraded',
    statusV: 'amber',
    throughput: '210 / hr',
    health: '84.1%',
    latency: '1,240 ms',
    errRate: '1.20%',
    tasks: 4_502,
    uptime: '94.30%',
    desc: 'Forecasts SKU-level demand combining historical sales, seasonality, and market signals.',
  },
];

function AgentsTab() {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div {...tabMotion} className="space-y-5">
      <SectionHeader
        title="Active Agents"
        sub={`847 agents · ${AGENTS.filter(a => a.status === 'Running').length} running`}
        action={
          <button className="bg-[#533afd] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#533afd]/90 transition-colors">
            + Deploy New Agent
          </button>
        }
      />

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Agents', value: AGENTS.length, sub: 'across all envs' },
          { label: 'Running', value: AGENTS.filter(a => a.status === 'Running').length, sub: 'live in production' },
          { label: 'Avg Latency', value: '490 ms', sub: 'p50 across fleet' },
          { label: 'Total Tasks Today', value: '78,928', sub: 'since midnight UTC' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{s.label}</div>
            <div className="text-2xl font-light text-slate-900 mt-1">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-2 gap-4">
        {AGENTS.map((a, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(selected === i ? null as any : i)}
            className="rounded-xl border border-slate-100 bg-white p-5 cursor-pointer hover:shadow-lg hover:border-[#533afd]/20 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-semibold text-sm text-slate-800">{a.name}</div>
              <Badge label={a.status} variant={a.statusV} />
            </div>
            <div className="text-[11px] text-slate-400 font-mono mb-4">{a.model}</div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{a.desc}</p>
            <div className="grid grid-cols-4 gap-3 pt-3 border-t border-slate-50">
              {[
                { lbl: 'Throughput', val: a.throughput },
                { lbl: 'Avg Latency', val: a.latency },
                { lbl: 'Error Rate', val: a.errRate },
                { lbl: 'Uptime', val: a.uptime },
              ].map(m => (
                <div key={m.lbl}>
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">{m.lbl}</div>
                  <div className="text-sm font-medium text-slate-700 font-mono mt-0.5">{m.val}</div>
                </div>
              ))}
            </div>
            <AnimatePresence>
              {selected === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-3 border-t border-dashed border-slate-100 space-y-1 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[
                      { lbl: 'Total tasks run', val: a.tasks.toLocaleString() },
                      { lbl: 'Health score', val: a.health },
                    ].map(r => (
                      <div key={r.lbl} className="flex justify-between text-xs">
                        <span className="text-slate-400">{r.lbl}</span>
                        <span className="text-slate-700 font-mono font-medium">{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="text-[11px] text-[#533afd] border border-[#533afd]/30 px-3 py-1.5 rounded-lg hover:bg-[#533afd]/5 transition-colors font-semibold">Inspect Logs</button>
                    <button className="text-[11px] text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors font-semibold">Configure</button>
                    {a.status === 'Running' && (
                      <button className="text-[11px] text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-semibold ml-auto">Pause</button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Pipelines Tab ─────────────────────────────────────────────────────────────

const PIPELINES = [
  {
    name: 'Nightly Salesforce Sync',
    desc: 'Full object sync of Leads, Contacts, Opportunities from Salesforce CRM to Snowflake data warehouse.',
    schedule: 'Daily · 02:00 UTC',
    status: 'Success',
    statusV: 'green',
    time: '12s ago',
    progress: 100,
    duration: '4m 22s',
    rows: '1.84M',
    source: 'Salesforce',
    dest: 'Snowflake',
  },
  {
    name: 'Live Event Stream ETL',
    desc: 'Real-time Kafka consumer that enriches, deduplicates, and loads clickstream events into BigQuery.',
    schedule: 'Continuous',
    status: 'Running',
    statusV: 'blue',
    time: 'Live',
    progress: 45,
    duration: '—',
    rows: '4.2M today',
    source: 'Kafka',
    dest: 'BigQuery',
  },
  {
    name: 'Customer PII Masking',
    desc: 'Scans and masks PII in newly ingested datasets using LLM-driven entity recognition. GDPR-compliant.',
    schedule: 'On ingest trigger',
    status: 'Success',
    statusV: 'green',
    time: '4h ago',
    progress: 100,
    duration: '11m 05s',
    rows: '620K',
    source: 'Databricks',
    dest: 'Databricks',
  },
  {
    name: 'Legacy CRM → HubSpot Migration',
    desc: 'One-time historical backfill migrating 6.2M contact records with field mapping and dedup logic.',
    schedule: 'One-time · In progress',
    status: 'Running',
    statusV: 'blue',
    time: '8m left',
    progress: 64,
    duration: '—',
    rows: '3.97M / 6.2M',
    source: 'PostgreSQL',
    dest: 'HubSpot',
  },
  {
    name: 'Marketing Attribution Roll-up',
    desc: 'Joins ad-spend, UTM, and conversion data from 7 sources into a unified attribution model table.',
    schedule: 'Hourly',
    status: 'Success',
    statusV: 'green',
    time: '38m ago',
    progress: 100,
    duration: '1m 12s',
    rows: '212K',
    source: 'Multiple',
    dest: 'Snowflake',
  },
];

function PipelinesTab() {
  return (
    <motion.div {...tabMotion} className="space-y-5">
      <SectionHeader
        title="Data Pipelines"
        sub={`${PIPELINES.length} pipelines · ${PIPELINES.filter(p => p.status === 'Running').length} active`}
        action={
          <button className="bg-[#533afd] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#533afd]/90 transition-colors">
            + New Pipeline
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Pipelines', value: PIPELINES.length, sub: 'total configured' },
          { label: 'Rows Today', value: '9.2M', sub: 'across all pipelines' },
          { label: 'Success Rate', value: '99.4%', sub: 'last 7 days' },
          { label: 'Avg Duration', value: '5m 38s', sub: 'per successful run' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{s.label}</div>
            <div className="text-2xl font-light text-slate-900 mt-1">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Pipeline list */}
      <div className="space-y-3">
        {PIPELINES.map((p, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-white p-5 hover:shadow-md hover:border-[#533afd]/15 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm text-slate-800">{p.name}</span>
                  <span className="text-[11px] text-slate-400">{p.time}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge label={p.status} variant={p.statusV} />
                <span className="text-[10px] text-slate-400 font-mono">{p.schedule}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${p.status === 'Success' ? 'bg-emerald-400' : 'bg-[#533afd]'}`}
              />
            </div>
            {/* Meta row */}
            <div className="flex items-center gap-6 text-[11px]">
              <span className="text-slate-400">
                <span className="font-medium text-slate-600">{p.source}</span> → <span className="font-medium text-slate-600">{p.dest}</span>
              </span>
              <span className="text-slate-400">Rows: <span className="font-mono text-slate-600">{p.rows}</span></span>
              {p.duration !== '—' && (
                <span className="text-slate-400">Duration: <span className="font-mono text-slate-600">{p.duration}</span></span>
              )}
              <div className="ml-auto flex gap-2">
                <button className="text-[11px] text-slate-500 border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors font-semibold">History</button>
                <button className="text-[11px] text-[#533afd] border border-[#533afd]/25 px-2.5 py-1 rounded-lg hover:bg-[#533afd]/5 transition-colors font-semibold">Configure</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Datasets Tab ──────────────────────────────────────────────────────────────

const DATASETS = [
  { name: 'production_users', src: 'Snowflake', size: '12.4 GB', rows: '18.2M', sync: '2 mins ago', freshness: 'green', quality: 99 },
  { name: 'q3_sales_events', src: 'Databricks', size: '48.1 GB', rows: '312M', sync: '1 hr ago', freshness: 'green', quality: 97 },
  { name: 'marketing_leads', src: 'HubSpot', size: '1.2 GB', rows: '4.8M', sync: '5 mins ago', freshness: 'green', quality: 94 },
  { name: 'legacy_tickets', src: 'PostgreSQL', size: '840 MB', rows: '2.1M', sync: '12 hrs ago', freshness: 'amber', quality: 88 },
  { name: 'app_analytics_stream', src: 'Kafka', size: 'Live', rows: 'Stream', sync: 'Live', freshness: 'green', quality: 100 },
  { name: 'vendor_contracts_nlp', src: 'S3', size: '3.7 GB', rows: '42K', sync: '3 days ago', freshness: 'amber', quality: 91 },
  { name: 'hr_headcount_snapshot', src: 'Workday', size: '210 MB', rows: '6,200', sync: '8 hrs ago', freshness: 'green', quality: 99 },
];

function DatasetsTab() {
  return (
    <motion.div {...tabMotion} className="space-y-5">
      <SectionHeader
        title="Connected Datasets"
        sub={`${DATASETS.length} datasets · ${DATASETS.filter(d => d.freshness === 'green').length} healthy`}
        action={
          <button className="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">
            + Add Connection
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Storage', value: '66.5 GB', sub: 'across all sources' },
          { label: 'Sources', value: '7', sub: 'unique connectors' },
          { label: 'Avg Quality', value: '95.4', sub: 'data quality score' },
          { label: 'Live Streams', value: '1', sub: 'real-time datasets' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{s.label}</div>
            <div className="text-2xl font-light text-slate-900 mt-1">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-100 overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-5 py-3 font-semibold">Dataset</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Size</th>
              <th className="px-5 py-3 font-semibold">Rows</th>
              <th className="px-5 py-3 font-semibold">Last Sync</th>
              <th className="px-5 py-3 font-semibold">Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 bg-white">
            {DATASETS.map((d, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors group cursor-pointer">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.freshness === 'green' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className="font-mono text-xs text-slate-800">{d.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5"><span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-600 font-medium">{d.src}</span></td>
                <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{d.size}</td>
                <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{d.rows}</td>
                <td className="px-5 py-3.5 text-xs text-slate-400">{d.sync}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${d.quality >= 96 ? 'bg-emerald-400' : d.quality >= 90 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${d.quality}%` }} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{d.quality}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Audit Log Tab ─────────────────────────────────────────────────────────────

const LOGS = [
  { action: 'Deployed "Finance Reconciliation" agent to production', user: 'alice@aidetic.com', time: '10 mins ago', type: 'Deploy', typeV: 'purple' },
  { action: 'Updated API Keys and endpoint for Databricks connection', user: 'bob@aidetic.com', time: '1 hour ago', type: 'Config', typeV: 'blue' },
  { action: 'Scaled "Live Event Stream ETL" compute to 4 nodes', user: 'system', time: '3 hours ago', type: 'System', typeV: 'slate' },
  { action: 'Created new dataset "q3_sales_events" from Databricks', user: 'alice@aidetic.com', time: 'Yesterday', type: 'Data', typeV: 'green' },
  { action: 'Paused "Marketing Campaign Analyser" agent', user: 'carol@aidetic.com', time: '2 days ago', type: 'Agent', typeV: 'amber' },
  { action: 'Added Workday HR connector with read-only scope', user: 'bob@aidetic.com', time: '3 days ago', type: 'Config', typeV: 'blue' },
  { action: 'Ran full PII audit scan on "production_users" dataset', user: 'system', time: '4 days ago', type: 'System', typeV: 'slate' },
  { action: 'Invited 3 new workspace members (viewer role)', user: 'alice@aidetic.com', time: '5 days ago', type: 'Admin', typeV: 'red' },
];

function AuditLogTab() {
  const [filter, setFilter] = useState('All');
  const types = ['All', 'Deploy', 'Config', 'System', 'Data', 'Agent', 'Admin'];
  const filtered = filter === 'All' ? LOGS : LOGS.filter(l => l.type === filter);

  return (
    <motion.div {...tabMotion} className="space-y-5">
      <SectionHeader
        title="Audit Log"
        sub="Full history of workspace events, config changes, and deployments"
      />

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-[11px] px-3 py-1.5 rounded-full font-semibold border transition-all ${filter === t
                ? 'bg-[#533afd] text-white border-[#533afd]'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-100" />

        <div className="space-y-0">
          <AnimatePresence mode="sync">
            {filtered.map((log, i) => (
              <motion.div
                key={log.action}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15, delay: i * 0.04 }}
                className="relative group py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-colors"
              >
                {/* Dot */}
                <div className="absolute -left-[29px] top-[22px] w-2.5 h-2.5 rounded-full bg-[#533afd] ring-4 ring-white group-hover:scale-125 transition-transform" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-800">{log.action}</span>
                      <Badge label={log.type} variant={log.typeV} />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      by <span className="font-mono text-slate-500">{log.user}</span>
                      <span className="mx-1.5">·</span>
                      {log.time}
                    </div>
                  </div>
                  <button className="text-[11px] text-slate-400 hover:text-[#533afd] px-2 py-1 rounded shrink-0 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-[#533afd]/20 font-semibold">
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Root Dashboard ────────────────────────────────────────────────────────────

export function DashboardMock() {
  const [activeTab, setActiveTab] = useState('Overview');

  const workspaceTabs = ['Overview', 'Agents', 'Pipelines', 'Datasets', 'Audit log'];
  const productTabs = [
    { label: 'Agent Factory', color: 'bg-[#533afd]' },
    { label: 'Data Flash', color: 'bg-[#8278E6]' },
  ];

  return (
    <div className="relative w-full mx-auto group">
      <div className="absolute left-[8%] right-[8%] -bottom-10 h-20 bg-[radial-gradient(ellipse_at_center,rgba(83,58,253,0.18)_0%,rgba(83,58,253,0)_70%)] -z-10 blur-[20px]" />

      <motion.div 
        className="flex flex-col w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.06)] border border-slate-200 h-[850px] relative"
      >
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1e54] z-30 shrink-0">
          <div className="flex gap-1.5">
            {['bg-[#ea2261]', 'bg-[#f5e9d4]', 'bg-[#665efd]'].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <div className="flex-1 text-center">
            <span className="text-white/60 text-[11px] font-medium tracking-wider font-mono bg-white/5 px-3 py-1 rounded-full">
              aidetic · enterprise overview · production
            </span>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[200px] bg-slate-50/50 border-r border-slate-100 p-5 flex flex-col shrink-0">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 pl-2">Workspace</div>
            <div className="space-y-0.5">
              {workspaceTabs.map(label => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${activeTab === label
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-medium'
                      : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8 text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 pl-2">Products</div>
            <div className="space-y-0.5">
              {productTabs.map(it => (
                <button
                  key={it.label}
                  onClick={() => setActiveTab(it.label)}
                  className={`flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${activeTab === it.label
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-medium'
                      : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-800'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${it.color}`} />
                  {it.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main scrollable area */}
          <div className="flex-1 bg-white overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'Overview' && <OverviewTab key="overview" />}
              {activeTab === 'Agents' && <AgentsTab key="agents" />}
              {activeTab === 'Pipelines' && <PipelinesTab key="pipelines" />}
              {activeTab === 'Datasets' && <DatasetsTab key="datasets" />}
              {activeTab === 'Audit log' && <AuditLogTab key="auditlog" />}
              {activeTab === 'Agent Factory' && <OverviewTab key="af" />}
              {activeTab === 'Data Flash' && <OverviewTab key="df" />}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}