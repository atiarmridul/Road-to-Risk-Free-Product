# Manual Testing PDF Resource Notes

> **Purpose:** Manual Testing PDF Resource Notes maps supporting documents to their canonical study notes; it is not a second copy of those notes.


This document routes the manual-testing library into canonical notes and captures the highest-value revision prompts without reproducing the source documents.

## Resource map

| Resource | Main concepts | Canonical note |
| --- | --- | --- |
| [Bug Life Cycle Stages](<../../07-resources/Manual%20Testing%20Concepts/Bug%20Life%20Cycle%20Stages.pdf>) | Status flow, ownership, reopen and closure | [Bug lifecycle](../defect-management/bug-reporting-and-defect-lifecycle.md) |
| [Bug Reporting for QA](<../../07-resources/Manual%20Testing%20Concepts/Bug%20Reporting%20For%20QA.pdf>) | Reproduction, evidence, expected vs actual, impact | [Bug lifecycle](../defect-management/bug-reporting-and-defect-lifecycle.md) |
| [Functional Testing](<../../07-resources/Manual%20Testing%20Concepts/Functional%20Testing.pdf>) | Functional test types and application | [Testing types](../foundations/different-types-of-testing.md) |
| [Non-Functional Testing](<../../07-resources/Manual%20Testing%20Concepts/Non%20Functional%20Testing.pdf>) | Performance, security, usability, compatibility | [Testing types](../foundations/different-types-of-testing.md) |
| [Test Scenario vs Test Case](<../../07-resources/Manual%20Testing%20Concepts/Test%20Case%20VS%20Test%20Scenarios.pdf>) | Coverage level and documentation detail | [Test design](../test-design/test-case-design-techniques.md) |
| [Test plan template](<../../07-resources/Manual%20Testing%20Concepts/sample-test-plan-template.pdf>) | Scope, approach, resources, schedule, risks, exit criteria | [Test strategy](../../02-qa-engineering/test-strategy-planning/test-strategy-planning.md) |
| [Epic, User Story and Task](<../../07-resources/Manual%20Testing%20Concepts/%F0%9D%97%98%F0%9D%97%BD%F0%9D%97%B6%F0%9D%97%B0,%20%F0%9D%97%A8%F0%9D%98%80%F0%9D%97%B2%F0%9D%97%BF%20%F0%9D%97%A6%F0%9D%98%81%F0%9D%97%BC%F0%9D%97%BF%F0%9D%98%86%20%F0%9D%97%AE%F0%9D%97%BB%F0%9D%97%B1%20%F0%9D%97%A7%F0%9D%97%AE%F0%9D%98%80%F0%9D%97%B8.pdf>) | Agile work-item hierarchy | [SDLC](../foundations/software-development-life-cycle.md) |
| [Jira questions and answers](<../../07-resources/Manual%20Testing%20Concepts/Jira%20Questions%20and%20Answers.pdf>) | Workflow, issue types, fields, filters, and reporting | [Jira for QA](../defect-management/jira-for-qa.md) |
| [MySQL Cheat Sheet](<../../07-resources/Manual%20Testing%20Concepts/MySQL%20Cheat%20Sheet.pdf>) | SQL syntax and joins | [SQL basics](../database/fundamentals/sql-mysql-basics.md) |
| [How to Use ChatGPT as SQA](<../../07-resources/Manual%20Testing%20Concepts/How%20%20to%20Use%20Chatgpt%20as%20SQA.pdf>) | Drafting and analysis assistance | [AI-assisted QA](../ai-assisted-testing/ai-assisted-testing.md) |
| [How to Email a Resume](<../../07-resources/Manual%20Testing%20Concepts/How%20to%20Email%20a%20Resume.pdf>) | Application email structure | [Career preparation](../../03-interview/behavioral/career-preparation.md) |

## Consolidated revision prompts

- Can the defect be reproduced from a clean state with sufficient evidence?
- Does each test represent a risk or requirement instead of repeating another case?
- Are positive, negative, boundary, state-transition, and permission paths covered?
- Does the plan state what will not be tested and why?
- Are entry, exit, suspension, and resumption criteria measurable?
- Can stakeholders understand the remaining release risk from the report?
