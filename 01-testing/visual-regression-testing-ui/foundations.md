# Visual Regression Testing Foundations

> **সহজভাবে / In simple words:** Visual regression testing compares screenshots to detect unexpected changes in appearance.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It catches layout, color, spacing, and responsive-design problems that functional assertions may miss.


## 📖 সংজ্ঞা ও মূল ধারণা

**Visual Regression Testing (VRT)** হলো একটি automated testing কৌশল যেখানে UI screenshot বা rendered DOM স্ক্রিনশট baseline এর সাথে compare করে unintended visual change detect করা হয়। Functional test pass করেও UI broken হতে পারে — button overlap, text overflow, color drift, font missing, responsive break — এগুলো শুধু চোখে দেখা যায়। VRT এই gap পূরণ করে।

```
Developer commits CSS change
            │
            ▼
   ┌────────────────┐
   │  CI build & run │
   │ E2E + Storybook │
   └────────┬───────┘
            │ capture screenshots
            ▼
   ┌────────────────┐
   │  Compare with   │
   │  baseline images│
   └────────┬───────┘
            │
       ┌────┴────┐
       │ Diff?   │
       ├────┬────┤
       NO   YES
        │    │
        ▼    ▼
      Pass  Reviewer-এ pixel-diff পাঠানো হয়:
            "Approve" → new baseline
            "Reject"  → bug, fail build
```

---

## 🎯 কেন প্রয়োজন

### Functional test যা ধরতে পারে না

- ✅ "Login button click works" — Cypress pass
- ❌ "Login button overlap with logo on iPhone SE" — Cypress assertion-এ ধরা পড়বে না

### Real-world UI bug examples (BD context)

- **Pathao app:** নতুন BDT formatter "৳1,000.00" pricing card overflow
- **Daraz product card:** Bangla long text "মাইক্রোসফ্ট সারফেস প্রো ৯ ইন্টেল ই্ভো প্ল্যাটফর্ম" নতুন font-এ truncation broken
- **bKash dashboard:** Dark mode toggle introduce — primary CTA invisible
- **Foodpanda menu:** Image lazy-load placeholder color scheme regression
- **Chaldal cart:** Quantity stepper button rounded → square accidentally

প্রতিটা defect manual QA-এ ধরা পড়ার আগে user-এ পৌঁছায়। VRT prod-এ যাওয়ার আগে CI-তেই ধরে।

---

## 🔬 Pixel-diff vs Perceptual diff

### Pixel-diff (naive)

প্রতিটা pixel-এর RGB compare; এক pixel ভিন্ন → fail।

**সমস্যা:**

- Anti-aliasing-এ subtle pixel difference (browser version)
- Font rendering OS-ভিন্ন (macOS subpixel vs Linux freetype)
- Animation/spinner frame-এ আলাদা
- Date/time dynamic content

### Perceptual diff (smarter)

Human vision model ব্যবহার (luminance, contrast, ssim, dssim)। ছোট difference (e.g., 0.1% area) ignore।

```
Tolerance options:
├─ pixelDiff: pixel-by-pixel exact (strictest)
├─ pixelMatchJS: with anti-aliasing detection
├─ SSIM (Structural Similarity): perceptual
├─ Looks-Same / odiff: handles rendering variance
└─ Resemble.js: ignoreColors, ignoreAntialiasing options
```

**Best practice:** Threshold 0.1-0.2% pixel difference allow; large region change = real bug।

---

## 🛠️ Tools Overview

| Tool                                    | Type                   | Hosting                  | Best for                         |
| --------------------------------------- | ---------------------- | ------------------------ | -------------------------------- |
| **Percy** (BrowserStack)                | Page-level + Component | Cloud (paid)             | Full-app E2E + cross-browser     |
| **Chromatic**                           | Storybook component    | Cloud (free tier)        | Component library, design system |
| **BackstopJS**                          | Page-level             | Self-hosted (free)       | Self-hosted, simple CI           |
| **Playwright snapshot**                 | Page-level             | Self-hosted              | Already using Playwright         |
| **Cypress + Percy / @cypress/snapshot** | Page-level             | Mix                      | Cypress-based suites             |
| **Storybook + Loki**                    | Component              | Self-hosted              | Storybook without Chromatic cost |
| **Reg-Suit**                            | Generic                | Self-hosted (S3 backend) | Custom workflow, OSS             |
| **Applitools Eyes**                     | AI-powered             | Cloud (enterprise)       | Cross-browser, AI-driven         |

---
