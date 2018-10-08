---
layout: newsletter
asset-type: newsletter
name: newsletter-december-2017
title: 'Newsletter - December 2017'
date: 2017-12-11 09:00:00 +00:00
author: David Hall
image:
  src: /assets/custom/img/newsletter/newsletter-default.png
tags:
- software craftsmanship
- tdd
- testing
- newsletter
---

Hi,

This month, we look at: The OSWASP Top 10, Software Design Bias, Functional Programming, IDE setup for Rust, and Setting up an AI experiment to play Tetris. Enjoy!

The Codurance Team

P.S Missed our last newsletter? [Catch up here](https://codurance.com/newsletters/2017-10-26-newsletter/).

## Our Opinion On ... OWASP Top 10
Since the publication of the last Codurance newsletter, the Open Web Application Security Project (OWASP) has released the latest version of the renowned [OWASP Top 10](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf).

The OWASP Top 10 is a periodically updated document, designed to promote an awareness of the most common and critical security risks to web applications. The list is compiled by a project team which includes a variety of security experts from around the world.

Although injection flaws (such as SQL, NoSQL, OS, and LDAP injection) remain at the top of the list, since its last revision in 2013, three new risks have been added — XML External Entities (XXE), Insecure Deserialization, and Insufficient Logging and Monitoring. This last item, Insufficient Logging and Monitoring, is particularly interesting.

Unfortunately, I have seen many projects where logging and monitoring tasks have been given a lower priority than the building of features deemed to be delivering direct business value. In reality though, retrofitting a sufficient logging and monitoring solution into a modern complex and distributed system is hugely time-consuming and error-prone. The more complex and distributed that a system becomes, the more critical comprehensive logging and monitoring are for supporting the application in production, further compounding the problem.

In addition to production support requirements, studies have shown that the time to detect a system breach is typically over 200 days and, shockingly, such breaches are more often detected by external parties than by internal processes such as monitoring or automated anomaly detection. This extended time from breach to detection gives attackers freedom to further attack systems, gather or destroy sensitive data and find further exploits.

At Codurance we advocate building a [Walking Skeleton](https://codurance.com/2015/08/26/My-first-walking-skeleton/) as the first phase of any software project. Logging and monitoring should be implemented as part of this phase and in such a way as to make it easy for developers to record activities such as login, access control failures, and server-side input validation failures, with sufficient user context for application support systems to easily detect and investigate important incidents.

### The Author
Steve is a Principal Craftsman and author with over 18 years professional experience. During his career, Steve has worked on projects in a wide variety of sectors including retail e-commerce, finance, education, media, government and healthcare, developing large-scale, resilient, distributed systems on an assortment of platforms. He currently specialises in solutions built on the Microsoft .Net stack, with a particular interest in cloud computing using the Microsoft Azure platform.

====

### [SC London 2017 Videos](http://sc-london.com/videos)
All of the videos from SC London are now published and available to watch here. You can also subscribe for updates (http://sc-london.com/#subscribe) on SC London 2018, to gain updates on super early bird tickets and speaker announcements.

====

### [Recursion](https://codurance.com/2017/12/07/recursion/)
Christian Panadero Martinez looks at why Recursion is a very useful technique in functional programming and how it can help us.

====

### [List of awesome reverse engineering resources ](https://github.com/wtsxDev/reverse-engineering?utm_campaign=explore-email&utm_medium=email&utm_source=newsletter&utm_term=weekly)
A curated list of awesome reversing resources.

====

### [Applicative Functors and data validation](https://codurance.com/2017/11/30/applicatives-validation/)
Carlos Morera de la Chica shares two new intuitions that he's gained from the book, Haskell Programming from first principles.

====

### [Setting up Rust development environment using VSCode on a Mac](https://codurance.com/2017/11/26/rust-vscode/)
First post in our series looking at different ways of setting up your Rust development environment. It's time for VSCode! By Cyryl Płotnicki.

====

### [Setting up IntelliJ for Rust](https://codurance.com/2017/11/26/rusting-IntelliJ/)
The second part of our series on setting up different Rust development environments. This time it's IntelliJ. By Dan Cohen.

====

### [Introducing Nullable Reference Types in C#](https://blogs.msdn.microsoft.com/dotnet/2017/11/15/nullable-reference-types-in-csharp/)
Microsoft blog post on the introduction of Nullable Reference Types in C#, which aims to identify null-related bugs before they blow up at runtime.

====

### [Falling into Machine Learning](https://codurance.com/2017/11/24/falling-into-machine-learning/)
Sergio Rodrigo Royo reflects on his recent experience of learning Machine Learning, and how he's having fun along the way.

====

### [Functional Programming and Reactive Architecture Part 2](https://codurance.com/2017/11/23/functional-programming-reactive-architecture-part-2/)
Part 2 of Alessandro Di Gioia's series exploring Functional Programming and Reactive Architectures.

====

### [Java Optionals For More Expressive Code](https://codurance.com/2017/11/23/java-optionals-for-more-expressive-code/)
Any of us who has programmed in a language that permits null references will have experienced what happens when you try to dereference one. Whether it results in a segfault or a NullPointerException, it’s always a bug.' By Richard Wild

====

### [Delegates as Type Aliases](https://codurance.com/2017/11/23/delegates-as-type-aliases/)
Matthew Butt's walkthrough of how to refactor a Factory, moving from a sequence of ifs to a dictionary implementation, and using delegates as a type alias for my object creation methods.

====

### [Software Design Bias](https://codurance.com/2017/11/17/design-bias/)
'This week we had a software design night at Codurance. We spent almost three hours talking about many interesting things but there were a few things that really stuck with me: We all have software design bias.' By Sandro Mancuso

====

### [Fractured Skill: Compartmentalising Software Development](https://codurance.com/2017/11/17/fractured-skill-compartmentalising-software-development/)
Mashooq Badar explores the notion of Fractured Skill within software development, and why it's critical that all roles within a team have a broad appreciation of skills used, with their own depth of knowledge.

====

### [Katas For Functional Calisthenics](https://codurance.com/2017/11/16/katas-for-functional-calisthenics/)
Jorge Gueorguiev Garcia recently posted about functional calisthenics (https://codurance.com/2017/10/12/functional-calisthenics/) . In this post, he provides additional rules/premises/requirements for three katas.

====

### [Tetris AI, Experiments 1 & 2: Single Parent Evolutionary Algorithm](https://codurance.com/2017/11/13/tetris-ai-single-parent-evolutionary-algorithm/)
In this experiment, Dan Cohen attempts to implement an evolutionary algorithm with no crossover to evolve a neural network with the intention of having it learn to play Tetris.

====

### [The WIRED Guide to Digital Security](https://www.wired.com/2017/12/digital-security-guide/)
An interactive guide that aims to provide a few suggestions on how to improve your online security posture.

====

### [Lambda Calculus for mortal developers](https://codurance.com/2017/11/09/lambda-calculus-for-mortal-developers/)
Sergio Rodrigo Royo's post looks at Lambda Calculus, which isn't as arcane or just applicable to Functional Wizards as we may think.

====

### [Legacy Coderetreat - Overcoming challenges together](https://codurance.com/2017/11/05/legacy-code-retreat/)
Luciano Palma reflects on the Legacy Code retreat that was hosted at Codurance via the LSCC back in October.

====

### [Side effects](https://codurance.com/2017/11/02/side-effects/)
Christian Panadero Martinez reflects on Side Effects within Functional Programming.

====

### [Lambda World Conference 2017](https://codurance.com/2017/10/30/lambda-world-conference/)
Raquel M Carmena reflects on Lambda World Conference 2017, two intense days of workshops, sessions and open spaces focusing on Functional Programming.

====

### Our Chance to say 'We're Hiring'
We're hiring Software Craftspeople that share the same values of Professionalism, Pragmatism and Pride in Software Development that we do. If you're ready for autonomy, mastery and purpose in your career, then [click here](https://codurance.com/careers/)
