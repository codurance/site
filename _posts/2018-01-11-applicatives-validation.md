---
layout: post
name: 2018-01-11-applicatives-validation
title: Applicative Functors and data validation
date: 2018-01-06 07:00:00 +00:00
author: Carlos Morera de la Chica
image:
   src: /assets/img/custom/blog/haskell-logo.png
tags:
- functional programming
- Haskell
- applicatives
- functors
---

In the first part of this serie we went through a basic introduction to Functor and Applicative Functor. In this second part we will go through an exercise to show how to use them to perform input data validation.

Create the types:

* `Address`
* `Body` 
* `Email`

Create the functions:

* `makeAddress` that takes a String and validates that it contains a '@'. It returns an `Address` value wrapped in a `Just` if it is valid or `Nothing` otherwise.
* `makeBody` that takes a String and validates that it is not empty. It returns a `Body` value wrapped in a `Just` if it is valid or `Nothing` otherwise.
* `makeEmail` that takes as arguments three strings, `fromAddress`, `toAddress`, and `body`. It returns an email instance wrapped in `Just` if `fromAddress`, `toAddress` and `body` are valid, `Nothing` otherwise.

Types:

```
data Address = Address String               deriving (Eq, Show)
data Body    = Body    String               deriving (Eq, Show)
data Email   = Email   Address Address Body deriving (Eq, Show)

```
It is worth noting that the data constructors for our types `Address`, `Body` and `Email` are just functions with one, one and three arguments respectively. 

For instance the `Email` constructor has the following type signature:

```
Email :: Address -> Address -> Body -> Email
```

Functions:

```
makeAddress :: String -> Maybe Address
makeAddress address = fmap Address (validateContains '@' address)

makeBody :: String -> Maybe Body
makeBody body = fmap Body (validateNonEmpty body)
    
makeEmail :: String -> String -> String -> Maybe Email
makeEmail from to body = 
  case makeAddress from of
    Nothing          -> Nothing
    Just fromAddress ->
      case makeAddress to of
        Nothing        -> Nothing
        Just toAddress ->
          case makeBody body of
            Nothing   -> Nothing
            Just body ->
              Just (Email fromAddress toAddress body)
```

Auxiliary functions to validate input.

```
validateNonEmpty :: String -> Maybe String
validateNonEmpty [] = Nothing
validateNonEmpty xs = Just xs

validateContains :: Char -> String -> Maybe String
validateContains x xs 
    | elem x xs = Just xs
    | otherwise = Nothing
```

`makeAddress` and `makeBody` successfully leveraged the functoriality of Maybe. We were able to cleanly apply the validation function to obtain a `Maybe String` to then fmap it to `Maybe Address` and `Maybe Body` respectively. 

On the other hand, the `makeEmail` implementation is much more involved and cumbersome. Let's see why we had to do the break down of Maybe values manually.

If we try to fmap the `Email` constructor as we did with `Address` and `Body ,`for `makeAddress` and `makeBody`, the expression has the following type:

```
fmap Email (makeAddress "carlos@codurance.com") :: Maybe (Address -> Body -> Person)
```

Examining the type of the expression, we can see that we have partially applied the `Email` constructor, successfully applying it to the `Address` value inside the Maybe structure. However, it is still waiting for two more arguments in order to produce the desired result type for `makeEmail`, `Maybe Email`. 

If we now try to apply the second argument by applying fmap again we get a type error, as `fmap` does not take a function embedded in a structure, but a function on its own.

```
fromAddress :: Maybe Address
fromAddress = makeAddress "carlos@codurance.com"

toAddress :: Maybe Address
toAddress = makeAddress "user@email.com"

emailWithFromApplied :: Maybe (Address -> Body -> Email)
emailWithFromApplied = fmap Email fromAddress

-- does not compile
emailWithFromAndToApplied :: Maybe (Body -> Email)
emailWithFromAndToApplied = fmap emailWithFromApplied toAddress 
```

The problem here is that the function that we are passing to `fmap` in the case of `emailWithFromAndToApplied` is wrapped in a Maybe structure and `fmap` does not accept a function wrapped in a structure. 

