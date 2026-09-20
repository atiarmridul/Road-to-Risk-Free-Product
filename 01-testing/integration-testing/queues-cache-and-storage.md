# Queue, Cache, and Storage Integration Testing

## ৪. Queue Integration Tests
Queue system টেস্টিং নিশ্চিত করে যে ব্যাকগ্রাউন্ড জব সঠিকভাবে dispatch, process এবং retry হচ্ছে।

### Laravel Queue::fake()
```php
<?php

namespace Tests\Feature\Queue;

use Tests\TestCase;
use App\Models\Order;
use App\Models\User;
use App\Jobs\ProcessPayment;
use App\Jobs\SendOrderConfirmation;
use App\Jobs\UpdateInventory;
use App\Jobs\NotifyShippingPartner;
use App\Notifications\OrderPlacedNotification;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderQueueTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function order_placement_dispatches_all_required_jobs(): void
    {
        Queue::fake();
        Notification::fake();

        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/orders', [
                'items' => [
                    ['product_id' => 1, 'quantity' => 2],
                    ['product_id' => 2, 'quantity' => 1],
                ],
                'shipping_address' => 'Uttara, Dhaka',
                'payment_method'   => 'bkash',
            ]);

        $response->assertStatus(201);

        // সঠিক জব dispatch হয়েছে কিনা
        Queue::assertPushed(ProcessPayment::class, function ($job) {
            return $job->paymentMethod === 'bkash';
        });

        Queue::assertPushed(SendOrderConfirmation::class);
        Queue::assertPushed(UpdateInventory::class);

        // শিপিং পার্টনারকে এখনো notify করা হয়নি (পেমেন্ট complete হওয়ার পরে হবে)
        Queue::assertNotPushed(NotifyShippingPartner::class);

        // জব চেইন সঠিকভাবে সেটআপ হয়েছে
        Queue::assertPushedOn('payments', ProcessPayment::class);
        Queue::assertPushedOn('notifications', SendOrderConfirmation::class);
        Queue::assertPushedOn('inventory', UpdateInventory::class);
    }

    /** @test */
    public function failed_payment_job_retries_and_notifies_admin(): void
    {
        $order = Order::factory()->create([
            'payment_method' => 'bkash',
            'total'          => 5000,
        ]);

        // আসল জব চালানো (fake ছাড়া)
        $job = new ProcessPayment($order);

        // Simulate bKash API failure
        Http::fake([
            'tokenized.sandbox.bka.sh/*' => Http::response([], 500),
        ]);

        try {
            $job->handle();
        } catch (\Exception $e) {
            // ৩ বার retry করার পরে failed হলে
            $job->failed($e);
        }

        $order->refresh();
        $this->assertEquals('payment_failed', $order->payment_status);

        // Admin notification পাঠানো হয়েছে
        $this->assertDatabaseHas('notifications', [
            'type' => 'App\Notifications\PaymentFailedNotification',
        ]);
    }
}
```

#### BullMQ Queue Test (Node.js)

```javascript
// tests/integration/queue.test.js
const { Queue, Worker, QueueEvents } = require("bullmq");
const IORedis = require("ioredis");
const { processOrderJob } = require("../../src/jobs/processOrder");
const { Order, User } = require("../../src/models");

const redisConnection = new IORedis({
  host: process.env.TEST_REDIS_HOST || "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

describe("Order Queue Integration (BullMQ)", () => {
  let orderQueue;
  let queueEvents;

  beforeAll(async () => {
    orderQueue = new Queue("order-processing-test", {
      connection: redisConnection,
    });
    queueEvents = new QueueEvents("order-processing-test", {
      connection: redisConnection,
    });
  });

  afterEach(async () => {
    await orderQueue.drain();
  });

  afterAll(async () => {
    await orderQueue.close();
    await queueEvents.close();
    await redisConnection.quit();
  });

  it("should process order job and update status", async () => {
    const user = await User.create({ name: "Test", email: "q@test.com" });
    const order = await Order.create({
      userId: user.id,
      status: "pending",
      totalAmount: 3000,
    });

    // জব যোগ করা
    const job = await orderQueue.add("process-order", {
      orderId: order.id,
      action: "confirm",
    });

    // Worker দিয়ে process করা
    const worker = new Worker("order-processing-test", processOrderJob, {
      connection: redisConnection,
    });

    // জব সম্পন্ন হওয়া পর্যন্ত অপেক্ষা
    await new Promise((resolve, reject) => {
      worker.on("completed", async (completedJob) => {
        if (completedJob.id === job.id) {
          resolve();
        }
      });
      worker.on("failed", (failedJob, err) => {
        if (failedJob.id === job.id) reject(err);
      });
    });

    await worker.close();

    const updatedOrder = await Order.findByPk(order.id);
    expect(updatedOrder.status).toBe("confirmed");
  });

  it("should handle job retries on transient failures", async () => {
    let attemptCount = 0;

    const worker = new Worker(
      "order-processing-test",
      async (job) => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error("Transient failure");
        }
        return { success: true };
      },
      {
        connection: redisConnection,
        settings: { backoffStrategy: () => 100 },
      },
    );

    const job = await orderQueue.add(
      "retry-test",
      { orderId: 999 },
      { attempts: 3, backoff: { type: "fixed", delay: 100 } },
    );

    await new Promise((resolve) => {
      worker.on("completed", (completedJob) => {
        if (completedJob.id === job.id) resolve();
      });
    });

    await worker.close();
    expect(attemptCount).toBe(3);
  });
});
```

