import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../layout/Container';
import { motionTransitions } from '../../lib/motion-tokens';
import { Maximize2, Move, X, RefreshCw } from 'lucide-react';

export const MotionShowcase: React.FC = () => {
  // States for the 6 micro-demos
  const [isExpandedDemo, setIsExpandedDemo] = useState(false);
  const [morphShape, setMorphShape] = useState<'pill' | 'circle' | 'card'>('pill');
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <section id="motion-showcase" className="py-20 bg-[#070707] border-t border-[#141414]">
      <Container size="xl">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">
            Physics
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
            Motion that feels natural.
          </h2>
          <p className="text-sm text-[#808080] mt-1.5">
            Physical weights, spring dynamics, and continuous transformations designed to communicate state effortlessly.
          </p>
        </div>

        {/* 6 Micro-motion demonstrations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. HOVER PHYSICS */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">01 · Hover Scale</h4>
                <span className="text-[10px] font-mono text-[#606060]">spring-snappy</span>
              </div>
              <p className="text-xs text-[#808080]">
                Proportional scale lift with subtle elevation.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={motionTransitions.springSnappy}
                className="px-4 py-2 rounded-lg bg-[#111111] border border-[#222222] text-xs font-medium text-[#F5F5F5] hover:border-[#383838] cursor-pointer"
              >
                Hover over me
              </motion.div>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Mass: 0.5 · Stiffness: 400</div>
          </div>

          {/* 2. PRESS TACTILE */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">02 · Tactile Press</h4>
                <span className="text-[10px] font-mono text-[#606060]">spring-responsive</span>
              </div>
              <p className="text-xs text-[#808080]">
                Physical compression with micro-switch resistance.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                transition={motionTransitions.springSnappy}
                className="px-5 py-2 rounded-lg bg-[#F5F5F5] text-[#050505] text-xs font-medium select-none hover:bg-white active:bg-neutral-200"
              >
                Press & Hold
              </motion.button>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Mass: 0.6 · Damping: 22</div>
          </div>

          {/* 3. EXPAND SURFACE */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">03 · Dynamic Expand</h4>
                <span className="text-[10px] font-mono text-[#606060]">spring-gentle</span>
              </div>
              <p className="text-xs text-[#808080]">
                Layout interpolation without clipping glitches.
              </p>
            </div>

            <div className="flex items-center justify-center py-1">
              <motion.div
                layout
                onClick={() => setIsExpandedDemo(!isExpandedDemo)}
                transition={motionTransitions.springGentle}
                className="cursor-pointer rounded-lg bg-[#111111] border border-[#202020] p-2.5 text-xs text-[#F5F5F5]"
              >
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-3 h-3 text-[#D4D4D4]" />
                  <span>{isExpandedDemo ? 'Expanded details' : 'Click to expand'}</span>
                </div>
                {isExpandedDemo && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-[#808080] mt-1.5 max-w-[190px]"
                  >
                    Smooth layout transitions maintain continuity during DOM resizing.
                  </motion.p>
                )}
              </motion.div>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Stiffness: 280 · Damping: 30</div>
          </div>

          {/* 4. MORPH SHARED LAYOUT */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">04 · Geometry Morph</h4>
                <span className="text-[10px] font-mono text-[#606060]">spring-morph</span>
              </div>
              <p className="text-xs text-[#808080]">
                Continuous coordinate morphing across geometries.
              </p>
            </div>

            <div className="flex items-center justify-center py-1">
              <motion.div
                layout
                onClick={() => {
                  const modes: ('pill' | 'circle' | 'card')[] = ['pill', 'circle', 'card'];
                  const next = modes[(modes.indexOf(morphShape) + 1) % modes.length];
                  setMorphShape(next);
                }}
                transition={motionTransitions.springMorph}
                className={`cursor-pointer bg-[#111111] border border-[#242424] hover:border-[#404040] flex items-center justify-center text-[11px] text-[#F5F5F5] font-mono transition-colors ${
                  morphShape === 'pill'
                    ? 'h-8 px-5 rounded-full'
                    : morphShape === 'circle'
                    ? 'w-10 h-10 rounded-full'
                    : 'w-20 h-12 rounded-lg'
                }`}
              >
                <span>{morphShape}</span>
              </motion.div>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Click shape to cycle bounds</div>
          </div>

          {/* 5. DRAG INERTIA */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60 overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">05 · Physical Drag</h4>
                <span className="text-[10px] font-mono text-[#606060]">elastic constraints</span>
              </div>
              <p className="text-xs text-[#808080]">
                Tactile drag with boundary spring return.
              </p>
            </div>

            <div className="flex items-center justify-center py-1 relative">
              <motion.div
                drag
                dragConstraints={{ left: -30, right: 30, top: -15, bottom: 15 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.04 }}
                className="px-3.5 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-xs text-[#F5F5F5] cursor-grab active:cursor-grabbing flex items-center gap-1.5 select-none"
              >
                <Move className="w-3 h-3 text-[#D4D4D4]" />
                <span>Drag anywhere</span>
              </motion.div>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Elastic: 0.2 · Auto Snapback</div>
          </div>

          {/* 6. DISMISS & RESTORE */}
          <div className="p-6 rounded-xl border border-[#161616] bg-[#0A0A0A] flex flex-col justify-between h-60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">06 · Physics Dismiss</h4>
                <span className="text-[10px] font-mono text-[#606060]">popLayout exit</span>
              </div>
              <p className="text-xs text-[#808080]">
                Natural exit velocity with space reflow.
              </p>
            </div>

            <div className="flex items-center justify-center py-1">
              <AnimatePresence mode="wait">
                {!isDismissed ? (
                  <motion.div
                    key="badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.8 }}
                    transition={motionTransitions.springSnappy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#1E1E1E] text-xs text-[#F5F5F5]"
                  >
                    <span>Temporary Token</span>
                    <button
                      onClick={() => setIsDismissed(true)}
                      className="text-[#606060] hover:text-[#F5F5F5]"
                      aria-label="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setIsDismissed(false)}
                    className="text-xs text-white flex items-center gap-1.5 hover:underline font-medium"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restore Item</span>
                  </button>
                )}
              </AnimatePresence>
            </div>

            <div className="text-[10px] font-mono text-[#555555]">Exit trajectory compensation</div>
          </div>
        </div>
      </Container>
    </section>
  );
};
