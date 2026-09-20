# Dummy, Stub, Spy, Mock, and Fake

## 💻 প্রতিটি Test Double — গভীর বিশ্লেষণ

---

### ১. Dummy — শুধু জায়গা পূরণকারী

Dummy object শুধুমাত্র method signature বা constructor-এর parameter পূরণ করতে ব্যবহৃত হয়। এটি কখনোই আসলে ব্যবহৃত হয় না — যদি ব্যবহৃত হয়, তাহলে exception ছুড়বে।

**বাস্তব উদাহরণ:** ধরুন আপনি বিকাশ পেমেন্ট সিস্টেমের `TransactionLogger` টেস্ট করছেন। Logger-এর constructor-এ একটি `Formatter` দরকার, কিন্তু আপনি যে method টেস্ট করছেন সেটি Formatter ব্যবহার করে না।

#### PHP উদাহরণ

```php
<?php

interface NotificationChannel
{
    public function send(string $to, string $message): void;
}

class TransactionService
{
    public function __construct(
        private PaymentGateway $gateway,
        private NotificationChannel $notifier // এই parameter কিছু ক্ষেত্রে ব্যবহৃত হয় না
    ) {}

    public function calculateFee(float $amount): float
    {
        // notifier এখানে ব্যবহৃত হচ্ছে না
        return $amount * 0.015; // ১.৫% ফি
    }
}

class TransactionServiceTest extends \PHPUnit\Framework\TestCase
{
    public function test_fee_calculation_for_bkash_transaction(): void
    {
        // Dummy — শুধু constructor পূরণ করতে
        $dummyNotifier = $this->createMock(NotificationChannel::class);
        $dummyGateway = $this->createMock(PaymentGateway::class);

        $service = new TransactionService($dummyGateway, $dummyNotifier);

        // Dummy কখনো ব্যবহৃত হচ্ছে না — শুধু parameter পূরণ করেছে
        $this->assertEquals(15.0, $service->calculateFee(1000));
    }
}
```

#### JavaScript (Jest) উদাহরণ

```javascript
// dummy হিসেবে একটি empty object বা null-like object পাস করা
class TransactionService {
  constructor(gateway, notifier) {
    this.gateway = gateway;
    this.notifier = notifier;
  }

  calculateFee(amount) {
    return amount * 0.015;
  }
}

describe("TransactionService", () => {
  test("বিকাশ ট্রানজ্যাকশনের ফি সঠিকভাবে গণনা করে", () => {
    const dummyGateway = {}; // কখনো ব্যবহৃত হবে না
    const dummyNotifier = {}; // কখনো ব্যবহৃত হবে না

    const service = new TransactionService(dummyGateway, dummyNotifier);

    expect(service.calculateFee(1000)).toBe(15);
  });
});
```

---

### ২. Stub — পূর্বনির্ধারিত মান ফেরত দেয়

Stub এমন একটি Test Double যেটি **সবসময় পূর্বনির্ধারিত মান ফেরত দেয়**। SUT (System Under Test) কে নির্দিষ্ট indirect input দিতে Stub ব্যবহৃত হয়। এটি verification করে না — শুধু টেস্টকে একটি নির্দিষ্ট পথে পরিচালিত করে।

#### PHP (Mockery) উদাহরণ

