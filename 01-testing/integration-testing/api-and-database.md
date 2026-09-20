# API and Database Integration Testing

## ১. API/HTTP Integration Tests
এটি সবচেয়ে সাধারণ ধরনের ইন্টিগ্রেশন টেস্ট। পুরো HTTP lifecycle — request → middleware → controller → service → database → response — সম্পূর্ণ chain পরীক্ষা করা হয়।

### Laravel Feature Test (PHP/PHPUnit)
```php
<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $customer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->admin()->create();
        $this->customer = User::factory()->create();
    }

    /** @test */
    public function authenticated_admin_can_create_product(): void
    {
        $productData = [
            'name'        => 'Premium Jamdani Saree',
            'price'       => 15000.00,
            'category'    => 'clothing',
            'stock'       => 50,
            'description' => 'Handwoven Jamdani from Demra',
        ];

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/products', $productData);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'name'     => 'Premium Jamdani Saree',
                    'price'    => 15000.00,
                    'category' => 'clothing',
                    'stock'    => 50,
                ],
                'message' => 'Product created successfully',
            ])
            ->assertJsonStructure([
                'data' => ['id', 'name', 'price', 'category', 'stock', 'slug', 'created_at'],
                'message',
            ]);

        // ডাটাবেসে সত্যিই সেভ হয়েছে কিনা যাচাই
        $this->assertDatabaseHas('products', [
            'name'  => 'Premium Jamdani Saree',
            'price' => 15000.00,
        ]);
    }

    /** @test */
    public function regular_customer_cannot_create_product(): void
    {
        $response = $this->actingAs($this->customer, 'sanctum')
            ->postJson('/api/v1/products', [
                'name'  => 'Test Product',
                'price' => 100,
            ]);

        $response->assertStatus(403)
            ->assertJson(['message' => 'Unauthorized action.']);
    }

    /** @test */
    public function product_listing_supports_filtering_and_pagination(): void
    {
        Product::factory()->count(25)->create(['category' => 'electronics']);
        Product::factory()->count(10)->create(['category' => 'clothing']);

        $response = $this->getJson('/api/v1/products?category=electronics&per_page=10&page=2');

        $response->assertStatus(200)
            ->assertJsonCount(10, 'data')
            ->assertJsonPath('meta.total', 25)
            ->assertJsonPath('meta.current_page', 2)
            ->assertJsonPath('meta.per_page', 10)
            ->assertJsonFragment(['category' => 'electronics']);

        // clothing ক্যাটেগরি এই রেসপন্সে থাকবে না
        $response->assertJsonMissing(['category' => 'clothing']);
    }

    /** @test */
    public function product_search_returns_relevant_results(): void
    {
        Product::factory()->create(['name' => 'Organic Hilsa Fish']);
        Product::factory()->create(['name' => 'Frozen Hilsa Pack']);
        Product::factory()->create(['name' => 'Mango Pickle']);

        $response = $this->getJson('/api/v1/products/search?q=hilsa');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    /** @test */
    public function create_product_validates_required_fields(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/products', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'price', 'category']);
    }

    /** @test */
    public function product_price_cannot_be_negative(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/v1/products', [
                'name'     => 'Test Item',
                'price'    => -500,
                'category' => 'general',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['price']);
    }
}
```

#### Supertest (Node.js/Express + Jest)

