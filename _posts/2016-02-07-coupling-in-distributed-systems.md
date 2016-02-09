---
layout: post
name: Coupling-in-distributed-systems
title: 'Coupling in distributed systems'
date: 2016-02-07 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/coupling.png
tags:
- distributed systems
- microservices
- coupling

---

Coupling and cohesion are key quality indicators. We strive for systems highly cohesive and loosely coupled, but high doesn't mean pure. The same goes with functional programming, we aim for isolating and reducing side effects, but we need them unless we want a useless system. It's good to modularise our systems, so whenever those modules need to talk to each other they'll effectively couple themselves. Our work is to create cohesive modules and minimising coupling as much as possible.

Let's provide an example. Our system has the following structure:

1. Different deployables, aka, microservices architecture.
2. Intracommunication through [Kafka](http://kafka.apache.org/) (pub-sub messaging). No HTTP involved. 
3. 1 Producer to N Consumers scenarios.
4. Json for data serialization.

The messages that are published and consumed in this system have a schema and it's our choice making it implicit or explicit and validating that schema at compile or runtime execution. Before analysing the trade-offs of every approach let's say some words about compile vs runtime approaches.

## Proofing software correctness as soon as possible

I've been a user of statically typed languages most of my career so I'm really biased with this topic. I strongly believe in Lean concepts as the importance of minimising waste. At the same time I love the therapeutic ideas behind Agile, TDD or BDD about exposing the truth as soon as possible. Static types, and in the end the compiler, help me to achieve those goals.

I would prefer spending my time creating tests under the [motivations](https://twitter.com/sarahmei/status/685907333889810432) of providing living documentation, easing future refactors or helping me to drive the design, more than helping catching bugs that the type system should take care of. Writing a test that checks the behaviour of a method when receives null it's a waste of time if we can make it impossible to write a line of code that passes a null.

Compile world is not perfect though, as it's definitively slower on development and constrains developers (someone could say that less freedom might be a nice to have in this context)

## Runtime approaches

Now that I've been honest with you about my compile bias I can explain different approaches and trade-offs for the schema validation problem.

### Implicit schemas

First runtime approach is the loosest one: using implicit schemas and trusting in the good will of producers. As nobody is checking the validity of messages before being published into Kafka that means that consumers could blow up.

First corrective measure is assuring that only the processing of the poisoned message will blow and not the whole consumer. An example of that would be providing a resume supervision strategy on [Akka Streams](http://doc.akka.io/docs/akka-stream-and-http-experimental/2.0.2/scala.html) when the message doesn't hold the expected implicit schema.

Second corrective measure would be not simply swallowing those crashes but being able to communicate them to proper actors (being humans or software). Good practice is to provide dead letter queues for poisoned messages just in case we want to manipulate and retry the processing of those messages at that level.

Before getting into explicit schemas I would say that those measures are not usually enough but they are a good safety net, as shit happens, and we need to be prepared.

### Explicit schemas

If we want to avoid poisoned messages getting into our topics we could provide a middle-man service to intercept and validate explicit schemas. [Schema registry](http://docs.confluent.io/1.0/schema-registry/docs/index.html) is an example of that for Kafka, and its documentation is full of insights about how to implement that in a distributed, highly available and scalable way.

That's an integration service that could be a single point of failure but, at the same time, it could be valuable to have a centralised repo of schemas when we have a lot of consumers and the complexity of the system would be hard to grasp in de-centralised fashion. That service will be stateless so in order to avoid single point of failures we could make it redundant in a farm of services to allow high availability.

## Compile approaches

The last approach would be creating software that makes it impossible to create message that do not hold the expected schema. Assuming [Scala](http://www.scala-lang.org/), we could create a jar that contains [case classes](http://docs.scala-lang.org/tutorials/tour/case-classes.html) that are object materialisations of a schema.

What are the benefits of this approach?

1. Fail early. We don't have to wait until testing or production to verify that the messages published by some producer are correct.
2. Centralised knowledge.

What is the solvable problem?

- Cascade updates. If our microservices live in different repos, then we need to make sure that updates into that common binary are applied into producer and consumers. That's cumbersome and if it's not done could generate unexpected bugs as we introduced a false sense of security with that library. That could be solved using a [monorepo](http://danluu.com/monorepo/) 

What is the biggest problem?

- Breaking isolation of deployables. One of the points of microservices is being able to deploy its services independently. If you're forced to redeploy N consumer services every time you upgrade the consumer with a non-backward compatible change of the schema library then you're losing that perk. Being able to do small releases is a big enabler of Continuous Delivery, so it's a remarkable loss.

You could argue that only non-backward compatible changes forces a redeploy of consumers and that we should design our schemas in a way that predicts and minimises those kind of changes. 

## Generalising coupling problem

If we generalise the problem we'll see that there are two kinds of coupling: avoidable and mandatory.

Avoidable coupling comes when we strive for reducing duplication in our codebase. Let's say that we want to extract some requestId from the header of a HTTP request and put it into some [MDC](http://logback.qos.ch/manual/mdc.html) in order to be able to trace logs across different threads or services. That code will hardly vary from service to service so it's a good candidate to be extracted and therefore adding some coupling between services. Before of doing that it's good to think in the following:

1. Coupling is the enemy of microservices and its effects in the future are not easy visible. 
2. Following [Conway's law](https://www.wikiwand.com/en/Conway's_law), breaking isolation of your services breaks the isolation of your teams, so be sure that your organisation is able to cope with that level of communication and integration.
3. The key measure is the rate change. A library that is going to be constantly updated (as could be your schema library) will be more painful to manage as a common dependency than some fairly static library.

Mandatory coupling comes when some info needs to reside in a third entity as it doesn't make sense to be hold by one of the integration entities or it's not worthy to share and duplicate that info into every single entity.

## Conclusion

Even if I am a strong supporter of compiled languages, I think that sharing code through binaries in a distributed environment deserves a deep analysis of the structure and needs of your system. I hope that this post have provided some insights into this topic.

