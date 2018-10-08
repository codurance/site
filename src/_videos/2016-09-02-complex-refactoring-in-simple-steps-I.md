---
author: Matthew Butt
layout: video
name: complex-refactoring-in-simple-steps-I
image:
 src: /assets/custom/img/videos/complex-refactoring-in-simple-steps-I.jpg

title: "Complex refactoring in simple steps Part I"
video-url: https://www.youtube.com/embed/ntjg6rE6lss
date: 2016-09-01 11:59:00 +01:00
---


## Screencast - Complex refactoring in simple steps, Part I: Replace Method with Method Object

Matthew Butt demonstrates how to compose simple automated refactoring steps in ReSharper to refactor code to better designs.

In this episode, we look at a method that exhibits the [Long Parameter List](https://sourcemaking.com/refactoring/smells/long-parameter-list) and [Data Clump](https://sourcemaking.com/refactoring/smells/data-clumps) smells. We Extract Class from Parameters to create a parameter object, and then, spotting [Feature Envy](https://sourcemaking.com/refactoring/smells/feature-envy), use Move Instance Method to shift the behaviour to the new class. We finish by tidying up the method object to remove generated code that might tempt us to break encapsulation.

The code used in this video can be found [on GitHub](https://github.com/bnathyuw/Complex-Refactoring-In-Simple-Steps)
