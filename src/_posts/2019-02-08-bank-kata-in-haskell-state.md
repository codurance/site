---
layout: post
asset-type: post
name: bank-kata-in-haskell-state
title: Bank kata in Haskell - dealing with state
date: 2019-02-08 07:00:00 +00:00
author: Liam Griffin-Jowett
image:
    src: /assets/custom/img/blog/2019-02-08-bank-kata-in-haskell-state/bank-kata-oop-diagram.png
tags:
    - functional-programming
    - haskell
abstract: Dealing with state in the bank kata in Haskell
alias: [/2019/02/08/bank-kata-in-haskell-state]
---

# Bank kata in Haskell - dealing with state

In OO languages you usually have some sort of transaction repository that you add deposits and withdrawals to, and this stores your transactions.

It might look something like this:


<p style="width: 420px; margin: 2em auto">
    <img src="{{site.baseurl}}/assets/custom/img/blog/2019-02-08-bank-kata-in-haskell-state/bank-kata-oop-diagram.png" title="bank kata OOP diagram" alt="bank kata OOP diagram">
</p>


This repository pattern is used to encapsulate the state, either in memory or from a database. In functional programming, you cannot encapsulate state or you lose it. Anything that is not returned from a function is lost. So, how do we deal with storing them?

## Starting with the domain - adding deposits and withdrawals

First we'll define a type for our transactions:

```
data Transaction = Deposit Int | Withdrawal Int
```

A `Transaction` can either be a `Deposit` or a `Withdrawal`. This is a sum type in Haskell, which you can relate to an enum in a static object-oriented language. They both wrap an `Int` which is the value of the transaction. Let's think about what we want our `deposit` function to look like.

```
deposit :: Int -> [Transaction] -> [Transaction]
```

`deposit` takes an amount to deposit, a list of `Transaction`s to add the deposit to, and because we can't _not_ return our list or we lose it - returns us a list of `Transaction`s with the new `Deposit` added to it. `withdraw` would look very similar.

Now we can write a test for the behaviour we want `deposit` to have.

```
it "stores deposits" $ do
  deposit 100 [] `shouldBe` [Deposit 100]
```

Writing the production code to pass this is simple:

```
deposit :: Int -> [Transaction] -> [Transaction]
deposit amount transactions = transactions ++ [Deposit amount]
```

Withdraw will have the same function signature, but the body will add a Withdrawal.

## Making a statement

```
getStatement :: [Transaction] -> String
```

`getStatement` will take our transactions and, for simplicity, return a nicely formatted string which will be our statement. And here we see the crux of the problem: once we return `String` we lose our list of transactions! Looks like we'll have to return them too.

```
getStatement :: [Transaction] -> (String, [Transaction])
```

Now we return a tuple of `String` and `[Transaction]`, so we can use them somewhere else if needs be. I'll leave the function body as it's out of the scope of this article. For testing:

```
it "makes a statement" $ do
  fst (getStatement [Withdraw 100]) `shouldBe` "Withdrew 100\n"
```

What might usage of this look like?

## Using our domain functions

```
useMyBank :: [Transaction] -> (String, [Transaction])
useMyBank initialTransactions = let
  newTransactions = deposit 100 initialTransactions
  newTransactions2 = withdraw 50 newTransactions
  (statement, newTransactions3) = getStatement newTransactions2
  in (statement, newTransactions3) -- we can return the result of getStatement directly, this is just to show what's going on
```

`useMyBank` will return us the same tuple type as `getStatement` so we can use the statement and transactions somewhere else.

We can start to see how this will be cumbersome to use. We can also see dupllication in the structure of dealing with our functions, particularly demonstrated by transaction1/2/x naming. Let's fix this.

## Reshape our functions to expose duplication

There's a pattern we're going to refactor to, called the State monad. In order to do this we'll need our functions to have a similar signature. So let's change depositing and withdrawing to match `getStatement`:

```
deposit :: Int -> [Transaction] -> ((), [Transaction])
deposit amount transactions = ((), transactions ++ [Deposit amount])

-- similar for withdraw
```

Now what is returned from the function is similar in all cases - `(answer, [Transaction])`, where `answer` might be a string in case of `getStatement`, or nothing in case of just adding a deposit/withdrawal. Using these functions looks similar:

```
useMyBank :: (String, [Transaction])
useMyBank initialTransactions = let
  (_, newTransactions) = deposit 100 initialTransactions
  (_, newTransactions2) = withdraw 50 newTransactions
  (statement, newTransactions3) = getStatement newTransactions2
  in (statement, newTransactions3)
```

The duplication is now more obvious. If only there was some abstraction to deal with this :). Enter the State monad.

## Refactoring to the State monad

```
newtype State s a = State { runState :: s -> (a,s) }

-- more concretely for our use case:
State [Transaction] a = { runState :: [Transaction] -> (a, [Transaction]) }
```

`State` is just a wrapper around our function, and the `a` can change depending on if we are storing a transaction or getting a statement. So how do we use it? We have a type constructor `State` that takes a function of signature `s -> (a, s)` and returns us a `State` type.

```
deposit :: Int -> State [Transaction] ()
deposit amount = State (\transactions -> ((), transactions ++ [Deposit amount]))

getStatement :: State [Transaction] String
getStatement = State (\transactions -> (generateStatement transactions, transactions)
```

What advantages do we get from using `State`? It encapsulates the storing of state as a side effect, so we can focus on the domain of our code (adding deposits/withdrawals, generating statements) without worrying about the structure of storing state.

```
useMyBank :: State [Transaction] String
useMyBank = do
  deposit 200
  withdraw 100
  getStatement

main = do
  let statement = runState (useMyBank []) -- [] is our initial transactions
  print statement
```

We can see far more clearly what is happening, similar to what the procedural usage of a bank might look like in OOP languages.

Testing is similar to before:

```
it "stores deposits" $ do
  snd (runState (deposit 100) []) `shouldBe` [Deposit 100]

it "makes a statement" $ do
  fst (runState getStatement [Withdraw 100]) `shouldBe` "Withdrew 100\n"
```

Wonderful! But wait, we are not matching the requirements, we're returning the statement to the user and giving them the responsibility of printing it. Printing something involves using the `IO` monad, which means we need to combine two monads. This can be difficult for inexperienced Haskell developers to get to grips with, so I'll explain it in my next post.

