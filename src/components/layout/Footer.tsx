import React from 'react';
import { Container } from './Container';
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '../../lib/constants';

export interface FooterProps {
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateComponents, onNavigateDocs }) => {
  return (
    <footer className="border-t border-[#363636] bg-[#151515] py-10 text-xs text-[#737373]">
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

          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A3A3A3]">
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
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
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

        <div className="mt-8 pt-5 border-t border-[#363636] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 text-[11px] text-[#737373]">
          <div>
            <span>© {new Date().getFullYear()} EasyUI. Created by <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-white transition-colors">Suraj Maurya</a>.</span>
            <span className="block sm:inline sm:ml-1 text-[#737373] sm:text-inherit">Open source & copy-paste friendly.</span>
          </div>
          <span>React · TypeScript · Motion</span>
        </div>
      </Container>
    </footer>
  );
};
