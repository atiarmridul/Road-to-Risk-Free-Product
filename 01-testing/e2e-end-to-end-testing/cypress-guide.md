# Cypress E2E Guide

## ১. Cypress — আধুনিক E2E টেস্টিং ফ্রেমওয়ার্ক
### সেটআপ
```bash
# প্রজেক্টে Cypress ইনস্টল করুন
npm init -y
npm install cypress --save-dev

# Cypress চালু করুন (GUI মোড)
npx cypress open

# হেডলেস মোড (CI-এর জন্য)
npx cypress run
```

#### প্রজেক্ট স্ট্রাকচার

```
cypress/
├── e2e/                    # টেস্ট ফাইল
│   ├── auth/
│   │   ├── login.cy.js
│   │   └── register.cy.js
│   ├── checkout/
│   │   └── purchase.cy.js
│   └── bkash/
│       └── payment.cy.js
├── fixtures/               # টেস্ট ডেটা (JSON)
│   ├── users.json
│   └── products.json
├── support/
│   ├── commands.js         # কাস্টম কমান্ড
│   └── e2e.js             # গ্লোবাল কনফিগ
└── downloads/
cypress.config.js           # মূল কনফিগারেশন
```

#### `cypress.config.js` কনফিগারেশন

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2, // CI-তে ২ বার retry
      openMode: 0, // লোকাল GUI-তে retry নেই
    },
    env: {
      apiUrl: "http://localhost:8000/api",
      bkashSandbox: "https://sandbox.bka.sh/v1.2.0-beta",
    },
    setupNodeEvents(on, config) {
      // টেস্ট ডেটা সিডিং
      on("task", {
        seedDatabase() {
          // ডেটাবেজে টেস্ট ডেটা ঢোকানো
          return null;
        },
        clearDatabase() {
          return null;
        },
      });
      return config;
    },
  },
});
```

#### মৌলিক Cypress কমান্ডসমূহ

```javascript
// cy.visit — পেজে যাওয়া
cy.visit("/products");
cy.visit("https://daraz.com.bd");

// cy.get — এলিমেন্ট সিলেক্ট করা (CSS selector)
cy.get("#login-btn");
cy.get('[data-testid="cart-icon"]');
cy.get(".product-card").first();

// cy.contains — টেক্সট দিয়ে খুঁজে পাওয়া
cy.contains("কার্টে যোগ করুন");
cy.contains("button", "সাবমিট");

// cy.click — ক্লিক করা
cy.get("#submit").click();
cy.get(".dropdown").click({ force: true });

// cy.type — টাইপ করা
cy.get("#email").type("user@example.com");
cy.get("#phone").type("01712345678");
cy.get("#name").type("মোহাম্মদ আলী"); // বাংলা টেক্সট

// cy.select — ড্রপডাউন সিলেক্ট
cy.get("#district").select("ঢাকা");

// cy.check / cy.uncheck — চেকবক্স
cy.get("#terms").check();

// cy.clear — ইনপুট ক্লিয়ার
cy.get("#search").clear().type("নতুন প্রোডাক্ট");
```

#### Cypress Assertions

```javascript
// Should-based assertions
cy.get(".cart-count").should("have.text", "3");
cy.get("#total").should("contain", "৳");
cy.get(".error").should("be.visible");
cy.get(".success-modal").should("not.exist");
cy.url().should("include", "/dashboard");
cy.get("input").should("have.value", "মোহাম্মদ");

// Chained assertions
cy.get(".product-card")
  .should("have.length", 12)
  .first()
  .should("contain", "Samsung")
  .and("be.visible");

// Expect-based assertions (BDD)
cy.get(".price").then(($el) => {
  const price = parseFloat($el.text().replace("৳", ""));
  expect(price).to.be.greaterThan(0);
  expect(price).to.be.lessThan(100000);
});
```

#### API Intercepting — `cy.intercept()`

```javascript
// GET রিকোয়েস্ট ইন্টারসেপ্ট করে mock ডেটা দেওয়া
cy.intercept("GET", "/api/products", {
  fixture: "products.json",
}).as("getProducts");

cy.visit("/products");
cy.wait("@getProducts");

// POST রিকোয়েস্ট মনিটর করা
cy.intercept("POST", "/api/orders").as("createOrder");

cy.get("#checkout-btn").click();
cy.wait("@createOrder").then((interception) => {
  expect(interception.response.statusCode).to.equal(201);
  expect(interception.request.body).to.have.property("items");
});

// নেটওয়ার্ক ত্রুটি সিমুলেট করা
cy.intercept("POST", "/api/payment/bkash", {
  statusCode: 500,
  body: { error: "বিকাশ সার্ভার সমস্যা" },
}).as("bkashError");

// বিলম্বিত রেসপন্স সিমুলেট
cy.intercept("GET", "/api/search*", (req) => {
  req.reply({
    delay: 3000,
    body: { results: [] },
  });
}).as("slowSearch");
```

#### Fixtures — টেস্ট ডেটা ব্যবস্থাপনা

```json
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "SecurePass123!",
    "name": "টেস্ট ইউজার",
    "phone": "01712345678"
  },
  "invalidUser": {
    "email": "invalid-email",
    "password": "123"
  }
}
```

```javascript
// ফিক্সচার ব্যবহার
cy.fixture("users.json").then((users) => {
  cy.get("#email").type(users.validUser.email);
  cy.get("#password").type(users.validUser.password);
});
```

#### Custom Commands — পুনরায় ব্যবহারযোগ্য কমান্ড

```javascript
// cypress/support/commands.js

// লগইন কমান্ড — প্রতিটি টেস্টে UI লগইন এড়াতে API দিয়ে লগইন
Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.request("POST", "/api/auth/login", { email, password }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
  });
});

// বিকাশ পেমেন্ট সিমুলেট করার কমান্ড
Cypress.Commands.add("mockBkashPayment", (amount) => {
  cy.intercept("POST", "**/bkash/create", {
    statusCode: 200,
    body: {
      paymentID: "TR001122334455",
      createTime: new Date().toISOString(),
      amount: amount,
      transactionStatus: "Initiated",
    },
  });

  cy.intercept("POST", "**/bkash/execute", {
    statusCode: 200,
    body: {
      paymentID: "TR001122334455",
      trxID: "TRX9988776655",
      transactionStatus: "Completed",
      amount: amount,
    },
  });
});

// data-testid দিয়ে সহজে এলিমেন্ট খোঁজার কমান্ড
Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// ব্যবহার
cy.login("admin@shop.com.bd", "Admin123!");
cy.mockBkashPayment(1500);
cy.getByTestId("product-title").should("contain", "Samsung Galaxy");
```

#### Cypress Cloud (Dashboard Service)

```javascript
// cypress.config.js
module.exports = defineConfig({
  projectId: "abc123",
  e2e: {
    // ...
  },
});
```

```bash
# রেকর্ড সহ চালানো
npx cypress run --record --key YOUR_PROJECT_KEY

# প্যারালেল execution
npx cypress run --record --parallel --group "e2e-tests"
```

---
