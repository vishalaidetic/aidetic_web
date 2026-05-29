'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  {
    value: 30,
    suffix: '%',
    label: 'Reduction in\nyour analytics cost',
  },
  {
    value: 2,
    suffix: 'x',
    label: 'Faster Decision\nMaking and Actions',
  },
  {
    value: 'Zero',
    suffix: '',
    label: 'Dashboards your team needs\nto build, maintain, or learn',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Reduction in time your data\nteam spends on repetitive reporting',
  },
]

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * end).toFixed(end % 1 !== 0 ? 1 : 0)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Inline SVG network mesh background ── */
function NetworkMesh() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="mesh" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Horizontal lines */}
          <line x1="0" y1="40" x2="80" y2="40" stroke="#7dd3f0" strokeWidth="0.5" strokeOpacity="0.35" />
          {/* Vertical lines */}
          <line x1="40" y1="0" x2="40" y2="80" stroke="#7dd3f0" strokeWidth="0.5" strokeOpacity="0.35" />
          {/* Diagonal lines */}
          <line x1="0" y1="0" x2="80" y2="80" stroke="#7dd3f0" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1="80" y1="0" x2="0" y2="80" stroke="#7dd3f0" strokeWidth="0.4" strokeOpacity="0.2" />
          {/* Node dots at intersections */}
          <circle cx="40" cy="40" r="1.5" fill="#4fc3e8" fillOpacity="0.4" />
          <circle cx="0"  cy="0"  r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="80" cy="0"  r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="0"  cy="80" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="80" cy="80" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh)" />
    </svg>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-16 px-6 overflow-hidden bg-white">

      <div className="max-w-6xl mx-auto">
        {/* ── Half-bubble blob — RIGHT ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            right: '-28%',
            transform: 'translateY(-50%)',
            width: '55vw',
            height: '55vw',
            maxWidth: '700px',
            maxHeight: '700px',
            background: '#e3e8ee',
            borderRadius: '50%',
            opacity: 0.55,
            filter: 'blur(2px)',
          }}
        />

        <motion.div
          className="relative rounded-2xl overflow-hidden px-12 py-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* ── Network mesh background (subtle) ── */}
          <NetworkMesh />

          {/* ── Content ── */}
          <div className="relative z-10 text-center space-y-4 mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(to right, #533afd, #ea2261)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What Agent Factory Brings to the Table
            </h2>
            <p className="text-[#64748d] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              No dashboards. No waiting. No guesswork. Just decisions backed by your data.
            </p>
          </div>

          {/* ── Stats row ── */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center space-y-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* Big number */}
                <div
                  className="text-5xl md:text-6xl font-bold text-[#533afd] leading-none tracking-wide"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {typeof stat.value === 'string' ? (
                    <span>{stat.value}{stat.suffix}</span>
                  ) : (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  )}
                </div>

                {/* Dotted divider */}
                <div className="flex justify-center">
                  <div
                    className="w-16 h-0"
                    style={{
                      borderTop: '2.5px dashed #22aed1',
                    }}
                  />
                </div>

                {/* Label */}
                <p className="text-[#0d253d] text-sm leading-snug whitespace-pre-line px-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
