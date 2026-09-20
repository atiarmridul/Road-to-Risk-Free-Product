# টেস্ট কেস ডিজাইন টেকনিকস (Test Case Design Techniques)

> **সহজভাবে / In simple words:** Test-design techniques turn rules and risks into a small, effective set of test cases.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** They improve coverage without trying every possible input.


## কেন এই টপিকটি খুব গুরুত্বপূর্ণ

QA engineer-এর আসল শক্তি হচ্ছে কম সময়ে, কম টেস্ট কেস দিয়ে, বেশি defect ধরতে পারা।
সেটা সম্ভব হয় structured test design technique ব্যবহার করলে।

এই নোট শেষে আপনি জানতে পারবেন:
- কোন টেকনিক কখন ব্যবহার করবেন
- কীভাবে strong test case লিখবেন
- interview-তে কীভাবে confidence-এর সাথে explain করবেন

## 1) Equivalence Partitioning (EP)

### ধারণা
Input domain-কে valid ও invalid group-এ ভাগ করা হয়।
প্রতিটি group থেকে 1-2 representative value নিলে coverage পাওয়া যায়।

### উদাহরণ
ধরুন `Age` field valid range `18 থেকে 60`।

- Invalid group 1: `18 এর কম`
- Valid group: `18 থেকে 60`
- Invalid group 2: `60 এর বেশি`

Representative values:
- `17` (invalid)
- `25` (valid)
- `61` (invalid)

### কখন ব্যবহার করবেন
- input range বড় হলে
- form validation test-এ
- API payload field validation-এ

## 2) Boundary Value Analysis (BVA)

### ধারণা
Defect বেশি পাওয়া যায় boundary-এর কাছে।
তাই minimum/maximum এর ঠিক নিচে, equal, এবং ঠিক উপরে value test করা হয়।

### Rule of 6 (single range)
যদি `min=1`, `max=100`, তাহলে সাধারণত:
- `0`, `1`, `2`, `99`, `100`, `101`

### কেন effective
অনেক developer condition লেখে `>`, `>=`, `<`, `<=` mix করে।
Boundary test ওই logic mistake ধরতে খুব দ্রুত help করে।

## 3) Decision Table Testing

### ধারণা
যেখানে multiple condition মিলিয়ে output নির্ধারণ হয়, সেখানে decision table best।

### Example: Discount Rule
Condition:
- Coupon আছে?
- User premium?
- Cart value >= 5000?

Outcome:
- 0%, 5%, 10%, 15% discount

এখানে if-else complex হয়ে যায়, decision table clear coverage দেয়।

## 4) State Transition Testing

### ধারণা
System state change ঠিকমতো হচ্ছে কি না verify করা।

### Example: Order Lifecycle
`Pending -> Paid -> Shipped -> Delivered -> Returned`

Test focus:
- invalid transition block হচ্ছে? (যেমন `Pending -> Delivered`)
- state change event log হচ্ছে?
- same event retry করলে duplicate change হচ্ছে?

## 5) Use Case / Scenario Based Testing

### ধারণা
বাস্তব user journey ধরে end-to-end flow test করা।

### Example: Checkout
- Add to cart
- Apply coupon
- Select address
- Payment success
- Order confirmation

এখানে module cross-dependency defect ধরা পড়ে (UI + API + DB + notification)।

## 6) Error Guessing (Experience-Based)

### ধারণা
আগের bug history ও domain knowledge ব্যবহার করে likely failure area-তে test করা।

Common guesses:
- empty payload
- very long string
- duplicate submit
- special characters
- timezone/date edge case

## 7) Pairwise / Combinatorial (সংক্ষেপে)

যখন অনেক input combination আছে, সব test করা সম্ভব না।
Pairwise approach দুইটা parameter-এর interaction coverage maximize করে test case কমায়।

ব্যবহার:
- browser x OS x language x currency combinations

## Strong Test Case লেখার ফরম্যাট

- Test Case ID
- Module / Requirement ID
- Objective
- Preconditions
- Test Data
- Steps
- Expected Result
- Priority (`P0/P1/P2`)
- Actual Result
- Status

## Worked Example: Login API

Assume API: `POST /api/login`
Rules:
- email required
- password required
- 5 failed attempts => account lock

### EP Cases
- valid email + valid password => `200`
- valid email + wrong password => `401`
- invalid email format => `422`
- missing password => `422`

### BVA-like Security Case
- failed attempts 4 বার => এখনও open
- 5th fail => lock
- locked account valid password দিলেও login blocked

### Error Guessing
- SQL-like payload in email
- very long password (5k chars)
- leading/trailing whitespace

## সাধারণ ভুল যেগুলো avoid করবেন

- শুধু happy path test করা
- expected result vague লেখা (যেমন: "works fine")
- requirement traceability না রাখা
- negative case বাদ দেওয়া
- একই টেস্ট কেসে অনেক objective ঢুকিয়ে দেওয়া

## Interview Preparation Questions

1. EP আর BVA এর পার্থক্য কী?
2. Decision table কখন ব্যবহার করবেন?
3. High-risk module এ test case count কমিয়ে কীভাবে confidence রাখবেন?
4. State transition defect-এর real example দিন।

## Quick Self Practice

Feature: OTP Verification
Rules:
- OTP length 6 digit
- OTP valid 2 minutes
- 3 wrong attempt => block 15 minutes

নিজে লিখুন:
- EP-based 5টি case
- BVA-based 4টি case
- State transition 4টি case

## Revision Summary

- EP: input group
- BVA: boundary edge
- Decision table: multi-condition rules
- State transition: lifecycle control
- Error guessing: experience-driven fast defect hunt

## Cross-Topic Practice Questions (Other Folders থেকে)

1. একটি feature-এর জন্য Unit, Integration, E2E coverage কীভাবে ভাগ করবেন? (`01-testing`)
2. Contract testing report fail হলে test case design-এ কী change আনবেন? (`01-testing/contract-testing`)
3. Mocking/Stubbing কখন test case quality কমিয়ে misleading confidence দেয়? (`01-testing/mocking-stubbing`)
4. Risk-based priority (`P0/P1/P2`) দিয়ে test case set কীভাবে reorder করবেন? (`02-qa-engineering/test-strategy-planning`)
5. Quality gate fail হওয়ার আগে test case-এ কোন exit criteria add করবেন? (`02-qa-engineering/quality-gate-release-readiness`)
6. Flaky UI test case detect হলে stable redesign কীভাবে করবেন? (`02-qa-engineering/flaky`)
7. Performance test case-এ response time SLA assert কীভাবে লিখবেন? (`01-testing/performance-testing`)
8. Mutation testing outcome দেখে missing negative test case কীভাবে identify করবেন? (`01-testing/mutation-testing`)
9. Visual regression failure-কে functional defect থেকে কীভাবে আলাদা করবেন? (`01-testing/visual-regression-testing-ui`)
10. Interview-তে “একই feature-এর জন্য minimal কিন্তু effective test suite” কীভাবে explain করবেন? (`03-interview`)
