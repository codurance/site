---
layout: post
name: javascript-a_tough_love
title: JavaScript - A Tough Love
date: 2015-03-17 10:49:00 +00:00
author: Robert Firek
image:
    src: /assets/img/custom/blog/javascript/js.png
tags:
- javascript
---

In the 90’s we were witnesses of browser wars. Wars which created one of the most hated languages: Javascript. Web designers touch by Javascript at the beginning of 21st century constantly refused to fix bugs titled as “It doesn’t work in Internet Explorer” or “Netscape Navigator doesn’t show…”. At this time we used pure languages and tried to understand the design of our web browser in order to cope with compatibility issues.

Thanks to DOM, DHTML and Ajax, JavaScript went to another level. It became “lingua franca” for those who wanted to create dynamic web pages not web business cards. Now, with Node.js, we can also implement server-side applications in Javascript.

So, why we do we hate it so much?

## Why I don’t hate Javascript anymore

When I start to speak about JavaScript with people focused on another language e.g. Java I can hear some noises of pain, discomfort or a tortured human being. Aversion to Javascript was probably imprinted in all software communities during 90’s and it infected next generations. I understand that maybe in 2005 writing JavaScript code was still a painful process, because of insufficient tools, meaningless error messages and slow engines. JavaScript is no longer a slow and clumsy brother of Java.

### I’ve got a framework

Without JavaScript it would be impossible to create dynamic applications. Document Object Model (DOM) gave us the possibility to respond to user interaction in the same way as in a desktop application. JQuery-like libraries created a layer of abstraction above DOM and they enriched web elements with behaviours. That wasn’t enough for Javascript developers. More complex web sites required better structure of source code. The answer for this was the need of a JavaScript framework.

Javascript frameworks organise code and simplify interaction with web browser. Some of the more popular ones being [AngularJS](https://angularjs.org/), [Backbone](http://backbonejs.org/), [Ember](http://emberjs.com/) or [Knockout](http://knockoutjs.com/). They base themselves on the MVC model and models derived from MVC. If you don’t like the approach represented by them you can choose more exotic frameworks such as [Polymer](http://www.polymer-project.org) and [React](http://facebook.github.io/react/).

### I’ve got a test

The source code cannot exist without tests. [QUnit](http://qunitjs.com/), [Jasmine](http://jasmine.github.io/) or [Mocha](http://mochajs.org/) are unit test frameworks that can help you to test your code. Unit test libraries already provide basic assertions, but you can extend this functionality by using [chai](http://chaijs.com/) or [should.js](http://shouldjs.github.io/) libraries. If you want to use mocks, stubs and spies in your code, there are libraries for that too (e.g. [sinon](http://sinonjs.org/)).

Node.js is the best choice if you need some environment to run tests. [Karma](http://karma-runner.github.io/) or [Testem](https://github.com/airportyh/testem) give us possibility to verify behaviours in web browsers. Tests can be also executed as part of a Continuous Integration pipeline using a headless browser ([PhantomJS](http://phantomjs.org/)).

### I’ve got a choice

If you still don’t like JavaScript, you can find languages that can ease you into it. CoffeScript, TypeScript, ClojureScript and Dart are languages which introduce syntactical sugar and they are transcompiled to JavaScript.

## Embrace JavaScript

Currently we don’t have better alternative for JavaScript in web browsers. Until then we can make our lives better by embracing it, knowing that at times it can be ugly and harsh. Be kind to the unwanted child of the browser wars.
