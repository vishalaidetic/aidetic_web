'use client'

import { motion } from 'framer-motion'
import { BarChart2, ShieldCheck, Zap } from 'lucide-react'

const getResources = (content: any) => {
  const items = content?.items || [];
  return [
    {
      type: items[0]?.type,
      title: items[0]?.title,
      visual: (
        <div className="w-full h-full bg-gradient-to-br from-[#f6f9fc] to-[#f5e9d4] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-slate-900/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-900 rounded-sm"></div>
            </div>
            <span className="text-[#1B2340] text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>{items[0]?.brand}</span>
          </div>
          <div className="text-[#64748d] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{items[0]?.visual_type}</div>
          <div className="text-[#1B2340] text-lg sm:text-xl font-bold leading-tight z-10 w-3/4" style={{ fontFamily: 'var(--font-inter)' }}>
            {items[0]?.visual_title_1}<br />
            <span className="text-[10px] sm:text-xs font-normal text-[#64748d]">
              {items[0]?.visual_title_2}
              <br />
              {items[0]?.visual_title_3}
            </span>
          </div>
          <div className="mt-auto z-10 pt-4">
            <div className="bg-slate-900 text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">{items[0]?.button}</div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#DC2626] rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        </div>
      )
    },
    {
      type: items[1]?.type,
      title: items[1]?.title,
      visual: (
        <div className="w-full h-full bg-[#0a0f1c] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-slate-300 text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>{items[1]?.brand}</span>
          </div>
          <div className="text-[#DC2626] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{items[1]?.visual_type}</div>
          <div className="text-white text-lg sm:text-xl font-bold leading-tight z-10 w-2/3" style={{ fontFamily: 'var(--font-inter)' }}>
            {items[1]?.visual_title_1}<br />
            {items[1]?.visual_title_2}<br />
            {items[1]?.visual_title_3}
          </div>
          <div className="mt-auto z-10 pt-4">
            <div className="bg-[#DC2626] text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">{items[1]?.button}</div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-12 h-12 bg-[#DC2626]/20 rounded-full border border-[#DC2626]/50 flex items-center justify-center -mr-2 z-10 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-[#DC2626]" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#1B2340] font-bold text-lg">T</span>
            </div>
          </div>
        </div>
      )
    },
    {
      type: items[2]?.type,
      title: items[2]?.title,
      visual: (
        <div className="w-full h-full bg-[#0a0f1c] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-slate-300 text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>{items[2]?.brand}</span>
          </div>
          <div className="text-[#DC2626] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{items[2]?.visual_type}</div>
          <div className="text-white text-lg sm:text-xl font-bold leading-tight z-10 w-2/3" style={{ fontFamily: 'var(--font-inter)' }}>
            {items[2]?.visual_title_1}<br />
            {items[2]?.visual_title_2}<br />
            <span className="text-[#DC2626]">
              {items[2]?.visual_title_3}
            </span>
          </div>
          <div className="mt-auto z-10 pt-4">
            <div className="bg-[#DC2626] text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">{items[2]?.button}</div>
          </div>
          <div className="absolute right-4 top-4 bottom-4 w-[45%] bg-white rounded flex items-center justify-center p-2">
            <div className="w-full h-full border-l border-[#DC2626] border-slate-200 relative flex items-center justify-center">
              <BarChart2 className="w-8 h-8 text-slate-200" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#DC2626] top-2 left-2"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#DC2626] top-6 left-6"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 bottom-4 right-4"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 top-4 right-8"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 bottom-6 left-4"></div>
              <div className="absolute w-1 h-1 rounded-full bg-orange-400 top-2 right-2"></div>
              <div className="absolute w-1 h-1 rounded-full bg-emerald-400 bottom-2 right-6"></div>
            </div>
          </div>
        </div>
      )
    },
  ];
}

export function LearnMoreSection({ content }: { content?: any }) {
  const resources = getResources(content);
  return (
    <section className="relative w-full bg-gradient-to-br from-white via-[#f6f9fc] to-[#f6f9fc]/60 py-24 px-6 overflow-hidden">

      {/* ── Half-bubble blob — LEFT ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '-28%',
          transform: 'translateY(-50%)',
          width: '55vw',
          height: '55vw',
          maxWidth: '680px',
          maxHeight: '680px',
          background: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(220,38,38,0.55) 52%, rgba(220,38,38,0.35) 65%, rgba(220,38,38,0.35) 82%, rgba(254,226,226,0.70) 100%)',
          borderRadius: '50%',
          opacity: 0.65,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-14"
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
        </motion.div>

        {/* ── Cards + pagination border box ── */}
        <motion.div
          className="border border-[#e3e8ee] rounded-xl p-8 bg-transparent space-y-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Resource cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((r, i) => (
              <motion.div
                key={i}
                className="group flex flex-col gap-4 cursor-pointer"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-[1.8/1] rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  {r.visual}
                </div>

                {/* Label */}
                <div className="space-y-1.5 px-1 mt-2">
                  <span
                    className="text-[10px] font-semibold uppercase text-[#64748d]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {r.type}
                  </span>
                  <h3 className="text-[13px] font-medium text-[#1B2340] leading-snug">
                    {r.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pagination arrows and line */}
        {/* <div className="relative mt-12 flex items-center justify-center max-w-4xl mx-auto">
          <div className="absolute left-0 right-0 h-px bg-slate-300" />
          <div className="relative bg-[#f6f9fc] px-4 flex gap-3">
            <button className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[#64748d] hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[#64748d] hover:bg-slate-200 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div> */}

      </div>
    </section>
  )
}