```javascript
// tests/integration/product.api.test.js
const request = require("supertest");
const app = require("../../src/app");
const { sequelize, Product, User } = require("../../src/models");
const { generateToken } = require("../../src/utils/auth");

describe("Product API Integration Tests", () => {
  let adminToken;
  let customerToken;
  let adminUser;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });

    adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "hashed_password",
      role: "admin",
    });

    const customer = await User.create({
      name: "Rahim",
      email: "rahim@example.com",
      password: "hashed_password",
      role: "customer",
    });

    adminToken = generateToken(adminUser);
    customerToken = generateToken(customer);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/v1/products", () => {
    const validProduct = {
      name: "Nakshi Kantha",
      price: 5000,
      category: "handicraft",
      stock: 20,
      description: "Traditional embroidered quilt from Rajshahi",
    };

    it("should create product when admin is authenticated", async () => {
      const res = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(validProduct)
        .expect(201);

      expect(res.body.data).toMatchObject({
        name: "Nakshi Kantha",
        price: 5000,
        category: "handicraft",
      });
      expect(res.body.data.id).toBeDefined();

      // ডাটাবেসে আছে কিনা যাচাই
      const dbProduct = await Product.findByPk(res.body.data.id);
      expect(dbProduct).not.toBeNull();
      expect(dbProduct.name).toBe("Nakshi Kantha");
    });

    it("should reject creation by non-admin users", async () => {
      await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${customerToken}`)
        .send(validProduct)
        .expect(403);
    });

    it("should validate required fields", async () => {
      const res = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(422);

      expect(res.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: "name" }),
          expect.objectContaining({ field: "price" }),
        ]),
      );
    });

    it("should handle concurrent product creation gracefully", async () => {
      const products = Array.from({ length: 10 }, (_, i) => ({
        ...validProduct,
        name: `Product ${i}`,
      }));

      const results = await Promise.all(
        products.map((p) =>
          request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(p),
        ),
      );

      const successCount = results.filter((r) => r.status === 201).length;
      expect(successCount).toBe(10);

      const totalProducts = await Product.count();
      expect(totalProducts).toBe(10);
    });
  });

  describe("GET /api/v1/products", () => {
    beforeEach(async () => {
      await Product.bulkCreate([
        { name: "Muslin Fabric", price: 8000, category: "textile", stock: 15 },
        {
          name: "Clay Pottery",
          price: 500,
          category: "handicraft",
          stock: 100,
        },
        { name: "Brass Lamp", price: 2500, category: "handicraft", stock: 30 },
      ]);
    });

    it("should return paginated results with filtering", async () => {
      const res = await request(app)
        .get("/api/v1/products?category=handicraft&per_page=10")
        .expect(200);

      expect(res.body.data).toHaveLength(2);
      expect(res.body.meta.total).toBe(2);
      res.body.data.forEach((product) => {
        expect(product.category).toBe("handicraft");
      });
    });

    it("should sort by price ascending", async () => {
      const res = await request(app)
        .get("/api/v1/products?sort=price&order=asc")
        .expect(200);

      const prices = res.body.data.map((p) => p.price);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });
  });
});
```

---

### ২. Database Integration Tests

ডাটাবেস ইন্টিগ্রেশন টেস্ট প্রকৃত ডাটাবেসের সাথে যোগাযোগ পরীক্ষা করে। এখানে ORM queries, migrations, relationships, constraints — সব কিছু real database এ চালানো হয়।

#### Laravel Database Tests (PHP)

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderDatabaseTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\CategorySeeder::class);
    }

    /** @test */
    public function order_creation_persists_with_all_relations(): void
    {
        $user = User::factory()->create([
            'phone' => '+8801712345678',
            'division' => 'Dhaka',
        ]);
        $products = Product::factory()->count(3)->create();

        $orderService = app(OrderService::class);

        $order = $orderService->createOrder($user, [
            'items' => $products->map(fn ($p) => [
                'product_id' => $p->id,
                'quantity'   => 2,
            ])->toArray(),
            'shipping_address' => 'House 42, Road 11, Dhanmondi, Dhaka',
            'payment_method'   => 'bkash',
        ]);

        // Order টেবিলে সেভ হয়েছে
        $this->assertDatabaseHas('orders', [
            'id'               => $order->id,
            'user_id'          => $user->id,
            'status'           => 'pending',
            'payment_method'   => 'bkash',
            'shipping_address' => 'House 42, Road 11, Dhanmondi, Dhaka',
        ]);

        // Order items সঠিকভাবে তৈরি হয়েছে
        $this->assertDatabaseCount('order_items', 3);

        foreach ($products as $product) {
            $this->assertDatabaseHas('order_items', [
                'order_id'   => $order->id,
                'product_id' => $product->id,
                'quantity'   => 2,
            ]);
        }

        // Relationships load হচ্ছে কিনা
        $freshOrder = Order::with(['items.product', 'user'])->find($order->id);
        $this->assertCount(3, $freshOrder->items);
        $this->assertEquals($user->id, $freshOrder->user->id);
    }

    /** @test */
    public function order_total_calculated_correctly_with_tax(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['price' => 1000.00]);

        $order = Order::factory()->create(['user_id' => $user->id]);
        $order->items()->create([
            'product_id' => $product->id,
            'quantity'   => 3,
            'unit_price' => 1000.00,
        ]);

        // বাংলাদেশে ১৫% VAT
        $expectedTotal = 3000.00 * 1.15; // 3450.00

        $this->assertEquals($expectedTotal, $order->calculateTotal());
    }

    /** @test */
    public function stock_reduces_after_order_placement(): void
    {
        $product = Product::factory()->create(['stock' => 50]);
        $user = User::factory()->create();

        $orderService = app(OrderService::class);
        $orderService->createOrder($user, [
            'items' => [['product_id' => $product->id, 'quantity' => 5]],
            'shipping_address' => 'Chittagong',
            'payment_method'   => 'cod',
        ]);

        $product->refresh();
        $this->assertEquals(45, $product->stock);
    }

    /** @test */
    public function order_fails_when_stock_insufficient(): void
    {
        $product = Product::factory()->create(['stock' => 2]);
        $user = User::factory()->create();

        $this->expectException(\App\Exceptions\InsufficientStockException::class);

        $orderService = app(OrderService::class);
        $orderService->createOrder($user, [
            'items' => [['product_id' => $product->id, 'quantity' => 10]],
            'shipping_address' => 'Sylhet',
            'payment_method'   => 'nagad',
        ]);

        // Stock অপরিবর্তিত থাকবে (transaction rollback)
        $product->refresh();
        $this->assertEquals(2, $product->stock);
    }

    /** @test */
    public function complex_query_scopes_work_correctly(): void
    {
        $user = User::factory()->create();

        Order::factory()->count(5)->create([
            'user_id' => $user->id,
            'status'  => 'completed',
            'created_at' => now()->subDays(10),
        ]);

        Order::factory()->count(3)->create([
            'user_id' => $user->id,
            'status'  => 'pending',
        ]);

        Order::factory()->count(2)->create([
            'user_id' => $user->id,
            'status'  => 'completed',
            'created_at' => now()->subMonths(2),
        ]);

        // এই মাসের completed orders
        $thisMonthCompleted = Order::forUser($user->id)
            ->completed()
            ->thisMonth()
            ->count();

        $this->assertEquals(5, $thisMonthCompleted);

        // মোট pending orders
        $pendingOrders = Order::forUser($user->id)->pending()->count();
        $this->assertEquals(3, $pendingOrders);
    }
}
```