Applicatives to the rescue! They let us do exactly what we need, apply a function inside a structure to a value inside a structure of the same type.

Let's implement `emailWithFromAndToApplied` using `<*>`:

```
emailWithFromAndToApplied :: Maybe (Body -> Email)
emailWithFromAndToApplied = emailWithFromApplied <*> toAddress
```

Now we have successfully applied the second argument to the `Email` constructor, but there is still one more to go, the `Body` argument, so let's apply it using `<*>` once again:

```
body :: Maybe Body
body = makeBody "Haskell rocks"

emailFullyApplied :: Maybe Email
emailFullyApplied = emailWithFromAndToApplied <*> body
```

We just implemented the function `emailFullyApplied` by leveraging the power of Functor and Applicative. Let's break down what we just did:

1. We used Functor to apply the first argument of the `Email` constructor under the Maybe structure that `makeAddress` provides. This resulted in the `Email` constructor been partially applied to its first argument, `fromAddress`. The rest of the function, `Address -> Body -> Email`, is now embedded or wrapped inside a Maybe structure.
2. Once we got the function embedded in the Maybe structure, we used Applicative to be able to apply it to its second argument, `toAddress`, obtaining the `Email` constructor now applied to its two first arguments.
3. To finish up the function application, we used Applicative once again to apply the last argument of the `Email` constructor, `body`, obtaining the desired result.

The implementation did not look as bad as the first attempt, but just because we broke it down into several intermediate results. If we were to inline the implementation of the function `emailFullyApplied` we would get:

```
emailFullyApplied :: Maybe Email
emailFullyApplied = ((fmap Email (makeAddress "carlos@codurance.com")) <*> makeAddress "user@email.com") <*> makeBody "Haskell rocks"
```

The Applicative package in Haskell also provides an infix operator `<$>` for `fmap` that makes the implementation a bit nicer, by getting rid of the parenthesis. It behaves as `fmap` but it is placed between its two arguments:

```
emailFullyApplied :: Maybe Email
emailFullyApplied =
  Email <$> makeAddress "carlos@codurance.com"
        <*> makeAddress "user@email.com"
        <*> makeBody "Haskell rocks"
```

We can go back to the original `makeEmail` function by extracting the hardcoded values as parameters:

```
makeEmail :: String -> String -> String -> Maybe Email
makeEmail from to body =
  Email <$> makeAddress from
        <*> makeAddress to
        <*> makeBody body
```

It is worth noting that this implementation of `makeEmail` apart from being far nicer than the original one, is much easier to extend if we were to add more arguments or fields to the `Email` constructor.

> Map a function using `<$>` to partially apply it and to embed it inside a structure, then apply it to the rest of it arguments using `<*>`

This pattern is so common in Haskell that the Applicative package provides several utility functions, `liftA2`, `liftA3`... The *liftAn* functions will take a function of *n* arguments and will apply it to all its arguments wrapped in a structure *f*.

For instance, *liftA3*, takes a function of three arguments and three values wrapped in a structure *f* and it applies the function to the values as we did in the `makeEmail` implementation:

```
liftA3 :: Applicative f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d`

```

Substituting our types:

```
liftA3 :: Applicative f => 
    (a  -> b -> c -> d)
    -> f a
    -> f b
    -> f c
    -> f d
                           
liftA3 ::
    (Address -> Address -> Body -> Email)
    -> Maybe Address
    -> Maybe Address
    -> Maybe Body
    -> Maybe Email
```

Rewriting `makeEmail` to make use of *liftA3*:

```
makeEmail :: String -> String -> String -> Maybe Email
makeEmail from to body =
   liftA3 Email (makeAddress from)
                (makeAddress to)
                (makeBody body)
