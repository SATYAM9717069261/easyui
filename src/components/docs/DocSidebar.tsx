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
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#1E1E1E] focus:border-[#383838] focus:outline-none text-xs text-[#ECECEC] placeholder-[#555555] transition-all font-mono"
        />
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
              <h4 className="text-[11px] font-mono text-[#6F6F6F] uppercase tracking-wider px-3 font-semibold">
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-[#1C1C1C] text-white font-semibold border border-[#2E2E2E]'
                          : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6F6F6F]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181818] border border-[#242424] text-[#808080]">
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
