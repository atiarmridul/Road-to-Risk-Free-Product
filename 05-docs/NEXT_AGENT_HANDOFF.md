# Repository Reorganization Handoff

Updated: 2026-09-20

> Continuation update: the work described below as the “next planned work” has now been completed. The five oversized testing guides, the interview notes, the complete API guide, manual testing, visual regression, and mutation testing were split into focused lessons with hub pages. The automation paths recorded below were subsequently replaced by the numbered structure under [`06-automation/`](../06-automation/README.md), with shared concepts separated from Playwright, WebdriverIO, and Selenium implementations. Treat the remaining text as a historical handoff record, not as current navigation or a task list.

## User's goal

Turn this repository into a complete, beginner-friendly QA knowledge base and interview-preparation resource. The user wants:

- Markdown files placed in the correct topic folders.
- Large root sections broken into useful subfolders.
- Duplicate and repetitive material consolidated without losing unique information.
- Notion archive and PDF information merged into the corresponding Markdown topics.
- Clear navigation, learning order, consistent formatting, and school-student-friendly explanations.
- The same cleanup already completed for Playwright to be applied to the other folders.

## Important working-tree warning

The repository has many intentional, uncommitted moves and edits. Old paths appear as deleted and new paths appear as untracked because the work has not been staged. Do not restore deleted files or run destructive Git cleanup commands. Treat all current changes as user work.

`.DS_Store` is modified but unrelated. Leave it alone.

## Completed before the latest turn

### Whole-repository organization

- Reorganized the major QA, interview, study-topic, automation, and documentation sections.
- Added beginner documentation, a glossary, indexes, interview material, newer QA topics, and section entry pages.
- Moved Markdown files into topic-oriented folders and repaired navigation.
- Consolidated imported Notion material into the live topic files.
- Recorded Notion work in:
  - `05-docs/NOTION_CONSOLIDATION.md`
  - `05-docs/NOTION_SYNC_REPORT.md`
- Removed the temporary Notion archive after its useful content was merged.
- Mapped PDF-derived information into topic notes and resource-note files.
- Removed known exact repeated blocks, including duplicated Selenium content and an older duplicate manual-testing section.
- Standardized documents to one document-level H1 outside code fences.

### Playwright

`06-automation/playwright/` was fully reorganized and rewritten as a learning hub:

- `README.md`
- `playwright-automation.md`
- `javascript-typescript.md`
- `fundamentals.md`
- `core-concepts.md`
- `framework-design.md`
- `ci-reporting-debugging.md`
- `advanced-playwright.md`
- `practice-and-resources.md`
- `self-healing-tests.md`

The Playwright notes now have a staged learning order, beginner explanations, safer wait guidance, CI examples, page-object guidance, debugging/reporting notes, and interview practice.

### Previous validation

Before the latest automation split, validation reported:

- zero broken local Markdown links;
- zero exact duplicate Markdown files;
- zero exact cross-file duplicate paragraph groups;
- balanced structure and one document-level H1;
- `git diff --check` passed.

These checks must be run again because the latest turn added files.

## Work completed in the latest turn

The user asked to apply the Playwright treatment to the other folders. Work began with the other large automation notes.

### WebdriverIO

The original 1,425-line `06-automation/webdriverio/webdriverio.md` is now a short learning hub. Its material was preserved and split into:

- `fundamentals.md`
- `javascript-and-promises.md`
- `locators-waits-assertions.md`
- `framework-and-reporting.md`
- `practical-notes.md`
- `mobile-and-interview-review.md`
- `interview-questions.md`

### Java OOP

The original `06-automation/java/java-oop.md` is now a short learning hub. Its material was preserved and split into:

- `oop-fundamentals.md`
- `overloading-and-overriding.md`
- `oop-for-test-automation.md`
- `oop-interview-review.md`

### Selenium and TestNG

The original `06-automation/selenium/selenium-testng.md` is now a short learning hub. Its material was preserved and split into:

- `webdriver-basics.md`
- `frames-waits-and-sessions.md`
- `oop-in-automation.md`
- `testng-annotations.md`

