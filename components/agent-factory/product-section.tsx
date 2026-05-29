'use client'

import { motion } from 'framer-motion'
import { Clock, LayoutDashboard, Inbox } from 'lucide-react'

const pillars = [
  {
    icon: Clock,
    number: '01',
    title: 'Stakeholders Wait Up to 2 Weeks for Data Insights.',
    description:
      'Heavy reliance on analytics teams creates bottlenecks, slowing down access to the data needed for timely and informed decision-making.',
  },
  {
    icon: LayoutDashboard,
    number: '02',
    title: "Just Dashboards aren't Enough for Actionable Insights",
    description:
      'Most dashboards are static, offering only BAU metrics for health checks. They rarely empower stakeholders to extract meaningful insights for strategic decision-making.',
  },
  {
    icon: Inbox,
    number: '03',
    title: 'Data Analysts Stuck in a Sea of Ad-Hoc Requests',
    description:
      'Flooded with low-impact requests, analysts spend their time handling routine tasks, leaving little room for high-value strategic analysis.',
  },
]

export function ProductSection() {
  return (
    <section className="relative overflow-hidden bg-white py-28 px-6">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Eyebrow + Headline ── */}
        <motion.div
          className="text-center mb-20 space-y-5"
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
            Businesses are Rich in Data
            <br className="hidden md:block" />
            but Poor in Insights
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Data-driven decision-making remains a challenge, even with millions of dollars spent on analytics.
          </p>
        </motion.div>

        {/* ── Three Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                  boxShadow: '0 20px 48px -8px rgba(6,182,212,0.28), 0 8px 24px -4px rgba(37,99,235,0.18)',
                }}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Hover gradient fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/70 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-2xl" />

                {/* Top accent bar — thicker, always visible at low opacity, full on hover */}
                <div
                  className="absolute top-0 left-0 w-full h-[3px] opacity-20 group-hover:opacity-100 transition-all duration-350"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #2563eb)' }}
                />

                {/* Left accent side line on hover */}
                <div
                  className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-500 ease-out rounded-bl-2xl"
                  style={{ background: 'linear-gradient(to bottom, #06b6d4, #2563eb)' }}
                />

                <div className="relative z-10 space-y-5">
                  {/* Icon + Number row */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #dbeafe 100%)' }}
                      whileHover={{ scale: 1.12, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Icon className="w-5 h-5 text-cyan-600" strokeWidth={1.8} />
                    </motion.div>
                    <span
                      className="text-4xl font-black text-slate-100 select-none group-hover:text-cyan-200 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {p.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold text-slate-800 leading-snug tracking-wide group-hover:text-slate-900 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {p.title}
                  </h3>

                  {/* Divider — expands on hover */}
                  <div className="h-px bg-gradient-to-r from-cyan-400 to-blue-400 w-10 group-hover:w-20 transition-all duration-400 ease-out" />

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-200">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
    </section>
  )
}
