'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden flex flex-col justify-center bg-white pt-28 pb-6">

      {/* ── Half-circle: center above top edge, left side fades to transparent ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '48%',
          transform: 'translate(-50%, -65%)',
          width: '65vw',
          height: '65vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, rgba(204,233,248,0) 0%, rgba(204,233,248,0) 30%, rgba(204,233,248,0.6) 50%, #e3e8ee 65%, #e3e8ee 100%)',
          opacity: 0.85,
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
                src="/agent-fac-logo.png"
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
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold text-[#0d253d] leading-[1.15]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                AI Agents that Answer<br />
                Your Business Questions
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              className="text-lg md:text-xl text-[#0d253d] leading-relaxed max-w-lg mb-8"
              style={{ fontFamily: 'var(--font-quicksand)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              Agent Factory deploys domain-tuned AI agents across marketing, sales, finance, and operations built on your data, trained on your KPIs, configured by our engineers, so your team doesn't have to.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <button
                id="hero-cta-demo"
                className="px-6 py-2.5 rounded-md font-bold text-sm text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{ background: '#533afd', fontFamily: 'var(--font-inter)' }}
              >
                REQUEST A DEMO
              </button>
              <button
                id="hero-cta-try"
                className="px-6 py-2.5 rounded-md font-bold text-sm text-white tracking-widest uppercase bg-slate-900 hover:bg-slate-800 transition-all duration-200 hover:-translate-y-px"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                TRY IT NOW
              </button>
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
                    src="/Aideticlogo.png"
                    alt="Aidetic"
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
                  <span className="text-[#665efd] font-bold">Book</span>
                  <span className="text-white/80"> a demo today</span>
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
            className="font-semibold tracking-[0.2em] text-xs uppercase mb-6 text-center"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #ea2261)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TRUSTED BY DATA-DRIVEN ENTERPRISES
          </p>

          {/* Marquee wrapper with fade-edge mask */}
          <div
            className="relative overflow-hidden border-t border-[#533afd] border-slate-200 py-5"
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
              {[
                { name: 'LG', prefix: '🔵' },
                { name: 'Brambles', prefix: null },
                { name: 'TRUIST', suffix: '⊞' },
                { name: 'SEPHORA', prefix: null },
                { name: 'Huel', prefix: null, bold: true },
                { name: 'keyloop', prefix: null },
                { name: 'worldpay', prefix: null },
                { name: 'Snowflake', prefix: null },
                { name: 'Salesforce', prefix: null },
                { name: 'Databricks', prefix: null },
                /* duplicate for seamless loop */
                { name: 'LG', prefix: '🔵' },
                { name: 'Brambles', prefix: null },
                { name: 'TRUIST', suffix: '⊞' },
                { name: 'SEPHORA', prefix: null },
                { name: 'Huel', prefix: null, bold: true },
                { name: 'keyloop', prefix: null },
                { name: 'worldpay', prefix: null },
                { name: 'Snowflake', prefix: null },
                { name: 'Salesforce', prefix: null },
                { name: 'Databricks', prefix: null },
              ].map((brand, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-1.5 whitespace-nowrap select-none text-[#533afd]/80 tracking-wide ${
                    brand.bold ? 'text-xl font-black italic' : 'text-base font-semibold'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {brand.prefix && <span className="text-sm">{brand.prefix}</span>}
                  {brand.name}
                  {(brand as { suffix?: string }).suffix && <span className="text-xs">{(brand as { suffix?: string }).suffix}</span>}
                </span>
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
