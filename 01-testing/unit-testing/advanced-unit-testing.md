# Advanced Unit Testing

## 🔥 Advanced টপিকস

### ১. টেস্টিং প্যাটার্নস

#### AAA Pattern (Arrange-Act-Assert)

সবচেয়ে বহুল ব্যবহৃত প্যাটার্ন — প্রতিটি টেস্টকে তিনটি স্পষ্ট ভাগে ভাগ করে:

```php
<?php
#[Test]
public function it_calculates_total_with_vat(): void
{
    // Arrange — প্রস্তুতি: টেস্টের জন্য প্রয়োজনীয় সবকিছু সাজানো
    $calculator = new PriceCalculator();
    $basePrice = new Money(1000.00, 'BDT');
    $vatRate = 0.15;

    // Act — কার্যকরণ: যে ব্যবহার টেস্ট করতে চাই সেটা চালানো
    $total = $calculator->calculateTotalWithVat($basePrice, $vatRate);

    // Assert — প্রতিপাদন: ফলাফল প্রত্যাশা অনুযায়ী কিনা যাচাই
    $this->assertSame(1150.00, $total->getAmount());
    $this->assertSame('BDT', $total->getCurrency());
}
```

#### Given-When-Then (BDD স্টাইল)

BDD-ভিত্তিক — ব্যবসায়িক ভাষায় টেস্ট বর্ণনা করে:

```javascript
describe("শপিং কার্ট", () => {
  test("Given কার্টে পণ্য আছে, When ডিসকাউন্ট কোড প্রয়োগ হয়, Then মূল্য কমে", () => {
    // Given — প্রদত্ত অবস্থা
    const cart = new ShoppingCart();
    cart.addItem({ name: "শার্ট", price: 1200 });
    cart.addItem({ name: "প্যান্ট", price: 1800 });

    // When — যখন এই ক্রিয়া ঘটে
    cart.applyDiscount("EID20"); // ঈদ উপলক্ষে ২০% ছাড়

    // Then — তখন এই ফলাফল পাওয়া যায়
    expect(cart.getTotal()).toBe(2400); // ৩০০০ - ২০%
  });
});
```

#### Object Mother Pattern

জটিল টেস্ট অবজেক্ট তৈরির জন্য ফ্যাক্টরি ক্লাস — বারবার একই সেটআপ কোড লেখা থেকে বাঁচায়:

```php
<?php

declare(strict_types=1);

namespace Tests\Mothers;

use App\Entities\Customer;
use App\ValueObjects\Money;

class CustomerMother
{
    public static function createRegular(): Customer
    {
        return new Customer(
            name: 'রহিম উদ্দিন',
            phone: '01712345678',
            balance: new Money(5000.00, 'BDT'),
            tier: 'regular'
        );
    }

    public static function createPremium(): Customer
    {
        return new Customer(
            name: 'করিম সাহেব',
            phone: '01898765432',
            balance: new Money(50000.00, 'BDT'),
            tier: 'premium'
        );
    }

    public static function createWithBalance(float $amount): Customer
    {
        return new Customer(
            name: 'টেস্ট গ্রাহক',
            phone: '01700000000',
            balance: new Money($amount, 'BDT'),
            tier: 'regular'
        );
    }

    public static function createWithZeroBalance(): Customer
    {
        return self::createWithBalance(0.00);
    }
}

// ব্যবহার:
// $customer = CustomerMother::createPremium();
// $broke = CustomerMother::createWithZeroBalance();
```

#### Test Builder Pattern

আরও flexible — fluent interface দিয়ে step-by-step অবজেক্ট তৈরি:

```php
<?php

declare(strict_types=1);

namespace Tests\Builders;

use App\Entities\Order;
use App\Entities\OrderItem;
use App\ValueObjects\Money;

class OrderBuilder
{
    private string $customerId = 'CUST001';
    private array $items = [];
    private string $status = 'pending';
    private ?string $couponCode = null;

    public static function anOrder(): self
    {
        return new self();
    }

    public function forCustomer(string $customerId): self
    {
        $this->customerId = $customerId;
        return $this;
    }

    public function withItem(string $name, float $price, int $qty = 1): self
    {
        $this->items[] = new OrderItem($name, new Money($price, 'BDT'), $qty);
        return $this;
    }

    public function withStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function withCoupon(string $code): self
    {
        $this->couponCode = $code;
        return $this;
    }

    public function build(): Order
    {
        $order = new Order($this->customerId);
        foreach ($this->items as $item) {
            $order->addItem($item);
        }
        $order->setStatus($this->status);
        if ($this->couponCode) {
            $order->applyCoupon($this->couponCode);
        }
        return $order;
    }
}

// ব্যবহার:
// $order = OrderBuilder::anOrder()
//     ->forCustomer('CUST-RAHIM')
//     ->withItem('বাসমতি চাল ৫কেজি', 650.00, 2)
//     ->withItem('সয়াবিন তেল ৫লি', 780.00)
//     ->withCoupon('EID2024')
//     ->build();
```

