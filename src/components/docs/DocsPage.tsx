import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowLeft
} from 'lucide-react';
import { Container } from '../layout/Container';
import { DocSidebar } from './DocSidebar';
import { DocIntroduction } from './sections/DocIntroduction';
import { DocQuickStart } from './sections/DocQuickStart';
import { DocArchitecture } from './sections/DocArchitecture';
import { DocCollaboration } from './sections/DocCollaboration';
import { DocMotionSystem } from './sections/DocMotionSystem';
import { DocSEO } from './sections/DocSEO';

export interface DocsPageProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
  onNavigateHome: () => void;
  onNavigateComponents: () => void;
}

export const DocsPage: React.FC<DocsPageProps> = ({
  activeTopic,
  onSelectTopic,
  onNavigateHome,
  onNavigateComponents,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Derive human-readable topic title for breadcrumbs
  const getBreadcrumbLabel = () => {
    switch (activeTopic) {
      case 'introduction':
        return 'Introduction';
      case 'quick-start':
        return 'Quick Start';
      case 'motion':
        return 'Motion Tokens';
      case 'architecture':
        return 'Registry Architecture';
      case 'seo':
        return 'Automated SEO';
      case 'collaboration':
        return 'Contributing Guide';
      default:
        return 'Documentation';
    }
  };

  const handleSelectTopicWithMobileClose = (topicId: string) => {
    onSelectTopic(topicId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] pt-2 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 py-3 mb-8 border-b border-[#161616]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#777777]">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors"
            >
              EasyUI
            </button>
            <span className="text-[#383838]">/</span>
            <button
              onClick={() => handleSelectTopicWithMobileClose('introduction')}
              className="hover:text-white transition-colors"
            >
              Docs
            </button>
            <span className="text-[#383838]">/</span>
            <span className="text-white font-medium">{getBreadcrumbLabel()}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateComponents}
              aria-label="Back to Components"
              className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-all focus-ring"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Mobile Sidebar Trigger */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-xs text-white"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sticky Sidebar + Centered Clean Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:w-64 shrink-0 lg:sticky lg:top-24 self-start">
            <DocSidebar
              activeTopic={activeTopic}
              onSelectTopic={handleSelectTopicWithMobileClose}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-[#0A0A0A] border-r border-[#1E1E1E] h-full p-6 overflow-y-auto z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">Documentation</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-md text-[#888888] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <DocSidebar
                  activeTopic={activeTopic}
                  onSelectTopic={handleSelectTopicWithMobileClose}
                />
              </div>
            </div>
          )}

          {/* Main Documentation Article */}
          <main className="flex-1 min-w-0 max-w-3xl pb-12">
            {activeTopic === 'introduction' && (
              <DocIntroduction onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'quick-start' && (
              <DocQuickStart onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'motion' && (
              <DocMotionSystem onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'architecture' && (
              <DocArchitecture onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'seo' && (
              <DocSEO onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'collaboration' && (
              <DocCollaboration onNavigateSection={handleSelectTopicWithMobileClose} />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};
