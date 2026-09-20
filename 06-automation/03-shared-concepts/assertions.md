# Assertions

An action exercises the system; an assertion evaluates evidence. Without meaningful assertions, a script may complete without proving the expected behavior.

## Good assertions

- Observe outcomes rather than implementation details.
- State the business expectation clearly.
- Provide useful failure output.
- Avoid checking unrelated behavior in one test.
- Use retrying assertions for eventually consistent UI states when supported.

```text
Weak:   the click command did not throw
Strong: the order confirmation shows the expected order number
```

## Hard and soft assertions

A hard assertion stops the current test when it fails. A soft assertion records a failure and continues, allowing related evidence to be collected. Use soft assertions sparingly: continuing after a broken precondition can create misleading failures.

Tool matcher syntax belongs in the Playwright, WebdriverIO, and Selenium guides.
