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

Discovered that at Socrate 2015 there was a discussion already about Functional Calisthenics, organized by Ian Johnson, and which results you can find at his blog post<a href="http://blog.ninjaferret.co.uk/2015/06/05/Introducing-Functional-Calisthenics.html">Introducing Functional Calisthenics</a>.

After a bit of trying, I though that a few of the rules were either wrong or misleading. So we sat down a few functional programmers at Codurance and revised the rules. The below represents the rules after this revision, including how to apply them and what is the expected outcome of learning to use those rules.

# The Rules
These rules are only intended to be applied when doing katas or exercises. During the exercises you should follow them to a t. Of course, like any rule, in production code you can break, as long as you know why are you breaking them.

## Side effects at the boundary

### Description

### Expected Outcome
**Limit the amount of code that is influenced by side effects**
The main outcome is to create code on which you have tight control over side effects, when are the executed and to limit the effect on them on your logic. All your code logic should depend exclusively. 


## No Mutable state - Try to keep everything pure.
### Description
### Expected Outcome

## Expressions not statements.
NOTE: Is the use of expressions, not statements a consequence of side effects at the boundary?
### Description
### Expected Outcome

## Ideally one argument functions
NOTE: The more I see this one, the less sure I am what is the point.
### Description
### Expected Outcome

## No Explicit recursion
### Description
### Expected Outcome


## Generic building blocks - Keep Constraints to boundaries
### Description
### Expected Outcome

## Infinite Sequences (Lazy Evaluation of sequences?)
### Description
### Expected Outcome

## Pattern Matching / Ex ... conditional
### Description
### Expected Outcome

## Name everything
### Description
All functions need to be named. Which means that you shouldn't use lambdas or anonymous functions.

### Expected Outcome
**Learn to recognize patterns on your code.**


## Do not use intermediate variables
### Description

### Expected Outcome
**Use and understanding of functional composition (and piping where existing).**
Functions are the building blocks of functional languages and the combination of functions create the logic of your application. Not having intermediate variables means changing the way that you think about your functions, and how the body of a function (composed of other functions) is, so the code remains legible and easy to follow.

## Complete functions only
### Description
### Expected Outcome

