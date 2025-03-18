import { test, expect } from '@playwright/test';

test.describe('Product Listings', () => {

  test('Should verify product details are correct', async ({ page }) => {
 
    await page.goto('https://kimchinamai.lt/');


    await page.goto('https://kimchinamai.lt/');
    await page.getByRole('menuitem', { name: 'PARDUOTUVĖ' }).first().click();
    await page.getByText('Tradicinis kimchi su jūros gėrybėmis').click();
    await page.getByRole('heading', { name: 'Tradicinis kimchi su jūros gėrybėmis' }).click();
    await page.locator('.ce-product-price > span').first().click();
    await page.getByText('Tradicinis - tikra kimchi').click();
    await page.getByRole('tab', { name: 'Aprašymas' }).locator('i').first().click();
    await page.getByText('Sudėtis: Pekino kopūstai,').click();
    await page.getByRole('tab', { name: 'Prekių pristatymas' }).locator('i').first().click();
    await page.getByText('Užsakymus įprastai išsiunč').click();

    
    });
  });