'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';

const homeStats = [
  {
    value: 120,
    suffix: '+',
    label: 'Production AI systems shipped\nfor enterprises since 2019',
  },
  {
    value: 47,
    suffix: '',
    label: 'Fortune-500 customers across\nCPG, telecom and finance',
  },
  {
    value: 99.8,
    suffix: '%',
    label: 'Agent query success rate across\nproduction deployments',
  },
  {
    value: 4.2,
    suffix: 'B',
    label: 'Rows migrated through Data\nFlash in the last 12 months',
  },
]


function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * end).toFixed(end % 1 !== 0 ? 1 : 0)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
export function StatsSection() {
  return (
    <section className="relative py-16 px-6 overflow-hidden snap-start">
          <div className="max-w-6xl mx-auto">

            <motion.div
              className="relative rounded-2xl overflow-hidden px-12 py-14"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* ── Content ── */}
              <div className="relative z-10 text-center space-y-4 mb-12">
                <h2
                  className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15]"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    background: 'linear-gradient(to right, #533afd, #000000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  What Aidetic Brings to the Table
                </h2>
                <p className="text-[#0d253d] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  No dashboards. No waiting. No guesswork. Just decisions backed by your data.
                </p>
              </div>

              {/* ── Stats row ── */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {homeStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    viewport={{ once: true, amount: 0.4 }}
                  >
                    {/* Big number */}
                    <div
                      className="text-4xl md:text-5xl font-bold text-[#533afd] leading-none tracking-wide"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Dotted divider */}
                    <div className="flex justify-center">
                      <div
                        className="w-16 h-0"
                        style={{
                          borderTop: '2.5px dashed #22aed1',
                        }}
                      />
                    </div>

                    {/* Label */}
                    <p className="text-[#0d253d] text-sm leading-snug whitespace-pre-line px-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
  );
}
