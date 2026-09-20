# Defects, Verification, and Validation

> **সহজভাবে / In simple words:** Manual testing uses human observation and reasoning to explore and evaluate software.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** People are especially valuable for new features, usability, ambiguity, and unexpected behavior.
---

## Manual Testing Knowledge: complete Notion material

> Notion deep dive: https://app.notion.com/p/0928bd8b409942d48882a39b31cd71a1
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

### 📘 Manual Testing Learning Roadmap
#### 🐞 Group 1: Defects, Bugs & Failures
##### [20 Types of Software Defects Every Tester Should Know](https://www.testingmind.com/20-types-of-software-defects-every-tester-should-know/)
##### **Definition of Defect of a Computer Program**
**The terms bug and defect are often equated, and for good reason.** Indeed, both words mean a coding error in a digital solution, negatively affecting its functionality. The whole difference is:
- **An error** is a mistake made by a programmer during coding.
- **A bug is an error** detected in the **development environment** during the testing stage.
![](https://media.geeksforgeeks.org/wp-content/uploads/20230131183145/Bug-Defect-Life-Cycle-1.png)
- **A defect is a mismatch** between the expected and actual result of software development, detected by a software developer or end customer in the **production environment**.
- **Failure** is called an error that is found by the end user.

Defects are also of different types and arise due to different causes. We will consider it a little bit later. But the while: **Why do software defects occur?**
![]([Notion-hosted image omitted because its URL expires])
---
#### ✅ Group 2: Verification & Validation
<callout color="gray_bg">
	### **Differences between Verification and Validation**
</callout>
<table>
<tr>
<td>**Criteria **</td>
<td>**Verification**</td>
<td>**Validation**</td>
</tr>
<tr>
<td>**Definition**</td>
<td>Verification refers to the set of activities that ensure software correctly implements the specific function</td>
<td>Validation refers to the set of activities that ensure that the software that has been built is traceable to customer requirements.</td>
</tr>
<tr>
<td>**Focus**</td>
<td>It includes checking documents, designs, codes, and programs.</td>
<td>It includes testing and validating the actual product.</td>
</tr>
<tr>
<td>**Type of Testing**</td>
<td>Verification is the [**static testing**](https://www.geeksforgeeks.org/software-testing-static-testing/).</td>
<td>Validation is dynamic testing.</td>
</tr>
<tr>
<td>**Execution**</td>
<td>It does *not* include the execution of the code.</td>
<td>It includes the execution of the code.</td>
</tr>
<tr>
<td>**Methods Used**</td>
<td>Methods used in verification are reviews, [**walkthroughs**](https://www.geeksforgeeks.org/walkthrough-in-software-engineering/), inspections and desk-checking.</td>
<td>Methods used in validation are Black Box Testing, White Box Testing and non-functional testing.</td>
</tr>
<tr>
<td>**Purpose**</td>
<td>It checks whether the software conforms to specifications or not.</td>
<td>It checks whether the software meets the requirements and expectations of a customer or not.</td>
</tr>
<tr>
<td>**Bug**</td>
<td>It can find the [**bugs**](https://www.geeksforgeeks.org/bugs-in-software-testing/) in the early stage of the development.</td>
<td>It can only find the bugs that could not be found by the verification process.</td>
</tr>
<tr>
<td>**Goal**</td>
<td>The goal of verification is application and software architecture and specification.</td>
<td>The goal of validation is an actual product.</td>
</tr>
<tr>
<td>**Responsibility**</td>
<td>Quality assurance team does verification.</td>
<td>Validation is executed on software code with the help of testing team.</td>
</tr>
<tr>
<td>**Timing**</td>
<td>It comes before validation.</td>
<td>It comes after verification.</td>
</tr>
<tr>
<td>**Human or Computer**</td>
<td>It consists of checking of documents/files and is performed by human.</td>
<td>It consists of execution of program and is performed by computer.</td>
</tr>
<tr>
<td>**Lifecycle**</td>
<td>After a valid and complete specification the verification starts.</td>
<td>Validation begins as soon as project starts.</td>
</tr>
<tr>
<td>**Error Focus**</td>
<td>Verification is for prevention of errors.</td>
<td>Validation is for detection of errors.</td>
</tr>
<tr>
<td>**Another Terminology**</td>
<td>Verification is also termed as white box testing or static testing as work product goes through reviews.</td>
<td>Validation can be termed as black box testing or dynamic testing as work product is executed.</td>
</tr>
<tr>
<td>**Performance**</td>
<td>Verification finds about 50 to 60% of the defects.</td>
<td>Validation finds about 20 to 30% of the defects.</td>
</tr>
<tr>
<td>**Stability**</td>
<td>Verification is based on the opinion of reviewer and may change from person to person.</td>
<td>Validation is based on the fact and is often stable.</td>
</tr>
<tr>
<td>**Real-World Example**</td>
<td> Imagine a team developing a new mobile banking app. During verification, they review requirements and design documents. They ensure all specified features—such as fund transfers, account balance checks, and transaction history—are included and correctly detailed in the design. The team conducts peer reviews and inspections to confirm the design aligns with requirements. This step verifies that the app is being built according to the initial plan and specifications without actually running it.</td>
<td>In the validation phase, the team tests the mobile banking app on actual devices. They verify that users can log in, transfer money, and view their transaction history as intended. Testers conduct usability tests to ensure the app is user-friendly and perform functional tests to confirm all features work correctly. They may also involve real users to provide feedback on the app's performance. This phase validates that the app works as expected and meets user needs in real-world scenarios.</td>
</tr>
</table>

---
