# Advanced End-to-End Test Scenarios

## ৬. মাল্টি-ট্যাব/মাল্টি-ইউজার টেস্টিং (Playwright)
```javascript
const { test, expect } = require("@playwright/test");

test("একাধিক ট্যাবে কাজ করা", async ({ context }) => {
  // প্রথম ট্যাব
  const page1 = await context.newPage();
  await page1.goto("/products");

  // দ্বিতীয় ট্যাব (নতুন ট্যাবে লিঙ্ক খুলবে)
  const page2Promise = context.waitForEvent("page");
  await page1.getByText("বিস্তারিত দেখুন").click();
  const page2 = await page2Promise;
  await page2.waitForLoadState();

  await expect(page2).toHaveURL(/.*product\/\d+/);
  await expect(page2.locator("h1")).toBeVisible();
});

test("বিভিন্ন ইউজার দিয়ে সমান্তরাল টেস্ট", async ({ browser }) => {
  // প্রতিটি ব্যবহারকারীর জন্য আলাদা context (আলাদা সেশন)
  const adminContext = await browser.newContext();
  const buyerContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  const buyerPage = await buyerContext.newPage();

  // অ্যাডমিন একটি পণ্য যোগ করে
  await adminPage.goto("/admin/products/create");
  await adminPage.getByLabel("পণ্যের নাম").fill("নতুন ল্যাপটপ");
  await adminPage.getByLabel("দাম").fill("75000");
  await adminPage.getByRole("button", { name: "প্রকাশ করুন" }).click();

  // ক্রেতা সেই পণ্য দেখতে পায়
  await buyerPage.goto("/products");
  await buyerPage.reload();
  await expect(buyerPage.getByText("নতুন ল্যাপটপ")).toBeVisible();

  // ক্লিনআপ
  await adminContext.close();
  await buyerContext.close();
});

test("একাধিক ব্রাউজারে একই সাথে বিড করা", async ({ browser }) => {
  const bidder1 = await browser.newContext();
  const bidder2 = await browser.newContext();

  const page1 = await bidder1.newPage();
  const page2 = await bidder2.newPage();

  // উভয় ইউজার একই নিলাম পেজে
  await page1.goto("/auction/item-100");
  await page2.goto("/auction/item-100");

  // বিডার ১ বিড করে
  await page1.getByLabel("বিডের পরিমাণ").fill("5000");
  await page1.getByRole("button", { name: "বিড করুন" }).click();

  // বিডার ২ আপডেট দেখতে পায়
  await expect(page2.getByTestId("current-bid")).toContainText("৳5,000");

  await bidder1.close();
  await bidder2.close();
});
```

---

### ৭. ভিজ্যুয়াল রিগ্রেশন টেস্টিং

```javascript
// Playwright — স্ন্যাপশট টেস্টিং (built-in)
test("হোমপেজের ভিজ্যুয়াল তুলনা", async ({ page }) => {
  await page.goto("/");

  // পুরো পেজের স্ক্রিনশট তুলনা
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixelRatio: 0.01, // ১% পর্যন্ত পার্থক্য গ্রহণযোগ্য
  });

  // নির্দিষ্ট এলিমেন্টের স্ক্রিনশট
  await expect(page.locator(".hero-section")).toHaveScreenshot("hero.png");

  // অ্যানিমেশন বন্ধ করে তুলনা
  await expect(page).toHaveScreenshot("static-page.png", {
    animations: "disabled",
    mask: [page.locator(".dynamic-banner")], // পরিবর্তনশীল অংশ আড়াল
  });
});

// Cypress + Percy — ভিজ্যুয়াল রিভিউ
describe("ভিজ্যুয়াল রিগ্রেশন", () => {
  it("পণ্য কার্ড সঠিকভাবে রেন্ডার হচ্ছে", () => {
    cy.visit("/products");
    cy.get(".product-grid").should("be.visible");

    // Percy স্ন্যাপশট
    cy.percySnapshot("Products Page", {
      widths: [375, 768, 1280], // মোবাইল, ট্যাবলেট, ডেস্কটপ
      minHeight: 1024,
    });
  });

  it("বাংলা ফন্ট সঠিকভাবে রেন্ডার হচ্ছে", () => {
    cy.visit("/bn/about");
    // বাংলা কন্টেন্ট লোড হওয়ার জন্য অপেক্ষা
    cy.get(".bangla-content").should("be.visible");
    cy.percySnapshot("Bangla Content Page");
  });
});
```

