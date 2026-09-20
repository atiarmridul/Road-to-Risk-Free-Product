# WebdriverIO Setup and First Test

## Create a project

```bash
npm init wdio@latest
npx wdio run ./wdio.conf.js
```

The setup wizard can configure a runner, framework such as Mocha or Cucumber, browser capabilities, reporters, and optional services.

```javascript
describe('login', () => {
  it('opens the dashboard for a valid user', async () => {
    await browser.url('/login');
    await $('#email').setValue('student@example.com');
    await $('#password').setValue('correct-password');
    await $('button=Log in').click();
    await expect($('h1=Dashboard')).toBeDisplayed();
  });
});
```

Browser and element commands are asynchronous. Learn the language model in [Promises and asynchronous control](../../02-programming/javascript-typescript/async-await-and-promises.md) rather than memorizing `await` as a WebdriverIO-only rule.
