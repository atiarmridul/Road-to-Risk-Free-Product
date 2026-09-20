# Acceptance TDD, API TDD, and Katas

## ৬. ATDD (Acceptance Test Driven Development)
ATDD হলো TDD-এর একটি উচ্চ-স্তরের সংস্করণ যেখানে **ব্যবসায়িক প্রয়োজনীয়তা** থেকে সরাসরি acceptance test লেখা হয়।

```
       ATDD Pyramid
    ┌────────────────┐
    │  Acceptance     │  ← ATDD (ব্যবসায়িক ভাষায়)
    │  Tests          │
    ├────────────────┤
    │  Integration    │  ← কম্পোনেন্ট ইন্টিগ্রেশন
    │  Tests          │
    ├────────────────┤
    │  Unit Tests     │  ← TDD (ডেভেলপার টেস্ট)
    │  (most tests)   │
    └────────────────┘
```

```php
// ATDD: Acceptance test প্রথমে লিখুন
class UserRegistrationAcceptanceTest extends TestCase
{
    public function test_user_can_register_and_login(): void
    {
        $app = new Application();

        // Acceptance criteria অনুযায়ী
        $response = $app->post('/register', [
            'name' => 'রহিম',
            'email' => 'rahim@example.com',
            'password' => 'Str0ng!Pass',
        ]);
        $this->assertEquals(201, $response->status());

        $loginResponse = $app->post('/login', [
            'email' => 'rahim@example.com',
            'password' => 'Str0ng!Pass',
        ]);
        $this->assertEquals(200, $loginResponse->status());
        $this->assertNotEmpty($loginResponse->json('token'));
    }
}
```

**ATDD + TDD ওয়ার্কফ্লো:**

```
১. Product Owner acceptance criteria দেন
        │
        ▼
২. ATDD: Acceptance test লিখুন (🔴 ফেইল)
        │
        ▼
৩. TDD সাইকেল শুরু করুন:
   │  ┌──▶ 🔴 Unit test লিখুন
   │  │    🟢 ন্যূনতম কোড
   │  │    🔵 রিফ্যাক্টর
   │  └──── পুনরাবৃত্তি
   │
   ▼
৪. Acceptance test পাস (🟢)
        │
        ▼
৫. পরবর্তী acceptance criteria
```

---

### ৭. TDD in API Development (API-First TDD)

API ডেভেলপমেন্টে TDD অত্যন্ত কার্যকর। প্রথমে API contract (request/response) ডিজাইন করুন, তারপর TDD করুন।

#### PHP (Laravel) — API TDD:

```php
class BkashTransferApiTest extends TestCase
{
    // 🔴 Red: সফল ট্রান্সফার
    public function test_successful_transfer_returns_201(): void
    {
        $payload = [
            'sender'   => '01712345678',
            'receiver' => '01898765432',
            'amount'   => 500.00,
            'pin'      => '12345',
        ];

        $response = $this->postJson('/api/v1/transfer', $payload);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'transaction_id',
                     'status',
                     'amount',
                     'fee',
                     'timestamp',
                 ]);
    }

    // 🔴 Red: অপর্যাপ্ত ব্যালেন্স
    public function test_insufficient_balance_returns_422(): void
    {
        $payload = [
            'sender'   => '01712345678',
            'receiver' => '01898765432',
            'amount'   => 999999.00,
            'pin'      => '12345',
        ];

        $response = $this->postJson('/api/v1/transfer', $payload);

        $response->assertStatus(422)
                 ->assertJson([
                     'error' => 'অপর্যাপ্ত ব্যালেন্স',
                 ]);
    }

    // 🔴 Red: ভুল পিন
    public function test_wrong_pin_returns_401(): void
    {
        $payload = [
            'sender'   => '01712345678',
            'receiver' => '01898765432',
            'amount'   => 500.00,
            'pin'      => '00000',
        ];

        $response = $this->postJson('/api/v1/transfer', $payload);

        $response->assertStatus(401)
                 ->assertJson(['error' => 'ভুল পিন']);
    }

    // 🔴 Red: ভ্যালিডেশন — সর্বনিম্ন পরিমাণ
    public function test_minimum_transfer_amount_validation(): void
    {
        $payload = [
            'sender'   => '01712345678',
            'receiver' => '01898765432',
            'amount'   => 5.00, // সর্বনিম্ন ১০ টাকা
            'pin'      => '12345',
        ];

        $response = $this->postJson('/api/v1/transfer', $payload);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['amount']);
    }
}
```

