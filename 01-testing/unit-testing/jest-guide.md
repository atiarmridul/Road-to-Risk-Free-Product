# Jest Guide

## 💻 Jest Deep Dive

### সেটআপ ও কনফিগারেশন

`jest.config.js` ফাইলে Jest-এর সমস্ত কনফিগারেশন থাকে:

```javascript
// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  // টেস্ট environment
  testEnvironment: "node",

  // টেস্ট ফাইলের প্যাটার্ন
  testMatch: ["<rootDir>/tests/**/*.test.js", "<rootDir>/tests/**/*.spec.js"],

  // কভারেজ কনফিগারেশন
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/index.js",
    "!src/database/migrations/**",
  ],

  coverageDirectory: "reports/coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },

  // কভারেজ রিপোর্টার
  coverageReporters: ["text", "text-summary", "lcov", "html"],

  // সেটআপ ফাইল — সব টেস্টের আগে চলবে
  setupFilesAfterFramework: ["<rootDir>/tests/setup.js"],

  // ফাইল ট্রান্সফর্ম (Babel/TypeScript)
  transform: {},

  // ধীর টেস্ট সতর্কতা (৫ সেকেন্ডের বেশি হলে)
  slowTestThreshold: 5,

  // verbose আউটপুট
  verbose: true,
};
```

### describe / it / test ও expect Matchers

```javascript
// tests/unit/bkashValidator.test.js

const { BkashAmountValidator } = require("../../src/validators/bkashValidator");

describe("BkashAmountValidator", () => {
  let validator;

  // প্রতিটি টেস্টের আগে fresh instance
  beforeEach(() => {
    validator = new BkashAmountValidator();
  });

  // ─── গ্রুপিং: describe ব্লকে সম্পর্কিত টেস্ট একত্রে ──
  describe("validate()", () => {
    // it() ও test() সমার্থক — দুটোই ব্যবহার করা যায়
    it("should accept valid bKash amount", () => {
      expect(validator.validate(500)).toBe(true);
    });

    test("should reject amount below minimum (10 BDT)", () => {
      expect(validator.validate(5)).toBe(false);
    });

    it("should reject amount above maximum (25,000 BDT per txn)", () => {
      expect(validator.validate(30000)).toBe(false);
    });

    it("should reject negative amounts", () => {
      expect(validator.validate(-100)).toBe(false);
    });

    it("should reject non-numeric values", () => {
      expect(validator.validate("abc")).toBe(false);
      expect(validator.validate(null)).toBe(false);
      expect(validator.validate(undefined)).toBe(false);
    });
  });

  // ─── সাধারণ Matchers ──────────────────────────────────
  describe("Common Jest Matchers", () => {
    // সমতা পরীক্ষা
    test("equality matchers", () => {
      expect(100).toBe(100); // === strict
      expect({ a: 1 }).toEqual({ a: 1 }); // deep equality
      expect({ a: 1, b: 2 }).toMatchObject({ a: 1 }); // আংশিক মিল
    });

    // সত্যতা পরীক্ষা
    test("truthiness matchers", () => {
      expect(true).toBeTruthy();
      expect(0).toBeFalsy();
      expect(null).toBeNull();
      expect(undefined).toBeUndefined();
      expect("bKash").toBeDefined();
    });

    // সংখ্যা পরীক্ষা
    test("number matchers", () => {
      expect(1500).toBeGreaterThan(1000);
      expect(1500).toBeGreaterThanOrEqual(1500);
      expect(50).toBeLessThan(100);

      // ভাসমান বিন্দু — toBeCloseTo ব্যবহার করুন
      expect(0.1 + 0.2).toBeCloseTo(0.3, 10);
    });

    // স্ট্রিং ও রেগেক্স পরীক্ষা
    test("string matchers", () => {
      const msg = "bKash পেমেন্ট সফল: TXN-20231115-ABC123";
      expect(msg).toContain("সফল");
      expect(msg).toMatch(/TXN-\d{8}-[A-Z0-9]+/);
    });

    // অ্যারে পরীক্ষা
    test("array matchers", () => {
      const items = ["চাল", "ডাল", "তেল"];
      expect(items).toHaveLength(3);
      expect(items).toContain("ডাল");
      expect(items).toEqual(expect.arrayContaining(["তেল", "চাল"]));
    });

    // অবজেক্ট পরীক্ষা
    test("object matchers", () => {
      const txn = {
        id: "TXN001",
        amount: 1500,
        currency: "BDT",
        sender: "01712345678",
      };

      expect(txn).toHaveProperty("amount");
      expect(txn).toHaveProperty("amount", 1500);
      expect(txn).toEqual(expect.objectContaining({ currency: "BDT" }));
    });
  });
});
```

