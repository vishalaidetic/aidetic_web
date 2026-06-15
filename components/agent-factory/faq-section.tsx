'use client'

import { BookCallDialog } from '@/components/shared/book-call-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

export function FaqSection({ content }: { content?: any }) {
  const faqs = content?.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section className="relative w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
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
                {content?.heading}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-[#64748d] leading-relaxed max-w-md" style={{ fontFamily: "var(--font-quicksand)" }}>
                {content?.subheading}
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
                  id="agent-factory-faq-cta"
                  className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.cta}
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
              {faqs.map((faq: any, i: any) => {
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
                      id={`faq-item-${i + 1}`}
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
                        {faq.question}
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
                              {faq.answer}
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
