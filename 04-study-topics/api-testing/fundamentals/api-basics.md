# API Basics

> **সহজভাবে / In simple words:** An API is a defined way for software systems to request and exchange information.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Many product behaviors depend on APIs even when users only see a screen.


এই ফাইলে `../api-complete-guide.md` থেকে API fundamentals, examples, and conceptual notes পূর্ণভাবে রাখা হয়েছে (no detail removed)।

## **API Testing:**

1. REST API Protocols:

a. GET

b. POST

c. PUT

d. Patch

e. DELETE

2. What is an API, and why do we use API

3. Difference between Authentication and Authorization

4. Difference between Access Token and Refresh Token during authentication

### 5. What is a collection and environment?
In **Postman**, **collections** and **environments** are essential features used to organize and manage API requests efficiently. Here's an explanation of both:

### 1. **Postman Collection:**

A **Postman collection** is a group of organized API requests that can be executed together. It's used to structure and manage multiple API requests related to a specific project or functionality. You can group endpoints into folders, set up pre-request scripts, and write tests for the responses.

### Key Features of Collections:

- **Grouping API Requests**: You can categorize multiple API requests (e.g., GET, POST, PUT, DELETE) into a single collection, making it easy to manage related requests.

- **Folders**: Collections can contain folders to organize further requests based on functionality (e.g., User APIs, Auth APIs).

- **Test Scripts**: You can define test scripts (JavaScript) for each request to validate the response and check assertions.

- **Pre-request Scripts**: Scripts that run before the request is made (e.g., setting headers or generating authentication tokens).

- **Sharing and Collaboration**: Collections can be shared with teams or exported/imported between Postman instances.

- **Running in Collection Runner**: Collections can be executed in sequence using Postman’s Collection Runner or with **Newman** (Postman’s command-line tool).

### Example of a Collection:

- **Collection Name**: User API
  - **Folder**: Authentication
    - `POST /login`

    - `POST /register`

  - **Folder**: User Management
    - `GET /users`

    - `PUT /users/1`

### 2. **Postman Environment:**

A **Postman environment** is a set of key-value pairs (variables) that you can use in your requests to handle different contexts or settings. It allows you to switch between different configurations, such as development, testing, and production environments, without changing the request details.

### Key Features of Environments:

- **Environment Variables**: Variables like `{{base_url}}` or `{{token}}` can be used in API requests, headers, or scripts, and their values will be substituted dynamically based on the active environment.

- **Multiple Environments**: You can create different environments for different stages or versions of your API (e.g., Development, Staging, Production).

- **Global and Local Variables**: Environment variables are local to the environment, while global variables can be accessed from anywhere.

- **Environment Switching**: When switching from one environment to another (e.g., from `development` to `production`), all variables automatically update across the collection.

### Example of an Environment:

- **Environment Name**: Development
  - `base_url`: `https://dev.api.example.com`

  - `token`: `abc123`

- **Environment Name**: Production
  - `base_url`: `https://api.example.com`

  - `token`: `xyz789`

### How Collections and Environments Work Together:

- When you create requests in a collection, you can use **variables** in URLs, headers, body, or tests like `{{base_url}}/users`. These variables are resolved based on the selected environment.

For example:

- In **Development**, `{{base_url}}` might be `https://dev.api.example.com`.

- In **Production**, `{{base_url}}` might be `https://api.example.com`.

This allows you to run the same collection of requests against different environments without modifying each request manually.

### Example of Using Variables in Postman:

```plain text
GET {{base_url}}/users/1
Headers:
Authorization: Bearer {{token}}
```

Here, `{{base_url}}` and `{{token}}` will be replaced by the values from the currently active environment.

### Variable Priority (Precedence) in Postman:

If the same variable name exists in multiple scopes, Postman uses the value from the highest-priority scope.

Highest to lowest priority:

1. **Local** (`pm.variables.set`)
2. **Data** (CSV/JSON file used in Collection Runner/Newman)
3. **Environment**
4. **Collection**
5. **Global**

Example:

- If `token` exists in both **Environment** and **Global**, Postman uses the **Environment** value.
- If `token` is also set as a **Local** variable in a pre-request script, the **Local** value is used for that request execution.

### Benefits of Collections and Environments:

- **Modular Organization**: Keeps your API requests organized and manageable.

