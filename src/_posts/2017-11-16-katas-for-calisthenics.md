---
author: Jorge Gueorguiev Garcia
comments: true
date: 2017-11-16 08:00:00 +00:00
layout: post
asset-type: post
slug: katas-for-functional-calisthenics
title: Katas For Functional Calisthenics
image:
    src: /assets/custom/img/blog/karate.jpg
tags:
- functional programming
---
# The Setup

While working on katas to test the I realized that some of the rules were not going to be covered by the rules for the katas that I had choosen. Therefore, some additional rules/premises/requirements to the katas were needed. Here I have three of the katas that we have used in the past for OOP and one kata that came out of the [HN discussion](https://news.ycombinator.com/item?id=15507081) on the post.

# The Katas

 * [Tennis](#tenniskata)
 * [Mars Rover](#marsroverkata)
 * [Bank](#bankkata)
 * [8 Queens](#8queenskata)
 
## <a class="anchor" name="tenniskata"></a><img src="{{ site.baseurl }}/assets/custom/img/blog/lambda_small.png" class="bullet-image">Tennis Kata

### Rules

- A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
- The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.
- If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.
- If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.

### Changes

- A game will be played interactively.
- All interaction will happen on the console.
- For each point the system will request to have the winner of the point.
- After each point has been submitted the system will display the current score, using the style described on basics.
- Once a player wins, the game should stop and will display the results.

### Why

The easiest kata in this post (on its original form), but still difficult enough to pose a bit of a challenge. The main point of the changes revolves around the interactivity of the system. Probably this change makes it the more difficult of the lot to handle using the rules.

## <a class="anchor" name="marsroverkata"></a><img src="{{ site.baseurl }}/assets/custom/img/blog/lambda_small.png" class="bullet-image">Mars Rover Kata

### Rules

- You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
- The rover receives a character array of commands.
- Implement commands that move the rover forward/backward (f,b).
- Implement commands that turn the rover left/right (l,r).
- Implement wrapping from one edge of the grid to another. (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.

### Changes

- The set of instructions will be provided from the console
- Before the rover moves there will be three expected inputs: Size of the world, location and direction o fthe rover, the full set of commands expected to be carried by the rover. They will be introduced separately
- Once all the inputs have been provided, the rover will output on the screen the location after it moves
- If there was an obstacle, the mars rover will output the last position before the obstacle and a text saying an obstacle was found.

### Why

Of the katas on this post is the one on which more concepts are present. Which makes it interesting when comparing the solution with OOP. Use of the  is explicit with the changes introduced to the rules.


## <a class="anchor" name="bankkata"></a><img src="{{ site.baseurl }}/assets/custom/img/blog/lambda_small.png" class="bullet-image">Bank Kata
### Rules

- Deposits and withdrawals can be maded into an account
- Each deposit or withdrawal will have the amount of the operation and the date of the operation
- You should be able to transfer between accounts. A transfer will appear as a withdrawal in the account of the transferor and as a deposit on the account of the transferee.
- A statement can be requested at any time. The statement will contain for each entry the date, the amount of deposition, the amount of withdrawal (only one of the two should have a value), and the balance of the account after the entry.
- Headers should be shown on the statement.
- You should be able to filter the statement (only deposits, only withdrawals, date)

### Changes

- The information must be stored on a file or database.


## <a class="anchor" name="8queenskata"></a><img src="{{ site.baseurl }}/assets/custom/img/blog/lambda_small.png" class="bullet-image">8 Queens Kata

### Rules

The objective is to place 8 chess queens on a standard chess board without the queens checking each other.

### Changes

None

### Why

The idea of doing this kata as part of the list of katas to use for functional calisthenics came out of the discussion on Hacker News linked above. One of the solutions to the kata, and the one I used the only time I have completed it, uses recursion with backtracking. But one of our rules says #noexplicitrecursion). I am currently working on it, so a pointer for you is the use of reduce in which the accumulator is a collection of boards with the state after placing a queen. I have also to look into Philip's Wadler paper regarding the [*List of successes method*](https://link.springer.com/chapter/10.1007/3-540-15975-4_33) (paywall)




Original Photo by Jason Briscoe on Unsplash
