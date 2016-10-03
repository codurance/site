---
author: David Hatanian
date: 2016-10-03 10:10:00 +00:00
layout: post
asset-type: post
slug: what-i-wish-i-knew-earlier
title: What I wish I knew when I started as a software developer
image:
    src: /assets/img/custom/blog/2016-10-03-what-i-wish-i-knew/thumbnail.jpg
attribution:
    text: Young poplars on Westrop Farm (licensed under Creative Commons by D Gore)
    href: http://www.geograph.org.uk/photo/2469549 
tags:
- craftsmanship
- practices
- productivity
---

Having worked in the software engineering field for 6 years, I sometimes pause and consider how much I have learned since I started my career. One thing that strikes me is how many things I would want to tell just-out-of-college me if I had the occasion.

While I don’t have that capability, I hope that the few items below will be useful to people on their way out of college and into the software industry.

#Keep on learning#
You just obtained your diploma, are overwhelmed by a sense of accomplishment and now feel the desire to prove yourself to your new colleagues? That is great, congratulations and good luck, but keep in mind that this is just the beginning of your learning.

You will find soon that you need to keep learning new technologies, new methods, new techniques, new languages. Start as soon as possible, because learning in an unsupervised way (no syllabus, no teacher, no final exam) is a skill that you need to hone.

Learn things outside your comfort zone. If you work on a dynamic language, learn a statically typed one. Use VIM or Emacs if you are used to an IDE, etc.

##Find a mentor##
I just said that there are no teachers after college, but that is not entirely true. Nobody will sit in a classroom with you and go over a predefined lesson. But it is still extremely beneficial to find one more experienced person that can guide you.

[Sandro’s book “The Software Craftsman”](https://www.goodreads.com/book/show/23215733-the-software-craftsman) describes how a mentor is beneficial to a new software developer at great lengths.

Depending on the company you are working with, you might be provided with a mentor, or someone will come to you and spontaneously offer their help. Sometimes you will need to look for them. If you cannot find them amongst your colleagues, look for them in community events for example.

##Ask questions##
I did not know what a framework was when I got out of college. Looking up the definition of Wikipedia did not help either, and for several long months I was too afraid to show my ignorance and ask.

Do not repeat my mistake. You are not expected to arrive at your first job knowing everything. Ask, don’t be afraid to show you do not know something.

Most of the time, you will find out that either at least one other person in the team had the same question, or people have slightly different definitions of the term you are asking about. Even if you are the only one asking the question, you will not be the only one learning something in return.

#Get good practices early#
These good practices will be the foundation upon which you will build your career. Get them as early as possible.

##Leverage existing libraries and frameworks##
I barely knew how to properly use a library when I got out of college. As I said earlier I did not even know what a framework was.

As juniors, we have a tendency to re-invent the wheel. Our custom-made solutions will usually be of less quality than a library on which hundreds people have collaborated over several years. Try to re-use what is already available.

On the other hand, understand what are the tradeoffs of a given library. Is it still maintained? It is easy to use? Does it require huge changes in your application’s architecture? Make sure that you isolate that library, so that replacing it does not mean making changes all over your code.

##But still understand the fundamentals##
Libraries are convenient, because they remove complexity. However, take the time to understand a bit of how they work under the hood.

While your web framework will handle HTTP requests for you, you need to get what [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is and how to conveys information between two computers. Similarly, take the time to understand the basis of [DNS](https://en.wikipedia.org/wiki/Domain_Name_System), [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), and other low-level protocols. If your application uses [OAuth](https://en.wikipedia.org/wiki/OAuth) or [session-based authentication](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet), you need to know it and you need to know what the consequences are. [This page](https://github.com/alex/what-happens-when) is a good starting point.

##Assume the mistake is yours##
You will face unexplainable bugs. Sometimes even [heisenbugs](https://en.wikipedia.org/wiki/Heisenbug), that disappear when you debug them. In despair, you might be tempted to reject the fault to something else than your code. Always start with the assumption that it is an issue with your code,*not* the library, the OS or anything else.

This is a lesson in humility. There is a much higher chance that your barely tested, 2 days old code is buggy than a battle-hardened library that has been around for years. As your debugging skills and your bug-hunter instinct improve over time, you will come to that conclusion anyway.

Sometimes, it is indeed a bug in another software component than yours. However flagrant the bug, however careless the offending code seemed, remember of how many bugs your code was littered to being with, and don’t hold it against the authors of the faulty code.

##Test, test, test##
I think that automated testing and test-driven development are not practiced enough in software engineering courses. Those are amongst the most important skills in software development today, and I wish I was made aware of that earlier in my career.

Learn how to write tests and how to maintain them. Pair with someone who can teach you test driven development. If you cannot find such person amongst your colleagues [look at a software craftsmanship community next to where you live](http://slack.softwarecraftsmanship.org/).

##Clean code principles##
Learn how to write clean code from the start. [The book by Robert C Martin](https://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) is an excellent way to start. There is also plenty of content online (just check other articles on the [Codurance blog](https://www.codurance.com/publications)). Take the time to read some of that content and apply it. Ask your mentor or colleagues for feedback.

#Programming is a social activity#
Depending how much programming practice you’ve had before starting your career, you might still believe that a programmer’s day is spent sitting alone in front of their editor. You need to understand as soon as possible how much you win by working with others.

##Pair programming##
This is a very important skill to develop. Get used to coding with someone else, passing the keyboard from one person to the other from time to time. Practice this both with people more skilled than you, and with beginners.

##Being good at writing code is not even half the job##
You need to learn how to work with users or Product Owners, ask questions about features and manage expectations.

You will discover that sometimes, the answer will not be to add more code to your project: either the feature is not needed, or it can be implemented with the current version of the app, or there is another application that provides 80% of the functionality.

##Don’t be “clever”##
Being clever is rewarded in college. You may have been encouraged to optimize a for loop, or write one less line of code by replacing `i=i+1` with `i++` in the line before.

Being creative and clever to solve a hard, complex problem is good. But do not use clever micro-optimizations that make your code less readable.

One of the greatest challenges as a beginner software engineer is to make your code readable. Your teammates need to be able to understand your code and evolve it without your help. Clever optimizations often go against that by making the code’s intent less obvious. Unlearn this “academic” reflex.

But understand it is a tradeoff, and readable code is more important that clever code. Boring code is good.


[We are hiring software craftspeople and apprentices! More information here.](https://codurance.com/careers/)
