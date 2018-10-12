---
author: Simion Iulian Belea
layout: post
asset-type: post
title: "Joining Codurance - the pair programming interview experience"
date: 2018-10-12 08:00:00
description: How to prepare for the pair programming interview when you don't have much experience with TDD.
image: 
    src: /assets/custom/img/blog/2018-10-12-pair-programming/coaching-coders-coding-7374.jpg
tags: 
- Software Craftsmanship, Pair Programming, Apprenticeship, TDD
---
# Joining Codurance - the pair programming interview experience

This article is aimed at those who have little or no experience with pair programming and test driven development. I had the opportunity to go through a pair programming interview to join Codurance and I didn't have any previous experience with test driven development or pair programming  and the preparation I outline in this article helped to pass the interview.

The purpose of a pair programming interview is to discover your technical ability but also how it's like to work with you. If you are a recent graduate you might have read, and even done some katas on test-driven development and some companies have a pair-programming session as part of the hiring process. It was my first pair-programming interview I had little idea about how to go about it so I set out to find a solution. My starting point was some unit testing and refactoring done during my previous internship. Most of my "pair" experience was around discussing code and I started to learn TDD on my own. I had a week to prepare. With such a short time I knew I had to make a learning plan in order to succeed. 

I read as much as I could on pair programming interviews and two articles were really outstanding. One was Eumir Gaspar's [article](https://medium.freecodecamp.org/things-ive-learned-from-pair-programming-interviews-35a4db7d7443) that outlined the perspectives of both the interviewer and the interviewee. Just after reading this article I started making a list of questions I would ask during the interview. The other [article](https://targetjobs.co.uk/employer-hubs/thoughtworks/472520-thoughtworks-pair-programming-interview-and-technical-test-insider-advice-for-graduates) was from ThoughtWorks by Rufus Raghunath. His tip around taking my time and having a strategy to talk about coupled well with me writing down a plan for the session. This was critical as the interviewer told me one of the reasons I passed the interview was because I thought ahead instead of just jumping into the code.

I also asked a friend who had more experience to do a practice pairing with me. He proved to be much tougher than the interviewer in the end and this practice pairing proved to be very useful in terms of feedback on how I was doing TDD incorrectly.

Because I was allowed to bring my own laptop and IDE I prepared an empty boilerplate and I started getting familiar and comfortable using the IDEs keyboard shortcuts so no time would be wasted for setup or for running the tests. 

Since I never paired in the XP way before I realized I was not used to talking at all while coding. Most of my coding was done focusing deeply on the code. So besides learning TDD I had to get used to communicating my intentions and coding decisions. I made a list of katas and started doing one every day.

I also sketched a test plan, as well as drawing some helper classes and logic that I might end up with. The idea is to use the plan as a hypothesis to test, not as a plan to follow to the letter. The plan helped in figuring out which way I could take if I felt stuck by taking off some of the interview pressure and having where to orient my attention to. This way I could see how far I got into solving the kata and how I could continue.

After two of them I got the basics and I started doing the out loud, to get used to talking about what I was doing and to ask questions when I got stuck. This also helped getting out of the habit of being too focused on the code and it was easier to make the interview more conversational. This also revealed obvious impediments around syntax that I could easily address, like how I was handling the parameters in the assertions and in the test annotations. It's important to show that the language doesn't stop you from coding.

I first attempted a solution on my own then I would check on GitHub to see how others tried to solve them. This is enough to give you an idea about how to write tests first, then rewrite the code then follow the Red Green Refactor technique to keep coding. Later in the exercise you might be tempted to make more than one test pass since you suddenly see you can just copy paste, yet is that a good thing to do at that moment? It also helps you prevent over-reacting and this preparation can make you calmer during the interview. It will also lead to a conversation about your assumptions when you write the code and how you deal with the uncertainties around them.

You might suddenly observe that you can go back to a previous idea and see that you have a better one throughout the kata. This led to asking questions like: how do I deal with edge cases when I'm expecting the test to fail but it's actually passing? What's a way I can make it fail without coupling it with the functionality I'm testing? How do I change the program afterwards so it's able to pass the test again?

Doing this training will lead also to questions that are important in communicating with your pairing interviewer like: Am I allowed to use a certain framework, library or API during the interview or have a look on StackOverflow for something very specific? This can help you a lot in deciding what questions to ask about the rules of communication that you can use or negotiate during the interview. This will help you take off pressure from yourself that you need to code well as you're already confident in your skill and focus on your connection with the interviewer where you can show good communication skills and create good rapport through what you discuss about.

This practice and preparation will also provide a guide about what things you can understand better like which parts of String and Arrays manipulation that you're not so good at and that you can train to be proficient in their use impromptu during the interview and improve your chances of making a good impression as you can address them before the interview and be confident that you prepared well enough for it.

To explore TDD further I looked at how others did katas on YouTube. This proved very valuable as the ones doing the katas were voicing their intentions into how they coded and their questions about the refactorings revealed a bit about their thought process. This was helpful during the interview as I could ask questions and voice what were the possible next moves, which led to a discussion about how would be best to proceed given the limited time and the complexity of the solutions I thought of. This also helped with a discussion about how to proceed with the rest of the exercise that was not finished during the time we had for the interview. 

To sum up here is how I learnt TDD quickly and how to prepare for the interview
1. Doing simple katas and learning to write the tests first
2. Finding the really bad "don'ts"and address them (language and framework familiarity)
3. Writing down a test plan to think a bit ahead and take off some of the interview pressure.
4. Voicing what I was doing while I was coding, especially when I needed to make a bigger change
5. Getting used to communicating programming intentions and assumptions while pairing
6. Practice pairing with somebody who has done it, if possible.
