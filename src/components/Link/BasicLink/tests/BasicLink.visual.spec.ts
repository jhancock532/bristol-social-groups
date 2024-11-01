import { test, expect } from '@playwright/test';

test('internal link visual regression', async ({ page }) => {
    await page.goto(
        '/iframe.html?args=&id=components-links-basiclink--default',
    );

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'BasicLink.png',
    );
});

// Worth testing specifically because of the odd behavior we've set up
// to prevent the link from breaking over a new line and losing its external link icon
test('external link visual regression', async ({ page }) => {
    await page.goto(
        '/iframe.html?args=&id=components-links-basiclink--external-link',
    );

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'ExternalBasicLink.png',
    );
});
