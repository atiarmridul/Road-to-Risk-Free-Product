# Jmeter

> **Performance Testing**

Performance testing is the testing of an application’s stability and response time by applying load.

The word stability means the ability of the application to withstand in the presence of load. Response time is how quickly an application is available to users. Performance testing is done with the help of tools. Loader.IO, JMeter, LoadRunner, etc. are good tools available in the market.

> **Load  Testing**

Load testing is the testing of an application’s stability and response time by applying load, which is equal to or less than the designed number of users for an application.

• For example, if your application handles 100 users at a time with a response
time of 3 seconds, then load testing can be done by applying a load of a
maximum of 100 or less than 100 users. The goal is to verify that the
application is responding within 3 seconds for all the users.

Is server behaving expected while giving the expected load is called load testing.

> **Stress Testing**

Stress testing is testing an application’s stability and response time by applying load, which is more than the designed number of users for an application.

• For example, if your application handles 1000 users at a time with a response time of 4 seconds, then stress testing can be done by applying a load of more than 1000 users. Test the application with 1100,1200,1300 users and notice the response time. The goal is to verify the stability of an application under stress.

> **Endurance Testing**

Endurance testing is testing an application’s stability and response time by applying load continuously for a longer period to verify that the application is working fine.

• For example, car companies soak testing to verify that users can drive cars continuously for hours without any problem.

the average response time and deviation should be considered. need to check about heavy load for a certain time is the servers deviation is getting bigger or not. It should not get much higher.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/9d86139f-5d04-4f28-8426-30775b915eb4/Screenshot_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXQQ2THO%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T114302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIELUDYKkg7eRLd0j4xbHl%2B29MjUBGluiBf1u4BxVPHT8AiAq12%2Fm%2Fo6UaCqD8ehM%2B4bqoif05Eu9uZ9yWX3SuwL1Kyr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMnznlZRjPQSRJ6FDdKtwDGa3vALdW3xf%2FzdtTC9h27StZ6pmXOKVLbQfXoN8yResMSJU08FlQrWD0sbUa8fCQbCM8BD4m4kQcbG470jYMM1Fyz00LIe%2Bvi7B0CaaqTHpi%2BeVMS6lRyCDuW25fMPwikzR%2FV%2BGih7wW6TfRJOO8DrgzvRT61NrTKySb%2BlHbKR3yPQZAp1D%2BWDdPfc%2FAYwV7PKyo7rvxidQUXIXKeS8YnCSX4rN0hlhCCh1%2FsVcsTl1j9n1ewG2ICg2EpBN5tyQ8N3lTIvSXAtMKlDnyNA0l8dlTwrL5S4kZ5P5el3LJq2v7EBrXJJTew8ro98arOaP7xWoCWMQruZ7Sc%2FXGWhKyVlmXO0846e%2FNdPO%2B8ZOL%2FO1gFO7YXlWtRCdp%2B2LAj199MpU7FmDH7jWzMbTapRBIwm7guEmvp%2FhF6oLpi9SBB5GJI7%2BIqfZbv9mEGChc5bgo599lpWdJMUnQRAz%2FrXcaLJ9X2Ycftz60Gnwk4cYap4qZp2cYZ0NQL8%2BFBNw2hQnbyTJwVOfBCAP7b%2Bon13mFcTMCDayR2eXA4fGqtDvfZ6INDZsldC1g1Jo0PJDee03mcwHVkopogK1fSHkEZHJfFH7fjBHvj9SG8H6Jsu7NGITyqmxO3VqRaqXJ6yEw%2BYXSzwY6pgG7RgZnD4dFOjHxqDxeaQJpzdVwIAgXmBr%2FtcwlFsjY8noaqt9Z57RDml3SQ3XXVkYWAeoAwX94cbJFfMLPfeq5fYb3NLmFiWfkhGbBle2zhA%2FsbKTtzr8WurI0sTLTiPDSeG7EMbq8zHkRL2JII7FOUoIkE8BlLlD5CHWSi5%2BbHJ1lGnnkjbLEufERz9GvDJ8YUEMF3rNo0KXSoi3Hvd6KYGvkrgoX&X-Amz-Signature=29d00adcf2c54dfcdfa7d408d2bf78169c26a9789171abf2f8fdce77473ac10a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### Jmeter Commandline:

**To start the test**: jmeter -n -t testName.jmx  -l report\testName.jtl
T**o generate html report:** jmeter -g report\testName.jtl  -o report\testName.html

### Example Scenario: Web Page Load

Let's say a user is trying to load a webpage by clicking a link.

