import { test, expect } from '@playwright/test';

test.describe('Submitting an Empty Contact Form', () => {

    test.setTimeout(60000);

    test('The system should display validation errors when submitting an empty contact form.', async ({ page }) => {


        await page.goto('https://kimchinamai.lt/');

        const contactLink = page.locator('.elementor-element-2fbda9c.elementor-sticky--active > :nth-child(1) > :nth-child(1) > .elementor-element-326c126 > :nth-child(1) > :nth-child(1) > .elementor-element-00ee875 > :nth-child(1) > .pk-ce-widget-wrapper > .pk-ce-widget > .pk-nav > .pk-nav-ul > :nth-child(4) > .flex-container > .pk-nav-link');

        await contactLink.waitFor({ state: 'visible', timeout: 60000 });
        await contactLink.click({ force: true });

        await expect(page).toHaveURL('https://kimchinamai.lt/susisiekite-su-mumis');
        await expect(page.locator('text=SUSISIEKITE SU MUMIS')).toBeVisible();


        const subjectDropdown = page.locator('#id-contact-184cc202');
        await subjectDropdown.selectOption({ label: 'Vartotojų pagalba' });
        await expect(subjectDropdown).toHaveValue('2');

        const emailInput = page.locator('input[name="from"]');
        await emailInput.fill('');

        const messageTextarea = page.locator('textarea[name="message"]');
        await messageTextarea.fill('');

        const submitButton = page.locator('.elementor-field-type-submit > .elementor-button');
        await submitButton.click();

        const invalidFields = page.locator('input:invalid, textarea:invalid');
        await expect(invalidFields).toHaveCount(3);

        const emailValidationMessage = await emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
        expect(emailValidationMessage).toBe('Please fill out this field.');

        const messageValidationMessage = await messageTextarea.evaluate((textarea: HTMLTextAreaElement) => textarea.validationMessage);
        expect(messageValidationMessage).toBe('Please fill out this field.');
    });

});