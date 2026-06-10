'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';


export function TargetAudienceSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.1 }} className="flex justify-center mb-6">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] text-center pb-2"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Here's who we built our products for
              </h2>
            </motion.div>

            {/* Analytics Section - Layered Design (Agent Factory) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-200 p-4 lg:p-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-8"
            >
              {/* Left - Purple Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[300px] bg-gradient-to-br from-[#533afd] to-[#8278E6] rounded-xl p-4 lg:p-5 space-y-2 shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>AGENT FACTORY</h4>
                  <button className="w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-white/10 border border-white/20">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-[2.5rem] leading-none tracking-tighter font-black text-white" style={{ fontFamily: "var(--font-inter)" }}>6x</h3>
                  <p className="text-[13px] font-bold text-white/95 leading-snug" style={{ fontFamily: "var(--font-quicksand)" }}>Faster Data-Driven<br />Decision Making</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-semibold text-white/80 pt-2 border-t border-white/20">
                  <svg className="w-3 h-3 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI Data Analyst Integration</span>
                </div>
              </div>

              {/* Right - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-[#0d253d] space-y-3">
                <h3 className="text-base font-bold leading-snug tracking-wide text-[#0d253d]" style={{ fontFamily: "var(--font-inter)" }}>
                  Who is Agent Factory for:
                </h3>
                <p className="text-base leading-relaxed max-w-2xl text-[#64748d]" style={{ fontFamily: "var(--font-quicksand)" }}>
                  Agent Factory is built for business leaders who are tired of
                  waiting on data teams for answers. If you're in marketing, sales,
                  finance, or customer success and you've ever waited days for a
                  report that should've taken minutes. Agent Factory acts as your
                  AI Data Analyst, sitting on top of your company's data and
                  answering your business questions directly.
                </p>
              </div>
            </motion.div>

            {/* Analytics Section - Layered Design (Reversed) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-200 p-4 lg:p-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-8"
            >
              {/* Left - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-[#0d253d] space-y-3 lg:pl-4">
                <h3 className="text-base font-bold leading-snug tracking-wide text-[#0d253d]" style={{ fontFamily: "var(--font-inter)" }}>
                  Who is Data Flash for:
                </h3>
                <p className="text-base leading-relaxed max-w-2xl text-[#64748d]" style={{ fontFamily: "var(--font-quicksand)" }}>
                  DataFlash is built for CTOs, data engineers, and data leaders who
                  are tired of spending months writing custom migration code
                  every time they move to a new platform. If you're migrating
                  databases, consolidating data sources, dataFlash handles it through configuration, not code with
                  built-in validation, quality checks, and audit tracking.
                </p>
              </div>

              {/* Right - Purple Analytics Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[300px] bg-gradient-to-br from-[#533afd] to-[#8278E6] rounded-xl p-4 lg:p-5 space-y-2 shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>DATA FLASH</h4>
                  <button className="w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-white/10 border border-white/20">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-[2.5rem] leading-none tracking-tighter font-black text-white" style={{ fontFamily: "var(--font-inter)" }}>100+</h3>
                  <p className="text-[13px] font-bold text-white/95 leading-snug" style={{ fontFamily: "var(--font-quicksand)" }}>hours of efforts saved<br />in Data Migration</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-semibold text-white/80 pt-2 border-t border-white/20">
                  <svg className="w-3 h-3 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Automated Database Migration</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
  );
}
