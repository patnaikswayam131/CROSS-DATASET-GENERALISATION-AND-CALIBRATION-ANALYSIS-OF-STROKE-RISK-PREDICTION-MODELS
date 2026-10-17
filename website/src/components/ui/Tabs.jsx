import { useState } from 'react';

/**
 * Tab interface component  -  Swiss Editorial style.
 * Crisp underline indicators, monospace indexing, and zero bubbly pills.
 * @param {{ tabs: Array<{id: string, label: string}>, children: (activeTab: string) => React.ReactNode, defaultTab?: string }} props
 */
export function Tabs({ tabs, children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-white/[0.08] mb-8 overflow-x-auto gap-1">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap
                transition-all duration-150 cursor-pointer flex items-center gap-2
                ${isActive
                  ? 'text-zinc-100 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                }
              `}
            >
              <span className={`text-[10px] font-mono ${isActive ? 'text-rose-400' : 'text-zinc-400'}`}>
                0{idx + 1}
              </span>
              <span>{tab.label}</span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>{children(activeTab)}</div>
    </div>
  );
}

export default Tabs;
