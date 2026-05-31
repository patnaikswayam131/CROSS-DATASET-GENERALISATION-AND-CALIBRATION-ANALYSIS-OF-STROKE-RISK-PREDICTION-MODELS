import { datasetCards } from '../../data/projectData';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

/**
 * DatasetCard — renders the first two dataset cards (Source & Target domains).
 */
function DomainCard({ card }) {
  const statEntries = card.stats ? Object.entries(card.stats) : [];

  return (
    <Card hover={false}>
      {/* Tag badge */}
      {card.tag && (
        <div className="mb-4">
          <Badge variant={card.tagColor || 'neutral'}>{card.tag}</Badge>
        </div>
      )}

      {/* Title */}
      <h3
        className="font-semibold text-lg text-[#e8eaf0]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {card.title}
      </h3>

      {/* Stats row */}
      {statEntries.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {statEntries.map(([key, value]) => (
            <div key={key}>
              <p className="text-xs text-[#8b90a4] uppercase tracking-wide">
                {key}
              </p>
              <p
                className="text-lg font-semibold text-[#e8eaf0]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-[#8b90a4] mt-4 leading-relaxed">
        {card.description}
      </p>

      {/* Feature chips */}
      {card.features && card.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {card.features.map((feature) => (
            <span
              key={feature}
              className="bg-[#22263a] text-[#8b90a4] text-xs px-3 py-1 rounded-full border border-[#2e3248]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Module chips (NHANES modules — styled in primary colour) */}
      {card.modules && card.modules.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {card.modules.map((mod) => (
            <span
              key={mod}
              className="bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs px-3 py-1 rounded-full border border-[#4f8ef7]/25"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {mod}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

/**
 * HarmonisationCard — the third card with a feature mapping table.
 */
function HarmonisationCard({ card }) {
  return (
    <Card hover={false}>
      <h3
        className="font-semibold text-lg text-[#e8eaf0]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {card.title}
      </h3>

      <p className="text-sm text-[#8b90a4] mt-4 leading-relaxed">
        {card.description}
      </p>

      {/* Mapping table */}
      {card.mapping && card.mapping.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2e3248]">
                <th className="text-left text-xs text-[#8b90a4] uppercase tracking-wide pb-2 pr-4">
                  Kaggle
                </th>
                <th className="text-left text-xs text-[#8b90a4] uppercase tracking-wide pb-2">
                  NHANES
                </th>
              </tr>
            </thead>
            <tbody>
              {card.mapping.map((row, i) => (
                <tr key={i} className="border-b border-[#2e3248]/50">
                  <td
                    className="py-2 pr-4 text-[#e8eaf0]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {row.kaggle}
                  </td>
                  <td
                    className="py-2 text-[#4f8ef7]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {row.nhanes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

/**
 * Datasets — experimental setup section with three data-source cards.
 */
export function Datasets() {
  return (
    <section id="datasets" className="py-20 px-6" style={{ backgroundColor: '#0f1117' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <p className="section-label">EXPERIMENTAL SETUP</p>
        <h2
          className="text-3xl font-bold text-[#e8eaf0] mt-3 mb-10"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Two Independent Populations, Four Harmonised Features
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasetCards.map((card, i) => {
            // The last card (Harmonisation) gets a different layout
            if (card.mapping) {
              return <HarmonisationCard key={i} card={card} />;
            }
            return <DomainCard key={i} card={card} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Datasets;
