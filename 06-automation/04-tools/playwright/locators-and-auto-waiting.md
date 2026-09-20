# Playwright Locators and Auto-Waiting

Read the shared [locator strategy](../../03-shared-concepts/locators-and-selectors.md) and [synchronization principles](../../03-shared-concepts/waits-and-synchronization.md) first.

## Preferred locators

```typescript
page.getByRole('button', { name: 'Log in' });
page.getByLabel('Email');
page.getByPlaceholder('Search');
page.getByText('Order confirmed');
page.getByTestId('place-order');
```

Locator actions wait for relevant actionability conditions. Web-first assertions retry until their expectation passes or times out:

```typescript
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Saved successfully')).toBeVisible();
```

When a response is the real synchronization point, register the listener before the action:

```typescript
const responsePromise = page.waitForResponse(response =>
  response.url().endsWith('/api/orders') && response.status() === 201,
);
await page.getByRole('button', { name: 'Place order' }).click();
await responsePromise;
```

Avoid `waitForTimeout()` in normal tests. Do not use `networkidle` as a general readiness rule; wait for the state the user actually needs.
