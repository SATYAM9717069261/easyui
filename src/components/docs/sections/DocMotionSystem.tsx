import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Sliders, Shield, ArrowRight } from 'lucide-react';
import { DocCodeBlock } from '../DocCodeBlock';
import { motionTransitions } from '../../../lib/motion-tokens';

export interface DocMotionSystemProps {
  onNavigateSection: (sectionId: string) => void;
}

export const DocMotionSystem: React.FC<DocMotionSystemProps> = ({ onNavigateSection }) => {
  const [activeTest, setActiveTest] = React.useState<string>('springSmooth');

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/20">
            Design Tokens
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] font-sans">
          Motion Tokens & Spring Physics
        </h1>
        <p className="text-base text-[#A1A1A1] mt-3 leading-relaxed max-w-3xl">
          EasyUI eliminates mechanical, linear easing curves in favor of organic spring physics. Damping, stiffness, and mass are calibrated to create tactile, physical interactions.
        </p>
      </div>

      {/* Interactive Physics Sandbox */}
      <div className="p-6 rounded-2xl border border-[#222222] bg-[#0A0A0A] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#38BDF8]" />
              Interactive Spring Curves Sandbox
            </h3>
            <p className="text-xs text-[#808080] mt-0.5">
              Click a preset below to see the live spring rebound response.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-[#121212] border border-[#202020] rounded-xl text-xs font-mono">
            {Object.keys(motionTransitions).map((preset) => (
              <button
                key={preset}
                onClick={() => setActiveTest(preset)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeTest === preset
                    ? 'bg-[#38BDF8] text-black font-semibold shadow-sm'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Live Animation Box */}
        <div className="h-36 rounded-xl border border-[#1C1C1C] bg-[#060606] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#202020_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          <motion.div
            key={activeTest}
            initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={motionTransitions[activeTest as keyof typeof motionTransitions]}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284C7] shadow-lg shadow-[#38BDF8]/20 flex flex-col items-center justify-center text-black font-mono text-xs font-bold select-none cursor-pointer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="w-6 h-6 text-black mb-1" />
            <span>Spring</span>
          </motion.div>
        </div>
      </div>

      {/* Motion Tokens Code */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#38BDF8]" />
          Motion Token Definitions
        </h2>
        <p className="text-xs text-[#808080] leading-relaxed">
          The central token configuration file <code className="text-[#ECECEC] font-mono">lib/motion-tokens.ts</code> is shared across all components:
        </p>

        <DocCodeBlock
          code={`export const motionTransitions = {
  // Smooth, refined feedback for surfaces and tabs
  springSmooth: { type: 'spring', stiffness: 300, damping: 30 },

  // Instant, tactile snap for buttons and dropdowns
  springSnappy: { type: 'spring', stiffness: 400, damping: 25 },

  // Expressive rebound for notifications and modal pops
  springBouncy: { type: 'spring', stiffness: 500, damping: 15 },

  // Organic, gradual deceleration for large content reveals
  springGentle: { type: 'spring', stiffness: 180, damping: 24 },

  // Ultra-fast cubic bezier for subtle opacity fades
  easeOutCubic: { ease: [0.33, 1, 0.68, 1], duration: 0.25 },
} as const;`}
          language="typescript"
          title="src/lib/motion-tokens.ts"
        />
      </div>

      {/* Reduced Motion & Accessibility */}
      <div className="space-y-4 pt-6 border-t border-[#181818]">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Accessibility & Reduced Motion
        </h2>
        <p className="text-xs text-[#808080] leading-relaxed">
          EasyUI is built to respect users who prefer reduced motion. In your own components or app wrappers, you can check Framer Motion's built-in <code className="text-[#ECECEC] font-mono">useReducedMotion</code> hook:
        </p>

        <DocCodeBlock
          code={`import { useReducedMotion } from 'framer-motion';
import { motionTransitions } from '@/lib/motion-tokens';

export function AccessibleCard() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : motionTransitions.springSnappy;

  return (
    <motion.div
      animate={{ scale: 1 }}
      transition={transition}
    >
      Content
    </motion.div>
  );
}`}
          language="tsx"
          title="Reduced Motion Pattern"
        />
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#181818] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigateSection('architecture')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Previous</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">Automatic Registry Architecture</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateSection('collaboration')}
          className="flex items-center justify-between p-4 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] hover:bg-[#121212] hover:border-[#38BDF8]/30 transition-all text-left group"
        >
          <div>
            <span className="text-[11px] font-mono text-[#6F6F6F] block">Guide</span>
            <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">How to Collaborate & Add Components</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6F6F6F] group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
