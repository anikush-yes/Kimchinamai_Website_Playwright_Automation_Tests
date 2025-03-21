import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {

  test.setTimeout(60000);

  test('Create account and verify the user is registered', async ({ page }) => {
    await page.goto('https://kimchinamai.lt/');
    await page.waitForLoadState('domcontentloaded');

  
    await page.getByRole('link', { name: 'Mano paskyra' }).first().click();

  
    await expect(page.getByRole('heading', { name: 'Prisijungti prie paskyros' })).toBeVisible();

    await page.locator('text=Sukurti paskyrą').click({ force: true });

  
    const randomFirstName = 'Pavasare';
    const randomLastName = 'Pavasarele';
    const randomEmail = `${Math.random().toString(36).substring(2, 15)}@example.com`;
    const randomPassword = `Pass${Math.floor(Math.random() * 10000)}!`;
    const randomBirthday = `199${Math.floor(Math.random() * 10)}-0${Math.floor(Math.random() * 9) + 1}-1${Math.floor(Math.random() * 9) + 1}`; 

    await page.fill('input[name="firstname"]', randomFirstName);
    await page.fill('input[name="lastname"]', randomLastName);
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="password"]', randomPassword);
    await page.fill('input[name="birthday"]', randomBirthday);

 
    await page.check('input[name="psgdpr"]');
    await page.check('input[name="customer_privacy"]');

   
    await page.locator('.elementor-button-content-wrapper')
      .locator('.elementor-button-text')
      .locator('text=Sukurti paskyrą')
      .click();

    
    const accountName = page.locator('header a[href="https://kimchinamai.lt/mano-paskyra"] span');
  });
});
