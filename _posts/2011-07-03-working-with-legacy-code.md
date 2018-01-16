---
author: Sandro Mancuso
layout: post
name: working-with-legacy-code
title: "Working with legacy code"
date: 2011-07-03 23:37:00 +01:00
---

###Context

Large organisations' systems may have from tens of thousands to a few
million lines of code and a good part of those lines is legacy code. By
legacy code I mean code without tests. Many of these systems started
being written many years ago, before the existence of cool things and
frameworks we take for granted today. Due to how some systems are
configured (database, properties file, proprietary xml) , we cannot
simply change a class constructor or method signature to pass in the
dependencies without undertaking a much larger refactoring. Changing one
piece of code can break completely unknown parts of the system.
Developers are not comfortable in making changes in certain areas of the
system. Test-first and unit testing is not widely used by developers.

###The Rule

In our commitment to make the existing systems better, more reliable,
easier to deal with (changing and adding more features), we established
the following rule: We can not change existing code if it is not covered
by tests. In case we need to change the existing code to be able to
write the tests, we should do it only using the automated refactoring
tools provided by our IDEs. Eclipse and IntelliJ are great for that, if
you are a Java developer like me.

That means, before we make any change, we need to have the current code
under test, guaranteeing that we don't break its current behaviour. Once
the existing code is under test, we then write a new test for the new
feature (or change an existing test if it's a change in existing
behaviour) and finally we are can change the code.

###Problem

There is an eternal discussion on forums, mailing lists and user groups
about TDD being responsible for the increase or decrease of the team's
velocity. I don't want to start this discussion here because we are not
doing TDD for majority of the time. With legacy code, we spend the
majority of our time trying to test existing code before we can do TDD
to satisfy the new requirement. And this is slow. Very slow. It can be,
in our experience, somewhere between 5 to 20 times slower than just
making the change we need and manually test it.

You may be asking, why does it take so much longer? My answer is: If you
haven't, try unit testing all the possible execution paths in a 2000+
line class? Have you tried to do it with a 1000 line method, full of
multiple return statements, hard-wired dependencies, loads of
duplication, a big chain of nested IFs and loops, etc? Believe me, it
will take you a bloody long time. Remember, you can't change the
existing code before writing tests. Just automated re-factorings. Safety
first. :-)

###Why are we "under-performing"?

Quite often, after start following this rule, management will enquire
why the team is under-performing. Although it is a fact that the team is
taking longer to implement a feature, this is also a very naive view of
the problem. When management and development teams talk about team's
velocity, they just take into consideration the amount of time taken to
write the code related to a few specific requirements.

Over the time, management and teams just forget how much time they spend
in things that are caused by the lack of quality and tests in their
code. They never take into consideration that there is absolutely no way
that developers would be able to manually test the entire system and
guarantee they didn't break anything. That would take days, for every
piece of code they write or change.  So they leave that to QA.

By not increasing the test coverage, the team will never have a
regression test suite. Manually testing the system, as it grows in size
and complexity, will start taking longer and longer by the QA team. It
will also be more error prone, since testing scripts need to be kept in
sync with the current behaviour of the system. This is also waste of
time.

Also, just hacking code all the time will make the system more fragile
and way more complicated to understand, which will make developers to
take longer to hack more code in.

Because we can't press a button and just unit test a specific piece of
code, the team is forced to spend a lot of time debugging the
application, meaning that the team needs to spend time compiling and
deploying it. In certain systems, in order to test a small piece of
code, you need to rely on other systems to trigger something so your
system can respond. Or you need to manually send messages to a queue so
your piece of code is invoked. Sometimes, depending of the complexity of
your system and it's dependencies, you can't even run it locally,
meaning that you need to copy your application to another environment
(smoke, UAT, or whatever name you use in your company) in order to test
the small piece of code you wrote or changed. And when you finally
manage to do all that to execute that line of code you just added, you
realise that the code is wrong. Sigh. Let's start over.

Since I started practising TDD, I realised that I very rarely use my
debugger and very rarely have to deploy and run my application in order
to test it.

So basically, when people think we are spending too much time to write a
feature because we were writing tests for the existing code first, they
are rarely considering the time spend elsewhere. I've seen it many
times: "We don't have time to do it now. Let's just do a quick fix.".
And then, contradicting the laws of physics, more time is created when
bugs are found and the QA phase needs to be extended. Panic takes over:
"Oh, we need to abort the release. We can't go live like that."
Exactly.

![Legacy Velocity]({{site.baseurl}}/assets/custom/img/blog/Legacy_velocity.jpg)


The graphic above is not based in any formal research. It is purely
based on my own experience during my career. I also believe that the
decrease in the team's velocity is related to the state of the untested
code. There are untested code out there that is very well written and
writing tests to it is quite straightforward. However, in my experience,
this would be an exception.

In summary, if you are constantly applying the "Boy Scout Rule" and
always keep improving the code you need to touch, over the time you will
be making your code better and you will be going faster and easier. If
you don't do that, you will have a false impression of good velocity at
start but gradually and quite often without noticing, you will start to
slow down. Things that used to take a few days, now take a few weeks.
Because this lost of velocity happened slowly (over months or even
years), no one really noticed until it was too late and everything now
take months.

###Drifting away and losing focus

One interesting side effect of constantly making legacy code better,
writing tests and refactoring, is that it is too easy to be carried
away. More than once I've seen pairs, while trying to clean a piece of
code, drifting away from the task/story they were working on. That also
happened to me quite a few times. We get carried away when making
progress and making things better.

Very recently I was asked by one of the developers: "When do we stop?".
My answer was: "When we finish the task.". In that context, that meant
that the focus is always on task at hand. We need to keep delivering
what was agreed with our product owners (or whoever the person in charge
of the requirements are). So, make the system better but always keep the
focus on the task. Don't go crazy with the refactoring trying to
re-write the whole system in a few days. Do enough to finish the task
and try to isolate the parts that are still not good enough. Baby
steps.

###A more positive side effect

Another very common problem in legacy systems is the lack of
understanding about the system and also about the business. Quite often
we find situations where the developers and business people are long
gone and no one really knows how the system behave.

Writing tests for the existing code force us to understand what it does.
We try to mine some hidden business concepts in the middle of the
procedural code and try to make them very explicit when naming our
tests. That is a great way to drive our refactoring later own, using the
business concepts captured by the tests. Quite often, we also get the
business people involved, asking them questions and checking if certain
assumptions make sense.

In writing the tests and refactoring the code, the previously completely
unknown behaviour of the system is now well documented by the tests and
code.

###Quality is a long term investment

In a recent conversation, we were discussing how we could measure our
"investment" in quality. A quick and simple answer would be that we
could measure that by the number of bugs and the velocity that the teams
are delivering new requirements. However, this is never too simple. The
question is, why do you think you need quality? Which problems do you
have today that makes you think they are quality related? What does
quality mean anyway?

When working with legacy, after many years, we tend to forget how things
were in the past. We just "accept" that things take a long time to be
done because they have been taking a long time to be done for a long
time. We just accept a (long) QA phase. It's part of the process, isn't
it? And this is just wrong.

Constantly increasing the quality level in a legacy system can make a
massive difference in the amount of time and money spend on that
project. That's what we are pursuing. We want to deliver more, faster
and with no bugs.

It's up to us, professional software developers, to revert this
situation showing a great attitude and respect for our customers. We
should never allow ourselves to get into a situation where our velocity
and quality of our work decreases because of our own incompetence.
