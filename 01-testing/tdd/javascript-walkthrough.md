# TDD Walkthrough with JavaScript

## 🟨 JavaScript Example: Password Validator TDD দিয়ে বিল্ড করা (Jest)
এবার আমরা JavaScript-এ একটি `PasswordValidator` বিল্ড করবো TDD পদ্ধতিতে।

---

### 🔴 সাইকেল ১ — Red: ন্যূনতম দৈর্ঘ্য যাচাই
```javascript
// __tests__/passwordValidator.test.js

const { PasswordValidator } = require("../src/passwordValidator");

describe("PasswordValidator", () => {
  let validator;

  beforeEach(() => {
    validator = new PasswordValidator();
  });

  test("ন্যূনতম ৮ অক্ষরের কম পাসওয়ার্ড reject করে", () => {
    const result = validator.validate("Ab1!xyz");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
  });

  test("৮ বা তার বেশি অক্ষরের পাসওয়ার্ড এই নিয়মে পাস করে", () => {
    const result = validator.validate("Ab1!xyzw");
    expect(result.errors).not.toContain("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
  });
});
```

```bash
$ npx jest
# 🔴 FAIL: Cannot find module '../src/passwordValidator'
```

#### 🟢 সাইকেল ১ — Green

```javascript
// src/passwordValidator.js

class PasswordValidator {
  validate(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = { PasswordValidator };
```

```bash
# 🟢 PASS (2 tests)
```

---

#### 🔴 সাইকেল ২ — Red: বড় হাতের অক্ষর থাকতে হবে

```javascript
test("বড় হাতের অক্ষর না থাকলে reject করে", () => {
  const result = validator.validate("abcd1234!");
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain(
    "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে",
  );
});
```

```bash
# 🔴 FAIL: Expected errors to contain "কমপক্ষে একটি বড় হাতের অক্ষর..."
```

#### 🟢 সাইকেল ২ — Green

```javascript
validate(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে');
  }

  return { isValid: errors.length === 0, errors };
}
```

```bash
# 🟢 PASS (3 tests)
```

---

#### 🔴 সাইকেল ৩ — Red: সংখ্যা থাকতে হবে

```javascript
test("সংখ্যা না থাকলে reject করে", () => {
  const result = validator.validate("Abcdefgh!");
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain("কমপক্ষে একটি সংখ্যা (0-9) থাকতে হবে");
});
```

#### 🟢 সাইকেল ৩ — Green

```javascript
if (!/[0-9]/.test(password)) {
  errors.push("কমপক্ষে একটি সংখ্যা (0-9) থাকতে হবে");
}
```

---

#### 🔴 সাইকেল ৪ — Red: বিশেষ চিহ্ন থাকতে হবে

```javascript
test("বিশেষ চিহ্ন না থাকলে reject করে", () => {
  const result = validator.validate("Abcdefg1");
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain(
    "কমপক্ষে একটি বিশেষ চিহ্ন (!@#$%^&*) থাকতে হবে",
  );
});
```

#### 🟢 সাইকেল ৪ — Green

```javascript
if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
  errors.push("কমপক্ষে একটি বিশেষ চিহ্ন (!@#$%^&*) থাকতে হবে");
}
```

---

#### 🔴 সাইকেল ৫ — Red: কমন পাসওয়ার্ড ব্লক করা

```javascript
test("কমন পাসওয়ার্ড ব্লক করে", () => {
  const result = validator.validate("Password1!");
  expect(result.isValid).toBe(false);
  expect(result.errors).toContain(
    "এই পাসওয়ার্ড খুব সাধারণ, অন্য কিছু ব্যবহার করুন",
  );
});
```

#### 🟢 সাইকেল ৫ — Green

```javascript
const COMMON_PASSWORDS = [
  "password1!",
  "qwerty123!",
  "admin123!",
  "12345678",
  "letmein",
  "welcome1",
  "monkey123",
];

if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
  errors.push("এই পাসওয়ার্ড খুব সাধারণ, অন্য কিছু ব্যবহার করুন");
}
```

---

#### 🔴 সাইকেল ৬ — Red: পাসওয়ার্ড শক্তি পরিমাপক (Strength Meter)

```javascript
test('দুর্বল পাসওয়ার্ডের শক্তি "weak" রিটার্ন করে', () => {
  const result = validator.validate("Abcdefg1!");
  expect(result.strength).toBe("weak");
});

test('মাঝারি দৈর্ঘ্যের পাসওয়ার্ডের শক্তি "medium" রিটার্ন করে', () => {
  const result = validator.validate("Abcdefgh1!xy");
  expect(result.strength).toBe("medium");
});

test('দীর্ঘ ও জটিল পাসওয়ার্ডের শক্তি "strong" রিটার্ন করে', () => {
  const result = validator.validate("MyS3cur3P@ssw0rd!XYZ");
  expect(result.strength).toBe("strong");
});
```

#### 🟢 সাইকেল ৬ — Green

```javascript
calculateStrength(password) {
  let score = 0;

  if (password.length >= 8)  score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*]/.test(password)) score += 1;

  if (score <= 3) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}
```

#### 🔵 সাইকেল ৬ — Refactor: সম্পূর্ণ ক্লাস পরিষ্কার করি

```javascript
// src/passwordValidator.js — চূড়ান্ত রিফ্যাক্টরড সংস্করণ

const COMMON_PASSWORDS = [
  "password1!",
  "qwerty123!",
  "admin123!",
  "12345678",
  "letmein",
  "welcome1",
];

const RULES = [
  {
    test: (pw) => pw.length >= 8,
    message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
  },
  {
    test: (pw) => /[A-Z]/.test(pw),
    message: "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে",
  },
  {
    test: (pw) => /[a-z]/.test(pw),
    message: "কমপক্ষে একটি ছোট হাতের অক্ষর (a-z) থাকতে হবে",
  },
  {
    test: (pw) => /[0-9]/.test(pw),
    message: "কমপক্ষে একটি সংখ্যা (0-9) থাকতে হবে",
  },
  {
    test: (pw) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
    message: "কমপক্ষে একটি বিশেষ চিহ্ন (!@#$%^&*) থাকতে হবে",
  },
  {
    test: (pw) => !COMMON_PASSWORDS.includes(pw.toLowerCase()),
    message: "এই পাসওয়ার্ড খুব সাধারণ, অন্য কিছু ব্যবহার করুন",
  },
];

class PasswordValidator {
  validate(password) {
    const errors = RULES.filter((rule) => !rule.test(password)).map(
      (rule) => rule.message,
    );

    return {
      isValid: errors.length === 0,
      errors,
      strength: this.#calculateStrength(password),
    };
  }

  #calculateStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 3) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  }
}

module.exports = { PasswordValidator };
```

```bash
$ npx jest
# 🟢 PASS (9 tests) — রিফ্যাক্টরের পরেও সব পাস!
```

> 🎯 **লক্ষ্য করুন**: রিফ্যাক্টরে আমরা `RULES` array ব্যবহার করে Open/Closed Principle প্রয়োগ করেছি — নতুন নিয়ম যোগ করতে শুধু array-তে একটি অবজেক্ট যোগ করলেই হবে, কোনো কোড পরিবর্তন লাগবে না।

---
