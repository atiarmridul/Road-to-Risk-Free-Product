# Test Double Foundations

> **সহজভাবে / In simple words:** Mocks and stubs are controlled stand-ins for real dependencies such as databases or payment services.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** They make tests faster and let us simulate success, failure, and rare situations.


> **"ইউনিট টেস্ট মানে একটি ইউনিটকে তার সকল dependency থেকে বিচ্ছিন্ন করে পরীক্ষা করা। Test Doubles হলো সেই বিচ্ছিন্নতা অর্জনের হাতিয়ার।"**

---

## 📌 সংজ্ঞা — Test Doubles Taxonomy

Gerard Meszaros তাঁর _xUnit Test Patterns_ বইতে **Test Double** শব্দটি প্রথম ব্যবহার করেন। সিনেমার "stunt double" থেকে ধারণাটি নেওয়া — যেমন একজন stunt double আসল অভিনেতার বদলে বিপজ্জনক দৃশ্যে কাজ করে, তেমনি Test Double আসল dependency-র বদলে টেস্টে কাজ করে।

Test Double-এর **পাঁচটি** মূল প্রকারভেদ:

| প্রকার    | উদ্দেশ্য                           | আচরণ পরীক্ষা করে? | State পরীক্ষা করে? |
| --------- | ---------------------------------- | ----------------- | ------------------ |
| **Dummy** | শুধু parameter পূরণ করতে           | ❌                | ❌                 |
| **Stub**  | পূর্বনির্ধারিত মান ফেরত দেয়       | ❌                | ✅                 |
| **Spy**   | interaction রেকর্ড করে             | ✅ (পরে যাচাই)    | ✅                 |
| **Mock**  | প্রত্যাশা পূর্বনির্ধারিত থাকে      | ✅ (আগে থেকে সেট) | ❌                 |
| **Fake**  | সরলীকৃত কিন্তু কার্যকরী বাস্তবায়ন | ❌                | ✅                 |

### মূল পার্থক্য: State Verification vs Behavior Verification

Martin Fowler এই দুটি পদ্ধতির মধ্যে গুরুত্বপূর্ণ পার্থক্য টানেন:

- **State Verification (Stub/Fake):** টেস্ট শেষে সিস্টেমের **অবস্থা** (state) পরীক্ষা করা হয়। "ফলাফল কী হলো?"
- **Behavior Verification (Mock/Spy):** সিস্টেম নির্দিষ্ট **পদ্ধতিতে** কাজ করেছে কিনা যাচাই করা হয়। "কীভাবে কাজটি হলো?"

---

## 📊 Test Double Relationship — সম্পর্ক চিত্র

```
                        ┌─────────────────────────┐
                        │      Test Double         │
                        │  (Generic Substitute)    │
                        └────────────┬────────────┘
                                     │
            ┌────────────┬───────────┼───────────┬────────────┐
            ▼            ▼           ▼           ▼            ▼
       ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
       │  Dummy  │ │  Stub   │ │   Spy   │ │  Mock   │ │  Fake   │
       │         │ │         │ │         │ │         │ │         │
       │ কোনো    │ │ নির্দিষ্ট│ │ কল      │ │পূর্ব-    │ │ সরলীকৃত │
       │ আচরণ   │ │ মান     │ │ রেকর্ড  │ │নির্ধারিত│ │ কার্যকরী │
       │ নেই    │ │ ফেরত   │ │ করে    │ │প্রত্যাশা│ │ বাস্তবায়ন│
       └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
            │            │           │           │            │
            ▼            ▼           ▼           ▼            ▼
       Parameter    Indirect      Indirect   Indirect    Lightweight
       Filling      Input         Output     Output      Implementation
                    Control       Verif.     Verif.

       ◄──── জটিলতা বৃদ্ধি (Increasing Complexity) ────────────────►
       ◄──── কম আচরণ ──────────────────────── বেশি আচরণ ──────────►
```

```
  ┌──────────────────── Verification Style ────────────────────┐
  │                                                             │
  │   State Verification          Behavior Verification         │
  │   ┌───────────────┐          ┌───────────────────┐         │
  │   │ Stub          │          │ Mock               │         │
  │   │ Fake          │          │ Spy                │         │
  │   └───────────────┘          └───────────────────┘         │
  │                                                             │
  │   "ফলাফল কী হলো?"           "কীভাবে কাজ করলো?"            │
  └─────────────────────────────────────────────────────────────┘
```

---
