import { useState, useCallback, useRef, useEffect } from 'react';
import { aboutContent } from '../../data/siteConfig';
import { Badge } from '../ui/Badge';

// ═════════════════════════════════════════════════════════════
//  About & Citation Section  -  Swiss Editorial Style
// ═════════════════════════════════════════════════════════════
export function AboutCitation() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(aboutContent.bibtex).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section id="about" className="py-24 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2">
            12 / RESEARCH AUTHORSHIP & CITATION
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Author &amp; Reference Repository
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
            Academic provenance and formal citation metadata for research reuse and reproducibility.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Bio Panel ────────────────────────────────────── */}
          <div className="p-7 rounded-md bg-[#111114] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <h3 className="text-base font-semibold text-zinc-100">Principal Investigator</h3>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  NIST UNIVERSITY · BERHAMPUR
                </span>
              </div>
              <h4 className="text-lg font-semibold text-zinc-200 mb-1">Swayam Patnaik</h4>
              <p className="text-xs font-mono text-zinc-400 mb-4">
                Department of Computer Science &amp; Engineering
              </p>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
                {aboutContent.bio}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">RESEARCH FOCUS</span>
              <span className="text-xs font-mono text-zinc-300">
                Machine Learning Reliability · Medical AI Validation
              </span>
            </div>
          </div>

          {/* ─── Citation Panel ───────────────────────────────── */}
          <div className="p-7 rounded-md bg-[#111114] border border-white/[0.08]">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
              <h3 className="text-base font-semibold text-zinc-100">Formal Citation</h3>
              <Badge variant="warning">{aboutContent.paperStatus}</Badge>
            </div>

            {/* BibTeX */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  BibTeX Entry
                </h4>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-[3px] transition-all cursor-pointer bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08]"
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>COPY BIBTEX</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-[#0c0c0e] border border-white/[0.08] rounded-[3px] p-4 text-[11px] text-zinc-300 overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                <code>{aboutContent.bibtex}</code>
              </pre>
            </div>

            {/* APA */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                APA 7th Edition
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-white/[0.02] p-3 rounded-[3px] border border-white/[0.06]">
                {aboutContent.apa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCitation;
