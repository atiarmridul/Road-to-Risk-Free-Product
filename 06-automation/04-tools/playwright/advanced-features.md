# Advanced Playwright Features

> Study architecture, browser projects, device emulation, and visual comparison after completing the fundamentals and framework-design notes.

## Architecture: use practical language

Playwright launches or connects to browser processes and sends commands through its browser automation transport. Selenium commonly communicates through the W3C WebDriver protocol. The implementation details differ, but architecture alone does not guarantee that one test suite will always be faster or more reliable.

In interviews, focus on observable capabilities:

- Playwright bundles browser-management support for Chromium, Firefox, and WebKit.
- Locators are re-evaluated when used and support automatic waiting.
- Browser contexts provide lightweight, isolated sessions.
- The runner integrates tracing, screenshots, video, projects, parallelism, and retries.
- Reliability still depends on good locators, isolated data, meaningful assertions, and controlled environments.

Avoid claiming that Playwright is universally faster because it “uses one WebSocket.” That explanation is oversimplified and may become inaccurate as implementations evolve.

## Browser projects

Projects run the same tests with different configurations, such as browsers, devices, login states, or environments.

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

Run one project while debugging:

```bash
npx playwright test --project=chromium
```

## Device emulation

Playwright device profiles can emulate settings such as viewport, user agent, touch support, locale, timezone, geolocation, permissions, and color scheme.

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

Emulation is useful for responsive-web coverage, but it is not a complete substitute for testing on real devices. It does not reproduce every operating-system behavior, hardware condition, browser-vendor difference, or native-app interaction.

## Visual comparison

Use `toHaveScreenshot()` for page or locator screenshot comparisons:

```typescript
import { test, expect } from '@playwright/test';

test('dashboard visual baseline', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveScreenshot('dashboard.png');
});
```

Create or intentionally update baselines with:

```bash
npx playwright test --update-snapshots
```

Keep the rendering environment consistent. Browser versions, operating systems, fonts, hardware, and headless settings can affect pixels.

Use `toMatchSnapshot()` for text or arbitrary binary values, not as the normal page-screenshot assertion.

## API testing with Playwright

The `request` fixture supports setup, direct API checks, and UI/API workflows:

```typescript
import { test, expect } from '@playwright/test';

test('creates an order through the API', async ({ request }) => {
  const response = await request.post('/api/orders', {
    data: { productId: 'book-1', quantity: 1 },
  });

  expect(response.status()).toBe(201);
  const order = await response.json();
  expect(order.id).toBeTruthy();
});
```

Do not use API setup when it bypasses the behavior the test is supposed to prove. A checkout UI test must still exercise checkout; an API call can prepare unrelated prerequisite data.

## Next topics

- [Tracing and debugging](tracing-and-debugging.md)
- [Practice exercises](../../05-practice/playwright-exercises.md)
- [Self-healing tests and risks](self-healing-tests.md)

## Official references

- [Browsers](https://playwright.dev/docs/browsers)
- [Projects](https://playwright.dev/docs/test-projects)
- [Emulation](https://playwright.dev/docs/emulation)
- [Visual comparisons](https://playwright.dev/docs/test-snapshots)

Reviewed against official Playwright documentation on 2026-09-20.
