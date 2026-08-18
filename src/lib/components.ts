import type { EasyComponentMeta } from '../types/component';

/**
 * Default number of items per page for the dedicated components page.
 */
export const ITEMS_PER_PAGE = 10;

/**
 * Default number of featured components displayed on the homepage showroom.
 */
export const FEATURED_COMPONENT_LIMIT = 6;

/**
 * Returns all components sorted by creation date descending (newest first).
 * Stable secondary sort on component name for identical timestamps.
 */
export function getSortedComponents(components: EasyComponentMeta[]): EasyComponentMeta[] {
  return [...components].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Resolves the single newest component from the collection based on createdAt.
 */
export function getNewestComponent(components: EasyComponentMeta[]): EasyComponentMeta | null {
  if (!components || components.length === 0) return null;
  const sorted = getSortedComponents(components);
  return sorted[0] || null;
}

/**
 * Determines whether a given component qualifies for the minimal NEW badge.
 */
export function isComponentNew(
  component: EasyComponentMeta,
  newestComponent: EasyComponentMeta | null
): boolean {
  if (!newestComponent) return false;
  return component.id === newestComponent.id;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Slices a component array into a paginated subset.
 */
export function getPaginatedComponents(
  components: EasyComponentMeta[],
  page = 1,
  pageSize = ITEMS_PER_PAGE
): PaginatedResult<EasyComponentMeta> {
  const totalItems = components.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const items = components.slice(startIndex, endIndex);

  return {
    items,
    currentPage: safeCurrentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasNextPage: safeCurrentPage < totalPages,
    hasPreviousPage: safeCurrentPage > 1,
  };
}

/**
 * Generates an array of page numbers and ellipsis strings for responsive pagination navigation.
 * Example: [1, 2, 3, 4, 5] or [1, '...', 4, 5, 6, '...', 10]
 */
export function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | '...')[] {
  // If total pages is 7 or fewer, show all page numbers without ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: No left dots, but right dots to show
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  // Case 2: No right dots, but left dots to show
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  // Case 3: Both left and right dots to show
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
