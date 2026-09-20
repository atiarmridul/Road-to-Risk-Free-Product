# WebdriverIO Framework Design and Reporting

Read the shared [Page Object Model](../../03-shared-concepts/page-object-model.md) and [failure-evidence](../../03-shared-concepts/reporting-and-failure-evidence.md) notes first.

## Page object example

```javascript
class LoginPage {
  get email() { return $('#email'); }
  get password() { return $('#password'); }
  get submit() { return $('button=Log in'); }

  async open() {
    await browser.url('/login');
  }

  async logIn(email, password) {
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.submit.click();
  }
}

export default new LoginPage();
```

Keep the expected business result in the test. Avoid generic wrapper methods that merely rename WebdriverIO commands.

## Reporting

WebdriverIO supports built-in and plugin reporters such as spec, JUnit, Allure, and HTML-oriented reporters. Select one that fits local debugging and CI publishing needs.

Useful failure evidence includes screenshots, command logs, browser console output, environment identity, and relevant network information. Capture artifacts in hooks and preserve them even when CI fails.

For visual testing, stabilize the browser, viewport, fonts, animations, and data before accepting baselines. Follow the shared [visual-testing guidance](../../03-shared-concepts/visual-testing.md).
