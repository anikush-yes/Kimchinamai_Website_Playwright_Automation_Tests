import { test, expect } from '@playwright/test';

test.describe('Checking Footer Links', () => {
  test.setTimeout(60000);
  test.beforeEach(async ({ page }) => {
    page.on('pageerror', (error) => {
      console.warn(`Page error: ${error.message}`);
    });

    await page.goto('https://kimchinamai.lt/', { waitUntil: 'domcontentloaded' });
  });

  test('Verify footer links navigate correctly', async ({ page }) => {
    const footerLinks = [
      { name: 'Pagrindinis', url: 'https://kimchinamai.lt/' },
      { name: 'Kontaktai', url: 'https://kimchinamai.lt/susisiekite-su-mumis' },
      { name: 'Privatumo politika', url: 'https://kimchinamai.lt/content/2-privatumo-politika' },
      { name: 'Mano paskyra', url: 'https://kimchinamai.lt/prisijungimas?back=my-account' },
      { name: 'Sąlygos ir taisyklės', url: 'https://kimchinamai.lt/content/3-salygos-ir-taisykles' },
      { name: 'Prekių pristatymas', url: 'https://kimchinamai.lt/content/1-delivery' },
      
    ];

    for (const link of footerLinks) {
    
      await page.goto('https://kimchinamai.lt/', { waitUntil: 'domcontentloaded' });

      const linkLocator = link.name === 'Mano paskyra'
        ? page.locator('a').filter({ hasText: link.name })
        : page.getByRole('link', { name: link.name });

      try {
     
        await linkLocator.waitFor({ state: 'visible', timeout: 10000 });

        // Scroll to and click the link
        await linkLocator.scrollIntoViewIfNeeded();
        await linkLocator.click({ timeout: 15000 });

       
        if (link.url !== '#') {
          await expect(page).toHaveURL(link.url, { timeout: 10000 });
        } else {
       
          await expect(linkLocator).toBeVisible();
        }
      } catch (error) {
        console.error(`Error with link '${link.name}':`, error);
        
      
        try {
          await page.screenshot({ 
            path: `errors/${link.name.replace(/\s+/g, '-')}.png`, 
            fullPage: true 
          });
        } catch (screenshotError) {
          console.error('Screenshot failed:', screenshotError);
        }

        await page.pause(); 
      }
    }
  });
});