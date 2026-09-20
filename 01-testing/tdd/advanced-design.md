# Advanced TDD and Design

## 🔥 Advanced TDD

### ১. Kent Beck-এর TDD তিনটি আইন (Three Laws of TDD)

Robert C. Martin (Uncle Bob) এই আইনগুলো সুস্পষ্টভাবে লিখেছেন, যা Kent Beck-এর TDD দর্শন থেকে এসেছে:

```
┌─────────────────────────────────────────────────────────────┐
│  আইন ১: আপনি কোনো প্রোডাকশন কোড লিখতে পারবেন না         │
│          যতক্ষণ না একটি ফেইলিং ইউনিট টেস্ট থাকে।           │
│                                                             │
│  আইন ২: আপনি ফেইল করার জন্য যতটুকু ইউনিট টেস্ট দরকার     │
│          তার বেশি লিখতে পারবেন না (কম্পাইল না হওয়াও       │
│          ফেইলের মধ্যে পড়ে)।                                │
│                                                             │
│  আইন ৩: বর্তমানে ফেইল হওয়া টেস্ট পাস করার জন্য যতটুকু    │
│          প্রোডাকশন কোড দরকার তার বেশি লিখতে পারবেন না।     │
└─────────────────────────────────────────────────────────────┘
```

**ব্যবহারিক অর্থ:**

এই তিনটি আইন মানলে আপনি **৩০ সেকেন্ড থেকে ২ মিনিটের** মধ্যে একটি Red-Green সাইকেল শেষ করবেন। এটি নিশ্চিত করে যে:

- আপনার কোড সবসময় "almost working" অবস্থায় থাকে
- কোনো বাগ আসলে সেটি সর্বশেষ ১-২ মিনিটের কোডে আছে
- ডিবাগিং প্রায় শূন্যে নেমে আসে

---

### ২. Inside-Out vs Outside-In TDD

TDD-তে দুটি প্রধান স্কুল আছে:

```
┌──────────────────────────┬──────────────────────────────────┐
│     Inside-Out (Detroit)  │       Outside-In (London)        │
│     Classicist School     │        Mockist School            │
├──────────────────────────┼──────────────────────────────────┤
│ ভেতর থেকে শুরু করে       │ বাইরে থেকে শুরু করে              │
│ ক্ষুদ্র ইউনিট → বড় ফিচার│ ইউজার ইন্টারফেস → ভেতরের লজিক  │
│ সত্যিকার অবজেক্ট ব্যবহার │ Mocks/Stubs বেশি ব্যবহার করে    │
│ ইমার্জেন্ট ডিজাইন        │ পরিকল্পিত ডিজাইন                │
│ Kent Beck, Martin Fowler  │ Steve Freeman, Nat Pryce         │
└──────────────────────────┴──────────────────────────────────┘
```

#### Inside-Out উদাহরণ (PHP):

```php
// ভেতরের ইউনিট আগে বানাই
class MoneyTest extends TestCase
{
    public function test_adds_two_amounts(): void
    {
        $a = new Money(100, 'BDT');
        $b = new Money(250, 'BDT');
        $this->assertEquals(new Money(350, 'BDT'), $a->add($b));
    }
}

// তারপর এই ইউনিট ব্যবহার করে বড় ফিচার বানাই
class WalletTest extends TestCase
{
    public function test_calculates_balance(): void
    {
        $wallet = new Wallet();
        $wallet->deposit(new Money(1000, 'BDT'));
        $wallet->withdraw(new Money(300, 'BDT'));
        $this->assertEquals(new Money(700, 'BDT'), $wallet->balance());
    }
}
```

#### Outside-In উদাহরণ (PHP):

```php
// বাইরের ইন্টারফেস আগে ডিজাইন করি, ভেতরটা মক করি
class TransferServiceTest extends TestCase
{
    public function test_transfers_money_between_wallets(): void
    {
        $sourceWallet = $this->createMock(WalletInterface::class);
        $destWallet = $this->createMock(WalletInterface::class);
        $notifier = $this->createMock(NotificationService::class);

        $sourceWallet->expects($this->once())
            ->method('withdraw')
            ->with(new Money(500, 'BDT'));

        $destWallet->expects($this->once())
            ->method('deposit')
            ->with(new Money(500, 'BDT'));

        $notifier->expects($this->once())
            ->method('send');

        $service = new TransferService($sourceWallet, $destWallet, $notifier);
        $service->transfer(new Money(500, 'BDT'));
    }
}
```

