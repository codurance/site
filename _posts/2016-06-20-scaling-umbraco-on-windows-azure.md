---
layout: post
name: scaling-umbraco-on-windows-azure 
title: Scaling an Umbraco Website On Windows Azure
date: 2016-06-24 16:20:00 +00:00
author: Halima Koundi
image:
   src: /assets/img/custom/blog/2016-06-20-umbraco-on-azure/umbraco-on-azure.jpg
category: technologies
alias: [/2016/06/24/scaling-umbraco-on-windows-azure]
tags:
- cloud
- cloud-services
- windows-azure 
- cms
- umbraco
- open-source
- website-solution
---

This is the first post of a three parts series about how to scale an Umbraco website on Windows Azure platform.


### Part I: Yet another [CMS](https://umbraco.com/)

Umbraco is “The friendliest open source MVC .Net framework community”, according to [the Umbraco team](https://our.umbraco.org/).

This [open source content management system](https://github.com/umbraco/Umbraco-CMS) is built on the .Net MVC infrastructure, it allows developers to work on the business logic with Content and Media API, whilst front-end developers can focus on the rendering, look and feel of the website building views with [Razor markup](http://www.w3schools.com/aspnet/webpages_razor.asp) and custom CSS.
Looking for an architecture representation of the Umbraco CMS, I have luckily found this diagram [tweeted](https://twitter.com/paulsterling/status/357223564019118080) by Paul Sterling.
<img src="{{site.baseurl}}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/01.png" alt="" class="img-responsive"/>
### Modular and flexible, but not as blogger friendly as WordPress

It is very easy with Umbraco to build simple websites with custom objects and link them together, without writing any line of code. One can spin document types and add child document types in minutes.
Here is a simple diagram from @mcDark [blog post](http://www.theoutfield.co.uk/blog/2011/04/anatomy-of-an-umbraco-document) that explains how document types are structured.
<img src="{{site.baseurl}}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/02.png" alt="" class="img-responsive"/>

A Document Type in Umbraco is a concept that holds business logic, it is where one configure the properties one will need to store data. It can have a UI representation that is called a Template.
A Template is where the layout of how the data is displayed will be specified using HTML, Razor and CSS.
Blogging is not out of the box in Umbraco. There are however plugins that are called packages, to add blog functionality to Umbraco.
[Articulate](https://our.umbraco.org/projects/starter-kits/articulate) is the default blog package that comes installed with the starter kit.
It gives a good basic features sets to get starting blogging, however it does not provide some fundamental blog capabilities such as categories which need to be implemented using document types and require some workaround in the template.

### Powerful indexing and built-in search capability

Umbraco integrates [Examine](https://github.com/Shazwazza/Examine), an indexing and search engine with two indexes already set up for internal search, helping you find your content on the admin of the website.
To improve usability of your website and help your visitors find your content, you can [build your own indexes](https://our.umbraco.org/documentation/reference/searching/examine/quick-start) and search functionality.

In this part we have been introduced to Umbraco, next we will see how easy it is to install and get up and running hosting our website on Windows Azure.
