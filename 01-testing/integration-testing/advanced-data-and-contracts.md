# Advanced Integration Data and Contract Techniques

## 🔥 Advanced Integration Testing কৌশল

### ১. Test Database Strategies — ডাটাবেস কৌশল

ইন্টিগ্রেশন টেস্টে ডাটাবেস ব্যবস্থাপনা সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত। তিনটি প্রধান কৌশল:

```
┌────────────────────────────────────────────────────────────────┐
│              DATABASE STRATEGY COMPARISON                       │
├──────────────┬──────────────┬──────────────┬──────────────────┤
│              │ SQLite       │ Docker DB    │ Transactions     │
│              │ In-Memory    │              │                  │
├──────────────┼──────────────┼──────────────┼──────────────────┤
│ গতি         │ ⚡ সবচেয়ে দ্রুত │ 🐢 ধীর       │ ⚡ দ্রুত         │
│ বিশ্বস্ততা  │ ⚠️  কম        │ ✅ সর্বোচ্চ   │ ✅ উচ্চ          │
│ সেটআপ       │ সহজ          │ জটিল          │ সহজ              │
│ Isolation    │ ✅ প্রতিটি টেস্ট │ ✅ প্রতিটি রান │ ✅ প্রতিটি টেস্ট │
│ সীমাবদ্ধতা  │ DB-specific  │ রিসোর্স      │ Nested TX        │
│              │ features নেই │ প্রয়োজন     │ সমস্যা          │
└──────────────┴──────────────┴──────────────┴──────────────────┘
```

#### SQLite In-Memory (দ্রুত কিন্তু সীমিত)

```php
// phpunit.xml
<php>
    <env name="DB_CONNECTION" value="sqlite"/>
    <env name="DB_DATABASE" value=":memory:"/>
</php>
```

#### Docker Test Database (বিশ্বস্ত)

```yaml
# docker-compose.test.yml
version: "3.8"
services:
  test-db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: app_test
      MYSQL_ROOT_PASSWORD: test_secret
    ports:
      - "33061:3306"
    tmpfs:
      - /var/lib/mysql # RAM-এ চালানো দ্রুততার জন্য
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 10
```

```javascript
// jest.setup.js — Docker-based test DB config
const { Sequelize } = require("sequelize");

const testSequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 33061,
  username: "root",
  password: "test_secret",
  database: "app_test",
  logging: false,
});

beforeAll(async () => {
  await testSequelize.authenticate();
  await testSequelize.sync({ force: true });
});

afterAll(async () => {
  await testSequelize.close();
});

module.exports = testSequelize;
```

#### Transaction Wrapping (দ্রুত rollback)

```php
<?php
// Laravel DatabaseTransactions trait ব্যবহার
// প্রতিটি টেস্ট একটি transaction এ wrap হয় এবং শেষে rollback হয়

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FastDatabaseTest extends TestCase
{
    // RefreshDatabase-র বদলে DatabaseTransactions
    // RefreshDatabase: প্রতিটি টেস্টে migrate:fresh চালায় (ধীর)
    // DatabaseTransactions: শুধু rollback করে (দ্রুত)
    use DatabaseTransactions;

    /** @test */
    public function any_db_changes_auto_rollback_after_test(): void
    {
        // এই টেস্টে যা-ই create/update হোক, পরের টেস্টে থাকবে না
        $user = User::factory()->create();
        $this->assertDatabaseHas('users', ['id' => $user->id]);
        // টেস্ট শেষে automatic rollback
    }
}
```

---

### ২. Factory ও Seeder Patterns — টেস্ট ডাটা তৈরি

কার্যকর ইন্টিগ্রেশন টেস্টের জন্য বাস্তবসম্মত টেস্ট ডাটা অত্যন্ত গুরুত্বপূর্ণ।

#### Laravel Factory — উন্নত কৌশল

