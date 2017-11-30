---
layout: post
name: 2017-11-30-applicatives-validation
title: Applicative Functors and data validation
date: 2017-11-30 07:00:00 +00:00
author: Carlos Morera de la Chica
image:
   src: /assets/img/custom/blog/2016-05-25-haskell.svg
tags:
- functional programming
- Haskell
- applicatives
- functors
---

I am currently reading [Haskell Programming from first principles](http://haskellbook.com/), also known as the Haskell book, as part of my journey to learn functional programming. The book has helped me to acquire many new intuitions and I will share two of them, Functors and Applicative Functors. 

To begin with, we will start with a basic introduction to Functors and Applicative Functors, exploring the interface they provide. This will set the ground for the second part of this series, where we will show how to leverage Applicative Functors to validate input data. 

We will be following some code samples written in Haskell. It is not required to know Haskell to follow this series, we will be explaining the code snippets in detail.

## Theory

In order to define Applicative, we first need to define another structure that is part of its core, Functor. The Applicative structure is built on top of a functor.

Functor and Applicative are mathematical abstractions, but we are going to expose a **very relaxed** definition, as the focus of this post is to show how to use Applicative Functors for data validation. That being said, it is very important to understand that both Functor and Applicative are data structures defined together with a series of laws. We should test and verify that the implementations we pick are fully compliant with the laws. They ensure that the properties obtained by translating these concepts from mathematics into code are preserved, such as safe composition of functions and structures.

### Functor

A Functor is a [higher-kinded type](<https://en.wikipedia.org/wiki/Kind_(type_theory)>), that is a generic data structure which takes one type argument. Functor defines the structure together with a function `map` to operate with the content of the data structure. `map` is a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) that applies a given function to the content of the structure, we will explore its type signature soon. 

> Functor provides a single way to interact with the content of the data structure, and that is by applying a function to the content. 

Functor is defined in Haskell as the [Functor typeclass](https://hackage.haskell.org/package/base-4.10.0.0/docs/Data-Functor.html), which provides the `fmap` function. It is worth noting that `fmap` is the same as the `map` function defined in other languages.

The definition of the Functor typeclass is as follows:

```
             (1)
class Functor f where
    fmap :: (a -> b) -> f a -> f b
     (2)
```

1. This is the typeclass declaration and it defines that Functor takes one type argument *f*. This type argument is the structure.
2. This is the definition of the `fmap` function. It takes two parameters, a function `a -> b`, and a structure *f* that takes one type argument of type *a*, `f a`, and returns a new structure *f* that takes one type argument of type *b*, `f b`.

There are plenty of Functor instances defined in Haskell, but we will show the two canonical ones, `List` and `Maybe`. This last one is also known as Optional in other languages.

The definition of the data type List, `[]`, and Maybe are as follows:

```
data [] a = [] | a : [a]
data  Maybe a  =  Nothing | Just a
```

If we substitute the *f* in the Functor definition for List and Maybe respectively, we get the following:

```
fmap :: (a -> b) ->     f a   ->      f b
fmap :: (a -> b) ->     [ a ] ->      [ b ]
fmap :: (a -> b) -> Maybe a   -> Maybe  b
```

As we can see, the type signature of the `fmap` function shows that it converts a given structure *f* that takes one type argument of type *a*, to the same structure, but with a type argument of type *b*.

* The implementation of `fmap` for `List`, applies the function `a -> b` to each of its elements, converting `[a]` to `[b]`.
* In the case of `Maybe`, it is a bit different, given the nature of the Maybe structure. The Maybe structure is used to signal absence and its representation may contain one element of type *a* if the value is `Just`, signalling existence, or no elements at all if the value is empty, represented as `Nothing`, signalling absence. Therefore, the implementation of `fmap` for `Maybe` applies the function `a -> b` to the element inside `Just` or simply does nothing if the value is empty, returning a `Nothing` value. If the value is `Nothing` it is literally impossible to apply the function as there is no value to apply it to.

Note how applying `fmap` has a different connotation depending on the structure that implements it, even when conceptually is the same operation.

For example, apply (+1) to each element of a list:

```
fmap (+1) [1..5]
[2, 3, 4, 5, 6]
```

Apply (+1) to Just and Nothing

```
fmap (+1) (Just 1)
Just 2

fmap (+1) Nothing
Nothing
```

### Applicative

Applicative is defined in Haskell also as a typeclass. 

```
          (1)                 (2) 
class Functor f => Applicative f where
   (3)
  pure  :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
   (4)
```

1. As we mentioned before the Applicative structure is based on a Functor. The typeclass for Applicative specifies that every type that can have an Applicative instance must also have a Functor instance. 
2. As in the Functor definition, Applicative declares a structure that is used in the functions below.
3. The function `pure` takes an argument of type *a* and embeds it in a structure *f*.
4. The function `<*>`, read as `apply`, is defined as an infix operator, meaning that in order to apply it we have to place it between its two arguments; we will see an example shortly. `<*>` also takes two arguments as `fmap` does, but in this case, both arguments, the function and the value, are wrapped in a structure *f*. 

Let's put the type signatures of `fmap` and `<*>` side by side, so that we can observe the similarities and differences between them:

```
fmap ::   (a -> b) -> f a -> f b
<*>  :: f (a -> b) -> f a -> f b
```

The signatures for both functions are quite similar, but as we can see the difference is that in the case of `<*>` not only `a` is wrapped in the structure `f`, but also the function `a -> b`.

As a note, it is worth mentioning that Applicatives are also known as Monoidal Functors. If you are familiar with the concept of Monoid, you may see that when dealing with the `<*>` function, we have **two arguments** (a function, and a value) wrapped in a structure of the **same type**, so we have to be able to somehow **merge** or **combine** both structures into a single one in order to produce a result. 

Let's substitute the *f* for List and Maybe as we did previously.

List Applicative:

```
pure :: a -> [a]
<*>  :: [a -> b] -> [a] -> [b]
```

The implementation of `pure` for List takes a value of type *a* and wraps it in a List.

```
Prelude> pure 5 :: [Int]
[5]
```

We are going to prepend expressions with "*Prelude>*" to indicate that we are evaluating them, as [ghci](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/ghci.html) does. ghci is the interactive environment for Haskell.

The `:: [Int]` is needed in order to tell the compiler that we want it to use the Applicative instance for List. This is needed because we are executing this line in isolation, if we were writing this function combined with others that carry a type, the compiler would infer the type and the typeclass instance for us.

The implementation of `<*>` for List takes a list of functions, `[a -> b]`, and a list of values of type *a*, `[a]`, and returns a list of values of type *b*, `[b]`. It applies every function contained in the first argument list to every value in the second argument list, returning a list with the results of applying every function to every element. 

As in the `fmap` implementation for List, `<*>` applies the given function to each element of the given List, but in this case, it takes a List of functions, so it applies them all.

```
Prelude> [(+1), (*2)] <*> [10, 100, 1000] 
= [1 + 10, 1 + 100, 1 + 1000, 2 * 10, 2 * 100, 2 * 1000] -- This intermediate result does not appear in ghci
= [11    , 101    , 1001    , 20    , 200    , 2000]
```

Maybe Applicative:

```
pure :: a -> Maybe a
<*>  :: Maybe (a -> b) -> Maybe a -> Maybe b
```

The implementation of `pure` for Maybe takes a value of type *a* and wraps it in a `Just`.

```
Prelude> pure 5 :: Maybe Int
Just 5

```
As before, the `:: Maybe Int` tells the compiler to use the Applicative instance for Maybe.

The implementation of `<*>` for Maybe takes a function `a -> b` wrapped in a Maybe structure, `Maybe (a -> b)`, and a value of type *Maybe a* and it returns a value of type *Maybe b*. As in `fmap`, the result will vary depending on the Maybe value, but in this case, the function is also wrapped in a Maybe structure so it may or may not be there.

There are four possible combinations, but only one of them produces a *success* scenario:

```
Prelude> Just (\x -> x + 1) <*> Just 1
Just 2

Prelude> Nothing <*> Just 1
Nothing

Prelude> Just (\x -> x + 1) <*> Nothing
Nothing

Prelude> Nothing <*> Nothing
Nothing
```

`<*>` can only apply the function in the first argument to the value in the second argument if both are `Just`, otherwise it either does not have a function, a value or none of them.

## Conclusion

As we just saw Applicatives can be used for many different purposes as the meaning of applying the function `<*>` changes depending on the structure that implements it:

If the structure is List then it applies a list of functions to a list of values;
If the structure is Maybe it applies the function to the value if both the function and the value are present.

After seeing the Maybe Applicative, you may be wondering in what situation we can have a function argument that may or may not be there. We are going to see how we can use this idea to perform data validation operations in the second part of this series.

Stay tuned!
