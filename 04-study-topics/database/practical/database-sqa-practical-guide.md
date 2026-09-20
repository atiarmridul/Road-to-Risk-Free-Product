# SQA Practical Guide for Database Testing

> **সহজভাবে / In simple words:** Practical database testing connects requirements and API actions to targeted SQL verification.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It shows how database checks fit into normal project work.


## Real Project Workflow

1. Understand business flow
- Map user action to API calls and affected tables.

2. Build DB validation map
- For each critical endpoint, define expected rows/columns before and after action.

3. Prepare environment and data
- Use stable seeded data.
- Reserve unique test identifiers.

4. Execute happy path and negative path
- Validate both API and DB outcomes.

5. Run failure-mode tests
- Force timeout/error at intermediate step.
- Confirm rollback/compensation behavior.

6. Run concurrency checks
- Trigger parallel requests.
- Validate no duplicate or inconsistent writes.

7. Verify migrations in staging
- Compare pre/post data snapshots.
- Validate rollback readiness.

8. Report with evidence
- Attach query, output, request/response, and impact.

## Suggested Test Case Template

- Test case ID
- Business scenario
- API endpoint(s)
- Affected table(s)
- Pre-condition data
- Steps
- Expected API result
- Expected DB result
- Validation query
- Actual result
- Defect link (if fail)

## Defect Severity Guidance

- Sev-1: data corruption, money mismatch, irreversible wrong writes
- Sev-2: transaction inconsistency or duplicate critical records
- Sev-3: non-critical field mismatch with workaround

## Release Dashboard Metrics

- DB-related defect count by severity
- Duplicate/orphan incident count
- Migration pass rate
- Critical flow DB verification coverage
- Average triage time for DB defects

## Common Anti-Patterns

- Validating only response body, not persisted data
- Skipping rollback and retry scenarios
- Running DB checks without deterministic test IDs
- No ownership for migration verification

## Quick Start Plan (7 days)

Day 1: Read schema and top 10 business tables
Day 2: Write verification queries for core CRUD flows
Day 3: Validate one end-to-end flow with evidence
Day 4: Add rollback and retry tests
Day 5: Add concurrency/idempotency test cases
Day 6: Validate one migration change in staging
Day 7: Build a reusable DB test checklist and dashboard snapshot
