# CI/CD Quality Strategy for QA Engineers

> **সহজভাবে / In simple words:** CI/CD automatically builds, checks, and delivers software through a repeatable pipeline.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Placing the right quality checks in the pipeline gives the team fast feedback and safer releases.


A CI/CD quality strategy provides fast, trustworthy feedback while preventing unacceptable risk from reaching users. The goal is not to run every test on every commit; it is to place the right checks at the right stage.

## Example pipeline

| Stage | Typical checks | Feedback target | Failure action |
| --- | --- | --- | --- |
| Pre-commit or pull request | Formatting, static analysis, unit and component tests | Minutes | Block merge |
| Build | Compilation, dependency and secret checks, artifact creation | Minutes | Stop pipeline |
| Integration | API, database, contract, migration, and service-integration tests | Minutes | Block promotion |
| Deployment to test | Environment smoke and configuration validation | Minutes | Roll back deployment |
| Acceptance | Critical API/UI journeys, accessibility scan, targeted regression | Tens of minutes | Block release candidate |
| Non-functional | Performance, security, resilience, broader compatibility | Scheduled or risk-triggered | Review against thresholds |
| Production | Synthetic smoke, canary analysis, monitoring | Continuous | Pause, roll back, or mitigate |

Targets depend on the system; the important point is to define and measure them.

## Test selection principles

- Run fast, deterministic checks early.
- Keep most behavioral coverage below the UI layer.
- Trigger tests using changed components and dependency risk when possible.
- Run critical smoke tests on every deployment.
- Schedule expensive cross-browser, performance, and full-regression suites appropriately.
- Treat database migrations, feature flags, configuration, and rollback paths as testable release artifacts.

## Quality gates

A useful gate has:

- A measurable rule, such as zero failed critical tests or no unresolved critical vulnerability.
- An owner who can investigate or approve an exception.
- Evidence retained with the build.
- An explicit exception process with risk, expiry, and mitigation.
- A record of false failures so the gate remains trustworthy.

Coverage percentage alone is not a sufficient gate. Combine change risk, critical-flow results, defect status, security findings, performance thresholds, observability readiness, and rollback readiness.

## Handling flaky tests

Do not normalize rerunning until green. Capture the original failure, identify ownership, quarantine only when necessary, set a repair deadline, and keep quarantined risk visible. Track flaky-test rate and time lost so reliability work can be prioritized.

## Test data and environments

- Create deterministic, isolated data for parallel runs.
- Mask sensitive production-like data.
- Version environment configuration and database migrations.
- Detect environment failures separately from product failures.
- Prefer disposable environments where cost and architecture allow.

## Release strategies

- **Feature flags:** Separate deployment from user exposure and allow controlled activation.
- **Canary release:** Expose a small cohort, compare health and business signals, then expand.
- **Blue-green deployment:** Maintain two environments to support quick traffic switching.
- **Rolling deployment:** Replace instances gradually while monitoring compatibility.

Every strategy needs measurable abort criteria and a rehearsed rollback or roll-forward plan.

## Interview scenario

### The pipeline takes two hours. What would you do?

1. Measure duration, queue time, failure rate, and slowest suites.
2. Remove duplication and move coverage to faster test layers where appropriate.
3. Parallelize independent tests and reuse safe build artifacts or caches.
4. Separate commit-critical checks from scheduled or risk-triggered suites.
5. fix flaky tests and environment bottlenecks before adding more retries.
6. Track whether lead time improves without increasing escaped risk.

### What should happen when a critical test fails before release?

Pause promotion, confirm whether the failure is product, test, data, or environment related, and collect evidence. If it is a product risk, evaluate impact and mitigation with the accountable stakeholders. Any override should be explicit, time-bound, documented, and monitored—not an informal decision to ignore red status.

## Metrics that matter

- Pipeline duration and queue time
- Change failure rate
- Deployment frequency and lead time
- Mean time to restore
- Test failure and flaky-test rates
- Escaped defects by risk area
- Gate overrides and their outcomes

Use metrics to improve the system, not to rank individuals.
