import { footerContent } from '../../data/siteConfig';

// ═════════════════════════════════════════════════════════════
//  Footer
// ═════════════════════════════════════════════════════════════
export function Footer() {
  return (
    <footer className="w-full bg-[#1a1d27] border-t border-[#2e3248]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Paper title */}
        <p className="text-sm text-[#e8eaf0] font-medium">{footerContent.title}</p>

        {/* Author & institution */}
        <p className="text-xs text-[#8b90a4] mt-2">
          {footerContent.author} · {footerContent.institution}
        </p>

        {/* GitHub link */}
        <a
          href={footerContent.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs text-[#4f8ef7] hover:underline mt-2"
        >
          View on GitHub →
        </a>

        {/* Note */}
        <p className="text-xs text-[#8b90a4] italic mt-4">{footerContent.note}</p>
      </div>
    </footer>
  );
}

export default Footer;
