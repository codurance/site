---
layout: post
name: database-testing-with-tsql 
title: Database Testing With tSQLt
date: 2016-10-06 10:20:00 +00:00
author: Halima Koundi
image:
   src: /assets/img/custom/blog/db-testing/db-testing.jpg
tags:
- ms sql server 
- database
- practices
---


Evolutionary Database Development, as coined in Martin Fowler’s book Refactoring Databases, is a concept whereby the design of the database is not done upfront, but instead is done in a way that evolves as the software that is relying on the data store does.
In order to have flexibility and to allow changes in the database to be made safely; you need to have a test suite to run and check for regressions. In this post we will have a look at a testing framework for Microsoft SQL Server databases.


##Environment

###Installing MS SQL Server

Get started installing [SQL Server Express](https://www.microsoft.com/en-us/download/details.aspx?id=52679)
.
SQL Server Express is a free lightweight version of Microsoft’s SQL Server database.

###Installing MSSQL Server Manager

SQL Server Management studio provides us with a powerful user interface to access, manage and configure our MS SQL database server.
If you don’t already have it, [install it](https://msdn.microsoft.com/en-us/library/mt238290.aspx). Please note this will take some time.

###Downloading tSQLt

We are going to use the [tSQLt](http://tsqlt.org/) unit testing framework to test our Microsoft SQL Server database.
We first need to get the [download](http://tsqlt.org/downloads/) from the official website. 

The tSQLt [open source](https://github.com/tSQLt-org/tSQLt) framework allows us to run our tests within transactions which makes our tests independant and takes care of cleaning up after it runs. The framework also gives us the ability to isolate our tests through fake tables and stored procedure (SP) spies.

##Running the test sample

Once you have SQL Server Express up and running, and MSSQL Management Studio installed, open the latter and connect to your server.

{% img /assets/img/custom/blog/db-testing/db-testing-1.png "" %}

The tSQLt team provides a quick start example database and a set of tests to help developers get started quickly on how the framework works.
Let’s try the example together.
First unzip the tSQLt folder you downloaded, and make sure that CLRs are enabled on your development server. Enabling [CLR integration](https://msdn.microsoft.com/en-us/library/ms254498v=vs.110.aspx) allows us to run managed code, such as C#, on our SQL Server database.

{% img /assets/img/custom/blog/db-testing/db-testing-2.png "" %}

Open the Example.sql file that you will find within the unzipped folder, and execute it in your database server. This will create a test database named `tSQLt_Example`.

Once your database is created, open a new query window on that DB and run the following command:
`EXEC tSQLt.RunAll`
This is a command to run all the tests. You should see a failing test in the result screen:

{% img /assets/img/custom/blog/db-testing/db-testing-3.png "" %}

Test case number 11, named test ready for experimentation if 2 particles, is failing. Let’s open the file and see what’s wrong with it; we will need to navigate to the stored procedures folder to find the test.

{% img /assets/img/custom/blog/db-testing/db-testing-4.png "" %}

{% img /assets/img/custom/blog/db-testing/db-testing-5.png "" %}

The failing test is calling `IsExperimentReady` and checks that it returns 1 when the particle table has two particles.
Looking at the function, it seems that it is not counting the number of rows in the Particle table, and it is not doing the right checks.

{% img /assets/img/custom/blog/db-testing/db-testing-6.png "" %}

Once we’ve solved the issue, we can run the tests again and see that they are all passing now.

###What is this test doing and how is the fake table working?

Tests in the tSQLt framework are run within transactions. The function we are testing relies on the Particle table to determine whether the system is ready for experimentation. Looking at our test here, we can see that we are creating a fake table of the `Accelerator.Particle` in which we will insert two rows.

If we have closer at look at the `tSQLt.FakeTable` SP, it is renaming the original table we are faking, and copying its structure into a new table of the original name without applying any of the constraints. 
Then we run the test by calling the function under test, knowing that it should use the table we just faked.
After the test has run wrapped inside the transaction, this transaction is rolled back. This will revert all the changes made to the mocked table.
The test results that were stored in temporary fields are then saved in a test result table.

{% img /assets/img/custom/blog/db-testing/TestingWithFakeTables.png "" %}

In this first blog post we learned about database testing, and how the tSQLt testing framework works. In the next post, we will go beyound the quick start example and see how to approach legacy transact-SQL, implementing tests into an existing database.



