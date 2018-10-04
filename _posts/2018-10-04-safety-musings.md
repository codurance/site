---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Safety Musings 1 (Languages)"
date: 2018-10-04 08:00:00
description: Where I muse about safety
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- Software Craftsmanship
---

So here I am, again, this time with some serious musing around what we do as engineers/developers/craftpeople. Our languages, tools, and techniques, determine what we can do, how good our systems are, how safe, how secure, and how fit for the task. Because this affects people's lives we need to be careful on what we do. Robert C. Martin (Uncle Bob) has been talking about the necessity of a code similar to the Hippocratic Oath. I am of the believe that it will come the time in which we will need to be part of a professional body to perform our duties (after all, the Hippocratic Oath did not stop the need for the Medical license)

## Discussing about what are functional languages

The other night I was discussing with some colleagues what is a Functional Language. On their definition, only pure statically typed languages can be called Functional Languages. No IO Monad, or any other way of controlling side effects through the type system, no functional language. My contention was that immutability (and with it the reduction of side effects) is enough for a language to be called functional. Their thinking eliminates Clojure, Elixir, Erlang and a few others. Instead of seeing functional languages as a spectrum, it was an all or nothing.

But that led me to start thinking about characteristics of languages. And it is true that a statically typed language doesn't require as many tests as a dynamically typed language because there is a whole type of errors that will be stopped. It is also true that on a language that has immutability, there is another whole type of errors that will not happen, because nothing can just change the values. Furthermore, I have found that expressing logic on them creates less cruft code (both for dynamic or typed) than an OOP language.

