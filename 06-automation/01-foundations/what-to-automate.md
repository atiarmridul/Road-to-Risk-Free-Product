# What to Automate

Automation is valuable when it creates useful feedback more reliably or frequently than a manual check. It is an investment, not a goal by itself.

## Good candidates

- Stable, repeatable flows executed often
- Business-critical regression scenarios
- Data-driven checks with many meaningful combinations
- Checks needed across browsers, devices, or configurations
- API and component checks that can provide fast feedback
- Setup, test-data creation, and other repetitive support work

## Poor candidates

- Rapidly changing prototypes
- One-time checks
- Subjective usability or exploratory investigation
- Scenarios whose setup is more fragile than their value
- Checks with unclear expected results

## Selection questions

For each candidate, ask:

1. What risk does this check cover?
2. How often will it run?
3. At which layer can it run fastest and most reliably?
4. Who will investigate failures?
5. What data and environment does it need?
6. How often is the underlying behavior likely to change?
7. Is its expected maintenance cost justified?

Prioritize by expected risk reduction and feedback value, not by the raw number of automated test cases.

## Simple decision record

| Candidate | Risk | Frequency | Best layer | Stability | Decision |
| --- | --- | --- | --- | --- | --- |
| Checkout price calculation | High | Every change | Unit/API | High | Automate early |
| New visual concept | Medium | Temporary | Exploratory | Low | Keep manual initially |
| User login | High | Every build | API + one UI path | High | Automate at both useful layers |

## Checkpoint

Choose ten regression scenarios from a familiar product. Decide which to automate, where they should run, and which should stay manual. Explain each choice in terms of risk and maintenance cost.
