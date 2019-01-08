---
layout: post
asset-type: post
name: mars-rover-kata-refactoring-to-patterns
title: Mars Rover Kata - Refactoring to Patterns
date: 2019-01-08 07:20:00 +00:00
author: Simion Iulian Belea
description: An example of what is learned in the first few weeks of the apprenticeship with the Mars Rover kata.
image: 
    src: /assets/custom/img/blog/mars-rover.jpg
tags: 
- refactoring
- patterns
- apprenticeship
- java
- kata

---



# Design Patterns And the Apprenticeship

This article is an account of how I learned applying patterns. It condenses concepts from the first two weeks of the apprenticeship program.

A kata is a very good exercise where you&#39;re given a specific set of rules and then one can use that exercise to learn different concepts, as well as different programming languages. One has an isolated domain problem where he can seek a different solution everytime. This can lead to a better understanding of how to solve a specific set of problems.

In this article I&#39;m going to go through the Mars Rover and how I used this kata to learn both classic test-driven development together with how to refactor things and also how to apply the Command and State design patterns.Applying patterns to such a simple problem is over-engineering. Yet as a guide tool to learn about refactoring and to train a sense of where they can be applied it's a very good exercise.

I provide the commits following the red-green-refactor pattern as it&#39;s like the &quot;making of&quot; part of a movie. The metaphor of film editing has a good resemblance with the one of editing code. It can be useful to know about the different steps of the creative process than to just watch the end result if one&#39;s purpose is to learn about development process.

In part, it is inspired by two books, TDD By Example by Kent Beck and 4 Rules of Simple Design by Corey Haines.

In TDD by Example, Kent Beck walks the reader through a detailed description of the benefits and decision-making test by test, along with some design principles. He suggests making a to-do list of the test cases as a pointer towards what one wants to achieve. This illustrates the point of always having a plan and avoiding programming by coincidence. This book also teaches what tests to pick and which way to go depending on what the limits of the design are along the way. It also introduces the Value Object design pattern, as well as the red-green-refactor technique.

In 4 Rules of Simple Design, Corey Haines makes the distinction between testing for state and testing for behavior, as well as how tests drive design and the code design feeds back into how we further write the tests.

#Business Rules and First Tests

