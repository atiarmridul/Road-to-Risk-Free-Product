# Debugging Flaky Tests

A flaky test passes and fails without a relevant product change. Treat flakiness as an engineering defect, not routine noise.

## Investigation order

1. Reproduce with the same commit, environment, data, and browser.
2. Inspect the first meaningful error, trace, screenshot, logs, and requests.
3. Classify the source: synchronization, selector, shared data, environment, product race, resource limit, or test order.
4. Fix the cause and verify repeatedly and in parallel when relevant.
5. Quarantine only with an owner, reason, and removal condition.

Retries can collect evidence and reduce temporary disruption, but they are not a fix. Track first-attempt failures even when a retry passes.

## Common warning signs

- Fixed sleeps
- Mutable shared accounts
- Tests that pass only in isolation
- Broad exception handling
- Selectors tied to layout
- Dependencies on third-party systems without control or simulation
