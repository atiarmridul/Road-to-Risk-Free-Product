# Different Types of Testing

> **Manual Testing**

Manual testing is a software testing process in which test cases are executed manually without using any automated tool. All test cases are executed by the tester manually according to the end user's perspective. It ensures whether the application is working, as mentioned in the requirement document or not. Test cases are planned and implemented to complete almost 100 percent of the software application. Test case reports are also generated manually. Manual Testing is one of the most fundamental testing processes as it can find both visible and hidden defects in the software. The difference between the expected output and the output, given by the software, is defined as a defect. The developer fixed the defects and handed it to the tester for retesting.

Manual testing is mandatory for every newly developed software before automated testing. This testing requires great effort and time, but it gives the surety of bug-free software. Manual Testing requires knowledge of manual testing techniques but not of any automated testing tool.
There are various methods used for manual testing. Each technique is used according to its testing criteria. Types of manual testing are given below:

> **White Box Testing**

The White Box Test method is the one that looks at the code and structure of the product to be tested and uses that knowledge to perform the tests. This method is used in the Unit Testing phase, although it can also occur in other states such as Integration Tests. For the execution of this method, the tester or the person who will use this method must have extensive knowledge of the technology used to develop the program

> **Black Box Testing**:

Black Box Testing is the method that does not consider the internal structure, design, and product implementation to be tested. In other words, the tester does not know its internal functioning. The Black Box only evaluates the external behavior of the system. The inputs received by the system and the outputs or responses it produces are tested

> **Unit Testing **

> **System Testing**

System testing, also referred to as *system-level testing* or *system integration testing*, is the process in which a quality assurance (QA) team evaluates how the various components of an application interact together in the full, integrated system or application.

System testing verifies that an application performs tasks as designed. It's a type of black box testing that focuses on the functionality of an application rather than the inner workings of a system, which white box testing is concerned with.

System testing, for example, might check that every kind of user input produces the intended output across the application. System testing is the third level of testing in the software development process. It's typically performed before acceptance testing and after integration testing.

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

