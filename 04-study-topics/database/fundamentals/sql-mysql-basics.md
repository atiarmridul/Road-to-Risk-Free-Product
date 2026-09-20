# SQL and MySQL Basics for QA Validation

> **সহজভাবে / In simple words:** SQL is a language used to read and change information stored in relational databases.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** QA uses safe queries to verify data, relationships, and business rules.


## SQL Commands QA Uses Most

- `SELECT` for verification
- `JOIN` for cross-table validation
- `GROUP BY` for duplicate/data-quality checks
- `COUNT` for volume checks
- `EXISTS` for presence/absence checks

## Validation Query Patterns

### 1) Verify create action

```sql
SELECT id, email, status, created_at
FROM users
WHERE email = 'test.user@example.com';
```

### 2) Verify only intended fields changed

```sql
SELECT order_id, status, total_amount, updated_at
FROM orders
WHERE order_id = 1001;
```

### 3) Detect duplicates

```sql
SELECT transaction_ref, COUNT(*) AS cnt
FROM payments
GROUP BY transaction_ref
HAVING COUNT(*) > 1;
```

### 4) Detect orphan records

```sql
SELECT oi.order_id
FROM order_items oi
LEFT JOIN orders o ON o.id = oi.order_id
WHERE o.id IS NULL;
```

### 5) Soft delete validation

```sql
SELECT id, is_deleted, deleted_at
FROM customers
WHERE id = 55;
```

### 6) Aggregate reconciliation

```sql
SELECT o.id,
       o.total_amount,
       SUM(oi.quantity * oi.unit_price) AS computed_total
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = 1001
GROUP BY o.id, o.total_amount;
```

### 7) Idempotency check after retry

```sql
SELECT request_id, COUNT(*) AS cnt
FROM payout_requests
WHERE request_id = 'REQ-2026-00077'
GROUP BY request_id;
```

## MySQL-Specific Tips for QA

- Use `LIMIT` for safe previews.
- Use `ORDER BY created_at DESC` to inspect latest records.
- Use transactions in local test setup where allowed.
- Prefer `EXPLAIN` on slow queries during triage.

## Query Hygiene

- Keep verification queries in test case evidence.
- Parameterize IDs/emails per test run.
- Avoid destructive statements in shared environments.

## Reference PDF Used

- `All PDF Files/Manual Testing Concepts/MySQL Cheat Sheet.pdf`
