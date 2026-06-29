'use client'

import { motion } from 'framer-motion'
import { Clock, Inbox, LayoutDashboard } from 'lucide-react'

const pillars = [
  {
    icon: Clock,
  },
  {
    icon: Inbox,
  },
  {
    icon: LayoutDashboard,
  }
]

export function ProductSection({ content }: { content?: any }) {
  return (
    <section className="relative overflow-hidden bg-white py-28 px-6">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DC2626]/60 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-2">

        {/* ── Eyebrow + Headline ── */}
        <motion.div
          className="text-center mb-20 space-y-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2
            className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15]"
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
          <p className="text-base md:text-lg text-[#1B2340] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-quicksand)' }}>
            {content?.subheading}
          </p>
        </motion.div>

        {/* ── Three Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease',
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 48px -8px rgba(220,38,38,0.28), 0 8px 24px -4px rgba(220,38,38,0.18)',
                }}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Hover gradient fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f6f9fc]/70 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-2xl" />

                {/* Top accent bar — thicker, always visible at low opacity, full on hover */}
                <div
                  className="absolute top-0 left-0 w-full h-[3px] opacity-20 group-hover:opacity-100 transition-all duration-350"
                  style={{ background: 'linear-gradient(to right, #DC2626, #DC2626)' }}
                />

                {/* Left accent side line on hover */}
                <div
                  className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-500 ease-out rounded-bl-2xl"
                  style={{ background: 'linear-gradient(to bottom, #DC2626, #DC2626)' }}
                />

                <div className="relative z-10 space-y-5">
                  {/* Icon + Number row */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #f6f9fc 0%, #f5e9d4 100%)' }}
                      whileHover={{ scale: 1.12, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Icon className="w-5 h-5 text-[#DC2626]" strokeWidth={1.8} />
                    </motion.div>
                    <span
                      className="text-4xl font-black text-slate-100 select-none group-hover:text-[#DC2626] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {content?.items?.[i]?.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg md:text-xl font-bold text-[#1B2340] mb-4 leading-snug group-hover:text-[#DC2626] transition-colors"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {content?.items?.[i]?.title}
                  </h3>

                  {/* Divider — expands on hover */}
                  <div className="h-px bg-gradient-to-r from-[#DC2626] to-[#DC2626] w-10 group-hover:w-20 transition-all duration-400 ease-out" />

                  {/* Description */}
                  <p
                    className="text-sm md:text-[15px] text-[#64748d] leading-relaxed relative z-10"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {content?.items?.[i]?.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DC2626]/60 to-transparent" />
    </section>
  )
}
