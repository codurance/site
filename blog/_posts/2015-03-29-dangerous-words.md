---
layout: post
name: dangerous-words
title: Dangerous Words
date: 2015-03-29 21:22:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/2015_03_29_dangerous_words/wittgenstein.jpg
tags:
- naming
- philosophy
- expresiveness

---

Ludwig Wittgenstein was one the greatest philosophers of 20th century. His book Tractatus Logico-Philosophicus addresses the limits of language and its relationship with reality. A friend of mine, great polemicist, suggested me to read it some years ago to understand one of his favourites conversational _deux ex machina_: "I can't prove that, because of the inherent insufficiency of the language." 

Needless to say, I didn't understand most of Wittgenstein's book, but I started to share the concern about the problems that ambiguous or unrigorous language generates. Whenever I heard or read some well crafted thought, I obsessively revisit those words to figure out why they are so effective communicating.

Clean, simple and expressive code tries to defeat, as much as possible, the gap previously mentioned between language and reality. However, without getting into the nitty-gritty details of narrative and syntax, we, as software community, have failed creating proper words that are central for our profession.

I don't want to approach the etiology of some of those words, but just shed some light on what are the problems generated for those unaccurate words.

## Unit testing

Testing is one of the fields with more candidates to The Razzie words awards. Integration, system, component, acceptance and, of course, unit. What do they mean really? No two snow crystals are alike, and no two programmers opinions about those words either. This [google search](https://www.google.co.uk/search?q=testing+pyramid&espv=2&biw=1680&bih=951&source=lnms&tbm=isch&sa=X&ei=IpgMVduKIcLY7Aag64DQDQ&ved=0CAYQ_AUoAQ) is disheartening.

Unit is probably the worst, as it's the most ambiguous and the most important for TDD practitioners. A unit could be defined as something with clear boundaries, integrated in a bigger system and providing a single function. Defining those terms in a concrete problem is really complicated and it depends heavily on the language and ecosystem that we're using.

I think that more concrete naming like object, module or method testing would be easier for newbies. Because, and this is something important to note for seniors, when we get used to words, they lose their original meaning and get impregnated with our experiences and bias. So, yes, we all know what unit testing means, but maybe nobody thinks on the same.

## Extreme programming

Last LSCC roundtable had some very interesting conversations. One of those was about extremes. Almost everybody agreed that extremes are generally bad, and the word "dogma" appears several times as a synonym of "extreme". Ideas located at the limits of some spectrum are usually considered as extreme, but also ideas that refuse to change when confronted with reality.

I don't think that XP is an eccentrity or some fundamentalist view of programming that refuses to evolve. I think that XP could be thought as radical or vanguardist, but that, at least in our zeitgeist, doesn't have that pejorative connotation of extreme.

To be honest, the first time that I heard the phrase "Extreme Programming", I thought that it was some weirdness related to the no-rules-super-hacker mindset.

## Service

Whoever that has worked with old style Spring-Hibernate webapp will recognize the following flow: Controller -> Service -> DAO. What does that Service layer usually do? Holding the whole business logic of our app in a non-OOP fashion. What does service mean? "The action of helping or doing work for someone". Every class or method that we write does work for someone else, so what is the point of calling a class WhateverService?

To make things worse, there are application and domain services in DDD, and we have SOA (Service oriented architecture) and its younger cousin Microservices. Everything seems to be a service in software. Often I prefer to use words like API, server, backend, just to avoid that overloaded term.

## In Conclusion

As conclusion this post is not a complain to whoever created or made popular those terms. In fact, I think that people like Martin Fowler, Kent Beck or Uncle Bob have made a great work coining catchy acronyms or locutions. It's just a call to attention to be aware of the dangers of ambiguous words.

In some episode of House of Cards, one politician discuss thoroughly with his team about using "action" or "vision" as key words in a debate. We should have that mindset too, but with pragmatism, of course. That's why I think that is a great idea to create some kind of agreed glossary whenever a new team is created.

---

*Thanks to Samir for the edits.*
