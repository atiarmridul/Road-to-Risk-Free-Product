# টেস্ট ডেটা ও এনভায়রনমেন্ট ম্যানেজমেন্ট

## কেন এটা Senior QA Skill

অনেক regression failure business logic bug নয়; bad test data বা unstable environment side effect। Senior QA deterministic execution environment তৈরি করে।

---

## Test Data Taxonomy

| Type                | Usage                    | Risk                           |
| ------------------- | ------------------------ | ------------------------------ |
| Synthetic           | normal functional test   | low                            |
| Masked Prod-like    | edge behavior validation | medium (privacy control দরকার) |
| Golden Dataset      | repeatable regression    | low                            |
| Destructive Dataset | negative/failure test    | medium                         |

---

## Data Management Rules

- seed script version-control করুন
- idempotent setup/teardown লিখুন
- per-test unique identifier ব্যবহার করুন
- time-dependent test-এ fixed clock বা controllable time provider ব্যবহার করুন

---

## Environment Strategy

1. Shared Staging

- integration smoke

2. Ephemeral Environment (PR-based)

- risky feature validation

3. Pre-Release Mirror

- release candidate full regression

---

## Environment Parity Checklist

- app config parity (feature flag, region, timezone)
- DB schema parity
- queue/cache config parity
- third-party sandbox health
- observability hooks enabled (log, trace, metrics)

---

## Failure Triage Shortcuts

- local pass but CI fail হলে আগে env issue ধরুন
- rerun-specific failure হলে data pollution check করুন
- widespread sudden fail হলে dependency outage/secret expiry verify করুন
