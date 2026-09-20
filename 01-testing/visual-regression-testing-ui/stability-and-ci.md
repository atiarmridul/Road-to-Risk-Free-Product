# Stable Visual Tests and CI

## ⚠️ Flaky Tests — Stabilization Tricks

VRT-এর সবচেয়ে বড় শত্রু — flakiness। নিচের গুলো না করলে CI false-positive-এ ভরে যায়।

### 1. Disable animations

```css
*,
*::before,
*::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}
```

### 2. Wait for network idle

```javascript
await page.waitForLoadState("networkidle");
await page.waitForFunction(() => document.fonts.ready);
```

### 3. Mock dynamic data

- Date/time: freeze (`MockDate.set('2025-01-01')`)
- Random data: seeded faker
- Live counter, "Posted 5 minutes ago": mock or hide

### 4. Wait for fonts loaded

```javascript
await page.evaluate(() => document.fonts.ready);
```

বাংলা font (Hind Siliguri, Tiro Bangla) load না হলে fallback rendering — VRT fail।

### 5. Mask volatile region

```javascript
await expect(page).toHaveScreenshot({
  mask: [page.locator(".timestamp"), page.locator(".live-count")],
});
```

### 6. Stable image rendering

- Always WebP/optimized format
- Pre-load via `image.decode()` await
- Avatar/random image-এ placeholder

### 7. Browser deterministic flags

```javascript
launchOptions: {
  args: [
    '--font-render-hinting=none',
    '--disable-skia-runtime-opts',
    '--force-color-profile=srgb',
  ],
}
```

### 8. Run in Docker (host font ভিন্নতা remove)

```dockerfile
FROM mcr.microsoft.com/playwright:v1.44.0-jammy
# all Linux fonts identical across machines
```

---

## 📊 Component vs Page-level Trade-offs

| Aspect      | Component (Storybook + Chromatic)             | Page (Playwright/BackstopJS)         |
| ----------- | --------------------------------------------- | ------------------------------------ |
| Speed       | দ্রুত (isolated render)                       | ধীর (full page load)                 |
| Coverage    | Component states (hover, error, disabled) সহজ | Real integration                     |
| Flakiness   | কম                                            | বেশি (network, ads, dynamic)         |
| Cost        | Storybook maintenance                         | Less infra                           |
| When to use | Design system, reusable component             | Critical user flow (checkout, login) |

> **Best practice:** দুটোই — Storybook-এ atomic component, Playwright-এ key user journey।

---

## 🚀 CI Integration (GitHub Actions)

```yaml
name: Visual Regression
on:
  pull_request:
    paths: ["src/**", "*.css", "*.scss"]

jobs:
  vrt:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci

      # Run in pinned Docker for font consistency
      - name: Playwright tests
        run: npx playwright test --reporter=html
        env:
          CI: true

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff
          path: test-results/

      # PR comment with diff images (optional)
      - name: Post diff to PR
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            const body = `❌ Visual regression detected. [View report](${process.env.RUN_URL})`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body,
            });
```

### Approval workflow

- PR-এ VRT fail → reviewer diff দেখে
- Intentional change → `npx playwright test --update-snapshots` → commit baseline
- Bug → fix code

### Branch baseline strategy

- `main` branch baseline = source of truth
- Feature branch tests against `main` baseline
- Merge হলে baseline auto-updated

---
