# Flaky টেস্ট ম্যানেজমেন্ট

> **সহজভাবে / In simple words:** A flaky test sometimes passes and sometimes fails even when the product has not meaningfully changed.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Unreliable tests waste time and teach teams to ignore failures.


## সংজ্ঞা

Flaky test = code change ছাড়া intermittent pass/fail behavior। এটি quality signal নষ্ট করে এবং release confidence কমায়।

---

## Flake Taxonomy

- timing/synchronization সমস্যা
- shared state contamination
- infra instability
- nondeterministic dependency response
- assertion fragility

---

## Flake Lifecycle

1. Detect

- flaky rate = intermittent failures / total executions

2. Triage

- classify: product bug / test bug / infra bug

3. Contain

- quarantine tag
- owner assign
- SLA define (e.g. 5 working days)

4. Eradicate

- deterministic wait
- test data isolation
- dependency virtualization/mocking

---

## Flake Budget

- suite flake rate target: < 2%
- critical path flake rate target: < 0.5%
- budget exceed হলে নতুন E2E merge freeze (critical fix ব্যতীত)

---

## Operational Rules

- retry হলো temporary control, permanent solution না
- quarantine test release gate-এ count হবে না, কিন্তু weekly burn-down-এ include হবে
- 2 sprint unresolved quarantine থাকলে escalation করতে হবে

---

## Core Metrics

- Suite Stability Score
- Mean Time to Deflake
- False Alarm Rate
- Quarantine Aging Distribution