```

#### Either & Validation

We just saw how to use the Maybe Functor and Applicative Functor to validate input data, however, Maybe can not offer any information about the error.

We will see how we can signal errors and also accumulate all the errors occurred during the validation proccess using the `Validation` data type. This is a more practical scenario for real-life applications, as it is often required to return some information about the errors. 

The data type `Validation` is very similar to `Either`. You may be familiar with `Either` as it is quite a common type in most functional languages.

```
data Either     a   b = Left    a   | Right   b
data Validation err a = Failure err | Success a
```

The definition of both types shows that `Either` and `Validation` are indeed identical, they just have different names for their type and data constructors. 

[Either](https://hackage.haskell.org/package/base-4.10.0.0/docs/Data-Either.html) is a general purpose data type. [Validation](https://hackage.haskell.org/package/Validation) is a variation of Either exclusively for validation purposes. This difference is not visible in the definitions of the data types, but it is in their Applicative instances. 

We will be using the validation package for Haskell linked above, which defines the `AccValidation` data type to accumulate errors in a given type.

* The Applicative instance for `Either` just short-circuits as soon as there is an error, as Maybe does, but it can carry with it information about the actual error.
* On the other hand, the Applicative instance for `AccValidation` does use the [Semigroup typeclass](https://hackage.haskell.org/package/base-4.10.0.0/docs/Data-Semigroup.html) to combine all the errors. 

Semigroup is an abstraction that combines two arguments of the same type into a single one, as Monoid does, but it does not have an identity element. 

We are going to show how to combine all the errors using `AccValidation` and List. List has both a Monoid instance and a Semigroup instance. The Monoid instance for List defines the identity, `mempty`, as empty list, `[]`, and the combine function, `mappend`, as list concatenation,`(++)`.

The `AccValidation` data type and its Applicative instance are defined as follows:

```
data AccValidation err a = AccFailure err | AccSuccess a deriving (Eq, Ord, Show, Data, Typeable)

Semigroup err => Applicative (AccValidation err)
```

Let's see how we can use it in code.

First we need to define an `Error` data type for our implementation:

```
data Error = EmptyBody | AddressMustContain String deriving (Eq, Show)
```

And three new functions `validateAddress`, `validateBody` and `validateEmail` that return information about the error in case there is one:

```
validateAddress :: String -> AccValidation [Error] Address
validateAddress address = maybeToValidation error (makeAddress address)
  where error = AddressMustContain "@"

validateBody :: String -> AccValidation [Error] Body
validateBody body = maybeToValidation EmptyBody (makeBody body)

validateEmail :: String -> String -> String -> AccValidation [Error] Email
validateEmail from to body =
  Email <$> validateAddress from
        <*> validateAddress to
        <*> validateBody body
```

Auxiliary function to convert Maybe to AccValidation:

```
maybeToValidation :: Error -> Maybe a -> AccValidation [Error] a
maybeToValidation error Nothing = AccFailure [error]
maybeToValidation _    (Just x) = AccSuccess x

```
Using `liftA3`:

```
validateEmail :: String -> String -> String -> AccValidation [Error] Email
validateEmail from to body =
  liftA3 Email (validateAddress from)
               (validateAddress to)
               (validateBody body)
```

Too see how errors accumulate, let's write the following two functions that feed sample data to `validateEmail`:

```
allWrong :: AccValidation [Error] Email
allWrong = validateEmail "wrong" "alsoWrong" ""

allGood :: AccValidation [Error] Email
allGood = validateEmail "carlos@codurance.com" "info@codurance.com" "Haskell rocks"
```

Evaluating both expresions in the REPL:

```
Prelude> print allWrong
AccFailure [AddressMustContain "@",AddressMustContain "@",EmptyBody]
Prelude> print allGood
AccSuccess (Email (Address "carlos@codurance.com") (Address "info@codurance.com") (Body "Haskell rocks"))
```

## Conclusion

To recap:

* Use Maybe when you don't need to carry any information about the error.
* Use Either when you need to carry information about either a single possible error or the first error when more than one are possible.
* Use Validation when you need to carry information about multiple errors.

As an extra observation, note how the type signatures for `$`, the function application operator, `<$>`, for fmap, and `<*>`, for apply, are very similar. They all play around adding an extra layer of structure to the arguments, a function and a value, and the return type. They all are function application.
  
```
$    ::   (a -> b) ->   a ->   b
<$>  ::   (a -> b) -> f a -> f b
<*>  :: f (a -> b) -> f a -> f b
```
