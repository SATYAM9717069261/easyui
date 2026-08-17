import React from 'react';
import { Container } from '../layout/Container';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../ui/MagneticButton';
import { MorphingDialog } from '../ui/MorphingDialog';
import { FloatingActionDock } from '../ui/FloatingActionDock';
import { ArrowUpRight, Shield, Zap, Terminal, Code2, Globe, Database } from 'lucide-react';

export interface FeaturedShowcaseProps {
  onSelectComponent: (id: string) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  onSelectComponent,
}) => {
  const dockDemoItems = [
    { id: 'code', label: 'Editor', icon: <Code2 /> },
    { id: 'term', label: 'Terminal', icon: <Terminal /> },
    { id: 'cloud', label: 'Cloud Deploy', icon: <Globe /> },
    { id: 'db', label: 'Database', icon: <Database /> },
  ];

  return (
    <section className="py-24 bg-[#050505] relative">
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest">
              Showroom
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              Start with something beautiful.
            </h2>
            <p className="text-sm text-[#808080] mt-2 max-w-lg">
              Explore a growing collection of carefully designed components with natural motion and tactile feedback.
            </p>
          </div>
          <button
            onClick={() => onSelectComponent('spotlight-card')}
            className="text-xs font-mono text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Inspect all 10 components</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Item 1: Large Featured Spotlight Card (8 cols) */}
          <div className="md:col-span-8">
            <SpotlightCard className="h-full flex flex-col justify-between p-8 bg-[#090909]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                      Spotlight Card
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#6F6F6F] px-2 py-0.5 rounded bg-[#121212] border border-[#1E1E1E]">
                    Pointer Physics
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#F5F5F5] tracking-tight mb-2">
                  Fluid illumination that moves with your cursor.
                </h3>
                <p className="text-sm text-[#808080] max-w-xl leading-relaxed mb-6">
                  Unlike flat rectangles, EasyUI surfaces feature micro-radial masks calculating Euclidean distance in real-time, subtly illuminating layered borders without distracting gradient clutter.
                </p>

                {/* Interactive Inner Surface */}
                <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#202020] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#6F6F6F]">Frame Rate</span>
                    <p className="text-base font-semibold font-mono text-[#F5F5F5]">120 FPS</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#6F6F6F]">Mask Radius</span>
                    <p className="text-base font-semibold font-mono text-[#38BDF8]">350px</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#6F6F6F]">Surface Alpha</span>
                    <p className="text-base font-semibold font-mono text-[#F5F5F5]">0.08</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#181818] flex items-center justify-between">
                <span className="text-xs text-[#6F6F6F]">Hover anywhere across the card surface</span>
                <MagneticButton
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectComponent('spotlight-card')}
                >
                  View Code
                </MagneticButton>
              </div>
            </SpotlightCard>
          </div>

          {/* Item 2: Magnetic Button Showcase (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between p-6 rounded-xl border border-[#1D1D1D] bg-[#090909]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Magnetic Button
                </span>
                <span className="text-[11px] font-mono text-[#6F6F6F]">0.35x Pull</span>
              </div>
              <h4 className="text-base font-semibold text-[#F5F5F5] mb-2">
                Physical Attraction
              </h4>
              <p className="text-xs text-[#808080] leading-relaxed mb-6">
                Applies spring displacement relative to cursor coordinates.
              </p>

              {/* Interactive buttons test */}
              <div className="space-y-3 py-2 flex flex-col items-center">
                <MagneticButton
                  variant="primary"
                  size="md"
                  strength={0.4}
                  className="w-full"
                >
                  <span>Primary Magnetic</span>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  size="md"
                  strength={0.3}
                  className="w-full"
                >
                  <span>Secondary Surface</span>
                </MagneticButton>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#181818] flex items-center justify-between text-xs">
              <span className="text-[#6F6F6F]">Framer Spring</span>
              <button
                onClick={() => onSelectComponent('magnetic-button')}
                className="text-[#38BDF8] hover:underline text-xs"
              >
                Docs →
              </button>
            </div>
          </div>

          {/* Item 3: Morphing Dialog (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-xl border border-[#1D1D1D] bg-[#090909] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Morphing Dialog
                </span>
                <span className="text-[11px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded">
                  layoutId
                </span>
              </div>
              <h4 className="text-base font-semibold text-[#F5F5F5] mb-2">
                Shared Surface Expansion
              </h4>
              <p className="text-xs text-[#808080] leading-relaxed mb-6">
                Seamless expansion from any trigger element into full modal view.
              </p>

              <MorphingDialog
                id="morph-showcase"
                title="Security Protocol Config"
                subtitle="Review authentication policies for production API gateways."
                trigger={(open) => (
                  <button
                    onClick={open}
                    className="w-full py-3 px-4 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#38BDF8]/50 text-xs font-medium text-[#F5F5F5] flex items-center justify-between transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#38BDF8]" />
                      <span>Open Security Dialog</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#6F6F6F] group-hover:text-[#F5F5F5]" />
                  </button>
                )}
              >
                <div className="space-y-4 text-xs text-[#A1A1A1]">
                  <div className="p-3 rounded-lg bg-[#141414] border border-[#222222]">
                    <span className="text-[#F5F5F5] font-semibold block mb-1">Mutual TLS 1.3 Active</span>
                    <span>All external requests pass through automated rate limiting clusters.</span>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-[#A1A1A1] text-xs">
                      Cancel
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-[#38BDF8] text-[#050505] font-medium text-xs">
                      Save Policies
                    </button>
                  </div>
                </div>
              </MorphingDialog>
            </div>

            <div className="mt-6 pt-4 border-t border-[#181818] flex items-center justify-between text-xs">
              <span className="text-[#6F6F6F]">Zero layout shift</span>
              <button
                onClick={() => onSelectComponent('morphing-dialog')}
                className="text-[#38BDF8] hover:underline"
              >
                Docs →
              </button>
            </div>
          </div>

          {/* Item 4: Floating Action Dock (8 cols) */}
          <div className="md:col-span-8 p-6 rounded-xl border border-[#1D1D1D] bg-[#090909] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1A1]">
                  Floating Action Dock
                </span>
                <h4 className="text-base font-semibold text-[#F5F5F5] mt-1">
                  Magnification Curve Physics
                </h4>
              </div>
              <span className="text-[11px] font-mono text-[#6F6F6F] px-2 py-0.5 rounded bg-[#121212] border border-[#1E1E1E] self-start">
                macOS Inspired
              </span>
            </div>

            <div className="py-6 flex items-center justify-center bg-[#070707] rounded-xl border border-[#171717] bg-dot-subtle">
              <FloatingActionDock items={dockDemoItems} activeId="code" />
            </div>

            <div className="mt-6 pt-4 border-t border-[#181818] flex items-center justify-between text-xs">
              <span className="text-[#6F6F6F]">Interactive hover magnification & tooltips</span>
              <button
                onClick={() => onSelectComponent('floating-dock')}
                className="text-[#38BDF8] hover:underline"
              >
                Inspect Dock →
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
