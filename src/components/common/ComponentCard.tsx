import React, { useState } from 'react';
import type { EasyComponentMeta } from '../../types/component';
import { Copy, Check, Sparkles, Code2, Terminal } from 'lucide-react';
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
import { NewBadge } from './NewBadge';
import { copyToClipboard, cn } from '../../lib/utils';

export interface ComponentCardProps {
  component: EasyComponentMeta;
  isNew?: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isNew = false,
  onSelect,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCLI = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(component.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              id={`card-dialog-${comp.id}`}
              title="Shared Surface Transition"
              subtitle="Smooth layoutId expansion"
              trigger={(open) => (
                <button
                  type="button"
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
    <div
      onClick={() => onSelect(component.id)}
      className={cn(
        'group rounded-xl border border-[#161616] bg-[#080808] overflow-hidden hover:border-[#262626] transition-colors cursor-pointer flex flex-col justify-between',
        className
      )}
    >
      {/* Live Preview Area with dot background */}
      <div className="relative bg-[#070707] border-b border-[#141414] bg-grid-pattern overflow-hidden">
        {/* Top Right Copy CLI button */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyCLI}
            className="p-1.5 rounded-md bg-[#0D0D0D] border border-[#1C1C1C] text-[#808080] hover:text-[#F5F5F5] hover:border-[#2C2C2C] transition-colors focus-ring"
            title="Copy CLI command"
            aria-label="Copy CLI command"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {renderPreview(component)}
      </div>

      {/* Component Info Card - Minimal: Name + NEW badge + Category */}
      <div className="px-4 py-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-xs font-medium text-[#F5F5F5] group-hover:text-white transition-colors truncate">
            {component.name}
          </h3>
          {isNew && <NewBadge size="xs" />}
        </div>
        <span className="text-[10px] font-mono text-[#737373] px-2 py-0.5 rounded bg-[#101010] border border-[#181818] shrink-0">
          {component.category}
        </span>
      </div>
    </div>
  );
};
