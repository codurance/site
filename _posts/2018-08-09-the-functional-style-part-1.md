---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 1"
date: 2018-08-09 00:00:00
description: A design pattern reminiscent of the command pattern mixed with an event bus
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---
# An introduction.

Functional programming is a very hot topic nowadays. People are increasingly interested in functional and hybrid-functional languages such as Haskell, Scala, F# and Clojure, and functional programming is one of the most popular requested topics for discussion in conferences and programming communities. Since you're reading this, maybe you are interested to find out more about it too; if so, this series of articles is meant for you. I have been motivated to write them because I perceive the need for more literature explaining how to program in the functional style. I want to illustrate it with copious code examples, and highlight the benefits you should see when you try to do it.

Functional programming is often discussed in very academic and mathematical terms, but I don’t want to go there. That isn’t how I learned it myself. I’m not a computer science graduate and I was never formally taught it. I learned how to program at home, as many 90s adolescents did, and my learning has continued during more than 20 years professional experience. Moreover, at no time have I ever felt like I knew everything I needed to know. I have always been attentive to the current developments in my field and am keenly interested in its history. This series of articles is aimed at similar people: pragmatic programmers who love their field and learn best by writing code, who are humble enough to realise there is always more to learn, and practical enough to see profit in doing so.

So over the course of this nine part series I want to cover the topics that I think are important in functional programming. I will try to explain first-class and higher-order functions, map and reduce, currying, function composition and monads, lazy evaluation and persistent data structures. All will be illustrated with code examples wherever possible. Most (but not all) of the code will be in Java, Groovy and Clojure because that is what I know best.

