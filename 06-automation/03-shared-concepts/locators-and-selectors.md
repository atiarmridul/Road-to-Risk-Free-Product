# Locators and Selectors

A locator identifies an element through a stable, meaningful contract. Prefer information users or accessibility tools perceive over incidental DOM structure.

## Recommended order

1. Accessible role and name
2. Associated label, placeholder, or visible text when unambiguous
3. Stable product-specific identifier such as `data-testid`
4. Concise CSS selector
5. XPath only when it expresses a relationship more clearly than the alternatives

Avoid absolute XPath, long CSS chains, generated classes, and position-based selectors such as `nth-child` unless position is the behavior under test.

## Testability contract

When the interface lacks a stable user-facing locator, agree on a dedicated attribute:

```html
<button data-testid="place-order">Place order</button>
```

This is a deliberate contract between product and test code. It should describe meaning, not styling.

## Tool implementations

- [Playwright locators](../04-tools/playwright/locators-and-auto-waiting.md)
- [WebdriverIO selectors](../04-tools/webdriverio/selectors-waits-and-assertions.md)
- [Selenium locators](../04-tools/selenium/locators-and-waits.md)
