---
layout: post
name: how-to-start-doing-tdd-in-iOS
title: How to start doing TDD in iOS
date: 2015-07-13 12:00:00 +00:00
author: Ana Nogal
image:
    src: /assets/img/custom/blog/red_green_tdd_ios.jpg
    attribution:
        text: green light, red light : bell peppers , by torbakhopper
        href: https://www.flickr.com/photos/gazeronly/9667648328/in/photolist-fJie2S-kZ8Mqf-6F2HWB-dEH5CJ-nCD6Q1-uTXu3t-kvtUVp-abPirU-i9k6jv-6HMN8y-2n1uRJ-fppLN7-92QoDw-4CkQfp-jZsn4v-7eKrr1-6gUp9u-pcmf7G-4WPn1x-oxKF3T-fFv6gC-2ExfcW-qVgWCr-6R5jLn-6JGqn1-a76YAX-91gpM3-2DW5pw-8SUiAF-4JdLud-5581dv-pkPuXX-dtz6uY-7WzTW4-6kAypB-9AeS4v-p5TYcH-8zj22U-7WzTHZ-r1BNYp-nRtj4g-5Er1mN-npQNoK-q1AokQ-9FKegf-6H2RE1-75oehG-e7dobd-2ohvnH-oEjR2C/
tags:
- iOS
- TDD
- Objective-C
---

I like to do apps. As a newbie TDD developer, I've made my apps with tests but not driven by tests. I want to change that. I'm learning to be a Craftsman, so TDD is an essential technique to know. It's your main tool. At Codurance it's unthinkable that you could code without doing TDD. That's one of the things that you learn in our apprenticeship program: to be able to do TDD without thinking about it and feel it's natural: as you breath to survive you do TDD to code.

So today I feel pretty much confident that I'm able to do TDD (at least in C#), and so I've come back to my apps and I decide to change then to apply all the good practices that I've already learn in my first month at Codurace.

Oh God! What have I done! It's amazing how you go back now, look at your code and think: What that hell was I doing? How could I write such code? I really just wanted to delete everything and start again... Well, we all know that that is not really possible when you have an app published and selling and you have users that send you requests for new features...

So what could I do? I thought it would be a good idea to refactor all my code, and at least make it a little bit cleaner, with unit tests everywhere rather than just in the principal features (Oh! God I know!!!! It's horrible...) All the horrible things that they say to you that you will find in the real world when you finish the apprenticeship have come true when looking to my own code, so frustating!!!!). So to be proficient in doing refactoring in iOS I must be able to do TDD correctly, not even think about it when I code in Objctive-C. That was not the stage that I was... So, what can I do?

I decided to start were I started at Codurance: Do katas, one after another, get the logic of the language, solve small problems first, and then go to bigger Katas where you can apply your OOP knowledge. I've googled for katas in Objective-C and I've got a lot of links: I was thrilled! iOS developers are sharing their katas. Then I followed the links... Most of then send me to a "This webpage is not available" page. Even the Objective-C version of String calculator of [Roy Osherove](http://osherove.com/tdd-kata-1/) is going to the same page... And then I found a [screencast](http://www.screencast.com/t/CfaYvoCMHE) that is using iOS 5.5? We are already in beta for 9!!!

Well I can just conclude that iOS developers don't share their code! So let's revert that. Since we talked about the String Calculator, let's start with this kata and see what I can do with it. I'll do the beginner version. Here's my version in [Github](https://github.com/ananogal/StringCalculator).