It is [**formal testing**](https://www.geeksforgeeks.org/formal-testing/) according to user needs, requirements, and business processes conducted to determine whether a system satisfies the acceptance criteria or not and to enable the users, customers, or other authorized entities to determine whether to accept the system or not.

Acceptance Testing is the last [**phase of software testing**](https://www.geeksforgeeks.org/software-testing-life-cycle-stlc/) performed after [**System Testing **](https://www.geeksforgeeks.org/system-testing/)and before making the system available for actual use.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/ff0851be-bd72-4668-b9b6-d6098d821c49/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z3ME3NE%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIHBdvXN5jQFVqVBRc2DeA08OOCfkxZVItaYnDKYhG5z9AiBMlNbMk9ftpjgSFF1RGHLuaQrAJA1LrzPnQWOIL0MZeir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMmYrNQpmUkBtsOGk4KtwDdDxCo%2FaC%2FdLgsbyLsbTMgJ9tEzbtxGxr%2Bxx79zkEpMa7Cpch%2F3%2F3lcAwS2gQV73LADWlH23oq1bGM0WSGjJ81qxSOfkOMHKxxe%2BIYNhS%2FRu79tF46UMQ14ddXDdumrKrIFmUeGnH8ez%2BspThf8JCpLrCsrquaCXnd7V3hIBi70EkqjqKSbx4vUDIkLzHfC6uzlzVRf%2BntDgmaB4x%2FkooZt%2FW1dzYYZz%2BkByc1QLnZAcJ%2BoSNC%2BQDhsV%2BsfiCaFV19nk0xgzU1HO85vQwbNK0dlj9UH1Wwl16pYF3%2FNKLf9ue%2F17Tq13LuL%2BGu35nvHsbkrrQNqRoMDerDI%2Fp8h0xn9rNKEFkdNR10pvBWHSDv%2F%2FSX4F61OU%2FKz3utpkNyLKmsBuQvqr%2FKqnOzZBrvnXPM0RDbNR8oK5LjykZZTGeMFXNwhUIoEf%2BT%2BqGd2B1uIbIDbcQpVe9IY5IrxIjeqz1EebUGamD3ZKeHgjhKc8ja9GQsrY3Yc5BSbkMSQ7ElaUC01P3B5sFPj3goMRoP4YyOVZNsJ4tLgjhl5FoKgn3ej4es0C%2BlMM1Z6Sj4X37sD8sXc8V%2BDUH1vwoJ%2FoeXCQbFeb14pJNDhYst90fC%2BjsRJFT%2FvQPvDEUdoUARl0w0qnSzwY6pgHKZ8KBc4U%2BZHu34bjTY%2BeOsozmpmBkRxuynP0wBohxATJ5fmJV2NEqYEkshNlilKKIFLFjuRXU105yvAHBXqjoVHcMa8lrkk73ZdDlgX%2FrFm%2FolTz6rGFKBDd33HPN8RvA1P7uIMNjM8k2ZPVbmgCZbeohYmxR9QnxTv8ecAoIR9wUGc34%2FLG9jVcF663b%2Brcx4kCZ%2FAXU1IBYWbTWZnMwHCmAuEUa&X-Amz-Signature=b2bb75f4fe06517a3430903676bfc4ab703eb16ec2aeabb7c7568cabd795cd13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

> **User Acceptance Testing (UAT)**

User Acceptance Testing (UAT) serves the purpose of ensuring that the software meets the **business requirements** and is ready for **deployment** by validating its functionality in a real-world environment. It allows **end-users** to test the software to ensure it meets their needs and operates as expected, helping to identify and fix any issues before the final release. UAT is crucial for **quality assurance** and **customer satisfaction**, as it ensures that the software is **user-friendly**, **reliable**, and meets all specified **criteria**.

  **Acceptance criteria attributes for UAT**

  - Completeness

  - Accuracy

  - User-friendliness

  - Performance

  - Reliability

  - Security

  - Scalability

  - Compatibility

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/6ebee26b-96b0-4118-82d0-e4e1dd58c535/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RRHKI4V%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIGmOLzDX%2BfJs0hGlfYOl8E9Utcj71VHO00KCQDMp1JsYAiA0CRng4giiXMrIqPLsDOy5pQWOw8w8nJz0HnLXeypMvCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMcz945cUFWHr3nmUqKtwDZYVmUCQ1LTmvif%2FOQQoSFPaLvbBGu1Bi%2BTxcedwuc6dx3%2BgXIdNo%2BhucEOV9StY0qgF24MKzaFSc67AY4hlFakXCfYCXqrDH5oDG3U%2Ft8mFiuaX6CuPNICCiEBlXA3NaV8ofXbK%2BcrfePXf6tljk4V70QN7GO4MIj8rZLjFKnPYHAV6E%2BMVHYmbclxb1bPsL4xs5xEp3AEIPXiVc4PdDCm8K5ehWCFAvzzdP%2FyWz7FJnUm3lzrwdx2OIw5LQHgraR%2FHeuLvYC03qq7X6PCvciht74hgE9psTu9bPJnCRkl916mMx8AwNP8TCPAtQksrFpr6%2BZVLx1Kj2loR2m3P4NU%2BUNO7J6ziN0sD43uj89Mdl6JAW7Uk8ctAVIMY%2B%2BLruPJl6g4pZm%2BRFwQrGeFJC520ykGRF4TV2%2BrGbcI%2FC87u31IAw%2FKY90UVcD4INNxA8e39T%2BUsFqnN4xRh41jmtbxYdJ%2Bbe0YD4VthIlNodVMdU8uTlvZhJkOQjJTtoOGTSQNpnz2NFEGMm3ZB3wBpwi5qt9A1MliY7iRD0LkuYdiGFkQ4Ct8LoYJCb0PyMMVCsSeVnnOwOvZDS3roLF%2BN0Xf%2BNsbIIV7EJHr9lBkhpKa4JfznYiSE6%2FmxgmRAwoajSzwY6pgH0P5h4vTPmjMuCGhs5QzDeBnMgpnqIUk7TBkW9oED7q%2B8tbJCXtUWauVSBEuipY23p5wygkKRkeh50IP6lnnaCSOduY88qa%2FhmUgbp%2BDILjoNtuBFWIcPX7eZBhv8ciF2nF1UwaxKUm3tYDniYZxb2aAR7QKJT%2BpvpoaWqrx2CIau%2FoSoDrq3pdkxK18r8sgQrON6SE3lyafGvBUOYNG7RKGYjb%2BwU&X-Amz-Signature=30a09a24b93f5f8cadb036b27927ecee0d0a540333ec733b71db991406356104&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

> **Adhoc Testing :**

Adhoc testing is a type of software testing that is performed informally and randomly after the formal testing is completed to find any loopholes in the system. For this reason, it is also known as Random or Monkey testing. Adhoc testing is not performed in a structured way, so it is not based on any methodological approach. That’s why Adhoc testing is a type of Unstructured Software Testing.

  **Adhoc testing has –**

    - No Documentation.

    - No Test cases.

    - No Test Design.

> **Monkey Testing**

Monkey testing is a type of software testing in which the tester tests the application or software by providing some random inputs and checking the behavior of the application or the software. It is also observed by seeing whether the application or software crashes on a given input or not. Monkey testing is usually implemented as random and automated unit testing. Monkey testing is named because of the Infinite Monkey Theorem. The Monkey Theorem describes that a monkey hitting keys at random on a typewriter keyboard for a random amount of time will almost type a given text. In Monkey Testing, the tester is considered the Monkey. Like a monkey who uses a computer, he will randomly perform any task on the system that is beyond his understanding, the same as the tester applying random test cases on the system under test to find defects without creating any test cases. Monkey Testing is also part of the standard testing tools for stress testing in Android Studio.

> **Exploratory Testing**

**Exploratory Testing** is a type of **software testing** in which the tester is free to select any possible methodology to test the software. It is an unscripted approach to software testing. In exploratory testing, software developers use their learning, knowledge, skills, and abilities to test the software developed by themselves. Exploratory testing checks the functionality and operations of the software as well as identifies the functional and technical faults. Exploratory testing aims to optimize and improve the software in every possible way. The exploratory testing technique combines the experience of testers with a structured approach to testing. It is often performed as a black box testing technique. Exploratory testing is an unscripted testing technique.

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/357a37d7-845b-4bb7-a8f3-1feb2646f1c8/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z3ME3NE%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIHBdvXN5jQFVqVBRc2DeA08OOCfkxZVItaYnDKYhG5z9AiBMlNbMk9ftpjgSFF1RGHLuaQrAJA1LrzPnQWOIL0MZeir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMmYrNQpmUkBtsOGk4KtwDdDxCo%2FaC%2FdLgsbyLsbTMgJ9tEzbtxGxr%2Bxx79zkEpMa7Cpch%2F3%2F3lcAwS2gQV73LADWlH23oq1bGM0WSGjJ81qxSOfkOMHKxxe%2BIYNhS%2FRu79tF46UMQ14ddXDdumrKrIFmUeGnH8ez%2BspThf8JCpLrCsrquaCXnd7V3hIBi70EkqjqKSbx4vUDIkLzHfC6uzlzVRf%2BntDgmaB4x%2FkooZt%2FW1dzYYZz%2BkByc1QLnZAcJ%2BoSNC%2BQDhsV%2BsfiCaFV19nk0xgzU1HO85vQwbNK0dlj9UH1Wwl16pYF3%2FNKLf9ue%2F17Tq13LuL%2BGu35nvHsbkrrQNqRoMDerDI%2Fp8h0xn9rNKEFkdNR10pvBWHSDv%2F%2FSX4F61OU%2FKz3utpkNyLKmsBuQvqr%2FKqnOzZBrvnXPM0RDbNR8oK5LjykZZTGeMFXNwhUIoEf%2BT%2BqGd2B1uIbIDbcQpVe9IY5IrxIjeqz1EebUGamD3ZKeHgjhKc8ja9GQsrY3Yc5BSbkMSQ7ElaUC01P3B5sFPj3goMRoP4YyOVZNsJ4tLgjhl5FoKgn3ej4es0C%2BlMM1Z6Sj4X37sD8sXc8V%2BDUH1vwoJ%2FoeXCQbFeb14pJNDhYst90fC%2BjsRJFT%2FvQPvDEUdoUARl0w0qnSzwY6pgHKZ8KBc4U%2BZHu34bjTY%2BeOsozmpmBkRxuynP0wBohxATJ5fmJV2NEqYEkshNlilKKIFLFjuRXU105yvAHBXqjoVHcMa8lrkk73ZdDlgX%2FrFm%2FolTz6rGFKBDd33HPN8RvA1P7uIMNjM8k2ZPVbmgCZbeohYmxR9QnxTv8ecAoIR9wUGc34%2FLG9jVcF663b%2Brcx4kCZ%2FAXU1IBYWbTWZnMwHCmAuEUa&X-Amz-Signature=674a8eb06eee3bbd2f700a10381d87036bb3dc0aa4b8379cdd48933c4e967bb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/7cb55770-5cbb-4205-94bc-85aca161a9b4/8f6f9459-8f24-4be0-95fe-663325d740fb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Z3ME3NE%2F20260501%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260501T120002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIHBdvXN5jQFVqVBRc2DeA08OOCfkxZVItaYnDKYhG5z9AiBMlNbMk9ftpjgSFF1RGHLuaQrAJA1LrzPnQWOIL0MZeir%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMmYrNQpmUkBtsOGk4KtwDdDxCo%2FaC%2FdLgsbyLsbTMgJ9tEzbtxGxr%2Bxx79zkEpMa7Cpch%2F3%2F3lcAwS2gQV73LADWlH23oq1bGM0WSGjJ81qxSOfkOMHKxxe%2BIYNhS%2FRu79tF46UMQ14ddXDdumrKrIFmUeGnH8ez%2BspThf8JCpLrCsrquaCXnd7V3hIBi70EkqjqKSbx4vUDIkLzHfC6uzlzVRf%2BntDgmaB4x%2FkooZt%2FW1dzYYZz%2BkByc1QLnZAcJ%2BoSNC%2BQDhsV%2BsfiCaFV19nk0xgzU1HO85vQwbNK0dlj9UH1Wwl16pYF3%2FNKLf9ue%2F17Tq13LuL%2BGu35nvHsbkrrQNqRoMDerDI%2Fp8h0xn9rNKEFkdNR10pvBWHSDv%2F%2FSX4F61OU%2FKz3utpkNyLKmsBuQvqr%2FKqnOzZBrvnXPM0RDbNR8oK5LjykZZTGeMFXNwhUIoEf%2BT%2BqGd2B1uIbIDbcQpVe9IY5IrxIjeqz1EebUGamD3ZKeHgjhKc8ja9GQsrY3Yc5BSbkMSQ7ElaUC01P3B5sFPj3goMRoP4YyOVZNsJ4tLgjhl5FoKgn3ej4es0C%2BlMM1Z6Sj4X37sD8sXc8V%2BDUH1vwoJ%2FoeXCQbFeb14pJNDhYst90fC%2BjsRJFT%2FvQPvDEUdoUARl0w0qnSzwY6pgHKZ8KBc4U%2BZHu34bjTY%2BeOsozmpmBkRxuynP0wBohxATJ5fmJV2NEqYEkshNlilKKIFLFjuRXU105yvAHBXqjoVHcMa8lrkk73ZdDlgX%2FrFm%2FolTz6rGFKBDd33HPN8RvA1P7uIMNjM8k2ZPVbmgCZbeohYmxR9QnxTv8ecAoIR9wUGc34%2FLG9jVcF663b%2Brcx4kCZ%2FAXU1IBYWbTWZnMwHCmAuEUa&X-Amz-Signature=dce9ef32846da77957c7d7b9f66184ed978eaf47794a7bf12b44253027820d43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

> **Integration Testing**

Integration testing -- also known as integration and testing (I&T) -- is a type of software testing in which the different units, modules, or components of a software application are tested as a combined entity. However, these modules may be coded by different programmers.

Integration testing aims to test the interfaces between the modules and expose any defects that may arise when these components are integrated and need to interact with each other.

> **Positive Testing? **

It is used to check whether our application works as expected or not. If an error is detected at the time of positive testing, the test is considered a failure. Positive testing is a technique whenever a test engineer writes the test cases for a set of respective outputs.

In positive testing, the test engineer will always check for only a good set of values. In other words, we can say that **positive testing** is a process where the system or an application is tested against the valid input data.

And the primary purpose of performing the positive testing is to validate whether the software does what it is supposed to do.

In simple terms, we can say that positive testing is implemented by providing a **positive point of view.**

> **Negative Testing**

**It is implemented to check how the application can gracefully handle invalid input or unpredictable user performance.**

**The fundamental purpose of executing the negative testing is to ensure the application's stability against the effects of different variations of improper validation data sets.**

Negative testing is also known as **error path testing or failure**. And it helps us to identify more bugs and enhance the quality of the software application under test.

Once the positive testing is complete, we can only execute the negative testing, which helps to identify more bugs and enhance the quality of the software application under test.

We can say that the negative testing is executed by keeping the **negative point of view** in simple terms.

> **Alpha Testing**

Alpha Testing is an essential phase in software testing conducted by the development or QA team before beta testing. It aims to identify and fix bugs in a controlled environment that simulates real-world conditions. This helps ensure the software’s functionality, reliability, and stability. Alpha testing combines white-box and black-box testing techniques to explore and evaluate the software.

***Test server at Audacity
**

> **Beta Testing**

Beta testing is the process of testing a software product or service in a real-world environment before its official release. It is an essential step in the software development lifecycle as it helps identify bugs and errors that may have been missed during the development process.

During beta testing, the software is made available to a selected group of users who are willing to test the product and provide feedback to the developers. The beta testers typically use the software in various ways, attempting to find any issues, bugs, or usability problems. They then provide feedback on their experience, reporting any issues encountered.

> **Usability Testing**

**Usability Testing in software testing** is a type of testing, that is done from an end user’s perspective to determine if the system is easily usable. Usability testing is generally the practice of testing how easy a design is to use on a group of representative users. Several tests are performed on a product before deploying it. You need to collect [**qualitative and quantitative data**](https://www.geeksforgeeks.org/difference-between-qualitative-and-quantitative-data/#:~:text=Quantitative%20data%20is%20numerical%2C%20countable,or%20contexts%20behind%20certain%20behaviors.) and satisfy customers’ needs with the product. A proper final report is made mentioning the changes required in the product (software).

Usability testing involves evaluating the functionality of a website, app, or digital product by observing real users as they navigate through it. Typically conducted by researchers, either in-person or remotely, the aim is to identify any areas of confusion or difficulty users encounter while completing tasks.

The ultimate goal of usability testing is to uncover pain points in the user experience, revealing opportunities for improvement. By assessing how efficiently users achieve their goals within the product, usability testing helps enhance its overall functionality and user satisfaction.

> **A/B Testing**

A/B testing (also known as [split testing](https://www.optimizely.com/optimization-glossary/split-testing/) or [bucket testing](https://www.optimizely.com/optimization-glossary/bucket-testing/)) is a methodology for comparing two versions of a webpage or app against each other to determine which one performs better. A/B testing is essentially an experiment where two or more variants of a page are shown to users at random, and statistical analysis is used to determine which variation performs better for a given conversion goal.

> **Performance Testing**

Performance testing is the testing of an application’s stability and response time by applying load.

The word stability means the ability of the application to withstand in the presence of load. Response time is how quickly an application is available to users. Performance testing is done with the help of tools. Loader.IO, JMeter, LoadRunner, etc. are good tools available in the market.

> **Load  Testing**

Load testing is the testing of an application’s stability and response time by applying load, which is equal to or less than the designed number of users for an application.

- For example, if your application handles 100 users at a time with a response time of 3 seconds, then load testing can be done by applying a load of a maximum of 100 or less than 100 users. The goal is to verify that the application is responding within 3 seconds for all the users.

> **Stress Testing**

Stress testing is testing an application’s stability and response time by applying load, which is more than the designed number of users for an application.

- For example, if your application handles 1000 users at a time with a response time of 4 seconds, then stress testing can be done by applying a load of more than 1000 users. Test the application with 1100,1200,1300 users and notice the response time. The goal is to verify the stability of an application under stress.

> **Endurance Testing**

Endurance testing is testing an application’s stability and response time by applying a load continuously for a longer period to verify that the application is working fine.

- For example, car companies soak testing to verify that users can drive cars continuously for hours without any problem.

> **Security Testing**

It is a type of testing performed by a special team. Any hacking method can penetrate the system.

Security Testing is done to check how the software, application, or website is secure from internal and/or external threats. This testing includes how much software is secure from malicious programs, viruses and how secure & strong the authorization and authentication processes are.

It also checks how the software behaves for any hacker’s attack & malicious program and how software is maintained for data security after such a hacker attack.
