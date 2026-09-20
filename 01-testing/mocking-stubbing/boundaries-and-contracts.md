# Mock Boundaries and Contract Confidence

## ৬. File System মকিং
ফাইল সিস্টেম mock করা গুরুত্বপূর্ণ — কারণ আসল ফাইল তৈরি/মুছে ফেলা টেস্টকে flaky করে তোলে।

```php
<?php

// Laravel Storage::fake()
class CsvExportTest extends \Tests\TestCase
{
    public function test_transaction_csv_export(): void
    {
        Storage::fake('local');

        $service = app(TransactionExportService::class);
        $filePath = $service->exportToCsv([
            ['trx_id' => 'TRX_1', 'amount' => 500, 'date' => '2024-06-15'],
            ['trx_id' => 'TRX_2', 'amount' => 1000, 'date' => '2024-06-16'],
        ]);

        Storage::disk('local')->assertExists($filePath);
        $content = Storage::disk('local')->get($filePath);
        $this->assertStringContainsString('TRX_1', $content);
        $this->assertStringContainsString('TRX_2', $content);
    }
}
```

```javascript
// Jest — fs module mock
jest.mock("fs/promises");
const fs = require("fs/promises");

describe("ConfigLoader", () => {
  test("config ফাইল সঠিকভাবে পড়ে", async () => {
    const fakeConfig = JSON.stringify({
      bkash: { appKey: "test_key", appSecret: "test_secret" },
      database: { host: "localhost" },
    });

    fs.readFile.mockResolvedValue(fakeConfig);

    const loader = new ConfigLoader();
    const config = await loader.load("/etc/app/config.json");

    expect(config.bkash.appKey).toBe("test_key");
    expect(fs.readFile).toHaveBeenCalledWith("/etc/app/config.json", "utf-8");
  });

  test("ফাইল না পাওয়া গেলে default config ব্যবহার", async () => {
    fs.readFile.mockRejectedValue(new Error("ENOENT: no such file"));

    const loader = new ConfigLoader();
    const config = await loader.load("/missing/config.json");

    expect(config).toEqual(ConfigLoader.DEFAULT_CONFIG);
  });
});
```

---

### ৭. কখন Mock করবেন না — Over-Mocking Anti-pattern

> **"সবকিছু mock করলে আপনি আসলে mock-ই টেস্ট করছেন, production কোড নয়।"**

#### যেখানে Mock করা উচিত নয়:

```
  ┌─────────────────────────────────────────────────────────┐
  │           ❌ Mock করবেন না এগুলো:                       │
  │                                                         │
  │  ● Value Objects (Money, DateRange, Address)            │
  │  ● Pure functions (কোনো side effect নেই)               │
  │  ● Data structures (Array, List, Map)                   │
  │  ● আপনার নিজের domain logic                            │
  │  ● Entity/Model-এর business rules                      │
  │  ● Simple DTOs/POJOs                                   │
  │                                                         │
  ├─────────────────────────────────────────────────────────┤
  │           ✅ Mock করুন এগুলো:                           │
  │                                                         │
  │  ● External API কল (বিকাশ, নগদ, SMS)                  │
  │  ● Database query (Repository interface দিয়ে)          │
  │  ● File system I/O                                      │
  │  ● Network calls                                       │
  │  ● System clock/time                                    │
  │  ● Random number generation                            │
  │  ● Email/SMS পাঠানো                                     │
  │  ● Third-party library-র side effects                   │
  └─────────────────────────────────────────────────────────┘
```

#### Over-Mocking উদাহরণ — ভুল পদ্ধতি

```php
<?php

// ❌ ভুল — Value Object mock করা অর্থহীন
public function test_wrong_way(): void
{
    $mockMoney = Mockery::mock(Money::class);
    $mockMoney->shouldReceive('getAmount')->andReturn(500);
    $mockMoney->shouldReceive('getCurrency')->andReturn('BDT');
    $mockMoney->shouldReceive('add')->andReturn($mockMoney);

    // এখানে আপনি Money class-ই টেস্ট করছেন না, mock টেস্ট করছেন!
}

// ✅ সঠিক — আসল Value Object ব্যবহার করুন
public function test_right_way(): void
{
    $money = new Money(500, 'BDT');
    $total = $money->add(new Money(200, 'BDT'));

    $this->assertEquals(700, $total->getAmount());
    $this->assertEquals('BDT', $total->getCurrency());
}
```

---

### ৮. Mock vs Real — Test Confidence Spectrum

