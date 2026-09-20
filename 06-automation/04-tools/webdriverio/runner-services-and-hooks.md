# WebdriverIO Runner, Services, and Hooks

The WDIO runner loads configuration, starts workers and sessions, runs framework tests, and invokes reporters and hooks.

Services integrate supporting behavior such as local browser drivers, cloud providers, or Appium. Add only services the project needs.

## Hooks

Common hooks include `before`, `beforeTest`, `afterTest`, and `after`. Use them for cross-cutting lifecycle behavior, not to hide important scenario steps.

```javascript
export const config = {
  async afterTest(test, context, result) {
    if (!result.passed) {
      await browser.saveScreenshot(`./artifacts/${test.title}.png`);
    }
  },
};
```

Tests should remain independent even when the runner executes them concurrently. See [test data and isolation](../../03-shared-concepts/test-data-and-isolation.md).
