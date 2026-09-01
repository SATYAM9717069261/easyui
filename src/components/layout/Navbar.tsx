import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { GITHUB_URL } from '../../lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../lib/theme/useTheme';

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
  const { theme } = useTheme();

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

  // The pill colors come from CSS variables that are themed (light / dark).
  // Reading them here keeps the framer animation in sync with the active
  // theme. Subscribing to `theme` from the shared ThemeContext guarantees
  // the framer `animate` target is rebuilt whenever the user toggles the
  // theme from anywhere in the app.
  const cssVar = (name: string) => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  };

  const pillMotion = {
    initial: false,
    animate: {
      y: isScrolled ? 14 : 0,
      height: isScrolled ? 44 : 56,
      borderRadius: 9999,
      backgroundColor: isScrolled ? cssVar('--pill-bg-scrolled') : cssVar('--pill-bg-idle'),
      borderColor: isScrolled ? cssVar('--pill-border-scrolled') : cssVar('--pill-border-idle'),
      boxShadow: isScrolled ? cssVar('--pill-shadow-scrolled') : cssVar('--pill-shadow-idle'),
    },
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 28,
      mass: 0.8,
    },
  };
  // Reference `theme` so React re-evaluates the object above on every toggle.
  void theme;

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
              className="w-[22px] h-[22px] object-contain group-hover:scale-105 transition-transform duration-200 invert dark:invert-0"
            />
            <span className="text-sm font-medium text-text-primary font-mono group-hover:text-accent transition-colors">
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
                ? 'bg-surface-hover text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Home
          </a>
          <a
            href="/components"
            onClick={(e) => handleLinkClick(e, onNavigateComponents)}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
              activeView === 'components' || activeView === 'component-detail'
                ? 'bg-surface-hover text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Components
          </a>
          <a
            href="/docs/introduction"
            onClick={(e) => handleLinkClick(e, onNavigateDocs)}
            className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-pointer ${
              activeView === 'docs'
                ? 'bg-surface-hover text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Docs
          </a>
        </motion.nav>

        {/* Pill 3 — Search + GitHub + Theme toggle on desktop, Menu trigger on mobile */}
        <motion.div
          {...pillMotion}
          className="hidden md:flex items-center gap-0.5 border backdrop-blur-xl px-1.5 py-1 pointer-events-auto"
        >
          {/* Desktop: search + GitHub + theme toggle icons */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus-ring cursor-pointer"
            aria-label="Search components (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus-ring"
            aria-label="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <ThemeToggle />
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
            backgroundColor: isScrolled ? cssVar('--pill-bg-scrolled') : cssVar('--pill-bg-idle'),
            borderColor: isScrolled ? cssVar('--pill-border-scrolled') : cssVar('--pill-border-idle'),
            boxShadow: isScrolled ? cssVar('--pill-shadow-scrolled') : cssVar('--pill-shadow-idle'),
          }}
          transition={{
            type: 'spring' as const,
            stiffness: 220,
            damping: 28,
            mass: 0.8,
          }}
          className="md:hidden flex items-center justify-center border backdrop-blur-xl pointer-events-auto focus-ring text-text-secondary hover:text-text-primary hover:bg-surface-hover/40 transition-colors"
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
            className="md:hidden w-[calc(100%-24px)] max-w-[860px] mx-auto rounded-2xl border border-border bg-surface/95 backdrop-blur-2xl shadow-elevated overflow-hidden pointer-events-auto p-2"
          >
            <nav className="space-y-1" aria-label="Mobile Navigation">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'showcase'
                    ? 'bg-surface-hover text-text-primary font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                Home
              </a>
              <a
                href="/components"
                onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'components'
                    ? 'bg-surface-hover text-text-primary font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                Components
              </a>
              <a
                href="/docs/introduction"
                onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'docs'
                    ? 'bg-surface-hover text-text-primary font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                Docs
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                GitHub
              </a>
              {/* Mobile theme toggle — full width, easy to tap */}
              <div className="pt-1 border-t border-border-subtle mt-1">
                <ThemeToggle
                  className="w-full justify-start px-3 py-2 text-xs"
                  label="Toggle theme"
                />
              </div>
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
            className="md:hidden absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-xl shadow-elevated overflow-hidden pointer-events-auto"
          >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="py-3 space-y-1" aria-label="Mobile Navigation">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'showcase'
                      ? 'bg-surface-hover text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  Home
                </a>
                <a
                  href="/components"
                  onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'components'
                      ? 'bg-surface-hover text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  Components
                </a>
                <a
                  href="/docs/introduction"
                  onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'docs'
                      ? 'bg-surface-hover text-text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  Docs
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  GitHub
                </a>
                <div className="pt-1 border-t border-border-subtle mt-1">
                  <ThemeToggle
                    className="w-full justify-start px-3 py-2.5 text-xs"
                    label="Toggle theme"
                  />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
