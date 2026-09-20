# Mutation Testing with Stryker and JavaScript

## 🟨 JavaScript — Stryker দিয়ে Mutation Testing

### ইনস্টলেশন ও কনফিগারেশন

```bash
# Stryker ইনস্টল ও initialize
npm install --save-dev @stryker-mutator/core
npx stryker init
```

### stryker.config.mjs কনফিগারেশন

```javascript
// stryker.config.mjs
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest", // অথবা 'mocha', 'vitest'
  jest: {
    configFile: "jest.config.js",
  },
  coverageAnalysis: "perTest", // প্রতিটি টেস্ট আলাদাভাবে বিশ্লেষণ
  mutate: [
    "src/**/*.js",
    "!src/**/*.test.js", // টেস্ট ফাইল বাদ
    "!src/**/*.spec.js",
    "!src/index.js", // entry point বাদ
  ],
  thresholds: {
    high: 80, // ≥80% = সবুজ
    low: 60, // <60% = লাল
    break: 50, // <50% হলে CI fail
  },
  concurrency: 4,
  tempDirName: "stryker-tmp",
  cleanTempDir: true,
};

export default config;
```

### উদাহরণ — সোর্স কোড ও টেস্ট

```javascript
// src/cart.js
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    if (!product || !product.price) {
      throw new Error("Invalid product");
    }

    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) {
      throw new Error("Item not found in cart");
    }
    this.items.splice(index, 1);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  applyDiscount(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error("Invalid discount percentage");
    }
    const subtotal = this.getSubtotal();
    return subtotal - (subtotal * percent) / 100;
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = ShoppingCart;
```

```javascript
// src/cart.test.js
const ShoppingCart = require("./cart");

describe("ShoppingCart — Mutation-Resistant Tests", () => {
  let cart;
  const product1 = { id: 1, name: "Book", price: 500 };
  const product2 = { id: 2, name: "Pen", price: 50 };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe("addItem", () => {
    it("should add a new item to the cart", () => {
      cart.addItem(product1, 2);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.items[0].product.id).toBe(1);
    });

    it("should increase quantity for existing item", () => {
      cart.addItem(product1, 2);
      cart.addItem(product1, 3);
      expect(cart.items).toHaveLength(1); // এখনো ১টি item
      expect(cart.items[0].quantity).toBe(5); // ২+৩ = ৫
    });

    it("should throw for zero quantity", () => {
      expect(() => cart.addItem(product1, 0)).toThrow(
        "Quantity must be positive",
      );
    });

    it("should throw for negative quantity", () => {
      expect(() => cart.addItem(product1, -1)).toThrow(
        "Quantity must be positive",
      );
    });

    it("should throw for invalid product", () => {
      expect(() => cart.addItem(null, 1)).toThrow("Invalid product");
      expect(() => cart.addItem({}, 1)).toThrow("Invalid product");
    });
  });

  describe("removeItem", () => {
    it("should remove item from cart", () => {
      cart.addItem(product1, 1);
      cart.addItem(product2, 1);
      cart.removeItem(1);
      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].product.id).toBe(2);
    });

    it("should throw for non-existent item", () => {
      expect(() => cart.removeItem(999)).toThrow("Item not found");
    });
  });

  describe("getSubtotal", () => {
    it("should return 0 for empty cart", () => {
      expect(cart.getSubtotal()).toBe(0);
    });

    it("should calculate subtotal correctly", () => {
      cart.addItem(product1, 2); // 500 * 2 = 1000
      cart.addItem(product2, 3); // 50 * 3 = 150
      expect(cart.getSubtotal()).toBe(1150);
    });
  });

  describe("applyDiscount", () => {
    beforeEach(() => {
      cart.addItem(product1, 2); // subtotal = 1000
    });

    it("should apply percentage discount", () => {
      expect(cart.applyDiscount(10)).toBe(900); // 1000 - 100 = 900
    });

    it("should handle 0% discount", () => {
      expect(cart.applyDiscount(0)).toBe(1000);
    });

    it("should handle 100% discount", () => {
      expect(cart.applyDiscount(100)).toBe(0);
    });

    it("should throw for negative discount", () => {
      expect(() => cart.applyDiscount(-5)).toThrow("Invalid discount");
    });

    it("should throw for discount over 100", () => {
      expect(() => cart.applyDiscount(101)).toThrow("Invalid discount");
    });
  });

  describe("getItemCount", () => {
    it("should return 0 for empty cart", () => {
      expect(cart.getItemCount()).toBe(0);
    });

    it("should return total quantity of all items", () => {
      cart.addItem(product1, 2);
      cart.addItem(product2, 3);
      expect(cart.getItemCount()).toBe(5);
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty cart", () => {
      expect(cart.isEmpty()).toBe(true);
    });

    it("should return false for non-empty cart", () => {
      cart.addItem(product1, 1);
      expect(cart.isEmpty()).toBe(false);
    });
  });
});
```

### Stryker চালানো

```bash
# Mutation testing চালান
npx stryker run

# নির্দিষ্ট ফাইলে চালান
npx stryker run --mutate "src/cart.js"
```

---
