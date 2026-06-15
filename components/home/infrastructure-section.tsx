'use client'
import { motion } from "framer-motion";
import { Activity, Bot, Layers, Plug, ShieldCheck, Zap } from "lucide-react";


export function InfrastructureSection({ content }: { content?: any }) {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#f6f9fc] snap-start via-white to-[#eaf5fd] py-24 px-6 overflow-hidden border-t border-slate-200">

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2
            className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] max-w-3xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built like infrastructure.<br className="hidden sm:block" /> Shipped like software.
          </h2>
          <h3
            className="text-[#0d253d] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Reliable, observable, deployable. Everything we ship inherits the same opinions about data, evals and security.
          </h3>
        </motion.div>

        {/* ── Features grid ── */}
        <motion.div
          className="border border-slate-200 rounded-[2rem] bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              {
                icon: Bot,
                title: 'Built on your data',
                description: 'Agents and pipelines live inside your warehouse. Your data never leaves your perimeter.',
              },
              {
                icon: ShieldCheck,
                title: 'Audit-ready by default',
                description: 'Every answer cites its sources. Every migration is validated, versioned and rollback-safe.',
              },
              {
                icon: Zap,
                title: 'Days, not quarters',
                description: 'A working agent or pipeline in days. Production rollout in weeks. No 9-month roadmaps.',
              },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  className="p-10 space-y-5 transition-colors duration-300 relative bg-white hover:bg-slate-50/50 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#533afd]" strokeWidth={2} />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className="text-lg font-semibold text-[#0d253d] tracking-wide"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>{f.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Horizontal divider between rows */}
          <div className="border-t border-slate-100" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              {
                icon: Plug,
                title: '60+ connectors',
                description: 'Salesforce, SAP, Snowflake, BigQuery, Postgres, Mongo, Excel — we already speak it.',
              },
              {
                icon: Activity,
                title: 'Observable, always',
                description: 'Live dashboards for every agent and migration. Set SLAs. Get pinged before users do.',
              },
              {
                icon: Layers,
                title: 'Bring your own model',
                description: 'OpenAI, Anthropic, open-source, your private endpoint — we run on whatever you trust.',
              },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i + 3}
                  className="p-10 space-y-5 transition-colors duration-300 relative bg-white hover:bg-slate-50/50 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#533afd]" strokeWidth={2} />
                  </div>
                  <div className="space-y-2">
                    <h3
                      className="text-lg font-semibold text-[#0d253d] tracking-wide"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>{f.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
