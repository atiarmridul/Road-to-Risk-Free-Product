# API Security, Design, and Interview Practice

## 🔒 Security Testing

### Common security checks

- Unauthorized access
- Token expiration
- SQL Injection
- Sensitive data exposure
- HTTPS validation
বাংলা:
- Security testing sensitive data protect করতে সাহায্য করে
---
### 🧪 Mock Server & Webhook Testing
#### Mock Server
Backend ready না থাকলেও fake API দিয়ে testing করা যায়
#### Webhook Testing
এক system event trigger করলে অন্য system automatically call পায়
Example:
- Payment success webhook
বাংলা:
- Third-party integration testing-এ webhook common
---
### 🏗️ API Design & Versioning
#### API Versioning
Example:
- /api/v1/users
- /api/v2/users
সহজভাবে:
- পুরানো client break না করে new feature release করা যায়
#### REST Best Practices
- Meaningful endpoint names
- Proper status code
- Consistent response
- Secure authentication
---
### 🎯 API Interview Questions
#### Common Questions
1. Difference between PUT and PATCH?
2. What is idempotency?
3. Difference between REST and SOAP?
4. What is API chaining?
5. What is schema validation?
6. Difference between authentication and authorization?
7. What is rate limiting?
8. What is contract testing?
9. What is mock server?
10. Explain status codes.
বাংলা:
- Interview answer short + practical হলে ভালো impression পড়ে



### 📊 Status Codes & Error Handling
সহজভাবে:
- 4xx = client side problem
- 5xx = server side problem
Real Life Example:
- Wrong password → 401
- Server crash → 500
---
1. Difference between 4xx and 5xx?
2. Error code, response codes?
