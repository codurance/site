---
layout: post
name: an-interface-between-the-natural-and-the-artificial
title: An Interface Between The Natural And The Artificial
date: 2017-08-11 08:00:00 +00:00
author: Luciano Palma
image:
    src: /assets/img/custom/blog/melbourne-sundial.jpg
    attribution:
      text: (Resized) Picture by Jeepika (CC BY-SA 3.0)
      href: https://en.wikipedia.org/wiki/File:Melbourne_sundial_at_Flagstaff_Gardens.JPG#/media/File:Melbourne_sundial_at_Flagstaff_Gardens.JPG
tags:
- refactoring
- artificial-systems
- interface
---

Everything built by humans is meant to work within a proper environment. Herbert A. Simon, in his book [The Sciences of the Artificial][4], defines things that are created or manipulated by humans as artificial systems. These systems are composed of an inner environment and they interact with the outer environment, that is, the external world, through an interface.

Examples of artificial systems may include cars, a cotton farm and a computer program. These systems, even biological ones, exist only to serve humans a pre-defined purpose. Dogs, for instance, are the result of thousands of years of taming and selective breeding, primarily intended for hunting and to protect our farms, but now also used as family pets. They only exist because we decided to, also most of the current breeds would not survive in the natural environment, where natural selection and survival of the fittest are the main criterias.

Cars were created primarily to be used by humans as a vehicle of transport on the ground. Thus, In order to fulfil its purpose, a car cannot be placed under water or suspended in the air. It was built with an interface which will only interact properly with an environment consisting of, for example, a paved road.


## The artificial environment in which we live
  
  
This brings us to the fact that the environment in which we live is also not natural. We control the trees that grow in our parks, the temperature in our homes and workplaces, as well as the animals that live around us. And if we achieved that much power to manipulate the natural environment in which we live, once we discovered how to create virtual (digital) environments, we acquired full control of every system that exists within them.

Computer programs are artificial systems built by humans to accomplish specific tasks which, normally, will either make our daily routines easier (e.g. generate reports, shop groceries online, make coffee, etc.) or enhance our capacities (e.g. remote working, weather forecasting or disease detection). These systems exist within environments which are themselves artificial systems, such as virtual machines, operating systems, or computer hardware. In this article, the term _computer system_ will be used to describe any piece of code which contains an inner environment and communicates to an outer environment through an interface, such as functions, softwares, operating systems, and so on.

The way computer systems interact with each other resembles the interactions which occur between natural systems, in such a way that a system (whether natural or artificial) collaborates with its immediate neighbours without knowing of any side effect this interaction may incur to other systems that are not directly involved in the collaboration. A honey bee is aware of the goal of pollination as much as YouTube is aware of the [millions of dollars it generates to some users][2], all they care about is accomplish their task by interacting with the outer environment. (Here, the word _aware_ is not meant to be used in the realm of AI or discuss the absence of _reasoning_ in some natural or artificial systems. Although the innocent bee will carry pollen on its body to the next flower, it is doing so because plants have evolved to take advantage of insects, establishing a collaboration, not because that is the _goal_ of the bee in that environment.)

The interface that allows an inner environment to communicate with the outer environment emerges as a result of the necessity of such collaboration, sometimes caused by a change in the outer environment, triggering successive evolutionary steps so that the current systems can adapt to the new environment. A change in the climate may cause plants to die and animals to migrate, while also attracting new species to the area. Thus, a new species of plant might open the possibility for new collaborations in the environment, bringing new species of insects, as well as forcing the evolution of the current population that is now striving to adapt to those changes.

In the computer systems world, these evolutionary steps can be viewed as [Refactoring][3], where the idea is to improve (i.e. to evolve) existing systems in order to accommodate new requirements, or to make it more adapted to the current environment. When an environment is at its young stage, collaborations can be easily created and new systems easily adapted, but as the environment matures, its complexity grows and maintainability, as well as adding new collaborations, becomes a hard task. Here’s what Herbert A. Simon states about the increase of complexity in computer programs:

>_“As we succeed in broadening and deepening our knowledge [...] what appeared as complexity in the computer program was to a considerable extent complexity of the environment to which the program was seeking to adapt its behavior.”_

Therefore, in order to accommodate new features to existing computer systems, it is crucial to maintain the system’s complexity to a controlled level by adapting its inner and outer environment to the changes caused by previous evolutionary steps.


