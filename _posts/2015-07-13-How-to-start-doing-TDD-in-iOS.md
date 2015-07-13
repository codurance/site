---
layout: post
name: how-to-start-doing-tdd-in-iOS
title: How to start doing TDD in iOS
date: 2015-07-13 12:00:00 +00:00
author: Ana Nogal
image:
    src: /assets/img/custom/blog/red_green_tdd_ios.jpg
tags:
- iOS
- TDD
- Objecti-C
---

I like to do apps. As a newbie TDD developer, I've made my apps with tests but not driven by tests. I want to change that. I'm learning to be a Craftsman, so TDD is an essential technique to know. It's your main tool. At Codurance it's unthinkable that you could code without making TDD. That's one of the things that you learn in our apprenticeship program: to be able to do TDD without thinking about it and feel it's natural: as you breath to survive you do TDD to code.

So today I feel pretty much confident that I'm able to do TDD(at least in C#), and so I've come back to my apps and I decide to change then to apply all the good practices that I've already learn in this month that I'm at Codurace. Oh God! What have I done! It's amazing how you go back now, look at your code and think: What that hell was I doing? How could I do this code? I really just wanted to deleted all and start all over again...Well we all know that that is not really possible when you have an app published and selling and you have users that send you requests for new features...

So what could I do? I thought it would be a good idea to refactor all my code, and at least put it a little more clean and with unit tests everywere not just in the principal features (Oh! God I know!!!! It's horrible... All the horrible things that they say to you that you will find in the real world when you finish the apprentenship have come true when looking to my own code..., so frustating!!!!). So to be proficient in doing refactoring in iOS I must be able to do TDD correctly, not even think about it when I code in Objctive-C. That was not the stage that I was... So, what can I do?

I decided to start were I started at Codurance: Do katas, one after another, get the logic of the language, solve small problems first, and then go to bigger Katas where you can apply your OOP knowledge. I've google for katas in objective-C and I've got a lot of links: I was thrilled! iOS developers are sharing their katas. Then I follow the links...Most of then send me to a "This webpage is not available" page. Even the Objective-C version of String calculator of [Roy Osherove](http://osherove.com/tdd-kata-1/) is going to the same page... And then I found a [screencast](http://www.screencast.com/t/CfaYvoCMHE) that is using iOS 5. 5? We are already in beta for 9!!!

Well I can just conclude that iOS developers, don't share there code! So let's reverte that. Since we talked about the String Calculator, let's start with this kata and see what I can do with it. I'll do the beginner version. Here's my version in [Github](https://github.com/ananogal/StringCalculator).