One way to look at business rules is to split them in two categories: indicative, and optative. This is an idea from [Richard Wild](https://codurance.com/publications/author/richard-wild/), a fellow Codurance craftsman.

Indicative rules are specifications that don&#39;t change or are easy to change, like the dead and alive state for a cell in the Conway&#39;s Game of Life, or the world has a size in the case of Mars Rover.

Optative rules are the ones that change, and often contain &quot;if&quot; and &quot;should&quot; in the content of their formulation. These are the rules that we need to code for and that influence our design. The order in which one gets implemented also influences how we would design things. Depending on the kata it&#39;s often best to pick the simplest rule and start from there, especially when other rules depend on other rules to be implemented first. In other cases picking a different rule will lead to a different, and often original implementation of the exercise.

In the case of the this kata the indicative rules are the ones about the world size, as well as the number of commands. The optative rules are around the commands themselves.

[<span style=" font-weight: bold; color: #d32f2f; padding-right: 5px;">fc05fc</span>](https://github.com/simion-iulian/mars_rover_article/commit/fc05fc4d36fbe2b672b4a7c61e110aaf58800823#diff-52aa4cc276944cec2c0f7f1e877030a9) - After a bit of debate we chose to test that the rover stays in the same position given an empty command. This sets the stage for the next test, as we decided to design changing the coordinate before designing the turning algorithm.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">c2ab91</span>](https://github.com/simion-iulian/mars_rover_article/commit/c2ab914988326536257e6bd29eb82185586e0e2d#diff-52aa4cc276944cec2c0f7f1e877030a9) - Following [TPP](https://codurance.com/2015/05/18/applying-transformation-priority-premise-to-roman-numerals-kata/)  we return a literal as the simplest step to make the test pass.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">953b95</span>](https://github.com/simion-iulian/mars_rover_article/commit/953b95a7e08b537ac7b51a74268781237aade73c#diff-c99b66330f280788f1696e82e23ca80a) - We changed to a parameterized test as we&#39;re going to have very similar test cases and our intent would be more explicit.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">a828cd</span>](https://github.com/simion-iulian/mars_rover_article/commit/a828cda5dd7f28e10539062c9dfe2bef1123dc89#diff-52aa4cc276944cec2c0f7f1e877030a9) - Decided that the simplest thing, and one that would take a bigger leap would be to return a variable. After that we also extracted the formatting of the String being displayed and kept it consistent with the business rules. We also decided the initial position would be injected in the constructor.

#Starting to code towards our first abstraction

At this point one can go either to start building the turning algorithm or the moving algorithm. We decided to go with the moving. Once we got that going the next dilemma was to either start wrapping around the world, the &quot;rainy&quot; path where we would need to start designing for an edge case or the &quot;happy&quot; path, to move in other directions.

We decided for the happy path. It introduces some duplication. That points to us that we could use an abstraction for moving the rover. In a larger context this is relevant for the user story one implements. Do we implement for something that is more &quot;deliverable&quot; and works straight away. This is something of immediate use to a product owner or the business. Going for the edge case would be making things more robust. So one important thing to take into account in the real-world is what the business needs at the moment and prioritize which feature gets implemented first.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">6e69b0</span>](https://github.com/simion-iulian/mars_rover_article/commit/6e69b0263b25ccbd2a88bf3d5d9df5c2c74a8b5f) - This is where we come to our initial decision to start testing for changing the coordinate given a direction. Initially the test fails and introducing a conditional in order to increment the Y variable, as well as refactored the command to a field.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">fc2e5b</span>](https://github.com/simion-iulian/mars_rover_article/commit/fc2e5b014d9d58a2630e000cab77c6eb62d7cd67) - Test fails with multiple move commands so we decide to split the input and parse multiple commands.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">9b09d2</span>](https://github.com/simion-iulian/mars_rover_article/commit/9b09d215b5990a420711305349d02b64ce3a259d) - We decide to duplicate the if condition so we can move towards the Southern direction.

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">4af91a</span>](https://github.com/simion-iulian/mars_rover_article/commit/4af91ab319a20b78f8b400c11808e24b73fab3b7) - Cleaning code - we refactor the North and South literals to fields -

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">4658e9</span>](https://github.com/simion-iulian/mars_rover_article/commit/4658e93138d63e9b4b196bbc88ff6d8eff829400) - Clarifying intent for how we check direction - applying **SRP**

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">e5d3ef</span>](https://github.com/simion-iulian/mars_rover_article/commit/e5d3ef23580b43c4fc287576f5ed818b2b2d263f) - Clarifying concepts around what is input and what is a command by renaming variables

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">cef9e5</span>](https://github.com/simion-iulian/mars_rover_article/commit/cef9e5dfd91c31ef0eb982d19160146423679642) - Clarifying intent by extracting method that handles moving - applying **SRP**

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">3951a1</span>](https://github.com/simion-iulian/mars_rover_article/commit/3951a11f123eb1dc8484397fb938d57a9cb33a68) - Cleaning code - extracted coordinate formatting to field

[<span style=" font-weight: bold;  color: #6AA84F; padding-right: 5px;">ed42a0</span>](https://github.com/simion-iulian/mars_rover_article/commit/ed42a0911d4a33047e260152a99944078234d72c) - Implemented moving horizontally. Extracted method that expresses intent for vertical and horizontal movements.

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">2ff4e3</span>](https://github.com/simion-iulian/mars_rover_article/commit/2ff4e3446329d499f92d8eaedd494159f7be4321) - Cleaning code - clarified how the String is split into individual characters.

This decision though leads to a larger class that needs refactoring. So the decision at this point is whether one has enough for an abstraction for the moving logic or to continue in order to discover another pattern in the code. We decided to continue with implementing the turning logic as we could always come back at abstracting the moving into class that would know by itself which way to move.

[<span style=" font-weight: bold;  color: #1155CC; padding-right: 5px;">68e1a8c</span>](https://github.com/simion-iulian/mars_rover_article/commit/68e1a8cbda65b8042717a1a461ccfd4fe1d8ecfb?diff=unified#diff-52aa4cc276944cec2c0f7f1e877030a9) - Continuing by wrapping the coordinate logic into a class

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">76d636</span>](https://github.com/simion-iulian/mars_rover_article/commit/76d63670df343468b6fda02ac6af5ddeceaa13d8) - Shadowing the new class along the old implementation

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">a0f5110</span>](https://github.com/simion-iulian/mars_rover_article/commit/a0f5110f26dacb5feed88a0f34dcab479a9e7267) - Deleting the old implementation and delegating all coordinate responsibilities to the Position object

[<span style=" font-weight: bold; color: #d32f2f; padding-right: 5px;">3ad34d</span>](https://github.com/simion-iulian/mars_rover_article/commit/3ad34daeb41ab3df4f114c593a04f4d1bb56c3dd) - Adding failing test for turning right

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">8e5c98</span>](https://github.com/simion-iulian/mars_rover_article/commit/8e5c98e8c6f6bb0f080ece34057e83b6a3a553e1) - Simplest thing to make the test pass

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">000836</span>](https://github.com/simion-iulian/mars_rover_article/commit/0008368273817c7ca4617f49b7b7569f66224d18) - Refactored responsibility to Position

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">fda3d2</span>](https://github.com/simion-iulian/mars_rover_article/commit/fda3d2f0de907ed66ad311c7e12046a1249cc507) - Implemented turning right twice

Repeating for all turning possibilities until both turning right and left are implemented.

[<span style=" font-weight: bold; color: #6AA84F; padding-right: 5px;">093f06</span>](https://github.com/simion-iulian/mars_rover_article/commit/093f067a0104a179d384ba9507acb3af7ffc0817) - Test for both directions passing.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">c6cfb3a</span>](https://github.com/simion-iulian/mars_rover_article/commit/c6cfb3a152e3854269db42d0f715c16502fe33d8?diff=unified) - At this point there seems to be a good deal of feature envy between the Position object and the Mars Rover, so we rename Position to Rover.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">6c78e3</span>](https://github.com/simion-iulian/mars_rover_article/commit/6c78e3a3f557f78e464da6edfee0cedf1ddaa566) - Refactored to using immutability and renamed the Coordinate to Rover as it has behavior and Position would point to being just a wrapper.

#Refactoring to State and Command patterns

Now we decided to abstract some of the execution details so they are self contained in classes.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">84f38ad</span>](https://github.com/simion-iulian/mars_rover_article/commit/84f38ad) - When introducing another concept - Cardinal - we are having a deeper level of delegation therefore it&#39;s a good idea to have a small unit test in order to show its behavior.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">f896a2</span>](https://github.com/simion-iulian/mars_rover_article/commit/f896a26bfad71f99020231c340c07c593ed61459) - Refactoring to use the Cardinal in the constructor and to initialize using a factory method.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">309694</span>](https://github.com/simion-iulian/mars_rover_article/commit/30969435e977d249c37b569740e02367d2c2513b) - Delegating moving logic to be self-contained in the Cardinal. Shadowing the implementation along the old one in each of the conditions until we can have a unique call and all the tests are passing with the refactored call.

It also makes the code easier to follow and read. In the case of the **MarsRoverController** and the **Rover** classes it is only one level of delegating, with the cardinal it&#39;s deeper therefore a unit test is justified. This would show the deeper behavior of the collaborators of the Rover

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">84f38a</span>](https://github.com/simion-iulian/mars_rover_article/commit/84f38add0b7adf613448df4a7a2f85b0e82ad6a6) - The direction uses a switch logic to change positions and it is possible to have each cardinal point be self containing, knowing only of it&#39;s right and left coordinate.

Delegating a call to its own right() and left() methods would make use of the State pattern and lets the cardinal manage the switching. In a way looks like a water molecule that has one big atom in the middle and two neighboring ones to its left and right. Naming the Cardinal State subtype methods to left() and right() distances the implementation from turning and makes it more reusable in another context. It makes the switch go away, and also puts the responsibility of switching state to the cardinal and not to the rover. The cognitive load of the class is less because before the refactoring the Rover class had to know about all the mappings and now the mappings are self-contained.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">6080dc</span>](https://github.com/simion-iulian/mars_rover_article/commit/6080dc18ab125fb26b344bf761feedcb230710f8) - Shadowing and removing the old implementation. Adapting it to work with the Rover

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">bf79f1b</span>](https://github.com/simion-iulian/mars_rover_article/commit/bf79f1b) - Full refactor of Rover into polymorphic call for cardinal and state pattern

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">21924ca</span>](https://github.com/simion-iulian/mars_rover_article/commit/21924ca) - Cleaning up code, moving things locally for readability and to keep things close to where the behavior is implemented

The last step is to show the use of the Command pattern by abstracting away the calls of command execution into command objects.

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">5aa83d4</span>](https://github.com/simion-iulian/mars_rover_article/commit/5aa83d4) - Implemented Command, CommandFactory and started refactoring invocation to commands instead of the controller

[<span style=" font-weight: bold; color: #1155CC; padding-right: 5px;">c5b0fe7</span>](https://github.com/simion-iulian/mars_rover_article/commit/c5b0fe7) - Final touch - Moving commands into their own folder, changing the conditional to use a HashMap to store the commands and naming the command Strings accordingly.

And that&#39;s it, condensing the concepts learned in the first two weeks of apprenticeship using the Mars Rover kata.

It was done over a few pair programming sessions by Simion Iulian Belea and [Sam Davies](https://codurance.com/publications/author/sam-davies/).