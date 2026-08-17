import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, Terminal, Code2, Sparkles, ShieldCheck, Eye, Layers } from 'lucide-react';
import type { EasyComponentMeta } from '../../types/component';
import { motionTransitions } from '../../lib/motion-tokens';
import { copyToClipboard } from '../../lib/utils';
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

export interface ComponentDetailModalProps {
  component: EasyComponentMeta | null;
  onClose: () => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'install' | 'usage' | 'source' | 'api' | 'a11y'>('preview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!component) return null;

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderInteractiveDemo = () => {
    switch (component.id) {
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
      case 'dot-field':
        return (
          <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[#222222] bg-[#0A0A0A]">
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={true}
              gradientFrom="rgba(255, 255, 255, 0.25)"
              gradientTo="rgba(255, 255, 255, 0.08)"
              glowColor="rgba(255, 255, 255, 0.05)"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/70 border border-[#222222] text-[11px] font-mono text-[#A1A1A1] backdrop-blur-sm pointer-events-none">
              Move cursor across canvas to test repulsion & glow
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={motionTransitions.springSnappy}
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#222222] bg-[#0C0C0C] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between p-6 border-b border-[#1A1A1A]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded bg-[#181818] border border-[#242424]">
                {component.category}
              </span>
              <span className="text-xs text-[#6F6F6F]">easyui/{component.id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] tracking-tight">
              {component.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#8E8E8E] mt-1">
              {component.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6F6F6F] hover:text-[#F5F5F5] hover:bg-[#181818] transition-colors focus-ring"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#1A1A1A] overflow-x-auto scrollbar-none bg-[#090909]">
          {[
            { id: 'preview', label: 'Live Preview', icon: <Eye className="w-3.5 h-3.5" /> },
            { id: 'install', label: 'Installation', icon: <Terminal className="w-3.5 h-3.5" /> },
            { id: 'usage', label: 'Usage', icon: <Code2 className="w-3.5 h-3.5" /> },
            { id: 'source', label: 'Source', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'api', label: 'Props API', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'a11y', label: 'Accessibility', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-[#6F6F6F] hover:text-[#A1A1A1]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB 1: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] bg-dot-subtle min-h-[220px] flex items-center justify-center p-4">
                {renderInteractiveDemo()}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider mb-2">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {component.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-[#1B1B1B] bg-[#0E0E0E] text-xs text-[#A1A1A1] flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTALLATION */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <p className="text-xs text-[#8E8E8E]">
                Add this component to your shadcn project via the EasyUI GitHub registry:
              </p>
              <div className="rounded-xl border border-[#1E1E1E] bg-[#090909] p-4 flex items-center justify-between font-mono text-xs">
                <span className="text-white">{component.cliCommand}</span>
                <button
                  onClick={() => handleCopy(component.cliCommand, 'cli')}
                  className="flex items-center gap-1 text-[11px] text-[#A1A1A1] hover:text-[#F5F5F5]"
                >
                  {copiedCode === 'cli' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'cli' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-[#1A1A1A] bg-[#0E0E0E] space-y-2">
                <h5 className="text-xs font-semibold text-[#F5F5F5]">Dependencies</h5>
                <p className="text-xs text-[#6F6F6F]">Requires: <code className="text-[#A1A1A1]">framer-motion</code>, <code className="text-[#A1A1A1]">lucide-react</code>, <code className="text-[#A1A1A1]">tailwindcss</code></p>
              </div>
            </div>
          )}

          {/* TAB 3: USAGE */}
          {activeTab === 'usage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8E8E8E]">Example Usage in React / Next.js:</span>
                <button
                  onClick={() => handleCopy(component.usageCode, 'usage')}
                  className="flex items-center gap-1 text-[11px] text-white hover:underline"
                >
                  {copiedCode === 'usage' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'usage' ? 'Copied' : 'Copy Example'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#080808] font-mono text-xs text-[#CCCCCC] overflow-x-auto leading-relaxed">
                <code>{component.usageCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: SOURCE */}
          {activeTab === 'source' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8E8E8E]">Full Component Source Code (TypeScript):</span>
                <button
                  onClick={() => handleCopy(component.sourceCode, 'source')}
                  className="flex items-center gap-1 text-[11px] text-white hover:underline"
                >
                  {copiedCode === 'source' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'source' ? 'Copied' : 'Copy Source'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl border border-[#1E1E1E] bg-[#080808] font-mono text-xs text-[#CCCCCC] overflow-x-auto max-h-96 leading-relaxed">
                <code>{component.sourceCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 5: PROPS API */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider">
                Props & Configuration
              </h4>
              <div className="rounded-xl border border-[#1E1E1E] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121212] text-[#808080] border-b border-[#1E1E1E]">
                    <tr>
                      <th className="p-3 font-mono">Prop</th>
                      <th className="p-3 font-mono">Type</th>
                      <th className="p-3 font-mono">Default</th>
                      <th className="p-3 font-mono">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#181818] bg-[#0A0A0A]">
                    {component.props.map((p, i) => (
                      <tr key={i} className="hover:bg-[#101010]">
                        <td className="p-3 font-mono text-white font-semibold">{p.name}</td>
                        <td className="p-3 font-mono text-[#A1A1A1]">{p.type}</td>
                        <td className="p-3 font-mono text-[#6F6F6F]">{p.default || '-'}</td>
                        <td className="p-3 text-[#CCCCCC]">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: ACCESSIBILITY */}
          {activeTab === 'a11y' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#F5F5F5] uppercase tracking-wider">
                Accessibility Standard
              </h4>
              <div className="space-y-2">
                {component.accessibility.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-[#1C1C1C] bg-[#0E0E0E] text-xs text-[#CCCCCC] flex items-center gap-3"
                  >
                    <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-[#080808] border-t border-[#181818] flex items-center justify-between text-xs text-[#6F6F6F]">
          <span>EasyUI Copy & Paste Components</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] text-[#F5F5F5] transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
