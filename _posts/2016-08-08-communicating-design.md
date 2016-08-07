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

{% img /assets/img/custom/blog/2016-08-08-communicating-design/figure-1.png "" %}

  * **Dependency**: an unidirectional relationship between two elements that occurs when changes to one element results into the need of changing the other element
  * **Association**: represents a family of links, that can be unidirectional or bidirectional; associations can be named;
  * **Aggregations**: a 'has a' association, that can only be bi-directional; within an aggregation relationship, the aggregated component can exist outside the container
  * **Composition**: a more powerful aggregation relationship, in which the aggregated component cannot 'live' outside the container, e.g., the engine of a car
  * **Generalization**: a class is a specialized form of another class
  * **Realization**: a class implements an interface



_Class Structure Diagrams_
 
This type of diagrams displays the internal structure of a class. It can include how its collaborators interact with it and with each other.

In UML, the composite [structure diagram](https://en.wikipedia.org/wiki/Composite_structure_diagram) includes internal parts, ports, and connectors. Ports facilitate communication within the class’ parts and with the outside world. Connectors lie between parts and ports.

The composite structure diagram for a Fibonacci system is presented below:

{% img /assets/img/custom/blog/2016-08-08-communicating-design/figure-2.png "" %}



###Interactions
 
The interactions that take place within a system are as important as its structure, if not more. In reality the behaviour is what users experience, so having it described precisely and modelled early can save everyone involved in the project a lot of headache.
 

####Use Cases
 
Users interact with systems in order to satisfy an objective. The set of interactions required to fulfil an objective forms a [use case](https://en.wikipedia.org/wiki/Use_case).

Representing these interactions is very important for visualizing requirements in a compact form, as opposed to a set of user stories. UML defines the [use-case diagram](https://en.wikipedia.org/wiki/Use_Case_Diagram), which involves the different actors and the system.
 
####Interaction Overview
 
At a higher level, the system can be described in terms of interactions between its modules, usually to model control flow. To that extent, UML defines the [interaction overview diagram](https://en.wikipedia.org/wiki/Interaction_overview_diagram) and the [activity diagram](https://en.wikipedia.org/wiki/Activity_diagram).

Interaction overview diagrams can describe a control flow composed of multiple interactions, while activity diagrams go a level of detail lower, describing the actual conditions, logic, and actions.
 
####Detailed Interactions
 
The order of operations between collaborating classes is captured by a message sequence diagram; in UML, they are called sequence diagrams. These types of diagrams describe not only how the classes interact, but also include a temporal element, establishing the order – or sequence – of interactions (Figure 3).

The horizontal arrows display the messages exchanged between the two collaborators. The vertical lines, also called lifelines, capture all the communication that can occur between the two classes:
 
{% img /assets/img/custom/blog/2016-08-08-communicating-design/figure-3.png "" %}


###State
 
System state might be hard to visualize in an environment with complex constraints and conditions.

Most intuitively, the system can be represented as a state machine with as many nodes as there are states and the conditions switching between states attached to the arrows marking the transition. For increased readability, complex conditions should be abstracted and expressed in concise terms.

In UML, the state diagram represents the states using standardised notation. A filled circle represents the initial state. A hollow circle represents the final state. A rounded rectangle represents a given, named, state. Arrows denote transitions, which are associated to events. The event names are also provided:
 
{% img /assets/img/custom/blog/2016-08-08-communicating-design/figure-4.png "" %}


##Modeling Techniques
 
Design can be described using two basic methods, textual and graphical. In general, people tend to be more attracted to imagery, but textual models tend to be more descriptive. Hybrids exist, which allow both a high-level overview and the capability to visualise details.

Textual modeling is performed expressing requirements in a formalised language. These models tend to provide more details at the expense of overall overview. Creation speed is considered in some circles to be higher than with graphical methods, because in graphical methods the designers need to switch between mouse and keyboard. Formatting tends to be much faster and of higher quality. Also, the use of versioning comes much more natural, given the text-based format.

However, with textual modeling, understanding a module tends to be a more challenging task. More modern tools have provided means to display a tree-based structure or state machine to overcome this problem, but that is not always enough. One particular problem that cannot be tackled remains animation and simulations, which, if needed, should be considered as grounds for moving to a graphical method.

Using graphical modeling, users don’t have to learn anything but to use the modeling tool. Designing tends to feel less like programming, as users can relate more to the concepts they’re trying to model. When learning a system, it is much easier to go from high level to low level and back to high level.
 

##Conclusions
 
Communicating design is as important as designing. Keeping the design buried in developers’ minds and / or in code must be avoided. Instead it should be efficiently communicated, such that everyone involved in a project can get be informed.
 

##References
 
[Class diagram](https://en.wikipedia.org/wiki/Class_diagram#Instance-level_relationships)

[Composite structure diagram](https://en.wikipedia.org/wiki/Composite_structure_diagram)

[Sequence diagram](https://en.wikipedia.org/wiki/Sequence_diagram)

[State diagram(UML)](https://en.wikipedia.org/wiki/State_diagram_(UML)

[Modeling Language](https://en.wikipedia.org/wiki/Modeling_language#Textual_types)

[Textual vs Graphical Models](http://modeldrivensoftware.net/forum/topics/textual-v-graphical-models)

[Text-based Modeling](http://www.se-rwth.de/~rumpe/publications20042008/Textbased-Modeling.pdf)
