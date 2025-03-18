import { test, expect } from '@playwright/test';

test.describe('Test Scenario 5: Removing a Product from the Cart', () => {
  test('Should remove a product from the cart', async ({ page }) => {
    
    // 5.1 - 5.2 Navigate to the product page
    await page.goto('https://kimchinamai.lt/');
    
    // Click on the 'PARDUOTUVĖ' menu item
    const parduotuveLink = page.getByRole('menuitem', { name: 'PARDUOTUVĖ' }).first();
    await parduotuveLink.click();
    await expect(page).toHaveURL('https://kimchinamai.lt/10-parduotuve');

    // 5.3 Add product to cart
    const addToCartButtons = page.locator('a[href="#ce-action=addToCart"]');
    await addToCartButtons.first().click(); // Click on the first product's 'Add to Cart' button
    await page.waitForTimeout(1000); // Wait for the product to be added

    // 5.4 Open the Cart (Krepšelis)
    await page.getByRole('link', { name: 'KREPŠELIS' }).click();

    // 5.5 Remove product from cart
    const removeFromCartButtons = page.locator('.remove-from-cart');
    await removeFromCartButtons.first().click(); // Click on the first remove button
    await page.waitForTimeout(500); // Wait for the action to complete

    // 5.6 Verify the cart is empty
    const emptyCartMessage = page.locator('text=Jūsų krepšelyje nėra prekių');
    await expect(emptyCartMessage).toBeVisible();
  });
});