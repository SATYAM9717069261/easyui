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

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col items-center pointer-events-none">
      {/* Full-width docked background header (fades smoothly when scrolled) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-13 w-full border-b border-[#161616] bg-[#050505]/90 backdrop-blur-md pointer-events-none -z-10"
      />

      {/* Apple-grade Spring Morphing Capsule */}
      <motion.div
        initial={false}
        animate={{
          y: isScrolled ? 10 : 0,
          width: isScrolled ? 'calc(100% - 24px)' : '100%',
          maxWidth: isScrolled ? 860 : 1400,
          height: isScrolled ? 46 : 52,
          borderRadius: isScrolled ? 9999 : 0,
          backgroundColor: isScrolled ? 'rgba(9, 9, 9, 0.88)' : 'rgba(5, 5, 5, 0)',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(22, 22, 22, 0)',
          boxShadow: isScrolled
            ? '0 16px 36px -4px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            : '0 0 0 0 rgba(0, 0, 0, 0)',
          paddingLeft: isScrolled ? 16 : 24,
          paddingRight: isScrolled ? 16 : 24,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 28,
          mass: 0.8,
        }}
        className="relative flex items-center justify-between border backdrop-blur-xl pointer-events-auto"
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, onNavigateHome || onNavigateComponents)}
          className="flex items-center gap-2 group cursor-pointer focus-ring rounded-md py-1 shrink-0"
          aria-label="EasyUI Home"
        >
          <img
            src="/logo.png"
            alt="EasyUI Logo"
            width="20"
            height="20"
            className="w-5 h-5 object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-sm font-medium text-[#F5F5F5] font-mono group-hover:text-white transition-colors">
            easyui
          </span>
        </a>

        {/* Desktop Center Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <a
            href="/components"
            onClick={(e) => handleLinkClick(e, onNavigateComponents)}
            className={`text-xs font-medium transition-colors cursor-pointer ${
              activeView === 'components' || activeView === 'component-detail'
                ? 'text-white'
                : 'text-[#808080] hover:text-[#F5F5F5]'
            }`}
          >
            Components
          </a>
          <a
            href="/docs/introduction"
            onClick={(e) => handleLinkClick(e, onNavigateDocs)}
            className={`text-xs font-medium transition-colors cursor-pointer ${
              activeView === 'docs'
                ? 'text-white'
                : 'text-[#808080] hover:text-[#F5F5F5]'
            }`}
          >
            Docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#808080] hover:text-[#F5F5F5] transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search Trigger Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-7 px-2.5 rounded-lg border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] hover:bg-[#101010] text-xs text-[#737373] hover:text-[#A1A1A1] transition-colors focus-ring cursor-pointer"
            aria-label="Search components (Cmd+K)"
          >
            <Search className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px]">Search...</span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1 rounded bg-[#141414] border border-[#202020] text-[#737373]">
              ⌘K
            </kbd>
          </button>

          {/* GitHub icon link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010] transition-colors focus-ring"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 rounded-lg text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010] focus-ring transition-colors cursor-pointer"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Floating Mobile Dropdown Menu (when scrolled) */}
      <AnimatePresence>
        {mobileOpen && isScrolled && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: 0, scale: 0.96 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="md:hidden w-[calc(100%-24px)] max-w-[860px] rounded-2xl border border-[#242424] bg-[#0A0A0A]/95 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto p-2"
          >
            <nav className="space-y-1" aria-label="Mobile Navigation">
              <a
                href="/components"
                onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'components'
                    ? 'bg-[#181818] text-[#F5F5F5] font-medium border border-[#282828]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212]'
                }`}
              >
                Components
              </a>
              <a
                href="/docs/introduction"
                onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeView === 'docs'
                    ? 'bg-[#181818] text-[#F5F5F5] font-medium border border-[#282828]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212]'
                }`}
              >
                Docs & Installation
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 text-xs text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212] rounded-lg transition-colors"
              >
                GitHub Repository
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
            className="md:hidden absolute top-full left-0 right-0 border-b border-[#1A1A1A] bg-[#070707]/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.85)] overflow-hidden pointer-events-auto"
          >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="py-3 space-y-1" aria-label="Mobile Navigation">
                <a
                  href="/components"
                  onClick={(e) => handleLinkClick(e, onNavigateComponents)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'components'
                      ? 'bg-[#181818] text-[#F5F5F5] font-medium border border-[#282828]'
                      : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212]'
                  }`}
                >
                  Components
                </a>
                <a
                  href="/docs/introduction"
                  onClick={(e) => handleLinkClick(e, onNavigateDocs)}
                  className={`block w-full text-left px-3 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeView === 'docs'
                      ? 'bg-[#181818] text-[#F5F5F5] font-medium border border-[#282828]'
                      : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212]'
                  }`}
                >
                  Docs & Installation
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2.5 text-xs text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212] rounded-lg transition-colors"
                >
                  GitHub Repository
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
