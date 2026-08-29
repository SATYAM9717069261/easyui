import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL } from '../../lib/constants';

export interface FooterProps {
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="bg-[#050505] pt-16 sm:pt-20 pb-10 sm:pb-12 text-[#6B6B6B]">
      <Container size="xl">
        {/* Top row: wordmark on the left, simple link row on the right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="EasyUI Logo"
              width="24"
              height="24"
              className="w-6 h-6 object-contain"
            />
            <span className="text-base font-medium text-[#FAFAFA] font-mono">easyui</span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]"
            aria-label="Footer navigation"
          >
            <button
              onClick={onNavigateComponents}
              className="text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
            >
              Components
            </button>
            <button
              onClick={onNavigateDocs}
              className="text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
            >
              Docs
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded"
            >
              GitHub
            </a>
          </nav>
        </div>

        {/* Bottom row: copyright + signature, separated by generous space (no border) */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px]">
          <div>
            © {new Date().getFullYear()} EasyUI. Built by{' '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1A1] hover:text-white transition-colors"
            >
              Suraj Maurya
            </a>
            .
          </div>
          <span className="font-mono text-[11px] text-[#525252] tracking-wide">
            React · TypeScript · Motion
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
