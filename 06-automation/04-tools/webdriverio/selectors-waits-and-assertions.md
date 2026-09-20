# WebdriverIO Selectors, Waits, and Assertions

Read the shared [locator](../../03-shared-concepts/locators-and-selectors.md), [synchronization](../../03-shared-concepts/waits-and-synchronization.md), and [assertion](../../03-shared-concepts/assertions.md) principles first.

## Selectors

```javascript
await $('aria/Log in');
await $('[data-testid="place-order"]');
await $('button=Save');
await $('//label[normalize-space()="Email"]/following::input[1]');
```

Prefer accessibility and stable attribute selectors. Use XPath only when its relationship syntax provides real value.

## Wait commands

```javascript
const submit = await $('[data-testid="submit"]');
await submit.waitForClickable({ timeout: 10_000 });
await submit.click();

await browser.waitUntil(
  async () => (await $('#status').getText()) === 'Completed',
  { timeout: 15_000, timeoutMsg: 'Order did not complete' },
);
```

Avoid `browser.pause()` in normal tests. Wait for a meaningful condition.

## Assertions

```javascript
await expect($('#status')).toHaveText('Completed');
await expect(browser).toHaveUrlContaining('/dashboard');
await expect($('#login')).toBeDisplayed();
```

Assertions should prove outcomes, not merely that commands completed.
