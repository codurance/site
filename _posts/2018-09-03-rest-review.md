---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Rest Review"
date: 2018-08-30 08:01:00
description: Where I talk about what is, and what is not, the REST architecture.
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- REST
- Architecture
---

There are two events that have happened recently close to each other. The first one was a decision to actually learn GraphQL. I have been thinking about it for a while, but now is time to actually put the effort on it. The second one was a talk with my colleague [Luciano](https://codurance.com/publications/author/luciano-palma/) in which I incorrectly made a remark about resources on REST. Because of both (for the former as I want to compare, for the latter to assert my knowledge), I decided to re-read both the [Fielding PhD dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) and the book [REST in Practice](http://restinpractice.com/book/) by Robinson, Webber and Parastatidis.

So here is a review of REST.

## The Sources

The sources (plus the actual practice) forms the basis of my understanding of REST. Do read what I say here, but do go back to them, read them yourself and check if what I write makes sense.

### Fielding's dissertation

The first three chapters about analysis of (web) architectures are fantastic. He offers his own classification of network architectures and how they built on top of each other. It creates an easy to follow taxonomy and shows how he arrived at REST. I found quite interesting as well that for him the architecture is, basically, the snapshot of the running system.

One thing that I completely forgot is that he worked on quite a few projects like Http/1.0, Http/1.1, Apache, ... and that Http itself is based on REST (mostly, as he does talk about the definitely not RESTful cookies and the need to support non RESTful existing extensions).

### REST In Practice

I think this was a fantastic book with a really good introduction to REST APIs. When it came the time for me to work on my first Web API, I read this book as it had all glowing recomendations. After reading it a second time a few years later, I can say that is still fresh and on point.

## Web API != REST API

Having an API that uses http doesn't mean that you have a REST API. I think this is an important distinction, as a lot of programmers I have seen do mix them. A Web API is an API that can be accessed through the network. A REST API is an API that follows the REST architectural style.

## Architectural style
REST is not an specific architecture. You can have any number of architectures that can be called REST. But if your architecture and your API don't obey the constraints and elements below it cannot be called a REST architecure/API. They are defined on title 5 of Fielding's dissertation. I will enumerate them here, but you can go back to the source for the full description.

### Constraints of REST
The six constrains indicated by Fielding are:

1. Client-Server
2. Stateless
3. Cache
4. Uniform Interface
5. Layered 
6. (Optional) Code on Demand

###  Elements of REST
The four elements are indicated below.

1. Identification of resources
2. Manipulation of resources through representations
3. Self descriptive messages
4. HATEOAS (Hypermedia as the Engine of the Application State)

## Richardson's maturity levels

Richardson introduces the ideas of his maturity levels to the wider world at the Qcon conference of 2008 through a [presentation](https://www.crummy.com/writing/speaking/2008-QCon/) he made. At least that's the first reference I found to them.

I am under the impression that some people justify calling their systems REST because they are inside the model above (level 1 or 2). But that could be me misinterpreting things. I still like it because it provides an easy way to understand how you achieve a RESTful API.

He establishes four levels as below, 

* Level 0 - One uri/one verb -> Which basically is just HTTP Tunneling
* Level 1 - Multiple uri/one verb -> We are introducing the idea of resources
* Level 2 - Multiple uri/multiple verbs -> Full use of HTTP verbs. Let me point out that the REST architectural style doesn't really care about HTTP verbs per ser in regards to creating an API. But because they have defined semantics (as long as the server/API respects them), it helps with the self-description of message that Fielding identified as an element.
* Level 3 - HATEOAS -> The "end" of the journey. Now you have a REST API.

## REST is about hypermedia.

Look at that last level. REST is an architectural style defined to solve Network distributed hypermedia systems. Without Hypermedia there is no REST. If your API doesn't work through the use of hypermedia, you don't have a REST API. Maybe you don't need hypermedia to solve your problems. But then use the correct term.

## Resources

This was a difficult one to get my head around, and I had to read the original dissertation to actually get that a resource is not a row in database. Any information that can be named is a resource. Fielding defines a resource as a `conceptual mapping to a set of entities`. See that we are not talking about the values at one specific point of time. There could be resources that are static (immutable), but others that aren't. There could be two resources that share at some point their values. An example of a resource could be `the current version of my music collection`. Another resource could be `my music collection yesterday`. They could have the same values or not. But they represent different concepts.

Once I understood that resources are not associated to the datastore, resources becomes something dynamic that can be created on the fly as you need them.

## REST and HTTP

A REST API  doesn't need HTTP. The definition of the REST architectural style doesn't talk about HTTP. In fact HTTP was molded around the ideas that would become REST.

But is normal that we use HTTP for REST APIs because is the same architectural style. And the facilities of HTTP provide you the elements and constraints of REST.

Richardson's model set on level 2 the use of HTTP verbs. There are a few available. The most importants being GET, because is the one that allows caching, and POST, which is a catch all. You could use the others as well. Each one has well defined sematics. Though Robinson, Webber and Parastatidis did have an example in which they were going to partially update a resource and they end using POST (which now would be reserved for PATCH)

## Swagger is not conducive of REST

One last thing that I want to mention is that if you start writing Swagger or any other API documentation, you most certainly are not going to end having a REST API. For the swagger documentation to work, the endpoints need to be known. But a REST API known endpoints should only be the entry points. Any other endpoint is provided as a link, and therefore the actual value is unimportant.

## Versioning

Currently, what I have seen mostly talked about regarding versioning is the three possibilites of having a version number at the root of the URI (https://myapi.codurance.com/v2/clients), on a specific endpoint of a resource (https://myapi.codurance.com/clients/v2), or versioning the resource (Content-Type=application/vnd.codclient/v2+json). If you follow the REST architectural style, other than the entry endpoint, the client doesn't need to know what the endpoints are, that is what links are for. Therefore there is no point on versioning endpoints. And if you entry point doesn't change, then there is no point on versioning the root. You end with the versioning of the resource to indicate that changes have happened.

## Other readings

It seems that my colleague [Carlos](https://codurance.com/publications/author/carlos-morera-de-la-chica/) wrote a [post](https://codurance.com/2016/08/02/what-does-RESTful-really-mean/) on the same vein as this one two years ago. Certains misconceptions don't seem to dissapear. 

## Comparison with GraphQL

I'm quite looking forward to create my own comparison, as the few presentations that I have seen about GraphQL seem to miss the mark when criticing REST. Hopefully it will not take me long to have something to say about it.


<sub>
Photo: ["Relax for two"](https://www.flickr.com/photos/ljsilver71/15594809946/in/photolist-pL4tFy-VHcszq-7jSLxJ-8s6rV-8jRh4c-4LzZ51-8vQLAD-6hyhot-4wFAm7-4GEgVi-98eqBQ-8MMD3T-5RQ1zi-6WwPZu-5KgdKq-99CYDD-512veB-cHFqk-fnQew4-5twYoy-eorjVa-6SMh7C-fnbKD-8nWT7Q-6Jfb53-5hzYpj-bVRfPz-2bo9zF-4LzXT7-nYpqVw-daupwD-76FZr1-5uineQ-4LvJCP-rdtanu-5CrSDu-d8SX2u-Vf8KaN-6LdgXC-U4WtBe-gwP4K-6LzpPc-8QUSF1-55fFs5-7JcDc2-X2JzLj-E4f3d-4YQKBm-dg12bH-8omyeg) by Ricardo Maria Mantero is licensed under [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)
</sub>
