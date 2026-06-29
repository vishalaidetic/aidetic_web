'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookCallDialog } from '@/components/shared/book-call-dialog'

export function CtaSection({ content }: { content?: any }) {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white flex items-center justify-center w-full">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] px-8 py-16 md:px-16 md:py-20 shadow-xl"
          style={{
            background: 'linear-gradient(to right, #fcf2e3 0%, #fde2f3 40%, #e6e2fd 100%)'
          }}
        >
          {/* Subtle overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Left Content */}
            <div className="flex-1 text-left space-y-6">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #DC2626, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {content?.heading}
              </h2>
              <p
                className="text-lg text-[#64748d] leading-relaxed max-w-xl"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {content?.subheading}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <BookCallDialog>
                <button
                  className="px-8 py-3.5 rounded-full bg-[#DC2626] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.cta_primary}
                </button>
              </BookCallDialog>
              <Link href="/case-studies">
                <button
                  className="px-8 py-3.5 rounded-full bg-white text-[#DC2626] font-medium border border-[#DC2626]/30 shadow-sm hover:border-[#DC2626] hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.cta_secondary}
                </button>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
