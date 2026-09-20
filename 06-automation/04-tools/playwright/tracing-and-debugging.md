# Playwright Tracing and Debugging

Use the shared [failure-evidence](../../03-shared-concepts/reporting-and-failure-evidence.md), [flakiness](../../03-shared-concepts/debugging-flaky-tests.md), and [CI](../../03-shared-concepts/ci-cd-execution.md) guidance for general principles.

## Useful commands

```bash
npx playwright test --headed
npx playwright test --debug
npx playwright test --trace on
npx playwright show-report
```

Recommended CI configuration:

```typescript
use: {
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
retries: process.env.CI ? 1 : 0,
```

Investigate the first failed attempt even if a retry passes. The Trace Viewer can show actions, DOM snapshots, network activity, console messages, and timing in one timeline.
