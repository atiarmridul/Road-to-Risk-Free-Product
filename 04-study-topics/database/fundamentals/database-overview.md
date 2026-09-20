# Database Testing Overview for SQA Engineers

> **সহজভাবে / In simple words:** Database testing checks whether stored information is correct, consistent, protected, and recoverable.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Most applications depend on data even when users never see the database directly.


## Why This Matters

UI and API can return success while data is still wrong in storage. Database testing prevents silent data corruption, reconciliation failures, reporting defects, and financial inconsistency.

## QA Objectives

1. Validate data integrity after each business action.
2. Validate consistency across related tables and services.
3. Validate transaction safety and rollback behavior.
4. Validate schema-change safety before release.
5. Validate security controls on sensitive data access.

## Scope in a Typical Product

- OLTP application tables (users, orders, payments, inventory)
- Background job side-effects (retries, dead-letter recovery)
- Audit and history tables
- Reporting/analytics handoff tables

## What QA Should Verify

### Data Integrity
- Required fields are persisted correctly.
- No invalid enum/state values are stored.
- Primary key and unique key rules are respected.

### Data Consistency
- API response values match stored values.
- Parent-child relationship consistency is maintained.
- Cross-service updates remain synchronized.

### Transaction Reliability
- Multi-step operations are atomic.
- Partial failures do not leave residual writes.
- Retries do not produce duplicate business records.

### Change Safety
- Migrations preserve old data readability.
- Backfill/default scripts produce expected data.
- Rollback plan is validated in staging.

## Entry and Exit Criteria (Release-Oriented)

Entry criteria:
- Stable schema version in staging
- Test data seeded for key workflows
- DB read access for QA (at minimum)

Exit criteria:
- Critical business scenarios pass with DB evidence
- No open Sev-1/Sev-2 DB defects
- Migration verification signed off
- Known DB risks documented with owner and ETA

## Common Defects Found via DB Testing

- Wrong total because item-level records are missing
- Soft-deleted rows still visible in list/report APIs
- Race condition causes duplicate transaction rows
- Payment row committed but invoice row missing

## Reference PDFs Used

- `All PDF Files/CheckList/Checklists for testing of Web Application!!.pdf`
- `All PDF Files/Manual Testing Concepts/Functional Testing.pdf`