```
  Low Confidence                                    High Confidence
  (দ্রুত, সস্তা)                                  (ধীর, ব্যয়বহুল)
  ◄──────────────────────────────────────────────────────────────►

  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ সব Mock  │  │ বেশিরভাগ │  │ মিশ্র    │  │ বেশিরভাগ │  │ সব Real  │
  │          │  │ Mock     │  │ (Balanced)│  │ Real     │  │          │
  │ Unit     │  │          │  │          │  │          │  │ E2E      │
  │ Tests    │  │          │  │Integration│  │          │  │ Tests    │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
       │                           │                           │
       ▼                           ▼                           ▼
  দ্রুত ফিডব্যাক              সামঞ্জস্যপূর্ণ            আসল পরিবেশে আত্মবিশ্বাস
  কিন্তু ভুয়া আত্মবিশ্বাস    গতি ও আত্মবিশ্বাস         কিন্তু ধীর ও ভঙ্গুর
```

**আদর্শ Test Pyramid:**

```
            ╱╲
           ╱  ╲         E2E (কম সংখ্যক, সব Real)
          ╱    ╲        আসল বিকাশ sandbox, আসল DB
         ╱──────╲
        ╱        ╲      Integration (মাঝারি সংখ্যক)
       ╱          ╲     কিছু Real, কিছু Fake
      ╱────────────╲
     ╱              ╲   Unit (বেশি সংখ্যক, Mock/Stub)
    ╱                ╲  দ্রুত, বিচ্ছিন্ন
   ╱──────────────────╲
```

---

### ৯. Contract Tests — Mock বাস্তবের সাথে মিলছে কিনা যাচাই

**সবচেয়ে বড় ঝুঁকি:** আপনার mock আসল API-র behavior ঠিকভাবে অনুকরণ করছে না। API বদলে গেলে mock আপডেট না হলে টেস্ট পাস করবে কিন্তু production-এ ভাঙবে।

**Contract Test** নিশ্চিত করে যে আপনার mock এবং আসল implementation **একই interface contract** মেনে চলে।

```php
<?php

// Contract — উভয় implementation-ই এই টেস্টগুলো পাস করবে
abstract class UserRepositoryContractTest extends \PHPUnit\Framework\TestCase
{
    abstract protected function createRepository(): UserRepository;

    public function test_can_save_and_retrieve_user(): void
    {
        $repo = $this->createRepository();
        $user = new User('1', 'রহিম', '01712345678');

        $repo->save($user);

        $found = $repo->findByPhone('01712345678');
        $this->assertNotNull($found);
        $this->assertEquals('রহিম', $found->getName());
    }

    public function test_returns_null_for_missing_user(): void
    {
        $repo = $this->createRepository();

        $found = $repo->findByPhone('01700000000');
        $this->assertNull($found);
    }

    public function test_delete_removes_user(): void
    {
        $repo = $this->createRepository();
        $user = new User('1', 'রহিম', '01712345678');
        $repo->save($user);

        $repo->delete('1');

        $this->assertNull($repo->findByPhone('01712345678'));
    }
}

// InMemory Fake — এই contract পাস করে
class InMemoryUserRepositoryTest extends UserRepositoryContractTest
{
    protected function createRepository(): UserRepository
    {
        return new InMemoryUserRepository();
    }
}

// Eloquent — এই contract-ও পাস করে (integration test হিসেবে)
class EloquentUserRepositoryTest extends UserRepositoryContractTest
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;

    protected function createRepository(): UserRepository
    {
        return new EloquentUserRepository();
    }
}
```

```javascript
// JavaScript — Contract test pattern
function runRepositoryContract(createRepo) {
  describe("Repository Contract", () => {
    let repo;

    beforeEach(async () => {
      repo = await createRepo();
    });

    test("save ও retrieve কাজ করে", async () => {
      await repo.save({ id: "1", name: "রহিম", phone: "01712345678" });
      const found = await repo.findByPhone("01712345678");
      expect(found.name).toBe("রহিম");
    });

    test("নেই এমন user-এ null ফেরত দেয়", async () => {
      const found = await repo.findByPhone("01700000000");
      expect(found).toBeNull();
    });
  });
}

// দুটি ভিন্ন implementation, একই contract
describe("InMemoryUserRepository", () => {
  runRepositoryContract(() => new InMemoryUserRepository());
});

describe("MongoUserRepository", () => {
  runRepositoryContract(async () => {
    const repo = new MongoUserRepository(testDbConnection);
    await repo.clear();
    return repo;
  });
});
```

---
