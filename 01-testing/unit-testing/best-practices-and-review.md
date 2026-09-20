# Unit Testing Best Practices and Review

## ✅ সেরা অনুশীলন (Best Practices)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ইউনিট টেস্টিং সেরা অনুশীলন                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ১. প্রতি টেস্টে একটি ধারণা (One Concept per Test)                 │
│     • একটি টেস্ট একটি জিনিসই যাচাই করবে                           │
│     • একাধিক assertion থাকতে পারে, তবে একই ধারণার জন্য              │
│                                                                     │
│  ২. বর্ণনামূলক নামকরণ                                              │
│     ❌ testCalculate()                                               │
│     ✅ it_calculates_vat_for_standard_rate()                        │
│     ✅ it_throws_when_amount_is_negative()                          │
│                                                                     │
│  ৩. AAA প্যাটার্ন অনুসরণ                                           │
│     Arrange → Act → Assert — তিনটি অংশ স্পষ্টভাবে আলাদা           │
│                                                                     │
│  ৪. টেস্ট ডেটা অর্থবহ হবে                                          │
│     ❌ assert(calc(1, 2), 3)                                        │
│     ✅ assert(calcVat(1000, 0.15), 150)  // ১০০০ টাকায় ১৫% VAT     │
│                                                                     │
│  ৫. Implementation নয়, Behavior টেস্ট করুন                         │
│     • কী return করে তা টেস্ট করুন, কীভাবে করে তা নয়               │
│     • Internal method call verify করবেন না (fragile হয়)             │
│                                                                     │
│  ৬. DRY নয়, DAMP (Descriptive And Meaningful Phrases)              │
│     • টেস্টে কিছুটা repetition গ্রহণযোগ্য                          │
│     • প্রতিটি টেস্ট স্বতন্ত্রভাবে পড়ে বোঝা যায় — এটাই গুরুত্বপূর্ণ │
│                                                                     │
│  ৭. টেস্ট তাড়াতাড়ি ও ঘন ঘন চালান                                 │
│     • প্রতিটি commit-এ, প্রতিটি PR-এ                                │
│     • CI/CD pipeline-এ স্বয়ংক্রিয়                                   │
│                                                                     │
│  ৮. Test Data Builder / Object Mother ব্যবহার করুন                 │
│     • জটিল অবজেক্ট তৈরির জন্য                                      │
│     • DRY setup, readable tests                                     │
│                                                                     │
│  ৯. Edge cases ভুলবেন না                                            │
│     • null, undefined, empty, boundary, overflow, special chars      │
│                                                                     │
│  ১০. টেস্ট কোডকেও production কোডের মতো maintain করুন              │
│      • ডেড টেস্ট মুছে ফেলুন, রিফ্যাক্টর করুন                       │
│      • কিন্তু পড়ার সুবিধার্থে কিছু repetition রাখুন                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚠️ অ্যান্টি-প্যাটার্নস (যা করবেন না)

### ১. Implementation টেস্টিং (Fragile Tests)

```php
<?php
// ❌ খারাপ — internal method call verify করছে
#[Test]
public function bad_test_checks_internal_calls(): void
{
    $calc = $this->createPartialMock(PriceCalculator::class, ['roundToTwoDecimals']);

    // রাউন্ডিং কীভাবে হচ্ছে সেটা টেস্ট — implementation বদলালে ভাঙবে
    $calc->expects($this->once())
         ->method('roundToTwoDecimals')
         ->with(150.00);

    $calc->calculateVat(1000.00, 0.15);
}

// ✅ ভালো — শুধু behavior (আউটপুট) টেস্ট করছে
#[Test]
public function good_test_checks_result(): void
{
    $calc = new PriceCalculator();
    $vat = $calc->calculateVat(1000.00, 0.15);
    $this->assertSame(150.00, $vat);
}
```

### ২. ধীর টেস্ট

```javascript
// ❌ খারাপ — আসল API কল, আসল টাইমআউট
test("slow: real API call", async () => {
  const result = await fetch("https://api.bkash.com/rate"); // ধীর + unreliable
  expect(result.status).toBe(200);
}, 30000);

// ✅ ভালো — mock ব্যবহার, মিলিসেকেন্ডে শেষ
test("fast: mocked response", async () => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    json: async () => ({ rate: 110.5 }),
  });

  const result = await fetch("https://api.bkash.com/rate");
  expect(result.status).toBe(200);
});
```

### ৩. God Test — একটি টেস্টে অনেক কিছু

