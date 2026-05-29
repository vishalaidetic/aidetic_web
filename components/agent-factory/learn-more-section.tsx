'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, BarChart2 } from 'lucide-react'

const resources = [
  {
    type: 'E-BOOK',
    title: 'Trust or Bust: How to Deliver Accurate AI-Powered Analytics',
    visual: (
      <div className="w-full h-full bg-gradient-to-br from-[#f6f9fc] to-[#f5e9d4] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded bg-slate-900/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-slate-900 rounded-sm"></div>
          </div>
          <span className="text-[#0d253d] text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>ThoughtSpot</span>
        </div>
        <div className="text-[#64748d] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>EBOOK</div>
        <div className="text-[#0d253d] text-lg sm:text-xl font-bold leading-tight z-10 w-3/4" style={{ fontFamily: 'var(--font-inter)' }}>
          Trust or Bust<br/>
          <span className="text-[10px] sm:text-xs font-normal text-[#64748d]">How to Deliver Accurate<br/>AI-Powered Analytics</span>
        </div>
        <div className="mt-auto z-10 pt-4">
          <div className="bg-slate-900 text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">GET THE GUIDE</div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#ea2261] rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
           <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      </div>
    )
  },
  {
    type: 'WEBINAR',
    title: 'The Fastest Path from Data to Insight',
    visual: (
      <div className="w-full h-full bg-[#0a0f1c] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          <span className="text-slate-300 text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>ThoughtSpot</span>
        </div>
        <div className="text-[#665efd] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>WEBINAR</div>
        <div className="text-white text-lg sm:text-xl font-bold leading-tight z-10 w-2/3" style={{ fontFamily: 'var(--font-inter)' }}>
          The Fastest<br/>Path from Data<br/>to Insight
        </div>
        <div className="mt-auto z-10 pt-4">
          <div className="bg-[#533afd] text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">REGISTER NOW</div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
           <div className="w-12 h-12 bg-[#533afd]/20 rounded-full border border-[#533afd]/50 flex items-center justify-center -mr-2 z-10 backdrop-blur-sm">
             <Zap className="w-5 h-5 text-[#665efd]" />
           </div>
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
             <span className="text-[#0d253d] font-bold text-lg">T</span>
           </div>
        </div>
      </div>
    )
  },
  {
    type: 'ANALYST REPORT',
    title: 'Build with the Leader in Embedded Analytics',
    visual: (
      <div className="w-full h-full bg-[#0a0f1c] p-6 flex flex-col relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          <span className="text-slate-300 text-[8px] font-bold" style={{ fontFamily: 'var(--font-inter)' }}>ThoughtSpot</span>
        </div>
        <div className="text-[#665efd] text-[8px] font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-inter)' }}>ANALYST REPORT</div>
        <div className="text-white text-lg sm:text-xl font-bold leading-tight z-10 w-2/3" style={{ fontFamily: 'var(--font-inter)' }}>
          Build with<br/>the Best in<br/><span className="text-[#665efd]">Embedded<br/>Analytics</span>
        </div>
        <div className="mt-auto z-10 pt-4">
          <div className="bg-[#533afd] text-white text-[7px] px-3 py-1.5 rounded w-fit uppercase font-bold tracking-wider">LEARN MORE</div>
        </div>
        <div className="absolute right-4 top-4 bottom-4 w-[45%] bg-white rounded flex items-center justify-center p-2">
          <div className="w-full h-full border-l border-[#533afd] border-slate-200 relative flex items-center justify-center">
             <BarChart2 className="w-8 h-8 text-slate-200" />
             <div className="absolute w-1.5 h-1.5 rounded-full bg-[#533afd] top-2 left-2"></div>
             <div className="absolute w-1.5 h-1.5 rounded-full bg-[#ea2261] top-6 left-6"></div>
             <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500 bottom-4 right-4"></div>
             <div className="absolute w-1.5 h-1.5 rounded-full bg-violet-500 top-4 right-8"></div>
             <div className="absolute w-1.5 h-1.5 rounded-full bg-rose-500 bottom-6 left-4"></div>
             <div className="absolute w-1 h-1 rounded-full bg-orange-400 top-2 right-2"></div>
             <div className="absolute w-1 h-1 rounded-full bg-emerald-400 bottom-2 right-6"></div>
          </div>
        </div>
      </div>
    )
  },
]

export function LearnMoreSection() {
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
          background: '#e3e8ee',
          borderRadius: '50%',
          opacity: 0.48,
          filter: 'blur(2px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #ea2261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Learn More About Agentic Analytics
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
                  <h3 className="text-[13px] font-medium text-[#0d253d] leading-snug">
                    {r.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Pagination arrows and line */}
        <div className="relative mt-12 flex items-center justify-center max-w-4xl mx-auto">
          <div className="absolute left-0 right-0 h-px bg-slate-300" />
          <div className="relative bg-[#f6f9fc] px-4 flex gap-3">
            <button className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[#64748d] hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-slate-400 flex items-center justify-center text-[#64748d] hover:bg-slate-200 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
