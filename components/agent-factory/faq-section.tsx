'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Is Agent Factory a SaaS product?',
    a: 'No. It\'s a productized service. Our engineers deploy and configure it on your data stack, tuned to your business. You get the speed of a product with the precision of a custom build.',
  },
  {
    q: 'What data stack does it work with?',
    a: 'Databricks, Snowflake, or any cloud data warehouse you already run. Agent Factory sits on top of your existing infrastructure — nothing to migrate, nothing to replace.',
  },
  {
    q: 'How long does it take to go live?',
    a: '2 to 4 weeks from kickoff. Week one is discovery — mapping your data, KPIs, and business questions. By week four, your first agents are live in production.',
  },
  {
    q: 'Who uses it day to day?',
    a: 'Business leaders — CMOs, CFOs, VPs of Sales, operations heads. Not your data team. The whole point is that the people making decisions can get to the data themselves, without writing SQL or opening a dashboard.',
  },
  {
    q: 'How is this different from a BI tool?',
    a: 'BI tools give you dashboards. Agent Factory gives you answers. You ask a question in plain English, and a domain-tuned agent responds with the insight — a chart, a breakdown, a recommendation. No filters, no drag-and-drop, no waiting.',
  },
  {
    q: 'What about data security?',
    a: 'Your data stays in your warehouse. Agent Factory doesn\'t move it, copy it, or store it. Your existing governance and access controls stay exactly as they are.',
  },
  {
    q: 'What happens after go-live?',
    a: 'Our engineering team continuously tunes your agents — new KPIs, updated business rules, changing data models. You don\'t maintain it. We do.',
  },
  {
    q: 'How is this different from ChatGPT or a generic AI assistant?',
    a: 'Generic AI tools don\'t know your data, your KPIs, or your business context. Agent Factory deploys domain-specific agents trained on your actual data stack. The difference is the same as asking a stranger for advice versus asking an analyst who\'s worked at your company for two years.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section className="relative w-full bg-white py-24 px-6 overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(83,58,253,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(83,58,253,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#533afd]/60 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-14 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Eyebrow */}
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-2"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #ea2261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Got Questions?
          </span>

          <h2
            className="text-3xl sm:text-4xl xl:text-[2.5rem] font-bold leading-tight text-[#0d253d]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-[#64748d] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Agent Factory before you get started.
          </p>
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                className="rounded-2xl border overflow-hidden"
                style={{
                  borderColor: isOpen ? 'rgba(83,58,253,0.45)' : 'rgba(226,232,240,0.9)',
                  boxShadow: isOpen
                    ? '0 8px 32px -4px rgba(83,58,253,0.18), 0 2px 8px 0 rgba(0,0,0,0.04)'
                    : '0 1px 4px 0 rgba(0,0,0,0.04)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* ── Question row ── */}
                <button
                  id={`faq-item-${i + 1}`}
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                  style={{
                    background: isOpen
                      ? 'linear-gradient(135deg, #f6f9fc 0%, #f6f9fc 100%)'
                      : 'white',
                    fontFamily: 'var(--font-inter)',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-semibold leading-snug transition-colors duration-200"
                    style={{
                      color: isOpen ? '#533afd' : '#1e293b',
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* +/- icon */}
                  <motion.div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #533afd, #ea2261)'
                        : 'transparent',
                      border: isOpen ? 'none' : '1.5px solid #cbd5e1',
                    }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#64748d]" strokeWidth={2.5} />
                    )}
                  </motion.div>
                </button>

                {/* ── Answer panel ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      {/* Thin gradient divider */}
                      <div
                        className="w-full h-px"
                        style={{ background: 'linear-gradient(to right, #533afd 0%, #ea2261 100%)', opacity: 0.25 }}
                      />
                      <div
                        className="px-6 py-5"
                        style={{
                          background: 'linear-gradient(135deg, #f6f9fc 0%, #f6f9fc 100%)',
                        }}
                      >
                        <p
                          className="text-sm md:text-base text-[#64748d] leading-relaxed"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#533afd]/60 to-transparent" />
    </section>
  )
}
