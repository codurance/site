---
author: Sandro Mancuso
layout: video
name: testing-and-refactoring-legacy-code
image:
    src: /assets/custom/img/videos/testing-and-refactoring-legacy-code.png
title: "Testing and Refactoring Legacy Code"
hidden: true
video-url: https://www.youtube.com/embed/_NnElPO5BU0?list=PLGS1QE37I5lQX33-yrnNasV_dHRh2oSkx
date: 2012-12-14 10:00:00 +01:00
---

##Testing and Refactoring Legacy Code
In this video, we take a piece of crappy Java code with no tests. Our objective is to write tests for it and then refactor to make it better. The code has the most common problems that much larger legacy applications have, like Singletons, static calls and feature envy. It also has some design problems. Fixing that is quite hard, mainly when we need to write all the tests before we start the refactoring. Another rule: We cannot change production code if it is not covered by tests but quite often we need to change the production code in order to be able to test it. How to solve this problem? Well, I hope I can answer all these questions in this video.

If you want to play with the code, clone it from [Sandro's Github repository]("https://github.com/sandromancuso/trip-service-kata")
