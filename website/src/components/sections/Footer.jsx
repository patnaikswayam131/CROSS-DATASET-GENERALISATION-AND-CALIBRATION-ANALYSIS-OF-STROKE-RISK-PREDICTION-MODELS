import { footerContent } from '../../data/siteConfig';

// ═════════════════════════════════════════════════════════════
//  Footer  -  Swiss Editorial Colophon
// ═════════════════════════════════════════════════════════════
export function Footer() {
  return (
    <footer className="w-full bg-[#09090b] border-t border-white/[0.08] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/[0.06]">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block mb-2">
              JOURNAL SHOWCASE · NIST UNIVERSITY
            </span>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">
              {footerContent.title}
            </p>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              {footerContent.author} · {footerContent.institution}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={footerContent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[3px] text-xs font-mono font-medium bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              <span>CODE REPOSITORY</span>
              <span>→</span>
            </a>
            <span className="text-[11px] font-mono text-zinc-400">
              REPRODUCIBLE RESEARCH ARTIFACT
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-zinc-400 gap-3">
          <p className="italic">
            {footerContent.note}
          </p>
          <p>
            PEER REVIEW SUBMISSION · NIST 2025
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
