---
layout: post
name: 2017-10-26-conventional-interfaces
title: Conventional Interfaces
date: 2017-10-14 10:20:00 +00:00
author: Carlos Morera
image:
   src: 
canonical:
    name: Carlos's blog
    href: https://medium.com/@hkoundi/find-a-workplace-where-you-can-grow-16172a5ab957/
tags:
- functional programming
- Haskell
- SICP
---

Whilst reading [Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sicp/full-text/book/book.html), also known as the **SICP** book, I discovered the concept of **Sequences as Conventional Interfaces**. Even though it is an idea that I was somewhat familiar with, it was the first time I encountered a more formal definition for it. Reading about it has helped me to better understand its full power. 
The ideas and some of the code samples contained in this post originally come from the SICP book. Even though it is written using Lisp the ideas and concepts are applicable to most languages. We will be following them in **Haskell** as it is the language I am currently learning en enjoying, its terse syntax also makes it a great fit for a blog post. 

## What are Conventional Interfaces

SICP describes conventional interfaces as a design principle for working with data structures. It is composed of a set of standard combinators that connect the different steps required to implement computations in computer programs. 

The combinators in question may be familiar to you as they will probably be provided in some form in your preferred language, e.g. `map`, ``filter``, ``flatMap`` (also now as ``bind``), `reduce` (also known as `fold`). They let us capture common patterns in the implementation of programs that a priori are structurally different, enabling us to think and reason about different programs in the same way. This is of great importance as it enables us to intuitively express completely different and unrelated programs applying function composition to this set of combinators.

SCIP also introduces the concept of signal-processing as a metaphor to reason about this programming style.

> A signal-processing engineer would find it natural to conceptualize processes in terms of signals flowing through a cascade of stages, each of which implements part of the program plan. 

We will expand more on this metaphor later on, but for now, it is important to emphasize that making the signal-flow structure evident in the design of our programs increases the modularity and readability of the resulting code. It is also important to emphasize that the use of these combinators increase the level of abstraction at which we can write code by taking away low-level operations such as iteration, recursion or conditional statements.

To demonstrate the importance of the principle, let's consider the two following functions taken from SICP, which I have translated from Lisp to Haskell.

A simple type representing a binary tree

```
data BinaryTree a =
    Leaf a
  | Node (BinaryTree a) (BinaryTree a) deriving (Eq, Ord, Show)
```

*Sum squares of the leaves of a tree that are odd*


```
sumOddSquares :: (Integral a) => BinaryTree a -> a
sumOddSquares (Node x y)           = sumOddSquares x + sumOddSquares y
sumOddSquares (Leaf x) | odd x     = x ^ 2
                       | otherwise = 0
```

*All the even Fibonacci numbers up to a given number*

```
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

### <a name="similarities"></a>Hiden similarities

These two functions solve completely different and unrelated problems and they also seem to be completely different in terms of structure. However, we are going to step back and look at them from a different perspective so that we can discover the hidden similarities between them.

Let's break down what the functions are really doing.

`summOddSquares`:

1. Enumerates the leaves of the input tree.
2. Filters out the leaves that contain even numbers.
3. Maps the remaining leaves squaring each one.
4. Folds (or reduces) the mapped leaves using `+`, starting at 0.

`evenFibs`:

1. Enumerates the interval 0 to n.
2. Maps each number to its corresponding Fib.
3. Filter out the odd Fibs.
4. Folds (or reduces) the remaining elements using `:` (List constructor), starting with `[]` (empty list).

### Breaking down the implementation of both functions

It was a truly insightful moment when I realized that indeed both functions are almost identical in structure as opposed to how it seemed at first. The reason why the given implementations are so different is the mixing of concerns that hides the signal-flow structure. To prove this, let's take a deeper look at the implementations to analyze where the mixing of concerns happens.

`sumOddSquares`:

1. The enumeration is partially implemented by the `Leaf` pattern match, and partially by the double recursion, tree-like, in the `Node` pattern match.
2. The filtering is mixed with the mapping in the `odd` case in the `Leaf` pattern match.
3. The folding or reduction is partially implemented by the `+` that joins the double recursion in the `Node` pattern match, and partially by the `otherwise` case in the `Leaf` pattern match.

Each pattern matching is mixing several concerns, increasing the complexity of the implementation and hiding the signal-flow structure of the computation.

`evenFibs`:

1. The enumeration is partially implemented by the `k > n` case and party by the `next` expression.
2. The mapping, although extracted to the `f` expression, is mixed with the `even` filtering in the `otherwise` case.
3. The folding or reduction is partially implemented by the `:` constructor, and partially by the `[]` in the `k > n` case.

As in `sumOddSquares`, each pattern matching in `evenFibs` is mixing different concerns, failing to exhibit the signal-flow structure of the computation.

Let's refactor the previous two functions, by composing the combinators, to expose the [hiden similiarities](#similarities)

It is worth noting that `.` is the operator for function composition in Haskell.

`sumOddSquares`

```
sumOddSquares' :: (Integral a) => BinaryTree a -> a
sumOddSquares' = foldr (+) 0 . fmap (^2) . filter odd . enumerateLeaves

