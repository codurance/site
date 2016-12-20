---
author: Sandro Mancuso
layout: post
name: code-coverage-is-side-effect-and-not
title: "Code coverage is a side effect and not an end goal time"
date: 2012-02-06 22:11:00 +00:00
---

In my previous life as a consultant, one of our clients hired us to
"increase the code coverage" of their code base. We would not develop
any new features or make any changes. They just wanted us to write
tests. Basically they wanted us to bring the coverage up to 70%. Why 70%
you may ask. Probably because someone pulled a finger out of his or her
back orifice, sniffed it and thought: Hmm.. this definitely smells like
70%.


Regardless the stupid and random number, as consultants we actually did
our best to actually write proper and meaningful tests. They did not
want us to refactoring. Just tests. The developers themselves (client
employees) would not be writing tests. Probably too busy doing proper
work, breaking the tests after each commit. Thanks for them, they had
the monkeys here fixing the tests. The reason for that was that the same
person with the smelly finger decided that everyone would have a higher
bonus if they reached 70% test coverage. 


More recently, I've seen a similar behaviour. Keeping a close eye on the
metrics provided by [Sonar](http://www.sonarsource.org/), that does a
great job by the way, managers and senior developers are constantly
pushing the teams to improve the quality of the code. Time is allocated
in
every [sprint](https://en.wikipedia.org/wiki/Scrum_%28software_development%29#Sprint) and
developers are asked to increase the code coverage. The intention behind
it is good, right? Bit by bit the application get better. Awesome. 


The idea was to improve the quality and reliability of the application.
Unfortunately, developers with the urge to finish the task, just focused
on the "increase code coverage" part of the task. They then started
writing "tests" that were not asserting anything. Basically what they
were doing was writing some code inside a test method that would invoke
public methods in classes but would not test the outcomes or side
effects of those method invocations. 


###What does code coverage measure?

It measures the percentage of the code *exercised* by code written
inside test methods. It does not measure the percentage of code *tested*
by testing code. Having a test method that just invokes a public method
in a class and *does not* test (assert/verify) anything, will make the
code coverage go up but *will not* test the system. This, of course, is
totally pointless since it does not test if the public method invoked
actually does what it is supposed to do or if it does anything at all.

###Why do we invest time in writing tests?
(In no particular order)


-   Make sure we understand what the application does, according to the
    executable requirements (tests); 
-   Make sure that the application still does the right thing after we
    make changes to it or indicates possible areas of conflicts (failing
    tests);
-   Make sure we have regression test; 
-   Make sure that in a click of a button we can know if the application
    is working correctly; 
-   Make sure that we have a quick and small feedback loop in terms of
    quality and correctness of our application; 
-   Make sure the application is simplified and easily maintainable, via
    testing and refactoring; 
-   Make sure the complexity of the application is spread thin instead
    of having localised big balls of mud that we are scared to touch;
-   Make sure that we can easily add new features quickly; 
-   Make sure that we extend the ROI in our software, extending its
    lifespan; 
-   Make sure that our software does not rot, impeding and/or slowing
    down business progress; 
-   Make sure that our clients are happy with the software;


By the way, when I mention test, I mean all types/levels of tests, not
just unit.

###What should we focus on?

<blockquote>Focus on what the metrics are telling you and not on improving the numbers. Focusing on numbers may give you a false impression of quality.</blockquote>

My point here is that the focus should be on TESTING the application and
not in increasing its code coverage metric. We need to make sure we
capture the behaviour of our application via tests, expressing its
intent, refactoring to make it better. Tests (at all levels) should tell
you a story about the behaviour of your application. And guess what? In
writing tests for your application, besides all the benefits mentioned
above, your code coverage metric will still go up as a side effect.
