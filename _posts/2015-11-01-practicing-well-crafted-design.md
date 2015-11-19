---
layout: post
name: practicing-well-crafted-design
title: Practicing Well-Crafted Design
date: 2015-11-01 18:20:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2015-11-01-incremental-design.jpg
tags:
- craftsmanship
- design
- domain driven design
- DDD
- incremental design
- deliberate practice
---

Katas are great, but not enough. In the past year I’ve been trying to find ways to teach our craftsmen and apprentices how to design software. Although we could discuss good design principles, it was very difficult to find a way to practice them. Katas are great for learning TDD, micro design, working in baby steps, and a few techniques for dealing with legacy code but we need more. We would like to practice requirements gathering, domain modelling, and well-crafted code all together, with the same fast feedback loop we get when we do katas. The problem is that we need a far bigger problem with overlapping rules so that we can experience incremental software design. Inspired by a session we had a [SoCraTes Germany 2015][6], we are evolving a deliberate practice session that allows us to achieve that.

# The Session 
The objective is to pick a game (card, board, dice) and implement the code in a way where the code clearly describes the rules of the game. Any person not part of the group that wrote the code should be able to look at the code and very quickly understand how the game works.

### Setup
The session is run using mob programming. Make sure you have a projector and a whiteboard or flip chart.

### Format

**First step**: People in the mob choose a game and elect a domain expert, who is someone that either knows the game well or will be responsible to figure out how the game works in case no one knows the game.

**Second step**: The mob chooses a driver to be the hands of the mob. 

**Third step**: The domain expert gives a very brief description of the game. 5 minutes maximum. Whiteboard/flipchart can be used.

**Fourth step**: Developers start coding and will need to rely on their ability to ask the right questions in order to extract the information they need from the domain expert.

**Fifth step**: Run a retrospective to discuss what was learnt during the session. 

Set aside *at least* two hours for the session — 100 minutes for the coding part and 20 minutes for the retrospective. The majority of the sessions I ran took significantly longer: 2.5 to 5 hours. 

### Ground rules
In order to mitigate emotional aspects (debates can become quite heated), we created some ground rules for the session. 

* **Give preference**: Don’t force your idea. Always give preference to someone else’s idea. You know how you code and you can always do the exercise on your own later.
* **Don’t shout or interrupt**: Let other people speak. The session is meant to be a pleasant learning experience. If things are not going your way, calm down, sit back and try to learn a different way of doing things.
* **Don’t discuss for too long**: Pick an idea and run with it. We can always refactor later. Avoid analysis paralysis.
* **Constantly move forward**: If the mob doesn’t decide, the driver should start typing and move forward.
* **One idea for at least 10 minutes**: It’s OK to change directions but once the majority decided on one approach, avoid throwing many different ideas at the driver. We need some time for an idea to mature before we move to another one.
* **Objections are noted**: Objections to the current idea are noted in the code or whiteboard if someone is really frustrated, but the team still moves on.

Write the ground rules on a flip chart or whiteboard *before* the session starts and keep them visible at all times. Point at them if the debate becomes heated or someone is misbehaving.

# Tips for running the session
I’ve run this session quite a few times and I’ve learnt different things each time, including how to run the session in a better way. Here are some tips.

### Size of the mob
The smaller the mob is, the better. I recommend a mob of 3 to 5 developers. 

### Driver
Should be someone who is quite fast on the keyboard in order to capture the thoughts of the mob. The faster the driver types, the faster the mob gets feedback and decides on next steps. As the mob will be constantly changing their minds about the implementation (different people, different ideas), it is important that they get fast feedback on how the code would look like.  

I recommend that only one person should type. We don’t want to waste time with people trying to get familiar with a different computer, tools, keyboard, shortcuts, etc. 

### Domain expert
The role of the domain expert is simply to clarify the rules of the game and they can be a referee in terms of the domain language to be used. They have the last say on names of verbs and nouns. The domain expert is not a Product Owner; they don’t dictate which features to build or the order they should be built. The domain expert can contribute to the code as well but not overrule the design decisions made by the mob.

### Facilitator 
Having a facilitator could be a very good idea. The facilitator would be responsible to make sure the discussions remain civilised and that everyone has a say.  

