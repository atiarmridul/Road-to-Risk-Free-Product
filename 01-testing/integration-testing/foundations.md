# Integration Testing Foundations

> **সহজভাবে / In simple words:** Integration testing checks whether two or more parts of a system work together correctly.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** A feature may work alone but fail when it talks to a database, API, queue, or another service.


> **"Unit tests tell you that the gears work. Integration tests tell you that the gears mesh."** — অর্থাৎ, Unit test প্রতিটি গিয়ার আলাদাভাবে ঘোরে কিনা তা পরীক্ষা করে, কিন্তু Integration test নিশ্চিত করে যে গিয়ারগুলো একসাথে কাজ করছে।

---

## 📌 সংজ্ঞা ও পরিসর

### Unit vs Integration vs E2E — মৌলিক পার্থক্য

সফটওয়্যার টেস্টিং পিরামিডে তিনটি প্রধান স্তর রয়েছে। প্রতিটির উদ্দেশ্য এবং কাভারেজ সম্পূর্ণ আলাদা:

| বৈশিষ্ট্য        | Unit Test                 | Integration Test     | E2E Test                    |
| ---------------- | ------------------------- | -------------------- | --------------------------- |
| **পরিসর**        | একটি ফাংশন/মেথড           | একাধিক মডিউলের সংযোগ | সম্পূর্ণ ব্যবহারকারী প্রবাহ |
| **গতি**          | অত্যন্ত দ্রুত (ms)        | মাঝারি (সেকেন্ড)     | ধীর (মিনিট)                 |
| **নির্ভরতা**     | কোনো বাহ্যিক নির্ভরতা নেই | ডাটাবেস, API, ক্যাশ  | ব্রাউজার, সম্পূর্ণ ইনফ্রা   |
| **ভঙ্গুরতা**     | কম                        | মাঝারি               | বেশি                        |
| **আত্মবিশ্বাস**  | নিম্ন-মাঝারি              | উচ্চ                 | সর্বোচ্চ                    |
| **রক্ষণাবেক্ষণ** | সহজ                       | মাঝারি               | কঠিন                        |
| **উদাহরণ**       | `calculateTax()`          | API → DB → Response  | Login → Order → Payment     |

### ইন্টিগ্রেশন টেস্ট আসলে কী পরীক্ষা করে?

ইন্টিগ্রেশন টেস্ট সিস্টেমের বিভিন্ন কম্পোনেন্টের **মধ্যবর্তী সংযোগস্থল** (interface) পরীক্ষা করে। এটি নিশ্চিত করে যে:

- **HTTP Layer → Controller → Service → Repository → Database** — এই সম্পূর্ণ চেইন সঠিকভাবে কাজ করছে
- ডাটাবেস কুয়েরি প্রকৃত ডাটায় সঠিক ফলাফল দিচ্ছে
- API রিকোয়েস্ট ও রেসপন্স সঠিক ফরম্যাটে আসছে
- বাহ্যিক সার্ভিস কল (পেমেন্ট গেটওয়ে, SMS API) সঠিকভাবে হ্যান্ডেল হচ্ছে
- Authentication ও Authorization middleware সঠিকভাবে কাজ করছে
- Queue, Cache এবং Event System একসাথে সঠিকভাবে interact করছে

**বাংলাদেশ প্রসঙ্গ:** ধরুন আপনি bKash পেমেন্ট ইন্টিগ্রেশন তৈরি করছেন। Unit test শুধু amount validation পরীক্ষা করবে। কিন্তু Integration test পরীক্ষা করবে — API call → bKash sandbox → callback handle → ডাটাবেসে transaction save → user notification পাঠানো — এই সম্পূর্ণ প্রবাহ।

---

## 📊 Integration Test Scope — আর্কিটেকচারাল ডায়াগ্রাম

```
┌─────────────────────────────────────────────────────────────────────┐
│                    INTEGRATION TEST BOUNDARY                        │
│                                                                     │
│  ┌──────────┐    ┌────────────┐    ┌───────────┐    ┌────────────┐ │
│  │  HTTP     │───▶│ Controller │───▶│  Service  │───▶│ Repository │ │
│  │  Request  │    │ Middleware │    │   Layer   │    │   Layer    │ │
│  └──────────┘    └────────────┘    └─────┬─────┘    └─────┬──────┘ │
│                                          │                │        │
│                    ┌─────────────────────┼────────────────┤        │
│                    │                     │                │        │
│              ┌─────▼─────┐    ┌─────────▼──┐    ┌───────▼──────┐ │
│              │   Queue    │    │   Cache     │    │  Database    │ │
│              │ (Redis/    │    │ (Redis/     │    │ (MySQL/      │ │
│              │  BullMQ)   │    │  Memcached) │    │  PostgreSQL) │ │
│              └────────────┘    └────────────┘    └──────────────┘ │
│                                                                     │
│  ┌──────────────────┐    ┌──────────────────┐                      │
│  │ External APIs     │    │ File Storage     │                      │
│  │ (bKash, SSLComm,  │    │ (S3, Local)      │                      │
│  │  SMS Gateway)     │    │                  │                      │
│  └──────────────────┘    └──────────────────┘                      │
│                                                                     │
│  ◄─── এই সীমানার ভেতরে সব কিছু integration test এ cover হয় ───►  │
└─────────────────────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────┐
    │          TEST ISOLATION STRATEGIES              │
    │                                                │
    │  Real DB  ◄──── SQLite in-memory / Docker DB   │
    │  Real API ◄──── Http::fake() / nock            │
    │  Real Queue ◄── Queue::fake()                  │
    │  Real Cache ◄── Cache store: array             │
    │  Real Storage ◄─ Storage::fake()               │
    └────────────────────────────────────────────────┘
```

---
