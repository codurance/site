---
layout: post
asset-type: post
name: Thoughts on Coupling in Software Design
title: Thoughts on Coupling in Software Design
date: 2016-07-25 10:00:00 +00:00
author: Ioan Fagarasan
image:
    src: /assets/img/custom/blog/2016-07-25-thoughts-on-coupling-in-software-design.png
alias: [/2016/07/25/thoughts-on-coupling-in-software-design]
tags:
- coupling
- software design
- craftsmanship
categories:
- software-creation
---

Coupling is a software metric that describes how closely connected two routines or modules are. It is a measure of quality. The concept was introduced by Larry Constantine in the 1960s and was formulized in a 1974 article for the IBM Systems Journal, Structured Design, and in the 1979 [book](http://www.win.tue.nl/~wstomv/quotes/structured-design.html) by the same name.

Having modules A and B, the more knowledge about B is required in order to understand A, the more closely connected is A to B. The fact that one module needs to be inspected in order to understand the operation of another is an indication of a degree of interconnection, even if the degree of interconnection is not known.

Coupling is a measure of the strength of that interconnection. Coupling is affected by the type of connections between modules, interface complexity, information flow between module connections, and binding time of module connections.
Coupling is usually contrasted with [cohesion](http://www.codurance.com/software-creation/2016/03/03/cohesion-cornerstone-software-design/), e.g., low coupling translates into high cohesion and vice-versa.


## Levels of Coupling

 
Coupling can be low / loose / weak or high / tight / strong.

Tight coupling translates into ripple effects when making changes, as well as code that is difficult to understand. It tends to propagate errors across modules, when one module behaves incorrectly. It tends to complicate debugging and fixing defects.

In loosely coupled systems, on the other hand, individual modules can be studied and altered without the need of taking into account a lot of information from other modules. Errors can be pointed out much more easily. Debugging takes less time, while fixing defects is usually simpler. The chances of error propagation across modules tend to be reduced.

The levels of coupling below are ordered from high to low:

  * **Content Coupling**: Content coupling, or pathological coupling, occurs when one module modifies or relies on the internal workings of another module. Changing the inner working will lead to the need of changing the dependent module. An example would be a search method that adds an object which is not found to the internal structure of the data structure used to hold information.
  * **Common Coupling**: Global coupling, or common coupling, occurs when two or more functions share global data. Any changes to them have a ripple effect.
  An example of global coupling would be global information status regarding an operation, with the multiple modules reading and writing to that location.
  * **Control Coupling**: Control coupling occurs when one module controls the flow of another by passing control information, e.g., a control flag, a comparison function passed to a sort algorithm.
  * **Stamp Coupling**: Stamp coupling, or data structure coupling, occurs when modules share a composite data structure and use only a part of it, possibly different parts. One example is of a print module that accepts an Entity, and retrieves its information to construct a message.
  * **Data Coupling**: Data coupling occurs when methods share data, regularly through parameters. Data coupling is better than stamp coupling, because the module takes exactly what it needs, without the need of it knowing the structure of a particular data structure.
 
* **Message Coupling**: Message coupling is the lowest form of coupling, realized with decentralization and message passing. Examples include Dependency Injection and Observables.



##Coupling Metrics##

 

###Class Level###
 
Class level coupling results from implementation dependencies in a system. In general, the more assumptions are made by one class about another, the tighter the coupling.

The strength of coupling is given by the stability of a class, i.e., the amount of changes in dependant classes that need be made if a class changes, and the scope of access, i.e., the scope in which a class is accessed, with the higher scope introducing tighter coupling.
At class level, the degree of coupling is measured as the ratio of number of messages passed to the number of messages received, i.e.,

> DC = MRC / MPC

where `MRC` is the received message coupling (the number of messages received by a class from other classes), and `MPC` is the passed message coupling (the number of messages sent by a class to other classes).

Class level is a particular case of the Module level metric.


###Module Level###
 
A more general metric, this metric tracks other modules, global data, and outside environment.  The formula computes a module indicator `mc`, where

> mc = k / M

with `k` a proportionality constant and `M` a value calculated by the following formula:

> M = di + (a * ci) + d0 + (b * c0) + gd + c * gc) + w + r

In the formula above:

- `a`, `b`, and `c` are defined **empirically**

- `w` – the number of modules called (fan out) – and `r` – the number of modules calling the module under consideration (fan-in) are **environmental coupling** parameters

- `gd` and `gc`, describing the number of global variables used as data and as control, are **global coupling** parameters

- `di`, `do`, `ci`, and `co`, describing the number of data and control input and output parameters, are **data and control flow parameters**

One important note to be made is that as the value of `mc` increases, the overall coupling decreases. In order to have the coupling move upward as the degree of coupling increases, a revised coupling metric, `C`, might be defined as

> C = 1 - mc


##Decoupling##
 
Introducing coupling increases the instability of a system. Decoupling is the systematic coupling reduction between modules with the explicit intent of making them more independent, i.e., minimizing the value of `C`, as defined in the previous section.

Content coupling can be eliminated by following encapsulation.

Common coupling can be resolved by introducing abstractions. Design patterns could prove useful towards achieving a good architecture.

External coupling can be resolved by eliminating the knowledge of formats from the domain, and operating on concepts.

Control coupling can be eliminated by using strategies or states.

Stamp coupling can be eliminated by passing actual data.

Data coupling can be eliminated by employing message passing.

[law-of-demeter]: https://en.wikipedia.org/wiki/Law_of_Demeter "Law of Demeter"
One very important principle to guide by in reducing coupling is the [Law of Demeter][law-of-demeter], presented below.
 

###Law of Demeter###
 
Also referred to as the principle of least knowledge, the [Law of Demeter][law-of-demeter] is a specific case of loose coupling. The principle states that a unit should only have knowledge of and talk to closely-related units, assuming as little as possible about the structures and properties of anything it interacts with, including its own subcomponents. For example, an object A could call functionality on object B, but should not reach through B to access an object C for its functionality. Instead, object B should facilitate access through its own interface, propagating the request to its subcomponents. Alternatively, A could have a direct reference to C.

A more formal definition states that a method M on an object O can invoke the methods of the following objects:

* O

* M’s parameters

* Any objects created / instantiated within M

* O’s direct subcomponents

* A global variable, accessible by O, in the scope of M
 
In particular, an object should not call a method on a returned object, i.e., there should be at most one dot in code, e.g., a.Method(), and not a.B.Method().

##Conclusions##
 
Coupling is unavoidable; otherwise each module would be its own program. However, achieving low coupling should be one of the primary objectives in system design, such that individual modules can be studied and altered without the need of taking into account a lot of information from other modules, errors can be pointed out much more easily, and debugging takes less time, while fixing defects is usually simpler.

Loose coupling leads to high cohesion, and together they lead to maintainable systems.
 
 
##References##

[Coupling (computer programming](https://en.wikipedia.org/wiki/Coupling_(computer_programming))

[Coupling and Cohesion](http://c2.com/cgi/wiki?CouplingAndCohesion)

[Reducing coupling](http://www.martinfowler.com/ieeeSoftware/coupling.pdf)

[Software Engineering: A Practitioner's Approach](http://www.vumultan.com/Books/CS605-Software%20Engineering%20Practitioner%E2%80%99s%20Approach%20%20by%20Roger%20S.%20Pressman%20.pdf)

[Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter)
