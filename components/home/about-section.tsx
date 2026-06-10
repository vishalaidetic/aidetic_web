'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';


export function AboutSection() {
  return (
    <section className="relative w-full bg-slate-50 pb-20 px-6 overflow-hidden snap-start">
          <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6">
            <motion.h2
              className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2 max-w-4xl mx-auto text-center"
              style={{
                fontFamily: 'var(--font-inter)',
                background: 'linear-gradient(to right, #533afd, #000000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              A boutique AI studio shipping production systems.
            </motion.h2>
            <motion.h3
              className="text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-[#0d253d] leading-relaxed max-w-3xl mx-auto mb-8 text-center"
              style={{ fontFamily: 'var(--font-quicksand)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              We've spent the last seven years building AI systems for Fortune-500 data teams. Now we've packaged what works into products you can adopt today.
            </motion.h3>
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto mt-16 lg:mt-24 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <DashboardMock />
          </motion.div>
        </section>
  );
}