- **Reusable Requests**: Easily switch environments without changing the actual API requests.

- **Collaboration**: Share collections and environments with your team for consistent testing and debugging.

- **Automation**: Run the same collection of tests in different environments as part of automated testing.

Would you like help with setting up or using collections and environments in Postman?

> 6. What is the base URL, path parameter, and query parameter?

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/dc3a14a9-af23-4005-8beb-87a36419cfba/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCYFFYTZ%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T115947Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIHkiTapjGND9q5kIbSr49fPJNvhjfLFLveQ8Y0JyXQcUAiAHMvflr3WzrqvuazPkC3FLVo8sZNGP8M10552ReNYgHSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMKxtVToTwLxFAYmkiKtwDT6CWPRzNYnA1OZ9STyfk%2F%2BT525YR7a8PqrDsa%2FLeBRH6Xodz%2FxDuY3yk3ujMjTVhuRPJEqJDpv4JWVDZBGMxRuvdv9HB2Y29e2d2HZfGgIq%2B3ocKYJgNJUM8mkeVPInVWE75xlDOcdnhtEfjDJlC4fRHiFmQdnIUfW2XO3%2FP7UGUfSAHLzVaq6FrjN9tTBZTog1muY2mCWDbWwOfF6b8kdS%2BshTSGAKmULw26qzSYk28HVppcfm0clxqcaCgH6kjo5bm6jVk8p1Cln5%2Fnqvh1iOuJsvFI%2FC7j9uK8ISHfmpr8hFzowLneTX1jC5sfUjJDPwQSAjf45%2B%2FHgBuOYGG08eRVOwEw0JihGuit4FVcGdykvzCC8MX4EdJAvSl8yweF7%2FBcJHQHN30sWZEshY2c8eKNurJSM9G2cVubGXr1ADRMHg02u%2Ba441AgNgL8%2F14SbqrI8c3Q7nxoILERcEaU7Az53jurcVa5d96V6dsEWqQK9hMA7%2Fr8poo7v0sr7qDBTjlhYUiZ5H5q9l5BZ3LttIsr0HMmu91Er5vIy211S9QFsVvo08N6KApuDib8%2FqVZJvLTd3BUtRUBWl9QshqpCWGDtUPkV%2BiuKuohVFj%2B8aYePRJExfx1xeD27AwlYfSzwY6pgECsllUvJaAGcA%2BjdY9m4eKsy2MB75fbg3wUo37GQ5UMDRq2s5zDjJX0ffzbVIxajqE9Cx%2FWWFlmZ1yg%2BQLJ1vMeO3X5q0aurIAxkKr0Gq03fFZYlCZsoCKW1hA2vd4pUqRZeATPI35cbs01KYOIEXrLuXnS0vA9BfJCt21BYcLYC1q08q8RvQf0FNqzu0MnCX%2BkCbcmcym4RGN0BQ1tTwddy4yEpi9&X-Amz-Signature=790ef29947b176ecfbabf38763cbb060320851e7bb78d7d1c7de4a2d310027fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

**Difference between the header and the body? Describe some header type and body types which are**

**commonly used**

In the context of **HTTP requests** (commonly used in API testing), the **header** and **body** serve different purposes and contain different types of information:

### 1. **HTTP Header vs. HTTP Body**:

### **HTTP Header**:

- The **header** contains **metadata** about the request or response. This includes information such as how the request is formatted, what kind of content is being sent or expected, authentication tokens, and more.

- Headers do not contain the actual data being sent to or retrieved from the server (that goes into the body).

### Common Types of HTTP Headers:

1. **Content-Type**: Specifies the media type (or format) of the request body (if present) so that the server knows how to interpret the data.

- Example: `Content-Type: application/json`

1. **Authorization**: Used to send credentials for authentication, such as tokens or API keys.

- Example: `Authorization: Bearer <token>`

1. **Accept**: Indicates what kind of content the client can process in the response.

- Example: `Accept: application/json`

1. **User-Agent**: Provides information about the client (e.g., browser, operating system) making the request.

- Example: `User-Agent: Mozilla/5.0 (Windows NT 10.0)`

1. **Cache-Control**: Directs caching behavior for the request/response.

- Example: `Cache-Control: no-cache`

1. **Content-Length**: Indicates the size (in bytes) of the request or response body.

- Example: `Content-Length: 348`

