import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Terminal,
  Code2,
  Sparkles,
  ShieldCheck,
  Maximize2,
  ChevronRight,
  RefreshCw,
  Search,
  X,
  Sliders,
  Cpu,
  Home,
  Grid,
  FileCode,
  Menu,
} from 'lucide-react';
import type { EasyComponentMeta } from '../../types/component';
import { EASY_COMPONENTS } from '../registry/components-data';
import { cn, copyToClipboard } from '../../lib/utils';
import { isComponentNew, getNewestComponent } from '../../lib/components';
import { useComponentSource } from '../../lib/source-loader';
import { NewBadge } from '../common/NewBadge';

// UI components for live interactive demonstrations
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

export type MainTab = 'preview' | 'usage' | 'code' | 'props' | 'accessibility';
export type PkgManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export interface ComponentDetailPageProps {
  component: EasyComponentMeta;
  onSelectComponent: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateComponents: () => void;
  onNavigateDocs: (topicId?: string) => void;
}

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
    { id: 'sec-overview', index: '01', label: 'Overview' },
    { id: 'sec-architecture', index: '02', label: 'Architecture' },
    { id: 'sec-components', index: '03', label: 'Components' },
    { id: 'sec-telemetry', index: '04', label: 'Telemetry' },
    { id: 'sec-pricing', index: '05', label: 'Pricing' },
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
          <div id="sec-overview" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">01 Overview</span>
            <h4 className="text-sm font-semibold text-white">Edge First Motion Architecture</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              EasyUI is engineered from the ground up for minimal latency, zero-jank spring physics, and Apple-grade micro interactions.
            </p>
          </div>

          <div id="sec-architecture" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">02 Architecture</span>
            <h4 className="text-sm font-semibold text-white">Monochrome Slate Design Tokens</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Strict grayscale elevation hierarchy using #050505 canvas, #0A0A0A surface, and calibrated 1px borders.
            </p>
          </div>

          <div id="sec-components" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">03 Components</span>
            <h4 className="text-sm font-semibold text-white">36 Production UI Elements</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Every component supports keyboard shortcuts, touch gestures, screen-reader semantics, and prefers-reduced-motion.
            </p>
          </div>

          <div id="sec-telemetry" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">04 Telemetry</span>
            <h4 className="text-sm font-semibold text-white">Real-Time Event Streams</h4>
            <p className="text-xs text-[#808080] leading-relaxed">
              Sub-millisecond latency tracking and automated canary deployments across 32 regional edge nodes worldwide.
            </p>
          </div>

          <div id="sec-pricing" className="p-5 rounded-xl bg-[#0C0C0C] border border-[#181818] space-y-2">
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

