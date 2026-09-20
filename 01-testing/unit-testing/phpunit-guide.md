# PHPUnit Guide

## 💻 PHPUnit Deep Dive

### সেটআপ ও কনফিগারেশন

`phpunit.xml` ফাইল প্রজেক্টের রুটে রাখা হয়। এটি PHPUnit-এর সমস্ত কনফিগারেশন নিয়ন্ত্রণ করে:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true"
         failOnRisky="true"
         failOnWarning="true"
         stopOnFailure="false"
         executionOrder="random"
         cacheDirectory=".phpunit.cache">

    <testsuites>
        <testsuite name="Unit">
            <directory>tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory>tests/Feature</directory>
        </testsuite>
    </testsuites>

    <source>
        <include>
            <directory>src</directory>
        </include>
        <exclude>
            <directory>src/Database/Migrations</directory>
        </exclude>
    </source>

    <coverage>
        <report>
            <html outputDirectory="reports/coverage"/>
            <clover outputFile="reports/clover.xml"/>
        </report>
    </coverage>

    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

### টেস্ট ক্লাসের গঠন ও PHP 8 Attributes

PHPUnit 10+ এ পুরনো annotation-ভিত্তিক ও নতুন PHP 8 attribute-ভিত্তিক — দুটোই ব্যবহার করা যায়:

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Depends;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\CoversClass;
use App\Services\BkashAmountValidator;

#[CoversClass(BkashAmountValidator::class)]
#[Group('payment')]
class BkashAmountValidatorTest extends TestCase
{
    private BkashAmountValidator $validator;

    // প্রতিটি টেস্টের আগে চলে — fresh state নিশ্চিত করে
    protected function setUp(): void
    {
        parent::setUp();
        $this->validator = new BkashAmountValidator();
    }

    // প্রতিটি টেস্টের পরে চলে — cleanup
    protected function tearDown(): void
    {
        parent::tearDown();
        // প্রয়োজনে resource মুক্ত করুন
    }

    // পুরনো annotation পদ্ধতি
    /** @test */
    public function it_accepts_valid_bkash_amount(): void
    {
        $result = $this->validator->validate(500.00);
        $this->assertTrue($result);
    }

    // নতুন PHP 8 Attribute পদ্ধতি (প্রস্তাবিত)
    #[Test]
    public function it_rejects_amount_below_minimum(): void
    {
        $result = $this->validator->validate(0.50);
        $this->assertFalse($result);
    }

