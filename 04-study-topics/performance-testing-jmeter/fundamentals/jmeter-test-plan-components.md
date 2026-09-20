# JMeter Test Plan Components

> **Focus:** JMeter Test Plan Components explains one specific part of performance engineering and how a QA engineer applies it.


## Core Structure

1. Test Plan
2. Thread Group
3. Samplers
4. Config Elements
5. Logic Controllers
6. Timers
7. Assertions
8. Pre/Post Processors
9. Listeners

## What Each Component Does

### Thread Group
- Defines virtual users, ramp-up, loop count, duration.

### Sampler
- Actual request (HTTP Request, JDBC Request, etc.).

### Config Elements
- Common settings (HTTP Request Defaults, CSV Data Set Config, Header Manager).

### Logic Controllers
- Control request flow (If Controller, Loop Controller, Throughput Controller).

### Timers
- Add realistic delay to avoid unrealistic burst traffic.

### Assertions
- Validate response body, status code, response time.

### Pre/Post Processors
- PreProcessor: setup before request.
- PostProcessor: extract token/data from response (Regex, JSON Extractor).

### Listeners
- View Results Tree (debug), Summary Report, Aggregate Report.
- In large tests, avoid heavy GUI listeners during run.

## Basic API Test Flow Example

1. Login API
2. Extract access token
3. Send business API requests with token
4. Validate response code/body/latency
