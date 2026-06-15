'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Briefcase, ChevronRight, Search } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatting'

// ─── Featured Card (matches the QuickReply reference) ─────────
function FeaturedCard({ study, content }: { study: any; content: any }) {
  const colors = ['#533afd', '#2563EB', '#0891B2', '#059669', '#DC2626', '#D97706']
  const accentColor = colors[(study.company_name?.charCodeAt(0) ?? 0) % colors.length]

  return (
    <Link href={`/case-studies/${study.slug}`} className="block mb-14">
      <div className="group relative w-full rounded-[2rem] overflow-hidden border border-[#533afd]/10 shadow-sm hover:shadow-xl hover:shadow-[#533afd]/10 hover:border-[#533afd]/25 transition-all duration-500 grid grid-cols-1 md:grid-cols-2 min-h-[340px]">

        {/* ── LEFT: HeroCard preview ── */}
        <div className="relative overflow-hidden min-h-[300px] md:min-h-0 flex flex-col justify-between p-9 sm:p-11">
          {/* Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fcf2e3 0%, #fde2f3 45%, #e6e2fd 100%)' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(83,58,253,0.10)_0%,_transparent_60%)]" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(83,58,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(83,58,253,0.04) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

          {/* Top row: logo + industry */}
          <div className="relative z-10 flex items-center gap-4">
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
            <span className="text-[14px] font-semibold text-[#1a1040]" style={{ fontFamily: 'var(--font-inter)' }}>{study.company_name}</span>
            {(study.industry || study.tag_type) && (
              <>
                <span className="text-[#533afd]/20 select-none">|</span>
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#78829d]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.industry || study.tag_type}
                </span>
              </>
            )}
          </div>

          {/* Bottom: subtitle/title */}
          <div className="relative z-10 mt-auto">
            <p className="text-2xl sm:text-[1.75rem] font-medium text-[#0f172a] leading-tight tracking-tight max-w-xs" style={{ fontFamily: 'var(--font-inter)' }}>
              {study.subtitle || study.title}
            </p>
          </div>
        </div>

        {/* ── RIGHT: Featured story details ── */}
        <div className="relative bg-white flex flex-col justify-between p-9 sm:p-11 border-t md:border-t-0 md:border-l border-slate-100">
          {/* Header: label + arrow */}
          <div className="flex items-start justify-between mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#533afd]">
              Featured Story
            </span>
            <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#533afd] group-hover:border-[#533afd] group-hover:text-white transition-all duration-300 shrink-0">
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug mb-4 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {study.title}
          </h2>

          {/* Description / subtitle */}
          {(study.description || study.subtitle) && (
            <p className="text-[14px] text-[#64748b] leading-relaxed mb-5 line-clamp-3" style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.description || study.subtitle}
            </p>
          )}

          {/* Highlight pills */}
          {study.highlights && study.highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {study.highlights.map((h: any, i: number) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#533afd]/5 border border-[#533afd]/10 rounded-full text-[12px]"
                >
                  {h.title && <span className="font-bold text-[#533afd]">{h.title}</span>}
                  {h.description && <span className="text-[#64748b]">{h.description}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Metrics row */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {study.metrics.slice(0, 3).map((m: any, i: number) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-bold text-[#0f172a] leading-none mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    {m.metric_value}
                  </div>
                  <div className="text-[12px] text-[#64748b] leading-snug" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    {m.metric_label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Regular Card ──────────────────────────────────────────────
function StudyCard({ study, content }: { study: any; content: any }) {
  const colors = ['#533afd', '#2563EB', '#0891B2', '#059669', '#ea2261', '#D97706']
  const accentColor = colors[(study.company_name?.charCodeAt(0) ?? 0) % colors.length]

  return (
    <Link href={`/case-studies/${study.slug}`} className="group h-full flex flex-col">
      <div className="relative h-full flex flex-col rounded-[1.5rem] border border-slate-200/80 overflow-hidden bg-white shadow-sm hover:shadow-xl hover:border-[#533afd]/20 transition-all duration-300">

        {/* Card image or gradient header */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          {study.featured_image ? (
            <>
              <img src={study.featured_image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)` }}>
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(rgba(83,58,253,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(83,58,253,0.06) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
            </div>
          )}

          {/* Company pill top-left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {study.company_logo ? (
              <div className="w-7 h-7 rounded-lg bg-white shadow border border-slate-100 flex items-center justify-center p-0.5 overflow-hidden">
                <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow" style={{ backgroundColor: accentColor }}>
                {(study.company_name ?? 'C').charAt(0).toUpperCase()}
              </div>
            )}
            {study.tag_type && (
              <span className="px-2.5 py-1 bg-white/85 backdrop-blur-sm border border-white/40 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600 rounded-full shadow-sm">
                {study.tag_type}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-[1.1rem] font-semibold text-[#0f172a] leading-snug mb-2 group-hover:text-[#533afd] transition-colors tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {study.title}
          </h3>

          {(study.subtitle || study.description) && (
            <p className="text-[13px] text-[#64748b] line-clamp-2 mb-5 flex-1 leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
              {study.subtitle || study.description}
            </p>
          )}

          {/* Mini metrics */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="flex items-center gap-4 mb-5">
              {study.metrics.slice(0, 2).map((m: any, i: number) => (
                <div key={i}>
                  <div className="text-lg font-bold text-[#533afd]" style={{ fontFamily: 'var(--font-inter)' }}>{m.metric_value}</div>
                  <div className="text-[11px] text-[#94a3b8]" style={{ fontFamily: 'var(--font-quicksand)' }}>{m.metric_label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[#533afd] font-semibold text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>
            <span>{content?.labels?.read_more || 'Read Case Study'}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main List ─────────────────────────────────────────────────
export function CaseStudyList({ caseStudies, content }: { caseStudies: any[], content: any }) {
  const [searchTerm, setSearchTerm] = useState('')

  let filteredStudies = caseStudies
  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase()
    filteredStudies = filteredStudies.filter((s: any) =>
      s.title.toLowerCase().includes(q) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.tag_type && s.tag_type.toLowerCase().includes(q)) ||
      (s.company_name && s.company_name.toLowerCase().includes(q))
    )
  }

  // Split featured vs rest
  const featured = filteredStudies.find((s: any) => s.is_featured) ?? filteredStudies[0]
  const rest = filteredStudies.filter((s: any) => s.id !== featured?.id)

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 mx-auto max-w-7xl">

      {/* Search Bar */}
      <div className="mb-10 flex justify-end">
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748d] w-4 h-4" />
          <input
            type="text"
            placeholder={content?.labels?.search_placeholder || 'Search case studies...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#533afd] focus:ring-1 focus:ring-[#533afd]/30 transition-all text-[15px] bg-white"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>
      </div>

      {/* Empty states */}
      {caseStudies.length === 0 ? (
        <div className="text-center py-24 bg-[#f8fafc] rounded-2xl border border-slate-200">
          <Briefcase className="mx-auto h-12 w-12 text-[#64748d] mb-4 opacity-40" />
          <h2 className="text-xl font-bold text-[#0d253d] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{content?.empty_state?.heading || 'No Case Studies Yet'}</h2>
          <p className="text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>{content?.empty_state?.subheading || 'Check back soon for our latest success stories.'}</p>
        </div>
      ) : filteredStudies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#64748d] text-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>No case studies found for &ldquo;{searchTerm}&rdquo;.</p>
        </div>
      ) : (
        <>
          {/* Featured card */}
          {featured && <FeaturedCard study={featured} content={content} />}

          {/* Rest grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((study: any) => (
                <StudyCard key={study.id} study={study} content={content} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
