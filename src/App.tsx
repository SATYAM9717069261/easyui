import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { FeaturedShowcase } from './components/sections/FeaturedShowcase';
import { ComponentDirectory } from './components/sections/ComponentDirectory';
import { CodePhilosophy } from './components/sections/CodePhilosophy';
import { MotionShowcase } from './components/sections/MotionShowcase';
import { DevExperience } from './components/sections/DevExperience';
import { FinalCta } from './components/sections/FinalCta';
import { CommandMenu } from './components/ui/CommandMenu';
import { ComponentDetailModal } from './components/docs/ComponentDetailModal';
import { DocsPage } from './components/docs/DocsPage';
import { EASY_COMPONENTS } from './components/registry/components-data';
import type { EasyComponentMeta } from './types/component';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModalComponent, setSelectedModalComponent] = useState<EasyComponentMeta | null>(null);
  const [activeView, setActiveView] = useState<'showcase' | 'docs'>('showcase');
  const [activeDocTopic, setActiveDocTopic] = useState<string>('introduction');

  // Sync state from URL hash
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === 'components-directory' || hash === 'philosophy' || hash === 'motion-showcase' || hash === 'dev-experience') {
      setActiveView('showcase');
      return;
    }

    if (hash.startsWith('docs')) {
      setActiveView('docs');
      const parts = hash.split('/');
      if (parts.length === 1 || !parts[1]) {
        setActiveDocTopic('introduction');
      } else {
        setActiveDocTopic(parts[1]);
      }
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

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
          />

          {/* Section 05: Component Directory */}
          <ComponentDirectory
            onSelectComponent={handleSelectComponentById}
          />

          {/* Section 06: Code Philosophy */}
          <CodePhilosophy />

          {/* Section 07: Motion Showcase */}
          <MotionShowcase />

          {/* Section 08: Developer Experience */}
          <DevExperience onExploreDocs={() => handleNavigateDocs('introduction')} />

          {/* Section 09: Final CTA */}
          <FinalCta onBrowse={handleNavigateComponents} />
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
