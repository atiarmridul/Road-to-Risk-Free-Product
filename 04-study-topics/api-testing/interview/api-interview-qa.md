# API Interview Practice

> **সহজভাবে / In simple words:** API interview scenarios test whether you can investigate data and behavior across system layers.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Good answers explain both the checks you perform and the evidence you collect.


Definitions and protocol reference belong in [API basics](../fundamentals/api-basics.md) and [HTTP status codes](../fundamentals/http-status-codes.md). This file focuses on explaining real testing decisions.

## Experience answer structure

When asked about API testing experience, cover:

1. The product and business flow
2. The services or endpoints you owned
3. Authentication and test-data setup
4. Positive, negative, boundary, permission, and integration coverage
5. Tools used for exploration and repeatable automation
6. Database, event, or downstream validation
7. A defect discovered and its user or business impact
8. How tests ran in CI/CD and how failures were diagnosed

## Scenario questions

### The API returns success but the UI shows old data. How do you investigate?

Trace the request and identifiers across browser, gateway, service, cache, database, and response. Check whether the UI issued the expected request, whether data was committed, whether cache invalidation occurred, and whether eventual consistency is expected. Compare timestamps and correlation IDs before deciding which layer is defective.

### How would you test a payment-creation endpoint?

Cover authentication, authorization, amount and currency boundaries, duplicate or concurrent requests, idempotency keys, downstream timeout, retry behavior, partial failure, ledger consistency, sensitive-data handling, audit events, and reconciliation. Verify both the response and durable business state.

### What if API documentation is incomplete?

I collect evidence from consumers, code or schema where available, existing traffic, product rules, and developers. I document assumptions, explore behavior safely, identify ambiguity as a risk, and turn confirmed behavior into an executable contract or maintained specification.

### How do you test authorization?

Build a role-resource-action matrix. Test permitted access, missing credentials, invalid or expired credentials, wrong role, cross-user resource access, tenant isolation, privilege changes, and direct calls that bypass the UI. Verify both response behavior and absence of unauthorized state change.

### How do you validate asynchronous processing?

Verify acknowledgement, correlation identifiers, event or queue state, eventual result, retry and dead-letter behavior, duplicate delivery, ordering assumptions, timeout, observability, and idempotent consumption. Poll a meaningful state with a bounded timeout instead of using a fixed sleep.

### How do you decide what to automate?

Automate stable, repeatable, high-value contract and regression checks at the service layer. Keep exploratory investigation manual. Prioritize critical business rules, permissions, data integrity, and failure behavior rather than maximizing endpoint count.

## Rapid follow-ups

- Explain a defect that UI testing would not have found.
- Compare contract, integration, and end-to-end API tests.
- Explain how you prevent tests from leaking tokens or customer data.
- Describe pagination testing when records change during traversal.
- Explain a safe cleanup strategy for CI test data.
- Describe how you distinguish a service defect from an environment failure.
- Explain the evidence needed before recommending a release block.

## Supporting references

- [Advanced API testing](../advanced/advanced-api-testing.md)
- [Additional API questions](../api-complete-guide.md)
- [PDF-derived review notes](../resources/pdf-resource-notes.md)
