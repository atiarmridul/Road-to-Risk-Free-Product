# Automation Layers and Feedback

The automation pyramid is a decision aid: place most checks at the lowest layer that can provide trustworthy evidence. It is not a mandatory percentage formula.

| Layer | Best for | Strength | Limitation |
| --- | --- | --- | --- |
| Unit/component | Isolated rules and transformations | Very fast and precise | Cannot prove integrations work |
| API/service | Contracts, workflows, and business behavior | Fast with broad functional coverage | Does not prove the rendered UI |
| UI/end-to-end | Critical user journeys and integration confidence | Closest to user interaction | Slower and more failure-prone |

## Practical rules

- Test business rules below the UI whenever possible.
- Keep a smaller set of high-value UI journeys.
- Do not duplicate every scenario at every layer.
- Use contract and integration tests at important service boundaries.
- Treat production monitoring as another feedback source, not as a replacement for pre-release testing.

## Example

For checkout:

- Unit tests cover discounts, tax, and rounding.
- API tests cover creating an order, authorization, and inventory responses.
- UI tests cover one successful purchase and a few critical recovery paths.

## Checkpoint

Take one feature and assign its risks to test layers. Be able to explain why each check belongs at that layer and what evidence is still missing.
