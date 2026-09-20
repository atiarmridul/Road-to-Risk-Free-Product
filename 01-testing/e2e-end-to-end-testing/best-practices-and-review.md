# E2E Best Practices and Review

## ✅ Best Practices — সেরা অনুশীলন

### ১. data-testid ব্যবহার করুন

```html
<!-- ❌ ভঙ্গুর সিলেক্টর -->
<button class="btn btn-primary mt-3">সাবমিট</button>

<!-- ✅ স্থিতিশীল সিলেক্টর -->
<button data-testid="submit-btn" class="btn btn-primary mt-3">সাবমিট</button>
```

```javascript
// ❌ এড়িয়ে চলুন
cy.get(".btn.btn-primary.mt-3").click();
cy.get("div > form > button:nth-child(3)").click();

// ✅ সুপারিশকৃত
cy.getByTestId("submit-btn").click();
// অথবা Playwright-এ
page.getByTestId("submit-btn").click();
page.getByRole("button", { name: "সাবমিট" }).click();
```

### ২. Page Object Model (POM) ব্যবহার করুন

```javascript
// Playwright — Page Object
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByLabel("নাম");
    this.phoneInput = page.getByLabel("ফোন");
    this.addressInput = page.getByLabel("ঠিকানা");
    this.nextButton = page.getByRole("button", { name: "পরবর্তী" });
    this.bkashOption = page.getByTestId("bkash-option");
    this.payButton = page.getByRole("button", { name: "পেমেন্ট করুন" });
  }

  async fillShipping(data) {
    await this.nameInput.fill(data.name);
    await this.phoneInput.fill(data.phone);
    await this.addressInput.fill(data.address);
    await this.nextButton.click();
  }

  async payWithBkash(number) {
    await this.bkashOption.click();
    await this.page.getByPlaceholder("বিকাশ নম্বর").fill(number);
    await this.payButton.click();
  }
}

// ব্যবহার
test("চেকআউট ফ্লো", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await page.goto("/checkout");

  await checkout.fillShipping({
    name: "রাফি আহমেদ",
    phone: "01712345678",
    address: "গুলশান, ঢাকা",
  });

  await checkout.payWithBkash("01712345678");
  await expect(page.getByText("অর্ডার সফল")).toBeVisible();
});
```

### ৩. গুরুত্বপূর্ণ ব্যবসায়িক ফ্লো-তে ফোকাস

```
✅ টেস্ট করুন:
├── রেজিস্ট্রেশন → লগইন → প্রোফাইল আপডেট
├── পণ্য খুঁজুন → কার্টে যোগ → চেকআউট → পেমেন্ট (বিকাশ/নগদ)
├── অ্যাডমিন → পণ্য যোগ → অর্ডার প্রসেস → ডেলিভারি
└── পাসওয়ার্ড রিসেট ফ্লো

❌ E2E তে টেস্ট করবেন না:
├── প্রতিটি ফর্ম ভ্যালিডেশন মেসেজ (ইউনিট টেস্টে করুন)
├── CSS স্টাইলিং বিস্তারিত
├── প্রতিটি API error code (ইন্টিগ্রেশন টেস্টে করুন)
└── তৃতীয় পক্ষের সার্ভিসের বিস্তারিত behavior
```

### ৪. API দিয়ে state সেটআপ করুন (UI নয়)

```javascript
// ❌ ধীর — UI দিয়ে লগইন
cy.visit("/login");
cy.get("#email").type("admin@test.com");
cy.get("#password").type("password");
cy.get("#login-btn").click();
cy.url().should("include", "/dashboard");

// ✅ দ্রুত — API দিয়ে লগইন
cy.login("admin@test.com", "password"); // session/token সরাসরি সেট করে
cy.visit("/dashboard"); // সরাসরি dashboard-এ যান
```

### ৫. টেস্ট পরস্পর স্বাধীন রাখুন

