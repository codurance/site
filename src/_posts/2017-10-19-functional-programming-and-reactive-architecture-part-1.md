---
layout: post
name: 2017-10-19-functional-programming-and-reactive-architecture-part-1
asset-type: post
author: Alessandro Di Gioia
comments: true
date: 2017-10-19 19:00:00 +00:00
slug: functional-programming-reactive-architecture-part-1
title: Functional Programming and Reactive Architecture Part 1
image:
    src: /assets/custom/img/blog/2017-10-19-functional-programming-reactive-architecure/parts.jpg
tags:
- functional programming
- architecture
- reactive
---


Writing enterprise software is difficult and as engineers our job is to deliver value for the business within the boundaries of time, budget and resources. Complexity is what makes it difficult for us to deliver this value; we will always have to deal with the *essential complexity* of a system and for this we are required to communicate effectively with domain experts to help us model the solution; at the same time we will have to minimise the *accidental complexity* so that engineering concerns won't add friction to the development process.
The goal of this series of blog post is to see how functional programming, reactive programming and the actor model can help us achieve structured programs and deal with complexity.

## Elements of functional programming

### Composability

Composition is the act of combining parts to make a whole, a program can be expressed as functions built on top of other functions representing different levels of abstraction spanning from human to machine. This fits very well with the instinctive way of solving problems for humans expressed by the idea of *divide et impera*. A complex problem is divided in smaller and simpler problems that are easier to solve so that the global solution is the combination of all the solutions of the smaller problems.
Different programming paradigms slice the problems in different ways depending on the tools used to combine the solutions for the subproblems.
Composability is more effective when used on pure functions to avoid the problems deriving from hidden side effects.

### Referential transparency and Purity

The fundamental building block of functional programming is the [function](http://panavtec.me/functional-programming-notes-functions) application to its input values. A function that associates one and only one value to its inputs without any other effects is called *a pure function*; that is the function only observable effect on the program execution is the computation of the result given the inputs. A function application is basically a table that maps inputs to outputs.
The formalisation of this concept is called *referential transparency* and is a property of expressions in general, not just functions. This means that you can achieve referential transparency with any language and any paradigm.
Referential transparent expressions can be evaluated at any time, this allows us to replace symbols with their implementations and the flow of execution is now not relevant anymore enabling parallel evaluation without the problems deriving from race conditions; on top of this previously calculated results can be cached improving performance at the cost of memory.
On a human perspective purity is even more valuable because of our limited capacity to reason.

### Equational reasoning the substitution model

With referential transparent expressions we are able to replace symbols with their definition in the same way we'd solve an algebraic expression to it's simplest form. Step after step we could replace a term with an equivalent one; this property enables *equational reasoning* about programs.
On the other hand the substitution property makes reasoning much simpler since *all the effects of the evaluation are purely local*. This frees our mind from having to track the sequence of the updates in a block of code so that understanding is limited to the function application.
Combining smaller functions into bigger ones becomes easier and resembles the act of assembling a product from its components.

### Immutability and local mutability

Functional programming promotes immutable state as a way to achieve referential transparency; the immediate effect of immutable state is that we will not have race conditions making concurrent programming much less problematic. 
As we all know there are no silver bullets and in fact all of this has a cost; mutable state is more performant and requires less instances in memory but it becomes more difficult to reason about in concurrent scenarios. 
When applying functional programming principles we will try to minimise the amount of mutable state to the places in our code needing optimisation for performance or memory consumption.  We can achieve this [hiding mutability](http://panavtec.me/functional-programming-notes-side-effects) as implementation details thus not contaminating the purity of the client code.

### High Order Functions

In functional programming functions are first class citizens and as such they have a prominent role to the point that they can be treated as values and passed as arguments to other functions to produce more complex computations.
Functions accepting other functions as parameters or returning functions as the result of a computation are called *[high order functions](http://panavtec.me/functional-programming-notes-higher-order-functions)*.

### Lazy Evaluation

Combining functions allows strict synchronisation between them to the point where a computation only happens when the result is really required and suspended until another value is needed. This allows for possibly infinite streams of values that will be evaluated on demand decoupling looping from termination conditions for a more modular design.
Again silver bullets don’t exist and while lazy evaluation frees the developer’s mind from having to control the execution flow when applied to referential transparent expressions, it makes it more challenging to understand when applied on side effects defeating the modularity that was designed to provide.

## Conclusion: Modularity

Modular software is well designed software because it is made of independent components that can be replaced or extended without causing ripple effects while cooperating to deliver value.
The key benefit of functional programming is the improved modularisation of code built from smaller, testable and reusable components that can be understood independently. The meaning of the whole depends only on the meaning of the components and on the ways you can combine them; this simplifies the reasoning about the software because functions behave like connected black boxes.

In the next part I’ll present the reactive architecture and explain why functional programming is a good fit for it.


## Resources

- ["No silver bullet - Essence and accident in software engineering" by Frederick P. Brooks, Jr](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)
- ["Simple made easy" by Rich Hickey](https://www.infoq.com/presentations/Simple-Made-Easy)
- ["Why functional programming matters" by John Hughes](<https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf>)
- "Functional programming in Scala" by Paul Chiusano and Runar Bjarnason
- "Functional and reactive domain modeling" by Debasish Ghosh
