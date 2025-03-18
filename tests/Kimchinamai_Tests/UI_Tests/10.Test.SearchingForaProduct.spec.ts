import { test, expect } from '@playwright/test';

test.describe('Searching for a Product', () => {

    test.setTimeout(60000);

    test('Should return relevant products based on the search query', async ({ page }) => {
        await page.goto('https://kimchinamai.lt/');
        await page.waitForLoadState('domcontentloaded');


        await page.getByRole('button', { name: 'Search' }).first().click();


        await expect(page.getByRole('searchbox', { name: 'Ieškoti...' })).toBeVisible();

        await page.getByRole('searchbox', { name: 'Ieškoti...' }).fill('Kimchi');
        await page.keyboard.press('Enter');

        const headings = page.getByRole('heading', { name: /Kimchi/i });
        await expect(headings.nth(0)).toBeVisible();
        await expect(headings.nth(1)).toBeVisible();
        await expect(headings.nth(2)).toBeVisible();
    });
});

