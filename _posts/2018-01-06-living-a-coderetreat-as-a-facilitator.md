---
layout: post
asset-type: post
name: living-a-coderetreat-as-a-facilitator 
title: Living a Coderetreat as a facilitator
description: Details, thoughts and lessons learned about Global Day of Coderetreat 2017 in Codurance Barcelona
date: 2018-01-06 18:00:00 +00:00
author: Raquel M Carmena
image:
   src: /assets/img/custom/events/global-day.png
tags:
- coderetreat
- GDCR
- craftsmanship

---

Last 18th of November, I lived my first experience facilitating a Coderetreat. We celebrated the <a href="http://coderetreat.org" target="_blank">Global Day of Coderetreat</a>, an annual event in which Coderetreats take place simultaneously around all the world.

For those people who never attended a Coderetreat, it's a full day event where the same problem is faced with different constraints. It's a way to practice and improve our craft, experimenting, sharing and learning new things. Coderetreats started at 2009 and the current format came out at 2010.

## Before the event

Global Day of Coderetreat organization provides a lot of resources to prepare yourself as a facilitator: videos, blogs, online hangouts to solve doubts, ... In my case, I was lucky, because I also had the help of my awesome colleague **<a href="/publications/author/robert-firek">Robert Firek</a>**, who accumulates a lot of experience facilitating Coderetreats and he gave me a lot of advice and ideas.

On the other hand, I like this kind of events, because it helps to create community among us. For example, I had the opportunity to meet people from Wallapop, who also organized the event in Barcelona. We had an interesting meeting in which we reviewed all the items for the event, filling a table with cards about:

- Introduction
- Previous organization
- The role of a facilitator
- Plan for the event

## The event

### Plan of sessions

Each session has a set of constraints to break comfort zones and make you think in a different way. We prepared this plan of sessions:

1. Learn your domain.
2. Several constraints to choose: no loops, no conditionals, no naked primitives, ...
3. Baby steps
4. Missing tools
5. Object Calisthenics
6. Swapping stations

There were common rules for all the sessions:

- Test-Driven Development
- Following the 4 Rules of Simple Design (4RSD):
    - Tests pass
    - Reveal intention
    - No (knowledge) duplication
    - Small

### The challenge

The problem to solve in a Global Day of Coderetreat is <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life</a>. It's a game which starts with an initial generation of living cells on a board and it evolves automatically to next generations with these rules:

<center>
<img src="{{site.baseurl}}/assets/img/custom/blog/2018-01-06-living-a-coderetreat-as-a-facilitator/rules.png" alt="Game Rules" class="img img-responsive"/>
</center>
<br/>

Maybe you ask yourself: the same problem all the years? It seems a simple problem, but it has an infinite number of ways to solve it. I could check it that day, because during the first session, no pair made the same approach to each other. Besides that, constraints help to make this problem more challenging.

I helped pairs in order to realise about certain issues, for example:

- Modelling state with 0 or 1 and having conditionals with these values. This choice violates <a href="http://wiki.c2.com/?OpenClosedPrinciple" target="_blank">OCP Principle</a>. _'What if must we consider zombie cells?'_
- <a href="http://wiki.c2.com/?DataClumps" target="_blank">Data Clump</a> with cell coordinates. It causes duplication of knowledge about the topology of the board. _'What if I asked you about having another dimension? How many places would you have to change?'_
- _'What are you saving in this variable?'_ My questions showed that naming wasn't clear.
- Lack of encapsulation, revealing internal details in test code.
- Using test names not corresponding with the content of the tests. 
- _'Why are you saving the state in each cell if you have the living cells in a specific list?'_ Last two points violate <a href="http://wiki.c2.com/?PrincipleOfLeastAstonishment" target="_blank">P.O.L.A.</a>
- Focus on testing the state of the board without thinking about testing the behaviour firstly. When starting with the expected behaviour, tests about state of the board will come out. The book <a href="https://leanpub.com/4rulesofsimpledesign" target="_blank">Understanding the 4 Rules of Simple Design</a> by **Corey Haines** has a detailed chapter about it.

My favorite session was the last one: swapping stations. Source code is not deleted at the end of the previous session and pairs write what they do and don't like about their code. Secondly, pairs move to the following station and then, they work on another pair's code trying to improve it. Among other things, they liked:

- Located mutability
- Separation of Concerns (SoC)
- Design
- Naming
- Short methods
- Simplicity
- Following TDD
   
and for improving:
 
- Visibility of methods
- Readability
- Encapsulation
- Long methods
- Next generation calculation
- Over-engineering

