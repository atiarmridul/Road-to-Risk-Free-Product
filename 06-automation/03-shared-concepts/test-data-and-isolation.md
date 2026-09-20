# Test Data and Isolation

A reliable test controls the state it depends on and does not corrupt another test's state.

## Practical rules

- Create data through an API, fixture, or factory when possible.
- Give parallel tests unique users, orders, or namespaces.
- Do not depend on execution order.
- Clean up only data owned by the test.
- Keep secrets outside source control.
- Make environment assumptions explicit.

```typescript
const email = `student+${crypto.randomUUID()}@example.test`;
```

Shared accounts are convenient but often create collisions, rate limits, and order-dependent failures. If shared data is unavoidable, make tests read-only or serialize only that isolated group.

## Checkpoint

Run the same test twice concurrently. If one run changes the other's outcome, the test is not isolated.
