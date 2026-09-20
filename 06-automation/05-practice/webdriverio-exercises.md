# WebdriverIO Exercises

1. Create a project and open a test environment through its configured base URL.
2. Automate login using stable selectors and meaningful assertions.
3. Replace a fixed pause with `waitForDisplayed`, `waitForClickable`, or `waitUntil` and explain the selected condition.
4. Extract login behavior into a focused page object while keeping the outcome assertion in the test.
5. Configure two browser capabilities or one local and one cloud target.
6. Capture a screenshot through `afterTest` when a deliberate assertion fails.
7. Run two tests concurrently with isolated users and verify they do not interfere.

## Review checklist

- Can you explain what the runner, capability, service, hook, and reporter each control?
- Are selectors based on meaning rather than layout?
- Does every wait represent observable readiness?
- Can a CI failure be investigated from its saved evidence?
