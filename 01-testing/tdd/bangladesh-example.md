# Bangladesh TDD Example

## 🇧🇩 বাংলাদেশ কনটেক্সট: bKash ট্রান্সফার ভ্যালিডেশন TDD দিয়ে বিল্ড

বাস্তব উদাহরণ হিসেবে আমরা bKash-এর মতো মোবাইল ব্যাংকিং ট্রান্সফার ভ্যালিডেশন TDD দিয়ে বানাবো।

### PHP: BkashTransferValidator

```php
<?php
// tests/BkashTransferValidatorTest.php

class BkashTransferValidatorTest extends TestCase
{
    private BkashTransferValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new BkashTransferValidator();
    }

    // 🔴🟢 সাইকেল ১: ফোন নম্বর ভ্যালিডেশন
    public function test_rejects_invalid_phone_number(): void
    {
        $result = $this->validator->validate([
            'sender'   => '12345',
            'receiver' => '01898765432',
            'amount'   => 100,
        ]);
        $this->assertFalse($result->isValid);
        $this->assertContains(
            'বৈধ বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)',
            $result->errors
        );
    }

    public function test_accepts_valid_bd_phone_numbers(): void
    {
        $result = $this->validator->validate([
            'sender'   => '01712345678',
            'receiver' => '01898765432',
            'amount'   => 100,
        ]);
        $this->assertNotContains(
            'বৈধ বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)',
            $result->errors
        );
    }

    // 🔴🟢 সাইকেল ২: পরিমাণ ভ্যালিডেশন
    public function test_rejects_amount_below_minimum(): void
    {
        $result = $this->validator->validate([
            'sender' => '01712345678', 'receiver' => '01898765432',
            'amount' => 5, // সর্বনিম্ন ১০ টাকা
        ]);
        $this->assertContains('সর্বনিম্ন ট্রান্সফার পরিমাণ ১০ টাকা', $result->errors);
    }

    public function test_rejects_amount_above_maximum(): void
    {
        $result = $this->validator->validate([
            'sender' => '01712345678', 'receiver' => '01898765432',
            'amount' => 30000, // সর্বোচ্চ ২৫,০০০ টাকা
        ]);
        $this->assertContains(
            'একবারে সর্বোচ্চ ২৫,০০০ টাকা ট্রান্সফার করা যায়',
            $result->errors
        );
    }

    // 🔴🟢 সাইকেল ৩: নিজের নম্বরে ট্রান্সফার
    public function test_rejects_self_transfer(): void
    {
        $result = $this->validator->validate([
            'sender' => '01712345678', 'receiver' => '01712345678',
            'amount' => 100,
        ]);
        $this->assertContains('নিজের নম্বরে টাকা পাঠানো যায় না', $result->errors);
    }

    // 🔴🟢 সাইকেল ৪: ফি হিসাব
    public function test_calculates_fee_for_small_amount(): void
    {
        $result = $this->validator->validate([
            'sender' => '01712345678', 'receiver' => '01898765432',
            'amount' => 100,
        ]);
        $this->assertEquals(5, $result->fee);
    }

    public function test_calculates_fee_for_large_amount(): void
    {
        $result = $this->validator->validate([
            'sender' => '01712345678', 'receiver' => '01898765432',
            'amount' => 10000,
        ]);
        $this->assertEquals(25, $result->fee);
    }

    // 🔴🟢 সাইকেল ৫: দৈনিক লিমিট
    public function test_rejects_if_daily_limit_exceeded(): void
    {
        $todayTransfers = 20000; // আজকে ইতোমধ্যে ২০,০০০ পাঠিয়েছে
        $validator = new BkashTransferValidator($todayTransfers);

        $result = $validator->validate([
            'sender' => '01712345678', 'receiver' => '01898765432',
            'amount' => 10000, // মোট হবে ৩০,০০০ > দৈনিক লিমিট ২৫,০০০
        ]);
        $this->assertContains('দৈনিক সর্বোচ্চ ২৫,০০০ টাকা ট্রান্সফার করা যায়', $result->errors);
    }
}
```

