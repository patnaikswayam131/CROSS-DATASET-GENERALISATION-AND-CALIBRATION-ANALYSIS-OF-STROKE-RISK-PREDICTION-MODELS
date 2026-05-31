/**
 * MathFormulation — Section 4.4 of the manuscript.
 * Renders all 7 mathematical definitions using styled SVG-text / pre-formatted blocks.
 * Uses KaTeX CDN for proper formula rendering.
 */
import { useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';

const EQUATIONS = [
  {
    id: 'eq1',
    number: 'Eq. 1',
    label: 'Covariate Shift',
    accent: 'primary',
    description:
      'Covariate shift occurs when the marginal feature distribution differs between source and target domains while the conditional label distribution remains stable.',
    latex: 'P_S(X) \\neq P_T(X) \\quad \\text{but} \\quad P_S(Y|X) = P_T(Y|X)',
    readable: 'Pₛ(X) ≠ P_T(X),  but  Pₛ(Y|X) = P_T(Y|X)',
    note: 'S = source domain (Kaggle), T = target domain (NHANES)',
  },
  {
    id: 'eq2',
    number: 'Eq. 2',
    label: 'Concept Shift',
    accent: 'danger',
    description:
      'Concept shift occurs when the relationship between features and labels differs across domains — the decision boundary itself has changed.',
    latex: 'P_S(Y|X) \\neq P_T(Y|X)',
    readable: 'Pₛ(Y|X) ≠ P_T(Y|X)',
    note: 'All-negative feature-patching deltas confirm concurrent concept shift in this study',
  },
  {
    id: 'eq3',
    number: 'Eq. 3',
    label: 'Population Stability Index (PSI)',
    accent: 'warning',
    description:
      'Quantifies distributional shift magnitude using binned proportions. Thresholds: < 0.10 stable · 0.10–0.20 moderate · > 0.20 severe.',
    latex: '\\text{PSI} = \\sum_{i=1}^{M}(E_i - A_i)\\ln\\!\\left(\\frac{E_i}{A_i}\\right)',
    readable: 'PSI = Σᵢ (Eᵢ − Aᵢ) · ln(Eᵢ / Aᵢ)',
    note: 'Eᵢ = Kaggle bin proportion · Aᵢ = NHANES bin proportion · M = 10 bins',
  },
  {
    id: 'eq4',
    number: 'Eq. 4',
    label: 'Generalisation Gap',
    accent: 'primary',
    description:
      'Measures performance loss under domain shift, where the model is trained on source domain only.',
    latex: '\\Delta = \\mathcal{M}(f_{\\mathcal{S}}, \\mathcal{S}_{\\text{test}}) - \\mathcal{M}(f_{\\mathcal{S}}, \\mathcal{T})',
    readable: 'Δ = M(f_S, S_test) − M(f_S, T)',
    note: 'f_S = model trained on S only · M = performance metric · T = target NHANES',
  },
  {
    id: 'eq5',
    number: 'Eq. 5',
    label: 'Average Precision (PR-AUC)',
    accent: 'success',
    description:
      'Preferred over ROC-AUC as it is sensitive to minority-class detection failure under class imbalance. The random baseline equals the class prevalence (~0.041 for NHANES).',
    latex: '\\text{AP} = \\sum_{n}(R_n - R_{n-1})P_n',
    readable: 'AP = Σₙ (Rₙ − Rₙ₋₁) · Pₙ',
    note: 'Pₙ = precision at threshold n · Rₙ = recall at threshold n',
  },
  {
    id: 'eq6',
    number: 'Eq. 6',
    label: 'Expected Calibration Error (ECE)',
    accent: 'warning',
    description:
      'Uses 10 uniform bins. ECE > 0.40 means predicted probabilities deviate from true frequencies by over 40 percentage points on average.',
    latex: '\\text{ECE} = \\sum_{k=1}^{K}\\frac{|S_k|}{n}\\left|\\text{acc}(S_k)-\\text{conf}(S_k)\\right|',
    readable: 'ECE = Σₖ (|Sₖ|/n) · |acc(Sₖ) − conf(Sₖ)|',
    note: 'acc(Sₖ) = fraction of positives in bin · conf(Sₖ) = mean predicted probability · K = 10',
  },
  {
    id: 'eq7',
    number: 'Eq. 7',
    label: 'Bootstrap Confidence Intervals',
    accent: 'neutral',
    description:
      'B = 1,000 stratified resamples (seed = 42). Non-overlapping CIs between Kaggle and NHANES confirm statistically significant degradation.',
    latex: '\\text{CI}_{95\\%} = [\\hat{\\theta}_{0.025}, \\hat{\\theta}_{0.975}]',
    readable: 'CI₉₅% = [θ̂₀.₀₂₅,  θ̂₀.₉₇₅]',
    note: 'θ̂_b = metric on b-th bootstrap resample · B = 1,000 resamples',
  },
];

// Colour helpers
const ACCENT_LABEL_COLOR = {
  primary: '#4f8ef7',
  danger: '#e05c5c',
  warning: '#e8a838',
  success: '#4caf82',
  neutral: '#8b90a4',
};

const ACCENT_BG = {
  primary: 'rgba(79,142,247,0.10)',
  danger: 'rgba(224,92,92,0.10)',
  warning: 'rgba(232,168,56,0.10)',
  success: 'rgba(76,175,130,0.10)',
  neutral: 'rgba(139,144,164,0.08)',
};

export function MathFormulation() {
  // Load KaTeX from CDN
  useEffect(() => {
    if (document.querySelector('#katex-css')) return;
    const link = document.createElement('link');
    link.id = 'katex-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
    document.head.appendChild(link);

    if (window.katex) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
    script.onload = () => renderAll();
    document.head.appendChild(script);
  }, []);

  const renderAll = () => {
    if (!window.katex) return;
    document.querySelectorAll('[data-latex]').forEach((el) => {
      try {
        window.katex.render(el.dataset.latex, el, {
          throwOnError: false,
          displayMode: true,
          output: 'html',
        });
      } catch {
        // fallback already shown
      }
    });
  };

  // Re-run render when katex loads (if already loaded)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.katex) renderAll();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="math" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Mathematical Formulation
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-4">
        Formal Definitions
      </h2>
      <p className="text-sm text-[#8b90a4] mb-12 max-w-3xl leading-relaxed">
        Mathematical definitions of all key quantities used in this study. All metrics include
        95% bootstrap confidence intervals computed over 1,000 stratified resamples.
      </p>

      {/* Notation table */}
      <div className="mb-12 rounded-xl overflow-hidden border border-[#2e3248]">
        <div className="bg-[#1a1d27] px-5 py-3 border-b border-[#2e3248]">
          <h3 className="text-sm font-semibold text-[#e8eaf0]">Notation Reference (Table 2)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2e3248]">
                <th className="text-left text-[#8b90a4] font-medium py-3 px-5 w-32">Symbol</th>
                <th className="text-left text-[#8b90a4] font-medium py-3 px-5">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['S', 'Source domain (Kaggle Stroke Prediction Dataset)'],
                ['T', 'Target domain (NHANES 2021–2023)'],
                ['f_S', 'Classifier trained on source domain S only'],
                ['P(X)', 'Marginal feature distribution'],
                ['P(Y|X)', 'Conditional label distribution (stroke | features)'],
                ['M(f, D)', 'Performance metric (ROC-AUC, PR-AUC, etc.) of model f on dataset D'],
                ['Eᵢ', 'Expected (Kaggle) proportion in PSI bin i'],
                ['Aᵢ', 'Actual (NHANES) proportion in PSI bin i'],
                ['Pₙ, Rₙ', 'Precision and recall at threshold n'],
                ['Sₖ', 'Set of predictions falling in calibration bin k'],
                ['B', 'Number of bootstrap resamples (B = 1,000)'],
                ['θ̂_b', 'Metric value on b-th bootstrap resample'],
              ].map(([sym, desc]) => (
                <tr key={sym} className="border-t border-[#2e3248] hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-5 font-mono text-xs text-[#4f8ef7] whitespace-nowrap">{sym}</td>
                  <td className="py-2.5 px-5 text-[#8b90a4]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EQUATIONS.map((eq) => (
          <GlassCard key={eq.id} accent={eq.accent} maxTilt={5}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
                style={{ background: ACCENT_BG[eq.accent], color: ACCENT_LABEL_COLOR[eq.accent] }}
              >
                {eq.number}
              </span>
              <h3 className="text-sm font-semibold text-[#e8eaf0]">{eq.label}</h3>
            </div>

            {/* Description */}
            <p className="text-xs text-[#8b90a4] leading-relaxed mb-4">{eq.description}</p>

            {/* Formula display — KaTeX renders into this div, fallback shows readable form */}
            <div
              className="rounded-lg py-4 px-5 mb-3 text-center overflow-x-auto"
              style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                data-latex={eq.latex}
                className="text-[#e8eaf0]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.02em' }}
              >
                {/* Readable fallback until KaTeX loads */}
                <span className="text-[#e8eaf0] text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                  {eq.readable}
                </span>
              </div>
            </div>

            {/* Note */}
            <p className="text-xs text-[#8b90a4]">
              <span style={{ color: ACCENT_LABEL_COLOR[eq.accent] }}>ℹ</span> {eq.note}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export default MathFormulation;
