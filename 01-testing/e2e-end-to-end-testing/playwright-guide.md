# Playwright E2E Guide

## ২. Playwright — Microsoft-এর ক্রস-ব্রাউজার E2E টুল
### সেটআপ
```bash
# Playwright ইনস্টল
npm init playwright@latest

# নির্দিষ্ট ব্রাউজার ইনস্টল
npx playwright install chromium firefox webkit
```

#### `playwright.config.js`

```javascript
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["junit", { outputFile: "results.xml" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    locale: "bn-BD", // বাংলাদেশ লোকেল
    timezoneId: "Asia/Dhaka", // ঢাকা টাইমজোন
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // মোবাইল ডিভাইস
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

#### মৌলিক Playwright API

```javascript
const { test, expect } = require("@playwright/test");

test.describe("প্রোডাক্ট পেজ", () => {
  test("প্রোডাক্ট লিস্ট লোড হওয়া উচিত", async ({ page }) => {
    // page.goto — পেজে যাওয়া
    await page.goto("/products");

    // page.locator — এলিমেন্ট খোঁজা (auto-waiting সহ)
    const heading = page.locator("h1");
    await expect(heading).toHaveText("সকল প্রোডাক্ট");

    // getByRole — accessibility role দিয়ে খোঁজা (সবচেয়ে ভালো পদ্ধতি)
    await page.getByRole("button", { name: "কার্টে যোগ করুন" }).click();

    // getByTestId — data-testid দিয়ে খোঁজা
    await expect(page.getByTestId("cart-count")).toHaveText("1");

    // getByPlaceholder — placeholder দিয়ে ইনপুট খোঁজা
    await page.getByPlaceholder("অনুসন্ধান করুন...").fill("ল্যাপটপ");

    // getByText — টেক্সট দিয়ে খোঁজা
    await expect(page.getByText("কোনো ফলাফল নেই")).toBeHidden();
  });
});
```

#### Auto-Waiting — Playwright-এর সবচেয়ে শক্তিশালী ফিচার

```javascript
test("Auto-waiting ডেমো", async ({ page }) => {
  await page.goto("/dashboard");

  // Playwright স্বয়ংক্রিয়ভাবে অপেক্ষা করে:
  // ১. এলিমেন্ট DOM-এ আছে কিনা
  // ২. দৃশ্যমান কিনা
  // ৩. স্থির (stable) কিনা — অ্যানিমেশন শেষ হয়েছে কিনা
  // ৪. ক্লিকযোগ্য কিনা — অন্য এলিমেন্ট দ্বারা ঢাকা নেই

  // কোনো sleep/wait লাগে না!
  await page.getByRole("button", { name: "ডেটা লোড করুন" }).click();
  await expect(page.locator(".data-table")).toBeVisible();

  // নির্দিষ্ট শর্তে অপেক্ষা করা
  await page.waitForResponse("**/api/data");
  await page.waitForLoadState("networkidle");
  await page.waitForURL("**/success");
});
```

#### মাল্টি-ব্রাউজার টেস্টিং

```bash
# সব ব্রাউজারে চালান
npx playwright test

# নির্দিষ্ট ব্রাউজার
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project="mobile-chrome"
```

#### Codegen — টেস্ট অটো-জেনারেট

```bash
# ব্রাউজার খুলে আপনার অ্যাকশন রেকর্ড করুন
npx playwright codegen http://localhost:3000

# বাংলাদেশি সাইটের জন্য
npx playwright codegen https://www.daraz.com.bd
```

> **Codegen** ব্রাউজারে আপনার প্রতিটি ক্লিক ও টাইপ ট্র্যাক করে স্বয়ংক্রিয়ভাবে টেস্ট কোড তৈরি করে। নতুনদের জন্য অসাধারণ!

#### Trace Viewer — ডিবাগিং

```bash
# trace সহ টেস্ট চালান
npx playwright test --trace on

# trace ফাইল দেখুন
npx playwright show-trace trace.zip
```

```javascript
test("trace ডেমো", async ({ page, context }) => {
  // প্রোগ্রাম্যাটিক trace শুরু
  await context.tracing.start({ screenshots: true, snapshots: true });

  await page.goto("/checkout");
  // ... টেস্ট স্টেপ ...

  // trace সংরক্ষণ
  await context.tracing.stop({ path: "checkout-trace.zip" });
});
```

> Trace Viewer প্রতিটি স্টেপের স্ক্রিনশট, নেটওয়ার্ক কল, কনসোল লগ দেখায় — ডিবাগিংয়ে অতুলনীয়।

---
