# Test Automation Strategy and Interview Guide

> **সহজভাবে / In simple words:** Test automation uses code and tools to repeat suitable checks consistently.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** The main challenge is choosing valuable tests and keeping the results trustworthy.


This note covers automation decisions and framework thinking. Detailed tool and language material lives in the dedicated notes:

- [Selenium and TestNG](../04-tools/selenium/README.md)
- [WebdriverIO](../04-tools/webdriverio/README.md)
- [Java OOP](../02-programming/java/README.md)
- [Git](../02-programming/git-for-qa.md)
- [API testing](../../04-study-topics/api-testing/README.md)
- [Database testing](../../04-study-topics/database/README.md)
- [CI/CD quality strategy](../../02-qa-engineering/ci-cd-quality-strategy/ci-cd-quality-strategy.md)

## What should be automated?

Use the dedicated [what-to-automate decision guide](what-to-automate.md) to evaluate candidates by risk, frequency, useful test layer, stability, and maintenance cost. The strategy should record those decisions instead of measuring success by automated test count.

## Automation test plan

1. Define objectives and measurable success criteria.
2. Select scope using risk and return on investment.
3. Choose the lowest practical test layer using the [automation-layers guide](automation-pyramid.md).
4. Define supported platforms, environments, and test data.
5. Design framework boundaries, reporting, logging, and failure evidence.
6. Integrate fast deterministic suites into CI/CD.
7. Establish ownership, review standards, and flaky-test policy.
8. Measure execution time, stability, defect detection, and maintenance effort.

## Framework design principles

- Separate test intent from tool-specific interaction code.
- Prefer API or component coverage when UI validation is unnecessary.
- Use reusable domain actions instead of long procedural scripts.
- Keep assertions close to the behavior they verify.
- Create isolated test data and clean it safely.
- Make failures diagnosable with logs, requests, screenshots, traces, and relevant state.
- Use tags for smoke, regression, risk, component, and execution environment.
- Avoid arbitrary sleeps; wait for observable application conditions.

## Page objects and alternatives

A page object encapsulates selectors and page-level behavior. It reduces duplication but becomes harmful when it grows into a large class containing test assertions, data setup, and unrelated workflows.

Depending on the product, use:

- Page objects for page-level interactions
- Component objects for reusable widgets
- Screenplay or task objects for cross-page business actions
- API clients and fixtures for setup and cleanup

## Flaky-test diagnosis

Classify failures before applying a fix:

| Cause | Examples | Better response |
| --- | --- | --- |
| Synchronization | Race condition, animation, delayed event | Wait for a meaningful state |
| Test data | Shared user, stale record, collision | Isolate and generate data |
| Environment | Unavailable dependency, configuration drift | Add health checks and ownership |
| Selector | Dynamic or ambiguous locator | Use stable user-facing attributes |
| Product defect | Timing or concurrency bug | Report and fix the product |
| Test design | Order dependence, hidden state | Make tests independent |

Retries can collect evidence or reduce temporary disruption, but they must not convert an unexplained failure into a passing quality signal.

## CI/CD execution model

- Pull request: static checks, unit, component, and targeted API tests
- Build or integration stage: contract, database, service-integration, and broader API tests
- Test environment: critical UI smoke and targeted regression
- Scheduled runs: full browser/device matrix and expensive non-functional checks
- Production: safe synthetic smoke and canary monitoring

## Useful automation metrics

- Duration and feedback time
- First-run pass rate
- Flaky-test rate
- Failure diagnosis time
- Maintenance effort
- Critical-flow coverage
- Defects detected before release
- Escaped defects in supposedly covered areas

Do not use automated test count as a success metric by itself.

## Interview questions

### Why automate testing?

Automation provides repeatable, fast feedback for suitable risks. It supports frequent releases and broader deterministic coverage, but it complements rather than replaces exploratory testing and human judgment.

### When would you start automation?

I start once a valuable behavior is sufficiently understood and there is a stable layer where it can be tested. I do not wait for the entire product to stabilize; I begin with stable APIs, components, and critical smoke paths while keeping volatile UI areas manual.

### How do you select a tool?

I compare product platform, team skills, supported browsers or devices, ecosystem maturity, debugging quality, CI compatibility, execution performance, and long-term maintenance. A proof of concept on representative risks is more useful than selecting from popularity alone.

### A suite is too slow. What do you do?

I measure the slowest tests and setup steps, remove duplication, shift coverage below the UI, reuse safe build artifacts, improve data setup, and parallelize independent tests. I separate merge-blocking feedback from scheduled suites while keeping critical risk protected.

### How do you estimate automation return on investment?

I compare implementation and maintenance cost with expected manual execution effort, execution frequency, risk reduction, and feedback-time improvement. I revisit the estimate using actual maintenance and defect-detection data.

### How do you maintain quality in the automation code?

The test code follows normal engineering practices: review, naming standards, modular design, version control, static checks, reliable fixtures, meaningful assertions, and refactoring. Failures must be actionable, not merely visible.

## Notion source

- [Original detailed Notion page](https://app.notion.com/p/102995ff8e4680c4a954ce427d6373e3)

Last synchronized: 2026-09-19.
