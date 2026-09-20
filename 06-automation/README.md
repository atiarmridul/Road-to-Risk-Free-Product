# Automation Engineering Learning Hub

This section separates durable automation principles from programming languages and tool-specific APIs. Learn a concept once, then apply it through Playwright, WebdriverIO, or Selenium.

## Repository map

| Area | Purpose |
| --- | --- |
| [01 — Foundations](01-foundations/) | Strategy, learning roadmap, automation selection, and test layers |
| [02 — Programming](02-programming/) | JavaScript/TypeScript, Java, and Git skills |
| [03 — Shared concepts](03-shared-concepts/README.md) | Locators, waits, assertions, data, design, reporting, debugging, visual tests, and CI |
| [04 — Tools](04-tools/) | Playwright, WebdriverIO, and Selenium implementation guides |
| [05 — Practice](05-practice/) | A shared project and tool-specific exercises |
| [06 — Comparisons](06-comparisons/tool-selection-guide.md) | Evidence-based tool selection and feature comparison |
| [07 — Reference](07-reference/) | Interview review and source-document notes |

## Recommended path

1. Read [what to automate](01-foundations/what-to-automate.md) and the [automation strategy](01-foundations/automation-strategy.md).
2. Understand [automation layers](01-foundations/automation-pyramid.md).
3. Learn the relevant language: [JavaScript/TypeScript](02-programming/javascript-typescript/README.md) or [Java](02-programming/java/README.md).
4. Study the [shared concepts](03-shared-concepts/README.md).
5. Select one tool: [Playwright](04-tools/playwright/README.md), [WebdriverIO](04-tools/webdriverio/README.md), or [Selenium with TestNG](04-tools/selenium/README.md).
6. Complete the [shared practice project](05-practice/shared-practice-project.md).
7. Use the [tool comparison](06-comparisons/playwright-vs-webdriverio-vs-selenium.md) only after gaining practical experience with at least one tool.

Do not learn all three tools simultaneously. Build and debug a maintainable project with one tool first; the shared concepts will then make another tool easier to learn.

## Content ownership rule

- Shared pages explain **why**, risks, and trade-offs.
- Language pages explain programming behavior.
- Tool pages explain exact APIs, configuration, and tool-specific behavior.
- Practice pages contain exercises rather than repeated theory.
- Reference pages support revision and source traceability.

When adding material, link to its canonical explanation instead of copying it into several tool folders.

## Completion checkpoint

You can justify what to automate, assign checks to useful layers, implement one stable suite, run it in CI, diagnose a deliberate failure from saved evidence, and explain the maintenance trade-offs.