### Lifecycle — beforeEach / afterEach / beforeAll / afterAll

```javascript
// tests/unit/lifecycle.test.js

describe("Jest Lifecycle ডেমো", () => {
  /*
   * কার্যক্রম ক্রম:
   *
   * beforeAll()        ← পুরো describe ব্লকে ১ বার
   *   beforeEach()     ← প্রতি test-এ
   *   test 1
   *   afterEach()      ← প্রতি test-এ
   *
   *   beforeEach()
   *   test 2
   *   afterEach()
   * afterAll()         ← পুরো describe ব্লকে ১ বার
   */

  let sharedConfig;
  let testData;

  beforeAll(() => {
    // ব্যয়বহুল সেটআপ — একবারই চলে
    sharedConfig = { currency: "BDT", vatRate: 0.15 };
  });

  beforeEach(() => {
    // প্রতি টেস্টে fresh data
    testData = {
      products: [
        { name: "বাসমতি চাল", price: 120 },
        { name: "মসুর ডাল", price: 95 },
        { name: "সয়াবিন তেল", price: 180 },
      ],
    };
  });

  afterEach(() => {
    testData = null;
  });

  afterAll(() => {
    sharedConfig = null;
  });

  test("products are fresh each time", () => {
    testData.products.push({ name: "চিনি", price: 85 });
    expect(testData.products).toHaveLength(4);
  });

  test("products still have 3 items (fresh from beforeEach)", () => {
    expect(testData.products).toHaveLength(3);
  });
});
```

### test.each — প্যারামেট্রাইজড টেস্টিং

```javascript
// tests/unit/priceCalculator.test.js

const { PriceCalculator } = require("../../src/services/priceCalculator");

describe("PriceCalculator", () => {
  const calculator = new PriceCalculator();

  // ─── টেবিল ফরম্যাটে test.each ──────────────────────────
  test.each([
    { price: 1000, vatRate: 0.15, expected: 150, label: "সাধারণ পণ্য" },
    { price: 0, vatRate: 0.15, expected: 0, label: "শূন্য মূল্য" },
    { price: 49.99, vatRate: 0.15, expected: 7.5, label: "ছোট মূল্য" },
    { price: 500000, vatRate: 0.15, expected: 75000, label: "বড় অ্যামাউন্ট" },
  ])(
    "$label: ৳$price এ $vatRate হারে ভ্যাট = ৳$expected",
    ({ price, vatRate, expected }) => {
      const vat = calculator.calculateVat(price, vatRate);
      expect(vat).toBeCloseTo(expected, 2);
    },
  );

  // ─── অ্যারে ফরম্যাটে test.each ─────────────────────────
  describe("bKash ক্যাশ আউট ফি", () => {
    test.each([
      [1000, 18.5],
      [5000, 92.5],
      [25000, 462.5],
      [500, 9.25],
    ])("৳%i ক্যাশ আউটে ফি = ৳%f", (amount, expectedFee) => {
      const fee = calculator.calculateBkashCashOutFee(amount);
      expect(fee).toBeCloseTo(expectedFee, 2);
    });
  });

  // ─── describe.each — গ্রুপ লেভেলে প্যারামেট্রাইজ ─────
  describe.each([
    { discount: 0.1, label: "১০%" },
    { discount: 0.2, label: "২০%" },
    { discount: 0.5, label: "৫০%" },
  ])("$label ডিসকাউন্ট", ({ discount }) => {
    test("should reduce price correctly", () => {
      const result = calculator.applyDiscount(1000, discount);
      expect(result).toBe(1000 * (1 - discount));
    });

    test("should not go below zero", () => {
      const result = calculator.applyDiscount(0, discount);
      expect(result).toBe(0);
    });
  });
});
```

### Async কোড টেস্টিং

