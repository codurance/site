---
layout: post
name: cqrs-and-event-sourcing-for-dummies
title: CQRS and Event Sourcing for dummies
date: 2015-07-18 17:00:00 +00:00
author: Felipe Fernandez
image:
    src: /assets/img/custom/blog/events.jpg
    attribution:
        text: Christmas #42 - Event horizon CC-BY Kenny Dooley
        href: https://flic.kr/p/qbJxfD
tags:
- cqrs
- event sourcing
- architecture

---

CQRS (Command and query responsibility segregation) and event sourcing are concepts that are not new at all. Alongside NoSql, Functional Programming or Microservices those revival concepts are getting traction because they make sense in some of the modern software challenges. Assuming that you're building a product that has a complex domain with a significant amount of users I can predict that if you follow more traditional architectural styles you will face the following problems: how to scale and how to deal with complexity.

## Basic concepts around CQRS

CQRS and Event Sourcing address those concerns with an architectural style that, not only works, but makes sense with not so much cognitive effort. The last weeks some colleagues have had an study group on the following [Greg Young class](http://www.viddler.com/v/dc528842). As you can note, the video is really long, so I'm going to highlight some of the key concepts that the class brings, but I'd recommend invest the time on watching it.

CQRS is based in Bertrand Meyer's CQS (Command-query separation) concept. CQS states that every method should either be a command that performs an action or a query that retrieves a result. The concerns shouldn't be mixed. From a functional point of view that means that query methods shouldn't have any side effects, aka they're referentially transparent so we can use them in any place of our system without any context knowledge. That approach makes software that is modular and easy to reason about it.

CQRS brings that concept into an architectural level. We shouldn't be creating services with command and query concerns mixed. This approach is orthogonal with creating different services around bounded contexts. Those 'microservices' should be split in write and read components too. I'm going to provide an example to make it easy to understand.

## Challenges of non CQRS architectures

Let's imagine that we're modeling a really small slice of Twitter. A user can tweet, favourite a tweet and read a timeline. In a non-CQRS design we could model the systems around nouns and CRUD verbs. Those verbs/actions could be represented as REST interfaces and normalised tables in a relational database. This kind of structural model offers some problems:

> * Write and read concerns are mixed so the code is harder to reason. We use ORM's like Hibernate for read and write entities that mixed are really difficult to maintain and understand.

> * That structural model is complex to change. It's arrogant or naive to think that we did our model right at the first time, so we need an architecture that is easy to change.

> * Some of the queries to that system could need joining different tables and that doesn't scale out. Normalised models are suitable for optimising writing scenarios; you just need to write in a single table and don't worry about propagating changes between different denormalised views. They also save storage space for obvious reasons. Nowadays disk is cheap and to be honest most of the apps that I've worked in the past read more than write.

## Benefits of getting into an event world

Behavioural modeling is the CQRS alternative of this. Alberto Brandolini created a technique called Event Storming that allows you to model your system in a CQRS fashion. The idea is modeling your system as humans, aka business, see it: a flow of commands and events. A command in our example would be *Create a Tweet* and the event, always in past tense, would be *Created Tweet*. A command can generate different events and per event we can have different consumers of it. That means that we have flexibility to change our read side, like *Read a Timeline*, in the future.

<img class="img-responsive blog-post-image" src="/assets/img/custom/blog/cqrs.jpg" />

This is one proposal that separates write and read concerns and use event sourcing. It's important to note that depending on the constraints and challenges of our domain we might design this architecture slightly different. We could decide placing the event queue at the beginning of our system or we could decide move some time consuming tasks into the dummy reader as [real Twitter is doing for some special cases](http://www.infoq.com/presentations/Twitter-Timeline-Scalability). Anyway some of the key ideas stay:

> * We can scale out easily. Nowadays event queues are beasts. Kafka is used as event store in massive places like Linkedin.

> * We'll face eventual consistency. This arquitecture follows the fire and forget command style. When we send a command to the system, we don't wait synchronously for a response. The queue is inherently async, so the user will have to wait some time until the denormalised view gets updated. Greg Young argues that every system is basically eventual consistent, is just a matter of magnitudes. The suggested solutions are educating users and, why not, programmers. Programmers often think that their systems are more critical than what reality says. 

> * We can use different technologies for write and read storage. I've already suggested Kafka as Event Store (backed for instance by HDFS when you need to archive the events) and you can use Cassandra or Redis for storing the views. Remember that with this architecture you don't need to calculate the views on read time, so you don't need to join tables, being that a usual bottleneck.

> * You never delete or update events. We get rid of UD in CRUD, that means that we don't have to care about synchronising resources as our event store is immutable. If we want to unfavourite a tweet we send a command that will publish a *Unfavourited Tweet* in our event store. That will trigger a recalculation of our timeline view removing that favourite in the tweet.

The typical question when you think in this kind of systems is what happens when you have one million of events. Do you need to replay every single event every time that you get a new event in the system? The answer for that is snapshots. Periodically we'll store snapshots of our views and we'll persist them. Along with that snapshot we'll keep the pointer (offset in Kafka) of our topic so we know that that snapshot was taken at 345 pointer in the topic of our queue. That means that whenever we need to replay the events to reconstitute our views we can do it from 345 snapshot and not from the beginning of the time.

Why would we want to replay events? One good example is to help us creating irreproducible bugs. Often bugs are hidden in specific combinations of system state and is really hard to emulate that when the system is complex enough. If the user can send a report that includes the command and hence the event that caused the bug, we can replay the system to that point to see with our own eyes that damn bug.

## In conclusion

I really believe that this architectural style removes accidental complexity from systems that are, on the other hand, unable to scale as modern world requires. World changes and software has to change alongside, so despite of the hype, event driven architectures, microservices, NoSql and functional programming are here to stay. They provide different challenges about operations or testing, to name a few, so there are exciting years coming for programmers.