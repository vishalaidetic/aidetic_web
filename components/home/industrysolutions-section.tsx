'use client'
import { motion } from "framer-motion";
import { useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';

export function IndustrySolutionsSection({ content }: { content?: any }) {
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking');
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
                    {content?.heading}
                  </h2>
                  <p className="text-[#64748d] text-lg" style={{ fontFamily: "var(--font-quicksand)" }}>
                    {content?.subheading}
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="text-[#64748d] leading-relaxed">
                  <p style={{ fontFamily: "var(--font-quicksand)" }}>{content?.desc}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="flex gap-4 flex-wrap">
                  <BookCallDialog>
                    <button className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                      {content?.cta_primary}
                    </button>
                  </BookCallDialog>
                  <BookCallDialog>
                    <button className="px-8 py-3.5 rounded-full bg-white text-[#533afd] font-medium border border-[#533afd]/30 shadow-sm hover:border-[#533afd] hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                      {content?.cta_secondary}
                    </button>
                  </BookCallDialog>
                </motion.div>
              </div>

              {/* Right Content - Tabbed Cards */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Tabs */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex gap-3 flex-wrap">
                    {(content?.tabs || []).map((tab: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndustryTab(tab.id)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activeIndustryTab === tab.id
                          ? 'bg-[#533afd] text-white'
                          : 'bg-muted text-[#64748d] hover:text-[#0d253d]'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>

                  {/* Cards Carousel */}
                  <div className="relative w-full overflow-hidden pb-4">
                    <div
                      className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: `translateX(-${Math.max(0, (content?.tabs || []).findIndex((t: any) => t.id === activeIndustryTab)) * 70}%)`
                      }}
                    >
                      {(content?.items || []).map((card: any, i: number) => (
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
                                    {[...(card.logos || []), ...(card.logos || [])].map((c, j) => (
                                      <span
                                        key={j}
                                        className="shrink-0 px-4 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap"
                                      >
                                        {c}
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
