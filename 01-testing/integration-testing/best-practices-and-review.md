# Integration Testing Best Practices and Review

## ✅ Best Practices — সর্বোত্তম চর্চা

### ১. টেস্ট আইসোলেশন নিশ্চিত করুন

```php
// ✅ ভালো — প্রতিটি টেস্ট স্বনির্ভর
/** @test */
public function user_can_place_order(): void
{
    // এই টেস্টের নিজস্ব ডাটা তৈরি
    $user = User::factory()->create();
    $product = Product::factory()->create(['stock' => 10]);

    $response = $this->actingAs($user)->postJson('/api/orders', [...]);
    $response->assertStatus(201);
}

// ❌ খারাপ — অন্য টেস্টের ডাটার উপর নির্ভরশীল
/** @test */
public function user_can_place_order(): void
{
    // ধরে নেওয়া হচ্ছে DB তে user আছে — ভঙ্গুর!
    $response = $this->postJson('/api/orders', [...]);
}
```

### ২. Arrange-Act-Assert প্যাটার্ন মেনে চলুন

```php
/** @test */
public function discount_applied_for_bulk_orders(): void
{
    // ARRANGE — প্রস্তুতি
    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 100, 'bulk_discount_threshold' => 10]);

    // ACT — কাজ
    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/orders', [
            'items' => [['product_id' => $product->id, 'quantity' => 15]],
            'shipping_address' => 'Gulshan, Dhaka',
            'payment_method' => 'cod',
        ]);

    // ASSERT — যাচাই
    $response->assertStatus(201);
    $order = Order::latest()->first();
    $this->assertTrue($order->total < 1500); // ডিসকাউন্ট প্রয়োগ হয়েছে
}
```

### ৩. টেস্ট ডাটা ফ্যাক্টরি ব্যবহার করুন

```javascript
// ✅ ভালো — ফ্যাক্টরি প্যাটার্ন
const { createTestUser, createTestProduct } = require("../factories");

it("should create order", async () => {
  const user = await createTestUser({ role: "customer" });
  const product = await createTestProduct({ price: 500, stock: 10 });
  // ...
});

// ❌ খারাপ — হার্ডকোডেড ডাটা সরাসরি টেস্টে
it("should create order", async () => {
  await db.query(
    "INSERT INTO users (id, name, email) VALUES (1, 'Test', 'test@x.com')",
  );
  await db.query(
    "INSERT INTO products (id, name, price) VALUES (1, 'Item', 500)",
  );
  // ...
});
```

### ৪. টাইমআউট ও ফ্লেকি টেস্ট সামলান

```javascript
// ✅ ভালো — নির্দিষ্ট timeout এবং retry logic
jest.setTimeout(15000);

it("should process payment webhook", async () => {
  // waitFor pattern ব্যবহার করুন polling-এর বদলে
  await waitForCondition(
    async () => {
      const order = await Order.findByPk(orderId);
      return order.status === "paid";
    },
    { timeout: 5000, interval: 200 },
  );
});
```

### ৫. Environment Configuration আলাদা রাখুন

```
# .env.testing
APP_ENV=testing
DB_DATABASE=app_test
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
MAIL_MAILER=array
BKASH_MODE=sandbox
SMS_GATEWAY=mock
```

---

## ⚠️ Anti-patterns — যা এড়িয়ে চলবেন

### ১. টেস্টের মধ্যে পারস্পরিক নির্ভরতা

```php
// ❌ অত্যন্ত খারাপ — টেস্ট ক্রম-নির্ভর
public function test_1_create_user(): void
{
    $this->postJson('/api/users', ['name' => 'Rahim'])->assertStatus(201);
}

public function test_2_user_can_login(): void
{
    // test_1 আগে চলতে হবে — ভঙ্গুর!
    $this->postJson('/api/login', ['name' => 'Rahim'])->assertStatus(200);
}
```

### ২. Sleep() ব্যবহার করে টাইমিং নিয়ন্ত্রণ

```javascript
// ❌ খারাপ — নির্দিষ্ট সময়ে sleep
it("should update after processing", async () => {
  await triggerProcessing();
  await new Promise((r) => setTimeout(r, 3000)); // CI তে fail হতে পারে
  const result = await getResult();
});

// ✅ ভালো — condition-based waiting
it("should update after processing", async () => {
  await triggerProcessing();
  const result = await pollUntil(() => getResult(), {
    condition: (r) => r.status === "done",
    timeout: 10000,
  });
  expect(result.status).toBe("done");
});
```

### ৩. Production Database এ টেস্ট চালানো

```php
// ❌ বিপজ্জনক — production DB ব্যবহার
// .env এ DB_DATABASE=production_db রেখে টেস্ট চালানো

// ✅ নিরাপদ — আলাদা test database এবং safeguard
// TestCase.php এ check যোগ করুন
protected function setUp(): void
{
    parent::setUp();

    if (config('database.connections.mysql.database') === 'production_db') {
        $this->fail('DANGER: Tests are running against production database!');
    }
}
```

