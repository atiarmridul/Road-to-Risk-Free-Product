# Unit Testing Learning Guide

Unit testing checks one small unit of behavior—usually a function, method, or class—in isolation from slow or unpredictable dependencies.

## Recommended learning order

1. [Foundations](foundations.md) — purpose, FIRST principles, and the testing pyramid.
2. [PHPUnit guide](phpunit-guide.md) — setup, assertions, data providers, lifecycle, and examples.
3. [Jest guide](jest-guide.md) — matchers, lifecycle, asynchronous tests, and examples.
4. [Advanced unit testing](advanced-unit-testing.md) — patterns, edge cases, coverage, mutation, property-based testing, and testable design.
5. [Best practices and review](best-practices-and-review.md) — practical rules, common mistakes, and revision.

## Beginner mental model

Think of a unit test as checking one calculator button at a time. If the `+` button is wrong, the test should identify that behavior without needing the whole calculator application.

Use the **Arrange–Act–Assert** pattern:

1. **Arrange:** prepare inputs and dependencies.
2. **Act:** call the behavior being tested.
3. **Assert:** check the observable result.

Good unit tests are fast, independent, repeatable, self-checking, and written close to the production code.
