# Playwright Fixtures and Framework Design

Fixtures prepare resources such as pages, authenticated sessions, API clients, or test data and clean them up after use.

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend<{ accountId: string }>({
  accountId: async ({ request }, use) => {
    const response = await request.post('/api/test-accounts');
    const { id } = await response.json();
    await use(id);
    await request.delete(`/api/test-accounts/${id}`);
  },
});
```

Use fixtures for lifecycle and dependency injection. Use page/component objects for meaningful interface behavior. See the shared [Page Object Model guidance](../../03-shared-concepts/page-object-model.md).

```typescript
class LoginPage {
  constructor(private readonly page: Page) {}

  async logIn(email: string, password: string): Promise<void> {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
```

Keep the expected business result visible in the test instead of hiding every assertion inside page objects.
