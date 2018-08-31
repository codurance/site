---
author: Christian Panadero Martinez
layout: post
asset-type: post
title: "Zenika craftsman swap"
date: 2018-08-31 08:01:00
description: Summary and lessons learned during my craftsman swap in Paris
image:
    src: /assets/custom/img/blog/2018-08-30-craftsman-swap/zenika.png
tags:
- software processes
- software craftsmanship
- agile
- xp
---
The past week of the 6th of August I did a craftsman swap and I would like to share how was my experience, the lessons that I've learned and how fun it was.
On the week of 6th of August I took part on a craftsman swap between [Zenika](https://www.zenika.com/) and Codurance and I would like to share my experience, the lessons I’ve learned, and how much fun I had. While Zenika was hosting me in Paris, Codurance hosted [Abdellah Zeroual](http://twitter.com/abdezeros) in London 

A craftsman swap works basically like a student exchange where in this case Codurance and Zenika will exchange a craftsperson for a week. In this week you will be working with different people, in different projects to have an overall idea on how the other company works and it is a good place to interchange ideas, find differences in our workflow and basically bring fresh ideas back home.
A craftsman swap is an exchange of craftspeople for a week. Each company sends a craftsperson to work for a week with the other company. During that week, the hosting companies provide an environment where the visiting craftsperson can work with different people and different projects, with the objective to share and learn skills. Besides technical skills, the visiting craftsperson also shares how their company is organised and run and also learn how the hosting company is organised and run. The main idea behind the craftsman swap is to have cross-pollination of ideas across companies and help our industry to evolve.

Below is the summary of my week at Zenika Paris.

# Zenika

<img href="/znk.png"/>

Zenika is a French company with multiple offices in France, Singapure, and Canada, that like Codurance embraces XP practices and <a href="http://manifesto.softwarecraftsmanship.org/">Software Craftsmanship principles and values</a>. Zenika  also organizes meetups and events as you can see in their <a href="https://www.zenika.com/agenda/">agenda</a> page.

# Days 1 & 2 - Zenika Labs

Zenika Labs is an internal agency within Zenika that offers multi-competencies teams focused on creating MVPs and validate customer hypothesis. In this particular project, they were using Typescript + Angular for the frontend and Spring boot for the backend, which was great because I usually work with Javascript/Typescript + React and NodeJS so it was an opportunity to explore different technologies.

On Monday morning I worked with Florian who showed me how the project was structured and invited me to pair on one of the user stories he was working on. We test-drove all our changes, including changes to the database. After a few iterations, we refactored some areas where we had introduced duplication while making the changes. Working on this task first thing in the morning helped me to understand the overall architecture of the project. 

In the afternoon I paired with [Romain](https://twitter.com/RomainVernoux), who showed me how they organised their testing strategy. It was really interesting to see that apart from unit tests, they also have Cucumber tests with two levels of implementation. The first is an end-to-end test and the other is for the frontend in isolation, allowing us to test the system from different angles but reusing their business rules described in the feature files. Because they were using Angular, they were using Protractor, which I found it really interesting and easy to use. Something I’ll take into account whenever I use Angular again — I’m currently using React in my project. 

After work Romain organised a kata where we practiced mob programming. We had one developer playing the role of the “driver’, who would type what the other developers were instructing her. We would rotate the driver role every 10 minutes. We used the bowling kata as an exercise and all the code was test-driven. During the mob, many different and interesting ideas were suggested. We ended up not finishing the exercise (although we were very close) but had good discussions. 

On Tuesday I paired with Mickaël. During our pairing session we had an interesting conversation on how they separate the different architectural layers of their frontend application and where we should introduce a few new fields that came from the server and the logic that maps to those fields before sending them back. Thanks to Typescript, we were a little bit safer when introducing those new fields as the compiler guided us a few times when implementing those conversions. 

After work, they introduced me to the very French “Apéritif” in the Zenika terrace — it was pleasure to enjoy some French goodies :)

<center><img src="{{ site.baseurl }}/assets/custom/img/blog/2018-08-31-zenika-craftsman-swap/apperol.jpg" alt="list concatenation in memory" width="816" height="322" class="img-responsive" /></center>

# Days 3 & 4 - Enedis
On the following two days I paired with Maël on a project for an electrical company called Enedis.

Maël firstly introduced me to the people in the company and gave me an explanation about the the problem they were trying to solve. As you can imagine, there is a lot of hardware involved in a project for an electrical company and the testing part can be very complicated. Because of that, they implemented a very interesting testing solution where they can mix together business rules and technical steps. It was great for me to see it as it was completely different from the kind of projects I normally work on. We paired both days introducing new steps in the testing tool doing TDD. 

In the afternoon we’ve done a kata focused on hexagonal architecture. We developed a simple application that reads from an external source, let’s say a file, processes that input and outputs to the console. We’ve created a few abstractions that served as adapters and a single implementation that was the port in this case. Although I was familiar with the concept, it was good to debate about the topic, listen to opinions that reinforced my current understanding, and also some challenging ideas about where the domain logic should live, what we consider presentation logic, etc. 

After the kata, we discussed the different TDD styles, outside-in, inside-out and Mael showed me a workshop that he prepared around <a href="https://gojko.net/books/specification-by-example/">Specification by example</a>

# Day 5 - Zenika
In the last day I met [Xavier](http://twitter.com/xdetant), who is the CTO of the Paris office. We had a chat about how Zenika internally works and its culture. He showed me how Zenika is structured horizontally, with an almost flat hierarchy, how the teams are self organised and all the members have complementary skills. In terms of internal culture, they have many interesting things including “tribes” (similar to the Spotify Model), which are groups where they share focused technical knowledge, and the idea box where people are empowered to implement their own ideas in the organisation. 

That day I also discovered how much I suck at table football. Those guys are really good — I think I didn’t even see the ball during the matches. Thanks for that. :)

<center><img src="{{ site.baseurl }}/assets/custom/img/blog/2018-08-31-zenika-craftsman-swap/tablesoccer.jpg" alt="list concatenation in memory" width="816" height="322" class="img-responsive" /></center>

After lunch, Xavier organized a mobbing session where we used Haskell to solve the "Potter Kata". This was a surprise to me, I didn't expect to do any Haskell during this visit. We were using TDD in baby steps to solve the exercise and we created a few types to represent some domain concepts. Thanks to that exercise I discovered how to deal with RealFloat and Fractional and a few conversion methods between numbers in Haskell.


# Conclusion

It is always good to be outside our comfort zone, meet new people, and see different solutions to similar problems. Some of the highlights of this exchange include: 

Meet like-minded craftspeople
Have the opportunity to be embedded in the culture of a like-minded company abroad
Learn different ways of working with clients
Pairing with different people and in different projects, maximising the knowledge share between companies.
Get to know the internal organisation of a like-minded company and feel welcome to openly ask questions.
Bring back to Codurance many ideas we can apply to make our company better.
Have the opportunity to share Codurance’s culture with Zenika and hopefully provide them with ideas they could benefit.  

The craftsman swap was a great professional opportunity for me. I would like to thank everyone at Zenika for being great hosts, for taking the time to share so much about your company with me, and for making me feel at home. I hope to meet you all again in the future. Also a big thanks to Codurance for choosing me to represent our company and make this exchange possible. 


