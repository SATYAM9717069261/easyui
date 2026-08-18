import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { FeaturedShowcase } from './components/sections/FeaturedShowcase';
import { ComponentDirectory } from './components/sections/ComponentDirectory';
import { AllComponentsPage } from './components/sections/AllComponentsPage';
import { CodePhilosophy } from './components/sections/CodePhilosophy';
import { MotionShowcase } from './components/sections/MotionShowcase';
import { DevExperience } from './components/sections/DevExperience';
import { FinalCta } from './components/sections/FinalCta';
import { CommandMenu } from './components/ui/CommandMenu';
import { ComponentDetailModal } from './components/docs/ComponentDetailModal';
import { DocsPage } from './components/docs/DocsPage';
import { EASY_COMPONENTS } from './components/registry/components-data';
import type { EasyComponentMeta } from './types/component';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAnalyticsTracker } from './lib/analytics';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModalComponent, setSelectedModalComponent] = useState<EasyComponentMeta | null>(null);
  const [activeView, setActiveView] = useState<'showcase' | 'components' | 'docs'>('showcase');
  const [activeDocTopic, setActiveDocTopic] = useState<string>('introduction');
  const [componentPage, setComponentPage] = useState<number>(1);

  // Initialize analytics & track page/view changes across the SPA
  useAnalyticsTracker({ activeView, componentPage, activeDocTopic });

  // Sync state from URL hash and search params
  const parseUrlState = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');

    // Check if query params exist in search or in hash (e.g. #components?page=2 or ?page=2)
    let pageFromUrl = 1;
    if (rawHash.includes('?')) {
      const queryString = rawHash.split('?')[1];
      const params = new URLSearchParams(queryString);
      const p = parseInt(params.get('page') || '1', 10);
      if (!isNaN(p) && p > 0) pageFromUrl = p;
    } else if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get('page') || '1', 10);
      if (!isNaN(p) && p > 0) pageFromUrl = p;
    }

    const route = rawHash.split('?')[0];

    if (route === 'components' || route === 'all-components') {
      setActiveView('components');
      setComponentPage(pageFromUrl);
      return;
    }

    if (route.startsWith('docs')) {
      setActiveView('docs');
      const parts = route.split('/');
      if (parts.length === 1 || !parts[1]) {
        setActiveDocTopic('introduction');
      } else {
        setActiveDocTopic(parts[1]);
      }
      return;
    }

    // Default: showcase
    setActiveView('showcase');
  }, []);

  useEffect(() => {
    parseUrlState();
    window.addEventListener('hashchange', parseUrlState);
    window.addEventListener('popstate', parseUrlState);
    return () => {
      window.removeEventListener('hashchange', parseUrlState);
      window.removeEventListener('popstate', parseUrlState);
    };
  }, [parseUrlState]);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectComponentById = (id: string) => {
    const found = EASY_COMPONENTS.find((c) => c.id === id);
    if (found) {
      setSelectedModalComponent(found);
    }
  };

  const handleNavigateComponents = () => {
    if (activeView !== 'showcase') {
      window.location.hash = '';
      setActiveView('showcase');
      setTimeout(() => {
        document.getElementById('components-directory')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      document.getElementById('components-directory')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateAllComponents = (page = 1) => {
    const hash = page > 1 ? `components?page=${page}` : 'components';
    window.location.hash = hash;
    setActiveView('components');
    setComponentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    const hash = page > 1 ? `components?page=${page}` : 'components';
    window.location.hash = hash;
    setComponentPage(page);
  };

  const handleNavigateHome = () => {
    window.location.hash = '';
    setActiveView('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDocs = (topicId?: string) => {
    const topic = topicId || 'introduction';
    window.location.hash = `docs/${topic}`;
    setActiveView('docs');
    setActiveDocTopic(topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocTopic = (topicId: string) => {
    window.location.hash = `docs/${topicId}`;
    setActiveDocTopic(topicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-white/20 selection:text-white">
      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />

      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateComponents={handleNavigateComponents}
        onNavigateDocs={() => handleNavigateDocs('introduction')}
        onNavigateHome={handleNavigateHome}
        activeView={activeView}
      />

      {/* Main View Router */}
      {activeView === 'docs' ? (
        <DocsPage
          activeTopic={activeDocTopic}
          onSelectTopic={handleSelectDocTopic}
          onNavigateHome={handleNavigateHome}
          onNavigateComponents={handleNavigateComponents}
        />
      ) : activeView === 'components' ? (
        <AllComponentsPage
          currentPage={componentPage}
          onPageChange={handlePageChange}
          onSelectComponent={handleSelectComponentById}
          onNavigateHome={handleNavigateHome}
          onNavigateDocs={() => handleNavigateDocs('introduction')}
        />
      ) : (
        <main>
          {/* Section 02: Hero */}
          <HeroSection
            onExplore={handleNavigateComponents}
            onSelectComponent={handleSelectComponentById}
          />

          {/* Section 03: Philosophy */}
          <PhilosophySection />

          {/* Section 04: Featured Components */}
          <FeaturedShowcase
            onSelectComponent={handleSelectComponentById}
            onNavigateAllComponents={() => handleNavigateAllComponents(1)}
          />

          {/* Section 05: Component Directory (Homepage limited 6 items) */}
          <ComponentDirectory
            onSelectComponent={handleSelectComponentById}
            onNavigateAllComponents={() => handleNavigateAllComponents(1)}
          />

          {/* Section 06: Code Philosophy */}
          <CodePhilosophy />

          {/* Section 07: Motion Showcase */}
          <MotionShowcase />

          {/* Section 08: Developer Experience */}
          <DevExperience onExploreDocs={() => handleNavigateDocs('introduction')} />

          {/* Section 09: Final CTA */}
          <FinalCta onBrowse={() => handleNavigateAllComponents(1)} />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigateComponents={handleNavigateComponents}
        onNavigateDocs={() => handleNavigateDocs('introduction')}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectComponent={handleSelectComponentById}
        onNavigateDocs={handleNavigateDocs}
      />

      {/* Component Detail Modal (Preview, Install, Usage, Source, Props API, Accessibility) */}
      <ComponentDetailModal
        component={selectedModalComponent}
        onClose={() => setSelectedModalComponent(null)}
      />
    </div>
  );
}

export default App;

