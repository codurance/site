---
layout: post
asset-type: post
name: introducing-idd
title: Introducing Interaction-Driven Design
date: 2017-12-08 00:05:00 +00:00
author: Sandro Mancuso
description: Most software projects become very difficult to maintain and evolve after a period of time. Business is constantly complaining that ...
image:
   src: /assets/custom/img/blog/2017-12-08-introducting-idd/IDD.png
tags:
- craftsmanship
- software design
- IDD
- outside-in
---

_Before reading this post, I strongly recommend you read the two previous blog posts that serve as a foundation to this blog: [MVC, Delivery Mechanism and Domain Model][1] and [A Case for Outside-In Development][2]._ 

Most software projects become very difficult to maintain and evolve after a period of time. Business is constantly complaining that things take forever to be delivered. Developers complain the code is a mess and that they struggle to understand it. They say the code is poorly designed, not reflecting business concepts and respective flows. Most often than not, they wrote the code themselves.

Development teams don’t normally have an efficient way to slice business features and design software in a way they can deliver software incrementally while keeping the codebase aligned to the business flows and easy to maintain. 

A good software design process should help developers to clearly represent functional areas and business flows in their applications, aligning the changes in the business with their respective software components. A change in one area of the business should not cause multiple areas of the system to be changed. Identifying behaviour in the system should be straightforward and new developers should not have any problems to understand the code. 

## Interaction-Driven Design (IDD)

IDD is an iterative approach to software design and development based on [Outside-In Development][2] which focus on modelling behaviour according to the external usage of the system while maintaining an internal representation of cohesive business components.

IDD’s premise is that an application should only exist to satisfy the external needs of users or services — called _actors_. Each interaction between an actor and the application represents a need of the actor that has to be fulfilled by the application. The goal of IDD is to iteratively design and build applications that satisfy those needs. 

### IDD Influences

Building on top of a solid software design foundation, IDD was inspired by ideas from Responsibility Driven Design, Domain Driven Design, Behaviour Driven Development, and many other design principles, patterns, methodologies, and approaches already available. 

IDD puts together a cohesive set of new and existing methods to create a more prescriptive, but flexible approach to software design and development. 

### IDD Scope

IDD focus on the design and development of the functional aspects of a system, including architecture, macro and micro design.

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2017-12-08-introducting-idd/architecture_macro_micro_design.png" alt=“architecture, macro and micro design” class="img img-responsive" style="height: 60%; width: 60%;"/>
</center>
<br/>  

## IDD Approach Summary

IDD focus on the interactions between actors and the application, and between the different behaviours inside the application. Internal behaviour is discovered by decomposing behaviour triggered by actors. The process is repeated for each behaviour identified, breaking them down into smaller behaviours until there is no smaller behaviour. Course-grain behaviours become clients for fine-grain behaviours. Each behaviour is created to satisfy the needs of an existing behaviour or external need. This is what we call _outside-in design_. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2017-12-08-introducting-idd/business_flow.png" alt=“architecture, macro and micro design” class="img img-responsive" style="height: 70%; width: 70%;"/>
</center>
<br/>  


### Behaviour discovery

Behaviour discovery happens at five levels: cross-application feature, application, application feature, component, and unit. 

* **Cross-Application Feature:** Behaviour provided by a group of applications, normally in a distributed (micro)service architecture.  
* **Application:** Collection of behaviours provided by a single application to external actors. Each behaviour provided to the external world is considered a feature.
* **Application Feature:** Behaviour that satisfies a single need of an actor. Often a feature orchestrates the behaviour of different components (or functional areas).
* **Component:** Collection of behaviour related to a single functional area. 
* **Unit:** Non-decomposable behaviour, part of a component. 

**Functional Areas**

The term _functional area_ is used to define an area of our business domain. Examples of functional areas would be things like products, payments, customers, or orders. Depending on the size, complexity and architecture style used, functional areas may be mapped to independent applications (services) or business components inside a single application. 

#### Outside-in behaviour discovery

Regardless of the level, behaviour discovery is mostly done outside-in. The only difference is the level of abstraction used. 

