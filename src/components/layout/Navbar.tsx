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
    <header className="sticky top-0 z-40 w-full border-b border-[#161616] bg-[#050505]/90 backdrop-blur-md transition-all">
      <Container size="xl">
        <div className="flex h-13 items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateHome || onNavigateComponents}
            className="flex items-center gap-2 group cursor-pointer focus-ring rounded-md py-1"
          >
            <img
              src="/logo.png"
              alt="EasyUI Logo"
              className="w-5 h-5 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-sm font-medium text-[#F5F5F5] font-mono group-hover:text-white transition-colors">
              easyui
            </span>
          </button>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onNavigateComponents}
              className={`text-xs font-medium transition-colors ${
                activeView === 'showcase'
                  ? 'text-white'
                  : 'text-[#808080] hover:text-[#F5F5F5]'
              }`}
            >
              Components
            </button>
            <button
              onClick={onNavigateDocs}
              className={`text-xs font-medium transition-colors ${
                activeView === 'docs'
                  ? 'text-white'
                  : 'text-[#808080] hover:text-[#F5F5F5]'
              }`}
            >
              Docs
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-[#808080] hover:text-[#F5F5F5] transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 h-7 px-2.5 rounded-lg border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#282828] hover:bg-[#101010] text-xs text-[#737373] hover:text-[#A1A1A1] transition-colors focus-ring"
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
              rel="noreferrer"
              className="p-1.5 rounded-lg text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010] transition-colors focus-ring"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#808080] hover:text-[#F5F5F5] hover:bg-[#101010] focus-ring"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#161616] py-3 space-y-1">
            <button
              onClick={() => {
                onNavigateComponents();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-xs text-[#808080] hover:text-[#F5F5F5] hover:bg-[#0E0E0E] rounded-md"
            >
              Components
            </button>
            <button
              onClick={() => {
                onNavigateDocs();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-xs text-[#808080] hover:text-[#F5F5F5] hover:bg-[#0E0E0E] rounded-md"
            >
              Docs & Installation
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-left px-3 py-2 text-xs text-[#808080] hover:text-[#F5F5F5] hover:bg-[#0E0E0E] rounded-md"
            >
              GitHub Repository
            </a>
          </div>
        )}
      </Container>
    </header>
  );
};
