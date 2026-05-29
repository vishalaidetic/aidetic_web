'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-24 px-6 bg-[#f6f9fc] flex justify-center">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-[#533afd]/20 bg-white px-8 py-16 md:px-16 md:py-20 text-center shadow-2xl shadow-[#533afd]/10"
        >
          {/* Background Gradient & Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Glow */}
            <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-[#533afd]/10 to-transparent opacity-80" />
            
            {/* Right Dot Pattern */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-full opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #533afd 1px, transparent 0)',
                backgroundSize: '24px 24px',
                maskImage: 'linear-gradient(to left, black, transparent)',
                WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
              }}
            />
            
            {/* Subtle curves */}
            <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-50" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d253d] leading-tight max-w-4xl tracking-tight" 
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span 
                style={{
                  background: 'linear-gradient(to right, #533afd, #ea2261)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                It's not 2016 anymore.
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl mt-2 block text-[#0d253d]">
                You shouldn't need a week, a dashboard, or a data team to make one decision.
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href="/demo"
                className="px-8 py-3.5 rounded-xl bg-[#533afd] text-white font-bold shadow-lg shadow-[#533afd]/20 hover:bg-[#4434d4] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Book a Demo
              </Link>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
