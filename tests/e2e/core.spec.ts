import { expect, test } from '@playwright/test';

test.describe('Core UX and SEO', () => {
  test('theme mode toggle works (system/light/dark)', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByTestId('theme-dark')).toBeVisible();
    await expect(page.getByTestId('theme-light')).toBeVisible();
    await expect(page.getByTestId('theme-system')).toBeVisible();

    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('pages do not introduce horizontal page overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ['/en', '/en/about', '/en/products', '/en/contact']) {
      await page.goto(route);
      await page.waitForTimeout(250);

      const overflowDelta = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      });

      expect(overflowDelta, `Horizontal overflow detected on ${route}`).toBeLessThanOrEqual(1);
    }
  });

  test('product detail page renders markdown/MDX content and metadata', async ({ page }) => {
    await page.goto('/en/products/cloudsync-pro');

    await expect(page.locator('section h1').first()).toContainText('CloudSync Pro');
    await expect(page.getByRole('heading', { level: 2, name: 'Key Features' })).toBeVisible();
    await expect(page.getByText('Real-time synchronization', { exact: true }).first()).toBeVisible();

    await expect(page).toHaveTitle(/CloudSync Pro \| Enterprise Cloud Sync/);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Enterprise cloud synchronization');
  });

  test('home page SEO title is loaded from markdown seo content', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Norixis \| Innovative Software and Apps/);
  });

  test('products category filter updates URL query and filters cards', async ({ page }) => {
    await page.goto('/en/products');

    const cardTitles = page.locator('.card-hover h3');
    const initialCount = await cardTitles.count();
    expect(initialCount).toBeGreaterThan(2);

    await page.getByTestId('products-category-chip-productivity').click();
    await expect(page).toHaveURL(/\/en\/products\?category=Productivity/);

    await expect(page.getByRole('heading', { level: 3, name: 'TaskFlow' })).toBeVisible();

    const filteredCount = await cardTitles.count();
    expect(filteredCount).toBe(1);
  });
});
