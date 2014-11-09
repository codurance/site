---
layout: post
name: too-many-cooks
title: Too Many Cooks
date: 2014-11-09 11:00:00 +00:00
author: Samir Talwar
canonical:
    name: my personal blog
    href: http://monospacedmonologues.com/post/102172024165/too-many-cooks
image:
    src: /assets/img/custom/blog/too-many-cooks.jpg
    attribution:
        text: by Adi Bolboaca
tags:
- mob-programming
- agile
- teams
---

Last week, [Sandro][Codurance Team] and I flew to Bucharest to meet [Alex][Alex Bolboaca] and [Adi Bolboaca][], [Aki Salmi][] and [Peter Kofler][]. We didn't know what to expect: the agenda was to try a "hardcore coderetreat", in which the constraints would be incredibly difficult, but when you have six headstrong, opinionated people in a room, you really have no idea what's going to happen.

[Codurance Team]: http://codurance.com/aboutus/ourteam/
[Adi Bolboaca]: http://adrianbolboaca.ro/
[Aki Salmi]: http://about.me/aksalmi
[Alex Bolboaca]: http://alexbolboaca.ro/
[Peter Kofler]: http://code-cop.org/

So it was surprising, but not, when we decided as a group to try and [mob][Mob Programming] on a real project. We started on a website for people to find pair programming partners (which we still plan to launch some time after the Global Day of Coderetreat), with one person driving and the rest <del>yelling at them</del> <ins>navigating</ins>.

We started off quite well, driving a simple set of static pages to get the flow hammered out, with lots of discussion about the product design, how it would work, what the first real feature would be and how we could launch a [minimum viable product][]. Being an agile team, we had 45-minute iterations, ten minute retrospectives and five-minute breaks, just like a code retreat. Three iterations in, we had lunch, and people were feeling good.

That feeling didn't last. By mid-afternoon, we were lagging, and people were drifting off. The experiment wasn't working as well as we hoped. In our fifth retrospective, we decided to get to a point where it would be sensible to split into pairs and play with the code, so we quickly knocked out the rest of the flow and broke apart to do the things we cared about doing.

[Mob Programming]: http://monospacedmonologues.com/post/91841399505/mob-programming-and-the-importance-of-fun-at-work
[minimum viable product]: http://en.wikipedia.org/wiki/Minimum_viable_product

<!-- more -->

I, personally, was a bit dejected when we split apart. I thought that six skilled people should be able to do anything together. Pairing with Alex cheered me up very quickly, as we worked towards an acceptance test that focused us on what *we* really cared about, while the others did different things. Aki and Peter worked on a new interface for the page handling, extending its capabilities while preserving the functionality at first. Sandro and Adi decided to show each other their styles of unit testing, as they're very different.

A few hours later, we had lots of cool changes to the product that we'll probably blend back together.

So what went wrong in the mobbing, and why did pairing work? As mob programming is really just pair programming taken to the next level, why didn't things happen?

## By failing to prepare, you are preparing to fail.

<p class="citation"><cite>Benjamin Franklin</cite></p>

This exercise gave me some more confirmation of a hypothesis I've been kicking around in my head for a while:

**The number of people on a team should be a function of its stability.**

We had six people on the team, but it was very unstable. I'll explain why.

### We had never worked with each other before.

We all knew each other, but only Sandro and I have worked with each other for more than a few hours. We have our own style, which is often quite loud and heated. We argue *a lot*. It seems to work quite well for us, but it alienated the others, as they weren't expecting it.

### We had not agreed that we would work on this problem at all.

The problem was a matter of consent, not consensus. Not everyone was committed to delivering a website; some wanted to just play around, and we didn't so much decide to do one as assume that everyone was on the same page. While we did *state* that we would build a website, simply stating something is not enough. People have to be emotionally committed, not just verbally committed.

### We didn't know what we were building.

Alex had the idea for the website, which everyone *seemed to* like, and for the first two iterations, he served as the product owner. However, he didn't give us too much direction, which was probably a good move, as some people were there to build stuff, and some to experiment with code. Unfortunately, it meant that there was no clear focus on what we should be building.

### We didn't set iteration goals.

We had Scrum-style iterations, but no expectation of what we should be delivering. This, coupled with lots of new decisions during each retrospective, meant we didn't go in a single direction; rather, we flew all over the place, often dropping snippets of code with little to no relevance to the actual project.

## So, we propose a new experiment.

This was a great experiment, and one I actually really enjoyed, despite my negative tone throughout this post. We didn't get very far, but I derived a *lot* of value from it, and that's what I came for. It helped my refine my hypothesis, after all. It also helped me understand the value of planning meetings, product owners and defined backlogs in a way I hadn't before. I honestly think that with those things, this would have been a success from the start.

As a result of this experiment, Adi and I would like to run a new one. Two teams, working separately on the same thing with the intention of shipping it. One would start with a mob. The other would start with a pair, and increase by one every "iteration". We'd conduct retrospectives after each iteration, with the goal of finding out who made more progress *and* who felt better connected as a team. Perhaps we'll give it a shot at the next [SoCraTes DE][] or [SoCraTes UK][].

[SoCraTes DE]: http://www.socrates-conference.de/
[SoCraTes UK]: http://socratesuk.org/

*I'd be really interested if anyone else has seen some studies on this or read about a similar concept elsewhere—drop me a line in the comments below or by email or Twitter.*
