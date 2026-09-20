# Integration Testing Learning Guide

Integration testing checks whether two or more real parts of a system work correctly together.

## Recommended learning order

1. [Foundations](foundations.md) — scope, test levels, and architecture
2. [API and database](api-and-database.md) — HTTP and persistence boundaries
3. [External services](external-services.md) — safe testing of third-party integrations
4. [Queues, cache, and storage](queues-cache-and-storage.md) — asynchronous and infrastructure boundaries
5. [Data and contracts](advanced-data-and-contracts.md) — factories, environments, contracts, and snapshots
6. [Environments and CI](advanced-environments-and-ci.md) — WebSockets, Docker, parallelism, and pipelines
7. [Best practices](best-practices-and-review.md) — isolation, reliability, and anti-patterns

## Beginner mental model

A unit test checks one player; an integration test checks whether players can pass the ball to each other correctly.
