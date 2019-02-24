---
layout: post
asset-type: post
name: taming-dependabot
title: Taming Dependabot - how to use dependabot in the real world
date: 2019-02-24 07:00:00 +00:00
author: Christopher Eyre
image:
    src: /assets/custom/img/blog/robot-sunset.jpg
canonical:
    name: Dev Rants
    href: https://devrants.blog/2019/02/24/taming-dependabot/
tags:
    - jenkins
    - dependabot
abstract: How to work with dependabot in production
alias: [/2019/02/24/taming-dependabot]
---

# Taming Dependabot

When I started out developing in Delphi the number of dependencies that you took on was significantly lower and slower moving than modern Javascript development. Back then a project would typically have one or two custom libraries added to the Visual Component Library (VCL) and everything else was custom built. These libraries may have got an update every year but could typically be left alone for two or three years. It was fairly straightforward to keep these updated, provided that the supplier stayed in business.

Contrast this to a Node app built with the React Starter Kit. That has over 2000 node modules as dependencies. These are continually being updated and new versions released. Keeping on top of the security fixes and general updates is a major undertaking.

This is where Dependabot comes in. You grant Dependabot access to your git repo and allow it to raise pull requests. It will even merge them for you automatically if you have a suitable build server attached and the build passes.

For open source projects Dependabot is free. I have set this up on my https://github.com/chriseyre2000/contentful-to-neo4j project. 

![alt text](https://devrantsblog.files.wordpress.com/2019/02/screenshot-2019-02-21-at-22.00.01.png "Dependabot Control Panel")

If you click on the gear icon to the side you get the detailed page:

![alt text](https://devrantsblog.files.wordpress.com/2019/02/screenshot-2019-02-21-at-22.03.47.png "Dependabot Settings")

Here I have chosen to take all updates as soon as they are known about and to accept automatic merges once the build server passes.

For my build server I use Circle CI. Which is also free for open source projects:

![alt text](https://devrantsblog.files.wordpress.com/2019/02/screenshot-2019-02-21-at-22.06.55.png "Circle CI")

To get this added to Circle I needed to add a .circleci/config.yml file to my project:

```
# Javascript Node CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-javascript/ for more details
#
version: 2
jobs:
  build:
    docker:
      # specify the version you desire here
      - image: circleci/node:8.14

      # Specify service dependencies here if necessary
      # CircleCI maintains a library of pre-built images
      # documented at https://circleci.com/docs/2.0/circleci-images/
      # - image: circleci/mongo:3.4.4

    working_directory: ~/repo

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

      - run: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      # run tests!
      - run: yarn test

```

This is the minimal build that you need to get Dependabot to upgrade your project automatically. This works well for an open source project.

This is what you see in github:

![alt text](https://devrantsblog.files.wordpress.com/2019/02/screenshot-2019-02-24-at-14.03.55.png "Github Details")

This is what happens when everything just works.

If you need to intervene you can fix the code on the branch an wait for the build.

You can send dependabot commands via comments on the PR.

@dependatbot merge - asks dependabot to merge and delete the branch.

@dependabot rebase - asks dependabot to rebase the change - very useful if another dependabot change has updated the lock file.

@dependabot recreate - asks dependabot to recreate the PR. This is similar to rebase but will retrigger a build even if there are no changes. Does anyone else have builds with network dependencies (jenkins, browserstack &c)?

Dependabot is also good at working with Jenkins - provided you are using Jenkinsfiles. I am currently working on a large project that has over 40 repositories and we don't have time to move all of our projects to Jenkinsfiles, at least not immediately.

The solution to this is to add a small Jenkinsfile to the project that just runs the unit tests (or as many tests as you can fit). There is a risk that your tests will diverge, but having some tests that run as part of the dependabot process makes your life easier.

The process to making dependabot work for you is:

- Ensure that your project has a package.json file (or equivalent for other supported build tool)
- Enable dependabot for that project on it's website.
- Enable updates and auto merge as you wish
- Enable a CI server
- Archive github repos you are not using
- Removed dependencies that you don't need
- Fix broken PR's

Even with this in place, the PR's will build up for a while. 

One of my colleagues wrote a utility to manage a backlog of PR's:

https://github.com/jaramir/ghpr

This allows you to see the outstanding PR's for a team. You will need to host this yourself somewhere (Heroku works). Using this utility we can see how many PR's we need to work on.  It will take time and you will need to use the above list several times until you have a clean process.

Dependabot is not perfect.  It currently works one dependency at a time so linked items that need to stay in sync (react and react-dom) can cause issues. It has the ability to mark a limited time window during which it will automerge (limit it to your core business hours). This can result in 5 builds being triggered for the same project at the same time. Build servers will need to limit concurrency or performance tests will suffer. It will allow you to tame the upgrade treadmill.