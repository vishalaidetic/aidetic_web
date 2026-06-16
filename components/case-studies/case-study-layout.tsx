import { BlogContent } from '@/components/blog/blog-content'
import { Check } from 'lucide-react'
import Link from 'next/link'

// ─── Hero Card ───────────────────────────────────────────────
function HeroCard({ study }: { study: any }) {
  // Pick a consistent color from company name initial
  const colors = ['#7C3AED', '#2563EB', '#0891B2', '#059669', '#DC2626', '#D97706']
  const colorIdx = (study.company_name?.charCodeAt(0) ?? 0) % colors.length
  const accentColor = colors[colorIdx]

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden border border-[#533afd]/10 min-h-[380px] flex flex-col justify-between p-10 sm:p-12 shadow-sm shadow-[#533afd]/5 group transition-all duration-500 hover:shadow-lg hover:shadow-[#533afd]/10 hover:border-[#533afd]/20">

      {/* ── Background: Agent Factory Duo Gradient ── */}
      {/* Light base: cream-white to soft lavender (matches Agent Factory CTA) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fcf2e3 0%, #fde2f3 45%, #e6e2fd 100%)' }} />
      {/* Violet glow top-left */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(83,58,253,0.10)_0%,_transparent_60%)]" />
      {/* Pink glow bottom-right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(234,34,97,0.08)_0%,_transparent_60%)]" />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(83,58,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(83,58,253,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Bottom fade for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />

      {/* ── Top row: logo/avatar + name + badges ── */}
      <div className="relative z-10 flex flex-wrap items-center gap-3">
        {/* Company avatar */}
        {study.company_logo ? (
          <div className="w-9 h-9 rounded-[10px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1 overflow-hidden shrink-0">
            <img src={study.company_logo} alt={study.company_name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white text-[15px] font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {(study.company_name ?? 'C').charAt(0).toUpperCase()}
          </div>
        )}

        {/* Company name */}
        <span className="text-[15px] font-semibold text-[#1a1040] tracking-tight">{study.company_name}</span>

        {/* Divider */}
        {(study.industry || study.tag_type) && (
          <span className="text-[#533afd]/20 text-base select-none mx-1">|</span>
        )}

        {/* Industry / Tag Badges */}
        <div className="flex items-center gap-2">
          {study.industry && (
            <span className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-[#533afd]/15 text-[11px] font-bold uppercase tracking-[0.15em] text-[#533afd]/80 rounded-full">
              {study.industry}
            </span>
          )}
          {study.tag_type && (
            <span className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-[#ea2261]/15 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ea2261]/80 rounded-full">
              {study.tag_type}
            </span>
          )}
        </div>
      </div>

      {/* ── Large title at bottom ─────────────────────────── */}
      <div className="relative z-10 mt-auto pt-16">
        <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-medium text-[#0f172a] leading-[1.15] tracking-[-0.02em] max-w-2xl" style={{ fontFamily: 'var(--font-inter)' }}>
          {study.title}
        </h2>

        {/* ── Highlight & Metric Badges ── */}
        {((study.highlights && study.highlights.length > 0) || (study.metrics && study.metrics.length > 0)) && (
          <div className="flex flex-wrap items-center gap-3 mt-8">
            {/* Metric pills: bold value + label */}
            {study.metrics && study.metrics.map((m: any, idx: number) => (
              <div
                key={`metric-${idx}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/70 backdrop-blur-sm border border-[#533afd]/15 rounded-full text-[13px] shadow-sm"
              >
                <span className="font-bold text-[#533afd]">{m.metric_value}</span>
                <span className="text-[#64748b]">{m.metric_label}</span>
              </div>
            ))}
            {/* Highlight pills */}
            {study.highlights && study.highlights.map((highlight: any, idx: number) => (
              <div
                key={`hl-${idx}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/70 backdrop-blur-sm border border-[#ea2261]/15 rounded-full text-[13px] shadow-sm"
              >
                {highlight.title && <span className="font-bold text-[#ea2261]">{highlight.title}</span>}
                {highlight.description && <span className="text-[#64748b]">{highlight.description}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


// ─── Main Layout ─────────────────────────────────────────────
export function CaseStudyLayout({ study, relatedStudies }: { study: any; relatedStudies?: any[] }) {

  return (
    <div className="w-full bg-white text-slate-900 pb-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 space-y-0">

        {/* ── SECTION 1: Header ─────────────────────────────── */}
        <section className="mb-12">
          {/* Row 1: Logo + Company Name */}
          <div className="flex items-center gap-3 mb-2">
            {study.company_logo ? (
              <img src={study.company_logo} alt={study.company_name} className="h-6 object-contain" />
            ) : null}
            {study.company_name && (
              <span className="font-semibold text-slate-800 text-sm">{study.company_name}</span>
            )}
          </div>

          {/* Row 2: Industry + Category pill */}
          {(study.industry || study.tag_type) && (
            <div className="flex items-center gap-3 mb-8">
              {study.industry && (
                <span className="text-sm text-slate-500">{study.industry}</span>
              )}
              {study.industry && study.tag_type && (
                <span className="text-slate-300 text-sm">·</span>
              )}
              {study.tag_type && (
                <span className="inline-flex items-center px-3 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider rounded-full border border-slate-200">
                  {study.tag_type}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 
            className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] mb-6"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {study.title}
          </h1>

          {/* Subtitle */}
          {study.subtitle && (
            <p 
              className="text-base md:text-lg text-[#0d253d] leading-relaxed border-b border-slate-100 pb-10 mb-10"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              {study.subtitle}
            </p>
          )}

          {/* Hero Metrics Row */}
          {study.metrics?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pb-10 border-b border-slate-100 mb-10">
              {study.metrics.map((m: any, i: number) => (
                <div key={i}>
                  <div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#533afd] leading-none tracking-wide mb-3"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {m.metric_value}
                  </div>
                  {/* Dotted divider */}
                  <div className="flex justify-start mb-3">
                    <div className="w-12 h-0" style={{ borderTop: '2.5px dashed #22aed1' }} />
                  </div>
                  <div className="text-[#0d253d] text-sm leading-snug whitespace-pre-line px-1">
                    {m.metric_label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Hero Card ────────────────────────────────────── */}
        {(study.metrics?.length > 0 || study.subtitle) && (
          <section className="mb-20">
            <HeroCard study={study} />
          </section>
        )}

        {/* ── About / Markdown Content ─────────────────────── */}
        {study.content && (
          <section className="mb-20">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] mb-5"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(to right, #533afd, #000000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              About {study.company_name || 'the Company'}
            </h2>
            <div 
              className="prose prose-slate max-w-none prose-p:text-[#0d253d] prose-p:text-[15px] md:prose-p:text-base prose-p:leading-relaxed prose-headings:text-[#0d253d] prose-a:text-[#533afd]"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              <BlogContent content={study.content} />
            </div>
          </section>
        )}

        {/* ── THE PROBLEM ──────────────────────────────────── */}
        {study.problem && (study.problem.heading || study.problem.description || study.problem.cards?.length > 0) && (
          <section className="mb-24">
            <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm text-purple-700 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
              The Problem
            </div>

            {study.problem.heading && (
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] mb-4"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {study.problem.heading}
              </h2>
            )}

            {study.problem.description && (
              <p 
                className="text-[15px] md:text-base text-[#0d253d] mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {study.problem.description}
              </p>
            )}

            {study.problem.cards?.length > 0 && (
              <div className={`grid grid-cols-1 gap-5 ${study.problem.cards.length === 1 ? '' : study.problem.cards.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                {study.problem.cards.map((card: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200/70 rounded-[1.5rem] p-8 flex flex-col shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">

                    {/* Stat block */}
                    {card.stat && (
                      <div className="mb-5">
                        <div className="text-2xl sm:text-[1.75rem] font-bold text-purple-600 leading-none mb-1.5 tracking-tight">
                          {card.stat}
                        </div>
                        {card.stat_label && (
                          <div className="text-[13px] text-slate-500 leading-snug">
                            {card.stat_label}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Divider */}
                    {card.stat && <hr className="border-slate-200 mb-5" />}

                    {/* Card title */}
                    {card.title && (
                      <h3 className="text-[15px] font-bold text-slate-900 mb-4 leading-snug">
                        {card.title}
                      </h3>
                    )}

                    {/* Bullets */}
                    {card.bullets?.length > 0 && (
                      <ul className="space-y-2.5 flex-1">
                        {card.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-relaxed">
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── THE SOLUTION ─────────────────────────────────── */}
        {study.solution && (study.solution.heading || study.solution.description || study.solution.steps?.length > 0) && (
          <section className="mb-24">
            <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm text-purple-700 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
              The Solution
            </div>

            {study.solution.heading && (
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] mb-4"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {study.solution.heading}
              </h2>
            )}

            {study.solution.description && (
              <p 
                className="text-[15px] md:text-base text-[#0d253d] mb-10 leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {study.solution.description}
              </p>
            )}

            {study.solution.steps?.length > 0 && (
              <div className={`grid grid-cols-1 gap-5 ${study.solution.steps.length === 1 ? '' : study.solution.steps.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                {study.solution.steps.map((step: any, i: number) => (
                  <div key={i} className="bg-gradient-to-b from-purple-50/50 to-white border border-purple-100/80 rounded-[1.5rem] p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300">

                    {/* Step number */}
                    <span className="text-sm font-bold text-purple-500 mb-5 leading-none">
                      {String(step.step_number || i + 1).padStart(2, '0')}
                    </span>

                    {/* Step title */}
                    {step.title && (
                      <h3 className="text-[15px] font-bold text-slate-900 mb-5 leading-snug">
                        {step.title}
                      </h3>
                    )}

                    {/* Check bullets */}
                    {step.bullets?.length > 0 && (
                      <ul className="space-y-3 flex-1">
                        {step.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-[13px] text-slate-700 leading-relaxed">
                            <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── TESTIMONIAL ──────────────────────────────────── */}
        {study.testimonial?.quote && (
          <section className="mb-20 border-t border-slate-100 pt-16">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="text-[#c4b5fd] text-[3rem] sm:text-[4rem] leading-none font-serif select-none shrink-0" style={{ marginTop: '-0.25rem' }}>&ldquo;</div>
              <div>
                <blockquote className="text-xl sm:text-[1.5rem] text-[#0d253d] leading-[1.4] tracking-tight mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                  {study.testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  {study.testimonial.avatar_url && (
                    <img
                      src={study.testimonial.avatar_url}
                      alt={study.testimonial.person_name || ''}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                  )}
                  <div>
                    {study.testimonial.person_name && (
                      <div className="font-semibold text-[#0d253d] text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                        {study.testimonial.person_name}
                      </div>
                    )}
                    {study.testimonial.designation && (
                      <div className="text-[#64748b] text-[13px]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                        {study.testimonial.designation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── RESULTS ──────────────────────────────────────── */}
        {study.results && (study.results.title || study.results.items?.length > 0) && (
          <section className="mb-24 border-t border-slate-100 pt-20">
            <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm text-purple-700 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
              Results
            </div>

            {study.results.title && (
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] mb-10"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {study.results.title}
              </h2>
            )}

            {study.results.items?.length > 0 && (
              <div className="space-y-4">
                {study.results.items.map((item: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200/70 rounded-[1.5rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center gap-8 md:gap-12 hover:shadow-lg hover:border-slate-300 transition-all duration-300">

                    {/* Left: category + badge */}
                    <div className="w-full md:w-52 shrink-0">
                      <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">
                        {item.category}
                      </h3>
                      {item.badge && (
                        <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Right: metrics columns */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
                      {(item.metrics || []).filter((m: any) => m.value || m.label).map((metric: any, j: number) => (
                        <div key={j}>
                          <div 
                            className="text-2xl sm:text-[1.75rem] font-bold text-[#533afd] mb-2 leading-none tracking-wide"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[#0d253d] text-[13px] leading-snug">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── MORE CUSTOMER STORIES ────────────────────────── */}
        {relatedStudies && relatedStudies.length > 0 && (
          <section className="border-t border-slate-100 pt-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
              More Customer Stories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedStudies.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/case-studies/${rel.slug}`}
                  className="bg-white border border-slate-200/70 rounded-[1.5rem] p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 group"
                >
                  {rel.company_logo && (
                    <img src={rel.company_logo} alt={rel.company_name} className="h-5 object-contain self-start grayscale group-hover:grayscale-0 transition-all" />
                  )}
                  <p className="text-base font-semibold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors">
                    {rel.title}
                  </p>
                  <span className="text-sm font-semibold text-purple-600 group-hover:underline">
                    Read story →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

