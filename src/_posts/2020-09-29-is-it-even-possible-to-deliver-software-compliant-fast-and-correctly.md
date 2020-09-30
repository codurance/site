---
layout: post
asset-type: post
name: is-it-even-possible-to-deliver-software-compliant-fast-and-correctly
title: Is it even possible to deliver software compliant, fast, and correctly?    
title-es: ¿Es posible entregar software compatible, rápido y correctamente?
date: 2020-09-29 08:00:00 +00:00
author: Przemek Rogowski
description:  Many long-term projects suffer from speed in delivering new functionalities. The complexity of the project and the legacy code's presence have a significant impact on the work rate. We will try to describe these problems in more detail along with their causes, and propose solutions that could help avoid such a situation in the future. 
description-es: Muchas veces los proyectos no cuentan con la velocidad necesaria en la entrega de nuevas funcionalidades. En este artículo hablamos de cuales pueden ser las causas y sobre todo proponemos soluciones que pueden ayudar a evitar este tipo de situaciones.   

image:
    src: /assets/custom/img/blog/2020-09-29-is-it-even-possible-to-deliver-software-compliant-fast-and-correctly/software-compliant-fast-and-correct.jpg

tags:
    - legacy-code
    - TDD
    - hexagonal architecture 
    - Clean architecture 
    - unit tests 
    - fast development 
  
pinned_locations:
    - specialist-expertise

in_page_banner: none

hubspot-cta-id: 3c7b20c7-1758-482f-bbe0-3f0b186b1261
hubspot-cta-id-es: ebe8b71b-439d-478b-9a31-7f808868915d

--- 

Do you like the smell of a new book? That moment when you remove the foil, and your fingers touch the smooth cover for the first time. You sniff the air to remember the smell of fresh ink. You relish the feeling of novelty, and your heart is happy to see the quality of the release. You admire the content and artwork. You are immersed in a gust of curiosity, absorbing completely what the new book brings with it.

What does it look like after a few weeks or months of reading? Along with its worn edges from carrying it in a bag, the book stands on a shelf. Between the pages, you can see the places where you left the bookmark. The smell is no longer the same. The aroma is over, and the charm of novelty is gone forever.

You are probably wondering why I am writing about it, and how does it relate to software development? Each new project is a bit like a new book. The perspective of new technologies, frameworks, databases, or a new business domain. This breath of freshness and the enormity of emotions that accompany it. We also tell ourselves that this time we'll do it right. This project will not end up like others.

{% include compass_teaser_for_blog_posts.liquid %}

<br/>
 
So what happens after several years of work? What happens when you first realize your project is legacy code. All the excitement is hidden between illegible lines and confusing architecture, the creator of which is no longer even present in the project. The speed and quality of delivering new functionalities suffer from this. From a beautiful and fragrant book, our project turned into another volume with torn edges and a bent cover, hidden somewhere on a shelf.

Of course, everyone in the company understands the need to return to the old state. It used to be that everything went so well and so fast. The programmers were motivated, the customers were satisfied, and the number of production errors was not too high. The old glory should be restored, preferably by rewriting the project from scratch. New technologies are chosen, maybe a different language, as if the lack of parentheses next to "if" that determined the quality of the code. A special group is selected and given a secret mission to rewrite everything. Correct this time, as if the intention was different at the beginning. We all know the story, and we all know how it ends. Significant monolith rewrite or big project refactor.

Is there a cure for this disease? Can anything be done to prevent the next project from ending up on a legacy code shelf? Yes, of course.

![Velocity - time]({{site.baseurl}}/assets/custom/img/blog/2020-09-29-is-it-even-possible-to-deliver-software-compliant-fast-and-correctly/graph.jpg)

Let's look at the diagram above. It shows the relation between the project duration and the speed of delivering new functionalities. From what we can see, everything goes very quickly in the first phase of the project life. With time, as the system expands and its complexity level increases, the pace of work slows down to its critical level. This process can be observed very well in projects that last several years. I worked on such projects, and I remember the questions that always arose in the management group. Why is development going so slowly?

The problem we are confronted with does not manifest itself in the first year of the project, but at a later stage when we are already deep inside it. Is it possible to deliver software quickly to meet the client's requirements and have high quality at every stage of its life? Even after many years? Yes, it is possible.

Let's list the main obstacles that can be encountered in older projects.
Inappropriate architecture or lack thereof.
Obsolete libraries and tools.
Unreadable, challenging to refactor code.
Code that no one understands. "Don't touch it, or you will break it."

Indeed each of you has encountered this kind of situation in your older projects. Let's describe each of these points, in turn, to show what type of solutions we could apply.

###On Inappropriate architecture.

