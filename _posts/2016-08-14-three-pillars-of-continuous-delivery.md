---
layout: post
name: Three-pillars-of-Continuous-Delivery
title: 'Three pillars of Continuous Delivery'
date: 2016-08-14 00:00:00 +00:00
author: Robert Firek
image:
    src: /assets/img/custom/blog/pillars.jpg
    attribution:
      text: Untitled by Donovan Christian (CC)
      href: https://www.flickr.com/photos/donovanchristian/6208220715/
tags:
- continuous delivery
- automation

---

Some time ago I was invited to take part in a online panel about continuous delivery. [Continuous Discussions](http://electric-cloud.com/lp/continuous-discussions/) is a series of one-hour long panel discussions between people from different backgrounds about various aspects of continuous delivery. The topic of my panel was [Deployment Automation 2.0](http://electric-cloud.com/blog/2016/07/continuous-discussions-c9d9-podcast-episode-46-deployment-automation-2-0/) where we spoke about patterns in the automation of deployments and possible future changes in this area.

At the beginning, we were asked to define "Must Have's" of any deployment automation. When I was looking for these "Must Have's" I tried to identify the elements which were most important for me during the introduction of continuous delivery. What struck me the most was taking many things required by this process for granted. Tools or the readiness of an organisation for automation were not always in my mind when I started to automate "things" in different projects. This preparation gave me the possibility to identify my three pillars of good continuous delivery.

### Automation, Automation, Automation

**Automate the right thing** It sounds very easy, but when I look now at some of my past decisions I was not always automating the right part of my process. If you do your manual steps frequently enough or doing your manual tasks take a lot of time or your process is repeatable and complex, you have a good candidate for automation. Any automation without good context might lead to improvement of unnecessary parts of your software delivery.

**Use the right tools** Identify the tools which can help you. In the modern world of software development we have plenty of options. Tools like Jenkins, Bamboo, Travis, Ansible, Docker can help you in the automation, but without a good justification of usage they can be just fancy tools. Your automation should evolve together with your needs and problems which are introduced by these problems. Proofs of concept will allow you to understand if a specific tool is adding any value in the context of automation.

### Rapid Response

**Give answers now** Continuous deployment should help you to discover problems before they occur in the production environment. If your deployment process takes days, weeks or even hours in some cases, you can miss the opportunity to find out if your software is valid and ready to use. The time between the discovery and the fix of an issue can be minimised by the rapid response from your continuous deployment process.

**Make it faster**  Many different things can make your process slower. One such problem is how your processes are organised. In many cases in my previous projects the original version of the process required the individual involvement of many people in the organisation. Sometimes you don't have the right access rights to your infrastructure and deployments are impossible. Try to improve or change these elements in your organisation. The automation of your process should not only include the solutions for technical problems, but it should also improve non-technical aspects of the process.

### Team Effort

**Do it together** In my opinion the responsibility for continuous delivery should be shared by the team. By the team I mean all people involved in the project. Not only software developers, not only system administrators, we should also involve business stakeholders. Understanding continuous deployment, by all members of the team, strengthens knowledge about the software and improves cooperation. Our software is no longer just lines of code, it is also the place where this software lives.

**No Silo Culture** Every technical person in the team should be able to start, improve and fix the continuous delivery process. I understand that this can be a challenge and the team may face many failures, but by being inclusive, you can make your continuous delivery a beneficial process. Without the engagement of your whole team you create an invisible wall between the software development and its deployment. This can ruin all efforts of introducing automation, because your process will not be aligned with changes taking place in the code.

### Just three?

You may ask why just three. For me, you cannot start doing any good continuous delivery without thinking about these three elements. These are the parts which I would like to have during when I start introducing any automation in my projects. They make all other ingredients of continuous delivery easier to add.

-------------

I want to thank the team behind [Continuous Discussions](http://electric-cloud.com/lp/continuous-discussions/) for giving me a chance to be part of the panel. If you have something interesting to say about Continuous Delivery, please get in touch with them. They are waiting for your contribution.
