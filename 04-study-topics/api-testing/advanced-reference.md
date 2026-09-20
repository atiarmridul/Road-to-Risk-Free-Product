# Advanced API Testing Reference

## 🧠 Advanced API Testingসহজভাবে:
- Senior level API testing শুধু response check না
- Security, stability, retry behavior, contract সব verify করতে হয়
---
### 🧠 Advanced API Testing
#### Senior QA Coverage Model
API testing শুধু status code check না।
Verify করতে হয়:
- Contract
- Security
- Reliability
- Backward compatibility
- Observability
সহজভাবে:
- শুধু 200 status code পেলেই API testing complete না
- Real project-এ data safety এবং business flow verify করাও important
---
#### Coverage Pillars
- Functional → business rules ঠিক আছে কিনা
- Contract → schema change হয়েছে কিনা
- Authorization → user isolation ঠিক আছে কিনা
- Idempotency → duplicate side effect হচ্ছে কিনা
- Resilience → timeout/retry handle হচ্ছে কিনা
- Observability → proper logging/error tracking হচ্ছে কিনা
বাংলা নোট:
- Senior QA mindset-এর জন্য এগুলো খুব important
---
#### High-Value Production Scenarios
##### Backward Compatibility
Old mobile app current API-তে কাজ করছে কিনা।
##### Idempotent Payment Callback
Same callback multiple time এলে duplicate payment হচ্ছে কিনা।
##### Partial Failure Safety
Downstream fail করলে fallback behavior ঠিক আছে কিনা।
##### Auth Boundary
User A যেন User B resource access করতে না পারে।
##### Pagination Integrity
Duplicate বা missing item হচ্ছে কিনা।
---
#### Example: JavaScript (Jest + Supertest)
```javascript
it("prevents cross-tenant access", async () => {
  const res = await request(app)
    .get("/v1/tenants/t2/orders/o-100")
    .set("Authorization", `Bearer ${tenant1Token}`);

  expect([403, 404]).toContain(res.status);
});
```
বাংলা:
- Unauthorized access prevent করা security testing-এর অংশ
---
#### Example: PHP (Pest/Laravel)

See the complete [idempotent payment callback example](advanced/advanced-api-testing.md#example-php-pestlaravel). The important rule is that sending the same callback twice must still create only one payment record.

বাংলা:

- Duplicate callback এলেও payment একবার process হওয়া উচিত।
---
#### Contract Testing Pattern
- Provider OpenAPI spec publish করবে
- Consumer compatibility verify করবে
- Breaking change detect হলে build fail হবে
সহজভাবে:
- Frontend-backend mismatch prevent করতে helpful
---
#### CI Layering
##### PR Gate
- auth tests
- contract tests
- negative tests
##### Main Branch
- full regression
- retry tests
- pagination tests
##### Nightly
- timeout tests
- fault injection
- intermittent failure tests
---
#### Release Exit Criteria
- Critical API pass rate = 100%
- No unresolved sev-1/sev-2 defect
- No unapproved breaking change
বাংলা:
- Production release-এর আগে API stability verify করা হয়
---
### API Design Best Practices (ভালো API Design করার নিয়ম)
<callout icon="💡" color="gray_bg">
	**API Design Best Practices:**
</callout>
- Use clear, versioned endpoints (e.g., /api/v2/articles)
- Implement filtering, sorting, and pagination
- Utilize proper authentication (e.g., Bearer tokens)
- Choose appropriate content types (application/json is widely preferred)
Remember: A well-designed API is self-documenting and intuitive to use.

### Important API Types (গুরুত্বপূর্ণ API Types)
<callout icon="💡" color="gray_bg">
	**The 8 API Types You Need to Know:**
</callout>
- REST: The gold standard for building scalable web services.
- SOAP: XML-based messaging over HTTP/HTTPS, still crucial in enterprise environments.
- GraphQL: Query language for APIs, offering precise data retrieval.
- AMQP: Open protocol for message-oriented middleware.
- MQTT: Lightweight messaging for IoT devices.
- WebSocket: Enabling real-time, bidirectional communication.
- gRPC: High-performance framework for remote procedure calls.
- Webhook: Event-driven architecture for real-time updates.





### SOAP API (SOAP API কী?)
SOAP API সাধারণত enterprise-level application এ ব্যবহার করা হয় যেখানে:
- High security দরকার
- Reliable transaction দরকার
- Strict protocol follow করতে হয়
<callout icon="💡" color="gray_bg">
	**What is SOAP API? Why do we use SOAP API in some cases? What is SOAP API format?**
</callout>

**SOAP API (Simple Object Access Protocol API)** is a protocol used for exchanging structured information in web services, relying on XML (Extensible Markup Language). It defines a set of rules for structuring messages that communicate between systems, often across the internet. SOAP is often used in enterprise-level applications and has strict rules regarding how messages should be formatted and transmitted.
#### Key Features of SOAP API:1. **Protocol-based**: It is a protocol with built-in rules that ensure security and consistency.
2. **XML-based**: SOAP messages are always in XML format, ensuring platform independence.
3. **Transport-independent**: SOAP can work over various protocols, such as HTTP, SMTP, TCP, or even JMS.
4. **Built-in error handling**: It has a specific structure for fault messages, making error handling more standardized.
5. **WSDL**: SOAP APIs often use WSDL (Web Services Description Language) to define the API's operations and data structures, offering a formal contract between client and server.
##### Why use SOAP API:
1. **Enterprise Security**: SOAP is used when high security is needed, as it supports WS-Security, offering encryption and digital signatures.
2. **Transactional reliability**: It is ideal for complex, stateful operations, especially those requiring ACID (Atomicity, Consistency, Isolation, Durability) properties.
3. **Extensibility**: SOAP allows for more complex operations like messaging over different transport layers, support for distributed computing, and integration with enterprise systems.
4. **Standardized Error Handling**: SOAP has a standardized error structure, making it easier to handle errors consistently.
##### SOAP API Format:
SOAP API messages are always formatted as XML documents and follow this structure:
1. **Envelope**: The root element that defines the message and indicates it is a SOAP message.
2. **Header** (optional): Contains information such as authentication, session management, or routing.
3. **Body**: Contains the actual data or request.
4. **Fault** (optional): A section for error handling if something goes wrong with the message processing.
Here's an example of a simple SOAP request:
```xml
<soap:Envelope xmlns:soap="<http://schemas.xmlsoap.org/soap/envelope/>">
   <soap:Header/>
   <soap:Body>
      <m:GetPrice xmlns:m="<http://www.example.org/stock>">
         <m:StockName>IBM</m:StockName>
      </m:GetPrice>
   </soap:Body>
</soap:Envelope>

```
In this example:
- The `Envelope` encapsulates the message.
- The `Body` contains a `GetPrice` Request for the stock price of "IBM".
SOAP’s emphasis on reliability and security makes it suitable for specific use cases, especially in industries like finance, healthcare, and telecommunications.

</details>
