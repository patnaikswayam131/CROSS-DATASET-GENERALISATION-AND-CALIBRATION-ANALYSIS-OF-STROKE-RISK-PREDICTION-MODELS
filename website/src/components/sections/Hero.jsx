import { useState } from 'react';
import { motion } from 'motion/react';
import { heroContent } from '../../data/siteConfig';
import Button from '../ui/Button';
import StatPill from '../ui/StatPill';
import AnimatedNumber from '../ui/AnimatedNumber';
import HeroCanvas from '../ui/HeroCanvas';

const HERO_MODELS = [
  {
    id: 'lr',
    name: 'Logistic Regression',
    collapse: 63.1,
    inDomain: 0.214,
    crossDomain: 0.079,
    ciIn: '0.153–0.308',
    ciCross: '0.064–0.107',
    tag: 'Highest Collapse',
  },
  {
    id: 'rf',
    name: 'Random Forest',
    collapse: 56.4,
    inDomain: 0.179,
    crossDomain: 0.078,
    ciIn: '0.129–0.251',
    ciCross: '0.063–0.101',
    tag: 'Non-linear tree',
  },
  {
    id: 'xgb',
    name: 'XGBoost',
    collapse: 51.3,
    inDomain: 0.158,
    crossDomain: 0.077,
    ciIn: '0.115–0.224',
    ciCross: '0.061–0.107',
    tag: 'Gradient boosted',
  },
];

export function Hero() {
  const [selectedModel, setSelectedModel] = useState(HERO_MODELS[0]);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#09090b] pt-8 pb-16 lg:py-20 border-b border-white/[0.08]"
    >
      {/* Precision instrumentation canvas */}
      <HeroCanvas />

      {/* Clean architectural grid texture without blur discs */}
      <div className="pointer-events-none absolute inset-0 bg-editorial-grid opacity-60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

          {/* ────────── Left Column: Editorial Overview & Theses ────────── */}
          <div className="lg:w-[58%]">
            {/* Paper Category & Identifier */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>00 / RESEARCH MANUSCRIPT · MEDICAL AI EVALUATION</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 leading-[1.12] mb-6 tracking-tight">
              Cross-Dataset Generalisation &amp; Calibration Failure in Stroke Risk Prediction
            </h1>

            {/* Subtitle / Empirical Thesis */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              High in-domain ROC-AUC (0.81–0.84) creates a dangerous illusion of clinical validity. 
              When evaluated on the multi-ethnic <strong className="text-white">NHANES 2021–2023</strong> cohort without retraining, 
              models suffer a catastrophic <span className="text-rose-400 font-semibold border-b border-rose-500/50 pb-0.5">51–63% collapse in Precision-Recall AUC</span>, 
              revealing severe uncalibrated overconfidence under joint covariate and concept shift.
            </p>

            {/* Author & Institutional Metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400 mb-8 pb-5 border-b border-white/[0.08] font-mono">
              <div className="flex items-center gap-2">
                <span className="text-zinc-100 font-semibold">Swayam Patnaik</span>
              </div>
              <span className="text-zinc-600">/</span>
              <span>NIST University, Berhampur</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">B.Tech CSE (Data Science)</span>
              <span className="text-zinc-600">/</span>
              <span className="text-emerald-400">[Under Peer Review]</span>
            </div>

            {/* Action Buttons  -  Crisp Geometric Styling */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button 
                variant="primary" 
                href="#explorer"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
              >
                Launch Risk Shift Simulator
              </Button>

              <Button 
                variant="secondary" 
                disabled 
                tooltip="Manuscript currently under Scopus-indexed peer review"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Manuscript PDF
              </Button>

              <Button 
                variant="ghost" 
                href={heroContent.githubUrl}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Code Repository
              </Button>
            </div>

            {/* Quick Stat Tags */}
            <div className="flex flex-wrap gap-2">
              <StatPill text="51–63% PR-AUC Collapse" color="danger" />
              <StatPill text="3 Core Classifiers Tested" color="primary" />
              <StatPill text="Age PSI 1.007 & Glucose PSI 1.495" color="warning" />
              <StatPill text="Held-Out NHANES 2021–23 (N=3,167)" color="neutral" />
            </div>
          </div>

          {/* ────────── Right Column: Scientific Instrument Panel ────────── */}
          <div className="lg:w-[42%] flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-md p-6 bg-[#111114] border border-white/[0.12] shadow-xl relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] bg-rose-500/80" 
              />

              {/* Header with interactive model switch buttons */}
              <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="text-xs uppercase font-mono tracking-wider text-zinc-200 font-semibold">
                    Empirical Degradation
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-[3px] bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono">
                  p &lt; 0.001
                </span>
              </div>

              {/* Model Switcher Tabs  -  Clean Segmented Control */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-[4px] bg-[#09090b] border border-white/[0.08] mb-6">
                {HERO_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m)}
                    className={`text-xs py-1.5 px-2 rounded-[2px] font-mono font-medium transition-all cursor-pointer ${
                      selectedModel.id === m.id
                        ? 'bg-white text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {m.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Big primary animated counter */}
              <div className="text-center mb-1">
                <div className="text-5xl sm:text-6xl font-bold text-rose-500 font-mono tracking-tight flex items-center justify-center gap-0.5">
                  <span>-</span>
                  <AnimatedNumber value={selectedModel.collapse} decimals={1} />
                  <span className="text-3xl sm:text-4xl">%</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 uppercase tracking-widest text-center mb-1 font-mono">
                PR-AUC Collapse ({selectedModel.name})
              </p>

              <p className="text-xs text-center mb-6 text-zinc-400 font-mono">
                Kaggle: <span className="text-zinc-100 font-semibold">{selectedModel.inDomain.toFixed(3)}</span> → NHANES: <span className="text-rose-400 font-semibold">{selectedModel.crossDomain.toFixed(3)}</span>
              </p>

              {/* Comparative Gauge Bars */}
              <div className="p-4 rounded-md bg-[#09090b] border border-white/[0.08] space-y-3.5 mb-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                      In-Domain (Kaggle Test)
                    </span>
                    <span className="font-mono text-zinc-100 font-semibold">{selectedModel.inDomain.toFixed(3)}</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full bg-zinc-200 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedModel.inDomain / 0.25) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                    <span>95% CI: [{selectedModel.ciIn}]</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Cross-Domain (NHANES 2021–23)
                    </span>
                    <span className="font-mono text-rose-400 font-semibold">{selectedModel.crossDomain.toFixed(3)}</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.06] rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full bg-rose-500 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedModel.crossDomain / 0.25) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                    <span>95% CI: [{selectedModel.ciCross}]</span>
                  </div>
                </div>
              </div>

              {/* Statistical confirmation footer */}
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/[0.08]">
                <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Non-overlapping 95% CIs
                </span>
                <span className="font-mono text-[11px] text-zinc-500">B = 1,000 Folds</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
