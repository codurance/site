---
layout: post
name: 2017-10-23-legacy-code-retreat
title: Legacy Coderetreat - Overcoming challenges together
date: 2017-10-23 09:00:00 +00:00
author: Luciano Palma
asset-type: post
image:
   src: /assets/img/custom/blog/2017-10-27-full-office-at-coderetreat.jpg
abstract: We all have something to share and learn from each other.
tags:
- personal-growth
- coderetreat
- legacy-code
- teamwork
---

We recently hosted our very first Legacy Coderetreat here at Codurance London. The event was organised by Cyryl Płotnicki and [Robert Firek][9], with Daniel and myself helping and participating throughout the day. It was a success thanks to everyone that attended, a surprisingly good number for a Saturday morning. The event lasted the full day, split into 45min sessions, with a few minutes break between them. In the beginning of each session, the participants would choose a different pair and sometimes we were asked to delete our code between sessions.

The goal was to introduce some refactoring techniques (e.g. Golden Master Test, renaming, extract stateful code to pure functions, etc.) through piece of legacy code, the [Trivia Kata][1], with each session introducing new challenges as well as delivering the core values of solving them. For example, how can we be confident enough to change a code so coupled and full of [Code Smells][2] that writing Unit Tests becomes impractical? Then, after the session is finished, a 10min retrospective would take place and participants had the opportunity to give feedback and share what they learnt.

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-27-full-office-at-coderetreat.jpg" alt=“full-office-at-coderetreat” class="img img-responsive" style="height: 70%; width: 80%;"/>
</center>
<br/>

The idea to organise the Legacy Coderetreat in London came after Cyryl and Robert successfully ran it in Toulouse, France. Refactoring legacy code when introducing new features is an important skill which requires practice. The event introduced a few important techniques, while providing the ideal environment for the participants to pair with each other, share skills, trying new languages, learning tools and shortcuts.

Here's how the sessions took place:

### Session 1 - Understanding the code

In the first session, our goal was to read through the code and try to understand what it does. No clues were given, the idea was to let us figure out what the code was about. Some of us went even further and ran the code, using the output to get more information and understand behaviours which were often hard to spot. We have also been asked to take notes, write down everything that we could figure out about the behaviours and what the project was about.

The code described a Board Game with multiple players and by running the code multiple times, my pair and I could compare the outputs and learn a great deal about the business rules, such as penalty rules and the criteria to define a winner.
This experience simulates a real-world scenario. Even when we are familiar with a project, sometimes we need to touch a module or part of the code which we (including every other member of the team) have never seen before.

This session served as the foundation for the rest of the event. The most interesting part, in my opinion, wasn't understanding the business rules, but actually seeing other participants coming with other ideas, interpreting the behaviours Domain differently. It was an enlightening experience to me.

### Session 2 - Writing a Golden Master

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-27-golden-master.png" alt=“golden-master-test” class="img img-responsive" style="height: 70%; width: 80%;"/>
</center>
<br/>

