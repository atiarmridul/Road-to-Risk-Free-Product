# 📘 Testing Foundations

> **সহজভাবে / In simple words:** Software testing is the process of learning whether a product behaves as expected and where risk remains.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** This overview connects the main testing levels and techniques before you study them separately.


> সফটওয়্যার টেস্টিংয়ের বিভিন্ন স্তর ও কৌশল।
> প্রতিটি টপিকে PHPUnit (PHP) ও Jest (JS) উদাহরণ, Advanced patterns, এবং CI/CD integration সহ গভীর বিশ্লেষণ।

---

## 📂 টপিক সূচি

| #   | বিষয়                       | ফাইল                                                   | মূল বিষয়বস্তু                                                                                |
| --- | --------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| ১   | ইউনিট টেস্টিং               | [unit-testing](unit-testing/unit-testing.md)                         | FIRST principles, PHPUnit Attributes, Jest matchers, DataProvider, Snapshot, Mutation Testing |
| ২   | ইন্টিগ্রেশন টেস্টিং         | [integration-testing](integration-testing/integration-testing.md)   | API/DB/Queue/Cache Testing, Contract Testing (Pact), Docker Compose, CI/CD                    |
| ৩   | E2E টেস্টিং                 | [e2e-testing](e2e-end-to-end-testing/e2e-end-to-end-testing.md)     | Cypress, Playwright, Laravel Dusk, Visual Regression, Accessibility (axe-core)                |
| ৪   | TDD                         | [tdd](tdd/tdd.md)                                                   | Red-Green-Refactor, Inside-Out vs Outside-In, BDD (Behat/Cucumber), TDD Kata                  |
| ৫   | মকিং ও স্টাবিং              | [mocking](mocking-stubbing/mocking-stubbing.md)                     | ৫ Test Doubles (Dummy/Stub/Spy/Mock/Fake), Mockery, Laravel Fakes, Over-mocking               |
| ৬   | টেস্ট কভারেজ                | [test-coverage](test-coverage/test-coverage.md)                     | ৬ Coverage Types, Mutation Testing (Infection/Stryker), CI Thresholds, SonarQube              |
| ৭   | পারফরম্যান্স টেস্টিং        | [performance-testing](performance-testing/performance-testing.md)   | Load/Stress Testing, k6, JMeter, Artillery                                                    |
| ৮   | কন্ট্র্যাক্ট টেস্টিং        | [contract-testing](contract-testing/contract-testing.md)           | Consumer-Driven Contracts, Pact Framework                                                     |
| ৯   | মিউটেশন টেস্টিং             | [mutation-testing](mutation-testing/mutation-testing.md)           | Mutators, Kill Score, Infection, Stryker                                                      |
| ১০  | ভিজ্যুয়াল রিগ্রেশন টেস্টিং | [visual-regression](visual-regression-testing-ui/visual-regression-testing-ui.md) | Percy, Chromatic, BackstopJS, Playwright snapshot, Storybook + Loki, flakiness handling       |

---

## 🗺️ টেস্টিং পিরামিড

```
          ┌───────────┐
          │   E2E     │  ← কম সংখ্যক, ধীর, ব্যয়বহুল
          │ (Cypress/  │
          │ Playwright)│
          ├───────────┤
          │Integration │  ← মাঝারি সংখ্যক
          │ (API/DB    │
          │  Tests)    │
          ├───────────┤
          │   Unit     │  ← বেশি সংখ্যক, দ্রুত, সস্তা
          │ (PHPUnit/  │
          │   Jest)    │
          └───────────┘
```

---

## 📖 প্রতিটি টপিকে যা পাবেন

- ✅ বাংলায় বিস্তারিত ব্যাখ্যা
- ✅ PHPUnit (PHP) ও Jest (JS) কোড উদাহরণ
- ✅ Advanced patterns (TDD, Mutation Testing, Contract Testing)
- ✅ CI/CD integration (GitHub Actions)
- ✅ Best Practices ও Anti-patterns
- ✅ বাংলাদেশ context (bKash validation, BDT calculations)
