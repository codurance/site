---
layout: post
asset-type: post
name: a-case-for-outside-in-design
title: A case for Outside-In Development
date: 2017-10-08 05:00:00 +00:00
author: Sandro Mancuso
image:
   src: /assets/img/custom/blog/2017-10-08-outside-in-design/delivery-mechanism_vs_domain-model.png
tags:
- craftsmanship
- software design
- IDD
- outside-in
---

There is no reason to have a backend when there is no front-end. There is no reason to have an API when there is no one to consume it. There is no reason to have a class when there is no other class (or framework) to use it. There is no reason to have a method when there is no one calling it. 

> Code should only be written to satisfy an external need, being a user, an external system, or another piece of code. 

### Inside-Out Development

Many developers focus on implementing the Domain Model before defining how it will be used by the external world. The way users (via User Interface) or other systems (via APIs, Messages, etc) will interact with the system is treated as a lesser concern. Doing business analyses and focusing on modelling the domain first is what I have learned at university over two decades ago. That is also what I learned with my seniors during the first half of my career. Led by the belief that the front-end changed more often than the business rules, we opted for creating a fully _decoupled_ and _robust_ backend system first, leaving the UI for a later stage. This approach is what I call inside-out development. 

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-08-outside-in-design/inside-out.png" alt=“inside-out” class="img img-responsive" style="height: 70%; width: 70%;"/>
</center>
<br/>

#### Advantages

Let’s look at some of the most important advantages of inside-out development: 

**Risk mitigation**

Start coding from the domain model allows us to focus on the business rules straightaway and validate our assumptions. It also allow us to uncover problems that can significantly change our understanding of the scope and cost of the project. 

**Most valuable things first**

Developers should work on the most valuable tasks first and there is a common belief that the domain model is arguably the most valuable piece of software. A counter argument to that is that software has no business value if it is not used by anyone. From this perspective, the domain model only has value when the full feature is implemented and used in production.

**Volatile UI changes left to the end**

User Interface are notorious to be volatile while business rules tend to change far less once defined. Staring with the business rules allows backend developers to make some progress while front-end developers iterate on the UI design. 

#### Disadvantages

Let’s look at some of the disadvantages of this approach:

**Wasted effort**

Without the guidance of a well-defined and concrete need from the external world (being a user interface or API — delivery mechanism), we can easily build things that are not needed. When we finally define the delivery mechanism and try to plug it in, we quickly realise that the backend does not exactly satisfies the needs of the delivery mechanism. At this point we need to either write some plumbing code to connect both sides, change the backend or worse, compromise on the usability defined by the delivery mechanism so that we can reuse the code in the backend. 

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-08-outside-in-design/delivery-mechanism_vs_domain-model.png" alt=“delivery mechanism vs domain model” class="img img-responsive" style="height: 60%; width: 60%;"/>
</center>
<br/>

**Speculative development**

When focusing on the internals of a system before defining how it is going to be used, our imagination runs wild. We start thinking about all the different possibilities and things our code should do. We try to make our domain model as robust and generic as possible. As we keep speculating, solutions quickly become more complex. 

**Delayed feedback**

Users or external systems consuming our APIs don’t care about our backend. We can only get feedback from them if we can provide something for them to use or access. It doesn’t matter what we do on the backend. If the user journey (via the user interface) or APIs are not suitable, our backend has no value. If the front-end or APIs are done after the domain model (backend), we will only get feedback when the whole feature is done and that is too late.  

**Course-grained developement**

Working in small increments is difficult when focusing on the backend first. As the backend code is not being written to satisfy a specific need of the delivery mechanism, it is difficult to know when the feature is going to be done. Often we need to wait for the whole feature to be done in order to deploy. This approach makes it difficult to slice features in vertical slices and deliver it incrementally, one slice at a time. 

**Rushed delivery mechanism**

Another danger of focusing on the backend first is that when the backend is done, developers are generally out of time or not so keen to work on the front-end. They end up rushing the front-end implementation causing two main problems: a) a worse user experience; b) lower quality standards when comparing to the backend, leading to a messy and difficult-to-maintain delivery mechanism. 

**Impaired collaboration**

Mobile, front-end and backend teams should not work in parallel while the APIs are not defined. This is also true for cross-functional teams where mobile, front-end and backend developers are in the same team[^1]. Having backend developers defining APIs cause a lot of friction and re-work once mobile and front-end try to integrate their code. 

## Risk mitigation

**[PARAGRAPHS IN THIS WHOLE SECTION ARE NOT CONNECTING]**

One of the biggest advantages of Inside-Out Development is to tackle the tough problems first and hopefully uncover unknown problems — this is called risk mitigation. But is risk mitigation a thing we should do only in Inside-Out Development? Are all types of risk mitigation and exploratory work at the same level? My answers are No, and No. 

> Do not mix exploratory work with feature development. 

Quite often we are not sure how the solution should look like, which tools we should use, or how these tools work and we need to do some exploratory work[^2]. This exploratory work may fit in different categories:

* **Technical:** Related to frameworks, libraries, databases, or tools.
* **Architecture:** 
* **Macro-design:** Related to how we are going to organise the code at higher level: layers, hexagonal, etc.
* **Micro-design:** Related to domain models, class collaborations, type of algorithms, function compositions, etc. 

