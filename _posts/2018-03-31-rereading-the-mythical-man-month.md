---
layout: post
asset-type: post
name: rereading-mmm 
title: Rereading The Mythical Man-Month
description: Discovering a new book after 20 years. Realizing that there were a lot of good thoughts in 70s.
date: 2018-03-31 18:00:00 +00:00
author: Raquel M Carmena
image:
   src: /assets/custom/img/blog/2018-03-31-rereading-the-mythical-man-month/book.png
tags:
- craft
- craftsmanship
- silver bullet
- information-hiding
- end-to-end skeleton
- communication
- people
- peopleware

---

One of my best childhood memories is listening to the stories that my maternal grandfather, a very curious man, told me. However, not only do we lose a lot of details over time, but also we age and the same story can provide us different information after years. Last summer I reread _Robinson Crusoe_ by _Daniel Defoe_ after more than 20 years and I discovered an absolutely different book. 

Now I've had the same experience with <a href="http://wiki.c2.com/?MythicalManMonth" target="_blank">The Mythical Man-Month</a> by <a href="http://wiki.c2.com/?FredBrooks" target="_blank">Fred Brooks</a>, the father of the IBM System/360. This book was published in **1975** and it was reissued on its 20th Anniversary with four new chapters. On the one hand, it contains problems which still happen nowadays and it's worthwhile reading, because:

> Those who cannot remember the past are condemned to repeat it. -- Jorge Santayana

On the other hand, it mentions concepts that I didn't realize for the first time I read it when I was studying in 1998. Here you'll find some of my notes about it.

# Software as a craft

The book starts talking about **the craft of system programming** and the joys and woes inherent in it. Among joys, we find: **always learning**. 

When explaining the problems with the size of programs: _That requires invention and craftsmanship. (...) So the first area of craftsmanship is in trading function for size. (...) The second area of craftsmanship is space-time trade-offs._

When talking about the need of paperwork in project management: _To the new manager, fresh from operating as a craftsman himself, these seem an unmitigated nuisance, (...)_.

Let's remember this book was written in **1975** and terms like _craftsmanship_ and _craftsman_ were used.

# Brooks's Law

Software projects suffered delays because of these reasons:

* **Optimism**

_'All will go well'_, _'This time it will surely run'_, _'I just found the last bug'_, those thoughts sound familiar, don't they? I love the following sentence, because it's related to evolutionary designs:  _The incompletenesses and inconsistencies of our ideas become clear only during implementation._ 

* **The Man Month**

This was the unit of effort used in estimating and scheduling. Men and months were interchanged, when confusing effort with progress. It's said that they can be only interchanged when a task can be partitioned among many workers with no communications among them and no sequential constraints.

* **Systems Test**

Testing phase was the most mis-scheduled part of programming, because it was at the end of the development process. It was thought the solution was to increase the system test time in the original schedule. 

* **Gutless Estimating**

When an omelette, promised in two minutes, has not set in two minutes, the customer has two choices: wait or eat it raw (or partially burned, when turning up the heat). Software managers might have the same courage and firmness as do chefs, avoiding false scheduling. _We need to develop and publicize productivity figures, bug-incidence figures, estimating rules, and so on. The whole profession can only profit from sharing such data._

* **Regenerative Schedule Disaster**

_What does one do when an essential software project is behind schedule? Add manpower, naturally._ The author shows several graphs which conclude in the **Brooks's Law**:

> Adding manpower to a late software project makes it later.

In **1991**, **Abdel-Hamid** and **Madnick** studied this law in their book _Software Project Dynamics: An Integrated Approach_ and they concluded:

> Adding more people to a late project always makes it more costly, but it does not _always_ cause it to be completed later. In particular, adding extra manpower early in the schedule is a much safer maneuver than adding it later, since the new people always have an immediate negative effect, which takes weeks to compensate.

Another study by **Stutzke** added a comment about the new people: 

> (They) must be team players willing to pitch in and work within the process, and not attempt to alter or improve the process itself!.

