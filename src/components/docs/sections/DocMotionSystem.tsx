import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Activity, ArrowRight, RefreshCw } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { motionTransitions } from '../../../lib/motion-tokens';

export interface DocMotionSystemProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocMotionSystem: React.FC<DocMotionSystemProps> = ({ onNavigateSection }) => {
  const [activeCurve, setActiveCurve] = useState<keyof typeof motionTransitions>('springSnappy');
  const [testTrigger, setTestTrigger] = useState(0);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#A1A1A1] uppercase tracking-widest bg-[#181818] px-2.5 py-0.5 rounded-full border border-[#282828]">
            Motion Engine
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          Motion Tokens & Physics Curves
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI standardizes animation through calibrated spring physics curves and cubic bezier easing tokens. Consistent physical mass, stiffness, and damping ensure every interaction feels organic.
        </p>
      </div>

      {/* Interactive Physics Curve Sandbox */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-white" />
              Interactive Physics Token Sandbox
            </h3>
            <p className="text-xs text-[#808080] mt-1">
              Select a spring curve and click the element to observe the physical oscillation response.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-[#121212] p-1 rounded-xl border border-[#202020]">
            {(Object.keys(motionTransitions) as (keyof typeof motionTransitions)[]).map((curveKey) => (
              <button
                key={curveKey}
                onClick={() => {
                  setActiveCurve(curveKey);
                  setTestTrigger((t) => t + 1);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                  activeCurve === curveKey
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#A1A1A1] hover:text-white'
                }`}
              >
                {curveKey}
              </button>
            ))}
          </div>
        </div>

        {/* Live Motion Test Area */}
        <div className="h-44 rounded-xl border border-[#1C1C1C] bg-[#080808] flex items-center justify-center relative overflow-hidden bg-dot-subtle">
          <motion.div
            key={`${activeCurve}-${testTrigger}`}
            initial={{ scale: 0.8, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={motionTransitions[activeCurve] as any}
            onClick={() => setTestTrigger((t) => t + 1)}
            className="w-20 h-20 rounded-2xl bg-white shadow-lg shadow-white/10 flex flex-col items-center justify-center text-black font-mono text-xs font-bold select-none cursor-pointer"
          >
            <span>Click</span>
            <span className="text-[9px] font-normal opacity-80">to animate</span>
          </motion.div>

          <div className="absolute bottom-3 right-4 text-[11px] font-mono text-[#6F6F6F] flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            <span>Click block to re-trigger physics</span>
          </div>
        </div>
      </div>

      {/* Physics Token Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-white" />
          <h2 className="text-xl font-semibold text-white">Motion Tokens Reference</h2>
        </div>

        <div className="rounded-xl border border-[#1E1E1E] bg-[#0A0A0A] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#121212] text-[#A1A1A1] border-b border-[#1E1E1E]">
              <tr>
                <th className="p-3.5 font-semibold">Token</th>
                <th className="p-3.5 font-semibold">Type / Values</th>
                <th className="p-3.5 font-semibold">Recommended Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181818] text-[#A1A1A1]">
              <tr>
                <td className="p-3.5 text-white font-semibold">springSnappy</td>
                <td className="p-3.5 text-[#D4D4D4]">stiffness: 400, damping: 25</td>
                <td className="p-3.5 text-[#888888]">Tactile button clicks, pills, micro-toggles</td>
              </tr>
              <tr>
                <td className="p-3.5 text-white font-semibold">springResponsive</td>
                <td className="p-3.5 text-[#D4D4D4]">stiffness: 350, damping: 28</td>
                <td className="p-3.5 text-[#888888]">Notification stacks, dropdown open/close</td>
              </tr>
              <tr>
                <td className="p-3.5 text-white font-semibold">springGentle</td>
                <td className="p-3.5 text-[#D4D4D4]">stiffness: 180, damping: 24</td>
                <td className="p-3.5 text-[#888888]">Accordion expansion, card disclosure bounds</td>
              </tr>
              <tr>
                <td className="p-3.5 text-white font-semibold">springMorph</td>
                <td className="p-3.5 text-[#D4D4D4]">stiffness: 280, damping: 26</td>
                <td className="p-3.5 text-[#888888]">Morphing modal dialogs, shared layout transitions</td>
              </tr>
              <tr>
                <td className="p-3.5 text-white font-semibold">springSmooth</td>
                <td className="p-3.5 text-[#D4D4D4]">stiffness: 300, damping: 30</td>
                <td className="p-3.5 text-[#888888]">Tab indicator bar glide, general UI movement</td>
              </tr>
              <tr>
                <td className="p-3.5 text-white font-semibold">easeOutCubic</td>
                <td className="p-3.5 text-[#D4D4D4]">cubic-bezier(0.33, 1, 0.68, 1)</td>
                <td className="p-3.5 text-[#888888]">Fade in overlays, tooltips, CSS opacity shifts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Export Reference */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <h2 className="text-xl font-semibold text-white">Using Motion Tokens in Custom Components</h2>
        <p className="text-xs text-[#808080] leading-relaxed">
          Import <code className="text-[#ECECEC] font-mono">motionTransitions</code> from your local <code className="text-[#ECECEC] font-mono">lib/motion-tokens</code> helper:
        </p>

        <DocCodeBlock
          code={`import { motion } from 'framer-motion';
import { motionTransitions } from '@/lib/motion-tokens';

export function InteractiveBadge() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={motionTransitions.springSnappy}
      className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-white"
    >
      Hover Me
    </motion.div>
  );
}`}
          language="tsx"
          title="Example Component with Motion Token"
        />
      </div>

      {/* Accessibility / Reduced Motion */}
      <div className="p-5 rounded-xl border border-[#202020] bg-[#0A0A0A] space-y-2">
        <h3 className="text-sm font-semibold text-white">Reduced Motion Accessibility Support</h3>
        <p className="text-xs text-[#808080] leading-relaxed">
          EasyUI components respect <code className="text-[#ECECEC] font-mono">prefers-reduced-motion: reduce</code>. Framer Motion automatically replaces spring physical coordinate transitions with instantaneous instant states when requested by system settings.
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('architecture')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Architecture</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">Automatic Registry Architecture</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('collaboration')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#383838] transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Contribute</span>
            <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">How to Collaborate & Add Components</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
