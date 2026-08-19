import React, { useState, useMemo, useEffect } from 'react';
import { Container } from '../layout/Container';
import { EASY_COMPONENTS } from '../registry/components-data';
import type { ComponentCategory } from '../../types/component';
import { Search, ArrowLeft, Home, Sparkles } from 'lucide-react';
import { ComponentCard } from '../common/ComponentCard';
import { ComponentPagination } from '../common/ComponentPagination';
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
      const matchCategory =
        selectedCategory === 'All' || comp.category === selectedCategory;
      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allSortedComponents, selectedCategory, searchQuery]);

  // 4. Calculate pagination
  const pagination = useMemo(() => {
    return getPaginatedComponents(filteredComponents, currentPage, ITEMS_PER_PAGE);
  }, [filteredComponents, currentPage]);

  // Ensure current page is valid when filters change
  useEffect(() => {
    if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
      onPageChange(1);
    }
  }, [pagination.totalPages, currentPage, onPageChange]);

  const handleCategoryChange = (cat: ComponentCategory) => {
    setSelectedCategory(cat);
    onPageChange(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onPageChange(1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] pt-4 pb-24">
      <Container size="xl">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-[#181818]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#808080]">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1 hover:text-[#F5F5F5] transition-colors focus-ring rounded"
            >
              <Home className="w-3.5 h-3.5" />
              <span>EasyUI</span>
            </button>
            <span className="text-[#444444]">/</span>
            <span className="text-white font-medium">All Components</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101010] hover:bg-[#181818] border border-[#202020] text-xs text-[#A1A1A1] hover:text-white transition-all focus-ring"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-mono text-[#737373] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#A1A1A1]" />
              Registry Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#F5F5F5] tracking-tight mt-1">
              All Components
            </h1>
            <p className="text-sm text-[#808080] mt-1.5 max-w-xl">
              Explore all {allSortedComponents.length} components. Crafted with spring physics, copy-paste ownership, and zero configuration.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#606060] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search components, tags..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#0A0A0A] border border-[#181818] text-[#F5F5F5] placeholder-[#606060] focus-ring"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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

        {/* Results summary (only if filtered or paginated) */}
        <div className="flex items-center justify-between text-xs font-mono text-[#606060] mb-5">
          <span>
            Showing {pagination.items.length > 0 ? pagination.startIndex + 1 : 0}–{pagination.endIndex} of {pagination.totalItems} components
          </span>
          {pagination.totalPages > 1 && (
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
          )}
        </div>

        {/* Components Grid */}
        {filteredComponents.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[#141414] bg-[#080808]">
            <p className="text-sm text-[#737373]">No components found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                onPageChange(1);
              }}
              className="mt-3 text-xs text-white hover:underline focus-ring rounded"
            >
              Reset filters
            </button>
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
            <div className="mt-12 pt-6 border-t border-[#141414]">
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