```javascript
// ❌ টেস্ট নির্ভরশীল
it("প্রোডাক্ট তৈরি করে", () => {
  /* ... */
});
it("তৈরি করা প্রোডাক্ট দেখে", () => {
  /* আগের টেস্ট দরকার */
});

// ✅ প্রতিটি টেস্ট স্বাধীন
it("প্রোডাক্ট দেখতে পারবে", () => {
  cy.request("POST", "/api/test/products", { name: "Test Product" });
  cy.visit("/products");
  cy.contains("Test Product");
});
```

---

## ⚠️ Anti-patterns — যা এড়িয়ে চলবেন

### ১. হার্ড-কোডেড sleep/wait

```javascript
// ❌ কখনো করবেন না
cy.wait(5000);
await page.waitForTimeout(3000);
sleep(5);

// ✅ শর্তসাপেক্ষ অপেক্ষা
cy.get(".data", { timeout: 10000 }).should("be.visible");
await expect(page.locator(".data")).toBeVisible({ timeout: 10000 });
```

### ২. UI দিয়ে বারবার প্রি-কন্ডিশন সেটআপ

```javascript
// ❌ প্রতি টেস্টে UI দিয়ে লগইন + navigate
beforeEach(() => {
  cy.visit("/login");
  cy.get("#email").type("admin@test.com");
  cy.get("#password").type("Pass123!");
  cy.get("#login-btn").click();
  cy.visit("/admin");
  cy.get(".sidebar").contains("Products").click();
});

// ✅ API/session দিয়ে সরাসরি
beforeEach(() => {
  cy.login("admin@test.com", "Pass123!");
  cy.visit("/admin/products");
});
```

### ৩. ভঙ্গুর CSS সিলেক্টর

```javascript
// ❌ সিএসএস ক্লাস পরিবর্তন হলে ভেঙে যাবে
cy.get("body > div:nth-child(2) > main > div.flex > button.bg-blue-500");

// ✅ অর্থপূর্ণ সিলেক্টর
cy.getByTestId("checkout-btn");
cy.contains("button", "চেকআউট");
```

### ৪. সব কিছু E2E তে টেস্ট করা

```
❌ Anti-pattern: ৫০০+ E2E টেস্ট, ২ ঘণ্টা চলে
   - ছোট পরিবর্তনেও পুরো suite চালাতে হয়
   - Flaky টেস্ট বেশি হয়
   - ডেভেলপাররা টেস্ট ইগনোর করা শুরু করে

✅ সঠিক পদ্ধতি:
   - ২০-৫০টি critical path E2E টেস্ট
   - বাকিগুলো unit/integration-এ
   - E2E suite ১৫-২০ মিনিটে শেষ হওয়া উচিত
```

### ৫. টেস্টে ব্যবসায়িক লজিক

```javascript
// ❌ টেস্টে দাম গণনা করা
cy.get(".price").then(($price) => {
  const price = parseFloat($price.text());
  const tax = price * 0.15;
  const shipping = price > 1000 ? 0 : 60;
  const total = price + tax + shipping;
  cy.get(".total").should("contain", total);
});

// ✅ শুধু ফলাফল যাচাই করা
cy.get(".total").should("not.be.empty");
cy.get(".total")
  .invoke("text")
  .should("match", /৳[\d,]+/);
```

---

## 📋 তুলনা সারণী: Cypress vs Playwright vs Laravel Dusk

