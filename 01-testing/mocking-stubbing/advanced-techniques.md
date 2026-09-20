# Advanced Mocking Techniques

## 🔥 Advanced টপিকস

---

### ১. HTTP কল মকিং — বিকাশ API ও Node.js nock

বাস্তব প্রজেক্টে সবচেয়ে বেশি mock করা হয় external HTTP API কল। বাংলাদেশের প্রেক্ষাপটে বিকাশ, নগদ, SSL Commerz-এর মতো payment gateway-র API call mock করা অত্যন্ত গুরুত্বপূর্ণ।

#### PHP — Laravel Http::fake() sequence ব্যবহার

```php
<?php

class BkashTokenFlowTest extends \Tests\TestCase
{
    public function test_token_refresh_on_expiry(): void
    {
        Http::fake([
            '*/token/grant' => Http::sequence()
                ->push(['id_token' => 'token_1', 'expires_in' => 3600], 200)
                ->push(['id_token' => 'token_2', 'expires_in' => 3600], 200),

            '*/payment/create' => Http::sequence()
                ->push(['error' => 'Token expired'], 401)  // প্রথমবার: expired
                ->push(['paymentID' => 'PAY_456'], 200),   // retry-তে সফল
        ]);

        $service = app(BkashPaymentService::class);
        $result = $service->createPaymentWithRetry(1000.00, '01712345678');

        $this->assertEquals('PAY_456', $result['paymentID']);

        // মোট ৪টি HTTP কল হওয়া উচিত:
        // token_grant → payment_create (401) → token_grant → payment_create (200)
        Http::assertSentCount(4);
    }

    public function test_handles_bkash_api_timeout(): void
    {
        Http::fake([
            '*/payment/create' => function () {
                throw new \Illuminate\Http\Client\ConnectionException('Connection timed out');
            },
        ]);

        $service = app(BkashPaymentService::class);

        $this->expectException(PaymentGatewayException::class);
        $this->expectExceptionMessage('বিকাশ সার্ভার অনুপলব্ধ');
        $service->createPayment(500.00, '01712345678');
    }
}
```

#### JavaScript — nock দিয়ে HTTP মকিং

```javascript
const nock = require("nock");
const { BkashClient } = require("./bkashClient");

describe("bKash API Client", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("সফল পেমেন্ট তৈরি", async () => {
    // bKash sandbox API mock
    const scope = nock("https://tokenized.sandbox.bka.sh")
      .post("/v1.2.0-beta/tokenized/checkout/token/grant")
      .reply(200, {
        id_token: "fake_token",
        token_type: "Bearer",
      })
      .post("/v1.2.0-beta/tokenized/checkout/payment/create")
      .reply(200, {
        paymentID: "PAY_789",
        bkashURL: "https://sandbox.payment.bkash.com?paymentId=PAY_789",
      });

    const client = new BkashClient({
      appKey: "test_key",
      appSecret: "test_secret",
    });

    const result = await client.createPayment(500, "01712345678");

    expect(result.paymentID).toBe("PAY_789");
    expect(scope.isDone()).toBe(true); // সব mock endpoint কল হয়েছে
  });

  test("নেটওয়ার্ক ত্রুটি হ্যান্ডলিং", async () => {
    nock("https://tokenized.sandbox.bka.sh")
      .post("/v1.2.0-beta/tokenized/checkout/token/grant")
      .replyWithError("ETIMEDOUT");

    const client = new BkashClient({ appKey: "test", appSecret: "test" });

    await expect(client.createPayment(500, "01712345678")).rejects.toThrow(
      "ETIMEDOUT",
    );
  });

  test("retry logic — ৩ বার চেষ্টা করে", async () => {
    const scope = nock("https://tokenized.sandbox.bka.sh")
      .post("/v1.2.0-beta/tokenized/checkout/token/grant")
      .times(3) // ৩ বার ব্যর্থ
      .reply(503, { message: "Service Unavailable" });

    const client = new BkashClient({
      appKey: "test",
      appSecret: "test",
      maxRetries: 3,
    });

    await expect(client.createPayment(500, "01712345678")).rejects.toThrow();

    expect(scope.isDone()).toBe(true);
  });
});
```

---

### ২. Database Mocking — Repository Pattern

ডাটাবেস mock করার সবচেয়ে কার্যকর উপায় হলো Repository Pattern ব্যবহার করা। Interface-এর বিপরীতে প্রোগ্রাম করলে সহজেই InMemory বাস্তবায়ন দিয়ে আসল database প্রতিস্থাপন করা যায়।

