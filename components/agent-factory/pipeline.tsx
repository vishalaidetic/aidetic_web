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
    id: 'semantics',
    title: 'Update Business Semantics',
    icon: Layers,
    desc: 'Enrich tables with logical definitions and metadata so the AI perfectly understands your business context.',
    color: 'from-violet-500 to-indigo-500',
    imageUrl: '/3rd.svg'
  },
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

export function AgentFactoryPipeline() {
  const [activeTab, setActiveTab] = useState('gather');

  const allSteps = [...phase1, ...phase2, ...phase3];
  const activeStepData = allSteps.find(s => s.id === activeTab) || allSteps[0];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#f6f9fc] via-white to-[#eaf5fd] py-24 px-6 overflow-hidden border-t border-slate-200">
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
            className="text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-semibold leading-[1.15] max-w-3xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter)',
              background: 'linear-gradient(to right, #533afd, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Build your Agent or a complete AI Application in 3 steps.
          </h2>
          <h3
            className="text-[#0d253d] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Start with a prompt and a connection to your data. We’ll handle the rest.
          </h3>
        </motion.div>

        {/* ── Interactive Pipeline UI ── */}
        <motion.div
          className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Side: Navigation Sidebar */}
          <div className="w-full lg:w-[35%] bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col gap-10">

            {/* Group 1: Prerequisites */}
            <div>
              <div className="flex items-center gap-3 mb-5 px-2">
                <div className="w-8 h-8 rounded-full bg-[#533afd]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#533afd] font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 
                    className="text-[1.25rem] font-semibold leading-[1.15] tracking-wide" 
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #0d253d, #533afd)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Phase 1: Prerequisites
                  </h4>
                  <p className="text-[1rem] text-slate-500 mt-1.5" style={{ fontFamily: 'var(--font-quicksand)' }}>Lay the groundwork for your custom AI.</p>
                </div>
              </div>
              <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-6 before:-ml-px before:w-0.5 before:bg-slate-200 pl-2">
                {phase1.map((step, idx) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#533afd]/20' : 'hover:bg-slate-100/80 border border-transparent'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors border-4 border-slate-50 ${isActive ? 'bg-[#533afd] text-white shadow-md' : 'bg-white text-slate-400 group-hover:border-slate-100'}`}>
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <span className={`text-[15px] font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 mt-1.5 transition-transform ${isActive ? 'text-[#533afd] translate-x-1' : 'text-transparent group-hover:text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Connect and configure agent-factory */}
            <div>
              <div className="flex items-center gap-3 mb-5 px-2">
                <div className="w-8 h-8 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#8b5cf6] font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 
                    className="text-[1.25rem] font-semibold leading-[1.15] tracking-wide" 
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #0d253d, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Phase 2: Connect & Configure
                  </h4>
                  <p className="text-[1rem] text-slate-500 mt-1.5" style={{ fontFamily: 'var(--font-quicksand)' }}>Configure your agent factory.</p>
                </div>
              </div>
              <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-6 before:-ml-px before:w-0.5 before:bg-slate-200 pl-2">
                {phase2.map((step, idx) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#8b5cf6]/20' : 'hover:bg-slate-100/80 border border-transparent'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors border-4 border-slate-50 ${isActive ? 'bg-[#8b5cf6] text-white shadow-md' : 'bg-white text-slate-400 group-hover:border-slate-100'}`}>
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <span className={`text-[15px] font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 mt-1.5 transition-transform ${isActive ? 'text-[#8b5cf6] translate-x-1' : 'text-transparent group-hover:text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Test and Deploy */}
            <div>
              <div className="flex items-center gap-3 mb-5 px-2">
                <div className="w-8 h-8 rounded-full bg-[#ea2261]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#ea2261] font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 
                    className="text-[1.25rem] font-semibold leading-[1.15] tracking-wide" 
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #0d253d, #ea2261)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Phase 3: Test & Deploy
                  </h4>
                  <p className="text-[1rem] text-slate-500 mt-1.5" style={{ fontFamily: 'var(--font-quicksand)' }}>Refine your agent and deploy to production.</p>
                </div>
              </div>
              <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-6 before:-ml-px before:w-0.5 before:bg-slate-200 pl-2">
                {phase3.map((step, idx) => {
                  const isActive = activeTab === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveTab(step.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 group relative z-10 ${isActive ? 'bg-white shadow-sm border border-slate-200 ring-1 ring-[#ea2261]/20' : 'hover:bg-slate-100/80 border border-transparent'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors border-4 border-slate-50 ${isActive ? 'bg-[#ea2261] text-white shadow-md' : 'bg-white text-slate-400 group-hover:border-slate-100'}`}>
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <span className={`text-[15px] font-semibold block transition-colors ${isActive ? 'text-[#0d253d]' : 'text-[#64748d] group-hover:text-[#0d253d]'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                          {step.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 mt-1.5 transition-transform ${isActive ? 'text-[#ea2261] translate-x-1' : 'text-transparent group-hover:text-slate-300'}`} />
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
                <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${activeStepData.color} p-1 shadow-2xl shadow-slate-200/60 mb-10 overflow-hidden relative group`}>
                  <div className="w-full h-full bg-slate-50 rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background Image */}
                    {activeStepData.imageUrl ? (
                      <Image
                        src={activeStepData.imageUrl}
                        alt={activeStepData.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 max-w-lg">
                  <h3 
                    className="text-[1.75rem] lg:text-[2rem] font-semibold leading-[1.15]" 
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      background: 'linear-gradient(to right, #533afd, #000000)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {activeStepData.title}
                  </h3>
                  <p className="text-[1.125rem] text-[#64748d] leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    {activeStepData.desc}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="mt-10 flex gap-2">
                  {allSteps.map((s) => (
                    <div
                      key={s.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ${s.id === activeTab ? `w-12 bg-gradient-to-r ${s.color}` : 'w-3 bg-slate-200'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