## Recursiveness from the outer to the inner environments
  
  
A computer Operating System (OS) interacts with the outer environment, e.g. the memory and the CPU, through an interface built specifically for that purpose. Similarly, within the OS there are many computer programs interacting with the drivers, memories and other programs. These programs in turn, are composed of functions which may accept input and produce an output.

Such interactions can be viewed as recursive collaborations, in which a system provides an interface to the outer environment, as well as having its inner environment serving as outer environment to underlying systems. And although systems situated in the deepest part of the recursion might cause large effect in the outermost systems, such as an infinite loop causing an entire Operating System to [freeze][5], it is usually the latter which has greater impact in the innermost systems. If the Operating System fails to interact with the CPU, it will not be able to execute any program within it.

Analogously, natural systems also provide interfaces between the internal and the external environments. For example, the ecosystem existent in the Amazon rainforest was formed because of the interface provided by the forest. This interface, in turn, was only possible because the forest is located in an environment (between the Tropic of Cancer and the Tropic of Capricorn) which provides the proper conditions, e.g. temperature and humidity, for the formation of rainforests. Within this ecosystem, others can be found, such as rivers, trees or the soil, each of them collaborating to inner and outer systems, like computer programs exchanging input and output information from the environment.


## Information flow and the representation of the external world
  
  
Different systems will behave according to their necessity to gather input, or information, from the external world. The information is passed through the environment’s interface to the system, which will then transform this information so that it can be used as input to internal systems. At each level, the information processed in the environment is a result of collaborations made by higher level systems in response to their needs.

In the industry, organisations will collaborate with the environment by providing products and services, while gathering input, i.e. money, from their customers. This money is turned into revenue, which is then used by the organisation’s inner environment to develop more products, branding, pay employees, bills, etc. An employee, as an inner system within the organisation, receives inputs from the environment, such as tasks to be accomplished, salary, promotion and transform them in output for its own internal systems. If the organisation is going through a sales crisis, for example, it may produce negative output to its internal environment, such as mental pressure, shorter deadlines, job and benefit cuts. This output will then be gathered by employees, which will then produce negative output to their internal systems, such as unhappiness, headaches, fatigue, and so on.

A system, in order to survive in an environment, must either conform or adapt its behaviours to the environment’s interface, otherwise it will not be possible to achieve mutual collaboration. For example, humans cannot survive under the water for more than a couple of minutes without the proper equipments. Similarly, computer programs which do not adapt to the industry requirements have minimum chance to survive for more than a few years.

Once a collaboration is set, the system can carry information from the external world towards its internal environment. This information will flow towards internal systems as expected by their interfaces. Therefore, since each system will only take information from the environment that is relevant to itself, the representation of the external world is given by the information that is passed through its interface. As another example, humans are not able to see ultraviolet light because it was not relevant to human survival in the external environment from an evolutionary perspective. In fact, we did not know about the existence of ultraviolet light [until recently][1], but this did not prevent other creatures, such as bees, to see and perceive the world through it.


## When the artificial interacts with the natural
  
  
As information flows from one environment to the other, the barrier between the natural and the artificial starts to dissolve. Weather forecast systems require input from the natural world, information shared over the internet flows within a computer, passes through the natural environment via wireless technology, then back to another computer. The food waste produced by humans will eventually serve as input for several other natural systems.

Variables that were once only provided by natural systems, such as the nutrients in the soil required to grow crops, the amount of heat necessary to hatch an egg or the mating ritual performed by animals in order to ensure future generations, now can all be artificially created by humans. The process can be done by identifying the interfaces in the natural environments, then replacing a natural system for an artificial one that complies with the same interface. For example, identifying which nutrients (input) a plant needs and injecting them into the soil (environment) so that the latter provides the interface necessary for the plant. The soil, now altered by human intervention, is an artificial system, as is the plantation.

Music, as a form of art, is perhaps the greatest human achievement which permeates the natural and the artificial. A music is information that can be the output of the artist’s most natural feelings and, once reproduced by artificial instruments, it will also serve as input for another person, who will take the information and might be unable to control the feelings that can naturally occur.

[1]:https://en.wikipedia.org/wiki/Ultraviolet#Discovery
[2]:https://www.forbes.com/sites/maddieberg/2015/10/14/the-worlds-highest-paid-youtube-stars-2015/#7375fb843192
[3]:https://martinfowler.com/books/refactoring.html
[4]:https://www.goodreads.com/book/show/676046.The_Sciences_of_the_Artificial
[5]:https://en.wikipedia.org/wiki/Hang_(computing)
[6]:https://en.wikipedia.org/wiki/Sense

