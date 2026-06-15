import Link from 'next/link'
import { getAdminBasePath } from '@/lib/admin-path'
import { Home, Bot, Newspaper, BookMarked, AlignLeft, Footprints, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Manager — Admin',
  description: 'Edit all page content, labels, and text from one place.',
}

const pages = [
  {
    key: 'home',
    label: 'Home Page',
    description: 'Hero, about, stats, products, infrastructure, case studies, and FAQ sections.',
    icon: Home,
    color: 'bg-blue-500',
  },
  {
    key: 'agent-factory',
    label: 'Agent Factory',
    description: 'Hero, pipeline steps, features, stats, FAQ, and CTA copy.',
    icon: Bot,
    color: 'bg-[#533afd]',
  },
  {
    key: 'blog',
    label: 'Blog Page',
    description: 'Hero heading, subheading, labels, and empty state text.',
    icon: Newspaper,
    color: 'bg-amber-500',
  },
  {
    key: 'case-study',
    label: 'Case Study Page',
    description: 'Hero heading, labels, and empty state copy.',
    icon: BookMarked,
    color: 'bg-emerald-500',
  },
  {
    key: 'navbar',
    label: 'Navbar',
    description: 'Navigation links, CTA button label, and dropdown descriptions.',
    icon: AlignLeft,
    color: 'bg-slate-700',
  },
  {
    key: 'footer',
    label: 'Footer',
    description: 'Description, copyright text, column headings, and link labels.',
    icon: Footprints,
    color: 'bg-pink-500',
  },
]

export default function ContentManagerIndexPage() {
  const base = getAdminBasePath()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2340]">Content Manager</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">
          Edit all page text, labels, and copy. Changes are saved to JSON files and instantly reflected on the site.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {pages.map(({ key, label, description, icon: Icon, color }) => (
          <Link
            key={key}
            href={`${base}/content-manager/${key}`}
            className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-[#533afd]/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon size={20} className="text-white" />
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-[#533afd] group-hover:translate-x-1 transition-all duration-200" />
            </div>
            <div>
              <h2 className="font-bold text-[#1B2340] text-base">{label}</h2>
              <p className="text-sm text-[#6B7280] mt-1 leading-snug">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
