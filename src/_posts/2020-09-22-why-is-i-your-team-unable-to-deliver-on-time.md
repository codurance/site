---
layout: post
asset-type: post
name: why-is-i-your-team-unable-to-deliver-on-time
title: Why is your team unable to deliver on time
title-es: Por qué tu equipo no puede entregar a tiempo
date: 2020-09-22 08:00:00 +00:00
author: James Birnie
description: In this article we examine some of the reasons why a software delivery team or operation might be consistently missing its deadlines. We first examine what “on time” means before examining various common reasons why deliveries may be late. This article is firmly rooted in the problem space. 
description-es: Examinamos algunas de las razones por las que un equipo de entrega de software o una operación pueden no puede cumplir  sus plazos. ¿Qué significa "a tiempo"? ¿Por qué las entregas pueden retrasarse? Trataremos de profundizar en el problema. 

image:
    src: /assets/custom/img/blog/2020-09-22-why-is-i-your-team-unable-to-deliver-on-time/why_is_your_team_unable_to_deliver_on_time.jpg
  
tags:
  - specialist expertise
  - metrics
  - automation
  - Technical Debt
  - silos 
  
pinned_locations:
    - specialist-expertise

in_page_banner: none

hubspot-cta-id: e6f8da2e-a47b-4ab0-b734-4fea55873dba
hubspot-cta-id-es: 5faaed27-46bd-4b51-b1b6-0a8986263dfc
---

In this article we examine some of the reasons why a software delivery team or operation might be consistently missing its deadlines. We first examine what “on time” means before examining various common reasons why deliveries may be late. This article is firmly rooted in the problem space and does not seek to go into detail around the solutions that may be appropriate for late deliveries.

{% include compass_teaser_for_blog_posts.liquid %}

<br>
# The Problem Statement

“Software never gets delivered on time,” is a complaint that one hears often from business leaders, product owners and technology leaders. Often this refrain is accompanied by the plaintive cry that “we used to be much better than we are”. Often they have tried many things to make the situation better but to no avail. Sometimes it even feels like the harder they try to improve things, the more resources they put into making deliveries work, the more they get delayed. How does this happen and what can we think about doing to help the situation?

### Understanding “On Time”

Before discussing why the development teams are not delivering on time, it is important to discuss what “on time” means. 

