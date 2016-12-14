---
layout: post
name: Approaching Outside-in TDD on Android III
title: 'Approaching Outside-in TDD on Android III'
author: Carlos Morera de la Chica
image:
    src: /assets/img/custom/blog/outside-in-3.jpg
tags: 
- android
- tdd 
- design
canonical:
    name: my personal blog
    href: https://carlosmchica.github.io/approaching-tdd-outside-android-iii/

---

<a href="/2016/09/29/approaching-tdd-outside-android-ii/">In the previous post</a>, we wrote the acceptance test as a first step and started creating the classes on the entry points of our system. In this post, we will finish implementing the system, and will summarize what we have learnt during the process.

<h2>Inner loop continuation</h2>
To finish the <b>BankAccount</b> class, we need to implement its last public method, <b>showStatement</b>. Let's dive into the next iteration of the inner loop cycle.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #d32f2f; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/0a0af116beacac964c95552dcef5ae120d2ff817">Red</a> - We created a `StatementFormatter` to format the statement lines. We considered the statement to be a domain concept important enough to have its own class. It acts as a first class collection around the statement lines that attracts behaviour related to the statement lines.
The failing test ensures that when we show an account statement, the view is called with the appropriate statement lines.</li>

<li><span style="color: #388e3c; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/dd1a92aaf6b6480ac2dbfcdaf29188fdcb2b7611">Green</a> - The implementation is quite simple in this case. The BankAccount just needs to create a new statement with the transactions from the repository, pass it to the formatter to format and show the formatted statement using the view.</li>
<li><span style="color: #1976d2; padding-right: 5px;">●</span>Refactor - Nothing to refactor here.</li>
</ul>

As a rule of thumb, once a class is done, the next step is to run the acceptance test to check the progress and to know which collaborator to implement next. 

If we executed the acceptance test at this point, we would see that the <b>TransactionRepository</b> throws an UnsupportedOperationException. As we stated before, throwing an exception in the methods that we have not implemented yet will guide us through the feature implementation and will point us to the next collaborator to implement. It is quite important, as doing so, we have greater control over the current feature progress. We just need to follow the exceptions until the feature is fully implemented.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #d32f2f; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/f1585c33ae99ed2daa3aec6a6b9b9e999e8e391e">Red</a> - `TransactionRepository` is a leaf node in the tree of collaborators. That means it does not collaborate with other classes. Leaf nodes can not be tested using mocks as there is no collaboration, so we need to flip to the classicist style of TDD and test through state rather than through behaviour. TransactionRepository is going to be implemented as an in-memory storage, so we decided to test it by storing a transaction and checking that the list returned in the transactions method contains the previously stored transaction.</li>
<li><span style="color: #388e3c; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/6b0bf42d59285675f66130ed39851e0ffa11bfa7">Green</a> - To make the test pass we just need to return the current list of transactions. As a best practice, we recommend to return an immutable list. This protects the result from being modified by clients.</li>
<li><span style="color: #1976d2; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/f999927fe0ca18b16baeae874925e7df20b9782d">Refactor</a> - Some readability improvements in the test for TransactionRepository. Remember that readability is important both in production and test code.</li>
</ul>

Now that TransactionRepository is done, if we execute the acceptance test, <b>StatementFormatter</b> throws an UnsupportedOperationException. That means that it should be the next one to be implemented.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #d32f2f; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/1ed74959bbac34e57493b217a644d5e5ce05499d">Red</a> - StatementFormatter is responsible for creating ViewStatementLines from a given Statement, and sorting them in reverse chronological order. In order to do so, the StatementFormatter has to take the StatementLines from the Statement, map them to ViewStatementLines and sort them. This is tested by stubing the StatementLines that the Statement returns and asserting that the output of the format method contains the expected ViewStatementLine information and order.</li>
</ul>

Note that we are not going to fulfil the statementLines method yet. Instead we mock it and throw an UnsupportedOperationException accordingly. We will jump there when needed.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #388e3c; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/8a262bf34a4f50d900996b22ac1465c24a219ffc">Green</a> - As described before, the production code for the StatementFormatter takes the lines from the statement, sort them in inverse chronological order and map them them to ViewStatementLines.</li>
<li><span style="color: #1976d2; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/2b0755e733a7ee570f8fcd
a46d5ca6975f50f5a5">Refactor</a> - We extracted a method that maps a line in the production code and do some clean up in the test code.</li>
</ul>

