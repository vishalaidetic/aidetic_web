'use client'

import { motion } from 'framer-motion'

export function BlogPageHero({ content }: { content?: any }) {
  return (
    <div className="relative w-full overflow-hidden text-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* ── Half-circle: center above top edge ── */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0,
          left: '50%',
          transform: 'translate(-20%, -74%)',
          width: '65vw',
          height: '65vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, transparent 0%, transparent 45%, rgba(234,34,97,0.38) 55%, rgba(83,58,253,0.35) 78%, rgba(204,233,248,0.75) 100%)',
          opacity: 0.7,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h1
          className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#0d253d] leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {content?.heading || "Aidetic Blogs"}
        </h1>
        <p
          className="text-lg text-[#64748d] leading-relaxed mt-6 max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-quicksand)' }}
        >
          {content?.subheading || "Stay updated with the latest trends and insights in AI, Data-Science, and modern Generative AI technologies."}
        </p>
      </motion.div>
    </div>
  )
}