```php
<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'name'     => fake('bn_BD')->name(),
            'email'    => fake()->unique()->safeEmail(),
            'phone'    => '+880' . fake()->numerify('1#########'),
            'division' => fake()->randomElement([
                'Dhaka', 'Chittagong', 'Rajshahi',
                'Khulna', 'Barisal', 'Sylhet',
                'Rangpur', 'Mymensingh',
            ]),
            'password' => bcrypt('password'),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn () => ['role' => 'admin']);
    }

    public function merchant(): static
    {
        return $this->state(fn () => [
            'role'          => 'merchant',
            'business_name' => fake()->company(),
            'trade_license' => fake()->numerify('TL-####-####'),
        ]);
    }

    public function withVerifiedPhone(): static
    {
        return $this->state(fn () => [
            'phone_verified_at' => now(),
        ]);
    }

    public function fromDhaka(): static
    {
        return $this->state(fn () => [
            'division' => 'Dhaka',
            'district' => fake()->randomElement(['Dhaka', 'Gazipur', 'Narayanganj']),
        ]);
    }
}
```

```php
<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id'          => User::factory(),
            'status'           => 'pending',
            'total'            => fake()->randomFloat(2, 100, 50000),
            'payment_method'   => fake()->randomElement(['bkash', 'nagad', 'card', 'cod']),
            'payment_status'   => 'unpaid',
            'shipping_address' => fake()->address(),
        ];
    }

    public function completed(): static
    {
        return $this->state(fn () => [
            'status'         => 'completed',
            'payment_status' => 'paid',
            'completed_at'   => now(),
        ]);
    }

    public function withItems(int $count = 3): static
    {
        return $this->afterCreating(function (Order $order) use ($count) {
            $products = Product::factory()->count($count)->create();
            foreach ($products as $product) {
                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity'   => rand(1, 5),
                    'unit_price' => $product->price,
                ]);
            }
            $order->update(['total' => $order->items->sum(fn ($i) => $i->quantity * $i->unit_price)]);
        });
    }
}
```

#### টেস্টে ব্যবহার — জটিল সিনারিও

```php
/** @test */
public function monthly_sales_report_for_dhaka_merchants(): void
{
    // ৩ জন ঢাকার মার্চেন্ট, প্রত্যেকের ৫টি করে completed order
    $merchants = User::factory()
        ->count(3)
        ->merchant()
        ->fromDhaka()
        ->has(
            Order::factory()
                ->count(5)
                ->completed()
                ->withItems(2)
        )
        ->create();

    // রিপোর্ট API কল
    $response = $this->actingAs(User::factory()->admin()->create(), 'sanctum')
        ->getJson('/api/v1/reports/monthly-sales?division=Dhaka');

    $response->assertStatus(200)
        ->assertJsonPath('data.total_merchants', 3)
        ->assertJsonPath('data.total_orders', 15);
}
```

---

### ৩. Contract Testing (Pact) — Consumer-Driven Contracts

মাইক্রোসার্ভিস আর্কিটেকচারে Consumer-Driven Contract Testing নিশ্চিত করে যে সার্ভিসগুলো একে অপরের সাথে সামঞ্জস্যপূর্ণ (compatible) থাকে।

```
┌──────────────────────────────────────────────────┐
│            CONTRACT TESTING FLOW                  │
│                                                  │
│  Consumer (Order Service)    Provider (Payment)  │
│  ┌──────────────────────┐   ┌────────────────┐  │
│  │ 1. Define expected   │   │                │  │
│  │    interactions      │──▶│ 4. Verify the  │  │
│  │ 2. Generate contract │   │    contract    │  │
│  │    (Pact file)       │   │    against     │  │
│  │ 3. Publish to        │   │    real API    │  │
│  │    Pact Broker       │   │                │  │
│  └──────────────────────┘   └────────────────┘  │
│                                                  │
│  Contract = উভয় পক্ষের মধ্যে চুক্তি            │
│  Consumer যা আশা করে, Provider তা প্রদান করবে   │
└──────────────────────────────────────────────────┘
```

