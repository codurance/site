---
author: Mashooq Badar
comments: true
date: 2010-02-16 14:52:47+00:00
layout: post
asset-type: post
slug: maven-mutli-project-thought-and-guidelines
title: Maven Mutli-Project Thoughts and Guidelines
image:
    src: /assets/img/defaultBlogImg.png
wordpress_id: 56
categories:
- development
tags:
- maven
---

Maven multi-project stucture can get quite difficult to manage once you have a relatively deep hierarchy and more than a few projects. Looking at one such complex structure I found that much of this complexity can be avoided by carefully looking at the relation between parent and child projects and understanding why the projects have been split in the first place.

Maven allows composition and association type relationships between parent and children POMs (projects). The composition relation is expressed by including the child in the *modules* element of the parent POM and refering to the parent from the child POM. The association type relation is expressed by only refering to the parent from the child POM.

This all seams fairly straight forward until you start thinking about your release strategy. In a composition relationship all child modules must be released with the parent so that if you want to release changes in a child module then ideally you should release it as part of a full release of it's parent. Notice I say "must" even though maven allows you to release the children individually. Well, if you can think of scenarios where the child may be released independently of the parent then surely a composition type relationship is not appropriate?

Another guideline I find useful is to maintain exactly the same versions for all projects in a composition relationship since they must be released together. Assosiation type releasions ships should always refer to a released version of it's parent.

Lastly project hierarchies are not the only way to share common POM setups and dependencies. The other option is to use maven profiles. Typically you'd have a combination of a hierarchical project simplified by use of maven profiles.
