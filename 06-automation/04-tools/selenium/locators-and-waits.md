# Selenium Locators and Explicit Waits

Read the shared [locator](../../03-shared-concepts/locators-and-selectors.md) and [synchronization](../../03-shared-concepts/waits-and-synchronization.md) guidance first.

## Locators

```java
By email = By.id("email");
By submit = By.cssSelector("[data-testid='login']");
By confirmation = By.xpath("//h1[normalize-space()='Dashboard']");
```

Prefer stable IDs, names, and explicit test attributes. Use XPath when relationship navigation adds clarity, not as the default.

## Explicit conditions

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("submit"))
);
button.click();

wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.cssSelector("[data-testid='success']")
));
```

Implicit waits configure element lookup globally. Mixing large implicit waits with explicit waits can create confusing timing, so prefer explicit waits for meaningful conditions. Avoid `Thread.sleep()` in normal test logic.