### ২. Edge Cases টেস্টিং

Edge case মিস করলেই প্রোডাকশনে বাগ আসে। একটি পদ্ধতিগত চেকলিস্ট মেনে চলা উচিত:

```php
<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;
use App\Services\PhoneNumberValidator;

class EdgeCaseTest extends TestCase
{
    // ─── Null ও Empty মান ─────────────────────────────────
    #[Test]
    #[DataProvider('nullAndEmptyProvider')]
    public function it_handles_null_and_empty_values(mixed $input): void
    {
        $validator = new PhoneNumberValidator();
        $this->assertFalse($validator->isValid($input));
    }

    public static function nullAndEmptyProvider(): iterable
    {
        yield 'null'          => [null];
        yield 'empty string'  => [''];
        yield 'whitespace'    => ['   '];
        yield 'empty array'   => [[]];
        yield 'zero'          => [0];
        yield 'false'         => [false];
    }

    // ─── Boundary Values (সীমানা মান) ──────────────────────
    #[Test]
    #[DataProvider('boundaryProvider')]
    public function it_validates_bkash_amount_boundaries(
        float $amount,
        bool $expected,
        string $case
    ): void {
        $validator = new BkashAmountValidator();
        $this->assertSame($expected, $validator->validate($amount), $case);
    }

    public static function boundaryProvider(): iterable
    {
        // bKash সীমা: সর্বনিম্ন ১০ টাকা, সর্বোচ্চ ২৫,০০০ টাকা
        yield 'সীমার নিচে: ৯.৯৯'           => [9.99, false, 'just below min'];
        yield 'সর্বনিম্ন সীমা: ১০.০০'       => [10.00, true, 'exact minimum'];
        yield 'সীমার ঠিক উপরে: ১০.০১'       => [10.01, true, 'just above min'];
        yield 'মাঝামাঝি মান: ১২,৫০০'        => [12500.00, true, 'middle value'];
        yield 'সর্বোচ্চ সীমার ঠিক নিচে'     => [24999.99, true, 'just below max'];
        yield 'সর্বোচ্চ সীমা: ২৫,০০০'       => [25000.00, true, 'exact maximum'];
        yield 'সীমার উপরে: ২৫,০০০.০১'       => [25000.01, false, 'just above max'];
        yield 'শূন্য'                        => [0.00, false, 'zero'];
        yield 'ঋণাত্মক'                     => [-1.00, false, 'negative'];
    }

    // ─── Error Paths (ত্রুটি পথ) ───────────────────────────
    #[Test]
    public function it_handles_network_timeout_gracefully(): void
    {
        $service = new PaymentService(
            timeout: 0  // তাৎক্ষণিক timeout
        );

        $result = $service->attemptPayment(1500.00);

        $this->assertSame('failed', $result->status);
        $this->assertSame('TIMEOUT', $result->errorCode);
    }
}
```

### ৩. Pure Functions বনাম Side Effects

**Pure function** টেস্ট করা সবচেয়ে সহজ — একই ইনপুটে সবসময় একই আউটপুট দেয়, কোনো বাইরের state বদলায় না:

```javascript
// ─── Pure Function — টেস্ট করা অত্যন্ত সহজ ────────────
// src/utils/calculations.js
function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new RangeError("অবৈধ মান");
  }
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}

// tests — কোনো mock বা setup লাগে না
test("pure function: discount calculation", () => {
  expect(calculateDiscount(1000, 20)).toBe(800);
  expect(calculateDiscount(1000, 0)).toBe(1000);
  expect(calculateDiscount(0, 50)).toBe(0);
});
```