```php
// Laravel Dusk — স্ক্রিনশট তুলনা
public function test_visual_regression(): void
{
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
                ->waitFor('.hero-section')
                ->assertScreenshot('homepage', tolerance: 0.01);
                // assertScreenshot (custom assertion) পিক্সেল-by-পিক্সেল তুলনা করে
    });
}
```

---

### ৮. API Mocking in E2E

```javascript
// Cypress — cy.intercept দিয়ে API mock করা
describe("API Mocking", () => {
  it("বিকাশ API ত্রুটিতে সঠিক বার্তা দেখাবে", () => {
    cy.intercept("POST", "/api/payment/bkash/create", {
      statusCode: 503,
      body: {
        statusCode: "2023",
        statusMessage: "Insufficient Balance",
      },
    }).as("bkashCreate");

    cy.visit("/checkout/payment");
    cy.get('[data-testid="bkash-option"]').click();
    cy.get("#bkash-number").type("01712345678");
    cy.get("#pay-btn").click();

    cy.wait("@bkashCreate");
    cy.get(".payment-error").should("contain", "অপর্যাপ্ত ব্যালেন্স");
  });

  it("ধীর API-তে লোডিং স্পিনার দেখাবে", () => {
    cy.intercept("GET", "/api/products", (req) => {
      req.reply({
        delay: 5000,
        fixture: "products.json",
      });
    }).as("slowProducts");

    cy.visit("/products");
    cy.get(".loading-spinner").should("be.visible");
    cy.wait("@slowProducts");
    cy.get(".loading-spinner").should("not.exist");
    cy.get(".product-card").should("have.length.gt", 0);
  });

  it("API কল-এর request body যাচাই", () => {
    cy.intercept("POST", "/api/orders", (req) => {
      // request body পরীক্ষা
      expect(req.body.items).to.have.length(2);
      expect(req.body.shipping.city).to.equal("ঢাকা");

      req.reply({
        statusCode: 201,
        body: { orderId: "ORD-999" },
      });
    }).as("createOrder");

    // ... checkout steps ...
    cy.wait("@createOrder");
  });
});

// Playwright — page.route দিয়ে API mock করা
test("API mocking with Playwright", async ({ page }) => {
  // JSON ফাইল থেকে mock ডেটা
  await page.route("**/api/products", async (route) => {
    const json = require("./fixtures/products.json");
    await route.fulfill({ json });
  });

  // শর্তসাপেক্ষ mock
  await page.route("**/api/search**", async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get("q");

    if (query === "মোবাইল") {
      await route.fulfill({
        json: { results: [{ name: "Samsung Galaxy", price: 25000 }] },
      });
    } else {
      await route.fulfill({
        json: { results: [] },
      });
    }
  });

  await page.goto("/products");
  await expect(page.locator(".product-card")).toHaveCount(10);
});
```

---

### ৯. মোবাইল রেসপন্সিভ টেস্টিং

