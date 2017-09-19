---
layout: post
asset-type: post
name: mvc-delievery-mechanism-domain-model
title: MVC, Delievery Mechanism and Domain Model
date: 2017-09-13 08:00:00 +00:00
author: Sandro Mancuso
image:
   src: /assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/mvc-delivery-mechanism-dm.png
tags:
- craftsmanship
- software design
- mvc
- IDD
---

Model-View-Controller (or MVC for short) is one of the most misunderstood design patterns in software design. MVC has its [origins][1] in the SmallTalk community in the late 70s but it was only in 1988 that it was expressed as general concept in an [article][2] by Glenn E. Krasner and Stephen T. Pope for [The Journal of Object Technology][2]. 

The main idea behind MVC was to keep the presentation and business logic decoupled from each other.

![first image](/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/mvc.png) 

Up until mid 90s, MVC had mainly been used for desktop and embedded applications. [Three-tier architecture][3] (presentation, logic, data) was the reigning architectural style in the 90s, and MVC fitted as a glove. In the late 90s and early 2000s, most companies started migrating their applications to the web and the need to keep the user interface separate from the business logic became even more important. The MVC pattern promotes exactly that and it was a natural step to use MVC for web applications. However, we now had a browser, http calls, and the View would be rendered outside our applications, separately from our Controllers and Model. In order to make things easier for developers, a few frameworks were created. In the Java world, we had MVC [Model 1][4] and [Model 2][5] with [Java Server Pages (JSP)][6] and [Servlets][7]. [Struts][8], the first major MVC Java framework, was created in the early 2000s. From then onwards, we had many attempts to make the communication from the browser (View) with our applications (Controller and Model) seamlessly. Many other frameworks like Tapestry, Java Server Faces (JSF) and Spring MVC emerged in the Java world. Other languages and platforms also created their own, [Rails][15] being one of the most successful ones. 

As web applications and frameworks diversified, the MVC pattern also evolved and new variations like [MVA][9], [MVP][10], [MVVM][11] and [PACK][12] emerged. MVC frameworks became popular and as part of their evolution (and competition among each other), they tried to automate more and more the _manual_ work the developer had to do, including database access. MVC frameworks started automating how [Entities][13] are persisted using [Object-Relational Mapping - ORM][14] techniques or closely integrated with other ORM frameworks. Due to the simplicity of  many web applications, MVC frameworks made it easy to capture data in a web form and store in relational databases. They also made it easy to read data from the database and display on the browser. The price for this automation was a bastardisation of the Model layer, which became synonymous of _Entities_ that represented tables in the database. 

With the Model now associated to Entities and persistency and the View associated to HTML, CSS and JavaScript, developers found no other alternative then to put the business logic of the system in Controller layer. Unfortunately MVC frameworks are one of the main reasons we find Web application with an anaemic domain (Entities with no behaviour) and fat controllers (responsible for navigation, managing sessions, parsing JSON and XML, and also with business logic). 

From the original MVC idea, the Controller layer should be a very thin layer, handling the requests from the View, delegating all the business behaviour to the Model, and according to the result, sending information back to the same view or navigating to another one. The Model should contain all the business logic, including state and behaviour. 

## Domain Driven Design and Layered architecture 

In [Domain Driven Design(DDD)][16] applications are normally split into 4 layers: 

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/dddlayered.png" alt=“DDD Layered Architecture” class="img img-responsive"/>
</center>
<br/>

* User Interface (Presentation Layer): Responsible for presenting information and interpreting commands of a user or another system. In MVC terms, this is the View.
* Application Layer: Defines the behaviours the system is supposed to provide and directs the appropriate domain objects to execute those behaviours. This layer is normally kept thin, only coordinating the behaviour of different domain objects that together form a full business feature. This layer does not have state reflecting the system situation but can hold state that reflects the progress of a business feature. In MVC terms, this is this Controller.
* Domain Layer: Represents concepts of the business, information about the system situation and business rules. Business state is controlled and used here but the technical details of storing it are delegated to the Infrastructure layer. In MVC terms, this is the Model.
* Infrastructure Layer: Provides generic technical capabilities that support the layers above. Exampleles would be message sending to the application, persistence, drawing UI components and support the pattern of interactions between the four layers through an architectural framework. 

### Domain Model

Behaviour and state are both part of the domain model of an application. The domain model is a set of business concepts defined by many different design elements or [building blocks][17]. These design elements are not only Entities but also Services (Application, Domain, Infrastructure), Repositories, Factories, Aggregates, and Value Objects. 

## Delivery Mechanism

