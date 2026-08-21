import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Terminal,
  Code2,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import type { EasyComponentMeta } from '../../types/component';
import { motionTransitions } from '../../lib/motion-tokens';
import { cn, copyToClipboard } from '../../lib/utils';
import { useComponentSource } from '../../lib/source-loader';
import { useFocusTrap } from '../../lib/hooks/useFocusTrap';
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
import { InteractiveTimeline } from '../ui/InteractiveTimeline';
import { SmartComparison } from '../ui/SmartComparison';
import { ActivityFeed } from '../ui/ActivityFeed';
import { MetricHUD } from '../ui/MetricHUD';
import { CodeSnippetDeck } from '../ui/CodeSnippetDeck';
import { GlassNavbar } from '../ui/GlassNavbar';
import { Button } from '../ui/Button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Input,
  Select,
  Checkbox,
  Switch,
} from '../ui/Form';
import { Login } from '../ui/Login';
import { SignUp } from '../ui/SignUp';
import { FAQ } from '../ui/FAQ';
import { PaymentReceiptPrinter } from '../ui/PaymentReceiptPrinter';
import { ParticleDelete } from '../ui/ParticleDelete';
import { AnimatedFileUpload } from '../ui/AnimatedFileUpload';
import { PaymentStatus } from '../ui/PaymentStatus';
import { UndoToast } from '../ui/UndoToast';
import { ExpandableDataRow } from '../ui/ExpandableDataRow';
import { ScrollProgressNav } from '../ui/ScrollProgressNav';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { SpotlightSearch } from '../ui/SpotlightSearch';
import { MorphingButton } from '../ui/MorphingButton';
import { DragToConfirm } from '../ui/DragToConfirm';
import { PeekCard } from '../ui/PeekCard';
import { SelectionBasket } from '../ui/SelectionBasket';
import { FocusMode } from '../ui/FocusMode';

export interface ComponentDetailModalProps {
  component: EasyComponentMeta | null;
  onClose: () => void;
  onSelectComponent?: (id: string) => void;
}

type TabType = 'preview' | 'usage' | 'install' | 'source' | 'api' | 'a11y';
type PkgManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

