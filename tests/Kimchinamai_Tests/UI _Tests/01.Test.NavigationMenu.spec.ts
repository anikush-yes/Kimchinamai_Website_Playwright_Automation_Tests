import { test, expect } from '@playwright/test';


test.setTimeout(60000);

test.describe('Navigation menu test', () => {
  test('Ensures menu links redirect correctly', async ({ page }) => {
   
    console.log('Page loads...');
    await page.goto('https://kimchinamai.lt/', { timeout: 60000 });
    await page.waitForLoadState('networkidle');

    const menuItems = [
      { name: 'PAGRINDINIS', url: 'https://kimchinamai.lt/' },
      { name: 'PARDUOTUVĖ', url: 'https://kimchinamai.lt/10-parduotuve' },
      { name: 'TINKLARAŠTIS', url: 'https://kimchinamai.lt/' },
      { name: 'KONTAKTAI', url: 'https://kimchinamai.lt/susisiekite-su-mumis' }
    ];

    for (const { name, url } of menuItems) {
      console.log(`Testing Each Nav Menu Item: ${name}`);
      await page.getByRole('menuitem', { name }).first().click();
      await page.waitForLoadState('networkidle');

      console.log(`Checking URL: ${await page.url()}`);
      await expect(page).toHaveURL(url);
    }
  });
});