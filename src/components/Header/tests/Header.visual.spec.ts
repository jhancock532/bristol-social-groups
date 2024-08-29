import { test, expect } from '@playwright/test';

test('visual regression', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=components-header--default');

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'Header.png',
    );
});
