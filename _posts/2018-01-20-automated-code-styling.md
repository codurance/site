---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Automated Coding Style (or why not to use it)"
date: 2018-01-20 09:25:06
description: Should you use an automated coding style system like Sonarqube? Let's look at the evolution of style
image: 
    src: /assets/custom/img/blog/2018-01-05-tetris-failed-experiment-next-steps/tetris.png
tags: 
- software processes
---
# Intro

Not long ago, there were a couple of tweets about saying that using autoformatting code was a bad idea. I had not spend time before them thinking about it. I have used autformatting options, 

# The Evolution

I want to give you a recount of how my evolution of coding style as part of a team/company has gone (more or less). Interspec in all of this is a lot of reading (Kent Beack's XP Explained, Bob Martin's Clean Code, ...)

So first started as a young prick, questioning everyone else choices on how to write code. Ah, the wrongness of the exhuberant youthful. What was important was that I could easily understand the code, without thinking about anyone else.

Then came the realization that we are on this together. Suddenly it was not about my style or your style, or that person style, it was about the team style. And here is where the idea of having a codeing style guide that everyone is supposed to follow enters. We want everyone to follow the same rules, so everyone can easily understand what the code is.

But the problem with a coding style guide was that it could only be enforced through some kind of tool. Enter Stylecop and then SonarQube. Hey, presto, easy way to check that all the rules are being followed. But still require for people to run the tools. So why not add it to your build system? Furthermore, as it is already there why not fail the build if all the rules are not being followed.

Of course, this has the issue that on legacy code the amount of rules broken is enormous (I've had a project with over 60k rule breaks). But hey, you just put a limit bigger than 0 to the rules that you break and presto, new code should fail the build, while old code will work. At some point that old code will be changed. So all is good. Meanwhile, your tool

# The Current Approach
