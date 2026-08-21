import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { EMAIL } from '../../lib/constants';

export const InspirationNote: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Minimal Pure-Text Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="text-xs text-[#737373] hover:text-[#F5F5F5] transition-colors duration-200 underline-offset-4 hover:underline py-1.5 px-2 rounded focus-ring cursor-pointer"
      >
        A note on inspiration
      </button>

      {/* Apple-Style Smooth Dialog Popover (Opens Downward, Mobile Safe) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.6,
            }}
            role="dialog"
            aria-label="A note on inspiration"
            className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-[90vw] sm:w-[440px] max-w-lg origin-top-left sm:origin-top-right"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E0E]/95 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-[#A3A3A3] space-y-3">
              {/* Subtle glass reflection highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Dialog Header - Pure text, no icons */}
              <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
                <h3 className="text-sm font-semibold text-[#F5F5F5] tracking-tight">
                  A note on inspiration
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[#666666] hover:text-[#F5F5F5] rounded-md transition-colors focus-ring cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Full Inspiration & Attribution Note */}
              <p className="text-xs leading-relaxed text-[#8E8E8E]">
                The components on EasyUI are built from scratch and are inspired by designs, interactions, and ideas found across the internet. They are created for learning, experimentation, and the UI community, and are not intended to intentionally copy or claim ownership of anyone else’s work.
              </p>

              <p className="text-xs leading-relaxed text-[#8E8E8E]">
                If you believe a component, image, design, or other material on EasyUI belongs to you and has been used without proper credit, please reach out to us. We’re happy to review the concern and, where appropriate, provide proper attribution or remove the material.
              </p>

              {/* Minimal inline write us redirection */}
              <p className="text-xs leading-relaxed text-[#8E8E8E]">
                For credit or removal requests,{' '}
                <a
                  href={`mailto:${EMAIL}?subject=EasyUI%20Credit%20or%20Removal%20Request`}
                  className="text-[#F5F5F5] hover:text-white underline underline-offset-4 decoration-[#555555] hover:decoration-white font-medium transition-colors cursor-pointer"
                >
                  write us
                </a>
                .
              </p>

              {/* Respect Footer Note */}
              <p className="text-[11px] leading-relaxed text-[#666666] pt-0.5">
                We respect the work of designers and developers and want EasyUI to be a place for sharing and building, not taking credit for someone else’s work.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