| বৈশিষ্ট্য                  | Cypress                  | Playwright                     | Laravel Dusk          |
| -------------------------- | ------------------------ | ------------------------------ | --------------------- |
| **ভাষা**                   | JavaScript/TypeScript    | JS/TS/Python/Java/C#           | PHP                   |
| **ব্রাউজার সাপোর্ট**       | Chrome, Edge, Firefox    | Chromium, Firefox, WebKit      | Chrome (ChromeDriver) |
| **মোবাইল টেস্টিং**         | ভিউপোর্ট রিসাইজ          | ডিভাইস ইমুলেশন (সেরা)          | সীমিত                 |
| **Auto-waiting**           | আছে (implicit)           | আছে (সেরা)                     | আছে (waitFor\*)       |
| **প্যারালেল**              | Cypress Cloud / plugin   | Built-in (fullyParallel)       | paratest plugin       |
| **API Mocking**            | cy.intercept (শক্তিশালী) | page.route (শক্তিশালী)         | সীমিত                 |
| **ডিবাগিং**                | Time Travel UI           | Trace Viewer (সেরা)            | Screenshots/Logs      |
| **CI ইন্টিগ্রেশন**         | সহজ (Docker image)       | সহজ                            | সহজ                   |
| **শেখার বক্ররেখা**         | সবচেয়ে সহজ              | মাঝারি                         | সহজ (Laravel জানলে)   |
| **মাল্টি-ট্যাব**           | ❌ সাপোর্ট নেই           | ✅ পূর্ণ সাপোর্ট               | ❌ সীমিত              |
| **iFrame সাপোর্ট**         | সীমিত                    | ✅ পূর্ণ সাপোর্ট               | সীমিত                 |
| **নেটওয়ার্ক ইন্টারসেপ্ট** | ✅ চমৎকার                | ✅ চমৎকার                      | ❌ নেই                |
| **ভিজ্যুয়াল টেস্ট**       | Percy (তৃতীয় পক্ষ)      | Built-in screenshot comparison | screenshot()          |
| **কমিউনিটি**               | বিশাল                    | দ্রুত বর্ধনশীল                 | Laravel কমিউনিটি      |
| **বিনামূল্যে**             | ✅ (Cloud পেইড)          | ✅ সম্পূর্ণ বিনামূল্যে         | ✅                    |

### কখন কোনটি বেছে নেবেন?

