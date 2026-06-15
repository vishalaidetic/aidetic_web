import React from 'react'
import { Check } from 'lucide-react'
import { BlogContent } from '@/components/blog/blog-content'
import Link from 'next/link'

// ─── Hero Card ───────────────────────────────────────────────
function HeroCard({ study }: { study: any }) {
  // Pick a consistent color from company name initial
  const colors = ['#7C3AED', '#2563EB', '#0891B2', '#059669', '#DC2626', '#D97706']
  const colorIdx = (study.company_name?.charCodeAt(0) ?? 0) % colors.length
  const accentColor = colors[colorIdx]

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden border border-slate-200/80 bg-white min-h-[360px] flex flex-col justify-between p-10 shadow-xl shadow-slate-200/40 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">

      {/* Subtle dot-grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-70"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.25,
        }}
      />
      {/* Fade the grid out towards bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 via-white/80 to-white" />

      {/* ── Top row: logo/avatar + name | divider | industry ── */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Company avatar */}
        {study.company_logo ? (
          <img src={study.company_logo} alt={study.company_name} className="h-8 w-8 rounded-lg object-contain border border-slate-100 bg-white p-0.5" />
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {(study.company_name ?? 'C').charAt(0).toUpperCase()}
          </div>
        )}

        {/* Company name */}
        <span className="text-sm font-semibold text-slate-800">{study.company_name}</span>

        {/* Vertical divider */}
        {study.industry && (
          <>
            <span className="text-slate-300 text-base select-none">|</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {study.industry}
              {study.tag_type && ` · ${study.tag_type}`}
            </span>
          </>
        )}
      </div>

      {/* ── Large title at bottom ─────────────────────────── */}
      <div className="relative z-10 mt-auto pt-12">
        <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-slate-900 leading-[1.15] tracking-tight max-w-xl">
          {study.title}
        </h2>
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
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-[#0f172a] leading-[1.05] mb-6">
            {study.title}
          </h1>

          {/* Subtitle */}
          {study.subtitle && (
            <p className="text-lg text-slate-500 leading-relaxed border-b border-slate-100 pb-10 mb-10">
              {study.subtitle}
            </p>
          )}

          {/* Hero Metrics Row */}
          {study.metrics?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pb-10 border-b border-slate-100 mb-10">
              {study.metrics.map((m: any, i: number) => (
                <div key={i}>
                  <div className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-1 leading-none">
                    {m.metric_value}
                  </div>
                  <div className="text-sm text-slate-500 leading-snug">
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-5">
              About {study.company_name || 'the Company'}
            </h2>
            <div className="prose prose-lg prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900 prose-a:text-purple-600">
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
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 leading-tight">
                {study.problem.heading}
              </h2>
            )}

            {study.problem.description && (
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
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
                        <div className="text-4xl font-bold text-purple-600 leading-none mb-1.5">
                          {card.stat}
                        </div>
                        {card.stat_label && (
                          <div className="text-sm text-slate-500 leading-snug">
                            {card.stat_label}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Divider */}
                    {card.stat && <hr className="border-slate-200 mb-5" />}

                    {/* Card title */}
                    {card.title && (
                      <h3 className="text-base font-bold text-slate-900 mb-4 leading-snug">
                        {card.title}
                      </h3>
                    )}

                    {/* Bullets */}
                    {card.bullets?.length > 0 && (
                      <ul className="space-y-2.5 flex-1">
                        {card.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
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
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 leading-tight">
                {study.solution.heading}
              </h2>
            )}

            {study.solution.description && (
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
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
                      <h3 className="text-lg font-bold text-slate-900 mb-5 leading-snug">
                        {step.title}
                      </h3>
                    )}

                    {/* Check bullets */}
                    {step.bullets?.length > 0 && (
                      <ul className="space-y-3 flex-1">
                        {step.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
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
            <div className="text-purple-300 text-5xl leading-none mb-6 font-serif select-none">&ldquo;</div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-slate-900 leading-relaxed mb-8">
              {study.testimonial.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              {study.testimonial.avatar_url && (
                <img
                  src={study.testimonial.avatar_url}
                  alt={study.testimonial.person_name || ''}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
              )}
              <div>
                {study.testimonial.person_name && (
                  <div className="font-semibold text-slate-900 text-sm">
                    {study.testimonial.person_name}
                  </div>
                )}
                {study.testimonial.designation && (
                  <div className="text-slate-500 text-sm">
                    {study.testimonial.designation}
                  </div>
                )}
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
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-10 leading-tight">
                {study.results.title}
              </h2>
            )}

            {study.results.items?.length > 0 && (
              <div className="space-y-4">
                {study.results.items.map((item: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200/70 rounded-[1.5rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center gap-8 md:gap-12 hover:shadow-lg hover:border-slate-300 transition-all duration-300">

                    {/* Left: category + badge */}
                    <div className="w-full md:w-52 shrink-0">
                      <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
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
                          <div className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-1 leading-none">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-500 leading-snug mt-1">
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

