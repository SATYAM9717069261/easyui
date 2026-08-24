import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

export interface IOSSearchBarProps {
  /** Current search input value. */
  value: string;
  /** Text change handler. */
  onChange: (value: string) => void;
  /** Submit handler fired on Enter. */
  onSubmit?: (value: string) => void;
  /** Optional clear handler. */
  onClear?: () => void;
  /** Placeholder text. Default is "Search...". */
  placeholder?: string;
  /** Disables input. */
  disabled?: boolean;
  /** Auto focus on mount. */
  autoFocus?: boolean;
  /** Collapsed default width in pixels or CSS string. Default is '220px'. */
  collapsedWidth?: number | string;
  /** Expanded width in pixels or CSS string. Default is '340px'. */
  expandedWidth?: number | string;
  /** Custom CSS class names. */
  className?: string;
}

export const IOSSearchBar: React.FC<IOSSearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search...',
  disabled = false,
  autoFocus = false,
  collapsedWidth = '220px',
  expandedWidth = '340px',
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit(value);
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const isExpanded = isFocused || value.length > 0;

  return (
    <motion.div
      animate={{
        width: isExpanded ? expandedWidth : collapsedWidth,
      }}
      transition={motionTransitions.springSmooth}
      className={cn('relative flex items-center', className)}
    >
      <div
        className={cn(
          'relative w-full flex items-center h-10 px-3.5 rounded-full border transition-all duration-200',
          isFocused
            ? 'bg-[#121212] border-[#383838] shadow-[0_0_20px_rgba(255,255,255,0.06)]'
            : 'bg-[#0A0A0A] border-[#1E1E1E] hover:border-[#2A2A2A]'
        )}
      >
        <Search
          className={cn(
            'w-4 h-4 shrink-0 transition-colors mr-2.5',
            isFocused ? 'text-white' : 'text-[#666666]'
          )}
        />

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-transparent text-[16px] text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:ring-0 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden disabled:opacity-40 disabled:cursor-not-allowed"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {value.length > 0 && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              aria-label="Clear search"
              className="p-1 rounded-full bg-[#222222] text-[#888888] hover:text-white hover:bg-[#333333] transition-colors shrink-0 ml-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Keyboard shortcut indicator when idle */}
        {!isExpanded && value.length === 0 && (
          <div className="hidden sm:flex items-center gap-0.5 text-[9px] font-mono text-[#555555] shrink-0 ml-1">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