There is a difference between trying to uncover the unknowns as early as possible and actually deliver a feature. They should not be part of the same task. Whenever we are unsure about what needs to be done, how certain things work, or we are unsure about the technical challenges we will face in the near future, we should create a [spike][1] (or any other time-boxed investigation activity) to investigate the problem. Once we have more information we can then commit to build a feature.  

## User Interface changes and impacts

Another argument to start from the backend (inside-out) is that the User Interface (UI) is volatile and its implementation should be postponed to the last responsible moment. Well, it is often true that the User Interface (UI) changes more than the business rules do all the changes really impact the backend? Let’s have a look at most common types of change in the UI and their impact on the backend:

#### Aesthetic
Aesthetic changes are related to the look and feel of the UI. These changes can be done by web designers, front-end developers and user experience specialists without any change in the backend. Aesthetic changes are normally the most common type of change in the UI.

#### Behavioural
Behavioural changes are related to how the user interacts with the system. They impact the [user journey][1], that means, the steps the user need to perform to achieve a desired outcome. 

Behavioural changes can be subdivided in two main characteristics: **Navigational** and **Actionable**. 

**Navigational**
Navigational changes are related to how the user navigates across the application or within specific user journeys. In a web application, navigational changes in the UI may or may not trigger changes to the backend. It all depends on the type of front-end technologies being used and how the View and Controller layers (MVC) layers are structured. If the Controller layer lives in the browser (normally the case when using JavaScript frameworks like AngularJS and React in a single page application), there is no change in the backend. If we have a more traditional web application where the Controller lives in the backend, then the back end needs to change every time a link (or button) is added, removed, of changed. For more details, please have a look at my previous post on [MVC, Delivery Mechanism and Domain Model.][2].

**Actionable**
Actionable changes are related to the actions the user can perform in the system. They are the ones that provide the business value to the user and to the company. Examples would be buying products, reading reviews of restaurants, booking a ticket, just to mention a few. Most often, the changes in the UI are small — adding a button, changing URL parameters or HTTP method or return code. The biggest change are normally in the backend, often creating or changing an existing API and the flow triggered by it. 

#### Data
Data changes are related to the type of data displayed to the user or requested from the user. These changes normally involve a change in the data the existing APIs receive or return. In general, these changes in the backend are not so complicated as we only need to make _small_ changes to existing flows instead of creating a brand new flow. 

## How much do UI changes really impact the domain model?

As [discussed before][5], the way we decide to structure our delivery mechanism and domain model will make our backend more or less susceptible to UI changes. In a well structured web application, changes in the backend can be significantly reduced if the delivery mechanism is fully responsible for the navigation of the system and the domain model is only providing executing business flows and managing data, with no knowledge of how those business flows are presented to the user. 

## User interactions represent user needs

Every user interaction with the user interface represents a user need. It is the systems’s job to satisfy the user’s need every time the user request something. If the user only wants to navigate from one part of the website to another, than this logic belongs to the [delivery mechanism][1] and not the [domain model][2]. However, if the user wants store or retrieve information, than the logic belongs to the domain model. And its from the user’s perspective that we should start designing our domain model. 

## Agreeing on general principles 

In order to agree on technical practices and how we should design software, we should first agree in a few basic principles. For the rest of the post I’ll assume we all agree with the following:

* **Only build what needs to be built.**
* **Keep things as simple as possible but no simpler.** 
* **Get feedback as soon and as often as possible.**
* **Deliver value as soon and often as possible.**
* **Value is only delivered when system is in production.**
* **Always work in small valuable increments.**
* **Do appropriate due diligence before building anything.**

## Outside-In development

> The domain model should only exist to satisfy an external need  (being from user or another system) and it must be designed from this external perspective. 



 

 

## Horizontal, and then vertical

Instead we prefer of driving the development from small [vertical slices][4] of the system. 

## Outside-IN API Design [TODO - REFINE - MAYBE TOO EARLY FOR THIS]

APIs should always be designed to satisfy the needs of whoever needs to consume it. Front-end, mobile, and backend developers should collaborate in API design, but the design  do everything in their power to reduce the work done by the clients of their APIs. Having backend developers defining APIs without the input of mobile or front-end teams lead to a lot of effort from those teams to adapt their code to the APIs. 

APIs should be designed with an external workflow in mind, that means, the most common workflows that either users or external system are expected to perform. Even when we are providing a public API, we should have a [reference implementation][5] application and discuss the potential needs of the external world. We should reconsider our decision to expose an API if we can not define a good use case for them. 



[^1]: Cross-functional team does not mean cross-functional people. 
[^2]: For the sake of brevity I’m only referring to technical exploratory work, leaving out things like usability tests, business impact, etc.

[1]: spike
[1]: user journey
[2]: link to MVC, Delivery Mechanism and Domain Model.
[4]: vertical slices (walking skeleton)
[5]: link to MVC, Delivery Mechanism and Domain Model.
[6]: YAGNI
[7]: KISS

Are the ones below needed?

[1]: There is no reference to delivery mechanism and most people won’t understand this.
[2]: what is a domain model? Domain model is not only about data (entities). In fact, it is far more about behaviour than data. 
[3]: Reference for the DDD building blocks. 

