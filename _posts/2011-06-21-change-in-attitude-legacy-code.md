---
author: Sandro Mancuso
layout: post
asset-type: post
name: change-in-attitude-legacy-code
title: "A change in attitude - Legacy code"
date: 2011-06-21 03:31:00 +01:00
---

<blockquote>Attitude is a little thing that makes a big difference.
 <footer><cite>Winston Churchill</cite></footer>
</blockquote>

Not long ago, I gave a
[talk](http://skillsmatter.com/podcast/design-architecture/what-is-software-craftsmanship/js-1956)
about Software Craftsmanship where I asked who liked to work on
greenfield projects. Almost everyone raised their hands. Then I asked
who liked to work with legacy code. Besides one or two friends that were
there, almost everyone kept their hands down.

It is always nice to start a project from scratch, be able to choose the
technology, use the latest frameworks and have a lot of fun writing code
without worrying about breaking existing features or having to
understand existing code. Working on greenfield is great, mainly with an
experienced and disciplined team using TDD since day one. Progress flows
naturally and quickly.

But as soon as we are working with code written by people that are long
gone, no tests, no documentation, we go mental. We notice we are going
mental by the number of WTF we say during the day. We may get moody and
start hating to work on a specific system or in parts of it. Frustration
becomes a constant.

###A change in attitude

<blockquote>If you don't like something change it; if you can't change it, change the way you think about it.
 <footer><cite>Mary Engelbreit</cite></footer>
</blockquote>

Although I wrote "we" and "us", that was really how I used to feel when
working with legacy code. However, in the past few years, I learned many
things. An obvious one is that moaning, complaining and cursing won't
make my life easier or better. If I want things to be better I need to
do something about it.

Today, when I look at legacy code, instead of moaning and getting
frustrated, my attitude is to try to understand it and make it better,
constantly applying the Boy Scout Rule.

As my friend [David Green](http://twitter.com/activelylazy) said in a
twitter conversation, what I agree 100%, improving and understanding
legacy code can be massively rewarding. The process of trying to make
sense of a big ball of mud seems daunting but if we just focus in small
parts of it, one at a time, and start improving them (writing tests,
extracting methods and classes, renaming variables, etc), bit by bit,
things become much easier and enjoyable.

Working with legacy code is almost like solving a big jigsaw puzzle. We
don't do that all at once. We start by separating the pieces into
groups, often starting with the edges and corners and then separating
other small pieces by colour, pattern, etc. We now have a few (logical)
groups and we start to form a higher level model in our head. What
before was a bunch of random pieces (or a big ball of mud), now is a
bunch of smaller groups of random pieces. Still not very helpful or
encouraging, but nonetheless some progress. Bit by bit, we start working
on one of these groups (parts of the code) and we start putting some
pieces together (writing tests for the existing code, which will help
with our understanding of the code, and refactoring it).

Once we start putting some pieces together, we start seeing a small part
of our jigsaw puzzle picture. We get excited because now it's getting
real. It's starting to make sense and we are happy we are making
progress. The more pieces we put together the more excited we are about
finishing the jigsaw puzzle. The more pieces we put together, the easier
it gets to put more pieces together. And that's exactly the feeling I've
got when working with legacy code now. For every piece of code I make
better, more I want to make the whole code better. The feeling of
achievement is really rewarding. What before was something I could
barely read and took ages to understand, now reads like a story and
every developer can understand it with no effort at all. Maybe when a
good part of the code is stable (covered by tests, loosely coupled, well
defined responsibilities, etc), I could even introduce the cool and new
frameworks that I always wanted to use. I could upgrade some library
versions. I could even throw a lot of code away and replace it with a
framework because now my code is clean and modularised and replacing one
part of the system will not break another. I don't even need to envy my
friends working on greenfield projects any more.

###Different challenges

Another cool thing about legacy code is that it forces you to think in a
different way. In greenfield projects, when developing a new feature, we
write a test and start implementing stuff. In legacy, sometimes you
can't even instantiate a class in order to test it due to all its
dependencies. A change in one place can cause an impact in obscure parts
of the system. We have an option here. We can see these challenges as a
pain in the ass or can be see them as very interesting problems to
solve. I prefer the latter.

###The professional side

Although it is OK to have fun and enjoy what we are doing, we always
need to remember that we are professionals and being paid to write
software. Software is an asset and a lot of money and time is invested
on it. As every investment, clients want to maximize the return of their
investment. The more we improve and keep the software clean, the longer
the client will be able to benefit from it. Stretching the lifespan of a
software also maximizes the client's return of investment.

###Conclusion

At the end of the day, it does not matter if you are working on a green
or brownfield project. It's your attitude towards your job that will
make it more or less enjoyable.
