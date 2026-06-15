'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Briefcase, Calendar, Search } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatting'

export function CaseStudyList({ caseStudies, content }: { caseStudies: any[], content: any }) {
  const [searchTerm, setSearchTerm] = useState('')

  let filteredStudies = caseStudies

  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase()
    filteredStudies = filteredStudies.filter((study: any) => 
      study.title.toLowerCase().includes(q) || 
      (study.subtitle && study.subtitle.toLowerCase().includes(q)) ||
      (study.description && study.description.toLowerCase().includes(q)) ||
      (study.tag_type && study.tag_type.toLowerCase().includes(q)) ||
      (study.company_name && study.company_name.toLowerCase().includes(q))
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 mx-auto max-w-8xl">
      {/* Search Bar */}
      <div className="mb-10 flex justify-end">
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748d] w-4 h-4" />
          <input
            type="text"
            placeholder={content?.labels?.search_placeholder || "Search case studies..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#533afd] focus:ring-1 focus:ring-[#533afd] transition-all text-[15px]"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
        </div>
      </div>

      {caseStudies.length === 0 ? (
        <div className="text-center py-20 bg-[#f8fafc] rounded-2xl border border-slate-200">
          <Briefcase className="mx-auto h-12 w-12 text-[#64748d] mb-4 opacity-40" />
          <h2 className="text-xl font-bold text-[#0d253d] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{content?.empty_state?.heading || "No Case Studies Yet"}</h2>
          <p className="text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>{content?.empty_state?.subheading || "Check back soon for our latest success stories."}</p>
        </div>
      ) : filteredStudies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#64748d] text-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>
            No case studies found for "{searchTerm}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study: any) => (
            <Link key={study.id} href={`/case-studies/${study.slug}`}>
              <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#533afd]/30 transition-all duration-300 overflow-hidden">
                {study.featured_image && (
                  <div className="relative h-56 overflow-hidden bg-slate-50">
                    <img
                      src={study.featured_image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0d253d]/0 group-hover:bg-[#0d253d]/10 transition-all duration-300" />
                    {study.tag_type && (
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 bg-[#533afd] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {study.tag_type}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {!study.featured_image && study.tag_type && (
                  <div className="px-6 pt-6">
                    <span 
                      className="px-3 py-1 bg-[#533afd] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {study.tag_type}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#64748d] mb-3 font-medium">
                    <Calendar size={12} />
                    <span style={{ fontFamily: 'var(--font-quicksand)' }}>{formatDate(study.created_at)}</span>
                  </div>

                  <h3 
                    className="text-[1.35rem] font-medium mb-3 text-[#0d253d] group-hover:text-[#533afd] transition-colors duration-200 leading-snug tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {study.title}
                  </h3>

                  {(study.subtitle || study.description) && (
                    <p 
                      className="text-[#64748d] line-clamp-3 mb-6 flex-1 text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      {study.subtitle || study.description}
                    </p>
                  )}

                  <div 
                    className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[#533afd] font-semibold text-sm group-hover:gap-2.5 transition-all duration-200"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {content?.labels?.read_more || "Read Full Case Study"} <ArrowRight size={16} className="text-[#533afd]" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
