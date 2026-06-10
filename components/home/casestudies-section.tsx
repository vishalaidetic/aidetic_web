'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';


export function CaseStudiesSection({ activeTab, scrollToSection }: { activeTab: string, scrollToSection: (id: string) => void }) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

              {/* Left Sticky Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 pt-8">
                <div className="flex items-center gap-2 text-[#64748d] text-sm font-medium">
                  <span>Scroll to explore</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: 'E-COMMERCE', id: 'prebuilt' },
                    { label: 'RETAIL', id: 'accelerators' },
                    { label: 'FINANCIAL SERVICES', id: 'tailored' },
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToSection(tab.id)}
                      className={`w-full px-5 py-4 rounded-[14px] font-bold text-[11px] tracking-wider transition-all duration-300 text-left ${activeTab === tab.id
                        ? 'bg-gradient-to-br from-[#533afd] to-[#0d253d] text-white shadow-lg'
                        : 'bg-white/60 text-[#3a4752] hover:bg-white border border-white/50 hover:border-black/5'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Content Area (Scrolls Naturally) */}
              <div className="lg:col-span-9 space-y-12">
                {/* Header above the grid */}
                <div className="space-y-4 max-w-3xl pt-2">
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
                    Proven impact across industries
                  </h2>
                  <p className="text-lg text-[#0d253d]/70 leading-relaxed font-medium" style={{ fontFamily: "var(--font-quicksand)" }}>
                    See how leading companies are using our agentic AI platform to drive massive efficiency and growth.
                  </p>
                </div>

                {/* Case Study Cards in a Vertical Stack */}
                <div className="flex flex-col gap-8 relative pb-24">
                  {[
                    {
                      id: 'prebuilt',
                      company: 'QuickReply.ai',
                      industry: 'E-COMMERCE SAAS',
                      shortTitle: "QuickReply's founders save 15 hrs/week with Fabric",
                      tagline: 'FEATURED STORY',
                      mainTitle: "How QuickReply's founders reclaimed 15 hours a week by automating tech hiring",
                      desc: "QuickReply cut founder hiring time by 60% and halved time-to-hire for engineering roles using Fabric's AI screening and interview platform.",
                      stats: [
                        { value: '50%', label: 'Faster time-to-hire for tech roles' },
                        { value: '60%', label: 'Reduction in founder interview hours' },
                        { value: '2x', label: 'More applications assessed per role' }
                      ],
                      link: '#'
                    },
                    {
                      id: 'accelerators',
                      company: 'Global Retail Co.',
                      industry: 'RETAIL',
                      shortTitle: "Retail giant increases supply chain visibility by 80%",
                      tagline: 'CASE STUDY',
                      mainTitle: "Automating inventory tracking across 500+ locations",
                      desc: "Using intelligent agents to sync inventory databases, the client eliminated stock-outs and reduced manual entry delays from days to seconds.",
                      stats: [
                        { value: '80%', label: 'Increase in real-time visibility' },
                        { value: '30%', label: 'Reduction in stock-outs' },
                        { value: '99%', label: 'Data accuracy' }
                      ],
                      link: '#'
                    },
                    {
                      id: 'tailored',
                      company: 'FinTech Innovators',
                      industry: 'FINANCIAL SERVICES',
                      shortTitle: "Scaling customer support without adding headcount",
                      tagline: 'CUSTOMER STORY',
                      mainTitle: "Resolving 75% of tier-1 support tickets autonomously",
                      desc: "By deploying a customized LLM-powered support agent, FinTech Innovators handled a 3x surge in ticket volume while improving CSAT scores.",
                      stats: [
                        { value: '75%', label: 'Autonomous resolution rate' },
                        { value: '3x', label: 'Volume handled effortlessly' },
                        { value: '+12', label: 'Point increase in CSAT' }
                      ],
                      link: '#'
                    }
                  ].map((card, i) => (
                    <div
                      key={i}
                      id={`purpose-card-${i}`}
                      data-section-id={card.id}
                      className="flex flex-col xl:flex-row gap-0 rounded-[2rem] bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-200 scroll-m-32 w-full group"
                    >
                      {/* Left Side (Gradient Block) */}
                      <div className="w-full xl:w-1/2 p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                         {/* Professional / Business Grid Background */}
                         <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none" />
                         
                         {/* Subtle gradient glowing effect */}
                         <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-96 h-96 bg-[#533afd]/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />

                         <div className="flex items-start justify-between relative z-10 w-full">
                           <div className="flex items-center gap-4">
                              <span className="font-bold text-[#0d253d] text-sm tracking-wide flex items-center gap-2">
                                <div className="w-5 h-5 bg-[#533afd] rounded-md flex items-center justify-center text-white text-[10px] font-black">{card.company[0]}</div>
                                {card.company}
                              </span>
                              <div className="h-4 w-px bg-slate-300" />
                              <span className="text-xs font-semibold tracking-widest text-slate-500">{card.industry}</span>
                           </div>
                         </div>
                         
                         <div className="mt-8 flex items-end relative z-10">
                            <h3 className="text-2xl lg:text-[1.75rem] font-medium text-[#0d253d] max-w-[90%] leading-tight tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                              {card.shortTitle}
                            </h3>
                         </div>
                      </div>

                      {/* Right Side (Content & Stats) */}
                      <div className="w-full xl:w-1/2 p-6 lg:p-8 flex flex-col bg-white relative z-10">
                         <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="text-xs font-bold text-[#533afd] uppercase tracking-widest">{card.tagline}</span>
                            {/* Interactive Arrow Link */}
                            <a href={card.link} className="w-10 h-10 rounded-full bg-slate-50 border border-[#533afd]/10 text-[#533afd] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-[#533afd] hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                               <ChevronRight className="w-4 h-4 translate-x-0.5" strokeWidth={2.5} />
                            </a>
                         </div>
                         <h3 className="text-lg lg:text-xl font-semibold leading-snug tracking-wide text-[#0d253d] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                           {card.mainTitle}
                         </h3>
                         <p className="text-[15px] text-[#64748d] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-quicksand)' }}>
                           {card.desc}
                         </p>

                         <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 mb-0 mt-auto">
                           {card.stats.map((stat, j) => (
                             <div key={j} className="flex flex-col gap-1">
                                <span className="text-[24px] lg:text-[28px] font-semibold text-[#0d253d] leading-none" style={{ fontFamily: 'var(--font-inter)' }}>{stat.value}</span>
                                <span className="text-[11px] text-[#64748d] leading-tight pr-2">{stat.label}</span>
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
