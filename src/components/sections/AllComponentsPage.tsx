import React, { useState, useMemo, useEffect } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search, ArrowLeft } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { ComponentPagination } from '../common/ComponentPagination';
import { InspirationNote } from '../common/InspirationNote';
import {
  getSortedComponents,
  getNewestComponent,
  isComponentNew,
  getPaginatedComponents,
  ITEMS_PER_PAGE,
} from '../../lib/components';
import { cn } from '../../lib/utils';

export interface AllComponentsPageProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectComponent: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateDocs: () => void;
}

export const AllComponentsPage: React.FC<AllComponentsPageProps> = ({
  currentPage,
  onPageChange,
  onSelectComponent,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  // 1. Sort all components by createdAt DESC
  const allSortedComponents = useMemo(() => {
    return getSortedComponents(EASY_COMPONENTS);
  }, []);

  // 2. Identify the single newest component
  const newestComponent = useMemo(() => {
    return getNewestComponent(allSortedComponents);
  }, [allSortedComponents]);

  // 3. Filter by category & search query
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

  // 4. Calculate pagination
  const pagination = useMemo(() => {
    return getPaginatedComponents(filteredComponents, currentPage, ITEMS_PER_PAGE);
  }, [filteredComponents, currentPage]);

  // Scroll to top immediately when mounting AllComponentsPage or changing page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
      onPageChange(1);
    }
  }, [pagination.totalPages, currentPage, onPageChange]);

  const handleCategoryChange = (cat: ComponentCategory) => {
    setSelectedCategory(cat);
    onPageChange(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onPageChange(1);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] pt-2 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 mb-4 sm:mb-6 border-b border-[#161616]">
          <div className="flex items-center gap-1.5 text-xs font-sans text-[#808080]">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors focus-ring rounded cursor-pointer"
            >
              EasyUI
            </button>
            <span className="text-[#444444]">/</span>
            <span className="text-white font-medium">All Components</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              aria-label="Back to Home"
              className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-all focus-ring cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F5F5F5] tracking-tight">
              All Components
            </h1>
            <p className="text-xs sm:text-sm text-[#808080] mt-1 max-w-xl">
              Explore all {allSortedComponents.length} components. Crafted with spring physics, copy-paste ownership, and zero configuration.
            </p>
          </div>

          {/* Search Bar with Inspiration Note above */}
          <div className="flex flex-col items-start md:items-end gap-1.5 w-full md:w-auto">
            <InspirationNote />
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search components..."
                className="w-full pl-8 pr-3 py-1.5 text-[16px] rounded-lg bg-[#0C0C0C] border border-[#1E1E1E] focus:border-[#383838] text-[#F5F5F5] placeholder-[#606060] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 sm:mb-7 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-lg font-medium transition-colors whitespace-nowrap focus-ring cursor-pointer',
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
        {filteredComponents.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[#141414] bg-[#080808] px-4">
            {selectedCategory === 'Recent' ? (
              <div className="space-y-3 max-w-md mx-auto">
                <p className="text-sm text-[#888888] leading-relaxed">
                  No recent components available at the moment. Check out all components on the components page.
                </p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      onPageChange(1);
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
                    onPageChange(1);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
            <div className="mt-8 pt-4 border-t border-[#141414]">
              <ComponentPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) => {
                  onPageChange(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
