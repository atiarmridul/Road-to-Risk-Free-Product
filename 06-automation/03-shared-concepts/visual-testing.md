# Visual Testing

Visual testing compares rendered output to an approved baseline. It is useful for layout, spacing, fonts, colors, missing assets, and unexpected UI changes that functional assertions may miss.

## Stabilize before comparing

- Fix viewport, browser, fonts, and operating environment.
- Use deterministic data.
- Mask or control timestamps, advertisements, animations, and other dynamic regions.
- Keep baseline updates reviewable.
- Investigate a difference before accepting a new baseline.

Use visual checks alongside functional and accessibility checks. A screenshot can look correct while the interface remains unusable to a keyboard or screen reader.

Tool-specific snapshot syntax belongs in the relevant tool guide.
