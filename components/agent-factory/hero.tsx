'use client'

import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { motion } from 'framer-motion';

export function Hero({ content }: { content?: any }) {
  return (
    <section className="relative overflow-hidden flex flex-col justify-start bg-white pt-30 pb-10 min-h-screen">

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
          background: 'linear-gradient(to right, transparent 0%, transparent 45%, rgba(220,38,38,0.38) 55%, rgba(220,38,38,0.35) 78%, rgba(254,226,226,0.75) 100%)',
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col lg:col-span-7">

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
                  background: 'linear-gradient(to right, #DC2626, #000000)',
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
              className="text-base md:text-lg text-[#1B2340] leading-relaxed max-w-lg mb-8"
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
                  className="px-8 py-3.5 rounded-full bg-[#DC2626] text-white font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-[15px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {content?.cta_primary}
                </button>
              </BookCallDialog>
            </motion.div>
          </div>

          {/* ── Right: Animated Chatbot UI ── */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            {/* New Video Player */}
            <div className="relative w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-100 flex items-center justify-center">
              <video
                src="/PixVerse_V6_Image_Text_360P_Generate_a_Ai_Chat.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
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
              background: 'linear-gradient(to right, #DC2626, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {content?.trusted_by}
          </p>

          {/* Marquee wrapper with fade-edge mask */}
          <div
            className="relative overflow-hidden border-t border-b border-[#DC2626]/30 py-8 mb-8"
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
                      className="text-base font-semibold tracking-tight text-[#DC2626]/60 hover:text-[#DC2626] transition-colors whitespace-nowrap select-none"
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