```php
<?php

interface ProductRepository
{
    public function findById(string $id): ?Product;
    public function findByCategory(string $category): array;
    public function save(Product $product): void;
    public function search(string $query): array;
}

// Production — Eloquent ব্যবহার করে
class EloquentProductRepository implements ProductRepository
{
    public function findById(string $id): ?Product
    {
        return ProductModel::find($id)?->toDomainEntity();
    }
    // ...
}

// Test — In-Memory বাস্তবায়ন
class InMemoryProductRepository implements ProductRepository
{
    private array $products = [];

    public function findById(string $id): ?Product
    {
        return $this->products[$id] ?? null;
    }

    public function findByCategory(string $category): array
    {
        return array_filter($this->products, fn(Product $p) => $p->getCategory() === $category);
    }

    public function save(Product $product): void
    {
        $this->products[$product->getId()] = $product;
    }

    public function search(string $query): array
    {
        return array_filter($this->products, fn(Product $p) =>
            str_contains(strtolower($p->getName()), strtolower($query))
        );
    }

    // টেস্ট হেল্পার — একাধিক product একসাথে যোগ
    public function seedWith(array $products): void
    {
        foreach ($products as $product) {
            $this->save($product);
        }
    }
}

class ProductSearchTest extends \PHPUnit\Framework\TestCase
{
    private InMemoryProductRepository $repo;
    private ProductSearchService $service;

    protected function setUp(): void
    {
        $this->repo = new InMemoryProductRepository();
        $this->service = new ProductSearchService($this->repo);

        $this->repo->seedWith([
            new Product('1', 'বিরিয়ানি মসলা', 'মসলা', 120),
            new Product('2', 'চিংড়ি মাছ', 'মাছ', 800),
            new Product('3', 'বাসমতি চাল', 'চাল', 350),
            new Product('4', 'মসলা চা', 'পানীয়', 200),
        ]);
    }

    public function test_search_finds_matching_products(): void
    {
        $results = $this->service->search('মসলা');

        $this->assertCount(2, $results); // 'বিরিয়ানি মসলা' ও 'মসলা চা'
    }

    public function test_search_returns_empty_for_no_match(): void
    {
        $results = $this->service->search('ল্যাপটপ');

        $this->assertEmpty($results);
    }
}
```

---

### ৩. সময় (Time) মকিং

সময়-নির্ভর কোড টেস্ট করা কঠিন — কারণ `now()` প্রতিবার ভিন্ন মান দেয়। সময় freeze করে এই সমস্যা সমাধান করা যায়।

#### PHP — Carbon::setTestNow()

```php
<?php

use Carbon\Carbon;

class SubscriptionService
{
    public function isExpired(Subscription $subscription): bool
    {
        return Carbon::now()->isAfter($subscription->getExpiresAt());
    }

    public function getDaysRemaining(Subscription $subscription): int
    {
        return max(0, Carbon::now()->diffInDays($subscription->getExpiresAt(), false));
    }
}

class SubscriptionServiceTest extends \PHPUnit\Framework\TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow(); // সময় reset
    }

    public function test_subscription_not_expired_before_date(): void
    {
        Carbon::setTestNow('2024-06-15 10:00:00'); // সময় freeze

        $subscription = new Subscription(expiresAt: Carbon::parse('2024-07-15'));
        $service = new SubscriptionService();

        $this->assertFalse($service->isExpired($subscription));
        $this->assertEquals(30, $service->getDaysRemaining($subscription));
    }

    public function test_subscription_expired_after_date(): void
    {
        Carbon::setTestNow('2024-08-01 00:00:00');

        $subscription = new Subscription(expiresAt: Carbon::parse('2024-07-15'));
        $service = new SubscriptionService();

        $this->assertTrue($service->isExpired($subscription));
        $this->assertEquals(0, $service->getDaysRemaining($subscription));
    }

    public function test_time_dependent_discount(): void
    {
        // রমজান মাসে বিশেষ ছাড়
        Carbon::setTestNow('2024-03-15'); // রমজান ২০২৪

        $service = new DiscountService();

        $this->assertTrue($service->isRamadanDiscount());
    }
}
```

#### JavaScript — jest.useFakeTimers()

