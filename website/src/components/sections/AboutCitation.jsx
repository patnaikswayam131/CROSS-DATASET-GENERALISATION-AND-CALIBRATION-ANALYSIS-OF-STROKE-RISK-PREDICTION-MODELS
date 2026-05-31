import { useState, useCallback, useRef, useEffect } from 'react';
import { aboutContent } from '../../data/siteConfig';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

// ═════════════════════════════════════════════════════════════
//  About & Citation Section
// ═════════════════════════════════════════════════════════════
export function AboutCitation() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  // Clean up any pending timer on unmount
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
    <section id="about" className="max-w-6xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        About
      </p>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-10">
        Author &amp; Citation
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ─── Bio card ────────────────────────────────────── */}
        <Card hover={false}>
          <h3 className="text-lg font-semibold text-[#e8eaf0] mb-4">About the Author</h3>
          <p className="text-sm text-[#8b90a4] leading-relaxed">{aboutContent.bio}</p>
        </Card>

        {/* ─── Citation card ───────────────────────────────── */}
        <Card hover={false}>
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-lg font-semibold text-[#e8eaf0]">Citation</h3>
            <Badge variant="warning">{aboutContent.paperStatus}</Badge>
          </div>

          {/* BibTeX */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b90a4] mb-2">
              BibTeX
            </h4>
            <pre className="bg-[#22263a] rounded-lg p-4 text-xs text-[#8b90a4] overflow-x-auto font-mono whitespace-pre-wrap">
              <code>{aboutContent.bibtex}</code>
            </pre>
          </div>

          {/* APA */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b90a4] mb-2">
              APA
            </h4>
            <p className="text-sm text-[#8b90a4] leading-relaxed">{aboutContent.apa}</p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer bg-[#4f8ef7] text-white hover:bg-[#3b7be0]"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Citation
              </>
            )}
          </button>
        </Card>
      </div>
    </section>
  );
}

export default AboutCitation;
