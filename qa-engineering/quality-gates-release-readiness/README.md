# Quality Gate ও Release Readiness

## কেন দরকার

Release decision intuition-based হলে conflict বাড়ে। gate-based decision হলে সবাই একই evidence দেখে সিদ্ধান্ত নিতে পারে।

---

## Multi-Level Quality Gate

1. PR Gate
- unit/integration mandatory check
- critical API এবং auth smoke

2. Main Gate
- regression pass threshold
- unapproved contract break নেই

3. Pre-Release Gate
- CUJ pass = 100%
- sev-1/sev-2 open = 0
- performance threshold met
- unresolved critical security issue = 0

---

## Release Readiness Packet

- test summary (what ran, what skipped, why)
- risk register (known issue + mitigation)
- rollback plan + verification steps
- first 24h monitoring/alert plan

---

## Risk Matrix

| Risk | Impact | Probability | Action |
|---|---|---|---|
| Payment double charge | High | Medium | block release |
| Minor non-critical UI issue | Low | Medium | release with known issue |
| Analytics delay | Medium | Low | monitor post-release |

---

## Canary ও Rollback Criteria

- canary window: 5%-10% traffic
- rollback trigger: error rate spike, p95 breach, payment anomaly
- rollback owner এবং command path pre-approved থাকতে হবে

---

## QA Recommendation Format

- decision: Go / Go with Risk / No-Go
- top 3 risk
- mitigation status
- required post-release follow-up