1. **Host**: Specifies the domain name of the server (useful when multiple domains are served from the same server).

- Example: `Host: api.example.com`

### **HTTP Body**:

- The **body** (or payload) contains the **actual data** being sent in the request (for methods like POST or PUT) or received in the response (like in GET requests).

- The body can contain different types of data, such as form data, JSON, XML, etc., and is used when the client is sending or receiving more complex data than what can fit in headers.

### Common Body Types:

1. **JSON (JavaScript Object Notation)**:

- A widely-used format for API requests and responses. It is lightweight and easy to parse for both humans and machines.

- Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

1. **Form Data**:

- Used when submitting forms in web applications. Can be sent in two ways:
  - **`application/x-www-form-urlencoded`**: Data is sent in key-value pairs, URL-encoded, like a query string.
    - Example: `name=John+Doe&email=john%40example.com`

  - **`multipart/form-data`**: Used for sending large amounts of data, such as files.
    - Example: Sending an image file with a form:

```plain text
------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="image.jpg"
Content-Type: image/jpeg
```

1. **XML (eXtensible Markup Language)**:

- Similar to JSON, but with stricter rules. Often used in older systems or specific industries (like SOAP APIs).

- Example:

```xml
<user>
  <name>John Doe</name>
  <email>john@example.com</email>
</user>
```

1. **Plain Text**:

- The body can contain simple plain text for APIs that expect raw text or commands.

- Example:

```plain text
Hello, this is plain text content.
```

1. **Binary Data**:

- Used to send non-text files like images, audio, video, or any other binary data format.

- Example: Sending a binary image file in a POST request.

### 2. **Comparison Between Header and Body**:

### 3. **Examples of HTTP Headers and Body in API Requests**:

### Example of a **POST** request with headers and body (JSON):

```plain text
POST /login HTTP/1.1
Host: api.example.com
Authorization: Bearer abc123
Content-Type: application/json
Content-Length: 58

{
  "username": "johndoe",
  "password": "password123"
}
```

- **Headers**: The request has headers for `Authorization` (for authentication), `Content-Type` (to specify JSON format), and `Content-Length`.

- **Body**: The body contains the actual data being sent in the request — username and password in JSON format.

### Example of a **GET** request with headers and no body:

```plain text
GET /users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer abc123
```

- **Headers**: The request has headers like `Accept` (indicating the expected response format) and `Authorization` (for authentication).

- **Body**: No body is present in a GET request, as it is generally used to retrieve data rather than send it.

### Conclusion:

- **Headers** are used to send metadata like authentication, content type, and client info.

- **Body** contains the actual data that you want to send (for requests like POST/PUT) or the response data returned by the API.

- Headers and body together make up the full structure of an HTTP request or response, working in tandem to deliver data between clients and servers.

Would you like more details on any specific header or body format?

#### 8. What is pre-request script and tests? What do we do in pre-request scripts and tests?

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/cd3e1567-639a-441d-ad23-8104a5254594/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY6F3NRJ%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T115948Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIHESQ5XssSk9tuWiBXRDnfoVzZzhHXFwfHEEHF9aC0viAiEAtJX49pM%2BrzVU%2F3CGhgZUcPH%2BqdnBLqM5jd93qACkIjEq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDKcg71EqZed6ZvS%2FRCrcAxYT%2BGKUD3y1owNOw4T3sGhbZvZ7%2F8umlaUHlzxojINnNPWuQXGi%2FKE989I8QjlHfUEJnW1cRjK7bJ8CzXs65TLMbBJWjZm9T4bgtD%2FHaBbflnse9hAZtsK9SOJl7ny5pegZkUL5jlqa7Q9g1bb81liUnV1U%2FQ2oICri4udHsoIxw%2FynsbIXpPB8ZaD0UKLq1f9dBMQqt9KZUCKePxukYbnNnaNCaHIMtdYLavkkM92qJOWH%2Fh%2BF3R10VwBJvwIbtvWYtldbIaDXnYPp%2BC4pceM%2Fi14aEMulIPZPBnOGMB1b0m9PYTlCPvguuajDZdFPnFafSpGp7TnNP4Wx%2BNNaaZvX1VEOTnC4PO7mSeBppNu%2FE3t4SsnrxVvCV4OZ%2BG9WyWm8IQKOvOJvdvuzC97WjmAnL1v4EV%2BpM6ZTb0jLIBKKHzDzLi2zsQaKB78aArpJBjGuZC%2BngzQ08TfR8FGxZnWjjtWiVXB2sPzvRguQrn43vMna%2By4SPwgZDhA7LOg3IbfjRsx9%2BEFbqyfLs1B5dRUnMfRotrq4%2FT6fDvp88Vvrlm%2FAIL40cHrMha7nvuBtGsKa6BuCm%2F1eJA3ELSgbG6COwnKGCzYz1puxuQUHCIKYMie73zdYYrMHI9sWMNCp0s8GOqUBrQ5G%2Fc%2BN0kqmGUejgqUczGCvXCqfWgqbGCLVcBd0q01I2bZnFoorQ8HT0QsyCOwK5BvFUkpvbv%2FzeoXyqk%2FdwuG53FU2Z35iZDEhx6Lmhts36TXDlMeB%2BgVC0OTIsW8XobBwKWmc%2BtoBd0iPUgidwHDtZM469OrozaGdjfCQJa2Dn7ORmFKhhdga264O7K9yeh9kH%2Bt6bnTHFLczdct3qQGPXamu&X-Amz-Signature=99e97f9362cabce8502504b2787af9c83195a0448746a589c2d48329a48d9fa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

