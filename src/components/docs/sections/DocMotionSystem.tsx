import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Activity, RefreshCw } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { DocPagination } from '../DocPagination';
import { motionTransitions } from '../../../lib/motion-tokens';

export interface DocMotionSystemProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocMotionSystem: React.FC<DocMotionSystemProps> = ({ onNavigateSection }) => {
  const [activeCurve, setActiveCurve] = useState<keyof typeof motionTransitions>('springSnappy');
  const [testTrigger, setTestTrigger] = useState(0);

  const tokenDetails: Record<keyof typeof motionTransitions, { desc: string; values: string }> = {
    springSnappy: { desc: 'Tactile clicks, button active states, micro-toggles', values: 'stiffness: 400, damping: 25, mass: 0.5' },
    springResponsive: { desc: 'Magnetic return pull, notification toasts stack', values: 'stiffness: 350, damping: 22, mass: 0.6' },
    springMorph: { desc: 'Morphing dialogs, layoutId expanding backgrounds', values: 'stiffness: 320, damping: 28, mass: 0.9' },
    springSmooth: { desc: 'Spatial 3D layer perspective, search expanding pill, floating dock', values: 'stiffness: 300, damping: 30, mass: 0.8' },
    springGentle: { desc: 'Fluid tab switching, accordion unfolding, card bounds', values: 'stiffness: 280, damping: 30, mass: 0.8' },
    easeSoft: { desc: 'Subtle backdrop blurs, opacity fades, color shifts', values: 'duration: 0.22s, ease: [0.16, 1, 0.3, 1]' },
    easeFast: { desc: 'Instant icon switch, quick tooltip reveal', values: 'duration: 0.15s, ease: [0.2, 0, 0, 1]' },
  };

  return (
    <article className="space-y-12 animate-fade-in text-[#A1A1A1]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#1F1F1F] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Motion Tokens & Physics Curves
        </h1>
        <p className="text-base text-[#A1A1A1] leading-relaxed max-w-2xl">
          EasyUI standardizes animation through calibrated spring physics curves and bezier easing tokens. Consistent physical stiffness, damping, and mass ensure every interaction feels organic and responsive.
        </p>
      </header>

      {/* Interactive Physics Sandbox */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FAFAFA]" />
            <h2 className="text-lg font-semibold text-[#FAFAFA]">Interactive Physics Sandbox</h2>
          </div>
        </div>
        <p className="text-sm text-[#A1A1A1]">
          Select a token curve and click the cube below to trigger the physical spring response:
        </p>

        <div className="p-6 rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] space-y-6">
          {/* Curve Selector Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#141414] rounded-xl border border-[#1F1F1F]">
            {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
              <button
                key={curveKey}
                onClick={() => {
                  setActiveCurve(curveKey);
                  setTestTrigger((t) => t + 1);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  activeCurve === curveKey
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A1A1A1] hover:text-white hover:bg-[#171717]'
                }`}
              >
                {curveKey}
              </button>
            ))}
          </div>

          {/* Interactive Playground Box */}
          <div className="h-48 rounded-xl border border-[#1F1F1F] bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden bg-dot-subtle select-none">
            <motion.div
              key={`${activeCurve}-${testTrigger}`}
              initial={{ scale: 0.75, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={motionTransitions[activeCurve]}
              onClick={() => setTestTrigger((t) => t + 1)}
              className="w-24 h-24 rounded-2xl bg-white shadow-xl shadow-white/5 flex flex-col items-center justify-center text-black font-mono text-xs font-bold cursor-pointer"
            >
              <span>Click Me</span>
              <span className="text-[10px] font-normal opacity-70 mt-0.5">{activeCurve}</span>
            </motion.div>

            <div className="absolute bottom-3 left-4 text-xs font-mono text-[#A1A1A1]">
              Values: <span className="text-[#FAFAFA] font-medium">{tokenDetails[activeCurve].values}</span>
            </div>

            <div className="absolute bottom-3 right-4 text-xs font-mono text-[#6B6B6B] flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3" />
              <span>Click to trigger</span>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Tokens Reference Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FAFAFA]" />
          <h2 className="text-lg font-semibold text-[#FAFAFA]">Token Reference</h2>
        </div>

        <div className="rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0B0B0B] text-[#A1A1A1] border-b border-[#1F1F1F]">
              <tr>
                <th className="p-3.5 font-semibold text-[#FAFAFA]">Token</th>
                <th className="p-3.5 font-semibold">Parameters</th>
                <th className="p-3.5 font-semibold hidden sm:table-cell">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F] text-[#A1A1A1]">
              {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
                <tr key={curveKey} className="hover:bg-[#141414] transition-colors">
                  <td className="p-3.5 text-[#FAFAFA] font-medium">{curveKey}</td>
                  <td className="p-3.5 text-[#CCCCCC]">{tokenDetails[curveKey].values}</td>
                  <td className="p-3.5 text-[#525252] hidden sm:table-cell">{tokenDetails[curveKey].desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Using Motion Tokens in Custom Components</h2>
        <p className="text-sm text-[#A1A1A1]">
          Import <code className="text-[#FAFAFA] font-mono bg-[#141414] border border-[#1F1F1F] px-1.5 py-0.5 rounded text-xs">motionTransitions</code> from your shared tokens helper:
        </p>

        <DocCodeBlock
          code={`import { motion } from 'framer-motion';
import { motionTransitions } from '@/lib/motion-tokens';

export function InteractiveCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={motionTransitions.springSnappy}
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800"
    >
      <h3 className="text-white font-semibold">Organic Spring Motion</h3>
    </motion.div>
  );
}`}
          language="tsx"
          title="src/components/InteractiveCard.tsx"
        />
      </section>

      {/* Accessibility Callout */}
      <section className="p-4 rounded-xl border border-[#1F1F1F] bg-[#0E0E0E] space-y-1">
        <h3 className="text-xs font-semibold text-[#FAFAFA]">Reduced Motion Support</h3>
        <p className="text-xs text-[#A1A1A1] leading-relaxed">
          EasyUI components automatically detect and respect <code className="text-[#FAFAFA] font-mono bg-[#141414] border border-[#1F1F1F] px-1 rounded text-[11px]">prefers-reduced-motion: reduce</code>, disabling heavy translations while preserving smooth instantaneous updates.
        </p>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="motion" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
