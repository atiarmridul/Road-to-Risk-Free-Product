# অ্যাডভান্সড API টেস্টিং

> **সহজভাবে / In simple words:** Advanced API testing checks business rules, permissions, reliability, contracts, and failure behavior.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Checking only a successful response misses many high-impact service risks.


## Senior QA Coverage Model

API testing শুধু status code check না; contract, security, reliability, এবং backward compatibility একসাথে verify করতে হবে।

---

## Coverage Pillars

- Functional: business rules ঠিক আছে কি না
- Contract: schema drift হচ্ছে কি না
- Authorization: own resource vs other user resource isolation
- Idempotency: retry-তে duplicate side effect হচ্ছে কি না
- Resilience: timeout, retry, partial dependency failure handling
- Observability: error code, correlation id, audit log consistency

---

## High-Value Scenario

1. Backward Compatibility

- old mobile app version current API-তে কাজ করছে কি না

2. Idempotent Payment Callback

- same callback 2-3 বার এলে একবারই ledger write হওয়া উচিত

3. Partial Failure Safety

- downstream fail করলে fallback/compensation সঠিকভাবে হয় কি না

4. Auth Boundary

- user A যেন user B resource দেখতে/পরিবর্তন করতে না পারে

5. Pagination Integrity

- duplicate/missing item হচ্ছে কি না

---

## Example: JavaScript (Jest + Supertest)

```javascript
it("prevents cross-tenant access", async () => {
  const res = await request(app)
    .get("/v1/tenants/t2/orders/o-100")
    .set("Authorization", `Bearer ${tenant1Token}`);

  expect([403, 404]).toContain(res.status);
});

it("returns stable error model", async () => {
  const res = await request(app).post("/v1/orders").send({});

  expect(res.status).toBe(422);
  expect(res.body).toMatchObject({
    code: expect.any(String),
    message: expect.any(String),
    requestId: expect.any(String),
  });
});
```

## Example: PHP (Pest/Laravel)

```php
it('handles payment callback idempotently', function () {
    $payload = ['txn_id' => 'TXN-1001', 'status' => 'success'];

    $this->postJson('/api/payment/callback', $payload)->assertOk();
    $this->postJson('/api/payment/callback', $payload)->assertOk();

    $this->assertDatabaseCount('payments', 1);
});
```

---

## Contract Testing Pattern

- Provider OpenAPI spec publish করবে
- Consumer PR-এ schema + compatibility check চালাবে
- breaking change detect হলে build fail হবে

---

## CI Layering

1. PR Gate

- auth + contract + critical negative tests

2. Main Branch

- full API regression + retry + pagination boundary tests

3. Nightly

- fault injection tests (timeout, slow dependency, intermittent 500)

---

## Release Exit Criteria (API)

- critical API pass rate = 100%
- unresolved sev-1/sev-2 API defect = 0
- unapproved contract breaking change = 0
