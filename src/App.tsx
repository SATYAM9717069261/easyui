import { useState, useEffect } from 'react';
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
import { EASY_COMPONENTS } from './components/registry/components-data';
import type { EasyComponentMeta } from './types/component';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<EasyComponentMeta | null>(null);

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
      setSelectedComponent(found);
    }
  };

  const scrollToDirectory = () => {
    document.getElementById('components-directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDocs = () => {
    document.getElementById('dev-experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#38BDF8]/20 selection:text-[#38BDF8]">
      {/* Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateComponents={scrollToDirectory}
        onNavigateDocs={scrollToDocs}
      />

      {/* Main Content Flow */}
      <main>
        {/* Section 02: Hero */}
        <HeroSection
          onExplore={scrollToDirectory}
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
        <DevExperience />

        {/* Section 09: Final CTA */}
        <FinalCta onBrowse={scrollToDirectory} />
      </main>

      {/* Section 10: Footer */}
      <Footer />

      {/* Global Command Palette (⌘K) */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectComponent={handleSelectComponentById}
      />

      {/* Component Detail Modal (Preview, Install, Usage, Source, Props API, Accessibility) */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
}

export default App;
