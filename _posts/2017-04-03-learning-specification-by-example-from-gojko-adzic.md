---
layout: post
asset-type: post
name: Learning Specification By Example from Gojko Adzic
title: 'Learning Specification By Example from Gojko Adzic'
date: 2017-04-03 09:00:00 +00:00
author: Giulia Mantuano
image:
- src: /assets/img/custom/blog/2017-04-03-learning-specification-by-example-from-gojko-adzic.jpg
tags:
- System Requirements
- Acceptance Test
- Living Documentation
- Specification By Example
- Skills Matter
- Apprenticeship

---
I recently had the pleasure to attend Gojko Adzic’s [“Specification by Example: From User Stories to Acceptance Test"](https://skillsmatter.com/courses/559-gojko-adzic-specification-by-example) training course … taught by Gojko himself! Having read his brilliant books: [“Bridging the Communication Gap”](https://gojko.net/books/bridging-the-communication-gap) and [“Specification by Example. How successful teams deliver the right Software”](https://gojko.net/books/specification-by-example/), I was very excited to get the chance to discuss my experiences of applying spec-by-example with the man himself. My goals for the course were as follows:

* Learn something that I couldn't find in Gojko's books.
* Refine my approach to Specification by Example

I'm glad to say that the course did not disappoint! Here is what I learned.

## 2-day hands-on experience
Before attending Gojko's course, I believed it was impossible to run a session without showing boring PowerPoint presentations, but he managed to avoid them! In fact, his course is a 2-day hands-on experience which is a very effective way to show what you can get by Specification By Example (SBE) and when to use it.

To get us across those essential concepts, Gojko has created two collaborative exercises, which aim to simulate what happens when there is a lack of domain knowledge and the team is under time pressure. These are two typical situations in larger organisations when the team is working on a system that is a piece of a larger puzzle that nobody fully understands.

## Learning something new
Thanks to the collaborative exercises, we went beyond the theory explained in the books, and we learnt how to write good specifications by experiencing how to run and facilitate a Specification By Example Workshop. We learnt how to discover the right questions to ask by collaboratively visualising team's and stakeholders' understanding through real examples. Here are few guidelines to follow:

* Given the acceptance criteria, ask people to write down the simplest possible examples of what we want to test. This is important as it helps to actually start the conversation.
* Let the example structure emerge so that it's possible to identify knowledge gaps and different levels of understanding and needs. In the example structure, you’ll discover preconditions and outcomes. Sound obvious, but this can help to avoid an incorrect transfer of domain knowledge.
* Identify modelling problems (how you name key concepts in your domain) and solve them by building up a common language (Ubiquitous Language). Again, it may seem like common sense but it’s a good way to reduce misunderstandings due to inconsistency of terminology.
* Define boundaries to consider edge cases from the beginning of a system implementation. This will help you reduce the risk of discovering bugs at a late stage of the development.

These concepts are an essential understanding of how to elicit requirements and write better specifications.


## The “WHAT” and “HOW”, and why they’re different
As Gojko writes in “Bridging the Communication Gap”:

> ## _In order to get the most out of acceptance tests, we need to distill what should be done from the discussion and not really focus on how it is going to work._

<img src="{{ site.baseurl }}/assets/img/custom/blog/2017-04-03-specification-by-example/specification-by-example.jpg" alt="Specification By Example" class="img-responsive"/>

When people mix up the “WHAT” and the "HOW" they create specifications that are difficult to read for business people. It is common to get specifications that include lines of code. That must be avoided because acceptance tests are a deliverable that needs to be written by business people together with developers and testers to ensure a common understanding of what needs to be built so that we can meet client's expectations.
"HOW" should also be kept separate from the "WHAT" as the Acceptance tests are *Living Documentation*: the examples are the only executable part of the test, and they should clearly show the relationship between the inputs and the outputs otherwise they can't be automated. If we include unnecessary details, the specification becomes impossible to maintain, change, and execute and will go out of date very quickly.


## Conclusion
In just 2 days, I learned more than I could imagine from Gojko's course.
In addition to the concepts outlined above, it was extremely useful to see how he facilitates an SBE Workshop. A good facilitator is essential to involve people in the discussion and end the session achieving the most important goal: build the right product and improve its quality, by encouraging the collaboration between the delivery team, business people and users. This ensures a shared understanding of the reason why we are building a product, which leads to writing better requirements from the start of the developing cycle.

P.S I'd like to thank my classmates, for their willingness to share experience and knowledge :-)
