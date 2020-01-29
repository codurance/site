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
- architecture
---
On the internet there are a few different perspectives on Fear Driven Development (FDD). The
perspective I want to focus on here is below:

> The impact of fear on decision making whilst one is making software changes to a system.

Close your eyes and imagine someone looking at some code on a computer screen, they need to make
a change to that code. They then do something you would not expect, and you want to ask them why
they chose to make that decision (you can't, because they are in your imagination). This decision
was not driven by rational thinking, it was driven by something far worse. That is where we will
focus our attention in this article. The code. 

## Where the fear starts
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

## Where the fear leads
We have looked at what can create fear, now we look at what fear can do. In particular, what havoc
fear can reap on a codebase. It might start small, but as the FDD is practised time and time again,
the codebase suffers.

Let's look at some code examples of how FDD can manifest itself.
### Append-only programming


### Copy and paste programming

### Tunnel-vision programming