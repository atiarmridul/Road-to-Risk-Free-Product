# Playwright দিয়ে UI অটোমেশন

## লক্ষ্য

Playwright suite এমন হতে হবে যাতে team বিশ্বাস করে: "fail মানে signal, noise না"।

---

## Framework Structure

```text
qa-engineering/ui-automation-playwright/
  tests/
  pages/
  components/
  fixtures/
  data/
  helpers/
  playwright.config.ts
```

---

## Selector Strategy

Priority order:
1. `getByTestId`
2. `getByRole`
3. `getByLabel`
4. CSS/XPath (শেষ বিকল্প)

Rule:
- brittle DOM selector এড়িয়ে চলুন
- `data-testid` naming convention রাখুন (`page-section-action`)

---

## Example: Stable E2E Flow

```javascript
import { test, expect } from '@playwright/test';

test('user can complete checkout', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-email').fill('qa@example.com');
  await page.getByTestId('login-password').fill('secret');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto('/cart');
  await page.getByTestId('checkout-button').click();

  await expect(page.getByTestId('order-success')).toBeVisible();
});
```

---

## Flaky কমানোর Playbook

- hard sleep (`waitForTimeout`) remove করুন
- network wait-এর বদলে UI state assertion দিন
- shared account বাদ দিয়ে per-test isolated user ব্যবহার করুন
- unstable third-party flow হলে mock/simulate strategy রাখুন

---

## Execution Model

- PR: 5-10 min critical smoke
- Main: broader cross-browser suite
- Nightly: full matrix + visual checks + retry analytics

---

## CI Guardrails

- flaky test quarantine tag (`@quarantine`) support
- retry limit: সর্বোচ্চ 1 (signal loss কমাতে)
- trace/video শুধু failure case-এর জন্য retain
- unstable test-এর জন্য auto-ticket তৈরি
