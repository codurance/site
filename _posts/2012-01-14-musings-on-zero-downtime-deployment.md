---
author: Mashooq Badar
comments: true
date: 2012-01-14 23:11:43+00:00
layout: post
slug: musings-on-zero-downtime-deployment
title: Musings on Zero Downtime Deployment
wordpress_id: 190
categories:
- Development
---

I've been thinking about Zero Downtime Deployment for the past few weeks. I even raised it as a discussion topic in our [LSCC](http://www.meetup.com/london-software-craftsmanship/) Roundtable. Here are the key points discussed. Obviously the feasibility/suitability completely depends on the application and platform architecture. Also this is not an attempt to provide a solution but more to record the thoughts and ideas:

  * Switch over to backup upgrade the primary and then switch back, and then update the backup site.
  * Have a HA configuration, take hosts out upgrade then switch gradually.
  * Allow for parallel runs, so you can switch over to a parallel when updating.
  * Develop application to run on previous and new version of the database. Hot deploy the app and "hot" migrate the database.
  * Use dynamic features in your platform to allow for hot deployment.
  * Use semi structured datastore so data migrations are minimal.
  * Provide targeted releases, i.e. if a particular area of the application changes than only that area is updated and not the whole application.
  * If eventual consistency across partitions is acceptable then deploy in partitions and update partitions gradually, i.e. like Facebook, Google etc.



