---
layout: post
asset-type: post
name: worlds-strongest-architecture
title: World's Strongest Architecture
date: 2019-08-21 00:00:00 +00:00
author: Sam Davies
description: Exploring the parallels between Eddie Hall deadlifting 500kg and software architecture
image:
   src: /assets/custom/img/blog/seven-testing-sins.jpg
tags:
- architecture
---

# World's Strongest Architecture
In July 2016 Eddie Hall achieved something no man before him had, managing to deadlift 500kg (or half a ton). This
article is for those who want to improve their decision making when it comes to software architecture.

## Optimising for the deadlift
The year before he lifted 500kg, he broke his own world record by lifting 465kg. He was no stranger to the deadlift,
and no stranger to breaking world records. This article could be dedicated exclusively to the feats of "The Beast",
however we want to focus on one aspect in particular, and this is optimisation.

You see, what Eddie achieved does not happen by magic. All of the training, and the eating was centred around becoming
one of the strongest men in history. In order to do this he had to decide what he wanted to optimise. Eddie was required
to be strong, for a very short amount of time. Therefore, it would make no sense for him to try and be the best 800m
runner. If running was not going to contribute to his goal, you can bet he was not going to do it. The same goes for his
structure (or physical architecture). He was consuming enough calories to enable him to be strong, not to have washboard
abs.

### So how does this relate to architecture?
You might be wondering something like "the above is interesting, but how does it relate to software architecture?".
Well, for now the key takeaway should be that like Eddie, we must decide what we are optimising for when building
software. An appreciation of this can help to avoid chasing "snake oil" and "silver bullets".

## Ineffective discussions around architecture
Many of you reading this will have been involved in (or aware of) discussions around which architecture to choose.
Often, someone might suggest using the thing that is new and shiny, and a game of buzzword bingo commences, where you
will hear phrases such as the below:

- "Microservices must be used"
- "Kubernetes will solve this problem"
- "We must be data-driven"
- "The capability we need is to deploy seven million times a day"
- "The solution needs to be scalable"

### How does one avoid such discussions?
In general, discussions usually become ineffective when the people in the room do not have sufficient information
to make sensible decisions. With respect to architecture, it is usually that people do not have enough context
around what they need to optimise for. That's a concise way of putting it, but let's look at a few examples to
further illustrate what is meant by this.

#### Example 1 - PoC (Proof of Concept)
Imagine you are part of a team to produce a proof of concept using 3D technology for presentations (via a headset). The
key here is to understand the context, which is you are creating this PoC to prove a concept. This means you need to
optimise everything you do to contribute to that goal. Below we will look at what bad might look like:

- Spending months debating architecture, with nothing to show
- Choosing a programming language no one on the team knows, because you can
- Dedicating too much time attempting to "polish" the code

As previously mentioned, once we understand what is to be achieved - validating a concept - then we can make sensible
decisions, removing waste and focus on what really matters. If we can run a presentation using 3D technology, then we 
have done enough to enable the experiment to commence (which can be done multiple ways). On the contrary if we spend
too much time discussing architecture, we are losing time that could be spent on producing something that can prove
the underlying hypothesis of the project. Furthermore, people often underestimate how much time they have after
delivering something tangible. Often there is a lull, where you can evaluate what you have produced. It is not
normally the case that the person asking for the software product will then have an entire backlog ready for you to
work on straight away. This is because they themselves have work to do, taking the product to show investors etc.

The previous paragraph talks about how we should not spend too much time discussing architecture, without anything
tangible to show. This however, does not mean we should not have architectural discussions, they just need to be
tailored to the context. If the PoC was for a platform to help people manage microservices, then the architecture
might be even more important and might warrant more focus. These conversations should still be centered around what is
to be optimised for.

Similarly, choosing a programming language no one on the team knows just because you can is probably not the best idea.
If it is a specialist language for developing 3D applications, which will in turn make the PoC easier to build and
faster to validate, then this is much better reasoning. Otherwise, stick to what you have the skills for as it will
mean you can just focus on the problem, and not get distracted with nuanced language features or syntax.

The last point has a hard truth to it. That is, if you have not yet validated the PoC, why spend more time polishing
the code? If no one has validated it is useful and it could have some traction with a particular market segment, why
waste effort? Furthermore, often PoCs are re-written post-validation as the focus is different. When producing a PoC
the focus is usually to prove a concept (all in the name really), whereas the stage after this might be slightly
different and this is where a bit more polish might be welcomed.

#### Example 2 - Website
In another example, imagine you are tasked with producing a website to capture interest in a restaurant that is due to
open soon. This is preferred to be done by people placing their email addresses, so they can be notified of updates and
given vouchers for when it opens. Let's take a look at what bad might look like.

- Provisioning a kubernetes cluster just for the website
- Creating a set of microservices to handle the subscription process

All the owners of the restaurant want is the ability to capture potential customers (using email addresses). Therefore,
they want something that can be created quickly to provide this capability. For example, a static website could be
created and hosted in something like Amazon S3, and add something like Mailchimp to take care of capturing interested
members of the public.

## Understanding What They Want
The previous examples might have made you think, they might have made you roll your eyes in disagreement. Crucially,
it must have made you think about past (or current) software endeavours and whether you understood what the customer
actually wanted. If it did not then I have work to do! Therefore, let's take a look at what "they" - the customer -
really wants.

What the customer wants: an ability for a member of the public to navigate to a web page and enter their email address,
which will be stored somewhere so those details can be used. Okay, let's add some things that they want to make it a
bit more concrete:

- restaurant brand on website
- address of restaurant clearly visible
- text stating they will receive discounts in return for their interest

The above will seem fairly straightforward to the restaurant owner, and in they don't actually want a lot! Let's
now document what we (as developers) might want when we see the above:

- front-end needs to be written in a front-end technology such as React or Vue
- it will require a service to be created in the back end, so we can subscribe users

Not everyone will think exactly the same as the above, but often it is the case. Often we don't make sound
architectural decisions because we are optimising for what we want and not what the customer wants. Using something
like React for the front end might seem like a sensible (and fashionable) decision, but our context does not 
necessarily require it, making it a premature optimisation which for what the customer wants right now. Therefore,
it is simply waste.

## Knowing What to Optimise For
To make sound architectural decisions we must first understand what the customer (of our software) wants. The examples
previously discussed do somewhat simplify the real world. For example, say someone in your company wants X, you will
make decisions based off of the information you have about X. But what if someone else in the company wanted something 
similar to X? Would this affect the decisions you make in terms of architecture? Quite possibly. Therefore, I will
describe certain factors that might shape what you optimise for.

### Topology of Teams
How teams are (or going to be) organised within a company can have an impact on architecture. For instance, if you
have a large amount of people who will be distributed, it might mean you opt for an architecture that gives them full
autonomy.

Closely related, if you find that teams are starting to step on each other's toes
(accessing each other's database tables etc), you might want to introduce an architecture that establishes clear
boundaries between teams (and their associated data). This could be a hard network boundary (via an API), or a softer
boundary via a service within the codebase (e.g. one package talking to a service in another package in Java).
