---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Autoformatting and Automated Coding Style (or why not to use it)"
date: 2018-08-07 08:01:00
description: Should you use an autoformatting tool or an automated coding style system like Sonarqube? Let's look at my thought evolution.
image: 
    src: /assets/custom/img/blog/2018-01-05-tetris-failed-experiment-next-steps/tetris.png
tags: 
- software processes
---
# Intro

Recently I have the "privilege" of going through some Javadoc on a project that needs to move from Java 7. The linter for javadoc was tightened for Java 8. Of course, the project did fail to build on Java 8. It fail on so many javadocs.

# The Evolution

When I started coding, I started to develop my own style, based on the languages that I used (C++, Delphi and VB where my initial professional languages). Of course, anyone not doing it just like me wasn't using the true style.

Then came the realization that we are on this together. Suddenly it was not about my style or your style, or that person's style, it was about the team style. And here is where the idea of having a coding style guide that everyone is supposed to follow enters. We want everyone to follow the same rules, so everyone can easily understand what the code is.

I came into contact with my first coding guideline document. But that document wasn't really followed by most of the programmers. It was there, everyone had read it, yet the application of it was left to each one own desires.

Clearly having the document wasn't enough. Here enters stylecop, as an "easy" way to enforce rules. You set them up (well, probably you will modify your document to follow the default stylecop rules, because who want to delve into the Stylecop API to create your own special rules) and then hook it up to your CI build.

The issue is that on legacy code the amount of rules broken is enormous (I've had a project with over 60k rule breaks). But hey, you just put a limit bigger than 0 to the number of breaks that you will allow and presto, new code should fail the build, while old code will work. At some point that old code will be changed. So all is good. Meanwhile, your tool keeps giving warnings that you are ignoring, and after a while, you are completely immunized to it.

But is not the only issue. It is not even the bad one.


And then, I was able to start applying techniques that I have learned (like pair programming, TDD, ...) and suddenly the need of tools to force code style guidelines dissapeared, every member of the team was responsible of each others code and style.

There is also the lack of subtletly and special cases on tools that do check for style and do automated formatting.

# The Current Approach

Can I still see use for something like Sonarqube? As an advisory tool there is. I don't think I will want to use it again as a build stopper. 