Once again, we run the acceptance test to check the progress and now it guides us to the lines method in the Statement class (the one that we just mocked in the previous inner loop to implement the StatementFormatter). Let's get rid of the exception and jump into the next inner loop.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #d32f2f; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/e53c6ba6bcec339af7cdfaab148c24fa8aa8ac55">Red</a> - Statement has to map every transaction to a StatementLine that contains amount, date and running balance.
As in the case of the TransactionRepository, Statement is a leaf node. Therefore, it is tested using the classicist approach by asserting the state of the StatementLines returned in the lines method.</li>
<li><span style="color: #388e3c; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/67631395b147b31bd1887fdad8485a298e6eff12">Green</a> - The implementation just maps all transactions of the Statement to StatementLines, calculating their current balance.</li>
<li><span style="color: #1976d2; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/8f4e26cd2f9387c9f8d0102a026f4f6ef58bcc7d" >Refactor</a> - We extracted some methods in the production code and improved test readability.</li>
</ul>

We are now done with the Statement class. Let's run the acceptance test again to find out that the next class that needs to be implemented is the show method of the <b>ShowStatementActivity</b>.

<ul style="display: inline-block; list-style: none; text-align: left;">
<li><span style="color: #d32f2f; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/b325378396244bcfb04bf2fb14eaf76ea40a5a0d">Red</a> - During most of the implementation we were not dealing with any Android code. At this level we moved back to the to UI layer and, as the code is running inside an Activity, we have to write the unit test using Espresso. Here we need to test that once the show method is called, the RecyclerView contains a list of rows representing the information contained in the given ViewStatementLines.</li>
<li><span style="color: #388e3c; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/27bc2ac899dbdb111589573a0034683a311dc29e">Green</a> - In order to show the required rows in the RecyclerView we need to make some steps. First we need to create a RecyclerView.Adapter that holds the dataset and creates the required ViewHolder associated with every row contained in the RecyclerView.</li>
<li><span style="color: #1976d2; padding-right: 5px;">●</span><a href="https://github.com/CarlosMChica/AndroidBankKata/commit/edc71bc16c37c2113b5650bac1ba97b8758fb7cd">Refactor</a> - Improves test readability.</li>
</ul>

If we execute the acceptance test at this point, we can see that it passes. We can consider the feature DONE as it passes the given acceptance criteria in an automated fashion.

<h2>Conclusions</h2>

To wrap-up the series, we are going to summarize what we have learnt and make some comments about our implementation.

We would like to mention that we have used Espresso to assert the state of the views in Android, but you could use the testing framework that works best for you, i.e. Cucumber.

That being said, we have found that outside-in is an approach that requires good design skills and that we need to have a good idea of how the design of the system will look like beforehand. It usually means that we have built a similar feature or system in the past and therefore we have an overall idea of what we need and where we are led to.

<h3>PROS</h3>
<ul>
<li>The public interface of every class is always designed to serve an existing client. As we work from the outside in, clients are implemented first, and they define the public API of the classes they collaborate with. The resulting design should read better, adhere well to the “tell don't ask” principle, and tend to avoid feature envy and anaemic domain models.</li>
<li>Benefits of acceptance tests included in the outside-in flow:
<ul style="margin:0;">
<li>Automated requirements validation.</li>
<li>Offer a way to check the progress of a feature at any given time.</li>
<li>Offer a way to validate our system in an end-to-end fashion.</li>
<li>Are written in a non-technical language, therefore can be understood by the business.</li></ul></li>
<li>The addition of acceptance + unit test offers a complete validation that our system works and fulfils the requirements as expected.</li>
<li>Outside-in offers a common workflow for developers</li>
</ul>

<h3>CONS</h3>
<ul>
<li>Because outside-in focus on how the different parts collaborate, the implementation details of the design are part of the tests. As a result, the tests are coupled to the implementation. This situation introduce a bigger risk to refactoring as the tests have to change when the design of the system changes.</li>
<li>Features are guided by acceptance tests. That is fine, but remember that acceptance tests tend to be slower than a unit test and will make the test suite slower as we add more features. It is a trade-off that we need to consider. A possible approach is to include acceptance tests only for the features that are critical to the business.</li>
<li>It is usually harder to write behaviour test than state tests</li>
</ul>

These series have now come to an end with this third post. We hope you enjoyed and learnt something.
