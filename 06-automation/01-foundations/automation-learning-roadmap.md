# QA Automation Learning Roadmap

> Use this roadmap after reading the [automation strategy](automation-strategy.md).

> **সহজভাবে / In simple words:** This roadmap arranges automation skills from basic JavaScript to maintainable frameworks and CI/CD.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Learning tools in the right order prevents memorizing commands without understanding how reliable automation works.

## Phase 1: Programming foundations

Learn variables, data types, functions, arrays, objects, modules, error handling, promises, and `async`/`await`.

**Checkpoint:** Write a small asynchronous program, explain what its promise represents, and handle a failure without hiding it.

## Phase 2: Browser interaction

Learn:

- Semantic locators such as role, label, placeholder, and visible text
- Stable test identifiers
- CSS and XPath only when semantic choices are insufficient
- Condition-based waits instead of fixed delays
- Browser sessions, tabs, cookies, and storage

**Checkpoint:** Automate login without a hard-coded sleep and explain why each locator is stable.

## Phase 3: Assertions and test design

Learn to verify visible behavior, URLs, state, API responses, and business outcomes. A script that only clicks and types is not a complete test.

**Checkpoint:** Design positive, negative, boundary, and permission checks for one user journey.

## Phase 4: Framework structure

Separate responsibilities:

```text
project/
├── tests/          # test intent and assertions
├── pages/          # page-level interactions
├── components/     # reusable UI components
├── fixtures/       # setup and dependencies
├── data/           # controlled test data
├── helpers/        # narrow reusable utilities
└── config/         # environment and runner settings
```

Use page or component objects when they reduce duplication. Do not hide every action behind unnecessary abstraction.

## Phase 5: Choose a framework track

### Playwright

Focus on browser contexts, auto-waiting, semantic locators, fixtures, trace viewer, device emulation, parallel execution, API testing, and visual comparison.

### WebdriverIO

Focus on WebDriver sessions, capabilities, explicit waits, runner configuration, services, reporters, Selenium integration, and Appium integration.

The goal is not to declare one tool universally better. Choose based on product platforms, team skills, ecosystem needs, debugging quality, and maintenance cost.

## Phase 6: Reporting and debugging

Collect useful failure evidence:

- Assertion message
- Relevant logs
- Screenshot or video when appropriate
- Network request and response details
- Playwright trace or equivalent runner evidence
- Environment, build, browser, and test-data identifiers

**Checkpoint:** Another engineer should understand the likely failure layer without rerunning the test first.

## Phase 7: CI/CD and scale

- Run fast critical checks on pull requests.
- Run broader browser coverage after deployment or on a schedule.
- Parallelize independent tests only after isolating data and state.
- Quarantine flaky tests with ownership and a repair deadline.
- Track first-run pass rate, execution time, and diagnosis time.

## Phase 8: Interview preparation

Be ready to explain:

- Why a test should or should not be automated
- `async`/`await` and promises
- Locator and wait strategy
- Page objects and fixtures
- Hard versus soft assertions
- Flaky-test diagnosis
- Parallel execution and data isolation
- Playwright, WebdriverIO, and Selenium trade-offs
- CI/CD placement and reporting

## Sources

- [Unified QA Automation Roadmap](https://app.notion.com/p/35c995ff8e4681f08637c07b760f8d18)
- [Playwright Learning Roadmap](https://app.notion.com/p/35b995ff8e4681f0905df1abf95a2fc9)
- [WebdriverIO Fundamentals](https://app.notion.com/p/25b84e2c20fd4fe6b6371a2a5ea66b6d)

Last synchronized: 2026-09-19

---

## Unified Qa Automation Roadmap: complete Notion material

> Notion deep dive: https://app.notion.com/p/35c995ff8e4681f08637c07b760f8d18
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

### 🚀 Unified QA Automation Roadmap (Playwright + WebdriverIO)
#### 📘 Phase 1: JavaScript Fundamentals
- Variables & Data Types
- Functions
- Arrays & Objects
- ES6 Features
- Async/Await
- Promises
- Error Handling
---
### 🔍 Phase 2: Locators & Element Handling
- XPath
- CSS Selectors
- Semantic Locators
- data-testid
- Dynamic XPath
- Locator Best Practices
---
### ⏳ Phase 3: Wait Strategies
- Explicit Wait
- Auto Wait
- waitUntil()
- waitForSelector()
- waitForFunction()
- Avoid Hard Waits
---
### ✅ Phase 4: Assertions & Validation
- Text Validation
- URL Validation
- Visibility Checks
- Hard Assertion
- Soft Assertion
---
### 🧱 Phase 5: Page Object Model (POM)
- Framework Structure
- Reusable Components
- Page Separation
- Maintainability
Recommended Structure:
```plain text
project
 ┣ pages
 ┣ tests
 ┣ utils
 ┣ fixtures
 ┣ config
```
---
### 🌐 Phase 6: Browser & Session Handling
#### Playwright
- Browser Context
- Multiple Tabs
- Session Isolation
#### WebdriverIO
- WebDriver Sessions
- Capabilities
---
### 🎭 Phase 7: Playwright Track
- Auto Wait
- Trace Viewer
- Device Emulation
- Parallel Execution
- Debug Mode
---
### 🧪 Phase 8: WebdriverIO Track
- Selenium Integration
- Appium Integration
- waitUntil()
- Allure Reporting
- Plugin Ecosystem
---
### 📊 Phase 9: Reporting & Debugging
- HTML Reports
- Allure Reports
- Screenshots
- Video Recording
- Trace Reports
- Logs
---
### 📸 Phase 10: Visual & Mobile Testing
- Snapshot Testing
- UI Comparison
- Device Emulation
- Responsive Testing
- Real Device Testing
---
### 🔄 Phase 11: Advanced Topics
- Parallel Execution
- API Testing
- CI/CD Integration
- Retry Mechanism
- Hooks & Fixtures
- Test Data Management
---
### 🎤 Phase 12: Interview Preparation
#### Important Topics
- Async/Await
- Wait Strategies
- POM
- Assertions
- Flaky Tests
- Cross-browser Testing
#### Comparisons
- Selenium vs Playwright
- Playwright vs WebdriverIO
- Implicit vs Explicit Wait
- Hard vs Soft Assertion
---
### 🎯 Suggested Learning Order
1. JavaScript Basics
2. Async/Await
3. Locators
4. Wait Strategies
5. Assertions
6. POM
7. Playwright Basics
8. WebdriverIO Basics
9. Reporting
10. Advanced Topics
11. CI/CD
12. Interview Preparation
---
### 🏁 Final Goal
- Build scalable automation frameworks
- Handle flaky tests
- Create maintainable POM architecture
- Execute cross-browser tests
- Debug failures efficiently
- Become interview-ready for QA Automation roles

</details>
