'use client'
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { DashboardMock } from '@/components/home/dashboard-mock';
import { HomeFaqSection } from '@/components/home/home-faq-section';
import { BookCallDialog } from '@/components/shared/book-call-dialog';

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import { Outfit, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const outfit = Outfit({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

/**
 * Landing page - Homepage
 * Inspired by Fabric's minimalist SaaS design
 */

const companies = [
  { name: 'ShopJapan', label: 'Shop Japan' },
  { name: 'Myntra', label: 'Myntra' },
  { name: 'TheLineUp', label: 'The Line Up' },
  { name: 'ACKO', label: 'ACKO' },
  { name: 'CoinDCX', label: 'CoinDCX' },
  { name: 'Meesho', label: 'Meesho' },
  { name: 'Razorpay', label: 'Razorpay' },
  { name: 'Groww', label: 'Groww' },
]

const homeStats = [
  {
    value: 120,
    suffix: '+',
    label: 'Production AI systems shipped\nfor enterprises since 2019',
  },
  {
    value: 47,
    suffix: '',
    label: 'Fortune-500 customers across\nCPG, telecom and finance',
  },
  {
    value: 99.8,
    suffix: '%',
    label: 'Agent query success rate across\nproduction deployments',
  },
  {
    value: 4.2,
    suffix: 'B',
    label: 'Rows migrated through Data\nFlash in the last 12 months',
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

function NetworkMesh() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="mesh-home" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <line x1="0" y1="40" x2="80" y2="40" stroke="#7dd3f0" strokeWidth="0.5" strokeOpacity="0.35" />
          <line x1="40" y1="0" x2="40" y2="80" stroke="#7dd3f0" strokeWidth="0.5" strokeOpacity="0.35" />
          <line x1="0" y1="0" x2="80" y2="80" stroke="#7dd3f0" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1="80" y1="0" x2="0" y2="80" stroke="#7dd3f0" strokeWidth="0.4" strokeOpacity="0.2" />
          <circle cx="40" cy="40" r="1.5" fill="#4fc3e8" fillOpacity="0.4" />
          <circle cx="0" cy="0" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="80" cy="0" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="0" cy="80" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
          <circle cx="80" cy="80" r="1.2" fill="#4fc3e8" fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-home)" />
    </svg>
  )
}

function MigrationDemo() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step >= 7) {
      let current = 0;
      setProgress(0);
      const interval = setInterval(() => {
        current += 2;
        if (current >= 100) {
          current = 100;
          clearInterval(interval);
        }
        setProgress(current);
      }, 40); // 40ms * 50 = 2000ms
      return () => clearInterval(interval);
    }
  }, [step]);

  const isPlaying = useRef(false);

  const runSequence = async () => {
    if (isPlaying.current) return;
    isPlaying.current = true;

    setStep(0); // Upload button visible
    await new Promise(r => setTimeout(r, 1500));
    setStep(1); // Click upload, config.csv appears
    await new Promise(r => setTimeout(r, 2000));
    setStep(2); // Config view appears
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // Source dropdown OPEN & select Snowflake
    await new Promise(r => setTimeout(r, 2000));
    setStep(4); // Source closed. Dest OPEN & select Databricks
    await new Promise(r => setTimeout(r, 2000));
    setStep(5); // Both closed. Click Migrate.
    await new Promise(r => setTimeout(r, 1500));
    setStep(6); // Migration animation
    await new Promise(r => setTimeout(r, 3000));
    setStep(7); // Complete

    isPlaying.current = false;
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      runSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={runSequence}
      className="flex flex-col w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.05)] border border-slate-200 h-[620px] relative"
    >
      {/* Dark top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1e54] z-30 relative shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Database size={16} />
          <span className="font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>Data Flash</span>
        </div>
        <div className="flex-1 h-5 bg-white/10 rounded-md mx-2" />
        <div className="flex gap-1.5">
          {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>

      <div className="relative flex-1 p-6 flex flex-col">
        {/* moving cursor */}
        <motion.div
          className="absolute z-50 pointer-events-none"
          animate={
            step === 0 ? { left: "50%", top: "45%", opacity: 1 } :
              step === 1 ? { left: "50%", top: "45%", scale: [1, 0.8, 1], opacity: 1 } :
                step === 2 ? { left: "14%", top: "28%", opacity: 1 } : // Hover Source
                  step === 3 ? { left: "14%", top: "40%", scale: [1, 0.8, 1], opacity: 1 } : // Click Snowflake
                    step === 4 ? {
                      left: ["14%", "86%", "86%"],
                      top: ["40%", "28%", "46%"],
                      scale: [1, 1, 0.8, 1],
                      opacity: 1
                    } : // Click Databricks
                      step === 5 ? { left: "50%", top: "49%", scale: [1, 0.8, 1], opacity: 1 } : // Click Migrate
                        { left: "50%", top: "49%", opacity: 0 } // fade out
          }
          transition={{
            duration: step === 4 ? 1.5 : 0.8,
            ease: "easeInOut"
          }}
        >
          <MousePointer2 size={24} fill="black" className="text-black drop-shadow-md" />
        </motion.div>


        <div className="mt-8 flex-1 relative">
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.div
                key="upload-phase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full h-full flex flex-col items-center justify-center -mt-10"
              >
                {/* upload section */}
                <div className="mt-2">
                  <button className="flex items-center justify-center gap-3 bg-[#533afd] text-white px-8 py-3.5 rounded-lg font-semibold text-base shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all w-[220px]">
                    <Upload size={20} strokeWidth={2.5} />
                    Upload File
                  </button>
                </div>

                <AnimatePresence>
                  {/* selected file */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 shadow-sm w-[260px]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[13px] text-[#0d253d]" style={{ fontFamily: "var(--font-quicksand)" }}>
                            config.csv
                          </p>
                          <p className="text-[11px] font-medium text-[#64748d] mt-0.5" style={{ fontFamily: "var(--font-quicksand)" }}>
                            18.2M rows
                          </p>
                        </div>
                        <div className="text-[#10B981] text-[13px] font-medium">
                          Uploaded
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="migration-phase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full flex flex-col h-full relative"
              >
                {/* pipeline (positioned between the dropdowns) */}
                <AnimatePresence>
                  {step >= 6 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-[10px] left-[70px] right-[70px] z-10 h-[72px]"
                    >
                      {/* connection line */}
                      <div className="absolute top-[35px] left-0 right-0 h-[2px] bg-slate-200" />

                      {/* engine block */}
                      <div className="absolute top-[0px] left-1/2 -translate-x-1/2 z-20">
                        <div className="w-[72px] h-[72px] rounded-full border-2 border-slate-100 bg-white flex flex-col items-center justify-center shadow-lg">
                          <motion.div
                            animate={{ rotate: step === 6 ? 360 : 0 }}
                            transition={{ duration: 2, repeat: step === 6 ? Infinity : 0, ease: "linear" }}
                            className="mb-1 text-[#533afd]"
                          >
                            <RefreshCw size={16} />
                          </motion.div>
                          <div className="text-center">
                            <p className="font-bold text-[8px] text-[#0d253d] leading-tight" style={{ fontFamily: "var(--font-quicksand)" }}>DATA</p>
                            <p className="font-bold text-[8px] text-[#533afd] leading-tight" style={{ fontFamily: "var(--font-quicksand)" }}>FLASH</p>
                          </div>
                        </div>
                      </div>

                      {/* moving file packets */}
                      <AnimatePresence>
                        {step >= 6 && [1, 2, 3, 4].map(i => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, left: "10%" }}
                            animate={step === 6 ? { left: ["10%", "80%"], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: step === 6 ? Infinity : 0,
                              delay: i * .4,
                              ease: "linear",
                              times: [0, 0.1, 0.9, 1]
                            }}
                            className="absolute top-[26px] z-10"
                          >
                            <div className="bg-[#533afd] text-white rounded-md px-2 py-0.5 text-[9px] font-bold shadow-sm">
                              DATA
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* source destination */}
                <div className="flex justify-between relative z-30">
                  {/* Source Dropdown */}
                  <div className="relative w-[120px] sm:w-[140px]">
                    <div className="bg-white border-2 border-slate-200 text-[#0d253d] rounded-xl p-3 sm:p-4 flex flex-col items-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                      <Database className="text-[#64748d] mb-2" size={20} />
                      <div className={`flex items-center gap-1 px-2 py-1 rounded w-full justify-between transition-colors ${step === 3 ? 'bg-slate-100' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-xs font-medium truncate">{step > 3 ? 'Snowflake' : 'Select'}</span>
                        <ChevronDown size={12} className="text-[#64748d]" />
                      </div>
                    </div>
                    {/* Source Menu */}
                    <AnimatePresence>
                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-[#0d253d]"
                        >
                            {['MongoDB', 'Snowflake', 'PostgreSQL', 'MSSQL', 'MySQL'].map(opt => (
                            <div key={opt} className={`px-3 py-2 text-xs cursor-pointer ${opt === 'Snowflake' ? 'bg-slate-50 font-semibold text-[#533afd]' : 'hover:bg-slate-50'}`}>
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dest Dropdown */}
                  <div className="relative w-[120px] sm:w-[140px]">
                    <div className="bg-white border-2 border-slate-200 text-[#0d253d] rounded-xl p-3 sm:p-4 flex flex-col items-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                      <Database className="text-[#64748d] mb-2" size={20} />
                      <div className={`flex items-center gap-1 px-2 py-1 rounded w-full justify-between transition-colors ${step === 4 ? 'bg-slate-100' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-xs font-medium truncate">{step > 4 ? 'Databricks' : 'Select'}</span>
                        <ChevronDown size={12} className="text-[#64748d]" />
                      </div>
                    </div>
                    {/* Dest Menu */}
                    <AnimatePresence>
                      {step === 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-[#0d253d]"
                        >
                            {['AWS', 'Azure', 'Databricks'].map(opt => (
                            <div key={opt} className={`px-3 py-2 text-xs cursor-pointer ${opt === 'Databricks' ? 'bg-slate-50 font-semibold text-[#533afd]' : 'hover:bg-slate-50'}`}>
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Button / Pipeline Container */}
                <div className="flex justify-center items-center mt-10 relative z-20 h-[80px] w-full">
                  <AnimatePresence mode="wait">
                    {step < 6 ? (
                      <motion.button
                        key="start-btn"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={step === 5 ? { scale: [1, 0.95, 1], opacity: 1 } : { opacity: 0.5 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-[#533afd] text-white px-4 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2"
                      >
                        Start Migration <ArrowRight size={18} />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="pipeline-blocks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start sm:justify-center items-center w-full overflow-x-auto pb-4  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {['Create Bundle', 'Validate Bundle', 'Deploy Bundle', 'Run Migration'].map((title, idx, arr) => (
                          <div key={title} className="flex items-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, borderColor: "#f8fafc" }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                borderColor: step >= 7 ? "#f8fafc" : ["#f8fafc", "#533afd", "#f8fafc"],
                                boxShadow: step >= 7
                                  ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                                  : [
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                    "0 4px 12px -2px rgba(83, 58, 253, 0.3)",
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                                  ]
                              }}
                              transition={{
                                opacity: { delay: idx * 0.15 },
                                scale: { delay: idx * 0.15 },
                                borderColor: { delay: idx * 0.3, duration: 1.5, repeat: step >= 7 ? 0 : Infinity, ease: "easeInOut" },
                                boxShadow: { delay: idx * 0.3, duration: 1.5, repeat: step >= 7 ? 0 : Infinity, ease: "easeInOut" }
                              }}
                              className="bg-white border-2 rounded-xl flex flex-col items-center justify-center w-[80px] h-[60px] sm:w-[95px] sm:h-[65px] shrink-0"
                            >
                              {title.split(' ').map(word => (
                                <span key={word} className="text-[10px] sm:text-[11px] font-bold text-[#0d253d] leading-tight">{word}</span>
                              ))}
                            </motion.div>

                            {idx < arr.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.15 + 0.1 }}
                                className="mx-2 sm:mx-2 shrink-0"
                              >
                                <ArrowRight size={14} className="text-slate-300" strokeWidth={1.5} />
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terminal */}
                <AnimatePresence>
                  {step >= 6 && (
                    <motion.div
                      initial={{ opacity: 0, marginTop: 0 }}
                      animate={{ opacity: 1, marginTop: 16 }}
                      className="w-full h-[146px] bg-[#111827] border border-slate-700 rounded-lg p-4 shadow-inner text-xs text-white font-mono z-10 relative"
                    >
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" style={{ backgroundColor: "#e91e63" }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" style={{ backgroundColor: "#e91e63" }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" style={{ backgroundColor: "#e91e63" }} />
                      </div>
                      <div className="opacity-90 space-y-1.5">
                        <p style={{ fontFamily: "var(--font-quicksand)" }}>{'>'} Initializing DataFlash engine.</p>
                        <p style={{ fontFamily: "var(--font-quicksand)" }}>{'>'} Validating schemas and mapping types.</p>
                        {progress > 30 && <p style={{ fontFamily: "var(--font-quicksand)" }}>{'>'} Transferring data blocks to Databricks.</p>}
                        {progress === 100 && <p className="font-bold" style={{ fontFamily: "var(--font-quicksand)" }}>{'>'} Migration successful.</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* progress */}
                <AnimatePresence>
                  {step >= 7 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pb-2"
                    >
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-medium text-[#0d253d]">Migration Progress</span>
                        <span className="text-[#533afd] font-bold">{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#533afd]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AIChatDemo() {
  const [state, setState] = useState(0);

  const isPlaying = useRef(false);

  const runSequence = async () => {
    if (isPlaying.current) return;
    isPlaying.current = true;

    setState(0); // hover select agent
    await new Promise(r => setTimeout(r, 1000));
    setState(1); // click select agent
    await new Promise(r => setTimeout(r, 800));
    setState(2); // click CRM
    await new Promise(r => setTimeout(r, 1500));
    setState(3); // typing, cursor moves to send
    await new Promise(r => setTimeout(r, 2000));
    setState(4); // click send
    await new Promise(r => setTimeout(r, 800));
    setState(5); // move to bottom, show chat & thinking
    await new Promise(r => setTimeout(r, 2000));
    setState(6); // show results

    isPlaying.current = false;
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      runSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={runSequence}
      className="flex flex-col w-full bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.05)] border border-slate-200 h-[620px] relative"
    >
      {/* Dark top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1e54] z-30 relative shrink-0">
        <img
          src="/agent-fac-logo.png"
          alt="Agent Factory"
          className="h-5 w-auto object-contain brightness-0 invert"
        />
        <div className="flex-1 h-5 bg-white/10 rounded-md" />
        <div className="flex gap-1.5">
          {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-0 overflow-hidden relative">
        {/* Left sidebar */}
        <div className="w-12 border-r border-slate-100 flex flex-col items-center gap-4 pt-4 shrink-0 bg-white z-20">
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 p-6 flex flex-col justify-between bg-white">


          {/* chat history area */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence>
              {state >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* user query */}
                  <div className="flex justify-end">
                    <div className="bg-white border border-slate-200 text-[#0d253d] rounded-2xl px-5 py-3 max-w-[420px] text-sm shadow-sm font-medium">
                      Show Q2 revenue trends and top regions
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ai loading */}
                    {state === 5 && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2 items-center bg-slate-50 w-fit rounded-2xl px-5 py-4 shadow-sm"
                      >
                        <Bot size={16} className="text-[#64748d] mr-2" />
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, delay: i * .15, duration: 0.6 }}
                            className="w-2 h-2 rounded-full bg-[#ea2261]"
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* AI response */}
                    {state === 6 && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {/* KPI cards */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            ["Revenue", "+32%"],
                            ["Customers", "+18%"],
                            ["Retention", "91%"]
                          ].map((item, index) => (
                            <motion.div
                              key={item[0]}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * .1 }}
                              className="bg-slate-50 border rounded-xl p-4 shadow-sm"
                            >
                              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748d] mb-1" style={{ fontFamily: "var(--font-quicksand)" }}>{item[0]}</p>
                              <p className="font-bold text-base sm:text-lg text-[#ea2261]" style={{ fontFamily: "var(--font-quicksand)" }}>{item[1]}</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* fake chart */}
                        <div className="bg-slate-50 border rounded-xl p-4 shadow-sm">
                          <div className="flex gap-2 h-[80px] items-end justify-between px-2">
                            {[35, 65, 55, 90, 60, 75].map((h, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: h * 0.75 }}
                                transition={{ delay: i * .1, type: "spring", stiffness: 100 }}
                                className="w-8 bg-[#533afd] rounded-t-md"
                              />
                            ))}
                          </div>
                        </div>

                        {/* fake table */}
                        <div className="bg-slate-50 border rounded-xl p-4 shadow-sm overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-[#64748d] border-b border-slate-200">
                                <th className="text-left font-medium pb-2">Region</th>
                                <th className="text-left font-medium pb-2">Revenue</th>
                                <th className="text-left font-medium pb-2">Growth</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                ["US", "$2.1M", "+24%"],
                                ["Europe", "$1.6M", "+18%"]
                              ].map((r, index) => (
                                <motion.tr
                                  key={r[0]}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * .1 }}
                                  className="border-b border-slate-100 last:border-0"
                                >
                                  <td className="py-2.5 font-medium">{r[0]}</td>
                                  <td className="py-2.5 text-[#64748d]">{r[1]}</td>
                                  <td className="py-2.5 text-[#ea2261] font-medium">{r[2]}</td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input box absolute positioned / flex child */}
          <motion.div
            layout
            className={`mx-auto max-w-[450px] w-full z-10 ${state < 5
              ? 'absolute top-[45%] left-6 right-6'
              : 'mt-auto relative'
              }`}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="relative bg-white border-2 border-slate-200 rounded-full mt-2 px-4 py-3 flex gap-3 justify-between items-center shadow-lg bg-opacity-90 backdrop-blur-sm">

              {/* Select Agent Dropdown */}
              <div className="relative shrink-0">
                <button className="flex items-center gap-1 text-xs font-semibold text-[#0d253d] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors">
                  {state >= 3 ? "CRM Agent" : "Select Agent"} <ChevronDown size={12} className="text-[#64748d]" />
                </button>
                <AnimatePresence>
                  {(state === 1 || state === 2) && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 w-32"
                    >
                      {['CRM', 'KPI', 'OT', 'Media'].map(opt => (
                        <div key={opt} className={`px-4 py-2 text-xs cursor-pointer ${opt === 'CRM' ? 'bg-slate-50 font-bold text-[#ea2261]' : 'text-[#64748d] hover:bg-slate-50'}`}>
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1 overflow-hidden">
                {state <= 2 && (
                  <div className="whitespace-nowrap overflow-hidden text-sm text-[#64748d]">
                    Ask AI...
                  </div>
                )}
                {state === 3 && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="whitespace-nowrap overflow-hidden text-sm font-medium text-[#0d253d]"
                  >
                    Show Q2 revenue trends and top regions
                  </motion.div>
                )}
                {state === 4 && (
                  <div className="whitespace-nowrap text-sm font-medium text-[#0d253d]">
                    Show Q2 revenue trends and top regions
                  </div>
                )}
                {state >= 5 && (
                  <div className="whitespace-nowrap text-sm text-[#64748d]">
                    Ask AI...
                  </div>
                )}
              </div>

              <motion.button
                animate={state === 4 ? { scale: [1, 1.2, 1], color: ["#64748b", "#ea2261", "#64748b"] } : {}}
                transition={{ duration: 0.4 }}
                className={`text-[#64748d] shrink-0 ${state >= 5 ? 'opacity-50' : 'hover:text-[#64748d]'}`}
              >
                <Send size={18} />
              </motion.button>

              {/* cursor */}
              <motion.div
                className="absolute z-50 pointer-events-none"
                animate={
                  state === 0 ? { left: "15%", top: "50%", opacity: 1 } :
                    state === 1 ? { left: "15%", top: "50%", scale: [1, 0.8, 1], opacity: 1 } : // click select agent
                      state === 2 ? {
                        left: ["15%", "15%", "15%"],
                        top: ["50%", "140%", "140%"],
                        scale: [1, 1, 0.8, 1],
                        opacity: 1
                      } : // click CRM
                        state === 3 ? { left: "95%", top: "50%", opacity: 1 } : // typing moves to send
                          state === 4 ? { left: "95%", top: "50%", scale: [1, 0.8, 1], opacity: 1 } : // click send
                            { opacity: 0 } // fade out cursor
                }
                transition={{
                  duration: state === 2 ? 1.5 : 0.8,
                  ease: "easeInOut"
                }}
              >
                <MousePointer2 size={24} fill="black" className="text-black drop-shadow-md" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('prebuilt')
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking')
    const [heroTextIndex, setHeroTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle scroll spy for the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Animate elements


        // Scroll spy for sidebar tabs
        const visibleCards = entries.filter(entry => entry.isIntersecting && entry.target.hasAttribute('data-section-id'));
        if (visibleCards.length > 0) {
          // Sort by top position to find the most visible one
          visibleCards.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const topVisible = visibleCards[0];
          const sectionId = topVisible.target.getAttribute('data-section-id');
          if (sectionId) setActiveTab(sectionId);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    )

    document.querySelectorAll('[data-section-id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Timeline light scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const timelineContainer = document.querySelector('.timeline-container')
      const timelineLight = document.getElementById('timeline-light')

      if (!timelineContainer || !timelineLight) return

      const rect = timelineContainer.getBoundingClientRect()
      const containerTop = rect.top + window.scrollY
      const containerHeight = rect.height
      const scrollTop = window.scrollY

      // Calculate the position of the light relative to the timeline
      let lightPosition = scrollTop - containerTop + window.innerHeight / 2

      // Clamp within timeline bounds
      lightPosition = Math.max(0, Math.min(lightPosition, containerHeight))

      timelineLight.style.top = `${lightPosition}px`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const el = document.querySelector(`[data-section-id="${id}"]`)
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        {/* ══════════════════════════════════════════════════════════
          HERO SECTION — Two-column layout (inspired by reference)
             ══════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative w-full overflow-hidden snap-start  scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* ── Upper half: centered layout ── */}
            <div className="relative flex flex-col items-center justify-center text-center rounded-t-2xl overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-12 px-6 min-h-screen">

              {/* ── Grid Background with Bottom Fade Mask ── */}
              <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)] z-0">
                {/* Static Base Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem]" />

                {/* Dynamic Grid Lines Overlay with Moving Red Dots */}
                <div className="absolute inset-0 overflow-hidden">
                  <style>{`
                    @keyframes dotMoveX {
                      0% { transform: translateX(-10vw); opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateX(100vw); opacity: 0; }
                    }
                    @keyframes dotMoveY {
                      0% { transform: translateY(-10vh); opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateY(100vh); opacity: 0; }
                    }
                    @keyframes marquee-logos {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                  {/* Horizontal moving dots */}
                  <div className="absolute top-[calc(2rem*4-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
                  <div className="absolute top-[calc(2rem*12-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
                  <div className="absolute top-[calc(2rem*20-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
                  <div className="absolute top-[calc(2rem*28-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveX 9s linear infinite 1s' }} />

                  {/* Vertical moving dots */}
                  <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
                  <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
                  <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
                  <div className="absolute left-[calc(2rem*56-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#1c1e54] shadow-[0_0_10px_2px_#1c1e54]" style={{ animation: 'dotMoveY 8s linear infinite 2s' }} />
                </div>
              </div>

              {/* ── Centered Content Overlay ── */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, amount: 0.1 }} className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
                <h1
                  className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-medium text-[#0d253d] leading-[1.1] tracking-tight text-center"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Enterprise Grade
                  <br className="hidden sm:block" />
                  <span className="inline-block relative min-w-[280px] sm:min-w-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroTextIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                        style={{
                          background: 'linear-gradient(to right, #533afd, #2563eb)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontFamily: 'var(--font-quicksand)'
                        }}
                      >
                        {heroTextIndex === 0 ? 'Agentic AI Solutions' : 'Data Migration Solutions'}
                      </motion.span>
                    </AnimatePresence>
                    {/* Invisible span to maintain correct document flow width */}
                    <span className="opacity-0 invisible whitespace-nowrap pointer-events-none" aria-hidden="true">
                      Data Migration Solutions
                    </span>
                  </span>
                </h1>

                <p
                  className="text-lg md:text-xl text-[#64748d] leading-relaxed mt-6 mb-10 max-w-3xl font-medium text-center"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  Aidetic brings you production-ready Agentic AI solutions,<br className="hidden sm:block" />
                  so you skip the build cycle and go straight to impact.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <BookCallDialog>
                    <button
                      id="hero-cta-demo"
                      className="px-6 py-2.5 rounded-md font-bold text-sm text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                      style={{ background: '#533afd', fontFamily: 'var(--font-inter)' }}
                    >
                      Request a Call
                    </button>
                  </BookCallDialog>
                  <Link href="/#products" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 py-2.5 rounded-md font-bold text-sm text-white tracking-widest uppercase bg-slate-900 hover:bg-slate-800 transition-all duration-200 hover:-translate-y-px"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Our Products
                    </button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="mt-16 w-full relative z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <p
                  className="font-bold tracking-[0.25em] text-sm uppercase mb-8 text-center"
                  style={{
                    fontFamily: "var(--font-inter)",
                    background: "linear-gradient(to right, #533afd, #000000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  TRUSTED BY AI-FIRST ENTERPRISES
                </p>

                {/* Marquee wrapper with fade-edge mask */}
                <div
                  className="relative overflow-hidden border-t border-b border-[#533afd]/30 py-8 mb-8"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  {/* Track — doubled for seamless loop */}
                  <div
                    className="flex items-center gap-14 w-max"
                    style={{ animation: "marquee-logos 28s linear infinite" }}
                  >
                    {[
                      { name: "LG", prefix: "🔵" },
                      { name: "Brambles", prefix: null },
                      { name: "TRUIST", suffix: "⊞" },
                      { name: "SEPHORA", prefix: null },
                      { name: "Huel", prefix: null, bold: true },
                      { name: "keyloop", prefix: null },
                      { name: "worldpay", prefix: null },
                      { name: "Snowflake", prefix: null },
                      { name: "Salesforce", prefix: null },
                      { name: "Databricks", prefix: null },
                      /* duplicate for seamless loop */
                      { name: "LG", prefix: "🔵" },
                      { name: "Brambles", prefix: null },
                      { name: "TRUIST", suffix: "⊞" },
                      { name: "SEPHORA", prefix: null },
                      { name: "Huel", prefix: null, bold: true },
                      { name: "keyloop", prefix: null },
                      { name: "worldpay", prefix: null },
                      { name: "Snowflake", prefix: null },
                      { name: "Salesforce", prefix: null },
                      { name: "Databricks", prefix: null },
                    ].map((logo, i) => (
                      <div
                        key={i}
                        className={`text-xl text-[#533afd]/60 hover:text-[#533afd] transition-colors flex items-center gap-2 ${logo.bold ? "font-bold italic text-2xl" : "font-semibold tracking-tight"
                          }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {logo.prefix && <span className="opacity-80 text-sm">{logo.prefix}</span>}
                        {logo.name}
                        {logo.suffix && <span className="opacity-80 text-sm">{logo.suffix}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
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


        <section className="relative py-16 px-6 overflow-hidden snap-start">
          <div className="max-w-6xl mx-auto">

            <motion.div
              className="relative rounded-2xl overflow-hidden px-12 py-14"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* ── Content ── */}
              <div className="relative z-10 text-center space-y-4 mb-12">
                <h2
                  className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15]"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    background: 'linear-gradient(to right, #533afd, #000000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  What Aidetic Brings to the Table
                </h2>
                <p className="text-[#0d253d] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  No dashboards. No waiting. No guesswork. Just decisions backed by your data.
                </p>
              </div>

              {/* ── Stats row ── */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {homeStats.map((stat, i) => (
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
                      <CountUp end={stat.value} suffix={stat.suffix} />
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
                    <p className="text-[#0d253d] text-sm leading-snug whitespace-pre-line px-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Extra Features Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="w-full max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.1 }} className="flex justify-center mb-6">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] text-center pb-2"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Here's who we built our products for
              </h2>
            </motion.div>

            {/* Analytics Section - Layered Design (Agent Factory) */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.2 }} className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-200 p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              {/* Left - Purple Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-gradient-to-br from-[#533afd] to-[#8278E6] rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>AGENT FACTORY</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-white/10 border border-white/20">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black text-white" style={{ fontFamily: "var(--font-inter)" }}>6x</h3>
                  <p className="text-[15px] font-bold text-white/95 leading-snug" style={{ fontFamily: "var(--font-quicksand)" }}>Faster Data-Driven<br />Decision Making</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/80 pt-4 border-t border-white/20">
                  <svg className="w-3.5 h-3.5 text-white/90 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI Data Analyst Integration</span>
                </div>
              </div>

              {/* Right - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-[#0d253d] space-y-3">
                <h3 className="text-base font-bold leading-snug tracking-wide text-[#0d253d]" style={{ fontFamily: "var(--font-inter)" }}>
                  Who is Agent Factory for:
                </h3>
                <p className="text-base leading-relaxed max-w-2xl text-[#64748d]" style={{ fontFamily: "var(--font-quicksand)" }}>
                  Agent Factory is built for business leaders who are tired of
                  waiting on data teams for answers. If you're in marketing, sales,
                  finance, or customer success and you've ever waited days for a
                  report that should've taken minutes. Agent Factory acts as your
                  AI Data Analyst, sitting on top of your company's data and
                  answering your business questions directly.
                </p>
              </div>
            </motion.div>

            {/* Analytics Section - Layered Design (Reversed) */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.2 }} className="relative rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-200 p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              {/* Left - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-[#0d253d] space-y-3 lg:pl-4">
                <h3 className="text-base font-bold leading-snug tracking-wide text-[#0d253d]" style={{ fontFamily: "var(--font-inter)" }}>
                  Who is Data Flash for:
                </h3>
                <p className="text-base leading-relaxed max-w-2xl text-[#64748d]" style={{ fontFamily: "var(--font-quicksand)" }}>
                  DataFlash is built for CTOs, data engineers, and data leaders who
                  are tired of spending months writing custom migration code
                  every time they move to a new platform. If you're migrating
                  databases, consolidating data sources, dataFlash handles it through configuration, not code with
                  built-in validation, quality checks, and audit tracking.
                </p>
              </div>

              {/* Right - Purple Analytics Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-gradient-to-br from-[#533afd] to-[#8278E6] rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>DATA FLASH</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-white/10 border border-white/20">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black text-white" style={{ fontFamily: "var(--font-inter)" }}>100+</h3>
                  <p className="text-[15px] font-bold text-white/95 leading-snug" style={{ fontFamily: "var(--font-quicksand)" }}>hours of efforts saved<br />in Data Migration</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-white/80 pt-4 border-t border-white/20">
                  <svg className="w-3.5 h-3.5 text-white/90 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Automated Database Migration</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Full-Width CTA Section - Hi, I am Anurag ── */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 snap-start scroll-mt-24 overflow-hidden">
          <motion.div
            className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 transition-all duration-300 hover:border-slate-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Avatar */}
            <div className="shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br from-[#533afd] to-blue-500">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative bg-slate-200">
                <Image
                  src="/anurag.jpeg"
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
              <p className="text-sm md:text-base text-[#64748d]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                Curious how our products will help your business? Let's Talk.
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 mt-4 md:mt-0">
              <BookCallDialog>
                <button
                  className="px-8 py-3 rounded-lg font-bold text-sm text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(to right, #533afd, #2563eb)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Request a Call
                </button>
              </BookCallDialog>
            </div>
          </motion.div>
        </section>

        {/* ── Core Capabilities Section ── */}
        <section id="products" className="w-full py-20 border-t border-slate-200 snap-start bg-[#f6f9fc]/50">
          <div className="w-full relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="flex flex-col items-center justify-center text-center pb-16 relative z-10">
              <h2
                className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Top Products
              </h2>
              <p
                className="text-[1rem] sm:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-[#0d253d] leading-relaxed max-w-2xl mb-8"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                Two productised services. Same opinionated approach.
              </p>
            </div>

            {/* Rows of Products */}
            <div className="flex flex-col gap-24 lg:gap-32 mt-8">

              {/* Row 1: Agent Factory */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Content */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col order-2 lg:order-1">
                  <div className="mb-6">
                    <img
                      src="/agent-fac-logo.png"
                      alt="Agent Factory"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-[2rem] lg:text-[2.5rem] font-semibold text-[#0d253d] leading-[1.2] tracking-tight mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                    Ask your business anything.
                  </h3>
                  <p className="text-lg text-[#64748d] leading-relaxed mb-8" style={{ fontFamily: "var(--font-quicksand)" }}>
                    AI agents that answer questions across marketing, sales, finance and ops — straight from your own data, with citations on every answer.
                  </p>

                  {/* 2x2 Feature Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-10 w-full">
                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <Bot size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>One Agent per Function. Each one an Expert.</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#ea2261]/10 flex items-center justify-center text-[#ea2261]">
                        <Brain size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Answers that Explain Themselves.</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Charts and Trend Lines on Demand.</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Agents that Get Smarter Every Week</span>
                    </div>
                  </div>

                  <Link
                    href="/agent-factory"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px w-fit shadow-md"
                    style={{ background: '#533afd', fontFamily: 'var(--font-inter)' }}
                  >
                    Explore Agent Factory
                    <ChevronRight size={14} strokeWidth={3} className="translate-y-[1px]" />
                  </Link>
                </motion.div>

                {/* Right Component Demo */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="order-1 lg:order-2 flex items-center justify-center relative">
                  <div className="w-full max-w-[550px] relative z-10 rounded-xl shadow-[0_20px_50px_rgba(83,58,253,0.15)]">
                    <AIChatDemo />
                  </div>
                  {/* Decorative background blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,_rgba(83,58,253,0.06)_0%,_transparent_70%)] rounded-full -z-10" />
                </motion.div>
              </div>

              {/* Row 2: Data Flash */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Component Demo */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="order-1 lg:order-1 flex items-center justify-center relative">
                  <div className="w-full max-w-[550px] relative z-10 rounded-xl shadow-[0_20px_50px_rgba(83,58,253,0.15)]">
                    <MigrationDemo />
                  </div>
                  {/* Decorative background blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,_rgba(83,58,253,0.06)_0%,_transparent_70%)] rounded-full -z-10" />
                </motion.div>

                {/* Right Content */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col order-2 lg:order-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#533afd]" />
                    <span className="text-xs font-bold text-[#533afd] uppercase tracking-widest">DATA FLASH</span>
                  </div>
                  <h3 className="text-[2rem] lg:text-[2.5rem] font-semibold text-[#0d253d] leading-[1.2] tracking-tight mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                    Move data. Skip the pipeline.
                  </h3>
                  <p className="text-lg text-[#64748d] leading-relaxed mb-8" style={{ fontFamily: "var(--font-quicksand)" }}>
                    Automated migration from any source to any platform. Config-driven, validated, and audit-ready. No pipelines to build. No code to write.
                  </p>

                  {/* 2x2 Feature Grid for Data Flash */}
                  <div className="grid grid-cols-2 gap-4 mb-10 w-full">
                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <Database size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Automated Migration</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#ea2261]/10 flex items-center justify-center text-[#ea2261]">
                        <RefreshCw size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Config-Driven & Validated</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Audit-Ready</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                        <Upload size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>No pipelines to build</span>
                    </div>
                  </div>

                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs text-white tracking-widest uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px w-fit shadow-md"
                    style={{ background: '#533afd', fontFamily: 'var(--font-inter)' }}
                  >
                    Explore Data Flash <ChevronRight size={14} strokeWidth={3} className="translate-y-[1px]" />
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Infrastructure Section ── */}
        <section className="relative w-full bg-gradient-to-br from-[#f6f9fc] via-white to-[#eaf5fd] py-24 px-6 overflow-hidden snap-start border-t border-slate-200">

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* ── Heading ── */}
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight max-w-3xl mx-auto"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: 'linear-gradient(to right, #533afd, #000000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built like infrastructure.<br className="hidden sm:block" /> Shipped like software.
              </h2>
              <h3
                className="text-base md:text-lg text-[#64748d] max-w-2xl mx-auto leading-relaxed font-normal"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                Reliable, observable, deployable. Everything we ship inherits the same opinions about data, evals and security.
              </h3>
            </motion.div>

            {/* ── Features grid ── */}
            <motion.div
              className="border-2 border-[#533afd] rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm shadow-sm shadow-cyan-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cyan-200/60">
                {[
                  {
                    icon: Bot,
                    title: 'Built on your data',
                    description: 'Agents and pipelines live inside your warehouse. Your data never leaves your perimeter.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Audit-ready by default',
                    description: 'Every answer cites its sources. Every migration is validated, versioned and rollback-safe.',
                  },
                  {
                    icon: Zap,
                    title: 'Days, not quarters',
                    description: 'A working agent or pipeline in days. Production rollout in weeks. No 9-month roadmaps.',
                  },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={i}
                      className="p-8 space-y-4 hover:bg-[#f6f9fc]/40 transition-colors duration-300"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#f6f9fc] border border-[#665efd]">
                        <Icon className="w-5 h-5 text-[#533afd]" strokeWidth={1.5} />
                      </div>
                      <h3
                        className="text-base font-bold text-[#0d253d] tracking-wide"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-sm text-[#64748d] leading-relaxed">{f.description}</p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Horizontal divider between rows */}
              <div className="border-t-2 border-[#665efd]/60" />

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cyan-200/60">
                {[
                  {
                    icon: Plug,
                    title: '60+ connectors',
                    description: 'Salesforce, SAP, Snowflake, BigQuery, Postgres, Mongo, Excel — we already speak it.',
                  },
                  {
                    icon: Activity,
                    title: 'Observable, always',
                    description: 'Live dashboards for every agent and migration. Set SLAs. Get pinged before users do.',
                  },
                  {
                    icon: Layers,
                    title: 'Bring your own model',
                    description: 'OpenAI, Anthropic, open-source, your private endpoint — we run on whatever you trust.',
                  },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={i + 3}
                      className="p-8 space-y-4 hover:bg-[#f6f9fc]/40 transition-colors duration-300"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#f6f9fc] border border-[#665efd]">
                        <Icon className="w-5 h-5 text-[#533afd]" strokeWidth={1.5} />
                      </div>
                      <h3
                        className="text-base font-bold text-[#0d253d] tracking-wide"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-sm text-[#64748d] leading-relaxed">{f.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Sticky Sidebar with Scrolling Cards Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

              {/* Left Sticky Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 pt-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                  <span>Scroll to explore</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: 'PRE-BUILT APPLICATIONS', id: 'prebuilt' },
                    { label: 'APPLICATION ACCELERATORS', id: 'accelerators' },
                    { label: 'TAILORED APPLICATIONS', id: 'tailored' },
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToSection(tab.id)}
                      className={`w-full px-5 py-4 rounded-[14px] font-bold text-[11px] tracking-wider transition-all duration-300 text-left ${activeTab === tab.id
                        ? 'bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white shadow-lg'
                        : 'bg-white/60 text-[#3a4752] hover:bg-white border border-white/50 hover:border-black/5'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Content Area (Scrolls Naturally) */}
              <div className="lg:col-span-9 space-y-12">
                {/* Header above the grid */}
                <div className="space-y-4 max-w-3xl pt-2">
                  <h2
                    className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #533afd, #000000)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Use purpose-built agentic AI applications
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed font-medium" style={{ fontFamily: "var(--font-quicksand)" }}>
                    We solve the most urgent industry and enterprise challenges with regulation-approved applications.
                  </p>
                </div>

                {/* 6 Cards in a 2-Column Grid */}
                <div className="grid sm:grid-cols-2 gap-6 relative pb-24">
                  {[
                    {
                      id: 'prebuilt',
                      title: 'Banking AI ',
                      titleHighlight: 'Agents',
                      desc: 'Automate complex financial workflows with pre-trained agents for fraud detection and customer support.',
                      buttons: ['EXPLORE BANKING', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'Hi Olivia, I see you recently filed a fraud claim for $250. Are you contacting us about this?' },
                        { type: 'user', text: 'Yes, that\'s right. But I can\'t use my debit card.' }
                      ]
                    },
                    {
                      id: 'prebuilt',
                      title: 'Healthcare AI ',
                      titleHighlight: 'Agents',
                      desc: 'HIPAA-compliant agents designed for patient triaging, appointment scheduling, and automated verification.',
                      buttons: ['EXPLORE HEALTH', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'Is the claim for yourself or another person under your plan?' },
                        { type: 'user', text: 'For myself' },
                        { type: 'ai', text: 'Understood. I have pulled up your policy details. One moment...' }
                      ]
                    },
                    {
                      id: 'accelerators',
                      title: 'Knowledge ',
                      titleHighlight: 'Accelerator',
                      desc: 'Instantly ingest entire document repositories and transform them into searchable intelligence for your teams.',
                      buttons: ['TRY ACCELERATOR', 'DOCS'],
                      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop']
                    },
                    {
                      id: 'accelerators',
                      title: 'Telecom AI ',
                      titleHighlight: 'Agents',
                      desc: 'Scale your customer service with intelligent agents that handle plan upgrades, technical support, and billing queries.',
                      buttons: ['TELECOM SOLUTIONS', 'DEMO'],
                      images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop'],
                      conversations: [
                        { type: 'ai', text: 'I see you\'re looking to upgrade your plan. Would you like to see our latest 5G options?' },
                        { type: 'user', text: 'Yes, what\'s the best value for 3 lines?' }
                      ]
                    },
                    {
                      id: 'tailored',
                      title: 'Enterprise HR ',
                      titleHighlight: 'Solution',
                      desc: 'A bespoke AI agent fully integrated with your HR systems. Handles onboarding and benefits with complete privacy.',
                      buttons: ['HR SOLUTIONS', 'CASE STUDY'],
                      images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop']
                    },
                    {
                      id: 'tailored',
                      title: 'Custom Retail ',
                      titleHighlight: 'Intelligence',
                      desc: 'Deeply integrated retail agents that manage inventory and personalized shopping experiences.',
                      buttons: ['RETAIL AI', 'PORTFOLIO'],
                      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop']
                    }
                  ].map((card, i) => (
                    <div
                      key={i}
                      id={`purpose-card-${i}`}
                      data-section-id={card.id}
                      className="flex flex-col gap-6 rounded-[1.5rem] bg-white/90 backdrop-blur-sm border border-white/60 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 scroll-m-32 h-full"
                    >
                      {/* Card Content (Top) */}
                      <div className="flex flex-col space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-medium text-foreground" style={{ fontFamily: "var(--font-inter)" }}>
                            {card.title}
                            <span className="text-[#ea2261]">{card.titleHighlight}</span>
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-[14px]" style={{ fontFamily: "var(--font-quicksand)" }}>
                            {card.desc}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {card.buttons.map((btn, j) => (
                            <button
                              key={j}
                              className={`px-4 py-2 rounded-lg font-bold text-[10px] tracking-widest transition-all border ${j === 0
                                ? 'bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white border-transparent hover:opacity-90'
                                : 'bg-transparent text-foreground border-[#ea2261]/30 hover:border-[#ea2261]'
                                }`}
                            >
                              {btn} {j === 0 && <span className="ml-1 opacity-50">•</span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Card Images */}
                      {card.images && card.images.length > 0 && (
                        <div className="flex gap-4 pt-2">
                          {card.images.map((img, j) => (
                            <div key={j} className="flex-1 rounded-2xl overflow-hidden shadow-sm relative min-h-[140px] border border-border/40">
                              <img
                                src={img}
                                alt="Feature"
                                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Card Conversations (Bottom - if exists) */}
                      {card.conversations && card.conversations.length > 0 && (
                        <div className="mt-auto flex-1 space-y-4 relative bg-muted/30 rounded-2xl p-4 border border-border/40 min-h-[160px]">
                          {/* Faded bottom overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none z-10 rounded-b-2xl" />

                          {card.conversations.map((msg, j) => (
                            <div key={j} className={`flex gap-2 items-start ${msg.type === 'user' ? 'justify-end' : ''}`}>
                              {msg.type === 'ai' && (
                                <div className="w-4 h-4 rounded-full border-[3px] border-[#ea2261]/40 flex-shrink-0 mt-1" />
                              )}

                              <div className={`text-[11px] leading-relaxed px-3 py-2 rounded-2xl max-w-[90%] shadow-sm ${msg.type === 'user'
                                ? 'bg-white border border-border/30 text-foreground font-medium rounded-tr-sm'
                                : 'bg-transparent text-muted-foreground'
                                }`}>
                                {msg.text}
                              </div>

                              {msg.type === 'user' && (
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-border mt-1">
                                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Industry Solutions Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-4">
                  <h2
                    className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #533afd, #000000)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    We&apos;ve built our business by serving global enterprises
                  </h2>
                  <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-quicksand)" }}>
                    Trust us, we&apos;ve learned from the best.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="text-muted-foreground leading-relaxed">
                  <p style={{ fontFamily: "var(--font-quicksand)" }}>Discover why hundreds of enterprises use our platform.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="flex gap-4 flex-wrap">
                  <button className="px-6 py-3 bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95">
                    REQUEST A DEMO
                  </button>
                  <button className="px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-[#ea2261] hover:text-[#ea2261] transition-all hover:scale-105 active:scale-95">
                    LET&apos;S TALK
                  </button>
                </motion.div>
              </div>

              {/* Right Content - Tabbed Cards */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Tabs */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex gap-3 flex-wrap">
                    {['Banking', 'Healthcare', 'Retail', 'Telecom + Media', 'Business'].map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndustryTab(tab.toLowerCase().replace(/\s/g, ''))}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activeIndustryTab === tab.toLowerCase().replace(/\s/g, '')
                          ? 'bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </motion.div>

                  {/* Cards Carousel */}
                  <div className="relative w-full overflow-hidden pb-4">
                    <div
                      className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{
                        transform: `translateX(-${Math.max(0, ['banking', 'healthcare', 'retail', 'telecom+media', 'business'].indexOf(activeIndustryTab)) * 70}%)`
                      }}
                    >
                      {[
                        {
                          id: 'banking',
                          title: 'Banks, Credit Unions, Financial Institutions',
                          subtitle: 'Trusted by banking leaders',
                          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
                          logos: ['EGON', 'Assurant', 'Morgan Stanley', 'Sabadell']
                        },
                        {
                          id: 'healthcare',
                          title: 'Payers, Providers, Life Sciences',
                          subtitle: 'Trusted by healthcare leaders',
                          image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop',
                          logos: ['Florida Blue', 'Roche']
                        },
                        {
                          id: 'retail',
                          title: 'Retail & Consumer Goods',
                          subtitle: 'Trusted by retail leaders',
                          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
                          logos: ['ShopJapan', 'Myntra']
                        },
                        {
                          id: 'telecom+media',
                          title: 'Telecom, Media, Communications',
                          subtitle: 'Trusted by telecom leaders',
                          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
                          logos: ['T-Mobile', 'Frontier', 'NetApp', 'ebay']
                        },
                        {
                          id: 'business',
                          title: 'B2B Goods and Services',
                          subtitle: 'Trusted by business leaders',
                          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
                          logos: ['Nippon Steel', 'Genpact']
                        }
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="w-[70%] shrink-0 pr-4 sm:pr-6 lg:pr-8"
                        >
                          <div className="relative rounded-3xl overflow-hidden h-[450px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Background Image */}
                            <img
                              src={card.image}
                              alt={card.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-8">
                              <div>
                                <h3 className="text-3xl font-medium text-white leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
                                  {card.title}
                                </h3>
                              </div>

                              <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold" style={{ fontFamily: "var(--font-quicksand)" }}>
                                  {card.subtitle}:
                                </p>
                                {/* Scrolling company marquee */}
                                <div className="overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                                  <div
                                    className="flex gap-2 w-max ticker-rtl"
                                  >
                                    {[...companies, ...companies].map((c, j) => (
                                      <span
                                        key={j}
                                        className="shrink-0 px-4 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap"
                                      >
                                        {c.label}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Customer Testimonials Carousel Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-start justify-between">
              <div className="space-y-2">
                <h2
                  className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] pb-2"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    background: 'linear-gradient(to right, #533afd, #000000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Customer testimonials
                </h2>
                <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-quicksand)" }}>
                  Discover how organizations deliver AI value with our platform.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const carousel = document.getElementById('testimonials-carousel')
                    if (carousel) {
                      carousel.scrollBy({ left: -400, behavior: 'smooth' })
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    const carousel = document.getElementById('testimonials-carousel')
                    if (carousel) {
                      carousel.scrollBy({ left: 400, behavior: 'smooth' })
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#533afd] to-[#ea2261] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Testimonials Carousel */}
            <div
              id="testimonials-carousel"
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[
                {
                  company: 'Morgan Stanley',
                  quote: 'What I was really trying to solve was how to give 15-20 minutes back each day to our financial advisors. That extra time lets them reach out to customers more quickly, more effectively, or even make one additional phone call — and that\'s a real revenue driver for us.'
                },
                {
                  company: 'Pfizer',
                  quote: 'Since we started with our platform, we\'ve deployed 60 AI agents across the enterprise—covering research, development, medical, commercial, and manufacturing across global markets and multiple languages. We needed a scalable platform, and these agents will only continue to become more intelligent.'
                },
                {
                  company: 'Mphasis',
                  quote: 'We are proud to be a strategic implementation partner of our platform, and we feel especially confident knowing that the foundation on AWS, delivering unmatched reliability and scalability.'
                },
                {
                  company: 'Microsoft',
                  quote: 'Our strategic partnership marks a significant milestone in our mission to accelerate enterprise AI transformation. By integrating advanced conversational and GenAI capabilities with Microsoft\'s robust cloud and AI services, we are enabling enterprises to adopt AI at scale and with enterprise-grade security.'
                },
                {
                  company: 'AMD',
                  quote: 'In the moments that matter most, of course, employees want to connect with people. Overall, our employees want to engage with the employees they serve and be present in the interactions that deliver higher satisfaction.'
                },
                {
                  company: 'AWS',
                  quote: 'We are excited to collaborate on shared cloud initiatives and customer solutions. The partnership demonstrates our commitment to providing enterprise customers with the best-in-class AI and cloud solutions.'
                }
              ].map((testimonial, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 + (i % 3) * 0.1 }} viewport={{ once: true }} className="flex-shrink-0 w-80 rounded-2xl bg-white border border-slate-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 snap-start">
                  {/* Company Name */}
                  <h3 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                    {testimonial.company}
                  </h3>

                  {/* Quote */}
                  <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-quicksand)" }}>
                    "{testimonial.quote}"
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="">
              {/* <button className="px-6 py-3 bg-foreground text-primary-foreground font-semibold rounded-lg hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                MORE CUSTOMER STORIES →
              </button> */}
            </motion.div>
          </div>
        </section>

        <HomeFaqSection />

      </main>
      <div className="snap-start w-full">
        <Footer />
      </div>
    </>
  )
}
