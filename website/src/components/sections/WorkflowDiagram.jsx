import { useState } from 'react';
import { LightboxModal } from '../ui/LightboxModal';

/**
 * WorkflowDiagram  -  SVG recreation of the 5-phase cross-domain evaluation pipeline.
 * Faithful to the original orientation, arrows, and box contents.
 * Colour scheme remapped to the website dark theme.
 */
export function WorkflowDiagram() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ─── Shared style constants  -  Swiss Editorial Obsidian Palette ──────────────
  const BG_ORANGE  = '#121214';   // Phase 1 (Ingestion)
  const BG_BLUE    = '#141418';   // Phase 2 (Preprocessing)
  const BG_GREEN   = '#111613';   // Phase 3 & 4 (Models & Evaluation)
  const BG_PURPLE  = '#181114';   // Phase 5 (Shift Diagnosis)
  const BG_DASHED  = 'transparent';

  const STROKE_ORANGE = 'rgba(255, 255, 255, 0.15)';
  const STROKE_BLUE   = '#94a3b8';
  const STROKE_GREEN  = '#10b981';
  const STROKE_PURPLE = '#f43f5e';
  const STROKE_DASHED = 'rgba(255, 255, 255, 0.12)';

  const TEXT_ORANGE = '#e2e8f0';
  const TEXT_BLUE   = '#cbd5e1';
  const TEXT_GREEN  = '#6ee7b7';
  const TEXT_PURPLE = '#fda4af';
  const TEXT_MUTED  = '#71717a';

  const ARROW_ORANGE = 'rgba(255, 255, 255, 0.25)';
  const ARROW_BLUE   = '#94a3b8';
  const ARROW_GREEN  = '#10b981';

  const rx = 4; // sharp border-radius for technical architecture nodes

  return (
    <section id="workflow" className="max-w-5xl py-20 px-6 mx-auto">
      {/* Section label */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span>01 / METHODOLOGICAL FRAMEWORK · FIVE-PHASE PIPELINE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
            Cross-Domain Evaluation Pipeline
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Strict five-phase workflow from independent data ingestion through shift diagnosis. The dashed boundary indicates
            the NHANES cohort is held out throughout model fitting  -  never used for preprocessing, tuning, or threshold selection.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>Manuscript Schematic</span>
        </button>
      </div>

      <div
        className="rounded-md overflow-hidden border border-white/[0.08] p-4 md:p-8"
        style={{ backgroundColor: '#111114' }}
      >
        <svg
          viewBox="0 0 620 1120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          role="img"
          aria-label="Cross-domain evaluation pipeline diagram"
        >
          <defs>
            {/* Arrow markers */}
            <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={ARROW_BLUE} />
            </marker>
            <marker id="arr-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={ARROW_ORANGE} />
            </marker>
            <marker id="arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={ARROW_GREEN} />
            </marker>
          </defs>

          {/* ── Row 1: Two dataset boxes side by side ── */}
          {/* Kaggle Dataset */}
          <rect x="40" y="20" width="160" height="50" rx={rx} fill={BG_ORANGE} stroke={STROKE_ORANGE} strokeWidth="1.5" />
          <text x="120" y="49" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_ORANGE} fontFamily="Inter,sans-serif">Kaggle Dataset</text>

          {/* NHANES 2021-23 */}
          <rect x="420" y="20" width="160" height="50" rx={rx} fill={BG_ORANGE} stroke={STROKE_ORANGE} strokeWidth="1.5" />
          <text x="500" y="49" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_ORANGE} fontFamily="Inter,sans-serif">NHANES 2021-23</text>

          {/* Arrows from both datasets merging down to Feature Harmonisation */}
          {/* Kaggle → down to merge point */}
          <line x1="120" y1="70" x2="120" y2="110" stroke={ARROW_ORANGE} strokeWidth="1.5" markerEnd="url(#arr-orange)" />
          {/* NHANES → down to merge point */}
          <line x1="500" y1="70" x2="500" y2="110" stroke={ARROW_ORANGE} strokeWidth="1.5" />
          {/* Horizontal join */}
          <line x1="120" y1="110" x2="500" y2="110" stroke={ARROW_ORANGE} strokeWidth="1.5" />
          {/* Down to Feature Harmonisation */}
          <line x1="310" y1="110" x2="310" y2="140" stroke={ARROW_ORANGE} strokeWidth="1.5" markerEnd="url(#arr-orange)" />

          {/* ── Row 2: Feature Harmonisation ── */}
          <rect x="165" y="140" width="290" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="310" y="169" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">Feature Harmonisation</text>

          {/* Arrow down */}
          <line x1="310" y1="190" x2="310" y2="220" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 3: Preprocessing ── */}
          <rect x="165" y="220" width="290" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="310" y="249" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">Preprocessing</text>

          {/* Arrow down */}
          <line x1="310" y1="270" x2="310" y2="300" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 4: Stratified 70/30 Split ── */}
          <rect x="165" y="300" width="290" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="310" y="329" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">Stratified 70/30 Split</text>

          {/* Left branch: down-left to Model Training */}
          <line x1="165" y1="325" x2="90" y2="325" stroke={ARROW_BLUE} strokeWidth="1.5" />
          <line x1="90" y1="325" x2="90" y2="390" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* Right branch: down-right to NHANES Held Out */}
          <line x1="455" y1="325" x2="530" y2="325" stroke={ARROW_BLUE} strokeWidth="1.5" />
          <line x1="530" y1="325" x2="530" y2="390" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 5a (left): Model Training ── */}
          <rect x="20" y="390" width="160" height="64" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="100" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">Model Training</text>
          <text x="100" y="430" textAnchor="middle" fontSize="10" fill={TEXT_MUTED} fontFamily="Inter,sans-serif">(Logistic Regression, Random</text>
          <text x="100" y="444" textAnchor="middle" fontSize="10" fill={TEXT_MUTED} fontFamily="Inter,sans-serif">Forest, XGBoost)</text>

          {/* Arrow down from Model Training */}
          <line x1="100" y1="454" x2="100" y2="490" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 5b (right): NHANES Held Out (dashed) ── */}
          <rect x="440" y="390" width="160" height="50" rx={rx} fill={BG_DASHED} stroke={STROKE_DASHED} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="520" y="419" textAnchor="middle" fontSize="13" fontWeight="500" fill={TEXT_MUTED} fontFamily="Inter,sans-serif">NHANES Held Out</text>

          {/* Arrow down from NHANES Held Out */}
          <line x1="520" y1="440" x2="520" y2="510" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 6a (left): In-Domain Evaluation ── */}
          <rect x="20" y="490" width="160" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="100" y="519" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">In-Domain Evaluation</text>

          {/* Arrow down from In-Domain Evaluation */}
          <line x1="100" y1="540" x2="100" y2="570" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* ── Row 7: External Deployment (left) + Cross-Domain Evaluation (right) ── */}
          <rect x="20" y="570" width="185" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="112" y="599" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">External Deployment</text>

          <rect x="400" y="570" width="200" height="50" rx={rx} fill={BG_BLUE} stroke={STROKE_BLUE} strokeWidth="1.5" />
          <text x="500" y="599" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_BLUE} fontFamily="Inter,sans-serif">Cross-Domain Evaluation</text>

          {/* Arrow: External Deployment → Cross-Domain Evaluation */}
          <line x1="205" y1="595" x2="396" y2="595" stroke={ARROW_BLUE} strokeWidth="1.5" markerEnd="url(#arr-blue)" />

          {/* Down from NHANES Held Out reaches Cross-Domain */}
          <line x1="520" y1="510" x2="520" y2="570" stroke={ARROW_BLUE} strokeWidth="1.5" />

          {/* Arrows: both converge to Performance Degradation */}
          {/* From External Deployment */}
          <line x1="112" y1="620" x2="112" y2="650" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="112" y1="650" x2="310" y2="650" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* From Cross-Domain Evaluation */}
          <line x1="500" y1="620" x2="500" y2="650" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="500" y1="650" x2="400" y2="650" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* ── Row 8: Performance Degradation ── */}
          <rect x="165" y="650" width="290" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="310" y="679" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Performance Degradation</text>

          {/* Three branches from Performance Degradation */}
          {/* Left: Shift Analysis */}
          <line x1="165" y1="675" x2="90" y2="675" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="90" y1="675" x2="90" y2="730" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* Centre: Calibration Analysis */}
          <line x1="310" y1="700" x2="310" y2="730" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* Right: Ablation Study */}
          <line x1="455" y1="675" x2="530" y2="675" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="530" y1="675" x2="530" y2="730" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* ── Row 9: Three analysis boxes ── */}
          {/* Shift Analysis */}
          <rect x="20" y="730" width="155" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="97" y="759" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Shift Analysis</text>

          {/* Calibration Analysis */}
          <rect x="215" y="730" width="190" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="310" y="759" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Calibration Analysis</text>

          {/* Ablation Study */}
          <rect x="445" y="730" width="155" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="522" y="759" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Ablation Study</text>

          {/* Arrows converging to Post-Hoc Calibration Attempt */}
          {/* Left box */}
          <line x1="97" y1="780" x2="97" y2="810" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="97" y1="810" x2="200" y2="810" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />
          {/* Centre box */}
          <line x1="310" y1="780" x2="310" y2="810" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />
          {/* Right box */}
          <line x1="522" y1="780" x2="522" y2="810" stroke={ARROW_GREEN} strokeWidth="1.5" />
          <line x1="522" y1="810" x2="420" y2="810" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* ── Row 10: Post-Hoc Calibration Attempt ── */}
          <rect x="165" y="810" width="290" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="310" y="839" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Post-Hoc Calibration Attempt</text>

          {/* Arrow down */}
          <line x1="310" y1="860" x2="310" y2="890" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* ── Row 11: Post-Adaptation Evaluation ── */}
          <rect x="165" y="890" width="290" height="50" rx={rx} fill={BG_GREEN} stroke={STROKE_GREEN} strokeWidth="1.5" />
          <text x="310" y="919" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_GREEN} fontFamily="Inter,sans-serif">Post-Adaptation Evaluation</text>

          {/* Arrow down */}
          <line x1="310" y1="940" x2="310" y2="970" stroke={ARROW_GREEN} strokeWidth="1.5" markerEnd="url(#arr-green)" />

          {/* ── Row 12: Conclusion ── */}
          <rect x="195" y="970" width="230" height="50" rx={rx} fill={BG_PURPLE} stroke={STROKE_PURPLE} strokeWidth="1.5" />
          <text x="310" y="999" textAnchor="middle" fontSize="13" fontWeight="600" fill={TEXT_PURPLE} fontFamily="Inter,sans-serif">Conclusion</text>

        </svg>
      </div>

      <LightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/figures/workflow.png"
        title="Five-Phase Cross-Domain Evaluation Pipeline"
        caption="Complete methodological workflow illustrating Kaggle training, NHANES held-out evaluation, Kolmogorov-Smirnov and PSI distribution shift testing, and post-hoc calibration."
      />
    </section>
  );
}

export default WorkflowDiagram;
