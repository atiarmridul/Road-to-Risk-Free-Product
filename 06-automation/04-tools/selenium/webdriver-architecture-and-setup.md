# Selenium WebDriver Architecture and Setup

Read [Web automation architecture](../../03-shared-concepts/web-automation-architecture.md) for the cross-tool terminology.

```text
Java test → Selenium client → WebDriver command → browser driver/browser
```

`WebDriver` is an interface; `ChromeDriver` and `FirefoxDriver` are implementations:

```java
WebDriver driver = new ChromeDriver();

try {
    driver.get("https://example.test");
} finally {
    driver.quit();
}
```

Programming to the interface reduces coupling and makes driver selection easier. It does not by itself guarantee that a test is portable—browser behavior and configuration still require validation.

Modern Selenium can manage compatible local drivers through Selenium Manager. Projects should still pin and record important runtime versions in CI for reproducibility.

Use `close()` to close the current window and `quit()` to end the whole WebDriver session. Test cleanup normally requires `quit()`.
