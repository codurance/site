---
layout: post
asset-type: post
name: bank-kata-in-haskell-printing
title: Bank kata in Haskell - printing a statement
date: 2019-02-20 07:00:00 +00:00
author: Liam Griffin-Jowett
image:
    src: TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
canonical:
    name: my personal blog
    href: TODOOOOOOOOOOOOOOOOOOOOOOOOO
tags:
    - functional programming
    - haskell
abstract: How to print, hold state, and keep things tested
alias: [/2019/02/20/bank-kata-in-haskell-state]
---

# Bank kata in Haskell - printing a statement

## Recap

[Last post](https://codurance.com/2019/02/11/bank-kata-in-haskell-state/) we looked at dealing with state when using our bank account. Here's a recap of the code we ended up with:

```haskell
-- our bank functions
deposit :: Int -> State [Transaction] ()
deposit amount = modify (\transactions -> transactions ++ [Deposit amount])

withdraw :: Int -> State [Transaction] ()
withdraw amount = modify (\transactions -> transactions ++ [Withdrawal amount])

getStatement :: State [Transaction] String
getStatement = gets generateStatement -- the details of generateStatement are out of scope of this post

-- and here's the usage
main = do
  let statement = evalState useMyBank []
  print statement

useMyBank :: State [Transaction] String
useMyBank = do
  deposit 200
  withdraw 100
  getStatement
```

Notice how the user has to get the statement and print it to the console, whereas the bank kata states that our library code should have that responsibility.

## Trying to use state and print

In order to print to the console, we need to use the `IO` monad. Here's a function that prints using `IO`:

```haskell
putStr :: String -> IO ()
```

`putStr` will take a `String` to be printed and return `IO` of unit. We want to use this function with the result of `generateStatement`.

Our first attempt might look something like this:

```haskell
printStatement :: State [Transaction] ()
printStatement = do
  transactions <- get
  let statement = generateStatement transactions
  putStr statement
```

But this won't compile:

```haskell
-- compiler output simplified for brevity
Couldn't match type ‘IO’
               with ‘State [Transaction]’
      Expected type: State [Transaction] ()
        Actual type: IO ()
```

To use `putStr` we need a type of `IO`, but our type is `State [Transaction]`! `putStr` uses a different type of monad and that doesn't compose with our `State`.

## Monad transformers to the rescue

To use two or more monads together, you need to use a monad transformer. What does that mean? The simplest definition I've seen is this:

> A monad transformer takes something that does one thing, and then adds the capability to do another.

In our case, our current monad does one thing (deals with state), and we want to add the capability to output text to the console.

## StateT

To do this we will use a monad transformer called `StateT`. This has all the functions `State` has, plus the ability to use `IO` or any other monad too. The `StateT` general type is `StateT s m a`, where `s` is our type of state, `m` is the monad capability we want to add, and `a` is our return value. As you can see it almost the same type as `State`, but with an added `m`. With this we can write our `printStatement` in almost the same way we specified earlier.

```haskell
printStatement :: StateT [Transaction] IO ()
printStatement = do
  transactions <- get
  let statement = generateStatement transactions
  lift (putStr statement)
```

Notice how the type of `printStatement` has changed from `State [Transaction] ()` to `StateT [Transaction] IO ()`.

Let's explain `lift`. The type of `putStr "a string"` is `IO ()`. This doesn't match the type of `printStatement`, we need to make it match. This is what lift does for us.

```haskell
lift :: m a -> t m a
-- more concretely for our use case
lift :: IO () -> StateT [Transaction] IO ()
```

`putStr` will still work as we expect it to work, but now it's type matches so we can use it within `printStatement`.

Users of our code can now tell us to print a statement instead of doing it themselves. To do this there is a `runStateT` function, just as there is a `runState` for `State` types.

```haskell
main = do
  runStateT useMyBank []
  pure () -- we need to return IO () for main

useMyBank :: StateT [Transaction] IO ()
useMyBank = do
  deposit 200
  withdraw 100
  printStatement
```

Side note: we'll also need to change the type signature of our `deposit` and `withdraw` methods to `StateT [Transaction] IO ()`, but the function implementations don't need to change which is pretty cool.

## What about testing?

Uh oh, we've lost our ability to test the statement output, as it is printed as a side effect and not returned.

```haskell
it "sends statement to the aether" $ do
  runStateT printStatement [Deposit 100] `shouldBe` ... -- the return type is IO ((), [Transaction]), statement is gone
```

We need to abstract the printing in some way, as it is at the boundary of our system - just like we would in an OOP language. There are two main options that I know of:

1. Abstract what does the printing as a parameter to the `printStatement` function (Inspired by [this blog post](https://www.parsonsmatt.org/2017/07/27/inverted_mocking.html)).
2. Use a typeclass to specify a type constraint on our `m` in `StateT`, which specifies the statement printing behaviour we want. Think of this like an interface in C#/Java.

## Abstract printing as a parameter

Simple enough, we will make an inner `printStatement` function that takes as a parameter something that prints. We will specify 'something that prints' to be a monad `m ()`, i.e. something that does a side effect and returns nothing. Notice how we've generalised the type away from `IO ()`, which means for testing we can specify a different monad which stores the side effect so that we can test the intended output.

```haskell
printStatement :: StateT [Transaction] IO ()
printStatement = innerPrintStatement putStr

innerPrintStatement :: Monad m => (String -> m ()) -> StateT [Transaction] m ()
innerPrintStatement printer = do
  transactions <- get
  let statement = generateStatement transactions
  lift (printer statement)
```

We can now test the innerPrintStatement. Since the `m` is polymorphic, we can swap out the `IO` for a different monad - `Writer String`, which will store our printed statement for us to test.

```haskell
testPrintStatement :: StateT [Transaction] (Writer String) ()
testPrintStatement = innerPrintStatement (\statement -> tell statement)

it "prints a statement" $ do
  -- evalStateT works just like evalState, except it will return us a `Writer String ()` instead of just `()`
  -- we can then use execWriter to get the String from Writer String ()
  execWriter (evalStateT testPrintStatement [Deposit 100, Withdrawal 50]) `shouldBe` "Deposited 100\nWithdrew 50"
```

That wasn't so bad :) but there are two things I personally don't like.

1. We are testing `innerPrintStatement` rather than the function actually being used by our users.
2. Our constraint `Monad m =>` is far too generic and doesn't relay the intent of the statement printing code.

## Use a typeclass constraint

In haskell, type constraints are used to so that we have access to more functions to deal with our datatypes. As a small example, consider this.

```haskell
areTheseEqual :: a -> a -> Bool
areTheseEqual a b = a == b
```

Trying to compile this throws an error: `No instance for (Eq a) arising from a use of ‘==’`.
Our type `a` in the signature is as polymorphic as it gets. We know nothing about it, including whether two of that type can be compared for equality.

The answer to this is hinted in the compiler output - we need to specify that `a` is an instance of the `Eq` class. If we do that we know we will have an `==` method available.

Brief explanation aside, let's create a typeclass that represents the intent of printing a statement.

```haskell
class MonadStatementPrinter m where
  printStmt :: String -> m ()
```

Now we can add a type constraint to our `m` in `printStatement`, such that any `m` that is used must have a `printStmt` function with the type signature above.

```haskell
printStatement :: (Monad m, MonadStatementPrinter m) => StateT [Transaction] m ()
printStatement = do
  transactions <- get
  let statement = generateStatement transactions
  lift $ printStmt statement
```

Cool. Building this makes the compiler spew an error (we'll talk about the compiler errors in the tests later):

```haskell
Main.hs:18:3: error:
  • No instance for (MonadStatementPrinter IO)
    arising from a use of ‘printStatement’
```

We have our typeclass constraint (interface), but nothing implementing it! Let's make `IO` implement our interface so we can print to the console.

```haskell
instance MonadStatementPrinter IO where
  printStmt = putStr
```

Even cooler. This works without any changes to the usage of our code. What's also good is that though we have our default implementation for IO, our users can also specify their own instance should they need to do something else.

Now for testing. We're getting a similar error to above: `No instance for (MonadStatementPrinter (Writer String))`. We just need an instance of `Writer` for our `MonadStatementPrinter` typeclass!

```haskell
instance MonadStatementPrinter (Writer String) where
  printStmt = tell
```

Awesome. Now let's clear up the testing for `deposit` and `withdraw`. We don't need our `MonadStatementPrinter` constraint for these functions so we can use a simpler monad called `Identity` that does nothing, and returns our result.

```haskell
it "deposits money" $ do
  runIdentity (execStateT (deposit 100) newBank) `shouldBe` [Deposit 100]

it "withdraws money" $ do
  runIdentity (execStateT (withdraw 100) newBank) `shouldBe` [Withdrawal 100]
```

Et voila! Our functions are both dealing with state _and_ printing, and are covered by tests.

