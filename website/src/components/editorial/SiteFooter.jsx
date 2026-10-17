import { projectMeta } from '../../data/researchData';
import { ExternalLink } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#F5F3EB] py-12 text-xs text-[#4D5D57]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#C9D0C6]">
          <div>
            <span className="font-serif-heading text-base font-semibold text-[#172B29] block mb-1">
              Cross-Dataset Generalisation and Calibration Analysis of Stroke Risk Prediction Models
            </span>
            <p className="text-xs text-[#4D5D57]">
              Research note by {projectMeta.author} · {projectMeta.affiliation}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={projectMeta.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#23645A] hover:underline"
            >
              <span>Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[#C9D0C6]">|</span>
            <span className="text-[#4D5D57]">Version: {projectMeta.experimentVersion}</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#858E88]">
          <p>
            Reported metrics reflect the frozen evaluation protocol across Kaggle and NHANES 2021-2023 cohorts.
          </p>
          <p>
            Last updated: {projectMeta.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
