import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';

export interface FooterProps {
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="border-t border-[#181818] bg-[#050505] py-12 text-xs text-[#6F6F6F]">
      <Container size="xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="EasyUI Logo"
                className="w-5 h-5 object-contain"
              />
              <span className="font-semibold text-sm text-[#F5F5F5]">easyui</span>
            </div>
            <p className="text-xs text-[#6F6F6F] mt-1.5">
              Beautiful React components, made easy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#A1A1A1]">
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
            <span className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
              MIT License
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#555555]">
          <span>© {new Date().getFullYear()} EasyUI. Created by <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-[#A1A1A1] hover:text-white transition-colors font-medium">Suraj Maurya</a>. Open source & copy-paste friendly.</span>
          <span>Built with React, TypeScript & Motion.</span>
        </div>
      </Container>
    </footer>
  );
};
