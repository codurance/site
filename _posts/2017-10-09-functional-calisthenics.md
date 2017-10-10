---
author: Jorge Gueorguiev Garcia
comments: true
date: 2017-10-09 13:00:00 +00:00
layout: post
asset-type: post
slug: functional-calisthenics
title: Functional Calisthenics
tags:
- functional programming
---
# The Setup

While working on a Clojure application that was for actual production, than rather than being created as a hobby at home, I saw that I was really doing OOP or imperative programming with the syntax of Clojure. I was having problems coming back to change code that I have done not long before. Testing was an absolute pain, with continuous use of with-redefs and weird subnesting of let statements happening all over the place. Clearly, my knowledge, and my internalization of functional programming wasn't good enough. It was time to start looking into how to improve.

Thanks to my colleagues at Codurance I discovered that at Socrate 2015 there was a discussion already about Functional Calisthenics, organized by Ian Johnson, and which results you can find at his blog post<a href="http://blog.ninjaferret.co.uk/2015/06/05/Introducing-Functional-Calisthenics.html">Introducing Functional Calisthenics</a>.

After a bit of trying, I though that a few of the rules were either wrong, misleading or I wasn't clear what was the point of the rule. Therefore, we sat down a few functional programmers at Codurance and revised the rules. The below represents the rules after this revision, including how to apply them and what is the expected outcome of learning to use those rules.

# The Rules
These rules are only intended to be applied when doing katas or exercises. During the exercises you should follow them to a t. Of course, like any rule, in production code you can break them, as long as you know why are you breaking them. Furthermore, I envision start using them in the order below. Some rules build on top of previous rules to achieve better knowledge and understanding of functional programming.

## Name everything
Most basic one. It will seem harsh for experienced functional programmers. Fisrts one to be broken on production code.

### Description
All functions need to be named. Which means that you shouldn't use lambdas or anonymous functions.

### Expected Outcome
**Learn to recognize patterns on your code.**
It will help recognizing signatures that repeat, and the applying of DRY on your code.

## No mutable state
This is the basis of FP

### Description
You shouldn't using any variable of any type that can mutate.

### Expected Outcome
**Learn how to create code around immutable variables.**
Two main benefits: 
    - FP is about immutability. Most of its benefits comes from the fact that all your functions are (or should be) referencially transparent. 
    - Use of recursion as your main looping technique. No for or while loops in your code. For comprehensions abide by this rule.

## Exhaustive conditionals
This rule is mostly preparation work.

### Description
There can not be an if without an else. Switches and pattern matching should always have a default path.

### Expected Outcome
**All possible paths have been taken into account**
Which is a know cause of issues.

## Do not use intermediate variables
### Description
There shouldn't be any variable declared in the body of a function. Only parameters and other functions should appear on the body.

### Expected Outcome
**Use and understanding of functional pipelines. Starting on the path of functional composition**
Functions are the building blocks of functional languages and the combination of functions create the logic of your application. Not having intermediate variables means changing the way that you think about your functions, and how the body of a function (composed of other functions) is, so the code remains legible and easy to follow.

## Expressions not statements.
A consequence of the two previous rule. Or a generalization.

### Description
All lines should be expressions. That's it, all lines should return a value

### Expected Outcome
**Full purity on the code**

## No Explicit recursion
Not as harsh as it looks.

### Description
You shouldn't use explicit recursion like Clojure's loop/recur forms

### Expected Outcome
**Learning the power of map and reduce**

## Generic building blocks
One of the advantages of FP languages is that is easy to generalize algorithms.

### Description
Try to use a much as possible generic types for your functions, outside of the boundaries of your application. Don't use a list, use a collection; Don't use an int when you can use a number; so forth and so on

### Expected Outcome
**Easily composable code**
Becomes much easier 

## Side effects at the boundary
On the original named at the Top Level. The idea behind the change will only be clear on advance FP.

### Description
Side effects should only appear on the boundaries of your application. The guts of your application should have no side effects.

### Expected Outcome
**Limit the amount of code that is influenced by side effects**
The main outcome is to create code on which you have tight control over side effects, when are the executed and to limit the effect on them on your logic. All your code logic should depend exclusively on parameters provided. 

## Infinite Sequences
Another harsh rule

### Description
All sequences, collections used need to be infinite collections. You can't use collections that need to have a fixed size specified,

### Expected Outcome
**Lazy Evaluation of sequences**
There is no variable, no counter that you can use.

## One argument functions
Personally, I have found this rule the most difficult to apply.

### Description
Each function should have a single parameter. You need to be explicit, just using the fact that the language works by automatically applying currying is not enough (Haskel, F#, ...) The parameter can be a structure/map

### Expected Outcome
**Use of functional composition**
Currying and partial function usage. Preparation of code to follow the form *function T -> T*
