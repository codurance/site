---
layout: post
asset-type: post
name: how-applying-theory-of-constraints-helped-us-optimise-our-code
title: How Applying Theory of Constraints Helped us Optimise our Code
date: 2016-12-20 00:20:00 +00:00
author: Matthew Butt
canonical:
    name: my personal blog
    href: https://blog.matthewbutt.com/2016/12/18/how-applying-theory-of-constraints-helped-us-optimise-our-code/
image:
    src: /assets/custom/img/blog/2016-12-20-how-applying-theory-of-constraints-helped-us-optimise-our-code/post-image.jpg
abstract: Gives a brief introduction to the Theory of Constraints and explains how it gives a framework for tackling performance issues
tags:
- agile
- lean
- theory of constraints
---

My team have been working on improving the performance our API, and identified a database call as the cause of some problems.

The team suggested three ways to tackle this problem:

* Scale up the database till it can meet our requirements.
* Introduce some light-weight caching in the application to reduce load on the database.
* Examine the query plan for this database call to find out whether the query can be optimised.

Which of these should we attempt first? There was some intense discussion about this, with arguments made in favour of each approach. What we needed was a simple framework for making decisions about how to improve our system.

This is where the Theory of Constraints (ToC) can help. Originally expounded as a paradigm for improving manufacturing systems, ToC is really useful in software engineering, both when managing projects and when improving the performance of the systems we create.

## Theory of Constraints

The preliminary step in applying ToC is to identify the Goal of your system. In the case of this API, the Goal is to supply accurate data to consumers.

Now we understand the Goal of the system, we can define the Throughput of the system as the rate at which it can deliver units of that goal, in our case API responses. We can also define the Operating Expenses of the system (the cost of servers) and its Inventory (requests waiting for responses).

The next step is to identify the Constraint of the system. This is the element in the system that dictates the system’s Throughput. In a physical system, a useful heuristic is a build-up of Inventory in front of this element. In our API, our monitoring helped us pinpoint the bottleneck.

The next three steps give us a sequence of approaches for tackling the Constraint:

* First, Exploit the Constraint by finding local changes you can make to improve its performance.
* Second, Subordinate the rest of the system to the Constraint by finding ways to reduce pressure on it so it can perform more smoothly.
* Third, Elevate the Constraint by increasing the resources available to it, committing to additional Operating Expenses if necessary.

Exploitation comes first because it’s quick, cheap and local. To Subordinate you need to consider the effects on the rest of the system, but there shouldn’t be significant costs involved. Elevating the Constraint may well cost a fair amount, so it comes last on the list.

Once you have applied these steps you will either find that the Constraint has moved elsewhere (you’ve ‘broken’ the original Constraint), or it has remained in place. In either case, you should repeat the steps as part of a culture of continuous improvement. Eventually you want to see the constraint move outside your system and become a matter of consumer demand.

## Applying ToC to our question

If we look at the team’s three suggestions, we can see that each corresponds to one of these techniques:

* Scaling up the database is Elevation: there’s a clear financial cost in using larger servers.
* Introducing caching is Subordination: we’re changing the rest of the system to reduce pressure on the Constraint, and need to consider questions such as cache invalidation before we make this change.
* Optimising the query is Exploitation: we’re making local changes to the Constraint to improve its performance.

Applying ToC tells us which of these approaches to consider first, namely optimising the query. We can look at caching if an optimised query is still not sufficient, and scaling should be a last resort.

In our case, query optimisation was sufficient. We managed to meet our performance target without introducing additional complexity to the system or incurring further cost.

## Further Reading

Goldratt, Eliyahu M.; Jeff Cox. _The Goal: A Process of Ongoing Improvement_. Great Barrington, MA.: North River Press.