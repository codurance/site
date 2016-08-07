---
layout: post
asset-type: post
name: Communicating Design
title: Communicating Design
date: 2016-08-08 10:00:00 +00:00
author: Ioan Fagarasan
image:
    src: /assets/img/custom/blog/2016-08-08-communicating-design.png
alias: [/2016/08/08/communicating-design]
tags:
- software design
- craftsmanship
categories:
- software-creation
---


 
Software design is crucial. It is the foundation of an application. Much like a blueprint, it provides a common platform for parties from all backgrounds. It facilitates understanding, collaboration, and future development.

Design should not be only a development aspect. It should not live solely in developers’ minds, otherwise teams find it near to impossible to grow, as knowledge is difficult to acquire. Also, when employees leave the company loses a lot of value.

The application code should describe the design by translating the domain model effectively into clear abstractions. These should be well-coded, well-named, and well-defined. Yet that is not enough.

Design shouldn’t only live in code. While using this layer for expressing design might be enough for the development team, other people which might be interested in the design of the application are denied access. They either cannot physically retrieve the code, they don’t have a software development background, or they don’t have time to figure out the design on their own.

Sometimes high-level design needs to be discussed and perfected in a multi-team organization, before a significant amount of code is written. When this is the case it becomes clear design should not be contained only in code, even if the code expresses it.

For that purpose design modelling has become a separate process.



##Expressing System Design
 
Design is not just about classes and how they relate to each other. It is also about collaboration and behaviour. About use cases, states and activities.

The main forms of communicating design are presented below. [UML](https://en.wikipedia.org/wiki/Unified_Modeling_Language) is used as a reference due to its popularity, yet no one should feel constrained to its notations or terms, since the focus should be on effective communication.
 


###Structure

 
####Overview Diagrams
 
System structure overview is described using a set of diagrams that describe the deployment, packages, modules, and components.

One of the highest level methods to describe system structure is by describing deployment. UML describes [deployment diagrams](https://en.wikipedia.org/wiki/Deployment_diagram) to achieve that purpose, consisting of nodes, e.g., web server, application server, database server, clients.

The components deployed in a system have dependencies. These should be documented in design. UML prescribes [package diagrams](https://en.wikipedia.org/wiki/Package_diagram) for this purpose, which describe package merge and import relationships.
 


####Detailed Diagrams
 
At a lower level, the system’s structure is described by showcasing the classes and the relationships between them.
 

_The Class Diagram_
 
Class diagrams depict the system’s classes, including their attributes, operations (or methods), and the relationships between them.

The relationships can be of multiple types, e.g., dependency, association, composition, inheritance. They should be clearly expressed, such that a team of developers can design the systems either manually or using tools that generate the classes according to the class diagram.

In UML, class members can have the following types of visibility:

  * **Public**: +
  * **Private**:  -
  * **Protected**: #
  * **Derived**: /, the attribute is calculated from that of an another’s element
  * **Package**: ~

In UML, the following relationships are defined:

  * **Dependency**: an unidirectional relationship between two elements that occurs when changes to one element results into the need of changing the other element
  * **Association**: represents a family of links, that can be unidirectional or bidirectional; associations can be named;
  * **Aggregations**: a 'has a' association, that can only be bi-directional; within an aggregation relationship, the aggregated component can exist outside the container
  * **Composition**: a more powerful aggregation relationship, in which the aggregated component cannot 'live' outside the container, e.g., the engine of a car
  * **Generalization**: a class is a specialized form of another class
  * **Realization**: a class implements an interface