    // অথবা "test" prefix দিয়ে নামকরণ
    public function testRejectsAmountAboveMaximum(): void
    {
        $result = $this->validator->validate(100_000);
        $this->assertFalse($result);
    }
}
```

### Assertions — বিস্তারিত

PHPUnit-এ অনেক ধরনের assertion আছে। প্রতিটির নির্দিষ্ট ব্যবহারক্ষেত্র রয়েছে:

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\ValueObjects\Money;
use App\Collections\ProductCollection;

class AssertionDemoTest extends TestCase
{
    // ─── মৌলিক সমতা পরীক্ষা ─────────────────────────────
    #[Test]
    public function equality_assertions(): void
    {
        // assertEquals — loose comparison (==), type juggling হয়
        $this->assertEquals(100, '100');       // pass ✅
        $this->assertEquals(0, false);          // pass ✅

        // assertSame — strict comparison (===), type ও value দুটোই মেলাবে
        $this->assertSame(100, 100);            // pass ✅
        // $this->assertSame(100, '100');        // fail ❌

        // assertNotEquals, assertNotSame — উল্টো যাচাই
        $this->assertNotEquals('BDT', 'USD');
        $this->assertNotSame(1, true);
    }

    // ─── বুলিয়ান পরীক্ষা ──────────────────────────────────
    #[Test]
    public function boolean_assertions(): void
    {
        $isActive = true;
        $this->assertTrue($isActive);
        $this->assertFalse(!$isActive);

        $this->assertNull(null);
        $this->assertNotNull('bKash');

        $this->assertEmpty([]);
        $this->assertNotEmpty(['item1']);
    }

    // ─── টাইপ ও ইনস্ট্যান্স পরীক্ষা ───────────────────────
    #[Test]
    public function type_assertions(): void
    {
        $money = new Money(1500, 'BDT');

        $this->assertInstanceOf(Money::class, $money);
        $this->assertIsString($money->getCurrency());
        $this->assertIsFloat($money->getAmount());
        $this->assertIsArray([1, 2, 3]);
        $this->assertIsBool(true);
        $this->assertIsInt(42);
    }

    // ─── অ্যারে ও কালেকশন পরীক্ষা ─────────────────────────
    #[Test]
    public function array_assertions(): void
    {
        $products = ['চাল', 'ডাল', 'তেল', 'মাছ'];

        $this->assertCount(4, $products);
        $this->assertContains('ডাল', $products);
        $this->assertNotContains('মাংস', $products);

        $config = ['currency' => 'BDT', 'country' => 'BD'];
        $this->assertArrayHasKey('currency', $config);
        $this->assertArrayNotHasKey('language', $config);
    }

    // ─── স্ট্রিং পরীক্ষা ────────────────────────────────────
    #[Test]
    public function string_assertions(): void
    {
        $message = 'আপনার bKash পেমেন্ট সফল হয়েছে। ট্রানজেকশন আইডি: TXN123';

        $this->assertStringContainsString('সফল', $message);
        $this->assertStringStartsWith('আপনার', $message);
        $this->assertStringEndsWith('TXN123', $message);
        $this->assertMatchesRegularExpression('/TXN\d+/', $message);
    }

    // ─── ফাইল ও JSON পরীক্ষা ─────────────────────────────
    #[Test]
    public function json_assertion(): void
    {
        $response = json_encode([
            'status'  => 'success',
            'amount'  => 1500.00,
            'currency' => 'BDT',
        ]);

        $this->assertJson($response);
        $this->assertJsonStringEqualsJsonString(
            '{"status":"success","amount":1500,"currency":"BDT"}',
            $response
        );
    }
}
```

### Data Providers — প্যারামেট্রাইজড টেস্টিং

একই টেস্ট লজিক বিভিন্ন ডেটা দিয়ে চালানোর জন্য Data Provider অত্যন্ত কার্যকর। এতে কোড ডুপ্লিকেশন কমে এবং edge case coverage বাড়ে:

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;
use App\Services\PriceCalculator;

class PriceCalculatorTest extends TestCase
{
    private PriceCalculator $calculator;

    protected function setUp(): void
    {
        $this->calculator = new PriceCalculator();
    }

    // ─── PHP 8 Attribute স্টাইল DataProvider ───────────────
    #[Test]
    #[DataProvider('vatCalculationProvider')]
    public function it_calculates_vat_correctly(
        float $price,
        float $vatRate,
        float $expectedVat,
        string $scenario
    ): void {
        $vat = $this->calculator->calculateVat($price, $vatRate);
        $this->assertEqualsWithDelta($expectedVat, $vat, 0.01, $scenario);
    }

    public static function vatCalculationProvider(): iterable
    {
        // বাংলাদেশে VAT হার ১৫%
        yield 'সাধারণ পণ্য — ১৫% ভ্যাট' => [
            'price'       => 1000.00,
            'vatRate'     => 15.0,
            'expectedVat' => 150.00,
            'scenario'    => '১০০০ টাকায় ১৫% ভ্যাট = ১৫০ টাকা',
        ];

        yield 'শূন্য মূল্য' => [
            'price'       => 0.00,
            'vatRate'     => 15.0,
            'expectedVat' => 0.00,
            'scenario'    => 'শূন্য মূল্যে ভ্যাট শূন্য',
        ];

        yield 'ছোট মূল্য — পয়সা পর্যায়ের সূক্ষ্মতা' => [
            'price'       => 49.99,
            'vatRate'     => 15.0,
            'expectedVat' => 7.50,
            'scenario'    => '৪৯.৯৯ টাকায় ভ্যাট ≈ ৭.৫০',
        ];

        yield 'বড় অ্যামাউন্ট' => [
            'price'       => 500_000.00,
            'vatRate'     => 15.0,
            'expectedVat' => 75_000.00,
            'scenario'    => '৫ লক্ষ টাকায় ভ্যাট = ৭৫,০০০',
        ];

        yield 'কাস্টম ভ্যাট হার — ৫%' => [
            'price'       => 2000.00,
            'vatRate'     => 5.0,
            'expectedVat' => 100.00,
            'scenario'    => 'হ্রাসকৃত হারে ভ্যাট',
        ];
    }

