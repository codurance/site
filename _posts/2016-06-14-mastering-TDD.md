---
layout: post
name: mastering-TDD
title: Mastering TDD
date: 2016-06-14 12:10:00 +00:00
author: Ana Nogal
canonical:
    name: my personal blog
    href: http://www.ananogal.com/blog/mastering-tdd/
image:
    src: /assets/img/custom/blog/2016-06-14-mastering-TDD.png
tags:
- classicist
- mockist
- mocks
- red-green-refactor
- refactoring
- TDD
- test doubles

---
Two weeks ago I went to [Paul Stringer's](https://twitter.com/paulstringer) course ["Mastering TDD/BDD in iOS"](https://skillsmatter.com/courses/545-paul-stringer-s-mastering-tdd-bdd-for-ios). After the two days, I was exhausted... During the course, we looked at all the theory, completed some exercises. Paul gave us lots of links and books to read and, quite frankly, I was feeling overwhelmed.
I saw myself in front of the computer, with all those links to follow and read, and I didn't know what to do... So I laid back on my chair and closed my eyes and thought... What do I know about TDD?

## **_Following the rules..._**

Well, I know that it has laws: 

 - You must write a failing test before you write any production code.
 - You must not write more of a test than is sufficient to fail, or fail to compile.
 - You must not write more production code than is sufficient to make the currently failing test pass.

I know I should follow the circle Red - Green - Refactoring:

 - Red - Create a failing test
 - Green - Write enough code to make the test pass
 - Refactor - Clean up your code and your tests (don't forget that your tests are code too)

This works well to enforce the three laws of TDD. And as [Kent Beck](http://c2.com/cgi/wiki?MakeItWorkMakeItRightMakeItFast) said: 
> Make it work. Make it right. Make it fast.

If you want to know all about the cycles of TDD, [here](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) is an excellent article by [Uncle Bob](https://twitter.com/unclebobmartin) 

## **_Going to your favorite school..._**

And there are schools… well not physical ones: 

 - The Detroit/Chicago School or the Classicist approach
 - And the London School or the Mockist approach.

The first one uses real objects/classes and it tests the state of those objects. The second tests collaboration between objects and for that it uses mocks. 
You have [this article](http://codurance.com/2015/05/12/does-tdd-lead-to-good-design/) by [Sandro Mancuso](https://twitter.com/sandromancuso) and [this other](https://agilewarrior.wordpress.com/2015/04/18/classical-vs-mockist-testing/) by [Jonathan Rasmusson](https://twitter.com/jrasmusson) that can help you distinguish them better.

## **_Knowing your friends..._**

As an iOS developer, I tend to be more of a mockist since I drive my tests from the UI. And developing an app in Swift has some challenging aspects since we don't have a Mocking framework... We do it all "by hand"...So yes knowing very well what kind of **_test double_** you need is a good thing. People tend to call them all mocks but as [Martin Fowler](https://twitter.com/martinfowler) said [here](http://martinfowler.com/articles/mocksArentStubs.html): 
> Mocks aren't stubs

But if you still have doubts about **_test doubles_**, this [excellent article](http://blog.8thlight.com/uncle-bob/2014/05/14/TheLittleMocker.html) by [Uncle Bob](https://twitter.com/unclebobmartin) will definitely shed a light on it… (and I even found a version for Swift [here](http://clean-swift.com/swifty-little-mocker/)). Magical! 

## **_Setting your priorities_**

Yes, that's a really important one: use the [**_Transformation Priority Premise_**](https://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html) to avoid big steps and to guide you into the generalization of your code. As [Uncle Bob](https://twitter.com/unclebobmartin) said:

> [...]Refactorings have counterparts called Transformations. Refactorings are simple operations that change the structure of code without changing its behavior. Transformations are simple operations that change the behavior of code.

Another good article is [this one](http://codurance.com/2015/05/18/applying-transformation-priority-premise-to-roman-numerals-kata/) by [Pedro Santos](https://twitter.com/pedromsantos). 
Don't forget that during the refactor phase your design skills are put to test: as [Sandro Mancuso](https://twitter.com/sandromancuso) said [here](http://codurance.com/2015/05/12/does-tdd-lead-to-good-design/): 

> TDD is not a design tool. It’s a software development workflow that prompts for code improvement in its lifecycle. [...]
> The great thing about TDD is that it is constantly asking us “Hey, can you make your code better? See how hard testing this class is becoming? OK, you made it work. Here’s your green bar. Now make it better.”

## **_Having good  habits_**
TDD must be approached like a discipline. You must have good habits to stick with it. [Here](https://github.com/neomatrix369/refactoring-developer-habits/blob/master/02-outcome-of-collation/tdd-manifesto/tdd-good-habits-manifesto.md) is the **_TDD good habits manifesto_**. This came up for the first time in [SoCraTes UK ‘16](http://socratesuk.org/) in a form of a session facilitated  by [Mani Sarkar](https://twitter.com/theNeomatrix369) and [Pedro Santos](https://twitter.com/pedromsantos), where they challenged us to add or remove practices to their original draft that you can see [here](http://www.slideshare.net/neomatrix369/refactoring-developer-habits-62785350).


## **_Conclusion_**

Well, it seems that I have a minimum knowledge about TDD. Still need to practice a lot, and apply what I have learned when coding. Here are some books that you could read:

 - [Growing Object-Oriented Software, Guided by Tests](https://www.amazon.co.uk/Growing-Object-Oriented-Software-Guided-Signature/dp/0321503627) by Steve Freeman and Nat Pryce.
 - [Refactoring: Improving the Design of Existing Code](https://www.amazon.co.uk/Refactoring-Improving-Design-Existing-Technology/dp/0201485672) by Martin Fowler.
 - [ATDD by Example: A Practical Guide to Acceptance Test-Driven Development](https://www.amazon.co.uk/ATDD-Example-Test-Driven-Development-Addison-Wesley-ebook/dp/B008G1H3EG) by Markus Gärtner. 
 - [Test Driven Development](https://www.amazon.co.uk/Test-Driven-Development-Addison-Wesley-Signature/dp/0321146530) by Kent Beck.
 - [Working Effectively with Legacy Code](https://www.amazon.co.uk/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052) by Michael Feathers.
