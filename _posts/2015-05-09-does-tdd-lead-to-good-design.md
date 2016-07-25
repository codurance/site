---
layout: post
asset-type: post
name: does-tdd-lead-to-good-design
title: Does TDD really lead to good design?
date: 2015-05-12 14:32:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2015_05_12_does_tdd_lead_to_good_design.jpg
tags:
- craftsmanship
- quality
- tdd
- design
---

Recently I tweeted that [TDD can’t lead to a good design if we don’t know what good design looks like](https://twitter.com/sandromancuso/status/588503877235781632). I was also saying that we probably should teach design before TDD (or at least, at the same time). This tweet led to a discussions with [J.B. Rainsberger](https://twitter.com/jbrains), [Ron Jeffries](https://twitter.com/RonJeffries), and a few others. J.B. and I ended up having a live [discussion on Hangout on Air](https://www.youtube.com/watch?v=ty3p5VDcoOI) later on. 

If you look back to many of my talks, blogs, and even my book, you will find multiple occasions where I say that TDD is a design tool. So what changed? Why I don’t say the same thing anymore?

### Why did I change my mind?

After paying more attention to how I work and how many other developers work, I realised that not many people are driving good design through TDD. Although I love the RED-GREEN-REFACTORING rhythm, having a “refactoring” step is not enough to call TDD a design tool. 

TDD doesn’t prescribe how you should design. What it does is to annoy you constantly, asking “Are you sure about this? Is it good enough? Can you make it better?” This annoyance (or constant reminder to look at your design and thing if it can be improved) is a great thing, but not enough. 

In my view, TDD is a software development *workflow* which provides me with many benefits, including a constant reminder to make my code better. What it means to make my code better, is not part of TDD. 

#### Aren’t you forgetting about the 4 Rules of Simple Design?

Ah, yes… But no. I’m not forgetting about them. [4 Rules of Simple Design are NOT part of TDD](https://twitter.com/sandromancuso/status/589098111559213056) and I’m purely discussing TDD here. 4 Rules of Simple Design is normally the design guidelines that many experienced TDD practitioners use (including myself, among other techniques) during the refactoring phase. 

4 Rules of Simple Design is one of the many design guidelines we have available. [SOLID](http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29) is another. [Domain-Driven Design](http://en.wikipedia.org/wiki/Domain-driven_design) is another. Many other design principles and patterns are also available as good guidelines. Those are the things we need to have in our mind during “refactoring” phase. Or, putting it in a different way, having a good understanding of the existing design guidelines is what will lead you to a better design. 

TDD is a workflow (not a design tool) where during the refactoring phase you apply your existing knowledge of software design combined with design techniques that may help you to get to a better design. 

### Not all TDDs are the same

There are two main styles of TDD with significant differences between them, mainly when it comes to design. 

#### Classicist 

The Classicist approach is the original approach to TDD created by Kent Beck. It’s also known as _Detroit School_ of TDD. 

**Main characteristics**

* Design happens during the refactoring phase. 
* Normally tests are state-based tests.
* During the refactoring phase, the unit under test may grow to multiple classes.
* Mocks are rarely used, unless when isolating external systems.
* No up-front design considerations are made. Design completely emerges from code. 
* It’s a great way to avoid over-engineering.
* Easier to understand and adopt due to state-based tests and no design up-front. 
* Often used in conjunction with the 4 Rules of Simple Design. 
* Good for exploration, when we know what the input and desired output are but we don’t really know how the implementation looks like. 
* Great for cases where we can’t rely on a domain expert or domain language (data transformation, algorithms, etc.)

**Problems**

* Exposing state for tests purpose only.
* Refactoring phase is normally bigger when compared to Outside-In approach (more on that below).
* Unit under test becomes bigger than a class when classes emerge during the refactoring phase. This is fine when we look at that test in isolation but as classes emerge, they create life of their own, being reused by other parts of the application. As these other classes evolve, they may break completely unrelated tests, since the tests use their real implementation instead of a mock. 
* Refactoring (design improvement) step is often skipped by inexperienced practitioners, leading to a cycle that looks more like RED-GREEN-RED-GREEN-…-RED-GREEN-MASSIVE REFACTORING. 
* Due to its exploratory nature, some classes under test are created according to the “I think I’ll need this class with this interface (public methods)”, making them not fit well when connected to the rest of the system.
* Can be slow and wasteful since quite often we already know that we cannot have so many responsibilities in the class under test. The classicist advice is to wait for the refactoring phase to fix the design, only relying on concrete evidence to extract other classes. Although this is good for novices, this is pure waste for more experienced developers. 

#### Outside-In 

Outside-In TDD, also known as _London School_ or _mockist_, is a TDD style developed and adopted by some of the first XP practitioners in London. It later inspired the creation of BDD. 

**Main characteristics**

* Different from the classicist, Outside-In TDD prescribes a direction in which we start test-driving our code: from outside (first class to receive an external request) to the inside (classes that will contain single pieces of behaviour that satisfy the feature being implemented). 
* We normally start with an acceptance test which verifies if the feature as a whole works. The acceptance test also serves as a guide for the implementation. 
* With a failing acceptance test informing why the feature is not yet complete (no data returned, no message sent to a queue, no data stored in a database, etc.), we start writing unit tests. The first class to be tested is the class handling an external request (a controller, queue listener, event handler, the entry point for a component, etc.)
* As we already know that we won’t build the entire application in a single class, we make some assumptions of which type of collaborators the class under test will need. We then write tests that verify the collaboration between the class under test and its collaborators.
* Collaborators are identified according to all the things the class under test needs to do when its public method is invoked. Collaborators names and methods should come from the domain language (nouns and verbs).
* Once a class is tested, we pick the first collaborator (which was created with no implementation) and test-drive its behaviour, following the same approach we used for the previous class. This is why we call outside-in: we start from classes that are closer to the input of the system (outside) and move towards the inside of our application as more collaborators are identified. 
* Design starts in the _red_ phase, while writing the tests. 
* Tests are about collaboration and behaviour, not state. 
* Design is refined during the _refactoring_ phase.
* Each collaborator and its public methods are always created to _serve_ an existing client class, making the code read very well.
* Refactoring phases are much smaller, when compared to the classicist approach. 
* Promotes a better encapsulation since no state is exposed for test purposes only, 
* More aligned to the _tell, don’t ask_ approach. 
* More aligned to the original ideas of Object Oriented Programming: tests are about objects sending messages to other objects instead of checking their state.
* Suitable for business applications, where names and verbs can be  extracted from user stories and acceptance criteria.

**Problems**

* Much harder for novices to adopt since a higher level of design skill is necessary. 
* Developers don’t get feedback from code in order to create collaborators. They need to _visualise_ collaborators while writing the test. 
* May lead to over-engineering due to premature type (collaborators) creation. 
* Not suitable for exploratory work or behaviour that is not specified in a user story (data transformation, algorithms, etc).
* Bad design skills may lead to an explosion of mocks. 
* Behavioural tests are harder to write than state tests.
* Knowledge of Domain Driven Design and other design techniques, including 4 Rules of Simple Design, are required while writing tests.  

### Which TDD style should we use?

Both. All. They are just tools and as such, they should be used according to your needs. Experienced TDD practitioners jump from one style to another without ever worrying which style they are using. 

### Macro and micro design

There are two types of design: macro and micro design. Micro design is what we do while test driving code, mainly using the classicist approach. Macro design goes beyond the feature we are implementing. It’s about how we model our domain at a much higher level, how we split our application, layers, services, etc. Macro design helps us with the overall organisation of the application and provides ways for teams and developers to work in parallel without stepping on each other toes. Macro design refers to how the business sees the application and techniques like Domain-Driven Design are commonly used. Macro design also helps with consistency throughout the application. TDD won’t help you with macro design. 

Macro design is normally taken into account when using Outside-In TDD, but Outside-In on its own is not enough to define the macro design of an application.

### Conclusion

Over the years I’ve seen many applications that have been test-driven and were still a pain to work with. OK, I admit that they were significantly better than the majority of the legacy applications which had no tests that I had to maintain before that.  

Any developer can make a mess regardless if they are writing tests or not. Developers can also test drive crap regardless of which TDD style they are using.  

TDD is **not** a design tool. It’s a software development _workflow_ that has prompts for code improvement in its lifecycle. In these prompts (writing tests and refactoring), developers need to know some design guidelines (4 Rules of Simple Design, Domain Driven Design, SOLID, Patterns, Law of Demeter, Tell, Don’t Ask, POLA/S, Design by Contract, Feature Envy, cohesion, coupling, Balanced Abstraction Principle, etc) in order to make their code better. Just saying _refactoring_ isn’t enough to call TDD a design tool. 

Many developers blame TDD and mocks for slowing them down. They end up giving up on TDD because they struggle to get the result they want. In my opinion, no developer really struggles to understand the RED-GREEN-REFACTOR lifecycle. What they struggle with is how to design software well. 

The great thing about TDD is that it is constantly asking us “Hey, can you make your code better? See how hard testing this class is becoming? OK, you made it work. Here’s your green bar. Now make it better.” Besides that, you are on your own.

TDD becomes much easier when we understand what good design looks like. Practicing and understanding the wealth of design guidelines available will make TDD much easier and useful. It will also reduce its learning curve and hopefully increase its adoption.  

Extremes are bad. We are going from BDUF (Big Design Up Front) to _no design at all_. Throwing away our design knowledge is a mistake. Sure, we should not go back to the dark ages and over-engineer everything but thinking that we should only focus on micro design is also a mistake. If you are working on your own, doing a few katas, or working on a small application, then yes, do whatever you like. But if you are part of bigger team developing something that is significantly bigger than a kata, you will be doing your team a favour if you paid more attention to macro design and how you structure your code.





