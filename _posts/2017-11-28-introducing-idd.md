---
layout: post
asset-type: post
name: introducing-idd
title: Introducing Interaction-Driven Design - Part I
date: 2017-11-28 05:00:00 +00:00
author: Sandro Mancuso
description: 
image:
   src: /assets/img/custom/blog/2017-11-28-introducting-idd/IDD.png
tags:
- craftsmanship
- software design
- IDD
- outside-in
---

_Before reading this post, I strongly recommend you read the two previous blog posts that serve as a foundation to this blog: [MVC, Delivery Mechanism and Domain Model][1] and [A Case for Outside-In Development][2]._ 

We find legacy code everywhere we go. A certain degree of frustration is also a very common feeling. Most software projects become very difficult to maintain and evolve after a period of time. Business is constantly complaining that things take forever to be delivered. Developers complain the code is a mess and that they struggle to understand it. They say the code is poorly designed, not reflecting business concepts and respective flows. Most often than not, they wrote the code themselves.

Development teams don’t normally have an efficient way to slice business features and design software in a way they can deliver software incrementally while keeping the codebase aligned to the business flows and still easy to maintain. 

A good software design process should help developers to clearly represent functional areas and business flows in their applications, aligning the changes in the business to their respective components in the system. A change in one are of the business should not cause multiple areas of the system to be changed. Identifying behaviour in the system should be straightforward and new developers should not have any problems to understand the code. 

## Interaction-Driven Design (IDD)

IDD is an approach to software design based on [Outside-In Development][2] which focus on modelling behaviour according to the external usage of the system while keeping an internal representation of cohesive business components. 

### IDD Influences

Building on top of solid software design foundation, IDD take ideas from Responsibility Driven Design, Domain Driven Design, and many other design principles, patterns, methodologies, and approaches already available. IDD puts together a cohesive set of new and existing methods to create a more prescriptive, but flexible approach to software development. 

### IDD Scope

IDD focus on the macro design of an application, that means, the high-level design of a single deployable unit.

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-10-23-outside-in-design/architecture_macro_micro_design.png" alt=“architecture, macro and micro design” class="img img-responsive" style="height: 60%; width: 60%;"/>
</center>
<br/>  

#### Delivery Mechanism vs Domain Model

IDD promotes a clear [separation between delivery mechanism and domain model][1]. The design of the delivery mechanism varies according to the different delivery mechanisms. 

### Basic Principles

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-11-28-introducting-idd/IDD.png" alt=“architecture, macro and micro design” class="img img-responsive" style="height: 60%; width: 60%;"/>
</center>
<br/> 


### IDD Domain Model Building blocks

> If business requirements are about behaviour, behaviour should be the centrepiece of a domain model, not data. 

IDD building blocks are divided in two groups: Macro and Micro building blocks. 

#### Macro Design Building Blocks

- Layer
- Functional Area
- Component 
- Action

#### Micro Design Building Blocks

- Domain Service
- Entity
- Value Object
- Repository
- Infrastructure Service



[1]: /2017/09/20/mvc-delievery-mechanism-dm/
[2]: /2017/10/23/outside-in-design/