### Games we tried
[Mia][1], [Oh Hell!][2], [The Great Dalmuti][3], [Monopoly][4], and a few others I don’t remember the name of. 

### Boundaries of the games
Make sure the boundaries of the game are defined. For example, use the console as an interface to the game. Maybe some players could be AI players while others could be humans playing through the console. Defining the boundaries will help developers to understand at which level they need to test and how to build the engine of the game. 

# Variations and challenges

Below is a list of things we also tried at [Codurance][5], during [SoCraTes Germany][6], and [SoCraTes Belgium][7].

### Constraints
If the developers in the mob are very experienced, feel free to add [constraints][8] to the session. Just be aware that this is already quite a difficult session and constraints may impede you to practice incremental design. 

### Larger number of developers
If running this session with many developers (community events), you can split them in small mobs (3 to 5 people each mob). Each mob will pick a game and spend around 90 minutes coding it. Once the time is up, each mob individually will put their code in a projector and let the other groups try to guess what game they coded and what the rules were. Mobs should avoid naming their projects or main classes after the name of the chosen game, of course.

### Pick a game no one knows how to play
This was a very interesting session. We had to read the instructions of the game on Wikipedia, understand it, and code it in a very short period of time. This approach forced us to exercise our ability to understand requirements and model them quickly. Quite often, as we discovered new requirements, we had to change the code significantly, which gave us many interesting design insights.

### Play the game before implementing it
Some developers mentioned that we should play the game for a few minutes before trying to implement it. This is a very sensible thing to do: we would all understand the game better and hopefully produce a better code. This can be done to make the session easier. However, in our day-to-day job, it’s not always possible to “play" requirements we get from Product Owners (or whoever is in charge of the requirements). Not playing the game before coding will keep the session closer to reality, that means, we will need to rely on our ability to ask the right questions to the domain expert in order to get the information we need. Figuring out what to code and when is also a good skill to practice.

### Trying with a real team and domain expert / product owner
We haven’t done this yet but we think it could be a very interesting idea to run this exercise with a real team. The product owner (or whoever is in charge of the requirements) would play the role of domain expert. I believe that this would help the team to gel and also help product owners have a better appreciation for the effort that goes into taking requirements and coding them. 

As the domain expert (played by the product owner) introduces new rules, developers will need to refactor the code or even throw a big chunk of their code away. The product owner will see the impact that new features have in the code and what developers have to go through to make things work. The language used by the domain expert can also significantly influence the complexity of the code. 

The problem we foresee here is that the domain expert will get bored quickly if the team is not very experienced and fast. It’s very important that developers keep discussions focused and keep making process. 

If anyone tries this session with a real team and a real product owner, please drop me a line at sandro at codurance dot com. I would love to know more about your experience. 

### Why games?

Board, card, and dice games normally have their rules very closely related to each other, providing us with a very rich domain. Implementing new rules will always force us to refactor or completely rewrite something that is already in there. The rules are normally quite easy to understand but quite complex to implement, which means that we can focus on the modelling/coding side instead of wasting time trying to understand a complex domain before writing any code. 

# Summary

This is an advanced hands-on session. It’s not a session that should be used to learn basics of TDD, a new language, or software design. This is not a session for everyone to have a bit of play on the keyboard either. Developers in the mob must be very familiar with different TDD styles and many design principles in order for this session to work well. 

This session was created so we can practice how to design software quickly and well, which includes constantly talking to the business, understanding requirements, defining a ubiquitous language, and of course, write well-crafted code that represents the problem domain. 

Thanks to everyone at [Codurance][5], [SoCraTes Germany][6], and [SoCraTes Belgium][7] who participated in the mob sessions and contributed with ideas to evolve the session. 

[1]:https://en.wikipedia.org/wiki/Mia_(game)
[2]:https://en.wikipedia.org/wiki/Oh_Hell
[3]:https://en.wikipedia.org/wiki/The_Great_Dalmuti
[4]:https://en.wikipedia.org/wiki/Monopoly_(game)
[5]:http://codurance.com
[6]:https://www.socrates-conference.de/
[7]:http://www.socratesbe.org/
[8]:https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=code%20retreat%20constraints
