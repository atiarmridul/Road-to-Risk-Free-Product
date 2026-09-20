# Agent Guide

## Current Structure

Numbered module structure (dev-pathshala style):

- `01-testing/`
- `02-qa-engineering/`
- `03-interview/`
- `04-study-topics/`
- `05-docs/`
- `06-automation/`
- `07-resources/`

Content is grouped by subject below each numbered module. Examples:

- Interview behavior and question banks are separated under `03-interview/behavioral/` and `03-interview/question-bank/`.
- Study notes use domain folders such as `foundations/`, `test-design/`, `defect-management/`, `api-testing/`, and `database/`.
- Automation notes separate foundations, programming, shared concepts, tool-specific guides, practice, comparisons, and references under numbered folders.

## Rules

1. Keep modules numbered.
2. Keep a `README.md` in each module as local index.
3. Update `05-docs/MARKDOWN_INDEX.md` after file add/move/delete.
4. Keep root `README.md` as top-level topic table.
5. Place a note according to its primary subject, not its source format or original import location.
6. Keep supporting-document summaries beside the subject they support.

## Activity Log

### 2026-05-01

- Imported connected Notion pages into local markdown notes.
- Organized notes by subject, then regrouped by content type.
- Flattened and restructured files, then renamed markdown files based on content.
- Removed duplicate markdown files where detected.
- Grouped interview-related notes into dedicated interview folders.
- Created/maintained indexes:
  - `05-docs/MARKDOWN_INDEX.md`
  - `05-docs/CODEBASE_INDEX.md`
- Updated root `README.md` multiple times to reflect structure changes.
- Removed Notion import scripts:
  - `scripts/import-notion-page.mjs`
  - `scripts/import-notion-all-pages.mjs`
- Removed Notion import data folder:
  - `05-notion-imports/`
- Updated docs references after cleanup:
  - Removed `05-notion-imports/` mention from this guide.
  - Kept docs module path as `05-docs/`.
