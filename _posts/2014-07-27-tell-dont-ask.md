---
layout: post
name: tell-dont-ask
title: Tell don't ask
date: 2014-07-27 12:00:00 +00:00
author: Mashooq Badar
image:
    src: /assets/img/custom/blog/tell-dont-ask.png
tags:
- tdd
- design
---

**Tell don't ask** we have all heard it. Yet it is one of the most violated principles. It is also one of the most important principles to follow if you want a design that is flexible to change.

I have often heard people say, **"... but it makes Test driving very hard"**. I disagree - what it does is stop you from testing at too granular a level and focus on testing behaviours rather than interactions.

Enough postulating ... here is an example taken from my current work. You have an interface to an external system - you have nicely encapsulated it into your own class and throw an exception if, for example, there are infra level issues. Once the exception is raised - you let it percolate to the top and create an alert to inform operations.

The diagram below depicts a more usual approach I've seen:

![Ask! not tell](/assets/img/custom/blog/ask-not-tell.png)

Chances are that we test drove the *Infra Service* knowing that it needs to have all the right details required for us to raise the *Alert*. However, we are not testing that the right Alert is created because that is not the responsibility of the *Infra Service*. Hence we poke a few holes in the *Infra Exception* class and assert that the exception is created with the right details. 

Once we move to implementing the *A Service* we have all the relevant details exposed from the exception so we retrieve these details and create the *Alert*. Interesting that the real behaviour here is:

> create alert with the right details if there is an infra error

**not**

> create exception with the right details if there is an infra error and then create alert from exception with the right details

Now lets looks at the alternative. Lets say we drove the test from the outside, i.e. *A Service*, and did not mock the *Infra Service* but instead mocked the *External System API*. 

![Tell! don't ask](/assets/img/custom/blog/tell-dont-ask.png)

We end up with a tell-don't-ask approach where we are testing that the right *Alert* is created when there is an infra error. We also end up with fewer interactions and a more flexible design. If for example we decided to encapsulate the external system some other way, our tests will not need to change. 

Although testing at this level provides us with far less brittle tests, the disadvantage is that parts of the implementation is further way. On the other hand there are far fewer reasons why a test may break during refactoring. 

Finding the right level to test is not a science. We need to take complexity of the unit-under-test into account. The rule of the thumb is that we should test from outside and mock external boundaries until the tests get too complex and only then get more granular for the more complex parts striving to maintain flexible tests and simple design.