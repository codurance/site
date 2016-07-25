---
author: Sandro Mancuso
layout: post
asset-type: post
name: extract-inject-kill-breaking
title: "Extract, Inject, Kill: Breaking hierarchies (part 1)"
date: 2012-03-06 18:15:00 +00:00
---

Years ago, before I caught the TDD bug, I used to love the [template method pattern](http://en.wikipedia.org/wiki/Template_method_pattern). I
really thought that it was a great way to have an algorithm with
polymorphic parts. The use of inheritance was something that I had no
issues with. But yes, that was many years ago.

Over the years, I've been hurt by this "design style". That's the sort
of design created by developers that do not TDD.

###The situation

Very recently I was working on one part of our legacy code and found a
six level deep hierarchy of classes. There were quite a few template
methods defined in more than one of the classes. All classes were
abstract with the exception of the bottom classes, that just implemented
one or two of the template methods. There were just a single public
method in the entire hierarchy, right at the very top.

We had to make a change in one of the classes at the bottom. One of the
(protected) template method implementations had to be changed.

###The problem

How do you test it? Goes without saying that there were zero tests for
the hierarchy.

We know that we should never test private or protected methods. A class
should "always" be tested from its public interface. We should always
write tests that express and test "what" the method does and not "how".
That's all well and good. However, in this case, the change needs to be
done in a protected method (template method implementation) that is part
of the implementation of a public method defined in a class six level up
in the hierarchy. To test this method, invoking the public method of its
grand grand grand grand parent we will need to understand the entire
hierarchy, mock all dependencies, create the appropriate data, configure
the mocks to have a well defined behaviour so that we can get this piece
of code invoked and then tested.

Worse than that, imagine that this class at the bottom has siblings
overriding the same template method. When the siblings need to be
changed, the effort to write tests for them will be the same as it was
for our original class. We will have loads of duplications and will also
need to understand all the code inside all the classes in the hierarchy.
The ice in the cake: There are hundreds of lines to be understood in all
parent classes.

###Breaking the rules

Testing via the public method defined at the very top of the hierarchy
has proven not to be worth it. The main reason is that, besides painful,
we already knew that the whole design was wrong. When we look at the
classes in the hierarchy, they didn't even follow the [IS-A rule](http://en.wikipedia.org/wiki/Is-a) of inheritance. They inherit
from each other so some code could be re-used.

After some time I thought: Screw the rules and this design. I'm gonna
just directly test the protected method and then start breaking the
hierarchy.

###The approach: Extract, Inject, Kill

The overall idea is:

1. **Extract** all the behaviour from the template method into a class.
2. **Inject** the new class into the parent class (where the template is
defined), replacing the template method invocation with the invocation
of the method in the new class.
3. **Kill** the child class (the one that had the template method
implementation).

Repeat these steps until you get rid of the entire hierarchy.

This was done writing the tests first, making the *protected* template
method implementation *public*.

*NOTES*
*1. This may not be so simple if we have methods calling up the stack in
the hierarchy.*
*2. If the class has siblings, we have to extract all the behaviour from
the siblings before we can inject into the parent and kill the
siblings.*

This probably is too complicate to visualise, so in [part 2](/2012/03/06/extract-inject-kill-breaking_06/)
of this post I'll be giving a more concrete
[example](/2012/03/06/extract-inject-kill-breaking_06/). 
