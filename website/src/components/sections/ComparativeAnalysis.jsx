import { GlassCard } from '../ui/GlassCard';

/**
 * ComparativeAnalysis  -  Section 5.8 of the manuscript (Table 6).
 * Compares this study vs Sutcu et al. (2025) and Chakraborty et al. (2024).
 * Swiss Editorial layout with Obsidian table surfaces.
 */

const COMPARISON_ROWS = [
  {
    dimension: 'Training Dataset',
    thisStudy: 'Kaggle Stroke Prediction (N = 5,109)',
    sutcu: 'Kaggle Stroke Prediction',
    chakraborty: 'Kaggle Stroke Prediction',
  },
  {
    dimension: 'Evaluation Dataset',
    thisStudy: 'NHANES 2021–2023 (N = 3,167)  -  independent CDC survey',
    sutcu: 'Held-out split of Kaggle only',
    chakraborty: 'Held-out split of Kaggle only',
  },
  {
    dimension: 'Cross-Domain Test',
    thisStudy: 'Yes  -  evaluated directly without target retraining',
    sutcu: 'No (in-domain only)',
    chakraborty: 'No (in-domain only)',
    highlightThis: true,
  },
  {
    dimension: 'Best ROC-AUC (in-domain)',
    thisStudy: '0.838 (Logistic Regression)',
    sutcu: '0.834 (Gradient Boosting)',
    chakraborty: '98.6% accuracy (not AUC)',
  },
  {
    dimension: 'Cross-Domain ROC-AUC',
    thisStudy: '0.713 (LR) / 0.725 (RF) / 0.709 (XGB)',
    sutcu: 'Not reported',
    chakraborty: 'Not reported',
    highlightThis: true,
  },
  {
    dimension: 'PR-AUC Reported',
    thisStudy: '0.214 → 0.079 under shift (63% collapse)',
    sutcu: 'Not reported',
    chakraborty: 'Not reported',
    highlightThis: true,
  },
  {
    dimension: 'Generalisation Gap (Δ)',
    thisStudy: '−0.125 ROC-AUC (non-overlapping 95% CIs)',
    sutcu: 'Not applicable',
    chakraborty: 'Not applicable',
    highlightThis: true,
  },
  {
    dimension: 'Shift Quantification',
    thisStudy: 'PSI, KS test, domain classifier, label shift test',
    sutcu: 'Not performed',
    chakraborty: 'Not performed',
    highlightThis: true,
  },
  {
    dimension: 'Concept Shift Detection',
    thisStudy: 'Feature patching  -  all-negative deltas confirm concept shift',
    sutcu: 'Not performed',
    chakraborty: 'Not performed',
    highlightThis: true,
  },
  {
    dimension: 'Post-hoc Calibration',
    thisStudy: 'Platt scaling + Isotonic regression  -  no recovery',
    sutcu: 'Not evaluated',
    chakraborty: 'Not evaluated',
  },
  {
    dimension: 'Class Imbalance Protocol',
    thisStudy: 'Cost-sensitive class weighting (class_weight = balanced, scale_pos_weight = 19.6; no synthetic artifacts)',
    sutcu: 'Various oversampling',
    chakraborty: 'PCA + ensemble stacking',
  },
  {
    dimension: 'Bootstrap Confidence Intervals',
    thisStudy: '1,000 stratified resamples (B = 1,000)',
    sutcu: 'Not reported',
    chakraborty: 'Not reported',
    highlightThis: true,
  },
];

const KEY_FINDINGS = [
  {
    accent: 'danger',
    title: '63% PR-AUC Collapse Invisible to ROC-AUC',
    body: 'Sutcu et al. (2025) report gradient boosting ROC-AUC of 0.834 on in-domain holdout. This study achieves 0.838 in-domain and 0.713 cross-domain. The 0.125 absolute gap  -  confirmed by non-overlapping CIs  -  is the study\'s central empirical contribution. Sutcu et al. report no PR-AUC; this study reveals a collapse from 0.214 to 0.079, invisible to ROC-AUC alone.',
  },
  {
    accent: 'warning',
    title: 'High Accuracy Does Not Imply External Validity',
    body: 'The 98.6% in-domain accuracy reported by Chakraborty et al. (2024) on the same Kaggle data reinforces the core finding: held-out accuracy provides no reliable indication of performance on an independent population.',
  },
  {
    accent: 'neutral',
    title: 'PR-AUC Exposes What ROC-AUC Obscures',
    body: 'In-domain models achieve 3.2×–4.4× the random baseline PR-AUC. Cross-domain models achieve only 1.9×, indicating near-trivial stroke detection utility in the target population. This failure mode is entirely invisible to ROC-AUC analysis alone.',
  },
];

export function ComparativeAnalysis() {
  return (
    <section id="comparative" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            09 / BENCHMARK AUDIT & LITERATURE COMPARISON
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            This Study vs. Prior Literature
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Systematic comparison across experimental dimensions between the present study and two leading 
            benchmarks on the Kaggle Stroke Prediction Dataset (Table 6 from the manuscript).
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-md overflow-hidden border border-white/[0.08] bg-[#111114] mb-12">
          <div className="px-5 py-3 border-b border-white/[0.08] bg-[#0c0c0e] flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-200">
              TABLE 6: METHODOLOGICAL & EMPIRICAL COMPARISON MATRIX
            </span>
            <span className="text-[10px] font-mono text-zinc-400">MANUSCRIPT SEC. 5.8</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-5 w-48">Research Dimension</th>
                  <th className="py-3 px-5 text-zinc-100 font-semibold bg-white/[0.03]">
                    This Study (NIST / 2025)
                  </th>
                  <th className="py-3 px-5">Sutcu et al. (2025)</th>
                  <th className="py-3 px-5">Chakraborty et al. (2024)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.dimension}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-5 font-mono text-zinc-400 whitespace-nowrap align-top">{row.dimension}</td>
                    <td
                      className={`py-3 px-5 align-top font-sans ${
                        row.highlightThis 
                          ? 'bg-rose-500/[0.04] text-zinc-100 font-medium' 
                          : 'bg-white/[0.02] text-zinc-300'
                      }`}
                    >
                      {row.thisStudy}
                    </td>
                    <td className="py-3 px-5 text-zinc-400 align-top">{row.sutcu}</td>
                    <td className="py-3 px-5 text-zinc-400 align-top">{row.chakraborty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-white/[0.08] bg-[#0c0c0e]">
            <p className="text-[11px] font-mono text-zinc-400">
              * Shaded rows highlight key empirical contributions (cross-domain evaluation, PR-AUC analysis, PSI/KS shift quantification, concept shift detection) first established in this work.
            </p>
          </div>
        </div>

        {/* Key findings from comparative analysis */}
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 mb-6">
          PRIMARY SYSTEMATIC TAKEAWAYS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KEY_FINDINGS.map((f) => (
            <GlassCard key={f.title} accent={f.accent}>
              <h4 className="text-sm font-semibold text-zinc-100 mb-3 leading-snug">{f.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{f.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComparativeAnalysis;
