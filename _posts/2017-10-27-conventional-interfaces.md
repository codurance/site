---
layout: post
name: 2017-10-26-conventional-interfaces
title: Conventional Interfaces in Functional Programming
date: 2017-10-14 10:20:00 +00:00
author: Carlos Morera de la Chica
image:
   src: /assets/img/custom/blog/sicp.jpg
attribution:
      text: Structure and Interpretation of Computer Programs, Second Edition
      href: https://mitpress.mit.edu/sicp/
tags:
- functional programming
- Haskell
- SICP
---

Whilst reading [Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sicp/full-text/book/book.html), also known as the **SICP** book, I discovered the concept of **Sequences as Conventional Interfaces**. Even though it is an idea that I was somewhat familiar with, it was the first time I encountered a more formal definition for it. Reading about it has helped me to better understand its full power.


Most of the ideas and some of the code samples contained in this post originally come from the SICP book. Although it is written using Lisp the ideas and concepts are applicable to most languages. We will be following them in **Haskell** as it is the language I am currently learning and enjoying, its terse syntax also makes it a great fit for a blog post. 

## What are Conventional Interfaces

SICP describes conventional interfaces as a design principle for working with data structures. It is composed of a set of standard operators or combinators that connect the different steps required to implement computations in computer programs. 

The combinators in question may be familiar to you as they will probably be provided in some form in your preferred language, e.g. `map`, ``filter``, ``flatMap`` (also now as ``bind``), `reduce` (also known as `fold`). They let us capture common patterns in the implementation of programs that a priori are structurally different, enabling us to think and reason about different programs in the same way. This is of great importance as it enables us to intuitively express completely different and unrelated programs applying function composition to this set of combinators.

SCIP also introduces the concept of signal-processing as a metaphor to reason about this programming style.

> A signal-processing engineer would find it natural to conceptualize processes in terms of signals flowing through a cascade of stages, each of which implements part of the program plan. 

We will expand more on this metaphor later on, but for now, it is important to emphasize that making the signal-flow structure evident in the design of our programs increases the modularity and readability of the resulting code. It is also important to emphasize that the use of these combinators increase the level of abstraction at which we can write code by taking away low-level operations such as iteration, recursion or conditional statements.

To demonstrate the importance of the principle, let's consider the two following functions taken from SICP, which I have translated from Lisp to Haskell.

*A simple type representing a binary tree*

```
data BinaryTree a =
    Leaf a
  | Node (BinaryTree a) (BinaryTree a) deriving (Foldable)
```

*Sum squares of the leaves of a tree that are odd*


```
sumOddSquares :: (Integral a) => BinaryTree a -> a
sumOddSquares (Node l r)           = sumOddSquares l + sumOddSquares r
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

### <a name="similarities"></a>Hidden Signal-Flow structure

These two functions solve completely different and unrelated problems and they also are completely different in terms of the structure of their implementations. However, we are going to step back and look at them from a different perspective, so that we can discover the hidden similarities between them and expose the signal-flow structure in the implementation.

Let's break down at a high level what the functions are really doing.

`sumOddSquares`:

1. *Enumerates* the leaves of the input tree.
2. *Filters* out the leaves that contain even numbers.
3. *Maps* the remaining leaves squaring each one.
4. *Folds* (or reduces) the mapped leaves using `+`, starting at 0.

`evenFibs`:

1. *Enumerates* the interval 0 to n.
2. *Maps* each number to its corresponding Fib.
3. *Filter* out the odd Fibs.
4. *Folds* (or reduces) the remaining elements using `:` (List constructor), starting with `[]` (empty list).

Note how both implementations are now based on a similar composition of stages. 
It is also worth nothing how each number contained in the list provided by each enumeration emulates a signal going through a serie of stages, filter followed by map, map followed by filter, respectively. Both implementations finish up by folding or reducing the signals using `+` and `:` respectively.

### Breaking down the implementation of both functions

It was a truly insightful moment when I realized that indeed both functions are almost identical in structure as opposed to how it seemed at first. The reason why the given implementations are so different is the mixing of concerns that hides the signal-flow structure. To prove this, let's take a deeper look at the implementations to analyze where the mixing of concerns happens.

`sumOddSquares`:

1. The *enumeration* is partially implemented by the `Leaf` pattern match, and partially by the double recursion, tree-like, in the `Node` pattern match.
2. The *filtering* is mixed with the mapping in the `odd` case in the `Leaf` pattern match.
3. The *folding* or reduction is partially implemented by the `+` that joins the double recursion in the `Node` pattern match, and partially by the `otherwise` case in the `Leaf` pattern match.

Each pattern matching is mixing several concerns, increasing the complexity of the implementation and hiding the signal-flow structure of the computation.

`evenFibs`:

1. The *enumeration* is partially implemented by the `k > n` case and party by the `next` expression.
2. The *mapping*, although extracted to the `f` expression, is mixed with the `even` filtering in the `otherwise` case.
3. The *folding* or reduction is partially implemented by `:`, the list constructor, and partially by the `[ ]`, empty list, in the `k > n` case.

As in `sumOddSquares`, each pattern matching in `evenFibs` is mixing different concerns, failing to exhibit the signal-flow structure of the computation.

Let's refactor both functions following the steps defined previously, so that we can expose the [hidden similiarities](#similarities) and the signal-flow structure.

It is worth noting that `.` is the operator for function composition in Haskell.

`sumOddSquares`:

1. *Enumerates* the leaves of the input tree.
2. *Filters* out the leaves that contain even numbers.
3. *Maps* the remaining leaves squaring each one.
4. *Folds* (or reduces) the mapped leaves using `+`, starting at 0.

```
sumOddSquares :: (Integral a) => BinaryTree a -> a
sumOddSquares tree = foldr (+) 0 . fmap (^2) . filter odd (enumerateLeaves tree)

