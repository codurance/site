--- 
layout: post 
name: the-wrong-notion-of-time 
title: The Wrong Notion of Time 
date: 2012-12-10 23:38:00.000000000 +00:00 
author: Sandro Mancuso
blogimage: /assets/img/blog/wrong-time.jpeg
---

No one wakes up in the morning and say "Today I'm gonna screw up. Today
I'm gonna piss my boss and all my team mates off writing the worst code
I could possibly write". Well, there are always exceptions but normally
no one does that. If that is the case, how come Agile projects are now
failing? How come do we still have the same old problems?

**A Technical Debt Story**

Some time ago I was in this project and one of the developers chose to
work on a brand new feature. For the implementation of this new feature,
we did not need to touch any of our existing code, besides very few
things just to wire the new feature into the application. After a day or
so, I offered to pair with him. Naturally, since I had just joined him,
I asked him to give me an overview of what the feature was about. He
promptly explained it to me and I asked him to show me where he was so
we could continue. After he finished showing the code to me I made a few
observations since it was not clear to me that his code was reflecting
what needed to be done - according to his previous explanation.
Basically, the language the he used to explain me the business feature
was not in sync with the language that he had used in the code and I
could also see some code that was not really necessary for the
implementation of that feature. I also noticed that there were no tests.
When I asked him about that he said \_It is working now and I may need
that extra code in the future. Let's add this refactoring you are
proposing and the unit test to the technical debt backlog. I need to
finish this feature. How crazy is that? That was a brand new feature. We
should be reducing technical debt as we went along instead of adding
more of it. However, this developer somehow felt that it was OK to do
that. At the end of the day we had a technical debt backlog, didn't we?
That was supposedly an Agile team with experienced developers but
somehow, in their minds, it was OK to have this behaviour. Perhaps one
day someone would look at the technical debt and do something about.
Possibly. Maybe. Quite unlikely. Nah, will never gonna happen.

**But we want to do the right thing**

But we all want to do the right thing. We do not do these things on
purpose. However, over the time, I realised that we developers have a
wrong notion of time. We think we need to rush all the time to deliver
the tasks we committed to. Pressure will always be part of a software
developer life and when there is pressure, we end up cutting corners. We
do not do that because we are sloppy. We normally do that because we
feel that we need to go faster. We feel that we are doing a good job,
proving the business the features they want as fast as we can. The
problem is that not always we understand the implications of our own
decisions.

**A busy team with no spare time**

I joined this team in a very large organisation. There were loads of
pressure and the developers were working really hard. First, it took me
days to get my machine set up. The project was a nightmare to configure
in our IDEs. We were using Java and I was trying to get my Eclipse to
import the project. The project had more than 70 maven projects and
modules, with loads of circular dependencies. After a few days, I had my
local environment set. The project was using a heavyweight JEE
Container, loads of queues and had to integrate with many other internal
systems. When pairing with one of the guys (pairing was not common there
but I asked them if could pair with them) I noticed that he was playing
messages in a queue and looking at logs. I asked him what he was doing
and he said that it was not possible to run the system locally so he had
to add loads of logs to the code, package, deploy the application in the
UAT environment, play XML messages into one of the inbound queues, look
at the logs in the console and try to figure out what the application
was doing. Apparently he had made a change and the expected message was
not arriving in the expected outbound queue. So, after almost twenty
minutes of changing the XML message and replaying it into the inbound
queue, he had an idea of what the problem could be. So he went back to
his local machine, changed a few lines of code, added more logs, changed
a few existing ones to print out more information and started building
the application again. At this point I asked if he would not write tests
for the change and if he had tests for the rest of the application. He
then told me that the task he was working on was important so he had to
finish it quickly and did not have time to write tests. Then he deployed
the new version of the application in UAT again (note that no one else
could use the UAT environment while he was doing his tests), played an
XML message into the inbound queue and started looking at the logs
again. That went on for another two days until the problem was fixed. It
turned out that there were some minor logical bugs in the code, things
that a unit test would have caught immediately.

**We don't have time but apparently someone else does**

Imagine the situation above. Imagine an application with a few hundred
thousand lines. Now imagine a team of seven developers. Now imagine ten
of those teams in five different countries working on the same
application. Yes, that was the case. There were some system tests (black
box tests) but they used to take four hours to run and quite often they
were broken so no one really paid attention to them. Can you imagine the
amount of time wasted per developer per task or story. Let's not forget
the QA team because apparently testers have all the time in the world.
They had to manually test the entire system for every single change in
the system. Every new feature added to the system was, of course, making
the system bigger causing the system tests to be even slower and QA
cycles even longer. Debug time was also getting bigger since each
developer was adding more code that all the others would need to debug
to understand how things work. Now thing about all the time wasted here,
every day, every week, every month. This is all because we developers do
not have time. 

Dedicated Quality Assurance teams are an anti-pattern. Testers should
find nothing, zero, nada. Every time a tester finds a bug, we developers
should feel bad about it. Every bug found in production is an indication
of something that we have not done. Some bugs are related to bad
requirements but even then we should have done something about that.
Maybe we should have helped our BAs or product owners to clarify them.
By no means I am saying that we should not have testers. They can be
extremely valuable to explore our applications in unexpected ways that
just a human could do. They should not waste their time executing test
plans that could be automated by the development team. 

Business want the features as soon as possible and we feel that it is
our obligation to satisfy them - and it is. However, business people
look at the system as a whole and so should we. They look at everything
and not just the story we are working on. It is our job to remove
(automate) all the repetitive work. I still remember, back in the 90ies,
when debugging skills was a big criteria in technical interviews. Those
days are gone. Although it is important to have debugging skills, we
should be unpleasantly surprised whenever we need to resort to it and
when it occurs, we need to immediately address that, writing tests and
refactoring our code so we never need to do that again. 

**Using time wisely**

Our clients and/or employers are interested in software that satisfy
their needs, that works as specified and is easy to change whenever they
change their minds. It is our job to provide that to them. The way we go
about satisfying their expectations, normally, it is up to us. Although
they may mention things like automated testing and Agile methodologies,
what they really want is a good value for their money when it comes to
the investment that they are making in a software project. We need to
use our (their) time wisely, automating whatever we can - being tests or
deployment procedures - instead of thinking that we may not have time to
do it. We can always quantify how much time we are spending in
repetitive tasks and even get to the extend of showing them how much
time is being spent over a period of time in those activities. Before
implementing any new feature or task, we should spend some time
preparing our system to accept the changes in a nice way, so we can just
\_slide that in\_ with no friction, and making sure that whatever we
write can be easily tested and deployed. When estimating our work, we
should always take this into account as \*\*part of the time\*\* that
will take us to do it instead of having the false impression that we
will be going faster if we treat them as a separate task since, chances
are, they may never get done and the whole time will be slowed down
because of that. The less time we waste manually testing (or waiting for
a long automated test suite to run), debugging, dealing with a huge
amount of technical debt, trying to get your IDE to work nicely with
your fucked up project structure, or fighting to deploy the application,
the more time we have to look after the quality of our application and
make our clients happy.  

*Note: The teams I mentioned above after a lot of hard work, commitment,
support from management and a significant amount of investment (time and
money) managed to turn things around and are now among the best teams in
the organisation. Some of the teams managed to replace (re-write) an
unreliable in-house test suite that used to take over three hours to run
with a far more reliable one that takes around 20 minutes. One of the
teams is very close to achieve a "one-button" deployment and has an
extensive test suite with tests ranging from unit to system (black box)
that run in minutes and with code coverage close to 100%.*
