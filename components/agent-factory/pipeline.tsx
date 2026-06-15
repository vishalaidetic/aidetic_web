'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, CheckCircle2, Database, FileText, Layers, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const phase1 = [
  {
    id: 'gather',
    title: 'Gather Data Dictionary',
    icon: FileText,
    desc: 'Align on core data schemas, metrics, and business terminology to establish a unified foundation.',
    color: 'from-blue-500 to-cyan-400',
    imageUrl: '/data1.jpeg'
  },
  {
    id: 'warehouse',
    title: 'Integrate Medallion Architecture',
    icon: Database,
    desc: 'Organize data into Bronze, Silver, and Gold layers to ensure high quality, reliability, and performance.',
    color: 'from-indigo-500 to-blue-500',
    imageUrl: '/second.png'
  }
]; 

const phase2 = [
  {
    id: 'configure',
    title: 'Configure Agent Parameters',
    icon: Activity,
    desc: 'Set the initial rules, boundaries, and reasoning paths for your custom AI agent.',
    color: 'from-purple-500 to-fuchsia-500',
    imageUrl: '/fourth.png'
  }
];

const phase3 = [
  {
    id: 'guidelines',
    title: 'Test & Iterate Business Guidelines',
    icon: CheckCircle2,
    desc: 'Validate agent responses against established business rules to ensure strict compliance and accuracy.',
    color: 'from-fuchsia-500 to-pink-500',
    imageUrl: '/fifth.png'
  },
  {
    id: 'deploy',
    title: 'Deploy to Production',
    icon: Search,
    desc: 'Launch your custom AI application with full observability, ready to answer questions and fetch data.',
    color: 'from-pink-500 to-rose-500',
    imageUrl: '/sixth.png'
  }
];

export function AgentFactoryPipeline({ content }: { content?: any }) {
  const [activeTab, setActiveTab] = useState('gather');

  // Use content from props if available, otherwise fallback to hardcoded definitions
  const phase1Data = content?.phases?.[0]?.steps || phase1;
  const phase2Data = content?.phases?.[1]?.steps || phase2;
  const phase3Data = content?.phases?.[2]?.steps || phase3;

  const mergedPhase1 = phase1.map((step, i) => ({ ...step, title: phase1Data?.[i]?.title, desc: phase1Data?.[i]?.desc }));
  const mergedPhase2 = phase2.map((step, i) => ({ ...step, title: phase2Data?.[i]?.title, desc: phase2Data?.[i]?.desc }));
  const mergedPhase3 = phase3.map((step, i) => ({ ...step, title: phase3Data?.[i]?.title, desc: phase3Data?.[i]?.desc }));

  const allSteps = [...mergedPhase1, ...mergedPhase2, ...mergedPhase3];
  const activeStepData = allSteps.find(s => s.id === activeTab) || allSteps[0];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#f6f9fc] via-white to-[#eaf5fd] py-16 px-6 overflow-hidden border-t border-slate-200">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2
            className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] max-w-3xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {content?.heading}
          </h2>
          <h3
            className="text-[#0d253d] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {content?.subheading}
          </h3>
        </motion.div>

        {/* ── Interactive Pipeline UI ── */}
        <motion.div
          className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Side: Navigation Sidebar */}
          <div className="w-full lg:w-[35%] bg-[#fcfdfd] border-r border-slate-100 p-6 lg:p-8 flex flex-col gap-6">

            {/* Group 1: Prerequisites */}
            <div className="relative">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#533afd]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#533afd] font-bold text-[15px]">1</span>
                </div>
                <div>
                  <h4 className="text-base font-bold leading-tight tracking-wide text-[#0d253d]" style={{ fontFamily: 'var(--font-inter)' }}>
                    {content?.phases?.[0]?.label}
                  </h4>
                </div>
              </div>
              <div className="relative ml-4 pl-8 border-l border-slate-200 space-y-1 pb-4">
                {mergedPhase1.map((step) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left py-3 px-4 rounded-[14px] transition-all duration-300 flex items-center gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#533afd]/20' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full bg-[#533afd] flex items-center justify-center shrink-0 shadow-md">
                          <step.icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                          <step.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-500" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className={`text-sm font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#533afd]" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Connect and configure agent-factory */}
            <div className="relative">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#8b5cf6] font-bold text-[15px]">2</span>
                </div>
                <div>
                  <h4 className="text-base font-bold leading-tight tracking-wide text-[#0d253d]" style={{ fontFamily: 'var(--font-inter)' }}>
                    {content?.phases?.[1]?.label}
                  </h4>
                </div>
              </div>
              <div className="relative ml-4 pl-8 border-l border-slate-200 space-y-1 pb-4">
                {mergedPhase2.map((step) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left py-3 px-4 rounded-[14px] transition-all duration-300 flex items-center gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#8b5cf6]/20' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6] flex items-center justify-center shrink-0 shadow-md">
                          <step.icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                          <step.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-500" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className={`text-sm font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#8b5cf6]" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Test and Deploy */}
            <div className="relative">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#9f1239]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#9f1239] font-bold text-[15px]">3</span>
                </div>
                <div>
                  <h4 className="text-base font-bold leading-tight tracking-wide text-[#0d253d]" style={{ fontFamily: 'var(--font-inter)' }}>
                    {content?.phases?.[2]?.label}
                  </h4>
                </div>
              </div>
              <div className="relative ml-4 pl-8 border-l border-slate-200 space-y-1 pb-4">
                {mergedPhase3.map((step) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left py-3 px-4 rounded-[14px] transition-all duration-300 flex items-center gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#9f1239]/20' : 'hover:bg-slate-50 border border-transparent'}`}
                    >
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full bg-[#9f1239] flex items-center justify-center shrink-0 shadow-md">
                          <step.icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                          <step.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-500" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className={`text-sm font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#9f1239]" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Display Area */}
          <div className="w-full lg:w-[65%] p-8 lg:p-16 flex flex-col justify-center relative bg-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full relative z-10"
              >
                {/* Visual Mock Element */}
                <div className={`w-full max-w-2xl aspect-[16/9] rounded-2xl bg-gradient-to-br ${activeStepData.color} p-[2px] mb-8 relative group`}>
                  <div className="w-full h-full bg-slate-50 rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background Image */}
                    {activeStepData.imageUrl ? (
                      <Image
                        src={activeStepData.imageUrl}
                        alt={activeStepData.title}
                        fill
                        className="object-cover transition-transform duration-700"
                      />
                    ) : null}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 max-w-2xl">
                  <h3 
                    className="text-lg md:text-xl font-bold leading-tight tracking-wide text-[#0d253d]" 
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {activeStepData.title}
                  </h3>
                  <p className="text-base text-[#0d253d] leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    {activeStepData.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