#### JavaScript (Express + Supertest) — API TDD:

```javascript
// __tests__/api/transfer.test.js

const request = require("supertest");
const app = require("../../src/app");

describe("POST /api/v1/transfer", () => {
  test("সফল ট্রান্সফারে 201 রিটার্ন করে", async () => {
    const res = await request(app).post("/api/v1/transfer").send({
      sender: "01712345678",
      receiver: "01898765432",
      amount: 500,
      pin: "12345",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("transaction_id");
    expect(res.body.status).toBe("completed");
    expect(res.body.fee).toBeGreaterThan(0);
  });

  test("অবৈধ ফোন নম্বরে 422 রিটার্ন করে", async () => {
    const res = await request(app).post("/api/v1/transfer").send({
      sender: "123",
      receiver: "01898765432",
      amount: 500,
      pin: "12345",
    });

    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
  });

  test("দৈনিক লিমিট অতিক্রম করলে 429 রিটার্ন করে", async () => {
    // দৈনিক সর্বোচ্চ ২৫,০০০ টাকা
    const res = await request(app).post("/api/v1/transfer").send({
      sender: "01712345678",
      receiver: "01898765432",
      amount: 30000,
      pin: "12345",
    });

    expect(res.status).toBe(429);
    expect(res.body.error).toContain("দৈনিক লিমিট");
  });
});
```

---

### ৮. TDD কখন করবেন না (When NOT to do TDD)

TDD সর্বজনীন সমাধান নয়। কিছু ক্ষেত্রে TDD কম কার্যকর বা সময়ের অপচয়:

```
┌──────────────────────────────────────────────────────────┐
│              TDD এড়িয়ে যাওয়ার ক্ষেত্রসমূহ               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ❌ Prototype / Spike কোড                                │
│     → আপনি সমস্যা বুঝতে কোড লিখছেন, সমাধান করতে নয়    │
│     → এই কোড ফেলে দেওয়া হবে                             │
│                                                          │
│  ❌ UI/View Layer (পরিবর্তনশীল HTML/CSS)                 │
│     → Visual regression tools ভালো কাজ করে              │
│     → TDD এখানে ভঙ্গুর টেস্ট তৈরি করে                   │
│                                                          │
│  ❌ Third-party API Integration                          │
│     → Integration test বা contract test ব্যবহার করুন     │
│     → ইউনিট টেস্টে মক করলে বাস্তব API পরিবর্তনে ধরা    │
│       পড়বে না                                            │
│                                                          │
│  ❌ Trivial কোড (getters/setters, config)                │
│     → যেখানে লজিক নেই সেখানে TDD অপচয়                  │
│                                                          │
│  ❌ একেবারে নতুন ডোমেইন শেখার সময়                       │
│     → আগে ডোমেইন বুঝুন, তারপর TDD শুরু করুন             │
│                                                          │
│  ❌ ডেটাবেস মাইগ্রেশন / স্ক্রিপ্ট                        │
│     → Integration test যথেষ্ট                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**তবে মনে রাখবেন**: "TDD কঠিন" মানে "TDD করবেন না" নয়। TDD কঠিন মনে হলে সাধারণত কোড ডিজাইনে সমস্যা আছে।

---

### ৯. TDD Kata Exercises

TDD অনুশীলনের জন্য Kata হলো সবচেয়ে ভালো উপায়। নিচে তিনটি ক্লাসিক Kata:

#### Kata ১: FizzBuzz (PHP)

```php
class FizzBuzzTest extends TestCase
{
    private FizzBuzz $fb;

    protected function setUp(): void
    {
        $this->fb = new FizzBuzz();
    }

    public function test_returns_number_as_string(): void
    {
        $this->assertEquals('1', $this->fb->convert(1));
        $this->assertEquals('2', $this->fb->convert(2));
    }

    public function test_returns_fizz_for_multiples_of_3(): void
    {
        $this->assertEquals('Fizz', $this->fb->convert(3));
        $this->assertEquals('Fizz', $this->fb->convert(9));
    }

    public function test_returns_buzz_for_multiples_of_5(): void
    {
        $this->assertEquals('Buzz', $this->fb->convert(5));
        $this->assertEquals('Buzz', $this->fb->convert(20));
    }

