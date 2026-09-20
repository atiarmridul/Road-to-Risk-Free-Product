# Accessibility Testing for QA Engineers

> **সহজভাবে / In simple words:** Accessibility testing checks whether people with different abilities can use a product.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It helps users who rely on keyboards, screen readers, zoom, captions, or other assistive tools.


Accessibility testing checks whether people with visual, auditory, motor, speech, or cognitive disabilities can use a product effectively. It is both a quality concern and, depending on the market, a legal and contractual risk.

## Standards to know

- **WCAG:** Web Content Accessibility Guidelines, organized around four principles: perceivable, operable, understandable, and robust (POUR).
- **Conformance levels:** A, AA, and AAA. WCAG AA is a common organizational target, but the required target should come from product and legal stakeholders.
- **Semantic HTML and platform semantics:** Native elements expose meaning, role, state, and keyboard behavior more reliably than custom controls.

Do not claim legal compliance based only on a scanner. Automated checks detect only part of the problem; human evaluation is essential.

## Practical test strategy

### 1. Keyboard-only navigation

- Reach every interactive element using `Tab` and `Shift+Tab`.
- Verify a logical focus order and visible focus indicator.
- Activate controls with the expected keyboard commands.
- Confirm dialogs trap focus while open and return focus when closed.
- Check that no component creates a keyboard trap.

### 2. Screen-reader checks

- Confirm that headings form a meaningful hierarchy.
- Check accessible names for controls, links, icons, and form fields.
- Verify that validation errors and dynamic status changes are announced.
- Confirm that decorative images are ignored and meaningful images have useful alternatives.
- Test at least one common screen reader and browser combination supported by the product.

### 3. Visual and content checks

- Check text and non-text contrast against the chosen WCAG level.
- Zoom to 200% and verify that content remains usable without losing information.
- Confirm that meaning is not communicated through color alone.
- Verify reflow on narrow viewports and with enlarged text.
- Check instructions, labels, error messages, and link text for clarity.

### 4. Forms and complex components

- Associate every input with a visible or programmatic label.
- Communicate required state and errors programmatically.
- Verify autocomplete metadata where personal information is collected.
- Test menus, tabs, grids, date pickers, and modals against established interaction patterns.

## Automation and tooling

Tools such as axe, Lighthouse, Playwright accessibility integrations, and browser accessibility trees help identify missing names, invalid ARIA, contrast issues, and structural problems. Use them in three layers:

1. Component checks during development.
2. Automated scans on critical pages in CI.
3. Manual keyboard and assistive-technology testing before release.

Avoid snapshots of the entire accessibility tree as the only assertion; they can become noisy and may not prove that a user can complete a task.

## Defect report example

**Title:** Checkout payment dialog cannot be closed using the keyboard

- **Environment:** Browser, OS, assistive technology, build
- **Steps:** Open checkout, focus payment button, open dialog, attempt to close with `Escape`
- **Actual:** Dialog remains open and focus moves behind it
- **Expected:** `Escape` closes the dialog and focus returns to the payment button
- **Impact:** Keyboard and screen-reader users may be unable to complete or abandon checkout
- **Evidence:** Video, focus sequence, DOM or accessibility-tree details
- **Reference:** Applicable WCAG success criterion or approved internal standard

## Interview questions

### Can automation guarantee accessibility?

No. Automation efficiently detects many rules-based violations, but it cannot reliably judge usability, meaningful alternative text, logical focus behavior, or the quality of a screen-reader experience. I combine automated scans with keyboard, zoom, and assistive-technology checks on critical workflows.

### How would you prioritize accessibility defects?

I consider task criticality, number of affected users, availability of a workaround, frequency, and standards risk. A keyboard trap in checkout or an unlabeled authentication control is usually more urgent than a minor issue on rarely used informational content.

### When should accessibility testing begin?

During design and component development. Early review of color, interaction patterns, semantics, and acceptance criteria prevents expensive page-level remediation later.

## Senior QA perspective

A mature approach defines supported assistive-technology combinations, includes accessibility in acceptance criteria and the design system, adds stable automated checks to CI, performs scheduled manual audits, and tracks regressions by user impact rather than scanner score alone.
