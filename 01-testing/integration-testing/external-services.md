# External Service Integration Testing

## ৩. External Service Integration — বাহ্যিক সার্ভিস টেস্টিং
বাস্তব প্রজেক্টে আমরা অনেক বাহ্যিক সার্ভিসের সাথে কাজ করি — bKash/Nagad পেমেন্ট, SSL Commerz, SMS গেটওয়ে (BulkSMSBD, Infobip), ইমেইল সার্ভিস ইত্যাদি। এগুলোর ইন্টিগ্রেশন টেস্টে আমরা **HTTP mocking** ব্যবহার করি — কারণ প্রতিটি টেস্টে সত্যিকার API call করা অবাস্তব এবং ব্যয়বহুল।

### Laravel Http::fake() — bKash Payment Integration
```php
<?php

namespace Tests\Feature\Payment;

use Tests\TestCase;
use App\Models\User;
use App\Models\Order;
use App\Services\Payment\BkashPaymentService;
use Illuminate\Support\Facades\Http;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BkashPaymentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function bkash_payment_initiation_works_correctly(): void
    {
        Http::fake([
            // bKash Token API
            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant' => Http::response([
                'id_token'    => 'fake_token_12345',
                'token_type'  => 'Bearer',
                'expires_in'  => 3600,
            ], 200),

            // bKash Create Payment API
            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create' => Http::response([
                'paymentID'        => 'TR001234567890',
                'bkashURL'         => 'https://sandbox.payment.bka.sh/redirect/tokenized/?paymentID=TR001234567890',
                'callbackURL'      => 'https://myapp.com/api/bkash/callback',
                'successCallbackURL'=> 'https://myapp.com/payment/success',
                'statusCode'       => '0000',
                'statusMessage'    => 'Successful',
            ], 200),
        ]);

        $user = User::factory()->create();
        $order = Order::factory()->create([
            'user_id' => $user->id,
            'total'   => 2500.00,
        ]);

        $bkashService = app(BkashPaymentService::class);
        $result = $bkashService->initiatePayment($order);

        $this->assertEquals('TR001234567890', $result['paymentID']);
        $this->assertStringContains('sandbox.payment.bka.sh', $result['bkashURL']);

        // সঠিক API কল হয়েছে কিনা যাচাই
        Http::assertSent(function ($request) use ($order) {
            return $request->url() === 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create'
                && $request['amount'] === '2500.00'
                && $request['currency'] === 'BDT'
                && $request['intent'] === 'sale';
        });

        // Order স্ট্যাটাস আপডেট হয়েছে
        $order->refresh();
        $this->assertEquals('payment_initiated', $order->payment_status);
        $this->assertEquals('TR001234567890', $order->payment_id);
    }

    /** @test */
    public function bkash_payment_callback_processes_successfully(): void
    {
        Http::fake([
            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant' => Http::response([
                'id_token' => 'fake_token',
            ], 200),

            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute' => Http::response([
                'paymentID'      => 'TR001234567890',
                'trxID'          => 'TRX9876543210',
                'transactionStatus' => 'Completed',
                'amount'         => '2500.00',
                'currency'       => 'BDT',
                'statusCode'     => '0000',
                'statusMessage'  => 'Successful',
            ], 200),
        ]);

        $user = User::factory()->create();
        $order = Order::factory()->create([
            'user_id'        => $user->id,
            'total'          => 2500.00,
            'payment_status' => 'payment_initiated',
            'payment_id'     => 'TR001234567890',
        ]);

        $response = $this->postJson('/api/bkash/callback', [
            'paymentID' => 'TR001234567890',
            'status'    => 'success',
        ]);

        $response->assertStatus(200);

        $order->refresh();
        $this->assertEquals('paid', $order->payment_status);
        $this->assertEquals('TRX9876543210', $order->transaction_id);
    }

    /** @test */
    public function handles_bkash_api_failure_gracefully(): void
    {
        Http::fake([
            'tokenized.sandbox.bka.sh/*' => Http::response([
                'statusCode'    => '2001',
                'statusMessage' => 'Invalid App Key',
            ], 401),
        ]);

        $user = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $user->id, 'total' => 1000]);

        $bkashService = app(BkashPaymentService::class);

        $this->expectException(\App\Exceptions\PaymentGatewayException::class);
        $bkashService->initiatePayment($order);

        // Order স্ট্যাটাস payment_failed হবে
        $order->refresh();
        $this->assertEquals('payment_failed', $order->payment_status);
    }

    /** @test */
    public function handles_bkash_timeout_with_retry(): void
    {
        Http::fake([
            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant' => Http::response([
                'id_token' => 'fake_token',
            ], 200),

            'tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create' => Http::sequence()
                ->push(null, 500)           // প্রথম চেষ্টা: সার্ভার error
                ->push(null, 500)           // দ্বিতীয় চেষ্টা: সার্ভার error
                ->push([                    // তৃতীয় চেষ্টা: সফল
                    'paymentID'  => 'TR0099',
                    'statusCode' => '0000',
                    'bkashURL'   => 'https://sandbox.payment.bka.sh/redirect/tokenized/?paymentID=TR0099',
                ], 200),
        ]);

        $order = Order::factory()->create(['total' => 500]);
        $bkashService = app(BkashPaymentService::class);
        $result = $bkashService->initiatePayment($order);

        $this->assertEquals('TR0099', $result['paymentID']);

        // মোট ৩ বার API কল হয়েছে (২ বার retry + ১ বার সফল)
        Http::assertSentCount(4); // 1 token + 3 create attempts
    }
}
```

