# Error Handling in Automation Code

Let assertion and browser-command failures propagate unless you can add useful context or must perform cleanup. Never catch an error and silently continue.

```typescript
try {
  await completePayment();
} catch (error) {
  await captureFailureEvidence();
  throw error;
}
```

## Useful practices

- Add context at system boundaries.
- Attach screenshots, traces, logs, or responses when they aid diagnosis.
- Use `finally` for required cleanup.
- Distinguish product failures from environment or test-code failures.
- Avoid retries that conceal a consistent defect.

```typescript
let accountId: string | undefined;

try {
  accountId = await createAccount();
  await verifyAccount(accountId);
} finally {
  if (accountId) await deleteAccount(accountId);
}
```
