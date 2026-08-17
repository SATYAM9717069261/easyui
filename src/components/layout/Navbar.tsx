import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Container } from './Container';
import { GithubIcon } from '../icons/GithubIcon';
import { GITHUB_URL } from '../../lib/constants';

export interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateComponents: () => void;
  onNavigateDocs: () => void;
  onNavigateHome?: () => void;
  activeView?: 'showcase' | 'docs';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateComponents,
  onNavigateDocs,
  onNavigateHome,
  activeView = 'showcase',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1D1D1D]/80 bg-[#050505]/85 backdrop-blur-md transition-all">
      <Container size="xl">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateHome || onNavigateComponents}
            className="flex items-center gap-2.5 group cursor-pointer focus-ring rounded-md py-1"
          >
            <img
              src="/logo.png"
              alt="EasyUI Logo"
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium tracking-[0.02em] text-[#F5F5F5] font-mono group-hover:text-white transition-colors">
              easyui
            </span>
          </button>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onNavigateComponents}
              className={`text-xs font-medium transition-colors ${
                activeView === 'showcase'
                  ? 'text-white font-semibold'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              Components
            </button>
            <button
              onClick={onNavigateDocs}
              className={`text-xs font-medium transition-colors ${
                activeView === 'docs'
                  ? 'text-white font-semibold'
                  : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
              }`}
            >
              Docs
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 h-8 px-2.5 rounded-lg border border-[#1E1E1E] bg-[#0C0C0C] hover:border-[#2A2A2A] hover:bg-[#121212] text-xs text-[#6F6F6F] hover:text-[#A1A1A1] transition-all focus-ring"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1 rounded bg-[#181818] border border-[#242424] text-[#6F6F6F]">
                ⌘K
              </kbd>
            </button>

            {/* GitHub icon link */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-transparent hover:border-[#1E1E1E] hover:bg-[#101010] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors focus-ring"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] focus-ring"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#1D1D1D] py-4 space-y-2">
            <button
              onClick={() => {
                onNavigateComponents();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] rounded-lg"
            >
              Components
            </button>
            <button
              onClick={() => {
                onNavigateDocs();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] rounded-lg"
            >
              Docs & Installation
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-left px-3 py-2 text-sm text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#101010] rounded-lg"
            >
              GitHub Repository
            </a>
          </div>
        )}
      </Container>
    </header>
  );
};
