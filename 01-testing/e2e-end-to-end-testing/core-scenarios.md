# Core End-to-End Test Scenarios

## 🔥 E2E টেস্ট সিনারিও

### ১. লগইন/রেজিস্ট্রেশন ফ্লো টেস্ট

#### Cypress

```javascript
describe("অথেন্টিকেশন ফ্লো", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("সঠিক তথ্য দিয়ে লগইন করতে পারবে", () => {
    cy.get('[data-testid="email"]').type("user@example.com");
    cy.get('[data-testid="password"]').type("Pass123!");
    cy.get('[data-testid="login-btn"]').click();

    cy.url().should("include", "/dashboard");
    cy.get('[data-testid="welcome"]').should("contain", "স্বাগতম");
  });

  it("ভুল পাসওয়ার্ড দিলে ত্রুটি দেখাবে", () => {
    cy.get('[data-testid="email"]').type("user@example.com");
    cy.get('[data-testid="password"]').type("wrong");
    cy.get('[data-testid="login-btn"]').click();

    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "ইমেইল বা পাসওয়ার্ড ভুল");
  });

  it("রেজিস্ট্রেশন সম্পন্ন করতে পারবে", () => {
    cy.visit("/register");
    cy.get("#name").type("ফারহানা আক্তার");
    cy.get("#email").type(`test${Date.now()}@mail.com`);
    cy.get("#phone").type("01812345678");
    cy.get("#password").type("Secure123!");
    cy.get("#password_confirmation").type("Secure123!");
    cy.get("#district").select("চট্টগ্রাম");
    cy.get("#terms").check();
    cy.get("#register-btn").click();

    cy.url().should("include", "/verify-email");
    cy.contains("যাচাইকরণ ইমেইল পাঠানো হয়েছে");
  });
});
```

#### Playwright

```javascript
const { test, expect } = require("@playwright/test");

test.describe("অথেন্টিকেশন ফ্লো", () => {
  test("সফল লগইন", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("ইমেইল").fill("user@example.com");
    await page.getByLabel("পাসওয়ার্ড").fill("Pass123!");
    await page.getByRole("button", { name: "লগইন" }).click();

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByText("স্বাগতম")).toBeVisible();
  });

  test("ভুল তথ্যে ত্রুটি বার্তা", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("ইমেইল").fill("user@example.com");
    await page.getByLabel("পাসওয়ার্ড").fill("wrong");
    await page.getByRole("button", { name: "লগইন" }).click();

    await expect(page.locator(".error-message")).toContainText(
      "ইমেইল বা পাসওয়ার্ড ভুল",
    );
  });
});
```

#### Laravel Dusk

```php
<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use App\Models\User;

class AuthenticationTest extends DuskTestCase
{
    public function test_successful_login(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('Pass123!')
        ]);

        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                    ->type('email', 'test@example.com')
                    ->type('password', 'Pass123!')
                    ->press('লগইন')
                    ->assertPathIs('/dashboard')
                    ->assertSee('স্বাগতম');
        });
    }

    public function test_failed_login_shows_error(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                    ->type('email', 'fake@example.com')
                    ->type('password', 'wrong')
                    ->press('লগইন')
                    ->assertSee('ইমেইল বা পাসওয়ার্ড ভুল');
        });
    }

    public function test_registration_flow(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                    ->type('name', 'ফারহানা আক্তার')
                    ->type('email', 'farhana@example.com')
                    ->type('phone', '01812345678')
                    ->type('password', 'Secure123!')
                    ->type('password_confirmation', 'Secure123!')
                    ->select('district', 'চট্টগ্রাম')
                    ->check('#terms')
                    ->press('রেজিস্ট্রেশন করুন')
                    ->assertPathIs('/verify-email')
                    ->assertSee('যাচাইকরণ ইমেইল পাঠানো হয়েছে');
        });
    }
}
```

---

### ২. ই-কমার্স চেকআউট ফ্লো (Cart → Shipping → Payment → Confirmation)

