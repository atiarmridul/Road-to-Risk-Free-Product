# Page Object Model

Page Object Model (POM) separates product-facing UI behavior from test intent. It is useful when an interface has stable concepts worth naming; it is not a requirement to create one class per page.

```text
test:       describes the scenario and expected business result
page model: exposes meaningful product actions
tool API:   performs browser interaction
```

## Good page or component objects

- Represent meaningful behavior such as `logIn()` or `addProduct()`.
- Keep selectors close to the component they describe.
- Hide repetitive interaction details.
- Avoid generic base pages filled with wrappers such as `clickElement()`.
- Usually leave the final business assertion in the test.

## Alternatives and complements

Small suites may use focused helper functions. Larger suites often combine component objects, fixtures, API clients, data builders, and domain-specific workflows. Choose the smallest structure that keeps intent clear.

See each tool's framework page for an idiomatic implementation.
