# Visual Regression Testing Learning Guide

Visual regression testing compares the current interface with an approved baseline image to find unintended appearance changes.

## Learning order

1. [Foundations](foundations.md) — pixels, perceptual differences, and tool choices.
2. [Tools and examples](tools-and-examples.md) — Playwright, BackstopJS, Chromatic, Percy, and Loki.
3. [Stability and CI](stability-and-ci.md) — reduce flaky screenshots and manage approval workflows.
4. [Decision guide](decision-guide.md) — when to use visual testing, pitfalls, and tool comparison.

A screenshot difference is evidence, not automatically a bug. A person must decide whether the change is expected and approve a new baseline only after review.
