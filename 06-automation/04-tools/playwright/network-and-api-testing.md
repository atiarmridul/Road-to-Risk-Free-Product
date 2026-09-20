# Playwright Network and API Testing

Playwright can observe browser requests, mock selected dependencies, and call APIs directly through `APIRequestContext`.

## Prepare state through an API

```typescript
test('user sees a prepared order', async ({ request, page }) => {
  const response = await request.post('/api/orders', {
    data: { productId: 'book-1', quantity: 1 },
  });
  expect(response.ok()).toBeTruthy();

  await page.goto('/orders');
  await expect(page.getByText('book-1')).toBeVisible();
});
```

## Route a controlled dependency

```typescript
await page.route('**/api/recommendations', route =>
  route.fulfill({ json: [{ id: 'book-2', title: 'Testing' }] }),
);
```

Mock the boundary you need to control, not the behavior you intend to prove. Keep a separate layer of integration or contract coverage for mocked dependencies.
