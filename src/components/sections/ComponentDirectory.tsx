import React, { useState, useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search, ArrowRight } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import {
  getSortedComponents,
  getNewestComponent,
  isComponentNew,
  FEATURED_COMPONENT_LIMIT,
} from '../../lib/components';
import { cn } from '../../lib/utils';

export interface ComponentDirectoryProps {
  onSelectComponent: (id: string) => void;
  onNavigateAllComponents?: () => void;
}

export const ComponentDirectory: React.FC<ComponentDirectoryProps> = ({
  onSelectComponent,
  onNavigateAllComponents,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ComponentCategory[] = [
    'All',
    'Motion',
    'Buttons',
    'Navigation',
    'Feedback',
    'Overlays',
    'Forms',
    'Auth',
  ];

  // 1. Sort components by createdAt DESC
  const allSortedComponents = useMemo(() => {
    return getSortedComponents(EASY_COMPONENTS);
  }, []);

  // 2. Identify the single newest component
  const newestComponent = useMemo(() => {
    return getNewestComponent(allSortedComponents);
  }, [allSortedComponents]);

  // 3. Filter by category & search
  const filteredComponents = useMemo(() => {
    return allSortedComponents.filter((comp) => {
      const matchCategory =
        selectedCategory === 'All' || comp.category === selectedCategory;
      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allSortedComponents, selectedCategory, searchQuery]);

  // If user hasn't typed a search or filter, show limited featured count
  const isFiltering = selectedCategory !== 'All' || searchQuery.trim() !== '';
  const visibleComponents = isFiltering
    ? filteredComponents
    : filteredComponents.slice(0, FEATURED_COMPONENT_LIMIT);

  const hasMoreComponents =
    !isFiltering && allSortedComponents.length > FEATURED_COMPONENT_LIMIT;

  return (
    <section id="components-directory" className="py-20 bg-[#050505] border-t border-[#141414]">
      <Container size="xl">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest">
              Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              Components
            </h2>
            <p className="text-sm text-[#808080] mt-1.5">
              {EASY_COMPONENTS.length} polished components crafted for tactile feedback and copy-paste ownership.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components, tags..."
              className="w-full pl-9 pr-3 py-2 text-[16px] rounded-lg bg-[#0A0A0A] border border-[#181818] text-[#F5F5F5] placeholder-[#606060] focus:outline-none focus:border-[#383838] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors whitespace-nowrap focus-ring',
                selectedCategory === cat
                  ? 'bg-[#181818] text-[#F5F5F5] border border-[#282828]'
                  : 'bg-[#0A0A0A] text-[#737373] border border-[#141414] hover:text-[#A1A1A1] hover:bg-[#101010]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        {visibleComponents.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[#141414] bg-[#080808]">
            <p className="text-sm text-[#737373]">No components found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-white hover:underline focus-ring rounded"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleComponents.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  isNew={isComponentNew(comp, newestComponent)}
                  onSelect={onSelectComponent}
                />
              ))}
            </div>

            {/* View All Components Action */}
            {hasMoreComponents && onNavigateAllComponents && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={onNavigateAllComponents}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D0D0D] hover:bg-[#141414] border border-[#1C1C1C] hover:border-[#2C2C2C] text-xs font-mono text-[#CCCCCC] hover:text-white transition-all shadow-sm focus-ring cursor-pointer"
                >
                  <span>View all {allSortedComponents.length} components</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#808080] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

