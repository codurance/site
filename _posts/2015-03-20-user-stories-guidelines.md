---
layout: post
name: user-stories-guidelines
title: User Story Guidelines
date: 2015-03-20 21:22:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2015_03_20_user_stories/user_stories.jpg
tags:
- craftsmanship
- quality
- agile
- codurance way
- user story
---

_Disclaimer: This post was extracted from an internal Codurance document used to help our apprentices to learn how we work. We all understand that each project is different and that by no means we can apply exactly the same techniques and practices everywhere. However, the text below serves not only as a foundation but also as a guideline for all of us when it comes to user stories. There are many good books and posts written about user stories. By no means this post is meant to be a summary of all the good practices around this area._

User stories are a good way to gather requirements, agree on what needs to be done, and provide visibility of the work being done to clients. They also help us prioritise the work to be done according to the value they add at a given point in time.

Below are a few guidelines in how we work with user stories.

## Capturing requirements

The main objective of creating user stories is to understand what needs to be done. They document the expected behaviour that an application needs to provide. This is best achieved through a close collaboration between product owner (who represents the business needs and are in charge of priorities) , business analysts, QAs and the rest of the development team.

## User story lifecycle

User stories start as an idea for the behaviour. This behaviour must also be associated to some value that will be added to the business once implemented.

At first, a user story is just an idea and it only has a title describing the behaviour expected, with no details on. E.g. Music Player, Report fixed income trades, Display user feed. Product Owner elicits the stories from the business. Team members may also add stories to the product backlog in collaboration with the product owner.

The Product Owner must prioritise the stories that the development team will work on in the next iteration. This is done by moving the stories to the top of the product backlog, in order of importance. This is done for just a few stories, not all. The stories at the top of the backlog have the highest business value at that point in time.

Once stories are prioritised, they should be refined. At this point the Product Owner will start specifying the behaviour expected. They will enough details so that the developers have enough information to start implementing the story. 

## User story refinement

A story must have the following:

1. The value that it brings to the business (or specific actor/role)
2. The detailed description of the behaviour expected, preferably with some examples, if applicable.
3. The acceptance criteria, that means, everything that needs to be done by the development team so that the product owner can “accept” the story (agree that the story is done.)

## User story template

The _original_ template for a user story was:

    As a <actor/role>
    I would like to <desired action>
    So that <business value>

Our preferred template is:

    In order to <get some value>
    As a <actor/role>
    I would like to <desired action>

The latter template helps us focus on the business value first. In many occasions, when using the default template, we were able to complete the first two steps and struggle to complete the third. The problem with not focusing on the third step is that we may end up building features that don’t really have any business value. Focusing on writing the business value first, forces us to discuss the real relevance of the story.

Besides the business description, a story should be enriched with examples whenever possible.

The final part is the Acceptance Criteria. This is where we describe details of the expected behaviour including the edge cases. The acceptance criteria is what is used by the product owner to “accept” a story. Acceptance Criteria is the ideal source for the automated tests. 

### Example Story 1: Credit Card Payment

    In order to buy the items I need
    As a customer
    I would like to specify the credit card I want to use.
    
    Acceptance criteria
    
    * User must to have at least one item in the shopping basket in order to go to make the payment
    * £2.00 fee should be added when amount to be paid is less than £10.00
    * Accepted Credit Cards are: Visa, MasterCard, and American Express

### Example Story 2: Playlists

    In order to easily find and listen to my favourite songs
    As a music fan
    I would like to organise my songs into playlists.

    Acceptance criteria

    * A playlist can be empty
    * A song can be added to multiple playlists
    * A song can only be added once to a playlist
    * Playlists should have a unique name
    
    Examples

    | Playlist name | Songs                                 |
    | Punk/Rock     | God Save The Queen, American Jesus    |
    | Classic Rock  | Sultans of Swing, Sweet Child of Mine | 
    | General       | Sultans of Swing, Censura             | 


