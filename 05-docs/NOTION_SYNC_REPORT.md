# Complete Notion Workspace Audit

Audit date: **2026-09-19**  
Workspace: **Md. Atiar Rahman Chowdhury's Notion**

## Audit result

All **25 accessible pages** in this QA workspace were fetched and checked. The audit covered:

- All 10 top-level pages in the Private section
- All child pages referenced by those pages
- All 25 pages returned by workspace recent-page navigation
- Broad searches for `testing`, `QA`, `automation`, `interview`, `software`, `API`, `Java`, `performance`, `project`, `roadmap`, `questions`, and `engineer`
- Shared and Favorite sections, which currently contain no pages

The broad searches produced no additional page outside the 25-page inventory, and recursive link discovery found no unknown child-page ID.

Every page has now been synchronized into a matching canonical topic file. The former source snapshots were removed after consolidation so the repository does not maintain two competing copies. The [migration record](../05-docs/NOTION_CONSOLIDATION.md) explains this decision.

## Page-by-page inventory

| # | Notion page | Repository destination or decision | Status |
|---:|---|---|---|
| 1 | [Introduce Yourself](https://app.notion.com/p/875ab57286154936b79961ea72e5e743) | [`03-interview/behavioral/introduce-yourself.md`](../03-interview/behavioral/introduce-yourself.md) | Merged and simplified |
| 2 | [Manual testing knowledge](https://app.notion.com/p/0928bd8b409942d48882a39b31cd71a1) | [`04-study-topics/manual-testing/`](../04-study-topics/manual-testing/) and related foundation notes | Already represented |
| 3 | [Project Co-ordination / Management Questions](https://app.notion.com/p/102995ff8e46806e8956ff7cf81e9769) | [`03-interview/question-bank/project-coordination-and-reporting.md`](../03-interview/question-bank/project-coordination-and-reporting.md) | Merged |
| 4 | [Automation Related Questions](https://app.notion.com/p/102995ff8e4680c4a954ce427d6373e3) | [`06-automation/`](../06-automation/) and interview question bank | Already represented |
| 5 | [Questions need to ready](https://app.notion.com/p/101995ff8e4680e8aab6c5eed5cc62e2) | [`03-interview/question-bank/senior-qa-interview-questions.md`](../03-interview/question-bank/senior-qa-interview-questions.md) | Merged/source linked |
| 6 | [Selise Questions](https://app.notion.com/p/10c995ff8e4680d7b80ae3cf74001918) | [`03-interview/question-bank/selise-questions.md`](../03-interview/question-bank/selise-questions.md) | Merged/source linked |
| 7 | [Scenario based QA Automation Q&A](https://app.notion.com/p/0789a0327efc4a7389a7e8355122b8d2) | [`03-interview/question-bank/senior-qa-interview-questions.md`](../03-interview/question-bank/senior-qa-interview-questions.md) | Merged/source linked |
| 8 | [Questions to ask an interviewer](https://app.notion.com/p/10f995ff8e46809cac28ed5c3b37b09c) | Senior interview question bank and career-preparation material | Already represented |
| 9 | [Personal QA portfolio](https://app.notion.com/p/35b995ff8e4681eda03fc347523164d6) | [`03-interview/behavioral/qa-portfolio.md`](../03-interview/behavioral/qa-portfolio.md); contact details redacted and career claims flagged for verification | Consolidated safely |
| 10 | [Senior QA hiring check-in](https://app.notion.com/p/38e995ff8e4680a7a16beb2bbcb83fc5) | Empty meeting note retained in this audit record for completeness | No learning content |
| 11 | [7 Principles of Software Testing](https://app.notion.com/p/066579739eb740b1b1109bff892197db) | [`04-study-topics/foundations/7-principles-of-software-testing.md`](../04-study-topics/foundations/7-principles-of-software-testing.md) | Already represented |
| 12 | [Software Development Life Cycle](https://app.notion.com/p/102995ff8e4680a5bfa8e5b004e68e6b) | [`04-study-topics/foundations/software-development-life-cycle.md`](../04-study-topics/foundations/software-development-life-cycle.md) | Already represented |
| 13 | [Different Types of Testing](https://app.notion.com/p/43a6aa6a5c41425eaddbbe76e28e7f8b) | [`04-study-topics/foundations/different-types-of-testing.md`](../04-study-topics/foundations/different-types-of-testing.md) | Already represented |
| 14 | [JIRA & Reporting Related Questions](https://app.notion.com/p/102995ff8e46803999cdc249c9467e20) | [`03-interview/question-bank/project-coordination-and-reporting.md`](../03-interview/question-bank/project-coordination-and-reporting.md) | Merged |
| 15 | [Unified QA Automation Roadmap](https://app.notion.com/p/35c995ff8e4681f08637c07b760f8d18) | [`06-automation/01-foundations/automation-learning-roadmap.md`](../06-automation/01-foundations/automation-learning-roadmap.md) | Merged |
| 16 | [Playwright Learning Roadmap](https://app.notion.com/p/35b995ff8e4681f0905df1abf95a2fc9) | [Playwright learning hub](../06-automation/04-tools/playwright/README.md) | Merged and expanded |
| 17 | [Self-Healing Playwright Tests with TypeScript](https://app.notion.com/p/362995ff8e46814999c1ee9d37355f6d) | [`self-healing-tests.md`](../06-automation/04-tools/playwright/self-healing-tests.md); retained with a warning because silent recovery can hide UI-contract regressions | Consolidated with caution |
| 18 | [OOP at a Glance](https://app.notion.com/p/50ceb8f6cfee45c38184b029b20cdf91) | [Java OOP](../06-automation/02-programming/java/README.md) | Already represented |
| 19 | [API Related Questions](https://app.notion.com/p/fdbc292a4d264d25868338b6267842e5) | [`04-study-topics/api-testing/`](../04-study-topics/api-testing/) | Already represented |
| 20 | [HTTP Status Codes](https://app.notion.com/p/33395efd300c4dc48fcbcddaf7a23e1c) | [`04-study-topics/api-testing/fundamentals/http-status-codes.md`](../04-study-topics/api-testing/fundamentals/http-status-codes.md) | Already represented |
| 21 | [WebdriverIO Fundamentals](https://app.notion.com/p/25b84e2c20fd4fe6b6371a2a5ea66b6d) | [WebdriverIO learning hub](../06-automation/04-tools/webdriverio/README.md) | Merged and reorganized |
| 22 | [Database Testing](https://app.notion.com/p/5d86db1ab1064f0f87f720a078f945a1) | [`04-study-topics/database/`](../04-study-topics/database/) | Already represented |
| 23 | [GIT](https://app.notion.com/p/428749d2e3c44148a15afbc19c29a454) | [`git-for-qa.md`](../06-automation/02-programming/git-for-qa.md) | Already represented |
| 24 | [JMeter](https://app.notion.com/p/02cfb561876c43b3bdbde4b6e8b10e6f) | [`04-study-topics/performance-testing-jmeter/`](../04-study-topics/performance-testing-jmeter/) | Already represented |
| 25 | [Selenium + TestNG](https://app.notion.com/p/115995ff8e4680c4a39cef044d0cc92f) | [Selenium and TestNG learning hub](../06-automation/04-tools/selenium/README.md) | Already represented |

## Summary

| Disposition | Count |
|---|---:|
| Merged, expanded, or source-linked | 9 |
| Already represented by a canonical repository note | 13 |
| Consolidated with privacy or usage cautions | 2 |
| Empty meeting note recorded for completeness | 1 |
| **Total checked** | **25** |

Additionally, **25 of 25 pages are accounted for in the canonical study layer or audit record**. Detailed material was merged into the topic files before duplicate snapshots were removed.

“Already represented” means the information exists in a canonical Markdown topic and creating another file would add repetition. It does not mean that the Notion wording was copied line by line.

## Content intentionally not copied as fact

- Personal phone numbers, email addresses, professional references, and other unnecessary personal data
- Employer, product-usage, achievement, and experience claims that may have changed
- Claims of expertise when another source describes the same technology as still being learned
- Expiring Notion-hosted image URLs
- Self-healing locator behavior that can silently conceal genuine product changes

## Safe update process

1. Enumerate the Private, Shared, Favorite, and recent-page lists.
2. Fetch every page and recursively check its referenced child pages.
3. Run broad QA searches to detect accessible pages not linked in the sidebar hierarchy.
4. Find the canonical repository note in [`MARKDOWN_INDEX.md`](MARKDOWN_INDEX.md).
5. Merge only new, correct, useful material in plain language.
6. Record each page as merged, already represented, excluded, or empty.
7. Update the Markdown index and run the local-link and duplicate-content checks.

This keeps Notion as source material while Git remains the reviewable, interview-ready knowledge base.