```javascript
// ─── Side Effect আছে — টেস্ট করতে isolation দরকার ──────
// src/services/notificationService.js
class NotificationService {
  constructor(smsClient, logger) {
    this.smsClient = smsClient;
    this.logger = logger;
  }

  async sendPaymentConfirmation(phone, amount) {
    const message = `আপনার ৳${amount} পেমেন্ট সফল হয়েছে`;

    // Side effects: SMS পাঠানো + লগ করা
    await this.smsClient.send(phone, message);
    this.logger.info("SMS sent", { phone, amount });

    return { sent: true, message };
  }
}

// tests — dependency injection দিয়ে mock ব্যবহার
test("side effect: sends SMS and logs", async () => {
  // mock dependencies
  const mockSmsClient = { send: jest.fn().mockResolvedValue(true) };
  const mockLogger = { info: jest.fn() };

  const service = new NotificationService(mockSmsClient, mockLogger);
  const result = await service.sendPaymentConfirmation("01712345678", 1500);

  expect(result.sent).toBe(true);
  expect(mockSmsClient.send).toHaveBeenCalledWith(
    "01712345678",
    "আপনার ৳1500 পেমেন্ট সফল হয়েছে",
  );
  expect(mockLogger.info).toHaveBeenCalledTimes(1);
});
```

**মূল শিক্ষা:** যতটা সম্ভব কোডকে pure function-এ ভাঙুন। Side effects আলাদা স্তরে রাখুন — এতে টেস্টিং অনেক সহজ হয়।

### ৪. Code Coverage কনফিগারেশন ও ব্যাখ্যা

```
কভারেজ মেট্রিক্স ব্যাখ্যা:

┌──────────────────┬─────────────────────────────────────────────────┐
│ Line Coverage     │ কতগুলো লাইন execute হয়েছে                      │
│                   │ সবচেয়ে সাধারণ মেট্রিক                          │
├──────────────────┼─────────────────────────────────────────────────┤
│ Branch Coverage   │ if/else, switch, ternary-র কতগুলো শাখা         │
│                   │ cover হয়েছে — Line-এর চেয়ে বেশি গুরুত্বপূর্ণ   │
├──────────────────┼─────────────────────────────────────────────────┤
│ Function Coverage │ কতগুলো ফাংশন/মেথড কমপক্ষে একবার call হয়েছে   │
├──────────────────┼─────────────────────────────────────────────────┤
│ Statement Coverage│ কতগুলো statement execute হয়েছে                 │
│                   │ (একই লাইনে একাধিক statement থাকতে পারে)         │
└──────────────────┴─────────────────────────────────────────────────┘

⚠️ সতর্কতা: ১০০% কভারেজ ≠ ১০০% সঠিক কোড!
   কভারেজ বলে "কোন কোড চলেছে" — "কোড সঠিক" তা বলে না।
```

```bash
# PHPUnit — কভারেজ রিপোর্ট তৈরি
php vendor/bin/phpunit --coverage-html reports/coverage --coverage-text

# Jest — কভারেজ সহ টেস্ট চালানো
npx jest --coverage --coverageReporters="text" --coverageReporters="html"
```

```
# Jest কভারেজ আউটপুট উদাহরণ:
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   87.5  |   75.0   |   90.0  |   88.2  |
 bdtFormatter.js    |   95.0  |   85.7   |  100.0  |   94.4  |
 priceCalculator.js |   80.0  |   66.7   |   80.0  |   82.4  |
--------------------|---------|----------|---------|---------|

বিশ্লেষণ:
• bdtFormatter.js — ভালো কভারেজ ✅ (তবে branch 85.7% — কিছু if/else মিস)
• priceCalculator.js — branch 66.7% ⚠️ — আরো edge case টেস্ট দরকার
```

### ৫. Snapshot Testing (Jest)

স্ন্যাপশট টেস্টিং UI কম্পোনেন্ট বা বড় ডেটা স্ট্রাকচারের রিগ্রেশন ধরতে ব্যবহৃত হয়। প্রথমবার চালালে স্ন্যাপশট সেভ হয়, পরবর্তীতে পরিবর্তন হলে ফেইল করে:

