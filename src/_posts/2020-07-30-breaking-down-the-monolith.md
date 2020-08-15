---
layout: post
asset-type: post
name: breaking-down-the-monolith
title: Signs Your Software is Rotting
date: 2020-07-30 00:00:00 +00:00
author: Matt Belcher
description: This article will explore some approaches for dealing with monolithic codebases, why you might want to break them down into smaller components, and some techniques for doing so.
abstract: This article will explore some approaches for dealing with monolithic codebases, why you might want to break them down into smaller components, and some techniques for doing so.
image:
   src: /assets/custom/img/blog/2020-06-01-signs-your-software-is-rotting/signs-your-software-is-rotting.jpg
tags:
    - software modernisation
    - software design
    - refactoring
    - domain driven design

---

In this article, we’ll explore some approaches for dealing with monolithic codebases, why we might want to break them down, and some techniques for doing so.

# Introduction #

First of all, let’s be clear in what we mean by “Monolith”. We are primarily talking about a software application that is deployed as a single artefact. The software application likely exposes several different business capabilities. For example, perhaps it has the ability to manage stock levels as well as taking payments for customer purchases and providing reporting functionality. There’s nothing inherently wrong with this so far.  And in fact, as we’ll discuss later in this article there is a lot to be said for this setup. However, “Monolith'' is almost seen as a dirty word in the software development industry. The reason for that is that the majority of them are poorly structured. As a result, they become hard to change and when changes are made, they span many different areas of the codebase. Over time, as more and more changes are added (even new capabilities), the complexity of the codebase increases and soon the Monolith becomes unwieldy and a real problem for the Organisation as it becomes harder to make changes to it. At this point, many teams would call for the need to do a complete rewrite and overhaul of the application. This article suggests that doesn’t have to be the only approach. 

# The Modular Monolith #

As I mentioned in the previous paragraph, many monolithic software applications are poorly structured. We ideally want our software applications to be highly cohesive and loosely coupled. Most monoliths, unfortunately, fail in both of these categories and it’s this that gives the Monolith a bad name. For example, we really want to want to keep those components that tend to change at the same time, together. But many teams, unfortunately, have fallen into the trap of jumbling up all sorts of different components together. For example database access and User Interface components.  Brian Foote and Joseph Yeder wrote about software systems designed in this way in their 1997 paper “Big Ball of Mud” where the title of the paper was used to describe monolithic systems which lacked any real structure.

>“A Big Ball Of Mud is haphazardly structured, sprawling, sloppy, duct-tape and bailing wire, spaghetti code jungle.” 

The below image illustrates this analogy. It is a dependency graph for one codebase. As you can see the dependencies between components and the level coupling has gone way beyond generally acceptable levels and this codebase would have been very difficult to change and maintain in that state.

![]({{site.baseurl}}/assets/custom/img/blog/2020-07-30-breaking-down-the-monolith/big_ball_of_mud.jpg)

Sadly, there are many monolithic codebases that fall into this category. However, it doesn’t have to be that way though and by applying good Domain-Driven-Design principles along with software craftsmanship practices we can achieve a well structured, or as I like to call it a “Modular Monolith”. For me, this is the first step in thinking about breaking down any monolithic codebase, even if the longer term ambition is to move towards a Microservice architecture. Simon Brown has a great quote which I really like -

>“If you can't build a monolith, what makes you think microservices are the answer?”

What Simon is saying here is that microservices are not a silver bullet and if your monolithic codebase resembles the “Big Ball of Mud” then you need to address that first and bring some structure and domain modelling to it. Otherwise, you will find your microservices journey will be a painful one. 

The question of course then is - where do we start if we want to start restructuring our monolithic codebase? Michael Features discussed the concept of a “seam” in his book Working Effectively With Legacy Code. A Seam is effectively a portion of code that can be treated in isolation and as a result, can be worked on without impacting the rest of the codebase. Michael’s primary usage of “seams” in his book was to help in cleaning up a codebase. But they are also really good starting points for identifying Bounded Contexts. Bounded contexts are a key part of Domain-Driven Design. They represent cohesive and yet loosely coupled boundaries with an Organisation.  So our first step needs to be identifying those seams in our codebase

# From Monolith To MicroServices #

## Ensure The Foundations Are In Place ##

Having identified the various seams (or Bounded Contexts), introduced them to a codebase and then rearranged the code to fit nicely into them, we now have our “Modular Monolith”. At this point, you may start thinking about moving towards a microservices architecture. Before doing so, I would recommend giving some time for your new codebases structure to “bed-in”. You want to be confident that the Bounded Contexts you introduced into your codebase and organised around are in fact correct. One way of doing this, to review your team’s backlog and the Organisation’s feature roadmap. Are there any upcoming features that would challenge your current Bounded Context modelling? If so, you may want to hold off extracting microservices and spend some more time on those Bounded Contexts and codebase structuring.  

But why is this so important? The reason is these Bounded Contexts are going to be how you migrate away from monolith to microservice. Each Bounded Context in your current monolith should be able to stand alone by itself as a separate service. Re-organising across services is expensive and challenging. It’s far easier to do when everything is in the same codebase. 

Not only is it important to have the correct modelling of the Bounded Contexts in your monolith before considering extracting out microservices, but it’s also vital that your team is applying good technical practices around it. Your team should already be embracing a culture of automation. The process of deploying the monolith to production should be fully automated. This includes testing, packaging, versioning, deployment. All of these are key foundational practices that need to be in place for a microservice architecture to be successful. Along with those, there are the observability aspects too - log aggregation, monitoring, alerting for example. 


## Reasons for Extracting a Microservice ##

Once we have the foundations in place of technical practices and a “Modular Monolith”, we are ready to think about splitting the monolith codebases and extracting microservices. It’s import to note that extracting out services should be done incrementally, one at a time. This gives us the time and space to learn and adapt if necessary. It also, of course, lowers the degree of risk involved. To decide which Bounded Context should be extracted out into a microservice first, we should consider a number of different factors :

### Rate of Change ###

### Security Requirements ###

### Technology Choice ###

### Team Structure ###

# Summary #