```php
<?php

use Mockery;

interface BkashApiClient
{
    public function getBalance(string $accountNumber): float;
    public function getTransactionStatus(string $trxId): string;
}

class BkashPaymentService
{
    public function __construct(private BkashApiClient $client) {}

    public function hasInsufficientBalance(string $account, float $requiredAmount): bool
    {
        $balance = $this->client->getBalance($account);
        return $balance < $requiredAmount;
    }

    public function isTransactionSuccessful(string $trxId): bool
    {
        return $this->client->getTransactionStatus($trxId) === 'COMPLETED';
    }
}

class BkashPaymentServiceTest extends \PHPUnit\Framework\TestCase
{
    use \Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;

    public function test_detects_insufficient_balance(): void
    {
        // Stub — নির্দিষ্ট মান ফেরত দেবে, কিন্তু কতবার কল হলো যাচাই করবে না
        $stub = Mockery::mock(BkashApiClient::class);
        $stub->shouldReceive('getBalance')
             ->with('01712345678')
             ->andReturn(500.00); // সবসময় ৫০০ টাকা ফেরত দেবে

        $service = new BkashPaymentService($stub);

        $this->assertTrue($service->hasInsufficientBalance('01712345678', 1000.00));
        $this->assertFalse($service->hasInsufficientBalance('01712345678', 200.00));
    }

    public function test_transaction_status_check(): void
    {
        $stub = Mockery::mock(BkashApiClient::class);
        $stub->shouldReceive('getTransactionStatus')
             ->andReturn('COMPLETED');

        $service = new BkashPaymentService($stub);

        $this->assertTrue($service->isTransactionSuccessful('TRX123456'));
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
```

#### JavaScript (Jest) উদাহরণ

```javascript
// bkashApi.js
class BkashApiClient {
  async getBalance(accountNumber) {
    /* আসল API কল */
  }
  async getTransactionStatus(trxId) {
    /* আসল API কল */
  }
}

// bkashPaymentService.js
class BkashPaymentService {
  constructor(client) {
    this.client = client;
  }

  async hasInsufficientBalance(account, requiredAmount) {
    const balance = await this.client.getBalance(account);
    return balance < requiredAmount;
  }
}

// bkashPaymentService.test.js
describe("BkashPaymentService", () => {
  test("ব্যালেন্স কম থাকলে সনাক্ত করতে পারে", async () => {
    // jest.fn() দিয়ে Stub তৈরি
    const stubClient = {
      getBalance: jest.fn().mockResolvedValue(500.0),
      getTransactionStatus: jest.fn().mockResolvedValue("COMPLETED"),
    };

    const service = new BkashPaymentService(stubClient);

    await expect(
      service.hasInsufficientBalance("01712345678", 1000),
    ).resolves.toBe(true);
    await expect(
      service.hasInsufficientBalance("01712345678", 200),
    ).resolves.toBe(false);
  });

  test("stub বিভিন্ন কলে ভিন্ন ভিন্ন মান ফেরত দিতে পারে", async () => {
    const stubClient = {
      getBalance: jest
        .fn()
        .mockResolvedValueOnce(500) // প্রথম কলে ৫০০
        .mockResolvedValueOnce(1500) // দ্বিতীয় কলে ১৫০০
        .mockResolvedValue(0), // পরবর্তী সব কলে ০
    };

    const service = new BkashPaymentService(stubClient);

    await expect(service.hasInsufficientBalance("017xxx", 1000)).resolves.toBe(
      true,
    ); // 500 < 1000
    await expect(service.hasInsufficientBalance("017xxx", 1000)).resolves.toBe(
      false,
    ); // 1500 > 1000
    await expect(service.hasInsufficientBalance("017xxx", 1)).resolves.toBe(
      true,
    ); // 0 < 1
  });
});
```

---

### ৩. Spy — interaction রেকর্ড করে, পরে যাচাই করা যায়

Spy মূলত Stub-এর মতোই কাজ করে, কিন্তু অতিরিক্তভাবে **কোন method কতবার, কোন argument দিয়ে কল হলো** তা রেকর্ড করে রাখে। পরে assertion-এ সেই তথ্য যাচাই করা যায়।

**Mock vs Spy-র মূল পার্থক্য:**

- **Mock:** প্রত্যাশা **আগে** সেট করা হয় → টেস্ট ব্যর্থ হলে Mock নিজেই ত্রুটি ছুড়ে দেয়
- **Spy:** আগে কিছু সেট করা হয় না → টেস্ট শেষে **আপনি নিজে** assertion লিখে যাচাই করেন

#### PHP (Mockery Spy) উদাহরণ

