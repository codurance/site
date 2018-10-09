---
layout: post
name: becoming-evergreen
title: 'Becoming Evergreen'
date: 2015-08-05 21:00:00 +01:00
author: Steve Lydford
image:
    src: /assets/custom/img/blog/becoming-evergreen.jpg
    attribution:
        text: Evergreen, by Dan Cook
        href: https://flic.kr/p/dtRXDQ
---

> “It is only when the cold season comes that we know the Pine and Cypress to be evergreens.” - *Chinese Proverb*

Over the last few months I have spoken to a number of developers and teams who are making changes to their development and delivery processes in order to accommodate the faster release cycles of third-party dependencies.

Many development teams, and indeed whole businesses, have become used to the traditional two-to-three year release cycle of major software vendors. They have always had plenty of time to prepare and test the next release, and often used the time to “re-platform”, or “re-architect”, or whatever the current buzzword we are using to mean “throwing all that mess away and starting again”. But times are changing.

Many people first became aware of this trend with Windows Update or “evergreen” browsers. Evergreen software is that which always keeps itself up to date with the latest stable release without interaction from, and often with little choice of, the end user. For instance, I installed version thirty-six of Google Chrome on my laptop sometime around the middle of last year; it is now on version forty-four with no notification or interaction with me whatsoever. Similarly, Microsoft have stated that Windows 10 will be ‘[the last version of Windows](http://www.theverge.com/2015/5/7/8568473/windows-10-last-version-of-windows)’. This is not because they are planning to stop selling operating systems or replace Windows with another product, but rather that they have changed their engineering and delivery practices to release  regular improvements and updates, rather than big version increments. And who can blame them? The [benefits](http://www.continuousagile.com/unblock/cd_costs_benefits.html) of Continuous Delivery, such as improved time to market, reduced cost, faster user feedback cycles and quality improvements, have been [well documented](http://radar.oreilly.com/2014/02/the-case-for-continuous-delivery.html) [elsewhere](http://www.infoq.com/articles/cd-benefits-challenges).

But it’s not just web browsers and operating systems. Many of the third-party applications we rely on are following this same pattern. At the time of writing, Amazon have made nine AWS releases already this month. It is August 4th. Other cloud providers are releasing at similar rates, and as other dependencies move towards the cloud this situation will become more prevalent, even among the traditional big-box shippers.

In many cases this may not be a huge problem, most changes are backwards compatible, but breaking changes are not unknown, or indeed uncommon (try Googling “breaking changes” followed by a software platform of your choice). And there are of course many instances where backwards compatibility is simply not sufficient, as is often the case for tooling and integration providers for example.

As an industry we should already be prepared for this. After all, a well-designed system comprised of coherent, loosely-coupled, independent software modules should be relatively compliant to change and should not need a wholesale deployment. And we have of course been talking about Continuous Delivery for years, so it should come as no surprise that people are actually doing it, to take advantage of the many benefits.

So if you find yourself in a situation where the coherency and coupling in your application are the wrong way round, or your delivery is only continuous in the sense that it takes forever, now is the time to take action, before the cold season comes.