```javascript
// Cypress — সম্পূর্ণ ক্রয় প্রবাহ
describe("ই-কমার্স চেকআউট", () => {
  beforeEach(() => {
    cy.login("buyer@shop.com.bd", "Pass123!");
  });

  it("পণ্য কিনে অর্ডার নিশ্চিত করতে পারবে", () => {
    // ধাপ ১: পণ্য কার্টে যোগ
    cy.visit("/products");
    cy.contains(".product-card", "Samsung Galaxy A54").within(() => {
      cy.get('[data-testid="add-to-cart"]').click();
    });
    cy.getByTestId("cart-count").should("have.text", "1");

    // ধাপ ২: কার্ট পর্যালোচনা
    cy.visit("/cart");
    cy.get(".cart-item").should("have.length", 1);
    cy.getByTestId("cart-total").should("contain", "৳");
    cy.getByTestId("checkout-btn").click();

    // ধাপ ৩: শিপিং তথ্য
    cy.url().should("include", "/checkout/shipping");
    cy.get("#name").type("কামরুল হাসান");
    cy.get("#phone").type("01912345678");
    cy.get("#address").type("বাড়ি ১২, রোড ৫, ধানমন্ডি");
    cy.get("#city").select("ঢাকা");
    cy.get("#postal_code").type("1205");
    cy.get("#shipping-method").select("standard"); // ৳60
    cy.getByTestId("continue-btn").click();

    // ধাপ ৪: পেমেন্ট
    cy.url().should("include", "/checkout/payment");
    cy.mockBkashPayment(35999);
    cy.get('[data-testid="bkash-option"]').click();
    cy.get("#bkash-number").type("01712345678");
    cy.getByTestId("pay-btn").click();

    // ধাপ ৫: অর্ডার নিশ্চিতকরণ
    cy.url().should("include", "/order/confirmation");
    cy.contains("অর্ডার সফলভাবে সম্পন্ন হয়েছে");
    cy.getByTestId("order-id").should("exist");
    cy.getByTestId("order-total").should("contain", "৳36,059");
  });
});
```

```javascript
// Playwright — একই চেকআউট ফ্লো
const { test, expect } = require("@playwright/test");

test("সম্পূর্ণ চেকআউট ফ্লো", async ({ page }) => {
  // লগইন
  await page.goto("/login");
  await page.getByLabel("ইমেইল").fill("buyer@shop.com.bd");
  await page.getByLabel("পাসওয়ার্ড").fill("Pass123!");
  await page.getByRole("button", { name: "লগইন" }).click();

  // পণ্য যোগ
  await page.goto("/products");
  await page
    .locator(".product-card")
    .filter({ hasText: "Samsung Galaxy A54" })
    .getByRole("button", { name: "কার্টে যোগ করুন" })
    .click();

  // চেকআউট
  await page.goto("/cart");
  await page.getByRole("button", { name: "চেকআউট" }).click();

  // শিপিং
  await page.getByLabel("নাম").fill("কামরুল হাসান");
  await page.getByLabel("ফোন").fill("01912345678");
  await page.getByLabel("ঠিকানা").fill("বাড়ি ১২, রোড ৫, ধানমন্ডি");
  await page.getByLabel("শহর").selectOption("ঢাকা");
  await page.getByRole("button", { name: "পরবর্তী" }).click();

  // পেমেন্ট (mock)
  await page.route("**/api/bkash/**", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ trxID: "TRX123", status: "Completed" }),
    });
  });

  await page.getByTestId("bkash-option").click();
  await page.getByPlaceholder("বিকাশ নম্বর").fill("01712345678");
  await page.getByRole("button", { name: "পেমেন্ট করুন" }).click();

  // নিশ্চিতকরণ
  await expect(page).toHaveURL(/.*confirmation/);
  await expect(page.getByText("অর্ডার সফলভাবে সম্পন্ন হয়েছে")).toBeVisible();
});
```

---

### ৩. ফর্ম ভ্যালিডেশন টেস্টিং

```javascript
// Cypress — বিস্তারিত ফর্ম ভ্যালিডেশন
describe("ফর্ম ভ্যালিডেশন", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("খালি ফর্ম সাবমিট করলে সব ত্রুটি দেখাবে", () => {
    cy.get("#register-btn").click();

    cy.get('[data-error="name"]').should("contain", "নাম আবশ্যক");
    cy.get('[data-error="email"]').should("contain", "ইমেইল আবশ্যক");
    cy.get('[data-error="phone"]').should("contain", "ফোন নম্বর আবশ্যক");
    cy.get('[data-error="password"]').should("contain", "পাসওয়ার্ড আবশ্যক");
  });

  it("অবৈধ ইমেইলে ত্রুটি দেখাবে", () => {
    cy.get("#email").type("invalid-email");
    cy.get("#email").blur();
    cy.get('[data-error="email"]').should("contain", "সঠিক ইমেইল দিন");
  });

  it("বাংলাদেশি ফোন নম্বর ভ্যালিডেশন", () => {
    // সঠিক নম্বর
    const validNumbers = ["01712345678", "01812345678", "01912345678"];
    validNumbers.forEach((num) => {
      cy.get("#phone").clear().type(num);
      cy.get("#phone").blur();
      cy.get('[data-error="phone"]').should("not.exist");
    });

    // ভুল নম্বর
    const invalidNumbers = ["0171234", "02812345678", "12345678901"];
    invalidNumbers.forEach((num) => {
      cy.get("#phone").clear().type(num);
      cy.get("#phone").blur();
      cy.get('[data-error="phone"]').should("contain", "সঠিক ফোন নম্বর দিন");
    });
  });

  it("পাসওয়ার্ড শক্তি নির্দেশক কাজ করবে", () => {
    cy.get("#password").type("123");
    cy.get(".strength-meter").should("have.class", "weak");
    cy.get(".strength-text").should("contain", "দুর্বল");

    cy.get("#password").clear().type("MyPass123!");
    cy.get(".strength-meter").should("have.class", "strong");
    cy.get(".strength-text").should("contain", "শক্তিশালী");
  });

  it("বাংলা টেক্সট ইনপুট সঠিকভাবে কাজ করবে", () => {
    cy.get("#name").type("মোহাম্মদ আবদুল্লাহ");
    cy.get("#name").should("have.value", "মোহাম্মদ আবদুল্লাহ");
    cy.get("#address").type("বাড়ি নং ১২/ক, সড়ক নং ৫");
    cy.get("#address").should("have.value", "বাড়ি নং ১২/ক, সড়ক নং ৫");
  });
});
```

