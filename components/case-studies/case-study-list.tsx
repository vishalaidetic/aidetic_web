'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, ChevronRight, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Featured Card (matches the QuickReply reference) ─────────
function FeaturedCard({ study, content }: { study: any; content: any }) {
  const colors = ['#DC2626', '#2563EB', '#0891B2', '#059669', '#DC2626', '#D97706']
  const accentColor = colors[(study.company_name?.charCodeAt(0) ?? 0) % colors.length]

  return (
    <Link href={`/case-studies/${study.slug}`} className="block">
      <div className="group relative w-full rounded-[2rem] overflow-hidden border border-[#DC2626]/10 shadow-sm hover:shadow-xl hover:shadow-[#DC2626]/10 hover:border-[#DC2626]/25 transition-all duration-500 grid grid-cols-1 md:grid-cols-[4fr_6fr] min-h-[340px]">

        {/* ── LEFT: HeroCard preview ── */}
        <div className="relative overflow-hidden min-h-[300px] md:min-h-0 flex flex-col justify-between p-9 sm:p-11">
          {/* Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fcf2e3 0%, #fde2f3 45%, #e6e2fd 100%)' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.10)_0%,_transparent_60%)]" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

          {/* Top row: logo and tag */}
          <div className="relative z-10 flex items-start justify-between">
            {study.company_logo ? (
              <div className="w-8 h-8 rounded-[8px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {(study.company_name ?? 'C').charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className="inline-flex items-center px-3 py-1 bg-white/60 backdrop-blur-sm border border-[#DC2626]/20 text-[#DC2626] text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0 shadow-sm">
              <Star size={12} className="mr-1.5 fill-[#DC2626]/20" />
              {content?.labels?.featured || 'Featured'}
            </div>
          </div>

          {/* Bottom: metrics and subtitle */}
          <div className="relative z-10 mt-auto">
            {study.metrics && study.metrics.length > 0 && (
              <div className="mb-4">
                <div className="text-4xl md:text-[2.75rem] font-bold text-[#DC2626] tracking-tight leading-none mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.metrics[0].metric_value}
                </div>
                <div className="text-[13px] font-semibold text-[#1B2340] max-w-[200px] leading-snug" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.metrics[0].metric_label}
                </div>
              </div>
            )}
            
            <p className={cn("text-[15px] text-[#1B2340] leading-relaxed max-w-xs", study.metrics && study.metrics.length > 1 ? "mb-4" : "")} style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.subtitle || study.title}
            </p>
            
            {study.metrics && study.metrics.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {study.metrics.slice(1).map((m: any, i: number) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 backdrop-blur-sm border border-[#DC2626]/10 rounded-full text-[12px] shadow-sm">
                    <span className="font-bold text-[#DC2626]">{m.metric_value}</span>
                    <span className="text-[#64748b]">{m.metric_label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Featured story details ── */}
        <div className="relative bg-white flex flex-col justify-between p-9 sm:p-11 border-t md:border-t-0 md:border-l border-slate-100">
          {/* Header: company info + arrow */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              {study.company_logo ? (
                <div className="w-7 h-7 rounded-[6px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                  <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div
                  className="w-7 h-7 rounded-[6px] flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: accentColor }}
                >
                  {(study.company_name ?? 'C').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-[15px] font-semibold text-[#1a1040]" style={{ fontFamily: 'var(--font-inter)' }}>{study.company_name}</span>
              {(study.industry || study.tag_type) && (
                <>
                  <span className="text-slate-300 select-none">·</span>
                  <span className="text-[12px] text-[#78829d]" style={{ fontFamily: 'var(--font-inter)' }}>
                    {study.industry || study.tag_type}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-2xl font-bold leading-tight tracking-wide text-[#1B2340] mb-4 group-hover:text-[#DC2626] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
            {study.title}
          </h2>

          {/* Description / subtitle */}
          {(study.description || study.subtitle) && (
            <p className="text-base text-[#1B2340] leading-relaxed mb-5 line-clamp-3" style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.description || study.subtitle}
            </p>
          )}

          {/* Highlight pills */}
          {study.highlights && study.highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {study.highlights.map((h: any, i: number) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DC2626]/5 border border-[#DC2626]/10 rounded-full text-[12px]"
                >
                  {h.title && <span className="font-bold text-[#DC2626]">{h.title}</span>}
                  {h.description && <span className="text-[#64748b]">{h.description}</span>}
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-slate-100">
            {/* Metrics row */}
            {study.metrics && study.metrics.length > 0 && (
              <div className={cn("grid grid-cols-3 gap-4", study.testimonial?.quote ? "mb-6" : "")}>
                {study.metrics.slice(0, 3).map((m: any, i: number) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-bold text-[#1B2340] leading-none mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                      {m.metric_value}
                    </div>
                    <div className="text-[12px] text-[#64748b] leading-snug" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {m.metric_label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonial */}
            {study.testimonial?.quote && (
              <div className={cn("flex items-start gap-3", study.metrics && study.metrics.length > 0 ? "pt-5 border-t border-slate-100/60" : "")}>
                <div className="text-[#c4b5fd] text-2xl leading-none font-serif mt-[-4px]">&ldquo;</div>
                <div>
                  <p className="text-[13px] text-[#1B2340] italic leading-snug mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    "{study.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    {study.testimonial.avatar_url && (
                      <img src={study.testimonial.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
                    )}
                    <span className="text-[11px] font-semibold text-[#1B2340]">{study.testimonial.person_name}</span>
                    {study.testimonial.designation && (
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">· {study.testimonial.designation}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[#DC2626] font-bold text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>
              <span>{content?.labels?.read_more || 'See Full Story'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Regular Card ──────────────────────────────────────────────
function StudyCard({ study, content }: { study: any; content: any }) {
  const colors = ['#DC2626', '#2563EB', '#0891B2', '#059669', '#DC2626', '#D97706']
  const accentColor = colors[(study.company_name?.charCodeAt(0) ?? 0) % colors.length]

  return (
    <Link href={`/case-studies/${study.slug}`} className="group block h-full">
      <div className="relative h-full flex flex-col sm:flex-row rounded-[1.5rem] border border-slate-200/80 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:border-[#DC2626]/20 transition-all duration-300">

        {/* ── LEFT: Gradient Pane ── */}
        <div className="relative w-full sm:w-[40%] min-h-[240px] sm:h-auto shrink-0 overflow-hidden flex flex-col justify-between p-7 border-b sm:border-b-0 sm:border-r border-slate-100">
          {/* Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fcf2e3 0%, #fde2f3 45%, #e6e2fd 100%)' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.10)_0%,_transparent_60%)]" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

          {/* Top row: logo only */}
          <div className="relative z-10 flex items-center">
            {study.company_logo ? (
              <div className="w-8 h-8 rounded-[8px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {(study.company_name ?? 'C').charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Bottom: metrics and subtitle */}
          <div className="relative z-10 mt-auto pt-8">
            {study.metrics && study.metrics.length > 0 && (
              <div className="mb-4">
                <div className="text-3xl font-bold text-[#DC2626] tracking-tight leading-none mb-1.5" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.metrics[0].metric_value}
                </div>
                <div className="text-[12px] font-medium text-[#1B2340] max-w-[180px] leading-snug" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.metrics[0].metric_label}
                </div>
              </div>
            )}
            
            <p className={cn("text-[14px] text-[#1B2340] leading-relaxed max-w-[200px]", study.metrics && study.metrics.length > 1 ? "mb-4" : "")} style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.subtitle || study.title}
            </p>
            
            {study.metrics && study.metrics.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {study.metrics.slice(1).map((m: any, i: number) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[#DC2626]/10 rounded-full text-[11px] shadow-sm">
                    <span className="font-bold text-[#DC2626]">{m.metric_value}</span>
                    <span className="text-[#64748b]">{m.metric_label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            {study.company_logo ? (
              <div className="w-6 h-6 rounded-[4px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div
                className="w-6 h-6 rounded-[4px] flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {(study.company_name ?? 'C').charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-[14px] font-semibold text-[#1a1040]" style={{ fontFamily: 'var(--font-inter)' }}>{study.company_name}</span>
            {(study.industry || study.tag_type) && (
              <>
                <span className="text-slate-300 select-none">·</span>
                <span className="text-[11px] text-[#78829d]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.industry || study.tag_type}
                </span>
              </>
            )}
          </div>
          
          <h3 className="text-[1.25rem] font-bold text-[#1B2340] leading-snug mb-3 group-hover:text-[#DC2626] transition-colors tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {study.title}
          </h3>

          {(study.subtitle || study.description) && (
            <p className="text-[14px] text-[#64748b] line-clamp-2 mb-6 flex-1 leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.subtitle || study.description}
            </p>
          )}

          <div className="mt-auto">
            {/* Mini metrics */}
            {study.metrics && study.metrics.length > 0 && (
              <div className={cn("flex items-start gap-8", study.testimonial?.quote ? "mb-5" : "mb-6")}>
                {study.metrics.slice(0, 3).map((m: any, i: number) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-[#1B2340] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{m.metric_value}</div>
                    <div className="text-[11px] text-[#94a3b8] leading-tight max-w-[100px]" style={{ fontFamily: 'var(--font-quicksand)' }}>{m.metric_label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonial */}
            {study.testimonial?.quote && (
              <div className="flex items-start gap-2.5 mb-5 pt-4 border-t border-slate-50">
                <div className="text-[#c4b5fd] text-xl leading-none font-serif mt-[-2px]">&ldquo;</div>
                <div>
                  <p className="text-[12px] text-[#1B2340] italic leading-snug mb-1.5 line-clamp-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    "{study.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-1.5">
                    {study.testimonial.avatar_url && (
                      <img src={study.testimonial.avatar_url} alt="" className="w-4 h-4 rounded-full object-cover" />
                    )}
                    <span className="text-[10px] font-semibold text-[#1B2340] truncate max-w-[100px]">{study.testimonial.person_name}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-[#DC2626] font-bold text-[14px]" style={{ fontFamily: 'var(--font-inter)' }}>
              <span>{content?.labels?.read_more || 'See Full Story'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main List ─────────────────────────────────────────────────
export function CaseStudyList({ caseStudies, content }: { caseStudies: any[], content: any }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(10)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setVisibleCount(10)
  }, [selectedTag])

  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 10)
      }
    }, {
      rootMargin: "200px"
    })

    if (node) {
      observerRef.current.observe(node)
    }
  }, [])

  const uniqueTags = Array.from(new Set(caseStudies.map((s: any) => s.tag_type).filter(Boolean)))
  const tags = [content?.labels?.all_studies || 'All Studies', ...uniqueTags]

  const featuredStudies = caseStudies.filter((s: any) => s.is_featured).slice(0, 4)

  let filteredStudies = selectedTag === null || selectedTag === (content?.labels?.all_studies || 'All Studies')
    ? caseStudies
    : caseStudies.filter((s: any) => s.tag_type === selectedTag)

  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase()
    filteredStudies = filteredStudies.filter((s: any) =>
      s.title.toLowerCase().includes(q) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.company_name && s.company_name.toLowerCase().includes(q))
    )
  }

  const regularStudies = filteredStudies.filter((s: any) => !featuredStudies.find((fs: any) => fs.id === s.id))
  const displayedRest = regularStudies.slice(0, visibleCount)

  return (
    <div className="flex flex-col gap-12 w-full px-4 sm:px-6 lg:px-8 pb-16 mx-auto max-w-7xl">

      {/* Featured Section */}
      {featuredStudies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-[calc(100vw-2rem)] lg:w-[calc(100vw-4rem)] relative left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#DC2626]/[0.06] via-[#DC2626]/[0.04] to-[#DC2626]/[0.08] border border-[#DC2626]/10 rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-sm mb-12"
        >
          <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 relative z-10 flex flex-col gap-8">
            {featuredStudies.map((study: any) => (
              <FeaturedCard key={study.id} study={study} content={content} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Tag Filters and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {tags.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 w-full md:w-auto"
          >
            {tags.map((tag: any, idx: number) => {
              const isActive = (selectedTag === tag) || (selectedTag === null && tag === (content?.labels?.all_studies || 'All Studies'))
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTag(tag === (content?.labels?.all_studies || 'All Studies') ? null : tag)}
                  className={cn(
                    "whitespace-nowrap px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border",
                    isActive
                      ? "bg-[#DC2626] border-[#DC2626] text-white shadow-md shadow-[#DC2626]/20"
                      : "bg-white border-[#DC2626]/20 text-[#64748d] hover:border-[#DC2626]/50 hover:text-[#DC2626]"
                  )}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {tag}
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className={cn("w-full md:w-80 relative", tags.length <= 1 ? "ml-auto" : "")}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748d] w-4 h-4" />
            <input
              type="text"
              placeholder={content?.labels?.search_placeholder || "Search case studies..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all text-[15px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Grid List */}
      {regularStudies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          {displayedRest.map((study: any) => (
            <StudyCard key={study.id} study={study} content={content} />
          ))}

          {/* Intersection Observer Target */}
          {visibleCount < regularStudies.length && (
            <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center mt-8">
              <div className="w-5 h-5 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin" />
            </div>
          )}
        </motion.div>
      )}

      {/* Empty States */}
      {caseStudies.length === 0 ? (
        <div className="text-center py-24 bg-[#f8fafc] rounded-2xl border border-slate-200">
          <Briefcase className="mx-auto h-12 w-12 text-[#64748d] mb-4 opacity-40" />
          <h2 className="text-xl font-bold text-[#1B2340] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{content?.empty_state?.heading || 'No Case Studies Yet'}</h2>
          <p className="text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>{content?.empty_state?.subheading || 'Check back soon for our latest success stories.'}</p>
        </div>
      ) : filteredStudies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#64748d] text-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>No case studies found.</p>
        </div>
      )}
    </div>
  )
}
