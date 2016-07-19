---
layout: post
name: premature-microservices
title: 'Premature Microservices'
date: 2016-01-15 00:20:00 +00:00
author: Mashooq Badar
image:
    src: /assets/img/custom/blog/unbalanced-tree.jpg
alias: [/2016/01/15/premature-microservices/]
tags:
- microservices
- architecture
- craftsmanship
categories:
- expert-advice
---

Building your app from the very start as microservices is not a great idea! Their deployment is complex - regardless of how good your microservices infra is. They create boundaries in your application that resist change. Software applications are complex systems and complex systems are grown not designed. In order to grow an efficient system - we must allow it to grow in directions that it needs to. Boundaries designed at the start will stunt that growth at certain axis when direction of growth is at its most unpredictable. 

Also testing the system as a whole is very cumbersome. One can argue that the services should be decoupled enough that testing the application where all the services need to run is kept to a minimum. Sure, but in my experience even that minimal testing is a pain. Pain that should be lessened or altogether avoided for as long as possible.

So why do we do it? Why are microservices such a compelling idea? The premise of isolating change is extremely attractive. We have all been stung with “the monolith”. We look at the system and see the change hotspots and wonder, “if only I had those hotspots isolated so that I didn’t have to redeploy the whole thing when they change” or “if only I could re-engineer this part without having to worry about the rest” etc. Yes microservices based architecture may help you achieve that (Remember! I said they are a bad idea at the start of a project, not a bad idea altogether.) but by this time you understand the hotspots in the application and your understanding of the domain has matured. My problem is with creating strong boundaries between different aspects of our application. These resist change if the understanding changes and some of the boundaries are no longer valid. It discourages people to question the already drawn boundaries because they are not easy to change.

### An Idea 
So can we do microservices without having to draw strong boundaries, at least at the start? Like anything in life it is not so simple. From weak-to-strong -  we can use classes/modules, interfaces/protocols, package/namespaces, sub-projects, libraries and processes to draw these boundaries. The problem with the conventional microservices is that we go straight to the processes level to draw the boundary which is the strongest level at which you can separate the system. However, the weaker the boundary the bigger the chance that you’ll have to do extra work to strengthen that boundary because dependencies will have leaked through. But at the same time weaker boundaries are easier to redefine. 

What if we keep the boundaries in process but make them explicit? For example we segregate the system into components that are only allowed to speak to each other over a well defined interface just like our microservices but they’re all running in the same process. This could be serialised into something specific like JSON or a more abstract interchange format. Code could be divided into top level packages ensuring that there is no direct binary dependency between modules. So that modules are truly passing messages to each other - like good old fashioned Object Oriented Programming. We must ensure that there is no direct dependency between modules e.g. shared code, shared memory or shared database tables. Code can be reused using versioned libraries. This will allow us to keep explicit boundaries between the modules in our codebase that are strong enough that individual modules can be extracted into their own microservices when required but also weak enough that they can be easily changed when needed. Even this level of division my not be ideal at the start and we may start with a single component to the point where a division into at least two parts becomes apparent. 

### Conclusion
So the advice, if you haven’t guessed, is that we should start our system with minimal assumptions and restrictions and then sense the system to see where it needs to go. Microservices could be the vision of the destination but we shouldn’t try to second guess the destination or even preplan our journey. We should sense and adapt. Premature abstractions and boundaries will drown out this sense in certain areas resulting in a system that is not as fully evolved as it could’ve been.
