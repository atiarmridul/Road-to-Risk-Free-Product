# Test Design and Requirement Traceability

## 🧠 Group 3: Test Case Design Techniques<callout color="gray_bg">
	## **The Different Types of Test Case Design Techniques**
</callout>
**Test case design techniques allow QA engineers to design better test cases, reduce the number of test cases to be executed, and increase testing coverage.**
	
	- **Specific-Based Techniques (Black Box Techniques)**
	- **Boundary value analysis (BVA)**
	- **Equivalence partitioning (EP)**
	- **Decision table testing**
	- **State transition diagrams**
	- **Use case testing**
	
	Equivalence partitioning is a technique of software testing in which input data is divided into partitions of valid and invalid values, and it is mandatory that all partitions exhibit the same behavior. If a condition of one partition is true, then the condition of another equal partition must also be true, and if a condition of one partition is false, then the condition of another equal partition must also be false. The principle of equivalence partitioning is, that test cases should be designed to cover each partition at least once. Each value of every equal partition must exhibit the same behavior as others.
	
---

### Boundary Value AnalysisBoundary value analysis is one of the widely used case design techniques for black box testing. It is used to test boundary values because the input values near the boundary have higher chances of error.
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
![](https://static.javatpoint.com/tutorial/software-testing/images/black-box-testing3.png)
The software system will be passed in the test if it accepts a valid number and gives the desired output, if it is not, then it is unsuccessful. In another scenario, the software system should not accept invalid numbers, and if the entered number is invalid, then it should display error massage.
If the software that is under test, follows all the testing guidelines and specifications then it is sent to the releasing team otherwise to the development team to fix the defects.
1. **Boundary Value Analysis (BVA)** identifies errors at the input domain’s boundary. A simple example of boundary value analysis would be testing a text box that requires the user to enter a number between 1 and 10. In this case, the boundary values would be 1 and 10, and we would test with values that are just above, at, and just below these boundaries. **For example, **we would test with 0, 1, 2, 9, 10, and 11. We can expect that errors or defects are most likely to occur at or near the boundary values. Identifying these issues early can help prevent them from causing problems later in the software development process.
2. **Equivalence Partitioning (EP)** is another technique that helps reduce the required test cases. By partitioning test input data into classes with an equivalent number of data, one can design test cases for each class or partition. This technique ensures that one thoroughly tests the software while minimizing the required test cases. **For example**, if a program requires an input of numbers between 1 and 100, an EP test would include a range of values, such as 1-50 and 51-100, and numbers outside that range, such as -1 or 101. Testing one value from each partition is sufficient to test all values within that partition.
---
#### Equivalence Partitioning Method**Equivalence Partitioning Method** is also known as [**Equivalence class**](https://www.geeksforgeeks.org/equivalence-class/) partitioning (ECP). It is a [**software testing**](https://www.geeksforgeeks.org/software-testing-basics/) technique or [**black-box testing**](https://www.geeksforgeeks.org/software-engineering-black-box-testing/) that divides the input domain into classes of data, and with the help of these classes of data, test cases can be derived. An ideal test case identifies a class of error that might require many arbitrary test cases to be executed before the general error is observed.
In equivalence partitioning, equivalence classes are evaluated for given input conditions. Whenever any input is given, the type of input condition is checked, and then for this input condition, the Equivalence class represents or describes the set of valid or invalid states.
**Guidelines for Equivalence Partitioning :**
- If the range condition is given as an input, then one valid and two invalid equivalence classes are defined.
- If a specific value is given as input, then one valid and two invalid equivalence classes are defined.
- If a member of a set is given as an input, then one valid and one invalid equivalence class is defined.
- If Boolean no. is given as an input condition, then one valid and one invalid equivalence class is defined.
![](https://media.geeksforgeeks.org/wp-content/uploads/20200619141948/Untitled57567.png)
**Example-1:**
Let us consider an example of any college admission process. There is a college that gives admissions to students based on their percentage.
Consider a percentage field that will accept a percentage only between 50 to 90 %, more and even less than not be accepted, and the application will redirect user to an error page. If the percentage entered by user is less than 50 %or more than 90 %, that equivalence partitioning method will show an invalid percentage. If the percentage entered is between 50 to 90 %, then the equivalence partitioning method will show a valid percentage.
![](https://media.geeksforgeeks.org/wp-content/uploads/20200619154049/Untitled454.png)
---
##### **Combined Use of BVA and EP:**
- **Complementary Techniques:** BVA and EP are often used together. EP helps reduce the overall number of test cases by grouping inputs, while BVA focuses on edge cases, ensuring that the most error-prone values are tested.
- **Improved Defect Detection:** By combining EP for general input coverage and BVA for edge cases, testers can detect a wide range of defects efficiently.
---
---
#### 🔗 Group 4: Requirement Traceability Matrix (RTM)
##### Traceability Matrix
A traceability matrix is a table-type document that is used in the development of software applications to trace requirements. It can be used for both forward (from Requirements to Design or Coding) and backward (from Coding to Requirements) tracing. It is also known as the **Requirement Traceability Matrix (RTM) or Cross Reference Matrix (CRM).**
It is prepared before the test execution process to make sure that every requirement is covered in the form of a Test case so that we don't miss out any testing. In the RTM document, we map all the requirements and corresponding test cases to ensure that we have written all the test cases for each condition.
This document is designed to make sure that each requirement has a test case, and the test case is written based on business needs, which are given by the client. It will be performed with the help of the test cases if any requirement is missing, which means that the test case is not written for a particular need and that specific requirement is not tested because it may have some bugs. The traceability is written to make sure that the entire requirement is covered.
Generally, this is like a worksheet document, which contains a table, but there are also many user-defined templates for the traceability matrix. Each requirement in the traceability matrix is connected with its respective test case so that tests can be carried out sequentially according to specific requirements.
##### RTM Template
Below is the sample template of requirement traceability matrix (RTM):
![](https://static.javatpoint.com/tutorial/software-testing/images/traceability-matrix3.png)
##### Example of RTM template
Let us one sample of RTM template for better understanding:
![](https://static.javatpoint.com/tutorial/software-testing/images/traceability-matrix4.png)
##### Goals of Traceability Matrix
- It helps in tracing the documents that are developed during various phases of SDLC.
- It ensures that the software completely meets the customer's requirements.
- It helps in detecting the root cause of any bug.
---
---
#### 📊 Group 5: Decision Table Testing
##### Decision Table
Decision table testing is a software testing technique used to test system behavior for different input combinations. This is a systematic approach where the different input combinations and their corresponding system behavior (Output) are captured in a tabular form. 
**Decision Table Testing is Important** because it helps to test different combinations of conditions and provides better test coverage for complex business logic. When testing the behavior of a large set of inputs where system behavior differs with each set of inputs, decision table testing provides good coverage, and the representation is simple so it is easy to interpret and use.
In Software Engineering, boundary value and equivalent partition are other similar techniques used to ensure better coverage. They are used if the system shows the **same **behavior for a large set of inputs. However, in a system where for each set of input values the system behavior is **different**, boundary value and equivalent partitioning techniques are not effective in ensuring good test coverage.
In this case, decision table testing is a good option. This technique can make sure of good coverage, and the representation is simple so that it is easy to interpret and use.
**Example: How to make a Decision Table for the Upload Screen**
Now consider a dialogue box that will ask the user to upload a photo with certain conditions, like –
1. You can upload only ‘.jpg’ format images
2. file size less than 32kb
3. resolution 137\*177.
If any of the conditions fail the system will throw a corresponding error message stating the issue, and if all conditions are met photo will be updated successfully
![](https://www.guru99.com/images/1/120817_0759_DecisionTab2.png)
Let’s create the decision table for this case.
<table>
<tr>
<td>Conditions</td>
<td>Case 1</td>
<td>**Case 2**</td>
<td>Case 3</td>
<td>Case 4</td>
<td>Case 5</td>
<td>Case 6</td>
<td>Case 7</td>
<td>Case 8</td>
</tr>
<tr>
<td>**Format**</td>
<td>.jpg</td>
<td>.jpg</td>
<td>.jpg</td>
<td>.jpg</td>
<td>Not .jpg</td>
<td>Not .jpg</td>
<td>Not .jpg</td>
<td>Not .jpg</td>
</tr>
<tr>
<td>**Size**</td>
<td>Less than 32kb</td>
<td>Less than 32kb</td>
<td>\>= 32kb</td>
<td>\>= 32kb</td>
<td>Less than 32kb</td>
<td>Less than 32kb</td>
<td>\>= 32kb</td>
<td>\>= 32kb</td>
</tr>
<tr>
<td>**resolution**</td>
<td>137\*177</td>
<td>Not 137\*177</td>
<td>137\*177</td>
<td>Not 137\*177</td>
<td>137\*177</td>
<td>Not 137\*177</td>
<td>137\*177</td>
<td>Not 137\*177</td>
</tr>
<tr>
<td>**Output**</td>
<td>Photo uploaded</td>
<td>Error message resolution mismatch</td>
<td>Error message size mismatch</td>
<td>Error message size and resolution mismatch</td>
<td>Error message for format mismatch</td>
<td>Error message format and resolution mismatch</td>
<td>Error message for format and size mismatch</td>
<td>Error message for format, size, and resolution mismatch</td>
</tr>
</table>
For this condition, we can create 8 different test cases and ensure complete coverage based on the above table.
1. Upload a photo with format ‘.jpg’, size less than 32kb, and resolution 137\*177, and click on upload. The expected result is Photo should upload successfully
2. Upload a photo with format ‘.jpg’, size less than 32kb, and resolution not 137\*177, and click on upload. The expected result is Error message resolution mismatch should be displayed
3. Upload a photo with format ‘.jpg’, size more than 32kb, and resolution 137\*177, and click on upload. The expected result is Error message size mismatch should be displayed
4. Upload a photo with format ‘.jpg’, size more than equal to 32kb, and resolution not 137\*177, and click on upload. The expected result is Error message size and resolution mismatch should be displayed
5. Upload a photo with a format other than ‘.jpg’, size less than 32kb, and resolution 137\*177, and click on upload. The expected result is Error message for format mismatch should be displayed
6. Upload a photo with a format other than ‘.jpg’, size less than 32kb, and resolution not 137\*177, and click on upload. The expected result is Error message format and resolution mismatch should be displayed
7. Upload a photo with a format other than ‘.jpg’, size more than 32kb, and resolution 137\*177, and click on upload. The expected result is Error message for format and size mismatch should be displayed
8. Upload a photo with a format other than ‘.jpg’, size more than 32kb, and resolution not 137\*177, and click on upload. The expected result is Error message for format, size, and resolution mismatch should be displayed
---
---
