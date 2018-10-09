---
layout: post
name: interview-with-sandro-mancuso
title: Q&A about The Software Craftsman
date: 2015-05-06 01:26:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/custom/img/blog/2015_04_30_infoq_interview/thesoftwarecraftsman_infoq.jpg
tags:
- craftsmanship
- quality
- agile
- codurance-way
- the-software-craftsman
---

_Our co-founder [Sandro Mancuso](http://twitter.com/sandromancuso) was [interviewed by Ben Linders from InfoQ](http://www.infoq.com/articles/mancuso-software-craftsman). Below is the full transcript._ 

In the book [The Software Craftsman](http://goo.gl/KgxKaw), Professionalism, Pragmatism, Pride Sandro Mancuso explores how craftsmanship plays a role in agile software development. The book contains stories, examples and practical advice for software developers and other professionals involved in software projects to achieve technical excellence and customer satisfaction.

InfoQ readers can download a [sample of the book "The Software Craftsman"](http://ptgmedia.pearsoncmg.com/images/9780134052502/samplepages/9780134052502.pdf) to get an impression of this book.

InfoQ interviewed Mancuso about how companies can suffer from an agile hangover, why technical excellence matters and how to convince managers of that, productive partnerships, anti patterns in candidate interviews, creating a culture of learning and his practical approach to craftsmanship and doing technical practices.

###InfoQ: You mentioned that with agile "the realization that the team as a whole was responsible for all the different aspects of a software project was a game changer". Can you elaborate on this?

> **Mancuso:** Before we had silos and hierarchies. “Smart” people would define the requirements and design the system for a few months, if not years. They would then pass a pile of documents to the development team and tell them how much time the team would have to build the software. After all, it was just to type some code on the keyboard following the well-defined specifications. All the “thinking” had been done already. I guess we all know what happened to the vast majority of these projects.

> A software project is composed by many interdependent activities, ranging from a business idea to software available to be used. There are only three reasons to why software is built: make money, save money, or protect revenue. The more we delay to have software deployed to production, the more we delay to achieve one or more of these three things. If the end goal of a software project is to benefit from the value that the software will provide, anything that is done before the software goes live should be reduced to a minimum.

> Reducing waste is one of the main focuses of Lean and Agile and one way to achieve that is to shorten the feedback loop and improve communication. Instead of waiting for months (if not years) to have some software to show to clients and validate business ideas, we can have a team composed by business and developers that, together, constantly interacting with each other, can deliver small chunks of software very often. In some organisations, very often means multiple times a day.

> Having the whole team responsible for all the different aspects of a project reduces the feedback loop (ideas are quickly validated or invalidated) and can provide a much faster return on investment.

###InfoQ: Your book talks about how companies suffer an agile hangover. What do you mean with this?

> **Mancuso:** This is a term that [Mashooq Badar](http://twitter.com/mashooq) and I came up with a few years ago, almost as a joke. We were talking about companies that suddenly wake up, after a few years of Agile transformation, to realise that all those Post-Its on the wall and all the Agile coaches they hired really didn’t do much to increase the quality of their software and neither helped developers to get better. After a few years having fun in the “Post-It party”, some companies end up realising that the way they are developing software now is not really better than what it was before: they are not delivering software faster, they don’t have less bugs in production, they can’t go live as often as they wanted, they still have a QA phase at the end of each release, and there’s still no trust between business and developers. The Agile Hangover is the realisation that nothing (or at least, very little) was done to actually improve the quality of their software; it’s the realisation that in a software project the most important deliverable is the software itself and not the processes around it.

> Agile processes bring loads of benefits to organisations, where increasing visibility and reducing the feedback loop are the main ones. A small and quick feedback loop is what enables agility. However, if you only have an improvement in the process but still keep the same old developers working in the same old way when it comes to software development practices, being surprised that things are not better seems very naive to me. More and more we are seeing companies and managers complaining about Agile and saying that this Agile thing doesn’t work. Yes, that’s also one of the symptoms of the Agile Hangover. 

> On a more positive note, Agile processes are helping companies to visualise their problems faster and putting them in a better position to fix their issues, which includes improving their technical capabilities. Companies that reach this stage of maturity (can visualise their issues and are willing to resolve them) are the ones that are in a better position to embrace Software Craftsmanship as a natural complement to their Agile adoption. It’s just a shame that some companies are taking far too long to realise that.

###InfoQ: In your opinion, why does technical excellence matter in agile? How does it make a difference?

> **Mancuso:** Agile was created to improve the way we deliver software. When we don’t focus on technical excellence, the quality of our software can drop to the point that it is very painful and slow to keep maintaining it. At this point, it doesn’t matter which Agile process you have because developers can’t go fast anymore, causing the company to loose its agility.

###InfoQ: What makes it so difficult to convince managers that technical excellence is important? How do you do it?

> **Mancuso:** There are good and bad managers. The good ones are the ones that keep themselves up-to-date with better ways of delivering a software project and also trust their teams to do the job. They are well informed, which makes conversations with the development team much easier. For the not so well informed managers, things are a bit more complicated because they don’t have enough knowledge to understand the seriousness of certain problems and the implications of certain decisions. I find Agile processes far more important when managers are not so well informed.

> As a first step to convince managers about technical excellence, I try a soft approach, with many conversations, explanations, and education. I also try to explain the value of certain practices when compared to the current approach. There are reasons why developers want to adopt certain technical practices or improve the system, and those reasons need to be expressed in a way that managers can understand. Let’s take TDD as an example. Instead of saying that we need more time to write tests, we need to say that we want to shorten our feedback loop when it comes to testing and deploying a new release into production. Let’s say we currently have a 2-week testing phase after a few weeks of development, done by a separate QA team. Wouldn’t it be nice to only push a button and be confident, in a matter of minutes, that our software is tested and good enough to go live? Wouldn’t it be great if we could press this button at anytime, as many times we want? That’s value for the business. Now let’s take continuous integration as another example. Wouldn’t it be nice if whenever a team member adds/changes some code, we could all be immediately that our system is still working and can be deployed into production? Wouldn’t be nice if we could impede that new code is created on top of buggy code, significantly reducing re-work and unnecessary maintenance? And what about pair-programming? Wouldn’t it be nice if we had absolutely no key-person dependency? If we never needed to wait for anyone to come back from holidays, or never be desperate because someone is leaving the company? Wouldn’t it be nice if everyone had a good level of understanding of all parts of the system? This is also value to the company. And what about keeping a constant velocity, regardless how old or big the system gets? Those are only a few of the benefits of focusing on technical excellence.

> However, we cannot ignore that certain practices may come with an initial cost and managers may refuse them because of that. In this case, I would ask them how much value our current practices are bringing when compared to the ones we are suggesting. How long is our current feedback loop? How many times in a year (or any other period of time) do we feel comfortable to go live with a new release? Are there any other practices out there that could make us better? These are the type of conversations I like to have with managers. It’s not about a specific technical practice, but about the value that a technical practice bring when compared to our current approach.

> Another thing I always push for is to make everything very visible: have a Scrum/Kanban board showing the team’s progress (or lack of it), have build radiators showing the health of our system, and also communicate every problem to the team (and manager) straightaway. There is a thing I’ve learned from Mashooq Badar: If you internalise a problem, it is your problem. If you communicate the problem to the rest of the team, it’s everyone’s problem. Making problems visible normally would force managers care about them, or at least help us to do our job in order to solve them. Ignoring problems that were clearly highlighted by the team may be very detrimental to a manager’s position and will force them to play a more active role in finding the solution. And in the event where nothing else is working I would escalate and also make sure that all our concerns are done in writing and sent to the appropriate people.

###InfoQ: The manifesto for craftsmanship talks about productive partnerships. Can you explain what they are, and how they can help to produce better software?

> **Mancuso:** A career of a software craftsman goes way beyond any project or company. However, every craftsman wants to build a career on top of successful projects—projects they are proud of. Every time a craftsman joins a project, he or she are putting their career and reputations on the line.

> In order to build a successful career and a great reputation, it is paramount that we see each engagement as a partnership, regardless if we are a permanent employee, contractor, or consultant. The contractual model with our clients should not make us behave (or be treated) in a different way. Once we are in the team, we should be fully committed to the success of that project.

> Being in a partnership with our clients means that we should do whatever it is in our power to make the project succeed, offering ideas, alternatives, and solutions. Keeping our heads down and doing what we are told is not being in a partnership. We can do far more than that. We know what technology can do to help our clients and a key part of our job is to provide them options. Successful projects mean happy clients/employers and a successful career.

###InfoQ: You mentioned that sometimes developers objections against technical practices. Take for instance pair programming, some love it, and others hate it. Why do developers object against working in pairs? Any suggestions how to deal with it?

> **Mancuso:** I don’t think there is a single answer to this question. People are different and each person might have a very different reason to why she doesn’t like to pair. A few common ones I found over the years are: lack of confidence, shyness, lack of trust, work load, management pressure, fear of exposing their ignorance, feeling of not being productive, personality clashes, job security (not willing to share what she knows), fear that someone will find that she can’t do things on her own. The list goes on.

> The first thing that must be addressed is management support. Developers are far less inclined to adopt XP practices when they fear that their managers will disapprove. It needs to be clear for the development team that they are free to do whatever they think is best to deliver quality software in a timely manner.

> The second thing to be addressed is team spirit. It’s the whole team responsibility to create an environment where it is OK to expose our ignorance. In fact, exposing our ignorance should be encouraged. This should be treated as a sign that people are keen to learn. “Hey, I don’t know much about our deployment process. Can I pair with someone on this in the next task?”

> When a developer is not so keen to pair with others, it’s the responsibility of the other developers to make this person feel comfortable pairing with them. The best trick I use is to invite someone that doesn’t like to pair to “help” me. “Hi Paul, I’m working on this part of the application but I’m struggling a bit. Would you mind to sit down with me and help me a little bit?” As soon as the person sits next to you, you are already pairing. Ask her opinion. Involve her in your thought process. If you have a better idea about how to solve something, don’t criticise the other person’s idea. Make your idea a suggestion. If the person rejects your suggestion, don’t try to force it. Ask her questions and let her figure out the shortcomings of her own ideas.

> Last, but not least, there is the business aspect. It’s important that every developer understands that a software project is not about them. Having people working in isolation brings a big risk to the business. Pairing should be encouraged not only because of quality but also to reduce the key person dependency risk.

###InfoQ: Your book contains a chapter describing interview anti patterns. Why did you decide to include this?

> **Mancuso:** Every company wants to hire “the best” people, but the truth is, they have no clue how. Go to any technical community, call a group of developers and ask them about their interview experiences. Grab a seat and a drink first because you are about to hear the longest rant of your life.

> Recruitment is an essential part of any business and developers, technical leaders, and hiring managers need to learn how to interview. They need to learn what they should or shouldn’t do during an interview. Experienced developers are in extremely high-demand and very rarely looking for a job. If a company gets a chance to bring one in for an interview, they cannot screw it up. Experienced developers are not only there to be interviewed; they are there to interview the company as well, starting by the interviewers.

> My idea with the second half of the book was to help companies to attract and retain software craftsmen and that’s why I dedicated a couple of chapters to recruitment and interviews.

###InfoQ: You stated that "creating a culture of learning is one of the most efficient ways of injecting passion into a company". What can organizations do to have empowered employees who want to learn and develop themselves?

> **Mancuso:** First they need to put their money where their mouth is. It’s quite common to hear managers saying that they want passionate people, but as soon as some employees ask for a couple hours a week to practice and share knowledge, the answer is: “Sorry guys, we need to meet this deadline and we can’t afford to miss a couple of hours per week… at least not in the next… five years.”

> Creating a culture of learning is much simpler and cheaper than many companies think. They just need to get out of the way and let it happen. Maybe buy a few pizzas here and there. I know because we’ve done it in a global department inside an investment bank without asking for any management support. In fact, we didn’t tell them anything. When they realized, there were already quite a few of us meeting regularly, coding together, and sharing ideas.

> We just need one or two people willing to organize something and an empty meeting room (or any other space where people can get together). Meetings can happen at lunchtime, once or twice a week. This is how we started. I told people that I was going through the “Seven Languages in Seven Weeks” book and asked if they wanted to join me. At first, just two people joined. Then, as a week or two went by, developers kept seeing us with our laptops having fun at lunchtime and also talking about the things we were learning during coffee breaks. They got more excited and decided to join in. At some point, we were running a few sessions a week (hands-on sessions, talks, discussions) about different things, with more than 20 developers.

> When people are having fun, others will join in. Enlightened companies will appreciate the efforts made by their employees and will do whatever they can to nurture their passion, giving them time to learn.

> Companies should never force people to get together so that they can “improve themselves.” When people are forced, it becomes work and that is not the idea. Let the people organise themselves. Let them decide what they want to learn and how often they are going to meet. The only thing the company (managers in this case) need to do is to make sure that everyone knows that they don’t need to ask authorisation to take a couple of hours here and there to meet and learn. People normally understand the urgency of their work and can plan accordingly.

###InfoQ: In your book you wrote about pragmatism, a practical approach to craftsmanship and doing technical practices. Can you elaborate on that?

> **Mancuso:** Software Craftsmanship is becoming more and more popular. With that, more developers are calling themselves craftsmen and embracing Software Craftsmanship values. Companies are also trying to embrace Software Craftsmanship and are paying far more attention to the quality of the software they produce.  At the same time that this is a good thing, when certain ideas become popular, their core message gets diluted and often misunderstood. Agile is a great example of that. How many companies claim to be working in an Agile fashion today? If we brought some of the Agile originators into these companies, how many companies would they say that are really working according to the values they defined? My fear is that, if we are not careful, Software Craftsmanship will go towards the same direction.

> One of the core values of Software Craftsmanship is “productive partnership” [with our customers.] In summary, that means, helping our customers to achieve whatever they want to achieve in a sustainable way, via well-crafted software. However, well-crafted software is pointless if it is not providing any value to customers. It’s pointless to have code that is beautifully written, fully tested, and designed according to the latest fad, if it can’t be delivered in time and at an affordable price. Understanding our customer’s needs is paramount for any craftsman. We also need to understand that writing software for a large investment bank is different from writing software for a small startup. Building software for an insurance company is different from creating an online store for a small business. It’s important we understand the context we are in and adapt our process accordingly. What is the cost of a bug? In certain places, a bug in production may be catastrophic while in others, it’s probably much cheaper than not going live at all.

> Our industry loves extremes: From BDUF (Big Design Up Front) to no design at all. From long cycles of manual testing to layers and layers of automated testing. From monolith applications to hundreds of small classes being deployed as [micro]services. It seems that everyone is looking for a magical recipe and trying to apply it everywhere. Where before people were complaining about lack of quality, now they are complaining that this “quality” thing is too expensive and takes too long. 

> Yes, of course we have values. Of course we care about the quality of our work. But above all, we should be pragmatic and get things done. Good practices are good until we find better ones to replace them. Some developers are treating certain practices, tools, design styles, and programming paradigms as a religion, forgetting that they have a software to deliver and, most importantly, a customer paying for it. At the end of the day, the main judges of the quality of our work are our customers. Regardless of which tools we use or how we call ourselves, if our clients are unhappy, we cannot say we are doing a good job.

> Mastering our tools and practices is a way to reduce the quality cost, and that can be achieved by deliberate practice. Customers should not pay more because we decided to use a certain practice or tool. Typing has never been the bottleneck in a software project, and neither should be any of the practices and tools we chose to use. Well-crafted code is a means to an end, where the end is customer satisfaction. Failing to understand that is failing to understand Software Craftsmanship.

_Please see the [original interview](http://www.infoq.com/articles/mancuso-software-craftsman) on the [InfoQ website](http://www.infoq.com/articles/mancuso-software-craftsman)._
