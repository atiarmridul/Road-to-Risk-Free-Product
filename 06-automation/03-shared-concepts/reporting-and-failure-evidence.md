# Reporting and Failure Evidence

A report should help answer: what failed, where, under which conditions, and with what evidence?

## Useful evidence

- Assertion message and stack trace
- Browser, device, environment, and commit identity
- Screenshot at failure
- Trace or video when appropriate
- Relevant console and network errors
- Test data identifiers that contain no secrets

Collect enough evidence to diagnose failures without rerunning them, but avoid unlimited artifacts that are expensive or expose sensitive data.

## Result categories

Distinguish product defects, automation defects, environment failures, and known quarantined issues. A retry result should remain visible; turning a failed first attempt into an unexplained pass hides reliability problems.

Tool-specific reporters and artifact configuration remain in each tool guide.