enumerateLeaves :: BinaryTree a -> [a]
enumerateLeaves tree = foldr (:) [] tree
```

`evenFibs`:

1. *Enumerates* the interval 0 to n.
2. *Maps* each number to its corresponding Fib.
3. *Filter* out the odd Fibs.
4. *Folds* (or reduces) the remaining elements using `:` (List constructor), starting with `[]` (empty list).

```
evenFibs' :: Integer -> [Integer]
evenFibs' to = foldr (:) [] . filter even . fmap fib (enumerateInterval 0 to)

enumerateInterval :: Integer  -> Integer -> [Integer]
enumerateInterval from to = [from..to]
```
## Signal processing metaphor

Now that we have seen how different computations can be shaped similarly by using the same set of combinators composed in different ways, let's expand on the signal processing metaphor.

As mentioned in SICP, the key to organizing programs so as to more clearly reflect the signal-flow structure is to concentrate on the "signals" that flow from one stage in the process to the next. SCIP uses Lisp, where everything is a list, therefore the signal processing metaphor fits very nicely with lists. If we move away from Lisp and to Haskell for example, the metaphor may not be as evident, but as we just showed it is equally applicable. In most of the cases, Haskell abstracts the different combinators from the concrete data structure using [type classes](https://en.wikipedia.org/wiki/Type_class), let's break down a few of them.

* Enumerate **generates** the signals that initiate the computation.
Haskell names the concept of enumeration unfolding and provides the `Data.Unfoldable` type class. [List comprehension](https://en.wikipedia.org/wiki/List_comprehension) is also available as a convenience to generate lists of values.


* Filter **discards** unwanted signals by only keeping the ones that satisfy a given predicate.
As far as I know, there is not a concrete type class in Haskell that abstracts the concept of a filterable data structure from the concrete implementation. However, there is a filter combinator defined in each of them, e.g. `List`, `Map`, `Set`, `Seq`.


* Map **converts** each signal to a different type.
Haskell defines the concept of data structures that can be mapped in the typeclass`Data.Functor`. In Haskell the `map` function is called `fmap` because it is considered as a function that maps functions, hence the f prepending map.

* Bind **nests** signals so that we can use each of them and do some extra computation based on their values. `bind` is provided by type class `Control.Monad` and it can also be applied as an index operator with `>>=`. Bind is also known as `flatMap` in other languages.


* Zip **joins** two sequences of signals as a sequence of pairs.
As far as I know, there is not a concrete type class in Haskell that abstract the concept of a zippable data structure from the concrete implementation. However, it is defined in some of the most usual ones, such as `List` or `Seq`.

* Fold **combines** the signals to create a summary value.
In the case of data structures that can be folded Haskell defines the type class `Data.Foldable`. In other languages `fold` is know as `reduce`.

To demonstrate that the idea of *Sequences as Conventional Interfaces* is not limited to lists, let's show a few examples of data structures that can be thought of as sequences:

* The `Map` data structure can be thought of as a generator of sequences, e.g. It can generate sequences with its keys, with its values or it can pair them together as a sequence of pairs where each element is composed of a key and a value.
* `Maybe`, also know as `Option`, could be considered as a sequence that can contain zero or one signal.
* `Either` as a sequence that contains a single signal which can be of one of two possible types.
* Tuples in general and pairs `(,)` in particular could be considered as a sequence that contains exactly two signals.

Different sequences have different constraints, structures and semantics, but they are equally valid from the combinators point of view. These sequences are just concrete examples of abstract mathematical structures.

## Conclusion 


By now you may have realized that both examples described in this post have a structure with the following shape, enumeration followed by a composition of standard combinators, terminating with a fold or reduction to a summary value, in other words:

1. Computations always start with some sort of **enumeration**, which generates the initials signals. This is not limited to what we have seen so far, e.g. as enumerating the leaves or a tree or the integers in a given range. Enumerate could also be a query to a database that returns a sequence of products, or a sequence of products that we received via a REST endpoint. Considering lazy evaluation enumerate could also generate infinite sequences.
2. Once we have the initial signals we pass them through the different **stages of processing**, e.g. filter, map, flatMap, zip, required to get the signals into a form in which we can extract the desired result from.
3. To finish up the computation we **fold or reduce** the signals to a summary value.

I see the pattern **Enumerate -> combinators -> Fold** as a very intuitive programming style that comes as a consequence of using **Conventional Interfaces** and it can be applied to most, if not all, computations out there. 


To close up the post, here is a FizzBuzz implementation that follows the signal-flow structure, as an extra demonstration of this pattern.

`FizzBuzz`

```
fizzBuzz :: Integer -> [String]
fizzBuzz to = fmap fizzBuzzOrNumber (enumerateGame to)

fizzBuzzOrNumber :: (String, Integer) -> String
fizzBuzzOrNumber (fizzBuzz, index) = fizzBuzz `orElse` (show index)

enumerateGame :: Integer -> [(String, Integer)]
enumerateGame to = zip fizzesBuzzes (enumerateInterval 1 to)

fizzesBuzzes :: [String]
fizzesBuzzes = zipWith (++) fizzes buzzes

fizzes :: [String]
fizzes = cycle ["", "", "Fizz"]

buzzes :: [String]
buzzes = cycle ["", "", "", "", "Buzz"]

orElse :: [a] -> [a] -> [a]
orElse [] ys = ys
orElse xs _  = xs
```

## References

[SICP](https://mitpress.mit.edu/sicp/full-text/book/book.html)
