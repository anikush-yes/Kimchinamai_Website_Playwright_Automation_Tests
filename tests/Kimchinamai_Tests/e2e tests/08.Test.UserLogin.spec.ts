
import { test, expect } from '@playwright/test';

test.describe('User Login', () => {

    test.setTimeout(60000);

    test('Should successfully log in with valid credentials', async ({ page }) => {
        await page.goto('https://kimchinamai.lt/');
        await page.waitForLoadState('domcontentloaded');

        await page.getByRole('link', { name: 'Mano paskyra' }).first().click();

        await expect(page.getByRole('heading', { name: 'Prisijungti prie paskyros' })).toBeVisible();

        await page.getByRole('textbox', { name: 'El. pašto adresas', exact: true }).fill('e97h8z9gepr@example.com');
        await page.getByRole('textbox', { name: 'Slaptažodis' }).fill('Pass3124!');
        await page.getByRole('button', { name: 'Prisijungti' }).click();

       
        await page.waitForLoadState('networkidle');

      
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByText('Pavasare').nth(2)).toBeVisible();
    });

});












