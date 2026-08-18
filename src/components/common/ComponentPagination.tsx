import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generatePaginationRange } from '../../lib/components';
import { cn } from '../../lib/utils';

export interface ComponentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const ComponentPagination: React.FC<ComponentPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // If there's only 1 page (or none), do not render pagination controls
  if (totalPages <= 1) {
    return null;
  }

  const paginationRange = generatePaginationRange(currentPage, totalPages, 1);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Component pagination"
      className={cn('flex items-center justify-center gap-1.5 sm:gap-2 py-4', className)}
    >
      {/* Previous Page Arrow */}
      <button
        type="button"
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={cn(
          'flex items-center justify-center h-8 px-2.5 rounded-lg border text-xs font-mono transition-colors focus-ring',
          isFirstPage
            ? 'opacity-30 cursor-not-allowed border-[#161616] bg-[#070707] text-[#555555]'
            : 'border-[#181818] bg-[#0A0A0A] text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212] hover:border-[#262626] cursor-pointer'
        )}
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers & Ellipsis */}
      <div className="flex items-center gap-1">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="w-7 h-8 flex items-center justify-center text-xs font-mono text-[#555555] select-none"
              >
                …
              </span>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'min-w-8 h-8 px-2 rounded-lg text-xs font-mono transition-colors focus-ring cursor-pointer flex items-center justify-center',
                isActive
                  ? 'bg-[#181818] text-[#F5F5F5] border border-[#2A2A2A] font-semibold shadow-sm'
                  : 'bg-[#0A0A0A] text-[#737373] border border-[#141414] hover:text-[#A1A1A1] hover:bg-[#101010] hover:border-[#202020]'
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Arrow */}
      <button
        type="button"
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className={cn(
          'flex items-center justify-center h-8 px-2.5 rounded-lg border text-xs font-mono transition-colors focus-ring',
          isLastPage
            ? 'opacity-30 cursor-not-allowed border-[#161616] bg-[#070707] text-[#555555]'
            : 'border-[#181818] bg-[#0A0A0A] text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#121212] hover:border-[#262626] cursor-pointer'
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
      </button>
    </nav>
  );
};
