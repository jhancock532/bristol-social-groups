import { test, expect } from '@playwright/test';

test('visual regression', async ({ page }) => {
    await page.goto(
        '/iframe.html?args=&id=components-filteredgroupsshownmessage--mix-of-regular-and-ad-hoc-groups',
    );

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
        'FilteredGroupsShownMessage.png',
    );
});
