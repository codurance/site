---
layout: post
asset-type: post
name: signs-your-software-is-rotting
title: Signs Your Software is Rotting
date: 2020-06-01 00:00:00 +00:00
author: Matt Belcher
description: Description here
abstract: Abstract here.  
image:
   src: /assets/custom/img/blog/2020-06-01-signs-your-software-is-rotting/software-rotting.jpg
   attribution:
      text: Photo by Karl Pawlowicz on Unsplash
      href: https://unsplash.com/photos/QUHuwyNgSA0
tags:

---

When I first started out on my journey as a professional Software Craftsperson, one of the many books I read was a book titled “Growing Object Oriented Software Guided By Tests” (by Steve Freeman and Nat Pryce). It’s a really great book from which I learnt a lot. One of the things that really struck me from reading this book was the notion that software is something that should be grown and nurtured over time. Just like we regularly tend to our plants and flowers to ensure they grow in the best way possible, we should be continually nurturing our software. In this article, I would like to explore why I think this is important and outline some tell-tale signs that your software is in decline and some of the things that you can do to address it. 

# What is Software Rot? #

To start, let’s define what we mean by software rot. It may seem odd to refer to software as having the ability to rot. Intellectually of course we know it doesn't really. Instead what is referred to as software rot generally means software that is no longer fit for purpose. It’s a state of a software codebase becoming unwieldy due to unmanaged code complexity and improper design. Complexity creeps in as “easy” code changes are made instead of the more difficult design changes. Instead of teams identifying that their modelling is no longer fit for purpose and doesn’t support the demands being placed on it they attempt to shoe-horn in new changes to fit the existing models. As a result inappropriate coupling between components is introduced (as for example, components start to take on responsibilities they were not originally designed for ) and complexity increases. It’s a well understood fact that the more complex a software codebase is, the harder it becomes to change. 

# Indicators of Software Rot #

Now we have a common understanding of software rot, I’d like to outline some of the signs that might be indicative of your software starting to rot. It’s important to note that the following points are more indicators and by themselves will not shine light on the underlying reasons. The points below are more of a guide to tell you there is likely something unhealthy about your software. Often teams might experience one or even many of the issues below, but be unclear as to where to start looking to resolve the issue(s). The point I’d like to make is that if you see any of these issues in your teams, do look at your software codebase as there is a strong possibility that it needs some urgent attention to address it’s unhealthy state. 

## Fragility ##

Fragility refers to software that tends to break in many places whenever a change is made, often even in areas that are conceptually unrelated to change being made. As this increases, the software becomes very difficult to maintain because every new change introduces numerous new defects. In the best case, these defects are caught early by an automated testing suite. Worse they are found in production by end-users.  This fragility can then lead to a loss of credibility for the software and the team owning it. 

## Time to deliver features increases ##

A particularly strong indicator of software rot is when a team starts to see the time to deliver new features to a codebase increase. An ever increasing amount of time needed to add new features to a codebase is a sign of code rigidity. This effectively means code that is difficult to change, more often than not because code is tightly coupled. For example, a new change causes a cascade of subsequent changes in dependent modules with the codebase. This results in teams often being fearful to address non-critical problems because they do not know the full impact of making one change, or how long that change will take. 

## Struggling to keep pace with the demands of the business ##

Closely linked to the above point, when a team starts to struggle to keep pace with the demands of the business that is also an indication that the software codebase is in an unhealthy state. There could be a range of reasons for this of course perhaps the domain modelling in the codebase is no longer a good fit and requires a new model to be designed in order to facilitate the needs of the business requirements on the software. When a software team is unable to keep pace with the demands of the business 

## Change Failure Rate ##

It’s all well and good deploying your software to production frequently, but if these deployments result in breaking changes being introduced that impact your customer’s ability to use your product then that’s not good at all. We want to be deploying new changes into production regularly but not at the cost of quality. Change Failure Rate is a measure of how often a deployment to production results in a failure of some kind being introduced. A high or increasing change failure rate suggests that our software is not as healthy as it should be. 

## Declining Software Metrics ##

Software metrics are essentially measures of certain quality attributes of a software codebase. It’s important to note that I’d advise against looking for absolute numbers across any of the attributes. Instead, it’s far more useful to focus on the trend over time. A decline tells us that our software has become unhealthy in a certain area and we should take some action to resolve it, to avoid software rot setting in. 

There are a number of metrics that can be collected about a software codebase, the following list is therefore not exhaustive but a collection of those I have personally found useful in the teams I have worked with

### Cyclomatic Complexity ###

