---
layout: post
name: bowling-kata-in-clojure-fsharp-scala
title: Bowling Kata in Clojure, F# and Scala
date: 2016-05-16 00:01:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2016-05-16-bowling.jpg
tags:
- craftsmanship
- tdd
- scala
- clojure
- F#
--- 

In one of our evening apprenticeship meetings, a pair was doing the [Bowling Kata](http://codingdojo.org/cgi-bin/index.pl?KataBowling) in Java. After reviewing their code, I thought that it would be a good idea to do it myself.

Every craftsman at Codurance is a polyglot developer and, although we have very similar values, we all have our own preferences when it comes to programming languages and coding styles. As you can imagine, we cannot always avoid cracking a joke or two about all the languages we don’t like so much but other craftsmen in the company do. So, just for fun, quite a few of us decided to do the same kata using our language of choice. It was great to see the same problem solved with different languages. Although there are still a few craftsmen and apprentices working on solving the kata in different languages, here are 3 of my favourite solutions so far (in no particular order):

## Clojure (by Mashooq)

```clojure
(ns bowling.core-test
  (:require [clojure.test :refer :all]
            [bowling.core :refer :all]))

(deftest bowling 
  (testing "strikes for all rolls"
    (is (= 300 (score "XXXXXXXXXXXX"))))

  (testing "normal scores"
    (is (= 99 (score "91919393929291219191"))))

  (testing "normal scores or misses"
    (is (= 90 (score "9-9-9-9-9-9-9-9-9-9-")))
    (is (= 93 (score "919-9-9-9-9-929-9-9-"))))
  
  (testing "mixture of stikes and normals"
    (is (= 98 (score "9-X8-9-9-9-9-9-9-9-")))
    (is (= 104 (score "9-X8-9-9-9-9-9-9-X23")))
    (is (= 28 (score "--X81--------------")))
    (is (= 27 (score "--X8-1-------------"))))
  
  (testing "spares for all rolls"
    (is (= 150 (score "5/5/5/5/5/5/5/5/5/5/5"))))

  (testing "mixture of spares and normals"
    (is (= 82 (score "9-8/--9-9-9-9-9-9-9-")))
    (is (= 84 (score "9-8/--9-9-9-9-9-9-9/1")))
    (is (= 12 (score "--8/1---------------")))
    (is (= 11 (score "--8/-1--------------")))))
```

```clojure
(ns bowling.core)

(defn- spare?[s] (= \/ s))
(defn- strike? [s] (= \X s))
(defn- spare-or-strike? [s] (or (spare? s) (strike? s)))
(defn- miss? [s] (or (= nil s) (= \- s)))

(defn- score-for [s] 
  (cond 
     (spare-or-strike? s)  10
     (miss? s)  0 
     :else (read-string (str s))))

(defn- score-roll [this-roll rem-rolls]
  (cond 
    (strike? this-roll) (+ 10 (score-for (first rem-rolls)) (score-for (first (rest rem-rolls))))
    (spare? this-roll) (+ 10 (score-for (first rem-rolls)))
    (spare? (first rem-rolls)) 0
    :else (score-for this-roll)))

(defn- score-rolls [acc rolls]
  (if (seq rolls)  
    (let [running-score (+ acc (score-roll (first rolls) (rest rolls)))]
      (score-rolls running-score (rest rolls)))
    acc))

(defn- expand-strikes [rolls]
  (seq (reduce str  (map #(if  (strike? %) "X-"  (str %)) (seq rolls)))))

(defn- deduct-extra-rolls [score rolls]
  (- score  (score-rolls 0 (drop 20 (expand-strikes rolls)))))

(defn score [rolls] 
  (deduct-extra-rolls (score-rolls 0 (seq rolls)) rolls))
```

See on [Mash's GitHub](https://github.com/mashooq/katas/tree/master/clojure/bowling)

## F# (by Pedro)

```fsharp
namespace BowlingV2.FSharpKatas

    module Bowling = 
        open System

        type private Rolls = Strike | Spare | Roll
        type private Pins = Pins of int
        type private Roll = Rolls * Pins
        
        let private maxRolls = 20
        let private maxPins = 10
        let private noPins = 0
        
        let private pinCountForRoll roll =
            let (Pins pins) = snd roll
            pins
            
        let private pinsFromRawRoll rawRoll =
            Pins (Int32.Parse(rawRoll.ToString()))
            
        let private sparePinsFromRawRoll rawRoll = 
            Pins (maxPins - Int32.Parse(rawRoll.ToString()))

        let private parse roll index rolls =
            let previousRoll = fun () -> Seq.item (index - 1) rolls
            match roll with
            | '-' -> Roll, Pins noPins
            | '/' -> Spare, sparePinsFromRawRoll(previousRoll())
            | 'X' -> Strike, Pins maxPins
            | r -> Roll, pinsFromRawRoll r

        let private scoreRoll index rolls =
            let bonusRoll = fun(lookAhead) ->  
                if index + lookAhead < Seq.length rolls 
                then pinCountForRoll (Seq.item (index + lookAhead) rolls) 
                else noPins       

            let exceedsMaxRolls = fun() ->
                rolls 
                |> Seq.take index
                |> Seq.map (fun r -> match r with | (Strike, _) -> 2 | _ -> 1)
                |> Seq.sum >= maxRolls

            match Seq.item index rolls with
                | (_, _) when exceedsMaxRolls() -> noPins
                | (Spare, Pins pins) -> pins + bonusRoll 1
                | (Strike, Pins pins) -> pins + bonusRoll 1 + bonusRoll 2
                | (Roll, Pins pins) -> pins

        let scoreGame rolls =
            let parsedRolls = rolls |> Seq.mapi (fun index roll -> 
                                                    parse roll index rolls)

            parsedRolls
            |> Seq.mapi (fun index _ -> scoreRoll index parsedRolls)
            |> Seq.sum
                     
    module BowlingTests =
        open NUnit.Framework
        open Swensen.Unquote
        open Bowling

        [<Test>]
        let ``calculate scores with no strikes or spares``() =
            test <@ scoreGame "--" = 0 @> 
            test <@ scoreGame "1" = 1 @>
            test <@ scoreGame "13" = 4 @>
            test <@ scoreGame "13521" = 12 @>
            
        [<Test>]
        let ``calculate scores containing a miss``() =
            test <@ scoreGame "1-5-" = 6 @>
            test <@ scoreGame "9-9-9-9-9-9-9-9-9-9-" = 90 @>
            
        [<Test>]
        let ``calculate scores containing spares``() =
            test <@ scoreGame "1/" = 10 @>
            test <@ scoreGame "1/--" = 10 @>
            test <@ scoreGame "1/-5" = 15 @>
            test <@ scoreGame "1/35-" = 21 @>
            test <@ scoreGame "1/3/23" = 30 @>
            test <@ scoreGame "5/5/5/5/5/5/5/5/5/5/5" = 150 @>
        
        [<Test>]
        let ``calculate scores containing strikes``() =
            test <@ scoreGame "X" = 10 @>
            test <@ scoreGame "X--" = 10 @>
            test <@ scoreGame "X--51" = 16 @>
            test <@ scoreGame "X51" = 22 @>
            test <@ scoreGame "XXXXXXXXXXXX" = 300 @>
            test <@ scoreGame "XXXXXXXXXX12" = 274 @>
            test <@ scoreGame "1/35XXX45" = 103 @>
            test <@ scoreGame "1/35XXX458/X35" = 149 @>
            test <@ scoreGame "1/35XXX458/X3/" = 153 @>
            test <@ scoreGame "1/35XXX458/X3/23" = 160 @>
            test <@ scoreGame "1/35XXX458/X3/X" = 173 @>
            test <@ scoreGame "1/35XXX458/X3/XX6" = 189 @>
```

See on [Pedro's GitHub](https://github.com/pedromsantos/FSharpKatas/blob/master/BowlingV2.fs)

## Scala (by Sandro)

```scala
package com.codurance.bowlingkata.full_scoring

import com.codurance.UnitSpec
import com.codurance.bowlingkata.full_scoring.BowlingFullScoreCalculator.scoreFor

class BowlingFullScoreCalculatorShould extends UnitSpec {

	"calculate scores with no strikes or spares" in {
		scoreFor("11111111112222222222") should be (30)
	}

	"calculate scores containing a miss" in {
		scoreFor("--------------------") should be (0)
		scoreFor("1-1----------------1") should be (3)
		scoreFor("9-9-9-9-9-9-9-9-9-9-") should be (90)
	}

	"calculate scores containing spares" in {
		scoreFor("5/11------------3/11") should be (26)
		scoreFor("5/5/5/5/5/5/5/5/5/5/5") should be (150)
	}

	"calculate scores containing strikes" in {
		scoreFor("XXXXXXXXXXXX") should be(300)
		scoreFor("XXXXXXXXXX12") should be(274)
		scoreFor("1/35XXX458/X3/23") should be(160)
		scoreFor("1/35XXX458/X3/XX6") should be(189)
	}
}
```

```scala
package com.codurance.bowlingkata.full_scoring

object BowlingFullScoreCalculator {

	def scoreFor(rolls: String): Int = totalScore(rolls.split("").toList)

	private def totalScore(rolls: List[String], index: Int = 0, score: Int = 0): Int = {
		lazy val MISS  = "-"
		lazy val SPARE = ("/", () => 10 - rollScoreAt(index - 1) + if_(index < 19, rollScoreAt(index + 1)))
		lazy val STRIKE = ("X", () => 10 + if_(index + numberOfPreviousStrikes() < 18,
                                               rollScoreAt(index + 1) + rollScoreAt(index + 2)))

		def numberOfPreviousStrikes() = rolls.mkString.take(index).count(_ == 'X')

		def rollScoreAt(index: Int): Int =
			rolls(index) match {
				case STRIKE._1 => 10
				case SPARE._1  => 10 - rolls(index - 1).toInt
				case MISS      => 0
				case pins      => pins.toInt
			}

		rolls.drop(index) match {
			case STRIKE._1 :: _ => totalScore(rolls, index + 1, score + STRIKE._2())
			case SPARE._1 :: _  => totalScore(rolls, index + 1, score + SPARE._2())
			case MISS :: _      => totalScore(rolls, index + 1, score)
			case n :: _         => totalScore(rolls, index + 1, score + n.toInt)
			case List()         => score
		}
	}

	private def if_(condition: Boolean, ifTrue: => Int): Int = if (condition) ifTrue else 0
}
```

See on [Sandro's GitHub](https://github.com/sandromancuso/bowling_kata_scala)

## Fun and passion

Having fun at work, be surrounded by passionate and talented craftsmen, the respect we have for each other, and the willingness to learn and share, are some of the things I love the most about the Codurance’s culture. What started as apprentices practicing with a kata transformed into a great way to learn and share knowledge among craftsmen and apprentices. Some of our craftsmen and apprentices are also working on their solutions in Kotlin, Haskell, Java, and C#.

As among ourselves we will probably never agree which one we prefer, we will let you choose which one you like the most. :)

Thanks [Mash](https://twitter.com/mashooq) and [Pedro](https://twitter.com/pedromsantos) for the Clojure and F# implementations.