And I loved the moment _'Please! How can we compile Go code?'_. Pairs not only faced challenging improvements, but also unknown programming languages. So, collaboration happened not only in pairs, but also between pairs. It was awesome.

### Code is deleted after each session

One of the most difficult things for attendees was following the recommendation of deleting the source code at the end of each session. I encouraged to do it because of several reasons:

* For giving more value to the moment they were living. Code is removed and learning is kept.
* For not worrying about their mistakes during the sessions, practicing without fear, trying new things.
* For avoiding _The Lord of the Rings_ feeling: "My precious!". Unconsciously, it helps us to lose the feeling of ownership of the code.
* For emphasizing the idea of not finishing the solution in each session. They might be relaxed and enjoy the _journey_ of decisions to solve the problem.

### New pairs each session

Most of attendees had never practiced pair-programming, so they found it difficult to change their pair when attending with a friend.

As usual, pair of friends were together during the first session, but they changed their pair the following sessions.

### Final retrospective

In order to have food for thought before the final retrospective, I provided green and red post-its to write ideas for the positive and improvable things, respectively. 

The main answers in the _closing circle_ were:

- What, if anything, did you learn today?
    - Thinking in a different way because of constraints
    - Learning from other people with different points of view through pair-programming
    - Practising new programming languages
- What, if anything, surprised you today?
    - Learning both theory and practice
    - The environment and funny time
    - The number of different versions could be done with a simple problem
- What, if anything, will you do differently moving forward?
    - TDD
    - Pair-programming
    - Continue practising with new languages

## Lessons learned

After the feedback received and my experience, I took this notes for the next event:

* Adapting the plan of sessions to the circumstances, because I was very rigorous with the plan and I think I interrupted both experiments and interesting conversations among attendees. 
* Giving advice for testing new languages only when the other member of the pair knows that language, because some of them spent a lot of time preparing their environment to try other languages.
* _The cobbler should stick to his last_. Attendees had drinks and food during the whole day, but I would have had to buy more food for lunch time.
* Organizing all retrospectives in circle, not only the final one. We commented the sessions standing but next to the tables, so it wasn't easy to see all the faces and a circle would have encouraged more the participation.
* Starting with a session about thinking the problem on paper, as our old colleague <a href="/blog/author/samir-talwar" target="_blank">Samir Talwar</a>:
<center>
<blockquote class="twitter-tweet" data-lang="es"><p lang="en" dir="ltr">First session: no computers! <a href="https://twitter.com/hashtag/GDCR17?src=hash&amp;ref_src=twsrc%5Etfw">#GDCR17</a> <a href="https://t.co/76EkvwJUIN">pic.twitter.com/76EkvwJUIN</a></p>&mdash; ✈️ flight risk ✈️ (@SamirTalwar) <a href="https://twitter.com/SamirTalwar/status/931822781490237440?ref_src=twsrc%5Etfw">18 de noviembre de 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## Acknowledgments

Thanks:

* **Codurance**, for this opportunity.
* **Global Day of Coderetreat** organization, for their kindness and keeping this event alive year after year.
* <a href="https://www.meetup.com/es-ES/Barcelona-Software-Craftsmanship" target="_blank">Barcelona Software Craftsmanship Community</a>, for promoting the event.
* my colleague **Robert Firek**, for his ideas, advice and support.
* my colleagues **Erik Torres** and **Nacho García**, for their support, before, during and after the event. It would have been impossible without their great help.
* my colleagues **Iván Badia** and **Daniel Pérez**, for attending the event and sharing time together.
* **Josep Ferrer**, **Eloi Poch**, **Juan Luis Ozáez**, **Gerard Llorente** and **Luis Ascorbe** from Wallapop, for their trust.
* my old colleague **Edu Saborit**, for sending me greetings (= energy) from Valencia.
* **DevScola Valencia**, **Software Craftsmanship Gran Canaria**, **Asturias Hacking** and **Software Crafters Madrid** for being there. We felt close to you.
* **Lambda World Conference 2017**, for Cádiz Carnaval mirliton, which I used to announce the final of each session ;)
* and last but not least, attendees, without whom this event wouldn't have made sense. Special thanks for your feedback, because it's very valuable.

This event allowed me to meet awesome people. I would like to mention **<a href="https://twitter.com/nyan_dev" target="_blank">Meritxell Calvo</a>** and **<a href="https://twitter.com/dcarral" target="_blank">Daniel Carral</a>**, who I admire for their active involvement in the community. I hope to devirtualize them very soon!
