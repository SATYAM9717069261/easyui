import { describe, it, expect } from 'vitest';
import {
  getPaginatedComponents,
  generatePaginationRange,
  isComponentNew,
  getSortedComponents,
  getNewestComponent,
} from './components';
import type { EasyComponentMeta } from '../types/component';

const createMockComponent = (id: string, name: string, createdAt: string): EasyComponentMeta => ({
  id,
  name,
  tagline: 'Test Tagline',
  description: 'Test Description',
  category: 'Motion',
  badges: ['Test'],
  cliCommand: `npx shadcn@latest add ${id}`,
  usageCode: '<Demo />',
  props: [],
  accessibility: [],
  features: [],
  createdAt,
});

describe('getPaginatedComponents', () => {
  const mockComponents: EasyComponentMeta[] = Array.from({ length: 25 }, (_, i) =>
    createMockComponent(`comp-${i + 1}`, `Component ${i + 1}`, `2026-08-${String(i + 1).padStart(2, '0')}`)
  );

  it('correctly calculates page 1 with standard page size', () => {
    const result = getPaginatedComponents(mockComponents, 1, 10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(3);
    expect(result.totalItems).toBe(25);
    expect(result.items.length).toBe(10);
    expect(result.items[0].id).toBe('comp-1');
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it('correctly calculates middle page', () => {
    const result = getPaginatedComponents(mockComponents, 2, 10);
    expect(result.currentPage).toBe(2);
    expect(result.items.length).toBe(10);
    expect(result.items[0].id).toBe('comp-11');
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('correctly calculates last page with remainder items', () => {
    const result = getPaginatedComponents(mockComponents, 3, 10);
    expect(result.currentPage).toBe(3);
    expect(result.items.length).toBe(5);
    expect(result.items[0].id).toBe('comp-21');
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
  });

  it('handles page 0 by clamping to page 1', () => {
    const result = getPaginatedComponents(mockComponents, 0, 10);
    expect(result.currentPage).toBe(1);
    expect(result.items.length).toBe(10);
  });

  it('handles negative page numbers by clamping to page 1', () => {
    const result = getPaginatedComponents(mockComponents, -5, 10);
    expect(result.currentPage).toBe(1);
  });

  it('handles page exceeding total pages by clamping to max page', () => {
    const result = getPaginatedComponents(mockComponents, 999, 10);
    expect(result.currentPage).toBe(3);
    expect(result.items.length).toBe(5);
  });

  it('handles empty component list gracefully', () => {
    const result = getPaginatedComponents([], 1, 10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.totalItems).toBe(0);
    expect(result.items.length).toBe(0);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });
});

describe('generatePaginationRange', () => {
  it('returns all numbers when total pages <= 7', () => {
    expect(generatePaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePaginationRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('generates right ellipsis when current page is near the start', () => {
    const range = generatePaginationRange(2, 10);
    expect(range).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('generates left ellipsis when current page is near the end', () => {
    const range = generatePaginationRange(9, 10);
    expect(range).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  it('generates both left and right ellipsis when in the middle', () => {
    const range = generatePaginationRange(5, 10);
    expect(range).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });
});

describe('isComponentNew', () => {
  const compOld = createMockComponent('old', 'Old Comp', '2026-08-01');
  const compMid = createMockComponent('mid', 'Mid Comp', '2026-08-15');
  const compNewest = createMockComponent('new', 'Newest Comp', '2026-08-20');

  it('returns true for newest component', () => {
    expect(isComponentNew(compNewest, compNewest)).toBe(true);
  });

  it('returns false for older components', () => {
    expect(isComponentNew(compOld, compNewest)).toBe(false);
    expect(isComponentNew(compMid, compNewest)).toBe(false);
  });

  it('returns false when newest is null', () => {
    expect(isComponentNew(compOld, null)).toBe(false);
  });
});

describe('getSortedComponents', () => {
  const c1 = createMockComponent('a', 'Alpha', '2026-08-05');
  const c2 = createMockComponent('b', 'Beta', '2026-08-20');
  const c3 = createMockComponent('c', 'Charlie', '2026-08-10');

  it('sorts newest first by createdAt', () => {
    const sorted = getSortedComponents([c1, c2, c3]);
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('c');
    expect(sorted[2].id).toBe('a');
  });

  it('resolves newest component correctly', () => {
    expect(getNewestComponent([c1, c2, c3])?.id).toBe('b');
    expect(getNewestComponent([])).toBeNull();
  });
});
