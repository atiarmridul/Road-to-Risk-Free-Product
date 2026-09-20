# বাগ রিপোর্টিং ও ডিফেক্ট লাইফসাইকেল

> **সহজভাবে / In simple words:** A bug report explains a problem so another person can reproduce, understand, and fix it.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Clear evidence and impact reduce discussion time and speed up resolution.


## লক্ষ্য

একটি bug report এমন হওয়া উচিত যাতে developer অতিরিক্ত call ছাড়াই issue reproduce করে fix করতে পারে।
ভাল bug report মানে faster fix, কম back-and-forth, এবং smooth release.

## Bug vs Defect vs Failure (short clarity)

- Bug: coding/design mistake
- Defect: documented issue in system
- Failure: runtime-এ visible incorrect behavior

## High-quality Bug Report Structure

1. Title
2. Environment
3. Build/Version
4. Preconditions
5. Steps to Reproduce
6. Actual Result
7. Expected Result
8. Evidence (screenshot/video/log/request id)
9. Severity
10. Priority
11. Business Impact

## Good Title লেখার formula

`[Module] + [Condition] + [Unexpected Behavior]`

Example:
`[Checkout] Wallet + Coupon together দিলে order fail করে`

## Severity vs Priority (important)

- Severity = technical damage level
- Priority = business urgency for fix

Possible combinations:
- High Severity + High Priority: payment crash
- High Severity + Low Priority: admin tool rare issue
- Low Severity + High Priority: homepage typo during major campaign

## Defect States (Typical Lifecycle)

1. New
2. Assigned
3. In Progress
4. Fixed
5. QA Retest
6. Verified
7. Closed
8. Reopened
9. Rejected / Duplicate / Cannot Reproduce

## Reopen কমানোর জন্য QA checklist

- exact build number verify
- same test data দিয়ে retest
- related regression check
- side-effect API/DB validation
- acceptance criteria cross-check

## Realistic Bug Example (Bengali)

### Title
`[Login] 5 failed attempt-এর পরে account lock হচ্ছে না`

### Environment
- App: Web
- Browser: Chrome 124
- Env: Staging
- Build: `2026.05.02-rc1`

### Preconditions
- user account active

### Steps
1. Valid email দিন
2. ভুল password দিন
3. 5 বার repeat করুন

### Actual
- 5th attempt এর পরও login form active

### Expected
- account lock হবে এবং lock message দেখাবে

### Severity
High

### Priority
High

### Business Impact
Brute force risk বাড়ে, account security weak হয়

## Triage Meeting-এ QA কী contribute করবে

- duplicate issues merge
- true blocker identify
- reproducibility clarify
- risk-based fix order propose
- release impact highlight

## Rejected defect handle করার professional way

যদি `Cannot Reproduce` আসে:
- fresh evidence দিন
- exact data + time + request id যোগ করুন
- video capture দিন
- environment diff confirm করুন

যদি `As Designed` আসে:
- requirement link verify করুন
- product owner alignment নিন

## Common Mistakes

- vague steps ("sometimes fails")
- expected result না লেখা
- severity/priority random দেওয়া
- evidence ছাড়া major bug raise করা
- one ticket-এ multiple unrelated issue ঢোকানো

## Bug Writing Template (Copy & Use)

```text
Title:
Environment:
Build/Version:
Preconditions:
Steps to Reproduce:
1.
2.
3.
Actual Result:
Expected Result:
Severity:
Priority:
Evidence:
Business Impact:
```

## Interview Questions

1. Severity আর Priority-এর পার্থক্য উদাহরণসহ বলুন।
2. Reopened defect কমাতে QA কী করতে পারে?
3. Defect triage meeting-এ QA-এর ভূমিকা কী?
4. কোন defect block release করা উচিত, কেন?

## Revision Summary

- Bug report যত clear, fix তত দ্রুত
- Severity = damage, Priority = urgency
- Lifecycle বুঝলে triage ও release decision ভালো হয়

## Cross-Topic Practice Questions (Other Folders থেকে)

1. Unit test pass কিন্তু integration fail হলে bug report-এ root context কীভাবে লিখবেন? (`01-testing/unit-testing`, `01-testing/integration-testing`)
2. E2E defect report-এ reproduction data কীভাবে capture করলে dev দ্রুত fix করতে পারে? (`01-testing/e2e-end-to-end-testing`)
3. Contract mismatch defect-এ expected vs actual schema report format কী হবে? (`01-testing/contract-testing`)
4. Performance defect-এর severity/priority কীভাবে নির্ধারণ করবেন? (`01-testing/performance-testing`)
5. Security defect triage-এ কোন evidence বাধ্যতামূলক? (`02-qa-engineering/security-testing-for-qa`)
6. Flaky test থেকে created defect ticket কখন valid, কখন invalid? (`02-qa-engineering/flaky`)
7. Data/environment issue হলে defect নাকি task হিসেবে log করবেন? (`02-qa-engineering/test-data-environment-management`)
8. Quality gate blocker defect close করার acceptance proof কী হবে? (`02-qa-engineering/quality-gate-release-readiness`)
9. Interview-তে “hard bug discussion” scenario কীভাবে conciseভাবে বলবেন? (`03-interview/behavioral/introduce-yourself.md`)
10. Reopened defect কমাতে regression pack কিভাবে tag করবেন? ([testing foundations](../../01-testing/testing-foundations.md))
