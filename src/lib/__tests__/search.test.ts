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
