---
author: Mashooq Badar
comments: true
date: 2011-10-18 22:10:49+00:00
layout: post
slug: the-legacy-of-misplaced-testing
title: The legacy of misplaced Testing
wordpress_id: 151
categories:
- Development
tags:
- TDD
blogimage: http://mashb.files.wordpress.com/2011/10/complex.gif
---

Recently I've been exposed to a number of projects that have been going on for a few years. As you'd expect they are at a stage where the cost of change is phenomenal. The codebase is large, convoluted and very difficult to understand. However, there are a lot of tests both at the system and unit level. A sigh of relief - if the code has a lot of tests then at least that would make refactoring easier. The reality is very different - the tests are even more complicated then the code and significantly add to the cost of change.

Not only we have convoluted unit tests we have a very large set of system tests that exercise lots of variations on the main flows. These are very expensive tests because they require a lot of test data to be setup and go through the full flow in order to verify a very small part in that flow. You can see that as the code base became more convoluted and dependencies became difficult to mock, the developers started  relying more and more on the system tests which proved comparatively easier to setup by copying the setup data from previous tests. If you have hundreds of these and no one knows exactly how many of the main flows/scenario are exercised then what good are these system tests?

How do you turn this tide? One approach is to start moving these variations into unit tests in order to reduce the system test suite into a very small set of targeted tests that are testing the main business scenarios. Granted you'll have to spend effort on untangling the dependencies. You can adopt an automated testing framework (e.g. JBehave, Cucumber etc.) so the system and unit tests are defined in the language of the business. The units under test become more coarse grained to satisfy these scenarios. This may allow swathes of complicated unit tests to be replaced - don't be afraid to remove them. You must be horrified - remove tests! - well if they are not improving our confidence in refactoring then one can argue that they are no longer fit for purpose.

I am in no way saying that we stop doing TDD/BDD. Lack of TDD/BDD is most likely the reason we get ourselves into this situation in the first place. This is more an approach to lessen the pain of misplaced and substandard tests - to allow us to gradually turn the tide on the cost of change.
