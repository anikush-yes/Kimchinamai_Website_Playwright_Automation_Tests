import { test, expect } from '@playwright/test';

test.describe('Test Scenario 6: Updating Product Quantity', () => {

  test('Should update the price when product quantity is changed', async ({ page }) => {

    // 6.1 - 6.4 Navigate to the product page
    await page.goto('https://kimchinamai.lt/');

    // Click on the 'PARDUOTUVĖ' link
    const parduotuveLink = page.locator('.pk-nav-link:has-text("PARDUOTUVĖ")');
    await parduotuveLink.click();
    await expect(page).toHaveURL('https://kimchinamai.lt/10-parduotuve');

    // Add products to the cart
    const addToCartButtons = page.locator('a[href="#ce-action=addToCart"]');
    await addToCartButtons.first().click(); // Click on the first product's 'Add to Cart' button
    await page.waitForTimeout(1000); // Wait for the product to be added

    // Open the Cart (Krepšelis)
    const cartButton = page.locator('.elementor-button--view-cart').first();
    await cartButton.click();
    await page.waitForTimeout(500);

    // 6.5 Update the product quantity
    const increaseQuantityButton = page.locator('ul.cart-items li.cart-item').first().locator('.js-touchspin.js-increase-product-quantity');
    await increaseQuantityButton.click(); // Increase product quantity
    await page.waitForTimeout(1000); // Wait for the price update

    // 6.6 Verify that the price is updated
    const updatedPrice = page.locator('ul.cart-items li.cart-item').first().locator('.product-price strong');
    await expect(updatedPrice).toContainText('20,40 €'); // Verify the updated price

  });

});