# AI-Assisted Testing

> **সহজভাবে / In simple words:** AI can help brainstorm, explain, draft, and review testing work, but it can also be wrong.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Human verification and protection of private information remain essential.


Generative AI can accelerate analysis and drafting, but QA remains responsible for correctness, privacy, and risk decisions.

## Useful applications

- Brainstorming risks, edge cases, and test data categories
- Turning requirements into a first-pass checklist
- Explaining logs, queries, or unfamiliar technical concepts
- Drafting API assertions, selectors, or small utility functions
- Summarizing non-sensitive execution evidence
- Reviewing wording and completeness of defect reports

## Guardrails

- Never submit credentials, tokens, personal data, proprietary source, or confidential logs to an unapproved service.
- Treat output as a hypothesis, not evidence.
- Verify generated tests against requirements and actual behavior.
- Review code for security, maintainability, and false assertions.
- Record human ownership for release-impacting decisions.
- Prefer organization-approved tools and retention settings.

## Interview answer

I use AI to accelerate brainstorming and drafting, especially for edge cases or repetitive test scaffolding. I do not let it decide pass/fail or release risk. I protect sensitive information, verify every output, and measure whether it improves coverage or feedback time rather than accepting generated volume as value.

## Source

- [How to Use ChatGPT as SQA PDF](<../../07-resources/Manual%20Testing%20Concepts/How%20%20to%20Use%20Chatgpt%20as%20SQA.pdf>)
