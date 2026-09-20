# Self-Healing Playwright Tests

> **In simple words:** A self-healing test tries a controlled fallback when its preferred locator no longer works.
>
> **Important:** This is an optional, advanced technique. Silent recovery can hide a genuine UI regression, accessibility problem, or broken test contract.

Source: [Self-Healing Playwright Tests with TypeScript](https://app.notion.com/p/362995ff8e46814999c1ee9d37355f6d)

## Learn these topics first

Before considering fallback locators, understand:

1. [Semantic locators and Playwright auto-waiting](locators-and-auto-waiting.md)
2. Playwright automatic waiting
3. Trace Viewer and failure evidence
4. Stable test-data design
5. Page and component objects

Most flaky tests should be fixed through stable locators, deterministic data, isolated state, and meaningful assertions—not self-healing.

## Preferred locator order

Choose locators that describe the interface contract:

1. `getByRole()` with an accessible name
2. `getByLabel()` for form controls
3. `getByPlaceholder()` or visible text when appropriate
4. `getByTestId()` when the product supplies a deliberate testing contract
5. Short CSS selectors only when semantic options are unavailable

Avoid long CSS paths, `nth-child`, and XPath tied to layout.

```typescript
const loginButton = page.getByRole('button', { name: 'Log in' });
await expect(loginButton).toBeVisible();
await loginButton.click();
```

## When a fallback is acceptable

A fallback can be reasonable during a controlled migration—for example, when two deployed product versions use different but known test IDs.

It should satisfy all of these conditions:

- Every selector identifies the same business element.
- The fallback has an owner and removal date.
- Using it produces visible telemetry or a test annotation.
- The test still verifies the expected user outcome.
- Unexpected matches fail instead of being accepted silently.

## Safe fallback helper

The helper below requires each candidate to match exactly one visible element. It records when a non-primary candidate is used.

```typescript
import { expect, Locator, Page, TestInfo } from '@playwright/test';

type Candidate = {
  name: string;
  locate: (page: Page) => Locator;
};

export async function resolveKnownLocator(
  page: Page,
  testInfo: TestInfo,
  candidates: Candidate[],
): Promise<Locator> {
  for (const [index, candidate] of candidates.entries()) {
    const locator = candidate.locate(page);

    if ((await locator.count()) !== 1) continue;
    if (!(await locator.isVisible())) continue;

    if (index > 0) {
      testInfo.annotations.push({
        type: 'locator-fallback',
        description: `Used fallback: ${candidate.name}`,
      });
    }

    return locator;
  }

  throw new Error('No approved locator matched one visible element');
}
```

Usage:

```typescript
import { test, expect } from '@playwright/test';
import { resolveKnownLocator } from './resolve-known-locator';

test('user can log in during the selector migration', async ({ page }, testInfo) => {
  await page.goto('/login');

  const loginButton = await resolveKnownLocator(page, testInfo, [
    {
      name: 'accessible login button',
      locate: page => page.getByRole('button', { name: 'Log in' }),
    },
    {
      name: 'legacy login test ID',
      locate: page => page.getByTestId('login-btn'),
    },
  ]);

  await loginButton.click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Waiting correctly

Do not use a fixed sleep as a recovery mechanism:

```typescript
// Avoid
await page.waitForTimeout(5000);
```

Wait for the state that matters:

```typescript
await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Saved successfully')).toBeVisible();
```

Avoid using `networkidle` as a universal readiness signal. Applications with polling, analytics, streaming, or long-lived connections may never become network-idle. Prefer a user-visible state or a specific response that represents readiness.

## Retry policy

Retries can reveal intermittent behavior, but they do not repair the cause.

- Keep CI retries low and visible.
- Preserve the first failure trace.
- Measure first-run pass rate separately from pass-after-retry.
- Quarantine a flaky test only with an owner and repair deadline.
- Never put an unbounded retry loop around an assertion or click.

## Required failure evidence

When all approved candidates fail, retain:

- Playwright trace
- Screenshot when it adds context
- Console errors
- Relevant request and response details
- Browser, build, environment, and test-data identifiers
- The candidate names that were attempted

Useful commands:

```bash
npx playwright test --trace on
npx playwright test --debug
npx playwright show-report
```

## Decision checklist

Before adding a fallback, ask:

- Is the primary locator based on a stable user-facing contract?
- Is this actually a product defect or accessibility regression?
- Can the product expose one stable test ID instead?
- Could the fallback match the wrong element?
- Will the team notice that the fallback was used?
- Who will remove it, and by what date?

If those questions do not have clear answers, let the test fail and fix the underlying contract.

## Interview answer

> I first prevent locator failures with semantic locators, stable test IDs, isolated data, and Playwright's automatic waiting. During a controlled selector migration, I may allow a small list of approved fallbacks, but fallback use must be logged and reviewed. I still assert the final business outcome, and unexpected matches fail. Self-healing must never silently convert a real product regression into a passing test.

Last synchronized and reviewed: 2026-09-20.
