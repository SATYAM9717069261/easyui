import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Home
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

  // Derive breadcrumbs based on topic
  const getBreadcrumbLabel = () => {
    switch (activeTopic) {
      case 'introduction':
        return 'Introduction & Vision';
      case 'quick-start':
        return 'Quick Start & Setup';
      case 'architecture':
        return 'Automatic Structure & Registry Engine';
      case 'seo':
        return 'Automated SEO & Audit System';
      case 'collaboration':
        return 'Collaboration & Contributing Guide';
      case 'motion':
        return 'Motion Tokens & Physics';
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
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] pt-4 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-b border-[#181818]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#808080]">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1 hover:text-[#F5F5F5] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>EasyUI</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#444444]" />
            <button
              onClick={() => handleSelectTopicWithMobileClose('introduction')}
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Docs
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#444444]" />
            <span className="text-white font-medium">{getBreadcrumbLabel()}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateComponents}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101010] hover:bg-[#181818] border border-[#202020] text-xs text-[#A1A1A1] hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Component Showroom</span>
            </button>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#242424] text-xs text-[#ECECEC]"
            >
              <Menu className="w-4 h-4 text-white" />
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:sticky lg:top-20 self-start">
            <DocSidebar
              activeTopic={activeTopic}
              onSelectTopic={handleSelectTopicWithMobileClose}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-[#0A0A0A] border-r border-[#202020] h-full p-6 overflow-y-auto z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-3">
                  <span className="text-xs font-mono text-[#808080] uppercase tracking-wider">Navigation</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded text-[#808080] hover:text-white"
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

          {/* Main Documentation Content Area */}
          <div className="flex-1 min-w-0 max-w-4xl">
            {activeTopic === 'introduction' && (
              <DocIntroduction onNavigateSection={handleSelectTopicWithMobileClose} />
            )}

            {activeTopic === 'quick-start' && (
              <DocQuickStart onNavigateSection={handleSelectTopicWithMobileClose} />
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

            {activeTopic === 'motion' && (
              <DocMotionSystem onNavigateSection={handleSelectTopicWithMobileClose} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
