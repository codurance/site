---
layout: post
name: testing-behaviour-at-unit-level
title: Testing behaviour at unit level
date: 2014-12-11 22:34:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/codurance_2015.jpg
tags:
- craftsmanship
- tdd
- test-driven development
- naming
- unit test
---

What should my first test be? What should I test next? These are common questions that I'm asked over and over again. I quite often ask these questions myself. Deciding on what to test is hard. Deciding on the order that things should be tested is even harder.[^1] But writing tests first is not the only problem. How often did we get frustrated while dealing with existing tests which we had no idea what they are testing? 

Over the years I met and paired with a lot of very experienced TDD practicioners and each one of them write their tests in a different way. Some prefer a more exploratory approach, making a mess at the beginning and then cleaning up (extracting methods, renaming methods and variables, introducing abstractions) as they get more insight. Others prefer a more structured approach, doing a little bit more thinking and "just-in-time design" just before they write their tests.Others start typing straight away and wait to see what the code will look like before making any naming and design assumptions. Some use a more _classicist_ approach by default. Others prefer a more _mockist outside-in_ approach.

In this post I'm going to describe how I generally think about my tests. Due to the nature of the work I normally do[^2] I try to write my tests in a way that they clearly express the behaviour I want the application (or class) to have.

This is the template I normally use for deciding what to test and how to name my test methods:

![](/assets/img/custom/blog/2014_12_12/class_and_method_name_template.jpg)

blah


 [^1]: Ideally we would choose a sequence of small steps (tests) that could help us to gradually add functionality to our system and evolve our design.
 
 [^2]: Most of my work is done on bespoke business applications with a complex domain. I also normally work in projects where we constantly interact with product owners and business experts. All projects that I get involved are run using Agile methodologies. The approach I described works well for me because I normally write code according to well-defined user stories and acceptance criteria, which gives me a fairly good idea of what needs to be done before I start coding. It may not work so well if you do more exploratory work. I normally flip to a more _classicist_ approach when I'm exploring.