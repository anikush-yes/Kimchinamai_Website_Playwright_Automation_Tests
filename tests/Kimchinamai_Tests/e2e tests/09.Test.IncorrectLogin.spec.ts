import { test, expect } from '@playwright/test';

test.describe('Incorrect Login', () => {

    test.setTimeout(60000);

    test('Should show an error message with incorrect login credentials', async ({ page }) => {
        await page.goto('https://kimchinamai.lt/');
        await page.waitForLoadState('domcontentloaded');

        await page.getByRole('link', { name: 'Mano paskyra' }).first().click();

        await expect(page.getByRole('heading', { name: 'Prisijungti prie paskyros' })).toBeVisible();

        await page.getByRole('textbox', { name: 'El. pašto adresas', exact: true }).fill('wrongemail@example.com');
        await page.getByRole('textbox', { name: 'Slaptažodis' }).fill('rongpassword123');
        await page.getByRole('button', { name: 'Prisijungti' }).click();

    
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');

        await expect(page.getByText('Identifikavimas nepavyko')).toBeVisible();
    });
    });

