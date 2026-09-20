# Release and Defect Management

## 🧪 Group 9: Defect Leakage & Release Concepts<callout color="gray_bg">
	## What is the Difference between bug leakage and bug release?
</callout>
Bug leakage and bug release are two different terminologies. The whole QA process works around these two terms. We can differentiate between them as follows:

**Bug leakage**: Bug leakage is something when the bug is discovered by the end users or customers, and is missed by the testing team to detect while testing the software.
OR
A defect exists in the application and is not found by the tester, which is eventually found by the customer/end-user.
**Bug release**: A bug release is when a particular version of the software is released with a set of known bugs (s)/defects (s). These bugs are usually of low severity/priority. It is done when a software company can afford the existence of a bug in the released software rather than the time/cost of fixing it in that particular version.

<callout color="gray_bg">
	## What is the difference between build and release?
</callout>
- ***A build is an application that has been created for the customers and is given by the developer to the software testers.***
- ***The release is an official launch of the application for the customers.***
So, a **Build** becomes a **Release** once it has been reviewed and approved by the software testers and delivered to the customer. Multiple builds may be included in a single release.

<callout color="gray_bg">
	## Difference between Authentication and Authorization with an example.
</callout>

In the context of Quality Assurance (QA), authentication and authorization are crucial for ensuring that only the right individuals can access specific systems and perform certain actions. Here's a real-life example to illustrate these concepts:
### Example: Online Banking Application**Scenario:**
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


<page url="https://app.notion.com/p/066579739eb740b1b1109bff892197db">**7 Principles of Software Testing**</page>
<page url="https://app.notion.com/p/102995ff8e4680a5bfa8e5b004e68e6b">Software Development Life Cycle</page>
<page url="https://app.notion.com/p/43a6aa6a5c41425eaddbbe76e28e7f8b">Different Types of Testing</page>

![]([Notion-hosted image omitted because its URL expires])



<callout icon="💡" color="gray_bg">
	### **Test Case:**
</callout>
A test case is a set of actions performed on a system to determine if it satisfies software requirements and functions correctly. The purpose of a test case is to determine if different features within a system are performing as expected and to confirm that the system satisfies all related standards, guidelines, and customer requirements. The process of writing a test case can also help reveal errors or defects within the system.

<callout icon="💡" color="gray_bg">
	### **Test Case Template:**
