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
      case 'interactive-timeline':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-2 pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-white/20">
                <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="text-[11px] font-medium text-white">Edge Build Verified</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400">48s</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-white/10">
                <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center animate-spin text-[8px] text-white">●</span>
                <span className="text-[11px] font-medium text-[#A1A1A1]">Global Replication</span>
                <span className="ml-auto text-[9px] font-mono text-white/70 animate-pulse">Active</span>
              </div>
            </div>
          </div>
        );
      case 'smart-comparison':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-3 rounded-xl bg-[#0D0D0D] border border-[#202020] pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-white">Pro Tier</span>
                <span className="text-[10px] font-mono text-white bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#2A2A2A]">$29/mo</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[#888888]">
                <div className="flex justify-between"><span>Multi-Region</span><span className="text-white">✓ Included</span></div>
                <div className="flex justify-between"><span>Concurrency</span><span className="text-white">250 nodes</span></div>
              </div>
            </div>
          </div>
        );
      case 'activity-feed':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-1.5 pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1C1C1C]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-[#D4D4D4] truncate">Edge Lambda deployed</span>
                <span className="ml-auto text-[9px] font-mono text-[#666666]">2m</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1C1C1C]">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[11px] text-[#D4D4D4] truncate">POST /v1/auth 200 OK</span>
                <span className="ml-auto text-[9px] font-mono text-[#666666]">18ms</span>
              </div>
            </div>
          </div>
        );
      case 'metric-hud':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-3 rounded-xl bg-[#0D0D0D] border border-[#202020] pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#888888]">p99 Latency</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">-18.4%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold font-mono text-white">14.2</span>
                <span className="text-[10px] font-mono text-[#666666]">ms</span>
              </div>
              <div className="h-6 w-full flex items-end gap-1">
                {[35, 45, 55, 40, 65, 75, 50, 85, 90, 60, 40, 30].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/20 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'code-snippet-deck':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] rounded-xl bg-[#090909] border border-[#202020] overflow-hidden pointer-events-none scale-90 sm:scale-95">
              <div className="px-2.5 py-1.5 bg-[#121212] border-b border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                <span>client.ts</span>
                <span className="text-white">TypeScript</span>
              </div>
              <div className="p-2.5 font-mono text-[10px] text-[#A1A1A1] leading-relaxed">
                <div><span className="text-white">import</span> &#123; EasyUI &#125; <span className="text-white">from</span> <span className="text-white/70">"@easyui/sdk"</span>;</div>
                <div className="text-[#666666]">// Instant completions API</div>
              </div>
            </div>
          </div>
        );
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
      case 'glass-navbar':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-2 rounded-xl bg-[#0E0E0E]/90 border border-[#1D1D1D] shadow-lg flex items-center justify-between pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">E</span>
                <span className="text-[11px] font-semibold text-white">EasyUI</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#808080]">
                <span className="text-white font-medium bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#282828]">Docs</span>
                <span>Blog</span>
              </div>
              <span className="text-[9px] font-medium bg-[#F5F5F5] text-black px-2 py-0.5 rounded shadow">Launch</span>
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <div className="flex items-center gap-2 pointer-events-none scale-90 sm:scale-95">
              <span className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Primary
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#151515] border border-[#1D1D1D] text-[#F5F5F5] text-xs font-medium">
                Secondary
              </span>
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-90 sm:scale-95">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#D4D4D4] font-medium">Workspace Email</span>
                <span className="text-[#FF7A7A]">*</span>
              </div>
              <div className="h-8 px-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-[11px] text-[#F5F5F5] flex items-center justify-between">
                <span>alex@easyui.dev</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] p-3 rounded-xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-2 pointer-events-none scale-90 sm:scale-95">
              <div className="text-[11px] font-semibold text-white">Welcome back</div>
              <div className="h-6 px-2 rounded-md bg-[#121212] border border-[#222222] text-[10px] text-[#666666] flex items-center">
                <span>••••••••••••</span>
              </div>
              <div className="h-6 rounded-md bg-white text-black text-[10px] font-medium flex items-center justify-center shadow">
                Sign In →
              </div>
            </div>
          </div>
        );
      case 'sign-up':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] p-3 rounded-xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-1.5 pointer-events-none scale-90 sm:scale-95">
              <div className="text-[11px] font-semibold text-white">Create account</div>
              <div className="flex gap-1 h-1">
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-[#1D1D1D]" />
              </div>
              <div className="text-[9px] font-mono text-emerald-400 flex justify-between">
                <span>Security</span>
                <span>Strong</span>
              </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[250px] rounded-lg border border-[#1D1D1D] bg-[#0A0A0A] overflow-hidden pointer-events-none scale-90 sm:scale-95">
              <div className="p-2.5 flex items-center justify-between text-[11px] font-medium text-white border-b border-[#1A1A1A]">
                <span>How to use CLI?</span>
                <span className="text-[#888888] text-[9px]">▲</span>
              </div>
              <div className="p-2 text-[10px] text-[#888888] bg-[#0C0C0C]">
                Run npx shadcn@latest add ...
              </div>
            </div>
          </div>
        );
      case 'payment-receipt-printer':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] flex flex-col items-center pointer-events-none scale-90 sm:scale-95">
              <div className="w-full p-2 rounded-xl bg-[#0E0E0E] border border-[#222222] flex items-center justify-between shadow-md z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
                  <span className="text-[10px] font-semibold text-white">Paid #4821</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="w-[88%] -mt-1 p-2.5 rounded-b-md bg-[#F9F9F8] text-[#111111] font-mono text-[9px] shadow border border-[#E0E0DE] space-y-1">
                <div className="flex justify-between font-bold border-b border-dashed border-black/20 pb-1">
                  <span>EASYUI PRO</span>
                  <span>$200.00</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>TOTAL:</span>
                  <span className="font-bold">$200.00</span>
                </div>
              </div>
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
      case 'particle-delete':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] p-2.5 rounded-lg bg-[#0E0E0E] border border-[#202020] pointer-events-none scale-90 sm:scale-95 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-md bg-[#141414] border border-[#222222] flex items-center justify-center text-[#A1A1A1]">
                  <Terminal className="w-3 h-3" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-white truncate">Edge Cluster</div>
                  <div className="text-[9px] font-mono text-[#666666]">12 workers</div>
                </div>
              </div>
              <span className="p-1 rounded text-rose-400 bg-rose-500/10 text-[9px] font-mono shrink-0">
                Delete
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
