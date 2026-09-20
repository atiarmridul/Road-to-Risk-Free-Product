# Playwright Setup and First Test

## Create a project

```bash
npm init playwright@latest
npx playwright test
```

Typical structure:

```text
playwright.config.ts
tests/
  login.spec.ts
```

## First test

```typescript
import { test, expect } from '@playwright/test';

test('valid user reaches the dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('student@example.com');
  await page.getByLabel('Password').fill('correct-password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

`test` defines execution and fixtures. `page` represents a browser tab. `expect` supplies Playwright's retrying assertions.

Use configuration for base URLs, browsers, timeouts, retries, reporters, and artifact policy rather than repeating those decisions inside tests.
