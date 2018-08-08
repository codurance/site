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

Recently I have the "privilege" of going through some Javadoc on a project that needs to move from Java 7. The linter for javadoc was tightened from Java 8. And it did fail. It fail on so many javadocs.

# The Evolution

I want to give you a recount of how my evolution of coding style as part of a team/company has gone (more or less). Interspec in all of this is a lot of reading (Kent Beack's XP Explained, Bob Martin's Clean Code, ...)

So first started as a young prick, questioning everyone else choices on how to write code. Ah, the wrongness of the exhuberant youth. What was important was that I could easily understand the code, without thinking about anyone else.

Then came the realization that we are on this together. Suddenly it was not about my style or your style, or that person's style, it was about the team style. And here is where the idea of having a coding style guide that everyone is supposed to follow enters. We want everyone to follow the same rules, so everyone can easily understand what the code is.

But the problem with a coding style guide is that there are to ways to enforce: the maybe it happens but there is some intelligene behind it (pair programing/review) or the automatically always happening but quite dumb of a software tool. Enter Stylecop and then SonarQube. Hey, presto, easy way to check that all the rules are being followed. But still require for people to run the tools. So why not add it to your build system? Furthermore, as it is already there why not fail the build if all the rules are not being followed.

# The Drawbacks

Of course, this has the issue that on legacy code the amount of rules broken is enormous (I've had a project with over 60k rule breaks). But hey, you just put a limit bigger than 0 to the rules that you break and presto, new code should fail the build, while old code will work. At some point that old code will be changed. So all is good. Meanwhile, your tool keeps giving warnings that you are ignoring, and after a while, you are completely immunized to it.



And then, I was able to start applying techniques that I have learned (like pair programming, TDD, ...) and suddenly the need of tools to force code style guidelines dissapeared, every member of the team was responsible of each others code and style.

There is also the lack of subtletly and special cases on tools that do check for style and do automated formatting.

# The Current Approach

Can I still see use for something like Sonarqube? As an advisory tool there is. I don't think I will want to use it again as a build stopper. 
