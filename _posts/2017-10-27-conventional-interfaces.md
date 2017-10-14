---
layout: post
name: 2017-10-26-conventional-interfaces
title: Conventional Interfaces
date: 2017-10-14 10:20:00 +00:00
author: Carlos Morera
image:
   src: 
abstract: TODO.
canonical:
    name: Carlos's blog
    href: https://medium.com/@hkoundi/find-a-workplace-where-you-can-grow-16172a5ab957/
tags:
- FP
- Haskell
- SICP
---

# Intro

* Whilst reading SICP book I discovered the Sequences as Conventional Interfaces section. I'm going to somehow remove the "Sequences" connotation as they probably use it given that the book uses lisp where everything is a sequence.

# What are Conventional Interfaces

SICP first define conventional interfaces as a design principle for working with data structures. 

It is a set of standard operations for connecting the different steps require to implement computer programs. These operations may be familiar to you as they will probably be provided in some way in your preferred language, e.g. map, filter, flatmap (also now as bind), fold (also known as reduce), etc.. 

These operations let us capture common patterns in the implementation of programs that a priori are different structurally. These common patterns let us a think about different programs in a similar way. This is incredibly important as we can easily express different programs by simply combining the same set of operations in different ways.

SCIP introduces the concept of signal processing as a metaphore to reason about this programming style. Quote: "A signal-processing engineer would find it natural to conceptualize processes in terms of signals flowing through a casacade of stages, each of which implements part of the program plan". We will expand more on this metaphore later on, but for now it is important to emphasize that making the signal-flow structure evident in the design of our programs let us increase the modularity and readability of the resulting code. 

It is also important to emphasize that these operations increase the level of abstraction at which we can write code by taking away low level details such as, iteration, recursion, conditional statements...

Let's consider the two following examples taken from SICP and that I have translated from LISP to Haskell.

* This set of operations let us extract the distints parts of a computation by decomposing the different concerns
* The implementation of a sequence dictates how the sequence is iterated (https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces)

# Discovering common patterns

Consider the following two functions taken from the SICP book.

## Sum squares of the leaves of a tree that are odd

```haskell

-- A simple type representing a binary tree
data BinaryTree a =
    Leaf a
  | Node (BinaryTree a) (BinaryTree a) deriving (Eq, Ord, Show)

sumOddSquares :: (Integral a) => BinaryTree a -> a
sumOddSquares (Node x y)           = sumOddSquares x + sumOddSquares y
sumOddSquares (Leaf x) | odd x     = square x
                       | otherwise = 0
                       
```

## All the even Fibonacci numbers up to a given number
```haskell
evenFibs ::  Integer -> [Integer]
evenFibs n = go 0
  where go k | k > n     = []
             | otherwise = let f    = fib k
                               next = k + 1
                           in if even f then f : go next else go next

fib :: Integer -> Integer
fib 1 = 1
fib 0 = 1
fib n = fib (n - 1) + fib (n - 2)
```

## Hiden similarities

Even though these two functions seem to be completely different in structure, we are going to step back and look at them in a more abstract way to discover the similarities between them.

* summOddSquares:
1. Enumerates the leaves of the input tree.
2. Filters out the leaves that contain even numbers.
3. Maps the remaining leaves squaring each one.
4. Folds (or reduces) the mapped leaves using `+`, starting at 0.

* `evenFibs`:
1. Enumerates the interval 0 to n.
2. Maps each number to its corresponding Fib.
3. Filter out the odd Fibs.
4. Fold (or reduces) the remaining elements using `:`, starting with `[]`.

## Breaking down the implementation of both functions

It was a truly insightful moment when I realized that indeed both functions are almost identical in structure as opposed to how it seemed at first. The reason why the first implementations seemed so different is the mixing of concerns. Having a deeper look at them we can analyze where the mixing of concerns happens.

* `sumOddSquares`:
1. The enumeration is partially implemented by the Leaf pattern match, and partially by the double recursion in the Node pattern match.
2. The filtering is mixed with the mapping in the odd case in Leaf pattern match.
3. The folding or reduction is partially implemented by the addition that joins the double recursion in the Node pattern match, and partially by the `otherwise` case in the Leaf pattern match.

Each pattern match is mixing several concerns, increasing the complexity of the implementation and hidding the signal-flow structure of the computation.

* `evenFibs`:
1. The enumeration is partially implemented by the `k > n` case and party by the `next` expression.
2. The mapping, although extracted to the `f` expression, is mixed with the even filtering in the `otherwise` case.
3. The folding or reduction is partially implemented by the `:` constructor, and partially by the `[]` in the `k > n` case.

As in `sumOddSquares`, each pattern matching in `evenFibs` is mixing different concerns, failing to exhibit the signal-flow structure of the computation.

# Signal processing metaphor

* Enumerate-unfold generate a sequence of signals <- Foldable?
* Filter discards unwanted signals <- Foldable?
* Map converts each signal <- Functor
* Fold combines the signals <- Foldable?
* FlatMap "nest signals" <- Monad
* Zip join two sequences

## Unfold -> Map -> Fold (Include diagram of the stages)

### Refactoring towards unfold -> map -> fold 

### FizzBuzz

### Another example without using list?

* Maps are sequence generators? [(key, value)], [key], [value]
* Maybe is a sequence of 0 or 1 signal, elements
* Either is a sequence of a single signal that can be of one of two possible types
* (, ) is a sequence of exactly two signals 
Different sequences change semantics or meaning but not structure from their interface POV

# Conclusion

# References

SICP BOOK

LINKS
https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces
https://berkeley-cs61as.github.io/textbook/sequences-as-conventional-interfaces.html
