# টেস্ট স্ট্র্যাটেজি ও পরিকল্পনা

> **সহজভাবে / In simple words:** A test strategy explains what will be tested, why it matters, how it will be tested, and what may remain risky.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It focuses limited time and people on the most important product risks.


## কেন Strategy জরুরি

Strategy না থাকলে testing হয় random এবং শেষ মুহূর্তে bottleneck তৈরি করে। Strategy থাকলে team আগেই জানে কোথায় effort বেশি দিতে হবে।

---

## Strategy Document Template

1. Product Scope

- in-scope features
- out-of-scope features
- assumptions

2. Risk Catalog

- payment, auth, data integrity, compliance, third-party dependency

3. Test Approach

- unit ownership: dev
- integration ownership: shared
- e2e ownership: QA (critical paths only)

4. Entry এবং Exit Criteria

- entry: build green, env ready, seed data ready
- exit: sev-1/sev-2 open = 0, CUJ pass = 100%, approved risk exceptions documented

5. Reporting Plan

- daily execution summary
- release risk memo

---

## Risk Scoring Model

`Risk Score = Impact x Probability x Detectability`

- Impact: 1-5
- Probability: 1-5
- Detectability: 1-5 (detect করা কঠিন হলে score বেশি)

Decision guideline:

- 60+ = mandatory deep testing + negative + resilience
- 30-59 = targeted regression
- <30 = smoke + contract confidence যথেষ্ট

---

## Effort Estimation Model

`Effort Points = Complexity x Integration Count x Risk Multiplier`

উদাহরণ:

- CRUD profile update = `2 x 1 x 1 = 2`
- payment capture with webhook = `4 x 3 x 2 = 24`

---

## Traceability Matrix (Minimum)

| Requirement      | Risk   | Test Type            | Owner    | Status      |
| ---------------- | ------ | -------------------- | -------- | ----------- |
| Checkout payment | High   | API + E2E + Perf     | QA + BE  | In Progress |
| Login with OTP   | High   | API + Security + E2E | QA + Sec | Planned     |
| Profile edit     | Medium | API + Integration    | QA       | Done        |

---

## Common Anti-Patterns

- সব feature-এ একই level test effort দেওয়া
- regression scope freeze না করে শেষ সময়ে scope creep করা
- test completion report-এ risk communication না রাখা
