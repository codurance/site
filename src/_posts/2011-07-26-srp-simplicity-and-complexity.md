---
author: Sandro Mancuso
layout: post
name: srp-simplicity-and-complexity
title: "SRP: Simplicity and Complexity"
date: 2011-07-26 02:47:00 +01:00
---

<blockquote>Simplicity does not precede complexity, but follows it.
 <footer><cite>Alan Perlis</cite></footer>
</blockquote>


The Single Responsibility Principle (SRP) - one of the
[SOLID](http://craftedsw.blogspot.com/2010/06/object-oriented-design-principles-part.html)
principles - is definitely one of my favourites principles in
Object-Oriented Design. I find its simplicity and, at the same time, its
complexity fascinating. I have known this principle for years and [wrote about it](http://craftedsw.blogspot.com/2010/06/object-oriented-design-principles-part.html)
for the first time over one year ago. Still, I can't stop thinking about
how hard it is to apply it. Speaking to and pairing with many developers
over the years, I noticed that every single one of them understands what
the principle is about but when it comes to write code, either they
forget it or they simply can't find a way to adhere to it. I'll give you
my view about the problem and what I've seen happening in many
occasions.

###The outside view

<blockquote>Every class and method should have just one responsibility</blockquote>

This is what I call *outside view* and naming plays a big role here.

This view is generally used when we need to add some totally new code.
We think what the new code is about, create a class and/or a method,
give it an appropriate name that represents what the new code does and
we are done. We also use this *outside view* when reading code. When
looking at a class or method name, it should be clear to us what they
do.

I don't think anyone ever had a problem understanding this principle.

However, if it is so simple to understand, why don't we all follow it?
Why do we still find classes and methods with hundreds, if not thousands
of lines? A few things come to my mind to explain that. Maybe we are
just bad at naming classes and methods. Maybe the names we give are too
generic or too broad, allowing us to write loads of code in there. Maybe
some of us just don't care.

###The inside view

<blockquote>Classes and methods should have one, and only one, reason to change</blockquote>

This is what I call *inside view* and it is the other (often forgotten)
side of the Single Responsibility Principle.

This view is generally used when we need to change some existing code or
add more code to it. That's when we look inside each class and method to
see exactly what they do. More often than not, we get frustrated because
they do much more than they should do and we need to go through many
lines of frustration and WTFs to understand the bloody thing.

However, it is much easier to adhere to the SRP when we keep the *inside
view* in mind instead of the *outside view*. That means, always think
about the number of reasons to change a class or method instead of
thinking purely in their responsibilities.

###So, when and where do things go wrong?

<blockquote>NOTE: In general I find more SRP violations in systems where developers
are not doing TDD and refactoring.</blockquote>

Here is some food for thought. I'm risking to say that the majority of
SRP violations are found in the classes and methods that are closer to
the interface of the system. For example, in a web application, it's
very common to find large controllers, actions or backing bean classes.
For swing applications, we tend to find large event handlers. For
systems where the entry point is a queue, we tend to find large methods
that are responsible for processing the messages. 

In general, this happens because the classes and methods closer to the
interface of the system have a more generic and broader responsibility.
Quite often, these methods are responsible to trigger loads of business
rules and/or complex workflows.

Imagine that the input to our system is a huge XML file representing a
trade. Also imagine that the first method invoked to handle that is
called `processTrade(tradeXML)`, located in a TradeService class. What
is the responsibility of this method? It is to process a trade, right?
Should it have a different name? Our system is expected to "process" all
trades received so it is fair to say that the first method handling the
request (or reading from a queue) should be called processTrade.

In another example, imagine that a user added a few items to her
shopping basket (web application), provided some payment details and
clicked on the "place order" button. In our back end, we will have a
method handling this request that probably will be called something like
`placeOrder(order)`. Fair, right?

###Developing an idea

<blockquote>In general, the closer the code is to the system's interface, the
broader and more generic its responsibility will be. The further away
the code is from the system's interface, the narrower and more
specific its responsibility will be.</blockquote> 

In both examples above, by their names, you can argue that the methods
`processTrade` and `placeOrder` have a single responsibility. One processes
the incoming trade and the other places a customer order. So, when
developers take into account **just** the *outside view* of the SRP,
they feel comfortable to add as much code as they need to satisfy these
responsibilities.

The problem is that processing a trade or placing an order may be
extremely complicated tasks, where a huge workflow will be triggered,
many business rules and requirements need to be satisfied and we will
need to write hundreds, if not thousands, of lines for that. So clearly,
adding all these lines to a single method doesn't just simply violates
the SRP. It's also plain stupid.

So, in order to make our code compliant to the SRP, we need to have just
a single reason to change it. This leads to a complementary idea.


<blockquote>In general, the closer the class is to the system's interface, the
more delegation the class will do. The further away the class is from
the system's interface, less delegation the class will do.</blockquote>

A general example would be, in a traditional Java web application, the
controllers, that are closer to the UI, have a broad responsibility and
tend to delegate all the business logic to other objects. They just
control the flow. At the other end, we have the DAOs that have a very
specific and narrow responsibility, almost never delegating anything to
another class. In the middle, we have services, that do some business
logic of their own but also delegate work to other collaborator classes.
Services tend to have a narrower responsibility when compared to a
controller but a broader responsibility when compared to DAOs. Still,
each class and method have a single responsibility.

###Asking a different question

When mentoring and/or pair-programming with other developers, quite
often we end up discussing about the amount of code in a method or
methods in a class. Just using the SRP's *outside view* as an argument
sometimes is not enough to convince some developers that the code is
doing too much. That's why I find the *inside view* more useful. Instead
of asking how many responsibilities a method or class have, I now ask
how many reasons we would have to change them.
