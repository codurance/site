---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Automated Coding Style (or why not to use it)"
date: 2018-08-13 08:01:00
description: Where I describe my issues with tools like Stylecop and Sonarqube for documentation comments.
image: 
    src: /assets/custom/img/blog/2018-08-13-automated-code-styling/caffeine-coffe-cup-6347.jpg
tags: 
- software processes
---
# Intro

Recently I have had the "privilege" of going through some Javadoc on a project that needs to move from Java 7. The linter for javadoc was tightened for Java 8. Of course, the project failed to build on Java 8. It failed on so many javadocs.

# The Evolution

When I started coding, I started to develop my own style, based on the languages that I used (C++, Delphi and VB where my initial professional languages). Of course, anyone not doing it just like me wasn't using the true style.

Then came the realization that we are on this together. Suddenly it was not about my style or your style, or that person's style, it was about the team style. And here is where the idea of having a coding style guide that everyone is supposed to follow enters. We want everyone to follow the same rules, so everyone can easily understand what the code is.

I came into contact with my first coding guideline document. But that document wasn't really followed by most of the programmers. It was there, everyone had read it, yet the application of it was left to each one own desires.

Clearly having the document wasn't enough. Here enters stylecop, as an "easy" way to enforce rules. You set them up (well, probably you will modify your document to follow the default stylecop rules, because who want to delve into the Stylecop API to create your own special rules) and then hook it up to your CI build.

The issue is that on legacy code the amount of rules broken is enormous (I've had a project with over 60k rule breaks). But hey, you just put a limit bigger than 0 to the number of breaks that you will allow and presto, new code should fail the build, while old code will work. At some point that old code will be changed. So all is good. Meanwhile, your tool keeps giving warnings that you are ignoring, and after a while, you are completely immunized to it.

But is not the only issue. It is not even the bad one. Look at this code below

```
/**
 *
 *
 */
```

That is a Javadoc that I have seen (multiple times, in fact).

Because I have used far more C# through the years, I can give you also some bad examples of documentation comments on it, like:

```
/// <summary>
/// The constructor
/// <summary>
```

Both are enough to pass SonarQube or Stylecop (rules can be tightened a bit). But I hope we can agree that they are not useful and a waste of screen space and developer effort. Furthermore, there is a lack of subtletly and handling of special cases on tools that do check coding style. Because sometimes you need to apply logic that is just too specific for one example to be worthy of spending time codifying that "rule".

# The Now

I learned to dislike using an automated tool for documentation comments. They are just not fit for the task. I have my own thinking about when to use documentation comments:

- First, only use documentation comments on a public API, when people are going to use your library without being able to easily see the source code. I don't think an open repo can qualify as easily accessible in this context; Only if the code is in the same project can be considered easily accessible.
- Second, the only true way of deciding if documentation code is needed is through any of: Pair Programming, Code Review, someone asking questions.
- Third, the most important reasons for the documentation to exist are: to explain what is doing, how the parameters will be used, and what is the meaning of the return.



<sub>
Photo by Kaboompics .com from Pexels
</sub>
