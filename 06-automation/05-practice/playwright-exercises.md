# Playwright Exercises

> Complete these exercises in order. Each one should be a small working test, not a copied code fragment.

## Exercise 1: Page and assertion

```typescript
import { test, expect } from '@playwright/test';

test('home page has the expected heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
```

Explain why the assertion is more valuable than merely checking that navigation did not throw an error.

## Exercise 2: Form validation

Test a form with:

- One valid submission
- Empty required fields
- Invalid format
- Minimum and maximum boundaries
- A server-side rejection

Use labels and roles instead of DOM-position selectors.

## Exercise 3: Multiple users

Create two browser contexts and model a customer and an administrator. Verify that their cookies and permissions remain isolated.

```typescript
const customerContext = await browser.newContext();
const adminContext = await browser.newContext();

const customerPage = await customerContext.newPage();
const adminPage = await adminContext.newPage();
```

Close contexts in cleanup when you create them manually.

## Exercise 4: Download

Using the event-and-trigger pattern from [Promises and asynchronous control](../02-programming/javascript-typescript/async-await-and-promises.md#sequential-versus-concurrent-work), download a report and verify its suggested filename. Explain why the event listener is created before the click.

## Exercise 5: API setup and UI verification

Create prerequisite data through the `request` fixture, open the relevant UI page, and verify that a user can see the result. Delete the data afterward if the environment does not clean it automatically.

Do not create data through the API if the purpose of the test is to prove that the corresponding UI creation flow works.

## Exercise 6: Debug a deliberate failure

1. Change an expected heading so the test fails.
2. Run with tracing enabled.
3. Inspect the action timeline, DOM snapshot, console, and network entries.
4. Write down whether the failure belongs to the product, test, data, environment, or timing.
5. Repair the assertion and rerun without adding a fixed sleep.

```bash
npx playwright test --trace on
npx playwright show-report
```

## Exercise 7: Small framework

Create this structure only after two or more tests reveal genuine repetition:

```text
playwright-project/
├── tests/
├── pages/
├── components/
├── fixtures/
├── data/
├── playwright.config.ts
└── package.json
```

Keep assertions in tests when they express the scenario’s expected outcome. Put reusable interaction behavior in a page or component object. Avoid a large `BasePage` that hides unrelated actions.

## Review checklist

- [ ] Tests use semantic locators or an explicit test-ID contract.
- [ ] Every scenario contains a meaningful business assertion.
- [ ] No fixed sleep is used for synchronization.
- [ ] Tests can run independently and in any order.
- [ ] Data and login state do not leak between tests.
- [ ] Failures retain useful evidence.
- [ ] Retries do not hide first-run instability.
- [ ] CI runs the fastest valuable checks first.

## Official resources

- [Installation](https://playwright.dev/docs/intro)
- [Writing tests](https://playwright.dev/docs/writing-tests)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Fixtures](https://playwright.dev/docs/test-fixtures)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [Continuous integration](https://playwright.dev/docs/ci)

## Related repository notes

- [Playwright learning hub](../04-tools/playwright/README.md)
- [Fixtures and framework design](../04-tools/playwright/fixtures-and-framework.md)
- [JavaScript and TypeScript](../02-programming/javascript-typescript/README.md)
- [Self-healing risks](../04-tools/playwright/self-healing-tests.md)

Reviewed and reorganized: 2026-09-20.
