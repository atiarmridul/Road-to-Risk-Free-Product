# Senior QA Core Answer Notes

## Questions To Prepare: complete Notion material

> Notion deep dive: https://app.notion.com/p/101995ff8e4680e8aab6c5eed5cc62e2
>
> This section preserves detailed material from the original Notion page. It follows the shorter study-oriented explanation above.

<details>
<summary>Open the complete detailed material</summary>

1. Do you have any experience with security testing (e.g., SQL injection, encryption & decryption)?
2. Which test management tools have you used?

1. If a defect is rejected by DEV, what steps would you follow to prove your point that it is a defect?
	BRS / SRS  
	Bug Advocacy: [Bug Advocacy-An Effective Way of Writing A BUG \| LinkedIn](https://www.linkedin.com/pulse/bug-advocacy-an-effective-way-writing-muhammad-mamunur-rashid-4o5sc/)

1. A transaction of \$1 is not showing up in the target system – What priority & severity would you assign to the defect? If there is any workaround, will there be any change in priority & severity?
Answer: low and low

1. What is the workflow of the project you worked on?
2. What estimation techniques have you used? [Answer](https://testlio.com/blog/test-estimation-techniques/)

1. How do you approach capacity planning?

1. How do you monitor resources who are reporting to you?
2. What environment management activities have you been involved in?

1. How would you start a security testing project from scratch?
2. What are the key considerations when preparing a regression suite? [Answer ](https://medium.com/@case_lab/how-to-write-a-regression-test-plan-best-practices-checklist-for-effective-regression-testing-e17fca6c2b23)


1. How did you resolve conflicts within the team?
	- Identify the root cause
	- Choose an appropriate approach
	- Focus on the solution, not the problem
	- Communicate respectfully and constructively
	- Follow up and monitor the outcome
	
2. What is the difference between a Test Plan and a Test Strategy document?

##
Q2) What is Defect Cascading?
Answer: Defect cascading occurs when one defect leads to the discovery of more defects during integration testing. Fixing a primary defect can often reveal additional, hidden issues within the system.
Q3) What is a Latent Defect?
Answer: A latent defect is a hidden issue that goes unnoticed during testing and may only surface after the software is released. It typically only becomes visible when a specific task or scenario triggers it.
Q4) What is Fault/ Defect Masking? Explain with an example.
Answer: Fault masking happens when one defect hides another defect.
Example: Suppose there is a defect in an e-commerce website’s discount calculation. However, the fault is masked because the final amount shown in the cart always rounds the number to the nearest dollar. This hides the underlying discount calculation error, preventing it from being noticed. Only when the rounding issue is fixed would the original defect in the discount calculation become visible.

</details>

---