1. **Latency**:

  - When the user clicks the link, a request is sent to the server hosting the webpage.

  - **Latency** is measured as the time it takes for this request to travel to the server and for the server's response to come back to the user.

  - **Example**: If it takes 50 milliseconds for the request to reach the server and another 50 milliseconds for the response to come back, the total latency is **100 milliseconds**.

1. **Response Time**:

  - After the request reaches the server, the server processes it. Let’s say the server takes **200 milliseconds** to render the webpage (this includes database queries, processing logic, etc.).

  - The total **response time** is the sum of the latency and the server processing time.

  - **Example Calculation**:

    - Latency: **100 milliseconds** (50 ms to the server + 50 ms back)

    - Server Processing Time: **200 milliseconds**

    - Total Response Time = Latency + Server Processing Time = **100 ms + 200 ms = 300 milliseconds**.

1. **Deviation**:

  - If the average response time  is 500 ms and the deviation is 50 ms, that means most of the response times are between 450 ms and 550 ms

### Summary of the Example

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

1. **Latency (400 ms)**:

  - After the connection, there was an additional 200 ms wait (for a total of 400 ms) before receiving the first byte of data from the server. This latency includes server processing time and any network delay before data starts being sent.

1. **Response Time (600 ms)**:

  - Response time is the duration from the start of the request until the entire response is ready, excluding data transfer time. Here, it took 600 ms for the server to fully process the request and generate the response.

1. **Elapsed Time (1000 ms)**:

  - The total time taken from sending the request to receiving all data was 1000 ms (1 second). This includes connect time, latency, response time, and the time required to download the entire response.

### Summary:

- **Connect Time**: 200 ms (time to establish connection)

- **Latency**: 400 ms (includes connect time, up to the first byte of data)

- **Response Time**: 600 ms (includes connect time and latency, until the server fully generates the response)

- **Elapsed Time**: 1000 ms (total time including data transfer)

This breakdown clarifies where time is spent during the request life cycle, helping to identify areas for optimization, whether in connection setup, server response, or data transfer.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/5c4e6229-90a7-4640-b626-38db228a3096/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXQQ2THO%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T114302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIELUDYKkg7eRLd0j4xbHl%2B29MjUBGluiBf1u4BxVPHT8AiAq12%2Fm%2Fo6UaCqD8ehM%2B4bqoif05Eu9uZ9yWX3SuwL1Kyr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMnznlZRjPQSRJ6FDdKtwDGa3vALdW3xf%2FzdtTC9h27StZ6pmXOKVLbQfXoN8yResMSJU08FlQrWD0sbUa8fCQbCM8BD4m4kQcbG470jYMM1Fyz00LIe%2Bvi7B0CaaqTHpi%2BeVMS6lRyCDuW25fMPwikzR%2FV%2BGih7wW6TfRJOO8DrgzvRT61NrTKySb%2BlHbKR3yPQZAp1D%2BWDdPfc%2FAYwV7PKyo7rvxidQUXIXKeS8YnCSX4rN0hlhCCh1%2FsVcsTl1j9n1ewG2ICg2EpBN5tyQ8N3lTIvSXAtMKlDnyNA0l8dlTwrL5S4kZ5P5el3LJq2v7EBrXJJTew8ro98arOaP7xWoCWMQruZ7Sc%2FXGWhKyVlmXO0846e%2FNdPO%2B8ZOL%2FO1gFO7YXlWtRCdp%2B2LAj199MpU7FmDH7jWzMbTapRBIwm7guEmvp%2FhF6oLpi9SBB5GJI7%2BIqfZbv9mEGChc5bgo599lpWdJMUnQRAz%2FrXcaLJ9X2Ycftz60Gnwk4cYap4qZp2cYZ0NQL8%2BFBNw2hQnbyTJwVOfBCAP7b%2Bon13mFcTMCDayR2eXA4fGqtDvfZ6INDZsldC1g1Jo0PJDee03mcwHVkopogK1fSHkEZHJfFH7fjBHvj9SG8H6Jsu7NGITyqmxO3VqRaqXJ6yEw%2BYXSzwY6pgG7RgZnD4dFOjHxqDxeaQJpzdVwIAgXmBr%2FtcwlFsjY8noaqt9Z57RDml3SQ3XXVkYWAeoAwX94cbJFfMLPfeq5fYb3NLmFiWfkhGbBle2zhA%2FsbKTtzr8WurI0sTLTiPDSeG7EMbq8zHkRL2JII7FOUoIkE8BlLlD5CHWSi5%2BbHJ1lGnnkjbLEufERz9GvDJ8YUEMF3rNo0KXSoi3Hvd6KYGvkrgoX&X-Amz-Signature=43c89ba9bcee446e085f9d4e5dbd843c88eafc0c7de6df78467a8d43fc80f1ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
