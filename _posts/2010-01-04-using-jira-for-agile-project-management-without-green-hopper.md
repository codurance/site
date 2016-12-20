---
author: Mashooq Badar
comments: true
date: 2010-01-04 14:28:16+00:00
layout: post
slug: using-jira-for-agile-project-management-without-green-hopper
title: Using JIRA for Agile Project Management (without Green Hopper)
categories:
- process
tags:
- agile
- backlog
- jira
- scrum
---

[Jira](http://www.atlassian.com/software/jira/) from Atlassian  is a very popular issue tracking software and can be quite effectively used for Agile Project Management. Jira has a plugin (Green Hopper) that allows for creation of a backlog, iterations and tasks.  However, with help from the free Mylyn plugin for Eclipse I was able to setup a Product Backlog and Iteration Backlogs.

For the User Stories in the product backlog I created two issue types (Epic & User Story).  Story hierarchies can be represented using Jira Links.

_Note: Currently Jira connector in Mylyn has an issue with the "depends on" and "is depended on by" relationships. It displays them the wrong way around in the Tasklist hierarchy.  You can keep track of the following issues to see if they're fixed: [255680](https://bugs.eclipse.org/bugs/show_bug.cgi?id=255680), [223151.](https://bugs.eclipse.org/bugs/show_bug.cgi?id=223151)_

For Iteration Backlog I created a version for each iteration and assigned the stories to that version/iteration. Each leaf story can then have Jira Sub-tasks to represent the tasks in a particular iteration. The `Resolved` state of the story is used to mark it complete and `Colsed` state is used to mark it as "accepted". You can use Mylyn to see story hierarchies, also I found Mylyn to be a much more intuitive interface when working on Product and Iteration backlogs.
