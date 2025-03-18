import { test, expect } from '@playwright/test';

test.describe('Removing product from Cart', () => {

  test.setTimeout(60000); 

  test('Remove product and verify cart is empty', async ({ page }) => {
    await page.goto('https://kimchinamai.lt/');
    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('menuitem', { name: 'PARDUOTUVĖ' }).first().click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('article')
      .filter({ hasText: '10,20 € Tradicinis kimchi su' })
      .getByRole('button')
      .click();
      
    await page.getByRole('link', { name: 'KREPŠELIS' }).click();
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('a.label', { timeout: 10000 });

    await expect(page.locator('a.label', { hasText: 'Tradicinis kimchi su' })).toBeVisible();

    await page.locator('#main').getByRole('link').nth(1).click();

    await expect(page.getByText('Jūsų krepšelyje nėra prekių')).toBeVisible();
  });
});