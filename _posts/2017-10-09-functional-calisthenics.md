---
author: Jorge Gueorguiev Garcia
comments: true
date: 2017-10-09 13:00:00+00:00
layout: post
slug: functional-calisthenics
title: Functional Calisthenics
wordpress_id: 3
categories:
- development
tags:
- functional programming
---
# The Setup

While working on a Clojure application that was for actual production, than rather than being created as a hobby at home, I saw that I was really doing OOP or imperative programming with the syntax of Clojure. I was having problems coming back to change code that I have done not long before. Testing was an absolute pain, with continuous use of with-redefs and weird subnesting of let statements happening all over the place. Clearly, my knowledge, and my internalization of functional programming wasn't good enough. It was time to start looking into how to improve.

Thanks to my colleagues at Codurance I discovered that at Socrate 2015 there was a discussion already about Functional Calisthenics, organized by Ian Johnson, and which results you can find at his blog post<a href="http://blog.ninjaferret.co.uk/2015/06/05/Introducing-Functional-Calisthenics.html">Introducing Functional Calisthenics</a>.

After a bit of trying, I though that a few of the rules were either wrong, misleading or I wasn't clear what was the point of the rule. Therefore, we sat down a few functional programmers at Codurance and revised the rules. The below represents the rules after this revision, including how to apply them and what is the expected outcome of learning to use those rules.

# The Rules
These rules are only intended to be applied when doing katas or exercises. During the exercises you should follow them to a t. Of course, like any rule, in production code you can break, as long as you know why are you breaking them. Furthermore, I envision start using them in the order below. Some rules build on top of previous rules to achieve better knowledge and understanding of functional programming.

## Name everything
### Description
All functions need to be named. Which means that you shouldn't use lambdas or anonymous functions.

### Expected Outcome
**Learn to recognize patterns on your code.**

## No mutable state
### Description
You shouldn't using any variable of any type that can mutate.

### Expected Outcome
**Learn how to create code around inmutable variables.**
One of the main things that will come of this is the use recursion as your main looping technique.

## Do not use intermediate variables
### Description
There shouldn't be any variable declared in the body of a function. Only parameters and other functions should appear on the body.

### Expected Outcome
**Use and understanding of functional pipelines.**
Functions are the building blocks of functional languages and the combination of functions create the logic of your application. Not having intermediate variables means changing the way that you think about your functions, and how the body of a function (composed of other functions) is, so the code remains legible and easy to follow.

## One argument functions

### Description
Each function should have a single parameter
### Expected Outcome
**Use of function composition**

## No Explicit recursion
### Description
### Expected Outcome

## Exhaustive conditionals
### Description
There can not be an if without an else. Switches and pattern matching should always have a default path.
### Expected Outcome
**Preparation for the next rule**

## Expressions not statements.

### Description
### Expected Outcome


## Generic building blocks - Keep Constraints to boundaries
### Description
### Expected Outcome

## Side effects at the boundary

### Description

### Expected Outcome
**Limit the amount of code that is influenced by side effects**
The main outcome is to create code on which you have tight control over side effects, when are the executed and to limit the effect on them on your logic. All your code logic should depend exclusively. 

## Infinite Sequences (Lazy Evaluation of sequences?)
### Description
### Expected Outcome



## Complete functions only
### Description
### Expected Outcome

