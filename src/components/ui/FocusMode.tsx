import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Focus, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface FocusModeItem {
  id: string;
  title: string;
  category?: string;
  metric?: string;
  delta?: string;
  content: React.ReactNode;
}

export interface FocusModeProps {
  /** Array of cards or sections */
  items?: FocusModeItem[];
  /** Controlled active focused item ID */
  focusedId?: string | null;
  /** Callback when focused item changes */
  onFocusChange?: (id: string | null) => void;
  /** Background opacity level when item is focused (0.15 - 0.35) */
  dimOpacity?: number;
  /** Custom class name */
  className?: string;
}

const defaultItems: FocusModeItem[] = [
  {
    id: 'revenue',
    title: 'Monthly Recurring Revenue',
    category: 'Financials',
    metric: '$148,290',
    delta: '+18.4% vs last month',
    content: (
      <div className="space-y-3">
        <p className="text-xs text-[#808080]">
          Gross expansion revenue driven by 42 net-new enterprise team conversions this cycle.
        </p>
        <div className="h-16 rounded-lg bg-[#111111] border border-[#1C1C1C] flex items-end gap-1.5 p-2">
          {[35, 45, 60, 50, 75, 90, 85, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-white/70 hover:bg-white rounded-sm transition-colors"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'traffic',
    title: 'Edge API Throughput',
    category: 'Infrastructure',
    metric: '42.8M req/s',
    delta: '99.998% uptime',
    content: (
      <div className="space-y-3">
        <p className="text-xs text-[#808080]">
          Global Anycast network serving p99 latencies under 14ms across all regions.
        </p>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded bg-[#111111] border border-[#1C1C1C]">
            <span className="text-[#666666] block">Cache Hit</span>
            <span className="text-emerald-400 font-bold">96.4%</span>
          </div>
          <div className="p-2 rounded bg-[#111111] border border-[#1C1C1C]">
            <span className="text-[#666666] block">P99 TTFB</span>
            <span className="text-white font-bold">12.1ms</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'users',
    title: 'Active Developers',
    category: 'Adoption',
    metric: '18,450',
    delta: '+2,100 this week',
    content: (
      <div className="space-y-3">
        <p className="text-xs text-[#808080]">
          Weekly active engineers utilizing CLI component scaffolding across 140+ countries.
        </p>
        <div className="flex items-center gap-2 pt-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-[#D4D4D4]">892 live deployment pipelines</span>
        </div>
      </div>
    ),
  },
];

export const FocusMode: React.FC<FocusModeProps> = ({
  items = defaultItems,
  focusedId: controlledFocusedId,
  onFocusChange,
  dimOpacity = 0.2,
  className,
}) => {
  const [activeId, setActiveId] = useState<string | null>(controlledFocusedId || null);

  useEffect(() => {
    if (controlledFocusedId !== undefined) {
      setActiveId(controlledFocusedId);
    }
  }, [controlledFocusedId]);

  const setFocus = useCallback((id: string | null) => {
    setActiveId(id);
    onFocusChange?.(id);
  }, [onFocusChange]);

  // Listen for Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeId) {
        e.preventDefault();
        setFocus(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId, setFocus]);

  return (
    <div className={cn('relative w-full select-none font-sans', className)}>
      {/* Top Banner with Instructions when in Focus Mode */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={motionTransitions.springSnappy}
            className="mb-4 flex items-center justify-between px-4 py-2 rounded-xl bg-[#121212] border border-[#222222] text-xs"
          >
            <div className="flex items-center gap-2 text-[#A1A1A1]">
              <Focus className="w-3.5 h-3.5 text-white" />
              <span>
                Focus Mode Active:{' '}
                <strong className="text-white font-medium">
                  {items.find((i) => i.id === activeId)?.title}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#666666] hidden sm:inline">
                Press <kbd className="px-1 py-0.5 bg-[#1C1C1C] border border-[#2A2A2A] rounded text-white">ESC</kbd> to exit
              </span>
              <button
                type="button"
                onClick={() => setFocus(null)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1C1C1C] hover:bg-[#252525] text-white text-xs font-medium border border-[#2A2A2A] transition-colors focus-ring"
              >
                <X className="w-3 h-3" />
                <span>Exit</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Focusable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const isFocused = activeId === item.id;
          const isDimmed = activeId !== null && !isFocused;

          return (
            <motion.div
              key={item.id}
              layout
              animate={{
                opacity: isDimmed ? dimOpacity : 1,
                scale: isFocused ? 1.02 : 1,
                borderColor: isFocused ? '#383838' : '#1D1D1D',
                boxShadow: isFocused
                  ? '0 20px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)'
                  : '0 4px 12px rgba(0,0,0,0.4)',
              }}
              transition={motionTransitions.springGentle}
              className={cn(
                'relative rounded-xl border bg-[#0A0A0A] p-5 transition-all overflow-hidden flex flex-col justify-between',
                isDimmed ? 'pointer-events-none' : 'hover:border-[#2A2A2A]'
              )}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    {item.category && (
                      <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
                        {item.category}
                      </span>
                    )}
                    <h4 className="text-sm font-semibold text-[#F5F5F5] tracking-tight mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  {/* Focus Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setFocus(isFocused ? null : item.id)}
                    className={cn(
                      'p-1.5 rounded-lg border transition-colors focus-ring',
                      isFocused
                        ? 'bg-white text-black border-transparent'
                        : 'bg-[#141414] hover:bg-[#1E1E1E] text-[#808080] hover:text-white border-[#222222]'
                    )}
                    title={isFocused ? 'Exit Focus' : 'Focus on this card'}
                    aria-label={isFocused ? `Exit focus on ${item.title}` : `Focus on ${item.title}`}
                  >
                    {isFocused ? <X className="w-3.5 h-3.5" /> : <Focus className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Primary Metric */}
                {item.metric && (
                  <div className="mb-4">
                    <p className="text-2xl font-bold font-mono text-white tracking-tight">
                      {item.metric}
                    </p>
                    {item.delta && (
                      <p className="text-[11px] font-mono text-emerald-400 mt-0.5">
                        {item.delta}
                      </p>
                    )}
                  </div>
                )}

                {/* Body Content */}
                <div className="pt-2 border-t border-[#141414]">
                  {item.content}
                </div>
              </div>

              {/* Bottom Quick Focus Action */}
              {!isFocused && !isDimmed && (
                <button
                  type="button"
                  onClick={() => setFocus(item.id)}
                  className="mt-4 w-full py-1.5 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#1E1E1E] text-[11px] font-medium text-[#808080] hover:text-[#D4D4D4] transition-colors flex items-center justify-center gap-1.5 focus-ring"
                >
                  <Focus className="w-3 h-3" />
                  <span>Focus View</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
