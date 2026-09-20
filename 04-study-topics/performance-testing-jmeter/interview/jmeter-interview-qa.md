# JMeter Interview Q&A

> **Focus:** JMeter Interview Q&A explains one specific part of performance engineering and how a QA engineer applies it.


## 1) Why prefer non-GUI mode for load testing?
Because GUI consumes local resources and can skew results. Non-GUI mode is more stable and production-like.

## 2) What is the difference between latency and response time?
Latency is time to first byte. Response time is total time to receive complete response.

## 3) Why are percentiles important?
Average hides tail performance. p95/p99 reflect real user pain during peak and outlier conditions.

## 4) What is correlation in JMeter?
Capturing dynamic values (token/session/id) from one response and passing them to subsequent requests.

## 5) What is parameterization?
Using variable inputs (often CSV) so requests simulate multiple users with unique data.

## 6) What key metrics do you report to stakeholders?
p95/p99 response time, throughput, error rate, pass/fail against SLA, and top bottlenecks.

## 7) How do you validate test reliability?
Run smoke load first, verify assertions, ensure no script-side failures, and repeat runs for consistency.