export const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({
  component,
  onSelectComponent,
  onNavigateHome,
  onNavigateComponents,
  onNavigateDocs,
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('preview');
  const { sourceCode: loadedSourceCode } = useComponentSource(component.id, activeTab === 'code');
  const effectiveSourceCode = loadedSourceCode || component.sourceCode || '';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [pkgManager, setPkgManager] = useState<PkgManager>('pnpm');
  const [installMode, setInstallMode] = useState<'cli' | 'manual'>('cli');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [demoKey, setDemoKey] = useState(0);
  const [isCopiedCli, setIsCopiedCli] = useState(false);

  // Reset tab and scroll top on component change
  useEffect(() => {
    setActiveTab('preview');
    setIsFullscreenPreview(false);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [component.id]);

  // Handle ESC for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenPreview) {
        setIsFullscreenPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenPreview]);

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyCli = () => {
    copyToClipboard(component.cliCommand);
    setIsCopiedCli(true);
    setTimeout(() => setIsCopiedCli(false), 2000);
  };

  // Calculate newest component for unified 'New' badge synchronisation
  const newestComponent = useMemo(() => getNewestComponent(EASY_COMPONENTS), []);

  // Filtered components list for the sidebar
  const filteredComponents = useMemo(() => {
    return EASY_COMPONENTS.filter(
      (i) =>
        !sidebarFilter ||
        i.name.toLowerCase().includes(sidebarFilter.toLowerCase()) ||
        i.category.toLowerCase().includes(sidebarFilter.toLowerCase())
    );
  }, [sidebarFilter]);

  // Related components from same or other categories
  const relatedComponents = useMemo(() => {
    return EASY_COMPONENTS.filter(
      (c) => c.id !== component.id && c.category === component.category
    ).slice(0, 3);
  }, [component]);

  const getInstallDepCommand = () => {
    const deps = component.dependencies || [];
    if (deps.length === 0) return 'npm install';
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

  const renderInteractiveDemo = () => {
    switch (component.id) {
      case 'interactive-timeline':
        return (
          <div className="w-full">
            <InteractiveTimeline
              key={demoKey}
              items={[
                {
                  id: 'step-1',
                  title: 'Build & Tree-Shaking Verification',
                  timestamp: '10:42 AM · 48s',
                  status: 'completed',
                  tag: 'CI/CD',
                  commitHash: '9f8a12bc',
                  description:
                    'Production bundle analyzed with zero unreferenced dead code. All chunks under budget.',
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
                  description:
                    'Replicating immutable build layers across 32 regional edge locations worldwide.',
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
                  description:
                    'Executes 400 parallel headless browser journeys verifying checkout, auth, and webhooks.',
                },
                {
                  id: 'step-4',
                  title: 'Atomic DNS Traffic Cutover',
                  timestamp: 'Pending',
                  status: 'pending',
                  tag: 'DNS',
                  description:
                    'Zero-downtime blue/green routing switch to the freshly certified edge release.',
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
              key={demoKey}
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
              key={demoKey}
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
              ]}
              enableLiveSimulation={true}
            />
          </div>
        );
      case 'metric-hud':
        return (
          <div className="w-full">
            <MetricHUD
              key={demoKey}
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
              key={demoKey}
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
              ]}
              defaultLanguage="typescript"
            />
          </div>
        );
      case 'magnetic-button':
        return (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <MagneticButton key={demoKey} variant="primary" size="lg" strength={0.4}>
              <span>Magnetic Button</span>
              <Sparkles className="w-4 h-4 text-[#ECECEC]" />
            </MagneticButton>
            <p className="text-xs text-[#6F6F6F]">Hover cursor around button to test magnetic pull</p>
          </div>
        );
      case 'spotlight-card':
        return (
          <div className="py-8 flex justify-center">
            <SpotlightCard key={demoKey} className="max-w-md w-full p-6 bg-[#0E0E0E]">
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
            <ExpandableSearch key={demoKey} placeholder="Search components, tokens..." />
            <p className="text-xs text-[#6F6F6F]">Click input or focus to test smooth width expansion</p>
          </div>
        );
      case 'animated-tabs':
        return (
          <div className="py-8 flex flex-col items-center justify-center">
            <AnimatedTabs
              key={demoKey}
              tabs={[
                {
                  id: 'tab1',
                  label: 'Overview',
                  content: (
                    <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">
                      Overview metrics & telemetry
                    </div>
                  ),
                },
                {
                  id: 'tab2',
                  label: 'Integration',
                  content: (
                    <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">
                      Next.js App Router setup
                    </div>
                  ),
                },
                {
                  id: 'tab3',
                  label: 'Security',
                  content: (
                    <div className="text-xs text-[#A1A1A1] p-4 bg-[#121212] rounded-xl border border-[#222222]">
                      Zero external runtime network dependencies
                    </div>
                  ),
                },
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
              key={demoKey}
              items={[
                { id: '1', label: 'VS Code', icon: <Code2 /> },
                { id: '2', label: 'Terminal', icon: <Terminal /> },
                { id: '3', label: 'AI Pilot', icon: <Sparkles /> },
                { id: '4', label: 'Security', icon: <ShieldCheck /> },
              ]}
              activeId="1"
            />
            <p className="text-xs text-[#6F6F6F]">Hover icons to test magnification curve</p>
          </div>
        );
      case 'reveal-card':
        return (
          <div className="py-8 flex justify-center">
            <RevealCard
              key={demoKey}
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
          <div className="py-6 max-w-md mx-auto w-full">
            <SmoothAccordion
              key={demoKey}
              items={[
                {
                  id: '1',
                  title: 'Zero Layout Jank',
                  content:
                    'Framer motion spring dynamics calculate natural content height interpolation.',
                },
                {
                  id: '2',
                  title: 'TypeScript Friendly',
                  content: 'Fully typed props with strict accessibility compliance.',
                },
              ]}
              defaultOpen={['1']}
            />
          </div>
        );
      case 'notification-stack':
        return (
          <div className="py-6 flex justify-center">
            <NotificationStack key={demoKey} maxVisible={3} />
          </div>
        );
      case 'morphing-dialog':
        return (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <MorphingDialog
              key={demoKey}
              id="detail-morph"
              title="Authentication Settings"
              subtitle="Configure multi-factor tokens and OAuth2 providers."
              trigger={(open) => (
                <button
                  onClick={open}
                  className="px-5 py-2.5 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#383838] text-xs font-medium text-[#F5F5F5] transition-all cursor-pointer"
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
            <p className="text-xs text-[#A1A1A1] mb-3">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#181818] border border-[#262626] font-mono text-white">⌘K</kbd> anywhere on the page to open.
            </p>
          </div>
        );
      case 'glass-navbar':
        return (
          <div className="py-6 w-full space-y-4">
            <div className="p-4 rounded-xl bg-[#070707] border border-[#1C1C1C] overflow-hidden">
              <div className="relative py-2">
                <GlassNavbar
                  key={demoKey}
                  variant="floating"
                  sticky={false}
                  items={[
                    { label: 'Platform', href: '#platform' },
                    { label: 'Components', href: '#components', badge: 'New' },
                    { label: 'Showcase', href: '#showcase' },
                    { label: 'Docs', href: '#docs' },
                  ]}
                  cta={
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium hover:bg-white transition-colors"
                    >
                      Deploy Now
                    </button>
                  }
                />
              </div>
            </div>
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
                <Button size="md" variant="secondary" isLoading={true} loadingText="Processing...">
                  Loading
                </Button>
              </div>
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="py-4 max-w-md mx-auto w-full">
            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#1D1D1D] space-y-4">
              <div className="text-sm font-semibold text-white">Interactive Form System</div>
              <Form
                key={demoKey}
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
              key={demoKey}
              onSubmit={(data) => alert(`Login Attempt: ${JSON.stringify(data)}`)}
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
              key={demoKey}
              onSubmit={(data) => alert(`Registration: ${data.name} (${data.email})`)}
              onSignInClick={() => alert('Switch to sign in')}
              onSocialSignUp={(prov) => alert(`Social sign up: ${prov}`)}
            />
          </div>
        );
      case 'faq':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <FAQ
              key={demoKey}
              allowMultiple={true}
              searchable={true}
              showCategories={true}
              defaultOpen={['faq-1']}
              items={[
                {
                  id: 'faq-1',
                  question: 'How do I add EasyUI components to my existing project?',
                  answer:
                    'You can install any component directly using the official shadcn CLI: "npx shadcn@latest add Surajmaurya1/easyui/<component-name>".',
                  category: 'Installation',
                  badge: 'CLI',
                },
                {
                  id: 'faq-2',
                  question: 'What makes EasyUI animations feel natural?',
                  answer:
                    'EasyUI uses physical spring simulations rather than standard CSS bezier ease curves.',
                  category: 'Animation',
                  badge: 'Physics',
                },
              ]}
            />
          </div>
        );
      case 'payment-receipt-printer':
        return (
          <div className="py-4 w-full flex justify-center">
            <PaymentReceiptPrinter
              key={demoKey}
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
          </div>
        );
      case 'particle-delete':
        return (
          <div className="py-2 w-full">
            <ParticleDelete key={demoKey} />
          </div>
        );
      case 'animated-file-upload':
        return (
          <div className="py-4 w-full max-w-lg mx-auto">
            <AnimatedFileUpload
              key={demoKey}
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
              key={demoKey}
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
              key={demoKey}
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
            <ExpandableDataRow key={demoKey} allowMultiple={false} defaultExpandedIds={['usr_01']} />
          </div>
        );
      case 'scroll-progress-nav':
        return <ScrollProgressNavShowcase key={demoKey} />;
      case 'animated-number':
        return <AnimatedNumberShowcase key={demoKey} />;
      case 'spotlight-search':
        return <SpotlightSearchShowcase key={demoKey} />;
      case 'morphing-button':
        return (
          <div className="py-12 w-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MorphingButton key={`idle-${demoKey}`} status="idle" idleText="Save Changes" />
              <MorphingButton key={`loading-${demoKey}`} status="loading" loadingText="Saving..." />
              <MorphingButton key={`success-${demoKey}`} status="success" successText="Saved ✓" />
              <MorphingButton key={`error-${demoKey}`} status="error" errorText="Failed" variant="danger" />
            </div>
            <p className="text-xs text-[#666666]">Maintains physical shape & size across asynchronous state morphs</p>
          </div>
        );
      case 'drag-to-confirm':
        return (
          <div className="py-8 w-full max-w-md mx-auto space-y-4">
            <DragToConfirm
              key={demoKey}
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
              key={demoKey}
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
        return <SelectionBasketShowcase key={demoKey} />;
      case 'focus-mode':
        return (
          <div className="py-4 w-full max-w-2xl mx-auto">
            <FocusMode key={demoKey} />
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
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-white/20 selection:text-white">
      {/* Documentation Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1A1A1A]">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-[#222222] text-xs font-medium text-white hover:bg-[#161616] transition-colors"
          >
            <Menu className="w-4 h-4 text-zinc-400" />
            <span>Components Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCli}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-[#222222] text-xs text-zinc-300 hover:text-white"
            >
              {isCopiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Terminal className="w-3.5 h-3.5" />}
              <span>{isCopiedCli ? 'Copied CLI' : 'Copy CLI'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                  mass: 0.8,
                }}
                className="relative w-80 max-w-[85vw] bg-[#0A0A0A] border-r border-[#1E1E1E] h-full p-5 overflow-y-auto z-10 flex flex-col gap-4 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#181818] pb-3">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Components Catalog</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-[#111111] hover:bg-[#181818] border border-[#202020] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="text"
                    value={sidebarFilter}
                    onChange={(e) => setSidebarFilter(e.target.value)}
                    placeholder="Filter components..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111111] border border-[#222222] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                       {/* Items */}
                <div className="space-y-1 overflow-y-auto">
                  <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-1.5">
                    Components
                  </h4>
                  <div className="space-y-0.5">
                    {filteredComponents.map((item) => {
                      const isActive = item.id === component.id;
                      const isNew = isComponentNew(item, newestComponent);
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onSelectComponent(item.id);
                            setMobileSidebarOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left',
                            isActive
                              ? 'bg-[#181818] text-white font-medium border border-[#282828]'
                              : 'text-zinc-400 hover:text-white hover:bg-[#111111]'
                          )}
                        >
                          <span className="truncate">{item.name}</span>
                          {isNew && <NewBadge size="xs" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 3-Column Layout */}
        <div className="flex gap-8 lg:gap-12 items-start">
          {/* ========================================================================= */}
          {/* 1. LEFT SIDEBAR: Clean minimalist documentation navigation                 */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto select-none pr-3 scrollbar-thin">
            {/* Filter Search Box */}
            <div className="relative mb-6">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={sidebarFilter}
                onChange={(e) => setSidebarFilter(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#1C1C1C] text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              {sidebarFilter && (
                <button
                  onClick={() => setSidebarFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  aria-label="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* INTRO Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-1.5">
                  Intro
                </h4>
                <button
                  onClick={onNavigateHome}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors text-left"
                >
                  <Home className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Home</span>
                </button>
                <button
                  onClick={onNavigateComponents}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors text-left"
                >
                  <Grid className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Components</span>
                </button>
              </div>

              {/* GUIDES Section */}
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-1.5">
                  Guides
                </h4>
                <button
                  onClick={() => onNavigateDocs('quick-start')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors text-left"
                >
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Quick Start</span>
                </button>
                <button
                  onClick={() => onNavigateDocs('motion')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors text-left"
                >
                  <Sliders className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Motion Tokens</span>
                </button>
                <button
                  onClick={() => onNavigateDocs('architecture')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-[#111111] transition-colors text-left"
                >
                  <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Architecture</span>
                </button>
              </div>

              {/* COMPONENTS Section */}
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-1.5">
                  Components
                </h4>
                <div className="space-y-0.5">
                  {filteredComponents.map((item) => {
                    const isActive = item.id === component.id;
                    const isNew = isComponentNew(item, newestComponent);
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectComponent(item.id)}
                        className={cn(
                          'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left group cursor-pointer',
                          isActive
                            ? 'bg-[#181818] text-white font-medium border border-[#282828] shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#0E0E0E]'
                        )}
                      >
                        <span className="truncate">{item.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isNew && <NewBadge size="xs" />}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* 2. CENTER COLUMN: Dedicated Component Documentation Surface               */}
          {/* ========================================================================= */}
          <main className="flex-1 min-w-0 space-y-8 pb-20">
            {/* Breadcrumb & Header */}
            <div id="overview-section" className="space-y-3 pt-1">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500">
                <button
                  onClick={onNavigateComponents}
                  className="hover:text-white transition-colors"
                >
                  Components
                </button>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <span className="text-zinc-400">{component.category || 'UI'}</span>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <span className="text-white font-medium">{component.name}</span>
              </nav>

              {/* Title and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {component.name}
                  </h1>
                </div>

                {/* Right Top Header Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#242424] hover:border-[#383838] text-xs font-medium text-zinc-200 hover:text-white transition-all shadow-sm cursor-pointer"
                    title="Copy CLI command"
                  >
                    {isCopiedCli ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                    <span>{isCopiedCli ? 'Copied CLI' : 'Copy CLI'}</span>
                  </button>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl pt-1">
                {component.description || component.tagline}
              </p>
            </div>

            {/* ========================================================================= */}
            {/* MINIMAL GLASS TABS: Using AnimatedTabs Component                           */}
            {/* ========================================================================= */}
            <div className="flex items-center justify-start gap-4 pt-1">
              <AnimatedTabs
                tabs={[
                  { id: 'preview', label: 'Preview' },
                  { id: 'usage', label: 'Usage' },
                  { id: 'code', label: 'Code' },
                ]}
                activeTab={activeTab}
                onChange={(tabId) => setActiveTab(tabId as MainTab)}
                variant="glass"
                renderContent={false}
                layoutId={`detail-glass-tab-${component.id}`}
              />
            </div>

            {/* ========================================================================= */}
            {/* TAB VIEW 1: PREVIEW (Interactive Surface Box + Floating Dock)             */}
            {/* ========================================================================= */}
            {activeTab === 'preview' && (
              <div id="preview-section" className="space-y-6">
                {/* Main Interactive Stage Box */}
                <div className="relative rounded-2xl border border-[#1E1E1E] bg-[#090909] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col">
                  {/* Top Bar inside the preview card */}
                  <div className="px-4 py-3 border-b border-[#181818] bg-[#0C0C0C]/80 backdrop-blur-md flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-mono text-[11px] text-zinc-300 font-medium">
                        {component.id}.tsx
                      </span>
                    </div>

                    {/* Stage Controls */}
                    <div className="flex items-center gap-1.5">

                      {/* Reset Demo */}
                      <button
                        type="button"
                        onClick={() => setDemoKey((k) => k + 1)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#161616] border border-transparent hover:border-[#242424] transition-colors cursor-pointer"
                        title="Reset interactive demo"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy CLI Command */}
                      <button
                        type="button"
                        onClick={() => handleCopy(component.cliCommand, 'cli-top')}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#161616] border border-transparent hover:border-[#242424] transition-colors cursor-pointer"
                        title="Copy CLI command"
                      >
                        {copiedCode === 'cli-top' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Fullscreen Preview */}
                      <button
                        type="button"
                        onClick={() => setIsFullscreenPreview(true)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#161616] border border-transparent hover:border-[#242424] transition-colors cursor-pointer"
                        title="Fullscreen preview"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Component Render Canvas */}
                  <div className="relative min-h-[360px] sm:min-h-[420px] p-6 sm:p-10 flex items-center justify-center">
                    <div className="w-full flex items-center justify-center">
                      {renderInteractiveDemo()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB VIEW 2: USAGE                                                         */}
            {/* ========================================================================= */}
            {activeTab === 'usage' && (
              <div id="usage-section" className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Import Component</span>
                    <button
                      type="button"
                      onClick={() => {
                        const importStmt = `import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`;
                        handleCopy(importStmt, 'import');
                      }}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCode === 'import' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedCode === 'import' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-white overflow-x-auto">
                    <code>{`import { ${component.name.replace(/[\s-]+/g, '')} } from "@/components/ui/${component.id}";`}</code>
                  </pre>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Example Code</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(component.usageCode, 'usage')}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCode === 'usage' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedCode === 'usage' ? 'Copied' : 'Copy Example'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px] leading-relaxed scrollbar-thin">
                    <code>{component.usageCode}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB VIEW 3: CODE (Source)                                                 */}
            {/* ========================================================================= */}
            {activeTab === 'code' && (
              <div id="code-section" className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium font-mono">
                    src/components/ui/{component.id}.tsx
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(effectiveSourceCode, 'source')}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode === 'source' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCode === 'source' ? 'Copied' : 'Copy Source Code'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#070707] font-mono text-xs text-zinc-300 overflow-x-auto max-h-[520px] leading-relaxed scrollbar-thin">
                  <code>{effectiveSourceCode}</code>
                </pre>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SECTION: INSTALLATION                                                     */}
            {/* ========================================================================= */}
            <section id="install-section" className="space-y-4 pt-4 border-t border-[#181818]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white tracking-tight">Installation</h2>
                {/* CLI vs Manual Toggle */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#111111] border border-[#202020]">
                  <button
                    type="button"
                    onClick={() => setInstallMode('cli')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer',
                      installMode === 'cli'
                        ? 'bg-[#222222] text-white shadow-xs'
                        : 'text-zinc-400 hover:text-white'
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
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    Manual
                  </button>
                </div>
              </div>

              {installMode === 'cli' ? (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-400">
                    Add the component directly to your repository using shadcn CLI:
                  </p>
                  <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] p-3.5 sm:p-4 flex items-center justify-between gap-3 font-mono text-xs text-zinc-200">
                    <span className="truncate">{component.cliCommand}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(component.cliCommand, 'cli')}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white bg-[#141414] hover:bg-[#1E1E1E] border border-[#222222] transition-colors cursor-pointer shrink-0"
                    >
                      {copiedCode === 'cli' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Package Manager selector */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">1. Install dependencies</span>
                    <div className="flex items-center gap-1 font-mono text-[11px]">
                      {(['pnpm', 'npm', 'yarn', 'bun'] as PkgManager[]).map((pm) => (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => setPkgManager(pm)}
                          className={cn(
                            'px-2 py-0.5 rounded transition-colors cursor-pointer',
                            pkgManager === pm
                              ? 'bg-[#1E1E1E] text-white'
                              : 'text-zinc-500 hover:text-zinc-300'
                          )}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] p-3.5 flex items-center justify-between gap-3 font-mono text-xs text-zinc-200">
                    <span className="truncate">{getInstallDepCommand()}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(getInstallDepCommand(), 'deps')}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white bg-[#141414] border border-[#222222] transition-colors cursor-pointer"
                    >
                      {copiedCode === 'deps' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-400 pt-1">
                    2. Copy the component source code from the{' '}
                    <button
                      onClick={() => setActiveTab('code')}
                      className="text-white underline hover:text-zinc-300"
                    >
                      Code tab
                    </button>{' '}
                    into your project at <code className="text-zinc-300">components/ui/{component.id}.tsx</code>.
                  </p>
                </div>
              )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION: PROPS & API REFERENCE                                            */}
            {/* ========================================================================= */}
            <section id="props-section" className="space-y-4 pt-4 border-t border-[#181818]">
              <h2 className="text-lg font-semibold text-white tracking-tight">API Reference</h2>
              {component.props && component.props.length > 0 ? (
                <div className="rounded-xl border border-[#1E1E1E] overflow-hidden bg-[#070707]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D0D0D] text-zinc-400 border-b border-[#1E1E1E]">
                        <tr>
                          <th className="py-3 px-4 font-mono font-medium">Prop</th>
                          <th className="py-3 px-4 font-mono font-medium">Type</th>
                          <th className="py-3 px-4 font-mono font-medium">Default</th>
                          <th className="py-3 px-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#161616]">
                        {component.props.map((p, i) => (
                          <tr key={i} className="hover:bg-[#0E0E0E] transition-colors">
                            <td className="py-3 px-4 font-mono text-white font-medium">{p.name}</td>
                            <td className="py-3 px-4 font-mono text-zinc-400">{p.type}</td>
                            <td className="py-3 px-4 font-mono text-zinc-500">{p.default || '—'}</td>
                            <td className="py-3 px-4 text-zinc-300 leading-relaxed">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500">Standard React HTML element attributes supported.</p>
              )}
            </section>

            {/* ========================================================================= */}
            {/* SECTION: FEATURES & ACCESSIBILITY                                         */}
            {/* ========================================================================= */}
            <section id="features-section" className="space-y-4 pt-4 border-t border-[#181818]">
              <h2 className="text-lg font-semibold text-white tracking-tight">Features & Accessibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Features Card */}
                {component.features && component.features.length > 0 && (
                  <div className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] space-y-3">
                    <div className="text-xs font-semibold text-zinc-300">
                      Key Capabilities
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      {component.features.map((feat, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accessibility Card */}
                {component.accessibility && component.accessibility.length > 0 && (
                  <div className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] space-y-3">
                    <div className="text-xs font-semibold text-zinc-300">
                      Accessibility (WAI-ARIA)
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400">
                      {component.accessibility.map((acc, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {acc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION: RELATED COMPONENTS                                               */}
            {/* ========================================================================= */}
            {relatedComponents.length > 0 && (
              <section id="related-section" className="space-y-4 pt-4 border-t border-[#181818]">
                <h2 className="text-lg font-semibold text-white tracking-tight">Related Components</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedComponents.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectComponent(rel.id)}
                      className="p-4 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#333333] hover:bg-[#0E0E0E] transition-all text-left group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-semibold text-white group-hover:text-zinc-200 truncate mb-1">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                        {rel.tagline || rel.description}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Fullscreen Overlay for Component Stage                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullscreenPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-[#060606] flex flex-col overflow-y-auto"
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
                title="Exit Fullscreen (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-sans">Exit</span>
                <kbd className="hidden sm:inline-flex text-[9px] font-mono px-1 py-0.2 rounded bg-[#161616] border border-[#282828] text-[#737373]">ESC</kbd>
              </button>
            </div>

            {/* Centered Fullscreen Content */}
            <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-16 my-auto flex items-center justify-center">
              {renderInteractiveDemo()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComponentDetailPage;
