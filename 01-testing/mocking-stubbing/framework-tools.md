# Mocking Tools for PHP and JavaScript

## 🔧 টুলস — বিস্তারিত ব্যবহার

---

### PHPUnit Built-in Mocking

PHPUnit-এর নিজস্ব mocking ফ্রেমওয়ার্ক বেশ শক্তিশালী। `createMock()` দিয়ে কোনো interface বা class-এর mock তৈরি করা যায়।

```php
<?php

class PHPUnitMockingExamplesTest extends \PHPUnit\Framework\TestCase
{
    // ১. createMock() — সবচেয়ে সাধারণ ব্যবহার
    public function test_basic_mock(): void
    {
        $mock = $this->createMock(BkashApiClient::class);

        $mock->method('getBalance')
             ->willReturn(5000.00);

        $this->assertEquals(5000.00, $mock->getBalance('01712345678'));
    }

    // ২. expects() দিয়ে কতবার কল হবে তা নির্ধারণ
    public function test_expects_invocation_count(): void
    {
        $mock = $this->createMock(SmsGateway::class);

        $mock->expects($this->once())      // ঠিক একবার
             ->method('send')
             ->with('01712345678', $this->stringContains('OTP'))
             ->willReturn(true);

        // $this->exactly(3)   — ঠিক ৩ বার
        // $this->atLeast(2)   — কমপক্ষে ২ বার
        // $this->atMost(5)    — সর্বোচ্চ ৫ বার
        // $this->never()      — কখনোই না
        // $this->any()        — যেকোনো সংখ্যকবার

        $mock->send('01712345678', 'আপনার OTP: 123456');
    }

    // ৩. with() — argument matching
    public function test_argument_constraints(): void
    {
        $mock = $this->createMock(PaymentProcessor::class);

        $mock->expects($this->once())
             ->method('charge')
             ->with(
                 $this->equalTo('01712345678'),                    // সঠিক মান
                 $this->greaterThan(0),                            // ০-এর বেশি
                 $this->logicalOr($this->equalTo('BDT'), $this->equalTo('USD'))
             )
             ->willReturn('TRX_123');

        $result = $mock->charge('01712345678', 500, 'BDT');
        $this->assertEquals('TRX_123', $result);
    }

    // ৪. willReturnCallback() — ডায়নামিক রিটার্ন
    public function test_dynamic_return(): void
    {
        $mock = $this->createMock(BkashApiClient::class);

        $mock->method('getBalance')
             ->willReturnCallback(function (string $account) {
                 return match ($account) {
                     '01712345678' => 5000.00,
                     '01812345678' => 12000.00,
                     default => 0.00,
                 };
             });

        $this->assertEquals(5000.00, $mock->getBalance('01712345678'));
        $this->assertEquals(12000.00, $mock->getBalance('01812345678'));
        $this->assertEquals(0.00, $mock->getBalance('01900000000'));
    }

    // ৫. willThrowException() — exception সিমুলেশন
    public function test_exception_simulation(): void
    {
        $mock = $this->createMock(BkashApiClient::class);

        $mock->method('getBalance')
             ->willThrowException(new \RuntimeException('API timeout'));

        $this->expectException(\RuntimeException::class);
        $mock->getBalance('01712345678');
    }

    // ৬. consecutive calls — পর পর ভিন্ন মান
    public function test_consecutive_returns(): void
    {
        $mock = $this->createMock(BkashApiClient::class);

        $mock->method('getTransactionStatus')
             ->willReturnOnConsecutiveCalls('PENDING', 'PENDING', 'COMPLETED');

        $this->assertEquals('PENDING', $mock->getTransactionStatus('TRX1'));
        $this->assertEquals('PENDING', $mock->getTransactionStatus('TRX1'));
        $this->assertEquals('COMPLETED', $mock->getTransactionStatus('TRX1'));
    }
}
```

---

### Mockery (PHP) — বিস্তারিত

Mockery, PHPUnit-এর মকিং-এর চেয়ে আরো fluent এবং expressive API দেয়।

