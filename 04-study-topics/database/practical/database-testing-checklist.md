# Database Testing Checklist for SQA Releases

> **সহজভাবে / In simple words:** A database checklist organizes common checks for structure, rules, operations, and releases.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It reduces the chance of overlooking important data risks.


## 1) Data Model and Constraints

- Verify PK, FK, UNIQUE, NOT NULL behavior against requirements.
- Verify business-critical columns have valid defaults.
- Verify enum/state transitions are valid.

## 2) CRUD and Business Rules

- Create: row inserted with correct values.
- Read: API/UI reflects stored state correctly.
- Update: only intended columns changed.
- Delete: hard vs soft delete follows design.

## 3) Cross-Table Consistency

- Parent-child rows remain consistent.
- Mapping tables update correctly for many-to-many relations.
- No orphan rows after delete/update flows.

## 4) Transactions and Failure Handling

- Multi-table write operations are atomic.
- Failures rollback all related writes.
- Retry/replay does not create duplicates.

## 5) API to DB Synchronization

- Response payload values match DB values.
- Status transitions in API are reflected in DB states.
- Async jobs eventually produce correct persisted state.

## 6) Migration and Deployment Safety

- Pre-migration backup exists and is restorable.
- Post-migration row counts and sample records match expectations.
- Backfill scripts produce correct default/derived values.
- Rollback rehearsal completed for high-risk changes.

## 7) Security and Compliance

- SQL injection payloads are neutralized.
- Sensitive fields are encrypted/masked as required.
- Unauthorized roles cannot read/write restricted tables.

## 8) Performance and Scalability Signals

- High-volume queries stay within SLA.
- No major regression in execution time after schema changes.
- Critical endpoints do not degrade with realistic data size.

## 9) Auditability

- `created_at`, `updated_at`, `created_by`, `updated_by` are correct.
- History/audit tables capture key business events.
- Timezone handling is consistent.

## 10) Evidence and Sign-off Artifacts

- Validation queries and outputs attached.
- Before/after snapshots attached for update/delete flows.
- Defect links mapped to impacted tables.
- Pass/fail summary documented for release decision.

## Reference PDF Used

- `All PDF Files/CheckList/Checklists for testing of Web Application!!.pdf`
