# API Fundamentals: Complete Notes

## Api Related Questions: complete Notion material

> Notion deep dive: https://app.notion.com/p/fdbc292a4d264d25868338b6267842e5
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

1. Explain the API testing you’ve done in your previous projects and the tools you used for API testing.
2. What are the different types of web service implementations other than SOAP?
3. What is the difference between SOAP vs REST?
4. In which option is REST response cached? GET
5. What are the different types of methods present in REST?
6. What are the different web service response codes?
7. Do you know the usage of these response codes?
8. Which tools are used for testing web services?
<page url="https://app.notion.com/p/33395efd300c4dc48fcbcddaf7a23e1c">HTTP Status Codes</page>
![]([Notion-hosted image omitted because its URL expires])
### 📘 API Testing Learning Roadmap
#### 🌐 Group 1: API Fundamentals
### 🌐 API Testing Fundamentals
সহজভাবে:
- API হচ্ছে দুইটি system-এর মধ্যে communication bridge
- Frontend এবং backend data exchange করার জন্য API use হয়
- Modern web/mobile app প্রায় সব জায়গায় API ব্যবহার করে
শিখতে হবে:
1. HTTP Methods
2. Status Codes
3. Authentication
4. Request/Response
5. Postman
6. API Automation
---
### API Testing (API Testing এর মৌলিক ধারণা)
#### API কী?
API (Application Programming Interface) হলো দুইটি system এর মধ্যে communication করার মাধ্যম।
#### API Testing কী?
API Testing এর মাধ্যমে backend functionality, response, authentication এবং data validation পরীক্ষা করা হয়।
---
#### 🔄 Group 2: HTTP Methods & CRUD Operations
### 🔄 HTTP Methods
সহজভাবে:
- HTTP method বলে API কী কাজ করবে
- CRUD operation-এর সাথে closely related
#### Common HTTP Methods
- GET → Data retrieve করা
- POST → নতুন data create করা
- PUT → Existing data update করা
- PATCH → Partial update করা
- DELETE → Data remove করা
#### কেন API Testing গুরুত্বপূর্ণ?
- Faster execution
- UI ছাড়া backend validation
- Better reliability
- Early bug detection
---
#### **API Testing:**
1. REST API Protocols:
	a. GET
	b. POST
	c. PUT
	d. Patch
	e. DELETE
2. What is an API, and why do we use API
3. Difference between Authentication and Authorization
4. Difference between Access Token and Refresh Token during authentication
---
#### 🧰 Group 3: Postman Basics & Environment
<callout color="gray_bg">
	# 🧰 Postman Concepts
	সহজভাবে:
	- Postman API testing-এর সবচেয়ে popular tool-এর একটি
	- Request send, validation এবং automation করা যায়
	বাংলা নোট:
	- Real project-এ Postman খুব common
	---
	### 5. What is a collection and environment?
</callout>
In **Postman**, **collections** and **environments** are essential features used to organize and manage API requests efficiently. Here's an explanation of both:
##### 1. Postman Collection (কলেকশন কী?)
Collection হলো related API request গুলোকে group করে রাখার একটি উপায়।
ব্যবহার:
- API organize করা
- Request reuse করা
- Automated execution
- Team collaboration
##### 1. **Postman Collection:**
A **Postman collection** is a group of organized API requests that can be executed together. It's used to structure and manage multiple API requests related to a specific project or functionality. You can group endpoints into folders, set up pre-request scripts, and write tests for the responses.
##### Key Features of Collections:
- **Grouping API Requests**: You can categorize multiple API requests (e.g., GET, POST, PUT, DELETE) into a single collection, making it easy to manage related requests.
- **Folders**: Collections can contain folders to organize further requests based on functionality (e.g., User APIs, Auth APIs).
- **Test Scripts**: You can define test scripts (JavaScript) for each request to validate the response and check assertions.
- **Pre-request Scripts**: Scripts that run before the request is made (e.g., setting headers or generating authentication tokens).
- **Sharing and Collaboration**: Collections can be shared with teams or exported/imported between Postman instances.
- **Running in Collection Runner**: Collections can be executed in sequence using Postman’s Collection Runner or with **Newman** (Postman’s command-line tool).
##### Example of a Collection:
- **Collection Name**: User API
	- **Folder**: Authentication
		- `POST /login`
		- `POST /register`
	- **Folder**: User Management
		- `GET /users`
		- `PUT /users/1`
