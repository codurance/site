---
layout: post
asset-type: post
name: DDD Modeling from Alberto Brandolini
title: 'DDD Modeling from Alberto Brandolini'
date: 2017-05-04 09:00:00 +00:00
author: Carlos Raffellini
image:
- src:
tags:
- DDD
- Event Storming
---


I am glad. I had the pleasure to attend [Alberto Brandolini's DDD Modeling workshop](https://skillsmatter.com/courses/562-alberto-brandolini-s-ddd-modelling-workshop) during the last week of June. I was very excited about learning [Event Storming](http://eventstorming.com/) from its author and having the chance to learn more about Domain Driven Desing.

# Learning experience

I went to a 3-days course willing to learn the most I can In these time. Apart from his questionless knowledge, Alberto is very clear explaining complex ideas, such as sketching business or technical ideas in the board.

We got across an event storming exercise designed by Alberto wich aim to simulate the creation of a big picture assessment of a real business case. During the workshop, we had the opportunity to see many psychological keys that help the facilitator to make the big picture emerge in a room.

We had the opportunity to go through DDDesign and play a game to identify different relationships within a context map we were discovered by asking questions. We also were discussing which problems we can face using ubiquitous language in a multi-language environment. During the course, we went through CQRS, Event Sourcing, event/apply patterns for aggregates in Event Sourcing, how microservices fits in DDDesign.


# The blocker scenario

One of my favorite discussions was when we went through a common pattern developers could find in the context and DDDesign ideas can help to think about it.

In this scenario, we have a "big ball of mud" in wich 2 bounded context collision. In one hand we have a "Draft" context, its domain is the plan or negotiation process that the business wants to run. On the other hand, we have the "Execution" context wich model the life cycle of an accepted and agreed plan. In everyday words, the "Draft" could be the negotiation of a cart in an e-commerce site and the "Execution" could be the life cycle of an accepted and paid cart.

In this scenario, we have a piece of code that sticks together both contexts. Identifying that piece of code and working on separate the contexts have an instant payoff. We are working in the core domain and reducing the complexity on it. So we are reducing the cost of working in each of the contexts.

![first image](/assets/img/custom/blog/2017-07-05-ddd-modeling-post/big-ball-of-mud.JPG)

Also, before we had people from both subdomain focusing on the same "big ball of mud". Splitting the bounded context separate the people interested in each context. So, people interested in the cart will point to the "Cart bounded context" and people interested in the order will point to the "Order bounded context".

![second image](/assets/img/custom/blog/2017-07-05-ddd-modeling-post/cart-order.JPG)

Both bounded contexts share plenty of vocabulary in common. Which leads to more complex design and composing names in order to make obvious that a name belongs to the cart or to the order.

An example of composite names:

- \# CartTotaAmount -> Draft
- \# OrderTotalAmount -> Execution
- \# CartCanBeShipped -> Draft
- \# OrderShipped -> Execution
- \# CartConfirmed -> Draft
- \# OrderConfirmed -> Execution


# Conclusion

Event Storming is a useful technique to understand the big picture of the business and spot the main blocker. The right people should be in the room when the Event Storming Session is in the room. The role of the facilitator is crucial.

Domain Driven Design is awesome. It is not necessary to work following DDDesign to see that the ideas have plenty of value even if the team or other teams are not following DDDesign. It helps to understand your relationship with other teams as well as how to look problems from a domain perspective.
