---
layout: post
asset-type: post
name: Async-systems-with-sync-clients
title: 'Async systems with sync clients'
date: 2016-04-28 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/time.png
    attribution:
      text: Water time by barrasa8
      href: https://www.flickr.com/photos/barrasa8/2492558453
tags:
- distributed systems
- akka
- architecture
- sync
- async
- reactive

---

As the [Reactive Manifesto](http://www.reactivemanifesto.org/) says Reactive systems are:

* Responsive
* Resilient
* Elastic
* Message Driven

The last principle often goes together with non-blocking async protocols. This style of communication "allows recipients to only consume resources while staying active, leading to less system overhead". This fits perfectly with new demands of efficiency derived from the elastic model of cloud providers. However not every system is async and integrating an async system with a sync client could be tricky.


## Integration Strategies

We can fix the mismatch of communication styles through a couple of strategies.

### Polling

This involves work for both parties. First round trip of this protocol involves client sending some request to the server with an outcome of ACK/NACK. This is called fire and forget. Assuming HTTP, the server will return status code 202 (Accepted). The async process will eventually succeed or fail and that result will be exposed by the server via a different endpoint. The client will have to periodically poll that endpoint to figure out the status of the operation.

Polling is by nature inefficient but could be a good solution when the technological stack doesn't allow bidirectional protocols like [Web Sockets](https://www.wikiwand.com/en/WebSocket).

### Hiding asynchronicity

If we don't have control over those clients, we'll probably have to hide our async nature under some sync layer. That layer will implement a polling or pub/sub mechanism bounded by a timeout.

## Learning by example

In this series of posts we'll implement last strategy with a pub/sub mechanism. We'll add some essential complexities to our domain to make the exercise more juicy.

We'll be working on something similar to [Craiglist](https://craigslist.org), a website with classified advertisements. However our platform will have a social focus (as everything nowadays). That means that a user can post an item into some group and/or to her followers. People can report dubious items and we will take seriously those reports as they're threats to our reputation. So much so that the authorities have direct access to an API that can take down an item immediately.

Our system is formed by several microservices based on [Akka](http://akka.io/), using [Kafka](http://kafka.apache.org/) for inter-process communication. The police platform has only sync clients and they don't seem keen to implement a polling mechanism to verify that an item has been actually removed. We need to communicate with them synchronously and that's not negotiable. In the next posts we'll see the details of our solution, but as an advancement, let's see the high level architecture. Don't worry if you don't understand everything yet.

<img src="/assets/img/custom/blog/law_enforcement.png" alt="Law enforcement architecture" title="Law enforcement architecture" class="img img-center img-responsive style-screengrab">

[Part 1](http://codurance.com/2016/04/28/async-systems-with-sync-clients/) | [Part 2](http://codurance.com/2016/04/30/akka-basics/)

Thank you for your time, feel free to send your queries and comments to [felipefzdz](http://twitter.com/felipefzdz).
