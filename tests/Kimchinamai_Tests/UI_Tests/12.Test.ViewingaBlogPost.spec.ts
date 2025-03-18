// "Tinklaraštis" (Blog) page, the page displayed is identical to the homepage, with no distinction between the two pages.
import { test, expect } from '@playwright/test';

test.describe('Page Navigation Test', () => {

  test.setTimeout(60000); 

  test('Should navigate between Main Page and Blog page without URL change', async ({ page }) => {
    
    await page.goto('https://kimchinamai.lt/');
    await page.waitForLoadState('domcontentloaded');

    
    await page.getByRole('link', { name: 'PAGRINDINIS' }).click({ force: true });
    
    await expect(page).toHaveURL('https://kimchinamai.lt/');
    await expect(page.getByRole('heading', { name: 'AR ŽINOJOTE?' })).toBeVisible();

    
    const blogLink = page.getByRole('menuitem', { name: 'TINKLARAŠTIS' }).first();
    
    await blogLink.waitFor({ state: 'visible', timeout: 60000 });
    await blogLink.click({ force: true });


    await expect(page.getByRole('heading', { name: 'AR ŽINOJOTE?' })).toBeVisible();
    await expect(page).toHaveURL('https://kimchinamai.lt/');
  });
});