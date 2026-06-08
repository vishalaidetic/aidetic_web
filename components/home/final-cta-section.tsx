'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookCallDialog } from '@/components/shared/book-call-dialog'

export function FinalCtaSection() {
  return (
    <section className="snap-start py-24 px-4 sm:px-6 bg-white flex items-center justify-center w-full min-h-[60vh]">
      <div className="w-full max-w-7xl mx-auto">
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
          {/* Background Gradient & Effects overlay if needed */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="flex-1 text-left space-y-6">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ready to put AI to work —<br/>for real?
              </h2>
              <p 
                className="text-lg md:text-xl text-[#64748d] leading-relaxed max-w-xl" 
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                Tell us about the use case. We'll come back in 48 hours with a scoped plan, a fixed timeline and a working demo two weeks in.
              </p>
            </div>

            {/* Right Content / Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <BookCallDialog>
                <button
                  className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Request a Call
                </button>
              </BookCallDialog>
              <Link href="/case-studies">
                <button
                  className="px-8 py-3.5 rounded-full bg-white text-[#533afd] font-medium border border-[#533afd]/30 shadow-sm hover:border-[#533afd] hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  See case studies
                </button>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
