# রিস্ক-বেইজড টেস্টিং ও প্রায়োরিটাইজেশন (Risk-Based Testing)

> **সহজভাবে / In simple words:** Risk-based testing gives more attention to failures that are likely or would cause serious harm.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It helps teams make responsible choices when time and resources are limited.


## কেন এই টপিক senior QA-এর জন্য critical

বাস্তবে কখনোই unlimited time থাকে না।
Release deadline, resource limit, change pressure - সব মিলিয়ে smart testing করতে হয়।
Risk-based testing হলো "সব test না করে, সবচেয়ে দরকারি test আগে করা" পদ্ধতি।

## Risk কী?

Software risk = এমন failure যেটা হলে business, user, data, বা compliance ক্ষতিগ্রস্ত হবে।

Simple formula:

`Risk Score = Impact x Likelihood`

- Impact: defect হলে ক্ষতি কত বড়
- Likelihood: defect হওয়ার সম্ভাবনা কত

## Impact scale (example)

- 1 = low (cosmetic)
- 2 = minor functional inconvenience
- 3 = noticeable user impact
- 4 = major flow broken
- 5 = revenue/data/security critical

## Likelihood scale (example)

- 1 = very unlikely
- 2 = low
- 3 = medium
- 4 = high
- 5 = very high

## Priority Bucket বানানোর practical way

- Score 15-25 => `P0` (must test before release)
- Score 8-14 => `P1` (should test)
- Score 1-7 => `P2` (nice to test / can defer with sign-off)

## Risk signals কী কী দেখবেন

- বড় code refactor হয়েছে
- নতুন integration বা third-party dependency এসেছে
- historical defect density বেশি
- business critical module (payment, login, checkout)
- high traffic API endpoint
- monitoring/observability দুর্বল
- requirement unclear বা late change

## Test planning flow (step-by-step)

1. Feature list করুন
2. প্রতিটি feature-এর impact score দিন
3. likelihood score দিন (history + complexity দেখে)
4. risk matrix বানান
5. P0/P1/P2 test suite tag করুন
6. release exit criteria define করুন

## Example Risk Matrix (E-commerce)

| Feature | Impact | Likelihood | Score | Priority |
|---|---:|---:|---:|---|
| Checkout payment callback | 5 | 4 | 20 | P0 |
| Login + token refresh | 5 | 3 | 15 | P0 |
| Search filter sorting | 3 | 3 | 9 | P1 |
| Profile avatar crop UI | 2 | 3 | 6 | P2 |

## Deadline এ কীভাবে execute করবেন

### Phase 1: P0 smoke
- login
- add to cart
- checkout
- payment success/failure
- order confirmation

### Phase 2: P0 negative + resilience
- timeout/retry
- duplicate callback
- auth boundary
- critical validation

### Phase 3: P1 targeted regression
- recently changed areas
- high-usage features

### Phase 4: P2 (if time permits)
- cosmetic / low usage flows

## Risk-based test cases কেমন হবে

P0 test cases-এ ensure করুন:
- clear expected outcome
- business impact traceability
- failure হলে triage owner ready
- quick reproducibility

## Release Exit Criteria (recommended)

- সব `P0` test pass
- unresolved blocker defect = 0
- accepted known-risk তালিকা documented
- product + engineering sign-off আছে

## Anti-patterns (যেগুলো avoid করবেন)

- সব feature-কে same priority দেওয়া
- শুধুমাত্র happy-path চালিয়ে done বলা
- risk discussion-এ product stakeholder না রাখা
- deferred scope document না করা

## Interview-ready answers (short form)

### Q: "If only 2 hours left before release, what will you test?"
Answer frame:
1. critical user journeys identify
2. highest risk APIs validate
3. payment/auth/data integrity verify
4. known deferred risks লিখে sign-off

### Q: "How do you justify skipping tests?"
Answer frame:
- skip না, defer
- matrix-based justification
- business approvalসহ risk acceptance

## Practice Exercise

Scenario:
- new coupon engine release
- payment gateway vendor changed
- mobile app hotfix deadline আজ

আপনি করুন:
1. 6টি feature list
2. impact/likelihood score
3. P0 suite define
4. release note-এ deferred risk লিখুন

## Revision Summary

- Risk-based testing = smarter coverage under constraints
- Formula: impact x likelihood
- P0 first, then P1, then P2
- Documented risk acceptance ছাড়া release না

## Cross-Topic Practice Questions (Other Folders থেকে)

1. Test strategy document থেকে risk input কীভাবে extract করবেন? (`02-qa-engineering/test-strategy-planning`)
2. Defect leakage trend risk score-এ কীভাবে reflect করবেন? (`02-qa-engineering/defect-management-quality-metrics`)
3. Release readiness checklist-এর কোন items risk gate হিসেবে use করবেন? (`02-qa-engineering/quality-gate-release-readiness`)
4. Security testing findings (`auth`, `injection`) risk matrix-এ কোথায় বসাবেন? (`02-qa-engineering/security-testing-for-qa`)
5. Performance bottleneck finding-কে likelihood score কেন বাড়ায়? (`01-testing/performance-testing`, `02-qa-engineering/performance-reliability-testing`)
6. Flaky automation থাকার কারণে release risk কীভাবে quantify করবেন? (`02-qa-engineering/flaky`)
7. Test data instability থাকলে কোন high-risk flows আগে চালাবেন? (`02-qa-engineering/test-data-environment-management`)
8. Contract breaking change detected হলে immediate risk response plan কী? (`01-testing/contract-testing`)
9. Senior stakeholder-কে “deferred scope” risk acceptance কীভাবে communicate করবেন? (`03-interview/question-bank/senior-qa-interview-questions.md`)
10. P0 pass কিন্তু P1 fail হলে release decision framework কী হবে? (`02-qa-engineering/quality-gate-release-readiness`)
