---
author: Mashooq Badar
comments: true
date: 2012-08-11 18:04:02+00:00
layout: post
slug: encouraging-collaboration-via-review-branches-and-pull-requests
title: Encouraging Collaboration via Review Branches and Pull Requests
wordpress_id: 196
categories:
- Development Process
tags:
- Git
blogimage: http://mashb.files.wordpress.com/2012/08/images.jpeg
---

I have always advocated the use of a small well balanced team for projects rather than many less experienced ones. However this is not always possible. Some time projects require a very fast ramp up with a much larger set of teams where achieving a good balance of talent/skills is not possible and the experience is a commodity. Several large projects I have been involved with in the past have had to make this compromise.

Collaboration is the key. Especially if the system under development is new and going through constant evolution. Although one can argue that healthy systems must always be in a constant state of evolution.

In these cases a good level of collaboration within the team is difficult but achievable. Collaboration across teams is near enough impossible unless we setup explicit processes that encourages such behaviour.

The use of Pull Requests and Review Branches is one such process. Review Branches are essentially very short lived branches, often only lasting a few hours and never longer than a day. The main purpose of the branch is to develop in the smallest increment that is reasonable for the purposes of a review. The development of a single feature would typically result in a number of these branches. The mechanism for inviting others to review a branch and merge into master is known as a Pull Request.

The principle behind the Review Branch is that the codebase is small enough to allow for an effective review by someone in 15 minutes max. In the first instance all members of the teams other than your own are invited to do the review. Once one or two people have agreed to do the review they will then sit with the developer to go through the changes and merge them to master after a successful review. In case of geographical separated teams desktop sharing technologies and conference facilities should be used. If no one volunteers within 5 or 10 minutes then you can invite your own team member to do the review.

The primary reason is to share the knowledge across teams via the review process. Quality assurance is a side effect of this process.

We have found that it often helps if you ask for a "review buddy" who will pick all your pull/review requests for a particular feature. This will help speed up the process and stop you from going over the same ground with different reviewers.

Also team members should report in their daily standup the number of pull requests they have reviewed during the previous day and in scrums of scrums the team should report the number of pull requests each team review. They should also report the number of pull requests that were left unanswered within the agreed time limit. This will allow for rebalancing if certain individuals or teams are taking most of the reviews and others are reluctant to volunteer. Needless to say the reviews should be planned in as part of your capacity planning.
