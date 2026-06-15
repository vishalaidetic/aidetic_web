'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookCallDialog } from '@/components/shared/book-call-dialog';

export function Hero({ content }: { content?: any }) {
  return (
    <section className="relative overflow-hidden flex flex-col justify-start bg-white pt-20 pb-10 min-h-screen">

      {/* ── Half-circle: center above top edge, left side fades to transparent ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '42%',
          transform: 'translate(-50%, -68%)',
          width: '65vw',
          height: '65vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, transparent 0%, transparent 45%, rgba(234,34,97,0.38) 55%, rgba(83,58,253,0.35) 78%, rgba(204,233,248,0.75) 100%)',
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col lg:col-span-7">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <Image
                src={content?.logo_url}
                alt="Agent Factory Logo"
                width={180}
                height={60}
                className="h-12 sm:h-14 w-auto object-contain object-left"
                priority
              />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-6"
            >
              <h1
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15]"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {content?.heading?.[0]}
                <br />
                {content?.heading?.[1]}

              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              className="text-base md:text-lg text-[#0d253d] leading-relaxed max-w-lg mb-8"
              style={{ fontFamily: 'var(--font-quicksand)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              {content?.subheading}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <BookCallDialog>
                <button
                  id="hero-cta-demo"
                  className="px-8 py-3.5 rounded-full bg-[#533afd] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.cta_primary}
                </button>
              </BookCallDialog>
            </motion.div>
          </div>

          {/* ── Right: Dark product card ── */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <div
              className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #0d1b3e 0%, #0f1f4a 50%, #1a1040 100%)' }}
            >
              {/* Background decorative orbs inside card */}
              <div
                className="absolute top-[-20%] left-[-10%] w-[280px] h-[280px] rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #1e3a8a 0%, transparent 70%)' }}
              />
              <div
                className="absolute bottom-[-15%] right-[-10%] w-[220px] h-[220px] rounded-full opacity-40"
                style={{ background: 'radial-gradient(circle, #4c1d95 0%, transparent 70%)' }}
              />

              {/* Card content — centred */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-10 text-center">

                {/* Logo row */}
                <div className="flex items-center gap-3">
                  <Image
                    src={content?.logo_url}
                    alt="Agent Factory"
                    width={140}
                    height={40}
                    className="h-8 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* CTA line */}
                <p
                  className="text-base tracking-wide"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="text-[#665efd] font-bold">{content?.book_text_1}</span>
                  <span className="text-white/80">{content?.book_text_2}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p
            className="font-bold tracking-[0.25em] text-sm uppercase mb-8 text-center"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {content?.trusted_by}
          </p>

          {/* Marquee wrapper with fade-edge mask */}
          <div
            className="relative overflow-hidden border-t border-b border-[#533afd]/30 py-8 mb-8"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            {/* Track — doubled for seamless loop */}
            <div
              className="flex items-center gap-14 w-max"
              style={{ animation: 'marquee-logos 28s linear infinite' }}
            >
              {[...(content?.logos || []), ...(content?.logos || [])].map((brand: any, i: number) => (
                <div key={i} className="flex items-center justify-center shrink-0 h-8">
                  {brand.url ? (
                    <img
                      src={brand.url}
                      alt={brand.name}
                      className="h-7 max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  ) : (
                    <span
                      className="text-base font-semibold tracking-tight text-[#533afd]/60 hover:text-[#533afd] transition-colors whitespace-nowrap select-none"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Keyframe */}
          <style>{`
            @keyframes marquee-logos {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
}