```php
<?php

use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;

class MockeryAdvancedTest extends \PHPUnit\Framework\TestCase
{
    use MockeryPHPUnitIntegration;

    // ১. shouldReceive + andReturn
    public function test_basic_mockery(): void
    {
        $mock = Mockery::mock(BkashApiClient::class);
        $mock->shouldReceive('getBalance')->andReturn(5000.00);

        $this->assertEquals(5000.00, $mock->getBalance('any'));
    }

    // ২. Ordered expectations — নির্দিষ্ট ক্রমে কল হতে হবে
    public function test_ordered_calls(): void
    {
        $mock = Mockery::mock(PaymentProcessor::class);
        $mock->shouldReceive('charge')->once()->ordered();
        $mock->shouldReceive('refund')->never()->ordered();

        $mock->charge('01712345678', 500, 'BDT');
    }

    // ৩. Argument matching — Mockery matchers
    public function test_argument_matchers(): void
    {
        $mock = Mockery::mock(SmsGateway::class);
        $mock->shouldReceive('send')
             ->with(
                 Mockery::pattern('/^017\d{8}$/'),  // regex প্যাটার্ন
                 Mockery::type('string')             // যেকোনো string
             )
             ->andReturn(true);

        $this->assertTrue($mock->send('01712345678', 'Hello'));
    }

    // ৪. Spy — Mockery spy() ব্যবহার
    public function test_mockery_spy(): void
    {
        $spy = Mockery::spy(SmsGateway::class);

        // কোনো expectation সেট না করে আগে কল করি
        $spy->send('01712345678', 'Test');
        $spy->send('01812345678', 'Test 2');

        // পরে যাচাই
        $spy->shouldHaveReceived('send')->twice();
        $spy->shouldHaveReceived('send')->with('01712345678', 'Test');
    }

    // ৫. andReturnUsing — ডায়নামিক closure
    public function test_dynamic_return_with_closure(): void
    {
        $mock = Mockery::mock(BkashApiClient::class);
        $mock->shouldReceive('getBalance')
             ->andReturnUsing(fn(string $acc) => strlen($acc) === 11 ? 5000.0 : 0.0);

        $this->assertEquals(5000.0, $mock->getBalance('01712345678'));
        $this->assertEquals(0.0, $mock->getBalance('invalid'));
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
```

---

### Jest Mocking — বিস্তারিত

Jest-এর mocking ক্ষমতা অত্যন্ত শক্তিশালী এবং বিভিন্ন স্তরে কাজ করে।

```javascript
// ═══════════════════════════════════════════════
// ১. jest.fn() — standalone mock function
// ═══════════════════════════════════════════════

test("jest.fn() দিয়ে mock function তৈরি", () => {
  const mockFn = jest.fn();

  mockFn("arg1", "arg2");
  mockFn("arg3");

  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenNthCalledWith(1, "arg1", "arg2");
  expect(mockFn.mock.calls).toEqual([["arg1", "arg2"], ["arg3"]]);
});

test("mockImplementation দিয়ে custom logic", () => {
  const calculateFee = jest.fn().mockImplementation((amount) => {
    if (amount > 25000) return amount * 0.02; // ২% (বড় amount)
    return amount * 0.015; // ১.৫% (ছোট amount)
  });

  expect(calculateFee(1000)).toBe(15);
  expect(calculateFee(50000)).toBe(1000);
});

// ═══════════════════════════════════════════════
// ২. jest.mock() — সম্পূর্ণ module mock
// ═══════════════════════════════════════════════

// __mocks__/bkashApi.js (manual mock)
const bkashApi = {
  getBalance: jest.fn().mockResolvedValue(5000),
  charge: jest.fn().mockResolvedValue("TRX_MOCK_123"),
};
module.exports = bkashApi;

// bkashService.test.js
jest.mock("./bkashApi"); // __mocks__/bkashApi.js ব্যবহার করবে
const bkashApi = require("./bkashApi");

test("module mock ব্যবহার", async () => {
  const balance = await bkashApi.getBalance("01712345678");
  expect(balance).toBe(5000);
});

// ═══════════════════════════════════════════════
// ৩. jest.spyOn() — existing method-এ spy বসানো
// ═══════════════════════════════════════════════

test("spyOn দিয়ে Date.now mock করা", () => {
  const fixedTime = new Date("2024-01-15T10:00:00Z").getTime();
  const spy = jest.spyOn(Date, "now").mockReturnValue(fixedTime);

  expect(Date.now()).toBe(fixedTime);

  spy.mockRestore(); // আসল method ফিরিয়ে আনা
});

// ═══════════════════════════════════════════════
// ৪. mockResolvedValue / mockRejectedValue — async mock
// ═══════════════════════════════════════════════

test("async mock — সফল ও ব্যর্থ উভয় ক্ষেত্র", async () => {
  const fetchUser = jest
    .fn()
    .mockResolvedValueOnce({ id: 1, name: "রহিম" }) // প্রথম কল: সফল
    .mockRejectedValueOnce(new Error("Not found")); // দ্বিতীয় কল: ব্যর্থ

  const user = await fetchUser("01712345678");
  expect(user.name).toBe("রহিম");

  await expect(fetchUser("invalid")).rejects.toThrow("Not found");
});

// ═══════════════════════════════════════════════
// ৫. mock.calls ও mock.results — বিস্তারিত তথ্য
// ═══════════════════════════════════════════════

test("mock-এর বিস্তারিত তথ্য পরীক্ষা", () => {
  const mockFn = jest.fn((x) => x * 2);

  mockFn(5);
  mockFn(10);

  // কতবার কোন arguments দিয়ে কল হয়েছে
  expect(mockFn.mock.calls).toEqual([[5], [10]]);

  // প্রতিটি কলের return value
  expect(mockFn.mock.results).toEqual([
    { type: "return", value: 10 },
    { type: "return", value: 20 },
  ]);
});
```

