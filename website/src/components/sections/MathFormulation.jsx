/**
 * MathFormulation  -  Section 4.4 of the manuscript.
 * Renders all 7 mathematical definitions using KaTeX with Swiss Editorial styling.
 */
import { useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard';

const EQUATIONS = [
  {
    id: 'eq1',
    number: 'Eq. 1',
    label: 'Covariate Shift',
    accent: 'neutral',
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
      'Concept shift occurs when the relationship between features and labels differs across domains  -  the decision boundary itself has changed.',
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
    label: 'Generalisation Gap (Δ)',
    accent: 'neutral',
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
    accent: 'neutral',
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.katex) renderAll();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="formulation" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            07 / THEORETICAL FOUNDATION & EQUATIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Mathematical Formulation
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl mt-3 leading-relaxed">
            Formal definitions of all statistical quantities used in the manuscript. Every reported 
            metric incorporates 95% bootstrap confidence intervals computed over B = 1,000 stratified resamples.
          </p>
        </div>

        {/* Notation table */}
        <div className="mb-12 rounded-md overflow-hidden border border-white/[0.08] bg-[#111114]">
          <div className="bg-[#0c0c0e] px-5 py-3 border-b border-white/[0.08] flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-200">
              TABLE 4: MATHEMATICAL NOTATION REFERENCE
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">SECTION 4.4</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0e0e11] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-5 w-40">Symbol</th>
                  <th className="py-2.5 px-5">Operational Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-zinc-300">
                {[
                  ['S', 'Source domain (Kaggle Stroke Prediction Dataset, N=5,109)'],
                  ['T', 'Target domain (NHANES 2021–2023 Held-Out Survey, N=3,167)'],
                  ['f_S', 'Classifier trained strictly on source domain S split'],
                  ['P(X)', 'Marginal biomarker distribution across harmonised 4D subspace'],
                  ['P(Y|X)', 'Conditional label distribution (true stroke risk given covariates)'],
                  ['M(f, D)', 'Performance metric evaluation of model f on dataset D'],
                  ['Eᵢ', 'Expected (Kaggle) proportion in PSI decile bin i'],
                  ['Aᵢ', 'Actual (NHANES) proportion in PSI decile bin i'],
                  ['Pₙ, Rₙ', 'Empirical precision and recall at operating cutoff n'],
                  ['Sₖ', 'Set of sample predictions partitioned in calibration bin k'],
                  ['B', 'Stratified bootstrap resample count (B = 1,000, seed = 42)'],
                  ['θ̂_b', 'Empirical metric estimate evaluated on b-th resample'],
                ].map(([sym, desc]) => (
                  <tr key={sym} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-5 font-mono text-xs text-zinc-200 font-semibold whitespace-nowrap">{sym}</td>
                    <td className="py-2.5 px-5 text-zinc-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Equation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EQUATIONS.map((eq) => (
            <GlassCard key={eq.id} accent={eq.accent}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                    {eq.number}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-100">{eq.label}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{eq.description}</p>

              {/* Formula display */}
              <div
                className="rounded-[3px] py-4 px-5 mb-3 text-center overflow-x-auto bg-[#09090b] border border-white/[0.08]"
              >
                <div
                  data-latex={eq.latex}
                  className="text-zinc-100"
                  style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.95rem' }}
                >
                  <span className="text-zinc-300 text-xs font-mono">
                    {eq.readable}
                  </span>
                </div>
              </div>

              {/* Note */}
              <p className="text-[11px] font-mono text-zinc-400">
                [NOTE] {eq.note}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MathFormulation;
