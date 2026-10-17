import { projectMeta } from '../../data/researchData';
import { ExternalLink } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="py-16 text-xs text-[#55635E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E2E0D8]">
          <div>
            <span className="font-serif-heading text-lg text-[#111816] block mb-1">
              Cross-Dataset Generalisation and Calibration Analysis
            </span>
            <p className="text-xs text-[#55635E]">
              Research documentation by {projectMeta.author} · {projectMeta.affiliation}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={projectMeta.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1B5E54] hover:underline"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[#E2E0D8]">·</span>
            <span className="text-[#55635E]">{projectMeta.experimentVersion}</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#9AA39E]">
          <p>
            Standard tabular health generalisation benchmark. Fully reproducible under seed = 42.
          </p>
          <p>
            Evaluation frozen: {projectMeta.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