---

### Laravel Test Helpers — Fake Facades

Laravel-এর Facade system মকিংকে অত্যন্ত সহজ করে। `::fake()` কল করলে আসল implementation-এর বদলে একটি fake ব্যবহৃত হয়।

```php
<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;

class LaravelFakeHelpersTest extends \Tests\TestCase
{
    // ═══════════════════════════════════════════════
    // Http::fake() — বিকাশ API কল সিমুলেশন
    // ═══════════════════════════════════════════════
    public function test_bkash_api_integration(): void
    {
        Http::fake([
            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant' => Http::response([
                'id_token' => 'fake_token_123',
                'token_type' => 'Bearer',
            ], 200),

            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/create' => Http::response([
                'paymentID' => 'PAY_123',
                'bkashURL' => 'https://sandbox.payment.bkash.com?paymentId=PAY_123',
            ], 200),

            '*' => Http::response('Not Found', 404),
        ]);

        $service = app(BkashPaymentService::class);
        $result = $service->createPayment(500.00, '01712345678');

        $this->assertEquals('PAY_123', $result['paymentID']);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), 'payment/create')
                && $request['amount'] === '500.00';
        });

        Http::assertSentCount(2);
    }

    // ═══════════════════════════════════════════════
    // Queue::fake() — job dispatch যাচাই
    // ═══════════════════════════════════════════════
    public function test_order_dispatches_payment_processing_job(): void
    {
        Queue::fake();

        $orderService = app(OrderService::class);
        $orderService->placeOrder([
            'user_id' => 1,
            'amount' => 500,
        ]);

        Queue::assertPushed(ProcessPaymentJob::class, function ($job) {
            return $job->amount === 500;
        });

        Queue::assertPushedOn('payments', ProcessPaymentJob::class);
        Queue::assertNotPushed(SendReceiptJob::class);
    }

    // ═══════════════════════════════════════════════
    // Mail::fake() — ইমেইল পাঠানো যাচাই
    // ═══════════════════════════════════════════════
    public function test_registration_sends_welcome_email(): void
    {
        Mail::fake();

        $service = app(UserRegistrationService::class);
        $service->register([
            'name' => 'করিম',
            'email' => 'karim@example.com',
        ]);

        Mail::assertSent(WelcomeMail::class, function ($mail) {
            return $mail->hasTo('karim@example.com');
        });
        Mail::assertSent(WelcomeMail::class, 1); // ঠিক ১টি
    }

    // ═══════════════════════════════════════════════
    // Event::fake() — event dispatch যাচাই
    // ═══════════════════════════════════════════════
    public function test_order_fires_events(): void
    {
        Event::fake([OrderPlaced::class, PaymentProcessed::class]);

        $service = app(OrderService::class);
        $service->placeOrder(/* ... */);

        Event::assertDispatched(OrderPlaced::class);
        Event::assertNotDispatched(PaymentProcessed::class);
    }

    // ═══════════════════════════════════════════════
    // Storage::fake() — ফাইল সিস্টেম সিমুলেশন
    // ═══════════════════════════════════════════════
    public function test_user_avatar_upload(): void
    {
        Storage::fake('public');

        $file = \Illuminate\Http\UploadedFile::fake()->image('avatar.jpg', 200, 200);

        $response = $this->postJson('/api/users/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(200);
        Storage::disk('public')->assertExists('avatars/' . $file->hashName());
    }

    // ═══════════════════════════════════════════════
    // Notification::fake() — notification যাচাই
    // ═══════════════════════════════════════════════
    public function test_otp_notification_sent(): void
    {
        Notification::fake();

        $user = User::factory()->create(['phone' => '01712345678']);
        $service = app(OtpService::class);
        $service->sendOtp($user);

        Notification::assertSentTo($user, OtpNotification::class, function ($notification) {
            return strlen($notification->otp) === 6;
        });
    }
}
```

---
