# TDD Walkthrough with PHP

## 🐘 PHP Example: Shopping Cart TDD দিয়ে বিল্ড করা (PHPUnit)
আমরা একটি `ShoppingCart` ক্লাস বিল্ড করবো TDD পদ্ধতিতে। প্রতিটি ফিচার যোগ করার আগে টেস্ট লিখবো।

---

### 🔴 সাইকেল ১ — Red: Cart-এ আইটেম যোগ করা
প্রথমে টেস্ট লিখি। `ShoppingCart` ক্লাস এখনও তৈরি হয়নি!

```php
<?php
// tests/ShoppingCartTest.php

use PHPUnit\Framework\TestCase;

class ShoppingCartTest extends TestCase
{
    public function test_can_add_item_to_cart(): void
    {
        $cart = new ShoppingCart();
        $cart->addItem('Laptop', 75000, 1);

        $this->assertCount(1, $cart->getItems());
        $this->assertEquals('Laptop', $cart->getItems()[0]['name']);
        $this->assertEquals(75000, $cart->getItems()[0]['price']);
    }
}
```

```bash
$ vendor/bin/phpunit tests/ShoppingCartTest.php
# 🔴 FAIL: Class "ShoppingCart" not found
```

#### 🟢 সাইকেল ১ — Green: ন্যূনতম কোড লিখি

```php
<?php
// src/ShoppingCart.php

class ShoppingCart
{
    private array $items = [];

    public function addItem(string $name, float $price, int $quantity): void
    {
        $this->items[] = [
            'name' => $name,
            'price' => $price,
            'quantity' => $quantity,
        ];
    }

    public function getItems(): array
    {
        return $this->items;
    }
}
```

```bash
$ vendor/bin/phpunit tests/ShoppingCartTest.php
# 🟢 OK (1 test, 3 assertions)
```

#### 🔵 সাইকেল ১ — Refactor

