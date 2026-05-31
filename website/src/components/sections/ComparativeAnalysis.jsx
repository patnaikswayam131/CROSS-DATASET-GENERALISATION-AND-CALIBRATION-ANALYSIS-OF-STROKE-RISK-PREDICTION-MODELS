import { GlassCard } from '../ui/GlassCard';

/**
 * ComparativeAnalysis — Section 5.8 of the manuscript (Table 6).
 * Compares this study vs Sutcu et al. (2025) and Chakraborty et al. (2024).
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
    thisStudy: 'NHANES 2021–2023 (N = 3,167) — independent national survey',
    sutcu: 'Held-out split of Kaggle only',
    chakraborty: 'Held-out split of Kaggle only',
  },
  {
    dimension: 'Cross-Domain Test',
    thisStudy: '✓ Yes — no retraining on target',
    sutcu: '✗ No',
    chakraborty: '✗ No',
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
    thisStudy: '✓ 0.214 → 0.079 under shift (63% collapse)',
    sutcu: '✗ Not reported',
    chakraborty: '✗ Not reported',
    highlightThis: true,
  },
  {
    dimension: 'Generalisation Gap',
    thisStudy: '−0.125 ROC-AUC (non-overlapping 95% CIs)',
    sutcu: 'Not applicable',
    chakraborty: 'Not applicable',
    highlightThis: true,
  },
  {
    dimension: 'Shift Analysis',
    thisStudy: 'PSI, KS test, domain classifier, label shift test',
    sutcu: 'Not performed',
    chakraborty: 'Not performed',
    highlightThis: true,
  },
  {
    dimension: 'Concept Shift Detection',
    thisStudy: '✓ Feature patching — all-negative deltas confirm concept shift',
    sutcu: '✗ Not performed',
    chakraborty: '✗ Not performed',
    highlightThis: true,
  },
  {
    dimension: 'Post-hoc Calibration',
    thisStudy: 'Platt scaling + Isotonic regression — no recovery',
    sutcu: 'Not evaluated',
    chakraborty: 'Not evaluated',
  },
  {
    dimension: 'Class Imbalance Handling',
    thisStudy: 'SMOTE + class_weight = balanced',
    sutcu: 'Various oversampling',
    chakraborty: 'PCA + ensemble stacking',
  },
  {
    dimension: 'Bootstrap CIs',
    thisStudy: '✓ 1,000 stratified resamples',
    sutcu: '✗ Not reported',
    chakraborty: '✗ Not reported',
    highlightThis: true,
  },
];

const KEY_FINDINGS = [
  {
    accent: 'danger',
    title: '63% PR-AUC Collapse Invisible to ROC-AUC',
    body: 'Sutcu et al. (2025) report gradient boosting ROC-AUC of 0.834 on in-domain holdout. This study achieves 0.838 in-domain and 0.713 cross-domain. The 0.125 absolute gap — confirmed by non-overlapping CIs — is the study\'s central empirical contribution. Sutcu et al. report no PR-AUC; this study reveals a collapse from 0.214 to 0.079, invisible to ROC-AUC alone.',
  },
  {
    accent: 'warning',
    title: 'High Accuracy Does Not Imply External Validity',
    body: 'The 98.6% in-domain accuracy reported by Chakraborty et al. (2024) on the same Kaggle data reinforces the core finding: held-out accuracy provides no reliable indication of performance on an independent population.',
  },
  {
    accent: 'primary',
    title: 'PR-AUC Reveals What ROC-AUC Conceals',
    body: 'In-domain models achieve 3.2×–4.4× the random baseline PR-AUC. Cross-domain models achieve only 1.9×, indicating near-trivial stroke detection utility in the target population. This failure mode is entirely invisible to ROC-AUC analysis alone.',
  },
];

export function ComparativeAnalysis() {
  return (
    <section id="comparative" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Comparative Analysis
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        This Study vs. Prior Work
      </h2>
      <p className="text-sm text-[#8b90a4] mb-10 max-w-3xl leading-relaxed">
        Comparison across key experimental dimensions between the present study and two leading
        prior works on the Kaggle Stroke Prediction Dataset (Table 6 from the manuscript).
      </p>

      {/* Comparison table */}
      <div className="rounded-xl overflow-hidden border border-[#2e3248] mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(26,29,39,0.95)' }}>
                <th className="text-left text-[#8b90a4] font-medium py-4 px-5 w-52 border-b border-[#2e3248]">Dimension</th>
                <th className="text-left text-[#4f8ef7] font-semibold py-4 px-5 border-b border-[#2e3248]" style={{ background: 'rgba(79,142,247,0.06)' }}>
                  This Study
                </th>
                <th className="text-left text-[#8b90a4] font-medium py-4 px-5 border-b border-[#2e3248]">Sutcu et al. (2025)</th>
                <th className="text-left text-[#8b90a4] font-medium py-4 px-5 border-b border-[#2e3248]">Chakraborty et al. (2024)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.dimension}
                  className="border-t border-[#2e3248] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-5 text-xs font-medium text-[#8b90a4] whitespace-nowrap align-top">{row.dimension}</td>
                  <td
                    className="py-3 px-5 text-xs align-top"
                    style={{
                      background: row.highlightThis ? 'rgba(79,142,247,0.05)' : undefined,
                      color: row.highlightThis ? '#e8eaf0' : '#a0a4b8',
                      fontWeight: row.highlightThis ? 500 : 400,
                    }}
                  >
                    {row.thisStudy}
                  </td>
                  <td className="py-3 px-5 text-xs text-[#8b90a4] align-top">{row.sutcu}</td>
                  <td className="py-3 px-5 text-xs text-[#8b90a4] align-top">{row.chakraborty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#2e3248]" style={{ background: 'rgba(79,142,247,0.04)' }}>
          <p className="text-xs text-[#8b90a4]">
            Highlighted cells (blue tint) indicate dimensions where this study provides new contribution not present in prior work.
          </p>
        </div>
      </div>

      {/* Key findings from comparative analysis */}
      <h3 className="text-lg font-semibold text-[#e8eaf0] mb-6">Key Findings from Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KEY_FINDINGS.map((f) => (
          <GlassCard key={f.title} accent={f.accent} maxTilt={6}>
            <h4 className="text-sm font-semibold text-[#e8eaf0] mb-3 leading-snug">{f.title}</h4>
            <p className="text-xs text-[#8b90a4] leading-relaxed">{f.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export default ComparativeAnalysis;
