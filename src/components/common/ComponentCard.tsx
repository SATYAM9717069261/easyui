import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { NewBadge } from './NewBadge';
import { copyToClipboard, cn } from '../../lib/utils';

export interface ComponentCardProps {
  component: EasyComponentMeta;
  isNew?: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

const AnimatedNumberPreview: React.FC<{ isHovered?: boolean }> = ({ isHovered = false }) => {
  const [val, setVal] = useState(12450);

  useEffect(() => {
    if (isHovered) {
      setVal(48920);
    } else {
      setVal(12450);
    }
  }, [isHovered]);

  return (
    <div className="h-40 flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold font-mono tracking-tight text-white mb-1">
        <AnimatedNumber value={val} prefix="$" useGrouping />
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
        <span>{isHovered ? '+48.2%' : '+24.5%'}</span>
        <span className="text-[#666666]">rolling digits</span>
      </div>
    </div>
  );
};

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isNew = false,
  onSelect,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyCLI = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(component.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render contextual micro-preview for each specific component reacting to hover
  const renderPreview = (comp: EasyComponentMeta, hovered: boolean) => {
    switch (comp.id) {
      case 'interactive-timeline':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-2 pointer-events-none scale-90 sm:scale-95">
              <motion.div
                animate={{ x: hovered ? 2 : 0 }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-white/20"
              >
                <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="text-[11px] font-medium text-white">Edge Build Verified</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400">48s</span>
              </motion.div>
              <motion.div
                animate={{ x: hovered ? 4 : 0, borderColor: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)' }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border"
              >
                <span className={cn('w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] text-white', hovered && 'animate-spin')}>●</span>
                <span className="text-[11px] font-medium text-[#A1A1A1]">Global Replication</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400 font-medium">{hovered ? 'Deployed ✓' : 'Active'}</span>
              </motion.div>
            </div>
          </div>
        );
      case 'smart-comparison':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#383838' : '#202020' }}
              className="w-full max-w-[260px] p-3 rounded-xl bg-[#0D0D0D] border pointer-events-none scale-90 sm:scale-95 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-white">Pro Tier</span>
                <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors', hovered ? 'bg-white text-black border-white' : 'text-white bg-[#1A1A1A] border-[#2A2A2A]')}>$29/mo</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[#888888]">
                <div className="flex justify-between"><span>Multi-Region</span><span className="text-white">✓ Included</span></div>
                <div className="flex justify-between"><span>Concurrency</span><span className="text-white">250 nodes</span></div>
              </div>
            </motion.div>
          </div>
        );
      case 'activity-feed':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-1.5 pointer-events-none scale-90 sm:scale-95">
              <motion.div
                animate={{ y: hovered ? -1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1C1C1C]"
              >
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400')} />
                <span className="text-[11px] text-[#D4D4D4] truncate">Edge Lambda deployed</span>
                <span className="ml-auto text-[9px] font-mono text-[#666666]">Just now</span>
              </motion.div>
              <motion.div
                animate={{ y: hovered ? 1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1C1C1C]"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[11px] text-[#D4D4D4] truncate">POST /v1/auth 200 OK</span>
                <span className="ml-auto text-[9px] font-mono text-[#666666]">18ms</span>
              </motion.div>
            </div>
          </div>
        );
      case 'metric-hud':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-3 rounded-xl bg-[#0D0D0D] border border-[#202020] pointer-events-none scale-90 sm:scale-95">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#888888]">p99 Latency</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{hovered ? '-24.8%' : '-18.4%'}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold font-mono text-white">{hovered ? '11.8' : '14.2'}</span>
                <span className="text-[10px] font-mono text-[#666666]">ms</span>
              </div>
              <div className="h-6 w-full flex items-end gap-1">
                {[35, 45, 55, 40, 65, 75, 50, 85, 90, 60, 40, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: hovered ? `${Math.min(100, h + 15)}%` : `${h}%` }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className={cn('flex-1 rounded-t', hovered ? 'bg-white/40' : 'bg-white/20')}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'code-snippet-deck':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, rotate: hovered ? -1 : 0 }}
              className="w-full max-w-[260px] rounded-xl bg-[#090909] border border-[#202020] overflow-hidden pointer-events-none scale-90 sm:scale-95"
            >
              <div className="px-2.5 py-1.5 bg-[#121212] border-b border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                <span>client.ts</span>
                <span className="text-white">TypeScript</span>
              </div>
              <div className="p-2.5 font-mono text-[10px] text-[#A1A1A1] leading-relaxed">
                <div><span className="text-white">import</span> &#123; EasyUI &#125; <span className="text-white">from</span> <span className="text-white/70">"@easyui/sdk"</span>;</div>
                <div className={cn(hovered ? 'text-emerald-400' : 'text-[#666666]')}>{hovered ? '// Connected to cluster' : '// Instant completions API'}</div>
              </div>
            </motion.div>
          </div>
        );
      case 'magnetic-button':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -2 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <MagneticButton variant="primary" size="md">
                <span>Magnetic</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4D4D4]" />
              </MagneticButton>
            </motion.div>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <SpotlightCard className={cn('w-full p-4 transition-colors', hovered ? 'bg-[#111111] border-[#333333]' : 'bg-[#0A0A0A]')}>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-white')} />
                <span className="text-xs font-semibold text-[#F5F5F5]">Spotlight Sensor</span>
              </div>
              <p className="text-[11px] text-[#737373]">Hover pointer to track dynamic beam.</p>
            </SpotlightCard>
          </div>
        );
      case 'expandable-search':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div animate={{ width: hovered ? '100%' : 'auto' }} className="flex justify-center">
              <ExpandableSearch placeholder="Search components..." />
            </motion.div>
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
              defaultTab={hovered ? 'tab2' : 'tab1'}
            />
          </div>
        );
      case 'floating-action-dock':
      case 'floating-dock':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div animate={{ y: hovered ? -3 : 0 }} transition={{ type: 'spring', stiffness: 350, damping: 20 }}>
              <FloatingActionDock
                items={[
                  { id: '1', label: 'Code', icon: <Code2 /> },
                  { id: '2', label: 'Term', icon: <Terminal /> },
                  { id: '3', label: 'AI', icon: <Sparkles /> },
                ]}
                activeId={hovered ? '3' : '1'}
              />
            </motion.div>
          </div>
        );
      case 'reveal-card':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div animate={{ rotateX: hovered ? 8 : 0, rotateY: hovered ? -8 : 0 }} className="w-full">
              <RevealCard
                revealContent={<span className="text-xs text-white font-medium">Revealed on hover tilt</span>}
                className={cn('p-4 transition-colors', hovered ? 'bg-[#111111] border-[#333333]' : 'bg-[#0A0A0A]')}
              >
                <span className="text-xs font-semibold text-[#F5F5F5] block">3D Tilt & Glare</span>
                <span className="text-[11px] text-[#737373]">Hover cursor across surface</span>
              </RevealCard>
            </motion.div>
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
            <motion.div animate={{ y: hovered ? -4 : 0 }}>
              <NotificationStack maxVisible={2} />
            </motion.div>
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div animate={{ scale: hovered ? 1.05 : 1 }}>
              <MorphingDialog
                id={`card-dialog-${comp.id}`}
                title="Shared Surface Transition"
                subtitle="Smooth layoutId expansion"
                trigger={(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={cn('px-4 py-2 rounded-lg text-xs transition-colors', hovered ? 'bg-[#1A1A1A] border-[#333333] text-white' : 'bg-[#111111] border-[#202020] text-[#F5F5F5]')}
                  >
                    Trigger Modal
                  </button>
                )}
              >
                <p className="text-xs text-[#A1A1A1]">Morphing layout transition without harsh popping.</p>
              </MorphingDialog>
            </motion.div>
          </div>
        );
      case 'command-menu':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#383838' : '#1E1E1E' }}
              className="px-3.5 py-2 rounded-lg bg-[#111111] border text-xs font-mono text-[#A1A1A1] flex items-center gap-2 transition-colors"
            >
              <span className="text-white font-semibold bg-[#1C1C1C] px-1.5 py-0.5 rounded border border-[#2E2E2E]">⌘K</span>
              <span>Global Command Palette</span>
            </motion.div>
          </div>
        );
      case 'glass-navbar':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#333333' : '#1D1D1D' }}
              className="w-full max-w-[260px] p-2 rounded-xl bg-[#0E0E0E]/90 border shadow-lg flex items-center justify-between pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">E</span>
                <span className="text-[11px] font-semibold text-white">EasyUI</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#808080]">
                <span className="text-white font-medium bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#282828]">Docs</span>
                <span>Blog</span>
              </div>
              <span className="text-[9px] font-medium bg-[#F5F5F5] text-black px-2 py-0.5 rounded shadow">Launch</span>
            </motion.div>
          </div>
        );
      case 'button':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <div className="flex items-center gap-2 pointer-events-none scale-90 sm:scale-95">
              <motion.span
                animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -2 : 0 }}
                className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Primary
              </motion.span>
              <motion.span
                animate={{ scale: hovered ? 0.98 : 1 }}
                className="px-3 py-1.5 rounded-lg bg-[#151515] border border-[#1D1D1D] text-[#F5F5F5] text-xs font-medium"
              >
                Secondary
              </motion.span>
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
              <motion.div
                animate={{ borderColor: hovered ? '#383838' : '#2A2A2A' }}
                className="h-8 px-2.5 rounded-lg bg-[#0A0A0A] border text-[11px] text-[#F5F5F5] flex items-center justify-between transition-colors"
              >
                <span>alex@easyui.dev</span>
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400')} />
              </motion.div>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-2 pointer-events-none scale-90 sm:scale-95"
            >
              <div className="text-[11px] font-semibold text-white">Welcome back</div>
              <div className="h-6 px-2 rounded-md bg-[#121212] border border-[#222222] text-[10px] text-[#666666] flex items-center">
                <span>••••••••••••</span>
              </div>
              <motion.div
                animate={{ scale: hovered ? 1.02 : 1 }}
                className="h-6 rounded-md bg-white text-black text-[10px] font-medium flex items-center justify-center shadow"
              >
                Sign In →
              </motion.div>
            </motion.div>
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
                <motion.div animate={{ backgroundColor: hovered ? '#34D399' : '#1D1D1D' }} className="flex-1 rounded-full transition-colors" />
              </div>
              <div className="text-[9px] font-mono text-emerald-400 flex justify-between">
                <span>Security</span>
                <span>{hovered ? 'Maximum' : 'Strong'}</span>
              </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-lg border border-[#1D1D1D] bg-[#0A0A0A] overflow-hidden pointer-events-none scale-90 sm:scale-95"
            >
              <div className="p-2.5 flex items-center justify-between text-[11px] font-medium text-white border-b border-[#1A1A1A]">
                <span>How to use CLI?</span>
                <span className="text-[#888888] text-[9px]">▲</span>
              </div>
              <div className="p-2 text-[10px] text-[#888888] bg-[#0C0C0C]">
                Run npx shadcn@latest add ...
              </div>
            </motion.div>
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
              <motion.div
                animate={{ y: hovered ? 4 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-[88%] -mt-1 p-2.5 rounded-b-md bg-[#F9F9F8] text-[#111111] font-mono text-[9px] shadow border border-[#E0E0DE] space-y-1"
              >
                <div className="flex justify-between font-bold border-b border-dashed border-black/20 pb-1">
                  <span>EASYUI PRO</span>
                  <span>$200.00</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>TOTAL:</span>
                  <span className="font-bold">$200.00</span>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case 'dot-field':
        return (
          <div className="h-40 relative rounded-lg overflow-hidden border border-[#1A1A1A] bg-[#070707]">
            <DotField
              dotRadius={hovered ? 1.6 : 1.2}
              dotSpacing={12}
              bulgeStrength={hovered ? 80 : 50}
              glowRadius={hovered ? 160 : 120}
              sparkle={true}
              gradientFrom={hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)'}
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
            <motion.div
              animate={{ scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-lg bg-[#0E0E0E] border border-[#202020] pointer-events-none scale-90 sm:scale-95 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-md bg-[#141414] border border-[#222222] flex items-center justify-center text-[#A1A1A1]">
                  <Terminal className="w-3 h-3" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-white truncate">Edge Cluster</div>
                  <div className="text-[9px] font-mono text-[#666666]">12 workers</div>
                </div>
              </div>
              <span className={cn('p-1 rounded text-[9px] font-mono shrink-0 transition-colors', hovered ? 'bg-rose-500 text-white' : 'text-rose-400 bg-rose-500/10')}>
                Delete
              </span>
            </motion.div>
          </div>
        );
      case 'animated-file-upload':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ borderColor: hovered ? '#444444' : '#282828', scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-3 rounded-xl border border-dashed bg-[#0A0A0A] flex flex-col items-center justify-center text-center pointer-events-none scale-90 sm:scale-95 transition-colors"
            >
              <motion.div
                animate={{ y: hovered ? -3 : 0 }}
                className={cn('w-7 h-7 rounded-lg border flex items-center justify-center mb-1.5 transition-colors', hovered ? 'bg-white text-black border-white' : 'bg-[#141414] border-[#222222] text-[#A1A1A1]')}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-[11px] font-medium text-[#F5F5F5]">{hovered ? 'Drop to Upload' : 'Drop files here'}</span>
              <span className="text-[9px] text-[#666666]">or browse device</span>
            </motion.div>
          </div>
        );
      case 'payment-status':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0B0B0B] border border-[#1E1E1E] space-y-2 pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
                  <span className="text-[11px] font-semibold text-white">Payment Successful</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">$149.00</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#666666] border-t border-[#161616] pt-1.5">
                <span>tx_9842a8d11c7f</span>
                <span>Apple Pay</span>
              </div>
            </motion.div>
          </div>
        );
      case 'undo-toast':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0 }}
              className="w-full max-w-[250px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#222222] shadow-lg pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-[#F5F5F5]">Project archived</span>
                <span className="px-2 py-0.5 rounded bg-white text-black text-[9px] font-medium">Undo</span>
              </div>
              <div className="h-0.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div animate={{ width: hovered ? '10%' : '75%' }} transition={{ duration: 1.5 }} className="h-full bg-white/70" />
              </div>
            </motion.div>
          </div>
        );
      case 'expandable-data-row':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-xl bg-[#0B0B0B] border border-[#202020] overflow-hidden pointer-events-none scale-90 sm:scale-95"
            >
              <div className="p-2.5 flex items-center justify-between border-b border-[#181818] bg-[#0E0E0E]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1C1C1C] text-[9px] flex items-center justify-center text-white">AW</span>
                  <span className="text-[11px] font-medium text-white">Alex Wright</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">+$2,450</span>
              </div>
              <motion.div animate={{ height: hovered ? 'auto' : '26px' }} className="p-2 bg-[#090909] text-[9px] font-mono text-[#737373] flex justify-between">
                <span>Enterprise Plan</span>
                <span>{hovered ? 'Active ✓' : 'Unfolded ▾'}</span>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'scroll-progress-nav':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="rounded-full bg-[#0E0E0E] border border-[#222222] shadow-xl p-1 flex items-center gap-1 pointer-events-none scale-90 sm:scale-95"
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#666666]">01</span>
              <motion.span
                animate={{ backgroundColor: hovered ? '#2A2A2A' : '#1F1F1F' }}
                className="px-3 py-1 rounded-full text-[11px] font-medium border border-[#333333] text-white flex items-center gap-1.5 shadow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Features
              </motion.span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#666666]">03 Docs</span>
            </motion.div>
          </div>
        );
      case 'animated-number':
        return <AnimatedNumberPreview isHovered={hovered} />;
      case 'spotlight-search':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0D0D0D] border border-[#222222] shadow-md pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex items-center justify-between text-[11px] text-[#737373] mb-2 border-b border-[#181818] pb-1.5">
                <span>Search components...</span>
                <span className="text-[9px] font-mono bg-[#161616] px-1 rounded text-white">ESC</span>
              </div>
              <div className="space-y-1">
                <motion.div
                  animate={{ backgroundColor: hovered ? '#222222' : '#181818' }}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] text-white flex justify-between font-medium"
                >
                  <span>Magnetic Button</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      case 'morphing-button':
        return (
          <div className="h-40 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium shadow flex items-center gap-1.5 pointer-events-none scale-90 sm:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hovered ? 'Saved ✓' : 'Save Changes'}</span>
            </motion.div>
          </div>
        );
      case 'drag-to-confirm':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] h-10 rounded-xl bg-[#0E0E0E] border border-[#222222] p-1 flex items-center justify-between pointer-events-none scale-90 sm:scale-95">
              <motion.div
                animate={{ x: hovered ? 120 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-[10px] font-bold shadow"
              >
                {hovered ? '✓' : '→'}
              </motion.div>
              <span className="text-[10px] font-mono text-[#666666] pr-3">{hovered ? 'Confirmed' : 'Slide to confirm'}</span>
            </div>
          </div>
        );
      case 'peek-card':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0D0D0D] border border-[#222222] space-y-1.5 pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-white">Payment #3948</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">Succeeded</span>
              </div>
              <div className="text-[10px] text-[#737373]">Alexander Wright · $249.00</div>
            </motion.div>
          </div>
        );
      case 'selection-basket':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -4 : 0 }}
              className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#242424] shadow-lg flex items-center gap-2 pointer-events-none scale-90 sm:scale-95"
            >
              <span className="w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center">3</span>
              <span className="text-[10px] font-medium text-white">selected</span>
              <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[9px] text-[#D4D4D4] border border-[#2A2A2A]">Export</span>
            </motion.div>
          </div>
        );
      case 'focus-mode':
        return (
          <div className="h-40 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.03 : 1, borderColor: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0D0D0D] border shadow-[0_0_20px_rgba(255,255,255,0.08)] pointer-events-none scale-90 sm:scale-95"
            >
              <div className="flex justify-between text-[11px] font-medium text-white mb-1">
                <span>Revenue Focus</span>
                <span className="text-[9px] font-mono text-emerald-400">+18.4%</span>
              </div>
              <span className="text-[9px] font-mono text-[#666666] block">Press ESC to exit</span>
            </motion.div>
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group rounded-2xl border border-[#181818] bg-[#090909] overflow-hidden hover:border-[#2A2A2A] hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all duration-200 cursor-pointer flex flex-col justify-between',
        className
      )}
    >
      {/* Live Preview Area */}
      <div className="relative bg-[#070707] border-b border-[#131313] bg-grid-pattern overflow-hidden">
        {/* Subtle Copy CLI Button (Reveals on card hover) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={handleCopyCLI}
            className="p-1.5 rounded-lg bg-[#111111]/90 backdrop-blur border border-[#222222] text-[#737373] hover:text-white hover:border-[#333333] transition-colors focus-ring"
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

        {renderPreview(component, isHovered)}
      </div>

      {/* Component Info Card - Ultra-Minimal: Name + NEW badge + Category */}
      <div className="px-4 py-3 flex items-center justify-between gap-3 bg-[#090909]">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-xs font-medium text-[#EDEDED] group-hover:text-white transition-colors truncate">
            {component.name}
          </h3>
          {isNew && <NewBadge size="xs" />}
        </div>
        <span className="text-[10px] font-mono text-[#555555] group-hover:text-[#737373] transition-colors shrink-0">
          {component.category}
        </span>
      </div>
    </div>
  );
};