# The System Architect

It was thought that the system might be the product of one mind. It was important to keep a conceptual integrity and one System Architect might design it all, from the top down. _Ideas from implementers can break that integrity._ However, _the architect must always be prepared to show an implementation for any feature he describes, but he must not attempt to dictate the implementation._

# Sociological barriers

Managers considered that senior people were _too valuable_ to use for actual programming. On the other hand, management jobs carried higher prestige. To overcome this problem, Bell Labs abolished all job titles and there were only: _member of the technical staff_.

It was thought that managers needed to be sent to technical refresher courses, meanwhile senior technical people needed to be sent to management training. Only when talent permitted, senior people could manage groups (_emotionally ready_) and _delight in building programs with their own hands_ (_technically ready_).

# Fallacies about the Waterfall model

In the new chapters of the book (1995), fallacies about Waterfall model are included:

* Assuming a project goes through the process once, with an excellent architecture and a sound implementation design.
* Assuming mistakes only happen in the realization and they are repaired with testing.
* Assuming one builds a whole system at once, combining the pieces for an end-to-end system test after all of the implementation design.

The author regretted the waterfall-oriented projects after **most thoughtful practitioners had recognized its inadequacy and abandoned it**. However, it took too long before that experience spread.

# Monoliths

Nowadays, there is a trending goal replacing monoliths by microservices. However, in 1975, there were problems of space and costs and a more monolithic program was the solution, because it took less space.

# Testing the specification

In order to avoid bugs, the specification might be tested, **before any code exists**. In this way, developers wouldn't _invent their way through the gaps and obscurities_.

# Top-down design by refinement steps

In **1971**, **Niklaus Wirth** formalized a design procedure by a sequence of **refinement steps**:

- _One sketches a rough task definition and a rough solution method that achieves the principal result._
- _One examines the definition more closely to see how the result differs from what is wanted._
- _One takes the large steps of the solution and breaks them down into smaller steps._

_From this process one identifies modules of solution or of data whose further refinement can proceed independently of other work._

_The degree of this **modularity** determines the adaptability and changeability of the program._

# Communication in source code

It's said that _a computer program is a message from a man to a machine_. On the other hand, _it tells its story to the human user_, so documentation was important. In order to solve the problem with the maintenance of that documentation, they decided to write **self-documenting programs**:

* **Using the parts of the program** to carry as much of the documentation as possible to convey as much **meaning** as possible to the reader:
    * Labels
    * Declaration statements
    * Symbolic names
* Using space and format as much as possible to improve **readability** and show subordination and nesting
* Inserting comments, not too many

The drawback of such an approach to documentation was the increase in the size of the source code that might be stored.

# No Silver Bullet

Brooks wrote that there was no silver bullet:

> There is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade in productivity, in reliability, in simplicity.

Following Aristotle, he talked about two types of difficulties in software projects:

* **Essence**: inherent in the nature of the software.
    * Complexity with a large number of states
    * Conformity to other interfaces
    * Changeability for new cases
    * Invisibility, not inherently embedded in space and we need several graphs to represent the software
* **Accidents**: incidental complexities that are imposed by the ways that software is built in the world.
    * Physical limitations of size and speed
    * Low levels of abstraction in programming languages
    * Imperfect specification or interpretation of requirements
    * Imperfect and inefficient communication among developers
    * ...

Brooks considered technical developments as _potential silver bullets_: high-level languages advances, OOP, Artificial Intelligence, Expert Systems, _automatic_ programming, graphical programming, program verification (not _error-proof programs_, but _meeting specification_), environments, tools and workstations. On the other hand, he valued _buy vs. build_, requirements refinement and rapid prototyping, incremental development (growing, not building, software) and being great designers, because _software construction is a creative process_.

# End-to-end skeleton system

In **1971**, **Harlan Mills** _proposed that any software system should be grown by incremental development. That is, the system should first be made to run, even though it does nothing useful except call the proper set of dummy subprograms. Then, bit by bit it is fleshed out, with the subprograms in turn being developed into actions or calls to empty stubs in the level below._

