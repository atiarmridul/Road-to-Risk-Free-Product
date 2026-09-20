# Study Guide

This guide turns the repository into practical learning paths. Choose one path, work through it in order, and use the checkpoints to decide when to move on. You do not need to read the whole repository.

## Pick a path

| Goal | Suggested duration | Path |
| --- | ---: | --- |
| Build QA foundations | 4–6 weeks | Foundations → manual testing → API → database → test strategy |
| Move into automation | 6–10 weeks | Foundations → programming → UI automation → framework design → CI |
| Prepare for an interview | 7 days | Personal pitch → core QA → API/database → automation → senior scenarios |
| Grow toward senior QA | 6–8 weeks | Risk → strategy → delivery → observability → leadership communication |

Durations are guides, not deadlines. Move forward when you can demonstrate the checkpoint, not merely when you finish reading.

## Path 1: QA foundations

1. [Software development life cycle](../04-study-topics/foundations/software-development-life-cycle.md)
2. [Testing foundations](../01-testing/testing-foundations.md)
3. [Manual testing knowledge](../04-study-topics/manual-testing/manual-testing-knowledge.md)
4. [Test-case design techniques](../04-study-topics/test-design/test-case-design-techniques.md)
5. [Bug reporting and defect lifecycle](../04-study-topics/defect-management/bug-reporting-and-defect-lifecycle.md)
6. [API basics](../04-study-topics/api-testing/fundamentals/api-basics.md)
7. [Database overview](../04-study-topics/database/fundamentals/database-overview.md)

**Checkpoint:** Given a login or checkout feature, explain its risks, design positive and negative tests, report one sample defect, and identify useful API and database checks.

## Path 2: Test automation

Start after you can design a useful manual test and explain why it should or should not be automated.

1. [Test automation strategy](../06-automation/01-foundations/automation-strategy.md)
2. Choose a programming route: [Java OOP](../06-automation/02-programming/java/README.md) or [JavaScript and TypeScript](../06-automation/02-programming/javascript-typescript/README.md)
3. Choose one UI tool: [Playwright](../06-automation/04-tools/playwright/README.md), [Selenium](../06-automation/04-tools/selenium/README.md), or [WebdriverIO](../06-automation/04-tools/webdriverio/README.md)
4. [API automation and validation](../04-study-topics/api-testing/automation-and-validation.md)
5. [CI/CD quality strategy](../02-qa-engineering/ci-cd-quality-strategy/ci-cd-quality-strategy.md)

Do not study all UI tools at once. Learn one deeply enough to build, debug, and explain a small maintainable suite; compare other tools afterward.

**Checkpoint:** Automate one stable user journey, keep test data isolated, produce a readable report, and explain failure diagnosis, maintenance cost, and CI execution.

## Path 3: Interview preparation

Use the [Interview Preparation Hub](../03-interview/README.md) for the complete seven-day plan.

**Checkpoint:** Answer a technical question in two minutes and a scenario question in three minutes. Each answer should include a concrete example, a trade-off, and an honest result.

## Path 4: Senior QA growth

1. [Risk-based testing](../04-study-topics/test-design/risk-based-testing-prioritization.md)
2. [Test strategy and planning](../02-qa-engineering/test-strategy-planning/test-strategy-planning.md)
3. [Quality gates and release readiness](../02-qa-engineering/quality-gate-release-readiness/quality-gate-release-readiness.md)
4. [Test data and environment management](../02-qa-engineering/test-data-environment-management/test-data-environment-management.md)
5. [Production observability](../02-qa-engineering/production-observability/production-observability.md)
6. [Defect management and quality metrics](../02-qa-engineering/defect-management-quality-metrics/defect-management-quality-metrics.md)

**Checkpoint:** For a sample release, create a risk list, propose a layered test strategy, define evidence-based release criteria, and explain how production signals will improve the next cycle.

## A repeatable study session

A focused 45-minute session can use this structure:

- **5 minutes — Recall:** Write what you already know without opening the note.
- **20 minutes — Learn:** Read one section and capture only the key decisions or distinctions.
- **15 minutes — Apply:** Produce an example, test design, command, or spoken answer.
- **5 minutes — Review:** Note one clear idea, one weak area, and the next action.

## How to know you understand a topic

You are ready to move on when you can:

- explain the topic without copying its definition;
- give a realistic example and counterexample;
- state what risk it addresses and what it does not cover;
- compare it with a nearby concept;
- apply it to an unfamiliar feature;
- identify at least one trade-off or failure mode.

If you cannot do these yet, revisit the example and practical sections before reading more advanced material.

## Key distinctions to learn early

| Often confused | Useful distinction |
| --- | --- |
| QA vs. testing | QA improves the process and system of quality; testing evaluates a product and its risks. |
| Verification vs. validation | Verification asks whether the product was built according to its specification; validation asks whether it solves the user's need. |
| Test scenario vs. test case | A scenario describes what to evaluate; a test case records specific conditions, steps, data, and expected results. |
| Severity vs. priority | Severity describes impact; priority describes how urgently the team should act. |
| Regression vs. retesting | Retesting checks a specific fix; regression testing looks for unintended effects elsewhere. |
| Smoke vs. sanity testing | Smoke testing checks broad build stability; sanity testing narrowly checks a change or area. |
| Load vs. stress testing | Load testing evaluates expected demand; stress testing explores behavior beyond normal capacity. |
