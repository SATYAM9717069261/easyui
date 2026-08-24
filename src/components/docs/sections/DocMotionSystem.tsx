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
    <article className="space-y-12 animate-fade-in text-[#A3A3A3]">
      {/* Header */}
      <header className="space-y-3 border-b border-[#363636] pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5]">
          Motion Tokens & Physics Curves
        </h1>
        <p className="text-base text-[#A3A3A3] leading-relaxed max-w-2xl">
          EasyUI standardizes animation through calibrated spring physics curves and bezier easing tokens. Consistent physical stiffness, damping, and mass ensure every interaction feels organic and responsive.
        </p>
      </header>

      {/* Interactive Physics Sandbox */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#F5F5F5]" />
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Interactive Physics Sandbox</h2>
          </div>
        </div>
        <p className="text-sm text-[#A3A3A3]">
          Select a token curve and click the cube below to trigger the physical spring response:
        </p>

        <div className="p-6 rounded-2xl border border-[#363636] bg-[#202020] space-y-6">
          {/* Curve Selector Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#242424] rounded-xl border border-[#363636]">
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
                    : 'text-[#A3A3A3] hover:text-white hover:bg-[#2C2C2C]'
                }`}
              >
                {curveKey}
              </button>
            ))}
          </div>

          {/* Interactive Playground Box */}
          <div className="h-48 rounded-xl border border-[#363636] bg-[#151515] flex flex-col items-center justify-center relative overflow-hidden bg-dot-subtle select-none">
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

            <div className="absolute bottom-3 left-4 text-xs font-mono text-[#A3A3A3]">
              Values: <span className="text-[#F5F5F5] font-medium">{tokenDetails[activeCurve].values}</span>
            </div>

            <div className="absolute bottom-3 right-4 text-xs font-mono text-[#737373] flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3" />
              <span>Click to trigger</span>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Tokens Reference Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#F5F5F5]" />
          <h2 className="text-lg font-semibold text-[#F5F5F5]">Token Reference</h2>
        </div>

        <div className="rounded-xl border border-[#363636] bg-[#202020] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#1C1C1C] text-[#A3A3A3] border-b border-[#363636]">
              <tr>
                <th className="p-3.5 font-semibold text-[#F5F5F5]">Token</th>
                <th className="p-3.5 font-semibold">Parameters</th>
                <th className="p-3.5 font-semibold hidden sm:table-cell">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#363636] text-[#A3A3A3]">
              {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
                <tr key={curveKey} className="hover:bg-[#242424] transition-colors">
                  <td className="p-3.5 text-[#F5F5F5] font-medium">{curveKey}</td>
                  <td className="p-3.5 text-[#CCCCCC]">{tokenDetails[curveKey].values}</td>
                  <td className="p-3.5 text-[#8A8A8A] hidden sm:table-cell">{tokenDetails[curveKey].desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Usage Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#F5F5F5]">Using Motion Tokens in Custom Components</h2>
        <p className="text-sm text-[#A3A3A3]">
          Import <code className="text-[#F5F5F5] font-mono bg-[#242424] border border-[#363636] px-1.5 py-0.5 rounded text-xs">motionTransitions</code> from your shared tokens helper:
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
      <section className="p-4 rounded-xl border border-[#363636] bg-[#202020] space-y-1">
        <h3 className="text-xs font-semibold text-[#F5F5F5]">Reduced Motion Support</h3>
        <p className="text-xs text-[#A3A3A3] leading-relaxed">
          EasyUI components automatically detect and respect <code className="text-[#F5F5F5] font-mono bg-[#242424] border border-[#363636] px-1 rounded text-[11px]">prefers-reduced-motion: reduce</code>, disabling heavy translations while preserving smooth instantaneous updates.
        </p>
      </section>

      {/* Pagination Footer */}
      <DocPagination currentTopic="motion" onNavigateTopic={onNavigateSection} />
    </article>
  );
};
