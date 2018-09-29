---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Future Languages"
date: 2018-09-29 08:00:00
description: Where I muse about safety
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- Software Craftsmanship
---

So here I am, again, this time with some serious musing around what we do as engineers/developers/craftpeople. Our languages, tools, and techniques, determine what we can do, how good our systems are, how safe, how secure, and how fit for the task. Because this affects people's lives we need to be careful on what we do. Robert Martin (Unble Bob) has been talking about the necessity of a code similar to the Hippocratic oath. I am of the believe that it will come the time in which you will need to be part of a professional body to perform our duties (after all, the Hyppocratic oath did not stop the need for the Medical license)

## Discussing about what are functional languages

The other night I was discussing with some colleagues what is a Functional Language. On their definition, only pure statically typed languages can be called Functional Languages. No IO Monad, no functional language. My contention was that immutability (and with it the reduction of side effects) is enough for a language to be called functional. Their thinking eliminates Clojure, Elixir, Erlang and a few others. Instead of seeing functional languages as a spectrum, it was an all or nothing.

But that led me to start thinking about characteristics of languages. And it is true that a statically typed language doesn't require as many tests as a dynamically typed language because there is a whole type of errors that will be stopped. It is also true that on a language that has immutability, there is another whole type of errors that will not happen, because nothing can just change the values. Furthermore, I have found that expressing logic on them creates less cruft code (both for dynamic or typed) than a OOP language.

As a result, they become safer languages. There is less code created to create a feature, therefore the number of parts that can fail is smaller and those parts are much easier to test. The code is simpler (but that doesn't make creating it is easier).

## Boilerplate

If I look at statically typed OOP languages, to create something that is maintainable the amount of code that I need to create has always looked excesive. But all those interfaces, all those design patterns performs necessary functions in a system of a minimum size and complexity. Dynamically typed OOP languages tend to require far less boilerplate, you can concentrate on the actual task. The offshot, is that you need a very comprehensive test suite to guarantee that there is nothing going wrong on your application. The compiler will not stop you sending the wrong type of object. Weakly typed languages are the worst on that regard, because you can forcibly coerce a type into another (and let's not talk about void pointers here).

Tony C. Hoare, between lots of other stuff, created null. He is recorded as saying (well, I did have the privilege to see him at Code Mesh saying so) that null was his $1million mistake (or probably 1 billion by now. How many errors have happened (and will happen), because a method/function could return null? How much boilerplate code has been written to check for null values? Why languages do still allow nulls? One of the things that I like from the C# language spec group is that they have not been afraid to break compatibility to improve the basis of the language. The did it when generics came to the language, and they have done it again when they decided that objects, by default, will not allow null.

The boilerplate (directly through the actual production code or indirectly through tests) is neccessary to allow maintainability of a code base while at the same time trying to ascertain it's correct behaviour.

## Safe Languages?

A lot of boilerplate can be removed through the use of higher levels of abstraction. This is the place where functional languages tend to live in. Creating a loop for the nth time is a waste of time, so functionality like map and reduce eliminates unneeded development.

I have a colleague that is quite fond of Rust. And I learned some of the characteristics of Rust thanks to him. Rust is not a functional language, but does show some characteristics, mostly immutability and control of some side effects (there are no monads, but ownership makes you be very clear about the consequences of the code). Furthermore, like Haskell, if it compiles, you know that is quite difficult to crash because of what happens inside. Safety was one of the objectives on the creation of the language. It shows.

If we are creating software that affects people's live (as in keeping them alive, or not made them broke) should we not use safe languages? It is not irresponsible to use a language which is easy to crash or write code that is incorrect? You will find below some famous problems created, between other things, by the code that developers have written. Software developers have killed people. Software developers have sent people into bankruptcy because issues on their code. Would you be happy about doing it? Would you care?

There is an spectrum here where we can put languages based on how safe they are, where weakly typed languages (C, Javascript) are on one end, and others (Haskell, Ada, probably Rust) are on the other end. I do believe that the type of software were we people's live it is a stake should only be created with the safer kind. It is not about time to market, it is not about fun coding, it is not hitting the sales numbers.

## My favourite languages

My current favourite language is Clojure (dynamic), and I like quite a lot Elixir (dynamic), Ruby (dynamic), Python (dynamic), and the two main languages on .Net, C# (static) and F# (static with Hindley-Milner type inference). ... Well, darn, F# is the closest to what I said above.

Taking into account what I said above, do they have a place on my toolbox? Well yes, there is still plenty of work that doesn't require those safety measures. And on those areas, any language can be used. Of course, you need to be sure that you don't create code that will completely wipe out a computer unintentionally). Websites that do not process payments, games, library applications, video processing systems, small scripts, ... usually do not have the same safety/security needs. 

## Musings about techniques

But what about how we code? Are there techniques that make developing a solution safer? I do think so.

I currently think that TDD is the best thing since slice bread. Which will not stop me from changing my tune if I find something that is like slice bread with melted Biscoff spread on top.

TDD, Walking skeleton, integration testing, performance and load testing ... those are tools that we, Codurance, value and always try to spread our love for. But you can go further if the safety/security requirements demand it, like formal proofs (which there are not the panacea either, I know cases where they have failed).

Saying that you don't need test is factually wrong. The interactions in most current systems tend to be too complicated for anyone to know all the possible permutations. You need automated tests, at several levels, that are run often (where often depends on the level of the test), that stop your system for being deployed if they fail.

But also that is not enough by itself. You need to be able to check that your production code, on the server, or on the robot that is using it, performs according to expectations. You need to know when things go beyond safe parameters.

Redundant test and check systems are not out of place when your software goes into an aeroplane or a car.

## Famous problems

Just to illustrate a few cases where we, developers, have failed:

- London Ambulance Service System Failure
    You can read a nice review at [Erick Musik website](https://erichmusick.com/writings/technology/1992-london-ambulance-cad-failure.html). This one is (or was) taught at London universities.
- Banking failures
    So many to look at just in the UK. RBS group 2012, HSBC 2015, RBS 2015, TBS 2018, ...
- Therac 25
  You can read the entry [at Wikipedia for it](https://en.wikipedia.org/wiki/Therac-25)

## Conclusions

I am very opinionated on this post. I am certain that I am right (though strong opinions loosely held). It is our responsibility. It is not about what I like, it is not about what is more fun, ... that is for my hobby coding. For anything professional, I need to be aware of the consequences of my actions and decisions.
