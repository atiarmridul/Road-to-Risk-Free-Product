# টেস্টিং: বাংলা স্টাডি প্ল্যান

## এই নোটের উদ্দেশ্য

এই ফাইলটি `01-testing` মডিউলের সব টপিক দ্রুত রিভিশন, প্র্যাকটিস এবং ইন্টারভিউ প্রস্তুতির জন্য একটি গাইড।

## ৭ দিনের স্টাডি প্ল্যান

1. দিন ১: Unit Testing + Mocking/Stubbing
2. দিন ২: Integration Testing + Test Coverage
3. দিন ৩: E2E Testing + Visual Regression
4. দিন ৪: Contract Testing + TDD
5. দিন ৫: Performance Testing + Mutation Testing
6. দিন ৬: আগের সব টপিকের নোট রিভিশন + ছোট কুইজ
7. দিন ৭: Mini project test strategy লিখে self-review

## প্রতিদিনের চেকলিস্ট

- আজকের টপিকের একটি ফাইল সম্পূর্ণ পড়েছি
- টপিক অনুযায়ী ৫টি key point লিখেছি
- অন্তত ২টি interview question practice করেছি
- একটি ছোট example নিজে লিখেছি

## যেসব স্কিল তৈরি করতে হবে

- assertion ঠিকভাবে লেখা
- flaky test detect করা
- test naming convention maintain করা
- test failure হলে root cause isolate করা
- fast feedback-এর জন্য test pyramid ব্যবহার করা

## Interview প্রস্তুতি (দ্রুত)

1. Unit test আর integration test-এর পার্থক্য উদাহরণসহ বলুন।
2. Mock কখন ব্যবহার করবেন, আর কখন real dependency ভালো?
3. E2E suite slow হলে কীভাবে optimize করবেন?
4. Contract test কেন microservice architecture-এ জরুরি?
5. Coverage 90% হলেই কি quality নিশ্চিত হয়?

## Mini Practice Task

একটি login feature ধরে নিচের test set লিখুন:

- unit tests: input validation, token parser
- integration tests: auth service + db interaction
- e2e tests: valid login, invalid login, locked account
- non-functional: response time under load

## রিভিশন টিপ

- ফাইল পড়ার পর নিজের ভাষায় ১ প্যারার summary লিখুন।
- একই টপিক ২ বার পড়ার বদলে ১ বার পড়ে ১ বার explain করুন (active recall)।
