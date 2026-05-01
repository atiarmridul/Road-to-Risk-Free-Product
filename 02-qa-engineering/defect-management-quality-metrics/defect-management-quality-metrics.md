# ডিফেক্ট ম্যানেজমেন্ট ও কোয়ালিটি মেট্রিক্স

## উদ্দেশ্য

Metrics শুধু রিপোর্টের জন্য না; release quality improve করার জন্য actionable decision support।

---

## Core Metrics

- Defect Leakage = production defect / total defect
- DRE (Defect Removal Efficiency) = pre-release defect / total defect
- Reopen Rate
- MTTD (Mean Time to Detect)
- MTTR (Mean Time to Resolve)
- Escaped Defect Density (per feature/release)

---

## Metric Interpretation Playbook

1. Leakage Up, DRE Down

- pre-release coverage দুর্বল বা risk selection ভুল

2. Reopen Rate Up

- bug reproduction quality বা fix validation দুর্বল

3. MTTR Up

- triage ownership unclear বা dependency bottleneck

4. MTTD Up

- observability gap বা monitoring threshold সমস্যা

---

## Suggested Dashboard View

- Engineering View: module-wise defect trend, reopen, MTTR
- Product View: customer impact defect, release risk trend
- Leadership View: quarterly leakage, quality investment ROI

---

## Cadence

- Weekly: execution + flaky + new critical defect
- Sprint End: escaped defect RCA
- Monthly: trend এবং process improvement action
- Quarterly: roadmap-level quality investment decision

---

## Review Meeting Template

- what changed (trend)
- why changed (root cause)
- next sprint action (concrete)
- owner + ETA

---

## Senior QA Expectation

Senior QA শুধু metric দেখায় না; metric থেকে process change drive করে এবং next decision স্পষ্ট করে।
