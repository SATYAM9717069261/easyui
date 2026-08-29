import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { GITHUB_URL } from '../../lib/constants';

export interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateComponents: () => void;
  onNavigateDocs: () => void;
  onNavigateHome?: () => void;
  activeView?: 'showcase' | 'components' | 'docs' | 'component-detail';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateComponents,
  onNavigateDocs,
  onNavigateHome,
  activeView = 'showcase',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 15 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 15 && isScrolled) {
      setIsScrolled(false);
    }
  });

  const handleLinkClick = (e: React.MouseEvent, action?: () => void) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      action?.();
      setMobileOpen(false);
    }
  };

  // Shared pill motion config — used by all three pills so they morph in sync.
  const pillMotion = {
    initial: false,
    animate: {
      y: isScrolled ? 14 : 0,
      height: isScrolled ? 44 : 56,
      borderRadius: 9999,
      backgroundColor: isScrolled ? 'rgba(14, 14, 14, 0.85)' : 'rgba(14, 14, 14, 0)',
      borderColor: isScrolled ? 'rgba(31, 31, 31, 1)' : 'rgba(31, 31, 31, 0)',
      boxShadow: isScrolled
        ? '0 12px 28px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)'
        : '0 0 0 0 rgba(0, 0, 0, 0)',
    },
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 28,
      mass: 0.8,
    },
  };

  return (
    <header className="sticky top-0 z-40 w-full pointer-events-none">
      {/* Top dock — three independent pills, side by side, evenly distributed */}
      <div className="w-full flex items-center justify-between gap-2 px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
        {/* Pill 1 — Logo (left) */}
        <motion.div
          {...pillMotion}
          className="flex items-center gap-2 border backdrop-blur-xl px-3 sm:px-3.5 pointer-events-auto"
        >
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
            className="flex items-center gap-2 group cursor-pointer focus-ring rounded-md py-1"
            aria-label="EasyUI Home"
          >
            <img
              src="/logo.png"
              alt="EasyUI Logo"
              width="22"
              height="22"
              className="w-[22px] h-[22px] object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-sm font-medium text-[#FAFAFA] font-mono group-hover:text-white transition-colors">
              easyui
            </span>
          </a>
        </motion.div>

        {/* Pill 2 — Center navigation (Home, Components, Docs) */}
        <motion.nav
          {...pillMotion}
          aria-label="Main Navigation"
          className="hidden md:flex items-center border backdrop-blur-xl px-1.5 py-1 pointer-events-auto"
        >
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
              activeView === 'showcase'
                ? 'bg-[#141414] text-[#FAFAFA]'
                : 'text-[#A1A1A1] hover:text-[#FAFAFA]'
            }`}
          >
            Home
          </a>
          <a
            href="/components"
            onClick={(e) => handleLinkClick(e, onNavigateComponents)}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
              activeView === 'components' || activeView === 'component-detail'
                ? 'bg-[#141414] text-[#FAFAFA]'
                : 'text-[#A1A1A1] hover:text-[#FAFAFA]'
            }`}
          >
            Components
          </a>
          <a
            href="/docs/introduction"
            onClick={(e) => handleLinkClick(e, onNavigateDocs)}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
              activeView === 'docs'
                ? 'bg-[#141414] text-[#FAFAFA]'
                : 'text-[#A1A1A1] hover:text-[#FAFAFA]'
            }`}
          >
            Docs
          </a>
        </motion.nav>

        {/* Pill 3 — Search + GitHub on desktop, Menu trigger on mobile */}
        <motion.div
          {...pillMotion}
          className="hidden md:flex items-center gap-0.5 border backdrop-blur-xl px-1.5 py-1 pointer-events-auto"
        >
          {/* Desktop: search + GitHub icons */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1.5 rounded-full text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414] transition-colors focus-ring cursor-pointer"
            aria-label="Search components (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414] transition-colors focus-ring"
            aria-label="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Mobile-only: perfectly circular menu trigger pill */}
        <motion.button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          initial={false}
          animate={{
            y: isScrolled ? 14 : 0,
            width: isScrolled ? 44 : 48,
            height: isScrolled ? 44 : 48,
            borderRadius: 9999,
            backgroundColor: isScrolled ? 'rgba(14, 14, 14, 0.85)' : 'rgba(14, 14, 14, 0)',
            borderColor: isScrolled ? 'rgba(31, 31, 31, 1)' : 'rgba(31, 31, 31, 0)',
            boxShadow: isScrolled
              ? '0 12px 28px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)'
              : '0 0 0 0 rgba(0, 0, 0, 0)',
          }}
          transition={{
            type: 'spring' as const,
            stiffness: 220,
            damping: 28,
            mass: 0.8,
          }}
          className="md:hidden flex items-center justify-center border backdrop-blur-xl pointer-events-auto focus-ring text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]/40 transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Floating Mobile Dropdown Menu (when scrolled) */}
      <AnimatePresence>
        {mobileOpen && isScrolled && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: 0, scale: 0.96 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="md:hidden w-[calc(100%-24px)] max-w-[860px] mx-auto rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E]/95 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto p-2"
          >
            <nav className="space-y-1" aria-label="Mobile Navigation">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'showcase'
                    ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                    : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                }`}
              >
                Home
              </a>
              <a
                href="/components"
                onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'components'
                    ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                    : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                }`}
              >
                Components
              </a>
              <a
                href="/docs/introduction"
                onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'docs'
                    ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                    : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                }`}
              >
                Docs
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 text-xs text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414] rounded-lg transition-colors"
              >
                GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Unscrolled Mobile Overlay Dropdown */}
      <AnimatePresence>
        {mobileOpen && !isScrolled && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-[#1F1F1F] bg-[#050505]/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto"
          >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="py-3 space-y-1" aria-label="Mobile Navigation">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'showcase'
                      ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                      : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                  }`}
                >
                  Home
                </a>
                <a
                  href="/components"
                  onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'components'
                      ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                      : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                  }`}
                >
                  Components
                </a>
                <a
                  href="/docs/introduction"
                  onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'docs'
                      ? 'bg-[#141414] text-[#FAFAFA] font-medium'
                      : 'text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414]'
                  }`}
                >
                  Docs
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2.5 text-xs text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-[#141414] rounded-lg transition-colors"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
