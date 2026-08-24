import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface BatchAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (selectedIds: string[]) => Promise<void> | void;
  color?: 'default' | 'danger' | 'success';
}

export interface BatchItem {
  id: string;
  title: string;
  subtitle?: string;
  [key: string]: any;
}

export interface BatchGestureTrayProps {
  /** Array of items available for batch selection. */
  items: BatchItem[];
  /** Array of actions available in the batch tray. */
  actions: BatchAction[];
  /** Controlled array of selected item IDs. */
  selectedIds?: string[];
  /** Selection update callback. */
  onSelectionChange?: (ids: string[]) => void;
  /** Action completion handler. */
  onActionComplete?: (actionId: string) => void;
  /** Custom CSS class names. */
  className?: string;
}

export const BatchGestureTray: React.FC<BatchGestureTrayProps> = ({
  items,
  actions,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  onActionComplete,
  className,
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  const selectedIds = controlledSelectedIds !== undefined ? controlledSelectedIds : internalSelectedIds;

  const setSelectedIds = (ids: string[]) => {
    if (onSelectionChange) onSelectionChange(ids);
    else setInternalSelectedIds(ids);
  };

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const handleExecuteAction = async (act: BatchAction) => {
    if (selectedIds.length === 0 || loadingActionId) return;
    setLoadingActionId(act.id);
    try {
      await act.action(selectedIds);
      if (onActionComplete) onActionComplete(act.id);
      setSelectedIds([]);
    } catch {
      // Handle error gracefully
    } finally {
      setLoadingActionId(null);
    }
  };

  return (
    <div className={cn('relative w-full space-y-2', className)}>
      {/* Item List */}
      <div className="space-y-2">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={motionTransitions.springSnappy}
              className={cn(
                'p-3 rounded-xl border flex items-center justify-between cursor-pointer select-none transition-colors',
                isSelected
                  ? 'bg-[#141414] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                  : 'bg-[#0A0A0A] border-[#1C1C1C] hover:border-[#282828]'
              )}
            >
              <div className="flex items-center gap-3">
                {/* Custom Checkbox Pill */}
                <div
                  className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center transition-colors border',
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-[#121212] border-[#2A2A2A] text-transparent'
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>

                <div>
                  <h4 className="text-xs font-medium text-white">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-[#737373] mt-0.5">{item.subtitle}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Bottom Batch Action Tray */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={motionTransitions.springSnappy}
            className="sticky bottom-4 left-0 right-0 z-40 p-2 rounded-2xl bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2"
          >
            {/* Selection Counter & Select All */}
            <div className="flex items-center gap-2 pl-2">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px] font-semibold border border-white/10">
                {selectedIds.length}
              </span>
              <span className="text-xs text-[#A1A1A1] hidden sm:inline">selected</span>

              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-medium text-[#737373] hover:text-white transition-colors ml-1 underline decoration-dotted"
              >
                {selectedIds.length === items.length ? 'Deselect all' : 'Select all'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              {actions.map((act) => {
                const isLoading = loadingActionId === act.id;
                const isDanger = act.color === 'danger';

                return (
                  <button
                    key={act.id}
                    type="button"
                    disabled={Boolean(loadingActionId)}
                    onClick={() => handleExecuteAction(act)}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40',
                      isDanger
                        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20'
                        : 'bg-[#1E1E1E] text-white hover:bg-white hover:text-black border border-white/10'
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      act.icon
                    )}
                    <span>{act.label}</span>
                  </button>
                );
              })}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="p-1.5 rounded-xl text-[#737373] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Dismiss selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
