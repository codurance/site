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

* Whilst reading SICP book I discovered the concept of Sequences as Conventional Interfaces. I'm going to somehow remove the "Sequences" connotation as they probably use it given that the book uses lisp where everything is a sequence.

## What are Conventional Interfaces

SICP define conventional interfaces as a design principle for working with data structures. 

This design principle is composed of a set of standard operations for connecting the different steps required to implement computer programs. These operations may be familiar to you as they will probably be provided in some way in your preferred language, e.g. map, filter, flatMap (also now as bind), fold (also known as reduce). 

These operations let us capture common patterns in the implementation of programs that a priori are different structurally. These common patterns let us a think about different programs in a similar way. This is very important as we can easily express different programs by simply combining the same set of operations in different ways.

SCIP also introduces the concept of signal processing as a metaphor to reason about this programming style. Quote: "A signal-processing engineer would find it natural to conceptualize processes in terms of signals flowing through a cascade of stages, each of which implements part of the program plan". We will expand more on this metaphor later on, but for now it is important to emphasize that making the signal-flow structure evident in the design of our programs let us increase the modularity and readability of the resulting code. It is also important to emphasize that these operations increase the level of abstraction at which we can write code by taking away low level details such as, iteration, recursion, conditional statements...

To demonstrate the importance of the principle, let's consider the two following functions taken from SICP, which I have translated from LISP to Haskell.

* This set of operations let us extract the distints parts of a computation by decomposing the different concerns
* The implementation of a sequence dictates how the sequence is iterated (https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces)

## Discovering common patterns

Consider the following two functions taken from the SICP book.

### Sum squares of the leaves of a tree that are odd

```haskell

-- A simple type representing a binary tree
data BinaryTree a =
    Leaf a
  | Node (BinaryTree a) (BinaryTree a) deriving (Eq, Ord, Show)

sumOddSquares :: (Integral a) => BinaryTree a -> a
sumOddSquares (Node x y)           = sumOddSquares x + sumOddSquares y
sumOddSquares (Leaf x) | odd x     = x ^ 2
                       | otherwise = 0
                       
```

### All the even Fibonacci numbers up to a given number

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

### Hiden similarities

Even though these two functions seem to be completely different in structure, we are going to step back and look at them from a different perspective so that we can discover the hidden similarities between them.

`summOddSquares`:

1. Enumerates the leaves of the input tree.
2. Filters out the leaves that contain even numbers.
3. Maps the remaining leaves squaring each one.
4. Folds (or reduces) the mapped leaves using `+`, starting at 0.

`evenFibs`:

1. Enumerates the interval 0 to n.
2. Maps each number to its corresponding Fib.
3. Filter out the odd Fibs.
4. Fold (or reduces) the remaining elements using `:`, starting with `[]`.

## Breaking down the implementation of both functions

It was a truly insightful moment when I realized that indeed both functions are almost identical in structure as opposed to how it seemed at first. The reason why the given implementation is so different is the mixing of concerns that hides the signal-flow structure. Now let's take a deeper look at the implementations to analyze where the mixing of concerns happens.

`sumOddSquares`:
1. The enumeration is partially implemented by the Leaf pattern match, and partially by the double recursion in the Node pattern match.
2. The filtering is mixed with the mapping in the odd case in Leaf pattern match.
3. The folding or reduction is partially implemented by the addition that joins the double recursion in the Node pattern match, and partially by the `otherwise` case in the Leaf pattern match.

Each pattern match is mixing several concerns, increasing the complexity of the implementation and hidding the signal-flow structure of the computation.

`evenFibs`:
1. The enumeration is partially implemented by the `k > n` case and party by the `next` expression.
2. The mapping, although extracted to the `f` expression, is mixed with the even filtering in the `otherwise` case.
3. The folding or reduction is partially implemented by the `:` constructor, and partially by the `[]` in the `k > n` case.

As in `sumOddSquares`, each pattern matching in `evenFibs` is mixing different concerns, failing to exhibit the signal-flow structure of the computation.

## Refactoring towards enumerate -> (composition of operations) -> fold 

`sumOddSquares`

```haskell
sumOddSquares' :: (Integral a) => BinaryTree a -> a
sumOddSquares' = foldr (+) 0 . fmap (^2) . filter odd . enumerateLeaves

enumerateLeaves :: BinaryTree a -> [a]
enumerateLeaves = foldr (:) []
```


`evenFibs`
```haskell
evenFibs' :: Integer -> [Integer]
evenFibs' x = foldr (:) [] . filter even . fmap fib $ [0..x]
```