There is a difference between system features and how they are delivered. We can deliver system features through a Web interface, APIs to an external system, mobile clients,  messaging, etc. **Delivery Mechanism** is the name we give to the area of our application responsible for providing the business features to the external world. In a web application, the delivery mechanism is normally composed by the View (HTML, CSS, JavaScript) and Controller (code that responds to users interactions). 

## MVC, Delivery Mechanism and Domain Model

MVC is a macro pattern that can be used as a good guideline to keep the delivery mechanism decoupled from the domain model. With that in mind, if we superimpose the delivery mechanism, domain model on the MVC structure we will have the following:

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/mvc-delivery-mechanism-dm.png" alt=“MVC, Delivery Mechanism and Domain Model” class="img img-responsive"/>
</center>
<br/>

When it comes to MVC frameworks, they should be restricted to the View and Controller layers, never the Model. 

## Reduce coupling avoiding frameworks

Many web frameworks allow us to transform entities into JSON/XML and vice-versa. Some do that via [annotations][18], others do it via [reflection][19] or name convention. It is also a common practice to use ORM frameworks to automatically persist and retrieve data from a database using our entities. Similar to the MVC frameworks, we need to add ORM annotations to our entities, or rely on reflection or name convention. With annotations we explicitly make our Model layer to know about the Controller and persistency, causing a circular dependency. If we rely on naming convention or reflection, we have a worse problem because the coupling is still there but is not visible. If we change an Entity, we may not know that we are changing the API or Database. 

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/entity-json-db-mapper.png" alt=“JSON / Database Entity Coupling” class="img img-responsive"/>
</center>
<br/> 

Although reducing boiler plate code using frameworks sounds a great idea, we are coupling the structure of our entities (domain model) to the APIs we provide to the external world and our database. Changing the database impacts the API and vice-versa. What had initially been seen as a time saver, now is a reason to avoid change. The larger and more coupled the system grows, the less developers will be inclined to make changes due to the size of the ripple effects. Many web apps today have APIs which are far from ideal as they reflect the internal data structure of the application instead of focusing only on the information that would make more sense to the external world. 

Do not be afraid to create your own mappers. They are normally very simple to write and there are many small libraries specialised to parse objects to JSON or persist data to databases. The advantage of writing our own mappers is that we do not need to couple our APIs or databases to anything. Changes are localised and easy to change. On top of that, we can easily test-drive our mappers and move API tests to the unit level instead of doing it at Acceptance level. 

## Deployment options

The biggest advantage of keeping the Domain Model decoupled from the Delivery Mechanism is that it give us deployment options as the application evolves. 

While the application is small, we can keep the separation between delivery mechanism and domain model just using good package/namespace structure or sub-modules, but still keep everything in the same project and deploy both together, as a single application. 

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/embedded-dm.png" alt=“Embedded Domain Model” class="img img-responsive"/>
</center>
<br/> 

As the application grows and we want to add different delivery mechanisms, or use different technology stacks, or scale delivery mechanism and domain model in different ways, it makes sense to deploy them individually. If the separation is already there, it would not be so hard to achieve that. We just need to wrap the Domain Model in some infrastructure and change the invocation from the Delivery Mechanism.

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2017-09-13-mvc-delivery-mechanism/deployable-dm.png" alt=“Deployable Domain Model” class="img img-responsive"/>
</center>
<br/> 

# Summary

In MVC, Controllers should be a very thin layer (2 or 3 lines) which identify the request from the user, invoke the appropriate behaviour in the Model, and invoke the appropriate View once the Model returns. Model is not only about entities (state); it’s about all the behaviour of your system, the entire Domain Model.

Keep the Delivery Mechanism decoupled from your Domain Model. The Domain Model should not know anything about how the business  feature and data are delivered to the outside world. 

Don’t couple all the layers of your application using frameworks that will tell our entities how they should be represented as JSON or persisted in a database. Use small libraries instead of big frameworks. Use a small library at your Controller layer to convert JSON to and from your domain objects and another small library inside your repositories to convert your entities to and from data in the database. If you are using Java, we created [LightAccess][20] for this purpose. 

Keeping Delivery Mechanism decoupled from Domain Model give us options to deploy and scale the application. 


[1]: link to origin of MVC (if any)
[2]: Link to the original article defining MVC
[3]: Link to three tier architecture
[4]: Model 1 - Java
[5]: Model 2 - Java
[6]: JSP
[7]: Servlets
[8]: Struts
[9]: MVA
[10]: MVP
[11]: MVVM
[12]: PACK
[13]: Entities
[14]: ORM
[15]: Ruby on Rails
[16]: Domain driven design
[17]: building blocks - DDD
[18]: Java Annotations
[19]: Java reflection
[20]: LightAccess