### ৪. অতিরিক্ত Mocking — সব কিছু fake করে দেওয়া

```php
// ❌ খারাপ — সব কিছু mock করলে integration test-র উদ্দেশ্য নষ্ট হয়
/** @test */
public function create_order(): void
{
    $mockRepo = Mockery::mock(OrderRepository::class);
    $mockService = Mockery::mock(PaymentService::class);
    $mockCache = Mockery::mock(CacheManager::class);
    // এটা unit test হয়ে গেছে, integration test নয়!
}

// ✅ ভালো — শুধু বাহ্যিক সার্ভিস mock করুন
/** @test */
public function create_order(): void
{
    Http::fake([...]); // শুধু বাহ্যিক API mock
    // DB, Cache, Queue — সব real ব্যবহার করুন
}
```

### ৫. Flaky Test উপেক্ষা করা

```javascript
// ❌ খারাপ — flaky test কে skip করে এগিয়ে যাওয়া
it.skip('should handle concurrent orders', async () => { ... });

// ✅ ভালো — মূল কারণ খুঁজে বের করা
// সাধারণত flaky test-এর কারণ:
// - Race condition (সমাধান: proper locking/waiting)
// - Shared state (সমাধান: test isolation)
// - Time dependency (সমাধান: clock mocking)
// - Network dependency (সমাধান: proper mocking)
```

---

## 📋 সারসংক্ষেপ

### মূল পয়েন্টগুলো

```
┌──────────────────────────────────────────────────────────────┐
│               INTEGRATION TESTING CHECKLIST                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ API Endpoints — সব route সঠিক response দিচ্ছে          │
│  ✅ Database — CRUD, relations, constraints কাজ করছে        │
│  ✅ Authentication — login, token, permission ঠিক আছে      │
│  ✅ External APIs — bKash, SMS gateway mock করে টেস্ট       │
│  ✅ Queue Jobs — dispatch, process, retry সঠিক              │
│  ✅ Cache — hit, miss, invalidation কাজ করছে               │
│  ✅ File Upload — store, validate, delete ঠিক আছে          │
│  ✅ Error Handling — সব edge case handle হচ্ছে              │
│  ✅ Test Isolation — প্রতিটি টেস্ট স্বনির্ভর               │
│  ✅ CI/CD — পাইপলাইনে স্বয়ংক্রিয়ভাবে চলছে               │
│                                                              │
│  📊 লক্ষ্যমাত্রা:                                           │
│     - Critical paths: ১০০% coverage                          │
│     - Integration tests: মোট টেস্টের ২০-৩০%                 │
│     - Execution time: ৫ মিনিটের নিচে (parallel)             │
│     - Flaky rate: ১% এর কম                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### কখন কোন ধরনের টেস্ট লিখবেন?

| পরিস্থিতি                  | টেস্ট ধরন                    |
| -------------------------- | ---------------------------- |
| নতুন API endpoint          | HTTP Integration Test        |
| জটিল DB query/relationship | Database Integration Test    |
| বাহ্যিক API (bKash, SMS)   | Mocked External Service Test |
| ব্যাকগ্রাউন্ড জব           | Queue Integration Test       |
| ক্যাশিং লজিক               | Cache Integration Test       |
| ফাইল আপলোড                 | Storage Integration Test     |
| মাইক্রোসার্ভিস যোগাযোগ     | Contract Test (Pact)         |
| রিয়েল-টাইম ফিচার          | WebSocket Integration Test   |

### বাংলাদেশ প্রসঙ্গে বিশেষ বিবেচনা

- **পেমেন্ট গেটওয়ে:** bKash, Nagad, SSLCommerz — সবসময় sandbox mode এ টেস্ট করুন। `Http::fake()` বা `nock` দিয়ে timeout, error, success সব সিনারিও কভার করুন।
- **SMS Gateway:** BulkSMSBD, Infobip — OTP rate limiting, delivery status, বাংলা SMS encoding টেস্ট করুন।
- **ভ্যাট ক্যালকুলেশন:** বাংলাদেশের ১৫% VAT এবং বিভিন্ন পণ্যের ভিন্ন ভ্যাট হার সঠিকভাবে টেস্ট করুন।
- **মোবাইল নম্বর ভ্যালিডেশন:** বাংলাদেশি মোবাইল নম্বর ফরম্যাট (`+8801XXXXXXXXX`) সঠিকভাবে validate হচ্ছে কিনা টেস্ট করুন।

> **মনে রাখুন:** ইন্টিগ্রেশন টেস্ট আপনার সিস্টেমের বিভিন্ন অংশ একসাথে সঠিকভাবে কাজ করছে কিনা তার নিশ্চয়তা দেয়। Unit test যেখানে শেষ, সেখানে integration test শুরু — আর integration test যেখানে শেষ, সেখানে E2E test শুরু। তিনটি মিলেই সম্পূর্ণ টেস্টিং কৌশল।