**কখন কোনটি ব্যবহার করবেন?**

- **Inside-Out**: যখন ডোমেইন লজিক জটিল, অ্যালগরিদম ভারী (যেমন pricing engine, mathematical calculations)
- **Outside-In**: যখন অনেক collaborator আছে, সিস্টেম ইন্টিগ্রেশন পয়েন্ট বেশি (যেমন payment gateway, notification system)

---

### ৩. TDD with Design Patterns

TDD ডিজাইন প্যাটার্ন "আবিষ্কার" করতে সাহায্য করে। আপনি ইচ্ছাকৃতভাবে প্যাটার্ন প্রয়োগ করেন না — TDD চক্রের রিফ্যাক্টর ধাপে এগুলো স্বাভাবিকভাবে আসে।

#### Strategy Pattern — TDD থেকে আবিষ্কার (JavaScript):

```javascript
// 🔴 Red: বিভিন্ন ধরনের শিপিং ক্যালকুলেশন
describe("ShippingCalculator", () => {
  test("স্ট্যান্ডার্ড শিপিং হিসাব করে", () => {
    const calc = new ShippingCalculator("standard");
    expect(calc.calculate(1000)).toBe(60);
  });

  test("এক্সপ্রেস শিপিং হিসাব করে", () => {
    const calc = new ShippingCalculator("express");
    expect(calc.calculate(1000)).toBe(150);
  });
});

// 🟢 Green: প্রথমে if-else দিয়ে পাস করি
class ShippingCalculator {
  constructor(type) {
    this.type = type;
  }

  calculate(orderAmount) {
    if (this.type === "standard") return orderAmount * 0.06;
    if (this.type === "express") return orderAmount * 0.15;
    throw new Error("Unknown shipping type");
  }
}

// 🔵 Refactor: Strategy Pattern আবিষ্কৃত হলো!
const shippingStrategies = {
  standard: (amount) => amount * 0.06,
  express: (amount) => amount * 0.15,
  free: (_amount) => 0,
};

class ShippingCalculator {
  constructor(type) {
    this.strategy = shippingStrategies[type];
    if (!this.strategy) throw new Error(`Unknown type: ${type}`);
  }

  calculate(orderAmount) {
    return this.strategy(orderAmount);
  }
}
```

> 🔑 **মূল শিক্ষা**: TDD-তে ডিজাইন "emerge" করে — আপনি আগে থেকে প্যাটার্ন ঠিক করেন না। Red-Green-Refactor চক্র আপনাকে সঠিক প্যাটার্নের দিকে গাইড করে।

---

### ৪. TDD with Legacy Code

Legacy কোডে TDD প্রয়োগ করা সবচেয়ে কঠিন। Michael Feathers তাঁর "Working Effectively with Legacy Code" বইয়ে বলেছেন:

> "Legacy code is code without tests."

#### কৌশল ১: Characterization Tests

Characterization test বর্তমান আচরণ ক্যাপচার করে, সঠিক আচরণ নয়:

```php
// বর্তমান কোড — আমরা জানি না এটি "সঠিক" কিনা
class LegacyPriceCalculator
{
    public function calculate($items, $region)
    {
        // ৫০০ লাইনের স্প্যাগেটি কোড...
        return $total;
    }
}

// Characterization Test — বর্তমান আচরণ রেকর্ড করি
class LegacyPriceCalculatorTest extends TestCase
{
    public function test_characterize_dhaka_region_pricing(): void
    {
        $calc = new LegacyPriceCalculator();
        $items = [['name' => 'Rice', 'price' => 60, 'qty' => 5]];

        $result = $calc->calculate($items, 'dhaka');

        // প্রথমে রান করে দেখুন আসল আউটপুট কত,
        // তারপর সেই মান assert করুন
        $this->assertEquals(315, $result); // ৩১৫ আসলো — এটাই assert করি
    }

    public function test_characterize_empty_items(): void
    {
        $calc = new LegacyPriceCalculator();
        $result = $calc->calculate([], 'dhaka');
        $this->assertEquals(0, $result);
    }
}
```

#### কৌশল ২: Golden Master Testing

