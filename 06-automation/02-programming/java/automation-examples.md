# Java OOP for Test Automation

> Apply the concepts from [Java OOP fundamentals](fundamentals.md) to automation code.

## Java Oop: complete Notion material

> Notion deep dive: https://app.notion.com/p/50ceb8f6cfee45c38184b029b20cdf91
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

## ☕ OOP in Java & Playwright Learning Roadmap
### 📚 Learning Flow
1️⃣ What is OOP?
2️⃣ Classes & Objects
3️⃣ Encapsulation
4️⃣ Inheritance
5️⃣ Polymorphism
6️⃣ Abstraction
7️⃣ Benefits of OOP
8️⃣ OOP in Playwright
9️⃣ Interview Notes
---
### 🧒 Group 1: What is OOP?
#### 🤔 Simple Definition
OOP মানে programming-কে real world জিনিসের মতো organize করা।
আমরা যেভাবে বাস্তব জীবনে বিভিন্ন object দেখি, OOP-এও code সেইভাবে সাজানো হয়।
#### 🧒 Small Child Example
ধরো LEGO blocks দিয়ে house বানাচ্ছো।
🟦 প্রতিটি block-এর আলাদা কাজ আছে
🏠 সব block মিলে house তৈরি হয়
Programming-এও ছোট ছোট class মিলে বড় application তৈরি হয়।
ঠিক একইভাবে OOP-এ:
- Class = Blueprint
- Object = Real thing
---
## 🧱 Core OOP Concepts
### 🧱 Group 2: Classes & Objects
#### ⭐ What is Class & Object?
Classes are blueprints that define the properties and behaviors of objects. An object is an instance of a class, representing a specific realization of the blueprint with its own unique state and behavior. This allows for creating and managing multiple instances with similar structures but different data.
#### 🚗 Real Life Example
Class = Car blueprint
Object = Real car
এক blueprint থেকে অনেক car তৈরি করা যায়।
---
### 🔒 Group 3: Encapsulation
#### ⭐ Encapsulation:
Encapsulation involves bundling the data (attributes) and the methods that operate on the data into a single unit (a class). It restricts direct access to some of the object's components, which can prevent unintended interference and misuse of the data. By providing access methods (getters and setters), encapsulation ensures that data is accessed and modified in a controlled manner.
🧒 Example:
ধরো chocolate box lock করা আছে।
তুমি শুধু বাইরে থেকে open button ব্যবহার করতে পারো।
ভিতরের সবকিছু hidden থাকে।
ঠিক একইভাবে encapsulation data protect করে।
---
### 👨‍👦 Group 4: Inheritance
#### ⭐ Inheritance:
Inheritance allows a new class to inherit properties and behaviors from an existing class. This promotes code reuse by enabling the creation of a new class based on an existing class, called the parent or superclass. The new class, known as the child or subclass, can extend or modify the inherited features and add new ones. This hierarchical relationship helps in organizing code and building upon existing functionality.
![]([Notion-hosted image omitted because its URL expires])
[Java Bangla Tutorials 127 : Inheritance (Theory) (youtube.com)](https://www.youtube.com/watch?v=4HbOzg4aWFk&list=PLeZMjV76KKKVxUvqqofY9VQZYBP5MPKW4)
[Java Bangla Tutorials 128 : Inheritance (practical) (youtube.com)](https://www.youtube.com/watch?v=XZO7OMMFMl8&list=PLeZMjV76KKKVxUvqqofY9VQZYBP5MPKW4&index=2)
[Java Bangla Tutorials 129 : Inheriting Private Member \| setters, getters (youtube.com)](https://www.youtube.com/watch?v=tF0JZVWr3IQ&list=PLeZMjV76KKKVxUvqqofY9VQZYBP5MPKW4&index=3)
🧒 Example:
ধরো বাবার কিছু বৈশিষ্ট্য ছেলে inherit করেছে।
যেমন:
- চোখ
- চুল
- height
ঠিক একইভাবে child class parent class-এর feature নেয়।
#### 🇧🇩 সহজ বাংলায় Inheritance
ধরুন একটি `Employee` class আছে।
তার common feature:
- name
- id
- salary
এখন `QAEngineer` class এবং `Developer` class এই feature inherit করতে পারে।
তখন common জিনিস বারবার লিখতে হয় না।
এতে code ছোট ও reusable হয়।
---
### 🎭 Group 5: Polymorphism
#### ⭐ Polymorphism:
Polymorphism allows objects to be treated as instances of their parent class rather than their actual class. It provides the ability to use a single method name to perform different tasks based on the object’s actual class. This is achieved through:
**Method Overloading**: Defining multiple methods with the same name but different parameter lists within the same class. This enables the use of the same method name to perform various functions based on the arguments passed.
**Method Overriding**: Redefining a method in a subclass that has already been defined in its superclass. This allows a subclass to provide a specific implementation of a method that is already defined in its superclass, enhancing the method’s functionality for the subclass.
![]([Notion-hosted image omitted because its URL expires])
[Java Bangla Tutorials 144 : Polymorphism (Theory) (youtube.com)](https://www.youtube.com/watch?v=AlTTlEj2Z78)
🧒 Example:
ধরো TV remote-এর একটা power button আছে।
একই button:
- TV on করতে পারে
- TV off করতে পারে
Same button → different behavior.
এটাই polymorphism.
#### 🇧🇩 সহজ বাংলায় Polymorphism
একই মানুষ বিভিন্ন role পালন করতে পারে।
যেমন:
- অফিসে → Manager
- বাসায় → Father
- বন্ধুর সাথে → Friend
Person একই কিন্তু behavior context অনুযায়ী change হয়।
Programming-এও same method different behavior দেখাতে পারে।
---
### 🎩 Group 6: Abstraction
#### ⭐ Abstraction:
Abstraction involves defining abstract classes or interfaces that provide a common interface for a group of related classes. It focuses on exposing only the relevant features of an object while hiding the complex implementation details. This helps in designing systems where the internal workings are hidden, and only the essential aspects are exposed to the user, facilitating easier management and scalability.

🧒 Example:
তুমি car drive করো কিন্তু engine ভিতরে কিভাবে কাজ করে তা জানো না।
তুমি শুধু প্রয়োজনীয় button ব্যবহার করো।
এটাই abstraction.
#### 🇧🇩 সহজ বাংলায় Abstraction
ধরুন আপনি food delivery app ব্যবহার করেন।
আপনি শুধু:
- খাবার select করেন
- order দেন
- payment করেন
কিন্তু ভিতরে:
- restaurant কীভাবে খাবার তৈরি করছে
- rider কীভাবে route নিচ্ছে
- server কীভাবে data process করছে
এসব আপনি দেখেন না।
User শুধু প্রয়োজনীয় জিনিস দেখে।
এটাই abstraction.
---
## 🚀 Why Companies Use OOP
### 🚀 Group 7: Benefits of OOP
#### 🚀 Benefits of OOP:
- Reusability: Leverage existing classes to build new functionalities, reducing redundancy and saving time.
- Maintainability: Simplify updates and fixes by managing code in modular units (classes).
- Flexibility: Adapt and extend code with minimal disruption through inheritance and polymorphism.
---
## 🎭 OOP in Automation Testing
### 🎭 Group 8: OOP in Playwright Framework
#### 🎭 OOP in Playwright = Cleaner, Smarter Test Automation
### 🤔 Why OOP is Important in Playwright?
অনেক সময় automation script শুরুতে ছোট থাকে। কিন্তু project বড় হলে:
❌ Code messy হয়ে যায়
❌ Reuse কঠিন হয়ে যায়
❌ Maintenance করতে বেশি সময় লাগে
OOP ব্যবহার করলে framework হয়:
✅ Clean
✅ Reusable
✅ Scalable
✅ Easy to maintain
---
#### 🧱 Page Object Model (POM)
POM হলো Playwright-এর সবচেয়ে জনপ্রিয় OOP design pattern।
এখানে প্রতিটি page আলাদা class হিসেবে তৈরি করা হয়।
Example:
- LoginPage
- DashboardPage
- CheckoutPage
বাংলা Example:
ধরুন স্কুলের প্রতিটি room-এর আলাদা দায়িত্ব আছে।
📚 Library Room → বই রাখে
🧪 Lab Room → experiment করে
🏫 Classroom → পড়াশোনা হয়
তেমনি প্রতিটি page class-এর আলাদা কাজ থাকে।
#### ✅ সুবিধা:
- একই locator বারবার লিখতে হয় না
- এক জায়গা থেকে update করা যায়
- Test readable হয়
---
#### 🔒 Encapsulation in Playwright
Encapsulation মানে locator এবং method একই class-এর ভিতরে রাখা।
Example:
```java
class LoginPage {
   usernameInput
   passwordInput
   loginButton

   login()
}
```
বাংলা Example:
ATM machine-এর ভিতরের system আপনি দেখেন না।
আপনি শুধু button ব্যবহার করেন।
তেমনি test শুধু method call করবে, ভিতরের locator নিয়ে ভাবতে হবে না।
---
#### ♻️ Reusability
একবার method লিখে অনেক test case-এ ব্যবহার করা যায়।
Example:
```java
loginPage.login();
```
এখন সব test একই login method ব্যবহার করতে পারবে।
#### ✅ সুবিধা:
- Duplicate code কমে
- Maintenance সহজ হয়
- Time save হয়
---
#### 🧩 Fixtures & Dependency Injection
Playwright fixtures reusable objects test-এ inject করতে সাহায্য করে।
Example:
```javascript
test('login test', async ({ page, loginPage }) => {

});
```
বাংলা Example:
মা আগে থেকেই আপনার school bag প্রস্তুত করে দিলো।
আপনাকে শুধু ব্যবহার করতে হবে।
Fixture-ও test-এর জন্য প্রয়োজনীয় object ready করে দেয়।
---
#### 📈 Scalability
Project বড় হলে structure খুব important হয়ে যায়।
#### ❌ Without OOP:
- Tests tightly coupled হয়ে যায়
- Debugging কঠিন হয়
- Maintenance cost বেড়ে যায়
#### ✅ With OOP:
- Framework organized থাকে
- New feature automation সহজ হয়
- Team collaboration improves
---
