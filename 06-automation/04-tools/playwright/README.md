# Playwright Learning Hub

Playwright provides browser automation and a test runner with built-in isolation, actionability checks, web-first assertions, tracing, and multi-browser projects.

## Prerequisites

- [JavaScript and TypeScript](../../02-programming/javascript-typescript/README.md)
- [Shared automation concepts](../../03-shared-concepts/README.md)

## Learning order

| Step | Note | Outcome |
| ---: | --- | --- |
| 1 | [Setup and first test](setup-and-first-test.md) | Create a project and understand its files |
| 2 | [Locators and auto-waiting](locators-and-auto-waiting.md) | Interact with elements without fixed sleeps |
| 3 | [Contexts, pages, and tabs](contexts-pages-and-tabs.md) | Model isolated sessions and multi-page behavior |
| 4 | [Fixtures and framework design](fixtures-and-framework.md) | Reuse setup and product-facing behavior |
| 5 | [Network and API testing](network-and-api-testing.md) | Coordinate requests and prepare state efficiently |
| 6 | [Tracing and debugging](tracing-and-debugging.md) | Investigate failures and configure CI evidence |
| 7 | [Advanced features](advanced-features.md) | Explore projects, emulation, and visual comparison |
| Practice | [Playwright exercises](../../05-practice/playwright-exercises.md) | Apply the ideas in a small project |

[Self-healing tests](self-healing-tests.md) are optional and should be studied only after stable locator design and failure diagnosis.

## Completion checkpoint

Build one isolated workflow using semantic locators and web-first assertions. Run it in CI, preserve a trace on failure, and explain why each wait or abstraction is necessary.
