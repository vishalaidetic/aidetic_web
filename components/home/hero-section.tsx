'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';


export function HeroSection({ content }: { content?: any }) {

  const [heroTextIndex, setHeroTextIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <section id="hero" className="relative w-full overflow-hidden snap-start  scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* ── Upper half: centered layout ── */}
            <div className="relative flex flex-col items-center justify-center text-center rounded-t-2xl overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-12 px-6 min-h-screen">

              {/* ── Grid Background with Bottom Fade Mask ── */}
              <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)] z-0">
                {/* Static Base Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem]" />

                {/* Dynamic Grid Lines Overlay with Moving Red Dots */}
                <div className="absolute inset-0 overflow-hidden">
                  <style>{`
                    @keyframes dotMoveX {
                      0% { transform: translateX(-10vw); opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateX(100vw); opacity: 0; }
                    }
                    @keyframes dotMoveY {
                      0% { transform: translateY(-10vh); opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateY(100vh); opacity: 0; }
                    }
                    @keyframes marquee-logos {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                  {/* Horizontal moving dots */}
                  <div className="absolute top-[calc(2rem*4-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
                  <div className="absolute top-[calc(2rem*12-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
                  <div className="absolute top-[calc(2rem*20-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
                  <div className="absolute top-[calc(2rem*28-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 9s linear infinite 1s' }} />

                  {/* Vertical moving dots */}
                  <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
                  <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
                  <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
                  <div className="absolute left-[calc(2rem*56-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 8s linear infinite 2s' }} />
                </div>
              </div>

              {/* ── Centered Content Overlay ── */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, amount: 0.1 }} className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
                <h1
                  className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#0d253d] leading-[1.1] tracking-tight text-center"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.heading || "Enterprise Grade"}
                  <br className="hidden sm:block" />
                  <span className="inline-block relative min-w-[280px] sm:min-w-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroTextIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                        style={{
                          background: 'linear-gradient(to right, #533afd, #0d253d)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontFamily: 'var(--font-quicksand)'
                        }}
                      >
                        {heroTextIndex === 0 ? (content?.animated_texts?.[0] || 'Agentic AI Solutions') : (content?.animated_texts?.[1] || 'Data Migration Solutions')}
                      </motion.span>
                    </AnimatePresence>
                    {/* Invisible span to maintain correct document flow width */}
                    <span className="opacity-0 invisible whitespace-nowrap pointer-events-none" aria-hidden="true">
                      {content?.animated_texts?.[1] || 'Data Migration Solutions'}
                    </span>
                  </span>
                </h1>

                <p
                  className="text-lg md:text-xl text-[#64748d] leading-relaxed mt-6 mb-10 max-w-3xl font-medium text-center"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  {content?.subheading || "Aidetic brings you production-ready Agentic AI solutions, so you skip the build cycle and go straight to impact."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <BookCallDialog>
                    <button
                      id="hero-cta-demo"
                      className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {content?.cta_primary || "Request a Call"}
                    </button>
                  </BookCallDialog>
                  <Link href="/#products" className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#533afd] font-medium border border-[#533afd]/30 shadow-sm hover:border-[#533afd] hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-[15px]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {content?.cta_secondary || "Our Products"}
                    </button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="mt-16 w-full relative z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <p
                  className="font-bold tracking-[0.25em] text-sm uppercase mb-8 text-center"
                  style={{
                    fontFamily: "var(--font-inter)",
                    background: "linear-gradient(to right, #533afd, #000000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {content?.trusted_by || "TRUSTED BY AI-FIRST ENTERPRISES"}
                </p>

                {/* Marquee wrapper with fade-edge mask */}
                <div
                  className="relative overflow-hidden border-t border-b border-[#533afd]/30 py-8 mb-8"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  {/* Track — doubled for seamless loop */}
                  <div
                    className="flex items-center gap-14 w-max"
                    style={{ animation: "marquee-logos 28s linear infinite" }}
                  >
                    {[...(content?.logos || []), ...(content?.logos || [])].map((logo: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-center shrink-0 h-8"
                      >
                        {logo.url ? (
                          <img
                            src={logo.url}
                            alt={logo.name}
                            className="h-7 max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                          />
                        ) : (
                          <span
                            className="text-base font-semibold tracking-tight text-[#533afd]/60 hover:text-[#533afd] transition-colors whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {logo.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
  );
}