```javascript
// Cypress — ভিউপোর্ট পরিবর্তন
describe("রেসপন্সিভ ডিজাইন", () => {
  const viewports = [
    { name: "মোবাইল", width: 375, height: 667 },
    { name: "ট্যাবলেট", width: 768, height: 1024 },
    { name: "ডেস্কটপ", width: 1280, height: 720 },
  ];

  viewports.forEach(({ name, width, height }) => {
    it(`${name}-এ নেভিগেশন সঠিকভাবে কাজ করবে`, () => {
      cy.viewport(width, height);
      cy.visit("/");

      if (width < 768) {
        // মোবাইলে হ্যামবার্গার মেনু
        cy.get(".desktop-nav").should("not.be.visible");
        cy.get(".hamburger-btn").should("be.visible").click();
        cy.get(".mobile-nav").should("be.visible");
        cy.get(".mobile-nav").contains("পণ্যসমূহ").click();
      } else {
        // ডেস্কটপে সাধারণ নেভ
        cy.get(".desktop-nav").should("be.visible");
        cy.get(".desktop-nav").contains("পণ্যসমূহ").click();
      }

      cy.url().should("include", "/products");
    });
  });

  it("প্রোডাক্ট গ্রিড রেসপন্সিভ", () => {
    // মোবাইলে ১ কলাম
    cy.viewport("iphone-x");
    cy.visit("/products");
    cy.get(".product-grid")
      .should("have.css", "grid-template-columns")
      .and("match", /1fr/);

    // ডেস্কটপে ৪ কলাম
    cy.viewport(1280, 720);
    cy.get(".product-grid")
      .should("have.css", "grid-template-columns")
      .and("not.match", /^[^f]*1fr[^f]*$/);
  });
});

// Playwright — ডিভাইস ইমুলেশন (আরও সঠিক)
const { devices } = require("@playwright/test");

test.describe("মোবাইল টেস্ট", () => {
  test.use({ ...devices["iPhone 13"] });

  test("মোবাইল নেভিগেশন", async ({ page }) => {
    await page.goto("/");

    // touch ইভেন্ট, সঠিক viewport, user agent সব সিমুলেট হয়
    await page.getByRole("button", { name: "মেনু" }).tap();
    await expect(page.locator(".mobile-nav")).toBeVisible();
  });
});
```

---

### ১০. অ্যাক্সেসিবিলিটি টেস্টিং (axe-core Integration)

```javascript
// Cypress + cypress-axe
// ইনস্টল: npm install cypress-axe axe-core --save-dev

// cypress/support/e2e.js
import "cypress-axe";

describe("অ্যাক্সেসিবিলিটি", () => {
  it("হোমপেজ অ্যাক্সেসিবল", () => {
    cy.visit("/");
    cy.injectAxe();

    // সকল অ্যাক্সেসিবিলিটি লঙ্ঘন পরীক্ষা
    cy.checkA11y();
  });

  it("নির্দিষ্ট এলাকা পরীক্ষা", () => {
    cy.visit("/products");
    cy.injectAxe();

    // শুধু ন্যাভ পরীক্ষা
    cy.checkA11y("nav");

    // নির্দিষ্ট নিয়ম বাদ দিয়ে
    cy.checkA11y(null, {
      rules: {
        "color-contrast": { enabled: false }, // রং বৈসাদৃশ্য বাদ
      },
    });
  });

  it("ফর্ম অ্যাক্সেসিবিলিটি", () => {
    cy.visit("/register");
    cy.injectAxe();

    // গুরুতর (critical) সমস্যাগুলো পরীক্ষা
    cy.checkA11y(null, {
      includedImpacts: ["critical", "serious"],
    });
  });
});

// Playwright + @axe-core/playwright
// ইনস্টল: npm install @axe-core/playwright --save-dev
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("অ্যাক্সেসিবিলিটি অডিট", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"]) // WCAG 2.0 Level AA
    .analyze();

  expect(results.violations).toEqual([]);
});

test("বাংলা কন্টেন্টের অ্যাক্সেসিবিলিটি", async ({ page }) => {
  await page.goto("/bn/about");

  const results = await new AxeBuilder({ page })
    .include(".main-content") // শুধু মূল কন্টেন্ট পরীক্ষা
    .exclude(".third-party-widget") // তৃতীয় পক্ষের উইজেট বাদ
    .withTags(["wcag2a", "wcag2aa", "best-practice"])
    .analyze();

  // লঙ্ঘনের বিস্তারিত রিপোর্ট
  results.violations.forEach((violation) => {
    console.log(`${violation.id}: ${violation.description}`);
    console.log(`  প্রভাব: ${violation.impact}`);
    console.log(`  এলিমেন্ট: ${violation.nodes.length}টি`);
  });

  expect(results.violations).toHaveLength(0);
});
```

---