```javascript
// সম্পূর্ণ আউটপুট স্ন্যাপশট হিসেবে সেভ করি
const { LegacyReportGenerator } = require("../src/legacy");
const fs = require("fs");

describe("Golden Master - Legacy Report", () => {
  test("রিপোর্ট আউটপুট গোল্ডেন মাস্টারের সাথে মিলে", () => {
    const generator = new LegacyReportGenerator();
    const output = generator.generate(sampleData);

    // প্রথমবার: fs.writeFileSync('golden-master.txt', output);
    const goldenMaster = fs.readFileSync("golden-master.txt", "utf8");
    expect(output).toBe(goldenMaster);
  });
});
```

#### Legacy Code-এ TDD ধাপ:

```
১. Characterization test লিখুন (বর্তমান আচরণ বুঝুন)
        │
        ▼
২. "Seam" খুঁজুন (যেখানে কোড আলাদা করা যায়)
        │
        ▼
৩. Extract Method / Extract Class করুন
        │
        ▼
৪. নতুন ফিচারের জন্য TDD শুরু করুন
        │
        ▼
৫. ধীরে ধীরে legacy কোড প্রতিস্থাপন করুন
```

---

### ৫. BDD (Behavior Driven Development)

BDD হলো TDD-এর একটি এক্সটেনশন যেখানে **Given/When/Then** ফরম্যাটে টেস্ট লেখা হয়। এটি ব্যবসায়িক ভাষায় (ubiquitous language) লেখা হয়।

#### PHP — Behat ব্যবহার করে:

```gherkin
# features/shopping_cart.feature

Feature: শপিং কার্ট
  একজন ক্রেতা হিসেবে
  আমি কার্টে পণ্য যোগ করতে চাই
  যাতে আমি সেগুলো একসাথে কিনতে পারি

  Scenario: কার্টে পণ্য যোগ করা
    Given আমার কার্ট খালি
    When আমি "Laptop" যোগ করি যার দাম ৭৫০০০ টাকা
    And আমি "Mouse" যোগ করি যার দাম ৫০০ টাকা পরিমাণ ২
    Then কার্টে ২টি আইটেম থাকবে
    And মোট মূল্য হবে ৭৬০০০ টাকা

  Scenario: ডিসকাউন্ট প্রয়োগ
    Given আমার কার্টে ১০০০০ টাকার পণ্য আছে
    When আমি ১০% ডিসকাউন্ট প্রয়োগ করি
    Then মোট মূল্য হবে ৯০০০ টাকা
```

```php
<?php
// features/bootstrap/CartContext.php

use Behat\Behat\Context\Context;
use PHPUnit\Framework\Assert;

class CartContext implements Context
{
    private ShoppingCart $cart;

    /** @Given আমার কার্ট খালি */
    public function emptyCart(): void
    {
        $this->cart = new ShoppingCart();
    }

    /** @When আমি :name যোগ করি যার দাম :price টাকা */
    public function addItem(string $name, int $price): void
    {
        $this->cart->addItem($name, $price, 1);
    }

    /** @Then মোট মূল্য হবে :total টাকা */
    public function assertTotal(int $total): void
    {
        Assert::assertEquals($total, $this->cart->calculateTotal());
    }
}
```

#### JavaScript — Cucumber ব্যবহার করে:

```gherkin
# features/password.feature

Feature: পাসওয়ার্ড যাচাই
  Scenario: দুর্বল পাসওয়ার্ড প্রত্যাখ্যান
    Given আমি একটি পাসওয়ার্ড ভ্যালিডেটর তৈরি করেছি
    When আমি "abc" পাসওয়ার্ড যাচাই করি
    Then ফলাফল অবৈধ হবে
    And ত্রুটি তালিকায় "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" থাকবে
```

```javascript
// features/step_definitions/passwordSteps.js

const { Given, When, Then } = require("@cucumber/cucumber");
const { PasswordValidator } = require("../../src/passwordValidator");
const assert = require("assert");

let validator, result;

Given("আমি একটি পাসওয়ার্ড ভ্যালিডেটর তৈরি করেছি", () => {
  validator = new PasswordValidator();
});

When("আমি {string} পাসওয়ার্ড যাচাই করি", (password) => {
  result = validator.validate(password);
});

Then("ফলাফল অবৈধ হবে", () => {
  assert.strictEqual(result.isValid, false);
});

Then("ত্রুটি তালিকায় {string} থাকবে", (errorMsg) => {
  assert.ok(result.errors.includes(errorMsg));
});
```

---