#### Sequelize Database Test (Node.js/Jest)

```javascript
// tests/integration/order.database.test.js
const {
  sequelize,
  Order,
  OrderItem,
  Product,
  User,
} = require("../../src/models");
const OrderService = require("../../src/services/OrderService");

describe("Order Database Integration", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    // প্রতিটি টেস্টের আগে টেবিল খালি করা
    await OrderItem.destroy({ where: {}, force: true });
    await Order.destroy({ where: {}, force: true });
    await Product.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should persist order with all relations in a transaction", async () => {
    const user = await User.create({
      name: "Karim",
      email: "karim@test.com",
      phone: "+8801812345678",
    });

    const products = await Product.bulkCreate([
      { name: "Panjabi", price: 2500, stock: 20 },
      { name: "Lungi", price: 800, stock: 50 },
    ]);

    const orderService = new OrderService();
    const order = await orderService.createOrder(user.id, {
      items: products.map((p) => ({ productId: p.id, quantity: 2 })),
      shippingAddress: "Mirpur-10, Dhaka",
      paymentMethod: "bkash",
    });

    // DB তে Order আছে কিনা
    const dbOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, include: [Product] }, User],
    });

    expect(dbOrder).not.toBeNull();
    expect(dbOrder.User.name).toBe("Karim");
    expect(dbOrder.OrderItems).toHaveLength(2);
    expect(dbOrder.status).toBe("pending");
    expect(dbOrder.paymentMethod).toBe("bkash");

    // Stock কমেছে কিনা
    const updatedPanjabi = await Product.findByPk(products[0].id);
    expect(updatedPanjabi.stock).toBe(18);
  });

  it("should rollback entire transaction on insufficient stock", async () => {
    const user = await User.create({
      name: "Halim",
      email: "halim@test.com",
    });

    const product = await Product.create({
      name: "Limited Edition Saree",
      price: 25000,
      stock: 1,
    });

    const orderService = new OrderService();

    await expect(
      orderService.createOrder(user.id, {
        items: [{ productId: product.id, quantity: 5 }],
        shippingAddress: "Banani, Dhaka",
        paymentMethod: "card",
      }),
    ).rejects.toThrow("Insufficient stock");

    // Transaction rollback হওয়ায় কোনো order তৈরি হয়নি
    const orderCount = await Order.count();
    expect(orderCount).toBe(0);

    // Stock অপরিবর্তিত
    const unchangedProduct = await Product.findByPk(product.id);
    expect(unchangedProduct.stock).toBe(1);
  });

  it("should handle complex aggregation queries", async () => {
    const user = await User.create({ name: "Rina", email: "rina@test.com" });

    // বিভিন্ন স্ট্যাটাসে অর্ডার তৈরি
    const orders = await Order.bulkCreate([
      { userId: user.id, status: "completed", totalAmount: 5000 },
      { userId: user.id, status: "completed", totalAmount: 3000 },
      { userId: user.id, status: "cancelled", totalAmount: 2000 },
      { userId: user.id, status: "pending", totalAmount: 1500 },
    ]);

    const stats = await Order.findAll({
      where: { userId: user.id },
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        [sequelize.fn("SUM", sequelize.col("totalAmount")), "total"],
      ],
      group: ["status"],
      raw: true,
    });

    const completed = stats.find((s) => s.status === "completed");
    expect(Number(completed.count)).toBe(2);
    expect(Number(completed.total)).toBe(8000);
  });
});
```

---
