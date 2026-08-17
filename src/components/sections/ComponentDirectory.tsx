import React, { useState, useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory, EasyComponentMeta } from '../../types/component';
import { Search, ArrowUpRight, Copy, Check } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { SpotlightCard } from '../ui/SpotlightCard';
import { ExpandableSearch } from '../ui/ExpandableSearch';
import { AnimatedTabs } from '../ui/AnimatedTabs';
import { FloatingActionDock } from '../ui/FloatingActionDock';
import { RevealCard } from '../ui/RevealCard';
import { SmoothAccordion } from '../ui/SmoothAccordion';
import { NotificationStack } from '../ui/NotificationStack';
import { MorphingDialog } from '../ui/MorphingDialog';
import { DotField } from '../ui/DotField';
import { copyToClipboard, cn } from '../../lib/utils';
import { Code2, Terminal, Sparkles } from 'lucide-react';

export interface ComponentDirectoryProps {
  onSelectComponent: (id: string) => void;
}

export const ComponentDirectory: React.FC<ComponentDirectoryProps> = ({
  onSelectComponent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: ComponentCategory[] = [
    'All',
    'Motion',
    'Buttons',
    'Navigation',
    'Feedback',
    'Overlays',
  ];

  const filteredComponents = useMemo(() => {
    return EASY_COMPONENTS.filter((comp) => {
      const matchCategory =
        selectedCategory === 'All' || comp.category === selectedCategory;
      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCLI = (e: React.MouseEvent, comp: EasyComponentMeta) => {
    e.stopPropagation();
    copyToClipboard(comp.cliCommand);
    setCopiedId(comp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render contextual micro-preview for each specific component
  const renderPreview = (comp: EasyComponentMeta) => {
    switch (comp.id) {
      case 'magnetic-button':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <MagneticButton variant="primary" size="md">
              <span>Magnetic</span>
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            </MagneticButton>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <SpotlightCard className="w-full p-3.5 bg-[#0C0C0C]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="text-[11px] font-semibold text-[#F5F5F5]">Spotlight Sensor</span>
              </div>
              <p className="text-[10px] text-[#6F6F6F]">Hover pointer to track dynamic radial beam.</p>
            </SpotlightCard>
          </div>
        );
      case 'expandable-search':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <ExpandableSearch placeholder="Search components..." />
          </div>
        );
      case 'animated-tabs':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <AnimatedTabs
              tabs={[
                { id: 'tab1', label: 'Code', content: <div className="text-[11px] text-[#6F6F6F]">React 18 JSX</div> },
                { id: 'tab2', label: 'Styles', content: <div className="text-[11px] text-[#6F6F6F]">Tailwind v3</div> },
              ]}
              defaultTab="tab1"
            />
          </div>
        );
      case 'floating-dock':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <FloatingActionDock
              items={[
                { id: '1', label: 'Code', icon: <Code2 /> },
                { id: '2', label: 'Term', icon: <Terminal /> },
                { id: '3', label: 'AI', icon: <Sparkles /> },
              ]}
              activeId="1"
            />
          </div>
        );
      case 'reveal-card':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <RevealCard
              revealContent={<span className="text-[10px] text-[#38BDF8]">Revealed on hover tilt</span>}
              className="p-3 bg-[#0C0C0C]"
            >
              <span className="text-[11px] font-semibold text-[#F5F5F5] block">3D Tilt & Glare</span>
              <span className="text-[10px] text-[#6F6F6F]">Hover cursor across surface</span>
            </RevealCard>
          </div>
        );
      case 'smooth-accordion':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full">
              <SmoothAccordion
                items={[
                  {
                    id: 'item1',
                    title: 'Spring Animation',
                    content: 'Fluid expansion with zero layout jank.',
                  },
                ]}
                defaultOpen={['item1']}
              />
            </div>
          </div>
        );
      case 'notification-stack':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <NotificationStack maxVisible={2} />
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <MorphingDialog
              id="dir-dialog"
              title="Shared Surface Transition"
              subtitle="Smooth layoutId expansion"
              trigger={(open) => (
                <button
                  onClick={open}
                  className="px-4 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-[#F5F5F5] hover:border-[#38BDF8]/40 transition-colors"
                >
                  Trigger Modal
                </button>
              )}
            >
              <p className="text-xs text-[#A1A1A1]">Morphing layout transition without harsh popping.</p>
            </MorphingDialog>
          </div>
        );
      case 'command-menu':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <div className="px-3 py-2 rounded-lg bg-[#141414] border border-[#222222] text-xs font-mono text-[#A1A1A1] flex items-center gap-2">
              <span className="text-[#38BDF8]">⌘K</span>
              <span>Global Command Palette</span>
            </div>
          </div>
        );
      case 'dot-field':
        return (
          <div className="h-40 relative rounded-lg overflow-hidden border border-[#202020] bg-[#0A0A0A]">
            <DotField
              dotRadius={1.2}
              dotSpacing={12}
              bulgeStrength={50}
              glowRadius={120}
              sparkle={true}
              gradientFrom="rgba(56, 189, 248, 0.4)"
              gradientTo="rgba(168, 85, 247, 0.2)"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[11px] font-mono text-[#8E8E8E] bg-[#0A0A0A]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#222222]">
                Hover to Interact
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="components-directory" className="py-24 bg-[#050505] border-t border-[#141414]">
      <Container size="xl">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest">
              Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              Components
            </h2>
            <p className="text-sm text-[#808080] mt-2">
              10 polished components crafted for tactile feedback and copy-paste ownership.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#6F6F6F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components, tags..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#0D0D0D] border border-[#1E1E1E] text-[#F5F5F5] placeholder-[#6F6F6F] focus-ring"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap focus-ring',
                selectedCategory === cat
                  ? 'bg-[#1D1D1D] text-[#F5F5F5] border border-[#303030] shadow-sm'
                  : 'bg-[#0A0A0A] text-[#6F6F6F] border border-[#161616] hover:text-[#A1A1A1] hover:bg-[#111111]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        {filteredComponents.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-[#181818] bg-[#0A0A0A]">
            <p className="text-sm text-[#6F6F6F]">No components found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#38BDF8] hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onSelectComponent(comp.id)}
                className="group rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] overflow-hidden hover:border-[#282828] transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Live Preview Area with subtle mesh background */}
                <div className="relative bg-[#070707] border-b border-[#161616] bg-grid-pattern overflow-hidden">
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleCopyCLI(e, comp)}
                      className="p-1.5 rounded-lg bg-[#111111]/90 border border-[#222222] text-[#A1A1A1] hover:text-[#F5F5F5] hover:border-[#333333] transition-colors focus-ring"
                      title="Copy CLI command"
                    >
                      {copiedId === comp.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {renderPreview(comp)}
                </div>

                {/* Component Info Card */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#38BDF8] transition-colors">
                        {comp.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#6F6F6F] px-1.5 py-0.5 rounded bg-[#121212] border border-[#1C1C1C]">
                        {comp.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#808080] line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#141414] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      {comp.badges.slice(0, 2).map((badge) => (
                        <span
                          key={badge}
                          className="text-[10px] text-[#606060] font-mono"
                        >
                          #{badge}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-[#38BDF8] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Docs & Code <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
