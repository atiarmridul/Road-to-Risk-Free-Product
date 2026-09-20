# Java OOP Interview Review

> Review this after completing the Java fundamentals and automation examples.

## 🎯 Interview Preparation
### 🎯 Group 9: Interview Ready Notes
#### 🎯 Real Interview Line
“Using OOP in Playwright helps create scalable, reusable, and maintainable automation frameworks through concepts like POM, encapsulation, fixtures, and reusable components.”

![]([Notion-hosted image omitted because its URL expires])
![]([Notion-hosted image omitted because its URL expires])
অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP) হলো একটি প্রোগ্রামিং প্যারাডাইম যা ডেটা এবং তার উপরে পরিচালিত কার্যকলাপকে (ফাংশন বা মেথড) একত্রে একটি অবজেক্ট হিসেবে গঠন করে। OOP মূলত চারটি প্রধান নীতির ওপর ভিত্তি করে গড়ে ওঠে:
1.Encapsulation (এনক্যাপসুলেশন):
এনক্যাপসুলেশন মানে ডেটা এবং ফাংশনগুলোকে একসাথে একটি ইউনিটে (অবজেক্টে) গঠন করা। এতে ডেটা বাইরের প্রোগ্রামের অংশ থেকে সরাসরি অ্যাক্সেস করা যায় না, বরং একটি পাবলিক ইন্টারফেসের মাধ্যমে অ্যাক্সেস করতে হয়। এটি ডেটার নিরাপত্তা বৃদ্ধি করে এবং কোডের জটিলতা কমায়।
2.Inheritance (ইনহেরিটেন্স):
ইনহেরিটেন্সের মাধ্যমে একটি নতুন ক্লাস তৈরি করা যায় যা পূর্বে বিদ্যমান ক্লাসের সব বৈশিষ্ট্য (প্রোপার্টি) এবং আচরণ (মেথড) উত্তরাধিকারসূত্রে পায়। এটি কোড পুনর্ব্যবহারের সুবিধা দেয় এবং প্রোগ্রামিংকে আরও কার্যকর করে তোলে।
3.Polymorphism (পলিমরফিজম):
পলিমরফিজমের মাধ্যমে একটি মেথড বা অপারেশনকে একাধিক রূপে ব্যবহার করা যায়। উদাহরণস্বরূপ, একটি মেথড বিভিন্ন ধরনের ডেটার জন্য ভিন্ন ভিন্নভাবে আচরণ করতে পারে। এটি কোডের নমনীয়তা বৃদ্ধি করে।
4.Abstraction (অ্যাবস্ট্রাকশন):
অ্যাবস্ট্রাকশন হলো ডেটার অপ্রয়োজনীয় জটিলতা দূর করে শুধুমাত্র প্রয়োজনীয় বিষয়গুলোকে সামনে আনা। এটি ব্যবহারকারীর দৃষ্টিকোণ থেকে সিস্টেমকে সহজ ও বোধগম্য করে।
💡কেন OOP গুরুত্বপূর্ণ:
1.কোড পুনর্ব্যবহারযোগ্যতা (Reusability):
ইনহেরিটেন্সের মাধ্যমে কোড পুনর্ব্যবহারের সুযোগ দেয়, যা কোডের পরিমাণ কমিয়ে দেয় এবং ডেভেলপমেন্ট সময় কমায়।
2.ডেটা নিরাপত্তা (Data Security):
এনক্যাপসুলেশন ডেটাকে বাইরের অ্যাক্সেস থেকে রক্ষা করে এবং ডেটার অখণ্ডতা নিশ্চিত করে।
3.সহজ রক্ষণাবেক্ষণ (Easy Maintenance):
কোডের জটিলতা কম থাকায় OOP ব্যবহার করে তৈরি সফটওয়্যার সহজে রক্ষণাবেক্ষণ করা যায়।
4.বিশেষায়িত সমস্যার সমাধান (Specialized Problem Solving):
পলিমরফিজম এবং অ্যাবস্ট্রাকশন ব্যবহার করে বিশেষ সমস্যার সমাধান সহজে করা যায়।
💡কিভাবে OOP ব্যবহার করবেন:
1.ক্লাস এবং অবজেক্ট তৈরি:
প্রথমে একটি ক্লাস তৈরি করতে হবে, যা মূলত একটি ব্লুপ্রিন্ট হিসেবে কাজ করে। এরপর সেই ক্লাস থেকে অবজেক্ট তৈরি করা হয়।
2.মেথড এবং প্রোপার্টি সংজ্ঞায়িত করা:
প্রতিটি ক্লাসে মেথড এবং প্রোপার্টি সংজ্ঞায়িত করতে হবে, যা ঐ ক্লাসের অবজেক্টের মাধ্যমে অ্যাক্সেস করা যাবে।
3.ইনহেরিটেন্স প্রয়োগ করা:
নতুন ক্লাস তৈরি করতে হলে পূর্বে বিদ্যমান ক্লাস থেকে ইনহেরিট করা যায়।
4.পলিমরফিজম এবং অ্যাবস্ট্রাকশন ব্যবহার:
মেথড ওভাররাইডিং এবং ইন্টারফেসের মাধ্যমে পলিমরফিজম এবং অ্যাবস্ট্রাকশন প্রয়োগ করা যায়।
OOP-এর মাধ্যমে প্রোগ্রামিংকে আরও সংগঠিত, নিরাপদ, এবং সহজতর করা সম্ভব, যা বড় প্রজেক্টে খুবই গুরুত্বপূর্ণ।

<unknown url="https://app.notion.com/p/50ceb8f6cfee45c38184b029b20cdf91#103995ff8e468078b210f4107bb0909b" alt="bookmark"/>
## **Mastering the concept of Function Overloading & Overriding**
⭐ Function Overloading: allows multiple methods to share the same name within a class, as long as they differ in their parameter lists.
This means methods can have the same name but varying numbers, types, or orders of parameters
Where do we use it as a QA Automation Engineer? ❓ ❓
Testing API Endpoints: Imagine testing an API endpoint that accepts both integer and string IDs for resource retrieval. Overloaded functions within your test framework can handle both scenarios, improving test coverage and maintainability
Data-Driven Testing: When working with data-driven tests, overloading functions based on data type (e.g., string, integer, float) allows you to write generic test logic applicable to various data sets
🌟 Example code:
```java
// Overloaded method to perform actions with optional waiting
public void clickElement(By locator) {

findElement(locator).click();

}

public void clickElement(By locator, int waitTimeInSeconds) {

WebDriverWait wait = new WebDriverWait(driver, waitTimeInSeconds);

wait.until(ExpectedConditions.elementToBeClickable(locator)).click();

}
```
[Java Bangla Tutorials 117 : Method Overloading (youtube.com)](https://www.youtube.com/watch?v=DwaUODamu2g&t=58s)
```java
// Overloaded method to handle different input types
public void fillTextField(By locator, String text) {

findElement(locator).sendKeys(text);

}

public void fillTextField(By locator, int number) {

findElement(locator).sendKeys(String.valueOf(number));

}
```

Why to use function overloading for above example? ❓❓

ClickElement function allows for optional waiting, improving adaptability to dynamic elements

fillTextField function ensures correct input for different field types, enhancing test robustness


Descriptive method names and parameter types make code more intuitive and easier to understand
Overall Advantages for QA Automation Frameworks? ❓❓
- Improves framework readability
- Reduces code duplication
- Adapts to different scenarios and data types seamlessly
- Makes tests more robust and adaptable to dynamic elements
- Enhances the overall quality of test automation


1. Give me examples of oops that you used in your framework.

</details>
