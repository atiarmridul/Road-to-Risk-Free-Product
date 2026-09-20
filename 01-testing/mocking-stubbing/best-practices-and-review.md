# Mocking Best Practices and Review

## ✅ Best Practices — সর্বোত্তম অনুশীলন

### ১. Arrange-Act-Assert (AAA) প্যাটার্ন অনুসরণ করুন

```php
public function test_payment_processing(): void
{
    // Arrange — প্রস্তুতি
    $mock = Mockery::mock(PaymentGateway::class);
    $mock->shouldReceive('charge')->andReturn('TRX_123');
    $service = new PaymentService($mock);

    // Act — কাজ সম্পাদন
    $result = $service->processPayment('01712345678', 500);

    // Assert — যাচাই
    $this->assertEquals('TRX_123', $result->getTransactionId());
}
```

### ২. Interface-এর বিপরীতে Mock করুন, Concrete Class-এর বিপরীতে নয়

```php
// ✅ সঠিক
$mock = Mockery::mock(PaymentGatewayInterface::class);

// ❌ ভুল — concrete class mock করলে internal implementation-এ coupling হয়
$mock = Mockery::mock(BkashPaymentGateway::class);
```

### ৩. প্রতিটি টেস্টে একটি মাত্র বিষয় যাচাই করুন

```php
// ✅ সঠিক — একটি দিক যাচাই
public function test_insufficient_balance_returns_error(): void { /* ... */ }
public function test_successful_payment_returns_trx_id(): void { /* ... */ }

// ❌ ভুল — অনেক কিছু একসাথে যাচাই
public function test_payment(): void
{
    // balance check, charge, notification, logging... সব একসাথে
}
```

### ৪. Test Setup-এ Helper Method ব্যবহার করুন

```php
class PaymentServiceTest extends TestCase
{
    private function createServiceWithMockedGateway(
        float $balance = 5000.00,
        string $trxId = 'TRX_DEFAULT'
    ): PaymentService {
        $gateway = Mockery::mock(PaymentGatewayInterface::class);
        $gateway->shouldReceive('getBalance')->andReturn($balance);
        $gateway->shouldReceive('charge')->andReturn($trxId);

        return new PaymentService($gateway);
    }

    public function test_example(): void
    {
        $service = $this->createServiceWithMockedGateway(balance: 500.00);
        // ...
    }
}
```

### ৫. Mock পরিষ্কার করুন

```php
// PHP Mockery
protected function tearDown(): void
{
    Mockery::close();
}
```

```javascript
// Jest
afterEach(() => {
  jest.restoreAllMocks();
  nock.cleanAll();
});
```

### ৬. Behavior টেস্ট করুন, Implementation নয়

```php
// ✅ সঠিক — behavior যাচাই
$this->assertTrue($service->hasInsufficientBalance('017xxx', 1000));

// ❌ ভুল — implementation detail যাচাই (এটা ভেঙে যাবে যদি internal logic বদলায়)
$mock->shouldHaveReceived('getBalance')->once();
$mock->shouldHaveReceived('calculateFee')->once();
$mock->shouldHaveReceived('checkMinimumBalance')->once();
```

---

## ⚠️ Anti-Patterns — যা করবেন না

### ১. সবকিছু Mock করা (Over-Mocking)

```php
// ❌ অতিরিক্ত Mock — আপনি কোনো আসল কোডই টেস্ট করছেন না
public function test_over_mocked(): void
{
    $mockUser = Mockery::mock(User::class);
    $mockUser->shouldReceive('getName')->andReturn('রহিম');

    $mockRepo = Mockery::mock(UserRepository::class);
    $mockRepo->shouldReceive('find')->andReturn($mockUser);

    $mockFormatter = Mockery::mock(NameFormatter::class);
    $mockFormatter->shouldReceive('format')->andReturn('জনাব রহিম');

    // আসলে কিছুই টেস্ট হচ্ছে না — শুধু mock-দের wire করেছেন
}
```

### ২. Implementation Details টেস্ট করা

```php
// ❌ ভুল — internal method কল টেস্ট করা
$service->shouldHaveReceived('validateInput')->once();
$service->shouldHaveReceived('sanitizeData')->once();
$service->shouldHaveReceived('transformResult')->once();

// ✅ সঠিক — observable behavior টেস্ট করা
$this->assertEquals($expected, $service->processOrder($input));
```

### ৩. Mock-এ Fragile Matching

```php
// ❌ ভুল — খুব নির্দিষ্ট argument matching
$mock->shouldReceive('send')
     ->with('01712345678', 'আপনার OTP: 123456, মেয়াদ: ৫ মিনিট, তারিখ: ২০২৪-০৬-১৫');

// ✅ সঠিক — গুরুত্বপূর্ণ অংশ যাচাই
$mock->shouldReceive('send')
     ->with('01712345678', Mockery::pattern('/OTP: \d{6}/'));
```

### ৪. God Mock — একটি Mock অনেক কাজ করে

