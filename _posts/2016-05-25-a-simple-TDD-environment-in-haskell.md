---
layout: post
asset-type: post
name: simple-tdd-environment-haskell
title: A simple TDD environment in Haskell
date: 2016-05-25 00:01:00 +00:00
author: Liam Griffin
image:
    src: /assets/img/custom/blog/2016-05-25-haskell.svg
tags:
- tdd
- haskell
---

I recently implemented the [bowling kata in Haskell](https://github.com/Gryff/bowling-kata). In the process, I found out how set up my environment to comfortably do Test Driven Development. Hopefully, others might find this post helpful to begin their journey with the language. I used the following components:

- Haskell installation: [Haskell Platform](https://www.haskell.org/platform/). This also gives you GHCi which you can use as an interactive environment and type inspector.
- IDE: Any editor would suffice, but I used [Visual Studio Code](https://code.visualstudio.com/) as they have an extension for Haskell that gave me some basic [IntelliSense](https://msdn.microsoft.com/en-us/library/hcw1s69b.aspx) features.
- Test libraries: [Hspec](http://hspec.github.io/), which is based on [RSpec](http://rspec.info/). This can be installed using Haskell's package manager, cabal, from the command line with ```cabal install hspec```.
- Helper libraries: Printf for colourful command line output.

Using the example from Hspec's documentation, I began with this structure for my code:

BowlingTests.hs

```haskell
module BowlingTests where

import Bowling

import Test.Hspec
import Text.Printf (printf)

testScoreGame :: String -> Int -> Spec
testScoreGame game score =
  it (printf “should return the score for game : %s → %d \n” game score) $
    scoreGame game `shouldBe` score

main = hspec $ do
  describe "scoreGame" $ do 
    testScoreGame "--------------------" 0
```


So to test a function, you add a function in your test file, usually the same name with a ‘test’ prefix. This function takes the inputs to your function under test and the expected output as parameters. Then using Hspec you describe what you are testing. As you can see the ‘it’ part is written in the test function. You can of course omit this helper function and write all your tests under ```main = hspec $ do```, which may be nicer if you want to describe in more detail what each individual test is testing.

Bowling.hs

```haskell
module Bowling where

scoreGame :: String -> Int 
scoreGame game = 0
```


These files are in the same directory, now I can run my tests from the command line.

```
$ runhaskell BowlingTests.hs

scoreGame
should return the score for game : — — — — — — — — — — → 0

Finished in 0.0000 seconds
1 example, 0 failures
```

There you have it. Now I can focus on writing a failing test and making it pass.
