'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';

const companies = [
  { name: 'ShopJapan', label: 'Shop Japan' },
  { name: 'Myntra', label: 'Myntra' },
  { name: 'TheLineUp', label: 'The Line Up' },
  { name: 'ACKO', label: 'ACKO' },
  { name: 'CoinDCX', label: 'CoinDCX' },
  { name: 'Meesho', label: 'Meesho' },
  { name: 'Razorpay', label: 'Razorpay' },
  { name: 'Groww', label: 'Groww' },
]
export function IndustrySolutionsSection({ activeIndustryTab, setActiveIndustryTab }: { activeIndustryTab: string, setActiveIndustryTab: (id: string) => void }) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
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
                    We&apos;ve built our business by serving global enterprises
                  </h2>
                  <p className="text-[#64748d] text-lg" style={{ fontFamily: "var(--font-quicksand)" }}>
                    Trust us, we&apos;ve learned from the best.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="text-[#64748d] leading-relaxed">
                  <p style={{ fontFamily: "var(--font-quicksand)" }}>Discover why hundreds of enterprises use our platform.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="flex gap-4 flex-wrap">
                  <BookCallDialog>
                    <button className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                      REQUEST A DEMO
                    </button>
                  </BookCallDialog>
                  <BookCallDialog>
                    <button className="px-8 py-3.5 rounded-full bg-white text-[#533afd] font-medium border border-[#533afd]/30 shadow-sm hover:border-[#533afd] hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                      LET&apos;S TALK
                    </button>
                  </BookCallDialog>
                </motion.div>
              </div>

              {/* Right Content - Tabbed Cards */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Tabs */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex gap-3 flex-wrap">
                    {['Banking', 'Healthcare', 'Retail', 'Telecom + Media', 'Business'].map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndustryTab(tab.toLowerCase().replace(/\s/g, ''))}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activeIndustryTab === tab.toLowerCase().replace(/\s/g, '')
                          ? 'bg-[#533afd] text-white'
                          : 'bg-muted text-[#64748d] hover:text-[#0d253d]'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </motion.div>

                  {/* Cards Carousel */}
                  <div className="relative w-full overflow-hidden pb-4">
                    <div
                      className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: `translateX(-${Math.max(0, ['banking', 'healthcare', 'retail', 'telecom+media', 'business'].indexOf(activeIndustryTab)) * 70}%)`
                      }}
                    >
                      {[
                        {
                          id: 'banking',
                          title: 'Banks, Credit Unions, Financial Institutions',
                          subtitle: 'Trusted by banking leaders',
                          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
                          logos: ['EGON', 'Assurant', 'Morgan Stanley', 'Sabadell']
                        },
                        {
                          id: 'healthcare',
                          title: 'Payers, Providers, Life Sciences',
                          subtitle: 'Trusted by healthcare leaders',
                          image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop',
                          logos: ['Florida Blue', 'Roche']
                        },
                        {
                          id: 'retail',
                          title: 'Retail & Consumer Goods',
                          subtitle: 'Trusted by retail leaders',
                          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
                          logos: ['ShopJapan', 'Myntra']
                        },
                        {
                          id: 'telecom+media',
                          title: 'Telecom, Media, Communications',
                          subtitle: 'Trusted by telecom leaders',
                          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
                          logos: ['T-Mobile', 'Frontier', 'NetApp', 'ebay']
                        },
                        {
                          id: 'business',
                          title: 'B2B Goods and Services',
                          subtitle: 'Trusted by business leaders',
                          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
                          logos: ['Nippon Steel', 'Genpact']
                        }
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="w-[70%] shrink-0 pr-4 sm:pr-6 lg:pr-8"
                        >
                          <div className="relative rounded-3xl overflow-hidden h-[450px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Background Image */}
                            <img
                              src={card.image}
                              alt={card.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-8">
                              <div>
                                <h3 className="text-3xl font-medium text-white leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
                                  {card.title}
                                </h3>
                              </div>

                              <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold" style={{ fontFamily: "var(--font-quicksand)" }}>
                                  {card.subtitle}:
                                </p>
                                {/* Scrolling company marquee */}
                                <div className="overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                                  <div
                                    className="flex gap-2 w-max ticker-rtl"
                                  >
                                    {[...companies, ...companies].map((c, j) => (
                                      <span
                                        key={j}
                                        className="shrink-0 px-4 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap"
                                      >
                                        {c.label}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