Once we had a clear understanding of the code (or, at least that's what we thought) we were given a brief introduction to [Golden Master Test][3] (also know as Characterization Test). In short, it's a useful approach to test Legacy Code with complex logic by keeping record of different outputs generated with random seeds so that you can compare (likely with the aid of a diff tool) the outputs after each small change in order to make sure you are not introducing unexpected changes (a.k.a bugs).

But it wasn't so simple: the code used random number generators to simulate the roll of dice. Each time the code was executed, we would get different outputs. Writing a Golden Master required us to take control of the randomness and make the results predictable so that whenever we ran the test for the same seed the same output should be expected.

In general, I found that 45min was too short for this session. Although my pair was already familiar with Golden Master testing and had a plan in mind, I wasn't that much familiar with the technique, so we had to discuss and try out some code to communicate our ideas better. By the end of the session, we didn't have our test implemented and I felt disappointed. But wait, I said before that the goal was to introduce techniques and share skills between the pairs. That's exactly what happened! We both learned from each other and even if we didn't finish the test, we both could understand the ideas and strategies we wanted to use, such as creating a [Test Double][4] called `TestableGameRunner`, introduce a few [Seams][5] and inject our own predictable dices.

### Session 3 - Extracting and Renaming

In the third session, we finally managed to get our hands in that smelly code. Our goal was to extract small chunks of the confusing code into functions with meaningful names, but the actual fun part came with the constraint of keeping [functions pure][6], that is, free of any observable side-effects.

Some of the refactorings are easy, resulting in a small method with one or two parameters. But soon enough we found ourselves looking at a two or three lines of code that were changing fields, printing the current state of the game and having some form of duplicated logic. Trying to extract those chunks required deeper analysis of the code, otherwise, we would end up with a function requiring four or five parameters in order to keep its pureness, which can be a sign of a [Code Smell][7].

This was a fun and challenging session, which required teamwork and attention. For each small change, we would re-run our tests and, occasionally, they would fail. We would then revert the changes and take a closer look at the code, often realising that it was a small but important difference that wouldn't allow us to remove a duplication so easy.

### Session 4 - Simplifying Conditionals

This session was about reducing the complexity of the code by avoiding complex conditionals and removing Else branches. By doing so, the code would get easier to read and, consequently, easier to test and maintain.

After spending the first three sessions looking at the Java version of the Kata, I decided to explore other languages. Fortunately, my next pair was working with C#. We both didn't have the Golden Master implemented, so we wanted to write it.

As we were learning about testing in the .NET environment, it was an interesting experience for me to compare the differences in the JVM environment. I have seen some friends at Codurance doing Katas and implementing code in C#, so I felt somehow familiar with the language. But still, it was nice to leave the comfort zone and try something new.

### Session 5 - Writing Unit Tests

With a Golden Master and a few refactorings in place, we took a further step into the more detailed picture: we started writing Unit Tests.

Unit testing our code meant that we could identify and separate the behaviours in small functions so that they could be tested in isolation, without being highly coupled to the rest of the code. That was the goal of this session, however, I spent the time pairing with a friend as we were trying to figure out how to read from and write to files in Ruby so that we could make the Golden Master work.

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-27-full-office-at-coderetreat-2.jpg" alt=“writing-unit-tests” class="img img-responsive" style="height: 70%; width: 80%;"/>
</center>
<br/>

It was a pleasure to revisit Ruby, a language that taught me a lot about Object Orientation and how to write simple code. While it can be frustrating when we cannot find the solution for a problem on our own, when we are pairing we someone we keep each other motivated and when the solution is found, it feels much better to celebrate as a team.

### Session 6 - Introducing new Features

Every time you want to change existing code, you must have a very good reason to do so. Unless that part of the code directly impacts the feature you are working on or the bug you are trying to fix, then you should probably not touch it and, instead, spend your time working with code that is going to cause a bigger impact in the current feature.

That said, we also wanted to make sure that the reason we were spending the whole day understanding and refactoring a legacy code was for a good reason (apart from the learning purpose): we've been asked to implement new features.

This time I had the opportunity to pair with someone coding in Python. I knew almost nothing about Python, so I didn't think twice before asking as many questions as I could about the language. It was a very interesting session with both of us learning Python at the same time as trying to get the feature implemented. This once again was an example that the goal of Coderetreats is more than just introduce new techniques and practice our skills: it's also an opportunity to meet people, learn new languages, look at challenges from different perspectives and have fun together.

At the end of this last session, we formed a circle and had a final retrospective, sharing feedback from what we've learned throughout the day. After the event was over, some of us decided to go to a local pub and continue the fun with a couple of pints.

### Conclusion

Being at my first Coderetreat, it was motivating to see people get together on a Saturday morning and spend the whole day coding and sharing their skills. Like Code Katas, Coderetreats gives you awareness of new techniques and sharpen your skills through practice. We discover that asking questions and not understanding something at first is completely natural. We all have something to share and to learn from each other. Furthermore, by rotating pairs and trying new languages, we open our minds to different solutions to a problem and learn to work as a team. Coming from different backgrounds, we find ourselves achieving common goals: to learn, improve our skills and have fun!

I would like to thank everyone who attended the event and made it successful and fun. In a few weeks time we will be hosting the [Global Day Of Coderetreat][8] and I am looking forward to seeing you all, as well as meeting other awesome people.

[1]:https://github.com/jbrains/trivia
[2]:https://sourcemaking.com/refactoring/smells
[3]:https://codurance.com/2012/11/11/testing-legacy-code-with-golden-master/
[4]:https://martinfowler.com/bliki/TestDouble.html
[5]:http://wiki.c2.com/?SoftwareSeam
[6]:https://en.wikipedia.org/wiki/Pure_function
[7]:https://sourcemaking.com/refactoring/smells/long-parameter-list
[8]:https://www.meetup.com/london-software-craftsmanship/events/244321442
[9]:https://codurance.com/publications/author/robert-firek/
