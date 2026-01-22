import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Checks', () => {
  test('Home Page should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    // Using default axe-core configuration
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      throw new Error(
        'Home Page Violations: ' + JSON.stringify(accessibilityScanResults.violations, null, 2)
      );
    }
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Blog Page should be accessible', async ({ page }) => {
    await page.goto('/blog/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      throw new Error('Blog Page Violations: ' + JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});