```javascript
// tests/unit/receiptGenerator.test.js

const { ReceiptGenerator } = require("../../src/services/receiptGenerator");

describe("ReceiptGenerator", () => {
  test("should generate correct bKash payment receipt", () => {
    const generator = new ReceiptGenerator();
    const receipt = generator.generate({
      transactionId: "TXN-20231115-ABC123",
      amount: 1500,
      currency: "BDT",
      sender: "01712345678",
      receiver: "01898765432",
      type: "send-money",
      timestamp: "2023-11-15T10:30:00Z",
    });

    // পুরো অবজেক্ট স্ন্যাপশট — .snap ফাইলে সেভ হয়
    expect(receipt).toMatchSnapshot();
  });

  // ─── Inline Snapshot — ছোট আউটপুটের জন্য ─────────────
  test("should format receipt header", () => {
    const generator = new ReceiptGenerator();
    const header = generator.formatHeader("bKash");

    expect(header).toMatchInlineSnapshot(`
      "═══════════════════════════════
       bKash পেমেন্ট রিসিট
       ═══════════════════════════════"
    `);
  });

  // ─── Property Matcher সহ Snapshot ─────────────────────
  test("snapshot with dynamic values", () => {
    const generator = new ReceiptGenerator();
    const receipt = generator.generate({
      transactionId: "TXN-DYNAMIC",
      amount: 2000,
      currency: "BDT",
      timestamp: new Date().toISOString(),
    });

    // dynamic field-গুলোর জন্য matcher ব্যবহার
    expect(receipt).toMatchSnapshot({
      transactionId: expect.any(String),
      timestamp: expect.any(String),
      generatedAt: expect.any(String),
    });
  });
});

// স্ন্যাপশট আপডেট করতে: npx jest --updateSnapshot (বা -u)
```

### ৬. Mutation Testing ধারণা

মিউটেশন টেস্টিং টেস্ট স্যুটের **গুণমান** পরিমাপ করে। এটি সোর্স কোডে ছোট ছোট পরিবর্তন (mutant) করে দেখে টেস্ট ফেইল করে কিনা:

```
মিউটেশন টেস্টিং কীভাবে কাজ করে:

  মূল কোড                    মিউটেন্ট (পরিবর্তিত কোড)
  ─────────                   ────────────────────────
  if (amount > 0)      →     if (amount >= 0)        // সীমানা পরিবর্তন
  if (amount > 0)      →     if (amount < 0)         // শর্ত উল্টানো
  return price * 1.15  →     return price * 1.00     // মান পরিবর্তন
  return price + tax   →     return price - tax      // অপারেটর পরিবর্তন
  if (a && b)          →     if (a || b)             // লজিক পরিবর্তন

  ✅ Killed Mutant: টেস্ট ফেইল করেছে — টেস্ট ভালো!
  ❌ Survived Mutant: টেস্ট পাস করেছে — টেস্ট দুর্বল!

  Mutation Score = (Killed / Total) × ১০০%
  লক্ষ্য: ৮০%+ স্কোর
```

```bash
# PHP — Infection (Mutation Testing Framework)
composer require --dev infection/infection
vendor/bin/infection --min-msi=80 --min-covered-msi=90

# JavaScript — Stryker Mutator
npx stryker init
npx stryker run
```

```json
// stryker.conf.json (Jest-এর জন্য)
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "mutate": ["src/**/*.js", "!src/**/*.test.js"],
  "testRunner": "jest",
  "jest": { "configFile": "jest.config.js" },
  "reporters": ["html", "clear-text", "progress"],
  "thresholds": { "high": 80, "low": 60, "break": 50 }
}
```

### ৭. Property-Based Testing ধারণা

প্রচলিত টেস্টিং-এ আমরা নির্দিষ্ট মান দিয়ে টেস্ট করি। Property-based testing-এ আমরা **বৈশিষ্ট্য (property)** সংজ্ঞায়িত করি এবং ফ্রেমওয়ার্ক শত শত র‍্যান্ডম ইনপুট তৈরি করে সেই বৈশিষ্ট্য ভাঙে কিনা দেখে:

```javascript
// fast-check লাইব্রেরি ব্যবহার করে Property-Based Testing
const fc = require("fast-check");

describe("Property-Based Testing", () => {
  // বৈশিষ্ট্য ১: ভ্যাট যোগ করলে মূল্য বাড়বে বা সমান থাকবে
  test("VAT সবসময় মূল্য বাড়ায় বা সমান রাখে", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1_000_000, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (price, vatRate) => {
          const withVat = price * (1 + vatRate / 100);
          return withVat >= price;
        },
      ),
    );
  });

  // বৈশিষ্ট্য ২: ডিসকাউন্ট প্রয়োগ করলে মূল্য কমবে বা সমান থাকবে
  test("ডিসকাউন্ট কখনো মূল্য বাড়ায় না", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1_000_000, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (price, discountPercent) => {
          const discounted = price * (1 - discountPercent / 100);
          return discounted <= price;
        },
      ),
    );
  });

  // বৈশিষ্ট্য ৩: format → parse → সমান মান
  test("format এবং parse একে অপরের inverse", () => {
    const formatter = new BdtFormatter();

    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 99_999_999.99, noNaN: true }),
        (amount) => {
          const rounded = Math.round(amount * 100) / 100;
          const formatted = formatter.format(rounded);
          const parsed = formatter.parse(formatted);
          return Math.abs(parsed - rounded) < 0.01;
        },
      ),
    );
  });
});
```

