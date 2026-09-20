# QA-এর জন্য ডেটাবেস টেস্টিং (Database Testing)

> **সহজভাবে / In simple words:** QA database testing verifies that product actions create the correct lasting data.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It helps investigate problems that cannot be explained from the screen alone.


## কেন database testing জরুরি

অনেক সময় UI বা API pass দেখালেও database-এ ভুল data save হয়।
Production incident-এর বড় অংশ data inconsistency থেকে আসে।
তাই QA-কে DB behavior verify করতে জানতে হবে।

## Scope: কী কী test করবেন

- Data integrity (valid relation আছে?)
- Data consistency (API response vs DB same?)
- Constraint behavior (PK/FK/UNIQUE/NOT NULL)
- Transaction behavior (partial write হচ্ছে কি না)
- Migration safety (schema change-এর পরে data ঠিক আছে?)

## Core Concepts (Quick)

- PK: row uniquely identify
- FK: relation enforce
- UNIQUE: duplicate value prevent
- NOT NULL: mandatory field
- Transaction: all-or-nothing data change

## 1) Data Integrity Testing

### Test ideas
- orphan row detect
- duplicate detect
- referential link valid কি না

### SQL examples

```sql
-- duplicate email detect
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- orphan orders detect
SELECT o.id
FROM orders o
LEFT JOIN users u ON u.id = o.user_id
WHERE u.id IS NULL;
```

## 2) Data Consistency Testing

### Example
Order create API call করার পর:
- `orders` table-এ row আছে?
- `order_items` count response-এর সাথে match?
- `total_amount` calculation consistent?

### Practical QA flow
1. API call
2. response snapshot
3. DB query দিয়ে verify
4. mismatch হলে defect raise

## 3) Transaction & Rollback Testing

Scenario: payment save হয়, কিন্তু invoice save fail.
Expected: transaction rollback হলে payment row-ও persist হবে না (design অনুযায়ী)।

Check করুন:
- partial write রয়ে গেছে কি না
- retry করলে duplicate create হচ্ছে কি না

## 4) Migration Testing

Schema change এর আগে-পরে check:
- old data readable?
- default value correctly backfilled?
- index change-এর পরে query performance degraded?

Pre-release checklist:
- backup আছে
- rollback plan আছে
- staging dry-run হয়েছে

## 5) Soft Delete vs Hard Delete

Soft delete হলে row DB-তে থাকে, flag/column দিয়ে hidden হয়।
Hard delete হলে row remove হয়।

QA checks:
- list API deleted row hide করছে?
- restore flow থাকলে কাজ করছে?
- reporting query deleted data ভুলে include করছে?

## 6) Audit Trail Validation

Critical fields:
- `created_at`
- `updated_at`
- `created_by`
- `updated_by`

Test করুন:
- create/update action এ audit field ঠিকমতো update হচ্ছে?
- timezone consistent?

## 7) Performance-aware DB Testing (basic)

- slow query identify
- missing index suspect
- N+1 query risk detect (API latency বেড়ে যায়)

QA-friendly signs:
- small data-তে fast, large data-তে খুব slow
- filter/sort endpoint timeout

## Common QA Mistakes

- শুধু API response দেখে done বলা
- negative/rollback test বাদ দেওয়া
- DB query evidence সংরক্ষণ না করা
- migration verify না করা

## Mini End-to-End Example

Feature: User registration

Validate:
1. `users` table-এ একটাই row create
2. duplicate email attempt reject
3. verification token table entry create
4. rollback case-এ partial data নেই

## Interview Questions

1. API pass কিন্তু DB wrong হলে কীভাবে ধরবেন?
2. migration testing plan কীভাবে করবেন?
3. transaction rollback test কীভাবে design করবেন?
4. orphan data detect করার practical query উদাহরণ দিন।

## Revision Summary

- DB testing = integrity + consistency + reliability
- API validation-এর সাথে DB verification combine করুন
- migration এবং transaction test না করলে high-risk defect leak হতে পারে

## Cross-Topic Practice Questions (Other Folders থেকে)

1. API contract valid হলেও DB level data corruption কীভাবে detect করবেন? (`01-testing/contract-testing`)
2. Integration testing scope-এ DB assertions কোথায় add করলে maximum value পাওয়া যায়? (`01-testing/integration-testing`)
3. E2E checkout flow-এ কোন DB tables verify করলে financial defect ধরা সহজ হয়? (`01-testing/e2e-end-to-end-testing`)
4. Test data management practice না মানলে DB false-positive defect কেন বাড়ে? (`02-qa-engineering/test-data-environment-management`)
5. Performance test run-এর পরে কোন SQL metrics capture করবেন? (`01-testing/performance-testing`)
6. Reliability testing perspective থেকে retry + duplicate write কীভাবে test করবেন? (`02-qa-engineering/performance-reliability-testing`)
7. Security testing-এর অংশ হিসেবে sensitive columns masking কীভাবে verify করবেন? (`02-qa-engineering/security-testing-for-qa`)
8. Defect metrics-এ DB-origin defect ratio track করলে কোন সিদ্ধান্তে help করে? (`02-qa-engineering/defect-management-quality-metrics`)
9. Risk-based testing plan-এ migration test কোন priority পাবে? (`02-qa-engineering/test-strategy-planning`)
10. Interview-তে “API ঠিক, DB ভুল” real incident কীভাবে explain করবেন? (`03-interview/question-bank/senior-qa-interview-questions.md`)
