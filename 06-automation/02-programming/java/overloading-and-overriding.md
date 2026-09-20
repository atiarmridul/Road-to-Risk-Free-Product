# Method Overloading and Overriding

> A focused Java reference for two commonly confused OOP mechanisms.

## **Mastering the concept of Function Overloading & Overriding**

⭐ Function Overloading: allows multiple methods to share the same name within a class, as long as they differ in their parameter lists.

This means methods can have the same name but varying numbers, types, or orders of parameters

Where do we use it as a QA Automation Engineer? ❓ ❓

Testing API Endpoints: Imagine testing an API endpoint that accepts both integer and string IDs for resource retrieval. Overloaded functions within your test framework can handle both scenarios, improving test coverage and maintainability

Data-Driven Testing: When working with data-driven tests, overloading functions based on data type (e.g., string, integer, float) allows you to write generic test logic applicable to various data sets

🌟 Example code:

```java
// Overloaded method to perform actions with optional waiting
public void clickElement(By locator) {

findElement(locator).click();

}

public void clickElement(By locator, int waitTimeInSeconds) {

WebDriverWait wait = new WebDriverWait(driver, waitTimeInSeconds);

wait.until(ExpectedConditions.elementToBeClickable(locator)).click();

}
```

[Java Bangla Tutorials 117 : Method Overloading (youtube.com)](https://www.youtube.com/watch?v=DwaUODamu2g&t=58s)

```java
// Overloaded method to handle different input types
public void fillTextField(By locator, String text) {

findElement(locator).sendKeys(text);

}

public void fillTextField(By locator, int number) {

findElement(locator).sendKeys(String.valueOf(number));

}
```

Why to use function overloading for above example? ❓❓

ClickElement function allows for optional waiting, improving adaptability to dynamic elements

fillTextField function ensures correct input for different field types, enhancing test robustness

Descriptive method names and parameter types make code more intuitive and easier to understand

Overall Advantages for QA Automation Frameworks? ❓❓

- Improves framework readability
- Reduces code duplication
- Adapts to different scenarios and data types seamlessly
- Makes tests more robust and adaptable to dynamic elements
- Enhances the overall quality of test automation

20. Give me examples of oops which you used in your framework.

---