##### 2. Postman Environment (Environment কী?)
Environment ব্যবহার করা হয় বিভিন্ন configuration manage করার জন্য। যেমন:
- Development
- Staging
- Production
এখানে variable ব্যবহার করা হয় যেমন:
- \{\{base_url\}\}
- \{\{token\}\}
##### 2. **Postman Environment:**
A **Postman environment** is a set of key-value pairs (variables) that you can use in your requests to handle different contexts or settings. It allows you to switch between different configurations, such as development, testing, and production environments, without changing the request details.
##### Key Features of Environments:
- **Environment Variables**: Variables like `{{base_url}}` or `{{token}}` can be used in API requests, headers, or scripts, and their values will be substituted dynamically based on the active environment.
- **Multiple Environments**: You can create different environments for different stages or versions of your API (e.g., Development, Staging, Production).
- **Global and Local Variables**: Environment variables are local to the environment, while global variables can be accessed from anywhere.
- **Environment Switching**: When switching from one environment to another (e.g., from `development` to `production`), all variables automatically update across the collection.
##### Example of an Environment:
- **Environment Name**: Development
	- `base_url`: `https://dev.api.example.com`
	- `token`: `abc123`
- **Environment Name**: Production
	- `base_url`: `https://api.example.com`
	- `token`: `xyz789`
##### How Collections and Environments Work Together:
- When you create requests in a collection, you can use **variables** in URLs, headers, body, or tests like `{{base_url}}/users`. These variables are resolved based on the selected environment.
For example:
- In **Development**, `{{base_url}}` might be `https://dev.api.example.com`.
- In **Production**, `{{base_url}}` might be `https://api.example.com`.
This allows you to run the same collection of requests against different environments without modifying each request manually.
##### Example of Using Variables in Postman:
```plain text
GET {{base_url}}/users/1
Headers:
Authorization: Bearer {{token}}

```
Here, `{{base_url}}` and `{{token}}` will be replaced by the values from the currently active environment.
##### Benefits of Collections and Environments:
- **Modular Organization**: Keeps your API requests organized and manageable.
- **Reusable Requests**: Easily switch environments without changing the actual API requests.
- **Collaboration**: Share collections and environments with your team for consistent testing and debugging.
- **Automation**: Run the same collection of tests in different environments as part of automated testing.
Would you like help with setting up or using collections and environments in Postman?




<callout color="gray_bg">
	1. What is the base URL, path parameter, and query parameter?
</callout>
![]([Notion-hosted image omitted because its URL expires])





---
#### 📦 Group 4: Request, Response & Payload Structure
### 📦 Request Structure & API Payload
সহজভাবে:
- API request-এর ভিতরে header এবং body থাকে
- Header = metadata
- Body = actual data
---
### Difference Between Header and Body (Header ও Body এর পার্থক্য)
Header এ metadata থাকে এবং Body তে actual payload/data থাকে।
Example:
- Header → Authentication token
- Body → Username/password data
**Difference between the header and the body? Describe some header type and body types which are**
**commonly used**
In the context of **HTTP requests** (commonly used in API testing), the **header** and **body** serve different purposes and contain different types of information:
#### 1. HTTP header vs. HTTP body

##### HTTP header
- The **header** contains **metadata** about the request or response. This includes information such as how the request is formatted, what kind of content is being sent or expected, authentication tokens, and more.
- Headers do not contain the actual data being sent to or retrieved from the server (that goes into the body).
##### Common Types of HTTP Headers:
1. **Content-Type**: Specifies the media type (or format) of the request body (if present) so that the server knows how to interpret the data.
	- Example: `Content-Type: application/json`
