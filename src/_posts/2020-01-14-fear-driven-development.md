---
layout: post
asset-type: post
name: fear-driven-development
title: Fear Driven Development and How To Tackle It
date: 2019-11-11 16:00:00 +00:00
author: Sam Davies
description: A look at Fear Driven Development and how to tackle it
image:
   src: /assets/custom/img/blog/worlds-strongest-architecture.jpg
   attribution:
      text: Photo by Luis Reyes on Unsplash
      href: https://unsplash.com/photos/mTorQ9gFfOg
tags:
- software
- decision-making
- legacy-code
---
On the internet there are a few different perspectives on Fear Driven Development (FDD). The
perspective I want to focus on here is below:

> The impact of fear on decision making whilst one is making software changes to a system.

Close your eyes and imagine someone looking at some code on a computer screen, they need to make
a change to that code. They then do something you would not expect, and you want to ask them why
they chose to make that decision (you can't, because they are in your imagination). This decision
was not driven by rational thinking, it was driven by something far worse. That is where we will
focus our attention in this article. The code. 

## 1. Where the fear starts
FDD is alluded to [in the C2 wiki](https://wiki.c2.com/?FearDrivenDevelopment) as "maintaining the
code is hard because you don't know what unintended effects your changes have" in reference to
what is known as "legacy code". Let's start there and define what legacy code is:

> Code that you are afraid to change 

Nice and simple right? That definition is simple, and deliberately so. The focus of this post is not
to define what legacy code is.

In another post by [Scott Hanselman](https://www.hanselman.com/blog/FearDrivenDevelopmentFDD.aspx)
there are descriptions of FDD pertaining to organisational fear and the fear of losing your job. 
However, we will focus our attention on the small section at the bottom about changing code.

So where does this fear start? Well, it could be some of the
following:

* unfamiliar with codebase
* new to the team (and don't want to screw this up)
* lack of context of what needs to be done
* pressure from others on this change (e.g. management)

Let's take a closer look at each of these, adding some more context.

### Unfamiliar with codebase
You arrive for work one day and your manager (if you have one) informs you there is a requirement
for something to be changed on system x. The name system x rings a bell, was it from a water cooler
chat last week? You know what's coming. They ask who would like to volunteer to implement this
change in the dark and mysterious system x. So like the good person you are, you raise your hand
and announce "I will!". Everyone is staring at you, in envy of your bravery.

You now wonder what you have got yourself into, and soon you will find out.

After you clone the project, you search in vain for a README, this search continues as you tell
yourself "there must be something to tell me about this system". Well sadly for you there isn't,
this project was finished two years ago and the third party who built it left immediately.

Without any documentation or anybody to ask, you are left all alone. Sure you can ask for help
but nobody will help because everyone who knew anything about the system left a long time ago.

The scenario I have just described can create fear.
### New to the team
Day one, an exciting day indeed. It is your first day on your new team, you want to be accepted by
your new team, and so feel the need to prove yourself (no bread jokes here). It is the standup and
you are extremely excited to pick up a story, so like Mr Unfamiliar in the previous scenario, you
volunteer.

As you settle in back at your desk, the reality sets in. Sure, you know the language and have been
using it in production for a while now. But as you get further and further into the ticket, you
realise you might have to change a few different parts of the system. This feeling of not wanting
to screw up your first feature on the new team fills you with fear:

* "what if I break something?"
* "how will the team lead react?"

The scenario I have just described can create fear.
### Lack of context
This can be found in the both the previous sections, in that Mr Unfamiliar:

* did not have any documentation to work with
* had not previously worked with the codebase

and Mrs New:

* possibly did not have sufficient knowledge of the system in her new team

Therefore, these can categorised as symptoms of fear, they culminate with other factors to create
a recipe for FDD.

Context is everything, and if I have not done a good enough job of setting this at the start of
the post, then you will probably be wondering what I am talking about right now. As a reader, did
the fact that I switched the format from the previous section throw you? Context is delicate, and
assuming that you incorrectly framed a piece of information, the recipient(s) of this will now have
a broken-context.

Many of have a broken-context, and some examples are below:

* a user story where the details are vague and fuzzy
* unsure why a particular story is relevant
* uncertain how your team fits into the bigger picture

To keep scope-creep from happening here, I will leave it as that. Just be aware that a lack of
context can be a contributing factor to FDD.

### Pressure from others
"Is it ready yet?" is the sound of your manager. Now, you like your manager, but the way he seems
stuck to your desk when something "needs" to be delivered can sometimes be distracting. This is the
story of pressure, and how it can evoke fear.

The pressure applied to you by your manager might make you fearful of what you are doing. It might
even result in you doing something that is rushed an could actually make the system worse.

The scenario I have just described can create fear.

## 2. Where the fear leads
We have looked at what can create fear, now we look at what fear can do. In particular, what havoc
fear can reap on a codebase. It might start small, but as the FDD is practised time and time again,
the codebase suffers.

Let's look at some code examples of how FDD can manifest itself.

### Append-only programming
Imagine the following is a method within a system

```
method save(people) {
    for each person save them to the database
    ...
}
```

Now one day there is a requirement to also save products in a system, fear could cause someone to do
the below:

```
method save(people, products) {
    for each person save them to the database
    ...

    for each product save them to the database
    ...
}
```

Resulting in a method which now saves people and products, the programmer has appended a new
feature to an existing feature, without considering whether this is the right thing to do. This is
what fear does, it makes us miss things, a step in a process.

Furthermore, what if there is a requirement to save dogs in the system 
(what kind of system is this), if FDD takes the guise of append-only programming you might see:

```
method save(people, products, dogs) {
    for each person save them to the database
    ...

    for each product save them to the database
    ...

    for each dog save them to the database
    ...
}
```

Many could argue "well it's all in one place isn't it?". This is true, it most definitely is and
this is in danger of becoming a very large and unwieldy method, with low cohesion. It does not stop
there, it also means:

* merging code is going to be a nightmare due to many people touching the same method for multiple
reasons
* it is much harder to identify who owns this method, due to the "save whatever you want" code
present in there
* more time consuming to implement features because you will have to resolve merge conflicts very
frequently

The cascading effects of append-only programming are very real, and will have could have been
mitigated by taking more time, with the absence of fear, to think about the change being made to
a software system.

### Copy and paste programming
There are other ways FDD can inflict pain on a codebase, one such way is copy and paste programming.
Let's look at an example to help demonstrate this. Imagine in a codebase there is some code which
retrieves data from a database, namely selecting all products where their price is greater than
£100:

```
method getProductsOverOneHundredPounds() {
    select all products where price is greater than £100
    return products found
}
```

Now the above is pseudo-code, but imagine that in the actual code the first line of the method
contains some SQL query that will be responsible for selecting the products, based on the
aforementioned criteria.

What if, due to fear a programmer when having to perform the exact same query copies the code
elsewhere:

```
method getProductsOverOneHundredPounds() {
    select all products where price is greater than £100
    return products found
}

method howManyProductsAreOverOneHundredPounds() {
    select all products where price is greater than £100
    return how many products found 
}
```

Now this choice means that the SQL required to execute this query is now spread over two places in
the codebase. This will create many problems:

* if the query is to be changed (e.g. schema changes), it has to be done in two places, and a
developer won't necessarily know this is the case
* who owns the data? Should the second method know how to get this information, or should it simply
call another part of the system (e.g. `getProductsOverOneHundredPounds`) to get this
information (not knowing or caring how this is done)? This can be achieved by modularising code in
your codebase.

### Tunnel-vision programming
This infliction on a codebase can be found in both the aforementioned examples. It is simply when
one is so focused on a particular task, that they do not step back to see the bigger picture. You
are so concerned with implementing feature x, that you do not consider how it fits together with y
and z.

Tunnel-vision programming could be described as selfish, I might be tempted to define it as the
below:

> Satisfying one's immediate needs whilst degrading the health of the codebase

Now, this can happen with or without fear. There are many different types of people working on
codebases all around the world. Not all of them will be motivated to keep a codebase tidy, the
decisions made might be driven by many factors, including fear.

## 3. Where the fear stops
Everything before now has provided context of how a codebase can be negatively impacted by fear,
now I want to look at some techniques and tips for how we can avoid FDD being practised on our
codebases.

### Tests
The title above is simple. Having meaningful tests can instill confidence that you are not breaking
anything. If you are a practitioner of TDD, then this will also help you to have confidence, and
most importantly for me, structure to how you work.

If you want to come along and change the below:

```
method getProductsOverOneHundredPounds() {
    select all products where price is greater than £100
    return products found
}
```

And in the codebase there is also a test for this:

```
method testForGetProductsOverOneHundredPounds() {
    get result from getProductsOverOneHundredPounds
    
    result should equal expected result
}
```

Then when you are going to make a change in `getProductsOverOneHundredPounds`, you will get quick
feedback that something has been broken by the change you have made, because you will have run the
tests (say it once more!). For instance, you might "accidentally" have changed the code to:

```
method getProductsOverOneHundredPounds() {
    select all products where price is greater than £1000
    return products found
}
```

Fortunately your test might catch that extra `0` you added and you can revert your change. No fear.

### Taking a step back
The technique of taking a step back from a situation is a skill that is not just appropriate for
creating and designing software. However, in a software context it can be practised by methods such
as the below:

* having breaks during pairing sessions to reflect on what was done in the last session
* taking time to review the design of a codebase/system at regular intervals
* before rushing to merge some code, spending some time reading your code, analysing it
* get someone else's view on your code/decision (feedback)

Now if this all sounds simple, there is a good reason for this. It is simple to explain but often
people find this difficult in practice. For example, factors such as an inflated ego could mean
that one rushes their code to be merged, without accepting the fact that it could be in a better
place first.

It is important to note for readers not to take this advice to the extreme. Don't spend 10 days
agonising over the name of a method/function, or spend months reviewing the design of your system.
Of course, everything depends on context and spending 10 days agonising over the name of a method
might be acceptable if you are a maintainer of a library where the public interfaces you provide
to your consumers are of paramount importance. It depends!

## A final message
This post provides examples of how fear can start, and where it can lead. As a reader (and maybe a
developer/programmer/wizard) you are in control, it is your decisions and those of your teammates
that will decide whether your code is consumed by fear, or guarded by courage.

We are all in this together trying to do our best, and if you spot someone practising FDD, help
them out and share the wisdom.

If you enjoyed this please reach out to me on [Twitter](https://twitter.com/Software_Sam_D) and
share with others.