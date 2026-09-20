# JMeter Overview

> **Focus:** JMeter Overview explains one specific part of performance engineering and how a QA engineer applies it.


## Performance Testing

Performance testing checks application stability and response time under load.

## Load Testing

Load testing validates behavior under expected load (equal to or below designed user volume).

Example:
- If system is designed for 100 users with <= 3s response time, run with <= 100 users and confirm SLA.

## Stress Testing

Stress testing validates behavior beyond expected load to identify the breaking point and recovery behavior.

Example:
- If system is designed for 1000 users, test with 1100/1200/1300 users.

## Endurance (Soak) Testing

Endurance testing applies sustained load for a long period to detect resource leaks and performance degradation.

Focus:
- Trend of response time over time
- Error rate growth
- Memory/CPU growth

## JMeter in QA

JMeter is commonly used by QA for:
- API and web performance testing
- Baseline vs. release comparison
- SLA validation before production release

---

## Jmeter: complete Notion material

> Notion deep dive: https://app.notion.com/p/02cfb561876c43b3bdbde4b6e8b10e6f
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

> **Performance Testing**

Performance testing is the testing of an application’s stability and response time by applying load.
The word stability means the ability of the application to withstand in the presence of load. Response time is how quickly an application is available to users. Performance testing is done with the help of tools. Loader.IO, JMeter, LoadRunner, etc. are good tools available in the market.

> **Load  Testing**
Load testing is the testing of an application’s stability and response time by applying load, which is equal to or less than the designed number of users for an application.
<br>• For example, if your application handles 100 users at a time with a response<br>time of 3 seconds, then load testing can be done by applying a load of a<br>maximum of 100 or less than 100 users. The goal is to verify that the<br>application is responding within 3 seconds for all the users.
Is server behaving expected while giving the expected load is called load testing. 

> **Stress Testing**
Stress testing is testing an application’s stability and response time by applying load, which is more than the designed number of users for an application.
<br>• For example, if your application handles 1000 users at a time with a response time of 4 seconds, then stress testing can be done by applying a load of more than 1000 users. Test the application with 1100,1200,1300 users and notice the response time. The goal is to verify the stability of an application under stress.

> **Endurance Testing**

Endurance testing is testing an application’s stability and response time by applying load continuously for a longer period to verify that the application is working fine.
<br>• For example, car companies soak testing to verify that users can drive cars continuously for hours without any problem.

the average response time and deviation should be considered. need to check about heavy load for a certain time is the servers deviation is getting bigger or not. It should not get much higher. 
![]([Notion-hosted image omitted because its URL expires])
### JMeter command line
**To start the test**: jmeter -n -t testName.jmx  -l report\\testName.jtl<br>T**o generate html report:** jmeter -g report\\testName.jtl  -o report\\testName.html

#### Example Scenario: Web Page LoadLet's say a user is trying to load a webpage by clicking a link.
1. **Latency**:
	- When the user clicks the link, a request is sent to the server hosting the webpage.
	- **Latency** is measured as the time it takes for this request to travel to the server and for the server's response to come back to the user.
	- **Example**: If it takes 50 milliseconds for the request to reach the server and another 50 milliseconds for the response to come back, the total latency is **100 milliseconds**.
2. **Response Time**:
	- After the request reaches the server, the server processes it. Let’s say the server takes **200 milliseconds** to render the webpage (this includes database queries, processing logic, etc.).
	- The total **response time** is the sum of the latency and the server processing time.
	- **Example Calculation**:
		- Latency: **100 milliseconds** (50 ms to the server + 50 ms back)
		- Server Processing Time: **200 milliseconds**
		- Total Response Time = Latency + Server Processing Time = **100 ms + 200 ms = 300 milliseconds**.
3. **Deviation**: 
	- If the average response time  is 500 ms and the deviation is 50 ms, that means most of the response times are between 450 ms and 550 ms
##### Summary of the Example
- **Latency**: 100 milliseconds (time taken for the request to travel to the server and back).
- **Response Time**: 300 milliseconds (includes both latency and the time taken by the server to process the request).


Connect time
90th percentile 


Let's extend the example by adding a **response time** metric:
- **Connect Time**: 200 milliseconds (ms)
- **Latency**: 400 milliseconds (ms)
- **Response Time**: 600 milliseconds (ms)
- **Elapsed Time**: 1000 milliseconds (ms)
Here’s what each metric now represents:
1. **Connect Time (200 ms)**:
	- It took 200 ms to establish a connection between JMeter and the server, including DNS lookup and setting up the TCP connection.
2. **Latency (400 ms)**:
	- After the connection, there was an additional 200 ms wait (for a total of 400 ms) before receiving the first byte of data from the server. This latency includes server processing time and any network delay before data starts being sent.
3. **Response Time (600 ms)**:
	- Response time is the duration from the start of the request until the entire response is ready, excluding data transfer time. Here, it took 600 ms for the server to fully process the request and generate the response.
4. **Elapsed Time (1000 ms)**:
	- The total time taken from sending the request to receiving all data was 1000 ms (1 second). This includes connect time, latency, response time, and the time required to download the entire response.
##### Summary:
- **Connect Time**: 200 ms (time to establish connection)
- **Latency**: 400 ms (includes connect time, up to the first byte of data)
- **Response Time**: 600 ms (includes connect time and latency, until the server fully generates the response)
- **Elapsed Time**: 1000 ms (total time including data transfer)
This breakdown clarifies where time is spent during the request life cycle, helping to identify areas for optimization, whether in connection setup, server response, or data transfer.

![]([Notion-hosted image omitted because its URL expires])

</details>
