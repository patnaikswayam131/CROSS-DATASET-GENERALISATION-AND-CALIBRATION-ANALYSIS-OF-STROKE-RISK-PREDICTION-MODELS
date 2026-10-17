import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { heroContent } from '../data/siteConfig';

const NAV_ITEMS = [
  { label: 'Pipeline', href: '#workflow-wrap' },
  { label: 'Problem', href: '#problem' },
  { label: 'Results', href: '#results' },
  { label: 'Simulator', href: '#explorer', isSpecial: true },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Math', href: '#math' },
  { label: 'Citation', href: '#about' },
];

export function Navigation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'workflow-wrap', 'problem', 'literature', 'results', 'explorer', 'methodology', 'math', 'about'];
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-rose-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Navigation Bar  -  Academic Journal Masthead */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-white/[0.08] py-2.5 shadow-sm'
            : 'bg-[#09090b]/60 backdrop-blur-sm border-b border-white/[0.04] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Publication Identifier */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-xs font-mono font-medium tracking-wider uppercase text-zinc-100 hover:text-white transition-colors"
          >
            <div className="h-6 w-6 rounded-[3px] bg-white/[0.08] border border-white/15 flex items-center justify-center text-zinc-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span>
              STROKERISK <span className="text-zinc-500 font-normal">/ NIST 2025</span>
            </span>
          </a>

          {/* Editorial Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-[3px] text-xs font-mono tracking-wide transition-all ${
                    item.isSpecial
                      ? 'border border-white/20 text-white bg-white/[0.05] hover:bg-white/10 font-semibold'
                      : isActive
                        ? 'text-white bg-white/[0.08] font-semibold'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wider uppercase">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Manuscript Under Review
            </span>

            <a
              href={heroContent.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-2"
              aria-label="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden sm:inline font-mono text-[11px]">Code</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;