```php
<?php
// src/BkashTransferValidator.php

class TransferValidationResult
{
    public function __construct(
        public readonly bool $isValid,
        public readonly array $errors,
        public readonly float $fee = 0,
        public readonly float $totalAmount = 0,
    ) {}
}

class BkashTransferValidator
{
    private const MIN_AMOUNT = 10;
    private const MAX_AMOUNT = 25000;
    private const DAILY_LIMIT = 25000;

    private const FEE_STRUCTURE = [
        ['min' => 10,    'max' => 500,   'fee' => 5],
        ['min' => 501,   'max' => 1000,  'fee' => 10],
        ['min' => 1001,  'max' => 5000,  'fee' => 15],
        ['min' => 5001,  'max' => 10000, 'fee' => 25],
        ['min' => 10001, 'max' => 25000, 'fee' => 40],
    ];

    public function __construct(
        private readonly float $todayTotalTransferred = 0,
    ) {}

    public function validate(array $data): TransferValidationResult
    {
        $errors = [];
        $sender   = $data['sender'] ?? '';
        $receiver = $data['receiver'] ?? '';
        $amount   = $data['amount'] ?? 0;

        // ফোন নম্বর ভ্যালিডেশন
        $phonePattern = '/^01[3-9]\d{8}$/';
        if (!preg_match($phonePattern, $sender) || !preg_match($phonePattern, $receiver)) {
            $errors[] = 'বৈধ বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)';
        }

        // নিজের নম্বরে ট্রান্সফার
        if ($sender === $receiver) {
            $errors[] = 'নিজের নম্বরে টাকা পাঠানো যায় না';
        }

        // পরিমাণ ভ্যালিডেশন
        if ($amount < self::MIN_AMOUNT) {
            $errors[] = 'সর্বনিম্ন ট্রান্সফার পরিমাণ ১০ টাকা';
        }
        if ($amount > self::MAX_AMOUNT) {
            $errors[] = 'একবারে সর্বোচ্চ ২৫,০০০ টাকা ট্রান্সফার করা যায়';
        }

        // দৈনিক লিমিট
        if (($this->todayTotalTransferred + $amount) > self::DAILY_LIMIT) {
            $errors[] = 'দৈনিক সর্বোচ্চ ২৫,০০০ টাকা ট্রান্সফার করা যায়';
        }

        // ফি হিসাব
        $fee = $this->calculateFee($amount);

        return new TransferValidationResult(
            isValid: empty($errors),
            errors: $errors,
            fee: $fee,
            totalAmount: $amount + $fee,
        );
    }

    private function calculateFee(float $amount): float
    {
        foreach (self::FEE_STRUCTURE as $tier) {
            if ($amount >= $tier['min'] && $amount <= $tier['max']) {
                return $tier['fee'];
            }
        }
        return 0;
    }
}
```

### JavaScript: bKash টেস্ট (Jest)

```javascript
// __tests__/bkashValidator.test.js

const { BkashTransferValidator } = require("../src/bkashValidator");

describe("BkashTransferValidator", () => {
  let validator;

  beforeEach(() => {
    validator = new BkashTransferValidator();
  });

  describe("ফোন নম্বর যাচাই", () => {
    test("অবৈধ নম্বর প্রত্যাখ্যান করে", () => {
      const result = validator.validate({
        sender: "12345",
        receiver: "01898765432",
        amount: 100,
      });
      expect(result.errors).toContain("বৈধ মোবাইল নম্বর দিন");
    });

    test("GP, Robi, Banglalink, Teletalk নম্বর গ্রহণ করে", () => {
      ["017", "018", "019", "016", "015", "013"].forEach((prefix) => {
        const result = validator.validate({
          sender: `${prefix}12345678`,
          receiver: "01898765432",
          amount: 100,
        });
        expect(result.errors).not.toContain("বৈধ মোবাইল নম্বর দিন");
      });
    });
  });

  describe("পরিমাণ যাচাই", () => {
    test("সর্বনিম্ন ১০ টাকা না হলে প্রত্যাখ্যান", () => {
      const result = validator.validate({
        sender: "01712345678",
        receiver: "01898765432",
        amount: 5,
      });
      expect(result.isValid).toBe(false);
    });

    test("সর্বোচ্চ ২৫,০০০ টাকার বেশি হলে প্রত্যাখ্যান", () => {
      const result = validator.validate({
        sender: "01712345678",
        receiver: "01898765432",
        amount: 30000,
      });
      expect(result.isValid).toBe(false);
    });
  });

  describe("ফি হিসাব", () => {
    test.each([
      [50, 5],
      [500, 5],
      [750, 10],
      [3000, 15],
      [8000, 25],
      [20000, 40],
    ])("%i টাকায় ফি %i টাকা", (amount, expectedFee) => {
      const result = validator.validate({
        sender: "01712345678",
        receiver: "01898765432",
        amount,
      });
      expect(result.fee).toBe(expectedFee);
    });
  });
});
```

---
