# Visual Regression Tools and Examples

## 💻 Playwright Snapshot Testing

```javascript
// tests/visual/product-page.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Daraz Product Page Visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.daraz.com.bd/products/iphone-15-i12345/");
    await page.waitForLoadState("networkidle");

    // 🔥 Stabilize dynamic content
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
        [data-testid="countdown"] { visibility: hidden !important; }
      `,
    });
  });

  test("product page — desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot("product-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.005, // 0.5% tolerance
      animations: "disabled",
      mask: [
        page.locator('[data-testid="ad-banner"]'),
        page.locator('[data-testid="recently-viewed"]'),
      ],
    });
  });

  test("product page — mobile (iPhone 12)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page).toHaveScreenshot("product-mobile.png", {
      fullPage: true,
    });
  });

  test("add to cart button — focus state", async ({ page }) => {
    const btn = page.locator('[data-testid="add-to-cart"]');
    await btn.focus();
    await expect(btn).toHaveScreenshot("cta-focus.png");
  });

  test("Bangla locale rendering", async ({ page }) => {
    await page.goto("?lang=bn");
    await expect(page.locator(".product-title")).toHaveScreenshot(
      "title-bn.png",
    );
  });
});
```

```bash
# First run — generates baseline
npx playwright test --update-snapshots

# CI run — compares
npx playwright test
```

### Cross-browser/cross-device matrix

```javascript
// playwright.config.ts
export default {
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"] } },
    { name: "iphone-12", use: { ...devices["iPhone 12"] } },
    { name: "pixel-5", use: { ...devices["Pixel 5"] } },
    { name: "galaxy-s9", use: { ...devices["Galaxy S9+"] } },
    { name: "ipad-mini", use: { ...devices["iPad Mini"] } },
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2, // perceptual sensitivity
    },
  },
};
```

Snapshots save হয় `tests/visual/__screenshots__/<browser>/<test>.png`।

---

## 💻 BackstopJS (PHP/Laravel app-এ popular)

```javascript
// backstop.json
{
  "id": "pathao_visual",
  "viewports": [
    { "label": "mobile",  "width":  375, "height": 667 },
    { "label": "tablet",  "width":  768, "height": 1024 },
    { "label": "desktop", "width": 1440, "height": 900 }
  ],
  "scenarios": [
    {
      "label": "Homepage",
      "url": "https://pathao.com",
      "delay": 1000,
      "removeSelectors": [".cookie-banner", "[data-dynamic]"],
      "hideSelectors":   [".live-counter"],
      "misMatchThreshold": 0.1
    },
    {
      "label": "Login Modal",
      "url": "https://pathao.com",
      "clickSelector": "[data-testid='login-btn']",
      "postInteractionWait": 500,
      "selectors": [".modal"]
    },
    {
      "label": "Ride booking flow",
      "url": "https://pathao.com/ride",
      "readyEvent": "appReady",
      "onReadyScript": "puppet/login.js"
    }
  ],
  "engine": "puppeteer",
  "report": ["browser", "CI"],
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "paths": {
    "bitmaps_reference": "backstop_data/reference",
    "bitmaps_test":      "backstop_data/test",
    "ci_report":         "backstop_data/ci_report",
    "html_report":       "backstop_data/html_report"
  }
}
```

```bash
npm install -g backstopjs
backstop reference        # baseline
backstop test             # compare
backstop approve          # accept changes as new baseline
```

---

## 💻 Storybook + Chromatic (Component-level)

```javascript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Daraz/Button',
  component: Button,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1440],
      diffThreshold: 0.05,
      modes: {
        light: { theme: 'light' },
        dark:  { theme: 'dark' },
        bn:    { locale: 'bn' },
      },
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: 'primary', children: 'কিনুন' },
};

export const LongBanglaText: StoryObj<typeof Button> = {
  args: { children: 'ক্যাশ অন ডেলিভারিতে অর্ডার করুন' },
};

export const Disabled: StoryObj<typeof Button> = {
  args: { variant: 'primary', disabled: true, children: 'লোড হচ্ছে...' },
};
```

```yaml
# .github/workflows/chromatic.yml
name: Chromatic
on: pull_request
jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - run: npm ci
      - uses: chromaui/action@v11
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          exitOnceUploaded: true
          onlyChanged: true # turbosnap: শুধু changed component
```

PR-এ Chromatic UI review link comment করে; reviewer pixel-diff দেখে accept/reject।

---

## 💻 Cypress + Percy

```javascript
// cypress/e2e/checkout.cy.ts
describe("Foodpanda checkout VRT", () => {
  it("cart page", () => {
    cy.visit("/cart");
    cy.contains("৳").should("be.visible");
    cy.percySnapshot("Cart Page", {
      widths: [375, 768, 1280],
      minHeight: 1024,
    });
  });

  it("payment selection — bKash", () => {
    cy.visit("/checkout");
    cy.get('[data-test="payment-bkash"]').click();
    cy.percySnapshot("Payment - bKash selected");
  });
});
```

```bash
PERCY_TOKEN=xxx npx percy exec -- cypress run
```

---

## 🔧 Storybook + Loki (self-hosted, no Chromatic)

```javascript
// loki.config.json
{
  "configurations": {
    "chrome.laptop":  { "target": "chrome.docker", "width": 1366, "height": 768 },
    "chrome.iphone8": { "target": "chrome.docker", "preset": "iPhone 8" },
    "chrome.ipad":    { "target": "chrome.docker", "preset": "iPad" }
  },
  "diffingEngine": "looks-same",
  "looksSame": { "tolerance": 5, "antialiasingTolerance": 4 }
}
```

```bash
loki update    # baseline
loki test      # compare
```

---