---

### ৪. ফাইল আপলোড টেস্টিং

```javascript
// Cypress — ফাইল আপলোড
describe("ফাইল আপলোড", () => {
  it("ছবি আপলোড করতে পারবে", () => {
    cy.visit("/profile/edit");

    // selectFile ব্যবহার (Cypress 12+)
    cy.get('input[type="file"]').selectFile("cypress/fixtures/avatar.jpg");

    // প্রিভিউ দেখা যাচ্ছে কিনা
    cy.get(".image-preview img").should("be.visible");
    cy.get("#upload-btn").click();
    cy.contains("ছবি সফলভাবে আপলোড হয়েছে");
  });

  it("অনুমোদিত ফরম্যাটের বাইরে ফাইল দিলে ত্রুটি দেখাবে", () => {
    cy.visit("/profile/edit");
    cy.get('input[type="file"]').selectFile("cypress/fixtures/document.exe");
    cy.get(".error").should("contain", "শুধুমাত্র JPG, PNG, বা GIF অনুমোদিত");
  });

  it("ড্র্যাগ-অ্যান্ড-ড্রপ আপলোড", () => {
    cy.visit("/upload");
    cy.get(".dropzone").selectFile("cypress/fixtures/photo.png", {
      action: "drag-drop",
    });
    cy.get(".file-list").should("contain", "photo.png");
  });
});

// Playwright — ফাইল আপলোড
test("ফাইল আপলোড", async ({ page }) => {
  await page.goto("/profile/edit");

  // file chooser ইভেন্ট ধরা
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText("ছবি নির্বাচন করুন").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("tests/fixtures/avatar.jpg");

  await expect(page.locator(".image-preview img")).toBeVisible();
  await page.getByRole("button", { name: "আপলোড" }).click();
  await expect(page.getByText("ছবি সফলভাবে আপলোড হয়েছে")).toBeVisible();
});
```

---

### ৫. রিয়েল-টাইম ফিচার টেস্টিং (WebSocket/Notifications)

```javascript
// Cypress — রিয়েল-টাইম নোটিফিকেশন টেস্ট
describe("রিয়েল-টাইম নোটিফিকেশন", () => {
  it("নতুন অর্ডার নোটিফিকেশন দেখাবে", () => {
    cy.login("admin@shop.com.bd", "Admin123!");
    cy.visit("/admin/dashboard");

    // WebSocket ইভেন্ট সিমুলেট করা
    cy.window().then((win) => {
      win.Echo.channel("orders").listen("NewOrder", {
        order_id: "ORD-12345",
        customer: "মোহাম্মদ আলী",
        total: 5000,
      });
    });

    cy.get(".notification-bell .badge").should("contain", "1");
    cy.get(".notification-bell").click();
    cy.get(".notification-item")
      .first()
      .should("contain", "নতুন অর্ডার")
      .and("contain", "মোহাম্মদ আলী");
  });
});

// Playwright — WebSocket টেস্ট
test("চ্যাট মেসেজ রিয়েল-টাইমে আসবে", async ({ page, context }) => {
  // দুটি ব্রাউজার ট্যাব (দুই ব্যবহারকারী)
  const sender = await context.newPage();
  const receiver = page;

  // উভয় ইউজার লগইন
  await sender.goto("/login");
  await sender.getByLabel("ইমেইল").fill("user1@test.com");
  await sender.getByLabel("পাসওয়ার্ড").fill("Pass123!");
  await sender.getByRole("button", { name: "লগইন" }).click();

  await receiver.goto("/login");
  await receiver.getByLabel("ইমেইল").fill("user2@test.com");
  await receiver.getByLabel("পাসওয়ার্ড").fill("Pass123!");
  await receiver.getByRole("button", { name: "লগইন" }).click();

  // চ্যাট রুমে যাওয়া
  await sender.goto("/chat/room-1");
  await receiver.goto("/chat/room-1");

  // মেসেজ পাঠানো
  await sender.getByPlaceholder("বার্তা লিখুন...").fill("আসসালামু আলাইকুম");
  await sender.getByRole("button", { name: "পাঠান" }).click();

  // রিসিভারের কাছে মেসেজ আসা
  await expect(receiver.locator(".message").last()).toContainText(
    "আসসালামু আলাইকুম",
  );
});
```

---
