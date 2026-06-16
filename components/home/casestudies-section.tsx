'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap, Star } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';


export function CaseStudiesSection({ content }: { content?: any }) {
  const [activeTab, setActiveTab] = useState('prebuilt');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCards = entries.filter(entry => entry.isIntersecting && entry.target.hasAttribute('data-section-id'));
        if (visibleCards.length > 0) {
          visibleCards.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const topVisible = visibleCards[0];
          const sectionId = topVisible.target.getAttribute('data-section-id');
          if (sectionId) setActiveTab(sectionId);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    );

    document.querySelectorAll('[data-section-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const tabs = content?.tabs || [];
  const items = content?.items || [];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

              {/* Left Sticky Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 pt-8">
                <div className="flex items-center gap-2 text-[#64748d] text-sm font-medium">
                  <span>{content?.scroll_text}</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  {tabs.map((tab: any, i: number) => (
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
                    {content?.heading}
                  </h2>
                  <p className="text-lg text-[#0d253d]/70 leading-relaxed font-medium" style={{ fontFamily: "var(--font-quicksand)" }}>
                    {content?.subheading}
                  </p>
                </div>

                {/* Case Study Cards in a Vertical Stack */}
                <div className="flex flex-col gap-8 relative pb-24">
                  {items.map((card: any, i: number) => (
                    <div
                      key={i}
                      id={`purpose-card-${i}`}
                      data-section-id={card.id}
                      className="flex flex-col xl:flex-row gap-0 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200 scroll-m-32 w-full group"
                    >
                      {/* Left Side (Gradient Block) */}
                      <div className="w-full xl:w-[40%] p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-br from-[#fcfaff] via-[#f8f5ff] to-[#f4eeff] relative overflow-hidden border-r border-slate-100">
                         {/* Grid Background */}
                         <div className="absolute inset-0 bg-[linear-gradient(to_right,#eadaff_1px,transparent_1px),linear-gradient(to_bottom,#eadaff_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 pointer-events-none" />
                         
                         {/* Subtle glowing effect */}
                         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 bg-[#533afd]/5 rounded-full blur-3xl pointer-events-none" />

                         <div className="flex justify-end relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#533afd] text-[9px] font-bold tracking-widest uppercase shadow-sm border border-[#533afd]/10">
                               <Star className="w-3 h-3 fill-current" />
                               Featured
                            </span>
                         </div>
                         
                         <div className="mt-8 lg:mt-12 relative z-10 flex flex-col gap-4">
                            {card.stats && card.stats[0] && (
                               <div className="flex flex-col gap-1">
                                  <span className="text-3xl lg:text-4xl font-bold text-[#533afd] leading-none tracking-tight">
                                     {card.stats[0].value}
                                  </span>
                                  <span className="text-[13px] font-bold text-[#0d253d] tracking-wide mt-1">
                                     {card.stats[0].label}
                                  </span>
                               </div>
                            )}

                            <p className="text-[13px] text-slate-500 leading-relaxed max-w-[95%]">
                              {card.shortTitle}
                            </p>

                            {card.stats && card.stats.length > 1 && (
                               <div className="flex flex-col gap-2 pt-1">
                                  {card.stats.slice(1).map((stat: any, j: number) => (
                                     <span key={j} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#0d253d] text-[10px] font-semibold shadow-sm border border-slate-100 w-fit">
                                        <span className="text-[#533afd] font-bold">{stat.value}</span> {stat.label}
                                     </span>
                                  ))}
                               </div>
                            )}
                         </div>
                      </div>

                      {/* Right Side (Content & Stats) */}
                      <div className="w-full xl:w-[60%] p-6 lg:p-8 flex flex-col bg-white relative z-10">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2">
                               <div className="w-6 h-6 bg-slate-50 rounded shadow-sm flex items-center justify-center border border-slate-100">
                                 <Image src="/logo.svg" alt="Logo" width={12} height={12} className="opacity-70" />
                               </div>
                               <span className="font-bold text-[#0d253d] text-xs tracking-wide">{card.company}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{card.industry}</span>
                         </div>
                         
                         <div className="space-y-3 mb-8">
                            <h3 className="text-xl lg:text-2xl font-bold leading-snug tracking-tight text-[#0d253d]">
                              {card.mainTitle}
                            </h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed max-w-[95%]">
                              {card.desc}
                            </p>
                         </div>

                         <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-6 mb-5">
                           {card.stats && card.stats.map((stat: any, j: number) => (
                             <div key={j} className="flex flex-col gap-1">
                                <span className="text-2xl lg:text-[1.75rem] font-bold text-[#0d253d] leading-none tracking-tight">
                                   {stat.value}
                                </span>
                                <span className="text-[10px] text-slate-500 leading-snug font-medium pr-2">
                                   {stat.label}
                                </span>
                             </div>
                           ))}
                         </div>

                         <div className="mt-auto pt-1">
                            <a href={card.link || '#'} className="flex items-center justify-between w-full group/link">
                               <span className="text-xs font-bold text-[#533afd] tracking-wide transition-colors group-hover/link:text-[#3820c9]">
                                  Read Full Case Study
                               </span>
                               <ArrowRight className="w-3.5 h-3.5 text-[#533afd] transition-transform group-hover/link:translate-x-1 group-hover/link:text-[#3820c9]" strokeWidth={2.5} />
                            </a>
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
