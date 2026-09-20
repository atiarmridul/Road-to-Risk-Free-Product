# API and Database Validation Guide for SQA

> **সহজভাবে / In simple words:** API and database validation compares what a service reports with what the system actually stored.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It catches cases where a response looks correct but durable data is missing or wrong.


## Why Both Layers Must Be Validated

API checks prove contract behavior, but DB checks prove data truth. Critical flows require both.

## Validation Matrix

| Scenario | API Assertion | DB Assertion |
| --- | --- | --- |
| Create resource | 201 + response payload | Row exists, expected column values stored |
| Update resource | 200 + updated fields in response | Only target columns changed |
| Partial update (PATCH) | 200 + partial field changes | Non-updated columns unchanged |
| Delete resource | 200/204 | Row removed or `is_deleted=1` |
| Retry/idempotency | Same response on replay | No duplicate row for same request key |
| Async processing | Accepted/in-progress response | Final state persisted by worker job |
| Error handling | Expected error code/body | No partial/dirty write in DB |

## High-Risk Cases to Cover

1. Payment + invoice dual-write
- If invoice fails, payment should rollback (or compensating logic should run).

2. Inventory reservation
- Concurrent order placements should not oversell stock.

3. Status machine updates
- Invalid transitions should be blocked at API and DB levels.

4. Bulk operations
- Partial failures should return precise failed IDs and preserve valid records safely.

## Minimal Evidence Bundle per Defect

- Request payload + headers
- Response payload + status code
- DB verification query
- Query output snapshot
- Impact summary (tables, rows, user impact)

## Reference PDF Used

- `All PDF Files/API/Common API test cases.pdf`