```php
<?php

interface SmsGateway
{
    public function send(string $to, string $message): bool;
}

class OtpService
{
    public function __construct(
        private SmsGateway $smsGateway,
        private OtpRepository $repository
    ) {}

    public function sendOtp(string $phoneNumber): string
    {
        $otp = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $this->repository->store($phoneNumber, $otp);
        $this->smsGateway->send($phoneNumber, "আপনার OTP: {$otp}");
        return $otp;
    }
}

class OtpServiceTest extends \PHPUnit\Framework\TestCase
{
    use \Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;

    public function test_otp_sends_sms_to_correct_number(): void
    {
        // Spy — রেকর্ড করবে, পরে আমরা যাচাই করবো
        $smsSpy = Mockery::spy(SmsGateway::class);
        $repoStub = Mockery::mock(OtpRepository::class);
        $repoStub->shouldReceive('store')->andReturn(true);

        $service = new OtpService($smsSpy, $repoStub);
        $otp = $service->sendOtp('01712345678');

        // পরে যাচাই — spy কী রেকর্ড করেছে?
        $smsSpy->shouldHaveReceived('send')
               ->once()
               ->with('01712345678', Mockery::pattern('/আপনার OTP: \d{6}/'));
    }

    public function test_otp_not_sent_if_repository_fails(): void
    {
        $smsSpy = Mockery::spy(SmsGateway::class);
        $repoStub = Mockery::mock(OtpRepository::class);
        $repoStub->shouldReceive('store')->andThrow(new \RuntimeException('DB error'));

        $service = new OtpService($smsSpy, $repoStub);

        try {
            $service->sendOtp('01712345678');
        } catch (\RuntimeException $e) {
            // SMS পাঠানো হয়নি — spy যাচাই
            $smsSpy->shouldNotHaveReceived('send');
        }
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
```

#### JavaScript (Jest spyOn) উদাহরণ

```javascript
// smsGateway.js
class SmsGateway {
  async send(to, message) {
    // আসল SMS API কল (যেমন: BulkSMSBD, Infobip)
  }
}

// otpService.js
class OtpService {
  constructor(smsGateway, repository) {
    this.smsGateway = smsGateway;
    this.repository = repository;
  }

  async sendOtp(phoneNumber) {
    const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    await this.repository.store(phoneNumber, otp);
    await this.smsGateway.send(phoneNumber, `আপনার OTP: ${otp}`);
    return otp;
  }
}

// otpService.test.js
describe("OtpService", () => {
  test("সঠিক নম্বরে SMS পাঠানো হয়", async () => {
    const gateway = new SmsGateway();
    // spyOn — আসল method-এ spy বসানো
    const sendSpy = jest.spyOn(gateway, "send").mockResolvedValue(true);
    const repository = { store: jest.fn().mockResolvedValue(true) };

    const service = new OtpService(gateway, repository);
    const otp = await service.sendOtp("01712345678");

    // পরে যাচাই
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith(
      "01712345678",
      expect.stringContaining("আপনার OTP:"),
    );

    sendSpy.mockRestore(); // spy পরিষ্কার করা
  });

  test("spy দিয়ে কল ক্রম (call order) যাচাই", async () => {
    const callOrder = [];
    const gateway = {
      send: jest.fn().mockImplementation(() => {
        callOrder.push("sms");
        return Promise.resolve(true);
      }),
    };
    const repository = {
      store: jest.fn().mockImplementation(() => {
        callOrder.push("store");
        return Promise.resolve(true);
      }),
    };

    const service = new OtpService(gateway, repository);
    await service.sendOtp("01712345678");

    // store আগে হওয়া উচিত, তারপর sms
    expect(callOrder).toEqual(["store", "sms"]);
  });
});
```

---

### ৪. Mock — পূর্বনির্ধারিত প্রত্যাশা সহ

Mock হলো সবচেয়ে "strict" Test Double। আপনি **টেস্ট চালানোর আগেই** বলে দেন কোন method, কতবার, কোন argument দিয়ে কল হতে হবে। প্রত্যাশা পূরণ না হলে Mock নিজেই টেস্ট ফেল করে।

#### PHP (Mockery) উদাহরণ