```javascript
// tests/unit/asyncOperations.test.js

const { PaymentGateway } = require("../../src/services/paymentGateway");
const { fetchExchangeRate } = require("../../src/utils/currency");

describe("Async কোড টেস্টিং", () => {
  // ─── পদ্ধতি ১: async/await (সবচেয়ে পরিষ্কার) ──────────
  describe("async/await", () => {
    test("should process bKash payment successfully", async () => {
      const gateway = new PaymentGateway();
      const result = await gateway.processPayment({
        amount: 1500,
        currency: "BDT",
        method: "bkash",
        phone: "01712345678",
      });

      expect(result).toMatchObject({
        status: "success",
        amount: 1500,
        currency: "BDT",
      });
      expect(result.transactionId).toBeDefined();
    });

    test("should reject invalid payment", async () => {
      const gateway = new PaymentGateway();

      await expect(
        gateway.processPayment({ amount: -100, method: "bkash" }),
      ).rejects.toThrow("অবৈধ পরিমাণ");
    });
  });

  // ─── পদ্ধতি ২: Promise return ──────────────────────────
  describe("Promise", () => {
    test("should fetch BDT exchange rate", () => {
      return fetchExchangeRate("USD", "BDT").then((rate) => {
        expect(rate).toBeGreaterThan(100);
        expect(rate).toBeLessThan(150);
      });
    });
  });

  // ─── পদ্ধতি ৩: resolves / rejects matchers ────────────
  describe("resolves/rejects", () => {
    test("should resolve with exchange rate object", async () => {
      await expect(fetchExchangeRate("USD", "BDT")).resolves.toEqual(
        expect.objectContaining({
          from: "USD",
          to: "BDT",
          rate: expect.any(Number),
        }),
      );
    });

    test("should reject for unsupported currency", async () => {
      await expect(fetchExchangeRate("XYZ", "BDT")).rejects.toThrow(
        "অসমর্থিত মুদ্রা",
      );
    });
  });

  // ─── পদ্ধতি ৪: Callback (legacy কোডের জন্য) ───────────
  describe("Callback style (done parameter)", () => {
    test("should notify on payment completion", (done) => {
      const gateway = new PaymentGateway();

      gateway.onPaymentComplete(1500, "BDT", (error, result) => {
        try {
          expect(error).toBeNull();
          expect(result.status).toBe("completed");
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  // ─── Fake Timers — setTimeout/setInterval টেস্টিং ────
  describe("Fake Timers", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("payment timeout after 30 seconds", () => {
      const gateway = new PaymentGateway();
      const callback = jest.fn();

      gateway.processWithTimeout(1500, callback);

      // ২৯ সেকেন্ড — এখনো timeout হয়নি
      jest.advanceTimersByTime(29000);
      expect(callback).not.toHaveBeenCalled();

      // ৩০ সেকেন্ড — timeout!
      jest.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ error: "TIMEOUT" }),
      );
    });
  });
});
```

### পূর্ণাঙ্গ উদাহরণ — Utility ও Service Class টেস্টিং

```javascript
// src/utils/bdtFormatter.js
class BdtFormatter {
  format(amount, options = {}) {
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new TypeError("পরিমাণ অবশ্যই সংখ্যা হতে হবে");
    }

    const { showSymbol = true, decimals = 2 } = options;
    const formatted = amount.toFixed(decimals).replace(
      /\B(?=(\d{2})+(?!\d))/g, // বাংলাদেশী গ্রুপিং: ১,০০,০০০
      ",",
    );

    return showSymbol ? `৳${formatted}` : formatted;
  }

  parse(formatted) {
    const cleaned = formatted.replace(/[৳,\s]/g, "");
    const amount = parseFloat(cleaned);
    if (isNaN(amount)) {
      throw new Error("পার্স করা সম্ভব হয়নি");
    }
    return amount;
  }
}

module.exports = { BdtFormatter };
```

```javascript
// tests/unit/bdtFormatter.test.js

const { BdtFormatter } = require("../../src/utils/bdtFormatter");

describe("BdtFormatter", () => {
  let formatter;

  beforeEach(() => {
    formatter = new BdtFormatter();
  });

  describe("format()", () => {
    test("should format with ৳ symbol by default", () => {
      expect(formatter.format(1500)).toBe("৳1,500.00");
    });

    test("should format without symbol when specified", () => {
      expect(formatter.format(1500, { showSymbol: false })).toBe("1,500.00");
    });

    test("should handle zero", () => {
      expect(formatter.format(0)).toBe("৳0.00");
    });

    test("should handle large amounts with BD grouping", () => {
      expect(formatter.format(1000000)).toBe("৳10,00,000.00");
    });

    test("should respect decimal places option", () => {
      expect(formatter.format(99.5, { decimals: 0 })).toBe("৳100");
    });

    test("should throw for non-numeric input", () => {
      expect(() => formatter.format("abc")).toThrow(TypeError);
      expect(() => formatter.format(null)).toThrow(
        "পরিমাণ অবশ্যই সংখ্যা হতে হবে",
      );
    });
  });

  describe("parse()", () => {
    test("should parse formatted BDT string", () => {
      expect(formatter.parse("৳1,500.00")).toBe(1500);
    });

    test("should parse without symbol", () => {
      expect(formatter.parse("10,00,000.50")).toBe(1000000.5);
    });

    test("should throw for unparseable string", () => {
      expect(() => formatter.parse("abc")).toThrow("পার্স করা সম্ভব হয়নি");
    });
  });
});
```

---
