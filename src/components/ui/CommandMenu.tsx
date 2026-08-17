import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Layout, BookOpen, Terminal, CornerDownLeft } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { GITHUB_URL } from '../../lib/constants';
import { EASY_COMPONENTS } from '../registry/components-data';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Components' | 'Documentation' | 'Actions' | 'Navigation';
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent?: (id: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems: CommandItem[] = useMemo(() => {
    // Dynamic component entries derived from generated catalog
    const componentEntries: CommandItem[] = EASY_COMPONENTS.map((comp) => ({
      id: comp.id,
      title: comp.name,
      category: 'Components',
      icon: comp.category === 'Motion' ? <Sparkles className="w-4 h-4 text-[#38BDF8]" /> : <Layout className="w-4 h-4 text-[#38BDF8]" />,
      shortcut: 'C',
      onSelect: () => {
        onSelectComponent?.(comp.id);
        onClose();
      },
    }));

    const staticEntries: CommandItem[] = [
      {
        id: 'installation-docs',
        title: 'Quickstart & Installation',
        category: 'Documentation',
        icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
        shortcut: 'D',
        onSelect: () => {
          document.getElementById('dev-experience')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'motion-tokens',
        title: 'Motion Design Tokens',
        category: 'Documentation',
        icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
        shortcut: 'D',
        onSelect: () => {
          document.getElementById('motion-showcase')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'cli-add',
        title: 'Copy CLI Add Command',
        category: 'Actions',
        icon: <Terminal className="w-4 h-4 text-amber-400" />,
        shortcut: '⌘C',
        onSelect: () => {
          navigator.clipboard.writeText('npx shadcn@latest add Surajmaurya1/easyui/magnetic-button');
          onClose();
        },
      },
      {
        id: 'github-repo',
        title: 'View GitHub Repository',
        category: 'Navigation',
        icon: <GithubIcon className="w-4 h-4 text-[#A1A1A1]" />,
        shortcut: 'G',
        onSelect: () => {
          window.open(GITHUB_URL, '_blank');
          onClose();
        },
      },
    ];

    return [...componentEntries, ...staticEntries];
  }, [onSelectComponent, onClose]);

  const filteredItems = useMemo(() => {
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [commandItems, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].onSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={motionTransitions.springSnappy}
            className="relative w-full max-w-xl rounded-2xl border border-[#222222] bg-[#0C0C0C] shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#1D1D1D]">
              <Search className="w-4 h-4 text-[#6F6F6F] mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search components..."
                className="w-full bg-transparent text-sm text-[#F5F5F5] placeholder-[#6F6F6F] focus:outline-none"
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181818] border border-[#242424] text-[#6F6F6F]">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#161616]/50">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#6F6F6F]">
                  No commands or components matching "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.onSelect}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors text-left',
                          isSelected
                            ? 'bg-[#181818] text-[#F5F5F5]'
                            : 'text-[#A1A1A1] hover:bg-[#121212]'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span className="font-medium">{item.title}</span>
                          <span className="text-[10px] text-[#6F6F6F] ml-1">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <CornerDownLeft className="w-3 h-3 text-[#38BDF8]" />
                          )}
                          {item.shortcut && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#202020] text-[#6F6F6F]">
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer status */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#090909] border-t border-[#1D1D1D] text-[11px] text-[#6F6F6F]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-[#161616] px-1 rounded text-[10px]">↑↓</span> navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-[#161616] px-1 rounded text-[10px]">↵</span> select
                </span>
              </div>
              <span>EasyUI v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
