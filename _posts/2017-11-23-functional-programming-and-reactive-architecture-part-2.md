---
layout: post
name: 2017-11-23-functional-programming-and-reactive-architecture-part-2
asset-type: post
author: Alessandro Di Gioia
comments: true
date: 2017-11-23 22:00:00 +00:00
slug: functional-programming-reactive-architecture-part-2
title: Functional Programming and Reactive Architecture Part 2
image:
    src: /assets/img/custom/blog/2017-11-23-functional-programming-reactive-architecure/burano.jpg
tags:
- functional programming
- architecture
- reactive
---

## Reactive systems

As engineers we want to build systems that are valuable for the consumers; a reactive system strives to provide a correct answer in a timely manner to its users whether they are humans or other systems. For this reason a fundamental quality of such systems is responsiveness.

### Responsiveness

A responsive system establishes the upper bounds for acceptable latency. Latency is the time that passes between a request and the response. Predictable latency and correct answers provide confidence on the system, help error handling and enforce further system usage.
To design a responsive system we could work and three main aspects: resiliency, concurrency and elasticity.
 
### Resiliency

It is really frustrating when a system gets stuck in an inconsistent state caused by a failure; that system lacks a stable design with the direct consequence of not being responsive. We have to design a system that could keep working through failures adding redundancy,  isolating the components to avoid cascading effects and when everything else fails restarting part of it without affecting the whole. This would free the user of the components from the handling of failures.
To achieve this level of separation we could design concurrent systems.

### Concurrency

Reactive systems achieve concurrency and isolation through asynchronous message passing, this enforces decoupling and modularisation simplifying logging and monitoring.
Failures itself could be handled through delegation using messaging.
Message passing promotes a better and clearer separation of concerns where a message would specify *what* to do and a message handler would take care of *how* to do it. All of this properties enable elasticity using queues to mitigate spikes in system load.

### Elasticity

An elastic system provides a consistent latency dynamically allocating resources as the need arises and optimising their usage when the system faces less pressure. Queues and independent components enable horizontal scalability providing a more consistent and manageable latency reducing bottlenecks and allowing replication.


## Actor model

The actor model started as an attempt at defining an abstraction to describe efficiently and expressively the problem of *concurrently cooperative execution of desired actions* when it became evident that the future of computing would be distributed and parallel.
Actors are units of computations that communicate asynchronously through messages; their very nature is highly concurrent enabling parallel problem solving.

## The big picture

The reactive model requires good modularisation so that the actors responsible to handle their messages can execute their domain behaviour effectively and concurrently. This is easier to achieve when there is no shared mutable state between them. 
This is the reason why functional programming is a perfect fit; referential transparency and modularisation are encouraged from the very beginning and at every level. Using pure functions and immutable data structures that decouple side effects from pure logic enable scalability, concurrency and composability.

## Resources

- "Actors: a model of concurrent computation in distributed systems" by Gul Agha
- ["Why functional programming matters" by John Hughes](<https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf>)
- "Functional programming in Scala" by Paul Chiusano and Runar Bjarnason
- "Domain Driven Design" by Eric Evans
- "Implementing Domain Driven Design" by Vaughn Vernon
- "Domain Modeling Made Functional" by Scott Wlaschin 
["The reactive manifesto"](https://www.reactivemanifesto.org)
- "Reactive Messaging Patterns with the Actor Model" by Vaughn Vernon
- "Functional and reactive domain modeling" by Debasish Ghosh
