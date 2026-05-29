'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  visual: ReactNode
  reversed?: boolean
  delay?: number
}

export function FeatureCard({
  title,
  description,
  visual,
  reversed = false,
  delay = 0,
}: FeatureCardProps) {
  const textX = reversed ? 60 : -60
  const imageX = reversed ? -60 : 60
  const viewport = { once: true, amount: 0.25 }
  const ease = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

  return (
    <div className="relative w-full py-20 px-6 overflow-hidden">

      {/* Half-bubble blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          ...(reversed ? { left: '-28%' } : { right: '-28%' }),
          transform: 'translateY(-50%)',
          width: '50vw',
          height: '50vw',
          maxWidth: '620px',
          maxHeight: '620px',
          background: '#e3e8ee',
          borderRadius: '50%',
          opacity: 0.48,
          filter: 'blur(2px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text side */}
        <motion.div
          className={`space-y-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
          initial={{ opacity: 0, x: textX }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ...ease, delay }}
          viewport={viewport}
        >
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight tracking-wide text-[#0d253d]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {title}
          </h2>
          <p className="text-base text-[#64748d] leading-relaxed max-w-lg">{description}</p>
        </motion.div>

        {/* Visual side — white card */}
        <motion.div
          className={`relative group ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
          initial={{ opacity: 0, x: imageX }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ y: -8 }}
          transition={{ ...ease, delay: delay + 0.08 }}
          viewport={viewport}
        >
          {/* Ambient glow — expands on hover */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#533afd]/25 to-[#ea2261]/25 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 pointer-events-none" />

          {/* White card frame */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-white min-h-[360px] flex flex-col"
            style={{
              border: '2px solid #665efd',
              boxShadow: '0 8px 32px -4px rgba(83,58,253,0.18), 0 2px 8px 0 rgba(0,0,0,0.06)',
            }}
            whileHover={{
              boxShadow: '0 24px 56px -8px rgba(83,58,253,0.38), 0 8px 24px -4px rgba(234,34,97,0.22), 0 0 0 1px rgba(83,58,253,0.5)',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Corner shine sweep on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 70%)',
                backgroundSize: '200% 100%',
                animation: 'none',
              }}
            />

            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 w-full h-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, #533afd, #ea2261)' }}
            />

            {visual}
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
