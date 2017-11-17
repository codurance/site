---
layout: post
asset-type: post
name: software-design-bias
title: Software Design Bias
date: 2017-11-17 22:00:00 +00:00
author: Sandro Mancuso
image:
   src: /assets/img/custom/blog/2017-11-17-software-design_bias.png
tags:
- craftsmanship
- software design
- IDD
- outside-in
---

This week we had a software design night at Codurance. We spent almost three hours talking about many interesting things but there were a few things that really stuck with me: 

	We all have software design bias. 

Project after project, we build our software design experience and develop a feeling about what works and what doesn’t. Similar to becoming fluent in a programming language, we can also become fluent in applying a software design technique to model any software system. This fluency makes us comfortable to get our job done, which in turn leads us to think that the techniques we apply and the results we achieve with them are synonymous of good design. When we get to this point, most of us not only start rejecting other design techniques but also consider them bad. 

Another thing we discussed was the mismatch between how requirements are specified and how we design software. When discussing business requirements, we normally describe things in a very sequential way. E.g. _When we add an item to the shopping cart, we need to confirm if the item is still in stock. If yes, we need to reserve the item. Once this is done, we need to check if any discount can be applied, taking into account the user's purchase history and any other items in the shopping cart. We should also calculate the basic cost for delivery according to the default address of the user._ You get the point… 

Business requirements are described as a set of instructions that should happen in a certain logical order. This is great as it helps us understand what the software needs to do. However, when we get to the point to design and implement the software, each one of us will pick a different design style, often going against the grain of the business specification. 

## Design style biases

**Procedural bias:** Some developers take the exact sequence of steps specified in the requirements and implement them as is, often following a more procedural style. They are purely focused on the business requirements and as long as the software does what the specification says, they are happy with their design.

**Data bias:** Some developers prefer to firstly analyse the data used by the different features of the system and how they relate. They then create a data model, which will be used to design their persistence layer and also their entities. With that in place, they will start adding the behaviour to the application, normally away from their data model. 

**Object bias:** Some developers prefer to first look for nouns in the requirements and make those nouns the centrepiece of their design. They then look for verbs and associate them to the nouns. Their goal is to have the important nouns of their business domain and their respective behaviour well represented in the code. 

**Functional bias:** Some developers prefer to use small steps to transform input data to output data. They believe that side effects and mutability should be controlled and isolated from the main logic of the system, which is mainly composed by side effect free and composable functions. 

**Service bias:** Some developers prefer to firstly analyse the behaviour of the business features and then the data needed for that behaviour. They believe that verbs are more important than the nouns as the verbs represent the real business value. This design approach leads to a service-centric domain. 

**Event bias:** Some developers prefer to see things as a series of events. They try to map not only the actions but also all events that happen before and after each significant action in the system. Events and actions become the centrepiece of their domain model. Decoupling is also a key aspect in their design. 

## Design direction biases

Another dimension to design bias is the direction used to design. To make the example simple, let’s assume a traditional 3-tier application web application with user interface (UI), domain model and persistence. 

**Database bias:** Some developers prefer to model the database first, then the domain model, and finally the user interface. These developers believe that the data and the way it is stored is the most important aspect of their design. This approach is also known as _inside-out_. 

**Domain bias:** Some developers prefer to design the domain model first, than the database, and finally the user interface. These developers believe that the database and the user interface are details and the domain model is the most important aspect of their application. 

**Usability bias:** Some developers prefer to design the UI first, then the domain model, and finally the database. These developers believe that the usability of their application is the most important aspect and that the backend should only exist to satisfy the needs of the front-end. 

**Outside-In bias:** Similar to the _usability bias_, some developers not only prefer to start from the UI (outside) but also drive the whole design and tests in a single direction, from the outside to the inside. They also focus on slicing features in small vertical slices in order to deploy often. You can read more on [A Case for Outside-In Development](https://codurance.com/2017/10/23/outside-in-design/).

## Non-functional bias

There is no doubt that any meaningful application will have a set of critical non-functional requirements that needs to be considered carefully and factored into its design. Although this is often true, some developers are very focused on maximising performance, throughput, scalability, security, maintainability, logging, monitoring, and many other aspects even when there is no clear need for them. Although there are many ways to design applications in a way where the design of the non-functional aspects do not conflict with the design of the functional requirements, quite often we see them interleaved. That is normally a result of the **non-functional design bias**.  

## Design techniques and their impact

At a higher level, when we discuss the behaviour that the application and its many different components provide, the design technique used should not matter at all. The application should behave according to the functional and non-functional requirements agreed. 

However, when we look inside the application and its components, the design technique applied can have a massive impact on their final design. A code base designed using a functional paradigm will look completely different from a code base designed using a data-driven approach. An object approach will look quite different from a service-oriented approach. Starting database first may be incompatible to starting from the user interface. 

What works really well for some developers is considered completely _wrong_ to other developers. 

## Conclusion

There are many other biases: splitting read and write model (CQRS), micro services, plugin architecture, hexagonal architecture, design patterns, actor model, map/reduce, etc. The point of this blog is not to catalogue all the different types of design styles and preferences but to highlight that discussing about design objectively is very difficult due to our own biases. 

Most developers can enthusiastically defend their own design preferences but very few have enough foundation to go deeper, properly comparing the pros and cons of different design approaches.

Mash used an analogy comparing software design techniques to a vocabulary. Some people have a small vocabulary while others have a very big vocabulary. Although people with a small vocabulary generally feel confident to express themselves, that doesn’t mean they can communicate well. 

It is very difficult, if not impossible, to avoid design bias. We all have our preferences, experiences and the confidence that we can design most types of applications using our favourite _general-purpose_ design technique. When it comes to software design, we are heavily biased towards the _vocabulary_ we are comfortable with. In order to design software well, we need to widen our vocabulary and incorporate as many design techniques as we can to our design toolkit. 

