'use client'

import { BookCallDialog } from '@/components/shared/book-call-dialog'
import { motion } from 'framer-motion'
import { LineChart, Target, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const cardsData = [
  {
    title: "A Global F&B Company's Recipe for Profit in the Age of AI",
    description: '"A global F&B conglomerate was over-discounting without realizing it. AI surfaced this insight in real time. They fixed their pricing strategy and revenue jumped 5-10%."',
    icon: TrendingUp,
    color: 'text-[#ea2261]',
    bg: 'bg-[#ea2261]/10',
  },
  {
    title: 'A Supply Chain Dept. that Got Faster with AI',
    description: '“The Supply Chain department of a CPG company was struggling to keep up with demand fluctuations due to slow data insights. AI gave them real-time visibility into their supply chain. Forecasting errors dropped by 30%”',
    icon: LineChart,
    color: 'text-[#533afd]',
    bg: 'bg-[#533afd]/10',
  },
  {
    title: 'When AI Grows Your Bottom-Line',
    description: '"A leading consulting firm found that CPG companies applying AI for real-time insights across commercial functions unlock 3–5 percentage points of EBITDA growth."',
    icon: Target,
    color: 'text-[#533afd]',
    bg: 'bg-[#533afd]/10',
  }
]

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const maxIndex = Math.max(0, cardsData.length - 2)

  const nextCard = () => {
    setActiveIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevCard = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-white overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#533afd]/60 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-4">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Stale Insights will Never Give You Margin
              </h2>
              <p className="text-base md:text-lg text-[#0d253d] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-quicksand)" }}>
                McKinsey says, businesses that take fast data-driven decisions are 19x more likely to be profitable.
              </p>
            </motion.div>

          </div>

          {/* Right Content - Tabbed Cards */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Cards Carousel */}
              <div className="relative w-full overflow-hidden px-2 pb-8 -mx-2">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-full"
                  style={{
                    transform: `translateX(calc(-${activeIndex} * (50% + 0.75rem)))`
                  }}
                >
                  {cardsData.map((card, i) => {
                    const Icon = card.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-400 flex flex-col w-[calc(50%-0.75rem)] shrink-0 h-[420px] overflow-hidden"
                        style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)' }}
                      >
                        {/* Subtle top accent bar */}
                        <div
                          className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to right, #533afd, #ea2261)' }}
                        />

                        <motion.div 
                          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 shrink-0 ${card.bg}`}
                          whileHover={{ scale: 1.12, rotate: -4 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        >
                          <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={1.8} />
                        </motion.div>
                        
                        <h3 className="text-base font-semibold text-[#0d253d] mb-5 leading-snug tracking-wide group-hover:text-[#533afd] transition-colors duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
                          {card.title}
                        </h3>

                        {/* Expandable Divider */}
                        <div className="h-[2px] bg-gradient-to-r from-[#533afd] to-[#ea2261] w-8 group-hover:w-16 transition-all duration-500 ease-out mb-5 rounded-full opacity-70" />

                        <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-1 overflow-hidden" style={{ fontFamily: 'var(--font-quicksand)' }}>
                          {card.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="flex gap-4 justify-center w-full mt-12 lg:mt-16 relative z-20">
          <button
            onClick={prevCard}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white text-[#533afd] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 border border-transparent"
            style={{ boxShadow: '0 8px 30px rgba(83,58,253,0.12)' }}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={nextCard}
            disabled={activeIndex === maxIndex}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white text-[#533afd] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 border border-transparent"
            style={{ boxShadow: '0 8px 30px rgba(83,58,253,0.12)' }}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
