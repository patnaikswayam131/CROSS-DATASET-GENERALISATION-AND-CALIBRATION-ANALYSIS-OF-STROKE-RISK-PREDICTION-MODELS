/**
 * WorkflowDiagram — SVG recreation of the 5-phase cross-domain evaluation pipeline.
 * Faithful to the original orientation, arrows, and box contents.
 * Colour scheme remapped to the website dark theme.
 *
 * Original colours → Website mapping:
 *   Orange/amber boxes (datasets) → #e8a838 (warning)
 *   Blue boxes (core pipeline)    → #4f8ef7 (primary)
 *   Dashed box (NHANES held out)  → #2e3248 border, transparent bg
 *   Green boxes (analysis)        → #4caf82 (success)
 *   Purple box (conclusion)       → #7c6af7 (violet accent)
 */
export function WorkflowDiagram() {
  // ─── Shared style constants ──────────────────────────────────
  const BG_ORANGE  = '#1a1409';   // dark amber tint bg
  const BG_BLUE    = '#0d1625';   // dark blue tint bg
  const BG_GREEN   = '#0a1a12';   // dark green tint bg
  const BG_PURPLE  = '#150f2e';   // dark purple tint bg
  const BG_DASHED  = 'transparent';

  const STROKE_ORANGE = '#e8a838';
  const STROKE_BLUE   = '#4f8ef7';
  const STROKE_GREEN  = '#4caf82';
  const STROKE_PURPLE = '#7c6af7';
  const STROKE_DASHED = '#2e3248';

  const TEXT_ORANGE = '#e8a838';
  const TEXT_BLUE   = '#7eb3ff';
  const TEXT_GREEN  = '#4caf82';
  const TEXT_PURPLE = '#a89cf8';
  const TEXT_MUTED  = '#8b90a4';

  const ARROW_ORANGE = '#e8a838';
  const ARROW_BLUE   = '#4f8ef7';
  const ARROW_GREEN  = '#4caf82';

  const rx = 8; // border-radius for rects

  return (
    <section id="workflow" className="max-w-4xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Methodology
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        Cross-Domain Evaluation Pipeline
      </h2>
      <p className="text-sm text-[#8b90a4] mb-10 max-w-2xl">
        Five-phase workflow from data ingestion through shift analysis. The dashed box indicates
        NHANES is held out throughout training — never used for fitting any parameter.
      </p>

      <div
        className="rounded-xl overflow-hidden border border-[#2e3248] p-4 md:p-8"
        style={{ backgroundColor: '#0f1117' }}
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
    </section>
  );
}

export default WorkflowDiagram;
