# JMeter Metrics

> **Focus:** JMeter Metrics explains one specific part of performance engineering and how a QA engineer applies it.


## Key Metrics

- `Response Time`: full time to receive complete response
- `Latency`: time to first byte (TTFB)
- `Connect Time`: TCP/TLS connection setup time
- `Throughput`: requests/transactions per second or minute
- `Error %`: failed requests ratio
- `90th/95th/99th percentile`: worst-case user experience indicators

## Simple Example

- Connect Time: 200 ms
- Latency: 400 ms
- Response Time: 600 ms
- Elapsed Time: 1000 ms

Interpretation:
- Connection setup took 200 ms.
- First byte came at 400 ms.
- Server completed response at 600 ms.
- Entire payload download finished at 1000 ms.

## Practical SLA Reading

If SLA is:
- p95 response time < 1200 ms
- error rate < 1%

Then pass criteria should be judged mainly by:
- p95 (not average only)
- error percentage under expected load profile
