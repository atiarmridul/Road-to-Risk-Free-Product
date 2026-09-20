# API PDF Resource Notes

> **Purpose:** API PDF Resource Notes maps supporting documents to their canonical study notes; it is not a second copy of those notes.


These review notes synthesize the themes of the API resources. Use the canonical API notes for primary study and the linked PDFs for diagrams or additional examples.

## Core review checklist

- Distinguish API, REST, RESTful design, and SOAP.
- Select the correct HTTP method and explain safety and idempotency.
- Validate status, headers, schema, body, response time, and downstream data.
- Cover valid, invalid, boundary, missing, duplicate, and malformed input.
- Test authentication separately from authorization.
- Verify pagination, filtering, sorting, rate limiting, caching, and versioning.
- Check retry behavior, duplicate requests, concurrency, and partial failure.
- Correlate API responses with database or event-state changes.
- Keep secrets outside collections and logs.

## Resource map

| Resource | Best use | Canonical destination |
| --- | --- | --- |
| [API Testing quick reference](<../../../07-resources/API/API%20Testing%20.pdf>) | Terminology and quick revision | [API basics](../fundamentals/api-basics.md) |
| [API Testing Handbook](<../../../07-resources/API/API%20Testing%20Handbook.pdf>) | REST/SOAP and testing overview | [API basics](../fundamentals/api-basics.md) |
| [API interview preparation](<../../../07-resources/API/API%20Testing%20Interview%20Preparation%20.pdf>) | Spoken-question practice | [Interview Q&A](../interview/api-interview-qa.md) |
| [API, REST API, and RESTful API](<../../../07-resources/API/API,%20Rest%20API,%20and%20Restful%20API%20at%20a%20glance!.pdf>) | Visual comparison; OCR required | [API basics](../fundamentals/api-basics.md) |
| [API SDET interview Q&A](<../../../07-resources/API/API-SDETs%20Interview%20Prep%20Q&A.pdf>) | Advanced interview prompts | [Interview Q&A](../interview/api-interview-qa.md) |
| [Common API test cases](<../../../07-resources/API/Common%20API%20test%20cases.pdf>) | Coverage brainstorming | [Advanced API testing](../advanced/advanced-api-testing.md) |
| [Postman Pocket Note](<../../../07-resources/API/Postman%20Pocket%20Note.pdf>) | Postman revision | [Additional questions](../api-complete-guide.md) |
| [Postman guide](../../../07-resources/API/Postman.pdf) | Collections, environments, scripts, and execution | [Additional questions](../api-complete-guide.md) |
| [SOAP vs REST](<../../../07-resources/API/Soap%20Vs%20Rest.pdf>) | Protocol comparison | [API basics](../fundamentals/api-basics.md) |

## Interview prompts derived from the collection

1. How would you test an endpoint when documentation is incomplete?
2. How do you prove that a successful response produced the correct database state?
3. What is the difference between authentication and authorization failures?
4. How would you test an idempotent payment or order operation?
5. When is contract testing more valuable than an end-to-end API test?
6. How do you make Postman or code-based API tests safe for CI/CD?
