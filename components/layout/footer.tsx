import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/utils/constants'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'

/**
 * Footer component
 * Light Theme: matches navbar with slate-50 background and deep navy text.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-slate-50 overflow-hidden border-t border-slate-200">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* Left Column - Brand & Info */}
          <div className="flex flex-col space-y-5 max-w-sm">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/Aideticlogo.png"
                alt="Aidetic Logo"
                width={260}
                height={100}
                className="h-36 w-auto object-contain"
              />
            </div>
            
            {/* Description */}
            <p className="text-sm text-slate-500 leading-relaxed">
              {SITE_DESCRIPTION}
            </p>

            {/* Copyright */}
            <p className="text-xs text-slate-400 pt-4">
              © {currentYear} {SITE_NAME} All rights reserved.
            </p>
          </div>

          {/* Right Columns - Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 lg:max-w-3xl">
            {/* Resources */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-[#1B2340] text-sm">Resources</h3>
              <nav className="flex flex-col space-y-3">
                <Link href="/case-studies" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Case Studies</Link>
                <Link href="/blog" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Blogs</Link>
                <a href="#" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Documentation</a>
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-[#1B2340] text-sm">Contact</h3>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Schedule a Demo</a>
                <a href="#" className="text-sm text-[#1B2340] font-semibold hover:text-[#DC2626] transition-colors">Technology Partner</a>
                <span className="text-[10px] font-bold bg-[#1B2340] text-white px-2 py-0.5 rounded w-fit uppercase tracking-wider">Aidetic</span>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-[#1B2340] text-sm">Legal</h3>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-slate-500 hover:text-[#DC2626] transition-colors">Refund Policy</a>
              </nav>
            </div>

            {/* Social */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-[#1B2340] text-sm">Social</h3>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#DC2626] transition-colors">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#DC2626] transition-colors">
                  <Twitter size={16} /> Twitter
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Big Watermark Text */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none z-0">
        <span className="text-[18vw] font-black text-[#1B2340]/5 tracking-tighter leading-none translate-y-[45%]">
          aidetic
        </span>
      </div>
    </footer>
  )
}