It is possible that development teams are not being “slow” at all. It could be that unreasonable expectations are being imposed upon them. It could be, for example, that delivery dates for products are mandated by higher management before development teams are even involved. Any organisation should beware of imposing the [iron triangle](https://en.wikipedia.org/wiki/Project_management_triangle) on any development group as it will almost certainly lead to failure of a project or product.

It is tempting for a business to point to a development team and to blame it for late delivery. It is therefore hugely important that “on time” is understood, agreed and bought into by all of the interested parties. If a development team is being held accountable for a delivery date that it feels it did not agree to then it will almost certainly not be motivated to meet that date and may well fall back on a blame game because “we never agreed to this anyway!”

## Planning Tension

Developers and development teams feel more comfortable when asked to predict a timescale for something small, with few unknowns, whilst business focused people demand to know how long large things, with many risks and unknowns, will take to deliver. The desire for developers to predict only in the short term is understandable because they can’t possibly know what may discover, or what may not yet have happened, during a long delivery. Thus they only see it as feasible to predict with certainty in days or possibly weeks. The desire of the business to gain certainty over longer periods is understandable because it is only meaningful to investors to forecast revenues and expenditures over periods of months or years.

Resolving this tension is a subject in itself but in general, it should be understood that it isn’t possible, or valuable, for a development group to predict with certainty more than a few weeks into the future. Business must accept this constraint on the accuracy of medium and long term estimates and build that uncertainty in any of its own financial models. Your organisation must ensure that it has resolved this planning tension to the satisfaction of all stakeholders before examining possible causes of late delivery.

### Lack of People

It is possible that a development team could be failing to deliver on time because of a lack of people. Whilst we have known [since the 1970s](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) that simply adding extra people to a software development effort will not necessarily reduce the time to delivery it would be wrong to simply dismiss extra people as a possible solution to slow delivery. 

If your delivery team is responsible for different products or its work can be easily parallelised because it doesn’t have hard interdependencies, then it could be that the team simply has too much to do and could benefit from more people. It should be relatively simple to understand if this is the problem with any given team. Beware though that adding extra people into a team could cause problems with sharing context and it might be better to use your people to create two new teams rather than expand an existing team.

### Silos and Lack of Alignment

Many organisations naturally evolved around technical competences. This seems perfectly logical and works well up to a certain point. Consider the evolution of an organisation from startup through scale up to a mature organisation of, say, 300 individuals in several offices.

A startup will naturally begin life as a handful of people in a single cross functional team that is responsible for everything that the business does. In the early days there may be a CTO, likely to be a jack of all trades, a database administrator, the front end person, the Java developer, the infrastructure expert, the researcher, the UX expert, the salesperson, the CTO (who had the idea and is good at raising capital) and an ops expert. This group will most likely be co-located in a single, small, office and will know each other, and what each other is doing for the company, intimately.

If we fast forward a couple of years to the point where the solution is live and there are perhaps 15 technical staff. At some point the database admin became the database manager with some staff, the front end team formed around the original web expert, the back end team formed around the Java developer and the infrastructure (or platform) team grew up around the original infrastructure expert. This will continue to work perfectly as long as enough of the original people, who share the original vision, are still at the company and as long as everybody still knows the whole group.

At some point, however, Conway’s Law will start to play tricks on the organisation. The members of the different competences will no longer have knowledge of what other groups are doing or how they do these things. It will start to become difficult to return new value because the value streams have become fragmented between several teams, each with its own goals, priorities and incentives.

This company now has handovers. The result of handovers is queuing time. Queuing time is waste. It doesn’t matter how “busy” or “utilised” different parts of the value stream are if there are handovers and queues, that queuing time will almost certainly be the biggest factor in your overall delivery time.

### Lack of Knowledge, Experience or Expertise

Norm Kerth’s Agile Prime Directive should be read at the beginning of every retrospective meeting. It tells us that:

> “Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand.”

This is an important message and it should always be considered that a team may simply be lacking in “skills and abilities”. Do not discount this as a possible cause of the inability to deliver on time.

## General Skills and Experience

Are the developers in your teams capable of delivering the outcomes that you are asking them to deliver? Do the teams have the necessary experience to understand how to own a delivery process? It is important to understand, articulate and align on the skills that are needed in every team and to have an open and honest conversation around whether those skills are present. If you find that your team does not contain the requisite skills or experience then that is the problem that should be tackled.

## Domain Knowledge

Do you have a very competent team that has insufficient knowledge of the domain in which it is being asked to work? It could also be possible that an individual in your team is holding all of the domain knowledge in a personal silo. In the former case, you need to examine what kind of product ownership or analysis capability you need to introduce and in the latter case, you will need to examine the mechanisms your teams use to share context internally. For example, are they pairing regularly on all aspects of the delivery, from story creation through development to deployment?

### Control Mechanisms

Many organisations, particularly more mature organisations, have control mechanisms in place that were originally designed to support an outcome in an entirely sensible fashion given the prevailing norms of technology and business at the time they were conceived. The problem with many such processes is that they no longer make sense in the modern world of Agile delivery and in some cases they can actively impede value creation. Such processes are sometimes known as [Risk Management Theatre](https://continuousdelivery.com/2013/08/risk-management-theatre/).

A good example of this is the traditional change management board or team. In the days when software was delivered on long cycles, perhaps years or more, and changed rarely after initial delivery, it made sense to carefully analyse and record the impact of changes and the potential risks. In the modern Agile world of fast feedback and baking quality in such processes not only do not make sense but actively work against getting value to your customers as quickly as possible.

It is possible that your organisation has many such processes in place that no longer serve their original purpose and possibly even increase the risks that they were originally intended to mitigate. A good way to identify such processes is to ask people involved in process oriented work what outcome their process supports. If this is a hard question to answer, or perhaps that outcome is already better supported elsewhere in your delivery cycle, it could be that the process is not needed.

### Technical Debt

A big vector for slow delivery is the accumulation of [technical debt](https://martinfowler.com/bliki/TechnicalDebt.html). This is a concept that has been talked about since at least [1992 by Ward Cunningham](http://c2.com/doc/oopsla92.html). Every missing test, every piece of badly written code, every wrongly named method, every abuse of sensible design standards, has a cost. This cost is generally small in each case, and crucially not immediately payable, but you pay a heavy price in due course because the cost of each, like real monetary debt, compounds. Code quality should not be regarded as “gold plating”, rather it should be regarded as the oil that makes the engine run smoothly and ultimately, at all.

It is important to recognise when you are suffering from the effects of accumulated technical debt and if so to do something to tackle it. Tackling technical debt is a necessary maintenance task that will help developers to deliver software on time today and in future. There are [many tools available](http://thinkapps.com/blog/development/technical-debt-computation-top-tools/) that can be used to analyse codebases, identify code smells and bad design and suggest improvements. Such tools can give objective metrics that can be tracked to help you understand if technical debt is an issue, whether it is getting better or worse and whether you should take steps to tackle it.

Ideally, any given product managed by a good delivery team will not be allowed to build up high levels of technical debt. But if it does, you need a strategy to tackle it. Simple strategies such as the [boy scout rule](https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385) can help but ultimately prevention, as with many things in life, is better than cure.

### Automation

In a modern DevOps mindset, the development team takes responsibility for developing and running the application that they produce. Part of this end to end stream of value is deploying the application into some infrastructure. Slow delivery can often be caused by a lack of automation in the processes associated with deployment. In the worst cases, the act of deploying software involves an individual or group of people following a list of manual tasks to get the latest version of the software running in your production environment.

The ideal state for deploying software should be that you have automated pipelines that can deploy your software at the touch of a button. Furthermore, not only should the act of deployment be automated and therefore repeatable but the infrastructure on which it is deployed should be itself created or modified through scripts that are run through such automated pipelines. Your goal at every level should be to [automate all the things](https://www.youtube.com/watch?v=H334Ww9qiso) that can be automated. Any manual, repetitive task is not only a waste of time but carries a large risk of failure.

### Metrics and Throughput

Finally, and perhaps perversely, the methods by which your organisation measures the productivity of your development teams could cause them to deliver slower. There is a not unnatural desire within most management paradigms to understand how well teams and people are performing. [Eli Goldratt](https://en.wikipedia.org/wiki/Eliyahu_M._Goldratt) once said, “Tell me how you will measure me and I will tell you how I will behave”. It is entirely possible that the measurements you are taking are causing the very problem they should be helping to solve.

The fundamental way to measure a team that makes something is to understand [throughput](https://en.wikipedia.org/wiki/Throughput). Throughput is defined as the rate of return of value to the company or its customers. The problem is that it is virtually impossible to understand throughput in a software delivery organisation because it can be near impossible to assess the value of epics, features, stories or tasks. This leads managers to devise proxies for throughput such as story points, stories completed, lines of code or bugs fixed. The trouble with such proxies is that they are not leading indicators of the value returned and they can often be gamed easily.

It could be that you can create a [sensible, meaningful, game-proof metric](https://tdwi.org/Blogs/TDWI-Blog/2010/04/Effective-Metrics.aspx?m=1) that is a good proxy for throughput. It could even be that you can exactly calculate throughput but unfortunately such cases are rare. The best way of assessing value, and understanding whether teams or the whole organisation is performing well, is to measure the [four key metrics](https://stelligent.com/2018/12/21/measuring-devops-success-with-four-key-metrics/) and iterate on their improvement. These metrics - Lead Time, Deployment Frequency, Mean Time to Restore and Change Fail Rate - have been shown to be an indicator of high performance in delivery teams and organisations.

# Conclusion

There are many different possible reasons why teams could be perceived to be persistently unable to deliver on time, each with its own solution. Some rules to follow when diagnosing and attempting to fix slow delivery are:

- Understand what “on time” means. Make sure all interested parties are aligned on what “on time” means and are bought-in to any agreed dates.
- Understand if you have handovers and consider reorganising your business so that you have aligned cross functional teams capable of and empowered to deliver on the entirety of their customer outcomes.
- Don’t discount simple explanations.
    - Do we have enough people? 
    - Do we have the right skills?
- Care about technical debt and make sure that everybody knows that it is everybody’s problem when technical debt accumulates.
- Automate all the things.
- Only measure meaningful things, if it isn’t possible to measure throughput, consider tracking the four key metrics.

{% include compass_teaser_for_blog_posts.liquid %}
