---
layout: post
name: thinking-in-abstractions
title: Thinking in Abstractions
date: 2016-06-17 00:20:00 +00:00
author: Mashooq Badar 
image:
   src: /assets/img/custom/blog/abstractions.jpg
tags:
- design 
- craftsmanship 
---

Recent issues of the [Clojure Gazette](http://www.clojuregazette.com/archive.html) have been discussing abstractions, and it's got me thinking. 

I am wary of needless abstractions and have seen many codebases, some of them I contributed to, that are essentially a mindless mess of half-backed abstractions.

Here’s what I’m thinking …

### Abstractions have a half-life
Abstractions have a half-life, that is to say, there will come a time when the exact statement that is implicit in that abstraction is no-longer completely valid. This is especially true when the abstraction is modelling an aspect of your business domain. With time your understanding of the business grows, or new requirements come to light, and some of the assumptions you made may no-longer hold.

In order to realign the abstraction to the new knowledge, we refactor. If the abstraction is well isolated, the refactoring is straightforward. However, often the abstraction is embedded in the design and a change causes ripple effects in our codebase and suddenly we are performing "open heart surgery" or "incremental change" to the new abstraction. During this process we are in an invalid state. Often we don’t fully complete this refactoring effort and we end up with a halfway house. Given enough of these halfway houses and we end up with an unholy mess and start dreaming of a system re-write. 

### Abstractions mean more code?
Isn’t that obvious? Surely no abstractions means minimal code right? Abstractions are what I refer to as “organising” code rather than “doing” code. They help us comprehend the problem and the solution - if done right. They isolate change and aid composability. 

Composability is interesting. It actually helps us reduce code by allowing us to reuse the same abstraction in multiple places. However, the more elaborate the abstraction the more specific it is and thus not easy to reuse. And there lies another monster. Reusing abstractions is all well and good but if that abstraction is likely to change often then we have built our house on some very shaky foundations.

So is that a case for smaller abstractions that are more generic in nature? Smaller abstractions are a no-brainer in my opinion. The Single Responsibility Principle in [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) and Fewer Elements in [4 Elements of Simple Design](http://martinfowler.com/bliki/BeckDesignRules.html) point to that. Abstractions remain valid for longer if they are small and serve a single purpose. 

But what about “generic in nature”? 

### Not all abstractions are equal
Abstractions that are more generic in nature have a longer half-life. A programming language itself is an abstraction with a very long half-life. It is quite generic and does not make many explicit statements about a particular problem domain. A data access library, another abstraction, is a few levels above and may have a smaller half-life in your system - the library may have been designed to access a relational store and may need to be replaced if you go for a different store. 

The fewer assumptions you have the smaller the chance that one of them may become invalid. For example, a function that operates on a generic collection is less likely to require change than one that only operates on a specific implementation of a list.

Abstractions about the business domain are higher still and may change more often. Also certain aspects of the business will be more volatile then others. 

More volatile abstractions should not be deeply embedded in your code and must not have a complicated dependency graph so that changes, when needed, are localised.

### Abstractions have a navigation overhead
Abstractions can help or hinder comprehension. Take the example of a programming language as an abstraction. Most of us don’t even know the next level of detail from a programming language  (i.e byte/machine code). It is arguably a good example of an [Intention Revealing](http://martinfowler.com/bliki/BeckDesignRules.html) set of abstractions. So effective that we rarely need to dig deeper to comprehend. Although one can argue that a truly intention revealing programming language would not require all that associated documentation ... but I digress. 

If comprehension require digging from one level of an abstraction to the ones below then the abstraction is actually getting in the way because every jump requires the reader to keep in mind the previous level(s). For example I often see a liberal use of "extract method/class/module", in what may be considered "clean code", to the point that I find myself constantly diving in and out of different levels of abstractions in order to comprehend a simple execution flow. [Composed Methods](http://c2.com/ppr/wiki/WikiPagesAboutRefactoring/ComposedMethod.html) are great but at the same time a liberal use of method/class/module extraction without close attention to pros and cons of each abstraction is not so clever.

### Dealers of abstractions
Dealing in abstractions is what we do, but we must be mindful that it is not without cost. Creating an abstraction should not be taken lightly - we must think them through and try to understand their cost and benefits. Getting some wrong is inevitable but we should look to increase the half-life of our abstractions and use them to aid, rather than hinder, comprehension and localise change.

Volatile abstractions are not always avoidable. But if we know an abstraction to be volatile then we must try to isolate the impact in case it needs to change.