```php
<?php
// ❌ খারাপ — একটি টেস্টে সবকিছু পরীক্ষা
#[Test]
public function test_everything(): void
{
    $service = new OrderService();

    // তৈরি
    $order = $service->create('CUST001', [['চাল', 65], ['ডাল', 120]]);
    $this->assertNotNull($order);

    // ক্যালকুলেশন
    $this->assertSame(185.00, $order->getSubtotal());

    // ভ্যাট
    $this->assertSame(27.75, $order->getVat());

    // ডিসকাউন্ট
    $order->applyDiscount(10);
    $this->assertSame(191.48, $order->getTotal());

    // ক্যান্সেল
    $order->cancel();
    $this->assertSame('cancelled', $order->getStatus());
}

// ✅ ভালো — প্রতিটি ধারণার জন্য আলাদা টেস্ট
#[Test]
public function it_calculates_subtotal(): void { /* ... */ }

#[Test]
public function it_adds_vat_to_subtotal(): void { /* ... */ }

#[Test]
public function it_applies_percentage_discount(): void { /* ... */ }

#[Test]
public function it_can_be_cancelled(): void { /* ... */ }
```

### ৪. টেস্টের মধ্যে নির্ভরতা (Shared State)

```javascript
// ❌ খারাপ — টেস্টগুলো একে অপরের উপর নির্ভরশীল
let counter = 0;

test("increment", () => {
  counter++;
  expect(counter).toBe(1);
});

test("depends on previous test", () => {
  // counter === 1 ধরে নিচ্ছে — আগের টেস্ট না চললে ফেইল!
  expect(counter).toBe(1);
  counter++;
  expect(counter).toBe(2);
});

// ✅ ভালো — প্রতিটি টেস্ট স্বাধীন
describe("Counter", () => {
  let counter;

  beforeEach(() => {
    counter = 0; // প্রতিবার fresh
  });

  test("increment once", () => {
    counter++;
    expect(counter).toBe(1);
  });

  test("increment twice", () => {
    counter++;
    counter++;
    expect(counter).toBe(2);
  });
});
```

### ৫. অন্যান্য অ্যান্টি-প্যাটার্নস

```
⚠️ এড়িয়ে চলুন:

• Hidden Test Logic — helper method-এ assert লুকানো
  (টেস্ট পড়ে বোঝা যায় না কী assert হচ্ছে)

• Flaky Tests — কখনো পাস, কখনো ফেইল
  (সাধারণত shared state, timing, বা external dependency-র কারণে)

• Testing Framework/Language Features
  (PHP-র array_map() কাজ করে কিনা টেস্ট করবেন না)

• Assertion Roulette — কোন assertion ফেইল করেছে বোঝা যায় না
  (assertion-এ message যোগ করুন)

• Test Without Assertion — টেস্ট চলে কিন্তু কিছু যাচাই করে না
  (PHPUnit-এ failOnRisky=true দিয়ে ধরা যায়)

• Copy-Paste Test — একই টেস্ট সামান্য পরিবর্তন করে কপি
  (DataProvider / test.each ব্যবহার করুন)
```

---

## 📋 সারসংক্ষেপ

```
ইউনিট টেস্টিং — মূল পাঠ সংক্ষেপে:

┌─────────────────────────────────────────────────────────────────┐
│  ধারণা              │  মূল কথা                                  │
├─────────────────────┼───────────────────────────────────────────┤
│  FIRST নীতি          │  Fast, Independent, Repeatable,          │
│                      │  Self-validating, Timely                  │
├─────────────────────┼───────────────────────────────────────────┤
│  AAA Pattern         │  Arrange → Act → Assert                  │
├─────────────────────┼───────────────────────────────────────────┤
│  Data Provider       │  একই লজিক, ভিন্ন ডেটা — DRY টেস্ট       │
├─────────────────────┼───────────────────────────────────────────┤
│  Edge Cases          │  null, empty, boundary, error paths      │
├─────────────────────┼───────────────────────────────────────────┤
│  SOLID = Testable    │  DI + Interface = সহজে mock করা যায়     │
├─────────────────────┼───────────────────────────────────────────┤
│  Coverage            │  পরিমাণ নয়, গুণমান দেখুন (mutation!)     │
├─────────────────────┼───────────────────────────────────────────┤
│  Behavior Test করুন  │  Implementation নয়, আউটপুট টেস্ট করুন   │
├─────────────────────┼───────────────────────────────────────────┤
│  Test = Doc          │  ভালো টেস্ট = জীবন্ত ডকুমেন্টেশন         │
└─────────────────────┴───────────────────────────────────────────┘

মনে রাখবেন: টেস্ট না থাকা মানে "কোড কাজ করে" এটা আশা করা।
টেস্ট থাকা মানে "কোড কাজ করে" এটা প্রমাণ করা। 🚀
```

---

> **"Legacy code is code without tests."** — Michael Feathers
>
> যে কোডে টেস্ট নেই, সেটাই legacy code — সে যতই নতুন হোক না কেন।
