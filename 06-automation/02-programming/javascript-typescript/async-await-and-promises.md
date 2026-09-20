# Promises and Asynchronous Control

A Promise represents an operation that may finish later. It can be pending, fulfilled, or rejected. Browser commands return Promises because communication with a browser takes time.

## `async` and `await`

An `async` function returns a Promise. `await` pauses that function until the Promise settles; it does not block the whole JavaScript runtime.

```typescript
async function loadProfile(): Promise<Profile> {
  const response = await fetch('/api/profile');
  return response.json();
}
```

Missing `await` can cause races, misleading assertions, or unhandled rejections.

## Sequential versus concurrent work

Use sequential `await` when one operation depends on another:

```typescript
await openLoginPage();
await submitCredentials();
await verifyDashboard();
```

Use `Promise.all()` only for independent operations or for an event listener and its trigger:

```typescript
const [download] = await Promise.all([
  waitForDownload(),
  clickDownload(),
]);
```

Parallel test execution is different from asynchronous commands inside one test. Parallel tests must have isolated data and state.
