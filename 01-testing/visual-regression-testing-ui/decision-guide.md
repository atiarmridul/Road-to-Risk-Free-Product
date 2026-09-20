# Visual Regression Decision Guide

## ✅ কখন VRT ব্যবহার করবেন

- Design system / component library
- Marketing/landing page (CSS regression critical)
- E-commerce product/checkout pages (revenue impact)
- Multi-locale app (বাংলা layout break সহজে হয়)
- Cross-browser/device support critical (BD-তে old Android, low-end devices)
- Frequent CSS refactor / Tailwind migration
- A11y theme switching (dark mode, high contrast)

## ❌ কখন এড়াবেন / সীমিত করবেন

- Highly dynamic content (real-time dashboard, news feed) — flaky
- A/B test variation overload
- Solo dev / খুব ছোট app — ROI low
- Server-rendered এ massive content variation
- প্রতিটি minor change-এ baseline update দরকার এমন rapid prototyping

---

## 🇧🇩 Bangladesh Real-world VRT Wins

- **Pathao app** (web admin): ২০২৪-এ Tailwind v3 → v4 migration-এ ১২+ component-এ subtle padding/border-radius regression — Chromatic CI-এ ধরা পড়ে production-এ যাওয়ার আগে।
- **Daraz BD:** Festival sale (১১.১১, ১২.১২) banner-এ ১০-১৫টা campaign UI; প্রতিটার জন্য Storybook story ও Chromatic VRT — designer manual review-এ ১ দিন; CI-এ ১৫ মিনিট।
- **bKash app web:** Dark mode rollout-এ contrast ratio ১৭টা component-এ broken — Storybook + Loki ধরেছে।
- **Foodpanda BD:** Vendor dashboard-এ Bangla menu name long text overflow — Playwright screenshot test catch।
- **Chaldal:** Reorder card button hover state regression visible only on Firefox; cross-browser VRT না থাকলে miss হতো।
- **Sheba.xyz:** Service category card responsive break iPad portrait-এ; BackstopJS catch।
- **Bangladesh Bank portal:** Mostly static, কিন্তু font upgrade (SolaimanLipi → Tiro Bangla) সব page-এ subtle break — VRT essential।
- **Pathao Pay Merchant Portal:** QR code rendering library upgrade-এ ১ pixel offset broke scanner alignment; pixel-diff catch।

---

## ⚠️ Common Pitfalls

1. **Anti-aliasing flakiness ignore** — every CI run-এ random failures; team eventually disables VRT।
2. **Baseline drift** — careless `--update-snapshots` দিয়ে bug-ই baseline হয়ে যাওয়া।
3. **Auto-approve all** — reviewer cursorily click "approve all changes" → regression slip।
4. **No font loading wait** — bangla font load before screenshot capture না হলে fallback render।
5. **Animation/transition not disabled** — capture mid-animation।
6. **Dynamic content (date, random ad)** mask না করা।
7. **Same baseline cross-browser/cross-OS** — Linux Chrome ও macOS Chrome ভিন্ন → CI ও local mismatch।
8. **Massive baseline repo** — git history bloat; LFS or external store (S3) consider।
9. **Test runs only on main** — feature branch-এ regression detect হয় না।
10. **No threshold tuning** — too tight = flaky, too loose = miss bug। Per-component tuning দরকার।
11. **Only desktop tested** — BD-তে ৭০% mobile traffic; mobile snapshot mandatory।
12. **VRT replaces accessibility/functional test** — VRT pixel দেখে, screen reader experience দেখে না।

---

## 📊 Tooling Decision Matrix

| Need                              | Recommendation                   |
| --------------------------------- | -------------------------------- |
| OSS, self-hosted, page-level      | BackstopJS / Playwright snapshot |
| Storybook component + cloud       | Chromatic                        |
| Storybook component + self-hosted | Loki                             |
| Already on Cypress                | Percy + Cypress                  |
| AI-driven, enterprise             | Applitools Eyes                  |
| Generic CI image diff with S3     | reg-suit                         |
| Playwright user → built-in        | Playwright `toHaveScreenshot`    |

---

## 📝 সারসংক্ষেপ

- **VRT = automated screenshot comparison** যা functional test-এর gap পূরণ করে — UI broken হলে ধরে।
- **Pixel-diff vs Perceptual diff:** Anti-aliasing, font, animation-এর কারণে pure pixel-diff flaky; SSIM/looks-same/odiff perceptual ভালো।
- **Tools:** Percy, Chromatic (cloud), BackstopJS, Playwright snapshot, Loki, reg-suit (self-hosted)।
- **Component-level (Storybook) + Page-level (Playwright)** — দুটোই দরকার।
- **Flakiness handling:** disable animations, font ready wait, mask dynamic content, Docker for OS consistency।
- **CI integration:** PR fail → reviewer diff approve/reject; baseline updated on merge।
- **Cross-browser/device matrix** essential — BD-তে mobile + low-end Android coverage critical।
- **BD wins:** Daraz festival UI, bKash dark mode, Pathao Tailwind migration — VRT-এর জন্যই production save।
- **Pitfalls:** baseline drift, auto-approve, font/animation flakiness, mobile skip — disciplined process required।
