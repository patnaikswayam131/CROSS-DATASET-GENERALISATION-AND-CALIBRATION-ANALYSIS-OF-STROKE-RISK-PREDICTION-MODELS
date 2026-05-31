import { heroContent, statPills, heroMetric, heroMiniBar } from '../../data/siteConfig';
import Button from '../ui/Button';
import StatPill from '../ui/StatPill';
import AnimatedNumber from '../ui/AnimatedNumber';
import MiniBarVisual from '../ui/MiniBarVisual';

/**
 * Hero — full-width landing section with two-column layout.
 * Left: headline, subtitle, CTAs, stat pills.
 * Right: animated metric counter + PR-AUC mini bar visual.
 * Enhanced with particle-like background and better visual hierarchy.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: '#0f1117' }}
    >
      {/* ── Background effects ── */}
      {/* Subtle radial glow — top right */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 55% 55% at 85% 10%, rgba(79,142,247,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 15% 80%, rgba(124,106,247,0.04) 0%, transparent 70%)',
          ].join(','),
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(#4f8ef7 1px, transparent 1px), linear-gradient(90deg, #4f8ef7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-20">

          {/* ────────── Left Column ────────── */}
          <div className="lg:w-[58%]">
            {/* Category pill */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#4f8ef7]"
                style={{ boxShadow: '0 0 6px rgba(79,142,247,0.8)' }}
              />
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-[#4f8ef7]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {heroContent.smallLabel}
              </p>
            </div>

            {/* Main title */}
            <h1
              className="text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-[#e8eaf0] leading-tight mb-5"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            >
              {heroContent.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-[#8b90a4] leading-relaxed mb-3"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {heroContent.subtitle}
            </p>

            {/* Author */}
            <p className="text-sm text-[#8b90a4] mb-8 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="#8b90a4" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              {heroContent.author}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button variant="primary" disabled tooltip="Coming Soon — paper under review">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Read the Paper
              </Button>
              <Button variant="secondary" href={heroContent.githubUrl}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </Button>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-3">
              {statPills.map((pill, i) => (
                <StatPill key={i} text={pill.text} color={pill.color} />
              ))}
            </div>
          </div>

          {/* ────────── Right Column ────────── */}
          <div className="lg:w-[42%] flex justify-center lg:justify-end">
            <div
              className="w-full max-w-sm rounded-2xl p-8"
              style={{
                background: 'rgba(26,29,39,0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(79,142,247,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,142,247,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Top accent line */}
              <div
                className="h-0.5 w-16 rounded-full mb-6"
                style={{ background: 'linear-gradient(90deg, #e05c5c, transparent)' }}
              />

              {/* Primary metric */}
              <div className="text-center mb-2">
                <div
                  className="text-6xl lg:text-7xl font-black leading-none"
                  style={{ color: '#e05c5c', fontFamily: 'var(--font-mono)', textShadow: '0 0 40px rgba(224,92,92,0.3)' }}
                >
                  <AnimatedNumber value={heroMetric.value} suffix={heroMetric.unit} />
                </div>
              </div>
              <p className="text-xs text-[#8b90a4] uppercase tracking-widest text-center mb-2">
                {heroMetric.label}
              </p>

              {/* Small context note */}
              <p className="text-xs text-center mb-6 px-2" style={{ color: 'rgba(139,144,164,0.7)' }}>
                Logistic Regression PR-AUC: 0.214 → 0.079
              </p>

              <div className="border-t border-[#2e3248] my-6" />

              {/* Mini bar visual */}
              <MiniBarVisual
                inDomain={heroMiniBar.inDomain}
                crossDomain={heroMiniBar.crossDomain}
                label={heroMiniBar.label}
              />

              {/* Bottom label */}
              <div className="mt-5 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e05c5c]" style={{ boxShadow: '0 0 4px rgba(224,92,92,0.7)' }} />
                <p className="text-xs text-[#8b90a4]">Statistically significant (non-overlapping 95% CIs)</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-xs text-[#8b90a4] tracking-widest uppercase">Scroll</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#8b90a4" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