```javascript
// tests/contract/payment.consumer.pact.test.js
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");
const { like, eachLike, regex } = MatchersV3;
const PaymentClient = require("../../src/clients/PaymentClient");

const provider = new PactV3({
  consumer: "OrderService",
  provider: "PaymentService",
  dir: "./pacts",
});

describe("Payment Service Contract (Consumer Side)", () => {
  it("should initiate a bKash payment", async () => {
    // আমরা (Consumer) এটা আশা করি Provider থেকে
    await provider
      .given("a valid order exists")
      .uponReceiving("a request to initiate bKash payment")
      .withRequest({
        method: "POST",
        path: "/api/payments/initiate",
        headers: { "Content-Type": "application/json" },
        body: {
          orderId: like("ORD-12345"),
          amount: like(2500.0),
          currency: "BDT",
          method: "bkash",
          callbackUrl: like("https://example.com/callback"),
        },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          paymentId: like("PAY-67890"),
          redirectUrl: regex(
            /https:\/\/.+\.bka\.sh\/.+/,
            "https://sandbox.payment.bka.sh/redirect/abc123",
          ),
          status: "initiated",
          expiresAt: like("2025-01-15T10:30:00Z"),
        },
      })
      .executeTest(async (mockServer) => {
        const client = new PaymentClient(mockServer.url);
        const result = await client.initiatePayment({
          orderId: "ORD-12345",
          amount: 2500.0,
          currency: "BDT",
          method: "bkash",
          callbackUrl: "https://example.com/callback",
        });

        expect(result.paymentId).toBeDefined();
        expect(result.redirectUrl).toMatch(/bka\.sh/);
        expect(result.status).toBe("initiated");
      });
  });

  it("should handle payment verification", async () => {
    await provider
      .given("a completed payment exists")
      .uponReceiving("a request to verify payment")
      .withRequest({
        method: "GET",
        path: regex(/\/api\/payments\/PAY-\w+/, "/api/payments/PAY-67890"),
      })
      .willRespondWith({
        status: 200,
        body: {
          paymentId: like("PAY-67890"),
          transactionId: like("TRX-11111"),
          status: "completed",
          amount: like(2500.0),
          paidAt: like("2025-01-15T10:35:00Z"),
        },
      })
      .executeTest(async (mockServer) => {
        const client = new PaymentClient(mockServer.url);
        const result = await client.verifyPayment("PAY-67890");

        expect(result.status).toBe("completed");
        expect(result.transactionId).toBeDefined();
      });
  });
});
```

---

### ৪. API Snapshot Testing

API রেসপন্সের কাঠামো যাতে অজান্তে পরিবর্তন না হয়, তা নিশ্চিত করতে snapshot testing ব্যবহার করা হয়।

```javascript
// tests/integration/api-snapshot.test.js
const request = require("supertest");
const app = require("../../src/app");

describe("API Response Snapshot Tests", () => {
  it("should match product list response structure", async () => {
    const res = await request(app).get("/api/v1/products").expect(200);

    // প্রথমবার চালালে snapshot তৈরি হবে
    // পরবর্তীতে কোনো পরিবর্তন হলে টেস্ট fail করবে
    expect(res.body).toMatchSnapshot({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          created_at: expect.any(String),
        }),
      ]),
      meta: {
        current_page: expect.any(Number),
        total: expect.any(Number),
        per_page: expect.any(Number),
      },
    });
  });

  it("should match error response format consistently", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send({}) // খালি body
      .expect(422);

    expect(res.body).toMatchSnapshot({
      message: expect.any(String),
      errors: expect.any(Array),
    });
  });
});
```

#### Laravel API Snapshot

```php
/** @test */
public function product_api_response_matches_snapshot(): void
{
    Product::factory()->count(3)->create();

    $response = $this->getJson('/api/v1/products');

    // assertJsonStructure snapshot হিসেবে কাজ করে
    $response->assertJsonStructure([
        'data' => [
            '*' => [
                'id', 'name', 'slug', 'price', 'category',
                'stock', 'description', 'images',
                'created_at', 'updated_at',
            ],
        ],
        'links' => ['first', 'last', 'prev', 'next'],
        'meta'  => [
            'current_page', 'from', 'last_page',
            'per_page', 'to', 'total',
        ],
    ]);
}
```

---
