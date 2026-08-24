import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowLeft,
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
    <div className="min-h-screen bg-[#151515] text-[#F5F5F5] pt-2 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs */}
        <div className="flex items-center justify-between gap-3 py-3 mb-6 sm:mb-8 border-b border-[#363636]">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Mobile Sidebar Trigger (Placed on Left with Icon and Text) */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Open documentation menu"
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2A2A2A] border border-[#363636] text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors shrink-0 focus-ring cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5 text-[#CCCCCC]" />
              <span>Menu</span>
            </button>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-[#A3A3A3] truncate">
              <button
                onClick={onNavigateHome}
                className="hover:text-white transition-colors shrink-0"
              >
                EasyUI
              </button>
              <span className="text-[#737373]">/</span>
              <button
                onClick={() => handleSelectTopicWithMobileClose('introduction')}
                className="hover:text-white transition-colors shrink-0"
              >
                Docs
              </button>
              <span className="text-[#737373]">/</span>
              <span className="text-white font-medium truncate">{getBreadcrumbLabel()}</span>
            </nav>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateComponents}
              aria-label="Back to Components"
              className="p-1.5 rounded-lg text-[#8A8A8A] hover:text-white hover:bg-[#242424] transition-all focus-ring cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
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
          <AnimatePresence>
            {mobileSidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="relative w-72 max-w-[80vw] bg-[#202020] border-r border-[#363636] h-full p-6 overflow-y-auto z-10 space-y-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-[#363636] pb-3">
                    <span className="text-xs font-mono text-[#A3A3A3] uppercase tracking-wider">Documentation</span>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-[#242424] hover:bg-[#2C2C2C] border border-[#363636] transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <DocSidebar
                    activeTopic={activeTopic}
                    onSelectTopic={handleSelectTopicWithMobileClose}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

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

            {/* Fallback to Introduction for unknown or root doc topic */}
            {!['introduction', 'quick-start', 'motion', 'architecture', 'seo', 'collaboration'].includes(activeTopic) && (
              <DocIntroduction onNavigateSection={handleSelectTopicWithMobileClose} />
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default DocsPage;

