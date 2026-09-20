# Senior QA Technical and Leadership Questions

> **সহজভাবে / In simple words:** Scenario questions test how you think, prioritize risk, collaborate, and explain decisions.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Structured answers are easier to follow and stronger when supported by a real example.


## 2) Do you have any experience with security testing (e.g., SQL injection, encryption and decryption)?

Yes. I have hands-on experience with basic security validation from a QA perspective:

- SQL injection checks using crafted payloads on input and API parameters.
- Authentication and authorization validation (role access, token expiry, invalid token behavior).
- Encryption checks for data in transit (HTTPS/TLS) and sensitive data handling in logs and payloads.
- Session and cookie security checks (secure/httponly flags, timeout behavior).

## 3) Which test management tools have you used?

I have worked with Jira for defect workflow and sprint tracking, and test management tools such as TestRail/Zephyr for test case design, execution tracking, and reporting.

## 5) If a defect is rejected by DEV, what steps would you follow to prove your point that it is a defect?

- Re-validate against BRS/SRS, acceptance criteria, and business rules.
- Reproduce in a clean environment and collect clear evidence (steps, logs, API requests/responses, screenshots/videos).
- Compare expected vs actual behavior with concrete references.
- Perform impact analysis (user impact, data impact, downstream modules).
- Discuss with dev in a short sync, then escalate to BA/PO if requirement interpretation differs.
- Update bug report using strong bug advocacy style.

Reference:

- [Bug Advocacy-An Effective Way of Writing A BUG | LinkedIn](https://www.linkedin.com/pulse/bug-advocacy-an-effective-way-writing-muhammad-mamunur-rashid-4o5sc/)

## 7) A transaction of $1 is not showing in the target system. What priority and severity would you assign? If there is a workaround, will values change?

Recommended answer:

- Severity: High (data integrity and financial reconciliation issue).
- Priority: Medium to High (depends on transaction volume, customer impact, and compliance risk).

If workaround exists:

- Severity usually stays High (core defect impact does not change).
- Priority may reduce slightly if business risk is temporarily controlled.

## 10) What is the workflow of the project you worked on?

Typical workflow:

- Requirement grooming and clarification.
- Test planning and test case design.
- Environment and test data readiness.
- Sprint execution: API/UI validation, integration checks, defect logging.
- Daily triage with dev and product.
- Regression and release readiness validation.
- Production smoke and post-release monitoring.

## 11) What estimation techniques have you used?

- Work Breakdown Structure (feature to test-scope decomposition).
- Three-point estimation (optimistic, realistic, pessimistic).
- Analogous estimation based on historical test effort.
- Risk-based adjustment (high-risk modules get extra buffer).
- Team-capacity-driven sprint estimation.

## 13) How do you approach capacity planning?

- Start with sprint scope and risk classification.
- Map effort by testing type (functional, regression, automation, non-functional).
- Adjust for team bandwidth, holidays, support load, and parallel tasks.
- Reserve buffer for re-testing and defect spillover.
- Track planned vs actual effort and recalibrate each sprint.

## 15) How do you monitor resources who are reporting to you?

- Weekly plan vs actual tracking with clear owner-level tasks.
- Daily standup blockers and dependency monitoring.
- Quality KPIs: test execution progress, defect quality, reopen rate, escaped defects.
- 1:1 coaching, skill progression goals, and feedback loop.

## 16) What environment management activities have you been involved in?

- Environment readiness checklist before testing starts.
- Build deployment validation and smoke checks.
- Test data setup, refresh, and masking coordination.
- Environment access/permission validation.
- Third-party dependency and mock-service fallback handling.
- Incident tracking when environment issues block testing.

## 18) How would you start a security testing project from scratch?

- Understand architecture, assets, and threat surface.
- Define security scope and risk matrix (OWASP-focused).
- Set secure test strategy for auth, session, input validation, API security, and data protection.
- Prepare tools and test data.
- Run baseline vulnerability and misuse-case tests.
- Report with severity, exploitability, and remediation guidance.
- Re-test fixes and include security gates in CI/CD.

## 19) What are key considerations when preparing a regression suite?

- Cover business-critical and revenue-impacting flows first.
- Include frequently changed modules and integration touchpoints.
- Keep tests stable, deterministic, and environment-aware.
- Remove redundant tests and prioritize ROI.
- Balance UI, API, and integration levels for speed and coverage.
- Keep traceability to requirements/defects.

## 21) How did you resolve conflicts within the team?

- Identify root cause with facts, not assumptions.
- Align on shared objective (quality and delivery).
- Propose options with impact and trade-offs.
- Communicate respectfully and document decisions.
- Follow up after implementation and adjust if needed.

## 33) What is the difference between Test Plan and Test Strategy?

- Test Strategy:
  - High-level, long-term approach.
  - Defines standards, scope philosophy, tools, environments, and quality gates.
  - Usually stable across releases/projects.
- Test Plan:
  - Release/sprint-specific execution plan.
  - Includes timeline, resources, entry/exit criteria, test cycles, and deliverables.
  - Changes frequently based on scope and schedule.

## Q2) What is Defect Cascading?

Defect cascading occurs when one unresolved defect causes other defects to appear in connected modules. Fixing the primary defect often reveals hidden downstream issues.

## Q3) What is a Latent Defect?

A latent defect is a hidden defect that does not surface in normal test conditions and appears later under specific data, load, timing, or workflow combinations.

## Q4) What is Fault/Defect Masking? Explain with an example.

Fault masking is when one defect hides another defect, so the second defect is not visible until the first one is fixed.

Example:
If discount logic is wrong but final checkout amount is always rounded aggressively, the rounding defect can hide the original discount-calculation defect.
