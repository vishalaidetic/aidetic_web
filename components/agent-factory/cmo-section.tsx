'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function CmoSection() {
  return (
    <section className="relative w-full py-20 px-6 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Soft bubble background inside the card */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              right: '-10%',
              transform: 'translateY(-50%)',
              width: '350px',
              height: '350px',
              background: '#e3e8ee',
              borderRadius: '50%',
              opacity: 0.5,
              filter: 'blur(60px)',
            }}
          />
          {/* Avatar */}
          <div className="shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br from-[#533afd] to-blue-500">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative bg-slate-200">
              <Image 
                src="/placeholder-user.jpg"
                alt="Anurag - CMO"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col flex-1 text-center md:text-left space-y-1.5 md:space-y-1">
            <h4
              className="text-xl md:text-2xl font-bold text-[#0d253d]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Hi! I am Anurag, CMO at Aidetic.
            </h4>
            <p className="text-sm md:text-base text-[#64748d]">
              Curious how Agent Factory will help your business?
            </p>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 mt-4 md:mt-0">
            <button
              className="px-8 py-3 rounded-lg font-bold text-sm text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
              style={{
                background: 'linear-gradient(to right, #533afd, #ea2261)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              BOOK A DEMO
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