_It lends itself to early prototypes._

_The morale effects are startling. Enthusiasm jumps when there is a running system, even a simple one._

_One always has, at every stage in the process, a working system._

# Building every night

Rebuilding the development system every night and running the test cases were really hard, devoting a lot of resources, but they realized that it was rewarding, not only for discovering and fixing trouble as soon as possible, but also for the team morale and emotional state.

# Information hiding

In **1971** and **1972**, <a href="http://wiki.c2.com/?DavidParnas">David Parnas</a> wrote several articles about **information-hiding** concept. 

In the Operating System/360 project, it was decided that all programmers should see all the material. That view contrasted with David Parnas's _teaching that modules of code should be encapsulated with well-defined interfaces_. Brooks recognized:

> Parnas was right, and I was wrong. I am now convinced that information hiding, today often embodied in object-oriented programming, is the only way of raising the level of software design.

Parnas is also the author of the concept of designing a software product as a _family_ of related products. 

# People

Brooks's experience with IBM Operating System/360 convinced him that:

> (...) the quality of the people on a project, and their organization and management, are much more important factors in success than are the tools they use or the technical approaches they take.

In **1987**, <a href="http://wiki.c2.com/?TomDeMarco" target="_blank">Tom DeMarco</a> and <a href="http://wiki.c2.com/?TimLister" target="_blank">Tim Lister</a> published <a href="http://wiki.c2.com/?PeopleWare" target="_blank">Peopleware: Productive Projects and Teams</a> where they provide data about their _Coding War Games_ and concluding things like:

> The manager's function is not to make people work, it is to make it possible for people to work.

It reminds me of a post I wrote about my own concept of software quality, <a href="/2017/07/09/P3-Quality/">P3 Quality</a>, in which **People** is the key factor.

# Start-up firms

In **1973**, **E. F. Schumacher** published <a href="https://www.goodreads.com/book/show/1117634.Small_Is_Beautiful" target="_blank">Small is Beautiful: Economics as if People Mattered</a> proposing a theory of organizing enterprises with _many semi-autonomous units_, called **quasi-firms**, with _a large amount of freedom, to give the greatest possible chance to creativity and entrepreneurship_.

Brooks includes several examples of good results putting such organizational ideas into practice and how **microcomputer revolution** created hundreds of small **start-up firms**, marked by **enthusiasm**, **freedom**, and **creativity**.

# Conway's Law

In **1968**, <a href="https://twitter.com/conways_law" target="_blank">Melvin E. Conway</a> published <a href="http://www.melconway.com/Home/pdf/committees.pdf" target="_blank">How do committees invent?</a> where he related the organization chart with the first software design:

> Organizations which design systems are constrained to produce systems which are copies of the communication structures of these organizations.

And _if the system design is to be free to change, the organization must be prepared to change._

A few days ago, I saw this tweet by <a href="https://practicingdeveloper.com/" target="_blank">Gregory Brown</a>:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/Protip?src=hash&amp;ref_src=twsrc%5Etfw">#Protip</a>: If you want to make an observation or share a theory about Conway&#39;s Law... Mel is still around and actively doing his research.<br><br>Tag <a href="https://twitter.com/conways_law?ref_src=twsrc%5Etfw">@conways_law</a> and there&#39;s a chance he&#39;ll look at your stuff and comment. 😀<br><br>Also follow him. He&#39;s an incredibly insightful thinker.</p>&mdash; Practicing Developer (@practicingdev) <a href="https://twitter.com/practicingdev/status/974704392640389121?ref_src=twsrc%5Etfw">March 16, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# Acknowledgments

Thanks to my friends <a href="https://twitter.com/marcvege" target="_blank">Marc Villagrasa</a> and <a href="https://twitter.com/MikeGonYe" target="_blank">Mike González</a>, good and kind people, because I reread this book because of them. I hope I have been able to make it more enjoyable.