### ৮. SOLID কোড টেস্টিং বনাম Tightly Coupled কোড

**Tightly Coupled কোড — টেস্ট করা কঠিন:**

```php
<?php
// ❌ খারাপ — সরাসরি dependency তৈরি করে, টেস্ট করা প্রায় অসম্ভব
class PaymentProcessor
{
    public function process(float $amount, string $phone): array
    {
        // সরাসরি bKash API কল — mock করা যায় না
        $bkash = new BkashApiClient('live-api-key');
        $response = $bkash->sendMoney($amount, $phone);

        // সরাসরি ডেটাবেস কল
        $db = new PDO('mysql:host=localhost;dbname=payments', 'root', 'pass');
        $stmt = $db->prepare('INSERT INTO transactions ...');
        $stmt->execute([$amount, $phone, $response['txnId']]);

        // সরাসরি SMS পাঠায়
        $sms = new SmsGateway();
        $sms->send($phone, "৳{$amount} পেমেন্ট সফল");

        return $response;
    }
}
// টেস্ট করতে গেলে: আসল API কল হবে, আসল DB লাগবে, আসল SMS যাবে! 😱
```

**SOLID কোড — টেস্ট করা সহজ:**

```php
<?php
// ✅ ভালো — Dependency Injection, Interface Segregation
interface PaymentGatewayInterface
{
    public function sendMoney(float $amount, string $phone): PaymentResult;
}

interface TransactionRepositoryInterface
{
    public function save(Transaction $transaction): void;
}

interface NotificationServiceInterface
{
    public function sendPaymentConfirmation(string $phone, float $amount): void;
}

class PaymentProcessor
{
    public function __construct(
        private readonly PaymentGatewayInterface $gateway,
        private readonly TransactionRepositoryInterface $repository,
        private readonly NotificationServiceInterface $notifier,
    ) {}

    public function process(float $amount, string $phone): PaymentResult
    {
        $result = $this->gateway->sendMoney($amount, $phone);

        $this->repository->save(
            new Transaction($amount, $phone, $result->transactionId)
        );

        $this->notifier->sendPaymentConfirmation($phone, $amount);

        return $result;
    }
}
```

```php
<?php
// এখন টেস্ট করা সহজ — mock inject করলেই হলো
class PaymentProcessorTest extends TestCase
{
    #[Test]
    public function it_processes_payment_successfully(): void
    {
        // Arrange — mock dependencies
        $mockGateway = $this->createMock(PaymentGatewayInterface::class);
        $mockGateway->method('sendMoney')
            ->willReturn(new PaymentResult('TXN123', 'success'));

        $mockRepo = $this->createMock(TransactionRepositoryInterface::class);
        $mockRepo->expects($this->once())->method('save');

        $mockNotifier = $this->createMock(NotificationServiceInterface::class);
        $mockNotifier->expects($this->once())
            ->method('sendPaymentConfirmation')
            ->with('01712345678', 1500.00);

        $processor = new PaymentProcessor($mockGateway, $mockRepo, $mockNotifier);

        // Act
        $result = $processor->process(1500.00, '01712345678');

        // Assert
        $this->assertSame('success', $result->status);
        $this->assertSame('TXN123', $result->transactionId);
    }

    #[Test]
    public function it_does_not_save_or_notify_on_gateway_failure(): void
    {
        $mockGateway = $this->createMock(PaymentGatewayInterface::class);
        $mockGateway->method('sendMoney')
            ->willThrowException(new PaymentFailedException('Gateway error'));

        $mockRepo = $this->createMock(TransactionRepositoryInterface::class);
        $mockRepo->expects($this->never())->method('save');

        $mockNotifier = $this->createMock(NotificationServiceInterface::class);
        $mockNotifier->expects($this->never())->method('sendPaymentConfirmation');

        $processor = new PaymentProcessor($mockGateway, $mockRepo, $mockNotifier);

        $this->expectException(PaymentFailedException::class);
        $processor->process(1500.00, '01712345678');
    }
}
```

---
