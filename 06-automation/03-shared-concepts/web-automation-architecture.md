# Web Automation Architecture

## Terms that are easy to confuse

| Term | Meaning |
| --- | --- |
| WebDriver | A W3C browser-automation protocol used to send commands to browser drivers |
| Selenium WebDriver | A library and ecosystem that exposes WebDriver APIs in languages such as Java |
| WebdriverIO | A Node.js automation framework that can use WebDriver or WebDriver BiDi and integrate with Appium |
| Playwright | A browser-automation library and test runner with its own browser-control architecture |

A typical test has several responsibilities:

```text
test intent → runner/framework → automation API → browser → application
                    ↓
             reports and evidence
```

Failures can come from the product, test code, test data, environment, browser, or infrastructure. Good automation makes those sources distinguishable.

## Tool choice

Choose a tool based on the application, team language, browser/device needs, ecosystem, debugging support, and existing delivery platform. See the [tool-selection guide](../06-comparisons/tool-selection-guide.md).
