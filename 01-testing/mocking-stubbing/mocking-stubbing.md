# Mocking and Stubbing Learning Guide

Test doubles replace a dependency during a test so you can control inputs, observe interactions, or avoid slow external systems.

## Recommended learning order

1. [Foundations](foundations.md) — taxonomy and verification styles
2. [Test-double types](test-double-types.md) — dummy, stub, spy, mock, and fake
3. [Framework tools](framework-tools.md) — PHPUnit, Mockery, Jest, and Laravel helpers
4. [Advanced techniques](advanced-techniques.md) — HTTP, database, time, partial, and static mocking
5. [Boundaries and contracts](boundaries-and-contracts.md) — files, over-mocking risks, and contract tests
6. [Best practices](best-practices-and-review.md) — clean design and common mistakes

## Beginner mental model

A test double is like a practice partner: it behaves predictably so you can focus on one skill, but it is not always a perfect replacement for the real teammate.
