'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ChevronRight } from 'lucide-react'
import { BookCallDialog } from '@/components/shared/book-call-dialog'
import Link from 'next/link'

const homeFaqs = [
  {
    q: 'How does Aidetic differ from an AI consultancy?',
    a: 'Most consultancies leave you with slides and a pilot. We leave you with running software — Agent Factory and Data Flash — plus the integration work to make them yours. Fixed scope, fixed timeline, working systems.',
  },
  {
    q: 'Can our data stay inside our VPC / cloud?',
    a: 'Yes. Both products deploy inside your perimeter — AWS, Azure, GCP or on-prem. Models can be hosted by us, by you, or routed to your private endpoint. Data never leaves your account.',
  },
  {
    q: 'Which LLMs and warehouses do you support?',
    a: 'OpenAI, Anthropic, Google, Mistral, plus self-hosted open-source. Snowflake, Databricks, BigQuery, Redshift, Postgres, MongoDB, S3 and 50+ SaaS sources via connectors.',
  },
  {
    q: 'How long until something is in production?',
    a: 'A scoped use case is in production in 4–8 weeks. The first agent or pipeline is usually live in a sandbox by week two — we work in two-week increments with weekly demos.',
  },
  {
    q: 'Do you handle compliance — SOC 2, HIPAA, GDPR?',
    a: 'Aidetic is SOC 2 Type II. Both products include audit logs, role-based access, PII redaction and data-residency controls. HIPAA and GDPR-aligned deployments are standard.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'A two-week discovery to map the highest-leverage use case, then 6–10 weeks to deliver a production rollout. We bring product engineers and ML engineers — no offshored body shop.',
  },
]

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section className="relative w-full bg-white py-24 px-6 snap-start min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ── Left Column: Header & CTA ── */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#533afd]/10 text-[#533afd] text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                FAQ
              </div>
              <h2
                className="text-[2.25rem] sm:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.15] tracking-tight"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Common questions from data leaders.
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.15 }} 
              viewport={{ once: true }}
            >
              <p className="text-lg text-[#64748d] leading-relaxed max-w-md" style={{ fontFamily: "var(--font-quicksand)" }}>
                Architecture, security, timelines — the questions we get on every first call.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              viewport={{ once: true }}
            >
              <BookCallDialog>
                <button
                  id="hero-cta-demo"
                  className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Request a Call
                </button>
              </BookCallDialog>
            </motion.div>
          </div>

          {/* ── Right Column: FAQ Accordion ── */}
          <div className="lg:col-span-7">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {homeFaqs.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <motion.div
                    key={i}
                    className="rounded-xl border overflow-hidden bg-white"
                    style={{
                      borderColor: '#533afd',
                      boxShadow: isOpen
                        ? '0 8px 32px -4px rgba(83,58,253,0.12)'
                        : '0 2px 8px -2px rgba(83,58,253,0.05)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <button
                      id={`home-faq-item-${i + 1}`}
                      onClick={() => toggle(i)}
                      className="w-full flex items-start gap-4 px-6 py-5 text-left transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      {/* Icon */}
                      <motion.div
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#533afd]"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isOpen ? (
                          <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        ) : (
                          <X className="w-3.5 h-3.5 text-white rotate-45" strokeWidth={3} />
                        )}
                      </motion.div>

                      {/* Question Text */}
                      <span
                        className="text-[17px] font-medium leading-snug flex-1 pt-0.5"
                        style={{
                          color: '#0d253d',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {faq.q}
                      </span>
                    </button>

                    {/* Answer panel */}
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
                          <div className="px-6 pb-6 pl-16">
                            <p
                              className="text-[15px] text-[#64748d] leading-relaxed"
                              style={{ fontFamily: 'var(--font-quicksand)' }}
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

        </div>
      </div>
    </section>
  )
}