```javascript
class TokenManager {
  constructor() {
    this.tokens = new Map();
  }

  createToken(userId, ttlMs = 3600000) {
    // ১ ঘণ্টা
    const token = `tok_${Math.random().toString(36).slice(2)}`;
    this.tokens.set(token, {
      userId,
      expiresAt: Date.now() + ttlMs,
    });
    return token;
  }

  isValid(token) {
    const data = this.tokens.get(token);
    if (!data) return false;
    return Date.now() < data.expiresAt;
  }
}

describe("TokenManager — সময় মকিং", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-06-15T10:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("নতুন token valid থাকে", () => {
    const manager = new TokenManager();
    const token = manager.createToken("user_1");

    expect(manager.isValid(token)).toBe(true);
  });

  test("মেয়াদ উত্তীর্ণ হলে token invalid হয়", () => {
    const manager = new TokenManager();
    const token = manager.createToken("user_1", 60000); // ১ মিনিট

    // ২ মিনিট পরের সময়ে যাই
    jest.advanceTimersByTime(120000);

    expect(manager.isValid(token)).toBe(false);
  });

  test("setTimeout/setInterval mock", () => {
    const callback = jest.fn();

    setTimeout(callback, 5000); // ৫ সেকেন্ড পরে

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

---

### ৪. Partial Mocks — শুধু নির্দিষ্ট methods mock করা

কখনো কখনো পুরো class mock করা দরকার হয় না — শুধু একটি বা দুটি method mock করলেই চলে। বাকি methods আসল implementation ব্যবহার করে।

```php
<?php

class ReportService
{
    public function generateMonthlyReport(int $month, int $year): array
    {
        $data = $this->fetchDataFromDatabase($month, $year);
        return $this->formatReport($data);
    }

    protected function fetchDataFromDatabase(int $month, int $year): array
    {
        // ভারী ডাটাবেস query — এটা mock করতে চাই
        return DB::table('transactions')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->get()
            ->toArray();
    }

    public function formatReport(array $data): array
    {
        // এটা আসল logic — mock করব না
        $total = array_sum(array_column($data, 'amount'));
        return [
            'total' => $total,
            'count' => count($data),
            'average' => count($data) > 0 ? $total / count($data) : 0,
        ];
    }
}

class ReportServiceTest extends \PHPUnit\Framework\TestCase
{
    public function test_monthly_report_calculation(): void
    {
        // Partial Mock — শুধু fetchDataFromDatabase mock করা
        $service = Mockery::mock(ReportService::class)->makePartial();
        $service->shouldReceive('fetchDataFromDatabase')
                ->with(6, 2024)
                ->andReturn([
                    ['amount' => 5000],
                    ['amount' => 3000],
                    ['amount' => 7000],
                ]);

        $report = $service->generateMonthlyReport(6, 2024);

        $this->assertEquals(15000, $report['total']);
        $this->assertEquals(3, $report['count']);
        $this->assertEquals(5000, $report['average']);
    }
}
```

```javascript
// JavaScript — Partial Mock
class NotificationService {
  async sendAll(userId, message) {
    const [smsResult, emailResult] = await Promise.all([
      this.sendSms(userId, message),
      this.sendEmail(userId, message),
    ]);
    return { sms: smsResult, email: emailResult };
  }

  async sendSms(userId, message) {
    // আসল SMS API কল
  }

  async sendEmail(userId, message) {
    // আসল Email API কল
  }
}

describe("Partial Mock", () => {
  test("শুধু SMS mock করে email আসল রাখা", async () => {
    const service = new NotificationService();

    // শুধু sendSms mock — sendEmail আসল থাকবে
    jest.spyOn(service, "sendSms").mockResolvedValue({ sent: true });
    jest.spyOn(service, "sendEmail").mockResolvedValue({ sent: true });

    const result = await service.sendAll("user_1", "Hello");

    expect(service.sendSms).toHaveBeenCalledWith("user_1", "Hello");
    expect(result.sms).toEqual({ sent: true });
  });
});
```

---

### ৫. Static Methods / Facades মকিং

Static method mock করা কঠিন কারণ এগুলো class-level-এ কাজ করে, instance-level-এ নয়। Laravel Facade এই সমস্যার চমৎকার সমাধান দেয়।

```php
<?php

// Laravel Facade মকিং
class PaymentControllerTest extends \Tests\TestCase
{
    public function test_payment_gateway_facade(): void
    {
        // Facade::shouldReceive() — static call mock করে
        PaymentGateway::shouldReceive('charge')
            ->once()
            ->with('01712345678', 500.00, 'BDT')
            ->andReturn(['trx_id' => 'TRX_123', 'status' => 'success']);

        $response = $this->postJson('/api/payments', [
            'account' => '01712345678',
            'amount' => 500.00,
            'currency' => 'BDT',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['trx_id' => 'TRX_123']);
    }

    // Cache Facade mock
    public function test_cached_exchange_rate(): void
    {
        Cache::shouldReceive('remember')
             ->once()
             ->andReturn(110.50); // ১ USD = ১১০.৫০ BDT

        $service = app(ExchangeRateService::class);
        $rate = $service->getUsdToBdtRate();

        $this->assertEquals(110.50, $rate);
    }
}
```

---
