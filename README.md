
# 🍜 Kimchinamai Website Playwright Automation Tests 

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## 📋 Overview

This project involved performing exploratory testing to evaluate the functionality of the webstore (https://kimchinamai.lt). Fifteen test scenarios were developed,
and 15 test cases were automated using Playwright. A CI pipeline was built in GitHub to automatically execute these tests, ensuring continuous quality assurance.

## 🛠️ Technologies Used

- **[Playwright](https://playwright.dev/)**: Modern, reliable end-to-end testing framework
- **[TypeScript](https://www.typescriptlang.org/)**: Statically typed JavaScript
- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment
- **[GitHub Actions](https://github.com/features/actions)**: CI/CD automation
- **[Expect](https://jestjs.io/docs/expect)**: Assertion library
- **[Prettier](https://prettier.io/)**: Code formatter
- **[ESLint](https://eslint.org/)**: JavaScript linter

## 🏗️ Project Structure

```
├── .github/workflows        # GitHub Actions workflow files
├── node_modules            # Node.js dependencies
├── playwright-report       # Test reports
├── test-results            # Test execution results
├── tests                   # Test files
│   ├── e2e                 # End-to-end test scenarios
│   ├── fixtures            # Test fixtures
│   └── page-objects        # Page Object Models
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata and dependencies
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anikush-yes/Kimchinamai_Website_Playwright_Automation_Tests.git
   cd Kimchinamai_Website_Playwright_Automation_Tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (with UI):
```bash
npx playwright test --headed
```

Run a specific test file:
```bash
npx playwright test tests/e2e/homepage.spec.ts
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

Generate and view HTML report:
```bash
npx playwright show-report
```

## 🧩 Test Framework Architecture

### Page Object Model (POM)

The project follows the Page Object Model design pattern, which makes the test code more maintainable and reusable. Each web page has a corresponding page object that encapsulates the page's elements and actions.

Example Page Object (Menu Page):

```typescript
import { Locator, Page } from "@playwright/test";

export class MenuPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator("text=Add to cart");
  }

  async navigate() {
    await this.page.goto("https://kimchinamai.com/menu");
  }

  async addItemToCart(itemName: string) {
    await this.page.locator(`text=${itemName}`).first().click();
    await this.addToCartBtn.click();
  }
}
```

### Test Fixtures

Playwright fixtures are used to set up the test environment, making it easier to share setup code between tests.

```typescript
import { test as base } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { MenuPage } from "../page-objects/menu-page";
import { CartPage } from "../page-objects/cart-page";

type TestFixtures = {
  homePage: HomePage;
  menuPage: MenuPage;
  cartPage: CartPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  menuPage: async ({ page }, use) => {
    await use(new MenuPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
```

## 📝 Test Examples

### Home Page Navigation Test

```typescript
import { test, expect } from "../fixtures/base-fixture";

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test("should navigate to menu page from homepage", async ({ homePage }) => {
    await homePage.clickMenuButton();
    await expect(homePage.page).toHaveURL(/.*menu/);
  });

  test("should validate restaurant contact information", async ({ homePage }) => {
    const contactInfo = await homePage.getContactInfo();
    expect(contactInfo).toContain("123-456-7890");
    expect(contactInfo).toContain("123 Korean Food St, Food City");
  });
});
```

### Shopping Cart Test

```typescript
import { test, expect } from "../fixtures/base-fixture";

test.describe("Shopping Cart Tests", () => {
  test("should add item to cart and verify cart count", async ({ menuPage, cartPage }) => {
    // Navigate to menu page
    await menuPage.navigate();
    
    // Add Bibimbap to cart
    await menuPage.addItemToCart("Bibimbap");
    
    // Verify cart count badge shows 1 item
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
  
  test("should update item quantity in cart", async ({ menuPage, cartPage }) => {
    // Navigate to menu page and add item to cart
    await menuPage.navigate();
    await menuPage.addItemToCart("Bulgogi");
    
    // Navigate to cart page
    await cartPage.navigate();
    
    // Update item quantity to 3
    await cartPage.updateItemQuantity("Bulgogi", 3);
    
    // Verify quantity was updated
    const quantity = await cartPage.getItemQuantity("Bulgogi");
    expect(quantity).toBe(3);
    
    // Verify subtotal was updated
    const subtotal = await cartPage.getSubtotal();
    expect(subtotal).toMatch(/\$\d+\.\d{2}/);
  });
});
```

## 🔄 CI/CD Integration

The repository is configured with GitHub Actions for continuous integration. Tests are automatically run on push to the main branch and on pull requests.

GitHub workflow configuration:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 📊 Test Reporting

Test results are generated in HTML format for easy analysis. After running tests, view the report using:

```bash
npx playwright show-report
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Maintainer: [anikush-yes](https://github.com/anikush-yes)

---

⭐ Star this repository if you find it useful! ⭐

