import React, { useState, useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory, EasyComponentMeta } from '../../types/component';
import { Search, Copy, Check } from 'lucide-react';
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
              <Sparkles className="w-3.5 h-3.5 text-[#D4D4D4]" />
            </MagneticButton>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <SpotlightCard className="w-full p-4 bg-[#0A0A0A]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-xs font-semibold text-[#F5F5F5]">Spotlight Sensor</span>
              </div>
              <p className="text-[11px] text-[#737373]">Hover pointer to track dynamic beam.</p>
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
                { id: 'tab1', label: 'Code', content: <div className="text-xs text-[#737373]">React 18 JSX</div> },
                { id: 'tab2', label: 'Styles', content: <div className="text-xs text-[#737373]">Tailwind v3</div> },
              ]}
              defaultTab="tab1"
            />
          </div>
        );
      case 'floating-action-dock':
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
          <div className="h-40 flex items-center justify-center p-4">
            <RevealCard
              revealContent={<span className="text-xs text-white font-medium">Revealed on hover tilt</span>}
              className="p-4 bg-[#0A0A0A]"
            >
              <span className="text-xs font-semibold text-[#F5F5F5] block">3D Tilt & Glare</span>
              <span className="text-[11px] text-[#737373]">Hover cursor across surface</span>
            </RevealCard>
          </div>
        );
      case 'smooth-accordion':
        return (
          <div className="h-40 flex items-center justify-center p-4">
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
          <div className="h-40 flex items-center justify-center p-4">
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
                  className="px-4 py-2 rounded-lg bg-[#111111] border border-[#202020] text-xs text-[#F5F5F5] hover:border-[#303030] transition-colors"
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
            <div className="px-3.5 py-2 rounded-lg bg-[#111111] border border-[#1E1E1E] text-xs font-mono text-[#A1A1A1] flex items-center gap-2">
              <span className="text-white font-semibold">⌘K</span>
              <span>Global Command Palette</span>
            </div>
          </div>
        );
      case 'dot-field':
        return (
          <div className="h-40 relative rounded-lg overflow-hidden border border-[#1A1A1A] bg-[#070707]">
            <DotField
              dotRadius={1.2}
              dotSpacing={12}
              bulgeStrength={50}
              glowRadius={120}
              sparkle={true}
              gradientFrom="rgba(255, 255, 255, 0.25)"
              gradientTo="rgba(255, 255, 255, 0.08)"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono text-[#737373] bg-[#050505]/80 px-2.5 py-1 rounded-md border border-[#1A1A1A]">
                Hover to Interact
              </span>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-40 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-semibold text-[#F5F5F5] mb-1">{comp.name}</span>
            <span className="text-[11px] text-[#737373] line-clamp-2 max-w-[200px]">{comp.tagline}</span>
          </div>
        );
    }
  };

  return (
    <section id="components-directory" className="py-20 bg-[#050505] border-t border-[#141414]">
      <Container size="xl">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">
              Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              Components
            </h2>
            <p className="text-sm text-[#808080] mt-1.5">
              {EASY_COMPONENTS.length} polished components crafted for tactile feedback and copy-paste ownership.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components, tags..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#0A0A0A] border border-[#181818] text-[#F5F5F5] placeholder-[#606060] focus-ring"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors whitespace-nowrap focus-ring',
                selectedCategory === cat
                  ? 'bg-[#181818] text-[#F5F5F5] border border-[#282828]'
                  : 'bg-[#0A0A0A] text-[#737373] border border-[#141414] hover:text-[#A1A1A1] hover:bg-[#101010]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        {filteredComponents.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[#141414] bg-[#080808]">
            <p className="text-sm text-[#737373]">No components found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-white hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                onClick={() => onSelectComponent(comp.id)}
                className="group rounded-xl border border-[#161616] bg-[#080808] overflow-hidden hover:border-[#262626] transition-colors cursor-pointer flex flex-col justify-between"
              >
                {/* Live Preview Area with dot background */}
                <div className="relative bg-[#070707] border-b border-[#141414] bg-grid-pattern overflow-hidden">
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleCopyCLI(e, comp)}
                      className="p-1.5 rounded-md bg-[#0D0D0D] border border-[#1C1C1C] text-[#808080] hover:text-[#F5F5F5] hover:border-[#2C2C2C] transition-colors focus-ring"
                      title="Copy CLI command"
                    >
                      {copiedId === comp.id ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {renderPreview(comp)}
                </div>

                {/* Component Info Card - Minimal: Name and Category only */}
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <h3 className="text-xs font-medium text-[#F5F5F5] group-hover:text-white transition-colors">
                    {comp.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#737373] px-2 py-0.5 rounded bg-[#101010] border border-[#181818]">
                    {comp.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
