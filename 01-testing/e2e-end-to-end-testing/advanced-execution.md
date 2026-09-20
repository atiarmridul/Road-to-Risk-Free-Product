# Advanced E2E Execution and CI

## 🏗️ Advanced Topics

### CI/CD Integration (GitHub Actions)

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ==================== Cypress ====================
  cypress-e2e:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3] # ৩টি প্যারালেল কন্টেইনার
    steps:
      - uses: actions/checkout@v4

      - name: Node.js সেটআপ
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: ডিপেন্ডেন্সি ইনস্টল
        run: npm ci

      - name: অ্যাপ বিল্ড
        run: npm run build

      - name: Cypress চালান
        uses: cypress-io/github-action@v6
        with:
          start: npm run start
          wait-on: "http://localhost:3000"
          wait-on-timeout: 120
          record: true
          parallel: true
          group: "E2E Tests"
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: ব্যর্থতায় আর্টিফ্যাক্ট সংরক্ষণ
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots-${{ matrix.containers }}
          path: cypress/screenshots
          retention-days: 7

  # ==================== Playwright ====================
  playwright-e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci

      - name: Playwright ব্রাউজার ইনস্টল
        run: npx playwright install --with-deps

      - name: অ্যাপ বিল্ড
        run: npm run build

      - name: Playwright টেস্ট চালান
        run: npx playwright test
        env:
          CI: true

      - name: রিপোর্ট আপলোড
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14

  # ==================== Laravel Dusk ====================
  laravel-dusk:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: testing
          MYSQL_ROOT_PASSWORD: secret
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3
    steps:
      - uses: actions/checkout@v4

      - name: PHP সেটআপ
        uses: shivammathur/setup-php@v2
        with:
          php-version: "8.3"
          extensions: mbstring, mysql, gd

      - name: Composer ইনস্টল
        run: composer install --no-progress

      - name: Chrome driver আপডেট
        run: php artisan dusk:chrome-driver --detect

      - name: Chrome শুরু
        run: google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 &

      - name: অ্যাপ সেটআপ
        run: |
          cp .env.dusk.ci .env
          php artisan key:generate
          php artisan migrate --seed

      - name: সার্ভার শুরু
        run: php artisan serve --port=8001 &

      - name: Dusk টেস্ট চালান
        run: php artisan dusk
        env:
          APP_URL: http://127.0.0.1:8001

      - name: স্ক্রিনশট সংরক্ষণ
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: dusk-screenshots
          path: tests/Browser/screenshots
```

### প্যারালেল E2E Execution

```javascript
// Playwright — fullyParallel: true কনফিগে ডিফল্ট
// শার্ডিং (CI-তে একাধিক মেশিনে ভাগ করে চালানো)

// কমান্ড:
// মেশিন ১: npx playwright test --shard=1/3
// মেশিন ২: npx playwright test --shard=2/3
// মেশিন ৩: npx playwright test --shard=3/3

// Cypress — cypress-parallel বা Cypress Cloud এর --parallel ফ্ল্যাগ ব্যবহার
// npx cypress run --record --parallel --group "e2e-full"
```

```yaml
# GitHub Actions-এ Playwright শার্ডিং
playwright-sharded:
  runs-on: ubuntu-latest
  strategy:
    fail-fast: false
    matrix:
      shard: [1/4, 2/4, 3/4, 4/4]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npx playwright test --shard=${{ matrix.shard }}
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: blob-report-${{ strategy.job-index }}
        path: blob-report

  # রিপোর্ট একত্রিতকরণ
  merge-reports:
    needs: playwright-sharded
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
```

### Flaky Test Handling — অস্থির টেস্ট সামলানো

```javascript
// Playwright — retry কনফিগ
// playwright.config.js
module.exports = defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry", // প্রথম retry-তে trace রেকর্ড
  },
});

// নির্দিষ্ট টেস্টে retry
test("অস্থির টেস্ট", async ({ page }) => {
  test
    .info()
    .annotations.push({ type: "flaky", description: "নেটওয়ার্ক নির্ভর" });
  // ...
});

// Cypress — retry কনফিগ
// cypress.config.js
module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
```

#### Flaky টেস্ট চিহ্নিত করা ও ঠিক করার কৌশল

```javascript
// ❌ Flaky — নির্দিষ্ট সময়ে অপেক্ষা (brittle)
cy.wait(5000);
cy.get(".data").should("exist");

// ✅ স্থিতিশীল — শর্তে অপেক্ষা
cy.get(".data", { timeout: 15000 }).should("be.visible");

// ❌ Flaky — অ্যানিমেশন চলাকালীন ক্লিক
cy.get(".modal-btn").click();

// ✅ স্থিতিশীল — অ্যানিমেশন শেষে ক্লিক
cy.get(".modal-btn")
  .should("be.visible")
  .and("not.have.class", "animating")
  .click();

// ❌ Flaky — test data collision (অন্য টেস্ট একই ডেটা ব্যবহার করছে)
cy.get("#email").type("user@test.com");

// ✅ স্থিতিশীল — ইউনিক ডেটা
const uniqueEmail = `user_${Date.now()}@test.com`;
cy.get("#email").type(uniqueEmail);
```

### Test Data Management — টেস্ট ডেটা ব্যবস্থাপনা

```javascript
// Cypress — beforeEach-এ ডেটা সিডিং
describe("অর্ডার ম্যানেজমেন্ট", () => {
  beforeEach(() => {
    // API দিয়ে ডেটা তৈরি (UI-এর চেয়ে দ্রুত)
    cy.request("POST", "/api/test/seed", {
      users: 5,
      products: 20,
      orders: 10,
    });

    cy.login("admin@shop.com.bd", "Admin123!");
  });

  afterEach(() => {
    // ডেটা পরিষ্কার করা
    cy.request("POST", "/api/test/cleanup");
  });
});

// Playwright — global setup/teardown
// global-setup.js
const { chromium } = require("@playwright/test");

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // অ্যাডমিন হিসেবে লগইন করে storageState সংরক্ষণ
  await page.goto("http://localhost:3000/login");
  await page.getByLabel("ইমেইল").fill("admin@shop.com.bd");
  await page.getByLabel("পাসওয়ার্ড").fill("Admin123!");
  await page.getByRole("button", { name: "লগইন" }).click();

  await page.context().storageState({ path: ".auth/admin.json" });
  await browser.close();
};

// playwright.config.js
module.exports = defineConfig({
  globalSetup: require.resolve("./global-setup"),
  projects: [
    {
      name: "authenticated",
      use: { storageState: ".auth/admin.json" },
    },
  ],
});
```

```php
// Laravel Dusk — DatabaseMigrations trait ব্যবহার
use Illuminate\Foundation\Testing\DatabaseMigrations;

class OrderTest extends DuskTestCase
{
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();
        // প্রতিটি টেস্টে fresh database + seed
        $this->artisan('db:seed', ['--class' => 'TestSeeder']);
    }

    public function test_admin_can_manage_orders(): void
    {
        $admin = User::factory()->admin()->create();
        $orders = Order::factory()->count(5)->create();

        $this->browse(function (Browser $browser) use ($admin) {
            $browser->loginAs($admin)
                    ->visit('/admin/orders')
                    ->assertSee('মোট অর্ডার: ৫');
        });
    }
}
```

---