_Further reading: [Specification by Example](http://en.wikipedia.org/wiki/Specification_by_example)_

## Breaking stories into tasks

In order to estimate a story, developers should break down the stories into technical tasks. Each task should reflect a small and measurable piece of work. 

**Task for Example Story 2: Playlists**

Let’s assume we are building a web application with AngularJS in the front end and Java, Dropwizard, and MongoDB in the backend. 

1. Define the API used by the front end.
2. UI changes for capturing a new playlist name (see mockup)
3. Dropwizard endpoint for playlist creation
4. Playlist service / repository interface
5. Playlist persistence on MongoDB
6. UI changes for adding songs to playlist (see mockup)
7. Dropwizard endpoint for adding songs to playlist
8. Persist songs added to playlist in MongoDB

Should items 7 and 8 be part of this story? The short answer is _no_. Although related, the tasks represent two different concepts: creating playlists and adding songs to playlists. More about that below. 

### Breaking stories in to smaller stories

Sometimes we know we need to break a story into smaller stories just looking at the name or description of it. E.g: Process a trade, Music player, etc. What type of trade? How many types do we have? Do they have different rules? Even processing a single trade can be massive. Do we need to enrich the data? Do we need to report the trade to different regulators? Do the trades come from a single source? Do they have the same format? We can also have loads of questions about a music player. Are we playing music that is stored locally? Are we streaming? If yes, from which sources? How many formats should we support? Should we be able to fast-forward, pause, and rewind? Do we start playing a song from where we stopped previously? Do we display any information about the song being played? If yes, where do we get the information from?

As you can see, we cannot have a story that caters for an entire feature. Another way of putting it is, Processing a Trade and Music Player are not stories, they are features. Features are often referred to as epics however we believe that feature is a better term.

When refining stories, it is our job as developers to ask all these questions to the product owners. Depending on the answers, we should create stories that will represent the different behaviours.

#### What happens when the product owner doesn’t know the answer?

Well, there are a few possibilities here. Sometimes it is possible to help the product owner giving a few suggestions and explaining the cost/trade-offs of each one of them. Sometimes the whole team can just brainstorm ideas and pick one. However, depending on the domain, developers may not be equipped with enough business knowledge to even make suggestions. In these cases, we can create a story representing the behaviour being discussed and add it to the backlog. Whenever the product owner gets an answer, she will then prioritise that story or simply delete it from the backlog. 

## Estimation

There is a big debate about estimation. However, the debate is more about estimation in general, mainly big up-front estimation (search for #noestimates hashtag on Twitter for more.)

We find the act of estimating top priority stories valuable, mainly in cases where the team is not mature enough (doesn’t master all the technologies used in the system, communication with business is not optimal, lack of business domain, etc.)

Estimating a user story forces us to think about all the technical tasks we need to implement in order to complete the story. Once we have the list of tasks, we can then start estimating them in isolation. Let’s take the tasks for the Playlist story:

1. Define the API used by the front end (2 hours)
2. UI changes for capturing a new playlist name (3 hours)
3. Dropwizard endpoint for playlist creation (2 hours)
4. Playlist service / repository interface to add playlists (2 hours)
5. Playlist persistence on MongoDB (1 hour)
6. UI changes for adding songs to playlist (12 hours)
7. Dropwizard endpoint for adding songs to playlist (2 hours)
8. Persist songs added to playlist in MongoDB (1 hour)
9. [ADDED] Playlist service / repository interface to add songs to play list (3 hours)
10. [ADDED] Notification event that new playlist was created (2 hours)
11. [ADDED] Notification event that song was added to playlist (2 hours)

### Estimation side-effects

When trying to estimate the tasks, we realised we forgot a few tasks (9, 10, and 11), so we added them. The total hours estimated for this story is 32 hours. Adding more tasks made it clear that this story must be split into two: create playlists and add songs to playlists.

Another interesting thing about estimating this story is that we now noticed that if we count our days as if they only had 5 productive hours (uninterrupted coding hours), this story would take approximately 6.4 days. This is a little too big for a user story, which is another reason to break the story in two.

#### How small is small?

Think about Single Responsibility Principle (SRP). Yes, the one from SOLID. Our user stories should represent a single, small, and testable concept.

As a guideline, a story should not be bigger than 1/3 (one third) of an iteration. That means, if you are working on a two-week iteration, stories should not be bigger than 3 days. Tasks, on the other hand, should not be bigger than half-day (2 to 4 hours.)

## Spikes

Let’s take the following task as an example:

    5. Playlist persistence on MongoDB (1 hour)

If this is the first task where we needed to use MongoDB and we never did any MongoDB persistence in the past, there is a chance that we don’t really know what we need to do and how long it is going to take. We need to research a little bit, maybe even try a few things out before we can estimate the task.

That’s what spikes are for. Spikes are a time-boxed investigation activity where the outcome of it is documenting the results of the investigation and also stories and tasks refinements, including estimations. Once we spend a day or two investigating how to install, connect, and store data on MongoDB, we are in a better position create/adjust tasks and estimate them. 

**Spikes should not be done as part of a story**

Spikes are done in isolation, never as part of a story. If the story depends on the investigation done by the spike, the spike should be prioritised and the story should remain on the backlog. Once the spike is done, the story can then be refined and scheduled to the following iteration. 

Spike is a special type of story where the value is a better understanding of what or how something can be achieved.

## Technical stories

Generally, they should be avoided. We should only have stories that provide business value. Technical tasks should be added to business stories instead. The reason for that is to always focus on delivering value to our customers instead of going crazy with architecture and infrastructure.

### When to use technical stories

Technical stories are quite common at the beginning of a project. There are many things that need to be in place before we start working. E.g. Continuous Integration, UAT/Test environment, source control, etc. There is also loads of infrastructure/architecture work that needs to be done in order to satisfy the first stories. E.g. Create databases, package and deploy the application, etc. On top of that, there are always non-functional requirements that also need to be met. E.g.: performance, security, logging, etc. 

#### Express business value

Technical stories cannot be ignored. However, when writing them, we need to express the business value they bring. E.g. Protect users data, support a bigger number of concurrent users, improve the user experience with better response time, etc.

Expressing the business value of a technical story is extremely important. This gives the business a better understanding of why certain things need to be done. Business can also analyse the risks of not doing certain things and prioritise them accordingly. 

### Technical versus Business stories

Whenever possible, we should not have infrastructure/architectural tasks inside business stories. E.g. We should not have a task related to add databases to a cluster in a business story about creating a client.

Non-functional requirements like performance improvement, caches, clusters, communication protocols, should have their own technical stories. 

## I.N.V.E.S.T.

The INVEST mnemonic was created by Bill Wake as a reminder of the characteristics of a good quality user story, as may be used in a Scrum backlog or XP project.


* **I**ndependent:	 The user story should be self-contained, in a way that there is no inherent dependency on another user story.
* **N**egotiable: 	User stories, up until they are part of an iteration, can always be changed and rewritten.
* **V**aluable: A user story must deliver value to the end user.
* **E**stimable: 	You must always be able to estimate the size of a user story.
* **S**calable (small sized): 	User stories should not be so big as to become impossible to plan/task/prioritize with a certain level of certainty.
* **T**estable: The user story or its related description must provide the necessary information to make test development possible.

For more about INVEST, check its [wikipedia page](http://en.wikipedia.org/wiki/INVEST_%28mnemonic%29)

## Why should we care about all these?

There are a few reasons to why we do all the things described above:

* **Visibility:** Working in small increments provides good visibility of what has been done, what is being done, and what is left to be done. Tasks and stories are constantly on the move, navigating quickly through the different lanes in our Scrum boards, from _TO DO_ to _DONE_.  
* **Feedback:** Business and development team have a constant feedback of how things are going. This allows both to react quickly and change priorities. If something goes wrong with a story, we may only loose a few hours or days of work and not weeks or months. 
* **Team morale:** Morale is always up when we constantly achieve goals, that means, moving tasks and stories to done.
* **Agility:** Working in small batches allow us to deploy often, get feedback quickly, and adapt when necessary.
* **Team organisation:** With well-define and small stories and tasks, it is easier to split and parallelise work.

_This post was written by Sandro Mancuso in collaboration with Mashooq Badar._ 