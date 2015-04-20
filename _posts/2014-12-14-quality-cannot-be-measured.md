---
layout: post
name: quality-cannot-be-measured
title: Code quality cannot be measured
date: 2014-12-14 00:27:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2014_12_12/you_are_going_to_call_me_what.jpg
tags:
- craftsmanship
- tdd
- test-driven development
- quality
- metrics
---

We cannot effectively measure what we can't precisely define. And this is definitely true when it comes to software quality. What is software quality? What does quality mean? Quality for whom? Compared to what? In which context? Are we talking about quality from a developer's perspective, from a manager's perspective, or from a user's perspective?

From a developer's perspective, I don't think it is possible to measure quality to a satisfactory degree. Static analyses tools, code coverage, and a few other code metrics are a good thing when used by developers; they help us to identify areas of our code that could potentially be improved. However, although I think metrics help us to identify bad code, they fail to identify good code. Code with high-test coverage is not the same as well-tested code. Small methods with zero or few parameters are not the same as clean code. Highly cohesive code (low [LCOM4](http://www.aivosto.com/project/help/pm-oo-cohesion.html#LCOM4)) is not the same as code that express the business domain. Loose-coupled code is not the same as code that can be easily maintained. Numbers can be gamed, and believe me, I've been there. 

Software quality metrics used by managers or anyone else that doesn't have the skills to create well-crafted code should be extremely discouraged. When used by managers, metrics can cause more harm than good. Instead of being used as an aid to make our code better, metrics end up being used as bonus targets and finger pointing. 

Software design is all about trade-offs and no software quality tool will ever be able to understand the rationale behind each design decision. For example: decoupling classes and creating indirections are good practices; they allow us to easily test and expand our code. However, the excessive use of indirections, and decoupling every single class from each other, may lead to a totally over-engineered code base. 

### What is quality?

> _quality_: the standard of something as measured against other things of a similar kind; the degree of excellence of something.

What is this standard that we are talking about here? What are the other things of similar kind we are comparing our code base to? 

I don't think there is a simple way to define quality. Quality is contextual and subject to comparisons. There is also a human and time factor to quality. Quality for whom? At what point in time? 

> _Quality is something that is valuable to someone at some point in time_

This is by far the best (and vaguest) definition of quality I've seen. It came from a combination of ideas captured in an old [blog post](http://www.shino.de/2010/07/22/quality-is-value-to-some-person-at-some-time/) by [Markus Gartner](https://twitter.com/mgaertne).  

### Why do we want to measure software quality?

There are many reasons to why we want to measure quality. Some developers like to use metrics to identify areas of the code that could be improved. Others use metric as a quality gate; if the code doesn't satisfy a certain "quality" criteria, the build fails. 

Managers may have different reasons to why they want to measure quality. Although they may say otherwise, the most common reasons to why they want software quality to be measured are: 

* Lack of trust.
* Fear of being responsible for things they don't understand.
* Find other people to blame in case something goes wrong.
* Try to find a justification for the general dissatisfaction among the people building or using the software.
* Show they are in control.
* Cover their backside, showing that they are doing something to control quality (ticking a box).
* Annual targets and bonuses (normally associated to the percentage of test coverage).

With the exception of a few developers and academics, the people that are keener to find a way to measure software quality are the ones that don't write software on a daily basis. Many of them don't even understand how some of the metrics are calculated, but they want a way to control what they don't understand. How many times have we heard stories about managers who _force_ their teams to keep test coverage above a certain percentage? Do they really know what it means? Would they be able to help the teams to achieve that? Can they distinguish good tests from bad tests? 

### When do we want to measure quality?

The desire to measure quality is intensified when things are not going well: people are unhappy; some team members are not suitable for the job; too many bugs; there's always problems with new releases; few releases per year; things are taking too long to be done; lack of trust; people are often wondering what others are doing and who is responsible for what. But when asked, almost no one can explain exactly where the software lacks quality or how it could be fixed. 

On the other hand, we very rarely see people talking about measuring software quality when the project is going well: team is composed by good professionals; people are working well with each other; people respect and trust the opinion of their teammates; software is released often and with zero or few cosmetic bugs; good communication and team spirit; 

### Code metrics

Code analysis tools are great when used by developers as an aid to find areas of the system that could be improved. They are great to highlight things that are not always easily seen with a naked eye. They may also be very helpful when working with legacy code. However, the problem with code metrics is that making sure that the code complies to specific metrics is very different from saying that the code has quality. Having high test coverage is not the same as having good tests. Having loose coupled and high cohesive code doesn't mean code that express the business domain or that is very easy to understand. Code with low cyclomatic complexity doesn't mean code that behaves according business specifications and is bug free. 

### Non-code related metrics 

How long does it take to build a new feature? How hard is to deploy the application? How many bugs are found in production every time we go live? How often do we go live? How fast can we safely and confidently change the software to accommodate the ever changing business requirements? Those are all things that we could associate with code quality, but can they be really associated to it? Are all these things only related to the quality of the code? Let's take two common non-code related metrics as examples.

* __Number of bugs:__ What type of bugs have been raised? Are they related to the bad state of the code base, the lack of skills of the developer that implemented the code, bad requirements, or a complete lack of communication between business, developers, and testers?
* __Time to deliever a feature:__ Why are we unhappy about the time it took us to deliver a feature? Is is because of bad estimations? Is it because we were doing something that we haven't done before and we had to explore different alternatives? Were we blocked by other teams or internal bureaucracy? How does this feature compare to previous features implemented in the system? Are they similar? Completely different?

As you can see, there are just too many variables involved, which makes it impossible to have a precise way to measure quality. 

Can we really judge the quality of our code according to the amount of time we take to build a new feature or number of bugs? I don't think so. Does the state of the code base impact on our speed of delivery and number of bugs? Yes, definitely. Is the state of the code base the sole responsible for delays and bugs? No. But, as a developer, can we feel that the state of the code is dragging us down and helping us to make mistakes? Absolutely. Can we define a set of metrics that would define quality according to how we feel? I really doubt.

### Same role, different perceptions

On top of the difficulty to map any type of metrics to quality, there is an additional complexity. We are assuming that a single developer could express his or her notion of quality and then derive some code metrics from it. But do all developers in the team share the same notion of quality? Do developers outside that team and company share the same notion of quality? 

Do Ruby and Java developers share the same notion of code quality? Do game developers share the same notion of quality with developers in the financial industry? Or social network industry?

With so many different opinions about what code quality means, how can we measure quality? How can we precisely say which degree of quality a code base has?

### Feeling quality 

What I want from a code base is to be able to quickly and confidently make the changes, and most importantly, be satisfied with the solution. I don't want be scared every time I touch certain areas of the code. I want to easily navigate through the code and always finding what I'm looking for. I don't want to be unplesantly surprised, wasting time looking for things that don't exist or are not in the right place. I don't want to constantly get stuck, but if that ever happens, I want to have that piece of mind that anyone around me can quickly unstuck me. I don't want to waste time fixing bugs, but if I need to fix a bug, I don't want to spend more than a few minutes. When I look at the system from above, I want to clearly understand what that system is about and what it does. I want to deploy the application to production as often as possible. I want to be able to change the code almost as fast as the business change their minds, making sure that whatever I'm delivering is exactly what they expect. As a developer, this is what quality looks like for me. 

### A few thoughts

No code analysis tool will ever guarantee quality. They can probably highlight the lack of quality but never inform that the code is of high quality. Although I believe that code quality cannot be measured, I believe that it can be felt. This general feeling of quality software is only achieved when we have great professionals working well together, trusting and respecting each other. Conversations between team members flow easily, information is as precise as they can be, division of labor happens naturally, and in the few occasions when things don't go according to plan, the whole team gets together to solve the problem. When we work in an environment like that, we didn't need metrics to tell us we are producing quality software. Every one simply feels it. 

By no means I'm against using code metrics. I just don't feel they are enough to measure quality. I think metrics are great when used as a _bare-minimum_ quality gate and also an aid for developers to identify areas of improvement. However I also believe that the need to measure _quality_ normally comes from a general dissatisfaction caused by bad professionals and organisational disfunction. 

There are too many variables in a software project and many of them cannot be easily be measured, if at all. But if you ask the people involved in a project to rank the quality of their software in a scale of 1 to 10, they would give you a number, which in fact is more based on gut feel than any scientific measure. When you ask them to pinpoint the reasons why they ranked the quality in that way, you will see that none of them will say that the reason is because the code base scores 3.2 in the LCOM metric or that the test coverage is only 32% when it should have been 70%.  

### Conclusion

I believe that the only sensible thing we can do is to try to be the best we can be and always strive to do our best. 

