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
runner. If running was not going to contribute to his goal, you bet he was not going to do it. The same goes for his
structure (or physical architecture). He was consuming enough calories to enable him to be strong, not to have washboard
abs.

### So how does this relate to architecture?
You might be wondering something like "the above is interesting, but how does it relate to software architecture?".
Well, for now the key takeaways should be that like Eddie, we must decide what we are optimising for when building
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
around what they need to optimise for. That's great, but let's look at a few examples to illustrate what is meant
by this.