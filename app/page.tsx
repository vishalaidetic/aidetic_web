'use client'

import { Footer } from '@/components/layout/footer'
import { Navigation } from '@/components/layout/navigation'
import { Outfit, Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const outfit = Outfit({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

/**
 * Landing page - Homepage
 * Inspired by Fabric's minimalist SaaS design
 */

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

const caseStudies = [
  {
    id: 'case-1',
    brandName: 'FinTech Corp',
    title: 'Reducing Data Migration Time by 80%',
    description: 'How a leading financial services firm used Data Flash to migrate 50TB of legacy data to Databricks in record time.',
    metrics: [
      { value: '80%', label: 'Time Saved', highlight: true },
      { value: '50TB', label: 'Data Migrated' }
    ],
    ctaText: 'Read Success Story',
    offsetX: 0,
    offsetY: 0,
    zIndex: 10
  },
  {
    id: 'case-2',
    brandName: 'Retail Giants',
    title: 'Automating Business Intelligence',
    description: 'Implementing Agent Factory to provide real-time inventory insights to 500+ store managers across the country.',
    metrics: [
      { value: '10x', label: 'Faster Reports', highlight: true },
      { value: '500+', label: 'Active Users' }
    ],
    ctaText: 'View Case Study',
    offsetX: 80,
    offsetY: 100,
    zIndex: 20
  },
  {
    id: 'case-3',
    brandName: 'HealthData Inc',
    title: 'HIPAA Compliant Data Synthesis',
    description: 'Enabling secure research on sensitive patient records using our advanced anonymization and analysis pipeline.',
    metrics: [
      { value: '100%', label: 'Compliance', highlight: true },
      { value: '2M+', label: 'Records Processed' }
    ],
    ctaText: 'Explore Solution',
    offsetX: 160,
    offsetY: 200,
    zIndex: 30
  }
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('prebuilt')
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking')
  const [animatedElements, setAnimatedElements] = useState<Record<string, boolean>>({})

  // Handle scroll spy for the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Animate elements
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })

        // Scroll spy for sidebar tabs
        const visibleCards = entries.filter(entry => entry.isIntersecting && entry.target.hasAttribute('data-section-id'));
        if (visibleCards.length > 0) {
          // Sort by top position to find the most visible one
          visibleCards.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const topVisible = visibleCards[0];
          const sectionId = topVisible.target.getAttribute('data-section-id');
          if (sectionId) setActiveTab(sectionId);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    )

    document.querySelectorAll('[data-animate], [data-section-id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Timeline light scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const timelineContainer = document.querySelector('.timeline-container')
      const timelineLight = document.getElementById('timeline-light')

      if (!timelineContainer || !timelineLight) return

      const rect = timelineContainer.getBoundingClientRect()
      const containerTop = rect.top + window.scrollY
      const containerHeight = rect.height
      const scrollTop = window.scrollY

      // Calculate the position of the light relative to the timeline
      let lightPosition = scrollTop - containerTop + window.innerHeight / 2

      // Clamp within timeline bounds
      lightPosition = Math.max(0, Math.min(lightPosition, containerHeight))

      timelineLight.style.top = `${lightPosition}px`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const el = document.querySelector(`[data-section-id="${id}"]`)
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* ══════════════════════════════════════════════════════════
             HERO SECTION — Two-column layout (inspired by reference)
             ══════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative w-full bg-white overflow-hidden">
          <div className="max-w-8xl mx-auto px-6 lg:px-10">

            {/* ── Upper half: two columns ── */}
            <div className="relative grid lg:grid-cols-2 gap-0 items-stretch bg-white rounded-t-2xl overflow-hidden">

              {/* ── Grid Background with Bottom Fade Mask ── */}
              <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]">
                {/* Static Base Grid for Upper Half */}
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
                  `}</style>
                  {/* Horizontal moving dots */}
                  <div className="absolute top-[calc(2rem*4-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
                  <div className="absolute top-[calc(2rem*12-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
                  <div className="absolute top-[calc(2rem*20-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
                  <div className="absolute top-[calc(2rem*28-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 9s linear infinite 1s' }} />

                  {/* Vertical moving dots */}
                  <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
                  <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
                  <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
                  <div className="absolute left-[calc(2rem*56-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 8s linear infinite 2s' }} />
                </div>
              </div>

              {/* LEFT — headline + star rating */}
              <div
                id="hero-headline"
                data-animate
                className={`relative z-10 transition-all duration-700 py-16 lg:py-28 pl-4 lg:pl-16 xl:pl-24 lg:pr-12 flex flex-col justify-center ${animatedElements['hero-headline'] ? 'animate-slide-up' : 'opacity-0'}`}
              >
                <div className="relative z-10">
                  <h1 className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#1B2340] leading-[1.1] tracking-tight ${outfit.className}`}>
                    Enterprise Grade
                    <br className="hidden sm:block" />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-medium tracking-normal block mt-2 lg:mt-3 ${playfair.className}`}>
                      Agentic AI Solutions
                    </span>
                  </h1>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-medium text-sm">Trusted by 50+ enterprises</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — description + CTAs */}
              <div
                id="hero-right"
                data-animate
                className={`relative z-10 flex flex-col justify-center py-16 lg:py-28 lg:pl-16 transition-all duration-700 delay-150 ${animatedElements['hero-right'] ? 'animate-slide-up' : 'opacity-0'}`}
              >
                <div className="hidden lg:flex justify-end mb-8">
                </div>

                <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg font-medium">
                  Production-ready Agentic AI solutions that help you automate complex workflows, migrate data, and generate insights at enterprise scale.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link href="/dashboard/blogs/create" className="w-full sm:w-auto">
                    <button className="w-full px-8 py-3.5 bg-gradient-to-r from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white rounded-xl font-semibold text-base hover:opacity-90 transition-all duration-200 hover:shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)]">
                      Get a Demo
                    </button>
                  </Link>
                  <Link href="/#products" className="w-full sm:w-auto">
                    <button className="w-full px-8 py-3.5 bg-white text-[#1B2340] rounded-xl font-semibold text-base border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>

            </div>

            {/* ── Lower half: gray product showcase panel ── */}
            <div className="mt-6 mb-10 rounded-2xl overflow-hidden">

              {/* Two-card grid */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 px-10 lg:px-28 xl:px-36 pt-12 pb-16">

                {/* ── Card 1: Agent Factory ── */}
                <div
                  className={`bg-white rounded-2xl shadow-[0_8px_32px_-6px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col transition-all duration-1000 delay-300 ${animatedElements['hero-headline'] ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ minHeight: '600px' }}
                >
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex-1 mx-2.5 bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[10px] text-slate-400 font-mono">
                      app.aidetic.ai/agent-factory
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-5 space-y-3.5 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400">Hi, Olivia</p>
                        <p className="text-xs font-semibold text-[#1B2340]">Agent Factory — AI Data Analyst</p>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                      </div>
                    </div>

                    <div className="bg-[#1B2340] rounded-xl p-4">
                      <p className="text-white/60 text-[9px] font-medium mb-1 uppercase tracking-wider">Live Query</p>
                      <p className="text-white font-semibold text-xs">What drove Q2 revenue growth?</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-[#DC2626] rounded-full animate-pulse" style={{ width: '67%' }} />
                        </div>
                        <span className="text-white/50 text-[9px] shrink-0">Analyzing 4.2M rows</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 bg-slate-50 rounded-xl p-4 flex-1">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Analysis Results</p>
                      {[{ label: 'New Accounts', pct: 78 }, { label: 'Upsell Revenue', pct: 55 }, { label: 'Retention Rate', pct: 91 }].map(m => (
                        <div key={m.label} className="flex items-center gap-2.5">
                          <span className="text-slate-500 text-[10px] w-22 shrink-0" style={{ minWidth: '88px' }}>{m.label}</span>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1B2340] rounded-full" style={{ width: `${m.pct}%` }} />
                          </div>
                          <span className="text-[#DC2626] text-[10px] font-bold w-7 text-right">{m.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Card 2: Data Flash ── */}
                <div
                  className={`bg-white rounded-2xl shadow-[0_8px_32px_-6px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col transition-all duration-1000 delay-500 ${animatedElements['hero-headline'] ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ minHeight: '600px' }}
                >
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex-1 mx-2.5 bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[10px] text-slate-400 font-mono">
                      app.aidetic.ai/data-flash
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-5 space-y-3.5 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400">Migration Job #4821</p>
                        <p className="text-xs font-semibold text-[#1B2340]">Data Flash — Enterprise Migration</p>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 border border-amber-100 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[10px] text-amber-600 font-semibold">Running</span>
                      </div>
                    </div>

                    <div className="bg-[#1B2340] rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white/50 text-[8px] uppercase tracking-wider mb-0.5">Source</p>
                        <p className="text-white font-semibold text-xs">Snowflake</p>
                        <p className="text-white/40 text-[9px]">18.6M rows · 42 tables</p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#DC2626] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                        </div>
                        <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-white/50 text-[8px] uppercase tracking-wider mb-0.5">Destination</p>
                        <p className="text-white font-semibold text-xs">Databricks Δ</p>
                        <p className="text-[#DC2626] text-[9px] font-semibold">12.4M migrated</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 flex-1">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Pipeline Stages</p>
                      {[
                        { stage: 'Extract', src: 'Snowflake → S3', status: 'done', pct: 100 },
                        { stage: 'Transform', src: 'Schema Mapping', status: 'running', pct: 67 },
                        { stage: 'Validate', src: 'Quality Gates', status: 'pending', pct: 0 },
                        { stage: 'Load', src: 'Databricks Δ', status: 'pending', pct: 0 },
                      ].map(s => (
                        <div key={s.stage} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.status === 'done' ? 'bg-[#1B2340]' : s.status === 'running' ? 'bg-[#DC2626] animate-pulse' : 'bg-slate-200'}`} />
                          <span className={`text-[10px] font-semibold shrink-0 ${s.status === 'pending' ? 'text-slate-300' : 'text-slate-600'}`} style={{ minWidth: '64px' }}>{s.stage}</span>
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${s.status === 'done' ? 'bg-[#1B2340]' : s.status === 'running' ? 'bg-[#DC2626]' : 'bg-slate-200'}`} style={{ width: `${s.pct}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold w-7 text-right shrink-0 ${s.status === 'done' ? 'text-[#1B2340]' : s.status === 'running' ? 'text-[#DC2626]' : 'text-slate-300'}`}>
                            {s.pct > 0 ? `${s.pct}%` : '—'}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 mt-1 border-t border-slate-100">
                        <span className="text-slate-400 text-[9px]">Rows processed</span>
                        <span className="text-[#DC2626] text-[9px] font-bold animate-pulse">12.4M / 18.6M</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* ── Full-Width CTA Section - Hi, I am Anurag ── */}
        <section className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            id="cta-accelerate"
            data-animate
            className={`relative bg-white border-2 border-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 hover:shadow-[10px_10px_0px_0px_rgba(220,38,38,0.10)] max-w-none ${animatedElements['cta-accelerate'] ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#ffcfcf] border-2 border-slate-900 flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Anurag"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left space-y-1">
                <p className="text-xl font-medium text-slate-900">Hi, I am Anurag.</p>
                <p className="text-xl text-slate-600">Curious how our products can help you?</p>
                <p className="text-xl font-black text-slate-900 tracking-tight uppercase">Let&apos;s Talk</p>
              </div>
            </div>

            <Link href="/dashboard">
              <button className="px-10 py-4 bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] border-2 border-slate-900 rounded-2xl font-bold text-xl text-white hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                Book a Demo
              </button>
            </Link>
          </div>
        </section>

        {/* ── Extra Features Section ── */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-background">
          <div className="w-full max-w-[90rem] mx-auto space-y-6">
            {/* Header */}
            <div
              id="extra-features-header"
              data-animate
              className={`flex justify-center mb-6 ${animatedElements['extra-features-header'] ? 'animate-slide-down' : 'opacity-0'
                }`}
            >
              <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground text-center">
                Here's who we built our products for
              </h2>
            </div>

            {/* Analytics Section - Layered Design (Agent Factory) */}
            <div
              id="analytics-section"
              data-animate
              className={`relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(27,35,64,0.3)] bg-gradient-to-br from-[#1B2340] via-[#2A3158] to-[#8278E6] p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${animatedElements['analytics-section'] ? 'animate-scale-block' : 'opacity-0'
                }`}
              style={{ animationDelay: '100ms' }}
            >
              {/* Left - White Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-white rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-slate-900 tracking-wide">AGENT FACTORY</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-slate-50 border border-slate-100">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-br from-[#1B2340] to-[#8278E6]">6x</h3>
                  <p className="text-[15px] font-bold text-slate-700 leading-snug">Faster Data-Driven<br />Decision Making</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pt-4 border-t border-slate-100/80">
                  <svg className="w-3.5 h-3.5 text-[#8278E6] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI Data Analyst Integration</span>
                </div>
              </div>

              {/* Right - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-white space-y-3">
                <h3 className="text-2xl lg:text-[2rem] font-bold leading-tight tracking-tight text-white/95">
                  Who is Agent Factory for:
                </h3>
                <p className="text-white/80 text-[14px] leading-relaxed max-w-2xl font-medium">
                  Agent Factory is built for business leaders who are tired of
                  waiting on data teams for answers. If you're in marketing, sales,
                  finance, or customer success and you've ever waited days for a
                  report that should've taken minutes. Agent Factory acts as your
                  AI Data Analyst, sitting on top of your company's data and
                  answering your business questions directly.
                </p>
              </div>
            </div>


            {/* Analytics Section - Layered Design (Reversed) */}
            <div
              id="analytics-section-reversed"
              data-animate
              className={`relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(27,35,64,0.3)] bg-gradient-to-bl from-[#1B2340] via-[#2F1D2C] to-[#DC2626] p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${animatedElements['analytics-section-reversed'] ? 'animate-scale-block' : 'opacity-0'
                }`}
              style={{ animationDelay: '200ms' }}
            >
              {/* Left - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-white space-y-3 lg:pl-4">
                <h3 className="text-2xl lg:text-[2rem] font-bold leading-tight tracking-tight text-white/95">
                  Who is Data Flash for:
                </h3>
                <p className="text-white/80 text-[14px] leading-relaxed max-w-2xl font-medium">
                  DataFlash is built for CTOs, data engineers, and data leaders who
                  are tired of spending months writing custom migration code
                  every time they move to a new platform. If you're migrating
                  databases, consolidating data sources, or modernizing your data
                  stack. DataFlash handles it through configuration, not code with
                  built-in validation, quality checks, and audit tracking.
                </p>
              </div>

              {/* Right - White Analytics Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-white rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-slate-900 tracking-wide">DATA FLASH</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-slate-50 border border-slate-100">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-br from-[#1B2340] to-[#DC2626]">100+</h3>
                  <p className="text-[15px] font-bold text-slate-700 leading-snug">hours of efforts saved<br />in Data Migration</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pt-4 border-t border-slate-100/80">
                  <svg className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Automated Database Migration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Capabilities Section ── */}
        <section id="products" className="w-full bg-slate-50/50">
          <div className="w-full relative">

            {/* Section Header */}
            <div className="flex flex-col items-center justify-center text-center pt-8 sm:pt-10 pb-4 sm:pb-6 relative z-10 max-w-3xl mx-auto px-4">
              <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground">
                Our Core Capabilities
              </h2>
            </div>

            <div className="w-full relative z-10">

              {/* --- DATA FLASH SUB-SECTION --- */}
              <div className="sticky w-full overflow-hidden top-[6rem] z-10 bg-[#F8FAFC] border-y border-slate-200 shadow-sm h-auto min-h-[680px] flex flex-col justify-center">

                {/* 2-col: Hub diagram + Capability grid */}
                <div className="grid lg:grid-cols-2 gap-0 items-stretch relative w-full max-w-[90rem] mx-auto">

                  {/* LEFT: Hub Diagram */}
                  <div className="relative w-full h-[640px] z-0 bg-[#1B2340] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 560" preserveAspectRatio="none">
                      <defs>
                        <style>{`
                      @keyframes df-pulse {
                        0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0}
                      }
                      .df-p1{animation:df-pulse 2s infinite ease-in-out 0s;offset-path:path('M 210 54 C 250 54,250 280,300 280')}
                      .df-p2{animation:df-pulse 2s infinite ease-in-out .33s;offset-path:path('M 210 144 C 250 144,250 280,300 280')}
                      .df-p3{animation:df-pulse 2s infinite ease-in-out .66s;offset-path:path('M 210 234 C 250 234,250 280,300 280')}
                      .df-p4{animation:df-pulse 2s infinite ease-in-out 1s;offset-path:path('M 210 324 C 250 324,250 280,300 280')}
                      .df-p5{animation:df-pulse 2s infinite ease-in-out 1.33s;offset-path:path('M 210 414 C 250 414,250 280,300 280')}
                      .df-p6{animation:df-pulse 2s infinite ease-in-out 1.66s;offset-path:path('M 210 504 C 250 504,250 280,300 280')}
                      .df-p7{animation:df-pulse 2s infinite ease-in-out 0.5s;offset-path:path('M 500 280 C 540 280,540 74,590 74')}
                      .df-p8{animation:df-pulse 2s infinite ease-in-out 1.16s;offset-path:path('M 500 280 L 590 280')}
                      .df-p9{animation:df-pulse 2s infinite ease-in-out 1.83s;offset-path:path('M 500 280 C 540 280,540 486,590 486')}
                    `}</style>
                        <filter id="df-glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      {/* Left paths */}
                      <path d="M 210 54 C 250 54, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 210 144 C 250 144, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 210 234 C 250 234, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 210 324 C 250 324, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 210 414 C 250 414, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 210 504 C 250 504, 250 280, 300 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      {/* Right paths */}
                      <path d="M 500 280 C 540 280, 540 74, 590 74" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 280 L 590 280" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 280 C 540 280, 540 486, 590 486" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      {/* Pulse dots */}
                      {['df-p1', 'df-p2', 'df-p3', 'df-p4', 'df-p5', 'df-p6', 'df-p7', 'df-p8', 'df-p9'].map(cls => (
                        <g key={cls} className={cls} filter="url(#df-glow)">
                          <circle cx="0" cy="0" r="4" fill="#DC2626" />
                          <circle cx="0" cy="0" r="8" fill="none" stroke="#DC2626" strokeOpacity="0.4" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>

                    {/* Left 6 blocks — absolute */}
                    {[
                      { name: 'PostgreSQL', top: 30, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'Snowflake', top: 120, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                      { name: 'MySQL', top: 210, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'MongoDB', top: 300, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M11 20A7 7 0 014 8l1.33 2.67C6.67 9.33 9.33 6.67 11 2s4.33 7.33 5.67 8.67L18 8a7 7 0 01-7 12z" /></svg> },
                      { name: 'MsSQL', top: 390, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'DynamoDB', top: 480, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg> },
                    ].map((item, i) => (
                      <div key={i} className="absolute left-[6%] w-[145px] z-10" style={{ top: item.top }}>
                        <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-[#DC2626]/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-[#DC2626] opacity-0 group-hover:opacity-100 rounded-l-[12px] transition-opacity" />
                          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">{item.icon}</div>
                          <p className="text-white font-bold text-xs tracking-wide">{item.name}</p>
                        </div>
                      </div>
                    ))}

                    {/* Center Data Flash card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] z-20">
                      <div className="bg-[#1B2340] border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#DC2626]" />
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#DC2626]/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-4 7h4m-4-3h4" />
                            </svg>
                          </div>
                          <div className="text-center space-y-1">
                            <h3 className="text-white font-extrabold text-lg tracking-tight">Data Flash</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Migration Engine</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right 3 blocks — absolute */}
                    {[
                      { name: 'AWS', top: 50, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" /></svg> },
                      { name: 'Databricks', top: 256, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> },
                      { name: 'Snowflake', top: 462, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                    ].map((item, i) => (
                      <div key={i} className="absolute right-[6%] w-[145px] z-10" style={{ top: item.top }}>
                        <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-[#DC2626]/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 justify-end group relative overflow-hidden">
                          <div className="absolute inset-y-0 right-0 w-0.5 bg-[#DC2626] opacity-0 group-hover:opacity-100 rounded-r-[12px] transition-opacity" />
                          <p className="text-white font-bold text-xs tracking-wide">{item.name}</p>
                          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">{item.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT: Header + Feature Grid — Data Flash */}
                  <div className="flex flex-col w-full h-full z-10 justify-center gap-6 px-8 py-10 lg:px-14 lg:py-12">

                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                        <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">Data Flash · Migration Engine</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                        Move any data,<br />to anywhere, instantly.
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                        Schema-aware, zero-downtime migration across any source and destination — configured, not coded.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 border-y border-slate-200 py-4">
                      {[
                        { value: '100+', label: 'Connectors' },
                        { value: '<2h', label: 'Avg. migration time' },
                        { value: '99.9%', label: 'Data fidelity SLA' },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-xl font-bold text-[#1B2340] tracking-tight">{s.value}</span>
                          <span className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Schema Mapping', desc: 'Auto-detect & transform', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
                        { title: 'Live CDC Sync', desc: 'Real-time replication', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
                        { title: 'Data Validation', desc: 'Row-level integrity checks', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                        { title: 'Zero Downtime', desc: 'Hot-swap migrations', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 hover:border-[#DC2626]/20 hover:shadow-sm transition-all duration-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#DC2626]/8 text-[#DC2626] flex items-center justify-center border border-[#DC2626]/10">{f.icon}</div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{f.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>

              {/* --- AGENT FACTORY SUB-SECTION --- */}
              <div className="sticky w-full overflow-hidden top-[4rem] z-20 bg-white border-y border-slate-200 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.08)] h-auto min-h-[720px] flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-0 items-stretch relative w-full max-w-[90rem] mx-auto">

                  {/* LEFT: Header + Feature Grid — Agent Factory */}
                  <div className="flex flex-col w-full h-full z-10 justify-center gap-6 px-8 py-10 lg:px-14 lg:py-12">

                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Agent Factory · AI Engine</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                        Build agents<br />at enterprise scale.
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                        Pre-wired automation blueprints for CRM, media, KPI and OT — deploy in hours, not quarters.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 border-y border-slate-200 py-4">
                      {[
                        { value: '4+', label: 'Automation domains' },
                        { value: '<4h', label: 'Avg. deployment time' },
                        { value: '10×', label: 'Faster than custom builds' },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-xl font-bold text-[#1B2340] tracking-tight">{s.value}</span>
                          <span className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'CRM Automation', desc: 'Lead scoring & routing', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                        { title: 'Media Automation', desc: 'Content pipeline orchestration', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg> },
                        { title: 'KPI Automation', desc: 'Real-time alerting & reports', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
                        { title: 'OT Automation', desc: 'Sensor & device integration', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg> },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-400/30 hover:shadow-sm transition-all duration-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/8 text-blue-600 flex items-center justify-center border border-blue-600/10">{f.icon}</div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{f.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* RIGHT: 4-directional Hub Diagram */}
                  <div className="relative w-full h-[640px] bg-[#1B2340] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 520" preserveAspectRatio="none">
                      <defs>
                        <style>{`
                      @keyframes af-pulse {
                            0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0}
                          }
                      .af-top   { animation: af-pulse 1.5s infinite ease-in-out 0s;    offset-path: path('M 300 180 L 300 60'); }
                      .af-bottom{ animation: af-pulse 1.5s infinite ease-in-out 0.37s; offset-path: path('M 300 340 L 300 460'); }
                      .af-left-1  { animation: af-pulse 1.5s infinite ease-in-out 0.75s; offset-path: path('M 240 260 L 150 260'); }
                      .af-left-2  { animation: af-pulse 1.5s infinite ease-in-out 1.5s;  offset-path: path('M 240 260 L 150 260'); }
                      .af-right-1 { animation: af-pulse 1.5s infinite ease-in-out 1.12s; offset-path: path('M 360 260 L 450 260'); }
                      .af-right-2 { animation: af-pulse 1.5s infinite ease-in-out 1.87s; offset-path: path('M 360 260 L 450 260'); }
                        `}</style>
                        <filter id="af-glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      {/* Paths */}
                      <path d="M 300 180 L 300 60" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 300 340 L 300 460" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 240 260 L 150 260" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 360 260 L 450 260" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      {/* Pulse dots */}
                      {['af-top', 'af-bottom', 'af-left-1', 'af-left-2', 'af-right-1', 'af-right-2'].map(cls => (
                        <g key={cls} className={cls} filter="url(#af-glow)">
                          <circle cx="0" cy="0" r="4" fill="#2563EB" />
                          <circle cx="0" cy="0" r="8" fill="none" stroke="#2563EB" strokeOpacity="0.4" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>

                    {/* Top block — CRM */}
                    <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[185px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">CRM Automation</p>
                      </div>
                    </div>

                    {/* Bottom block — Media */}
                    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[185px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">Media Automation</p>
                      </div>
                    </div>

                    {/* Left block — KPI */}
                    <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[200px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">KPI Automation</p>
                      </div>
                    </div>

                    {/* Right block — OT */}
                    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[200px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">OT Automation</p>
                      </div>
                    </div>

                    {/* Center — Agent Factory card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] z-20">
                      <div className="bg-[#1B2340] border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-600/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                          </div>
                          <div className="text-center space-y-1">
                            <h3 className="text-white font-extrabold text-lg tracking-tight">Agent Factory</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Core Engine</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sticky Sidebar with Scrolling Cards Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gradient-to-b from-[#F5F5F5] to-[#EBEBEB] relative">
          <div className="max-w-[90rem] mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

              {/* Left Sticky Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 pt-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                  <span>Scroll to explore</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: 'PRE-BUILT APPLICATIONS', id: 'prebuilt' },
                    { label: 'APPLICATION ACCELERATORS', id: 'accelerators' },
                    { label: 'TAILORED APPLICATIONS', id: 'tailored' },
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToSection(tab.id)}
                      className={`w-full px-5 py-4 rounded-[14px] font-bold text-[11px] tracking-wider transition-all duration-300 text-left ${activeTab === tab.id
                        ? 'bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white shadow-lg'
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
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight">
                    Use purpose-built agentic AI applications
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                    We solve the most urgent industry and enterprise challenges with regulation-approved applications.
                  </p>
                </div>

                {/* 6 Cards in a 2-Column Grid */}
                <div className="grid sm:grid-cols-2 gap-6 relative pb-24">
                  {[
                    {
                      id: 'prebuilt',
                      title: 'Banking AI ',
                      titleHighlight: 'Agents',
                      desc: 'Automate complex financial workflows with pre-trained agents for fraud detection and customer support.',
                      buttons: ['EXPLORE BANKING', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'Hi Olivia, I see you recently filed a fraud claim for $250. Are you contacting us about this?' },
                        { type: 'user', text: 'Yes, that\'s right. But I can\'t use my debit card.' }
                      ]
                    },
                    {
                      id: 'prebuilt',
                      title: 'Healthcare AI ',
                      titleHighlight: 'Agents',
                      desc: 'HIPAA-compliant agents designed for patient triaging, appointment scheduling, and automated verification.',
                      buttons: ['EXPLORE HEALTH', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'Is the claim for yourself or another person under your plan?' },
                        { type: 'user', text: 'For myself' },
                        { type: 'ai', text: 'Understood. I have pulled up your policy details. One moment...' }
                      ]
                    },
                    {
                      id: 'accelerators',
                      title: 'Knowledge ',
                      titleHighlight: 'Accelerator',
                      desc: 'Instantly ingest entire document repositories and transform them into searchable intelligence for your teams.',
                      buttons: ['TRY ACCELERATOR', 'DOCS'],
                      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop']
                    },
                    {
                      id: 'accelerators',
                      title: 'Telecom AI ',
                      titleHighlight: 'Agents',
                      desc: 'Scale your customer service with intelligent agents that handle plan upgrades, technical support, and billing queries.',
                      buttons: ['TELECOM SOLUTIONS', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'I see you\'re looking to upgrade your plan. Would you like to see our latest 5G options?' },
                        { type: 'user', text: 'Yes, what\'s the best value for 3 lines?' }
                      ]
                    },
                    {
                      id: 'tailored',
                      title: 'Enterprise HR ',
                      titleHighlight: 'Solution',
                      desc: 'A bespoke AI agent fully integrated with your HR systems. Handles onboarding and benefits with complete privacy.',
                      buttons: ['HR SOLUTIONS', 'CASE STUDY'],
                      images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop']
                    },
                    {
                      id: 'tailored',
                      title: 'Custom Retail ',
                      titleHighlight: 'Intelligence',
                      desc: 'Deeply integrated retail agents that manage inventory and personalized shopping experiences.',
                      buttons: ['RETAIL AI', 'PORTFOLIO'],
                      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop']
                    }
                  ].map((card, i) => (
                    <div
                      key={i}
                      id={`purpose-card-${i}`}
                      data-section-id={card.id}
                      className="flex flex-col gap-6 rounded-[1.5rem] bg-white/90 backdrop-blur-sm border border-white/60 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 scroll-m-32 h-full"
                    >
                      {/* Card Content (Top) */}
                      <div className="flex flex-col space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-medium text-foreground">
                            {card.title}
                            <span className="text-[#DC2626]">{card.titleHighlight}</span>
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-[14px]">
                            {card.desc}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {card.buttons.map((btn, j) => (
                            <button
                              key={j}
                              className={`px-4 py-2 rounded-lg font-bold text-[10px] tracking-widest transition-all border ${j === 0
                                ? 'bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white border-transparent hover:opacity-90'
                                : 'bg-transparent text-foreground border-[#DC2626]/30 hover:border-[#DC2626]'
                                }`}
                            >
                              {btn} {j === 0 && <span className="ml-1 opacity-50">•</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Card Images */}
                      {card.images && card.images.length > 0 && (
                        <div className="flex gap-4 pt-2">
                          {card.images.map((img, j) => (
                            <div key={j} className="flex-1 rounded-2xl overflow-hidden shadow-sm relative min-h-[140px] border border-border/40">
                              <img
                                src={img}
                                alt="Feature"
                                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Card Conversations (Bottom - if exists) */}
                      {card.conversations && card.conversations.length > 0 && (
                        <div className="mt-auto flex-1 space-y-4 relative bg-muted/30 rounded-2xl p-4 border border-border/40 min-h-[160px]">
                          {/* Faded bottom overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none z-10 rounded-b-2xl" />

                          {card.conversations.map((msg, j) => (
                            <div key={j} className={`flex gap-2 items-start ${msg.type === 'user' ? 'justify-end' : ''}`}>
                              {msg.type === 'ai' && (
                                <div className="w-4 h-4 rounded-full border-[3px] border-[#DC2626]/40 flex-shrink-0 mt-1" />
                              )}

                              <div className={`text-[11px] leading-relaxed px-3 py-2 rounded-2xl max-w-[90%] shadow-sm ${msg.type === 'user'
                                ? 'bg-white border border-border/30 text-foreground font-medium rounded-tr-sm'
                                : 'bg-transparent text-muted-foreground'
                                }`}>
                                {msg.text}
                              </div>

                              {msg.type === 'user' && (
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-border mt-1">
                                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Industry Solutions Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-background">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-8">
                <div
                  id="industry-header"
                  data-animate
                  className={`space-y-4 ${animatedElements['industry-header'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                >
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
                    We&apos;ve built our business by serving global enterprises
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Trust us, we&apos;ve learned from the best.
                  </p>
                </div>

                <div
                  id="industry-text"
                  data-animate
                  className={`text-muted-foreground leading-relaxed ${animatedElements['industry-text'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '150ms' }}
                >
                  <p>Discover why hundreds of enterprises use our platform.</p>
                </div>

                <div
                  id="industry-cta"
                  data-animate
                  className={`flex gap-4 flex-wrap ${animatedElements['industry-cta'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '300ms' }}
                >
                  <button className="px-6 py-3 bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95">
                    REQUEST A DEMO
                  </button>
                  <button className="px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-[#DC2626] hover:text-[#DC2626] transition-all hover:scale-105 active:scale-95">
                    LET&apos;S TALK
                  </button>
                </div>
              </div>

              {/* Right Content - Tabbed Cards */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Tabs */}
                  <div
                    id="industry-tabs"
                    data-animate
                    className={`flex gap-3 flex-wrap ${animatedElements['industry-tabs'] ? 'animate-slide-right' : 'opacity-0'
                      }`}
                  >
                    {['Banking', 'Healthcare', 'Retail', 'Telecom + Media', 'Business'].map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndustryTab(tab.toLowerCase().replace(/\s/g, ''))}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activeIndustryTab === tab.toLowerCase().replace(/\s/g, '')
                          ? 'bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

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
                                <h3 className="text-3xl font-medium text-white leading-tight">
                                  {card.title}
                                </h3>
                              </div>

                              <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">
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

        {/* ── Customer Testimonials Carousel Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div
              id="testimonials-header"
              data-animate
              className={`flex items-start justify-between ${animatedElements['testimonials-header'] ? 'animate-slide-down' : 'opacity-0'
                }`}
            >
              <div className="space-y-2">
                <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight">
                  Customer testimonials
                </h2>
                <p className="text-lg text-muted-foreground">
                  Discover how organizations deliver AI value with our platform.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const carousel = document.getElementById('testimonials-carousel')
                    if (carousel) {
                      carousel.scrollBy({ left: -400, behavior: 'smooth' })
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const carousel = document.getElementById('testimonials-carousel')
                    if (carousel) {
                      carousel.scrollBy({ left: 400, behavior: 'smooth' })
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2340] via-[#2F1D2C] to-[#DC2626] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div
              id="testimonials-carousel"
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[
                {
                  company: 'Morgan Stanley',
                  quote: 'What I was really trying to solve was how to give 15-20 minutes back each day to our financial advisors. That extra time lets them reach out to customers more quickly, more effectively, or even make one additional phone call — and that\'s a real revenue driver for us.'
                },
                {
                  company: 'Pfizer',
                  quote: 'Since we started with our platform, we\'ve deployed 60 AI agents across the enterprise—covering research, development, medical, commercial, and manufacturing across global markets and multiple languages. We needed a scalable platform, and these agents will only continue to become more intelligent.'
                },
                {
                  company: 'Mphasis',
                  quote: 'We are proud to be a strategic implementation partner of our platform, and we feel especially confident knowing that the foundation on AWS, delivering unmatched reliability and scalability.'
                },
                {
                  company: 'Microsoft',
                  quote: 'Our strategic partnership marks a significant milestone in our mission to accelerate enterprise AI transformation. By integrating advanced conversational and GenAI capabilities with Microsoft\'s robust cloud and AI services, we are enabling enterprises to adopt AI at scale and with enterprise-grade security.'
                },
                {
                  company: 'AMD',
                  quote: 'In the moments that matter most, of course, employees want to connect with people. Overall, our employees want to engage with the employees they serve and be present in the interactions that deliver higher satisfaction.'
                },
                {
                  company: 'AWS',
                  quote: 'We are excited to collaborate on shared cloud initiatives and customer solutions. The partnership demonstrates our commitment to providing enterprise customers with the best-in-class AI and cloud solutions.'
                }
              ].map((testimonial, i) => (
                <div
                  key={i}
                  id={`testimonial-card-${i}`}
                  data-animate
                  className={`flex-shrink-0 w-80 rounded-2xl bg-white border border-slate-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 snap-start ${animatedElements[`testimonial-card-${i}`] ? 'animate-scale-block' : 'opacity-0'
                    }`}
                  style={{ animationDelay: `${200 + (i % 3) * 100}ms` }}
                >
                  {/* Company Name */}
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {testimonial.company}
                  </h3>

                  {/* Quote */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div
              id="testimonials-cta"
              data-animate
              className={`${animatedElements['testimonials-cta'] ? 'animate-slide-up' : 'opacity-0'
                }`}
            >
              {/* <button className="px-6 py-3 bg-foreground text-primary-foreground font-semibold rounded-lg hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                MORE CUSTOMER STORIES →
              </button> */}
            </div>
          </div>
        </section>

        {/* ── Process Section: From Idea to Experience ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Profile & Quote */}
              <div className="space-y-8">
                <div
                  id="process-header"
                  data-animate
                  className={`${animatedElements['process-header'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#DC2626]" />
                    <span className="text-sm font-semibold text-[#DC2626]">Structured Design Process</span>
                  </div>
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
                    From Idea to Experience
                  </h2>
                </div>

                <div
                  id="process-description"
                  data-animate
                  className={`space-y-6 ${animatedElements['process-description'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '100ms' }}
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Each phase focused on clarity over speed — shaping the experience step by step, from intent to a quiet daily experience.
                  </p>

                  {/* Profile with Quote */}
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="flex gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B2340]/15 to-[#DC2626]/10 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground"> Bennett</p>
                        <p className="text-sm text-muted-foreground">Founder of Design Co.</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      "Andrew immediately understood the kind of calm, focused experience we wanted. Our platform feels exactly like the companion our users need."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Process Steps */}
              <div
                id="process-steps"
                data-animate
                className={`space-y-8 ${animatedElements['process-steps'] ? 'animate-slide-right' : 'opacity-0'
                  }`}
              >
                {[
                  {
                    number: '1',
                    title: 'Discovery',
                    icon: '🔍',
                    tags: ['Problem definition', 'User intent']
                  },
                  {
                    number: '2',
                    title: 'Experience Structure',
                    icon: '◉',
                    tags: ['Content flow', 'Daily prompts logic']
                  },
                  {
                    number: '3',
                    title: 'Interface Design',
                    icon: '🛠',
                    tags: ['Visual language', 'UI components']
                  },
                  {
                    number: '4',
                    title: 'Develop in Framer',
                    icon: '⚙',
                    tags: ['Responsive layout', 'Interactions']
                  }
                ].map((step, i) => (
                  <div
                    key={i}
                    id={`process-step-${i}`}
                    data-animate
                    className={`relative pl-12 pb-8 border-l-2 border-[#1B2340]/20 hover:border-[#1B2340] transition-all duration-300 ${animatedElements[`process-step-${i}`] ? 'animate-slide-right' : 'opacity-0'
                      }`}
                    style={{ animationDelay: `${200 + i * 100}ms` }}
                  >
                    {/* Step number circle */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center transform -translate-x-3.5 shadow-md">
                      {step.number}
                    </div>

                    {/* Step content */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#1B2340]/30 transition-all duration-300 shadow-sm">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {step.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-xs font-medium text-[#DC2626] bg-[#DC2626]/10 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
