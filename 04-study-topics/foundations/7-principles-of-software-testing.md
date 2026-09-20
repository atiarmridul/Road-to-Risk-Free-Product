# 7 Principles of Software Testing

> **সহজভাবে / In simple words:** The seven testing principles are simple lessons about the limits and purpose of software testing.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** They help you choose realistic testing goals instead of trying to prove that software has no defects.


According to the ISTQB (International Software Testing Qualifications Board), the seven principles of software testing are:

- **Testing shows the presence of defects:** This principle, which helps to set stakeholder expectations, means that you shouldn't guarantee that the software is error-free.
- **Exhaustive testing is impossible:** The truth is that you can't test everything, i.e., every combination of preconditions and inputs. And if you try to do so you'll waste time and money, but it won't affect the overall quality of the software.
- **Early testing:** When it comes to the software development lifecycle, testing early is the key to identifying any defects in the requirements or design phase as soon as possible.
- **Defect clustering:** approximately 80% of the issues are found in 20% of the components.
- **Pesticide paradox:** you continuously run the same tests, and eventually they'll fail to find new defects, even though they'll probably confirm the software is working.
- **Testing is context-dependent:** Software testing is all about the context, which means that no one strategy will fit every scenario. Put simply, what you're testing will always affect the approach you use.
- **Absence-of-errors fallacy:** Even though your software might have relatively few issues, doesn't mean it is ready to ship; it also has to meet your customer's requirements and expectations.

## Testing shows the presence of defects

You test software to identify problems so you can fix them before you deploy the software to production environments. However, this process doesn't mean that there aren't any bugs in the product. It just means that there may be bugs, but you didn't find them.

There could be any number of reasons that you didn't uncover every bug, including the fact that the test cases didn't cover every scenario.

This principle, which helps to set stakeholder expectations, means that you shouldn't guarantee that the software is error-free.

## Exhaustive testing is impossible

The truth is that you can't test everything, i.e., every combination of preconditions and inputs. And if you try to do so you'll waste time and money, but it won't affect the overall quality of the software.

What you need to do is assess risk and plan your tests around these risks so you can be sure you're testing the key functions. Careful planning and assessment ensures your test coverage is good so you can have confidence in your final product — and you don't even have to test every individual line of code.

## Early testing

When it comes to the software development lifecycle, testing early is the key to identifying any defects in the requirements or design phase as soon as possible. It's much easier and less expensive to fix bugs in the early stages of testing than at the end of the software lifecycle as then you might have to rewrite entire areas of functionality. And that likely means missed deadlines and cost overruns.

## Defect clustering

Defect clustering is the idea that a small number of software modules or components contain the most defects — sort of applying the Pareto Principle to software testing, i.e., approximately 80% of the issues are found in 20% of the components.

Understanding this can help in your testing because if you find one defect in a particular area, you'll likely find more in that same module. If you identify the complex areas that are changing the most or the ones that have more dependencies, you can focus your testing on these key areas of risk.

## Pesticide paradox

This principle centers around the theory that if you repeatedly use a particular pesticide on your crops, the insects you're trying to kill or repel will eventually become immune to the pesticide and it will no longer be effective.

Likewise, if you continuously run the same tests, eventually they'll fail to find new defects, even though they'll probably confirm the software is working.

Consequently, you must continue to review your tests as well as add to your scenarios or modify them to help prevent this pesticide paradox. For example, maybe you could use a variety of testing techniques, methods, and approaches simultaneously.

## Testing is context dependent

Software testing is all about the context, which means that no one strategy will fit every scenario. The types of testing and the methods you use totally depend on the context of the systems or the software, e.g., the testing of an iOS application is different from the testing of an e-commerce website. Put simply, what you're testing will always affect the approach you use.

## Absence-of-errors fallacy

If your software is 99% error-free but it doesn't follow your user's requirements, it's still not usable. That's why it's critical to run tests that pertain to the requirements of the system. Software testing isn't just about finding bugs, it's about ensuring that the software meets the user's needs and requirements.

As such, you should also test your software with the users. You can test against early prototypes at the usability testing phase so you can get feedback from the users that you can use to ensure the software is usable. Even though your software might have relatively few issues, doesn't mean it is ready to ship; it also has to meet your customer's requirements and expectations.

---

## Seven Principles: complete Notion material

> Notion deep dive: https://app.notion.com/p/066579739eb740b1b1109bff892197db
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