`FizzBuzz`
```haskell
fizzes :: [String]
fizzes = cycle ["", "", "Fizz"]

buzzes :: [String]
buzzes = cycle ["", "", "", "", "Buzz"]

fizzesBuzzes :: [String]
fizzesBuzzes = zipWith (++ ) fizzes buzzes

fizzBuzz :: Integer -> [String]
fizzBuzz to = zipWith (\n f -> if (f /= []) then f else show n) [1..to] fizzesBuzzes
```

## Signal processing metaphor

Now that we have seen how different computations can be shaped similarly by using the same set of operations and combining them in different ways let's expand on the signal processing metaphor.

As mentioned in SICP, the key to organizing programs so as to more clearly reflect the signal-flow structure is to concentrate on the "signals" that flow from one stage in the process to the next. SCIP uses Lisp, where everything is a list, therefore the signal processing metaphor fits very nicely with list. If we move away from Lisp and to Haskell for example, the metaphor may not be as evident, but as we just showed it is equally applicable. Haskell abstract the different operations from concrete data structure in most cases using typeclasses(link to typeclasses), let's break down a few of them.

* Enumerate generates the signals that initiate the computation.
Haskell names the concept of enumeration unfolding and provides the `Data.Unfoldable` typeclass. As explained previously enumerating or unfolding the leaves of a tree or the integers in a given range for the Fibonacci function. Haskell also provides lists comprehension(link to documentation) as a way to generate list of values.


* Filter discards unwanted signals by only keeping the ones that satisfy a given predicate.
As far as I know there is not a concrete typeclass in Haskell that abstracts the concept of a filterable data structure from the concrete implementation. However, there is a filter operation defined in each of them, e.g. List, Map, Set, Seq.


* Map converts each signal to a different type.
Haskell defines the concept of data structures that can be mapped in the typeclass`Data.Functor`. In Haskell the `map` function is called `fmap`.

* FlatMap nests signals so that we can use each of them and do some extra computation based on their values.
For the flatMap operation, known as bind in Haskell, there is the typeclass `Control.Monad`.


* Zip joins two sequences of signals as a sequence of pairs.
As far as I know there is not a concrete typeclass in Haskell that abstract the concept of a zippable data structure from the concrete implementation. However, it is defined in some of the most usual ones, such as List or Seq.

* Fold combines the signals to create a summary value.
In the case of data structures that can be folded Haskell defines the typeclass `Data.Foldable`.

As you may know, Haskell is based on Category Theory, the most abstract branch of mathematics. What that means is that the metaphor is not restricted to lists, we can abstract even more moving away from concrete data structures as long as they follow the high level structures defined in Category Theory. We would need a few more blog posts, better say a few books, to explain this in detail, but as a simple example consider the Functor abstraction, which is an abstraction for data structures whose contents can be mapped.

We could also look a it from a different perspective considering that everything is a sequence, where list is the most generic one, e.g:

* Maps can be thought as a sequence generators, e.g. It can generate a sequences with its keys, with its values or it can pair them together as a sequence of pairs where each element is composed by key and the value.
* Maybe could be considered a sequence that can contain zero or one signals.
* Either as a sequence that contains a single signal which can be of one of two possible types.
* Tuples, in concrete pairs `(,)` could be considered as a sequence that contains exactly two signals.

Different sequences have different constraints, structures and semantics, but they are equally valid from the operations point of view. This is because the concrete sequences are just concrete examples of abstract mathematical structures.

## Enumerate -> (a bunch of combinators) -> Fold (Include diagram of the stages)

By now you may have realized that all the examples described in this post follow the same structure with the following shape, enumeration followed by different compositions of the standard operations, followed by a fold or reduction to a summary value, in other words:

1. Computations always start with some sort of enumeration, which generates the initials values to start a computation. This is not limited to what we have seen so far as enumerating the leaves or a tree or the integers in a given range. Enumerate could also be a query to a data base that returns a sequence of products, or a sequence of products that we received via a REST endpoint. When considering lazy evaluation Enumerate can also generate infinite sequences of signals.
2. Once we have the initial signals we pass them through the different stages of processing, e.g. filter, map, flatMap, zip, required to get the signals into a form in which we can extract the desired result from.
3. To finish up the computation we fold or reduce the signals to a summary value which is the end result for the computation in question.

This pattern is extremely useful and can be applied to most, if not all, computations out there.

## Conclusion

## References

SICP BOOK

LINKS
https://softwareengineering.stackexchange.com/questions/284912/why-sequences-are-recommended-as-conventional-interfaces
https://berkeley-cs61as.github.io/textbook/sequences-as-conventional-interfaces.html
