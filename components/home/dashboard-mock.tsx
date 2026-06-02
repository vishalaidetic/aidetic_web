"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardMock() {
  const [activeTab, setActiveTab] = useState('Overview');

  const workspaceTabs = ['Overview', 'Agents', 'Pipelines', 'Datasets', 'Audit log'];
  const productTabs = [
    { label: 'Agent Factory', color: 'bg-[#533afd]' },
    { label: 'Data Flash', color: 'bg-[#8278E6]' }, 
  ];

  return (
    <div className="relative w-full mx-auto group">
      {/* Soft floor shadow */}
      <div className="absolute left-[8%] right-[8%] -bottom-10 h-20 bg-[radial-gradient(ellipse_at_center,rgba(83,58,253,0.18)_0%,rgba(83,58,253,0)_70%)] -z-10 blur-[20px] transition-all duration-700 group-hover:opacity-80"></div>
      
      <div className="flex flex-col w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.05)] border border-slate-200 h-[850px] relative transition-transform duration-500 hover:scale-[1.01] hover:shadow-[0_16px_48px_-12px_rgba(83,58,253,0.15)]">
        {/* Dark top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1e54] z-30 relative shrink-0">
          <div className="flex gap-1.5">
            {['bg-[#ea2261]', 'bg-[#f5e9d4]', 'bg-[#665efd]'].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <div className="flex-1 text-center flex items-center justify-center">
            <span className="text-white/60 text-[11px] font-medium tracking-wider font-mono bg-white/5 px-3 py-1 rounded-full">aidetic · enterprise overview · production</span>
          </div>
          <div className="w-10"></div> {/* spacer for balance */}
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-[200px] bg-slate-50/50 border-r border-slate-100 p-5 flex flex-col shrink-0">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3 pl-2">Workspace</div>
            <div className="space-y-1">
              {workspaceTabs.map(label => (
                <button 
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === label 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-medium' 
                      : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8 text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3 pl-2">Products</div>
            <div className="space-y-1">
              {productTabs.map(it => (
                <button 
                  key={it.label} 
                  onClick={() => setActiveTab(it.label)}
                  className={`flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === it.label
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-medium' 
                      : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${it.color}`}></span>
                  {it.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 bg-white relative p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'Overview' && <OverviewTab key="overview" />}
              {activeTab === 'Agents' && <AgentsTab key="agents" />}
              {activeTab === 'Pipelines' && <PipelinesTab key="pipelines" />}
              {activeTab === 'Datasets' && <DatasetsTab key="datasets" />}
              {activeTab === 'Audit log' && <AuditLogTab key="auditlog" />}
              {activeTab === 'Agent Factory' && <OverviewTab key="agent-factory" />}
              {activeTab === 'Data Flash' && <OverviewTab key="data-flash" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active agents', value: '1,847', delta: '+12 this week', color: 'text-[#533afd]', change: 'text-emerald-500' },
          { label: 'Queries / day', value: '23,512', delta: '99.8% success', color: 'text-slate-900', change: 'text-emerald-500' },
          { label: 'Rows migrated', value: '4.2B', delta: 'Lifetime', color: 'text-slate-900', change: 'text-slate-400' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-lg hover:border-[#533afd]/20 transition-all duration-300 cursor-default group/stat">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{s.label}</div>
            <div className={`text-3xl font-light tracking-tight mt-2 ${s.color}`} style={{ fontFamily: 'var(--font-inter)' }}>{s.value}</div>
            <div className={`text-xs mt-1 flex items-center gap-1 ${s.change}`}>
              {s.change.includes('emerald') && <span className="group-hover/stat:translate-y-[-2px] transition-transform">↗</span>} {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-5 mb-6 hover:shadow-lg hover:border-[#533afd]/20 transition-all duration-300 group/chart relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#533afd]/[0.02] to-transparent opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex justify-between items-start mb-4">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Agent activity · last 30 days</div>
            <div className="text-2xl font-light tracking-tight mt-1 flex items-baseline gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
              <span className="text-slate-900">705,348</span>
              <span className="text-xs font-medium text-[#533afd] bg-[#533afd]/10 px-2 py-0.5 rounded-full">+14.2%</span>
            </div>
          </div>
          <div className="flex gap-4 items-center text-xs text-slate-500">
            <span className="flex items-center gap-1.5 hover:text-slate-700 cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#533afd]"></span>Agent queries</span>
            <span className="flex items-center gap-1.5 hover:text-slate-700 cursor-pointer"><span className="w-2 h-2 rounded-full bg-[#8278E6]"></span>Migrations</span>
          </div>
        </div>
        <div className="relative z-10 w-full h-[140px]">
          <svg viewBox="0 0 800 160" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" x2="800" y1={i * 40} y2={i * 40} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            <path d="M0,110 L40,95 L80,100 L120,80 L160,90 L200,70 L240,75 L280,60 L320,55 L360,65 L400,40 L440,50 L480,30 L520,35 L560,42 L600,22 L640,30 L680,18 L720,25 L760,14 L800,20"
              stroke="#533afd" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round" className="group-hover/chart:stroke-[3px] group-hover/chart:drop-shadow-[0_4px_8px_rgba(83,58,253,0.3)] transition-all duration-500" />
            <path d="M0,110 L40,95 L80,100 L120,80 L160,90 L200,70 L240,75 L280,60 L320,55 L360,65 L400,40 L440,50 L480,30 L520,35 L560,42 L600,22 L640,30 L680,18 L720,25 L760,14 L800,20 L800,160 L0,160 Z"
              fill="url(#chartGradient)" opacity="0.3" className="group-hover/chart:opacity-50 transition-opacity duration-500" />
            <path d="M0,135 L40,128 L80,132 L120,120 L160,128 L200,118 L240,122 L280,110 L320,108 L360,115 L400,95 L440,105 L480,85 L520,92 L560,98 L600,80 L640,85 L680,72 L720,80 L760,68 L800,75"
              stroke="#8278E6" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" className="group-hover/chart:opacity-100 transition-opacity duration-500" />
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#533afd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#533afd" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-lg hover:border-[#533afd]/20 transition-all duration-300">
        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-3">Recent activity</div>
        <div className="space-y-1">
          {[
            { name: 'Finance · close-the-books agent', tag: 'OK', tagColor: 'bg-[#533afd]/10 text-[#533afd]', val: '47 queries' },
            { name: 'Salesforce → Snowflake · daily', tag: 'OK', tagColor: 'bg-[#533afd]/10 text-[#533afd]', val: '2.1M rows' },
            { name: 'Marketing · campaign analyst', tag: 'OK', tagColor: 'bg-[#533afd]/10 text-[#533afd]', val: '128 queries' },
            { name: 'Legacy CRM → HubSpot · backfill', tag: 'RUN', tagColor: 'bg-[#8278E6]/10 text-[#8278E6]', val: '64% · 8m left' },
          ].map((r, i) => (
            <div key={i} className="group/row flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.tagColor}`}>{r.tag}</div>
                <span className="text-sm text-slate-700 font-medium group-hover/row:text-[#533afd] transition-colors">{r.name}</span>
              </div>
              <span className="text-xs text-slate-500 font-mono group-hover/row:text-slate-900 transition-colors">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AgentsTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>Active Agents</h2>
        <button className="bg-[#533afd] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#533afd]/90 transition-colors">Deploy New Agent</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Finance Reconciliation', status: 'Running', queries: '1,452/hr', health: '99.9%' },
          { name: 'Customer Support QA', status: 'Running', queries: '8,124/hr', health: '98.5%' },
          { name: 'Marketing Campaign Analyser', status: 'Idle', queries: '0/hr', health: '-' },
          { name: 'Sales Data Scraper', status: 'Running', queries: '342/hr', health: '100%' }
        ].map((a, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-5 hover:shadow-lg hover:border-[#533afd]/30 transition-all duration-300">
             <div className="flex justify-between items-start mb-4">
               <div className="font-semibold text-sm text-slate-700">{a.name}</div>
               <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${a.status === 'Running' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{a.status}</div>
             </div>
             <div className="flex gap-8 mt-2">
               <div>
                 <div className="text-[10px] text-slate-400 uppercase font-semibold">Throughput</div>
                 <div className="text-base font-light text-slate-800 mt-1 font-mono">{a.queries}</div>
               </div>
               <div>
                 <div className="text-[10px] text-slate-400 uppercase font-semibold">Health</div>
                 <div className="text-base font-light text-slate-800 mt-1 font-mono">{a.health}</div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DatasetsTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>Connected Datasets</h2>
        <button className="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50 transition-colors">Add Connection</button>
      </div>
      <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Dataset Name</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Size</th>
              <th className="px-5 py-3 font-semibold">Last Sync</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {[
              { name: 'production_users', src: 'Snowflake', size: '12.4 GB', sync: '2 mins ago' },
              { name: 'q3_sales_events', src: 'Databricks', size: '48.1 GB', sync: '1 hr ago' },
              { name: 'marketing_leads', src: 'HubSpot', size: '1.2 GB', sync: '5 mins ago' },
              { name: 'legacy_tickets', src: 'PostgreSQL', size: '840 MB', sync: '12 hrs ago' },
              { name: 'app_analytics_stream', src: 'Kafka', size: 'Streaming', sync: 'Live' }
            ].map((d, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-medium">{d.name}</td>
                <td className="px-5 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-[11px] text-slate-600 font-medium">{d.src}</span></td>
                <td className="px-5 py-4 text-slate-500 font-mono text-xs">{d.size}</td>
                <td className="px-5 py-4 text-slate-500 text-xs">{d.sync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function PipelinesTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>Data Pipelines</h2>
        <button className="bg-[#533afd] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#533afd]/90 transition-colors">New Pipeline</button>
      </div>
      <div className="space-y-4">
        {[
          { name: 'Nightly Salesforce Sync', progress: 100, status: 'Success', time: '12s ago' },
          { name: 'Live Event Stream ETL', progress: 45, status: 'Running', time: 'Live' },
          { name: 'Customer PII Masking', progress: 100, status: 'Success', time: '4h ago' },
        ].map((p, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between mb-4">
               <div className="flex items-center gap-3">
                 <span className="font-semibold text-sm text-slate-700">{p.name}</span>
                 <span className="text-xs text-slate-400">{p.time}</span>
               </div>
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 'bg-[#533afd]/10 text-[#533afd]'}`}>{p.status}</span>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${p.progress}%` }} 
                 transition={{ duration: 1, ease: 'easeOut' }}
                 className={`h-full rounded-full ${p.status === 'Success' ? 'bg-emerald-400' : 'bg-[#533afd]'}`}
               />
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AuditLogTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>Audit Log</h2>
      </div>
      <div className="border-l-2 border-slate-100 pl-6 space-y-8 ml-2 mt-4">
        {[
          { action: 'Deployed "Finance Reconciliation" agent', user: 'alice@aidetic.com', time: '10 mins ago', type: 'Deploy' },
          { action: 'Updated API Keys for Databricks connection', user: 'bob@aidetic.com', time: '1 hour ago', type: 'Config' },
          { action: 'Scaled "Live Event Stream ETL" compute to 4 nodes', user: 'system', time: '3 hours ago', type: 'System' },
          { action: 'Created new dataset "q3_sales_events"', user: 'alice@aidetic.com', time: 'Yesterday', type: 'Data' }
        ].map((log, i) => (
          <div key={i} className="relative group">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#533afd] ring-4 ring-white group-hover:scale-125 transition-transform" />
            <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
              {log.action}
              <span className="text-[9px] uppercase tracking-wider text-[#533afd] bg-[#533afd]/10 px-1.5 py-0.5 rounded font-bold">{log.type}</span>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">by <span className="font-mono text-slate-600">{log.user}</span> • {log.time}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
