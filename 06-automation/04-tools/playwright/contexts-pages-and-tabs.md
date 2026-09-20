# Playwright Contexts, Pages, and Tabs

A browser context is an isolated session with its own cookies, storage, and permissions. A page is a tab inside that context.

```typescript
const buyer = await browser.newContext();
const seller = await browser.newContext();
const buyerPage = await buyer.newPage();
const sellerPage = await seller.newPage();
```

Contexts are useful for multi-user workflows and test isolation without launching a full browser process for every user.

## New pages

Register the page event before the action that opens it:

```typescript
const pagePromise = context.waitForEvent('page');
await page.getByRole('link', { name: 'Open receipt' }).click();
const receiptPage = await pagePromise;
await receiptPage.waitForLoadState('domcontentloaded');
```

Close manually created contexts during cleanup. The default `page` fixture is automatically isolated and cleaned up by Playwright Test.