Topics you will _not_ find in this series include monoids, functors, applicatives, and category theory. If you want to know more about those things then I recommend reading [Bartosz Milewski's Programming Café](https://bartoszmilewski.com/ "Bartosz Milewski's Programing Café") as a starting point. He explains things from first principles very well. If you already have a good understanding of these topics, then you might not like my explanations very much. I can only ask you to forgive me: this series is not meant for you. I _will_ include a small amount of algebra, because I think it is reasonable to assume some acquaintance with mathematics in an audience of computer programmers. Also, I won't be shy about using jargon that is standard in the field of computer programming. These articles are aimed at people who are new to functional programming, not people who are new to programming in general. I would be very interested to see whether neophytes find it any harder to learn programming in the functional rather than the imperative style, but that is not the purpose of this series.

## Should I learn a functional language?

Not necessarily, indeed my main aim in this series is to demonstrate the _functional style_, to show how it can be adopted to a certain extent in many languages, and what benefits you should realise if you do. I will use Java and, to a lesser extent, C# to illustrate many points in this series. Nevertheless, languages that are not designed for functional programming - I shall henceforth call them _imperative_ languages - are all in some ways flawed for expressing functional code. Every language has its own “sweet spot” for functional programming, and you will discover through experience where it lies in your language of choice.

Functional code can be expressed most naturally, obviously, in languages that have been created specifically for functional programming. Haskell is generally considered the purest functional language. It was born out of academia and its community likes to think about and discuss programming in very mathematical terms. Another popular functional language is Clojure. This is a dialect of Lisp that runs on the Java virtual machine. Not all Lisps are properly functional languages, but Clojure is explicitly designed for functional programming and also has excellent support for concurrency.

Haskell and Clojure exist, in a way, at opposite ends of the FP spectrum: Clojure is dynamically typed while Haskell is statically typed and very strongly so. You may be aware that a religious war has been raging for decades in the object-oriented programing world between static and dynamic typing. It is being fought in FP as well. I shall not mention it again because that isn’t what I want this series to be about.

Two languages that are often thought of as functional, Scala and F#, are actually hybrids: they support both functional and imperative styles of programming. The choice is left to the programmer. F# is part of the .NET family and compiles to run on the Common Language Runtime. Scala, like Clojure, runs on the JVM.

## So what is functional programming?

I remember looking up functional programming when I first heard of it myself, and reading it explained in terms similar to this quote from Wikipedia:

> In functional code, the output value of a function depends only on the arguments that are passed to the function, so calling a function f twice with the same value for an argument x produces the same result f(x) each time.

Functions with this character are said to be “pure.” When functions are not pure, the reason is because they depend on state that may change outside the function. This external state might be in the form of global variables, or objects, it might be in a file, or a database, or any number of other things. Functional programmers refer to changes of state like that as *side effects:*

> Eliminating side effects, i.e., changes in state that do not depend on the function inputs, can make it much easier to understand and predict the behavior of a program, which is one of the key motivations for the development of functional programming.

Functional programming, therefore, is programming so as to avoid these side effects wherever possible. But understanding it this way intellectually was insufficient for me to see the real strength of programming in the functional style. In the end it was learning Clojure, which also taught me how to make good use of the Java streams API, that showed me the benefits of functional programming. I find that I now view programming problems differently, and the functional style permits me to express my intent much more directly in my code.

## Side effects and imperative languages.

I want this series to be light on jargon, but already I’ve mentioned a couple of terms: _side effect_ and _imperative languages_. By imperative languages I mean all languages not expressly designed for functional programming, so that includes all the procedural and object-oriented languages like Fortran, Algol, C, Smalltalk, C++, Java, C# etc. Imperative means giving orders: _do this_, _do that_. The purpose of these orders is to cause side effects. A side effect means that some state somewhere was changed.

Elements in most imperative programming languages can be broken into three classes:

- Control structures: if-then-else, loops, etc.
- Statements: assign a variable, reassign a variable, call a procedure, etc.
- Expressions: code that yields a value.

Of these three, statements are the imperative part of imperative programming. Statements cause side effects. Now, almost everyone agrees that global variables are a Bad Thing. Why? They’re bad because a global variable can be changed at any time by a statement anywhere in the code, which makes the code very difficult to understand and debug. This is why we prefer to keep globally-accessible data constant. Functional programming takes this idea further, and asserts that it is better not even to modify local, private variables.

Functional programming is therefore programming without statements, more or less. In general only control structures and expressions are used, and then even the control structures are actually expressions. Maybe you’re wondering what I mean by that. You almost certainly already know an example and possibly use it regularly. Consider this (stupid) code:

```
if (myVar == "foo")
    return "myVar was foo";
else
    return "myVar was something else";
```

This can be expressed more succinctly using the ternary operator:

```
return (myVar == "foo")
        ? "myVar was foo"
        : "myVar was something else";
```

The `if` statement has been transformed into an expression, while the meaning has been kept exactly the same. Not only is it arguably cleaner, but now there is only one return statement. This gives a flavour of what functional programming is like.

Avoidance of changing state means that iteration also needs to be treated differently. Indeed, in functional programming iteration tends to take a different form entirely. But that would be jumping ahead; this will all be made clear later.

## A practical definition.

So a good place to begin would be to pin down a practical definition for functional programming. That is to say: (1) what it is in particular that makes a programming style functional, as opposed to imperative, and (2) what it is in particular that makes a functional language. Above I gave a definition in terms of pure functions and side effects, but that never really helped me much in understanding it. I have found this definition more useful:

> Functional programming imposes discipline on mutating state.

As I said, I don’t want this series to be heavy on jargon, but I will allow “mutating state” through because it is such a fundamental term in FP. To mutate state means to change the value of something after it has already been assigned. For example, consider this code snippet:

```
int x = 0;
x = x + 1;
```

Initially the symbol `x` has been associated with the value `0`. This is assignment. Then it is associated with a new value, which happens to be the old value plus one. This is reassignment, and the act of reassignment has mutated state:

_x was zero, **now** it is one_.

For those of us steeped in imperative programming, mutating state is so common that we tend not to give it a second thought. But let’s step back a bit. Maybe it isn’t quite as natural as we think. My introduction to computer programming came from reading the manual for the BBC BASIC programming language that shipped with the BBC micro, as a boy probably aged around twelve or thirteen. In it I remember seeing a statement of the form:

```
LET X = X + 1
```

It confused me. I was already familiar with equations, having been introduced to algebra at secondary school, but that statement made no sense. How could `X` be equal to `X` plus one? The manual, clearly written for an audience with a working knowledge of maths but no experience of computing, acknowledged the weirdness. It explained that it is not an equation at all, it is an imperative statement, with two sequential steps:

1. Evaluate the expression on the right hand side of the equals sign `X + 1`.
1. Assign the result to the symbol on the left hand side `X`.

The weirdness arises from the fact that it is permissible for the same symbol `X` to be involved in both steps of the statement. Were it written like this, it would not have been weird:

```
LET Y = X + 1
```

That is the same as a first-order polynomial and it is completely unambiguous. In principle, there is no reason why you could not write programs that avoid using the same symbol on both sides of any assignment statement. In practice, for any reasonably complex program you may end up with rather a lot of symbols, possibly an uncountable number. But you would also have a program that did not mutate any state.

## Why don't we program that way already?

These two different approaches to programming, to mutate state or not, can be traced back to the very dawn of modern computing. In 1936, Alonzo Church published a formal system in mathematical logic for expressing computation which he called Lambda Calculus. Around the same time and independently, Alan Turing created a theoretical model for devices called Turing machines that could carry out calculations by manipulating symbols on a tape. The two ideas were subsequently brought together into a formal theory of computation known as the Church-Turing Thesis, and it laid the foundation for modern computing.

A Turing machine is stateful: it holds one symbol inside the machine which can be changed, and it can also write and overwrite symbols on the tape. By contrast, lambda calculus is a pure mathematical approach and it has no concept of state. Lambda calculus was influential on one of the earliest programming languages, Lisp, but on the whole the imperative stateful programming style exemplified by FORTRAN has dominated. The reasons are easy to discern: mainly, processing speed and memory. Early computers had little of either. Also, the basic programming instructions of all computers right up until the present day are imperative: *add these two numbers*, *store the result here*, *compare these two numbers*, *set a status flag*, etc. The very first programs were written using this instruction set for lack of any other language to write them in. The first high-level languages, in order to be practical, were still strongly influenced in their design by the machines they ran on. It was only later that the functional programming style started to catch on.

## What makes a language functional?

If we agree that functional programming is programming with discipline on reassignment, this also gives us a useful definition of a functional language. Here is my definition, and you may choose to accept it or not:

> A functional language makes all data immutable by default.

In a functional language, if a symbol is destined to be reassigned it must be declared in a certain way, and the language imposes some kind of ceremony to be followed when this will occur. If a language has first-class functions or it supports lambda expressions, I don’t consider that those things by themselves make it a functional language. These are indeed features of all functional languages, but they have also been added to modern imperative programming languages as well. These features do enable programming in the functional style; this is a good thing and this is the main subject of my series, but it still doesn’t make them functional languages *per se*.

## Imperative languages.

To illustrate by example, C is most decidedly not a functional language. In C, everything is mutable by default, unless you explicitly make it immutable:

```c
int mutable = 0;
const int immutable = 1;
```

The same is true of Java and C#. By this measure, Ruby is even less functional: in Ruby, ‘constants’ are identified by their name beginning with a capital letter, but you can still change its value. Doing so merely produces a warning.

## Hybrid-functional languages.

Scala, Kotlin and F# all sit on the fence: these languages make you choose whether a symbol is supposed to be variable, or whether its value will never change. In Scala:

```scala
val immutable : Integer = 0; 
var mutable : Integer = 1;
```

while in Kotlin, which has a more Java-like syntax:

```kotlin
val immutable = 0;
var mutable = 1;
```

F# leans a bit more to the functional side, because all “variables” are immutable unless you say otherwise:

```fsharp
let x = 0
let mutable y = 1;
```

In all three languages the collection types (list, map, set etc.) are immutable and mutable versions are available on request. So these languages can be considered hybrid-functional; they make the programmer decide whether they are going to write functional or imperative code.

## Functional languages.

In Clojure, the bias is much more firmly on the functional side. Sure, you can put this in your code if you want:

```clojure
(def foo "foo")
(def foo "bar")
```

but if you make use of the symbol `foo` anywhere in your program, the value will always be “bar,” never “foo.” The second definition supersedes the first, and your code analysis tool may flag the first definition as unused. The closest thing Clojure has to a variable assignment is `let`:

```clojure
(let [foo "foo"]
  (do
    (println (str "originally: " foo))
    (let [foo "bar"]
      (println (str "inside: " foo)))
    (println (str "afterwards: " foo))))
```

When you evaluate this form, it prints:

```none
originally: foo
inside: bar
afterwards: foo
```

so we can see that let has not actually modified the value of foo at all; it has created a new scope in which the symbol foo is bound to the value “bar”, but outside of that scope it is still bound to the original value “foo”.

Similarly, Clojure’s collection types list, set, vector and map are all immutable: once created they can never be changed. If I have a list:

```
(def my-list (list 1 2 3)) 
```

then `(cons 0 my-list)` will yield a new list `(0 1 2 3)` but `my-list` still contains only `(1 2 3)`. Maps, sets, and vectors all behave similarly. If you really want to change the value of something in Clojure, you must define it as `atom`:

```clojure
(def foo (atom "foo"))
```

and then use `reset!` to change its value. In Clojure, functions that mutate state are indicated with a ! character:

```clojure
(do
  (println (str "was: " @foo))
  (reset! foo "bar")
  (println (str "is now: " @foo)))
```

which prints:

```
was: foo
is now: bar
```

Clojure presents a higher barrier to cross if you want to change the value of something. Not an insurmountable barrier certainly, but it makes the programmer be very sure, yes I want to change the value of this thing, here I am changing its value now. Even the way you must reference the value is different. As the name atom suggests, the language guarantees atomicity when you do change it.

In Haskell, variables are only “variables” in the mathematical sense that x is a variable in the equation that defines a straight line, `y = mx + c`. You may vary `x` to calculate the corresponding values for `y` but this is merely a notation for describing something immutable: a straight line. You cannot mutate state in pure Haskell, when you need to do it you have to use monads (I’ll explain those much later). If you compare the bubble-sort implementations in Ruby and Haskell on [this blog post](https://blog.jakuba.net/2014/07/20/mutable-state-in-haskell.html) for an example of how to mutate state, I think you’ll agree it looks simpler in the imperative language. I doubt Haskell programmers would write imperative programs in Haskell. But that said:

> Haskell is, first and foremost, a functional language. Nevertheless, I think that it is also the world’s most beautiful imperative language. ([Simon Peyton Jones](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/beautiful.pdf))

and if anyone would know about Haskell, it is him.

So by _my_ definition, Haskell and Clojure are functional languages. They force the programmer to be clear about where the mutable state is, and they impose discipline on how the mutating is done. Moreover, both languages by their design direct the programmer away from programming in imperative statements. I may have used `do` in the Clojure snippet above, but I think that is the only time I have ever used it. I will use Clojure a lot in this series of articles, but I will not use do again. I think it unnecessary and we will not pine for its absence.

## Next time:

So far we have discussed a fair amount about what functional programming is, but that only opens a whole world of questions. How do you program that way? Why would you want to? Before we can really answer the second question, we need to begin to answer the first. In the next article we will take our first baby steps in functional programming. In particular we will tackle the problem of how to implement loops without mutating any state, and how functional languages manage to do this while avoiding the apparent inefficiencies.
