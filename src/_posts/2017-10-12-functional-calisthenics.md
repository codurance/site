---
author: Jorge Gueorguiev Garcia
comments: true
date: 2017-10-12 21:00:00 +00:00
layout: post
asset-type: post
slug: functional-calisthenics
title: Functional Calisthenics
abstract: We discuss the rules, how to apply them, and their expected outcomes.
image:
    src: /assets/custom/img/blog/lambda.png
tags:
    - functional programming
---

#The Setup
 
While working on a Clojure application that was for production, rather than being an exercise, I saw that I was using OO programming with the syntax of Clojure. I was having problems coming back to change code that I have done not long before. Testing was an absolute pain, with continuous use of `with-redefs` and weird subnesting of `let` statements happening all over the place. Clearly, my knowledge, and my internalization of functional programming, wasn't good enough. It was time to start looking into how to improve my skills.

 
Thanks to my colleagues at Codurance I discovered that at [SoCraTes UK 2015](http://socratesuk.org/) there was a discussion already about Functional Calisthenics, organized by Ian Johnson, and which results you can find at his blog post [Introducing Functional Calisthenics](http://blog.ninjaferret.co.uk/2015/06/05/Introducing-Functional-Calisthenics.html).

After a bit of trying, I thought that a few of the rules were not exactly how I would have set them up and lacked clarity about the point of the rules. Therefore, we sat down, a few functional programmers at Codurance, and revised the rules. The below represents the rules after this revision, including how to apply them and what is the expected outcome of learning to use those rules.

#The Rules

These rules are constraints on how to create your code and are only intended to be applied when doing katas or exercises. During the exercises you should follow them to a t. Following this rules on production code is left as a decision for each. I envision to start using them in the order below; some rules build on top of previous rules to achieve better knowledge and understanding of functional programming.


     
*  [Name everything](#nameeverything)  
*  [No mutable state](#nomutablestate)
*  [Exhaustive conditionals](#exhaustiveconditionals)
*  [Do not use intermediate variables](#donotuseintermediatevariables)
*  [Expressions not statements](#expressionsnotstatements) 
*  [No Explicit recursion](#noexplicitrecursion)
*  [Generic building blocks](#genericbuildingblocks) 
*  [Side effects at the boundaries](#sideeffectsattheboundaries)
*  [Infinite Sequences ](#infinitesequences)
*  [One argument functions](#oneargumentfunctions) 

##Name Everything

Most basic one. It will seem harsh for experienced functional programmers. First one to be broken on production code.

### Description

All functions need to be named. Which means that you shouldn't use lambdas or anonymous functions. Also, name all your variables as per standard clean code rules.

### Expected Outcome
 
**Learn to recognize patterns on your code.** It will help recognizing signatures that repeat, and the applying of DRY on your code. Also, it will clearly express the intention of the action, rather than just show the implementation.

## No mutable state

This is the basis of FP.

### Description

You shouldn't use any variable of any type that can mutate.

### Expected Outcome


**Learn how to create code around immutable variables.**

Two main benefits:

* FP is about immutability. Most of its benefits comes from the fact that all your functions are (or should be) referencially transparent. 
* Use of recursion as your main looping technique. No for or while loops in your code. For comprehensions abide by this rule.

## Exhaustive Conditionals

This rule is mostly preparation work.

### Description

There can not be an if without an else. Switches and pattern matching should always have all paths considered (either through default paths or because all options have been considered).

### Expected Outcome


**Complete functions.** A function should know how to deal with all possible values passed as arguments.

## Do Not Use Intermediate Variables

This rule is mostly preparation work.

### Description

There shouldn't be any variable declared in the body of a function. Only parameters and other functions should appear on the body.

### Expected Outcome


**Use and understanding of functional pipelines. Starting on the path of functional composition.**  Functions are the building blocks of functional languages and the combination of functions create the logic of your application. Not having intermediate variables means changing the way that you think about your functions, and how the body of a function (composed of other functions) is, so the code remains legible and easy to follow.


## Expressions, not Statements

A consequence of the two previous rules. Or a generalization.

### Description

All lines should be expressions. That's it, all lines should return a value.

### Expected Outcome

**Full purity on the code.** Statements that are not expression are there for their side-effects. Nothing like that should be in the code.

## No Explicit Recursion

Not as harsh as it looks.

### Description

You shouldn't use explicit recursion like Clojure's ```java loop/recur``` forms or F# ```java let rec``` form.

### Expected Outcome

** Learning the power of map and reduce and use of High Order Functions.**
The idea is powerful enough to be the basis of some systems (Apache Hadoop) and has appeared on non-FP languages.

## Generic Building Blocks

One of the advantages of FP languages is that is easy to generalize algorithms.

### Description

Try to use a much as possible generic types for your functions, outside of the boundaries of your application. Don't use a list, use a collection; Don't use an int when you can use a number; so forth and so on.

### Expected Outcome


**Easily composable code.**  
Using existing functionality and High Order Function provided by your language stack becomes much easier.

## Side Effects at the Boundaries

On the original was at the Top Level. We wanted to extend due to advance scenarios (but is standing on thin ice this reasoning)

### Description

Side effects should only appear on the boundaries of your application. The guts of your application should have no side effects.

### Expected Outcome


**Limit the amount of code that is influenced by side effects.**
The main outcome is to create code on which you have tight control over side effects, when are the executed and to limit the effect on them on your logic. All your code logic should depend exclusively on parameters provided.

## Infinite Sequences

Another harsh rule. One that in production will depend a lot on the optimizations of the language.

### Description

All sequences, collections used need to be infinite collections. You can't use collections that need to have a fixed size specified.

### Expected Outcome

**Lazy Evaluation of Sequences**
Lazyness has some considerations regarding perfomance and not performing difficult calculations when they are not needed. Furthermore, reading from a file, database or network can be consideded an infinite sequence. 


## One argument functions

Personally, I have found this rule the most difficult to apply. There are some cases at the moment that I have found either very difficult or creating a massive number of additional functions.

### Description

Each function should have a single parameter. You need to be explicit, just using the fact that the language works by automatically applying currying is not enough (Haskel, F#, ...) The parameter can be a structure/map or some other complex type (don't think this restricts to primitives).

### Expected Outcome

**Use of functional composition.** Currying and partial function usage.


# The Conclusion

We have started to use them on katas. They force us to think about how we are coding and force us to move away from our standard OOP mentality. At the moment we see them as a good way to improve our skills.

Of course, this represents the second iteration that we did of the rules. And it is possible that at some point they change. Don't hesitate to contact us to improve them.

We will be adding a pdf version with the rules and we will be showing some code in the near future.