```
┌─────────────────────────────────────────────────────────────┐
│ Cypress বেছে নিন যদি:                                       │
│  • দল JavaScript/React/Vue/Angular ব্যবহার করে              │
│  • শুধু Chrome/Edge-এ টেস্ট যথেষ্ট                          │
│  • সহজ শেখা ও চমৎকার DX চান                                │
│  • রিয়েল-টাইম ডিবাগিং GUI দরকার                            │
├─────────────────────────────────────────────────────────────┤
│ Playwright বেছে নিন যদি:                                    │
│  • ক্রস-ব্রাউজার টেস্টিং জরুরি (Chrome + Firefox + Safari) │
│  • মাল্টি-ট্যাব, মাল্টি-ইউজার টেস্ট দরকার                  │
│  • মোবাইল ইমুলেশন দরকার                                    │
│  • সর্বোচ্চ পারফরম্যান্স ও নির্ভরযোগ্যতা চান               │
│  • Python/Java/C# দলের জন্যও দরকার                         │
├─────────────────────────────────────────────────────────────┤
│ Laravel Dusk বেছে নিন যদি:                                  │
│  • Laravel অ্যাপ্লিকেশন টেস্ট করতে চান                      │
│  • PHP ইকোসিস্টেমে থাকতে চান                               │
│  • Eloquent/Factory দিয়ে ডেটা সেটআপ করতে চান               │
│  • Laravel-এর authentication system ব্যবহার করতে চান        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🇧🇩 বাংলাদেশ প্রসঙ্গ

### বিকাশ চেকআউট ফ্লো টেস্টিং

```javascript
// Cypress — বিকাশ পেমেন্ট গেটওয়ে E2E টেস্ট
describe("বিকাশ পেমেন্ট ইন্টিগ্রেশন", () => {
  beforeEach(() => {
    cy.login("customer@test.com", "Pass123!");
    // কার্টে পণ্য আছে এমন অবস্থায় শুরু
    cy.request("POST", "/api/test/add-to-cart", { productId: 1, qty: 1 });
  });

  it("বিকাশ দিয়ে সফলভাবে পেমেন্ট করতে পারবে", () => {
    // বিকাশ API mock
    cy.intercept("POST", "**/checkout/bkash/token", {
      statusCode: 200,
      body: {
        id_token: "test_token_123",
        token_type: "Bearer",
      },
    }).as("bkashToken");

    cy.intercept("POST", "**/checkout/bkash/create", {
      statusCode: 200,
      body: {
        paymentID: "PAY123456",
        bkashURL: "https://sandbox.payment.bkash.com/?paymentId=PAY123456",
        amount: "2500",
        merchantInvoiceNumber: "INV-2024-001",
      },
    }).as("bkashCreate");

    cy.intercept("POST", "**/checkout/bkash/execute", {
      statusCode: 200,
      body: {
        paymentID: "PAY123456",
        trxID: "TRX9A8B7C6D",
        transactionStatus: "Completed",
        amount: "2500",
        currency: "BDT",
        customerMsisdn: "01712345678",
      },
    }).as("bkashExecute");

    cy.visit("/checkout");

    // বিকাশ নির্বাচন
    cy.getByTestId("payment-bkash").click();
    cy.get("#bkash-wallet").type("01712345678");
    cy.getByTestId("bkash-pay-btn").click();

    cy.wait("@bkashToken");
    cy.wait("@bkashCreate");

    // OTP পেজ (mock)
    cy.get("#bkash-otp").type("123456");
    cy.get("#bkash-confirm").click();

    cy.wait("@bkashExecute");

    // সফল পেমেন্ট যাচাই
    cy.url().should("include", "/order/success");
    cy.contains("পেমেন্ট সফল হয়েছে");
    cy.getByTestId("trx-id").should("contain", "TRX9A8B7C6D");
    cy.getByTestId("amount").should("contain", "৳2,500");
  });

  it("বিকাশ ব্যালেন্স অপর্যাপ্ত হলে ত্রুটি দেখাবে", () => {
    cy.intercept("POST", "**/checkout/bkash/execute", {
      statusCode: 200,
      body: {
        statusCode: "2023",
        statusMessage: "Insufficient Balance",
      },
    }).as("bkashFail");

    cy.visit("/checkout");
    cy.getByTestId("payment-bkash").click();
    cy.get("#bkash-wallet").type("01712345678");
    cy.getByTestId("bkash-pay-btn").click();

    cy.wait("@bkashFail");
    cy.get(".payment-error")
      .should("be.visible")
      .and(
        "contain",
        "অপর্যাপ্ত ব্যালেন্স। অনুগ্রহ করে বিকাশ অ্যাকাউন্টে টাকা যোগ করুন।",
      );
  });

  it("বিকাশ টাইমআউটে সঠিক বার্তা দেখাবে", () => {
    cy.intercept("POST", "**/checkout/bkash/create", {
      statusCode: 408,
      body: { message: "Request Timeout" },
      delay: 35000,
    }).as("bkashTimeout");

    cy.visit("/checkout");
    cy.getByTestId("payment-bkash").click();
    cy.get("#bkash-wallet").type("01712345678");
    cy.getByTestId("bkash-pay-btn").click();

    // টাইমআউট বার্তা
    cy.get(".payment-error", { timeout: 40000 }).should(
      "contain",
      "সময়সীমা অতিক্রান্ত",
    );
  });
});
```

### বাংলা টেক্সট ইনপুট টেস্টিং

```javascript
// Playwright — বাংলা ভাষা ও বিশেষ অক্ষর পরীক্ষা
test.describe("বাংলা ভাষা সমর্থন", () => {
  test("বাংলায় প্রোডাক্ট সার্চ", async ({ page }) => {
    await page.goto("/products");
    const searchBox = page.getByPlaceholder("অনুসন্ধান করুন...");

    await searchBox.fill("স্যামসাং গ্যালাক্সি");
    await page.keyboard.press("Enter");

    await expect(page.locator(".search-results")).toContainText("স্যামসাং");
  });

  test("বাংলা ঠিকানা সংরক্ষণ ও প্রদর্শন", async ({ page }) => {
    await page.goto("/profile/address");

    const address = "বাড়ি নং ১২/ক, সড়ক নং ৫, ব্লক-ঘ, মিরপুর-১০, ঢাকা-১২১৬";
    await page.getByLabel("ঠিকানা").fill(address);
    await page.getByRole("button", { name: "সংরক্ষণ করুন" }).click();

    await expect(page.getByText("ঠিকানা আপডেট হয়েছে")).toBeVisible();

    // পেজ রিলোড করে যাচাই — ডেটা ঠিকমতো সংরক্ষিত হয়েছে কিনা
    await page.reload();
    await expect(page.getByLabel("ঠিকানা")).toHaveValue(address);
  });

  test("বাংলা যুক্তাক্ষর সঠিকভাবে প্রদর্শিত হচ্ছে", async ({ page }) => {
    await page.goto("/bn/terms");

    // যুক্তাক্ষর সহ বাংলা টেক্সট যাচাই
    const complexWords = [
      "বিশ্ববিদ্যালয়",
      "শিক্ষার্থী",
      "রাষ্ট্র",
      "যুক্তরাষ্ট্র",
    ];
    for (const word of complexWords) {
      await expect(page.getByText(word).first()).toBeVisible();
    }
  });

  test("বাংলা সংখ্যা (১২৩) এবং ইংরেজি সংখ্যা (123) উভয়ই কাজ করবে", async ({
    page,
  }) => {
    await page.goto("/checkout");

    // বাংলা সংখ্যায় ফোন দিলে ত্রুটি/রূপান্তর হওয়া উচিত
    await page.getByLabel("ফোন").fill("০১৭১২৩৪৫৬৭৮");
    await page.getByLabel("ফোন").blur();

    // অ্যাপ হয় ইংরেজিতে রূপান্তর করবে, নয়তো বার্তা দেখাবে
    const phoneValue = await page.getByLabel("ফোন").inputValue();
    const isConverted = phoneValue === "01712345678";
    const hasError = await page.locator('[data-error="phone"]').isVisible();

    expect(isConverted || hasError).toBeTruthy();
  });
});
```

```php
// Laravel Dusk — বাংলা কন্টেন্ট পরীক্ষা
class BanglaContentTest extends DuskTestCase
{
    public function test_bangla_product_name_display(): void
    {
        $product = Product::factory()->create([
            'name' => 'হ্যান্ডমেইড জামদানি শাড়ি',
            'description' => 'ঐতিহ্যবাহী বাংলাদেশি জামদানি শাড়ি।'
        ]);

        $this->browse(function (Browser $browser) use ($product) {
            $browser->visit("/products/{$product->id}")
                    ->assertSee('হ্যান্ডমেইড জামদানি শাড়ি')
                    ->assertSee('ঐতিহ্যবাহী বাংলাদেশি জামদানি শাড়ি।');
        });
    }

