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
    await page.goto('/en/products/block-nova');

    await expect(page.locator('section h1').first()).toContainText('Block Nova');
    await expect(page.getByRole('heading', { level: 2, name: 'Core Gameplay' })).toBeVisible();
    await expect(page.getByText('Drag the active block to match targets.', { exact: true }).first()).toBeVisible();

    await expect(page).toHaveTitle(/Block Nova \| Fast Arcade Puzzle for iOS/);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('high-energy iOS puzzle game');
  });

  test('home page SEO title is loaded from markdown seo content', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Norixis \| Innovative Software and Apps/);
  });

  test('products page shows Block Nova as the only current product', async ({ page }) => {
    await page.goto('/en/products');

    const cardTitles = page.locator('.card-hover h3');
    const initialCount = await cardTitles.count();
    expect(initialCount).toBe(1);
    await expect(page.getByRole('heading', { level: 3, name: 'Block Nova' })).toBeVisible();
  });
});
