import React, { useState, useMemo } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search, ArrowRight } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { ComponentPagination } from '../common/ComponentPagination';
import {
  getSortedComponents,
  getNewestComponent,
  isComponentNew,
  getPaginatedComponents,
} from '../../lib/components';
import { cn } from '../../lib/utils';

export interface ComponentDirectoryProps {
  onSelectComponent: (id: string) => void;
  onNavigateAllComponents?: () => void;
}

const HOMEPAGE_PAGE_SIZE = 6;

export const ComponentDirectory: React.FC<ComponentDirectoryProps> = ({
  onSelectComponent,
  onNavigateAllComponents,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories: ComponentCategory[] = [
    'All',
    'Recent',
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
      const isRecent =
        isComponentNew(comp, newestComponent) ||
        comp.badges?.some((b) => b.toLowerCase() === 'new');

      const matchCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Recent'
          ? isRecent
          : comp.category === selectedCategory;

      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allSortedComponents, selectedCategory, searchQuery, newestComponent]);

  // 4. Calculate pagination (6 per page across all category components)
  const pagination = useMemo(() => {
    return getPaginatedComponents(filteredComponents, currentPage, HOMEPAGE_PAGE_SIZE);
  }, [filteredComponents, currentPage]);

  const handleCategorySelect = (cat: ComponentCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section id="components-directory" className="py-20 bg-[#151515] border-t border-[#363636]">
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
            <p className="text-sm text-[#A3A3A3] mt-1.5">
              {EASY_COMPONENTS.length} polished components crafted for tactile feedback and copy-paste ownership.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#8A8A8A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search components, tags..."
              className="w-full pl-9 pr-3 py-2 text-[16px] rounded-lg bg-[#242424] border border-[#363636] text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#4A4A4A] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors whitespace-nowrap focus-ring cursor-pointer',
                selectedCategory === cat
                  ? 'bg-[#242424] text-[#F5F5F5] border border-[#363636]'
                  : 'bg-[#202020] text-[#737373] border border-[#363636] hover:text-[#F5F5F5] hover:bg-[#242424]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        {filteredComponents.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[#363636] bg-[#202020] px-4">
            {selectedCategory === 'Recent' ? (
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm text-[#A3A3A3] leading-relaxed">
                  No recent components available at the moment. Check out all components on the components page.
                </p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateAllComponents) {
                        onNavigateAllComponents();
                      } else {
                        setSelectedCategory('All');
                        setSearchQuery('');
                        setCurrentPage(1);
                      }
                    }}
                    className="px-4 py-2 text-xs rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    View All Components
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm text-[#737373]">No components found matching your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="mt-2 text-xs text-white hover:underline focus-ring rounded cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pagination.items.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  isNew={isComponentNew(comp, newestComponent)}
                  onSelect={onSelectComponent}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 pt-4 border-t border-[#363636]">
                <ComponentPagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    const el = document.getElementById('components-directory');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            )}

            {/* View All Components Action */}
            {onNavigateAllComponents && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={onNavigateAllComponents}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#202020] hover:bg-[#242424] border border-[#363636] hover:border-[#4A4A4A] text-xs font-mono text-[#A3A3A3] hover:text-white transition-all shadow-sm focus-ring cursor-pointer"
                >
                  <span>View all components</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

