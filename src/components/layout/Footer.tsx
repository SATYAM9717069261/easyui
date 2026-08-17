import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';

export interface FooterProps {
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="border-t border-[#141414] bg-[#050505] py-10 text-xs text-[#606060]">
      <Container size="xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="EasyUI Logo"
                className="w-4 h-4 object-contain"
              />
              <span className="font-semibold text-xs text-[#F5F5F5] font-mono">easyui</span>
            </div>
            <p className="text-xs text-[#737373] mt-1">
              Beautiful React components, made easy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#808080]">
            <button
              onClick={onNavigateComponents}
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Components
            </button>
            <button
              onClick={onNavigateDocs}
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Docs
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[#101010] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#555555]">
          <span>© {new Date().getFullYear()} EasyUI. Created by <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-[#808080] hover:text-white transition-colors">Suraj Maurya</a>. Open source & copy-paste friendly.</span>
          <span>React · TypeScript · Motion</span>
        </div>
      </Container>
    </footer>
  );
};
