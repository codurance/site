---
layout: post
name: cohesion-cornerstone-software-design
title: Cohesion - The cornerstone of Software Design
date: 2016-03-03 12:10:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2016-03-03-cohesion.jpg
tags:
- cohesion
- software design
- craftsmanship
--- 

Cohesion is one of the most important concepts in software design. Cohesion is at the core of the vast majority of good design principles and patterns out there, guiding separation of concerns and maintainability. The term cohesion (alongside coupling) was first introduced by Larry Constantine in the late 60s as part of Structured Design and later published in more details by W. Stevens, G. Myers, and L. Constantine in 1974. Due to the growing complexity and cost of software back in the 60s, 70s, and 80s, loads of studies and research around software design and maintainability and design were done. Although we can still find some of these papers and research online today, they were done in a pre-internet era and most of the work done during that period is either lost or not easily available.


But before we dive into the details, let’s see some definitions.

**Definition**

Cohesion (noun) : when the members of a group or society are united.
Cohesive (adjective) : united and working together effectively.

_Cambridge Dictionary_

In computer programming, cohesion is a measure of how strongly related and focused the various responsibilities of a software module are.

_Wikipedia_

### Cohesion is a sliding scale metric

A common mistake is to treat cohesion as a binary attribute instead of a sliding scale. In the original work by Stevens, Myers, and Constantine in the early 70s, they defined seven levels of cohesion, which later became known as SMC Cohesion.

As the original papers were written quite a while back and were very academic, let’s agree that when we say _module_ we are actually talking about a class or a group of functions and when we say _processing elements_ we are actually talking about methods or functions.

- **Coincidental (worst)**: Processing elements are grouped arbitrarily and have no significant relationship. There is no relationship between the processing elements. E.g.: update a customer record, calculate a loan payment, print a report. Coincidental cohesion is quite common in modules called ```Util``` or ```Helper```.

- **Logical**: At a module level, processing elements are grouped because they belong to the same logical class of related functions. At each invocation of the module one of the processing elements is invoked. E.g.: grouping all I/O operations, all database operations, etc. At a processing element level, the calling module passes a control flag and that flag decides which piece of behaviour will be invoked by the processing element. E.g: A flag indicating if a discount should be calculated, a piece of behaviour should be skipped, etc.

- **Temporal**: Processing elements are related in time. They are grouped together because they are invoked together at a particular time in a program execution but in fact they are unrelated to each other. A different business requirement may  require a difference sequence or combination of processing elements. E.g.: data persistence / validation, audit trail, notifications via email, etc.

- **Procedural**: Processing elements are sequentially part of the same business unit but do not share data. They are grouped because they always follow a certain sequence of execution. E.g.: validate user, process a payment, trigger stock inventory system to send purchase orders to suppliers, write logs.

- **Communicational**: Processing elements contribute to activities that use the same inputs or outputs. E.g.: processing elements that would take a shopping basket and calculate discounts, promotions, money saved, delivery costs, and return the total price.

- **Sequential**: Processing elements are grouped when the output of one processing element can be used as input for another processing element. E.g.: formatting and validating data.

- **Functional (best)**:  All processing elements of a module are essential to the performance of a single and well-defined task. E.g.: parsing an XML, calculating the cost for an insurance policy according to the data provided.

If we adapt some of the ideas published by Meilir Page-Jones on The Practical Guide To Structured System Design (1980), we could have a guideline to identify levels of cohesion.

<img src="/assets/img/custom/blog/2016-03-03-cohesion/cohesion_test.jpg" alt="Cohesion test" title="Cohesion test" class="img img-responsive style-screengrab">

### Chasing metrics

The SMC Cohesion model was a great step forward in the 70s and many software professionals and academics tried to create software metrics that could measure degrees of cohesion so that they could design their systems in a way that they were more maintainable. The problem with the SMC Cohesion model (levels) is that it can be quite subjective and requires personal judgement. I can think of a few code examples that could fit in more than one level of cohesion in the SMC Cohesion scale. If we start digging into the details of the examples I gave above you will see how easy you will be in doubt about which level the example belong. Because of its subjectiveness, SMC Cohesion could not be used efficiently to derive reliable metrics.

Many papers and a few books were published from late 70s to late 90s exploring and expanding the notion of cohesion and coupling defined by SMC Cohesion. One model that got some acceptance was the Design-Level Cohesion (DLC) Measure. DLC is very similar to SMC but with only 6 levels and a small variation in definition and names. The main advantage of DLC is that it is more suitable for deriving metrics tools.

