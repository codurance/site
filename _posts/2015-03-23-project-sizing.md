---
layout: post
name: project-sizing
title: Project Sizing
date: 2015-03-23 14:30:00 +00:00
author: Mashooq Badar
image:
    src: /assets/img/custom/blog/estimates.jpg
tags:
- estimatation 
- agile
- codurance way
- backlog
---
Sizing a project is one of the most important things we do and it is often the first thing we need precisely when we have the least amount of information. During a pre-sales meeting the client will usually ask for a "ballpark" figure so that they can understand if the project is feasible. We try to get as much information as possible before we provide a very high-level figure. The approach we take depends on whether the client already has a well defined backlog or if they are expecting us to create the backlog as part of the estimation. 

## Sizing an existing Product Backlog

Often we will have a set of requirements either in a big document or user-story format. It is important to understand each one of these requirements - especially those that are quite vague. These vague requirements often result in an explosion of features and will invalidate our estimates. The first thing we do is to break larger requirements/user-stories down into smaller chunks so that all are defined at similar level. We try to insure that the stories satisfy the [INVEST](http://guide.agilealliance.org/guide/invest.html) criteria. The next step is to further define the scope using assumptions and decisions logged against each story. This work to breakdown user-stories and define their scope is ideally done with the client. At the very least, we walkthrough the whole backlog with the client so that they fully understand the stories and the factors that may impact scope. 

Our estimates are based on well understood scope but we also recognise that the scope will change and evolve throughout the duration of the project. Clients generally have a budget agreed and our goal is to provide them with a viable product within that budget. We understand that the viable product may change during the development and the client may want to bring new stories in. We constantly refine our estimates to ensure that the client always understands that the the lowest priority stories may need to be dropped with the introduction of new stories. If the client wishes to keep the lowest priority stories as well then we renegotiate the budget/time for the project. We never negotiate on quality, our craftsmen hone their skills so that quality does not incur any additional cost.

During estimation we will employ other techniques to better understand the viable product. We create user journeys and mockups where appropriate to make our discussion with the client more productive. We also define the technology stack and high-level architecture to better understand the extent of the work. Again we do understand that these are initial designs are are subject to change.

Non-functional requirements are always included during sizing. These are factored in the same backlog and treated like other stories.

### Coming up with a Product Backlog

If the client does not have a well defined set of requirements then we come-up with a product backlog before we apply the above techniques to size the project. Our preferred technique is to use [Impact Mapping](http://www.impactmapping.org/). This allows us to drill down into the features from a clear goal that the client wants to achieve.
Documenting assumptions, decisions, risks, issues and dependencies (ADRID)

Documenting ADRID is extremely important during project sizing. At the very start of the project there are a lot of unknowns and it is impossible to define everything. We will log assumptions, decisions, risks, issues, and dependencies against each story. We try to confirm assumptions as much as possible but most will remain open at this stage. The reason these are logged against each story is that they help us provide better estimates. They also allow us to re-estimate the story if one or more of the ADRID no-longer holds true or new ones are identified. We have a regular meeting with the client throughout the duration of the project to see if there are any changes to ADRID and to discover more, if we discover any changes to these then parts or the whole of the backlog may require reestimating. Any changes to the estimates are made with agreement from the client.

### Three-point Estimation Technique

When estimating stories we use the [Three-point Estimation](http://en.wikipedia.org/wiki/Three-point_estimation) Technique. The technique requires us to provide best, worst and likely case scenario for each story. We provide estimates in concrete days and we always assume the story will be developed using pair programming. We use the ADRID logged against each story to ensure that the factors impacting the scope are well understood. The totals for the 3 types of estimates are gathered to work out the Standard Deviation ```((worst case - best case)/6)``` and the Weighted Average Estimate ```(best case + (4*likely case) + worst case)/6```. We can then work out the level of confidence as follows:

* 50% confidence on the Weighted Average
* 70% confidence on Weighted Average + Standard Deviation
* 95% confidence on Weighted Average + 2 * Standard Deviation
* 99.5% confidence on Weighted Average + 3 * Standard Deviation

Note: there is a statistical aspects to this type of estimation but it is important to understand that these are still estimates and hence have no guarantees.

### Factor in project setup

We factor in Project Setup regardless if the project is greenfield or if we are building on an existing codebase. Time is always required to get started. For greenfield projects this may take the form of an Iteration Zero where we setup things like Source Control, Continuous Integration, and Test Environments. If the team is brand new then we must also factor in time to define and evolve our development process and practices.

### Factor in planning meeting, client workshops, and other meetings

Finally we make sure that the time required for various meetings is factored in. For example planning meetings, retrospectives, demos etc. can take up to a day every two weeks.