    // ─── bKash ট্রানজেকশন ফি ক্যালকুলেশন ──────────────────
    #[Test]
    #[DataProvider('bkashFeeProvider')]
    public function it_calculates_bkash_cash_out_fee(
        float $amount,
        float $expectedFee
    ): void {
        $fee = $this->calculator->calculateBkashCashOutFee($amount);
        $this->assertEqualsWithDelta($expectedFee, $fee, 0.01);
    }

    public static function bkashFeeProvider(): iterable
    {
        // bKash Cash Out চার্জ: প্রতি হাজারে ১৮.৫০ টাকা
        yield '১,০০০ টাকা ক্যাশ আউট' => [1000.00, 18.50];
        yield '৫,০০০ টাকা ক্যাশ আউট' => [5000.00, 92.50];
        yield '২৫,০০০ টাকা ক্যাশ আউট' => [25000.00, 462.50];
        yield '৫০০ টাকা ক্যাশ আউট'   => [500.00, 9.25];
    }
}
```

### টেস্ট লাইফসাইকেল (Lifecycle)

PHPUnit-এ টেস্ট লাইফসাইকেল বোঝা গুরুত্বপূর্ণ — কখন কোন মেথড চলে সেটা জানা থাকলে সঠিক জায়গায় সেটআপ ও ক্লিনআপ করা যায়:

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class LifecycleDemoTest extends TestCase
{
    /*
     * কার্যক্রমের ক্রম (Execution Order):
     *
     * ┌─────────────────────────────────────────────┐
     * │  setUpBeforeClass()    ← পুরো ক্লাসে ১ বার  │
     * │  ┌─────────────────────────────────────────┐ │
     * │  │  setUp()            ← প্রতি টেস্টে       │ │
     * │  │  testMethodOne()                         │ │
     * │  │  tearDown()         ← প্রতি টেস্টে       │ │
     * │  └─────────────────────────────────────────┘ │
     * │  ┌─────────────────────────────────────────┐ │
     * │  │  setUp()                                 │ │
     * │  │  testMethodTwo()                         │ │
     * │  │  tearDown()                              │ │
     * │  └─────────────────────────────────────────┘ │
     * │  tearDownAfterClass() ← পুরো ক্লাসে ১ বার   │
     * └─────────────────────────────────────────────┘
     */

    private static array $sharedExpensiveResource;
    private array $testData;

    // পুরো টেস্ট ক্লাসের আগে একবার চলে — ব্যয়বহুল সেটআপের জন্য
    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();
        // যেমন: বড় ডেটাসেট লোড, ক্যাশ তৈরি
        self::$sharedExpensiveResource = ['config' => 'loaded'];
    }

    // প্রতিটি টেস্ট মেথডের আগে চলে — fresh state দেয়
    protected function setUp(): void
    {
        parent::setUp();
        $this->testData = [
            'products' => ['চাল', 'ডাল', 'তেল'],
            'prices'   => [65.00, 120.00, 180.00],
        ];
    }

    // প্রতিটি টেস্ট মেথডের পরে চলে
    protected function tearDown(): void
    {
        // resource cleanup
        unset($this->testData);
        parent::tearDown();
    }

    // পুরো টেস্ট ক্লাসের পরে একবার চলে
    public static function tearDownAfterClass(): void
    {
        self::$sharedExpensiveResource = [];
        parent::tearDownAfterClass();
    }

    public function testExample(): void
    {
        $this->assertCount(3, $this->testData['products']);
    }
}
```

### প্রাইভেট মেথড টেস্টিং

প্রাইভেট মেথড সরাসরি টেস্ট করা উচিত নয় — এটি implementation detail। তবে কখনো কখনো Reflection ব্যবহার করা যেতে পারে। **সেরা পদ্ধতি হলো পাবলিক ইন্টারফেসের মাধ্যমে পরোক্ষভাবে টেস্ট করা:**