```php
<?php

interface PaymentProcessor
{
    public function charge(string $account, float $amount, string $currency): string;
    public function refund(string $transactionId): bool;
}

class OrderService
{
    public function __construct(
        private PaymentProcessor $processor,
        private OrderRepository $orders
    ) {}

    public function placeOrder(string $account, array $items): string
    {
        $total = array_sum(array_column($items, 'price'));
        $trxId = $this->processor->charge($account, $total, 'BDT');
        $this->orders->save(['account' => $account, 'trx_id' => $trxId, 'total' => $total]);
        return $trxId;
    }
}

class OrderServiceTest extends \PHPUnit\Framework\TestCase
{
    use \Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;

    public function test_order_charges_correct_amount_in_bdt(): void
    {
        // Mock — প্রত্যাশা আগেই সেট
        $mockProcessor = Mockery::mock(PaymentProcessor::class);
        $mockProcessor->shouldReceive('charge')
                      ->once()                              // ঠিক একবার কল হবে
                      ->with('01712345678', 350.00, 'BDT')  // এই arguments দিয়ে
                      ->andReturn('TRX_ABC123');             // এই মান ফেরত দেবে

        $mockOrders = Mockery::mock(OrderRepository::class);
        $mockOrders->shouldReceive('save')->once();

        $service = new OrderService($mockProcessor, $mockOrders);
        $items = [
            ['name' => 'চা', 'price' => 50.00],
            ['name' => 'সিঙ্গারা', 'price' => 100.00],
            ['name' => 'বিরিয়ানি', 'price' => 200.00],
        ];

        $trxId = $service->placeOrder('01712345678', $items);

        $this->assertEquals('TRX_ABC123', $trxId);
        // Mockery tearDown-এ স্বয়ংক্রিয়ভাবে প্রত্যাশা যাচাই করবে
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
```

#### JavaScript (Jest Mock) উদাহরণ

```javascript
// jest.mock() দিয়ে সম্পূর্ণ module mock করা
// paymentProcessor.js
export class PaymentProcessor {
  async charge(account, amount, currency) {
    /* API কল */
  }
}

// orderService.test.js
jest.mock("./paymentProcessor");

describe("OrderService", () => {
  test("সঠিক পরিমাণ BDT-তে চার্জ করে", async () => {
    const mockCharge = jest.fn().mockResolvedValue("TRX_ABC123");
    const mockProcessor = { charge: mockCharge };
    const mockOrders = { save: jest.fn().mockResolvedValue(true) };

    const service = new OrderService(mockProcessor, mockOrders);
    const items = [
      { name: "চা", price: 50 },
      { name: "সিঙ্গারা", price: 100 },
      { name: "বিরিয়ানি", price: 200 },
    ];

    const trxId = await service.placeOrder("01712345678", items);

    expect(trxId).toBe("TRX_ABC123");
    expect(mockCharge).toHaveBeenCalledWith("01712345678", 350, "BDT");
    expect(mockCharge).toHaveBeenCalledTimes(1);
    expect(mockOrders.save).toHaveBeenCalledWith(
      expect.objectContaining({ trx_id: "TRX_ABC123", total: 350 }),
    );
  });
});
```

---

### ৫. Fake — সরলীকৃত কিন্তু কার্যকরী বাস্তবায়ন

Fake হলো production dependency-র একটি **সরলীকৃত কিন্তু কার্যকরী** বাস্তবায়ন। এটি mock/stub-এর মতো hardcoded মান ফেরত দেয় না — বরং সত্যিকারের logic আছে, শুধু সেটি production-ready নয় (যেমন: ডাটাবেসের বদলে in-memory array)।

#### PHP উদাহরণ — InMemoryRepository ও FakeMailer