---

### ৫. Cache Integration Tests

ক্যাশ ইন্টিগ্রেশন টেস্ট নিশ্চিত করে যে ক্যাশিং লজিক সঠিকভাবে কাজ করছে — cache hit, miss, invalidation এবং TTL।

```php
<?php

namespace Tests\Feature\Cache;

use Tests\TestCase;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductCacheTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function product_listing_is_cached_after_first_request(): void
    {
        Product::factory()->count(10)->create();
        Cache::flush();

        // প্রথম রিকোয়েস্ট — ক্যাশ miss, DB থেকে আনবে
        $this->getJson('/api/v1/products')->assertStatus(200);
        $this->assertTrue(Cache::has('products:page:1'));

        // দ্বিতীয় রিকোয়েস্ট — ক্যাশ থেকে আসবে
        $cachedResponse = Cache::get('products:page:1');
        $this->assertCount(10, $cachedResponse['data']);
    }

    /** @test */
    public function cache_invalidates_when_product_updated(): void
    {
        $product = Product::factory()->create(['name' => 'Old Name']);
        Cache::put("product:{$product->id}", $product, 3600);
        Cache::put('products:page:1', ['data' => [$product]], 3600);

        // প্রোডাক্ট আপডেট
        $this->actingAs(User::factory()->admin()->create(), 'sanctum')
            ->putJson("/api/v1/products/{$product->id}", ['name' => 'New Name']);

        // ক্যাশ invalidate হয়েছে
        $this->assertFalse(Cache::has("product:{$product->id}"));
        $this->assertFalse(Cache::has('products:page:1'));

        // নতুন রিকোয়েস্টে updated data আসবে
        $response = $this->getJson("/api/v1/products/{$product->id}");
        $response->assertJsonPath('data.name', 'New Name');
    }

    /** @test */
    public function cache_ttl_respected_correctly(): void
    {
        $service = app(ProductService::class);

        Product::factory()->create(['name' => 'Cached Item']);
        $service->getPopularProducts(); // ক্যাশে রাখা

        $this->assertTrue(Cache::has('popular_products'));

        // সময় এগিয়ে নিয়ে যাওয়া (TTL expire)
        $this->travel(2)->hours();

        $this->assertFalse(Cache::has('popular_products'));
    }
}
```

---

### ৬. File Storage Integration Tests

ফাইল আপলোড, প্রসেসিং এবং স্টোরেজ সংক্রান্ত ইন্টিগ্রেশন টেস্ট।

```php
<?php

namespace Tests\Feature\Storage;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FileUploadTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function product_image_upload_stores_and_resizes(): void
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();
        $product = Product::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson("/api/v1/products/{$product->id}/images", [
                'image' => UploadedFile::fake()->image('jamdani.jpg', 1200, 800),
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['data' => ['original_url', 'thumbnail_url']]);

        // Original ফাইল সেভ হয়েছে
        $imagePath = $response->json('data.original_path');
        Storage::disk('public')->assertExists($imagePath);

        // Thumbnail তৈরি হয়েছে
        $thumbnailPath = $response->json('data.thumbnail_path');
        Storage::disk('public')->assertExists($thumbnailPath);
    }

    /** @test */
    public function rejects_invalid_file_types(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();
        $product = Product::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson("/api/v1/products/{$product->id}/images", [
                'image' => UploadedFile::fake()->create('malware.exe', 500),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    /** @test */
    public function csv_import_processes_products_from_file(): void
    {
        Storage::fake('local');

        $csvContent = "name,price,category,stock\n"
            . "Hilsa Fish,800,food,100\n"
            . "Mango,150,food,500\n"
            . "Panjabi,2500,clothing,50";

        $file = UploadedFile::fake()->createWithContent('products.csv', $csvContent);

        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/v1/products/import', ['file' => $file]);

        $response->assertStatus(200)
            ->assertJson(['imported' => 3]);

        $this->assertDatabaseCount('products', 3);
        $this->assertDatabaseHas('products', [
            'name'  => 'Hilsa Fish',
            'price' => 800,
        ]);
    }

    /** @test */
    public function old_images_deleted_when_product_image_replaced(): void
    {
        Storage::fake('public');

        $admin = User::factory()->admin()->create();
        $product = Product::factory()->create();

        // প্রথম ইমেজ আপলোড
        $firstResponse = $this->actingAs($admin, 'sanctum')
            ->postJson("/api/v1/products/{$product->id}/images", [
                'image' => UploadedFile::fake()->image('first.jpg'),
            ]);

        $firstImagePath = $firstResponse->json('data.original_path');

        // নতুন ইমেজ আপলোড (replace)
        $this->actingAs($admin, 'sanctum')
            ->postJson("/api/v1/products/{$product->id}/images", [
                'image'   => UploadedFile::fake()->image('second.jpg'),
                'replace' => true,
            ]);

        // পুরোনো ইমেজ মুছে গেছে
        Storage::disk('public')->assertMissing($firstImagePath);
    }
}
```

---
