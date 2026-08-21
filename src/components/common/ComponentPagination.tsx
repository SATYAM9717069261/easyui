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
      className={cn('flex items-center justify-center gap-4 sm:gap-6 py-4 select-none', className)}
    >
      {/* Previous Page Link */}
      <button
        type="button"
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={cn(
          'inline-flex items-center gap-1 text-xs font-mono transition-colors focus-ring',
          isFirstPage
            ? 'opacity-25 cursor-not-allowed text-[#555555]'
            : 'text-[#888888] hover:text-white cursor-pointer'
        )}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Prev</span>
      </button>

      {/* Page Numbers & Ellipsis */}
      <div className="flex items-center gap-2">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="w-6 h-6 flex items-center justify-center text-xs font-mono text-[#555555]"
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
                'w-7 h-7 flex items-center justify-center text-xs font-mono transition-colors focus-ring rounded',
                isActive
                  ? 'text-white font-semibold'
                  : 'text-[#666666] hover:text-[#D4D4D4] cursor-pointer'
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Link */}
      <button
        type="button"
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className={cn(
          'inline-flex items-center gap-1 text-xs font-mono transition-colors focus-ring',
          isLastPage
            ? 'opacity-25 cursor-not-allowed text-[#555555]'
            : 'text-[#888888] hover:text-white cursor-pointer'
        )}
      >
        <span>Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
};
