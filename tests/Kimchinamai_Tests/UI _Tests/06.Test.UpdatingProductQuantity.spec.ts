import { test, expect } from '@playwright/test';

test.describe('Updating Product Quantity', () => {

  test.setTimeout(60000);

  test('Should update the price when product quantity is changed', async ({ page }) => {
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


    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();

    await page.waitForLoadState('networkidle');


    const updatedPrice = page.locator('ul.cart-items li.cart-item').first().locator('.product-price strong');
    await expect(updatedPrice).toContainText('20,40 €');


    await expect(page.getByText('2 prekių')).toBeVisible();
    await expect(page.getByText('Viso (su PVM) 20,40 €')).toBeVisible();
  });

});