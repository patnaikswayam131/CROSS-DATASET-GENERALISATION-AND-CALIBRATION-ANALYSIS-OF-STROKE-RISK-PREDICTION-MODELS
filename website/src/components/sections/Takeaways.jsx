import { takeawayCards } from '../../data/projectData';
import { Card } from '../ui/Card';

// ─── Icon components ─────────────────────────────────────────
const ICONS = {
  'shield-check': ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'chart-bar': ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  'document-text': ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
};

// ─── Accent mapping by card index ────────────────────────────
const ACCENT_MAP = ['danger', 'primary', 'warning'];
const COLOR_MAP = {
  danger: '#e05c5c',
  primary: '#4f8ef7',
  warning: '#e8a838',
};

// ═════════════════════════════════════════════════════════════
//  Takeaways Section
// ═════════════════════════════════════════════════════════════
export function Takeaways() {
  return (
    <section id="takeaways" className="max-w-7xl py-20 px-6 mx-auto">
      {/* Section label */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4f8ef7] mb-3">
        Key Findings
      </p>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eaf0] mb-10">
        What This Research Establishes
      </h2>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {takeawayCards.map((card, index) => {
          const accent = ACCENT_MAP[index];
          const iconColor = COLOR_MAP[accent];
          const IconComponent = ICONS[card.icon];

          return (
            <Card key={card.title} accent={accent}>
              {IconComponent && <IconComponent color={iconColor} />}
              <h3 className="font-semibold text-lg text-[#e8eaf0] mt-4">{card.title}</h3>
              <p className="text-sm text-[#8b90a4] mt-3 leading-relaxed">{card.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default Takeaways;
