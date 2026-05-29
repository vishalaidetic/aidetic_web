'use client'

import { motion } from 'framer-motion'
import { FileText, Zap, Grid3x3, Smartphone, Brain, Database } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Semantic Layer',
    description: 'Pre-defined business logic ensures consistent, governed definitions across all queries.',
  },
  {
    icon: Zap,
    title: 'Search Tokens',
    description: 'Converts natural language to verifiable tokens, helping users validate the underlying logic.',
  },
  {
    icon: Grid3x3,
    title: 'Agent Connectors',
    description: 'Integrates with Claude, Gemini, and Cursor; embeds governed analytics into any workflow.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Support',
    description: 'Full Agent Factory capabilities on mobile devices for secure, on-the-go analysis.',
  },
  {
    icon: Brain,
    title: 'Your Choice Of LLM',
    description: 'Supports your approved LLMs to maintain governance, security, and operational control.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Integrates with your current analytics stack while preserving governance and control.',
  },
]

export function ScaleSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#f0f8ff] via-white to-[#eaf5fd] py-24 px-6 overflow-hidden">

      {/* ── Half-bubble blob — RIGHT ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          right: '-28%',
          transform: 'translateY(-50%)',
          width: '55vw',
          height: '55vw',
          maxWidth: '680px',
          maxHeight: '680px',
          background: '#cce9f8',
          borderRadius: '50%',
          opacity: 0.48,
          filter: 'blur(2px)',
        }}
      />

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
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #06b6d4, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Scale With Confidence
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade capabilities that ensure accuracy, governance, and seamless
            integration across your analytics ecosystem.
          </p>
        </motion.div>

        {/* ── Features grid ── */}
        <motion.div
          className="border-2 border-cyan-300 rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm shadow-sm shadow-cyan-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cyan-200/60">
            {features.slice(0, 3).map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  className="p-8 space-y-4 hover:bg-cyan-50/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200">
                    <Icon className="w-5 h-5 text-cyan-600" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-900 tracking-wide"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Horizontal divider between rows */}
          <div className="border-t-2 border-cyan-200/60" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cyan-200/60">
            {features.slice(3).map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  className="p-8 space-y-4 hover:bg-cyan-50/40 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200">
                    <Icon className="w-5 h-5 text-cyan-600" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-900 tracking-wide"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
