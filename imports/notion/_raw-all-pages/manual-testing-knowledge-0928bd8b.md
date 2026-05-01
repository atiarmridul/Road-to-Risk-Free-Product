# Manual testing knowledge 

### [20 Types of Software Defects Every Tester Should Know](https://www.testingmind.com/20-types-of-software-defects-every-tester-should-know/)

### **Definition of Defect of a Computer Program**

**The terms bug and defect are often equated, and for good reason.** Indeed, both words mean a coding error in a digital solution, negatively affecting its functionality. The whole difference is:

- **An error** is a mistake made by a programmer during coding.

- **A bug is an error** detected in the **development environment** during the testing stage.

[image](https://media.geeksforgeeks.org/wp-content/uploads/20230131183145/Bug-Defect-Life-Cycle-1.png)

- **A defect is a mismatch** between the expected and actual result of software development, detected by a software developer or end customer in the **production environment**.

- **Failure** is called an error that is found by the end user.

Defects are also of different types and arise due to different causes. We will consider it a little bit later. But the while: **Why do software defects occur?**

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/7f618752-b30d-4401-991e-d3d336de9327/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKPXP5AB%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIC0E6TBm9xBQE0O4hsWA9V4%2FJdirmMyB6ChXpOmlIbGUAiAmKHgw%2B1Va%2BAJiwruRcPQsSjkdiGuLrfTU6uZ5KvOV5ir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMpGavwg1xo2WDekhBKtwDlmQVXNNKgKyPxuxutueR%2BNBvMeCof5QiX3weGyZ0Q58eNx4HtTLq5QjP%2BdzPZ134aAWQ%2FlUEh0a%2B1ozC4U161lBCO%2BBeImnlTu6pvWHppkYCzilvBzdfjZYg3x7Zr61EKzn9vQQfzOiu9zotcO05Sg9H0Wh89lHc8Y4MNXGBs1ykFKwqyAHOHBEBfS17%2Bs7C978Q5misWDSoe%2BxwDUY%2BHMm0VsHcK3YccZLagtj%2FryAFKUrLCLpsbL%2FPL3W4inkCBDHIif%2FOVr0hn%2BiRaypDR08QxNsCvDVp4pPI1sMSF8LYp9AEXSNu%2BXKZ9jTzm7eaf8eZSzWrPg7dY%2FyncexWsbkp8iGfpBN6nBth5YeyqnXZNPU7%2BelJl%2BZtYNf%2Bktchq1mD09Bzww69kGPtPcxXtG%2FdnJXG0IeSvvzYBAXh9jvuTHrSxjp3rtd7hwki2NhxDBWy43GpG0L4bFJ5i%2BJsQG%2FsR4iKSRO39BSvUpF3HFwWtBqvsv%2FOYZZXr7Ydv%2F%2BRMWtnqaOzfY%2B%2B2lAO2sqXUrS4wRnvVignGycfC37qkKjnlHAN%2BvEOjauB%2BRuvGVGLN8Uh17PUUDfZrVmuTlcN%2FCYEL8jmWxWR9Iua7Chfigv2EqkUOvpLxFf7s%2F8wsqjSzwY6pgFen01Uz7dQavIt%2FnyktNIHgvpGp%2BSuUurn5g85PvZYv0bAsieHk9GxOBjCOGb3L6tcSvitT7fwvyReClJl4uRmL9%2FXYJivOJ2pOCIZWlXdh3kpyxpz4gqqUgfPkG8aip3Bj9bRDtgY9O6fjnuox48iG0Xi4EdiYg77dFoL48KtiE%2F4mUEx2XK48tkJnbM5OOR6vi0xLmbljQDvUbiJel%2FsNDPDDU0E&X-Amz-Signature=fdd2ba995e6111edab9aab0d5ae2460269b462d3e1aade9c76e3c23b02195c66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **Differences between Verification and Validation**

### **The Different Types of Test Case Design Techniques**

**Test case design techniques allow QA engineers to design better test cases, reduce the number of test cases to be executed, and increase testing coverage.**

  - **Specific-Based Techniques (Black Box Techniques)**

  - **Boundary value analysis (BVA)**

  - **Equivalence partitioning (EP)**

  - **Decision table testing**

  - **State transition diagrams**

  - **Use case testing**

  Equivalence partitioning is a technique of software testing in which input data is divided into partitions of valid and invalid values, and it is mandatory that all partitions exhibit the same behavior. If a condition of one partition is true, then the condition of another equal partition must also be true, and if a condition of one partition is false, then the condition of another equal partition must also be false. The principle of equivalence partitioning is, that test cases should be designed to cover each partition at least once. Each value of every equal partition must exhibit the same behavior as others.

---

### Boundary Value Analysis

Boundary value analysis is one of the widely used case design techniques for black box testing. It is used to test boundary values because the input values near the boundary have higher chances of error.

Whenever we do the testing by boundary value analysis, the tester focuses on, while entering boundary value whether the software is producing correct output or not.

Boundary values are those that contain the upper and lower limits of a variable. Assume that, age is a variable of any function, and its minimum value is 18 and the maximum value is 30, both 18 and 30 will be considered as boundary values.

The basic assumption of boundary value analysis is, the test cases that are created using boundary values are most likely to cause an error.

There is 18 and 30 are the boundary values, which is why the tester pays more attention to these values, but this doesn't mean that the middle values like 19, 20, 21, 27, and 29 are ignored. Test cases are developed for each and every value of the range.

Testing of boundary values is done by making valid and invalid partitions. Invalid partitions are tested because testing of output in adverse conditions is also essential.

- A boundary value for a valid partition is a valid boundary value.

- A boundary value for an invalid partition is an invalid boundary value.

- For each variable we check-

  - Minimum value.

  - Just above the minimum.

  - Nominal Value.

  - Just below the maximum value.

  - Max value.

**Valid Test Cases: **Valid test cases for the above can be any value entered greater than 17 and less than 57.

- Enter the value- 18.

- Enter the value- 19.

- Enter the value- 37.

- Enter the value- 55.

- Enter the value- 56.

**Invalid Cases: **When any value less than 18 and greater than 56 is entered.

**Let's understand via practical:**

Imagine, there is a function that accepts a number between 18 to 30, where 18 is the minimum and 30 is the maximum value of a valid partition, the other values of this partition are 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 and 29. The invalid partition consists of the numbers which are less than 18 such as 12, 14, 15, 16, and 17, and more than 30 such as 31, 32, 34, 36, and 40. The tester develops test cases for both valid and invalid partitions to capture the behavior of the system on different input conditions.

[image](https://static.javatpoint.com/tutorial/software-testing/images/black-box-testing3.png)

The software system will be passed in the test if it accepts a valid number and gives the desired output, if it is not, then it is unsuccessful. In another scenario, the software system should not accept invalid numbers, and if the entered number is invalid, then it should display error massage.

If the software that is under test, follows all the testing guidelines and specifications then it is sent to the releasing team otherwise to the development team to fix the defects.

1. **Boundary Value Analysis (BVA)** identifies errors at the input domain’s boundary. A simple example of boundary value analysis would be testing a text box that requires the user to enter a number between 1 and 10. In this case, the boundary values would be 1 and 10, and we would test with values that are just above, at, and just below these boundaries. **For example, **we would test with 0, 1, 2, 9, 10, and 11. We can expect that errors or defects are most likely to occur at or near the boundary values. Identifying these issues early can help prevent them from causing problems later in the software development process.

1. **Equivalence Partitioning (EP)** is another technique that helps reduce the required test cases. By partitioning test input data into classes with an equivalent number of data, one can design test cases for each class or partition. This technique ensures that one thoroughly tests the software while minimizing the required test cases. **For example**, if a program requires an input of numbers between 1 and 100, an EP test would include a range of values, such as 1-50 and 51-100, and numbers outside that range, such as -1 or 101. Testing one value from each partition is sufficient to test all values within that partition.

---

### Equivalence Partitioning Method

**Equivalence Partitioning Method** is also known as [**Equivalence class**](https://www.geeksforgeeks.org/equivalence-class/) partitioning (ECP). It is a [**software testing**](https://www.geeksforgeeks.org/software-testing-basics/) technique or [**black-box testing**](https://www.geeksforgeeks.org/software-engineering-black-box-testing/) that divides the input domain into classes of data, and with the help of these classes of data, test cases can be derived. An ideal test case identifies a class of error that might require many arbitrary test cases to be executed before the general error is observed.

In equivalence partitioning, equivalence classes are evaluated for given input conditions. Whenever any input is given, the type of input condition is checked, and then for this input condition, the Equivalence class represents or describes the set of valid or invalid states.

**Guidelines for Equivalence Partitioning :**

- If the range condition is given as an input, then one valid and two invalid equivalence classes are defined.

- If a specific value is given as input, then one valid and two invalid equivalence classes are defined.

- If a member of a set is given as an input, then one valid and one invalid equivalence class is defined.

- If Boolean no. is given as an input condition, then one valid and one invalid equivalence class is defined.

[image](https://media.geeksforgeeks.org/wp-content/uploads/20200619141948/Untitled57567.png)

**Example-1:**

Let us consider an example of any college admission process. There is a college that gives admissions to students based on their percentage.

Consider a percentage field that will accept a percentage only between 50 to 90 %, more and even less than not be accepted, and the application will redirect user to an error page. If the percentage entered by user is less than 50 %or more than 90 %, that equivalence partitioning method will show an invalid percentage. If the percentage entered is between 50 to 90 %, then the equivalence partitioning method will show a valid percentage.

[image](https://media.geeksforgeeks.org/wp-content/uploads/20200619154049/Untitled454.png)

---

### **Combined Use of BVA and EP:**

- **Complementary Techniques:** BVA and EP are often used together. EP helps reduce the overall number of test cases by grouping inputs, while BVA focuses on edge cases, ensuring that the most error-prone values are tested.

- **Improved Defect Detection:** By combining EP for general input coverage and BVA for edge cases, testers can detect a wide range of defects efficiently.

---

### Traceability Matrix

A traceability matrix is a table-type document that is used in the development of software applications to trace requirements. It can be used for both forward (from Requirements to Design or Coding) and backward (from Coding to Requirements) tracing. It is also known as the **Requirement Traceability Matrix (RTM) or Cross Reference Matrix (CRM).**

It is prepared before the test execution process to make sure that every requirement is covered in the form of a Test case so that we don't miss out any testing. In the RTM document, we map all the requirements and corresponding test cases to ensure that we have written all the test cases for each condition.

This document is designed to make sure that each requirement has a test case, and the test case is written based on business needs, which are given by the client. It will be performed with the help of the test cases if any requirement is missing, which means that the test case is not written for a particular need and that specific requirement is not tested because it may have some bugs. The traceability is written to make sure that the entire requirement is covered.

Generally, this is like a worksheet document, which contains a table, but there are also many user-defined templates for the traceability matrix. Each requirement in the traceability matrix is connected with its respective test case so that tests can be carried out sequentially according to specific requirements.

### RTM Template

Below is the sample template of requirement traceability matrix (RTM):

[image](https://static.javatpoint.com/tutorial/software-testing/images/traceability-matrix3.png)

### Example of RTM template

Let us one sample of RTM template for better understanding:

[image](https://static.javatpoint.com/tutorial/software-testing/images/traceability-matrix4.png)

### Goals of Traceability Matrix

- It helps in tracing the documents that are developed during various phases of SDLC.

- It ensures that the software completely meets the customer's requirements.

- It helps in detecting the root cause of any bug.

---

### Decision Table

Decision table testing is a software testing technique used to test system behavior for different input combinations. This is a systematic approach where the different input combinations and their corresponding system behavior (Output) are captured in a tabular form.

**Decision Table Testing is Important** because it helps to test different combinations of conditions and provides better test coverage for complex business logic. When testing the behavior of a large set of inputs where system behavior differs with each set of inputs, decision table testing provides good coverage, and the representation is simple so it is easy to interpret and use.

In Software Engineering, boundary value and equivalent partition are other similar techniques used to ensure better coverage. They are used if the system shows the **same **behavior for a large set of inputs. However, in a system where for each set of input values the system behavior is **different**, boundary value and equivalent partitioning techniques are not effective in ensuring good test coverage.

In this case, decision table testing is a good option. This technique can make sure of good coverage, and the representation is simple so that it is easy to interpret and use.

**Example: How to make a Decision Table for the Upload Screen**

Now consider a dialogue box that will ask the user to upload a photo with certain conditions, like –

1. You can upload only ‘.jpg’ format images

1. file size less than 32kb

1. resolution 137*177.

If any of the conditions fail the system will throw a corresponding error message stating the issue, and if all conditions are met photo will be updated successfully

[image](https://www.guru99.com/images/1/120817_0759_DecisionTab2.png)

Let’s create the decision table for this case.

For this condition, we can create 8 different test cases and ensure complete coverage based on the above table.

1. Upload a photo with format ‘.jpg’, size less than 32kb, and resolution 137*177, and click on upload. The expected result is Photo should upload successfully

1. Upload a photo with format ‘.jpg’, size less than 32kb, and resolution not 137*177, and click on upload. The expected result is Error message resolution mismatch should be displayed

1. Upload a photo with format ‘.jpg’, size more than 32kb, and resolution 137*177, and click on upload. The expected result is Error message size mismatch should be displayed

1. Upload a photo with format ‘.jpg’, size more than equal to 32kb, and resolution not 137*177, and click on upload. The expected result is Error message size and resolution mismatch should be displayed

1. Upload a photo with a format other than ‘.jpg’, size less than 32kb, and resolution 137*177, and click on upload. The expected result is Error message for format mismatch should be displayed

1. Upload a photo with a format other than ‘.jpg’, size less than 32kb, and resolution not 137*177, and click on upload. The expected result is Error message format and resolution mismatch should be displayed

1. Upload a photo with a format other than ‘.jpg’, size more than 32kb, and resolution 137*177, and click on upload. The expected result is Error message for format and size mismatch should be displayed

1. Upload a photo with a format other than ‘.jpg’, size more than 32kb, and resolution not 137*177, and click on upload. The expected result is Error message for format, size, and resolution mismatch should be displayed

---

### **How to Ensure 100% Test Case Coverage of Requirements**

Creating comprehensive test scenarios and cases that ensure 100% coverage of requirements is a multi-faceted process involving several key strategies.

Let’s delve into a structured approach to achieve this, illustrated with an example and supported by insights from industry sources.

**1. Understanding the Requirements**

Begin by clearly understanding the software requirements. For instance, if the requirement is for a user authentication system, it should include details like

accepting username and password,

validating credentials,

handling incorrect inputs, etc.

**2. Developing User Personas**

Creating user personas helps envision how different users might interact with the software. This step is crucial in developing relevant test scenarios and cases.

For our example, personas might include

a first-time user,

a returning user with correct credentials,

a user who has forgotten their password.

**3. Identifying Test Scenarios**

Test scenarios are high-level ideas about what to test. For the authentication system, scenarios could include:

Successful login

Login with incorrect credentials

Login with empty credentials

Password recovery process

**4. Outlining Test Cases**

Test cases are specific actions to be performed in testing. For each scenario, develop test cases covering positive, negative, and edge cases.

For example:

Positive Test Case 1: Enter a valid username and password > Expect a successful login.

Negative Test Case 1: Enter an invalid username > Expect an error message.

Negative Test Case 2: Enter invalid password > Expect error message.

Edge Case 1: Enter maximum length allowed for username and password > Expect successful login or appropriate error message.

Edge Case 2: Leave username and password fields empty > Expect error message.

Edge Case 3: Exceed the limits of characters allowed for username and password fields > Expect error message.

**5. Incorporating Different Coverage Metrics**

Use various coverage metrics like statement coverage, branch coverage, and path coverage. These metrics ensure different aspects of code and functionalities are tested.

Statement Coverage

Ensuring every line of code in the login functionality is executed at least once.

Branch Coverage

Testing all branches of conditional logic in the login process.

It focuses on ensuring that each possible branch from each decision point in the code is executed at least once. This type of coverage is crucial for testing the decision-making logic of an application.

### What is the difference between QA and QC in Software Testing?

𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗕𝗲𝘁𝘄𝗲𝗲𝗻 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 𝗔𝘀𝘀𝘂𝗿𝗮𝗻𝗰𝗲 (𝗤𝗔) & 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 (𝗤𝗖)

### Quality Assurance (QA):

- A proactive approach to prevent defects and errors.

- Focuses on processes and procedures.

- Ensures compliance with standards and regulations.

- Identifies and mitigates risks.

- Continuously improves processes and methodologies.

- Emphasizes training and development.

### Quality Control (QC):

- Reactive approach to find, detect, and correct defects.

- Focuses on products and services.

- Verifies compliance with standards and regulations.

- Identifies and corrects errors and defects.

- Monitors and controls processes.

- Emphasizes inspection and testing.

QA is about building quality into processes. QC is about checking the quality of outputs

Both are essential for ensuring high-quality products and services!

### What is the severity and priority of a bug??

- **Severity** refers to the impact a bug has on the system or application. It reflects how serious the bug is from a technical standpoint. A QA engineer determines the severity level of a bug.

  Severity in software testing can be classified into 4 categories:

    1. **Critical: **This severity level implies that the process has been completely shut off, and no further action can be taken.

    1. **Major: **This is a significant flaw that causes the system to fail. However, certain parts of the system remain functional.

    1. **Medium: **This flaw results in unfavorable behavior, but the system remains functioning.

    1. **Low: **This type of flaw won’t cause any major breakdown in the system.

- **Priority** refers to the urgency with which the bug needs to be fixed. It reflects how soon the bug should be addressed from a business or user perspective.

  Priority in software testing can be divided into 3 categories:

    1. **Low: **The defect is irritant, but a repair can be done once the more serious defects are fixed.

    1. **Medium: **The defect should be resolved during the normal course of the development, but it can wait until a new version is created.

    1. **High: **The defect must be resolved as soon as possible, as it affects the system severely and cannot be used until it is fixed.

Let's break down each combination with examples:

**High Priority and High Severity**

**Example:**

- **Bug**: A critical payment processing feature fails during peak shopping hours.

- If the login button is not clickable, then the whole application is blocked, and none of the functions can be accessed by the user

**High Priority and Low Severity**

**Example:**

- **Bug**: The color of a button on a landing page is inconsistent with brand guidelines.

- Consider the example when there is a typo on the website. For example, the case of the school website where the ‘Admission Form’ is misspelled as ‘Amission Form’.

**Low Priority and High Severity**

**Example:**

- **Bug**: An error message that appears in a rarely used feature of the application.

- Consider the example of the application being used on the older versions of Internet Explorer, say IE8. This is a case of high severity and low priority.

**Low Priority and Low Severity**

**Example:**

- **Bug**: A typo in a non-essential help text.

- Consider the example of the help or faq section of the website, where the theme or font style of a section of the page does not match that of the rest of the page.

> **A transaction of $1 is not showing up in the target system – What priority & severity would you assign to the defect? If there is any workaround, will there be any change in priority & severity?**

Answer: low and low

### What is the Difference between bug leakage and bug release?

Bug leakage and bug release are two different terminologies. The whole QA process works around these two terms. We can differentiate between them as follows:

**Bug leakage**: Bug leakage is something when the bug is discovered by the end users or customers, and is missed by the testing team to detect while testing the software.

OR

A defect exists in the application and is not found by the tester, which is eventually found by the customer/end-user.

**Bug release**: A bug release is when a particular version of the software is released with a set of known bugs (s)/defects (s). These bugs are usually of low severity/priority. It is done when a software company can afford the existence of a bug in the released software rather than the time/cost of fixing it in that particular version.

### What is the difference between build and release?

- ***A build is an application that has been created for the customers and is given by the developer to the software testers.***

- ***The release is an official launch of the application for the customers.***

So, a **Build** becomes a **Release** once it has been reviewed and approved by the software testers and delivered to the customer. Multiple builds may be included in a single release.

### Difference between Authentication and Authorization with an example.

In the context of Quality Assurance (QA), authentication and authorization are crucial for ensuring that only the right individuals can access specific systems and perform certain actions. Here's a real-life example to illustrate these concepts:

### Example: Online Banking Application

**Scenario:**

An online banking application needs to ensure that users can securely access their accounts and perform operations like transferring funds, viewing account statements, or updating personal information.

**Authentication:**

1. **User Login:**

  - When a user wants to access their account, they first need to log in.

  - The QA team tests the authentication mechanism to ensure it correctly verifies user identities. This typically involves checking that the login process works with valid credentials and handles invalid credentials appropriately.

  - Example Test Cases:

    - **Valid Login:** Enter a valid username and password; the user should be granted access.

    - **Invalid Login:** Enter an incorrect username or password; the system should deny access and display an error message.

    - **Password Reset:** Test the password reset functionality to ensure it securely verifies the user's identity before allowing a password change.

**Authorization:**

1. **Access Control:**

  - Once authenticated, users need to be authorized to perform specific actions based on their roles (e.g., a regular user vs. an admin).

  - The QA team tests whether users can only perform actions they are permitted to, and that users with different roles have appropriate access.

  - Example Test Cases:

    - **Regular User:** Verify that a regular user can view their account balance, transfer funds, and view their transaction history, but cannot access administrative settings or view other users' accounts.

    - **Admin User:** Verify that an admin can access and manage user accounts, view system logs, and perform other administrative tasks.

    - **Role Changes:** Test scenarios where a user's role is changed (e.g., from regular user to admin) to ensure that their access permissions are updated correctly and immediately.

## 7 Principles of Software Testing

  According to the ISTQB (International Software Testing Qualifications Board), the seven principles of software testing are:

  - **Testing shows the presence of defects: **This principle, which helps to set stakeholder expectations, means that you shouldn't guarantee that the software is error-free.

  - **Exhaustive testing is impossible:** The truth is that you can't test everything, i.e., every combination of preconditions and inputs. And if you try to do so you'll waste time and money, but it won't affect the overall quality of the software.

  - **Early testing: **When it comes to the software development lifecycle, testing early is the key to identifying any defects in the requirements or design phase as soon as possible.

  - **Defect clustering:** approximately 80% of the issues are found in 20% of the components.

  - **Pesticide paradox: ** you continuously run the same tests, and eventually they'll fail to find new defects, even though they'll probably confirm the software is working.

  - **Testing is context-dependent: **Software testing is all about the context, which means that no one strategy will fit every scenario. Put simply, what you're testing will always affect the approach you use.

  - **Absence-of-errors fallacy: **Even though your software might have relatively few issues, doesn't mean it is ready to ship; it also has to meet your customer's requirements and expectations.

### **Testing shows the presence of defects**

  You test software to identify problems so you can fix them before you deploy the software to production environments. However, this process doesn't mean that there aren't any bugs in the product. It just means that there may be bugs, but you didn't find them.

  There could be any number of reasons that you didn't uncover every bug, including the fact that the test cases didn't cover every scenario.

  This principle, which helps to set stakeholder expectations, means that you shouldn't guarantee that the software is error-free.

### **Exhaustive testing is impossible**

  The truth is that you can't test everything, i.e., every combination of preconditions and inputs. And if you try to do so you'll waste time and money, but it won't affect the overall quality of the software.

  What you need to do is assess risk and plan your tests around these risks so you can be sure you're testing the key functions. Careful planning and assessment ensures your test coverage is good so you can have confidence in your final product — and you don't even have to test every individual line of code.

### **Early testing**

  When it comes to the software development lifecycle, testing early is the key to identifying any defects in the requirements or design phase as soon as possible. It's much easier and less expensive to fix bugs in the early stages of testing than at the end of the software lifecycle as then you might have to rewrite entire areas of functionality. And that likely means missed deadlines and cost overruns.

### **Defect clustering**

  Defect clustering is the idea that a small number of software modules or components contain the most defects — sort of applying the Pareto Principle to software testing, i.e., approximately 80% of the issues are found in 20% of the components.

  Understanding this can help in your testing because if you find one defect in a particular area, you'll likely find more in that same module. If you identify the complex areas that are changing the most or the ones that have more dependencies, you can focus your testing on these key areas of risk.

### **Pesticide paradox**

  This principle centers around the theory that if you repeatedly use a particular pesticide on your crops, the insects you're trying to kill or repel will eventually become immune to the pesticide and it will no longer be effective.

  Likewise, if you continuously run the same tests, eventually they'll fail to find new defects, even though they'll probably confirm the software is working.

  Consequently, you must continue to review your tests as well as add to your scenarios or modify them to help prevent this pesticide paradox. For example, maybe you could use a variety of testing techniques, methods, and approaches simultaneously.

### Testing is context dependent

  Software testing is all about the context, which means that no one strategy will fit every scenario. The types of testing and the methods you use totally depend on the context of the systems or the software, e.g., the testing of an iOS application is different from the testing of an e-commerce website. Put simply, what you're testing will always affect the approach you use.

### **Absence-of-errors fallacy**

  If your software is 99% error-free but it doesn't follow your user's requirements, it's still not usable. That's why it's critical to run tests that pertain to the requirements of the system. Software testing isn't just about finding bugs, it's about ensuring that the software meets the user's needs and requirements.

  As such, you should also test your software with the users. You can test against early prototypes at the usability testing phase so you can get feedback from the users that you can use to ensure the software is usable. Even though your software might have relatively few issues, doesn't mean it is ready to ship; it also has to meet your customer's requirements and expectations.

## Software Development Life Cycle

  > **What is SDLC and STLC? And Explain its phases.**

  The **Software Development Life Cycle (SDLC)** consists of a precise plan that describes how to develop, maintain, replace, and enhance specific software. The life cycle defines a method for improving the quality of software and the all-around development process.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/80c0c4fa-e08d-4239-86bc-a900eeaa2abd/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=881fa5ff3f7b8bc61ad185c8361e49b8abb8e3248f946d74cc3fffc06b2153fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  The **Software Testing Life Cycle (STLC)** is a systematic approach to testing a software application to ensure that it meets the requirements and is free of defects.

  **The purpose of testing is to ensure that it meets the requirements and is free of defects. **

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/364a0800-5428-4abe-9afe-b82e40894e63/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=f811652a19bcee65081e23220f0f22425b0e8723c40255c3edd71b69ed0a1f0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

## Software Development Life Cycle Models

  To this day, we have **more than 50 **recognized **SDLC models** in use. But **None of them is perfect**, and each brings its favorable aspects and disadvantages for a specific software development project or a team.

  Here, we have listed the **top five **[**most popular SDLC models**](https://www.geeksforgeeks.org/top-8-software-development-models-used-in-industry/?ref=):

#### **1. Waterfall Model**

  It is the fundamental model of the software development life cycle. This is a very simple model. The [**waterfall model **](https://www.geeksforgeeks.org/software-engineering-classical-waterfall-model)is not in practice anymore, but it is the basis for all other SDLC models. Because of its simple structure, the waterfall model is easier to use and provides a tangible output. In the waterfall model, once a phase seems to be completed, it cannot be changed, and due to this less flexible nature, the waterfall model is not in practice anymore.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/a094a3f0-84c6-4825-b623-e602cad1ca5b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=b1cd9924b723d986faa081aceaf78f79371fe58b08548b31b50206ed757bf6fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **2. Agile Model**

  The agile model in SDLC was mainly designed to adapt to changing requests quickly. The main goal of the **Agile model** is to facilitate quick project completion. The agile model refers to a group of development processes. These processes have some similar characteristics but also possess certain subtle differences among themselves.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/691dd61f-94b8-4d2d-9c26-1c2fdccf3765/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=99607f14a1a3d4d19396ebcaf0cd6108f640ca46e8bf349e50e97635ea155a02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  • **Scrum**: This is the most popular agile development method. [Scrum](https://www.orientsoftware.com/how-we-work/scrum-the-team/) involves dividing the project into sprints and using cross-functional teams to complete tasks within those sprints. The main goal is to get working software into the hands of customers as quickly as possible.

  The Agile Software Development Life Cycle (SDLC) offers several key benefits that enhance software development processes:

  1. **Flexibility and Adaptability:**

    - Agile allows for continuous adjustments based on customer feedback and changing requirements, making it easier to adapt to evolving project needs.

  1. **Faster Time to Market:**

    - Agile works in short development cycles (sprints), delivering smaller, functional components early and frequently. This helps in releasing product updates faster.

  1. **Customer Satisfaction:**

    - Involving the customer in the development process ensures the product aligns closely with their expectations and needs. Regular feedback loops improve the final product quality.

  1. **Improved Collaboration and Communication:**

    - Agile promotes continuous collaboration between cross-functional teams (developers, testers, product owners, etc.), ensuring a clear understanding of goals and quick problem resolution.

  1. **Continuous Improvement:**

    - The Agile process includes regular retrospective meetings that help the team identify what went well and areas for improvement, leading to enhanced team performance over time.

  1. **Higher Quality Product:**

    - Agile emphasizes iterative development and regular testing, allowing teams to identify and fix issues early, resulting in a higher-quality product.

  1. **Risk Mitigation:**

    - By breaking down the project into smaller parts, Agile reduces the risk of complete project failure. Frequent iterations help spot potential problems and correct them quickly.

  1. **Increased Productivity:**

    - Agile fosters a structured yet flexible approach that encourages efficient resource allocation and helps team members stay focused on prioritized tasks.

  1. **Transparency and Accountability:**

    - Agile teams work with visibility and accountability through regular stand-up meetings, sprint reviews, and progress tracking, improving trust and clarity among stakeholders.

  1. **Higher Team Morale:**

    - Teams have more autonomy and opportunities to collaborate in Agile, which often results in higher job satisfaction and engagement.

  These benefits make Agile a popular choice for software development projects, particularly those requiring flexibility and rapid delivery.

#### **3. Iterative Model**

  In the **Iterative model in SDLC**, each cycle results in a semi-developed but deployable version; with each cycle, some requirements are added to the software, and the final cycle results in the software with the complete requirement specification.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/4c37ebc5-43af-42f9-8d11-427cc2b53446/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=8738fafb3b6969bd1840926f55dfd8e9ed8bda7a3e2d95b619f02b2859dcfde4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **4. Spiral Model**

  The spiral model in SDLC is one of the most crucial SDLC models that provides support for risk handling. It has various spirals in its diagrammatic representation; the number of spirals depends upon the type of project. Each loop in the spiral structure indicates the *Phases of the**** ***[***Spiral model***](https://www.geeksforgeeks.org/software-engineering-spiral-model)***.**** *

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/18bfe2e6-f9e8-4a24-bcc8-25feb712f698/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=6b6a82e445933e6456c2fa5a0e97e0ab7915c80545753ff6bdd1afdf96f7296b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **5. V-Shaped Model**

  The** V-shaped model in SDLC** is executed sequentially in V-shape. Each stage or phase of this model is integrated with a testing phase. After every development phase, a testing phase is associated with it, and the next phase will start once the previous phase is completed, i.e., development & testing. It is also known as the verification or validation model.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/5787f403-0acc-46ae-b059-7438157a9051/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=3aad8a8bba6b7fd4ae37984a15a9734491877fa79cc3a0c5912a10b725a5accf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **6. Big Bang Model**

  The [**Big Bang model**](https://www.geeksforgeeks.org/overview-of-big-bang-model) in SDLC is a term used to describe an informal and unstructured approach to software development, where there is no specific planning, documentation, or well-defined phases.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/78462f22-f856-45b2-946f-5ab577e5d776/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=a69707edce9d78ad76fb88af5b9035ce8c16f037a7c67cf8a822c08f257f03b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

## What is the need for SDLC?

  SDLC is a method, approach, or process that is followed by a software development organization while developing any software. [**SDLC models **](https://www.geeksforgeeks.org/sdlc-models-types-phases-use)were introduced to follow a disciplined and systematic method while designing software. With the software development life cycle, the process of software design is divided into small parts, which makes the problem more understandable and easier to solve. SDLC comprises a detailed description or step-by-step plan for designing, developing, testing, and maintaining the software.

## How to Choose an SDLC Model?

  Choosing the right SDLC (Software Development Life Cycle) model is essential for project success. Here are the key factors to consider:

  1. **Project Requirements:**

    - **Clear Requirements:** Use **Waterfall** or **V-Model** if requirements are well-defined and unlikely to change.

    - **Changing Requirements:** Use **Agile** or **Iterative** models if requirements are unclear or likely to evolve.

  1. **Project Size and Complexity:**

    - **Small Projects:** Use **Waterfall** or **RAD** for small, simple projects.

    - **Large Projects:** Use **Agile**, **Spiral**, or **DevOps** for large, complex projects that need flexibility.

  1. **Team Expertise:**

    - **Experienced Teams:** Use **Agile** or **Scrum** if the team is familiar with iterative development.

    - **Less Experienced Teams:** Use **Waterfall** or **V-Model** for teams needing structured guidance.

  1. **Client Involvement:**

    - **Frequent Client Feedback:** Use **Agile**, **Scrum**, or **RAD** if regular client interaction is needed.

    - **Minimal Client Involvement:** Use **Waterfall** or **V-Model** if client involvement is low after initial planning.

  1. **Time and Budget Constraints:**

    - **Fixed Time and Budget:** Use **Waterfall** or **V-Model** if you have strict time and budget limits.

    - **Flexible Time and Budget:** Use **Agile** or **Spiral** if you can adjust time and budget as needed.

  1. **Risk Management:**

    - **High-Risk Projects:** Use **Spiral** for projects with significant risks and uncertainties.

    - **Low-Risk Projects:** Use **Waterfall** for projects with minimal risks.

  1. **Product Release Timeline:**

    - **Quick Release Needed:** Use **Agile** or **RAD** to deliver products quickly.

    - **Longer Development Time:** Use **Waterfall** or **V-Model** for projects with no urgent deadlines.

  1. **Maintenance and Support:**

    - **Long-Term Maintenance:** Use **Agile** or **DevOps** for projects needing continuous updates and support.

    - **Minimal Maintenance:** Use **Waterfall** or **V-Model** if little future maintenance is expected.

  1. **Stakeholder Expectations:**

    - **High Stakeholder Engagement:** Use **Agile** or **Scrum** if stakeholders want ongoing involvement.

    - **Low Stakeholder Engagement:** Use **Waterfall** or **V-Model** if stakeholders prefer involvement only at major milestones.

#### **In Short:**

  **Waterfall**: Best for clear, stable projects with minimal changes.

  **V-Model**: Good for projects with clear requirements and a strong focus on testing.

  **Agile/Scrum:** Ideal for projects with changing requirements and frequent client interaction.

  **Spiral**: Suitable for high-risk projects with evolving requirements.

  **RAD:** Useful for projects needing rapid development.

  **DevOps:** Best for continuous integration and ongoing support

#### **What are the five key Agile Scrum meetings?**

  **Sprint planning meeting:**

  Before your team begins a Scrum sprint, you need to know where you’re going. This is where the sprint planning meeting comes in. A sprint planning meeting should be one of the longest Scrum meetings you hold—plan on two hours of planning for each week of your sprint. (A two-week sprint, for example, requires roughly a four-hour planning meeting.) While this may seem like a lot, remember that you only need to hold one sprint planning meeting per sprint—right at the start.

  The purpose of a sprint planning meeting is simple: Establish what you and your Scrum team want to accomplish this sprint and evaluate the bandwidth you have available. From there, you can plan the sprint, assign tasks, and set deadlines. Make sure each team member understands the ins and outs of the tasks they are assigned. You’ll want to invite the product owner to this meeting so they can clear up any ambiguities and help establish expectations.

  **Daily standup meeting: **

  As the most frequently held Agile Scrum meetings, daily standup meetings are the bread and butter of Scrum sprints. They’re short, to the point, and, as the name suggests, held each day—they’re typically the first meeting of the work day. By the end of a standup meeting, each team member should have answered two questions: What did I accomplish yesterday? And what am I going to accomplish today? Standup meetings are also a time for team members to bring up any roadblocks they are facing

  Though daily standup meetings only take between fifteen and thirty minutes, they are an effective way to keep each team member up-to-speed, on task, and openly communicating with others. Because they are held so frequently, standup meetings also allow teams to address problems as they arise, keeping the sprint moving on schedule.

  **Sprint review meeting**

  Sprint review meetings are held at the end of each sprint. This meeting is an opportunity for you and your team to demonstrate what you’ve accomplished to the product owner and other stakeholders outside of your team.

  Your goal in a sprint review meeting is to gather feedback. As you demonstrate new product features and functionality, allow the product owner and other stakeholders to respond to and evaluate your work. Agile methodology relies on open and frequent conversations: As you and your team document, respond to, and act on feedback, remember that these conversations help create a better product.

  Certain feedback points may require additional work on the product—add them to your backlog and consider including them in the next sprint. This is a matter of priority: While you should implement the feedback eventually, if other tasks are more pressing you can save it for a sprint down the road.

  **Sprint retrospective meeting**

  Just like review meetings, a sprint retrospective meeting is held at the end of each sprint. Whereas review meetings include the product owner and other stakeholders, retrospective meetings are primarily for the benefit of your Scrum team—there’s usually no need to get outside players involved.

[image](https://corporate-assets.lucid.co/spark/0af20086-daf9-481e-a3bb-89e1521617d7.png?v=1702002735774)

  During a sprint retrospective meeting, address these questions with your Scrum team: What went right this sprint? What went wrong? And what could we do differently next time?

  These meetings don’t have to be long (usually somewhere between one and two hours), but they allow teams to constantly improve.

  **Product backlog refinement**

  Product backlog refinement meetings occur between sprints (usually just once per interim, but you could always schedule another if needed). If you’re anything like us, your backlog tasks are likely a bit rough around the edges. And that’s ok! This meeting is your chance to add clarifying details, establish deliverables, and prioritize the tasks in your backlog.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/dfe512ba-53b5-40e6-b808-83385a31adb6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K7EVWTR%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC1p6dexF6SNw0%2BCuSMx3isUzcyWNXsFWimm06mUFkpYQIhANR%2FH08xmkbp%2FQhW0y3%2FQBaffZSOLX3HwdjfymgEqiXIKv8DCCQQABoMNjM3NDIzMTgzODA1IgyR69E2ECcrZrBwAXoq3APDPuN9COqqmS03bHlrbKXPQLmm%2B49ou6KS%2Burz7xT6%2FWJOUg6%2BC%2BNzsYuZV3zMpERihYOSSpEXb0dEcoJFoZiYLEHvU7HEVALZIXVFeUt%2FBh8mjbSA5%2FONduNbrJyxOsNRTHAwtijOPjbFYKjPUhQ98llidxwZ%2FbDrhinD1t8Dh05I3Fxw6Ks11ou8WjG2CpmLbS87eT1V6uvPehH9dh%2B%2BhMDzM1yQh%2FKahd%2FxPHBXYIyIYmAeHYEAdCfIcf7wsRg0r%2BrKjVwMSiH7OGxD0N607SjvWJvzCEF27msNmw98%2BuVAzktM5wr7Iw8FyMirQ4cKdmxqDu5sezYV0ZzATCbjAtDRNuBDxnLCQ%2FXkoI9YviAlsn%2BjqsxsLBaSENhWL24BcpiSCnGfZlr9pntdQ2tWu7LL0SNn6WKJ0QvByxkeKKh2JrGM%2Fe1h%2FdYDCgwvLmXm9BLigeG7FnX62ybZM4ScMQfxuUyR%2FoooHcdRtIttryD8yI4jufoK%2BYjcOBw08iOnXZKcXljDAclEtCGK9qu5tmlzWQzKp57tt0YPT4JiIcexhKedW0cAEtLdKz8zi19GQwAJQ3QyWsGGuyv0PlMptJqotxtpZFfuqcmRJJFodBCwqJjPBspRbUwQzjC3iNLPBjqkAejuCV6mxGrOrJxaoAsxEich3840O4aKRBnf9dGo%2BSeCEk7wMOGOst0qGZs01nJ9XUKWGSYPOgaeVtU0RncnY06H3Mp2fj4PG2x2CjpC6Ugki44cpltKR%2FDWKvk%2FKvXfikiJuYXigystvn%2FmZgkI%2Btw%2BMMaGC2IY7rT528dadZTWvC5SyjUf7S%2BnThBCo%2FK5tCdhSdT0T46QuAC4mC8cIrawiqKx&X-Amz-Signature=85a57c79b2a48ce73dacb18f8d235f48c079b9876f88f85b181b463c8437e155&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  A thorough product backlog refinement meeting makes your life easier. Remember the oh so long sprint planning meeting you held at the beginning of the sprint? If you take the time to refine your backlog, sprint planning is a quicker and smoother process.

  > What is the estimation in Sprint?

  > What is sprint backlog?

  - What is the role of a Bug Tracking System?

  - Describe Use Case

## Different Types of Testing

  > **Manual Testing**

  Manual testing is a software testing process in which test cases are executed manually without using any automated tool. All test cases are executed by the tester manually according to the end user's perspective. It ensures whether the application is working, as mentioned in the requirement document or not. Test cases are planned and implemented to complete almost 100 percent of the software application. Test case reports are also generated manually. Manual Testing is one of the most fundamental testing processes as it can find both visible and hidden defects in the software. The difference between the expected output and the output, given by the software, is defined as a defect. The developer fixed the defects and handed it to the tester for retesting.

  Manual testing is mandatory for every newly developed software before automated testing. This testing requires great effort and time, but it gives the surety of bug-free software. Manual Testing requires knowledge of manual testing techniques but not of any automated testing tool.
There are various methods used for manual testing. Each technique is used according to its testing criteria. Types of manual testing are given below:

  > **White Box Testing**

  The White Box Test method is the one that looks at the code and structure of the product to be tested and uses that knowledge to perform the tests. This method is used in the Unit Testing phase, although it can also occur in other states such as Integration Tests. For the execution of this method, the tester or the person who will use this method must have extensive knowledge of the technology used to develop the program

  > **Black Box Testing**:

  Black Box Testing is the method that does not consider the internal structure, design, and product implementation to be tested. In other words, the tester does not know its internal functioning. The Black Box only evaluates the external behavior of the system. The inputs received by the system and the outputs or responses it produces are tested

  > **Unit Testing **

  > **System Testing**

  System testing, also referred to as *system-level testing* or *system integration testing*, is the process in which a quality assurance (QA) team evaluates how the various components of an application interact together in the full, integrated system or application.

  System testing verifies that an application performs tasks as designed. It's a type of black box testing that focuses on the functionality of an application rather than the inner workings of a system, which white box testing is concerned with.

  System testing, for example, might check that every kind of user input produces the intended output across the application. System testing is the third level of testing in the software development process. It's typically performed before acceptance testing and after integration testing.

  > **Smoke Testing **

  Smoke testing is a quick check to ensure that the core functions work and that the software is ready for further testing.

  Scenario:

  You've just launched a new e-commerce website. Before conducting detailed tests, you quickly check if:

  - The homepage loads.

  - Users can log in.

  - The search function works.

  - Users can add items to the cart and proceed to checkout.

  If any of these core features fail, you halt further testing and address the issues immediately.

  > **Sanity Testing **

  Sanity testing is a quick check performed to ensure that recent changes or bug fixes in a software application work correctly.

  Scenario:

  A developer fixed a bug where the 'Add to Wishlist' button wasn't working on the product page. You perform sanity testing by:

  - Verifying that the 'Add to Wishlist' button now works correctly.

  - Ensuring that the wishlist updates and displays the added items.

  You don't test the entire website, just the parts related to the bug fix.

  > **Regression Testing **

  Regression testing ensures that recent changes or updates to the application haven’t adversely affected existing functionalities. It involves re-running previously conducted tests to confirm everything still works as intended.

  Scenario:

  Your team added a new feature allowing users to filter products by color. To ensure this new feature didn't break anything, you conduct regression testing:

  - Check if the login process still works.

  - Verify the search function and cart functionality.

  - Ensure the checkout process and payment gateway are still operational.

  - Test previously fixed bugs to ensure they haven't resurfaced.

  > **Retesting **

  Retesting focuses on verifying that specific defects have been fixed. It centers on the failed test cases that have been corrected.

  Scenario:

  There was a bug where the contact form on the website wasn't submitted properly. After the development team fixes it, you perform retesting by:

  - Submitting the contact form to ensure it works correctly now.

  - Checking if the form submission sends an email notification as expected.

  You don't check other parts of the website, just the specific issue that was fixed.

  > **End-to-End Testing:**

  **
**End-to-end testing is a methodology used in the software development lifecycle (SDLC) that tests the functionality of an application from start to finish under real-life circumstances. End-to-end testing aims to simulate what a real user scenario looks like.

  - Random testing?

  > **Acceptance Testing?**

  It is [**formal testing**](https://www.geeksforgeeks.org/formal-testing/) according to user needs, requirements, and business processes conducted to determine whether a system satisfies the acceptance criteria or not and to enable the users, customers, or other authorized entities to determine whether to accept the system or not.

  Acceptance Testing is the last [**phase of software testing**](https://www.geeksforgeeks.org/software-testing-life-cycle-stlc/) performed after [**System Testing **](https://www.geeksforgeeks.org/system-testing/)and before making the system available for actual use.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/ff0851be-bd72-4668-b9b6-d6098d821c49/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EOE66QM%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDP2UawgUEHhV6bLKzsPVQOOp1mYyST7ZVlkcHz5WWY2AIhAMPOGNydxjCTY%2BR8ZlWH7VfxwPYPpGobWCZS8mnrXtqnKv8DCCUQABoMNjM3NDIzMTgzODA1IgyCtaub3noCoF5M2Ccq3AMXKmIyAex47f3ys0CdH5GQtWErcboYvO1n8GPSWG2Ai0%2F3ESEpFi2XlLradKvjXHTys1%2BJ1hAE7jFpb1e8Pd6ROT72ISqkFe3NBI9LkevcZxG3xJxVw3%2B5kb17sRoSyigpKQm2xLHbWIqyN6IQamR5GYjHD21693Oe%2FyBb5Xqi0kCHhhLB70PI0wUjKkQlZ0e3Vsg4pca7qayBWXfou7NcwHqux%2BVoaR%2BC7YqcjNCvReImZkxv4tc2y36%2FhO9zJ%2Bmx5JFXYYc9qrXyjpq2oSUwU7xw5SODvnnNxhF384GkIP8B848uX1ilRf7Pqh7PMQJz8YJ%2BMCTUjaIQ9vHHcbk588W3H5uzyxOo2%2ByCZnCudErV%2BjnjSXBG4IDSGZwNyJnqmBFt8m9BT4J4MM3mApEcyno8VIDpciUTAXW3aQdjRvb38xjWL6O5S5D6EmGI9UhOjLpVYlI6uXJ%2F%2BkSICOt4Ec7L8JNxKj2DVPRUfBkX24545Uq3RfwRivlmPD1FzGyFaLe0k5y63xheScy1Xq1E1kRZ0KM8OCECQKGuqMK0DnXSir3lbDwihkNt5gop5koxYwb5nad23MvjHLYJgNR4d1DEn7snQMAIQk8iuDoraytXm5eRzqlkWpx%2F0jCrqNLPBjqkATsTTqAk%2F5QrrqAEK0DXbtzg4uRUQGT9HG8gHFkCRoSGF4De2IHSJWTdlgyvRyU2O9zYtIuTTLc8NXctOztZQihpBu9aeSzdKksgICMANempEDyfSvXgXwRepyxotRnttplTyt7%2BxGyPaXu6okvywKHyJWYhf49Ui396%2BxzVqHdIsrKQXu07O5Dk8j21uYKmp1Dwwcj8dKeblUgY3TvfzhNLmfAr&X-Amz-Signature=bd76d841d8bf9c3baf66277e45d9bf563d6b444a12cd33d10548670794a64fab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  > **User Acceptance Testing (UAT)**

  User Acceptance Testing (UAT) serves the purpose of ensuring that the software meets the **business requirements** and is ready for **deployment** by validating its functionality in a real-world environment. It allows **end-users** to test the software to ensure it meets their needs and operates as expected, helping to identify and fix any issues before the final release. UAT is crucial for **quality assurance** and **customer satisfaction**, as it ensures that the software is **user-friendly**, **reliable**, and meets all specified **criteria**.

    **Acceptance criteria attributes for UAT**

    - Completeness

    - Accuracy

    - User-friendliness

    - Performance

    - Reliability

    - Security

    - Scalability

    - Compatibility

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/6ebee26b-96b0-4118-82d0-e4e1dd58c535/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMJWHBEV%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIBuTwcBHOFS3L%2B7Nz3%2F5KCISLwDwe7kL%2FRAySJl8a%2FNxAiEA1i%2BNbc5WZeSz%2BQZWfA54uVhoMO8Jid8IwhGgoj%2FA2Pkq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDN1kOupaneKtSTWryCrcA6pHl8YNXO7NROWMEhST6gdtvRBisCpERvlhQMyNz8ijBtI9hIprIVe7jSi4FSTqg%2By0gO%2B5obCTzhSAbnC5BuzJFonfMZplHPTB4tO2fc5B%2FbcPu2rfHoRYBedpqjIxtuhawmJ4xQWTJa36JbLnwNOXonqmLTTB%2F7xRhjb8JQd1u6ElXDChwNBkA9mYRxaDSRH1RLLhvRerXtNTMFBEbZAW0Wtaa%2FecqyOSyjweQISejHACtKqC1OM7VnCKDNq0HjdWYP%2Bofa%2F8BLLdBSpfS%2Bh2FFkR80XYJiTkPCmQcBb9mJaghR7KHdMlDaDgzI%2BxOgyJKeodq1O%2FRln1M9wKesUrZCxo4885azxAT08EpfBc%2BCb8B53Hgu6VMmfnAiS7BRx0%2F1lZx6PLlnk%2Bm4W%2BI1yWKlc%2BykI5WR8fisTlFteRstL16pDHfCj022yCcnylyU1CyDi1APLVsFaAE%2BMTn97uF5vbVzGCetNuEBX9MhhkOYZLmPqVmc9Z0iKq7UF273UDFAsMuqU8wUiEY0awG3honIK2u3cMS0%2BaPavG4INve1Ymdru3CuC1NWdcaOraBsx3NV%2Bm2aSiPHKr62i0TgtEowbLRK2zpMuplg0MTEtjJJmGBlADkD%2FWIqEyMPun0s8GOqUB6OmGGpOB59GgU8mWEYSwAIJca55IrslbFvE6pbiQyuHI5NJ2%2BmqDIwwQOBnteca%2BSchQALq3OXOIClt%2B8irXHgZQpoznPiYSGJR7nlEya%2Bx9WKdbtpJ8bueWYqjDxvY%2F3%2F3Z9yHJWML37atIBGOXoGD%2BTxwj5P79MMcP0zv%2FLH1ePkwv13ZKoZEc%2FeCUt2eyQjgo%2Fo6QVczlKRfTJVNHe1dQGWVt&X-Amz-Signature=a6f4230008d2eb93e7be11e39a81670d82fba1eea7cd01eb1707ffc61c31c11d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  > **Adhoc Testing :**

  Adhoc testing is a type of software testing that is performed informally and randomly after the formal testing is completed to find any loopholes in the system. For this reason, it is also known as Random or Monkey testing. Adhoc testing is not performed in a structured way, so it is not based on any methodological approach. That’s why Adhoc testing is a type of Unstructured Software Testing.

    **Adhoc testing has –**

      - No Documentation.

      - No Test cases.

      - No Test Design.

  > **Monkey Testing**

  Monkey testing is a type of software testing in which the tester tests the application or software by providing some random inputs and checking the behavior of the application or the software. It is also observed by seeing whether the application or software crashes on a given input or not. Monkey testing is usually implemented as random and automated unit testing. Monkey testing is named because of the Infinite Monkey Theorem. The Monkey Theorem describes that a monkey hitting keys at random on a typewriter keyboard for a random amount of time will almost type a given text. In Monkey Testing, the tester is considered the Monkey. Like a monkey who uses a computer, he will randomly perform any task on the system that is beyond his understanding, the same as the tester applying random test cases on the system under test to find defects without creating any test cases. Monkey Testing is also part of the standard testing tools for stress testing in Android Studio.

  > **Exploratory Testing**

  **Exploratory Testing** is a type of **software testing** in which the tester is free to select any possible methodology to test the software. It is an unscripted approach to software testing. In exploratory testing, software developers use their learning, knowledge, skills, and abilities to test the software developed by themselves. Exploratory testing checks the functionality and operations of the software as well as identifies the functional and technical faults. Exploratory testing aims to optimize and improve the software in every possible way. The exploratory testing technique combines the experience of testers with a structured approach to testing. It is often performed as a black box testing technique. Exploratory testing is an unscripted testing technique.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/357a37d7-845b-4bb7-a8f3-1feb2646f1c8/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EOE66QM%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDP2UawgUEHhV6bLKzsPVQOOp1mYyST7ZVlkcHz5WWY2AIhAMPOGNydxjCTY%2BR8ZlWH7VfxwPYPpGobWCZS8mnrXtqnKv8DCCUQABoMNjM3NDIzMTgzODA1IgyCtaub3noCoF5M2Ccq3AMXKmIyAex47f3ys0CdH5GQtWErcboYvO1n8GPSWG2Ai0%2F3ESEpFi2XlLradKvjXHTys1%2BJ1hAE7jFpb1e8Pd6ROT72ISqkFe3NBI9LkevcZxG3xJxVw3%2B5kb17sRoSyigpKQm2xLHbWIqyN6IQamR5GYjHD21693Oe%2FyBb5Xqi0kCHhhLB70PI0wUjKkQlZ0e3Vsg4pca7qayBWXfou7NcwHqux%2BVoaR%2BC7YqcjNCvReImZkxv4tc2y36%2FhO9zJ%2Bmx5JFXYYc9qrXyjpq2oSUwU7xw5SODvnnNxhF384GkIP8B848uX1ilRf7Pqh7PMQJz8YJ%2BMCTUjaIQ9vHHcbk588W3H5uzyxOo2%2ByCZnCudErV%2BjnjSXBG4IDSGZwNyJnqmBFt8m9BT4J4MM3mApEcyno8VIDpciUTAXW3aQdjRvb38xjWL6O5S5D6EmGI9UhOjLpVYlI6uXJ%2F%2BkSICOt4Ec7L8JNxKj2DVPRUfBkX24545Uq3RfwRivlmPD1FzGyFaLe0k5y63xheScy1Xq1E1kRZ0KM8OCECQKGuqMK0DnXSir3lbDwihkNt5gop5koxYwb5nad23MvjHLYJgNR4d1DEn7snQMAIQk8iuDoraytXm5eRzqlkWpx%2F0jCrqNLPBjqkATsTTqAk%2F5QrrqAEK0DXbtzg4uRUQGT9HG8gHFkCRoSGF4De2IHSJWTdlgyvRyU2O9zYtIuTTLc8NXctOztZQihpBu9aeSzdKksgICMANempEDyfSvXgXwRepyxotRnttplTyt7%2BxGyPaXu6okvywKHyJWYhf49Ui396%2BxzVqHdIsrKQXu07O5Dk8j21uYKmp1Dwwcj8dKeblUgY3TvfzhNLmfAr&X-Amz-Signature=649d3fb36fdda6b313d6ededc49272dd0a558da413eb87e16200a7f6a925805d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/8f6f9459-8f24-4be0-95fe-663325d740fb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EOE66QM%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDP2UawgUEHhV6bLKzsPVQOOp1mYyST7ZVlkcHz5WWY2AIhAMPOGNydxjCTY%2BR8ZlWH7VfxwPYPpGobWCZS8mnrXtqnKv8DCCUQABoMNjM3NDIzMTgzODA1IgyCtaub3noCoF5M2Ccq3AMXKmIyAex47f3ys0CdH5GQtWErcboYvO1n8GPSWG2Ai0%2F3ESEpFi2XlLradKvjXHTys1%2BJ1hAE7jFpb1e8Pd6ROT72ISqkFe3NBI9LkevcZxG3xJxVw3%2B5kb17sRoSyigpKQm2xLHbWIqyN6IQamR5GYjHD21693Oe%2FyBb5Xqi0kCHhhLB70PI0wUjKkQlZ0e3Vsg4pca7qayBWXfou7NcwHqux%2BVoaR%2BC7YqcjNCvReImZkxv4tc2y36%2FhO9zJ%2Bmx5JFXYYc9qrXyjpq2oSUwU7xw5SODvnnNxhF384GkIP8B848uX1ilRf7Pqh7PMQJz8YJ%2BMCTUjaIQ9vHHcbk588W3H5uzyxOo2%2ByCZnCudErV%2BjnjSXBG4IDSGZwNyJnqmBFt8m9BT4J4MM3mApEcyno8VIDpciUTAXW3aQdjRvb38xjWL6O5S5D6EmGI9UhOjLpVYlI6uXJ%2F%2BkSICOt4Ec7L8JNxKj2DVPRUfBkX24545Uq3RfwRivlmPD1FzGyFaLe0k5y63xheScy1Xq1E1kRZ0KM8OCECQKGuqMK0DnXSir3lbDwihkNt5gop5koxYwb5nad23MvjHLYJgNR4d1DEn7snQMAIQk8iuDoraytXm5eRzqlkWpx%2F0jCrqNLPBjqkATsTTqAk%2F5QrrqAEK0DXbtzg4uRUQGT9HG8gHFkCRoSGF4De2IHSJWTdlgyvRyU2O9zYtIuTTLc8NXctOztZQihpBu9aeSzdKksgICMANempEDyfSvXgXwRepyxotRnttplTyt7%2BxGyPaXu6okvywKHyJWYhf49Ui396%2BxzVqHdIsrKQXu07O5Dk8j21uYKmp1Dwwcj8dKeblUgY3TvfzhNLmfAr&X-Amz-Signature=584674b26281d32a82b378ebccb1a736c1ba724271ecbe76f68f667acaba6ef2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  > **Integration Testing**

  Integration testing -- also known as integration and testing (I&T) -- is a type of software testing in which the different units, modules, or components of a software application are tested as a combined entity. However, these modules may be coded by different programmers.

  Integration testing aims to test the interfaces between the modules and expose any defects that may arise when these components are integrated and need to interact with each other.

  > **Positive Testing? **

  It is used to check whether our application works as expected or not. If an error is detected at the time of positive testing, the test is considered a failure. Positive testing is a technique whenever a test engineer writes the test cases for a set of respective outputs.

  In positive testing, the test engineer will always check for only a good set of values. In other words, we can say that **positive testing** is a process where the system or an application is tested against the valid input data.

  And the primary purpose of performing the positive testing is to validate whether the software does what it is supposed to do.

  In simple terms, we can say that positive testing is implemented by providing a **positive point of view.**

  > **Negative Testing**

  **It is implemented to check how the application can gracefully handle invalid input or unpredictable user performance.**

  **The fundamental purpose of executing the negative testing is to ensure the application's stability against the effects of different variations of improper validation data sets.**

  Negative testing is also known as **error path testing or failure**. And it helps us to identify more bugs and enhance the quality of the software application under test.

  Once the positive testing is complete, we can only execute the negative testing, which helps to identify more bugs and enhance the quality of the software application under test.

  We can say that the negative testing is executed by keeping the **negative point of view** in simple terms.

  > **Alpha Testing**

  Alpha Testing is an essential phase in software testing conducted by the development or QA team before beta testing. It aims to identify and fix bugs in a controlled environment that simulates real-world conditions. This helps ensure the software’s functionality, reliability, and stability. Alpha testing combines white-box and black-box testing techniques to explore and evaluate the software.

  ***Test server at Audacity
**

  > **Beta Testing**

  Beta testing is the process of testing a software product or service in a real-world environment before its official release. It is an essential step in the software development lifecycle as it helps identify bugs and errors that may have been missed during the development process.

  During beta testing, the software is made available to a selected group of users who are willing to test the product and provide feedback to the developers. The beta testers typically use the software in various ways, attempting to find any issues, bugs, or usability problems. They then provide feedback on their experience, reporting any issues encountered.

  > **Usability Testing**

  **Usability Testing in software testing** is a type of testing, that is done from an end user’s perspective to determine if the system is easily usable. Usability testing is generally the practice of testing how easy a design is to use on a group of representative users. Several tests are performed on a product before deploying it. You need to collect [**qualitative and quantitative data**](https://www.geeksforgeeks.org/difference-between-qualitative-and-quantitative-data/#:~:text=Quantitative%20data%20is%20numerical%2C%20countable,or%20contexts%20behind%20certain%20behaviors.) and satisfy customers’ needs with the product. A proper final report is made mentioning the changes required in the product (software).

  Usability testing involves evaluating the functionality of a website, app, or digital product by observing real users as they navigate through it. Typically conducted by researchers, either in-person or remotely, the aim is to identify any areas of confusion or difficulty users encounter while completing tasks.

  The ultimate goal of usability testing is to uncover pain points in the user experience, revealing opportunities for improvement. By assessing how efficiently users achieve their goals within the product, usability testing helps enhance its overall functionality and user satisfaction.

  > **A/B Testing**

  A/B testing (also known as [split testing](https://www.optimizely.com/optimization-glossary/split-testing/) or [bucket testing](https://www.optimizely.com/optimization-glossary/bucket-testing/)) is a methodology for comparing two versions of a webpage or app against each other to determine which one performs better. A/B testing is essentially an experiment where two or more variants of a page are shown to users at random, and statistical analysis is used to determine which variation performs better for a given conversion goal.

  > **Performance Testing**

  Performance testing is the testing of an application’s stability and response time by applying load.

  The word stability means the ability of the application to withstand in the presence of load. Response time is how quickly an application is available to users. Performance testing is done with the help of tools. Loader.IO, JMeter, LoadRunner, etc. are good tools available in the market.

  > **Load  Testing**

  Load testing is the testing of an application’s stability and response time by applying load, which is equal to or less than the designed number of users for an application.

  • For example, if your application handles 100 users at a time with a response time of 3 seconds, then load testing can be done by applying a load of a maximum of 100 or less than 100 users. The goal is to verify that the application is responding within 3 seconds for all the users.

  > **Stress Testing**

  Stress testing is testing an application’s stability and response time by applying load, which is more than the designed number of users for an application.

  • For example, if your application handles 1000 users at a time with a response time of 4 seconds, then stress testing can be done by applying a load of more than 1000 users. Test the application with 1100,1200,1300 users and notice the response time. The goal is to verify the stability of an application under stress.

  > **Endurance Testing**

  Endurance testing is testing an application’s stability and response time by applying a load continuously for a longer period to verify that the application is working fine.

  • For example, car companies soak testing to verify that users can drive cars continuously for hours without any problem.

  > **Security Testing**

  It is a type of testing performed by a special team. Any hacking method can penetrate the system.

  Security Testing is done to check how the software, application, or website is secure from internal and/or external threats. This testing includes how much software is secure from malicious programs, viruses and how secure & strong the authorization and authentication processes are.

  It also checks how the software behaves for any hacker’s attack & malicious program and how software is maintained for data security after such a hacker attack.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/38453872-6c7c-43f8-9df3-182bb9a61783/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKOBWLX3%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDL8aQYOxxkN4Fgs7M3sI%2BR7IVoaU%2B604Qxcd2TGOMSNgIgGaIkxUgWvuYusGI3gAYNiYDv4IdALZDPWm2C4sC8xTAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDO%2BFBrGm19HbGTYbqSrcA6IuiH0IvziQCFOjvXY141uTuTIrfY5UB8TguaWhQY0L0hJ1z%2F1wfUfKiDUxhL6xSR%2BHNnK2eKey%2FXucyN8xWPj60K9PCOk24ST4mD2XNraEb1%2B71QC%2FsGh1zC00v1w6H3nVdFAa0aMthxdiJa0H15j8HUCmzhlBXb1uO71OlIzTd59jz5phmepzj1Ek%2B3lAyBGlNMnLXntpJwk1au%2FHPnDh1InI6qRO3RGsFL0wWKAgeSp0YJazUbUSWKJOuFyhMPcaUYjjK6c0JhT%2B6KLcAtoJBup07sUkbKJiDQ%2B5zLj6HRfJ3lUnFbLyo5YOgkOk1wt2YYSG5MsbBreBNuHnvBEwR7KGqKGGY0YYeEW6zbk20Hi6LsmGgyygZdroBayRwgL5GTMD2a7CbrqTo7jKtGbI4SAXHiYSJoWMdFr8uV1KDCQMAhj61LnMS5cTagjSwvvq%2FHg3xe6V2hhplfOq%2B2QfV2DgM5kXaP8iAqdOGRnJGMXhomLD0GFEmqDALUx6KMMnaNCjVoc7RapZqHyg6wHW0HW6I33gzdmQTZBJ7cul4wCYiFTrTuMaTnh8x4vi7U1Rk74Q02kiBZIF9yhAZXmHKVt6zodtY5sHpiSXRJXan3K8RItPEU%2BzRi%2FKMO%2BH0s8GOqUB1SVsmcd2R2UZFhT8X141ApeRKWb4AH7DO3Odowp%2FxLQS0%2Fx8O2YUkycBZgeoPeQu4VqnzL1wSO3hhODq6pG4neOSTxgp22wKTjM%2FcjFAGcfcCi6mW%2BiPn5QxFc2pp6F4EUP0iFfB4tYdKicalBzAAtAbAQqiwvQSM4tMCsieVozBAlPPPjgGWCAfTXORhEW7P10pMF5Ewm74R2KTsKYtjmB8Zooj&X-Amz-Signature=05ce76fafbe780cc38b7d3810c088caf668b49262d59715a3f92875d9c243ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

#### **Test Case:**

A test case is a set of actions performed on a system to determine if it satisfies software requirements and functions correctly. The purpose of a test case is to determine if different features within a system are performing as expected and to confirm that the system satisfies all related standards, guidelines, and customer requirements. The process of writing a test case can also help reveal errors or defects within the system.

#### **Test Case Template:**

To offer important as well as relevant information about the software testing process, the team of testers follows a predefined test case template, which allows them to record crucial details about the process, without missing any relevant details. Therefore, the following is a standard template used for creating a test case document:

1. **Test suite ID: **Each test case belongs to a specific test suite. This is the ID used to address it.

1. **Test Case ID: **To denote the test case.

1. **Test Case Description: **A brief summary of the test case along with its objective.

1. **Test prerequisites: **Covers all the chief requirements and preconditions that must be looked into before executing the test case.

1. **Test case procedure: **It is a stepwise strategy to conduct the test.

1. **Test data: **Includes all the data and links relevant to the cause of testing.

1. **Expected result: **The anticipated conclusions from the test are prepared well in advance for verification with actual results of the test.

1. **Actual result: **The results from testing are matched with those from the expected conclusions.

1. **Status and remarks: **Denotes if the tests have been executed and if the application under test has passed or failed the test case. Also includes remarks for improvement in the test case.

1. **Test environment: **It is the platform on which the test case is to be executed. This maybe an operating system, software, or hardware.

1. **Other parameters: **Other parameters which form part of the test case include a mention of the testing date, the author of the test case, the date of creation of the test case, etc.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/19799042-a511-42e4-be42-6b0334de465f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKOBWLX3%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDL8aQYOxxkN4Fgs7M3sI%2BR7IVoaU%2B604Qxcd2TGOMSNgIgGaIkxUgWvuYusGI3gAYNiYDv4IdALZDPWm2C4sC8xTAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDO%2BFBrGm19HbGTYbqSrcA6IuiH0IvziQCFOjvXY141uTuTIrfY5UB8TguaWhQY0L0hJ1z%2F1wfUfKiDUxhL6xSR%2BHNnK2eKey%2FXucyN8xWPj60K9PCOk24ST4mD2XNraEb1%2B71QC%2FsGh1zC00v1w6H3nVdFAa0aMthxdiJa0H15j8HUCmzhlBXb1uO71OlIzTd59jz5phmepzj1Ek%2B3lAyBGlNMnLXntpJwk1au%2FHPnDh1InI6qRO3RGsFL0wWKAgeSp0YJazUbUSWKJOuFyhMPcaUYjjK6c0JhT%2B6KLcAtoJBup07sUkbKJiDQ%2B5zLj6HRfJ3lUnFbLyo5YOgkOk1wt2YYSG5MsbBreBNuHnvBEwR7KGqKGGY0YYeEW6zbk20Hi6LsmGgyygZdroBayRwgL5GTMD2a7CbrqTo7jKtGbI4SAXHiYSJoWMdFr8uV1KDCQMAhj61LnMS5cTagjSwvvq%2FHg3xe6V2hhplfOq%2B2QfV2DgM5kXaP8iAqdOGRnJGMXhomLD0GFEmqDALUx6KMMnaNCjVoc7RapZqHyg6wHW0HW6I33gzdmQTZBJ7cul4wCYiFTrTuMaTnh8x4vi7U1Rk74Q02kiBZIF9yhAZXmHKVt6zodtY5sHpiSXRJXan3K8RItPEU%2BzRi%2FKMO%2BH0s8GOqUB1SVsmcd2R2UZFhT8X141ApeRKWb4AH7DO3Odowp%2FxLQS0%2Fx8O2YUkycBZgeoPeQu4VqnzL1wSO3hhODq6pG4neOSTxgp22wKTjM%2FcjFAGcfcCi6mW%2BiPn5QxFc2pp6F4EUP0iFfB4tYdKicalBzAAtAbAQqiwvQSM4tMCsieVozBAlPPPjgGWCAfTXORhEW7P10pMF5Ewm74R2KTsKYtjmB8Zooj&X-Amz-Signature=0e6a2f7ec3d6d6c5cc531012df2703c0ea78c43b615350127660f2bcfd02273c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/638c2109-962d-48d9-928d-ee8ec63ec894/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKOBWLX3%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDL8aQYOxxkN4Fgs7M3sI%2BR7IVoaU%2B604Qxcd2TGOMSNgIgGaIkxUgWvuYusGI3gAYNiYDv4IdALZDPWm2C4sC8xTAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDO%2BFBrGm19HbGTYbqSrcA6IuiH0IvziQCFOjvXY141uTuTIrfY5UB8TguaWhQY0L0hJ1z%2F1wfUfKiDUxhL6xSR%2BHNnK2eKey%2FXucyN8xWPj60K9PCOk24ST4mD2XNraEb1%2B71QC%2FsGh1zC00v1w6H3nVdFAa0aMthxdiJa0H15j8HUCmzhlBXb1uO71OlIzTd59jz5phmepzj1Ek%2B3lAyBGlNMnLXntpJwk1au%2FHPnDh1InI6qRO3RGsFL0wWKAgeSp0YJazUbUSWKJOuFyhMPcaUYjjK6c0JhT%2B6KLcAtoJBup07sUkbKJiDQ%2B5zLj6HRfJ3lUnFbLyo5YOgkOk1wt2YYSG5MsbBreBNuHnvBEwR7KGqKGGY0YYeEW6zbk20Hi6LsmGgyygZdroBayRwgL5GTMD2a7CbrqTo7jKtGbI4SAXHiYSJoWMdFr8uV1KDCQMAhj61LnMS5cTagjSwvvq%2FHg3xe6V2hhplfOq%2B2QfV2DgM5kXaP8iAqdOGRnJGMXhomLD0GFEmqDALUx6KMMnaNCjVoc7RapZqHyg6wHW0HW6I33gzdmQTZBJ7cul4wCYiFTrTuMaTnh8x4vi7U1Rk74Q02kiBZIF9yhAZXmHKVt6zodtY5sHpiSXRJXan3K8RItPEU%2BzRi%2FKMO%2BH0s8GOqUB1SVsmcd2R2UZFhT8X141ApeRKWb4AH7DO3Odowp%2FxLQS0%2Fx8O2YUkycBZgeoPeQu4VqnzL1wSO3hhODq6pG4neOSTxgp22wKTjM%2FcjFAGcfcCi6mW%2BiPn5QxFc2pp6F4EUP0iFfB4tYdKicalBzAAtAbAQqiwvQSM4tMCsieVozBAlPPPjgGWCAfTXORhEW7P10pMF5Ewm74R2KTsKYtjmB8Zooj&X-Amz-Signature=9987594003069c8322cdc70de6c376afc9a34e56e25f3d065b2a232abb8684d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/0219aa64-d223-4e9b-a15a-2745464663a3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKOBWLX3%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQDL8aQYOxxkN4Fgs7M3sI%2BR7IVoaU%2B604Qxcd2TGOMSNgIgGaIkxUgWvuYusGI3gAYNiYDv4IdALZDPWm2C4sC8xTAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDO%2BFBrGm19HbGTYbqSrcA6IuiH0IvziQCFOjvXY141uTuTIrfY5UB8TguaWhQY0L0hJ1z%2F1wfUfKiDUxhL6xSR%2BHNnK2eKey%2FXucyN8xWPj60K9PCOk24ST4mD2XNraEb1%2B71QC%2FsGh1zC00v1w6H3nVdFAa0aMthxdiJa0H15j8HUCmzhlBXb1uO71OlIzTd59jz5phmepzj1Ek%2B3lAyBGlNMnLXntpJwk1au%2FHPnDh1InI6qRO3RGsFL0wWKAgeSp0YJazUbUSWKJOuFyhMPcaUYjjK6c0JhT%2B6KLcAtoJBup07sUkbKJiDQ%2B5zLj6HRfJ3lUnFbLyo5YOgkOk1wt2YYSG5MsbBreBNuHnvBEwR7KGqKGGY0YYeEW6zbk20Hi6LsmGgyygZdroBayRwgL5GTMD2a7CbrqTo7jKtGbI4SAXHiYSJoWMdFr8uV1KDCQMAhj61LnMS5cTagjSwvvq%2FHg3xe6V2hhplfOq%2B2QfV2DgM5kXaP8iAqdOGRnJGMXhomLD0GFEmqDALUx6KMMnaNCjVoc7RapZqHyg6wHW0HW6I33gzdmQTZBJ7cul4wCYiFTrTuMaTnh8x4vi7U1Rk74Q02kiBZIF9yhAZXmHKVt6zodtY5sHpiSXRJXan3K8RItPEU%2BzRi%2FKMO%2BH0s8GOqUB1SVsmcd2R2UZFhT8X141ApeRKWb4AH7DO3Odowp%2FxLQS0%2Fx8O2YUkycBZgeoPeQu4VqnzL1wSO3hhODq6pG4neOSTxgp22wKTjM%2FcjFAGcfcCi6mW%2BiPn5QxFc2pp6F4EUP0iFfB4tYdKicalBzAAtAbAQqiwvQSM4tMCsieVozBAlPPPjgGWCAfTXORhEW7P10pMF5Ewm74R2KTsKYtjmB8Zooj&X-Amz-Signature=f5491fbcebecd5829bfd32460650de47d8a851818f61b91de790a70332debeb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### Positive Login Page Test Cases

**Positive test cases** are test cases that follow the “happy path,” i.e., testing if the Login page functions as expected under valid inputs. These test cases explore scenarios where users do what they are supposed to do, such as:

1. Valid username and password combination successfully logs the user in.

1. Testing with the minimum allowed username and password length.

1. Testing with a username and password containing alphanumeric characters.

1. Successful login with the "Remember Me" option selected.

1. If the captcha is given correctly

1. If the OTP is given correctly.

1. Testing login with a username that contains both uppercase and lowercase characters.

1. Successful login using a valid email address as the username.

1. Successful login using a valid phone number as the username.

1. Successful login with multi-factor authentication (MFA) enabled.

1. Testing login with a username that includes special characters (e.g., @, #, $).

1. Successful login using social media accounts (if applicable).

1. Successful login using biometric authentication (e.g., fingerprint, face recognition).

1. Testing login after a password reset to ensure the new password works.

1. Successful login after an account recovery process.

1. Successful login with localization settings (testing with different languages).

1. Testing login with different browsers (e.g., Chrome, Firefox, Edge).

### **Negative Login Page Test Cases**

In contrast, **negative testing for the Login page** aims to explore scenarios that deviate from that “happy path”. Users don’t always do what we want them to do. Sometimes they do unexpected things, and a good tester understands that unpredictability to test accordingly. Some common negative test cases you should test on your Login page include:

1. Entering an incorrect password for a valid username.

1. Entering an incorrect username for a valid password.

1. Entering an empty username field.

1. Entering an empty password field.

1. Entering a username that does not exist in the system.

1. Entering a password that does not meet password strength requirements.

1. Testing login with excessively long usernames and passwords.

1. Testing login with an incorrect case (uppercase/lowercase) in the username.

1. Testing login with expired or deactivated user accounts.

1. Testing login with suspended user accounts.

1. Multiple consecutive failed login attempts trigger an account lockout.

1. Testing login after the session has expired due to inactivity.

1. Testing login with incorrect multi-factor authentication (MFA) codes.

1. Entering invalid characters (e.g., scripts) in the username or password fields.

1. Testing login with CAPTCHA validation failure.

### [**What are the key challenges of software testing?**](https://www.globalapptesting.com/blog/challenges-of-software-testing)

- Rapid technological advancements

- Managing test data and environments

- Ensuring test coverage and effectiveness

- Security and compliance testing

- Resource and budget constraints

- Effective communication in distributed teams

- Integrating testing with Agile and DevOps

- Complex software architectures

- Keeping up with changing user expectations

### Software Developers vs. Quality Assurance Analysts vs. Testers
