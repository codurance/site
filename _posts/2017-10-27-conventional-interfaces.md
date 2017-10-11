---
layout: post
name: 2017-10-01-conventional-interfaces
title: Conventional Interfaces
date: 2017-10-26 10:20:00 +00:00
author: Carlos Morera
image:
   src: 
abstract: TODO.
canonical:
    name: Halima's blog
    href: https://medium.com/@hkoundi/find-a-workplace-where-you-can-grow-16172a5ab957/
tags:
- FP
- Haskell
---

# What are Conventional Interfaces

* Contional interfaces is a reduced set of standard operations (filter, map, flatmap...)
* The implementation of a sequence dictates how the sequence is iterated (https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces)
* Conventional interfaces increase the level of abstraction at which we write the code, taking away low level details such as iteration, recursion, if statements... 

# Example

## Function that sums of the squares of the leaves of a tree that are odd

## Function that computes all the even Fibonacci numbers up to a given number

# Hiden similarities

## Breaking down the implementation of both functions

# Signal processing metaphore

* Enumerate-unfold generate a sequence of signals <- Foldable?
* Filter discards unwanted signals <- Foldable?
* Map converts each signal <- Functor
* Fold combines the signals <- Foldable?
* FlatMap "nest signals" <- Monad

## Unfold -> Map -> Fold (Include diagram of the stages)

### Refactoring towards unfold -> map -> fold 

### FizzBuzz

### Another example without using list?

* Maps are sequence generators? [(key, value)], [key], [value]
* Maybe is a sequence of 0 or 1 signal, elements
* Either is a sequence of a single signal that can be of one of two possible types

Different sequences change semantics or meaning but not structure from their interface POV

# Conclusion

# References

SICP BOOK

LINKS
https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces
https://berkeley-cs61as.github.io/textbook/sequences-as-conventional-interfaces.html