    public function test_returns_fizzbuzz_for_multiples_of_15(): void
    {
        $this->assertEquals('FizzBuzz', $this->fb->convert(15));
        $this->assertEquals('FizzBuzz', $this->fb->convert(30));
    }
}

class FizzBuzz
{
    public function convert(int $number): string
    {
        if ($number % 15 === 0) return 'FizzBuzz';
        if ($number % 3 === 0)  return 'Fizz';
        if ($number % 5 === 0)  return 'Buzz';
        return (string) $number;
    }
}
```

#### Kata ২: Roman Numerals (JavaScript)

```javascript
describe("RomanNumerals", () => {
  const converter = new RomanNumeralConverter();

  // TDD সাইকেল ১: সহজ সংখ্যা
  test.each([
    [1, "I"],
    [2, "II"],
    [3, "III"],
  ])("%i → %s", (num, roman) => {
    expect(converter.toRoman(num)).toBe(roman);
  });

  // TDD সাইকেল ২: subtractive notation
  test.each([
    [4, "IV"],
    [9, "IX"],
    [40, "XL"],
    [90, "XC"],
  ])("%i → %s (subtractive)", (num, roman) => {
    expect(converter.toRoman(num)).toBe(roman);
  });

  // TDD সাইকেল ৩: বড় সংখ্যা
  test.each([
    [1994, "MCMXCIV"],
    [2024, "MMXXIV"],
    [3999, "MMMCMXCIX"],
  ])("%i → %s (complex)", (num, roman) => {
    expect(converter.toRoman(num)).toBe(roman);
  });
});

class RomanNumeralConverter {
  #map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  toRoman(num) {
    let result = "";
    for (const [value, numeral] of this.#map) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  }
}
```

#### Kata ৩: Bowling Game (PHP)

```php
class BowlingGameTest extends TestCase
{
    private BowlingGame $game;

    protected function setUp(): void
    {
        $this->game = new BowlingGame();
    }

    private function rollMany(int $rolls, int $pins): void
    {
        for ($i = 0; $i < $rolls; $i++) {
            $this->game->roll($pins);
        }
    }

    public function test_gutter_game_scores_zero(): void
    {
        $this->rollMany(20, 0);
        $this->assertEquals(0, $this->game->score());
    }

    public function test_all_ones_scores_twenty(): void
    {
        $this->rollMany(20, 1);
        $this->assertEquals(20, $this->game->score());
    }

    public function test_spare_adds_next_roll_bonus(): void
    {
        $this->game->roll(5);
        $this->game->roll(5); // spare
        $this->game->roll(3);
        $this->rollMany(17, 0);
        $this->assertEquals(16, $this->game->score());
    }

    public function test_strike_adds_next_two_rolls_bonus(): void
    {
        $this->game->roll(10); // strike
        $this->game->roll(3);
        $this->game->roll(4);
        $this->rollMany(16, 0);
        $this->assertEquals(24, $this->game->score());
    }

    public function test_perfect_game_scores_300(): void
    {
        $this->rollMany(12, 10);
        $this->assertEquals(300, $this->game->score());
    }
}

class BowlingGame
{
    private array $rolls = [];

    public function roll(int $pins): void
    {
        $this->rolls[] = $pins;
    }

    public function score(): int
    {
        $score = 0;
        $rollIndex = 0;

        for ($frame = 0; $frame < 10; $frame++) {
            if ($this->isStrike($rollIndex)) {
                $score += 10 + $this->strikeBonus($rollIndex);
                $rollIndex++;
            } elseif ($this->isSpare($rollIndex)) {
                $score += 10 + $this->spareBonus($rollIndex);
                $rollIndex += 2;
            } else {
                $score += $this->frameScore($rollIndex);
                $rollIndex += 2;
            }
        }

        return $score;
    }

    private function isStrike(int $i): bool
    {
        return ($this->rolls[$i] ?? 0) === 10;
    }

    private function isSpare(int $i): bool
    {
        return (($this->rolls[$i] ?? 0) + ($this->rolls[$i + 1] ?? 0)) === 10;
    }

    private function strikeBonus(int $i): int
    {
        return ($this->rolls[$i + 1] ?? 0) + ($this->rolls[$i + 2] ?? 0);
    }

    private function spareBonus(int $i): int
    {
        return $this->rolls[$i + 2] ?? 0;
    }

    private function frameScore(int $i): int
    {
        return ($this->rolls[$i] ?? 0) + ($this->rolls[$i + 1] ?? 0);
    }
}
```

---
