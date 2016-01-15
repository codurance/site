---
layout: post
name: GitHubAnimator
title: 'GitHubAnimator'
date: 2016-01-15 00:20:00 +00:00
author: Pedro Santos
image:
    src: /assets/img/custom/blog/octokit.png
tags:
- git 
- github
- automation
- craftsmanship
---

### The Beginning
Inspired by my friend [@SamirTalwar](https://twitter.com/SamirTalwar) and the initiative he set upon himself to [automate the world](http://monospacedmonologues.com/post/136667358499/automating-the-world) I picked up on an idea I had many months ago. Automating the generation of presentations using GitHub commits.

### What Problem am I Trying to Solve?
Often I need to do a software related session and I have to present the code in small steps showing how I approached a problem. This usually involves a lot of copy and pasting code from a repository, a commit a time, into PowerPoint or KeyNote or some other presentation application or framework. This is a very manual and error-prone process. Also, presentation applications usually know nothing about code, so I also need to hand format the copied code.

I have had the idea of automating this process but kept delaying it for some reason or another. After reading Samir's posts I finally decided to get it done.

### Implementation
#### THE LANGUAGE
I've been learning F# and I decided this would be a perfect opportunity to do something useful with my new F# skills. Also this problem seemed well-suited to a functional approach.

#### INTERFACING WITH GITHUB
GitHub has published a library to simplify the usage of their API. It's called [OctoKit](https://github.com/octokit) and it's available for numerous languages and platforms. Since I was using .Net I used [OctoKit.net](https://github.com/octokit/octokit.net).

#### CREATING THE PRESENTATION

Initially I used Office automation frameworks by Microsoft to generate a PowerPoint presentation, but decided that using a specific application could be too restrictive. So I started looking for a presentation framework using HTML5 and came across  [Reveal.js](http://lab.hakim.se/reveal-js/#/) that proved a good match for what I wanted to build..

##### Hightlighting the Code Samples
After playing around with Reveal.js I found out that the code highlight features, out of the box, were a bit limited for what I wanted. So I searched for a framework that would work with Reveal.js. I found [Prism.js](http://prismjs.com/) did all I wanted and a bit more. I set out to integrate Prism.js with Reveal.js and finally had something that would meet my requirements.

##### Fiddling With CSS
The last part was to make some changes to Reveal.js and Prism.js CSS's to get the desired visual effect. This is an area I'm a bit out of my comfort zone so it took me a while to get something half decent.

### The End Result
The code, as it stands now, is still very crude but it's capable of retrieving all commits for a file in a given repository and generate a presentation using Reveal.js. The presentation has a slide for each commit that changed the specified file. The slides use Prism.js to highlight the code.

There are still a few things hardcoded on the F# code, so it's not a "consumer" ready product, but some developers might be able to use it as it is.