The one-time splitting script was removed after execution. Do not try to recreate and rerun it against the new hub files; the original long content now lives in the split files.

## Exact stopping point

No testing-guide split was executed. The next planned work was to split the five oversized files in `01-testing/` while retaining each current filename as a short folder hub:

- `e2e-end-to-end-testing/e2e-end-to-end-testing.md` — 2,251 lines
- `integration-testing/integration-testing.md` — 2,447 lines
- `mocking-stubbing/mocking-stubbing.md` — 2,167 lines
- `tdd/tdd.md` — 2,040 lines
- `unit-testing/unit-testing.md` — 2,186 lines

Suggested content boundaries already identified:

### Unit testing

- foundations and testing pyramid;
- PHPUnit;
- Jest;
- advanced techniques;
- best practices, anti-patterns, and summary.

### Integration testing

- foundations and scope;
- API and database integration;
- external services, queues, cache, and storage;
- advanced environment/data/contract techniques;
- best practices and anti-patterns.

### End-to-end testing

- foundations and test pyramid;
- tool guides;
- practical scenarios;
- advanced execution and CI;
- best practices, comparisons, Bangladesh examples, and summary.

### Mocking and stubbing

- test-double foundations;
- dummy, stub, spy, mock, and fake examples;
- framework/tool usage;
- advanced techniques;
- best practices and anti-patterns.

### TDD

- foundations and Red-Green-Refactor;
- PHP and JavaScript walkthroughs;
- advanced TDD/BDD/ATDD/API topics;
- Bangladesh example;
- benefits, challenges, mistakes, and summary.

Prefer files of roughly 100–500 lines where natural topic boundaries allow it. Preserve every unique example. The current large files already contain user edits, so split their current content rather than retrieving the versions from Git.

## Work remaining after testing

1. Add or improve entry pages and learning order for the remaining `01-testing` folders.
2. Review and split medium/large interview files:
   - `03-interview/behavioral/introduce-yourself.md`
   - `03-interview/question-bank/senior-qa-interview-questions.md`
   - optionally `qa-portfolio.md` if a split improves use.
3. Review and split medium/large study notes:
   - `04-study-topics/api-testing/api-complete-guide.md`
   - `04-study-topics/manual-testing/manual-testing-knowledge.md`
   - `04-study-topics/foundations/different-types-of-testing.md`
4. Review smaller QA-engineering folders for missing entry pages, but do not create folders merely for appearance.
5. Update `06-automation/README.md` if needed; its links still point to the new hub filenames and should remain valid.
6. Regenerate `05-docs/MARKDOWN_INDEX.md` after all moves/splits.
7. Update `05-docs/CODEBASE_INDEX.md`, root `README.md`, and section READMEs only where paths or learning order changed.

## Required final validation

Run a repository-wide check for:

- broken relative Markdown links;
- missing link targets after moves;
- exactly one H1 outside fenced code per document;
- balanced fenced code blocks;
- exact duplicate files;
- exact repeated paragraph groups across files;
- stale references to deleted paths;
- malformed Markdown headings;
- `git diff --check`.

At the stopping point, `git diff --check` passes. No full link or duplicate scan was run after the new Java, Selenium, and WebdriverIO files were created.

## Content-quality cautions

- Some notes mix Bangla and English intentionally; preserve that accessibility.
- Keep explanations simple enough for a school student, then add the correct technical term.
- Do not blindly remove similar material: a tutorial, quick-reference sheet, and interview Q&A may overlap intentionally.
- `api-complete-guide.md` and `api-basics.md` were previously considered similar but serve different reading modes; their API README explains the distinction.
- Prefer current official documentation when correcting commands or framework behavior that may have changed.
- Never claim that imported Notion or PDF content was deleted until its unique information is confirmed in a destination file.

## Recommended first action for the next agent

Read this file, inspect `git status --short`, then validate the newly split automation folders before changing more content. After that, split `01-testing/unit-testing/` first as the template for the other oversized testing guides.
