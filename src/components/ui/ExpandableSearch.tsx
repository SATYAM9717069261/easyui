import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface ExpandableSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({
  placeholder = 'Search components, props...',
  onSearch,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setValue('');
    onSearch?.('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <motion.div
        animate={{
          width: isExpanded ? 280 : 160,
          borderColor: isExpanded ? '#2A2A2A' : '#1D1D1D',
          backgroundColor: isExpanded ? '#111111' : '#0A0A0A',
        }}
        transition={motionTransitions.springSnappy}
        className="flex items-center h-9 px-3 rounded-lg border shadow-sm cursor-text transition-colors"
        onClick={handleOpen}
      >
        <Search className="w-3.5 h-3.5 text-[#6F6F6F] shrink-0 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !value && setIsExpanded(false)}
          placeholder={isExpanded ? placeholder : 'Quick search...'}
          className="w-full bg-transparent text-xs sm:text-sm text-[#F5F5F5] placeholder-[#6F6F6F] focus:outline-none"
        />
        <AnimatePresence>
          {value ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="p-0.5 rounded text-[#6F6F6F] hover:text-[#F5F5F5] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#161616] border border-[#222222] text-[10px] text-[#6F6F6F] font-mono shrink-0 select-none"
            >
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
