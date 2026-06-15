'use client'
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Activity, ArrowRight, Bot, Brain, ChevronDown, ChevronRight, Database, FileText, Layers, MousePointer2, Plug, RefreshCw, Send, ShieldCheck, Upload, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BookCallDialog } from '@/components/shared/book-call-dialog';
import { DashboardMock } from '@/components/home/dashboard-mock';

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
    <motion.div
      ref={containerRef}
      onMouseEnter={runSequence}
      className="flex flex-col w-full bg-white rounded-3xl overflow-hidden border border-slate-200 h-[620px] relative cursor-pointer"
      style={{ boxShadow: '0 8px 32px -4px rgba(83,58,253,0.18), 0 2px 8px 0 rgba(0,0,0,0.06)' }}
      whileHover={{
        boxShadow: '0 24px 56px -8px rgba(83,58,253,0.38), 0 8px 24px -4px rgba(234,34,97,0.22), 0 0 0 1px rgba(83,58,253,0.5)',
        y: -8
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
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
    </motion.div>
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
    <motion.div
      ref={containerRef}
      onMouseEnter={runSequence}
      className="flex flex-col w-full bg-white rounded-3xl overflow-hidden border border-slate-200 h-[630px] relative cursor-pointer"
      style={{ boxShadow: '0 8px 32px -4px rgba(83,58,253,0.18), 0 2px 8px 0 rgba(0,0,0,0.06)' }}
      whileHover={{
        boxShadow: '0 24px 56px -8px rgba(83,58,253,0.38), 0 8px 24px -4px rgba(234,34,97,0.22), 0 0 0 1px rgba(83,58,253,0.5)',
        y: -8
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
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
            <div className="relative bg-white border-2 border-slate-200 rounded-full mt-3 px-4 py-3 flex gap-3 justify-between items-center shadow-lg bg-opacity-90 backdrop-blur-sm">

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
    </motion.div>
  );
}
export function ProductsSection({ content }: { content?: any }) {
  return (
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
                  <div className="mb-4">
                    <img
                      src="/agent-fac-logo.png"
                      alt="Agent Factory"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-3 mb-6">
                    <h2
                      className="text-lg md:text-xl font-bold leading-tight tracking-wide text-[#0d253d]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {content?.heading || "Ask your business anything."}
                    </h2>
                    <p className="text-md text-[#0d253d] leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {content?.subheading || "AI agents that answer questions across marketing, sales, finance and ops straight from your own data, with citations on every answer."}
                    </p>
                  </div>

                  {/* 2x2 Feature Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <Bot size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>One Agent per Function. Each one an Expert.</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <Brain size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Answers that Explain Themselves.</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Charts and Trend Lines on Demand.</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Agents that Get Smarter Every Week</span>
                    </div>
                  </div>

                  <Link
                    href="/agent-factory"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-medium text-[15px] text-white hover:opacity-90 hover:-translate-y-0.5 transition-all w-fit shadow-lg bg-[#533afd]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {content?.cta || "Explore Agent Factory"}
                    <ChevronRight size={15} strokeWidth={2.5} className="translate-y-[1px]" />
                  </Link>
                </motion.div>

                {/* Right Component Demo */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="order-1 lg:order-2 flex items-center justify-center relative">
                  <div className="w-full max-w-[550px] relative z-10">
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
                  <div className="w-full max-w-[550px] relative z-10">
                    <MigrationDemo />
                  </div>
                  {/* Decorative background blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,_rgba(83,58,253,0.06)_0%,_transparent_70%)] rounded-full -z-10" />
                </motion.div>

                {/* Right Content */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col order-2 lg:order-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#533afd]" />
                    <span className="text-xs font-bold text-[#533afd] uppercase tracking-widest">DATA FLASH</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <h2
                      className="text-lg md:text-xl font-bold leading-tight tracking-wide text-[#0d253d]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Move data. Skip the pipeline.
                    </h2>
                    <p className="text-md text-[#0d253d] leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      Automated migration from any source to any platform. Config-driven, validated, and audit-ready. No pipelines to build. No code to write.
                    </p>
                  </div>

                  {/* 2x2 Feature Grid for Data Flash */}
                  <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <Database size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Automated Migration</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#533afd]/10 flex items-center justify-center text-[#533afd]">
                        <RefreshCw size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Config-Driven & Validated</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>Audit-Ready</span>
                    </div>

                    <div className="m-3 bg-white rounded-2xl p-4 flex flex-col items-center text-center justify-center gap-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                        <Upload size={20} />
                      </div>
                      <span className="text-sm font-semibold text-[#0d253d] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>No pipelines to build</span>
                    </div>
                  </div>

                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-medium text-[15px] text-white hover:opacity-90 hover:-translate-y-0.5 transition-all w-fit shadow-lg bg-[#533afd]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Explore Data Flash <ChevronRight size={15} strokeWidth={2.5} className="translate-y-[1px]" />
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>
  );
}