Before we dive into the DLC levels, let’s define a vocabulary:

- condition-control: a variable `v2` has condition-control dependence on a variable `v1` when `v1` is used in the predicate of a decision (if/then/else) which affects `v2`’s value.

- iteration-control: Same as above but in a loop (while/for/etc.)

Here are the DLC levels:

* **Coincidental relation (R1)**: Two outputs `o1` and `o2` of a module have neither dependence relationship with each other, nor dependence on a common input.

* **Conditional relation (R2)**: Two outputs are condition-control dependent on a common input, or one of the two outputs has condition-control dependence on the input and the other has iteration-control dependence on the input.

* **Iterative relation (R3)**: Two outputs are iteration-control dependent on a common input.

* **Communication relation (R4)**: Two outputs are dependent on a common input. One of the two inputs has data dependence on the input and the other can have a control or a data dependence.

* **Sequential relation (R5)**: One output is dependent on the other output.

* **Functional (R6)**: There is only one output in a module.

These six relations are in ordinal scale where R1 is the weakest for of cohesion and R6 the strongest. In DLC Measure Definition, the cohesion level is determined by the relationship between outputs of a module and processing elements.

<img src="/assets/img/custom/blog/2016-03-03-cohesion/IODG_DLC_2.jpg" alt="DLC" title="DLC" class="img img-responsive style-screengrab">

And here is how SMC and DLC relate to each other:

<img src="/assets/img/custom/blog/2016-03-03-cohesion/SMC_DLC_relation.jpg" alt="SMC vs. DLC" title="SMC vs. DLC" class="img img-responsive style-screengrab">


### Applying cohesion

Depending on the type of software you are writing, you will may need to compromise a bit. Although we should always strive to have our code at the highest level of cohesion, sometimes that may make the code look _unnatural_. There is a difference between being unaware of design principles and consciously not following a design principle in a given context. I don't write my code with the goal that it should satisfy every single design principle out there but I always try to have a good reason every time I decide not to follow certain principles. Having said that, cohesion is one of the most important building blocks of software design and understanding it well is essential for writing well-crafted code.

If you are building a framework, a very generic part of your code, or data transformation, chances are that the majority of your modules and processing elements will be at sequential and functional levels. However, when writing business rules in a commercial application, i.e. an application with business logic, user journeys, database access, etc., there is a good chance that some of your modules and processing elements will be at communicational level and some even at a lower level of cohesion. And that's OK as long as it was a conscious decision and the right thing to do in that context. 

Some people compare cohesion to the [Single Responsibility Principle (SRP)](http://codurance.com/2011/07/26/srp-simplicity-and-complexity/). Although SRP is a great software principle and entirely based on cohesion, it has a quite narrow and subjective scope. 

Identifying responsibilities is not always an easy thing. We need to develop a keen eye to detect minor variations in behaviour. Unit tests for a module can potentially help us to identify the different behaviours, if the code was really test-driven, of course. 

The more cohesive your code is, the more reusable, robust and easy to maintain it will be.

_____

References:

[Rule-based approach to computing module cohesion](http://dl.acm.org/citation.cfm?id=257586)  
[Software Complexity: Toward a Unified Theory of Coupling and Cohesion](http://misrc.umn.edu/workshops/2002/spring/darcy_020802.pdf)  
[A Quantitative Framework for Software Restructuring](http://www.cs.colostate.edu/~bieman/JSM99/KangBieman99.pdf)  
[Using Design Cohesion to Visualize, Quantify, and Restructure Software](http://www.cs.colostate.edu/~bieman/Pubs/seke96.pdf)  
[The practical guide to structured systems design](https://books.google.co.uk/books/about/The_practical_guide_to_structured_system.html?id=nq60AAAAIAAJ&redir_esc=y)  
[Systems Analysis and Design with UML](http://www.amazon.co.uk/Systems-Analysis-Design-David-Tegarden/dp/1118092368/ref=sr_1_1?ie=UTF8&qid=1456999093&sr=8-1&keywords=systems+analysis+and+design+uml)  
[Cohesion - Wikipedia](http://en.wikipedia.org/wiki/Cohesion_%28computer_science%29)  
[Single Responsibility Principle](http://codurance.com/2011/07/26/srp-simplicity-and-complexity/)  
