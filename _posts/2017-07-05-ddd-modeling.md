---
layout: post
asset-type: post
name: DDD Modeling from Alberto Brandolini
title: 'DDD Modeling from Alberto Brandolini'
date: 2017-07-21 09:00:00 +00:00
author: Carlos Raffellini
image:
  src: /assets/img/custom/blog/2017-07-21-ddd-modeling.jpg
tags:
- DDD
- Event Storming
---


I had the pleasure of attending [Alberto Brandolini's Domain Driven Design Modeling workshop](https://skillsmatter.com/courses/562-alberto-brandolini-s-ddd-modelling-workshop) during the last week of June 2017. I was very excited to learn [Event Storming](http://eventstorming.com/) directly from the author and further having the chance to learn more about DDD.

# Learning experience

I went to a 3-day course with the intention to learn the most that I could in the available time. In addition to his fantastic knowledge, Alberto is very clear in explaining complex ideas, for example sketching complex business or technical ideas on a whiteboard with apparent ease.
One event storming exercise aimed to simulate the creation of a big picture assessment of a real business case. During the workshop, we had the opportunity to see many psychological keys that help the facilitator to make the big picture emerge in a room.


We also went through Domain Driven Design (DDD) by playing a game, which involved identifying different relationships within a context map we discovered by asking questions. We discussed which problems we often face when using ubiquitous language in a multi-language environment. During the course, we examined CQRS, Event Sourcing, event/apply patterns for aggregates in Event Sourcing and how microservices fit into DDD.



# The blocker scenario

One of my favorite discussions centred around a common pattern developers could find within a given context, and how DDD ideas can help to think about it.
In this scenario, we have a "big ball of mud" in which two bounded contexts collided. In one hand we have a "Draft" context, where the domain is the plan or negotiation process that the business wants to run. On the other hand, we have the "Execution" context which modelled the life cycle of an accepted and agreed plan. In other words, the "Draft" could be the negotiation of a cart in an e-commerce site and the "Execution" could be the life cycle of an accepted and paid cart.

The collision of the two bounded contexts was caused by a piece of code which tied them together. Identifying that piece of code and working on separating the contexts gave an instant payoff. We were working within the core domain and were aiming to reduce the its complexity, essentially reducing the cost of working within each of the contexts.


![first image](/assets/img/custom/blog/2017-07-05-ddd-modeling-post/big-ball-of-mud.JPG)

Prior to this, we had people from both sub-domains focusing on the same "big ball of mud". Splitting the bounded context separated the people that were interested in each context. Therefore, the people interested in the cart will point to the "Cart bounded context" and people interested in the order would point to the "Order bounded context".

![second image](/assets/img/custom/blog/2017-07-05-ddd-modeling-post/cart-order.JPG)

Both bounded contexts share plenty of vocabulary. Which leads to more complex design and composing names in order to make obvious that a name belongs to the cart or to the order.

An example of composite names:

- \# CartTotaAmount -> Draft
- \# OrderTotalAmount -> Execution
- \# CartCanBeShipped -> Draft
- \# OrderShipped -> Execution
- \# CartConfirmed -> Draft
- \# OrderConfirmed -> Execution


# Conclusion

Event Storming is a useful technique to understand the big picture of the business and spot the main blocker. The right people should be in the room when the session takes place. The role of the facilitator is crucial.


Domain Driven Design is awesome. Even if not following all the principles, using just a few DDD ideas can already bring great value to the team. It helps to understand your relationship with other teams as well as how to look at problems from a domain perspective.