As a result, they become safer languages. There is less code written to create a feature, therefore the number of parts that can fail is smaller and those parts are much easier to test. The code is simpler (but that doesn't necessarily make creating it is easier).

## Language Division
### Paradigms

The first time I attended NDC London was also the first time I have seen Martin on stage live (on 2014, where I watched presentations by [Scott Wlaschin](https://vimeo.com/113588389) and [Andrea Magnorsky](https://vimeo.com/113716254) that led me to learn F#). On that presentation he talked about the fact that the Functional Paradigm appeared first, then Object Oriented, then Structured (all within a few years, between the late 50s and early 60s), but then the adoption by the general community was on the reverse: We needed to learn to use Structured programming before we could move to OOP; and we needed to do OOP before we were ready to move to FP.

My colleague [Richard](https://codurance.com/publications/author/richard-wild/) points to the fact that you can divide these paradigms based on the constraints that they give you:

* * *
- **Structured programming** imposes constraints on direct transfer of control (GOTOs). It taught us that all algorithms can be broken down into sequence, selection, and iteration, and they can be implemented with control structures that are easier to comprehend than tangled spaghetti code (there's the safety feature).
- **Object-oriented programming** imposes constraints on indirect transfer of control, i.e. dynamic dispatch (function pointers). Function pointers are useful for creating abstractions and inverting dependencies. So OO programming provides a means for achieving these things, managed by the compiler, while removing the ability to create pointers to functions so that you can't shoot yourself in the foot (safety feature).
- **Functional programming** imposes constraints on mutating state. Instead of changing the values of things unrestrained, the language imposes discipline so that you know where the mutating state lives, and the language additionally protects you against synchronization problems (safety feature).
* * *

Looking at the paradigms from the constraints point of view, it makes sense that we went first with structured programming. It becomes much easier to add constraints little by little. The easiest ones first, then the most difficult ones later. We are automating discipline bit by bit into the way that we work.

But we don't only rely on the language for constrains: a recommendation on structured programming, one that wasn't really enforced by the compiler/interpreter of the language, is the avoidance of global state. Is interesting as well that in OOP languages, the recommended way of dealing with the state of objects is to hide the state and only allow access through the public methods of the object. We did recognise that state changes are problematic. 

### Types

Types do represent constraints around the data we can pass around. As such, we are talking about four types here: Primitives, Structures, Objects and Functions (for those languages that treat Functions as [first-class citizens](https://en.m.wikipedia.org/wiki/First-class_function)). But we also talk about two set of behaviours that languages can show: dynamic or static, and strong or weak. The more restrictive a language is, the less errors that can appear in the code. On strongly statically typed languages, the compiler  will help you and stop you from doing things that don't make sense. You will need to provide specific constructs to convert between types (for primitives and structs) or to link logically types together (for objects), like Interfaces, Mixins, Protocols, ...

What types are available, the extent and limitations of those types will indicate the suitability of the language for an specific domain. An example could be the JS Number type compared to the options provided by C#. We know that float numbers are not adequate for the processing of monetary transactions. JS only offers a 64-bit float number type, which is inadequate, while C# provides a decimal type especially designed for such operations. Another is the void pointer on C, that basically allows you avoid constraints on what is being referenced. It looks like a powerful tool, but at the same time it weakens your software, as that void pointer could be anything and you need to start asserting the contents before using it.

### Operation Kinds

In the above definition of Functional Programming we talked about immutability of state. That is one of the two ways that you could have side effects on a program. The second type of side effect that can happen in a program is the communication with external systems to the program: Console, clock, database, web, ... If we follow the idea above that we can establish constraints around different parts of the language, we can as well establish constraints around side effects created by accessing those external systems. I can say that an operation is an effectful operation if they access those systems, and any other operation that calls it, it is, by extension, an effectul operation as well. If you are into Functional Programming, this probably rings a few bells for you. These restrictions exist in Haskell, through the use of the IO Monad, and others. As I was discussing with my colleagues I thought about this construct as separate of type, even if in Haskell they are somehow conflated (though probably, from a design point of view, is the easiest thing to add).

Another example for this idea of constraints regarding the calling of methods that is not directly tied to types is static methods. A static method on most OOP languages can call other static methods of the class, can call static members of the class, but cannot call non-static methods on the object. The only way to call dynamic methods is if the receiving object is either pass as a parameter to the static method or if it is created within the static method.

Could I design a structured language where operation kinds for external access are explicit? I see no reason why not. Could I design an OOP language where operation kinds for external access are explicit? I see no reason why not.

Of course you can go go against what the language provides: If you write an IO function at the deepest level of your Haskell application you still create a valid application. The only issue is that now you have to declare every single function on the chain has to declare also that is an IO operation. The code becomes a pain to write (and probably once you start mixing with other monads means that you need to write an awful lot of unnecessary code).

### Orthogonality

All these possibilities (paradigms, types, and operation kinds) are orthogonal to each other. All these are independent dimensions on which languages can exist. Different combinations produce languages that can be safer or unsafer. These characteristics needs to be understood to know when a language can be used.

## Boilerplate

If I look at statically typed OOP languages, to create something that is maintainable the amount of code that I need to create has always looked excesive. But all those interfaces, all those design patterns perform necessary functions in a system of a minimum size and complexity. Dynamically typed OOP languages tend to require far less boilerplate, you can concentrate on the actual task. It is offset by the fact that you need a very comprehensive test suite to guarantee that there is nothing going wrong on your application due to type mismatch. The compiler will not stop you sending the wrong type of object. Weakly typed languages are the worst on that regard, because you can forcibly coerce any type into another.

The boilerplate (directly through the actual production code or indirectly through tests) is necessary to allow maintainability of a code base while at the same time trying to ascertain it's correct behaviour. But the more boilerplate you have to write, the more likely that an error could be introduced. Could we avoid all this boilerplate?

## Null

[Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), between lots of other stuff, created `Null`. He is recorded as saying (well, I did have the privilege to see him at Code Mesh saying so) that `Null` was [his $1 billion mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare). How many errors have happened (and will happen), because a method/function could return null? How much boilerplate code has been written to check for null values? Why languages do still allow nulls? `Null` doesn't represent anything useful. If something went wrong either we fail the program completely or we indicate some other way what is exactly the issue at hand. `Null` is a meaningless construct of absolutely no interest. `Null` makes our systems more likely to crash.

## Safe(r) Languages?

A lot of boilerplate can be removed through the use of higher levels of abstraction. This is the place where functional languages tend to live in. Creating a loop for the nth time is a waste of time, so functionality like map and reduce eliminates unneeded development. Looping is a solved problem. Same with other constructs. I have to say that OOP languages started to catch up on this and have been offering for some time libraries and functions that provide this functionality (Linq on C# and Streams on Java as examples). The removal of this boilerplate from our code means that there are less places where our systems can fail. Also, it means that we can dedicate more time to the actual task that we need to do, that is solve the need for which we are creating the code.

When code is immutable, it is far easier to reason about it. You don't have to think what external code could modify the parameters and values that you are utilising. That code is also easier to test, because there are less possible options as to what can happen with the code. If you look at what are consider best practices in OOP, we want to restrict who and how can modify an object state. We don't allow unfettered access. Only through the methods that we expose the state can be changed. We don't have the immutability, but we try to limit the mutability. But because we don't have that immutability by default, we are, again, adding boilerplate for a solution that does not provide the same level of safety.

If we are creating software that affects people's live (as in keeping them alive, or not made them broke) should we not use safe languages? It is not irresponsible to use a language which is easy to crash or write code that is incorrect? Multiple failures have been documented created, between other things, by the code that developers have written. Software developers have killed people (unintentionally, not counting weapon's software). Software developers have sent people into bankruptcy because issues on their code. Would you be happy about doing it? Would you care?

There is an spectrum here where we can put languages based on how safe they are, where some languages (C, Javascript) are on one end, and other languages (Haskell, Rust) are on the other end. I do believe that the type of software were people's live it is a stake should only be created with the safer kind. It is not about time to market, it is not about fun coding, it is not hitting the sales numbers.

## My favourite languages

My current favourite language is Clojure (dynamic), and I like quite a lot Elixir (dynamic), Ruby (dynamic), Python (dynamic), and the two main languages on .Net, C# (static) and F# (static with [Hindley-Milner type inference](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system)). ... Well, darn, F# is the closest to a safe language under my above descriptions.

Taking into account what I said above, do they have a place on my toolbox? Well yes, there is still plenty of work that doesn't require those safety measures. And on those areas, any language can be used. Of course, you need to be sure that you don't create code that will completely wipe out a computer unintentionally). Websites that do not process payments, games, library applications, video processing systems, small scripts, ... usually do not have the same safety/security needs. 

I think I need to point here that all general purpose programming languages are Turing complete. What that means is that you could create the same application on any of them. The difference is the difficulty to hit some of the functional and non-functional requirements. Some languages will make fulfilling some requirements easier, some languages will make fulfilling some requirements more difficult. Languages are another tool. You should select the most appropriate based on what requirements are more important.

## Next

I have exposed these general ideas about languages. A following post will talk about Techniques (because they too affect the safety of our code). And then a conclusion (on the same post, or maybe a separate one, ...)


<sub>
Photo: ["Relax for two"](https://www.flickr.com/photos/ljsilver71/15594809946/in/photolist-pL4tFy-VHcszq-7jSLxJ-8s6rV-8jRh4c-4LzZ51-8vQLAD-6hyhot-4wFAm7-4GEgVi-98eqBQ-8MMD3T-5RQ1zi-6WwPZu-5KgdKq-99CYDD-512veB-cHFqk-fnQew4-5twYoy-eorjVa-6SMh7C-fnbKD-8nWT7Q-6Jfb53-5hzYpj-bVRfPz-2bo9zF-4LzXT7-nYpqVw-daupwD-76FZr1-5uineQ-4LvJCP-rdtanu-5CrSDu-d8SX2u-Vf8KaN-6LdgXC-U4WtBe-gwP4K-6LzpPc-8QUSF1-55fFs5-7JcDc2-X2JzLj-E4f3d-4YQKBm-dg12bH-8omyeg) by Ricardo Maria Mantero is licensed under [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/)
</sub>
