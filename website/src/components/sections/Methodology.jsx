import { useState } from 'react';
import { methodologyItems } from '../../data/projectData';
import { motion, AnimatePresence } from 'motion/react';

// Group items into logical research phases matching Section 4 of manuscript
const PHASES = [
  { id: 'all', label: 'All Protocols' },
  { id: 'data', label: '1. Data & Harmonisation' },
  { id: 'models', label: '2. Models & Balancing' },
  { id: 'metrics', label: '3. Evaluation & CIs' },
  { id: 'shift', label: '4. Shift & Calibration' },
];

const PHASE_TAGS = {
  0: { phase: 'data', tag: 'Section 4.1', badge: 'Source-Only Design', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  1: { phase: 'data', tag: 'Section 4.2', badge: 'Cohort Extraction', icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16' },
  2: { phase: 'data', tag: 'Section 4.3', badge: '4-Feature Mapping', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  3: { phase: 'models', tag: 'Section 4.7', badge: 'Cost-Sensitive Weights', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z' },
  4: { phase: 'metrics', tag: 'Section 4.8', badge: 'B=1,000 Resamples', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  5: { phase: 'shift', tag: 'Section 4.9', badge: 'KS & PSI Testing', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  6: { phase: 'shift', tag: 'Section 4.10.2', badge: 'Feature Patching', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  7: { phase: 'shift', tag: 'Section 5.7', badge: 'Platt & Isotonic', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
};

export function Methodology() {
  const [activePhase, setActivePhase] = useState('all');
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const filteredItems = methodologyItems.map((item, idx) => ({ ...item, originalIndex: idx }))
    .filter(item => {
      if (activePhase === 'all') return true;
      return PHASE_TAGS[item.originalIndex]?.phase === activePhase;
    });

  return (
    <section id="methodology" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            06 / RESEARCH DESIGN & EXPERIMENTAL PROTOCOLS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Source-Only Experimental Architecture
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            To eliminate data leakage and mirror authentic clinical validation, all imputation, scaling, 
            and optimization routines were fitted exclusively on the Kaggle source training split. 
            NHANES served solely as an unadulterated, held-out target population.
          </p>
        </div>

        {/* Protocol Quick-Spec Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Source Training Cohort', val: 'Kaggle (N=5,109)', sub: '70% train / 30% test split' },
            { label: 'Target External Cohort', val: 'NHANES (N=3,167)', sub: 'Stratified probability sample' },
            { label: 'Harmonised Subspace', val: '4 Shared Features', sub: 'Age, Sex, BMI, Glucose' },
            { label: 'Bootstrap Resampling', val: 'B = 1,000 Iterations', sub: 'Stratified, seed = 42' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-md bg-[#111114] border border-white/[0.08]"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                {stat.label}
              </span>
              <span className="text-base font-semibold text-zinc-100 block font-mono">
                {stat.val}
              </span>
              <span className="text-xs font-mono text-zinc-400 mt-1 block">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-8 border-b border-white/[0.08] pb-3">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                activePhase === phase.id
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>

        {/* Accordion / Card Grid */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const idx = item.originalIndex;
            const meta = PHASE_TAGS[idx] || {};
            const isOpen = openIndex === idx;

            return (
              <motion.div
                layout
                key={item.title}
                className={`rounded-md border transition-all duration-150 overflow-hidden ${
                  isOpen
                    ? 'border-white/20 bg-[#111114]'
                    : 'border-white/[0.08] bg-[#0c0c0e] hover:bg-[#111114] hover:border-white/15'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div
                      className={`h-7 w-7 rounded-[3px] flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-white/10 text-zinc-100' : 'bg-white/[0.04] text-zinc-400'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d={meta.icon || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'} />
                      </svg>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1 min-w-0">
                      <span className="text-sm font-semibold text-zinc-200 truncate">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                          {meta.tag}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                          {meta.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                    <svg
                      className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-zinc-100' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Collapsible Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-3 text-xs md:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.06] bg-[#09090b]">
                        <p>{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Methodology;