enumerateLeaves :: BinaryTree a -> [a]
enumerateLeaves = foldr (:) []
```


`evenFibs`

```
evenFibs' :: Integer -> [Integer]
evenFibs' x = foldr (:) [] . filter even . fmap fib $ [0..x]
```
## Signal processing metaphor

Now that we have seen how different computations can be shaped similarly by using the same set of combinators composed in different ways let's expand on the signal processing metaphor.

As mentioned in SICP, the key to organizing programs so as to more clearly reflect the signal-flow structure is to concentrate on the "signals" that flow from one stage in the process to the next. SCIP uses Lisp, where everything is a list, therefore the signal processing metaphor fits very nicely with lists. If we move away from Lisp and to Haskell for example, the metaphor may not be as evident, but as we just showed it is equally applicable. In most of the cases, Haskell abstracts the different combinators from the concrete data structure using [type classes](https://en.wikipedia.org/wiki/Type_class), let's break down a few of them.

* Enumerate generates the signals that initiate the computation.
Haskell names the concept of enumeration unfolding and provides the `Data.Unfoldable` type class. As explained previously enumerating or unfolding the leaves of a tree or the integers in a given range for the Fibonacci function. Haskell also provides [list-comprehension](https://en.wikipedia.org/wiki/List_comprehension) as a way to generate lists of values.


* Filter discards unwanted signals by only keeping the ones that satisfy a given predicate.
As far as I know, there is not a concrete type class in Haskell that abstracts the concept of a filterable data structure from the concrete implementation. However, there is a filter combinator defined in each of them, e.g. `List`, `Map`, `Set`, `Seq`.


* Map converts each signal to a different type.
Haskell defines the concept of data structures that can be mapped in the typeclass`Data.Functor`. In Haskell the `map` function is called `fmap` because it is considered as a function that maps functions, hence the f prepending map.

* FlatMap nests signals so that we can use each of them and do some extra computation based on their values.
For the flatMap combinator, known as bind in Haskell, there is the type class `Control.Monad`.


* Zip joins two sequences of signals as a sequence of pairs.
As far as I know, there is not a concrete type class in Haskell that abstract the concept of a zippable data structure from the concrete implementation. However, it is defined in some of the most usual ones, such as List or Seq.

* Fold combines the signals to create a summary value.
In the case of data structures that can be folded Haskell defines the type class `Data.Foldable`.

As you may know, Haskell is based on Category Theory, the most abstract branch of mathematics. What that means is that the metaphor is not restricted to lists, we can abstract even more moving away from concrete data structures as long as they follow the high-level structures defined in Category Theory. We would need a few more blog posts, better say a few books, to explain this in detail, but as a simple example consider the Functor abstraction, which is an abstraction for data structures whose contents can be mapped.

We could also look at it from a different perspective considering that everything is a sequence, list being the most generic one, e.g:

* The `Map` data structure can be thought of as a generator of sequences, e.g. It can generate sequences with its keys, with its values or it can pair them together as a sequence of pairs where each element is composed of a key and a value.
* `Maybe`, also know as `Option`, could be considered as a sequence that can contain zero or one signal.
* `Either` as a sequence that contains a single signal which can be of one of two possible types.
* Tuples in general and pairs `(,)` in particular could be considered as a sequence that contains exactly two signals.

Different sequences have different constraints, structures and semantics, but they are equally valid from the combinators point of view. The concrete sequences are just concrete examples of abstract mathematical structures.

## Conclusion 

**Enumerate -> combinators -> Fold**

By now you may have realized that all the examples described in this post follow the same structure with the following shape, enumeration followed by different compositions of the standard combinators, followed by a fold or reduction to a summary value, in other words:

1. Computations always start with some sort of enumeration, which generates the initials values to start a computation. This is not limited to what we have seen so far as enumerating the leaves or a tree or the integers in a given range. Enumerate could also be a query to a database that returns a sequence of products, or a sequence of products that we received via a REST endpoint. When considering lazy evaluation Enumerate can also generate infinite sequences of signals.
2. Once we have the initial signals we pass them through the different stages of processing, e.g. filter, map, flatMap, zip, required to get the signals into a form in which we can extract the desired result from.
3. To finish up the computation we fold or reduce the signals to a summary value which is the end result of the computation in question.

This pattern is extremely useful and can be applied to most, if not all, computations out there. 

Here is a FizzBuzz implementation as an extra demonstration of this pattern.

`FizzBuzz`

```
fizzes :: [String]
fizzes = cycle ["", "", "Fizz"]

buzzes :: [String]
buzzes = cycle ["", "", "", "", "Buzz"]

fizzesBuzzes :: [String]
fizzesBuzzes = zipWith (++) fizzes buzzes

fizzBuzz :: Integer -> [String]
fizzBuzz to = zipWith (\n f -> if (f /= []) then f else show n) [1..to] fizzesBuzzes
```

## References

[SICP](https://mitpress.mit.edu/sicp/full-text/book/book.html)
