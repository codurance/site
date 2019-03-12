---
layout: post
asset-type: post
name: bank-kata-in-haskell-date
title: Bank kata in Haskell - using and testing date
date: 2019-03-12 07:00:00 +00:00
author: Liam Griffin-Jowett
image:
    src: /assets/custom/img/blog/2019-03-12-bank-kata-in-haskell-date/calendar.jpg
canonical:
    name: my personal blog
    href: https://medium.com/@Gryff/bank-kata-in-haskell-using-and-testing-date-6a34bd97eba7?source=friends_link&sk=68cede42cf8619ad4d0adfd3a21aa93d
tags:
    - functional programming
    - haskell
abstract: Adding the current date using the compiler and tests to drive the design
alias: [/2019/03/12/bank-kata-in-haskell-date]
---

# Bank kata in haskell - using and testing date

## Recap

[Last post](/2019/02/21/bank-kata-in-haskell-printing/) we looked at printing whilst holding state. Here's the code we ended up with:

```haskell
-- our Transaction type
data Transaction = Deposit Int | Withdrawal Int

-- our bank functions
deposit :: Monad m => Int -> StateT [Transaction] m ()
deposit amount = modify $ \transactions -> transactions ++ [Deposit amount]

withdraw :: Monad m => Int -> StateT [Transaction] m ()
withdraw amount = modify $ \transactions -> transactions ++ [Withdrawal amount]

printStatement :: (Monad m, MonadStatementPrinter m) => StateT [Transaction] m ()
printStatement = do
  transactions <- get
  let statement = toStatement transactions
  lift $ printSt statement

-- in our test file
it "deposits money" $ do
  runIdentity (execStateT (deposit 100) newBank) `shouldBe` [Deposit 100]

it "withdraws money" $ do
  runIdentity (execStateT (withdraw 100) newBank) `shouldBe` [Withdrawal 100]

it "prints a statement" $ do
  execWriter (evalStateT printStatement [Deposit 100]) `shouldBe` "Desposited 100 | Balance 100\n"
```

Our final task to complete the kata is to add a date to the transactions. We will implement this in small logical steps, using the compiler and the tests to drive our design. Let's begin!

## Change `Transaction` to contain a date

```haskell
import Data.Time

data Transaction = Deposit Int UTCTime | Withdrawal Int UTCTime
```

This will cause a compile time error - `deposit` and `withdraw` are not creating a valid `Transaction` type anymore, as well as our test functions. We will add a fixed date to these so we can compile.

```haskell
firstOfJan2019 = UTCTime (fromGregorian 2019 01 01) (secondsToDiffTime 0)

-- ...
deposit amount = modify $ \transactions -> transactions ++ [Deposit amount firstOfJan2019]

-- same for `withdraw`, and in test functions
```

Now we have modified our type to be the shape we want, we can think about how to get the current date into the transaction, again without sacrificing testability. We will continue to follow the monad transformers style by adding a type constraint to our `m`.

## Introduce the `MonadCurrentDateTime` type constraint

```haskell
class MonadCurrentDateTime m where
  currentDateTime :: m UTCTime
```

Now we want to use this type as a constraint in our `deposit` and `withdraw` methods to ensure we can use it.

```haskell
deposit :: (Monad m, MonadCurrentDateTime m) => Int -> StateT [Transaction] m ()

withdraw :: (Monad m, MonadCurrentDateTime m) => Int -> StateT [Transaction] m ()
```

The compiler tells us what to do next.

```haskell
Main.hs:15:3: error:
  • No instance for (MonadCurrentDateTime IO)
      arising from a use of ‘deposit’

...

BankSpec.hs:31:32: error:
  • No instance for (MonadCurrentDateTime Identity)
      arising from a use of ‘deposit’
```

As the compiler says, our usage of deposit is invalid because `IO` is not an instance of `MonadCurrentDateTime`, and so can't give us a `currentDateTime` function to use. A similar scenario is happening in our test file. Let's fix both.

```haskell
instance MonadCurrentDateTime IO where
  currentDateTime = getCurrentTime -- this comes from Data.Time

-- in our test file
instance MonadCurrentDateTime Identity where
  currentDateTime = pure firstOfJan2019
```

Now we're compiling, and our tests our passing because we hardcoded the date in our Bank code. Now let's use the 'real' date (as far as our functions are concerned).

## Use the `MonadCurrentDateTime` typeclass

```haskell
deposit amount = do
  now <- lift currentDateTime
  modify $ \transactions -> transactions ++ [Deposit amount now]
```

It's as simple as that :). We are now using the date returned in our `Identity` instance of `MonadCurrentDateTime`. You can now do the work to add the date into the statement output, which I'll leave out of the scope of this post.

Let's write one last test as an acceptance test that proves everything is working together.

## Testing it all together

```haskell
-- we'll need an instance of `Writer String` for `MonadCurrentDateTime` for our test
instance MonadCurrentDateTime (Writer String) where
  currentDateTime = pure firstOfJan2019

testMyBank :: StateT [Transaction] (Writer String) ()
testMyBank = do
  deposit 200
  withdraw 100
  deposit 3000
  printStatement

-- output changed to match what the statement should look like
it "can deposit, withdraw and print a statement" $ do
  execWriter (evalStateT testMyBank []) `shouldBe` "\
    \date       || credit || debit || balance\n\
    \01/01/2019 || 200.00 || || 200.00\n\
    \01/01/2019 || || 100.00 || 100.00\n\
    \01/01/2019 || 3000.00 || || 3100.00\n"
```

And we are done!

Notice how we didn't need to change the _usage_ of our functions in `Main.hs`, the API stayed the same, we merely added some more functionality.

