# CI/CD Execution

Continuous integration should provide fast, trustworthy feedback and preserve enough evidence to investigate failures.

## Suggested layers

| Trigger | Typical checks |
| --- | --- |
| Every pull request | Static checks, unit/component tests, API tests, small UI smoke set |
| Main branch | Broader cross-browser and integration coverage |
| Scheduled or release | Long-running regression, visual, performance, or environment-heavy suites |

## Pipeline practices

- Pin runtime and browser versions.
- Cache dependencies without caching mutable test state.
- Split independent tests safely across workers.
- Protect credentials with the CI secret store.
- Upload reports and failure evidence even when tests fail.
- Make timeouts and retries explicit.
- Fail for understood quality reasons, not infrastructure ambiguity.

Each tool guide shows its configuration and commands; this page owns the shared pipeline principles.
