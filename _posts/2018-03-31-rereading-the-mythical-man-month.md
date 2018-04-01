---
layout: post
asset-type: post
name: rereading-mmm 
title: Rereading The Mythical Man-Month
description: Discovering a new book after 20 years
date: 2018-03-31 18:00:00 +00:00
author: Raquel M Carmena
image:
   src: /assets/custom/img/blog/2018-03-31-rereading-the-mythical-man-month/book.png
tags:
- book

---

One of my best childhood memories is listening to the stories that my maternal grandfather, a very curious man, told me. However, not only we lose a lot of details over time, but also we age and the same story can provide us different information after years. Last summer I reread _Robinson Crusoe_ by _Daniel Defoe_ after more than 20 years and I discovered an absolutely different book. 

Now I've had the same experience with <a href="http://wiki.c2.com/?MythicalManMonth" target="_blank">The Mythical Man-Month</a> by Frederick P. Brooks, Jr., the father of the IBM System/360. This book was published in 1975 and it was reissued in its 20th Anniversary with four new chapters. I read it for the first time when I was studying in 1998. It contains stories which still happen nowadays and it's worthwhile reading, because:

> Those who don't know history are doomed to repeat it.

On the other hand, it mentions concepts that I didn't realize 20 years ago.

Here you'll find some of my notes about it.

# Software as a craft

The book starts talking about **the craft of system programming** and the joys and woes inherent in it. Let's remember this book was written in 1975. Among joys, we find: **always learning**. 

When explaining the problems with the size of programs: _That requires invention and craftsmanship. (...) So the first area of craftsmanship is in trading function for size. (...) The second area of craftsmanship is space-time trade-offs._

When talking about the need of paperwork in project management: _To the new manager, fresh from operating as a craftsman himself, these seem an unmitigated nuisance, (...)_.

# Software projects delays

Software projects suffered delays because of these reasons:

* **Optimism**

_'All will go well'_, _'This time it will surely run'_, _'I just found the last bug'_, those thoughts sound familiar, don't they? I love the following sentence, because it's related to evolutionary designs:  _The incompletenesses and inconsistencies of our ideas become clear only during implementation._ 

* **The Man Month**

This was the unit of effort used in estimating and scheduling. Men and months were interchanged, when confusing effort with progress. They can be only interchanged when a task can be partitioned among many workers with no communications among them and no sequential constraints.

* **Systems Test**

Testing phase was the most mis-scheduled part of programming, because it was at the end of the development process. It was thought the solution was to increase the system test time in the original schedule. 

* **Gutless Estimating**

When an omelette, promised in two minutes, has not set in two minutes, the customer has two choices: wait or eat it raw (or partially burned, when turning up the heat). Software managers might have the same courage and firmness than chefs, avoiding false scheduling. _We need to develop and publicize productivity figures, bug-incidence figures, estimating rules, and so on. The whole profession can only profit from sharing such data._

* **Regenerative Schedule Disaster**

_What does one do when an essential software project is behind schedule? Add manpower, naturally._ The author shows several graphs which conclude in this Brooks's law:

> Adding manpower to a late software project makes it later

Abdel-Hamid and Madnick studied this law in their book _Software Project Dynamics: An Integrated Approach_ (1991) and they concluded:

> Adding more people to a late project always makes it more costly, but it does not _always_ cause it to be completed later. In particular, adding extra manpower early in the schedule is a much safer maneuver than adding it later, since the new people always have an immediate negative effect, which takes weeks to compensate.

Another study by Stutzke added a comment about the new people added: 

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

Nowadays, there is a trending goal replacing monoliths by microservices. However, there were problems of space and costs in 1975 and a more monolithic program was the solution, because it took less space.

# Conway's Law

It comes from <a href="http://www.melconway.com/Home/pdf/committees.pdf" target="_blank">How do committees invent?</a> by Melvin E. Conway (1968) and it relates the organization chart with the first software design:

> Organizations which design systems are constrained to produce systems which are copies of the communication structures of these organizations.

A few days ago, I saw this tweet by <a href="https://practicingdeveloper.com/" target="_blank">Gregory Brown</a>:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/Protip?src=hash&amp;ref_src=twsrc%5Etfw">#Protip</a>: If you want to make an observation or share a theory about Conway&#39;s Law... Mel is still around and actively doing his research.<br><br>Tag <a href="https://twitter.com/conways_law?ref_src=twsrc%5Etfw">@conways_law</a> and there&#39;s a chance he&#39;ll look at your stuff and comment. 😀<br><br>Also follow him. He&#39;s an incredibly insightful thinker.</p>&mdash; Practicing Developer (@practicingdev) <a href="https://twitter.com/practicingdev/status/974704392640389121?ref_src=twsrc%5Etfw">March 16, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# Acknowledgments

Thanks to my friends <a href="https://twitter.com/marcvege" target="_blank">Marc Villagrasa</a> and <a href="https://twitter.com/MikeGonYe" target="_blank">Mike González</a>, good and kind people, because I reread this book because of them. I hope I have been able to make it more enjoyable.
