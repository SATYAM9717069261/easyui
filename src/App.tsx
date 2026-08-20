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
import { useSEO } from './lib/seo';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModalComponent, setSelectedModalComponent] = useState<EasyComponentMeta | null>(null);
  const [activeView, setActiveView] = useState<'showcase' | 'components' | 'docs'>('showcase');
  const [activeDocTopic, setActiveDocTopic] = useState<string>('introduction');
  const [componentPage, setComponentPage] = useState<number>(1);

  // Initialize analytics & track page/view changes across the SPA
  useAnalyticsTracker({ activeView, componentPage, activeDocTopic });

  // Dynamic SEO metadata & JSON-LD management
  useSEO({
    activeView,
    componentPage,
    activeDocTopic,
    selectedModalComponent,
  });

  // Sync state from URL pathname and search params (with legacy hash migration support)
  const parseUrlState = useCallback(() => {
    let pathname = window.location.pathname;
    let search = window.location.search;
    const rawHash = window.location.hash.replace(/^#\/?/, '');

    // Seamless migration for legacy bookmarks/links using hash: #components/slug -> /components/slug
    if (rawHash.startsWith('components') || rawHash.startsWith('docs') || rawHash.startsWith('all-components')) {
      let migratedPath = '/' + rawHash;
      if (rawHash.includes('?')) {
        const [r, q] = rawHash.split('?');
        migratedPath = '/' + r + (q ? '?' + q : '');
      }
      window.history.replaceState(null, '', migratedPath);
      pathname = window.location.pathname;
      search = window.location.search;
    }

    // Check pagination search query params (e.g. ?page=2)
    let pageFromUrl = 1;
    if (search) {
      const params = new URLSearchParams(search);
      const p = parseInt(params.get('page') || '1', 10);
      if (!isNaN(p) && p > 0) pageFromUrl = p;
    }

    const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

    // 1. Direct deep-link to component: /components/:slug
    if (cleanPath.startsWith('components/')) {
      const compSlug = cleanPath.replace(/^components\//, '').split('/')[0];
      const found = EASY_COMPONENTS.find((c) => c.id === compSlug);
      if (found) {
        setSelectedModalComponent(found);
        return;
      }
    }

    // 2. All components catalog view: /components or /all-components
    if (cleanPath === 'components' || cleanPath === 'all-components') {
      setSelectedModalComponent(null);
      setActiveView('components');
      setComponentPage(pageFromUrl);
      return;
    }

    // 3. Documentation topics: /docs or /docs/:topic
    if (cleanPath === 'docs' || cleanPath.startsWith('docs/')) {
      setSelectedModalComponent(null);
      setActiveView('docs');
      const parts = cleanPath.split('/');
      if (parts.length === 1 || !parts[1]) {
        setActiveDocTopic('introduction');
      } else {
        setActiveDocTopic(parts[1]);
      }
      return;
    }

    // 4. Default: showcase / homepage (/)
    setSelectedModalComponent(null);
    setActiveView('showcase');
  }, []);

  const navigate = useCallback(
    (path: string, replace = false) => {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
      parseUrlState();
    },
    [parseUrlState]
  );

  useEffect(() => {
    parseUrlState();
    window.addEventListener('popstate', parseUrlState);
    return () => {
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
      navigate(`/components/${found.id}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedModalComponent(null);
    if (activeView === 'components') {
      navigate(componentPage > 1 ? `/components?page=${componentPage}` : '/components');
    } else if (activeView === 'docs') {
      navigate(`/docs/${activeDocTopic}`);
    } else {
      navigate('/');
    }
  };

  const handleNavigateComponents = () => {
    if (activeView !== 'showcase') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('components-directory')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      document.getElementById('components-directory')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateAllComponents = (page = 1) => {
    navigate(page > 1 ? `/components?page=${page}` : '/components');
    setActiveView('components');
    setComponentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    navigate(page > 1 ? `/components?page=${page}` : '/components');
    setComponentPage(page);
  };

  const handleNavigateHome = () => {
    navigate('/');
    setActiveView('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDocs = (topicId?: string) => {
    const topic = topicId || 'introduction';
    navigate(`/docs/${topic}`);
    setActiveView('docs');
    setActiveDocTopic(topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocTopic = (topicId: string) => {
    navigate(`/docs/${topicId}`);
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

      {/* Component Detail Modal (Preview, Install, Usage, Source, Props API, Accessibility, Related) */}
      <ComponentDetailModal
        component={selectedModalComponent}
        onClose={handleCloseModal}
        onSelectComponent={handleSelectComponentById}
      />
    </div>
  );
}

export default App;

