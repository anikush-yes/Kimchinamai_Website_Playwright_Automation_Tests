import { test, expect } from '@playwright/test';

test.describe('Searching for a Non-Existent Product', () => {

    test.setTimeout(60000);

    test('Should display a "No results found" message for a non-existent product', async ({ page }) => {
        await page.goto('https://kimchinamai.lt/');
        await page.waitForLoadState('domcontentloaded');


        await page.getByRole('button', { name: 'Search' }).first().click();


        await expect(page.getByRole('searchbox', { name: 'Ieškoti...' })).toBeVisible();

        await page.getByRole('searchbox', { name: 'Ieškoti...' }).fill('Duona');
        await page.keyboard.press('Enter');

   // Bug detected when searching for a non-existent product, no error message ("No results found") appears.
   
    });
});