2. **Authorization**: Used to send credentials for authentication, such as tokens or API keys.
	- Example: `Authorization: Bearer <token>`
3. **Accept**: Indicates what kind of content the client can process in the response.
	- Example: `Accept: application/json`
4. **User-Agent**: Provides information about the client (e.g., browser, operating system) making the request.
	- Example: `User-Agent: Mozilla/5.0 (Windows NT 10.0)`
5. **Cache-Control**: Directs caching behavior for the request/response.
	- Example: `Cache-Control: no-cache`
6. **Content-Length**: Indicates the size (in bytes) of the request or response body.
	- Example: `Content-Length: 348`
7. **Host**: Specifies the domain name of the server (useful when multiple domains are served from the same server).
	- Example: `Host: api.example.com`
##### **HTTP Body**:
- The **body** (or payload) contains the **actual data** being sent in the request (for methods like POST or PUT) or received in the response (like in GET requests).
- The body can contain different types of data, such as form data, JSON, XML, etc., and is used when the client is sending or receiving more complex data than what can fit in headers.
##### Common Body Types:
1. **JSON (JavaScript Object Notation)**:
	- A widely-used format for API requests and responses. It is lightweight and easy to parse for both humans and machines.
	- Example:
		```json
{
  "name": "John Doe",
  "email": "[email redacted]"
}

		```
2. **Form Data**:
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
3. **XML (eXtensible Markup Language)**:
	- Similar to JSON, but with stricter rules. Often used in older systems or specific industries (like SOAP APIs).
	- Example:
		```xml
<user>
  <name>John Doe</name>
  <email>[email redacted]</email>
</user>

		```
4. **Plain Text**:
	- The body can contain simple plain text for APIs that expect raw text or commands.
	- Example:
		```plain text
Hello, this is plain text content.

		```
5. **Binary Data**:
	- Used to send non-text files like images, audio, video, or any other binary data format.
	- Example: Sending a binary image file in a POST request.
##### 2. **Comparison Between Header and Body**:
<table>
<tr>
<td>Aspect</td>
<td>Header</td>
<td>Body</td>
</tr>
<tr>
<td>**Purpose**</td>
<td>Contains metadata about the request/response</td>
<td>Contains the actual data (payload) being sent or received</td>
</tr>
<tr>
<td>**Common Data**</td>
<td>Content-Type, Authorization, Cache-Control</td>
<td>JSON, XML, Form Data, Plain Text, Binary Data</td>
</tr>
<tr>
<td>**Used In**</td>
<td>Every HTTP request or response</td>
<td>Mainly used in POST, PUT, PATCH requests, sometimes in responses</td>
</tr>
<tr>
<td>**Size Limit**</td>
<td>Typically small (metadata)</td>
<td>Can be large depending on the request data (e.g., file uploads)</td>
</tr>
</table>
##### 3. **Examples of HTTP Headers and Body in API Requests**:
##### Example of a **POST** request with headers and body (JSON):
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
##### Example of a **GET** request with headers and no body:
```plain text
GET /users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer abc123

```
- **Headers**: The request has headers like `Accept` (indicating the expected response format) and `Authorization` (for authentication).
- **Body**: No body is present in a GET request, as it is generally used to retrieve data rather than send it.
##### Conclusion:
- **Headers** are used to send metadata like authentication, content type, and client info.
- **Body** contains the actual data that you want to send (for requests like POST/PUT) or the response data returned by the API.
- Headers and body together make up the full structure of an HTTP request or response, working in tandem to deliver data between clients and servers.
Would you like more details on any specific header or body format?


<callout color="gray_bg">
	### 8. What is pre-request script and tests? What do we do in pre-request scripts and tests?
</callout>
![]([Notion-hosted image omitted because its URL expires])


---
#### ⚙️ Group 5: API Automation & Tools