এই পর্যায়ে কোড যথেষ্ট সহজ, তাই বড় রিফ্যাক্টরিং দরকার নেই। তবে আমরা একটি `CartItem` ভ্যালু অবজেক্ট বানাতে পারি — কিন্তু YAGNI (You Ain't Gonna Need It) মনে রেখে এখন রাখি।

---

#### 🔴 সাইকেল ২ — Red: Cart থেকে আইটেম রিমুভ করা

```php
public function test_can_remove_item_from_cart(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Laptop', 75000, 1);
    $cart->addItem('Mouse', 500, 2);

    $cart->removeItem('Laptop');

    $this->assertCount(1, $cart->getItems());
    $this->assertEquals('Mouse', $cart->getItems()[0]['name']);
}
```

```bash
$ vendor/bin/phpunit
# 🔴 FAIL: Call to undefined method ShoppingCart::removeItem()
```

#### 🟢 সাইকেল ২ — Green

```php
public function removeItem(string $name): void
{
    $this->items = array_values(
        array_filter($this->items, fn($item) => $item['name'] !== $name)
    );
}
```

```bash
# 🟢 OK (2 tests, 5 assertions)
```

#### 🔵 সাইকেল ২ — Refactor

`removeItem` মেথডটি ঠিক আছে। তবে আমরা লক্ষ্য করছি item গুলো associative array হিসেবে আছে। পরে DTO/Value Object বানাবো যদি জটিলতা বাড়ে।

---

#### 🔴 সাইকেল ৩ — Red: মোট মূল্য হিসাব (calculateTotal)

```php
public function test_calculates_total_price(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Laptop', 75000, 1);
    $cart->addItem('Mouse', 500, 2);

    // Laptop: 75000*1 + Mouse: 500*2 = 76000
    $this->assertEquals(76000, $cart->calculateTotal());
}
```

```bash
# 🔴 FAIL: Call to undefined method ShoppingCart::calculateTotal()
```

#### 🟢 সাইকেল ৩ — Green

```php
public function calculateTotal(): float
{
    return array_reduce($this->items, function (float $total, array $item) {
        return $total + ($item['price'] * $item['quantity']);
    }, 0);
}
```

```bash
# 🟢 OK (3 tests, 6 assertions)
```

---

#### 🔴 সাইকেল ৪ — Red: ডিসকাউন্ট সিস্টেম

```php
public function test_applies_percentage_discount(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Laptop', 10000, 1);

    $cart->applyDiscount(10); // ১০% ডিসকাউন্ট

    $this->assertEquals(9000, $cart->calculateTotal());
}

public function test_discount_cannot_exceed_100_percent(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Laptop', 10000, 1);

    $this->expectException(\InvalidArgumentException::class);
    $cart->applyDiscount(150);
}

public function test_discount_cannot_be_negative(): void
{
    $cart = new ShoppingCart();
    $this->expectException(\InvalidArgumentException::class);
    $cart->applyDiscount(-5);
}
```

```bash
# 🔴 FAIL: Call to undefined method ShoppingCart::applyDiscount()
```

#### 🟢 সাইকেল ৪ — Green

```php
private float $discountPercent = 0;

public function applyDiscount(float $percent): void
{
    if ($percent < 0 || $percent > 100) {
        throw new \InvalidArgumentException(
            "ডিসকাউন্ট ০ থেকে ১০০-এর মধ্যে হতে হবে। দেওয়া হয়েছে: {$percent}"
        );
    }
    $this->discountPercent = $percent;
}

public function calculateTotal(): float
{
    $subtotal = array_reduce($this->items, function (float $total, array $item) {
        return $total + ($item['price'] * $item['quantity']);
    }, 0);

    return $subtotal * (1 - $this->discountPercent / 100);
}
```

```bash
# 🟢 OK (6 tests, 9 assertions)
```

---

#### 🔴 সাইকেল ৫ — Red: কুপন কোড সিস্টেম

```php
public function test_applies_coupon_code(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Phone', 20000, 1);

    $cart->applyCoupon('SAVE500', 500); // ৫০০ টাকা ছাড়

    $this->assertEquals(19500, $cart->calculateTotal());
}

public function test_coupon_discount_cannot_exceed_total(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Pen', 50, 1);

    $cart->applyCoupon('BIG_SAVE', 500);

    // Total ০-এর নিচে যেতে পারবে না
    $this->assertEquals(0, $cart->calculateTotal());
}
```

#### 🟢 সাইকেল ৫ — Green

```php
private float $couponDiscount = 0;
private ?string $couponCode = null;

public function applyCoupon(string $code, float $amount): void
{
    $this->couponCode = $code;
    $this->couponDiscount = $amount;
}

public function calculateTotal(): float
{
    $subtotal = array_reduce($this->items, function (float $total, array $item) {
        return $total + ($item['price'] * $item['quantity']);
    }, 0);

    $afterPercentDiscount = $subtotal * (1 - $this->discountPercent / 100);
    $afterCoupon = $afterPercentDiscount - $this->couponDiscount;

    return max(0, $afterCoupon);
}
```

```bash
# 🟢 OK (8 tests, 11 assertions)
```

---

#### 🔴 সাইকেল ৬ — Red: Cart-এর সারসংক্ষেপ (Summary)

```php
public function test_generates_cart_summary(): void
{
    $cart = new ShoppingCart();
    $cart->addItem('Laptop', 75000, 1);
    $cart->addItem('Mouse', 500, 2);
    $cart->applyDiscount(10);
    $cart->applyCoupon('WELCOME', 200);

    $summary = $cart->getSummary();

    $this->assertEquals(76000, $summary['subtotal']);
    $this->assertEquals(7600, $summary['discount_amount']);
    $this->assertEquals(200, $summary['coupon_discount']);
    $this->assertEquals(68200, $summary['total']);
    $this->assertCount(2, $summary['items']);
}
```

#### 🟢 সাইকেল ৬ — Green

```php
public function getSummary(): array
{
    $subtotal = array_reduce($this->items, function (float $total, array $item) {
        return $total + ($item['price'] * $item['quantity']);
    }, 0);

    $discountAmount = $subtotal * ($this->discountPercent / 100);
    $afterDiscount = $subtotal - $discountAmount;
    $total = max(0, $afterDiscount - $this->couponDiscount);

    return [
        'items' => $this->items,
        'subtotal' => $subtotal,
        'discount_percent' => $this->discountPercent,
        'discount_amount' => $discountAmount,
        'coupon_code' => $this->couponCode,
        'coupon_discount' => $this->couponDiscount,
        'total' => $total,
    ];
}
```

#### 🔵 সাইকেল ৬ — Refactor: Duplication দূর করি

লক্ষ্য করুন `calculateTotal()` এবং `getSummary()` তে subtotal ক্যালকুলেশন ডুপ্লিকেট হয়ে গেছে। এবার রিফ্যাক্টর করি:

```php
<?php
// src/ShoppingCart.php — চূড়ান্ত রিফ্যাক্টরড সংস্করণ

class ShoppingCart
{
    private array $items = [];
    private float $discountPercent = 0;
    private float $couponDiscount = 0;
    private ?string $couponCode = null;

    public function addItem(string $name, float $price, int $quantity): void
    {
        $this->items[] = compact('name', 'price', 'quantity');
    }

    public function removeItem(string $name): void
    {
        $this->items = array_values(
            array_filter($this->items, fn($item) => $item['name'] !== $name)
        );
    }

    public function applyDiscount(float $percent): void
    {
        if ($percent < 0 || $percent > 100) {
            throw new \InvalidArgumentException(
                "ডিসকাউন্ট ০-১০০ এর মধ্যে হতে হবে।"
            );
        }
        $this->discountPercent = $percent;
    }

    public function applyCoupon(string $code, float $amount): void
    {
        $this->couponCode = $code;
        $this->couponDiscount = $amount;
    }

    public function calculateTotal(): float
    {
        return $this->getSummary()['total'];
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function getSummary(): array
    {
        $subtotal = $this->calculateSubtotal();
        $discountAmount = $subtotal * ($this->discountPercent / 100);
        $total = max(0, $subtotal - $discountAmount - $this->couponDiscount);

        return [
            'items'             => $this->items,
            'subtotal'          => $subtotal,
            'discount_percent'  => $this->discountPercent,
            'discount_amount'   => $discountAmount,
            'coupon_code'       => $this->couponCode,
            'coupon_discount'   => $this->couponDiscount,
            'total'             => $total,
        ];
    }

    private function calculateSubtotal(): float
    {
        return array_reduce(
            $this->items,
            fn(float $sum, array $item) => $sum + ($item['price'] * $item['quantity']),
            0
        );
    }
}
```

```bash
$ vendor/bin/phpunit
# 🟢 OK (9 tests, 14 assertions) — সবগুলো টেস্ট এখনও পাস!
```

> 💡 **গুরুত্বপূর্ণ**: রিফ্যাক্টরের পরে সব টেস্ট পাস করতে হবে। যদি কোনো টেস্ট ফেইল করে, তাহলে রিফ্যাক্টরিং ভুল হয়েছে — আগের অবস্থায় ফিরে যান।

---
