# JavaScript and TypeScript Fundamentals

Automation code benefits from the same fundamentals as production code.

## JavaScript essentials

- Prefer `const`; use `let` only when reassignment is required.
- Use functions to name behavior rather than copying steps.
- Use arrays and objects to model test data.
- Use modules to separate responsibilities.
- Keep tests deterministic: avoid hidden global state and order dependencies.

```typescript
type Credentials = {
  email: string;
  password: string;
};

const validUser: Credentials = {
  email: 'student@example.com',
  password: 'correct-password',
};
```

TypeScript can catch incorrect assumptions before execution. Prefer specific tool or domain types over `any`.

## Functions and modules

```typescript
export function buildUser(overrides: Partial<Credentials> = {}): Credentials {
  return { ...validUser, ...overrides };
}
```

Extract code because it represents a stable concept, not merely to reduce line count.