#### Nock (Node.js) — SMS Gateway Integration

```javascript
// tests/integration/sms-gateway.test.js
const nock = require("nock");
const SmsService = require("../../src/services/SmsService");
const { User, SmsLog } = require("../../src/models");

describe("SMS Gateway Integration", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should send OTP via BulkSMSBD gateway", async () => {
    const smsApi = nock("https://bulksmsbd.net")
      .post("/api/smsapi", (body) => {
        // রিকোয়েস্ট বডি সঠিক কিনা যাচাই
        expect(body.number).toBe("01712345678");
        expect(body.message).toContain("Your OTP is");
        expect(body.message).toMatch(/\d{6}/); // ৬ ডিজিট OTP আছে
        return true;
      })
      .reply(200, {
        response_code: 202,
        success_message: "SMS sent successfully",
        message_id: "MSG12345",
      });

    const smsService = new SmsService();
    const result = await smsService.sendOtp("+8801712345678");

    expect(result.success).toBe(true);
    expect(result.messageId).toBe("MSG12345");
    expect(smsApi.isDone()).toBe(true);

    // SMS Log ডাটাবেসে সেভ হয়েছে
    const log = await SmsLog.findOne({
      where: { phone: "+8801712345678", type: "otp" },
    });
    expect(log).not.toBeNull();
    expect(log.status).toBe("sent");
  });

  it("should handle SMS gateway downtime", async () => {
    nock("https://bulksmsbd.net")
      .post("/api/smsapi")
      .replyWithError("ECONNREFUSED");

    const smsService = new SmsService();
    const result = await smsService.sendOtp("+8801712345678");

    expect(result.success).toBe(false);
    expect(result.error).toBe("gateway_unavailable");

    // ব্যর্থ SMS log-ও সেভ হয়েছে
    const log = await SmsLog.findOne({
      where: { phone: "+8801712345678" },
    });
    expect(log.status).toBe("failed");
    expect(log.failureReason).toBe("gateway_unavailable");
  });

  it("should respect rate limiting per phone number", async () => {
    // ৫ মিনিটে সর্বোচ্চ ৩ বার OTP পাঠানো যাবে
    const smsApi = nock("https://bulksmsbd.net")
      .post("/api/smsapi")
      .times(3)
      .reply(200, { response_code: 202, success_message: "Sent" });

    const smsService = new SmsService();

    await smsService.sendOtp("+8801712345678");
    await smsService.sendOtp("+8801712345678");
    await smsService.sendOtp("+8801712345678");

    // ৪র্থ বার চেষ্টা করলে rate limit error আসবে
    await expect(smsService.sendOtp("+8801712345678")).rejects.toThrow(
      "OTP rate limit exceeded. Try again in 5 minutes.",
    );
  });
});
```

---