```php
<?php

declare(strict_types=1);

namespace App\Services;

class TransactionIdGenerator
{
    public function generate(string $prefix = 'TXN'): string
    {
        $timestamp = $this->formatTimestamp(time());
        $random = $this->generateRandomSuffix(6);
        return "{$prefix}-{$timestamp}-{$random}";
    }

    private function formatTimestamp(int $time): string
    {
        return date('YmdHis', $time);
    }

    private function generateRandomSuffix(int $length): string
    {
        return substr(bin2hex(random_bytes($length)), 0, $length);
    }
}
```

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Services\TransactionIdGenerator;

class TransactionIdGeneratorTest extends TestCase
{
    // ✅ সেরা পদ্ধতি: পাবলিক ইন্টারফেসের মাধ্যমে টেস্ট
    #[Test]
    public function generated_id_has_correct_format(): void
    {
        $generator = new TransactionIdGenerator();
        $id = $generator->generate('BKS');

        $this->assertMatchesRegularExpression(
            '/^BKS-\d{14}-[a-f0-9]{6}$/',
            $id
        );
    }

    // ⚠️ বিকল্প পদ্ধতি: Reflection — শুধু legacy code-এ ব্যবহার করুন
    #[Test]
    public function private_format_timestamp_works(): void
    {
        $generator = new TransactionIdGenerator();

        $reflection = new \ReflectionMethod($generator, 'formatTimestamp');
        // PHP 8.1+ এ setAccessible() আর দরকার নেই, তবে পুরনো ভার্সনে লাগে
        $reflection->setAccessible(true);

        $result = $reflection->invoke($generator, 1700000000);
        $this->assertSame('20231114222640', $result);
    }
}
```

### Exception ও Error টেস্টিং

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use App\Services\BkashPaymentService;
use App\Exceptions\InsufficientBalanceException;
use App\Exceptions\InvalidAmountException;
use InvalidArgumentException;

class ExceptionTestingTest extends TestCase
{
    private BkashPaymentService $service;

    protected function setUp(): void
    {
        $this->service = new BkashPaymentService();
    }

    // পদ্ধতি ১: expectException — সবচেয়ে সাধারণ
    #[Test]
    public function it_throws_on_negative_amount(): void
    {
        $this->expectException(InvalidAmountException::class);
        $this->expectExceptionMessage('পরিমাণ ঋণাত্মক হতে পারে না');
        $this->expectExceptionCode(422);

        $this->service->sendMoney(-500.00, '01712345678');
    }

    // পদ্ধতি ২: try-catch — যখন exception-এর পরেও assert করতে হয়
    #[Test]
    public function it_includes_amount_in_exception_for_limit_breach(): void
    {
        try {
            $this->service->sendMoney(200_000.00, '01712345678');
            $this->fail('প্রত্যাশিত InvalidAmountException ছুঁড়ে দেওয়া হয়নি');
        } catch (InvalidAmountException $e) {
            $this->assertSame(422, $e->getCode());
            $this->assertStringContainsString('সীমা অতিক্রম', $e->getMessage());
            $this->assertSame(200_000.00, $e->getAttemptedAmount());
        }
    }

    // পদ্ধতি ৩: callback পদ্ধতি — PHPUnit 10+
    #[Test]
    public function it_throws_for_invalid_phone_number(): void
    {
        $this->expectExceptionObject(
            new InvalidArgumentException('অবৈধ মোবাইল নম্বর')
        );

        $this->service->sendMoney(100.00, '123');
    }
}
```

### পূর্ণাঙ্গ উদাহরণ — Service Class ও Value Object টেস্টিং

```php
<?php

declare(strict_types=1);

namespace App\ValueObjects;

// ─── Value Object: Money (BDT) ──────────────────────────────
class Money
{
    public function __construct(
        private readonly float $amount,
        private readonly string $currency = 'BDT'
    ) {
        if ($amount < 0) {
            throw new \InvalidArgumentException('পরিমাণ ঋণাত্মক হতে পারে না');
        }
    }

    public function getAmount(): float
    {
        return $this->amount;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }

    public function add(Money $other): self
    {
        $this->ensureSameCurrency($other);
        return new self($this->amount + $other->amount, $this->currency);
    }

    public function subtract(Money $other): self
    {
        $this->ensureSameCurrency($other);
        if ($other->amount > $this->amount) {
            throw new \DomainException('অপর্যাপ্ত ব্যালেন্স');
        }
        return new self($this->amount - $other->amount, $this->currency);
    }

    public function multiply(float $factor): self
    {
        return new self(round($this->amount * $factor, 2), $this->currency);
    }

    public function equals(Money $other): bool
    {
        return $this->amount === $other->amount
            && $this->currency === $other->currency;
    }

    private function ensureSameCurrency(Money $other): void
    {
        if ($this->currency !== $other->currency) {
            throw new \InvalidArgumentException(
                "মুদ্রা মিলছে না: {$this->currency} ≠ {$other->currency}"
            );
        }
    }
}
```

