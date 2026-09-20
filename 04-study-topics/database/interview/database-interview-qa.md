# Database Interview Q&A for SQA Engineers

> **সহজভাবে / In simple words:** Database interview questions test SQL knowledge and reasoning about data integrity.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Strong answers connect queries to realistic product risks.


## 1) Why should an SQA engineer know SQL?
Because API/UI success does not guarantee persisted data correctness.

## 2) What is the difference between data integrity and data consistency?
Integrity is correctness within data rules; consistency is agreement of data across tables/services and states.

## 3) How do you validate rollback in a multi-step flow?
Force failure at step N and verify no partial writes remain in any related table.

## 4) How do you test idempotency?
Send same request with same idempotency key multiple times and verify only one business record exists.

## 5) How do you detect duplicate payment/order issues?
Use grouped queries on transaction/reference keys and verify `COUNT(*)` remains 1.

## 6) What is soft delete and how do you validate it?
Record remains with delete flag/timestamp; verify list/report queries exclude deleted records unless explicitly requested.

## 7) Which queries do you use most in DB testing, and how do you validate data across two tables?
`SELECT`, `JOIN`, `GROUP BY`, `COUNT`, and targeted filters in `WHERE`.
For cross-table checks, use `INNER JOIN`/`LEFT JOIN` on key fields (for example, `orders.user_id = users.id`) and verify record count/values match API behavior.

## 8) How do you validate migration quality?
Check row counts, sample records, constraints, indexes, and fallback compatibility before and after deployment.

## 9) What causes orphan records and how do you catch them?
Broken delete/update logic or missing FK enforcement; detect with `LEFT JOIN ... WHERE parent IS NULL` queries.

## 10) How do you test SQL injection protection?
Send malicious input payloads and verify no query manipulation, no data exposure, and controlled validation errors.

## 11) What should be attached in a DB defect ticket?
Repro steps, API evidence, validation query, query output, impacted table/columns, and business impact.

## 12) How do you prioritize DB defects?
By user impact, recoverability, financial risk, and whether corruption is ongoing.

## 13) Which database(s) have you used, and how comfortable are you with query writing?
I have hands-on experience validating application data with SQL and I am comfortable writing and reviewing practical QA queries (`JOIN`, aggregates, duplicate checks, orphan checks, and transactional validations).

## 14) What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?
`DELETE` removes selected rows (can use `WHERE`), `TRUNCATE` clears all rows quickly while keeping table structure, and `DROP` removes the table object itself (structure + data).

Visual reference:
![DELETE vs TRUNCATE vs DROP](../assets/delete-vs-drop-vs-truncate.webp)

Additional notes:
![Database testing note 1](../assets/database-testing-overview-1.png)
![Database testing note 2](../assets/database-testing-overview-2.png)


