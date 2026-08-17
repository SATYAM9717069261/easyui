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
    <section id="motion-showcase" className="py-24 bg-[#070707] border-t border-[#141414]">
      <Container size="xl">
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-widest">
            Physics
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
            Motion that feels natural.
          </h2>
          <p className="text-sm text-[#808080] mt-2">
            Physical weights, spring dynamics, and continuous transformations designed to communicate state rather than cause distraction.
          </p>
        </div>

        {/* 6 Micro-motion demonstrations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. HOVER PHYSICS */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">01 · Hover Scale & Glow</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">spring-snappy</span>
              </div>
              <p className="text-xs text-[#808080]">
                Proportional scale lift with subtle elevation and border illumination.
              </p>
            </div>

            <div className="flex items-center justify-center py-4">
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={motionTransitions.springSnappy}
                className="px-5 py-2.5 rounded-xl bg-[#141414] border border-[#282828] text-xs font-medium text-[#F5F5F5] hover:border-[#38BDF8]/60 cursor-pointer shadow-sm hover:shadow-[0_0_20px_-3px_rgba(56,189,248,0.25)]"
              >
                Hover over me
              </motion.div>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Mass: 0.5 · Stiffness: 400</div>
          </div>

          {/* 2. PRESS TACTILE */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">02 · Tactile Press</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">spring-responsive</span>
              </div>
              <p className="text-xs text-[#808080]">
                Physical compression that mimics micro-switch button resistance.
              </p>
            </div>

            <div className="flex items-center justify-center py-4">
              <motion.button
                whileTap={{ scale: 0.9, rotate: -1 }}
                transition={motionTransitions.springSnappy}
                className="px-6 py-2.5 rounded-xl bg-[#F5F5F5] text-[#050505] text-xs font-semibold select-none active:bg-white"
              >
                Press & Hold
              </motion.button>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Mass: 0.6 · Damping: 22</div>
          </div>

          {/* 3. EXPAND SURFACE */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">03 · Dynamic Expand</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">spring-gentle</span>
              </div>
              <p className="text-xs text-[#808080]">
                Layout interpolation without hard width/height clipping glitches.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <motion.div
                layout
                onClick={() => setIsExpandedDemo(!isExpandedDemo)}
                transition={motionTransitions.springGentle}
                className="cursor-pointer rounded-xl bg-[#141414] border border-[#262626] p-3 text-xs text-[#F5F5F5]"
              >
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{isExpandedDemo ? 'Expanded details' : 'Click to expand'}</span>
                </div>
                {isExpandedDemo && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-[#808080] mt-2 max-w-[200px]"
                  >
                    Smooth layout transitions maintain continuity during DOM resizing.
                  </motion.p>
                )}
              </motion.div>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Stiffness: 280 · Damping: 30</div>
          </div>

          {/* 4. MORPH SHARED LAYOUT */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">04 · Geometry Morph</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">spring-morph</span>
              </div>
              <p className="text-xs text-[#808080]">
                Continuous coordinate morphing between different structural bounds.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <motion.div
                layout
                onClick={() => {
                  const modes: ('pill' | 'circle' | 'card')[] = ['pill', 'circle', 'card'];
                  const next = modes[(modes.indexOf(morphShape) + 1) % modes.length];
                  setMorphShape(next);
                }}
                transition={motionTransitions.springMorph}
                className={`cursor-pointer bg-[#141414] border border-[#38BDF8]/40 flex items-center justify-center text-[11px] text-[#F5F5F5] font-mono ${
                  morphShape === 'pill'
                    ? 'h-9 px-6 rounded-full'
                    : morphShape === 'circle'
                    ? 'w-12 h-12 rounded-full'
                    : 'w-24 h-16 rounded-xl'
                }`}
              >
                <span>{morphShape}</span>
              </motion.div>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Click shape to cycle geometries</div>
          </div>

          {/* 5. DRAG INERTIA */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64 overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">05 · Physical Drag</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">elastic constraints</span>
              </div>
              <p className="text-xs text-[#808080]">
                Tactile drag with boundary springs and momentum return.
              </p>
            </div>

            <div className="flex items-center justify-center py-2 relative">
              <motion.div
                drag
                dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-[#181818] border border-[#2C2C2C] text-xs text-[#F5F5F5] cursor-grab active:cursor-grabbing flex items-center gap-2 select-none shadow-md"
              >
                <Move className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Drag anywhere</span>
              </motion.div>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Elastic: 0.2 · Auto Snapback</div>
          </div>

          {/* 6. DISMISS & RESTORE */}
          <div className="p-6 rounded-2xl border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-between h-64">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-[#F5F5F5]">06 · Physics Dismiss</h4>
                <span className="text-[10px] font-mono text-[#6F6F6F]">popLayout exit</span>
              </div>
              <p className="text-xs text-[#808080]">
                Natural exit velocity with smooth space reflow.
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              <AnimatePresence mode="wait">
                {!isDismissed ? (
                  <motion.div
                    key="badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.8 }}
                    transition={motionTransitions.springSnappy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#222222] text-xs text-[#F5F5F5]"
                  >
                    <span>Temporary Token</span>
                    <button
                      onClick={() => setIsDismissed(true)}
                      className="text-[#6F6F6F] hover:text-[#F5F5F5]"
                      aria-label="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setIsDismissed(false)}
                    className="text-xs text-[#38BDF8] flex items-center gap-1.5 hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore Item</span>
                  </button>
                )}
              </AnimatePresence>
            </div>

            <div className="text-[11px] text-[#6F6F6F]">Exit trajectory with layout compensation</div>
          </div>
        </div>
      </Container>
    </section>
  );
};
