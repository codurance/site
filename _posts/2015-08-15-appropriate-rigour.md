---
layout: post
name: appropriate-rigour 
title: 'Appropriate Rigour'
date: 2015-08-15 21:00:00 +01:00
author: Mashooq Badar
image:
    src: /assets/custom/img/blog/cardboard-prototyping.jpg
    attribution:
        text: Hue by Basheer Tome
        href: http://basheertome.com/hue
---

There are many metaphors to software development that make sense within different contexts but not others. When we talk about craftsmanship as a metaphor we are referring to the attitudes that the craftsman embodies in terms of dedication to customer satisfaction, quality and endless pursuit of excellence. Metaphors are a wonderful aid to comprehension where we can lift desired qualities from a well understood concept and use that to explain a new one. However, we must be careful on how we apply the metaphors. 

In traditional craftsmanship; on one hand the dedication to customer satisfaction, quality and practice are aspects that we want to see in software development but also it is important to understand that in traditional craftsmanship the end result is often very well known and there is a need for a repeatable set of steps to produce the very same, or similar, result. In software we rarely have this much certainty. Sometimes the uncertainty is because the business is not well understood, even by the business, and other times the technologies we are going to use are not well understood and often it is an unholy mixture of both. One can argue that a traditional craftsman would employ a very different set of skills and steps if they are building something that they haven’t built before.

As software craftsmen we apply a lot of rigour when we build software. We make sure that we follow the TDD cycles continuously refactoring to keep to an optimal design. This amount of rigour is absolutely necessary when we are building the next feature in an existing system where the feature is well known as well as the general architecture and technologies. However if we are writing code to explore a certain area of the business, technology or architecture then we should apply only the appropriate amount of rigour to ensure that we are not unnecessarily slowed down. 

For example test driving small incremental changes to your design makes sense but if the change is much larger then we should consider creating prototypes. And yes! You can test drive your prototype - but only if it will not cause unnecessary effort. Remember there are other ways to verify your code. For example an overall system test because you are not yet sure how the internals will hang together or manually verify. It is a prototype after all. We can even release these prototypes as alpha versions of code if we need to elicit feedback from the business or insights on how it will be operated in production. So long as we are sure to mitigate any business risk. The important point is that we should accept that failure is inevitable when it comes to exploring new technologies, designs, or ill understood business - that our first attempt will most likely not be the correct one. So we should make failure a part of our development process. In short we should be throwing away our code more often. I recommend you read [this from Dan North](http://dannorth.net/the-art-of-misdirection/). 

This is all very good in theory but may be difficult to apply in practice. For example you may have a system in production with some very well established features. Then you come across a new feature that is not similar and you think that the existing architecture or design may not be suitable. Do you add this exploratory code into the rest of the system? Surely you are adding “broken windows” to an otherwise pristine neighbourhood! To me a departure from the norm is a checkpoint to ask, “Have I encountered the need for a brand new module or service?”. You can then isolate this part and clearly communicate that it is in exploratory stages. Doing that as a separate service maybe even more appropriate so that you are not constrained by the existing codebase and can start exploring with many more options to give you a better chance to arrive at a more optimal solution. You may end up with the knowledge that it’s not different to the existing solution after all and then build it into the original system with rigour.

Finally I will reiterate that I am not talking about applying no rigour during exploratory phases but rather understand what your objectives are and apply appropriate rigour according to those objectives. Exploration vs Production Features have different success criteria so understand that criteria and use appropriate practices.
