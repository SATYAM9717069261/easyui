import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  badge?: string | number;
}

export interface AnimatedTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabsContainerClassName?: string;
  renderContent?: boolean;
  layoutId?: string;
  variant?: 'default' | 'glass' | 'pill';
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  className,
  tabsContainerClassName,
  renderContent = true,
  layoutId: customLayoutId,
  variant = 'default',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(defaultTab || tabs[0]?.id || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const uniqueId = React.useId();
  const indicatorLayoutId = customLayoutId || `active-tab-indicator-${uniqueId}`;

  React.useEffect(() => {
    if (defaultTab && controlledActiveTab === undefined) {
      setInternalActiveTab(defaultTab);
    }
  }, [defaultTab, controlledActiveTab]);

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const currentTabObj = tabs.find((t) => t.id === activeTab);
  const isGlass = variant === 'glass' || variant === 'pill';

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'flex items-center gap-1 self-start select-none',
          isGlass
            ? 'p-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]'
            : 'p-1 rounded-lg bg-[#0E0E0E] border border-[#1D1D1D]',
          tabsContainerClassName
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'relative text-xs sm:text-sm font-medium transition-colors focus-ring select-none flex items-center gap-2 cursor-pointer',
                isGlass
                  ? 'px-4 py-1.5 rounded-full'
                  : 'px-3.5 py-1.5 rounded-md',
                isActive
                  ? 'text-[#F5F5F5] font-medium'
                  : 'text-[#737373] hover:text-[#D4D4D4]'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={indicatorLayoutId}
                  className={cn(
                    'absolute inset-0 shadow-sm',
                    isGlass
                      ? 'rounded-full bg-[#181818] border border-[#2A2A2A]'
                      : 'rounded-md bg-[#181818] border border-[#2A2A2A]'
                  )}
                  transition={motionTransitions.springMorph}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
                {tab.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#252525] text-[#A1A1A1]">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {renderContent && (
        <div className="relative min-h-[60px]">
          <AnimatePresence mode="wait">
            {currentTabObj?.content && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={motionTransitions.springGentle}
                className="text-sm text-[#A1A1A1]"
              >
                {currentTabObj.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
