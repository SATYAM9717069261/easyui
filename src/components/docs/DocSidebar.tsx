import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Cpu, 
  GitPullRequest, 
  Sliders, 
  Search,
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
  badge?: string;
  description?: string;
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
        { id: 'introduction', label: 'Introduction & Vision', icon: BookOpen },
        { id: 'quick-start', label: 'Quick Start & Setup', icon: Terminal, badge: 'Setup' },
        { id: 'motion', label: 'Motion Tokens & Physics', icon: Sliders },
      ],
    },
    {
      group: 'Architecture & Engine',
      items: [
        { id: 'architecture', label: 'Automatic Structure & Registry', icon: Cpu, badge: 'Engine' },
        { id: 'collaboration', label: 'How to Collaborate & Contribute', icon: GitPullRequest, badge: 'Guide' },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col space-y-6">
      {/* Sidebar Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#606060]" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#181818] focus:border-[#2C2C2C] focus:outline-none text-xs text-[#F5F5F5] placeholder-[#555555] transition-colors font-mono"
        />
      </div>

      {/* Main Navigation Topics */}
      <div className="space-y-5">
        {docNavSections.map((section, idx) => {
          const filteredItems = section.items.filter((item) =>
            item.label.toLowerCase().includes(filterQuery.toLowerCase())
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <h4 className="text-[10px] font-mono text-[#555555] uppercase tracking-wider px-3 font-semibold">
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${
                        isActive
                          ? 'bg-[#161616] text-white font-medium border border-[#242424]'
                          : 'text-[#808080] hover:text-[#F5F5F5] hover:bg-[#0E0E0E]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#606060]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#101010] border border-[#1C1C1C] text-[#737373]">
                          {item.badge}
                        </span>
                      )}
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
