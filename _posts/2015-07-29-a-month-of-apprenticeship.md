---
layout: post
name: a-month-of-apprenticeship
title: My first month as an apprentice
date: 2015-07-31 16:00:00 +00:00
author: Franziska Sauerwein
image:
    src: /assets/img/custom/blog/apprenticeship-month.jpg
    attribution:
        text: A screen with IntelliJ idea on Mac
tags:
- learning
- apprenticeship
- codurance
- career
- mentorship

---

About a month ago, I started my apprenticeship at Codurance. I have learned a lot already in these few weeks, and I want to share some of it.

##A little background
As some of you know, I moved from Germany over to London to work for Codurance. I knew the founders and some of the craftsmen from various conferences, mainly [SoCraTes Germany](https://www.socrates-conference.de/) and [SoCraTes UK](http://socratesuk.org/).
Apart from wanting to immerse myself into the vibrant [London Software Craftsmanship Community](http://www.meetup.com/london-software-craftsmanship/), I was looking for an opportunity to learn about better software design.
I studied computer science at university, where I learned about UML and the theoretics of design patterns. I worked as a developer and consultant for three years in Germany and got some basic training on clean code and XP techniques.

But going to Software Craftsmanship events, especially the international ones, made me realize there is so much more to learn. I attribute my ignorance to the [Dunning Kruger](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) effect. Or the fact that there weren't many people who understood.
I tried to get some advice from my peers and the answers I heard were:

- "You just need to spend a few years gaining more experience."
- "This is as far as you can go with learning about good design"
- "The training you are looking for doesn't exist, you can train special frameworks and technologies instead"
- "Your career options are management or full time process consulting"

Needless to say, given my personality and my goals, this 'advice' didn't satisfy me. Here is what I tried instead:

- I started organizing events to improve by pairing with other motivated coders
- I booked a one-on-one, advanced design training
- I used my free time to participate in as many meetups and conferences as I could

Still, for 40 hours a week, in my comfortable, reasonably agile team, I wasn't improving much. And there weren't enough people senior to me that I could learn from.
One example is that we were proposing to use the same technology stack for almost every project we started. We used Spring, Hibernate and other frameworks that forced us into a particular design.
And a lot of the new things I was trying to bring in from outside were rejected, so I couldn't practice them in a "real" project.

When I heard [Sandro](https://twitter.com/sandromancuso) and [Mash](https://twitter.com/mashooq) talk about how important it is to spend your main working time somewhere you can improve, it really hit home. In [The Software Craftsman](http://www.amazon.co.uk/books/dp/0134052501), I read inspiring words about what it meant to take charge of your career.
I realized I needed to make a bigger change to get where I wanted to be.

I quit my job (it had three months notice) and applied in London, hoping to get accepted at Codurance. I was intrigued by the opportunity to work with [awesome craftsmen](http://codurance.com/aboutus/ourteam/) and to have a few months of focussed learning in my apprenticeship.
As it turned out, I was a fit and they wanted me to start as early as possible. Organizing the move with no vacation time in between my jobs was a challenge, but I managed.

##Starting my apprenticeship
Early on I understood that I was the person driving my apprenticeship. Both the company and I benefit from me graduating, but it's my responsibility to get there.
This is very different from studying at university, where you have a syllabus, exams and credits to collect.

I started by identifying what Codurance expects from their craftsmen. Some things had already been covered in the application process and in conversations I had with Codurance employees before. There was the [job description](http://codurance.com/careers/craftsman/) and a list of values in the Codurance wiki.
From those, I identified I wanted to focus on improving my design and DevOps skills. Other important aspects are writing and presenting, and getting involved in the Software Craftsmanship Community.
I made a list of tasks I wanted to do to reach my goals and got encouraging feedback from the founders.

##Mentorship
The next step was to find a mentor to guide me and help me to focus on my goal to graduate. I had a chat with the available craftsmen about how they could help me and what they expected from me.
And from the ones that offered, I chose [Samir](https://twitter.com/SamirTalwar) as my mentor. We meet regularly to pair and discuss my progress. The founders are also providing advice and guidance.

##First challenge
I was reasonably fast using my Windows laptop, Eclipse IDE and a German keyboard layout. But the first goal was to learn to be efficient using IntelliJ idea shortcuts, a Mac and the UK keyboard layout.
Why? Because I don't want to waste time between having an idea in my head and writing the code to try it.

So I practiced the [Roman Numerals](https://www.youtube.com/watch?v=iZjgj1S0FCY) kata a few times, to learn some basic navigation skills and other shortcuts.
Then I moved on to refactoring the [Trip Service](https://github.com/sandromancuso/trip-service-kata) kata. Refactoring is one of my favorite coding activities, and it felt very rewarding to speed it up.
One of the things I found most useful is the <kbd>⇧</kbd> + <kbd>&#8984;</kbd> + <kbd>A</kbd> Shortcut in IntelliJ IDEA. It allows you to search for any action available, be it a setting or a refactoring step. And it shows you the applicable shortcuts.

![Find Action](/assets/img/custom/blog/findAction.png)

##Baby steps for better design
I continued with our trainings [Crafting Code](http://codurance.com/services/training/crafting-code/) and [Crafted Design](http://codurance.com/services/training/crafted-design/) and got a better understanding of Dependency inversion, Outside-In TDD and [Interaction Driven Design](http://ustre.am/:49XUG).
It's one thing to watch videos or read blog posts, but actually implementing and practicing has always been a more sustainable way of learning for me.

##Peer learning
Every Monday, all Codurance apprentices meet up in the office to learn together. We pair on katas, present lightning talks and have discussions.
We also started a book club and are currently reading [Growing Object-Oriented Software Guided by Tests](http://www.growing-object-oriented-software.com/). The regular meetups motivate to keep reading.
Additionally, discussing what each of us understood and took out of the material helps to reinforce the learning and clear up any misunderstandings.

One of the things we discussed was how the tests help us to look at the unit we are developing from the outside. So when we are writing tests, we should always ask: What are we promising to units interacting with our unit? What can they expect our 'thing' to do?
Since all of us have different backgrounds, we can share our experiences and support each other. It's great to be part of a group!
One of the craftsmen will join us on the meetings and provide us with advice and guidance.

##On the shoulders of giants
A lot of good design has already been described in length in various books and blogposts. On the advice of my mentor, I try to focus on reading one book at a time. I also try to read two blog posts a week on topics I'm interested in.
I read blog posts on [cohesion](https://pragprog.com/magazines/2010-12/cohesive-software-design), [coupling](http://martinfowler.com/ieeeSoftware/coupling.pdf), [composition over inheritance](http://www.thoughtworks.com/insights/blog/composition-vs-inheritance-how-choose), the four rules of [simple design](http://martinfowler.com/bliki/BeckDesignRules.html) and their [order](http://blog.thecodewhisperer.com/2013/12/07/putting-an-age-old-battle-to-rest/).

Another important aspect is sharing my learnings, which is why I intend to regularly write on the [Codurance blog](http://codurance.com/blog/). It's important to timebox reading and writing though, because my learnings usually come from doing :) By advice of my mentor, I try to spend 20% of my time on it.

I am also sharing by presenting at various conferences. I plan to attend SoCraTes unconferences in  [Germany](https://www.socrates-conference.de/), [France](http://socrates-fr.github.io/) and [Belgium](http://www.socratesbe.org/). I am presenting at [SWANSEACON](http://swancon.co.uk/) and [XP Days Germany](http://www.xpdays.de/2015/).

##Working for Codurance
One way I am contributing to Codurance's success is to help out with the recruitment efforts. Be it by reaching out to possible candidates or reviewing code submissions.

##Ideal conditions
Just being around the Codurance office is a blessing. Here are some highlights: Spontaneous discussions about design, pairing with [Sandro](https://twitter.com/sandromancuso), developing the website with [Ana](http://twitter.com/anainogal), learning consultant skills from [Mash](https://twitter.com/mashooq), discussing good design with [Liam](http://twitter.com/lrbpx), organizing meetups with [Ana](http://twitter.com/craftatheart),..

Biweekly, we also have a catch up with all of Codurance. We use this to keep each other up to date about what we are working on, what our challenges are and what we learned. We have some pizza and some presentations on topics we are interested in.

Speaking about pizza, there are lots of interesting meetups in London! My favorites so far are the [LSCC hands on](http://www.meetup.com/london-software-craftsmanship/) and the [eXtreme Programmers London](http://www.meetup.com/Extreme-Programmers-London/). I am definitely planning on contributing on them! They also feature great discussions afterwards at the pub, which I really enjoyed.
I also had the honor to facilitate an [LSCC talks](http://www.meetup.com/london-software-craftsmanship/) meetup.

Another beneficial aspect is [Codurance's culture](http://codurance.com/2015/07/14/learning-from-our-failures/). I get feedback and advice and can give feedback myself. My opinion is valued and I am encouraged to be self organized and proactive. I keep my mentor updated on my progress. The founders and the mentor regularly check in on me to solve any problems that could arise.

##Future plans
One important expectation my mentor has is that I always know what to do next. Here are a few things I want to do:
I'll propose more conference talks and might present or host more LSCC meetings.
I will also start working on a larger project (a journeyman's piece, so to speak) to practice DevOps, Functional Programming and Domain Driven Design.

I am exited to see where it leads me!