For a Cross-Application Feature in a micro services environment, we would first choose a few major flows (user journeys, business flows) triggered by actors. For each one of the flows, we do the following:

1. Define the application (service) that will handle the actor’s request. This is the application that will “own” the cross-application feature. 
2. We then decompose the main behaviour into smaller behaviours, making sure they are all at a similar level of abstraction. 
3. Next step is to define which functional areas will own the smaller behaviours found. 
4. If a suitable functional area already exists, the behaviour is added to it. If not, we need to create one as there is probably a domain concept missing in our domain. 
5. Repeat the process for each smaller behaviour until we cannot decompose more, or we arrive to a level of abstraction that is not relevant. 

This process should be done collaboratively with the whole team, including product owners and testers. The best way to represent this discovery process is drawing sequence diagrams on a white board. The functional areas discovered after exploring a few major flows can be consolidated and will become natural candidates to become independent applications (or services). 

The same process described above can be used for behaviours at lower levels, like components. The difference is that instead of talking about high-level behaviour, functional areas, and services, we would be talking about low-level behaviour, classes and methods.

More details about behaviour discovery at different levels in separate posts. 

### IDD Iterative Development

IDD advises that a software team should work on a single theme of work (epic) at a time. This minimises dependencies between teams, keeps a team focused on delivery, and keep the design of different areas of the application stable and consistent. 

Each theme of work is broken down into features, which are prioritised on the team’s backlog. The team works in an iterative manner, one feature at a time. Each feature is divided in vertical slices, from the delivery mechanism all the way to persistence or integration with other applications. Simple features have a single slice where complex features might be divided in many slices. The team works on one slice at a time and only move to the next once the slice is deployed into production. 

Before committing to a feature, the team must understand how actors will be interacting the application in order to benefit from the feature. A horizontal exploration of the delivery mechanism must be done before dividing a feature in small vertical slices. Feature slicing should be done from the outside to the inside, in other words, from the delivery mechanism to the persistence or integration points. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2017-12-08-introducting-idd/feature_slicing.png" alt=“architecture, macro and micro design” class="img img-responsive" style="height: 60%; width: 60%;"/>
</center>
<br/>  

Different strategies for slicing features will be described in future posts. 

### IDD Development Process and Prioritisation

When building software using IDD, the first step is to identify the actors (users or other systems or services) that will benefit from the features of our application. Each feature should address the needs of one or more actors. 

Once we identify the actors we analyse the interactions the actor will have with the system. In this analysis we do not go deeper on the internal behaviour of the application. We keep it superficial, purely focusing on the conversation between the actor and the application. Each interaction between the actor and the application is a feature. We call this step _horizontal exploration_. 

With a list of features at hand, we prioritise them, and vertically slice the highest priority feature. 

Each slice is developed outside-in, staring from the delivery mechanism (user interface, inbound queue, API endpoint, controller, etc) and moving inside gradually until the whole slice is implemented.  

### IDD Design and Test direction

In IDD, we start designing and testing from the input (outside) to the output (inside), following the external needs of users or other systems. 

IDD aligns design and test-driven development (TDD) to the execution flow. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2017-12-08-introducting-idd/IDD.png" alt=“alignment of execution flow, testing and design” class="img img-responsive" style="height: 70%; width: 70%;"/>
</center>

## Summary 

IDD is an [outside-in software design methodology][2] that helps development teams to design and build software based on the interaction of actors with the application and the behaviours within the application. 

IDD promotes iterative development and tight collaboration between developers and business. Sustainable evolution of the software and continuous delivery are some of the main goals of IDD and both are achieved via a strong focus on the design of the application and splitting the work in small vertical slices. 

In future posts I’ll be describing in far more details all the elements within IDD including requirements gathering, architecture, testing, code organisation, requirements slicing, and much more. In the meantime, you can [watch a presentation][3] that focuses on the more technical side of IDD.

[1]: /2017/09/20/mvc-delievery-mechanism-dm/
[2]: /2017/10/23/outside-in-design/
[3]: https://www.ustream.tv/embed/recorded/61480606
