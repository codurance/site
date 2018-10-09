---
layout: post
name: keeping-the-domain-in-core
title: Keeping the domain in the core
date: 2014-04-10 00:30:00.000000000 +00:00
author: Mashooq Badar
image:
    src: /assets/custom/img/blog/keeping_domain_in_core.png
tags:
- craftsmanship
- ddd
---
Inspired by Alistair Cockburn's excellent [article](http://alistair.cockburn.us/Hexagonal+architecture) on Hexagonal Architecture, on our current project we have kept the core domain of our application independent of the infrastructure by taking the simple decision to divide our code into two main sections (higher level packages): infrastructure and core.

The infrastructure section depends on the core but the core knows nothing about the infrastructure - the domain is uncontaminated by infrastructure concerns.

This makes testing the application from a business perspective simpler and more efficient because the tests do not need to worry about the infrastructure. We can also write more focused integration tests for the infrastructure components by mocking out the core dependencies. Furthermore, keeping the domain free from other supporting concerns empowers the team to continuously refine and refactor their model as their understanding of the domain improves and evolves.

Considering our example of consuming from a messaging service: we need to decide whether it is a corrupt message, and for non-corrupt messages a further check is required to see if it is a duplicate, before we can deem it valid. This can be nicely divided into infrastructure and core. The following UML diagram shows the dependencies.

![UML Diagram for example]({{site.baseurl}}/assets/custom/img/blog/keeping_domain_in_core.png)

The JMS Message Listener is only concerned with the delivery of the message. How that message is handled, once received, is independent of the infrastructure. The Received Message in this case is an interface implemented by JMS Received Message that lives in the infrastructure package. Here we use dependency inversion to ensure that the core does not depend on the infrastructure package.
