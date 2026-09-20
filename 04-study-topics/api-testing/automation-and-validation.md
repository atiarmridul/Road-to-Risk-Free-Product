# API Automation and Validation

## ⚙️ API Automation & Tools

### 📄 SOAP API Concepts

#### SOAP কী?
- SOAP = Simple Object Access Protocol
- XML-based protocol
- Enterprise system-এ বেশি দেখা যায়
#### SOAP Structure
```xml
<Envelope>
   <Header>
   </Header>
   <Body>
   </Body>
</Envelope>
```
##### Envelope
পুরো request wrapper
##### Header
Authentication/data info
##### Body
Actual request data
বাংলা নোট:
- SOAP বেশি strict
- REST বেশি lightweight
---
#### Common API Testing Tools
- Postman
- Newman
- Supertest
- REST Assured
- Playwright API
- Axios
বাংলা:
- Different team different tool ব্যবহার করে
---
1. What is test runner?
2. What is curl?
#### Curl Example
```bash
curl -X GET https://api.example.com/users
```
#### Newman Example
```bash
newman run collection.json
```
সহজভাবে:
- Postman collection command line থেকে run করা যায়
---
---
#### 📑 Group 6: API Validation & Assertions
### 📑 API Validation & Assertions
#### Common Validations
- Status code validation
- Response body validation
- Header validation
- Schema validation
- Response time validation
#### JSON Schema Validation
সহজভাবে:
- Response expected structure follow করছে কিনা check করা
Example:
```json
{
  "name": "Mridul",
  "age": 25
}
```
বাংলা:
- Frontend break হওয়া কমাতে schema validation গুরুত্বপূর্ণ
---
---
#### 📊 Group 7: Pagination & Performance Concepts
### 📊 Pagination & Rate Limit Testing
#### Pagination Testing
Check করতে হয়:
- Next page works?
- Duplicate data আছে?
- Missing data আছে?
- Total count ঠিক আছে?
#### Rate Limiting
সহজভাবে:
- বেশি request গেলে server limit দেয়
Common response:
- 429 Too Many Requests
বাংলা:
- Rate limit API overload কমাতে সাহায্য করে
---
### 🔁 Retry Mechanism & Idempotency
#### Retry Mechanism
Network fail হলে request retry হয় কিনা check করতে হয়
#### Idempotency
একই request multiple time send করলে same result আসা উচিত
Example:
- DELETE request multiple time safe হওয়া উচিত
বাংলা:
- Payment API testing-এ খুব গুরুত্বপূর্ণ
---
