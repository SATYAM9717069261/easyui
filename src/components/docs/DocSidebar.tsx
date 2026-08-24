import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Cpu, 
  GitPullRequest, 
  Sliders, 
  Search,
  X,
  type LucideIcon
} from 'lucide-react';

export interface DocSidebarProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  activeTopic,
  onSelectTopic,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const docNavSections: NavSection[] = [
    {
      group: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: BookOpen },
        { id: 'quick-start', label: 'Quick Start', icon: Terminal },
        { id: 'motion', label: 'Motion Tokens', icon: Sliders },
      ],
    },
    {
      group: 'Architecture & Engine',
      items: [
        { id: 'architecture', label: 'Registry Architecture', icon: Cpu },
        { id: 'seo', label: 'Automated SEO System', icon: Search },
        { id: 'collaboration', label: 'Contributing Guide', icon: GitPullRequest },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col space-y-6 select-none">
      {/* Sidebar Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter docs..."
          className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#242424] border border-[#363636] focus:border-[#4A4A4A] focus:outline-none text-xs text-[#F5F5F5] placeholder-[#737373] transition-colors"
        />
        {filterQuery && (
          <button
            onClick={() => setFilterQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#FFFFFF]"
            aria-label="Clear filter"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Main Navigation Topics */}
      <div className="space-y-6">
        {docNavSections.map((section, idx) => {
          const filteredItems = section.items.filter((item) =>
            item.label.toLowerCase().includes(filterQuery.toLowerCase())
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider px-3">
                {section.group}
              </h4>
              <div className="space-y-0.5">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTopic === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTopic(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all text-left group ${
                        isActive
                          ? 'bg-[#242424] text-white font-medium shadow-sm border border-[#363636]'
                          : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#202020]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#8A8A8A] group-hover:text-[#F5F5F5]'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
