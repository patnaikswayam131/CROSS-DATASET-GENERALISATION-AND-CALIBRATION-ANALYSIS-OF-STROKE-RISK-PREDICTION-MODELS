import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'question', label: 'Question' },
  { id: 'study-design', label: 'Study design' },
  { id: 'datasets', label: 'Data sources' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'dataset-shift', label: 'Dataset shift' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'calibration', label: 'Calibration' },
  { id: 'limitations', label: 'Scope' },
  { id: 'reproducibility', label: 'Code & data' }
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState('question');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section intersection detection
      const scrollPosition = window.scrollY + 120;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -60, duration: 1.15 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#F5F3EB] ${
        isScrolled ? 'border-b border-[#C9D0C6] shadow-[0_1px_3px_rgba(23,43,41,0.04)]' : 'border-b border-[#C9D0C6]'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left Masthead Identifier */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
        >
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#23645A]">
              RESEARCH NOTE / 01
            </span>
            <span className="text-[11px] text-[#4D5D57] hidden sm:inline leading-none mt-0.5">
              Cross-Dataset Stroke Risk Analysis
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs transition-colors duration-150 cursor-pointer relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1D6ED8] ${
                  isActive
                    ? 'text-[#23645A] font-semibold'
                    : 'text-[#4D5D57] hover:text-[#172B29]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#23645A]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-[#172B29] hover:bg-[#E6ECE4] rounded-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6ED8]"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#C9D0C6] bg-[#FCFBF7] px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left py-2 px-2 text-xs rounded-xs cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#E6ECE4] text-[#23645A] font-medium'
                  : 'text-[#172B29] hover:bg-[#F5F3EB]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
