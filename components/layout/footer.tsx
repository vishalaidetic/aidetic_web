import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/utils/constants'
import Link from 'next/link'

/**
 * Footer component
 * Displays site information, links, and copyright
 * Theme: Deep Navy (#1B2340) background, white text, Brand Red (#DC2626) accents
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#1B2340]">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#DC2626] text-white font-bold text-sm italic shadow-md">
                Aj
              </div>
              <span className="font-bold text-white text-lg tracking-wide">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {SITE_DESCRIPTION}
            </p>
            {/* Brand Red accent line */}
            <div className="w-10 h-0.5 bg-[#DC2626] rounded-full" />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Navigation</h3>
            <nav className="flex flex-col space-y-2.5">
              <Link
                href="/"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                href="/case-studies"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Case Studies
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Admin Dashboard
              </Link>
            </nav>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Resources</h3>
            <nav className="flex flex-col space-y-2.5">
              <a
                href="#"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-white/60 hover:text-[#DC2626] transition-colors duration-200"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