10. What is test runner?

11. What is curl?

12. Difference between 4xx and 5xx?

13. Error code, response codes?

> 💡 **API Design Best Practices:**

- Use clear, versioned endpoints (e.g., /api/v2/articles)

- Implement filtering, sorting, and pagination

- Utilize proper authentication (e.g., Bearer tokens)

- Choose appropriate content types (application/json is widely preferred)

Remember: A well-designed API is self-documenting and intuitive to use.

> 💡 **The 8 API Types You Need to Know:**

- REST: The gold standard for building scalable web services.

- SOAP: XML-based messaging over HTTP/HTTPS, still crucial in enterprise environments.

- GraphQL: Query language for APIs, offering precise data retrieval.

- AMQP: Open protocol for message-oriented middleware.

- MQTT: Lightweight messaging for IoT devices.

- WebSocket: Enabling real-time, bidirectional communication.

- gRPC: High-performance framework for remote procedure calls.

- Webhook: Event-driven architecture for real-time updates.

> 💡 **What is SOAP API? Why do we use SOAP API in some cases? What is SOAP API format?**

**SOAP API (Simple Object Access Protocol API)** is a protocol used for exchanging structured information in web services, relying on XML (Extensible Markup Language). It defines a set of rules for structuring messages that communicate between systems, often across the internet. SOAP is often used in enterprise-level applications and has strict rules regarding how messages should be formatted and transmitted.

### Key Features of SOAP API:

1. **Protocol-based**: It is a protocol with built-in rules that ensure security and consistency.

1. **XML-based**: SOAP messages are always in XML format, ensuring platform independence.

1. **Transport-independent**: SOAP can work over various protocols, such as HTTP, SMTP, TCP, or even JMS.

1. **Built-in error handling**: It has a specific structure for fault messages, making error handling more standardized.

1. **WSDL**: SOAP APIs often use WSDL (Web Services Description Language) to define the API's operations and data structures, offering a formal contract between client and server.

### Why use SOAP API:

1. **Enterprise Security**: SOAP is used when high security is needed, as it supports WS-Security, offering encryption and digital signatures.

1. **Transactional reliability**: It is ideal for complex, stateful operations, especially those requiring ACID (Atomicity, Consistency, Isolation, Durability) properties.

1. **Extensibility**: SOAP allows for more complex operations like messaging over different transport layers, support for distributed computing, and integration with enterprise systems.

1. **Standardized Error Handling**: SOAP has a standardized error structure, making it easier to handle errors consistently.

### SOAP API Format:

SOAP API messages are always formatted as XML documents and follow this structure:

1. **Envelope**: The root element that defines the message and indicates it is a SOAP message.

1. **Header** (optional): Contains information such as authentication, session management, or routing.

1. **Body**: Contains the actual data or request.

1. **Fault** (optional): A section for error handling if something goes wrong with the message processing.

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

- The `Body` contains a `GetPrice` request for the stock price of "IBM".

SOAP’s emphasis on reliability and security makes it suitable for specific use cases, especially in industries like finance, healthcare, and telecommunications.
