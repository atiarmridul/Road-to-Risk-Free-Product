# Mutation Testing with Infection and PHP

## 🐘 PHP — Infection দিয়ে Mutation Testing

### ইনস্টলেশন ও কনফিগারেশন

```bash
# Infection ইনস্টল করুন
composer require --dev infection/infection

# প্রাথমিক কনফিগারেশন তৈরি
vendor/bin/infection --init
```

### infection.json5 কনফিগারেশন

```json5
{
  $schema: "vendor/infection/infection/resources/schema.json",
  source: {
    directories: ["src"],
    excludes: ["Migrations", "Kernel.php"],
  },
  logs: {
    text: "infection.log",
    html: "infection.html",
    summary: "infection-summary.log",
  },
  mutators: {
    "@default": true,
    // নির্দিষ্ট mutator বন্ধ করতে
    TrueValue: {
      ignoreSourceCodeByRegex: [".*@infection-ignore-all.*"],
    },
  },
  minMsi: 70, // সর্বনিম্ন Mutation Score Indicator
  minCoveredMsi: 80, // covered code-এর সর্বনিম্ন MSI
  testFramework: "phpunit",
  phpUnit: {
    configDir: ".",
  },
}
```

### উদাহরণ — সোর্স কোড ও টেস্ট

```php
<?php
// src/PriceCalculator.php

declare(strict_types=1);

class PriceCalculator
{
    public function calculateDiscount(float $price, float $discountPercent): float
    {
        if ($discountPercent < 0 || $discountPercent > 100) {
            throw new InvalidArgumentException('Discount must be between 0 and 100');
        }

        if ($price <= 0) {
            throw new InvalidArgumentException('Price must be positive');
        }

        $discount = $price * ($discountPercent / 100);
        return round($price - $discount, 2);
    }

    public function calculateTax(float $price, float $taxRate): float
    {
        if ($taxRate < 0) {
            throw new InvalidArgumentException('Tax rate cannot be negative');
        }

        return round($price * (1 + $taxRate / 100), 2);
    }

    public function calculateFinalPrice(float $price, float $discount, float $taxRate): float
    {
        $discountedPrice = $this->calculateDiscount($price, $discount);
        return $this->calculateTax($discountedPrice, $taxRate);
    }
}
```

```php
<?php
// tests/PriceCalculatorTest.php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

class PriceCalculatorTest extends TestCase
{
    private PriceCalculator $calculator;

    protected function setUp(): void
    {
        $this->calculator = new PriceCalculator();
    }

    // ভালো টেস্ট — mutation ধরবে
    public function testCalculateDiscountWithValidValues(): void
    {
        $result = $this->calculator->calculateDiscount(100.0, 20.0);
        $this->assertSame(80.0, $result); // exact value assertion — mutant killed!
    }

    public function testCalculateDiscountWithZeroDiscount(): void
    {
        $result = $this->calculator->calculateDiscount(100.0, 0.0);
        $this->assertSame(100.0, $result); // boundary check
    }

    public function testCalculateDiscountWithFullDiscount(): void
    {
        $result = $this->calculator->calculateDiscount(100.0, 100.0);
        $this->assertSame(0.0, $result); // boundary check
    }

    public function testNegativeDiscountThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->calculator->calculateDiscount(100.0, -5.0);
    }

    public function testDiscountOver100ThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->calculator->calculateDiscount(100.0, 101.0);
    }

    public function testZeroPriceThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->calculator->calculateDiscount(0.0, 20.0);
    }

    public function testNegativePriceThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->calculator->calculateDiscount(-50.0, 20.0);
    }

    public function testCalculateTax(): void
    {
        $result = $this->calculator->calculateTax(100.0, 15.0);
        $this->assertSame(115.0, $result);
    }

    public function testCalculateTaxNegativeRateThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->calculator->calculateTax(100.0, -5.0);
    }

    public function testCalculateFinalPrice(): void
    {
        // price=200, discount=10%, tax=15%
        // discounted = 200 - 20 = 180
        // with tax = 180 * 1.15 = 207
        $result = $this->calculator->calculateFinalPrice(200.0, 10.0, 15.0);
        $this->assertSame(207.0, $result);
    }
}
```

### Infection চালানো ও ফলাফল ব্যাখ্যা

```bash
# সম্পূর্ণ mutation testing চালান
vendor/bin/infection --threads=4 --show-mutations

# নির্দিষ্ট ফাইলে চালান
vendor/bin/infection --filter=PriceCalculator --threads=4

# শুধু covered code-তে চালান (দ্রুত)
vendor/bin/infection --only-covered --min-msi=80

# CI-তে চালান — threshold-এর নিচে হলে fail
vendor/bin/infection --min-msi=70 --min-covered-msi=80 --threads=max
```

```
# আউটপুট উদাহরণ:
# ╔═══════════════════════════════════════════╗
# ║  Mutations: 25                            ║
# ║  Killed: 22        ✅                     ║
# ║  Survived: 2       ❌ (এগুলো ঠিক করুন)   ║
# ║  Errors: 0                                ║
# ║  Timeout: 1        ⏱️                     ║
# ║  MSI: 92.00%                              ║
# ║  Covered MSI: 95.65%                      ║
# ╚═══════════════════════════════════════════╝
```

---
