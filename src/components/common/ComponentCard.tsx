import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { EasyComponentMeta } from '../../types/component';
import { Copy, Check, Sparkles, Code2, Terminal, Bell, Search, X, ArrowUpRight } from 'lucide-react';
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
import { RocketPartyPopper } from '../ui/RocketPartyPopper';
import { BranchingSubmenu } from '../ui/BranchingSubmenu';
import { GravityParticleBurst } from '../ui/GravityParticleBurst';
import { LiquidRippleButton } from '../ui/LiquidRippleButton';
import { NeonEdgeButton } from '../ui/NeonEdgeButton';
import { OrbitalLoadingRing } from '../ui/OrbitalLoadingRing';
import { PillNavigation } from '../ui/PillNavigation';
import { TextScrambleDecoder } from '../ui/TextScrambleDecoder';
import { MacOSFolderCards } from '../ui/MacOSFolderCards';
import { IntroLoader } from '../ui/IntroLoader';
import { NewBadge } from './NewBadge';
import { isComponentNew } from '../../lib/components';
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
    <div className="h-52 flex flex-col items-center justify-center p-4">
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
  isNew,
  onSelect,
  className,
}) => {
  const showNew = isNew !== undefined ? isNew : isComponentNew(component);
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
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-2 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ x: hovered ? 2 : 0 }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className="w-4 h-4 rounded-full bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[9px] font-bold">✓</span>
                <span className="text-[11px] font-medium text-[#FAFAFA]">Edge Build Verified</span>
                <span className="ml-auto text-[9px] font-mono text-emerald-400">48s</span>
              </motion.div>
              <motion.div
                animate={{ x: hovered ? 4 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
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
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[260px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#FAFAFA]">Pro Tier</span>
                <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors', hovered ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]' : 'text-[#FAFAFA] bg-[#141414] border-[#1F1F1F]')}>$29/mo</span>
              </div>
              <div className="space-y-1 text-[10px] font-mono text-[#6B6B6B]">
                <div className="flex justify-between"><span>Multi-Region</span><span className="text-[#FAFAFA]">✓ Included</span></div>
                <div className="flex justify-between"><span>Concurrency</span><span className="text-[#FAFAFA]">250 nodes</span></div>
              </div>
            </motion.div>
          </div>
        );
      case 'activity-feed':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ y: hovered ? -1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400')} />
                <span className="text-[11px] text-[#FAFAFA] truncate">Edge Lambda deployed</span>
                <span className="ml-auto text-[9px] font-mono text-[#6B6B6B]">Just now</span>
              </motion.div>
              <motion.div
                animate={{ y: hovered ? 1 : 0 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F]"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[11px] text-[#FAFAFA] truncate">POST /v1/auth 200 OK</span>
                <span className="ml-auto text-[9px] font-mono text-[#6B6B6B]">18ms</span>
              </motion.div>
            </div>
          </div>
        );
      case 'metric-hud':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[260px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#6B6B6B]">p99 Latency</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{hovered ? '-24.8%' : '-18.4%'}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold font-mono text-[#FAFAFA]">{hovered ? '11.8' : '14.2'}</span>
                <span className="text-[10px] font-mono text-[#6B6B6B]">ms</span>
              </div>
              <div className="h-6 w-full flex items-end gap-1">
                {[35, 45, 55, 40, 65, 75, 50, 85, 90, 60, 40, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: hovered ? `${Math.min(100, h + 15)}%` : `${h}%` }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className={cn('flex-1 rounded-t', hovered ? 'bg-[#3B82F6]' : 'bg-white/20')}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'code-snippet-deck':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, rotate: hovered ? -1 : 0 }}
              className="w-full max-w-[260px] rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="px-2.5 py-1.5 bg-[#141414] border-b border-[#1F1F1F] flex items-center justify-between text-[10px] font-mono text-[#6B6B6B]">
                <span>client.ts</span>
                <span className="text-[#FAFAFA]">TypeScript</span>
              </div>
              <div className="p-2.5 font-mono text-[10px] text-[#A1A1A1] leading-relaxed">
                <div><span className="text-[#FAFAFA]">import</span> &#123; EasyUI &#125; <span className="text-[#FAFAFA]">from</span> <span className="text-white/70">"@easyui/sdk"</span>;</div>
                <div className={cn(hovered ? 'text-emerald-400' : 'text-[#6B6B6B]')}>{hovered ? '// Connected to cluster' : '// Instant completions API'}</div>
              </div>
            </motion.div>
          </div>
        );
      case 'magnetic-button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
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
          <div className="h-52 flex items-center justify-center p-4">
            <SpotlightCard className={cn('w-full p-4 transition-colors', hovered ? 'bg-[#141414] border-[#4A4A4A]' : 'bg-[#0E0E0E] border-[#1F1F1F]')}>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('w-1.5 h-1.5 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-white')} />
                <span className="text-xs font-semibold text-[#FAFAFA]">Spotlight Sensor</span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">Hover pointer to track dynamic beam.</p>
            </SpotlightCard>
          </div>
        );
      case 'expandable-search':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ width: hovered ? '100%' : 'auto' }} className="flex justify-center">
              <ExpandableSearch placeholder="Search components..." />
            </motion.div>
          </div>
        );
      case 'animated-tabs':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <AnimatedTabs
              tabs={[
                { id: 'tab1', label: 'Code', content: <div className="text-xs text-[#6B6B6B]">React 18 JSX</div> },
                { id: 'tab2', label: 'Styles', content: <div className="text-xs text-[#6B6B6B]">Tailwind v3</div> },
              ]}
              defaultTab={hovered ? 'tab2' : 'tab1'}
            />
          </div>
        );
      case 'floating-action-dock':
      case 'floating-dock':
        return (
          <div className="h-52 flex items-center justify-center p-4">
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
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ rotateX: hovered ? 8 : 0, rotateY: hovered ? -8 : 0 }} className="w-full">
              <RevealCard
                revealContent={<span className="text-xs text-white font-medium">Revealed on hover tilt</span>}
                className={cn('p-4 transition-colors', hovered ? 'bg-[#141414] border-[#4A4A4A]' : 'bg-[#0E0E0E] border-[#1F1F1F]')}
              >
                <span className="text-xs font-semibold text-[#FAFAFA] block">3D Tilt & Glare</span>
                <span className="text-[11px] text-[#6B6B6B]">Hover cursor across surface</span>
              </RevealCard>
            </motion.div>
          </div>
        );
      case 'smooth-accordion':
        return (
          <div className="h-52 flex items-center justify-center p-4">
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
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ y: hovered ? -4 : 0 }}>
              <NotificationStack maxVisible={2} />
            </motion.div>
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ scale: hovered ? 1.05 : 1 }}>
              <MorphingDialog
                id={`card-dialog-${comp.id}`}
                title="Shared Surface Transition"
                subtitle="Smooth layoutId expansion"
                trigger={(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={cn('px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer', hovered ? 'bg-[#0E0E0E] border-[#4A4A4A] text-white' : 'bg-[#141414] border-[#1F1F1F] text-[#FAFAFA]')}
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
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="px-3.5 py-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-xs font-mono text-[#A1A1A1] flex items-center gap-2 transition-colors shadow-xs"
            >
              <span className="text-white font-semibold bg-[#141414] px-1.5 py-0.5 rounded border border-[#1F1F1F]">⌘K</span>
              <span>Global Command Palette</span>
            </motion.div>
          </div>
        );
      case 'glass-navbar':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[260px] p-2 rounded-xl bg-[#0E0E0E]/90 border border-[#1F1F1F] shadow-md flex items-center justify-between pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">E</span>
                <span className="text-[11px] font-semibold text-white">EasyUI</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#6B6B6B]">
                <span className="text-white font-medium bg-[#141414] px-1.5 py-0.5 rounded border border-[#1F1F1F]">Docs</span>
                <span>Blog</span>
              </div>
              <span className="text-[9px] font-medium bg-[#FAFAFA] text-[#050505] px-2 py-0.5 rounded shadow">Launch</span>
            </motion.div>
          </div>
        );
      case 'button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="flex items-center gap-2 pointer-events-none scale-100 sm:scale-100">
              <motion.span
                animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -2 : 0 }}
                className="px-3 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium shadow flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Primary
              </motion.span>
              <motion.span
                animate={{ scale: hovered ? 0.98 : 1 }}
                className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-[#FAFAFA] text-xs font-medium"
              >
                Secondary
              </motion.span>
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#A1A1A1] font-medium">Workspace Email</span>
                <span className="text-[#FF7A7A]">*</span>
              </div>
              <motion.div
                animate={{ borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
                className="h-8 px-2.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] text-[11px] text-[#FAFAFA] flex items-center justify-between transition-colors shadow-xs"
              >
                <span>alex@easyui.dev</span>
                <span className={cn('w-2 h-2 rounded-full', hovered ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400')} />
              </motion.div>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="text-[11px] font-semibold text-[#FAFAFA]">Welcome back</div>
              <div className="h-6 px-2 rounded-md bg-[#141414] border border-[#1F1F1F] text-[10px] text-[#6B6B6B] flex items-center">
                <span>••••••••••••</span>
              </div>
              <motion.div
                animate={{ scale: hovered ? 1.02 : 1 }}
                className="h-6 rounded-md bg-[#FAFAFA] text-[#050505] text-[10px] font-medium flex items-center justify-center shadow"
              >
                Sign In →
              </motion.div>
            </motion.div>
          </div>
        );
      case 'sign-up':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-1.5 pointer-events-none scale-100 sm:scale-100 shadow-xs">
              <div className="text-[11px] font-semibold text-[#FAFAFA]">Create account</div>
              <div className="flex gap-1 h-1">
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <div className="flex-1 rounded-full bg-emerald-400" />
                <motion.div animate={{ backgroundColor: hovered ? '#34D399' : '#1F1F1F' }} className="flex-1 rounded-full transition-colors" />
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
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-lg border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="p-2.5 flex items-center justify-between text-[11px] font-medium text-[#FAFAFA] border-b border-[#1F1F1F]">
                <span>How to use CLI?</span>
                <span className="text-[#6B6B6B] text-[9px]">▲</span>
              </div>
              <div className="p-2 text-[10px] text-[#A1A1A1] bg-[#141414]">
                Run npx shadcn@latest add ...
              </div>
            </motion.div>
          </div>
        );
      case 'payment-receipt-printer':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] flex flex-col items-center pointer-events-none scale-100 sm:scale-100">
              <div className="w-full p-2 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] flex items-center justify-between shadow-md z-10">
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
          <div className="h-52 relative rounded-lg overflow-hidden border border-[#1F1F1F] bg-[#0E0E0E]">
            <DotField
              dotRadius={1.5}
              dotSpacing={12}
              gradientFrom={hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)'}
              gradientTo="rgba(255, 255, 255, 0.08)"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#141414]/90 px-2.5 py-1 rounded-md border border-[#1F1F1F]">
                Static Canvas Matrix
              </span>
            </div>
          </div>
        );
      case 'particle-delete':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] pointer-events-none scale-100 sm:scale-100 flex items-center justify-between gap-2 shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-md bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#A1A1A1]">
                  <Terminal className="w-3 h-3" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-[#FAFAFA] truncate">Edge Cluster</div>
                  <div className="text-[9px] font-mono text-[#6B6B6B]">12 workers</div>
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
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ borderColor: hovered ? '#4A4A4A' : '#1F1F1F', scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-3 rounded-xl border border-dashed bg-[#0E0E0E] flex flex-col items-center justify-center text-center pointer-events-none scale-100 sm:scale-100 transition-colors shadow-xs"
            >
              <motion.div
                animate={{ y: hovered ? -3 : 0 }}
                className={cn('w-7 h-7 rounded-lg border flex items-center justify-center mb-1.5 transition-colors', hovered ? 'bg-[#FAFAFA] text-[#050505] border-[#FAFAFA]' : 'bg-[#141414] border-[#1F1F1F] text-[#A1A1A1]')}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-[11px] font-medium text-[#FAFAFA]">{hovered ? 'Drop to Upload' : 'Drop files here'}</span>
              <span className="text-[9px] text-[#6B6B6B]">or browse device</span>
            </motion.div>
          </div>
        );
      case 'payment-status':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold">✓</span>
                  <span className="text-[11px] font-semibold text-[#FAFAFA]">Payment Successful</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">$149.00</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#6B6B6B] border-t border-[#1F1F1F] pt-1.5">
                <span>tx_9842a8d11c7f</span>
                <span>Apple Pay</span>
              </div>
            </motion.div>
          </div>
        );
      case 'undo-toast':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0 }}
              className="w-full max-w-[250px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-medium text-[#FAFAFA]">Project archived</span>
                <span className="px-2 py-0.5 rounded bg-[#FAFAFA] text-[#050505] text-[9px] font-medium">Undo</span>
              </div>
              <div className="h-0.5 w-full bg-[#141414] rounded-full overflow-hidden">
                <motion.div animate={{ width: hovered ? '10%' : '75%' }} transition={{ duration: 1.5 }} className="h-full bg-white/70" />
              </div>
            </motion.div>
          </div>
        );
      case 'expandable-data-row':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[250px] rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="p-2.5 flex items-center justify-between border-b border-[#1F1F1F] bg-[#141414]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1F1F1F] text-[9px] flex items-center justify-center text-white">AW</span>
                  <span className="text-[11px] font-medium text-[#FAFAFA]">Alex Wright</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">+$2,450</span>
              </div>
              <motion.div animate={{ height: hovered ? 'auto' : '26px' }} className="p-2 bg-[#0E0E0E] text-[9px] font-mono text-[#6B6B6B] flex justify-between">
                <span>Enterprise Plan</span>
                <span>{hovered ? 'Active ✓' : 'Unfolded ▾'}</span>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'scroll-progress-nav':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="rounded-full bg-[#0E0E0E] border border-[#1F1F1F] shadow-xl p-1 flex items-center gap-1 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#6B6B6B]">01</span>
              <motion.span
                animate={{ backgroundColor: hovered ? '#141414' : '#0E0E0E' }}
                className="px-3 py-1 rounded-full text-[11px] font-medium border border-[#1F1F1F] text-[#FAFAFA] flex items-center gap-1.5 shadow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Features
              </motion.span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-[#6B6B6B]">03 Docs</span>
            </motion.div>
          </div>
        );
      case 'animated-number':
        return <AnimatedNumberPreview isHovered={hovered} />;
      case 'spotlight-search':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-md pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] mb-2 border-b border-[#1F1F1F] pb-1.5">
                <span>Search components...</span>
                <span className="text-[9px] font-mono bg-[#141414] px-1 rounded text-white">ESC</span>
              </div>
              <div className="space-y-1">
                <motion.div
                  animate={{ backgroundColor: hovered ? '#141414' : '#0E0E0E' }}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] text-[#FAFAFA] flex justify-between font-medium"
                >
                  <span>Magnetic Button</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      case 'morphing-button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="px-4 py-2 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium shadow flex items-center gap-1.5 pointer-events-none scale-100 sm:scale-100"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hovered ? 'Saved ✓' : 'Save Changes'}</span>
            </motion.div>
          </div>
        );
      case 'drag-to-confirm':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] h-10 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] p-1 flex items-center justify-between pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ x: hovered ? 120 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="w-8 h-8 rounded-lg bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[10px] font-bold shadow"
              >
                {hovered ? '✓' : '→'}
              </motion.div>
              <span className="text-[10px] font-mono text-[#6B6B6B] pr-3">{hovered ? 'Confirmed' : 'Slide to confirm'}</span>
            </div>
          </div>
        );
      case 'peek-card':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.02 : 1 }}
              className="w-full max-w-[240px] p-2.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-1.5 pointer-events-none scale-100 sm:scale-100 shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-[#FAFAFA]">Payment #3948</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">Succeeded</span>
              </div>
              <div className="text-[10px] text-[#6B6B6B]">Alexander Wright · $249.00</div>
            </motion.div>
          </div>
        );
      case 'selection-basket':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -4 : 0 }}
              className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg flex items-center gap-2 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="w-4 h-4 rounded-full bg-[#FAFAFA] text-[#050505] text-[9px] font-bold flex items-center justify-center">3</span>
              <span className="text-[10px] font-medium text-[#FAFAFA]">selected</span>
              <span className="px-2 py-0.5 rounded bg-[#141414] text-[9px] text-[#A1A1A1] border border-[#1F1F1F]">Export</span>
            </motion.div>
          </div>
        );
      case 'focus-mode':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ scale: hovered ? 1.03 : 1, borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="w-full max-w-[240px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-md pointer-events-none scale-100 sm:scale-100"
            >
              <div className="flex justify-between text-[11px] font-medium text-[#FAFAFA] mb-1">
                <span>Revenue Focus</span>
                <span className="text-[9px] font-mono text-emerald-400">+18.4%</span>
              </div>
              <span className="text-[9px] font-mono text-[#6B6B6B] block">Press ESC to exit</span>
            </motion.div>
          </div>
        );
      case 'loader':
        return (
          <div className="h-52 flex items-center justify-center gap-4 p-4 pointer-events-none">
            <motion.div
              animate={{ rotate: hovered ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white"
            />
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ scale: hovered ? [0.8, 1.3, 0.8] : 1, opacity: hovered ? [0.4, 1, 0.4] : 0.6 }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        );
      case 'small-floating-dock':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <motion.div
              animate={{ y: hovered ? -3 : 0, scale: hovered ? 1.05 : 1 }}
              className="p-1.5 rounded-full bg-[#0E0E0E] border border-[#1F1F1F] shadow-lg flex items-center gap-1.5 pointer-events-none scale-100 sm:scale-100"
            >
              <span className="w-7 h-7 rounded-full bg-[#FAFAFA] text-[#050505] flex items-center justify-center text-[10px] font-bold">⌘</span>
              <span className="w-7 h-7 rounded-full bg-[#141414] text-[#A1A1A1] flex items-center justify-center text-[10px]">⌥</span>
              <span className="w-7 h-7 rounded-full bg-[#141414] text-[#A1A1A1] flex items-center justify-center text-[10px]">⇧</span>
              <span className="relative w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px]">
                ★
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full text-[8px] flex items-center justify-center text-white">3</span>
              </span>
            </motion.div>
          </div>
        );
      case 'hamburger-menu':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              className="w-12 h-12 rounded-xl bg-[#141414] border border-[#1F1F1F] flex flex-col items-center justify-center gap-1.5 pointer-events-none"
            >
              <motion.span
                animate={{ y: hovered ? 4 : 0, rotate: hovered ? 45 : 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: hovered ? 0 : 1, scaleX: hovered ? 0.2 : 1 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{ y: hovered ? -4 : 0, rotate: hovered ? -45 : 0 }}
                className="w-5 h-0.5 bg-white rounded-full origin-center"
              />
            </motion.div>
          </div>
        );
      case 'notification-bell':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={hovered ? { rotate: [0, -14, 12, -8, 6, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="relative p-2.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-[#FAFAFA] shadow-md pointer-events-none"
            >
              <Bell className="w-5 h-5 text-[#FAFAFA]" />
              <motion.span
                animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: hovered ? Infinity : 0, duration: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center border-2 border-[#0E0E0E]"
              >
                2
              </motion.span>
            </motion.div>
          </div>
        );
      case 'ios-search-bar':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ width: hovered ? '220px' : '160px', borderColor: hovered ? '#4A4A4A' : '#1F1F1F' }}
              className="h-8 px-3 rounded-full bg-[#141414] border border-[#1F1F1F] flex items-center justify-between text-xs text-[#6B6B6B] pointer-events-none"
            >
              <Search className="w-3.5 h-3.5 text-[#525252] shrink-0" />
              <span className="text-[11px] truncate mx-2 text-[#A1A1A1]">{hovered ? 'components...' : 'Search...'}</span>
              <span className="w-4 h-4 rounded-full bg-[#1F1F1F] text-[#A1A1A1] flex items-center justify-center shrink-0">
                <X className="w-2.5 h-2.5" />
              </span>
            </motion.div>
          </div>
        );
      case 'typewriter-button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              className="px-3.5 py-2 rounded-xl bg-[#FAFAFA] text-[#050505] font-mono text-xs font-semibold flex items-center gap-1 shadow pointer-events-none"
            >
              <span>{hovered ? 'npx easyui add' : 'easyui deploy'}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-1.5 h-3.5 bg-black"
              />
            </motion.div>
          </div>
        );
      case 'depth-corridor':
        return (
          <div className="h-52 flex items-center justify-center p-4" style={{ perspective: '600px' }}>
            <div className="relative w-40 h-24 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                animate={{ z: hovered ? -60 : -40, opacity: hovered ? 0.3 : 0.4 }}
                className="absolute w-32 h-16 rounded-xl bg-[#141414] border border-white/5"
              />
              <motion.div
                animate={{ z: hovered ? -30 : -20, opacity: hovered ? 0.6 : 0.7 }}
                className="absolute w-36 h-18 rounded-xl bg-[#0E0E0E] border border-white/10"
              />
              <motion.div
                animate={{ z: 0, rotateY: hovered ? 10 : 0 }}
                className="absolute w-40 h-20 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] shadow-xl p-2.5 flex flex-col justify-between"
              >
                <span className="text-[10px] font-semibold text-white">Spatial Layer</span>
                <span className="text-[8px] font-mono text-emerald-400">translateZ depth</span>
              </motion.div>
            </div>
          </div>
        );
      case 'density-lens':
        return (
          <div className="h-52 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full max-w-[220px] p-3 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] text-center pointer-events-none shadow-xs">
              <span className="text-xs text-[#A1A1A1]">Normal Resolution</span>
              <motion.div
                animate={{ x: hovered ? [0, 30, -30, 0] : 0 }}
                transition={{ duration: 3, repeat: hovered ? Infinity : 0 }}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-bold text-white shadow-2xl"
              >
                2x Lens
              </motion.div>
            </div>
          </div>
        );
      case 'torque-dial':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div
              animate={{ rotate: hovered ? 180 : 45 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-[#0E0E0E] border-2 border-[#1F1F1F] relative flex items-center justify-center shadow-lg pointer-events-none"
            >
              <span className="absolute top-1.5 w-1 h-3 rounded-full bg-white" />
              <div className="w-4 h-4 rounded-full bg-[#141414] border border-white/10" />
            </motion.div>
          </div>
        );
      case 'stack-unfold-panel':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div
                animate={{ y: hovered ? -2 : 0 }}
                className="p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] flex justify-between text-[10px] text-white font-medium shadow-xs"
              >
                <span>Edge Runtime v2</span>
                <span>▾</span>
              </motion.div>
              <motion.div
                animate={{ y: hovered ? 2 : 0, opacity: hovered ? 0.8 : 0.4 }}
                className="p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] flex justify-between text-[10px] text-[#6B6B6B]"
              >
                <span>Binary Protocol</span>
                <span>▾</span>
              </motion.div>
            </div>
          </div>
        );
      case 'dependency-trace':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="flex items-center gap-4 pointer-events-none scale-100 sm:scale-100">
              <motion.div animate={{ scale: hovered ? 1.1 : 1 }} className="w-10 h-10 rounded-full bg-[#141414] border border-white text-[9px] font-mono text-white flex items-center justify-center shadow">
                API
              </motion.div>
              <motion.div animate={{ opacity: hovered ? 1 : 0.3 }} className="w-8 h-0.5 bg-white border-t border-dashed" />
              <motion.div animate={{ scale: hovered ? 1.1 : 1 }} className="w-10 h-10 rounded-full bg-[#141414] border border-emerald-400 text-[9px] font-mono text-emerald-400 flex items-center justify-center shadow">
                DB
              </motion.div>
            </div>
          </div>
        );
      case 'batch-gesture-tray':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] relative pointer-events-none scale-100 sm:scale-100">
              <div className="p-2 rounded-lg bg-[#0E0E0E] border border-[#1F1F1F] flex items-center gap-2 mb-2 shadow-xs">
                <span className="w-3.5 h-3.5 rounded bg-[#FAFAFA] text-[#050505] text-[8px] flex items-center justify-center font-bold">✓</span>
                <span className="text-[10px] text-[#FAFAFA]">3 items selected</span>
              </div>
              <motion.div
                animate={{ y: hovered ? 0 : 4, opacity: hovered ? 1 : 0.7 }}
                className="p-1.5 rounded-xl bg-[#141414] border border-[#1F1F1F] flex justify-between text-[9px] text-[#FAFAFA]"
              >
                <span className="bg-white/10 px-2 py-0.5 rounded">Archive</span>
                <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded">Delete</span>
              </motion.div>
            </div>
          </div>
        );
      case 'recovery-ledger':
        return (
          <div className="h-52 flex items-center justify-center p-3">
            <div className="w-full max-w-[240px] space-y-1.5 pointer-events-none scale-100 sm:scale-100">
              <motion.div animate={{ y: hovered ? -1 : 0 }} className="p-2 rounded-lg bg-[#0E0E0E] border border-emerald-500/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-[#FAFAFA] font-medium">Head v3</span>
                </div>
                <span className="text-[9px] font-mono text-[#6B6B6B]">Just now</span>
              </motion.div>
              <div className="p-2 rounded-lg bg-[#141414] border border-[#1F1F1F] flex items-center justify-between text-[#6B6B6B] text-[10px]">
                <span>Snapshot v2</span>
                <span className="text-[9px] text-[#FAFAFA] bg-white/10 px-1.5 py-0.5 rounded">Revert</span>
              </div>
            </div>
          </div>
        );
      case 'rocket-party-popper':
      case 'achievement-reveal':
        return (
          <div className="h-52 w-full flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="scale-[0.72] origin-center shrink-0 flex items-center justify-center">
              <RocketPartyPopper
                defaultLaunched={hovered}
                title="Launch Complete"
                description="Milestone celebrated."
                metric="59 Components"
              />
            </div>
          </div>
        );
      case 'branching-submenu':
        return (
          <div className="h-52 flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <div className="w-[420px] shrink-0 origin-center scale-[0.80] flex justify-center">
              <BranchingSubmenu className="w-full shadow-none" />
            </div>
          </div>
        );
      case 'mac-os-folder-cards':
      case 'macos-folder-cards':
      case 'velocity-aware-scroll-cards':
        return (
          <div className="h-52 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="scale-[0.80] origin-center shrink-0 flex items-center justify-center">
              <MacOSFolderCards isPeeked={hovered} className="min-h-0" />
            </div>
          </div>
        );
      case 'gravity-particle-burst':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <GravityParticleBurst particleCount={18}>Burst</GravityParticleBurst>
            </div>
          </div>
        );
      case 'liquid-ripple-button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <LiquidRippleButton variant="secondary">Generate</LiquidRippleButton>
            </div>
          </div>
        );
      case 'neon-edge-button':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <NeonEdgeButton>Deploy</NeonEdgeButton>
            </div>
          </div>
        );
      case 'orbital-loading-ring':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <OrbitalLoadingRing size={64} variant={hovered ? 'dense' : 'default'} label="Loading preview" />
          </div>
        );
      case 'pill-navigation':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <div className="pointer-events-none scale-90">
              <PillNavigation defaultValue={hovered ? 'motion' : 'overview'} />
            </div>
          </div>
        );
      case 'text-scramble-decoder':
        return (
          <div className="h-52 flex items-center justify-center p-4">
            <TextScrambleDecoder
              key={hovered ? 'hovered' : 'idle'}
              text="EASYUI.SYNCED"
              trigger="mount"
              duration={650}
              className="text-xs"
            />
          </div>
        );
      case 'intro-loader':
        return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            <IntroLoader fullScreen={false} key={hovered ? 'hovered' : 'idle'} className="h-32 rounded-xl shadow-none border-none" />
          </div>
        );

      default:
        return (
          <div className="h-52 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-semibold text-[#FAFAFA] mb-1">{comp.name}</span>
            <span className="text-[11px] text-[#6B6B6B] line-clamp-2 max-w-[200px]">{comp.tagline}</span>
          </div>
        );
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onSelect(component.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onSelect(component.id);
    }
  };

  return (
    <a
      href={`/components/${component.id}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={cn(
        'group relative block rounded-[20px] border-[1.5px] border-[#1c1c1c] bg-[#080808] p-2 hover:border-[#2a2a2a] hover:shadow-[0_16px_48px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {/* Inset Live Preview Box — large, deep, "carved" surface */}
      <div className="relative rounded-2xl bg-[#0c0c0c] border border-[#161616] overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col justify-center">
        {/* Subtle Copy CLI Button (Reveals on card hover) — minimal, ghost-like */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={handleCopyCLI}
            className="p-1.5 rounded-md bg-black/60 backdrop-blur border border-white/10 text-[#525252] hover:text-white hover:border-white/30 transition-colors focus-ring"
            title="Copy CLI command"
            aria-label={`Copy CLI command for ${component.name}`}
          >
            {copied ? (
              <Check className="w-3 h-3 text-white" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>

        {renderPreview(component, isHovered)}
      </div>

      {/* Component Footer — large title, prominent persistent arrow */}
      <div className="pt-5 pb-2 px-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-[#E5E5E5] group-hover:text-white transition-colors truncate">
            {component.name}
          </h3>
          {showNew && <NewBadge size="xs" />}
        </div>
        <ArrowUpRight
          className="w-5 h-5 text-[#9A9A9A] group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
          strokeWidth={2}
        />
      </div>
    </a>
  );
};
