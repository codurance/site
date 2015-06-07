---
layout: post
name: conversations-about-conversations-at-socrates-uk-2015
title: 'Conversations About Conversations at SoCraTes UK 2015'
date: 2015-06-07 19:00:00 +01:00
author: Samir Talwar
image:
    src: /assets/img/custom/blog/2015-06-07-conversations-about-conversations-at-socrates-uk-2015/socrates-uk.png
---

OK, brain dump time.

## Using the Right Language

What do we prioritise? What do we sacrifice? Every single product ever released has had trade-offs baked in, from the set of features to the implementation of the networking code. There were many independent discussions on and around this, all asking different questions, but arriving at similar answers: there is no right answer. Instead of trying to find one, we should respect the fact that there will be trade-offs, and spend our energy gathering as much knowledge as we can in order to make the right ones.

Often, we can't gather this knowledge in a vacuum. We have to speak to the people who understand the customers, the cash flow, the product goals and the situation of the organisation. In order to do so, we have to meet them half-way. Saying things like, "This approach will incur technical debt," is meaningless; the phrase "technical debt" is itself an incredibly technical term, despite being an analogy. Instead, we should make an effort to speak some of the language of the people we're talking to, explaining things in ways that matter. Instead of talking about "technical debt", talk about cost, benefits and risk in the same way we often estimate work. And if we can't give numbers (and we usually can't), we can speak relative to other pieces of work. In the same way that story points eventually become meaningful to everyone involved, so too will relative estimates of future cost.

## Start Caring About Your Operations

[Robert Taylor](https://twitter.com/roberttaylor426) and I ran a three-hour mega-workshop on monitoring, continuous deployment, service discovery and (shimmed in at the last minute) zero-downtime deployment, using Docker. It went down exceptionally well, and I like to think that it was in no small part to the several hours that Rob and I (mostly Rob) spent preparing it, including three AWS EC2 instances with all the right tools set up. We used Docker, Jenkins, Nginx, Nagios and Consul, and while we relied on Docker quite a lot, the others were pretty much interchangeable with your tool of choice.

I want to give a special shout-out to [Amir Bazazi](https://twitter.com/amirbazazi), who stuck around and helped out everyone with their various Docker problems. We've now come to the conclusion that due to the paradigm shift required to really understand Docker, as well as all the things that could go wrong when running it through Boot2docker, we should run a separate Docker workshop, and then use this one to explicitly focus on continuous deployment.

Progress was great, with everyone pushing their micro-service ([a thirteen-line shell script](https://github.com/SamirTalwar/the-tiniest-service), which could be knocked down to three) to our web server as a Docker image. Unfortunately, this push completely knocked out the wireless router in the room and we all lost access to the Internet. The rest of the session became more of a demonstration, as Rob and I set up an HTTP monitor for [Ivan's random number service](https://github.com/ivanmoore/random_number), a deployment job that picked up new commits, and then hooked it up to Consul, a service registry, and then regenerated the Nginx configuration based upon the running services. Finally, though we couldn't get it working in the time available, we attempted some zero-downtime deployment and pontificated on smoke tests in production.

We got a lot of great feedback during and after the session, and I can't wait to do it again.

## Diversity is a Goal

The crowd at SoCraTes is traditionally quite diverse *for a tech conference*. I'd like to be able to eliminate those last four words. There were a number of dicussions on diversity and how to improve the situation. We have a long way to go, but it was great to hear even people who have railed against taking explicit action beforehand listening, learning and discussing the issue in the open.

## Self-Selection as a Feature

At SoCraTes, in the UK and elsewhere, the people are amazing. They're incredibly open-minded and up for discussing anything and everything in the hope that they'll learn a little bit more. I had a great chat with [Tom Westmacott](https://twitter.com/twestmacott) about why that is, and he pointed out that the open space format almost requires it: in order for someone to come, can't be looking for a specific thing, as they don't even know what the topics are. Rather, they must be people who are enthused (often enough to pay for it and take holiday) about *learning* itself.

It's with those people that I want to spend my time.
