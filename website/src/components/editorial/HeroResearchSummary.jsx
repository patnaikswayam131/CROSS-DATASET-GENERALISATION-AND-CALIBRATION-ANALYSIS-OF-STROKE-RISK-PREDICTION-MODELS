import { useState } from 'react';
import { ArrowDown, ExternalLink, Maximize2, Copy, Check } from 'lucide-react';
import FigureModal from './FigureModal';
import { rocCurves, prCurves } from '../../data/researchData';

export default function HeroResearchSummary() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('roc'); // 'roc' | 'pr'
  const [selectedHeroModel, setSelectedHeroModel] = useState('lr'); // 'lr' | 'rf' | 'xgb'
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [hoverCoord, setHoverCoord] = useState(null);

  const scrollToEvidence = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo('#evidence', { offset: -70, duration: 1.1 });
    } else {
      const el = document.getElementById('evidence');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyQuickSummary = () => {
    const text = "Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models: Evaluated across Kaggle (in-domain) and NHANES 2021-2023 (external). Logistic Regression ROC-AUC drops from 0.838 to 0.713; PR-AUC collapses from 0.214 to 0.079 (-63.1%). Domain-classifier AUC = 0.858.";
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const modelLabels = {
    lr: 'Logistic Regression',
    rf: 'Random Forest',
    xgb: 'XGBoost'
  };

  const modelScores = {
    lr: { inRoc: '0.838', exRoc: '0.713', inPr: '0.214', exPr: '0.079' },
    rf: { inRoc: '0.824', exRoc: '0.725', inPr: '0.179', exPr: '0.078' },
    xgb: { inRoc: '0.808', exRoc: '0.709', inPr: '0.158', exPr: '0.077' }
  };

  const activeRocPoints = rocCurves[selectedHeroModel] || rocCurves.lr;
  const activePrPoints = prCurves[selectedHeroModel] || prCurves.lr;

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#E2E0D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Open, Airy, Unboxed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Spacious Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Field Identifier */}
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-widest uppercase font-semibold text-[#1B5E54]">
                CLINICAL ML · EXTERNAL VALIDATION
              </span>
            </div>

            {/* Core Thesis Headline */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#111816] mb-6">
              A model that works here may not travel there.
            </h1>

            {/* Subtitle Deck */}
            <p className="text-base sm:text-lg text-[#55635E] leading-relaxed mb-8 max-w-xl">
              An empirical analysis of cross-dataset generalisation, discrimination, and probability calibration in stroke risk prediction models.
            </p>

            {/* Open Metadata Strip (No Box, Just Subtle Hairlines) */}
            <div className="border-t border-b border-[#E2E0D8] py-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#9AA39E] block text-[10px] uppercase tracking-wider mb-1">
                    TRANSFER
                  </span>
                  <span className="text-[#111816] font-medium">
                    Kaggle → NHANES 2021-2023
                  </span>
                </div>
                <div>
                  <span className="text-[#9AA39E] block text-[10px] uppercase tracking-wider mb-1">
                    MODELS
                  </span>
                  <span className="text-[#111816] font-medium">
                    LR · RF · XGBoost
                  </span>
                </div>
                <div>
                  <span className="text-[#9AA39E] block text-[10px] uppercase tracking-wider mb-1">
                    PREVALENCE
                  </span>
                  <span className="text-[#111816] font-medium">
                    4.87% (Source) · 4.10% (Target)
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Clean & Restrained */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href="#evidence"
                onClick={scrollToEvidence}
                className="inline-flex items-center gap-2 bg-[#1B5E54] text-white px-4 py-2.5 rounded-xs hover:bg-[#154a42] btn-tactile cursor-pointer"
              >
                <span>Read findings</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={copyQuickSummary}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-[#E2E0D8] bg-transparent text-[#111816] hover:bg-[#FAF9F5] btn-tactile rounded-xs cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1B5E54]" />
                    <span className="text-[#1B5E54]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#55635E]" />
                    <span>Copy summary</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#55635E] hover:text-[#111816] py-1 sm:ml-2"
              >
                <span>Code repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Floating Interactive Figure (De-Boxed) */}
          <div className="lg:col-span-5 pt-2">
            
            {/* Figure Title & Controls */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E0D8]">
              <div>
                <span className="font-mono text-xs font-semibold text-[#111816] block">
                  FIGURE 1: CROSS-DOMAIN CURVES
                </span>
                <span className="font-mono text-[11px] text-[#55635E]">
                  {activeTab === 'roc' ? 'ROC Discrimination' : 'Precision-Recall Collapse'}
                </span>
              </div>

              {/* Minimalist Switcher */}
              <div className="flex items-center gap-2">
                <div className="inline-flex font-mono text-[11px] border border-[#E2E0D8] rounded-xs p-0.5">
                  <button
                    onClick={() => setActiveTab('roc')}
                    className={`px-2 py-0.5 cursor-pointer rounded-xs transition-colors ${
                      activeTab === 'roc' ? 'bg-[#1B5E54] text-white' : 'text-[#55635E]'
                    }`}
                  >
                    ROC
                  </button>
                  <button
                    onClick={() => setActiveTab('pr')}
                    className={`px-2 py-0.5 cursor-pointer rounded-xs transition-colors ${
                      activeTab === 'pr' ? 'bg-[#1B5E54] text-white' : 'text-[#55635E]'
                    }`}
                  >
                    PR
                  </button>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="p-1 text-[#55635E] hover:text-[#111816] cursor-pointer"
                  title="Enlarge figure"
                  aria-label="Enlarge figure"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Model Selector Bar */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs">
              <span className="text-[#9AA39E] text-[11px]">Model:</span>
              {['lr', 'rf', 'xgb'].map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHeroModel(key)}
                  className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer text-[11px] ${
                    selectedHeroModel === key
                      ? 'bg-[#111816] text-white font-medium'
                      : 'text-[#55635E] hover:text-[#111816]'
                  }`}
                >
                  {modelLabels[key]}
                </button>
              ))}
            </div>

            {/* Floating Unboxed SVG Chart */}
            <div
              className="w-full aspect-[4/3] relative cursor-crosshair select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = 1 - (e.clientY - rect.top) / rect.height;
                setHoverCoord({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
              }}
              onMouseLeave={() => setHoverCoord(null)}
            >
              {activeTab === 'roc' ? (
                <svg viewBox="0 0 340 240" className="w-full h-full" aria-label="ROC curve comparison">
                  {/* Subtle Gridlines */}
                  <line x1="40" y1="20" x2="320" y2="20" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="70" x2="320" y2="70" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="120" x2="320" y2="120" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="170" x2="320" y2="170" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="210" x2="320" y2="210" stroke="#111816" strokeWidth="1" />
                  <line x1="40" y1="20" x2="40" y2="210" stroke="#111816" strokeWidth="1" />

                  {/* Diagonal Chance Line */}
                  <line x1="40" y1="210" x2="320" y2="20" stroke="#9AA39E" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Kaggle in-domain curve (Forest Green #1B5E54) */}
                  <path
                    d="M 40 210 Q 60 110, 110 75 T 200 40 T 320 20"
                    fill="none"
                    stroke="#1B5E54"
                    strokeWidth="2.2"
                  />

                  {/* NHANES target curve (Warm Terracotta #A33B20) */}
                  <path
                    d="M 40 210 Q 80 150, 150 115 T 250 55 T 320 20"
                    fill="none"
                    stroke="#A33B20"
                    strokeWidth="2.2"
                  />

                  {/* Dynamic Hover Crosshair */}
                  {hoverCoord && (
                    <g>
                      <line
                        x1={40 + hoverCoord.x * 280}
                        y1="20"
                        x2={40 + hoverCoord.x * 280}
                        y2="210"
                        stroke="#9AA39E"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="40"
                        y1={210 - hoverCoord.y * 190}
                        x2="320"
                        y2={210 - hoverCoord.y * 190}
                        stroke="#9AA39E"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={40 + hoverCoord.x * 280}
                        cy={210 - hoverCoord.y * 190}
                        r="3.5"
                        fill="#111816"
                      />
                    </g>
                  )}

                  {/* Axis labels */}
                  <text x="40" y="226" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="175" y="226" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="315" y="226" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                  <text x="180" y="238" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                    False Positive Rate (1 - Specificity)
                  </text>

                  <text x="28" y="213" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="28" y="123" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="28" y="24" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                </svg>
              ) : (
                <svg viewBox="0 0 340 240" className="w-full h-full" aria-label="PR curve comparison">
                  {/* Subtle Gridlines */}
                  <line x1="40" y1="20" x2="320" y2="20" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="70" x2="320" y2="70" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="120" x2="320" y2="120" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="170" x2="320" y2="170" stroke="#E2E0D8" strokeWidth="0.8" />
                  <line x1="40" y1="210" x2="320" y2="210" stroke="#111816" strokeWidth="1" />
                  <line x1="40" y1="20" x2="40" y2="210" stroke="#111816" strokeWidth="1" />

                  {/* Prevalence baseline */}
                  <line x1="40" y1="202" x2="320" y2="202" stroke="#9AA39E" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Kaggle PR Curve */}
                  <path
                    d="M 40 135 C 70 140, 110 160, 160 175 C 220 188, 280 198, 320 202"
                    fill="none"
                    stroke="#1B5E54"
                    strokeWidth="2.2"
                  />

                  {/* NHANES Target PR Curve (Collapse) */}
                  <path
                    d="M 40 185 C 80 192, 160 198, 240 201 L 320 202"
                    fill="none"
                    stroke="#A33B20"
                    strokeWidth="2.2"
                  />

                  {/* Axis labels */}
                  <text x="40" y="226" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="175" y="226" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="315" y="226" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                  <text x="180" y="238" textAnchor="middle" className="text-[10px] font-mono fill-[#111816]">
                    Recall (Sensitivity)
                  </text>

                  <text x="28" y="213" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.0</text>
                  <text x="28" y="123" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">0.5</text>
                  <text x="28" y="24" textAnchor="end" className="text-[10px] font-mono fill-[#55635E]">1.0</text>
                </svg>
              )}
            </div>

            {/* Quiet Minimal Legend */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#E2E0D8] text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#1B5E54]" />
                  <span className="text-[#111816]">Kaggle in-domain</span>
                  <span className="text-[#55635E]">({activeTab === 'roc' ? modelScores[selectedHeroModel].inRoc : modelScores[selectedHeroModel].inPr})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#A33B20]" />
                  <span className="text-[#111816]">NHANES external</span>
                  <span className="text-[#A33B20]">({activeTab === 'roc' ? modelScores[selectedHeroModel].exRoc : modelScores[selectedHeroModel].exPr})</span>
                </div>
              </div>

              {hoverCoord && (
                <div className="text-[11px] text-[#55635E] hidden sm:block">
                  x: {hoverCoord.x.toFixed(2)} · y: {hoverCoord.y.toFixed(2)}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Figure Inspection Modal */}
      <FigureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Figure 1: Cross-Domain ROC and Precision-Recall Curves"
        figurePath="/figures/fig2-4_all_figures.png"
        caption="Full publication plot: In-domain evaluation (Kaggle, N=1,533) versus cross-domain external evaluation (NHANES 2021-2023, N=3,167) across Logistic Regression, Random Forest, and XGBoost."
      />
    </section>
  );
}
