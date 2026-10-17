import { useState } from 'react';
import { ArrowDown, ExternalLink, Maximize2, Copy, Check, Info } from 'lucide-react';
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
      window.__lenis.scrollTo('#evidence', { offset: -60, duration: 1.15 });
    } else {
      const el = document.getElementById('evidence');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyQuickSummary = () => {
    const text = "Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models: Evaluated across Kaggle (in-domain) and NHANES 2021-2023 (external). Logistic Regression ROC-AUC falls from 0.838 to 0.713; PR-AUC collapses from 0.214 to 0.079 (-63.1%). Domain-classifier AUC = 0.858.";
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const modelLabels = {
    lr: 'Logistic Regression (0.838 → 0.713)',
    rf: 'Random Forest (0.824 → 0.725)',
    xgb: 'XGBoost (0.808 → 0.709)'
  };

  const activeRocPoints = rocCurves[selectedHeroModel] || rocCurves.lr;
  const activePrPoints = prCurves[selectedHeroModel] || prCurves.lr;

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#C9D0C6]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: 54% (approx 7 columns on 12-col grid) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#23645A] font-semibold">
                MACHINE LEARNING · EXTERNAL VALIDATION
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[3.85rem] leading-[1.08] text-[#172B29] mb-5">
              A model that works here may not travel there.
            </h1>

            {/* Deck */}
            <p className="text-lg sm:text-xl text-[#4D5D57] leading-relaxed mb-8 max-w-2xl">
              Testing cross-dataset generalisation, discrimination, and calibration in stroke-risk prediction.
            </p>

            {/* Metadata Table / Row */}
            <div className="border-t border-b border-[#C9D0C6] py-3.5 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#4D5D57] block mb-0.5">SOURCE → TARGET</span>
                  <span className="text-[#172B29] font-medium">Kaggle → NHANES 2021-2023</span>
                </div>
                <div>
                  <span className="text-[#4D5D57] block mb-0.5">MODELS</span>
                  <span className="text-[#172B29] font-medium">LR · Random Forest · XGBoost</span>
                </div>
                <div>
                  <span className="text-[#4D5D57] block mb-0.5">WORK</span>
                  <span className="text-[#172B29] font-medium">Undergraduate research project</span>
                </div>
              </div>
            </div>

            {/* Hero Actions (Tactile, interactive Apple-style feel) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              <a
                href="#evidence"
                onClick={scrollToEvidence}
                className="inline-flex items-center gap-2 bg-[#23645A] text-white px-4 py-2 font-mono text-xs font-medium rounded-xs hover:bg-[#1b4d45] btn-tactile cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
              >
                <span>Explore the findings</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={copyQuickSummary}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#C9D0C6] font-mono text-xs text-[#172B29] hover:bg-[#F5F3EB] btn-tactile rounded-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#23645A]" />
                    <span className="text-[#23645A] font-medium">Summary copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#4D5D57]" />
                    <span>Copy summary</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com/patnaikswayam131/CROSS-DATASET-GENERALISATION-AND-CALIBRATION-ANALYSIS-OF-STROKE-RISK-PREDICTION-MODELS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#4D5D57] hover:text-[#172B29] font-mono text-xs transition-colors py-1 ml-auto sm:ml-0"
              >
                <span>View code</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: 46% (approx 5 columns on 12-col grid) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FCFBF7] border border-[#C9D0C6] rounded-xs p-4 sm:p-5 relative shadow-[0_2px_8px_rgba(23,43,41,0.04)]">
              
              {/* Plot Header & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#C9D0C6]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#172B29]">Figure 1: Cross-Domain Curves</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Model toggle */}
                  <select
                    value={selectedHeroModel}
                    onChange={(e) => setSelectedHeroModel(e.target.value)}
                    className="font-mono text-[11px] bg-white border border-[#C9D0C6] rounded-xs px-1.5 py-0.5 text-[#172B29] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8]"
                    aria-label="Select hero plot model"
                  >
                    <option value="lr">Logistic Regression</option>
                    <option value="rf">Random Forest</option>
                    <option value="xgb">XGBoost</option>
                  </select>

                  {/* Curve Toggle */}
                  <div className="inline-flex p-0.5 bg-[#F5F3EB] border border-[#C9D0C6] rounded-xs text-[11px] font-mono">
                    <button
                      onClick={() => setActiveTab('roc')}
                      className={`px-2 py-0.5 btn-tactile cursor-pointer ${
                        activeTab === 'roc' ? 'bg-[#23645A] text-white font-medium rounded-xs' : 'text-[#4D5D57]'
                      }`}
                    >
                      ROC
                    </button>
                    <button
                      onClick={() => setActiveTab('pr')}
                      className={`px-2 py-0.5 btn-tactile cursor-pointer ${
                        activeTab === 'pr' ? 'bg-[#23645A] text-white font-medium rounded-xs' : 'text-[#4D5D57]'
                      }`}
                    >
                      PR
                    </button>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="p-1 text-[#4D5D57] hover:text-[#172B29] hover:bg-[#E6ECE4] rounded-xs cursor-pointer btn-tactile"
                    title="Inspect publication export"
                    aria-label="Inspect publication export"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-header model indicator */}
              <div className="text-[11px] font-mono text-[#23645A] mb-2 font-medium">
                Active Architecture: {modelLabels[selectedHeroModel]}
              </div>

              {/* SVG Curve Canvas with Interactive Hover Inspector */}
              <div
                className="w-full aspect-[4/3] bg-white border border-[#E6ECE4] p-3 flex flex-col justify-between relative cursor-crosshair select-none"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width;
                  const y = 1 - (e.clientY - rect.top) / rect.height;
                  setHoverCoord({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
                }}
                onMouseLeave={() => setHoverCoord(null)}
              >
                {activeTab === 'roc' ? (
                  <svg viewBox="0 0 340 240" className="w-full h-full" aria-label="ROC Curves comparing Kaggle and NHANES">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="320" y2="20" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="70" x2="320" y2="70" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="120" x2="320" y2="120" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="170" x2="320" y2="170" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="210" x2="320" y2="210" stroke="#858E88" strokeWidth="1" />
                    <line x1="40" y1="20" x2="40" y2="210" stroke="#858E88" strokeWidth="1" />

                    {/* Chance Diagonal */}
                    <line x1="40" y1="210" x2="320" y2="20" stroke="#858E88" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Kaggle in-domain curve (Source Teal #23645A) */}
                    <path
                      d="M 40 210 Q 60 110, 110 75 T 200 40 T 320 20"
                      fill="none"
                      stroke="#23645A"
                      strokeWidth="2.5"
                    />

                    {/* NHANES target curve (Target Rust #994524) */}
                    <path
                      d="M 40 210 Q 80 150, 150 115 T 250 55 T 320 20"
                      fill="none"
                      stroke="#994524"
                      strokeWidth="2.5"
                    />

                    {/* Interactive hover crosshair */}
                    {hoverCoord && (
                      <>
                        <line
                          x1={40 + hoverCoord.x * 280}
                          y1="20"
                          x2={40 + hoverCoord.x * 280}
                          y2="210"
                          stroke="#172B29"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                        <circle
                          cx={40 + hoverCoord.x * 280}
                          cy={210 - hoverCoord.y * 190}
                          r="4"
                          fill="#23645A"
                          stroke="#white"
                          strokeWidth="1.5"
                        />
                      </>
                    )}

                    {/* Labels on Plot */}
                    <text x="75" y="45" fill="#23645A" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                      Kaggle (In-Domain)
                    </text>
                    <text x="135" y="105" fill="#994524" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                      NHANES (External)
                    </text>
                    <text x="220" y="165" fill="#858E88" fontSize="9" fontFamily="IBM Plex Mono">
                      Chance (0.50)
                    </text>

                    {/* Axis Labels */}
                    <text x="40" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">0.0</text>
                    <text x="175" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">False Positive Rate: 0.5</text>
                    <text x="310" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">1.0</text>

                    <text x="25" y="213" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.0</text>
                    <text x="25" y="123" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.5</text>
                    <text x="25" y="25" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 340 240" className="w-full h-full" aria-label="PR Curves comparing Kaggle and NHANES">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="320" y2="20" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="70" x2="320" y2="70" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="120" x2="320" y2="120" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="170" x2="320" y2="170" stroke="#F5F3EB" strokeWidth="1" />
                    <line x1="40" y1="210" x2="320" y2="210" stroke="#858E88" strokeWidth="1" />
                    <line x1="40" y1="20" x2="40" y2="210" stroke="#858E88" strokeWidth="1" />

                    {/* Random prevalence baseline (0.041 NHANES) */}
                    <line x1="40" y1="198" x2="320" y2="198" stroke="#858E88" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Kaggle PR curve */}
                    <path
                      d="M 40 90 Q 100 125, 180 160 T 320 195"
                      fill="none"
                      stroke="#23645A"
                      strokeWidth="2.5"
                    />

                    {/* NHANES PR curve */}
                    <path
                      d="M 40 165 Q 120 180, 220 190 T 320 198"
                      fill="none"
                      stroke="#994524"
                      strokeWidth="2.5"
                    />

                    {/* Interactive hover crosshair */}
                    {hoverCoord && (
                      <line
                        x1={40 + hoverCoord.x * 280}
                        y1="20"
                        x2={40 + hoverCoord.x * 280}
                        y2="210"
                        stroke="#172B29"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Labels */}
                    <text x="80" y="105" fill="#23645A" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                      Kaggle PR-AUC: {selectedHeroModel === 'lr' ? '0.214' : selectedHeroModel === 'rf' ? '0.179' : '0.158'}
                    </text>
                    <text x="120" y="155" fill="#994524" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                      NHANES PR-AUC: {selectedHeroModel === 'lr' ? '0.079' : selectedHeroModel === 'rf' ? '0.078' : '0.077'}
                    </text>
                    <text x="180" y="193" fill="#858E88" fontSize="9" fontFamily="IBM Plex Mono">
                      Random Baseline (0.041)
                    </text>

                    {/* Axes */}
                    <text x="40" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">0.0</text>
                    <text x="175" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">Recall: 0.5</text>
                    <text x="310" y="225" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono">1.0</text>

                    <text x="25" y="213" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.0</text>
                    <text x="25" y="123" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">0.5</text>
                    <text x="25" y="25" fill="#4D5D57" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">1.0</text>
                  </svg>
                )}

                {/* Live hover coordinates badge */}
                {hoverCoord && (
                  <div className="absolute top-4 right-4 bg-[#FCFBF7]/95 border border-[#C9D0C6] p-2 rounded-xs font-mono text-[10px] text-[#172B29] shadow-xs">
                    <div>{activeTab === 'roc' ? `FPR: ${(hoverCoord.x).toFixed(2)}` : `Recall: ${(hoverCoord.x).toFixed(2)}`}</div>
                    <div>{activeTab === 'roc' ? `TPR: ${(hoverCoord.y).toFixed(2)}` : `Precision: ${(hoverCoord.y).toFixed(2)}`}</div>
                  </div>
                )}
              </div>

              {/* Legend & Caption */}
              <div className="mt-3 pt-3 border-t border-[#C9D0C6] flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1 bg-[#23645A]" />
                      <span className="text-[#172B29]">Source (Kaggle in-domain)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1 bg-[#994524]" />
                      <span className="text-[#172B29]">Target (NHANES external)</span>
                    </div>
                  </div>
                  <span className="text-[#4D5D57]">Move cursor over plot to inspect</span>
                </div>
                <p className="text-[11px] text-[#4D5D57] leading-relaxed">
                  {activeTab === 'roc'
                    ? 'Cross-domain ROC-AUC drops by 12-15% across all models with non-overlapping 95% bootstrap confidence intervals.'
                    : 'PR-AUC collapses 51-63% across all models, approaching the 0.041 baseline and revealing severe minority class detection failure.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal for Figure 1 export */}
      <FigureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src="/figures/fig1_performance_summary (1).png"
        alt="Figure 1: Logistic Regression ROC and PR evaluation"
        figureNumber="Figure 1"
        caption="Primary performance summary comparing models on the Kaggle in-domain test set (N=1,533) versus untouched NHANES 2021-2023 (N=3,167). Note the dramatic collapse in precision-recall performance under rare event prevalence."
      />
    </section>
  );
}
