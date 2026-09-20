# Shared Automation Practice Project

Use the same small product workflow when learning different tools. This makes comparisons about the tool rather than about different scenarios.

## Suggested workflow

A user signs in, searches for a product, adds it to a cart, places an order, and sees a confirmation.

## Required coverage

1. Prepare a unique user and product through an API or fixture.
2. Automate one successful UI journey.
3. Cover price or order rules below the UI where possible.
4. Use meaningful locators and condition-based synchronization.
5. Keep the final business assertions in the test.
6. Capture useful evidence on failure.
7. Run the suite through one CI command.
8. Document one risk intentionally left for manual exploration.

## Evaluation rubric

| Area | Evidence |
| --- | --- |
| Intent | Test names and steps describe user behavior |
| Reliability | Runs repeatedly and concurrently without interference |
| Diagnosis | A deliberate failure produces enough evidence to investigate |
| Maintainability | Shared behavior has a reason to be shared; abstractions remain readable |
| Strategy | The README explains what is covered at UI, API, and lower layers |
