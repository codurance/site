---
layout: post
asset-type: post
name: What-does-RESTful-really-mean
title: 'What does RESTful really mean'
date: 2016-08-02 17:00:00 +00:00
author: Carlos Morera de la Chica
image:
    src: /assets/img/custom/blog/RESTful.png
    attribution:
      text: http://vichargrave.com/
      href: http://vichargrave.com/wp-content/uploads/2012/12/RESTful-Area.png
tags:
- REST
- Web API
- architecture

---

Last month I attended [Fast Track to RESTful Microservices training](https://skillsmatter.com/courses/541-fast-track-to-restful-to-microservices) at [Skillsmatter](https://skillsmatter.com). During the course, we explored what REST APIs can offer to web applications in general and microservices communication in particular. Personally, the most important outcome of the course is a better understanding of what REST really means and what are its pros and cons.

During most of my career, I've been focused on mobile technologies, therefore, being on the consuming side of web APIs. Most APIs that I've ever consumed were supposed to be RESTful, now that I better understand what RESTful means I can say that 99%  of them weren't even close to RESTful (Clients are broken because of something being added in the server side sounds familiar?).

## Definition

The term REST stands for "REpresentational State Transfer". A possible formal definition of it could be as follows.

> Architectural API style based on transferring a representation of state (documents) between client and server in order to progress the state of an application.

## Constraints

To consider applications as RESTful, applications need to conform to the following REST constraints. Complying with the constraints enables a distributed hypermedia system to have the following desirable non-functional properties: performance, scalability, simplicity, modifiability, visibility, portability and reliability.

* Client-server

A client-server model induces separation of concerns so that clients are not concerned with data storage. Thus, clients code *portability* is improved. On the other hand, the server is not concerned about user interface or user state, so that server can be *simpler* and more *scalable*. Servers and clients can be developed independently, as long as they conform to the defined contract.

* Stateless

Client context is never stored on the server between requests. Each request has to contain all the necessary information. A stateless server improves *scalability* by allowing the server to quickly free resources and simplifies implementation, *reliability* eases recovering from partial failures, *visibility* Monitoring system does not have to look beyond a single request to determine the nature of the request.

One of the drawbacks of having a stateless server is decreased network performance as all the needed data has to be sent in each request

* Cacheable

REST applications are web systems; therefore, clients and intermediaries can cache responses. Responses themselves must be defined as cacheable, or not, to prevent clients from reusing stale data that could reduce *reliability* if stale data in the cache differs significantly from the data that would have been generated the request been handled by the server. Caching could eliminate some client-server interaction, thus improving *scalability*, *efficiency* and user-perceived *performance* by reducing average latency.

* Uniform interface

Using a uniform interface simplifies and decouples the architecture and favours the independent evolution of different parts. As explained later on in this post, URIs, resources and hypermedia help to produce a standard interface that improves *visibility* of interactions, *simplifies* the overall system architecture and induces independent evolution. The trade-off is that it degrades *efficiency* since information is transferred in a standard format rather one which is particular to an application's needs.

* Layered system

Using a layered system reduces complexity by constraining component behaviour such that each element cannot access beyond its immediate layer. Favours substrate independence by restricting knowledge of other parts of the system. Layers can encapsulate legacy components and protect new services from legacy clients. Intermediaries can be used to improved *scalability* by enabling load balancing across networks. The main trade-off is that layered system add overhead and latency to the data processing, therefore, reducing user-perceived *performance*.

* Code-On-Demand (Optional)

REST allows clients to extend their functionality by downloading and executing code scripts. This *simplifies* clients and improves *extensibility*. On the other hand, it reduces *visibility*, that's why is only an optional constraint.

## Elements

REST have several elements in its toolbox to build stateless, scalable and simple web APIs.

* HTTP
* Resources
* URIs
* Hypermedia

### HTTP - Document transfer application protocol

REST is usually used along with HTTP as its transfer protocol as it offers several advantages. Among them are HTTP verbs, status codes and headers.

#### Verbs

Instead of defining new verbs for every possible behaviour in our web service. HTTP introduces a standard set of verbs to handle similar situations in the same way, therefore, removing unnecessary variation and creating a more intuitive API. Each verb has a different combination of two properties that make them suitable for different scenarios.

1. Idempotent

> The operation can be repeated in the event of failures.

2. Safe

> The operation has no side-effects for which the client is responsible.

##### GET

Used to read state from the server. Being a **safe** operation, it can be executed multiple times without risk of data modification or corruption - calling it once has the same effect as calling it ten times. As an **idempotent** operation, making multiple identical requests has the same result as a single request.

##### POST

Usually used to create some state on the server. It's **neither safe nor idempotent**. Therefore multiple requests will create several resources on the server. As a non-idempotent operation, POST should not be used for operations that deal with money, as in the case of a failed request is done multiple times, we would potentially be transferring money or paying multiple times.

##### PUT

It's most used to update state on the server, although it can also be used to create state. It's **Idempotent** but **not safe** as it changes the state of the server. Being an idempotent made PUT a good candidate, for instance, for operations related to money.

##### DELETE

It's used to delete state on the server. It's idempotent but **not safe** as it removes state from the server. It's **idempotent** as deleting state that has previously been deleted should not have further implications.

#### Response Status Codes

The [HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) provide metadata in the response to the state of the requested resources. They are part of what makes The Web a platform for building distributed systems. They are divided into the following categories:

* `1xx` - Metadata
* `2xx` - Everything is fine
* `3xx` - Redirection
* `4xx` - Client did something wrong
* `5xx` - Server did something wrong

#### Headers

The [HTTP headers](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) are components to pass additional information in requests and responses. Headers consist of a case-insensitive name followed by a colon and its value. Headers could be grouped as:

* General headers: Apply to both requests and responses but there is no relation to the data transmitted in the body.
* Request headers: Contain more information about the resource being fetched or about the client making the request.
* Response headers: Contain additional information about the response.
* Entity headers: Add information about the body of the entity, like content-length or MIME-type.

### Resources

A resource is anything exposed by the system that has an identity. Resources offer a way to adapt the application domain to web clients. An image, a spreadsheet, a service or a collection of other resources are some resource examples. The resources are fetched or send using a certain representation (XML, JSON, etc.).

We deal with resources representations, not with the resources themselves, following the idea of "Pass-by-value". Following the previous REST definition, resources represent the documents being transferred across the network to get work done. Resource state is a server-side concern, as it represents the domain state, clients only fetch or send resource representations to progress the application state. On the other hand, application state is a client-side concern as it represents the progress towards a particular application goal.

Resources should be named as nouns as they represent concepts in the domain of a particular system and are identified using URIs.

### URIs (Uniform Resource Identifiers)

URIs differentiate one resource from another. To access and manipulate a resource, it needs to have at least one address. They are composed of a `protocol` + `host` + `path`.

Clients should not be coupled to particular resources URIs as they can be changed at server's discretion. This is where hypermedia has the greatest advantages, as it offers a way to decouple clients from specific URIs and add semantics to the application protocol.

### Hypermedia

Hypermedia informs the client about what it can do next, through the use of hypermedia controls (links and forms) in the responses, and the particular URI to do it. The concrete hypermedia format for a particular application is defined in the application Media Type.

Hypermedia links are composed by a `href` attribute that specifies the URI to access the linked resource and a `rel` attribute that defines the meaning of the relationship, therefore, adding semantics to the state transitions in the application. The use of links allows the server to advertise new capabilities by including new links in the responses without breaking existing clients. As long as the server maintain previously defined links in the responses, clients would be able to follow them just as they were before the new state was added. Clients would need to be updated only if they need to access the new state. Another hypermedia advantage is that it introduces discoverability by providing a way of making a discoverable and self-documenting protocol.

Clients start interacting with the app through a fixed URL, from thereon, all further actions happen by the client following the links, formatted using the media type, provided by the server in each response.

Media types and links define the contract between the application server and the client. The client interacts with the system by navigating the application state using the links. This is what **HATEOAS** (Hypermedia as the engine of application state) really means.

Hypermedia (in addition to the already defined elements) is what RESTful really means.

### Richardson Maturity Model

This model has helped me a lot to understand what REST means and how to explain the properties of a web application. It divides the components of a REST system into three levels and provides a way to understand the ideas, concepts and the advantages of RESTful thinking. I'd say that it's an educational model rather than an assessment mechanism.

A detailed explanation of what Richardson Maturity Model is can be found at [Martin Fowler's blog](http://martinfowler.com/articles/richardsonMaturityModel.html).
