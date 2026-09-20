# SQA Practical Guide for JMeter

> **Focus:** SQA Practical Guide for JMeter explains one specific part of performance engineering and how a QA engineer applies it.


## Real Project Workflow

1. Requirement collection
- Define business-critical APIs/pages.
- Define SLA and workload targets.

2. Workload modeling
- Normal load
- Peak load
- Stress profile
- Soak profile

3. Environment readiness
- Production-like environment
- Monitoring access (CPU, memory, DB, cache)
- Stable test data

4. Script preparation
- Correlation (dynamic tokens/session IDs)
- Parameterization (CSV data)
- Assertions for correctness

5. Dry run and baseline
- Validate script correctness with low users
- Capture baseline metrics

6. Full execution
- Run in non-GUI mode
- Collect JTL + server telemetry

7. Analysis and defect reporting
- SLA pass/fail summary
- Bottleneck location (app/db/network)
- Defect tickets with evidence

## Common QA Mistakes to Avoid

- Using only average response time
- No realistic think time
- Running large tests in GUI mode
- No correlation for dynamic values
- Ignoring failed request payloads

## Defect Report Template for Performance Issues

- Test build/version
- Environment details
- Scenario and workload profile
- Expected SLA
- Actual metrics (p95, p99, error rate, throughput)
- Timestamp and evidence (JTL, screenshots, logs)
- Suspected layer (API, DB, infra)

## Exit Criteria Example

- p95 <= agreed SLA for all critical transactions
- Error rate <= threshold
- No Sev-1/Sev-2 performance defects open
