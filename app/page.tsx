'use client'
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Bot, ChevronDown, Database, MousePointer2, RefreshCw, Send, Upload } from "lucide-react";
import { Outfit, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
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

const caseStudies = [
  {
    id: 'case-1',
    brandName: 'FinTech Corp',
    title: 'Reducing Data Migration Time by 80%',
    description: 'How a leading financial services firm used Data Flash to migrate 50TB of legacy data to Databricks in record time.',
    metrics: [
      { value: '80%', label: 'Time Saved', highlight: true },
      { value: '50TB', label: 'Data Migrated' }
    ],
    ctaText: 'Read Success Story',
    offsetX: 0,
    offsetY: 0,
    zIndex: 10
  },
  {
    id: 'case-2',
    brandName: 'Retail Giants',
    title: 'Automating Business Intelligence',
    description: 'Implementing Agent Factory to provide real-time inventory insights to 500+ store managers across the country.',
    metrics: [
      { value: '10x', label: 'Faster Reports', highlight: true },
      { value: '500+', label: 'Active Users' }
    ],
    ctaText: 'View Case Study',
    offsetX: 80,
    offsetY: 100,
    zIndex: 20
  },
  {
    id: 'case-3',
    brandName: 'HealthData Inc',
    title: 'HIPAA Compliant Data Synthesis',
    description: 'Enabling secure research on sensitive patient records using our advanced anonymization and analysis pipeline.',
    metrics: [
      { value: '100%', label: 'Compliance', highlight: true },
      { value: '2M+', label: 'Records Processed' }
    ],
    ctaText: 'Explore Solution',
    offsetX: 160,
    offsetY: 200,
    zIndex: 30
  }
]

const migrationSteps = [
  "upload",
  "fileSelected",
  "migration",
  "complete"
];

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
      className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.05)] min-h-[620px] flex flex-col relative"
    >

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

        {/* header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B2340] flex items-center justify-center">
              <Database size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Data Flash</h2>
              <p className="text-xs text-slate-400">Move enterprise data automatically</p>
            </div>
          </div>
          <Link href="#products">
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B2340] to-[#DC2626] flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-all duration-200 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

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
                  <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#1B2340] to-[#DC2626] text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all w-[220px]">
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
                          <p className="font-semibold text-[13px] text-slate-800">
                            config.csv
                          </p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
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
                            className="mb-1 text-[#DC2626]"
                          >
                            <RefreshCw size={16} />
                          </motion.div>
                          <div className="text-center">
                            <p className="font-bold text-[8px] text-slate-900 leading-tight">DATA</p>
                            <p className="font-bold text-[8px] text-[#DC2626] leading-tight">FLASH</p>
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
                            <div className="bg-[#DC2626] text-white rounded-md px-2 py-0.5 text-[9px] font-bold shadow-sm">
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
                    <div className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl p-3 sm:p-4 flex flex-col items-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                      <Database className="text-slate-500 mb-2" size={20} />
                      <div className={`flex items-center gap-1 px-2 py-1 rounded w-full justify-between transition-colors ${step === 3 ? 'bg-slate-100' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-xs font-medium truncate">{step > 3 ? 'Snowflake' : 'Select'}</span>
                        <ChevronDown size={12} className="text-slate-400" />
                      </div>
                    </div>
                    {/* Source Menu */}
                    <AnimatePresence>
                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-slate-800"
                        >
                          {['MongoDB', 'Snowflake', 'PostgreSQL', 'MSSQL', 'MySQL'].map(opt => (
                            <div key={opt} className={`px-3 py-2 text-xs cursor-pointer ${opt === 'Snowflake' ? 'bg-slate-50 font-semibold text-[#DC2626]' : 'hover:bg-slate-50'}`}>
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dest Dropdown */}
                  <div className="relative w-[120px] sm:w-[140px]">
                    <div className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl p-3 sm:p-4 flex flex-col items-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                      <Database className="text-slate-500 mb-2" size={20} />
                      <div className={`flex items-center gap-1 px-2 py-1 rounded w-full justify-between transition-colors ${step === 4 ? 'bg-slate-100' : 'bg-slate-50 border border-slate-100'}`}>
                        <span className="text-xs font-medium truncate">{step > 4 ? 'Databricks' : 'Select'}</span>
                        <ChevronDown size={12} className="text-slate-400" />
                      </div>
                    </div>
                    {/* Dest Menu */}
                    <AnimatePresence>
                      {step === 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-slate-800"
                        >
                          {['AWS', 'Azure', 'Databricks'].map(opt => (
                            <div key={opt} className={`px-3 py-2 text-xs cursor-pointer ${opt === 'Databricks' ? 'bg-slate-50 font-semibold text-[#DC2626]' : 'hover:bg-slate-50'}`}>
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Button / Pipeline Container */}
                <div className="flex justify-center items-center mt-12 relative z-20 h-[80px] w-full">
                  <AnimatePresence mode="wait">
                    {step < 6 ? (
                      <motion.button
                        key="start-btn"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={step === 5 ? { scale: [1, 0.95, 1], opacity: 1 } : { opacity: 0.5 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-gradient-to-r from-[#1B2340] to-[#DC2626] text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
                      >
                        Start Migration <ArrowRight size={18} />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="pipeline-blocks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start sm:justify-center items-center w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {['Create Bundle', 'Validate Bundle', 'Deploy Bundle', 'Run Migration'].map((title, idx, arr) => (
                          <div key={title} className="flex items-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, borderColor: "#f8fafc" }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                borderColor: step >= 7 ? "#f8fafc" : ["#f8fafc", "#DC2626", "#f8fafc"],
                                boxShadow: step >= 7
                                  ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                                  : [
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                    "0 4px 12px -2px rgba(220, 38, 38, 0.3)",
                                    "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                                  ]
                              }}
                              transition={{
                                opacity: { delay: idx * 0.15 },
                                scale: { delay: idx * 0.15 },
                                borderColor: { delay: idx * 0.3, duration: 1.5, repeat: step >= 7 ? 0 : Infinity, ease: "easeInOut" },
                                boxShadow: { delay: idx * 0.3, duration: 1.5, repeat: step >= 7 ? 0 : Infinity, ease: "easeInOut" }
                              }}
                              className="bg-white border-2 rounded-xl flex flex-col items-center justify-center w-[80px] h-[60px] sm:w-[110px] sm:h-[70px]"
                            >
                              {title.split(' ').map(word => (
                                <span key={word} className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-tight">{word}</span>
                              ))}
                            </motion.div>

                            {idx < arr.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.15 + 0.1 }}
                                className="mx-2 sm:mx-3"
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
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      </div>
                      <div className="opacity-90 space-y-1.5">
                        <p>{'>'} Initializing DataFlash engine.</p>
                        <p>{'>'} Validating schemas and mapping types.</p>
                        {progress > 30 && <p>{'>'} Transferring data blocks to Databricks.</p>}
                        {progress === 100 && <p className="font-bold">{'>'} Migration successful.</p>}
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
                        <span className="font-medium text-slate-700">Migration Progress</span>
                        <span className="text-[#DC2626] font-bold">{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#DC2626]"
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
      className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-[0_8px_32px_-6px_rgba(0,0,0,.05)] min-h-[620px] relative flex flex-col"
    >

      <div className="relative flex-1 p-6 flex flex-col ">
        {/* header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B2340] flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Agent Factory</p>
              <p className="text-xs text-slate-400"> Ask business related queries</p>
            </div>
          </div>
          <Link href="#products">
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B2340] to-[#DC2626] flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-all duration-200 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

        {/* chat history area */}
        <div className="mt-6 flex-1 flex flex-col">
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
                  <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl px-5 py-3 max-w-[320px] text-sm shadow-sm font-medium">
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
                      <Bot size={16} className="text-slate-400 mr-2" />
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, delay: i * .15, duration: 0.6 }}
                          className="w-2 h-2 rounded-full bg-[#DC2626]"
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
                            className="bg-slate-50 border rounded-xl p-3 shadow-sm"
                          >
                            <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-slate-500 mb-1">{item[0]}</p>
                            <p className="font-bold text-base sm:text-lg text-[#DC2626]">{item[1]}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* fake chart */}
                      <div className="bg-slate-50 border rounded-xl p-4 shadow-sm">
                        <div className="flex gap-2 h-[60px] items-end justify-between px-2">
                          {[35, 65, 55, 90, 60, 75].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: h * 0.75 }}
                              transition={{ delay: i * .1, type: "spring", stiffness: 100 }}
                              className="w-8 bg-[#1B2340] rounded-t-md"
                            />
                          ))}
                        </div>
                      </div>

                      {/* fake table */}
                      <div className="bg-slate-50 border rounded-xl p-4 shadow-sm overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-200">
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
                                <td className="py-2 font-medium">{r[0]}</td>
                                <td className="py-2 text-slate-600">{r[1]}</td>
                                <td className="py-2 text-[#DC2626] font-medium">{r[2]}</td>
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
            : 'mt-3 relative'
            }`}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative bg-white border-2 border-slate-200 rounded-full px-5 py-4 flex gap-3 justify-between items-center shadow-lg bg-opacity-90 backdrop-blur-sm">

            {/* Select Agent Dropdown */}
            <div className="relative shrink-0">
              <button className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors">
                {state >= 3 ? "CRM Agent" : "Select Agent"} <ChevronDown size={12} className="text-slate-500" />
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
                      <div key={opt} className={`px-4 py-2 text-xs cursor-pointer ${opt === 'CRM' ? 'bg-slate-50 font-bold text-[#DC2626]' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {opt}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 overflow-hidden">
              {state <= 2 && (
                <div className="whitespace-nowrap overflow-hidden text-sm text-slate-400">
                  Ask AI...
                </div>
              )}
              {state === 3 && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="whitespace-nowrap overflow-hidden text-sm font-medium text-slate-800"
                >
                  Show Q2 revenue trends and top regions
                </motion.div>
              )}
              {state === 4 && (
                <div className="whitespace-nowrap text-sm font-medium text-slate-800">
                  Show Q2 revenue trends and top regions
                </div>
              )}
              {state >= 5 && (
                <div className="whitespace-nowrap text-sm text-slate-400">
                  Ask AI...
                </div>
              )}
            </div>

            <motion.button
              animate={state === 4 ? { scale: [1, 1.2, 1], color: ["#64748b", "#DC2626", "#64748b"] } : {}}
              transition={{ duration: 0.4 }}
              className={`text-slate-400 shrink-0 ${state >= 5 ? 'opacity-50' : 'hover:text-slate-600'}`}
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

  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('prebuilt')
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking')
  const [animatedElements, setAnimatedElements] = useState<Record<string, boolean>>({})

  // Handle scroll spy for the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Animate elements
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })

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

    document.querySelectorAll('[data-animate], [data-section-id]').forEach((el) => observer.observe(el))
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
          <div className="max-w-8xl mx-auto px-6 lg:px-10">

            {/* ── Upper half: centered layout ── */}
            <div className="relative flex flex-col items-center justify-center text-center rounded-t-2xl overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-12 px-6">

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
                  `}</style>
                  {/* Horizontal moving dots */}
                  <div className="absolute top-[calc(2rem*4-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 6s linear infinite' }} />
                  <div className="absolute top-[calc(2rem*12-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 8s linear infinite 2s' }} />
                  <div className="absolute top-[calc(2rem*20-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 7s linear infinite 4s' }} />
                  <div className="absolute top-[calc(2rem*28-2px)] left-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveX 9s linear infinite 1s' }} />

                  {/* Vertical moving dots */}
                  <div className="absolute left-[calc(2rem*8-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 7s linear infinite 1s' }} />
                  <div className="absolute left-[calc(2rem*24-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 9s linear infinite 3s' }} />
                  <div className="absolute left-[calc(2rem*40-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 6s linear infinite 5s' }} />
                  <div className="absolute left-[calc(2rem*56-2px)] top-0 w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_2px_#DC2626]" style={{ animation: 'dotMoveY 8s linear infinite 2s' }} />
                </div>
              </div>

              {/* ── Centered Content Overlay ── */}
              <div
                id="hero-headline"
                data-animate
                className={`relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto transition-all duration-700 ${animatedElements['hero-headline'] ? 'animate-slide-up' : 'opacity-0'}`}
              >
                <h1 className={`text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold text-[#1B2340] leading-[1.1] tracking-tight ${outfit.className}`}>
                  Enterprise Grade
                  <br className="hidden sm:block" />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-medium tracking-normal block mt-2 lg:mt-3 ${playfair.className}`}>
                    Agentic AI Solutions
                  </span>
                </h1>

                <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mt-6 mb-10 max-w-2xl font-medium">
                  Production-ready Agentic AI solutions that help you automate complex workflows, migrate data, and generate insights at enterprise scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <Link href="/dashboard/blogs/create" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#1B2340] to-[#DC2626] text-white rounded-xl font-semibold text-base hover:opacity-90 transition-all duration-200 hover:shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)]">
                      Get a Demo
                    </button>
                  </Link>
                  <Link href="/#products" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-white/80 backdrop-blur-sm text-[#1B2340] rounded-xl font-semibold text-base border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>

            </div>

            {/* ── Lower half: gray product showcase panel ── */}
            <div className="max-w-[90rem] mx-auto mt-6 mb-10 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/90 to-slate-50 border border-slate-200 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)]">

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 px-6 lg:px-16 xl:px-24 max-w-7xl mx-auto pt-12 pb-16">
                {/* ---------------- Agent Factory ---------------- */}
                <AIChatDemo />
                {/* ---------------- Data Flash ---------------- */}

                <MigrationDemo />

              </div>
            </div>

          </div>
        </section>


        {/* ── Extra Features Section ── */}
        <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="w-full max-w-[90rem] mx-auto space-y-6">
            {/* Header */}
            <div
              id="extra-features-header"
              data-animate
              className={`flex justify-center mb-6 ${animatedElements['extra-features-header'] ? 'animate-slide-down' : 'opacity-0'
                }`}
            >
              <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground text-center">
                Here's who we built our products for
              </h2>
            </div>

            {/* Analytics Section - Layered Design (Agent Factory) */}
            <div
              id="analytics-section"
              data-animate
              className={`relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(27,35,64,0.3)] bg-gradient-to-br from-[#1B2340] to-[#8278E6] p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${animatedElements['analytics-section'] ? 'animate-scale-block' : 'opacity-0'
                }`}
              style={{ animationDelay: '100ms' }}
            >
              {/* Left - White Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-white rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-slate-900 tracking-wide">AGENT FACTORY</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-slate-50 border border-slate-100">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H8m9 0v9" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-br from-[#1B2340] to-[#8278E6]">6x</h3>
                  <p className="text-[15px] font-bold text-slate-700 leading-snug">Faster Data-Driven<br />Decision Making</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pt-4 border-t border-slate-100/80">
                  <svg className="w-3.5 h-3.5 text-[#8278E6] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI Data Analyst Integration</span>
                </div>
              </div>

              {/* Right - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-white space-y-3">
                <h3 className="text-2xl lg:text-[2rem] font-bold leading-tight tracking-tight text-white/95">
                  Who is Agent Factory for:
                </h3>
                <p className="text-white/80 text-[14px] leading-relaxed max-w-2xl font-medium">
                  Agent Factory is built for business leaders who are tired of
                  waiting on data teams for answers. If you're in marketing, sales,
                  finance, or customer success and you've ever waited days for a
                  report that should've taken minutes. Agent Factory acts as your
                  AI Data Analyst, sitting on top of your company's data and
                  answering your business questions directly.
                </p>
              </div>
            </div>


            {/* Analytics Section - Layered Design (Reversed) */}
            <div
              id="analytics-section-reversed"
              data-animate
              className={`relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(27,35,64,0.3)] bg-gradient-to-bl from-[#1B2340] to-[#DC2626] p-5 lg:p-8 min-h-[280px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${animatedElements['analytics-section-reversed'] ? 'animate-scale-block' : 'opacity-0'
                }`}
              style={{ animationDelay: '200ms' }}
            >
              {/* Left - Text Overlay on Background */}
              <div className="flex-1 flex flex-col justify-center text-white space-y-3 lg:pl-4">
                <h3 className="text-2xl lg:text-[2rem] font-bold leading-tight tracking-tight text-white/95">
                  Who is Data Flash for:
                </h3>
                <p className="text-white/80 text-[14px] leading-relaxed max-w-2xl font-medium">
                  DataFlash is built for CTOs, data engineers, and data leaders who
                  are tired of spending months writing custom migration code
                  every time they move to a new platform. If you're migrating
                  databases, consolidating data sources, or modernizing your data
                  stack. DataFlash handles it through configuration, not code with
                  built-in validation, quality checks, and audit tracking.
                </p>
              </div>

              {/* Right - White Analytics Card (Smaller, Contained) */}
              <div className="flex-shrink-0 w-full lg:w-[360px] bg-white rounded-xl p-5 lg:p-7 space-y-5 shadow-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-slate-900 tracking-wide">DATA FLASH</h4>
                  <button className="w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 hover:bg-slate-50 border border-slate-100">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[3.5rem] leading-none tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-br from-[#1B2340] to-[#DC2626]">100+</h3>
                  <p className="text-[15px] font-bold text-slate-700 leading-snug">hours of efforts saved<br />in Data Migration</p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pt-4 border-t border-slate-100/80">
                  <svg className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Automated Database Migration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Full-Width CTA Section - Hi, I am Anurag ── */}
        <section className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 snap-start scroll-mt-24">
          <div
            id="cta-accelerate"
            data-animate
            className={`relative bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300 hover:border-slate-300 hover:shadow-lg max-w-none ${animatedElements['cta-accelerate'] ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full border border-slate-200 flex-shrink-0 shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Anurag"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left space-y-1">
                <p className="text-xl font-medium text-slate-900">Hi, I am Anurag.</p>
                <p className="text-xl text-slate-600">Curious how our products can help you?</p>
                <p className="text-xl font-black text-slate-900 tracking-tight uppercase">Let&apos;s Talk</p>
              </div>
            </div>

            <Link href="/dashboard">
              <button className="px-10 py-4 bg-gradient-to-r from-[#1B2340] to-[#DC2626] rounded-2xl font-bold text-xl text-white hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(220,38,38,0.25)] whitespace-nowrap">
                Book a Demo
              </button>
            </Link>
          </div>
        </section>

        {/* ── Core Capabilities Section ── */}
        <section id="products" className="w-full border-t border-slate-200 snap-start scroll-mt-24">
          <div className="w-full relative">

            {/* Section Header */}
            <div className="flex flex-col items-center justify-center text-center pt-8 sm:pt-10 pb-4 sm:pb-6 relative z-10 max-w-3xl mx-auto px-4">
              <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground">
                Our Core Capabilities
              </h2>
            </div>

            <div className="w-full relative z-10">

              {/* --- DATA FLASH SUB-SECTION --- */}
              <div className="sticky w-full overflow-hidden top-[6rem] z-10 bg-slate-50 h-auto min-h-[680px] flex flex-col justify-center">

                {/* 2-col: Hub diagram + Capability grid */}
                <div className="grid lg:grid-cols-2 gap-0 items-stretch relative w-full max-w-[90rem] mx-auto">

                  {/* LEFT: Hub Diagram */}
                  <div className="hidden lg:block relative w-full h-[700px] z-0 bg-[#1B2340] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 700" preserveAspectRatio="none">
                      <defs>
                        <style>{`
                      @keyframes df-pulse {
                        0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0}
                      }
                      /* Left 12 paths */
                      .df-pl-1{animation:df-pulse 2s infinite ease-in-out 0s;offset-path:path('M 210 33 C 250 33,250 350,300 350')}
                      .df-pl-2{animation:df-pulse 2s infinite ease-in-out 0.16s;offset-path:path('M 210 88 C 250 88,250 350,300 350')}
                      .df-pl-3{animation:df-pulse 2s infinite ease-in-out 0.33s;offset-path:path('M 210 143 C 250 143,250 350,300 350')}
                      .df-pl-4{animation:df-pulse 2s infinite ease-in-out 0.5s;offset-path:path('M 210 198 C 250 198,250 350,300 350')}
                      .df-pl-5{animation:df-pulse 2s infinite ease-in-out 0.66s;offset-path:path('M 210 253 C 250 253,250 350,300 350')}
                      .df-pl-6{animation:df-pulse 2s infinite ease-in-out 0.83s;offset-path:path('M 210 308 C 250 308,250 350,300 350')}
                      .df-pl-7{animation:df-pulse 2s infinite ease-in-out 1s;offset-path:path('M 210 363 C 250 363,250 350,300 350')}
                      .df-pl-8{animation:df-pulse 2s infinite ease-in-out 1.16s;offset-path:path('M 210 418 C 250 418,250 350,300 350')}
                      .df-pl-9{animation:df-pulse 2s infinite ease-in-out 1.33s;offset-path:path('M 210 473 C 250 473,250 350,300 350')}
                      .df-pl-10{animation:df-pulse 2s infinite ease-in-out 1.5s;offset-path:path('M 210 528 C 250 528,250 350,300 350')}
                      .df-pl-11{animation:df-pulse 2s infinite ease-in-out 1.66s;offset-path:path('M 210 583 C 250 583,250 350,300 350')}
                      .df-pl-12{animation:df-pulse 2s infinite ease-in-out 1.83s;offset-path:path('M 210 638 C 250 638,250 350,300 350')}

                      /* Right 5 paths */
                      .df-pr-1{animation:df-pulse 2s infinite ease-in-out 0.5s;offset-path:path('M 500 350 C 540 350,540 110,590 110')}
                      .df-pr-2{animation:df-pulse 2s infinite ease-in-out 0.9s;offset-path:path('M 500 350 C 540 350,540 230,590 230')}
                      .df-pr-3{animation:df-pulse 2s infinite ease-in-out 1.3s;offset-path:path('M 500 350 L 590 350')}
                      .df-pr-4{animation:df-pulse 2s infinite ease-in-out 1.7s;offset-path:path('M 500 350 C 540 350,540 470,590 470')}
                      .df-pr-5{animation:df-pulse 2s infinite ease-in-out 1.1s;offset-path:path('M 500 350 C 540 350,540 590,590 590')}
                    `}</style>
                        <filter id="df-glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      {/* Left paths */}
                      {[33, 88, 143, 198, 253, 308, 363, 418, 473, 528, 583, 638].map(y => (
                        <path key={`l-path-${y}`} d={`M 210 ${y} C 250 ${y}, 250 350, 300 350`} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      ))}
                      {/* Right paths */}
                      <path d="M 500 350 C 540 350, 540 110, 590 110" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 350 C 540 350, 540 230, 590 230" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 350 L 590 350" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 350 C 540 350, 540 470, 590 470" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      <path d="M 500 350 C 540 350, 540 590, 590 590" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                      {/* Pulse dots */}
                      {Array.from({ length: 12 }).map((_, i) => `df-pl-${i + 1}`)
                        .concat(['df-pr-1', 'df-pr-2', 'df-pr-3', 'df-pr-4', 'df-pr-5'])
                        .map(cls => (
                          <g key={cls} className={cls} filter="url(#df-glow)">
                            <circle cx="0" cy="0" r="4" fill="#DC2626" />
                            <circle cx="0" cy="0" r="8" fill="none" stroke="#DC2626" strokeOpacity="0.4" strokeWidth="1.5" />
                          </g>
                        ))}
                    </svg>

                    {/* Left 6 blocks — absolute */}
                    {/* Left 12 blocks — absolute */}
                    {[
                      { name: 'Appsflyer', top: 16, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                      { name: 'Clevertap', top: 71, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                      { name: 'MixPanel', top: 126, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M11 20A7 7 0 014 8l1.33 2.67C6.67 9.33 9.33 6.67 11 2s4.33 7.33 5.67 8.67L18 8a7 7 0 01-7 12z" /></svg> },
                      { name: 'Big Query', top: 181, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'Redshift', top: 236, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'CosmosDB', top: 291, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg> },
                      { name: 'PostgreSQL', top: 346, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'Snowflake', top: 401, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                      { name: 'MySQL', top: 456, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'MongoDB', top: 511, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M11 20A7 7 0 014 8l1.33 2.67C6.67 9.33 9.33 6.67 11 2s4.33 7.33 5.67 8.67L18 8a7 7 0 01-7 12z" /></svg> },
                      { name: 'MsSQL', top: 566, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                      { name: 'DynamoDB', top: 621, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg> },
                    ].map((item, i) => (
                      <div key={i} className="absolute left-[6%] w-[145px] z-10" style={{ top: item.top }}>
                        <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-[#DC2626]/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-[#DC2626] opacity-0 group-hover:opacity-100 rounded-l-[12px] transition-opacity" />
                          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">{item.icon}</div>
                          <p className="text-white font-bold text-xs tracking-wide">{item.name}</p>
                        </div>
                      </div>
                    ))}

                    {/* Center Data Flash card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] z-20">
                      <div className="bg-[#1B2340] border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#DC2626]" />
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#DC2626]/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-4 7h4m-4-3h4" />
                            </svg>
                          </div>
                          <div className="text-center space-y-1">
                            <h3 className="text-white font-extrabold text-lg tracking-tight">Data Flash</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Migration Engine</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right 5 blocks — absolute */}
                    {[
                      { name: 'AWS', top: 93, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" /></svg> },
                      { name: 'GCP', top: 213, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" /></svg> },
                      { name: 'Databricks', top: 333, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> },
                      { name: 'Azure', top: 453, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" /></svg> },
                      { name: 'Snowflake', top: 573, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-300"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg> },
                    ].map((item, i) => (
                      <div key={i} className="absolute right-[6%] w-[145px] z-10" style={{ top: item.top }}>
                        <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-[#DC2626]/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 justify-end group relative overflow-hidden">
                          <div className="absolute inset-y-0 right-0 w-0.5 bg-[#DC2626] opacity-0 group-hover:opacity-100 rounded-r-[12px] transition-opacity" />
                          <p className="text-white font-bold text-xs tracking-wide">{item.name}</p>
                          <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">{item.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT: Header + Feature Grid — Data Flash */}
                  <div className="flex flex-col w-full h-full z-10 justify-center gap-6 px-8 py-10 lg:px-14 lg:py-12">

                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1B2340] to-[#DC2626]" />
                        <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1B2340] to-[#DC2626] uppercase tracking-widest">Data Flash · Migration Engine</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                        Move any data,<br />to anywhere, instantly.
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                        Schema-aware, zero-downtime migration across any source and destination — configured, not coded.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 border-y border-slate-200 py-4">
                      {[
                        { value: '100+', label: 'Connectors' },
                        { value: '<2h', label: 'Avg. migration time' },
                        { value: '99.9%', label: 'Data fidelity SLA' },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1B2340] to-[#DC2626] tracking-tight">{s.value}</span>
                          <span className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Schema Mapping', desc: 'Auto-detect & transform', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg> },
                        { title: 'Live CDC Sync', desc: 'Real-time replication', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
                        { title: 'Data Validation', desc: 'Row-level integrity checks', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                        { title: 'Zero Downtime', desc: 'Hot-swap migrations', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 hover:border-[#DC2626]/20 hover:shadow-sm transition-all duration-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white flex items-center justify-center shadow-sm">{f.icon}</div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{f.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>

              {/* --- AGENT FACTORY SUB-SECTION --- */}
              <div className="sticky w-full overflow-hidden top-[4rem] z-20 bg-slate-50 h-auto min-h-[720px] flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-0 items-stretch relative w-full max-w-[90rem] mx-auto">

                  {/* LEFT: Header + Feature Grid — Agent Factory */}
                  <div className="flex flex-col w-full h-full z-10 justify-center gap-6 px-8 py-10 lg:px-14 lg:py-12">

                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1B2340] to-[#DC2626]" />
                        <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1B2340] to-[#DC2626] uppercase tracking-widest">Agent Factory · AI Engine</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight mb-3">
                        Build agents<br />at enterprise scale.
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                        Pre-wired automation blueprints for CRM, media, KPI and OT — deploy in hours, not quarters.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 border-y border-slate-200 py-4">
                      {[
                        { value: '4+', label: 'Automation domains' },
                        { value: '<4h', label: 'Avg. deployment time' },
                        { value: '10×', label: 'Faster than custom builds' },
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1B2340] to-[#DC2626] tracking-tight">{s.value}</span>
                          <span className="text-[11px] text-slate-400 font-medium mt-0.5">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'CRM Automation', desc: 'Lead scoring & routing', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                        { title: 'Media Automation', desc: 'Content pipeline orchestration', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg> },
                        { title: 'KPI Automation', desc: 'Real-time alerting & reports', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
                        { title: 'OT Automation', desc: 'Sensor & device integration', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg> },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-400/30 hover:shadow-sm transition-all duration-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white flex items-center justify-center shadow-sm">{f.icon}</div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 leading-tight">{f.title}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* RIGHT: 4-directional Hub Diagram */}
                  <div className="hidden lg:block relative w-full h-[640px] bg-[#1B2340] overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 520" preserveAspectRatio="none">
                      <defs>
                        <style>{`
                      @keyframes af-pulse {
                            0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0}
                          }
                      .af-top   { animation: af-pulse 1.5s infinite ease-in-out 0s;    offset-path: path('M 300 180 L 300 60'); }
                      .af-bottom{ animation: af-pulse 1.5s infinite ease-in-out 0.37s; offset-path: path('M 300 340 L 300 460'); }
                      .af-left-1  { animation: af-pulse 1.5s infinite ease-in-out 0.75s; offset-path: path('M 240 260 L 150 260'); }
                      .af-left-2  { animation: af-pulse 1.5s infinite ease-in-out 1.5s;  offset-path: path('M 240 260 L 150 260'); }
                      .af-right-1 { animation: af-pulse 1.5s infinite ease-in-out 1.12s; offset-path: path('M 360 260 L 450 260'); }
                      .af-right-2 { animation: af-pulse 1.5s infinite ease-in-out 1.87s; offset-path: path('M 360 260 L 450 260'); }
                        `}</style>
                        <filter id="af-glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      {/* Paths */}
                      <path d="M 300 180 L 300 60" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 300 340 L 300 460" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 240 260 L 150 260" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M 360 260 L 450 260" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="6 4" />
                      {/* Pulse dots */}
                      {['af-top', 'af-bottom', 'af-left-1', 'af-left-2', 'af-right-1', 'af-right-2'].map(cls => (
                        <g key={cls} className={cls} filter="url(#af-glow)">
                          <circle cx="0" cy="0" r="4" fill="#2563EB" />
                          <circle cx="0" cy="0" r="8" fill="none" stroke="#2563EB" strokeOpacity="0.4" strokeWidth="1.5" />
                        </g>
                      ))}
                    </svg>

                    {/* Top block — CRM */}
                    <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[185px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">CRM Automation</p>
                      </div>
                    </div>

                    {/* Bottom block — Media */}
                    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[185px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">Media Automation</p>
                      </div>
                    </div>

                    {/* Left block — KPI */}
                    <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[200px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">KPI Automation</p>
                      </div>
                    </div>

                    {/* Right block — OT */}
                    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[200px] z-10">
                      <div className="bg-[#1B2340] border border-white/10 rounded-[12px] px-3 py-2.5 shadow-md hover:shadow-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 group">
                        <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-white font-bold text-xs tracking-wide">OT Automation</p>
                      </div>
                    </div>

                    {/* Center — Agent Factory card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] z-20">
                      <div className="bg-[#1B2340] border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-600/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                          </div>
                          <div className="text-center space-y-1">
                            <h3 className="text-white font-extrabold text-lg tracking-tight">Agent Factory</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Core Engine</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sticky Sidebar with Scrolling Cards Section ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative border-t border-slate-200 snap-start">
          <div className="max-w-[90rem] mx-auto">
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
                        ? 'bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white shadow-lg'
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
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight">
                    Use purpose-built agentic AI applications
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed font-medium">
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
                          <h3 className="text-2xl font-medium text-foreground">
                            {card.title}
                            <span className="text-[#DC2626]">{card.titleHighlight}</span>
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-[14px]">
                            {card.desc}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {card.buttons.map((btn, j) => (
                            <button
                              key={j}
                              className={`px-4 py-2 rounded-lg font-bold text-[10px] tracking-widest transition-all border ${j === 0
                                ? 'bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white border-transparent hover:opacity-90'
                                : 'bg-transparent text-foreground border-[#DC2626]/30 hover:border-[#DC2626]'
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
                                <div className="w-4 h-4 rounded-full border-[3px] border-[#DC2626]/40 flex-shrink-0 mt-1" />
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
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-8">
                <div
                  id="industry-header"
                  data-animate
                  className={`space-y-4 ${animatedElements['industry-header'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                >
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
                    We&apos;ve built our business by serving global enterprises
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Trust us, we&apos;ve learned from the best.
                  </p>
                </div>

                <div
                  id="industry-text"
                  data-animate
                  className={`text-muted-foreground leading-relaxed ${animatedElements['industry-text'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '150ms' }}
                >
                  <p>Discover why hundreds of enterprises use our platform.</p>
                </div>

                <div
                  id="industry-cta"
                  data-animate
                  className={`flex gap-4 flex-wrap ${animatedElements['industry-cta'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '300ms' }}
                >
                  <button className="px-6 py-3 bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95">
                    REQUEST A DEMO
                  </button>
                  <button className="px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-[#DC2626] hover:text-[#DC2626] transition-all hover:scale-105 active:scale-95">
                    LET&apos;S TALK
                  </button>
                </div>
              </div>

              {/* Right Content - Tabbed Cards */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Tabs */}
                  <div
                    id="industry-tabs"
                    data-animate
                    className={`flex gap-3 flex-wrap ${animatedElements['industry-tabs'] ? 'animate-slide-right' : 'opacity-0'
                      }`}
                  >
                    {['Banking', 'Healthcare', 'Retail', 'Telecom + Media', 'Business'].map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndustryTab(tab.toLowerCase().replace(/\s/g, ''))}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${activeIndustryTab === tab.toLowerCase().replace(/\s/g, '')
                          ? 'bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

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
                                <h3 className="text-3xl font-medium text-white leading-tight">
                                  {card.title}
                                </h3>
                              </div>

                              <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">
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
            <div
              id="testimonials-header"
              data-animate
              className={`flex items-start justify-between ${animatedElements['testimonials-header'] ? 'animate-slide-down' : 'opacity-0'
                }`}
            >
              <div className="space-y-2">
                <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight">
                  Customer testimonials
                </h2>
                <p className="text-lg text-muted-foreground">
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
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
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
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B2340] to-[#DC2626] text-white flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

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
                <div
                  key={i}
                  id={`testimonial-card-${i}`}
                  data-animate
                  className={`flex-shrink-0 w-80 rounded-2xl bg-white border border-slate-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 snap-start ${animatedElements[`testimonial-card-${i}`] ? 'animate-scale-block' : 'opacity-0'
                    }`}
                  style={{ animationDelay: `${200 + (i % 3) * 100}ms` }}
                >
                  {/* Company Name */}
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {testimonial.company}
                  </h3>

                  {/* Quote */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div
              id="testimonials-cta"
              data-animate
              className={`${animatedElements['testimonials-cta'] ? 'animate-slide-up' : 'opacity-0'
                }`}
            >
              {/* <button className="px-6 py-3 bg-foreground text-primary-foreground font-semibold rounded-lg hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                MORE CUSTOMER STORIES →
              </button> */}
            </div>
          </div>
        </section>

        {/* ── Process Section: From Idea to Experience ── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 snap-start">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Profile & Quote */}
              <div className="space-y-8">
                <div
                  id="process-header"
                  data-animate
                  className={`${animatedElements['process-header'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#DC2626]" />
                    <span className="text-sm font-semibold text-[#DC2626]">Structured Design Process</span>
                  </div>
                  <h2 className="text-[2.5rem] sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
                    From Idea to Experience
                  </h2>
                </div>

                <div
                  id="process-description"
                  data-animate
                  className={`space-y-6 ${animatedElements['process-description'] ? 'animate-slide-left' : 'opacity-0'
                    }`}
                  style={{ animationDelay: '100ms' }}
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Each phase focused on clarity over speed — shaping the experience step by step, from intent to a quiet daily experience.
                  </p>

                  {/* Profile with Quote */}
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="flex gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B2340]/15 to-[#DC2626]/10 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground"> Bennett</p>
                        <p className="text-sm text-muted-foreground">Founder of Design Co.</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      "Andrew immediately understood the kind of calm, focused experience we wanted. Our platform feels exactly like the companion our users need."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Process Steps */}
              <div
                id="process-steps"
                data-animate
                className={`space-y-8 ${animatedElements['process-steps'] ? 'animate-slide-right' : 'opacity-0'
                  }`}
              >
                {[
                  {
                    number: '1',
                    title: 'Discovery',
                    icon: '🔍',
                    tags: ['Problem definition', 'User intent']
                  },
                  {
                    number: '2',
                    title: 'Experience Structure',
                    icon: '◉',
                    tags: ['Content flow', 'Daily prompts logic']
                  },
                  {
                    number: '3',
                    title: 'Interface Design',
                    icon: '🛠',
                    tags: ['Visual language', 'UI components']
                  },
                  {
                    number: '4',
                    title: 'Develop in Framer',
                    icon: '⚙',
                    tags: ['Responsive layout', 'Interactions']
                  }
                ].map((step, i) => (
                  <div
                    key={i}
                    id={`process-step-${i}`}
                    data-animate
                    className={`relative pl-12 pb-8 border-l-2 border-[#1B2340]/20 hover:border-[#1B2340] transition-all duration-300 ${animatedElements[`process-step-${i}`] ? 'animate-slide-right' : 'opacity-0'
                      }`}
                    style={{ animationDelay: `${200 + i * 100}ms` }}
                  >
                    {/* Step number circle */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center transform -translate-x-3.5 shadow-md">
                      {step.number}
                    </div>

                    {/* Step content */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#1B2340]/30 transition-all duration-300 shadow-sm">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {step.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-xs font-medium text-[#DC2626] bg-[#DC2626]/10 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>      <div className="snap-start w-full">
        <Footer />
      </div>
    </>
  )
}