const AnimatedNumberShowcase: React.FC = () => {
  const [revenue, setRevenue] = useState(12450);
  const [growth, setGrowth] = useState(24.5);
  const [isLiveTicker, setIsLiveTicker] = useState(false);

  useEffect(() => {
    if (!isLiveTicker) return;
    const interval = setInterval(() => {
      setRevenue((prev) => prev + Math.floor(Math.random() * 350) + 50);
      setGrowth((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.15)).toFixed(1)));
    }, 1800);
    return () => clearInterval(interval);
  }, [isLiveTicker]);

  return (
    <div className="py-6 w-full max-w-lg mx-auto space-y-4 select-none px-2">
      {/* Top Main Hero Metric */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0A0A] border border-[#1E1E1E] text-center space-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">Live Production ARR</span>
        <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-center justify-center">
          <AnimatedNumber value={revenue} prefix="$" useGrouping />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
          <span>+</span>
          <AnimatedNumber value={growth} suffix="%" decimals={1} />
          <span className="text-[#666666]">annualized expansion</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-3.5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-3">
        <div className="text-xs font-medium text-[#D4D4D4] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#737373]">Live Playground</span>
          <button
            type="button"
            onClick={() => setIsLiveTicker(!isLiveTicker)}
            className={cn(
              'px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors flex items-center gap-1.5 cursor-pointer',
              isLiveTicker
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[#141414] border-[#222222] text-[#808080] hover:text-white'
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', isLiveTicker ? 'bg-emerald-400 animate-pulse' : 'bg-[#666666]')} />
            {isLiveTicker ? 'Ticker Active' : 'Simulate Ticker'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRevenue((prev) => prev + 1000)}
            className="px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#1A1A1A] border border-[#1E1E1E] text-xs font-mono text-[#E5E5E5] hover:border-[#2E2E2E] transition-colors text-center cursor-pointer"
          >
            +$1,000
          </button>
          <button
            type="button"
            onClick={() => setRevenue((prev) => Math.max(100, prev - 500))}
            className="px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#1A1A1A] border border-[#1E1E1E] text-xs font-mono text-[#E5E5E5] hover:border-[#2E2E2E] transition-colors text-center cursor-pointer"
          >
            -$500
          </button>
          <button
            type="button"
            onClick={() => setRevenue(Math.floor(Math.random() * 88000) + 12000)}
            className="px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#1A1A1A] border border-[#1E1E1E] text-xs font-mono text-[#E5E5E5] hover:border-[#2E2E2E] transition-colors text-center cursor-pointer"
          >
            Randomize
          </button>
          <button
            type="button"
            onClick={() => {
              setRevenue(12450);
              setGrowth(24.5);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#1A1A1A] border border-[#1E1E1E] text-xs font-mono text-[#737373] hover:text-white transition-colors text-center cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const ScrollProgressNavShowcase: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sections = [
    { id: 'sec-overview-modal', index: '01', label: 'Overview' },
    { id: 'sec-architecture-modal', index: '02', label: 'Architecture' },
    { id: 'sec-components-modal', index: '03', label: 'Components' },
    { id: 'sec-telemetry-modal', index: '04', label: 'Telemetry' },
    { id: 'sec-pricing-modal', index: '05', label: 'Pricing' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between px-1 text-xs text-[#737373] font-mono">
        <span>Simulated Scroll Viewport</span>
        <span>Scroll or click pills to test navigation</span>
      </div>

      {/* Simulated Scrollable Container */}
      <div className="relative rounded-2xl border border-[#202020] bg-[#070707] overflow-hidden shadow-2xl">
        {/* Floating / Sticky Nav inside container */}
        <div className="p-3 sticky top-0 z-30 bg-[#070707]/90 backdrop-blur-md border-b border-[#141414] flex justify-center">
          <ScrollProgressNav
            mode="inline"
            sections={sections}
            containerRef={containerRef}
          />
        </div>

        {/* Scrollable Content Body */}
        <div
          ref={containerRef}
          className="h-[300px] overflow-y-auto p-5 space-y-6 scroll-smooth"
        >
          <div id="sec-overview-modal" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">01 Overview</span>
            <h4 className="text-sm font-semibold text-white">Edge First Motion Architecture</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              EasyUI is engineered from the ground up for minimal latency, zero-jank spring physics, and Apple-grade micro interactions.
            </p>
          </div>

          <div id="sec-architecture-modal" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">02 Architecture</span>
            <h4 className="text-sm font-semibold text-white">Monochrome Slate Design Tokens</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Strict grayscale elevation hierarchy using #050505 canvas, #0A0A0A surface, and calibrated 1px borders.
            </p>
          </div>

          <div id="sec-components-modal" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">03 Components</span>
            <h4 className="text-sm font-semibold text-white">36 Production UI Elements</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Every component supports keyboard shortcuts, touch gestures, screen-reader semantics, and prefers-reduced-motion.
            </p>
          </div>

          <div id="sec-telemetry-modal" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">04 Telemetry</span>
            <h4 className="text-sm font-semibold text-white">Real-Time Event Streams</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Sub-millisecond latency tracking and automated canary deployments across 32 regional edge nodes worldwide.
            </p>
          </div>

          <div id="sec-pricing-modal" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">05 Pricing</span>
            <h4 className="text-sm font-semibold text-white">Open Source & Free Forever</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Install any component with the CLI. No subscriptions, no lock-in, 100% copy-pasteable TypeScript code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectionBasketShowcase: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['item-1', 'item-3']);
  const items = [
    { id: 'item-1', name: 'invoice_oct_2026.pdf', size: '2.4 MB', type: 'PDF' },
    { id: 'item-2', name: 'design_system_tokens.json', size: '84 KB', type: 'JSON' },
    { id: 'item-3', name: 'customer_churn_analytics.csv', size: '1.8 MB', type: 'CSV' },
    { id: 'item-4', name: 'production_ssl_certificates.pem', size: '12 KB', type: 'KEY' },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto min-h-[340px] pb-16 p-4 rounded-2xl border border-[#202020] bg-[#070707] flex flex-col justify-between select-none">
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-[#737373] font-mono">
          <span>Select items to trigger bottom toolbar</span>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-[11px] text-[#A1A1A1] hover:text-white transition-colors underline underline-offset-2"
          >
            {selectedIds.length === items.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="space-y-1.5">
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={cn(
                  'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
                  isChecked
                    ? 'bg-[#121212] border-[#2A2A2A] text-white shadow-sm'
                    : 'bg-[#0B0B0B] border-[#181818] text-[#808080] hover:bg-[#0E0E0E] hover:text-[#D4D4D4]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                      isChecked
                        ? 'bg-white border-white text-black'
                        : 'border-[#333333] bg-[#141414]'
                    )}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-mono">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#666666]">
                  <span>{item.type}</span>
                  <span>·</span>
                  <span>{item.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Docked Selection Basket in contained mode */}
      <SelectionBasket
        mode="contained"
        selectedCount={selectedIds.length}
        totalCount={items.length}
        onClearSelection={() => setSelectedIds([])}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

const SpotlightSearchShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-8 w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#181818] border border-[#222222] text-xs font-mono text-[#D4D4D4] flex items-center gap-3 transition-colors hover:border-[#333333] shadow-lg"
      >
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-white">⌘K</kbd>
        <span>or click to open Spotlight Search</span>
      </button>
      <p className="text-xs text-[#666666] font-mono">Keyboard-driven overlay with instant fuzzy filter and smooth spring highlight</p>
      <SpotlightSearch
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
};

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const { sourceCode: loadedSourceCode } = useComponentSource(
    component?.id || '',
    activeTab === 'source' || activeTab === 'install'
  );
  const effectiveSourceCode = loadedSourceCode || component?.sourceCode || '';
  const modalRef = useFocusTrap<HTMLDivElement>({ isOpen: Boolean(component), onClose });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [installMode, setInstallMode] = useState<'cli' | 'manual'>('cli');
  const [pkgManager, setPkgManager] = useState<PkgManager>('pnpm');

  useEffect(() => {
    if (component) {
      setActiveTab('preview');
      setIsFullscreenPreview(false);
      setInstallMode('cli');
    }
  }, [component]);

  useEffect(() => {
    if (!component) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreenPreview) {
          setIsFullscreenPreview(false);
          return;
        }
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [component, onClose, isFullscreenPreview]);

  if (!component) return null;

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getInstallDepCommand = () => {
    const deps = component.dependencies || [];
    if (deps.length === 0) return '';
    const depStr = deps.join(' ');
    switch (pkgManager) {
      case 'npm':
        return `npm install ${depStr}`;
      case 'yarn':
        return `yarn add ${depStr}`;
      case 'bun':
        return `bun add ${depStr}`;
      case 'pnpm':
      default:
        return `pnpm add ${depStr}`;
    }
  };

  const tabs: Array<{ id: TabType; label: string }> = [
    { id: 'preview', label: 'Preview' },
    { id: 'usage', label: 'Usage' },
    { id: 'install', label: 'Installation' },
    { id: 'source', label: 'Source' },
    { id: 'api', label: 'Props API' },
    { id: 'a11y', label: 'Accessibility' },
  ];

  const renderInteractiveDemo = () => {
    switch (component.id) {
      case 'interactive-timeline':
        return (
          <div className="w-full">
            <InteractiveTimeline
              items={[
                {
                  id: 'step-1',
                  title: 'Build & Tree-Shaking Verification',
                  timestamp: '10:42 AM · 48s',
                  status: 'completed',
                  tag: 'CI/CD',
                  commitHash: '9f8a12bc',
                  description: 'Production bundle analyzed with zero unreferenced dead code. All chunks under budget.',
                  metrics: [
                    { label: 'Bundle Size', value: '142 KB' },
                    { label: 'Tree Shake', value: '99.4%' },
                    { label: 'Chunks', value: '8 total' },
                  ],
                  author: { name: 'Alex Rivera', role: 'Staff Eng' },
                },
                {
                  id: 'step-2',
                  title: 'Global Edge Layer Replication',
                  timestamp: '10:43 AM · In Progress',
                  status: 'in-progress',
                  tag: 'Infra',
                  commitHash: 'a81d4e77',
                  description: 'Replicating immutable build layers across 32 regional edge locations worldwide.',
                  metrics: [
                    { label: 'Active Edge Nodes', value: '28 / 32' },
                    { label: 'Edge Latency', value: '12 ms' },
                  ],
                  author: { name: 'Infra Bot', role: 'Automated' },
                },
                {
                  id: 'step-3',
                  title: 'Synthetic Canary Smoke Suite',
                  timestamp: 'Pending · 120s est',
                  status: 'pending',
                  tag: 'QA',
                  description: 'Executes 400 parallel headless browser journeys verifying checkout, auth, and webhooks.',
                },
                {
                  id: 'step-4',
                  title: 'Atomic DNS Traffic Cutover',
                  timestamp: 'Pending',
                  status: 'pending',
                  tag: 'DNS',
                  description: 'Zero-downtime blue/green routing switch to the freshly certified edge release.',
                },
              ]}
              defaultSelectedId="step-2"
            />
          </div>
        );
      case 'smart-comparison':
        return (
          <div className="w-full">
            <SmartComparison
              plans={[
                {
                  id: 'hobby',
                  name: 'Hobby',
                  tagline: 'Ideal for prototyping & indie hackers',
                  price: '$0',
                  billingPeriod: 'mo',
                  ctaText: 'Deploy Free',
                },
                {
                  id: 'pro',
                  name: 'Pro Team',
                  tagline: 'High concurrency & edge bandwidth',
                  price: '$29',
                  billingPeriod: 'mo',
                  featured: true,
                  badge: 'Popular',
                  ctaText: 'Start 14-Day Trial',
                },
                {
                  id: 'enterprise',
                  name: 'Enterprise',
                  tagline: 'Dedicated compliance & custom SLAs',
                  price: '$249',
                  billingPeriod: 'mo',
                  ctaText: 'Contact Sales',
                },
              ]}
              categories={[
                {
                  id: 'compute',
                  title: 'Compute & Edge Performance',
                  features: [
                    {
                      id: 'concurrency',
                      name: 'Serverless Concurrency',
                      description: 'Simultaneous function invocations across regions',
                      values: { hobby: '10 nodes', pro: '250 nodes', enterprise: 'Unlimited' },
                    },
                    {
                      id: 'edge_routes',
                      name: 'Global Edge Routing',
                      description: 'Low-latency routing from 300+ PoPs worldwide',
                      values: { hobby: false, pro: true, enterprise: true },
                    },
                    {
                      id: 'warm_standby',
                      name: '0ms Cold Start Standby',
                      description: 'Keeps microVMs warm in background',
                      values: { hobby: false, pro: false, enterprise: true },
                    },
                  ],
                },
                {
                  id: 'security',
                  title: 'Security & Governance',
                  features: [
                    {
                      id: 'sso',
                      name: 'SAML / Okta SSO',
                      description: 'Enterprise identity provider federation',
                      values: { hobby: false, pro: true, enterprise: true },
                    },
                    {
                      id: 'audit_logs',
                      name: 'Immutable Audit Logs',
                      description: 'Cryptographically verified audit trail retention',
                      values: { hobby: '7 days', pro: '90 days', enterprise: '7 years' },
                    },
                    {
                      id: 'custom_domains',
                      name: 'Custom SSL Domains',
                      values: { hobby: '3', pro: '50', enterprise: 'Unlimited' },
                    },
                  ],
                },
              ]}
            />
          </div>
        );
      case 'activity-feed':
        return (
          <div className="w-full">
            <ActivityFeed
              events={[
                {
                  id: 'evt-1',
                  type: 'deploy',
                  status: 'success',
                  title: 'Production release v2.4.0 verified',
                  timestamp: '2 mins ago',
                  duration: '380ms',
                  traceId: 'trc_98fa20',
                  description: 'All 32 edge clusters updated. Zero errors encountered.',
                  actor: { name: 'CI Pipeline', email: 'ci@easyui.dev' },
                  payload: { version: '2.4.0', sha: '8f3b2a', regions: ['iad1', 'sfo1', 'fra1'] },
                },
                {
                  id: 'evt-2',
                  type: 'security',
                  status: 'warning',
                  title: 'Token rotation required for API key',
                  timestamp: '14 mins ago',
                  duration: '12ms',
                  traceId: 'trc_77b31c',
                  description: 'Secret key has exceeded 90-day recommended rotation window.',
                  actor: { name: 'Security Guard' },
                  payload: { keyId: 'key_prod_8819', ageDays: 92, action: 'notify' },
                },
                {
                  id: 'evt-3',
                  type: 'api',
                  status: 'success',
                  title: 'POST /v1/chat/completions 200 OK',
                  timestamp: '28 mins ago',
                  duration: '22ms',
                  traceId: 'trc_55e10a',
                  description: 'Streaming token generation handled with 0.12s first-byte latency.',
                  actor: { name: 'External Client' },
                  payload: { model: 'easy-4o', promptTokens: 140, completionTokens: 420 },
                },
                {
                  id: 'evt-4',
                  type: 'system',
                  status: 'info',
                  title: 'Automatic DB snapshot created',
                  timestamp: '1 hour ago',
                  duration: '4.2s',
                  traceId: 'trc_12a98f',
                  description: 'Encrypted backup stored in multi-AZ cold storage.',
                },
              ]}
              enableLiveSimulation={true}
            />
          </div>
        );
      case 'metric-hud':
        return (
          <div className="w-full">
            <MetricHUD
              metrics={[
                {
                  id: 'latency',
                  label: 'p99 API Latency',
                  value: '14.2',
                  unit: 'ms',
                  delta: { value: '-18.4%', trend: 'down', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [18, 17, 16.5, 15, 14.8, 14.2],
                    '24h': [26, 24, 21, 19, 18, 16, 14.2],
                    '7d': [34, 31, 28, 24, 20, 16, 14.2],
                    '30d': [45, 38, 32, 28, 22, 18, 14.2],
                  },
                },
                {
                  id: 'throughput',
                  label: 'Global Throughput',
                  value: '84.5k',
                  unit: 'req/s',
                  delta: { value: '+12.1%', trend: 'up', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [62, 68, 72, 75, 81, 84.5],
                    '24h': [40, 52, 65, 74, 80, 84.5],
                    '7d': [30, 45, 60, 70, 78, 84.5],
                    '30d': [20, 35, 50, 65, 75, 84.5],
                  },
                },
                {
                  id: 'errors',
                  label: 'Error Rate',
                  value: '0.002',
                  unit: '%',
                  delta: { value: '-0.04%', trend: 'down', isPositiveGood: true },
                  status: 'normal',
                  timeSeries: {
                    '1h': [0.008, 0.006, 0.005, 0.003, 0.002],
                    '24h': [0.012, 0.009, 0.006, 0.004, 0.002],
                    '7d': [0.02, 0.015, 0.01, 0.005, 0.002],
                    '30d': [0.05, 0.03, 0.018, 0.008, 0.002],
                  },
                },
              ]}
              defaultTimeRange="24h"
            />
          </div>
        );
      case 'code-snippet-deck':
        return (
          <div className="w-full">
            <CodeSnippetDeck
              snippets={[
                {
                  language: 'typescript',
                  label: 'TypeScript',
                  filename: 'client.ts',
                  highlightLines: [4, 5],
                  code: (p) => `import { EasyClient } from "@easyui/sdk";

// Initialize resilient client
const client = new EasyClient({
  apiKey: "${p.apiKey || 'sk_live_9981'}",
  environment: "${p.env || 'production'}",
  streaming: ${p.stream ? 'true' : 'false'},
});

// Stream AI generation with zero layout shift
const completion = await client.completions.create({
  model: "easy-4o",
  prompt: "Synthesize dark UI telemetry dashboard",
});`,
                },
                {
                  language: 'curl',
                  label: 'cURL',
                  filename: 'stream.sh',
                  highlightLines: [2],
                  code: (p) => `curl -X POST https://api.easyui.dev/v1/completions \\
  -H "Authorization: Bearer ${p.apiKey || 'sk_live_9981'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "easy-4o",
    "environment": "${p.env || 'production'}",
    "stream": ${p.stream ? 'true' : 'false'}
  }'`,
                },
                {
                  language: 'python',
                  label: 'Python',
                  filename: 'app.py',
                  highlightLines: [3, 4],
                  code: (p) => `from easyui import EasyClient

client = EasyClient(
    api_key="${p.apiKey || 'sk_live_9981'}",
    environment="${p.env || 'production'}"
)

stream = client.completions.create(
    model="easy-4o",
    prompt="Synthesize dark UI telemetry dashboard",
    stream=${p.stream ? 'True' : 'False'}
)
for chunk in stream:
    print(chunk.text, end="")`,
                },
                {
                  language: 'go',
                  label: 'Go',
                  filename: 'main.go',
                  code: (p) => `package main

import (
    "context"
    "fmt"
    "github.com/easyui/sdk-go"
)

func main() {
    client := easyui.NewClient("${p.apiKey || 'sk_live_9981'}")
    resp, err := client.Completions.Create(context.Background(), &easyui.CompletionParams{
        Model:  "easy-4o",
        Stream: ${p.stream ? 'true' : 'false'},
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Text)
}`,
                },
              ]}
              parameters={[
                { id: 'stream', label: 'Stream response', type: 'boolean', defaultValue: true },
                {
                  id: 'env',
                  label: 'Environment',
                  type: 'select',
                  defaultValue: 'production',
                  options: ['production', 'staging', 'development'],
                },
                { id: 'apiKey', label: 'API Key', type: 'text', defaultValue: 'sk_live_prod_9981' },
              ]}
              defaultLanguage="typescript"
            />
          </div>
        );
      case 'magnetic-button':
        return (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <MagneticButton variant="primary" size="lg" strength={0.4}>
              <span>Magnetic Button</span>
              <Sparkles className="w-4 h-4 text-[#ECECEC]" />
            </MagneticButton>
            <p className="text-xs text-[#6F6F6F]">Hover cursor around the button to test proximity pull</p>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="py-8 flex justify-center">
            <SpotlightCard className="max-w-md w-full p-6 bg-[#0E0E0E]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-white" />
                <h4 className="text-sm font-semibold text-[#F5F5F5]">Spotlight Shader</h4>
              </div>
              <p className="text-xs text-[#808080] leading-relaxed mb-4">
                Pointer-aware radial illumination calculating Euclidean coordinates in real time.
              </p>
              <div className="p-3 rounded-lg bg-[#141414] border border-[#222222] text-xs font-mono text-[#A1A1A1]">
                Coordinates: Hardware Accelerated
              </div>
            </SpotlightCard>
          </div>
        );
      case 'expandable-search':
        return (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <ExpandableSearch placeholder="Search components, tokens..." />
            <p className="text-xs text-[#6F6F6F]">Click input or focus to test smooth width expansion</p>
          </div>
        );
      case 'animated-tabs':
        return (
          <div className="py-8 flex flex-col items-center justify-center">
            <AnimatedTabs
              tabs={[
                { id: 'tab1', label: 'Overview', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Overview metrics & telemetry</div> },
                { id: 'tab2', label: 'Integration', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Next.js App Router setup</div> },
                { id: 'tab3', label: 'Security', content: <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">Zero external runtime network dependencies</div> },
              ]}
              defaultTab="tab1"
            />
          </div>
        );
      case 'floating-action-dock':
      case 'floating-dock':
        return (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <FloatingActionDock
              items={[
                { id: '1', label: 'VS Code', icon: <Code2 /> },
                { id: '2', label: 'Terminal', icon: <Terminal /> },
                { id: '3', label: 'AI Pilot', icon: <Sparkles /> },
                { id: '4', label: 'Security', icon: <ShieldCheck /> },
              ]}
              activeId="1"
            />
            <p className="text-xs text-[#6F6F6F]">Hover icons to test continuous magnification curve</p>
          </div>
        );
      case 'reveal-card':
        return (
          <div className="py-8 flex justify-center">
            <RevealCard
              revealContent={
                <div className="text-xs text-white space-y-1">
                  <div>✓ Latency: 0.12ms</div>
                  <div>✓ Region: us-east-1</div>
                </div>
              }
              className="max-w-sm w-full p-6 bg-[#0E0E0E]"
            >
              <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Interactive 3D Tilt</h4>
              <p className="text-xs text-[#808080]">Hover cursor to rotate perspective and reveal telemetry.</p>
            </RevealCard>
          </div>
        );
      case 'smooth-accordion':
        return (
          <div className="py-6 max-w-md mx-auto">
            <SmoothAccordion
              items={[
                { id: '1', title: 'Zero Layout Jank', content: 'Framer motion spring dynamics calculate natural content height interpolation.' },
                { id: '2', title: 'TypeScript Friendly', content: 'Fully typed props with strict accessibility compliance.' },
              ]}
              defaultOpen={['1']}
            />
          </div>
        );
      case 'notification-stack':
        return (
          <div className="py-6 flex justify-center">
            <NotificationStack maxVisible={3} />
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <MorphingDialog
              id="detail-morph"
              title="Authentication Settings"
              subtitle="Configure multi-factor tokens and OAuth2 providers."
              trigger={(open) => (
                <button
                  onClick={open}
                  className="px-5 py-2.5 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#383838] text-xs font-medium text-[#F5F5F5] transition-all"
                >
                  Open Morphing Dialog
                </button>
              )}
            >
              <div className="p-4 rounded-xl bg-[#141414] border border-[#222222] text-xs text-[#A1A1A1]">
                Continuous layoutId expansion without jarring modal popping.
              </div>
            </MorphingDialog>
            <p className="text-xs text-[#6F6F6F]">Click trigger to see smooth shared layout transition</p>
          </div>
        );
      case 'command-menu':
        return (
          <div className="py-10 text-center">
            <p className="text-xs text-[#A1A1A1] mb-3">Press <kbd className="px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] font-mono text-white">⌘K</kbd> anywhere on the page to open.</p>
          </div>
        );
      case 'glass-navbar':
        return (
          <div className="py-6 w-full space-y-4">
            <div className="p-4 rounded-xl bg-[#070707] border border-[#1C1C1C] overflow-hidden">
              <p className="text-[11px] font-mono text-[#737373] mb-3 uppercase tracking-wider">
                Interactive Glass Navbar Demo (Responsive & Spring Physics)
              </p>
              <div className="relative py-2">
                <GlassNavbar
                  variant="floating"
                  sticky={false}
                  items={[
                    { label: 'Platform', href: '#platform' },
                    { label: 'Components', href: '#components', badge: 'New' },
                    { label: 'Showcase', href: '#showcase' },
                    { label: 'Documentation', href: '#docs' },
                  ]}
                  cta={
                    <button
                      type="button"
                      onClick={() => alert('CTA clicked!')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    >
                      Deploy Now
                    </button>
                  }
                />
              </div>
            </div>
            <p className="text-xs text-center text-[#6F6F6F]">
              Hover items to test spotlight cursor pill. Resize screen or click hamburger on mobile to test spring drawer.
            </p>
          </div>
        );
      case 'button':
        return (
          <div className="py-6 w-full space-y-6 max-w-xl mx-auto">
            <div className="p-5 rounded-xl bg-[#090909] border border-[#1D1D1D] space-y-4">
              <div className="text-xs font-semibold text-[#F5F5F5]">Visual Variants</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="gradient">Gradient</Button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#090909] border border-[#1D1D1D] space-y-4">
              <div className="text-xs font-semibold text-[#F5F5F5]">Sizes & Interactive Loading</div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large (lg)</Button>
                <Button
                  size="md"
                  variant="secondary"
                  isLoading={true}
                  loadingText="Processing..."
                >
                  Loading
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Sparkles"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-center text-[#6F6F6F]">
              Click buttons to experience Framer Motion springSnappy tap feedback (0.97 scale).
            </p>
          </div>
        );
      case 'form':
        return (
          <div className="py-4 max-w-md mx-auto w-full">
            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-4">
              <div className="text-sm font-semibold text-white">Interactive Form System</div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Form submitted successfully!');
                }}
                className="space-y-4"
              >
                <FormItem>
                  <FormLabel required>Project Name</FormLabel>
                  <FormControl>
                    <Input defaultValue="EasyUI Studio" placeholder="Enter project name" />
                  </FormControl>
                  <FormDescription>Visible across your team members.</FormDescription>
                </FormItem>

                <FormItem>
                  <FormLabel>Deployment Region</FormLabel>
                  <FormControl>
                    <Select
                      options={[
                        { value: 'us-east', label: 'US East (N. Virginia)' },
                        { value: 'eu-central', label: 'EU Central (Frankfurt)' },
                        { value: 'ap-southeast', label: 'Asia Pacific (Tokyo)' },
                      ]}
                    />
                  </FormControl>
                </FormItem>

                <div className="pt-1 space-y-3 border-t border-[#161616]">
                  <Checkbox label="Enable Edge Caching" defaultChecked />
                  <Switch label="Automatic TLS Certificates" defaultChecked />
                </div>

                <Button type="submit" variant="primary" fullWidth className="mt-2">
                  Save Configuration
                </Button>
              </Form>
            </div>
          </div>
        );
      case 'login':
        return (
          <div className="py-4 flex justify-center w-full">
            <Login
              onSubmit={(data) => {
                alert(`Login Attempt: ${JSON.stringify(data)}`);
              }}
              onForgotPassword={() => alert('Forgot password action')}
              onSignUpClick={() => alert('Switch to sign up')}
              onSocialLogin={(prov) => alert(`SSO provider: ${prov}`)}
            />
          </div>
        );
      case 'sign-up':
        return (
          <div className="py-4 flex justify-center w-full">
            <SignUp
              onSubmit={(data) => {
                alert(`Registration submitted: ${data.name} (${data.email})`);
              }}
              onSignInClick={() => alert('Switch to sign in')}
              onSocialSignUp={(prov) => alert(`Social sign up: ${prov}`)}
            />
          </div>
        );
      case 'faq':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <FAQ
              allowMultiple={true}
              searchable={true}
              showCategories={true}
              defaultOpen={['faq-1']}
              items={[
                {
                  id: 'faq-1',
                  question: 'How do I add EasyUI components to my existing project?',
                  answer: 'You can install any component directly using the official shadcn CLI: "npx shadcn@latest add Surajmaurya1/easyui/<component-name>". The source code and required dependencies are added directly to your repository.',
                  category: 'Installation',
                  badge: 'CLI',
                },
                {
                  id: 'faq-2',
                  question: 'What makes EasyUI animations feel natural?',
                  answer: 'EasyUI uses physical spring simulations rather than standard CSS bezier ease curves. Transitions are configured with calibrated mass, damping, and stiffness tokens defined in "lib/motion-tokens.ts".',
                  category: 'Animation',
                  badge: 'Physics',
                },
                {
                  id: 'faq-3',
                  question: 'Is EasyUI compatible with React 19 and Tailwind CSS?',
                  answer: 'Yes! EasyUI components are built natively with React 19, TypeScript, and modern Tailwind CSS utility classes.',
                  category: 'Stack',
                },
              ]}
            />
          </div>
        );
      case 'payment-receipt-printer':
        return (
          <div className="py-4 w-full flex justify-center">
            <PaymentReceiptPrinter
              merchant="EasyUI Store"
              merchantSubtext="Official Component Registry"
              orderNumber="#4821"
              items={[
                { name: 'EasyUI Pro License', price: '$200.00', quantity: 1, tag: 'Annual' },
                { name: 'Framer Motion Pack', price: '$20.00', quantity: 1, description: 'Micro-interactions & physics' },
              ]}
              subtotal="$220.00"
              total="$220.00"
              paymentMethod="Apple Pay •••• 4242"
              message="Thank you for your order!"
              autoPrint={true}
              showActions={true}
            />
          </div>
        );
      case 'dot-field':
        return (
          <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[#222222] bg-[#0A0A0A]">
            <DotField dotRadius={1.2} dotSpacing={20} gradientFrom="#818cf8" gradientTo="#c084fc" className="w-full h-80 rounded-2xl" />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/70 border border-[#222222] text-[11px] font-mono text-[#A1A1A1] backdrop-blur-sm pointer-events-none">
              Move cursor across canvas to test repulsion & glow
            </div>
          </div>
        );
      case 'particle-delete':
        return (
          <div className="py-2 w-full">
            <ParticleDelete />
          </div>
        );
      case 'animated-file-upload':
        return (
          <div className="py-4 w-full max-w-lg mx-auto">
            <AnimatedFileUpload
              multiple
              accept="image/*,application/pdf"
              maxSize={15 * 1024 * 1024}
              onFilesSelected={(files) => console.log('Selected:', files)}
              onUploadComplete={(file) => console.log('Uploaded:', file.name)}
            />
          </div>
        );
      case 'payment-status':
        return (
          <div className="py-4 w-full max-w-md mx-auto">
            <PaymentStatus
              amount="$149.00"
              status="success"
              transactionId="tx_9842a8d11c7f"
              paymentMethod="Apple Pay"
              last4="4242"
            />
          </div>
        );
      case 'undo-toast':
        return (
          <div className="py-8 w-full max-w-md mx-auto">
            <UndoToast
              open={true}
              title="Project archived"
              description="5 seconds remaining to restore project"
              duration={8000}
              onUndo={() => console.log('Undone')}
            />
          </div>
        );
      case 'expandable-data-row':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <ExpandableDataRow allowMultiple={false} defaultExpandedIds={['usr_01']} />
          </div>
        );
      case 'scroll-progress-nav':
        return <ScrollProgressNavShowcase />;
      case 'animated-number':
        return <AnimatedNumberShowcase />;
      case 'spotlight-search':
        return <SpotlightSearchShowcase />;
      case 'morphing-button':
        return (
          <div className="py-12 w-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MorphingButton status="idle" idleText="Save Changes" />
              <MorphingButton status="loading" loadingText="Saving..." />
              <MorphingButton status="success" successText="Saved ✓" />
              <MorphingButton status="error" errorText="Failed" variant="danger" />
            </div>
            <p className="text-xs text-[#666666]">Maintains physical shape & size across asynchronous state morphs</p>
          </div>
        );
      case 'drag-to-confirm':
        return (
          <div className="py-8 w-full max-w-md mx-auto space-y-4">
            <DragToConfirm
              actionType="delete"
              label="Slide to delete pipeline →"
              confirmedLabel="Pipeline Deleted ✓"
              onConfirm={() => console.log('Confirmed')}
            />
            <p className="text-xs text-center text-[#666666]">Physical resistance spring handle with tactile snapback</p>
          </div>
        );
      case 'peek-card':
        return (
          <div className="py-12 w-full flex flex-col items-center justify-center gap-4">
            <PeekCard
              data={{
                title: 'Payment #3948',
                subtitle: 'Stripe Direct Charge',
                amount: '$249.00',
                status: 'Succeeded',
                customer: {
                  name: 'Alexander Wright',
                  email: 'alex.w@acme-corp.com',
                },
                timestamp: 'Oct 24, 2026 at 2:15 PM',
                metadata: [
                  { label: 'Method', value: 'Mastercard •••• 4242' },
                  { label: 'Fee', value: '$7.52 (3%)' },
                  { label: 'Risk Score', value: 'Normal (08)' },
                ],
              }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#222222] text-xs font-mono text-white cursor-pointer transition-colors">
                Hover over: Payment #3948
              </span>
            </PeekCard>
            <p className="text-xs text-[#666666]">Contextual preview card emerging smoothly from trigger element</p>
          </div>
        );
      case 'selection-basket':
        return <SelectionBasketShowcase />;
      case 'focus-mode':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <FocusMode />
          </div>
        );
      default:
        return (
          <div className="py-12 text-center text-xs text-[#808080]">
            <p className="font-mono text-[#D4D4D4] mb-1">{component.name}</p>
            <p>{component.tagline || 'Interactive preview ready for customization.'}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={component.name}
    >
      {/* Backdrop with quiet blur so dotted background remains visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Main Dialog Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 6 }}
        transition={motionTransitions.springSnappy}
        className="relative w-full max-w-5xl h-[680px] sm:h-[740px] max-h-[90vh] rounded-2xl border border-[#202020] bg-[#0A0A0A] shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col z-10 overflow-hidden my-auto"
      >
        {/* Minimalist Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#1A1A1A] flex items-start justify-between gap-4 bg-[#0A0A0A] shrink-0">
          <div className="min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-[#666666]">
              <span>easyui</span>
              <span>/</span>
              <span className="text-[#A1A1A1] font-medium truncate">{component.id}</span>
            </div>

            {/* Component Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-[#F5F5F5] tracking-tight truncate">
              {component.name}
            </h2>
          </div>

          {/* Quick Header Actions (Copy Link & Close) */}
          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            <button
              type="button"
              onClick={() => {
                const compUrl = `${window.location.origin}/components/${component.id}`;
                handleCopy(compUrl, 'compUrl');
              }}
              className="p-2 rounded-lg text-[#737373] hover:text-[#F5F5F5] hover:bg-[#141414] border border-transparent hover:border-[#222222] transition-colors cursor-pointer focus-ring"
              title="Copy component link"
              aria-label="Copy component link"
            >
              {copiedCode === 'compUrl' ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#737373] hover:text-[#F5F5F5] hover:bg-[#141414] border border-transparent hover:border-[#222222] transition-colors cursor-pointer focus-ring"
              title="Close preview (Esc)"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Tab Bar */}
        <div className="px-4 sm:px-6 bg-[#080808] border-b border-[#1A1A1A] flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative px-3 sm:px-3.5 py-2.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap',
                  isActive ? 'text-[#F5F5F5]' : 'text-[#6F6F6F] hover:text-[#A1A1A1]'
                )}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId={`modal-active-tab-line-${component.id}`}
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-white rounded-full"
                    transition={motionTransitions.springSnappy}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body Viewport */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {/* TAB 1: PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-5">
              {/* Preview Stage */}
              <div className="relative rounded-xl border border-[#1C1C1C] bg-[#070707] min-h-[300px] sm:min-h-[360px] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreenPreview(true)}
                  className="absolute top-3 right-3 p-1.5 rounded-md text-[#737373] hover:text-white bg-[#121212]/80 hover:bg-[#1C1C1C] border border-[#222222] transition-colors cursor-pointer focus-ring"
                  title="Fullscreen preview"
                  aria-label="Fullscreen preview"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                <div className="w-full flex items-center justify-center">
                  {renderInteractiveDemo()}
                </div>
              </div>

              {/* Minimal Key Features List */}
              {component.features && component.features.length > 0 && (
                <div className="pt-1">
                  <h3 className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-2.5">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A1A1A1]">
                    {component.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#444444] mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: USAGE */}
          {activeTab === 'usage' && (
            <div className="space-y-5">
              {/* Import Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#888888] font-medium">Import component</span>
                  <button
                    type="button"
                    onClick={() => {
                      const importStmt = `import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`;
                      handleCopy(importStmt, 'import');
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-[#737373] hover:text-[#E5E5E5] transition-colors cursor-pointer"
                  >
                    {copiedCode === 'import' ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode === 'import' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-[#E5E5E5] overflow-x-auto">
                  <code>{`import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`}</code>
                </pre>
              </div>

              {/* Example Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#888888] font-medium">Example</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(component.usageCode, 'usage')}
                    className="flex items-center gap-1.5 text-[11px] text-[#737373] hover:text-[#E5E5E5] transition-colors cursor-pointer"
                  >
                    {copiedCode === 'usage' ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode === 'usage' ? 'Copied' : 'Copy Example'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-[380px] leading-relaxed scrollbar-thin">
                  <code>{component.usageCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: INSTALLATION */}
          {activeTab === 'install' && (
            <div className="space-y-5">
              {/* CLI / Manual Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#111111] border border-[#202020]">
                  <button
                    type="button"
                    onClick={() => setInstallMode('cli')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                      installMode === 'cli'
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-[#737373] hover:text-[#CCCCCC]'
                    )}
                  >
                    CLI
                  </button>
                  <button
                    type="button"
                    onClick={() => setInstallMode('manual')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                      installMode === 'manual'
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-[#737373] hover:text-[#CCCCCC]'
                    )}
                  >
                    Manual
                  </button>
                </div>

                {installMode === 'manual' && component.dependencies && component.dependencies.length > 0 && (
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as PkgManager[]).map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPkgManager(pm)}
                        className={cn(
                          'px-2 py-0.5 rounded transition-colors cursor-pointer',
                          pkgManager === pm
                            ? 'bg-[#1E1E1E] text-white'
                            : 'text-[#666666] hover:text-[#AAAAAA]'
                        )}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CLI Mode View */}
              {installMode === 'cli' && (
                <div className="space-y-4">
                  <p className="text-xs text-[#888888]">
                    Add the component directly to your project using the shadcn CLI:
                  </p>
                  <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] p-3.5 sm:p-4 flex items-center justify-between gap-3 font-mono text-xs text-[#E5E5E5]">
                    <span className="truncate">{component.cliCommand}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(component.cliCommand, 'cli')}
                      className="p-1.5 rounded-md text-[#737373] hover:text-white bg-[#141414] hover:bg-[#1E1E1E] border border-[#222222] transition-colors cursor-pointer shrink-0"
                      title="Copy CLI command"
                      aria-label="Copy CLI command"
                    >
                      {copiedCode === 'cli' ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Required Dependencies */}
                  <div className="pt-2">
                    <h4 className="text-xs font-semibold text-[#808080] uppercase tracking-wider mb-2">
                      Dependencies
                    </h4>
                    {component.dependencies && component.dependencies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {component.dependencies.map((dep) => (
                          <code
                            key={dep}
                            className="px-2.5 py-1 rounded-md bg-[#111111] border border-[#1E1E1E] font-mono text-[11px] text-[#D4D4D4]"
                          >
                            {dep}
                          </code>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#6F6F6F]">
                        No external npm dependencies required (standard Tailwind CSS only).
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Manual Mode View */}
              {installMode === 'manual' && (
                <div className="space-y-4">
                  {/* Step 1: Dependencies */}
                  {component.dependencies && component.dependencies.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888888] font-medium">1. Install dependencies</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(getInstallDepCommand(), 'deps')}
                          className="flex items-center gap-1.5 text-[11px] text-[#737373] hover:text-[#E5E5E5] transition-colors cursor-pointer"
                        >
                          {copiedCode === 'deps' ? (
                            <Check className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedCode === 'deps' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-[#E5E5E5] overflow-x-auto">
                        <code>{getInstallDepCommand()}</code>
                      </pre>
                    </div>
                  )}

                  {/* Step 2: Component Code */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#888888] font-medium">
                        {component.dependencies && component.dependencies.length > 0 ? '2. ' : '1. '}
                        Copy component code to <code className="font-mono text-[#D4D4D4]">components/ui/{component.id}.tsx</code>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(effectiveSourceCode, 'source-manual')}
                        className="flex items-center gap-1.5 text-[11px] text-[#737373] hover:text-[#E5E5E5] transition-colors cursor-pointer"
                      >
                        {copiedCode === 'source-manual' ? (
                          <Check className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedCode === 'source-manual' ? 'Copied' : 'Copy Source'}</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-[260px] leading-relaxed scrollbar-thin">
                      <code>{effectiveSourceCode}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SOURCE */}
          {activeTab === 'source' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#888888] text-[11px]">
                  components/ui/{component.id}.tsx
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(effectiveSourceCode, 'source')}
                  className="flex items-center gap-1.5 text-[11px] text-[#737373] hover:text-[#E5E5E5] transition-colors cursor-pointer"
                >
                  {copiedCode === 'source' ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCode === 'source' ? 'Copied' : 'Copy Source'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-[420px] leading-relaxed scrollbar-thin">
                <code>{effectiveSourceCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 5: PROPS API */}
          {activeTab === 'api' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-[#1E1E1E] overflow-hidden bg-[#070707]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0D0D0D] text-[#808080] border-b border-[#1E1E1E]">
                      <tr>
                        <th className="py-2.5 px-3.5 font-mono font-medium">Prop</th>
                        <th className="py-2.5 px-3.5 font-mono font-medium">Type</th>
                        <th className="py-2.5 px-3.5 font-mono font-medium">Default</th>
                        <th className="py-2.5 px-3.5 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#161616]">
                      {component.props.map((p, i) => (
                        <tr key={i} className="hover:bg-[#0E0E0E] transition-colors">
                          <td className="py-2.5 px-3.5 font-mono text-white font-medium">{p.name}</td>
                          <td className="py-2.5 px-3.5 font-mono text-[#8E8E8E]">{p.type}</td>
                          <td className="py-2.5 px-3.5 font-mono text-[#6F6F6F]">{p.default || '—'}</td>
                          <td className="py-2.5 px-3.5 text-[#A1A1A1] leading-relaxed">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ACCESSIBILITY */}
          {activeTab === 'a11y' && (
            <div className="space-y-3">
              <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] divide-y divide-[#161616]">
                {component.accessibility.map((item, i) => (
                  <div key={i} className="p-3.5 text-xs text-[#A1A1A1] flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-white mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Footer */}
        <div className="px-5 sm:px-6 py-3 bg-[#080808] border-t border-[#161616] flex items-center justify-between text-xs text-[#606060] shrink-0">
          <span className="hidden sm:inline">EasyUI Component Documentation</span>
          <span className="sm:hidden font-mono text-[11px]">easyui/{component.id}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-[#141414] hover:bg-[#1E1E1E] text-[#E5E5E5] text-xs font-medium transition-colors cursor-pointer border border-[#222222]"
          >
            Done
          </button>
        </div>
      </motion.div>

      {/* Fullscreen Component Playground Overlay */}
      <AnimatePresence>
        {isFullscreenPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] bg-[#070707] bg-dot-subtle flex flex-col overflow-y-auto"
          >
            {/* Minimal Fullscreen Header Bar */}
            <div className="sticky top-0 inset-x-0 z-[110] bg-[#070707]/90 border-b border-[#141414] backdrop-blur-md px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white truncate max-w-[160px] sm:max-w-none">
                  {component.name}
                </span>
                <span className="text-[10px] font-mono text-[#555555] hidden sm:inline">Live Stage</span>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreenPreview(false)}
                className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#202020] hover:border-[#333333] text-xs font-mono text-[#A1A1A1] hover:text-white transition-colors shrink-0 cursor-pointer"
                title="Exit Fullscreen Preview (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-sans">Exit</span>
                <kbd className="hidden sm:inline-flex text-[9px] font-mono px-1 py-0.2 rounded bg-[#161616] border border-[#282828] text-[#737373]">ESC</kbd>
              </button>
            </div>

            {/* Centered Fullscreen Demo */}
            <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-16 my-auto flex items-center justify-center">
              {renderInteractiveDemo()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComponentDetailModal;
