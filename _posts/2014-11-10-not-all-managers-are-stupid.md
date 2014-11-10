---
layout: post
name: not-all-managers-are-stupid
title: Not all managers are stupid
date: 2014-11-10 04:20:00 +00:00
author: Sandro Mancuso
tags:
- craftsmanship
- agile
- teams
- managers
---

_(The following story was a bit altered in order to keep it short(ish) and to protect the innocents)_

I still remember the day when our managers in a large organisation told us we should still go live after we reported a _major_ problem a couple of months before the deadline. We had been developing the system for almost one year with 7 teams in 2 different countries. We were building a system that would process different types of trades coming from many different front-office systems around the world. The system had to report all these trades to regulators according to quite complex criteria. Different types of trades had different rules and reporting workflows. We also had to integrate with other internal systems to get all the information needed to report the trades. The volume of trades was quite large—millions. There was a problem in a couple of unfinished flows, which would cause hundreds of thousands of trades to be misreported to the regulators. After we explained the situation, managers told us to _work harder_ go ahead with the release anyway.

How could they tell us to go live in a situation like that? They should all be fired. Arrested. How could they ask us to drop the quality and go live with a known problem of that size? “Your focus is to get the system ready to be deployed and integrated with other systems,” they said. “We are going live on the date specified.” Seriously? I could not believe in such irresponsibility. They were the same managers that once said they believed in Agile and Craftsmanship. The same ones that hired us because of our focus on quality. But still, they were making these “stupid” decisions. 

More than once we made it clear that focusing our time on getting the system ready to production would not gives us any time to finish the automation for the problematic flows and thousands of trades would be misreported. But they did not listen. Or so we thought.

### The revelation

After a few meetings with the business, we discovered a few things. They were not being irresponsible or stupid, as we developers thought. The deadline was set by the regulators and could not be moved. The cost of not reporting the trades was far higher than misreporting them. Not reporting the trades would not only be followed by heavy fines, but also by possible reputation damage. Companies would have extra time to correct any misreported trades before being fined. 

For us, in the development team, it was the first time we realised that going live with a few known issues would be better than not going live at all. In order to meet the deadline, we took an informed (but hard) decision to drop the quality little bit—we got rid of higher-level tests (acceptance and component tests), but kept test-driving everything at unit level. We communicated the decision to the business and clearly told them the possible impacts of it. 

### Focus on highest value features first

With all the problems on the table (technical and business constraints), we could all focus on possible alternatives, business and developers working together as a real team. 

There were two ways to report trades to the regulators. The first was to do it automatically, processing the trades via the system we were building, and sending them directly to the regulators. The second was to manually create spreadsheets for each type of trade and upload them via FTP. Due to the volume of trades and the amount of data we needed from other systems, the manual approach was not an option. At least not for all the trades.

As we knew we could not get all the flows done in time and also knowing of what was at stake, managers and developers worked as a team to find a solution. We prioritised and focused on automating the flows for the trades with the highest volume, making sure that we would correctly report the vast majority of trades. For the remaining trades, the ones with the lowest volume, we decided to hire a few people to upload the trades manually. Since the system would be ready to report the majority of the trades, the manual upload for the remaining ones could actually be done in time. A few developers and business analysts created a bunch of scripts to extract data from a few systems and save it on the file system, making the manual upload, although a bit painful, viable. 

### The outcome

With a hybrid solution, we managed to report all trades on time with very few minor bugs, which were fixed quite quickly after the deadline. The very few trades misreported were corrected and re-sent. We also automated the manual flows and got rid of the manual solution a few weeks later. There were no damage to the organisation and we were one of the very few organisations that met the regulators imposed deadline.

### Lessons learned

As craftsmen, we all learned very important lessons in this project:

- Managers have a far broader view of the problem than we do. While we worry about problems with the software, they worry about problems that may affect the entire organisation. 
- Before judging managers, calling them stupid and irresponsible, we should understand why they are making certain decisions. Quite often we discover that we don’t have the same amount of information they have and that certain decisions are not as stupid as we think. 
- We are all humans and we all make mistakes. Managers are no different. They also make mistakes but that doesn’t make them stupid. Not always, at least. :)
- We need to stop thinking that all managers are bad and that they don’t understand or care about software problems. In this very specific case, they understood it well, measured the pros and cons, and made the right call to go live.
- When we are too involved with a problem, we end up thinking that our problem is the biggest and most important problem, calling stupid any other person that fails to recognise it.
- As a craftsman we are paid to provide value. However, our notion of value needs to be aligned with what value means to our customers. Having well-crafted code is pointless if the business won’t benefit from it.
- Even when there are many things at stake, developers should decide what can or cannot be compromised when it comes to software quality. When the whole project is under pressure, we should never let the business make technical decisions. Although we decided to drop certain tests, keeping TDD at unit level, refactoring, and pair programming, was the right decision for us and I’m happy we kept our practices. They helped us to deliver the value the business needed. We were able to confidently make all the changes we needed and also make sure that everything we delivered was working as expected. Giving the business the choice, they would have probably chosen to get rid of TDD, refactoring, CI, and pair programming altogether, risking not to deliver even the main flows correctly.

This project changed me. There are far more bad managers than good managers, but that is also true for developers. Understanding the main reasons behind each managerial decision can help us distinguish good and bad managers. It can also help us to stop with this unhealthy “us and them” attitude. Transparency, trust, and teamwork are essential for an effective organisation. 