```php
<?php

declare(strict_types=1);

namespace Tests\Unit\ValueObjects;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\CoversClass;
use App\ValueObjects\Money;

#[CoversClass(Money::class)]
class MoneyTest extends TestCase
{
    #[Test]
    public function it_creates_money_with_amount_and_currency(): void
    {
        $money = new Money(1500.00, 'BDT');

        $this->assertSame(1500.00, $money->getAmount());
        $this->assertSame('BDT', $money->getCurrency());
    }

    #[Test]
    public function it_defaults_to_bdt_currency(): void
    {
        $money = new Money(100.00);
        $this->assertSame('BDT', $money->getCurrency());
    }

    #[Test]
    public function it_rejects_negative_amount(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        new Money(-50.00);
    }

    #[Test]
    public function it_adds_two_money_values(): void
    {
        $price = new Money(850.00, 'BDT');   // চালের দাম
        $vat   = new Money(127.50, 'BDT');   // ১৫% ভ্যাট

        $total = $price->add($vat);

        $this->assertSame(977.50, $total->getAmount());
        $this->assertSame('BDT', $total->getCurrency());
    }

    #[Test]
    public function it_prevents_adding_different_currencies(): void
    {
        $bdt = new Money(1000.00, 'BDT');
        $usd = new Money(10.00, 'USD');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('মুদ্রা মিলছে না');

        $bdt->add($usd);
    }

    #[Test]
    public function it_subtracts_money_correctly(): void
    {
        $balance = new Money(5000.00, 'BDT');
        $expense = new Money(1200.00, 'BDT');

        $remaining = $balance->subtract($expense);
        $this->assertSame(3800.00, $remaining->getAmount());
    }

    #[Test]
    public function it_prevents_negative_balance_on_subtraction(): void
    {
        $balance = new Money(500.00, 'BDT');
        $expense = new Money(1000.00, 'BDT');

        $this->expectException(\DomainException::class);
        $this->expectExceptionMessage('অপর্যাপ্ত ব্যালেন্স');

        $balance->subtract($expense);
    }

    #[Test]
    #[DataProvider('multiplicationProvider')]
    public function it_multiplies_correctly(
        float $amount,
        float $factor,
        float $expected
    ): void {
        $money = new Money($amount, 'BDT');
        $result = $money->multiply($factor);
        $this->assertSame($expected, $result->getAmount());
    }

    public static function multiplicationProvider(): iterable
    {
        yield 'দ্বিগুণ মূল্য'        => [100.00, 2.0, 200.00];
        yield 'অর্ধেক মূল্য'         => [100.00, 0.5, 50.00];
        yield 'ভ্যাট সহ (১.১৫x)'    => [1000.00, 1.15, 1150.00];
        yield 'ডিসকাউন্ট (০.৯x)'    => [500.00, 0.9, 450.00];
        yield 'পয়সা রাউন্ডিং'       => [33.33, 3.0, 99.99];
    }

    #[Test]
    public function it_checks_equality(): void
    {
        $a = new Money(1500.00, 'BDT');
        $b = new Money(1500.00, 'BDT');
        $c = new Money(2000.00, 'BDT');

        $this->assertTrue($a->equals($b));
        $this->assertFalse($a->equals($c));
    }

    // immutability যাচাই — অপারেশনের পর মূল অবজেক্ট অপরিবর্তিত থাকে
    #[Test]
    public function operations_return_new_instances(): void
    {
        $original = new Money(1000.00, 'BDT');
        $added = $original->add(new Money(500.00, 'BDT'));

        $this->assertSame(1000.00, $original->getAmount());
        $this->assertSame(1500.00, $added->getAmount());
        $this->assertNotSame($original, $added);
    }
}
```

---