```php
<?php

interface UserRepository
{
    public function save(User $user): void;
    public function findByPhone(string $phone): ?User;
    public function findAll(): array;
    public function delete(string $id): void;
}

// Fake — পুরোপুরি কার্যকরী, কিন্তু in-memory
class InMemoryUserRepository implements UserRepository
{
    private array $users = [];

    public function save(User $user): void
    {
        $this->users[$user->getId()] = $user;
    }

    public function findByPhone(string $phone): ?User
    {
        foreach ($this->users as $user) {
            if ($user->getPhone() === $phone) {
                return $user;
            }
        }
        return null;
    }

    public function findAll(): array
    {
        return array_values($this->users);
    }

    public function delete(string $id): void
    {
        unset($this->users[$id]);
    }
}

// Fake Mailer — আসলে ইমেইল পাঠায় না, কিন্তু রেকর্ড করে
class FakeMailer implements MailerInterface
{
    private array $sentMails = [];

    public function send(string $to, string $subject, string $body): void
    {
        $this->sentMails[] = compact('to', 'subject', 'body');
    }

    // টেস্ট হেল্পার methods
    public function getSentMails(): array
    {
        return $this->sentMails;
    }

    public function assertSentTo(string $email, string $subject): void
    {
        $found = array_filter($this->sentMails, fn($mail) =>
            $mail['to'] === $email && $mail['subject'] === $subject
        );

        if (empty($found)) {
            throw new \PHPUnit\Framework\AssertionFailedError(
                "Expected mail to {$email} with subject '{$subject}' was not sent."
            );
        }
    }

    public function assertNothingSent(): void
    {
        if (!empty($this->sentMails)) {
            throw new \PHPUnit\Framework\AssertionFailedError(
                count($this->sentMails) . ' mail(s) sent unexpectedly.'
            );
        }
    }
}

// ব্যবহার
class UserRegistrationTest extends \PHPUnit\Framework\TestCase
{
    public function test_registration_stores_user_and_sends_welcome_email(): void
    {
        $repo = new InMemoryUserRepository();
        $mailer = new FakeMailer();
        $service = new UserRegistrationService($repo, $mailer);

        $service->register('রহিম', '01712345678', 'rahim@example.com');

        // State verification — Fake-এর আসল state পরীক্ষা
        $user = $repo->findByPhone('01712345678');
        $this->assertNotNull($user);
        $this->assertEquals('রহিম', $user->getName());

        $mailer->assertSentTo('rahim@example.com', 'স্বাগতম!');
    }
}
```

#### JavaScript উদাহরণ — InMemoryDatabase

```javascript
// Fake InMemory Database
class InMemoryUserRepository {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  async save(userData) {
    const id = String(this.nextId++);
    const user = { id, ...userData, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async findByPhone(phone) {
    return [...this.users.values()].find((u) => u.phone === phone) || null;
  }

  async findAll() {
    return [...this.users.values()];
  }

  async delete(id) {
    return this.users.delete(id);
  }

  // টেস্ট হেল্পার
  count() {
    return this.users.size;
  }

  clear() {
    this.users.clear();
    this.nextId = 1;
  }
}

// Fake bKash API — নিজস্ব logic আছে
class FakeBkashApi {
  constructor() {
    this.accounts = new Map();
    this.transactions = [];
  }

  setBalance(account, balance) {
    this.accounts.set(account, balance);
  }

  async charge(account, amount) {
    const balance = this.accounts.get(account) || 0;
    if (balance < amount) {
      throw new Error("Insufficient balance");
    }
    this.accounts.set(account, balance - amount);
    const trxId = `TRX_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.transactions.push({ trxId, account, amount, type: "charge" });
    return trxId;
  }

  getTransactions() {
    return [...this.transactions];
  }
}

describe("Fake bKash API", () => {
  test("ব্যালেন্স কম থাকলে charge ব্যর্থ হয়", async () => {
    const fakeBkash = new FakeBkashApi();
    fakeBkash.setBalance("01712345678", 500);

    await expect(fakeBkash.charge("01712345678", 1000)).rejects.toThrow(
      "Insufficient balance",
    );
  });

  test("সফল charge-এ ব্যালেন্স কমে যায়", async () => {
    const fakeBkash = new FakeBkashApi();
    fakeBkash.setBalance("01712345678", 1000);

    const trxId = await fakeBkash.charge("01712345678", 300);

    expect(trxId).toMatch(/^TRX_/);
    expect(fakeBkash.getTransactions()).toHaveLength(1);
  });
});
```

---
