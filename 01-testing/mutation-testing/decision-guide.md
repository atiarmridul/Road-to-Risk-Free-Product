# Mutation Testing Decision Guide

## ✅ কখন ব্যবহার করবেন

| পরিস্থিতি                                   | কেন দরকার                                               |
| ------------------------------------------- | ------------------------------------------------------- |
| টেস্ট সুইটের কার্যকারিতা যাচাই করতে         | Code coverage উচ্চ কিন্তু টেস্ট কতটা শক্তিশালী তা জানতে |
| Critical business logic-এ                   | পেমেন্ট, ডিসকাউন্ট, অথেন্টিকেশন — যেখানে বাগ ব্যয়বহুল  |
| Legacy code-এ টেস্ট যোগ করার পর             | নতুন টেস্টগুলো আসলেই কার্যকর কিনা যাচাই করতে            |
| Code review-তে টেস্ট কোয়ালিটি নিশ্চিত করতে | PR-এ টেস্ট আছে, কিন্তু সেগুলো মানসম্মত কিনা             |
| CI pipeline-এ quality gate হিসেবে           | সর্বনিম্ন mutation score enforce করতে                   |

## ❌ কখন করবেন না / সীমাবদ্ধতা

| পরিস্থিতি                            | কারণ                                                  |
| ------------------------------------ | ----------------------------------------------------- |
| প্রতিটি commit-এ সম্পূর্ণ codebase-এ | অনেক ধীর — নির্দিষ্ট changed files-এ চালান            |
| UI/View layer-এ                      | Template/rendering কোডে mutation testing কম কার্যকর   |
| Configuration/boilerplate কোডে       | মূল্যবান তথ্য দেয় না                                 |
| টেস্ট সুইট না থাকলে                  | আগে unit test লিখুন, তারপর mutation testing           |
| Equivalent mutant বেশি হলে           | কিছু কোড pattern-এ false positive বেশি হয়, সময় নষ্ট |
| খুব বড় codebase-এ একবারে            | incremental/focused ভাবে চালান                        |

---

## 🧠 সিনিয়র ইঞ্জিনিয়ারদের জন্য পরামর্শ

১. **Incremental Mutation Testing করুন** — সম্পূর্ণ codebase-এ না চালিয়ে শুধু পরিবর্তিত ফাইলগুলোতে চালান। Infection-এ `--git-diff-filter=AM` ব্যবহার করুন।

২. **Survived Mutants বিশ্লেষণ করুন** — প্রতিটি survived mutant একটি সম্ভাব্য দুর্বল assertion বা missing test case নির্দেশ করে। এগুলো ঠিক করলে টেস্ট সুইট শক্তিশালী হবে।

৩. **MSI Threshold সেট করুন** — CI/CD-তে সর্বনিম্ন mutation score enforce করুন। PHP-তে `--min-msi=70`, Stryker-এ `thresholds.break: 50`।

৪. **Equivalent Mutants চিহ্নিত করুন** — কিছু mutation কোডের আচরণ পরিবর্তন করে না। এগুলো `@infection-ignore-all` বা Stryker-এর `// Stryker disable` দিয়ে বাদ দিন।

৫. **Code Coverage-র সাথে মিলিয়ে ব্যবহার করুন** — আগে coverage বাড়ান, তারপর mutation testing দিয়ে টেস্টের গুণগত মান বাড়ান। দুটি একে অপরের পরিপূরক।

> **মনে রাখবেন**: "১০০% code coverage মানে কোড bug-free নয় — mutation testing দিয়ে নিশ্চিত করুন যে আপনার টেস্ট আসলেই কিছু যাচাই করছে।" 🎯