### 7 Principles of Software Testing (Software Testing এর ৭টি মূলনীতি)
According to ISTQB (International Software Testing Qualifications Board), software testing এর ৭টি গুরুত্বপূর্ণ principle রয়েছে। এগুলো testing strategy এবং quality assurance বুঝতে সাহায্য করে।
---
### 1. Testing Shows the Presence of Defects
#### মূল ধারণা
Testing প্রমাণ করে যে software এ defect আছে কিনা, কিন্তু এটি কখনো guarantee দেয় না যে software সম্পূর্ণ bug free।
#### ব্যাখ্যা
আমরা testing করি সমস্যা খুঁজে বের করার জন্য যাতে production এ যাওয়ার আগে fix করা যায়। কিন্তু সব bug পাওয়া সম্ভব না।
কারণ:
- সব scenario test করা হয় না
- কিছু edge case বাদ যেতে পারে
- test coverage limited হতে পারে
#### Important Point
Testing can show the presence of defects, not the absence of defects.
---
### 2. Exhaustive Testing is Impossible
#### মূল ধারণা
সব possible input, condition এবং scenario test করা practically impossible।
#### ব্যাখ্যা
যদি সব combination test করতে যাই:
- অনেক সময় লাগবে
- cost বেড়ে যাবে
- project delay হতে পারে
তাই risk-based testing ব্যবহার করা হয়।
#### Focus Areas
- Critical functionality
- High-risk modules
- Frequently used features
---
### 3. Early Testing
#### মূল ধারণা
Testing যত early stage এ শুরু করা যায় তত ভালো।
#### ব্যাখ্যা
Requirement phase বা design phase এ bug পাওয়া গেলে fix করা সহজ ও কম খরচ হয়।
Late stage এ defect পাওয়া গেলে:
- Rework বেশি লাগে
- Cost বেড়ে যায়
- Deadline miss হতে পারে
---
### 4. Defect Clustering
#### মূল ধারণা
অধিকাংশ defect কিছু নির্দিষ্ট module এ বেশি পাওয়া যায়।
#### Explanation
Pareto Principle অনুযায়ী:
```plain text
80% defects are found in 20% modules
```
#### Testing Strategy
যে module:
- বেশি complex
- frequently changed
- বেশি dependency আছে
সেগুলোতে বেশি focus দিতে হবে।
---
### 5. Pesticide Paradox
#### মূল ধারণা
একই test বারবার run করলে নতুন defect খুঁজে পাওয়া কমে যায়।
#### Solution
- Test case update করা
- নতুন scenario যোগ করা
- Different testing techniques ব্যবহার করা
---
### 6. Testing is Context Dependent
#### মূল ধারণা
সব project এর জন্য একই testing approach কাজ করে না।
#### Example
- Banking software testing ≠ Gaming app testing
- E-commerce testing ≠ Mobile app testing
---
### 7. Absence-of-Errors Fallacy
#### মূল ধারণা
Software এ কম bug থাকলেই software successful হবে এমন না।
#### ব্যাখ্যা
যদি software user requirement fulfill না করে তাহলে bug কম থাকলেও software useful না।
---
### Quick Revision Notes (দ্রুত রিভিশন)
<table header-row="true">
<tr>
<td>Principle</td>
<td>Key Idea</td>
</tr>
<tr>
<td>Testing shows defects</td>
<td>Bug থাকতে পারে</td>
</tr>
<tr>
<td>Exhaustive testing impossible</td>
<td>সব test করা সম্ভব না</td>
</tr>
<tr>
<td>Early testing</td>
<td>Early bug fix কম cost</td>
</tr>
<tr>
<td>Defect clustering</td>
<td>কিছু module এ বেশি bug</td>
</tr>
<tr>
<td>Pesticide paradox</td>
<td>Same test নতুন bug খুঁজে পায় না</td>
</tr>
<tr>
<td>Context dependent</td>
<td>Different project = different testing</td>
</tr>
<tr>
<td>Absence-of-errors fallacy</td>
<td>User requirement গুরুত্বপূর্ণ</td>
</tr>
</table>
---
### Important Interview Questions
- What are the 7 principles of software testing?
- Explain defect clustering.
- What is pesticide paradox?
- Why is exhaustive testing impossible?
- Why is early testing important?
- What is absence-of-errors fallacy?

</details>
