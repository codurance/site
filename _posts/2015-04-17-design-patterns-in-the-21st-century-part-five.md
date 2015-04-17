---
layout: post
name: design-patterns-in-the-21st-century-part-five
title: 'Design Patterns in the 21st Century: Conclusion'
date: 2015-04-17 18:00:00 +01:00
author: Samir Talwar
canonical:
    name: my personal blog
    href: http://monospacedmonologues.com/post/116651319855/design-patterns-in-the-21st-century-conclusion
image:
    src: /assets/img/custom/blog/2015-04-13-design-patterns/part-five.jpg
    attribution:
        text: Cogs, by Arthur John Picton
        href: https://flic.kr/p/9b24xc
tags:
- design-patterns
- functional-programming
- java
---

This is part five of my talk, [Design Patterns in the 21st Century][].

[Design Patterns in the 21st Century]: http://talks.samirtalwar.com/design-patterns-in-the-21st-century.html

---

Over the past week, we've seen three examples of design patterns that can be drastically improved by approaching them with a functional mindset. Together, these three span the spectrum.

  * The Abstract Factory pattern is an example of a **creational** pattern, which increases flexibility during the application wiring process
  * The Adapter pattern, a **structural** pattern, is a huge aid in object composition
  * The Chain of Responsibility pattern is a good demonstration of a **behavioural** *anti-pattern* that actually makes the communication between objects *more* rigid

We took these three patterns, made them a lot smaller, removed a lot of boilerplate, and knocked out a bunch of extra classes we didn't need in the process.

In all cases, we split things apart, only defining the coupling between them in the way objects were constructed. But more than that: we made them functional. The difference between domain objects and infrastructural code became much more explicit. This allowed us to generalise, using the built-in interfaces to do most of the heavy lifting for us, allowing us to eradicate lots of infrastructural types and concentrate on our domain.

It's funny, all this talk about our business domain. It's almost as if the resulting code became a lot more object-oriented too.