</callout>
To offer important as well as relevant information about the software testing process, the team of testers follows a predefined test case template, which allows them to record crucial details about the process, without missing any relevant details. Therefore, the following is a standard template used for creating a test case document:
1. **Test suite ID: **Each test case belongs to a specific test suite. This is the ID used to address it.
2. **Test Case ID: **To denote the test case.
3. **Test Case Description: **A brief summary of the test case along with its objective.
4. **Test prerequisites: **Covers all the chief requirements and preconditions that must be looked into before executing the test case.
5. **Test case procedure: **It is a stepwise strategy to conduct the test.
6. **Test data: **Includes all the data and links relevant to the cause of testing.
7. **Expected result: **The anticipated conclusions from the test are prepared well in advance for verification with actual results of the test.
8. **Actual result: **The results from testing are matched with those from the expected conclusions.
9. **Status and remarks: **Denotes if the tests have been executed and if the application under test has passed or failed the test case. Also includes remarks for improvement in the test case.
10. **Test environment: **It is the platform on which the test case is to be executed. This maybe an operating system, software, or hardware.
11. **Other parameters: **Other parameters which form part of the test case include a mention of the testing date, the author of the test case, the date of creation of the test case, etc.
![]([Notion-hosted image omitted because its URL expires])
![]([Notion-hosted image omitted because its URL expires])
![]([Notion-hosted image omitted because its URL expires])
#### Positive Login Page Test Cases**Positive test cases** are test cases that follow the “happy path,” i.e., testing if the Login page functions as expected under valid inputs. These test cases explore scenarios where users do what they are supposed to do, such as:
1. Valid username and password combination successfully logs the user in.
2. Testing with the minimum allowed username and password length.
3. Testing with a username and password containing alphanumeric characters.
4. Successful login with the "Remember Me" option selected.
5. If the captcha is given correctly
6. If the OTP is given correctly. 
7. Testing login with a username that contains both uppercase and lowercase characters.
8. Successful login using a valid email address as the username.
9. Successful login using a valid phone number as the username.
10. Successful login with multi-factor authentication (MFA) enabled.
11. Testing login with a username that includes special characters (e.g., @, #, \$).
12. Successful login using social media accounts (if applicable).
13. Successful login using biometric authentication (e.g., fingerprint, face recognition).
14. Testing login after a password reset to ensure the new password works.
15. Successful login after an account recovery process.
16. Successful login with localization settings (testing with different languages).
17. Testing login with different browsers (e.g., Chrome, Firefox, Edge).
##### **Negative Login Page Test Cases**
In contrast, **negative testing for the Login page** aims to explore scenarios that deviate from that “happy path”. Users don’t always do what we want them to do. Sometimes they do unexpected things, and a good tester understands that unpredictability to test accordingly. Some common negative test cases you should test on your Login page include:
1. Entering an incorrect password for a valid username.
2. Entering an incorrect username for a valid password.
3. Entering an empty username field.
4. Entering an empty password field.
5. Entering a username that does not exist in the system.
6. Entering a password that does not meet password strength requirements.
7. Testing login with excessively long usernames and passwords.
8. Testing login with an incorrect case (uppercase/lowercase) in the username.
9. Testing login with expired or deactivated user accounts.
10. Testing login with suspended user accounts.
11. Multiple consecutive failed login attempts trigger an account lockout.
12. Testing login after the session has expired due to inactivity.
13. Testing login with incorrect multi-factor authentication (MFA) codes.
14. Entering invalid characters (e.g., scripts) in the username or password fields.
15. Testing login with CAPTCHA validation failure.

##### [**What are the key challenges of software testing?**](https://www.globalapptesting.com/blog/challenges-of-software-testing)
- Rapid technological advancements
- Managing test data and environments
- Ensuring test coverage and effectiveness
- Security and compliance testing
- Resource and budget constraints
- Effective communication in distributed teams
- Integrating testing with Agile and DevOps
- Complex software architectures
- Keeping up with changing user expectations
##### Software Developers vs. Quality Assurance Analysts vs. Testers
<table>
<tr>
<td></td>
<td>**Software Developers**</td>
<td>**Quality Assurance Analysts**</td>
<td>**Testers**</td>
</tr>
<tr>
<td>**Responsibility**</td>
<td>Software Developers are responsible for creating software applications and programs.</td>
<td>Quality Assurance Analysts are responsible ensuring overall quality of application software or program.</td>
<td>Testers are responsible for evaluating problems within application or program.</td>
</tr>
<tr>
<td>**Working**</td>
<td>Software developers generally write code to develop software.</td>
<td>Quality Assurance Analysts generally create test plan, design test cases and execute test cases.</td>
<td>Software tester generally test whether or not code runs as we expected it to run.</td>
</tr>
<tr>
<td>**Primary Focus**</td>
<td>Its main aim is to develop a software that are free from bugs and errors.</td>
<td>Its main is to ensure that the software being developed is of high quality, meets specified requirements, and is free from bugs and errors</td>
<td>Its main aim is to find the problems like errors and bugs from software application.</td>
</tr>
<tr>
<td>**Skills**</td>
<td>They should good in programming languages, problem-solving, algorithm design, and software architecture.</td>
<td>They should have strong analytical and problem-solving skills, understanding of testing methodologies, and attention to detail</td>
<td>They should have knowledge of testing tools and methodologies, and effective communication skills.</td>
</tr>
<tr>
<td>**Goal**</td>
<td>Their goal is to develop a software application that meets user requirement.</td>
<td>Their goal is to Ensure that the software meets specified quality standards and requirements.</td>
<td>Their goal is to reduce or remove error from new software application.</td>
</tr>
</table>

</details>