```php
// ❌ ভুল — একটি mock-এ ১০টি method setup
$mock = Mockery::mock(EverythingService::class);
$mock->shouldReceive('getUser')->andReturn(/*...*/);
$mock->shouldReceive('getBalance')->andReturn(/*...*/);
$mock->shouldReceive('getTransactions')->andReturn(/*...*/);
// ... আরো ১০টি method

// ✅ সঠিক — Interface Segregation + প্রতিটি dependency আলাদা mock
$userRepo = Mockery::mock(UserRepository::class);
$balanceService = Mockery::mock(BalanceService::class);
```

### ৫. টেস্টে Production Logic রাখা

```javascript
// ❌ ভুল — টেস্টে production logic পুনরায় লেখা
test("ফি সঠিকভাবে গণনা হয়", () => {
  const amount = 1000;
  const fee = amount * 0.015; // production logic এখানে repeat হচ্ছে!

  expect(service.calculateFee(amount)).toBe(fee);
});

// ✅ সঠিক — expected value সরাসরি লেখা
test("ফি সঠিকভাবে গণনা হয়", () => {
  expect(service.calculateFee(1000)).toBe(15);
});
```

---

## 📋 Test Double তুলনা সারণী

| বৈশিষ্ট্য             | Dummy          | Stub                        | Spy               | Mock               | Fake                   |
| --------------------- | -------------- | --------------------------- | ----------------- | ------------------ | ---------------------- |
| **উদ্দেশ্য**          | Parameter পূরণ | নির্দিষ্ট মান ফেরত          | কল রেকর্ড         | প্রত্যাশা যাচাই    | সরলীকৃত বাস্তবায়ন     |
| **আচরণ আছে?**         | ❌             | সীমিত                       | সীমিত             | সীমিত              | ✅ সম্পূর্ণ            |
| **Verification**      | কোনোটা না      | State                       | Behavior (পরে)    | Behavior (আগে)     | State                  |
| **জটিলতা**            | ⭐             | ⭐⭐                        | ⭐⭐⭐            | ⭐⭐⭐⭐           | ⭐⭐⭐⭐⭐             |
| **ব্যবহার ক্ষেত্র**   | Constructor    | Indirect input              | Side effect যাচাই | Interaction যাচাই  | Complex dependency     |
| **PHP টুল**           | createMock()   | willReturn()                | Mockery::spy()    | shouldReceive()    | নিজে লিখুন             |
| **Jest টুল**          | `{}` / `null`  | jest.fn().mockReturnValue() | jest.spyOn()      | jest.fn() + expect | নিজে লিখুন             |
| **পুনঃব্যবহারযোগ্য?** | ❌             | ❌                          | ❌                | ❌                 | ✅                     |
| **রক্ষণাবেক্ষণ**      | কম             | কম                          | মাঝারি            | বেশি               | বেশি (কিন্তু মূল্যবান) |

---

## 📝 সারসংক্ষেপ

### মূল শিক্ষা

১. **Test Double বুঝুন** — Dummy, Stub, Spy, Mock, Fake প্রতিটির নির্দিষ্ট ব্যবহার আছে। সব জায়গায় Mock ব্যবহার করবেন না।

২. **Boundary-তে Mock করুন** — external system (বিকাশ API, SMS gateway, ডাটাবেস) mock করুন, আপনার নিজের domain logic mock করবেন না।

৩. **Behavior টেস্ট করুন, Implementation নয়** — method কতবার কল হলো তার চেয়ে গুরুত্বপূর্ণ হলো সঠিক ফলাফল পাওয়া।

৪. **Contract Test লিখুন** — আপনার Fake/Mock আসল implementation-এর সাথে সামঞ্জস্যপূর্ণ কিনা নিশ্চিত করুন।

৫. **Test Confidence Spectrum** — Unit test দিয়ে দ্রুত ফিডব্যাক পান, Integration/E2E দিয়ে আত্মবিশ্বাস বাড়ান। সঠিক ভারসাম্য বজায় রাখুন।

৬. **Over-Mocking এড়িয়ে চলুন** — যদি আপনার টেস্ট শুধু mock setup আর verification-ই হয়, তাহলে আপনি সম্ভবত ভুল জিনিস টেস্ট করছেন।

### দ্রুত সিদ্ধান্ত গাইড

```
dependency কি external system (API, DB, File)?
  ├─ হ্যাঁ → Mock/Fake ব্যবহার করুন
  └─ না → dependency কি side-effect free?
       ├─ হ্যাঁ → আসল object ব্যবহার করুন
       └─ না → dependency কি ধীর বা flaky?
            ├─ হ্যাঁ → Fake তৈরি করুন (InMemory)
            └─ না → আসল object ব্যবহার করুন
```

> **"Write tests that give you confidence, not tests that give you coverage."**
> — কোড কাভারেজ নয়, আত্মবিশ্বাস অর্জন করুন আপনার টেস্ট থেকে। ✨
