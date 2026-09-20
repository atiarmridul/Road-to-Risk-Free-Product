# Selenium Frames, Windows, and Sessions

## Frames

Selenium must switch into an iframe before locating its contents, then return to the main document:

```java
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("payment-frame")));
driver.findElement(By.id("card-number")).sendKeys("4111111111111111");
driver.switchTo().defaultContent();
```

## Windows and tabs

Capture the original handle, trigger the new window, wait until the handle count changes, and switch deliberately. Do not assume handle ordering without validating it.

```java
String original = driver.getWindowHandle();
driver.findElement(By.linkText("Open receipt")).click();
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(original)) driver.switchTo().window(handle);
}
```

## Session lifecycle

- `close()` closes the current window.
- `quit()` closes every associated window and ends the driver session.
- Create and dispose drivers predictably through TestNG lifecycle methods or a dedicated driver fixture.