    public function test_bangla_invoice_generation(): void
    {
        $order = Order::factory()->create(['total' => 5000]);

        $this->browse(function (Browser $browser) use ($order) {
            $browser->loginAs($order->user)
                    ->visit("/orders/{$order->id}/invoice")
                    ->assertSee('চালান')
                    ->assertSee('মোট মূল্য')
                    ->assertSee('৳৫,০০০');
        });
    }
}
```

---

## 🎯 সারসংক্ষেপ

```
E2E টেস্টিং সফল করার মূলমন্ত্র:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ কম কিন্তু গুরুত্বপূর্ণ টেস্ট লিখুন
✦ Critical business flows কভার করুন
✦ data-testid বা role-based সিলেক্টর ব্যবহার করুন
✦ API দিয়ে state সেটআপ করুন, UI দিয়ে নয়
✦ CI/CD-তে প্যারালেল চালান
✦ Flaky টেস্ট চিহ্নিত করে ঠিক করুন
✦ Page Object Model অনুসরণ করুন
✦ প্রতিটি টেস্ট স্বাধীন ও নির্ভরতামুক্ত রাখুন
```

---

> **লেখকের নোট**: এই গাইডটি বাংলাদেশি ডেভেলপারদের জন্য তৈরি, যেখানে বিকাশ/নগদ পেমেন্ট, বাংলা ইনপুট, এবং স্থানীয় প্রসঙ্গ অন্তর্ভুক্ত করা হয়েছে। প্রতিটি কোড উদাহরণ প্রোডাকশন-রেডি প্যাটার্ন অনুসরণ করে।
