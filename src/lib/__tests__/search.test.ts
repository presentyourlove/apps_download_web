import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ICONS } from '../search';

/**
 * Since SearchController is heavily DOM-dependent,
 * we test the pure utility functions directly and
 * use a simplified approach for the class methods.
 */

// Test the highlight function logic (extracted for testing)
describe('Search Utilities', () => {
  // Helper: Recreate the highlight logic for testing
  function highlight(text: string, query: string): string {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  describe('highlight()', () => {
    it('should return original text when query is empty', () => {
      expect(highlight('Hello World', '')).toBe('Hello World');
    });

    it('should wrap matching text with <mark> tags', () => {
      expect(highlight('Hello World', 'World')).toBe('Hello <mark>World</mark>');
    });

    it('should be case-insensitive', () => {
      expect(highlight('Hello World', 'world')).toBe('Hello <mark>World</mark>');
    });

    it('should highlight multiple occurrences', () => {
      expect(highlight('foo bar foo', 'foo')).toBe('<mark>foo</mark> bar <mark>foo</mark>');
    });

    it('should escape regex special characters in query', () => {
      expect(highlight('price: $100', '$100')).toBe('price: <mark>$100</mark>');
    });

    it('should handle partial matches', () => {
      expect(highlight('FinanceApp', 'App')).toBe('Finance<mark>App</mark>');
    });
  });

  describe('ICONS', () => {
    it('should export SVG icons', () => {
      expect(ICONS.link).toContain('<svg');
      expect(ICONS.app).toContain('<svg');
      expect(ICONS.theme).toContain('<svg');
      expect(ICONS.search).toContain('<svg');
    });
  });
});

// DOM-based tests (requires happy-dom environment)
describe('SearchController (DOM)', () => {
  beforeEach(() => {
    // Setup minimal DOM structure
    document.body.innerHTML = `
      <button id="search-trigger">Search</button>
      <div id="search-modal" 
           data-nav-paths='{"home":"/","blog":"/blog/","about":"/about/"}'
           data-app-paths='[{"id":"test","name":"TestApp","path":"/test/"}]'
           data-no-results="No results found">
        <div class="search-modal-overlay"></div>
        <input id="search-input" type="text" />
        <div id="search-results"></div>
      </div>
    `;
  });

  it('should have required DOM elements', () => {
    expect(document.getElementById('search-trigger')).not.toBeNull();
    expect(document.getElementById('search-modal')).not.toBeNull();
    expect(document.getElementById('search-input')).not.toBeNull();
    expect(document.getElementById('search-results')).not.toBeNull();
  });

  // Note: Full SearchController instantiation requires mocking trapFocus
  // and other dependencies. These tests verify the DOM setup is correct.
});

// Mock interactions and Pagefind
describe('SearchController (Integration)', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let controller: any;

  beforeEach(async () => {
    // 1. Reset DOM
    document.body.innerHTML = `
      <button id="search-trigger">Search</button>
      <div id="search-modal" 
           data-nav-paths='{"home":"/","blog":"/blog/","about":"/about/"}'
           data-app-paths='[{"id":"test","name":"TestApp","path":"/test/"}]'
           data-no-results="No results found">
        <div class="search-modal-overlay"></div>
        <input id="search-input" type="text" />
        <div id="search-results"></div>
      </div>
    `;

    // 2. Mock Global Objects
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    // Mock scrollIntoView (missing in happy-dom)
    HTMLElement.prototype.scrollIntoView = vi.fn();

    // 3. Mock Pagefind Import
    vi.mock(
      '/pagefind/pagefind.js',
      () => ({
        options: vi.fn(),
        search: vi.fn().mockResolvedValue({
          results: [
            {
              data: () =>
                Promise.resolve({
                  url: '/pagefind-result',
                  meta: { title: 'Pagefind Result' },
                  excerpt: 'Matched content snippet',
                }),
            },
          ],
        }),
      }),
      { virtual: true }
    );

    // 4. Mock trapFocus dependency
    vi.mock('../a11y', () => ({
      trapFocus: vi.fn(() => vi.fn()), // Returns cleanup function
    }));

    // 5. Instantiate Controller
    // Dynamic import to ensure mocks are applied
    const { SearchController } = await import('../search');
    controller = new SearchController();
  });

  it('should initialize with base commands', () => {
    expect(controller['baseCommands'].length).toBeGreaterThan(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(controller['baseCommands'].some((c: any) => c.id === 'nav-home')).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(controller['baseCommands'].some((c: any) => c.title === 'TestApp')).toBe(true);
  });

  it('should filter results based on query', async () => {
    // Simulate user typing "Test"
    await controller.updateResults('Test');

    const results = document.querySelectorAll('.result-item');
    expect(results.length).toBeGreaterThan(0);
    expect(document.body.innerHTML).toContain('TestApp');
  });

  it('handleKeydown - Arrow navigation should update selection', async () => {
    await controller.openModal();
    // Simulate results (Home, Blog, About, etc.)
    await controller.updateResults('');

    // Initial selection index 0
    expect(controller['selectedIndex']).toBe(0);

    // Press ArrowDown
    controller.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(controller['selectedIndex']).toBe(1);
    expect(document.querySelectorAll('.result-item')[1].classList.contains('selected')).toBe(true);

    // Press ArrowUp
    controller.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(controller['selectedIndex']).toBe(0);
  });

  it('handleKeydown - Enter should trigger action', async () => {
    await controller.openModal();
    await controller.updateResults('Home'); // Filter to single item usually

    // Mock the action of the first item
    const mockAction = vi.fn();
    if (controller['filteredCommands'][0]) {
      controller['filteredCommands'][0].action = mockAction;
    }

    controller.handleKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(mockAction).toHaveBeenCalled();
  });
});
