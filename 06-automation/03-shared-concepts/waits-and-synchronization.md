# Waits and Synchronization

Synchronization aligns a test with an observable application state. The goal is not to wait for time to pass; it is to wait for meaningful readiness.

## Preferred order

1. Use the tool's built-in actionability and retry behavior.
2. Assert the user-visible or business state needed by the next step.
3. Wait for a specific request, event, or condition when it is the true synchronization point.
4. Use fixed sleeps only during investigation, never as normal test logic.

```text
Bad:    click → sleep 5 seconds → continue
Better: click → wait until confirmation is visible → continue
```

Hard waits are slow when the application is fast and unreliable when it is slower than expected. A condition-based wait can finish as soon as the relevant state exists.

## Important tool difference

Playwright automatically waits for actionability and retries web-first assertions. WebdriverIO and Selenium expose different wait mechanisms. Do not copy Selenium's implicit-wait model into a Playwright design.

See the tool-specific locator and waiting notes for correct APIs.