We start working on a new project, and one of the first questions is what database we will use. Relational, document-based, or something more like a cache? In one of his lectures on clean architecture, Robert Martin said that a good architect postpones critical decisions. It's excellent advice. If we do not know, our system has not yet reached the maturity level that would allow us to verify what type of database would suit our application best. Is it a one-off example, or is it something that is repeated many times in each project?

On obsolete libraries and tools.

What is happening to the code structure? How many times have you created a package hierarchy driven by the requirements of the framework you are using? What would happen if you suddenly decide to change the framework? What about your entire structure? It would become a relic of the past, and you would have to explain to any new programmer where it came from.

What about using libraries in our code? What about such huge tools as Hibernate, Play, or Spring? Have you ever tried to replace or remove them? Do you remember the pain of migrating from one version to another? The reason, of course, was the ubiquity of these tools in the project code. They grew like viruses, infecting neighboring classes.

###On legacy code

Then we have old, several years old classes with thousands of lines of code. Nobody remembers what they did, what their implications were. What was their purpose at the time of creation? Each change in them can result in magically appearing errors in production until finally, someone from programmers with more experience in the project will tell you in the face, "do not touch or you will break."

###What can we do?

Someone once told me that the only constant in the universe is a change. Nothing lasts forever, and we can never expect anything to stay the same. These words are very deeply remembered for me because there is a universal lesson from them. If everything we create at some point is deleted or changed, then instead of fighting it, we could make it easier. Let us try to approach the problems described above from this perspective. What can I do to make my job easier in three months or a year?

###Hexagonal architecture

If the architecture, tools, or database type may change, maybe we better leave the door open in our project. How can this be done? Have you ever heard of something called hexagonal architecture or ports and adapters?

The whole idea is to disconnect the domain, the application kernel, from all the code related to frameworks, information storage, or communication methods such as HTTP. The code is physically disconnected, and all communication between the domain and the so-called framework is via ports, in the case of clients and repositories, and adapters for HTTP or UI-style communication.

Thanks to this division of code, any change to the library or other tool should change only the code placed in the framework part. What will it do for us? Any architectural changes will not have a significant impact on our application. Thanks to this, we will free ourselves from the ticks of bad decisions and old tools.

What's the downside of this? We will have to write some more code, which will feel like overengineering sometimes, but trust me, it has a strong foundation. As a result, we will spend more time programming to accelerate changes in the future.

###Small, decoupled applications.

The second important point is the size of the application. If we are working on a monolith with thousands of classes, it will be challenging to carry out efficient refactoring. What we need is a way to run our project into a series of small, disjoint applications. We can use concepts such as microservices or an application with decoupled modules.

The most important thing is that our small applications are of a size that can be rewritten in one week. What will it do for us? The code is unreadable, and nobody understands it? Rewrite the application. Does the model no longer match the business requirements? Instead of patching the deficiencies, rewrite the application with a new, matching model. Don't expect your code written three years ago to live up to today. Remember, everything changes. Create your application, so that adaptation to future requirements is as easy as possible.

Breaking the application down into smaller ones will result in the need to implement communication between them. It will create extra work that we would not have had with a monolith.

###Good unit test coverage.

The last point is unit testing. I hope there is no need to talk about the tests anymore, and everyone has understood their advantages, and until we come up with something better, we will stay with them for a while. From the perspective of the problems we mentioned, what can good unit test coverage do for us?

Tests describe the behavior of methods, so they constitute a kind of living documentation. Thanks to this, we can understand what our code is responsible for. We know its impact on other parts of the system, its dependencies, relationships, and what behavior is expected from it.
It gives us confidence in software development that our code is correct and protects us against possible errors during refactoring. Thanks to this, we will not have anything in the code that, when changed, will magically spoil our production.

Tests are code as well, so it must be written and then maintained. It will add extra work for the developers and slow down the pace slightly.

###Summary

After taking a closer look at our problems and the proposed solutions, we find an interesting reflection. The best way to always write code fast is to write it… slower. The techniques we mentioned will make the product development process slower in the first phase of the project but will improve the quality and speed of work in the long run.

If you are interested in other methods of improving the quality of work, you can use the compass.codurance.com tool prepared by Codurance. With a few simple questions, you can define your project's maturity and get suggestions on how to improve the current situation. Besides, in future articles, we will go deeper into the topics covered here. The subject of project quality is so extensive that one text cannot do it justice.

Do you remember when we talked about the book at the beginning?
What would it be like if you could have physically separated chapters instead of one book? For example, twenty small books instead of one large volume. It's not all. What if the author rewrites one of the chapters every month, adding new heroes, new events, new places? Would such a book be more interesting? Would you like to keep coming back to it every month, and what shelf would you put it on? On the signed "legacy code," or maybe "still fresh and hot?"

{% include compass_teaser_for_blog_posts.liquid %}  
