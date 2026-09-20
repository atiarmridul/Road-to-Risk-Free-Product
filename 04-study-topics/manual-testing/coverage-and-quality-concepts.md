# Coverage, QA, and QC Concepts

## 🎯 Group 6: Test Coverage & Requirement Mapping<callout color="gray_bg">
	## **How to Ensure 100% Test Case Coverage of Requirements**
</callout>
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
Positive Test Case 1: Enter a valid username and password \> Expect a successful login.
Negative Test Case 1: Enter an invalid username \> Expect an error message.
Negative Test Case 2: Enter invalid password \> Expect error message.
Edge Case 1: Enter maximum length allowed for username and password \> Expect successful login or appropriate error message.
Edge Case 2: Leave username and password fields empty \> Expect error message.
Edge Case 3: Exceed the limits of characters allowed for username and password fields \> Expect error message.
**5. Incorporating Different Coverage Metrics**
Use various coverage metrics like statement coverage, branch coverage, and path coverage. These metrics ensure different aspects of code and functionalities are tested.
Statement Coverage
Ensuring every line of code in the login functionality is executed at least once.
Branch Coverage
Testing all branches of conditional logic in the login process.
It focuses on ensuring that each possible branch from each decision point in the code is executed at least once. This type of coverage is crucial for testing the decision-making logic of an application.

---
### ⚖️ Group 7: QA vs QC Concepts<callout color="gray_bg">
	## What is the difference between QA and QC in Software Testing?
</callout>
𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗕𝗲𝘁𝘄𝗲𝗲𝗻 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 𝗔𝘀𝘀𝘂𝗿𝗮𝗻𝗰𝗲 (𝗤𝗔) & 𝗤𝘂𝗮𝗹𝗶𝘁𝘆 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 (𝗤𝗖) 
#### Quality Assurance (QA):- A proactive approach to prevent defects and errors.
- Focuses on processes and procedures.
- Ensures compliance with standards and regulations.
- Identifies and mitigates risks.
- Continuously improves processes and methodologies.
- Emphasizes training and development.
##### Quality Control (QC):
- Reactive approach to find, detect, and correct defects.
- Focuses on products and services.
- Verifies compliance with standards and regulations.
- Identifies and corrects errors and defects.
- Monitors and controls processes.
- Emphasizes inspection and testing.

QA is about building quality into processes. QC is about checking the quality of outputs
Both are essential for ensuring high-quality products and services!

---
#### 🚨 Group 8: Bug Management Concepts
<callout color="gray_bg">
	## What is the severity and priority of a bug??
</callout>
- **Severity** refers to the impact a bug has on the system or application. It reflects how serious the bug is from a technical standpoint. A QA engineer determines the severity level of a bug.
	Severity in software testing can be classified into 4 categories:
		1. **Critical: **This severity level implies that the process has been completely shut off, and no further action can be taken.
		2. **Major: **This is a significant flaw that causes the system to fail. However, certain parts of the system remain functional.
		3. **Medium: **This flaw results in unfavorable behavior, but the system remains functioning.
		4. **Low: **This type of flaw won’t cause any major breakdown in the system.
- **Priority** refers to the urgency with which the bug needs to be fixed. It reflects how soon the bug should be addressed from a business or user perspective.
	Priority in software testing can be divided into 3 categories:
		1. **Low: **The defect is irritant, but a repair can be done once the more serious defects are fixed.
		2. **Medium: **The defect should be resolved during the normal course of the development, but it can wait until a new version is created.
		3. **High: **The defect must be resolved as soon as possible, as it affects the system severely and cannot be used until it is fixed.

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
> **A transaction of \$1 is not showing up in the target system – What priority & severity would you assign to the defect? If there is any workaround, will there be any change in priority & severity?**
Answer: low and low

---
