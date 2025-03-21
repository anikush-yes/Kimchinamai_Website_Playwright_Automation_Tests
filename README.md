
# 🍜 Kimchinamai Website Playwright Automation Tests 

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## 📋 Overview

This project involved performing **exploratory testing** to evaluate the functionality of the webstore (https://kimchinamai.lt). **Fifteen test scenarios** were developed,
and 15 test cases were **automated** using **Playwright**. A CI pipeline was built in GitHub to automatically execute these tests, ensuring continuous quality assurance.

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
├── Kimchinamai_Tests       # Test files
│   ├── e2e tests           # End-to-end test scenarios
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

## 📝 Test Examples

### Home Page Naigation Menu Test

```typescript
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
```

### Shopping Cart Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {

  test.setTimeout(60000); 

  test('Should add a product to the cart and verify it', async ({ page }) => {
    await page.goto('https://kimchinamai.lt/');
    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('menuitem', { name: 'PARDUOTUVĖ' }).first().click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('article')
      .filter({ hasText: '10,20 € Tradicinis kimchi su' })
      .getByRole('button')
      .click();

    await page.getByRole('link', { name: 'KREPŠELIS' }).click();
    await page.waitForLoadState('networkidle');

    const productLink = page.locator('#main')
      .getByRole('link', { name: /Tradicinis kimchi/ });

    await productLink.waitFor({ state: 'visible', timeout: 60000 });
    await productLink.click();

    await page.waitForLoadState('networkidle');

    const price = await page.locator('.ce-product-price > span').first().textContent();

    const priceText = price?.replace(/\s/g, ''); 
expect(priceText).toBe('10,20€');
    
    await expect(page.getByText('Tradicinis - tikra kimchi')).toBeVisible();
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

Project Maintainer: anikush@hotmail.com

---

⭐ Star this repository if you find it useful! ⭐

