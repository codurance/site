---
layout: post
name: screencast-testing-and-refactoring
title: 'Screencast: Testing and Refactoring Legacy Code'
date: 2012-12-18 14:02:00 +00:00
author: Sandro Mancuso
---

In [this screencast](https://www.youtube.com/watch?v=_NnElPO5BU0) I take a small piece of legacy Java code that
contains the most common problems found in much larger legacy code
bases. The objective is to first write tests to understand what the code
does and then refactor it to make it better. The code contains
Singletons, static calls and behaviour that does not belong there. It
also has some design issues.

As an advice, I always recommend that we should never "touch" the
production code as we retrofit tests, that means, we should not change
it typing into the production file. However, as normally legacy code is
not written with testing in mind, sometimes we need to change the
production code in order to write tests for it. I address this scenario
explaining how we can do that in a very safe way.

A common question when developers want to make legacy code better is
"Where do we start?" I also address that explaining the how the
approaches for testing and refactoring legacy code are the opposite from
each other.

Besides a few other things, I also cover the use of code coverage tools
to help us testing the code, how often we should be committing, how to
fix a possible problem with the design in very small steps and how to
stay in the green while refactoring our code.

Last but not least, I show how our tests and production code be easily
written in a way that it captures the business requirements.

Although it is a bit long, I hope you all enjoy it.

There are two minor things I forgot to do while doing this exercise. Let
me know if you spot it. :)
