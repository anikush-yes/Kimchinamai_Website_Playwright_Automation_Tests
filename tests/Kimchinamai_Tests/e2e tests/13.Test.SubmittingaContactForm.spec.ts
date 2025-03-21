import { test, expect } from '@playwright/test';

test.describe('Submitting a Contact Form', () => {

  test.setTimeout(60000); // Set a longer timeout if needed

  test('The contact form should be successfully submitted.', async ({ page }) => {
    
    // **1. Navigate to the Contact Page**
    await page.goto('https://kimchinamai.lt/');
    
    // Click on the 'SUSISIEKITE SU MUMIS' link
    const contactLink = page.locator('.elementor-element-2fbda9c.elementor-sticky--active > :nth-child(1) > :nth-child(1) > .elementor-element-326c126 > :nth-child(1) > :nth-child(1) > .elementor-element-00ee875 > :nth-child(1) > .pk-ce-widget-wrapper > .pk-ce-widget > .pk-nav > .pk-nav-ul > :nth-child(4) > .flex-container > .pk-nav-link');

    await contactLink.waitFor({ state: 'visible', timeout: 60000 });
    await contactLink.click({ force: true });

    // **2. Verify Contact Page**
    await expect(page).toHaveURL('https://kimchinamai.lt/susisiekite-su-mumis');
    await expect(page.locator('text=SUSISIEKITE SU MUMIS')).toBeVisible();

    // **3. Fill Contact Form**

    const randomText = `Message ${Math.random().toString(36).substring(2, 15)}`;

    // Select "Vartotojų pagalba" option
    const subjectDropdown = page.locator('#id-contact-184cc202');
    await subjectDropdown.selectOption({ label: 'Vartotojų pagalba' });
    await expect(subjectDropdown).toHaveValue('2');

    // Fill email input
    const emailInput = page.locator('input[name="from"]');
    await emailInput.fill('e97h8z9gepr@example.com');
    await expect(emailInput).toHaveValue('e97h8z9gepr@example.com');

    // Fill message textarea
    const messageTextarea = page.locator('textarea[name="message"]');
    await messageTextarea.fill(randomText);
    await expect(messageTextarea).toHaveValue(randomText);

    // **4. Submit the Form**
    const submitButton = page.locator('.elementor-field-type-submit > .elementor-button');
    await submitButton.click();

    // **5. Verify Successful Submission Message**
    const successMessage = page.locator('.elementor-message');
    console.log('Please complete the CAPTCHA manually within 60 seconds.');
    await page.pause(); // Pauses test for manual CAPTCHA completion
    

    
    // Verify success message
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Jūsų žinutė sėkmingai nusiųsta mūsų komandai.');
  });

});