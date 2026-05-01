# HTTP Status Codes

For every HTTP request, the server returns a status code indicating the processing status of the request. Understanding these status codes will help us design better RESTful web services.

### 1xx Informational

This series of status codes indicates informational content. This means that the request is received, and processing is ongoing. Here are the frequently used informational status codes:

- **100 Continue:** This code indicates that the server has received the request header, and the client can now send the body content. The client first makes a request (with the Expect: 100-continue header) to check whether it can start with a partial request. The server can then respond either with 100 Continue (OK) or 417 Expectation Failed (No), along with an appropriate reason.

- **101 Switching Protocols:** This code indicates that the server is OK for a protocol switch request from the client.

- **102 Processing:** This code is an informational status code used for long-running processing to prevent the client from timing out. This tells the client to wait for the future response, which will have the actual response body.

### 2xx Success

This series of status codes indicates the successful processing of requests. Some of the frequently used status codes in this class are as follows:

- **200 OK:** This code indicates that the request is successful, and the response content is returned to the client as appropriate.

- **201 Created:** This code indicates that the request is successful and a new resource is created.

- **204 No Content:** This code indicates that the request was processed successfully, but there is no return value for it. You may find such status codes in response to the deletion of a resource.

### 3xx Redirection

This series of status codes indicates that the client needs to perform further actions to logically end the request. A frequently used status code in this class is as follows:

- **301 Moved Permanently**

- **302 Found**

- **304 Not Modified:** This status indicates that the resource has not been modified since it was last accessed. This code is returned only when allowed by the client via setting the request headers as If-Modified-Since or If-None-Match. The client can take appropriate action on the basis of this status code.

### 4xx Client Error

This series of status codes indicates an error in processing the request. Some of the frequently used status codes in this class are as follows:

- **400 Bad Request:** This code indicates that the server failed to process the request because of the malformed syntax in the request. The client can try again after correcting the request.

  - You order a burger but forget to tell the cashier what toppings you want. They can’t make your order because they don’t have all the details.

  This is what happens when you send a request to an API but leave out important information.

- **401 Unauthorized:** This code indicates that authentication is required for the resource. The client can try again with appropriate authentication.

  - You try to get into a movie without a ticket. The Doorkeeper stops you and says, You can’t come in without a ticket.

This is like trying to access an API without the right key or password.

- **402 Payment Required**

- **403 Forbidden:** This code indicates that the server is refusing to respond to the request, even if it is valid. If the request is not a HEAD method, the reason will be listed in the body content.

- **404 Not Found:** This code indicates that the requested resource is not found at the location specified in the request.

  - You want to visit a friend, but you accidentally go to the wrong house. No one is there, so you don’t find what you’re looking for.

That’s like a 404 error—the address (or URL) is wrong, so the server can’t find anything.

- **405 Method Not Allowed:** This code indicates that the HTTP method specified in the request is not allowed on the resource identified by the URI.

- **408 Request Timeout:** This code indicates that the client failed to respond within the time window set on the server.

- **409 Conflict:** This code indicates that the request cannot be completed because it conflicts with some rules established on resources, such as a validation failure.

  - You and a friend both try to reserve the same seat at a restaurant at the same time, but the restaurant gets confused and doesn’t know what to do.

  This is like a 409 error when two actions conflict with each other.

(**415 **Unsupported Media Type) Unsupported File

- You try to play a video on an old DVD player, but it doesn’t work because the file type isn’t supported.

This is what happens when you send data in a format the server doesn’t understand.

(**422 P**rocessable Entity) Wrong Format

- You fill out a form, but write your phone number where your name should go. The person reviewing it can’t understand what you mean.

This is like a 422 error when the server gets your request, but can’t process it because the data doesn’t make sense.

(**429 **Too Many Requests) Too Many Requests

- Imagine you keep ringing someone’s doorbell over and over. Eventually, they get annoyed and ask you to stop.

This is what happens when you make too many requests to an API in a short time—the server asks you to slow down.

### 5xx Server Error

This series of status codes indicates server failures while processing a valid request. Here are some of the frequently used status codes in this class:

- **500 Internal Server Error:** This code indicates a generic error message, and it tells that an unexpected error occurred on the server and that the request cannot be fulfilled.

  - You try to place an order online, but the website crashes, and you get an error message.

  This is like a 500 error when the server has a problem it can’t fix.

- **501 Not Implemented:** The server either does not recognize the request method or cannot fulfill the request. Usually, this implies future availability (e.g., a new feature of a web-service API).

- **502 Bad Gateway:** A "502 Bad Gateway" error usually means that one server on the internet received an invalid response from another server it was trying to communicate with. **Reason**: **Server Overload, Server Downtime, Network Issues, DNS Issues, Configuration Errors.**

- **503 Service Unavailable:** This code indicates that the server is currently unable to handle the request due to temporary overload or scheduled maintenance.

  - You go to a store, but it’s closed for cleaning. You’ll have to come back later.

  This is like a 503 error when a server is down for maintenance or too busy to handle your request.

- **504 Gateway Timeout:** This code indicates that the server, acting as a gateway, did not receive a timely response from the upstream server. **Reason**: **Server Overload, Firewall or Security Settings, Network Issues, Upstream Server Delays, Configuration Errors**

  -You call a friend, but their phone is off. You wait and wait, but they never answer, so you hang up. This is like a timeout error when the server takes too long to respond.

- **599 Network Connect Timeout Error**