Often I hear teams using the number of lines of code in a given method / file as a measure of complexity. This alone isn’t a good enough metric. For example a small software program totalling 50 lines of code doesn’t sound overly complex. But if those 50 lines of code contained 25 lines of consecutive “if-then” code constructs then the code is actually extremely complex indeed! This is where Cyclomatic Complexity comes into play. It is a measure of the number of different paths or branches. Based on graph theory and ,developed by Thomas J. McCabe, it provides a quantitative measure of the number of linearly independent paths through the source code. 

### Coupling ###

There are two categories of software component coupling. Firstly, Afferent Coupling. This refers to the number of classes in other packages that depend upon classes within the package. It is an indicator of the package's responsibility. The other category is Efferent Coupling. This is the number of classes in other packages that the classes in the package depend upon. This is an indicator of the package's dependence on externalities.outgoing. The higher the levels of coupling across both categories, then the harder the software code is to change. We want to strive for loosely coupled components. 

### Test Coverage ###

Test Coverage is a measure of the amount of production code in a software codebase that has an automated test to exercise and assert against it’s behaviour. This metric is generally expressed as a percentage, i.e. a team may say “we have 70% test coverage”. As I outlined earlier in the article, I would always advise against looking for an absolute number with software metrics and this is especially true for test coverage. Instead favour looking at trends over time and relative test coverage measures between different parts of a codebase, particularly those that have changed recently. For example, if your team has made a high number of changes recently to an area of the codebase in order to support a new feature it would be alarming if the test coverage in that area had declined. 

## Mounting Technical Debt ##

Technical Debt is a term coined by Ward Cunningham…….

# Addressing Software Rot #

This article has attempted to make it clear that software rots over time if not constantly nurtured. But let’s explore how we can be proactive and prevent our software codebases from experiencing rot. I used the analogy of plants and flowers earlier in this article to illustrate that software should grow continuously over time. Effectively we want our software codebases to support evolution and incremental change. Driving for this goal will encourage us to consider things like software complexity, testability, appropriate coupling between components and so on. One of the key things teams need to embrace is continuous refactoring of their codebases. Whether it be removing unused ‘dead’ code, removing code duplication or simplifying design models all of these help to keep a codebase clean, minimise complexity and ultimately keep the cost of making changes low. 

## Value Testability ##

Testability in its most basic form is a measure of how easily it is to test a particular piece of software. It can also be expressed as the degree of likelihood that a test is likely to highlight a defect in the software. I have also heard people refer to testability as the likelihood that a test will be written! (The theory of course being that if the software is hard to test then there’s a higher chance that it won’t happen). Testing is vitally important, particularly automated testing. Another thing I learned from reading Growing Object Oriented Software Guided By Tests, was that automated testing was just not about ensuring that the software behaved as we expected it to. It was also about designing our software. This is why Test Driven Development (TDD) is such a vital part of software development. By valuing testability and treating it as a first-class-citizen we allow for our software design to emerge gradually in an incremental manner. Each increment builds upon the previous one and builds out an automated test suite. This test suite then acts as a safety net for when we need to make changes. Often testability is thought of as an afterthought. But I’d very much encourage you to treat it as a first class concern. 

### Strive for Simplicity ###

Something here...

### Support Incremental Change ###

Incremental change is the idea that changes that are required to be carried out on a software codebase are broken down into smaller chunks and applied in turn. Doing so means that we reduce the scope of each change and therefore the complexity and risk associated with it. We want our software codebases to be able to support this incremental change approach. 

### Establish Common Coding Guidelines  ###

Something here...

### Refactor, Small and Often  ###

Something here...

### Identify Code Hotspots  ###


Something here...

# Final Thoughts #

This article has attempted to raise awareness of software rot but putting together a definition of what it means, some indicators to watch out for and finally some things to arm yourself with in order to address software rot. If you’re reading this article about to embark on building a new piece of software, you might think that software rot isn’t something you need to consider. I’d caution against that. By embracing the theory of Evolutionary Architecture upfront, your team can be on the front-foot to guard against and minimise software rot setting in. The combination of appropriate coupling and supporting incremental change will ensure your codebase complexity is low. Putting in place automated detection mechanisms such as codebase metrics will allow you to quickly spot when your codebase is starting to drift of course and allow you to take appropriate action early to minimise the impact of any software rot.  It’s also important to keep in mind Lehman’s laws of software evolution, particularly the first two. Although authored back in 1974, they are still very relevant today: “a system must be continually adapted or it becomes progressively less satisfactory”, “as a system evolves, its complexity increases unless work is done to maintain or reduce it”.


