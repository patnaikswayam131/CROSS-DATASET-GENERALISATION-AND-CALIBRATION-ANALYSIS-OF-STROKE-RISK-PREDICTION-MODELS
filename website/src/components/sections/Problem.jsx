import { problemParagraphs, pipelineSteps } from '../../data/projectData';

/**
 * Simple inline SVG icons keyed by the pipelineSteps icon field.
 */
const icons = {
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
      <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" />
    </svg>
  ),
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  ),
  'arrow-right': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-6 4 3 5-7" />
    </svg>
  ),
};

/**
 * Problem  -  explains why cross-dataset evaluation matters.
 * Left: prose paragraphs.  Right: vertical pipeline infographic.
 */
export function Problem() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ──────── Left Column  -  Text (55%) ──────── */}
          <div className="lg:w-[55%]">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span>02 / MOTIVATION &amp; CLINICAL PROBLEM</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-zinc-100 mt-2 mb-8 tracking-tight"
            >
              Models that evaluate well in-domain can be dangerously unviable in clinical deployment
            </h2>

            {problemParagraphs.map((paragraph, i) => (
              <p key={i} className="text-zinc-400 text-base leading-relaxed mb-6 font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {/* ──────── Right Column  -  Pipeline (45%) ──────── */}
          <div className="lg:w-[45%] flex justify-center">
            <div className="flex flex-col items-center w-full max-w-sm">
              {pipelineSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  {/* Connector line (above each step except the first) */}
                  {i > 0 && (
                    <div
                      className="w-px h-6 mx-auto"
                      style={{
                        backgroundColor: step.dashed ? 'transparent' : 'rgba(255, 255, 255, 0.12)',
                        ...(step.dashed
                          ? {
                              backgroundImage:
                                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 3px, transparent 3px, transparent 6px)',
                            }
                          : {}),
                      }}
                    />
                  )}

                  {/* Step card */}
                  <div
                    className={`
                      w-full bg-[#111114] rounded-md p-4
                      border
                      ${step.dashed ? 'border-dashed border-rose-500/30' : 'border-white/[0.08]'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 text-zinc-300 mt-0.5">
                        {icons[step.icon] || null}
                      </div>

                      {/* Text */}
                      <div>
                        <p className="font-semibold text-zinc-100 text-sm">
                          {step.label}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Problem;
